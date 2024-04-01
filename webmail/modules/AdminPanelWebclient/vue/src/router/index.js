import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

import core from 'src/core'
import modulesManager from 'src/modules-manager'

// Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  // const Router = new VueRouter({
  //   scrollBehavior: () => ({ x: 0, y: 0 }),
  //   routes,

  //   // Leave these as they are and change in quasar.conf.js instead!
  //   // quasar.conf.js -> build -> vueRouterMode
  //   // quasar.conf.js -> build -> publicPath
  //   mode: process.env.VUE_ROUTER_MODE,
  //   base: process.env.VUE_ROUTER_BASE
  // })

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    // history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
    history: createHistory(process.env.MODE === 'ssr' ? undefined : process.env.VUE_ROUTER_BASE),
  })

  let routesAdded = false
  let isAppLoadError = false
  Router.beforeEach((to, from, next) => {
    if (isAppLoadError && to.path === '/app-not-loaded') {
      next()
      return
    }
    core.init().then(
      () => {
        if (!routesAdded) {
          modulesManager.getPages().forEach((page) => {
            const routeData = {
              name: page.pageName,
              path: page.pagePath,
              component: page.pageComponent,
              // strict: page.pageStrict
            }
            if (page.pageChildren) {
              routeData.children = page.pageChildren
            }
            Router.addRoute(page.pageName, routeData)
          })
          routesAdded = true
          next(to.path)
          return
        }

        const correctedPath = modulesManager.correctPathForUser(to.matched, to.path)
        if (to.path !== correctedPath) {
          next(correctedPath)
          return
        }
        next()
      },
      (error) => {
        console.log('core.init reject', error)
        isAppLoadError = true
        next('/app-not-loaded')
      }
    )
  })

  return Router
})
