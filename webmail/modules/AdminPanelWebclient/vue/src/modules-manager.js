import _ from 'lodash'
import store from 'src/store'

import typesUtils from 'src/utils/types'

import moduleList from 'src/modules'
import settings from 'src/settings'

let availableClientModules = []
let availableBackendModules = []
let availableModules = []

let allModules = null
let allModulesNames = []
let allPages = null

let tenantEditDataComponent = null

let userMainDataComponent = null
let userOtherDataComponents = null
let userFilters = null

function _checkIfModuleAvailable (module, modules, depth = 1) {
  if (depth > 4) {
    return true // to prevent infinite recursion if some modules require each other for some reason
  }
  const isAvailable = availableModules.indexOf(module.moduleName) !== -1
  const isEveryRequireAvailable = _.isArray(module.requiredModules)
    ? module.requiredModules.every(requiredModuleName => {
      const requiredModule = modules.find(module => {
        return module.moduleName === requiredModuleName
      })
      return requiredModule
        ? _checkIfModuleAvailable(requiredModule, modules, depth + 1)
        : availableModules.indexOf(requiredModuleName) !== -1
    })
    : true
  return isAvailable && isEveryRequireAvailable
}

export default {
  async getModules (appData) {
    if (allModules === null) {
      availableClientModules = typesUtils.pArray(appData?.Core?.AvailableClientModules)
      availableBackendModules = typesUtils.pArray(appData?.Core?.AvailableBackendModules)
      availableModules = _.uniq(availableClientModules.concat(availableBackendModules))
      let modules = await moduleList.getModules()
      if (_.isArray(modules)) {
        modules = modules.map(module => {
          return _.isObject(module.default) ? module.default : null
        })
        allModules = modules.filter(module => {
          if (_.isObject(module)) {
            return _checkIfModuleAvailable(module, modules)
          }
          return false
        })
        allModulesNames = allModules.map(module => {
          return module.moduleName
        })
      } else {
        allModules = []
        allModulesNames = []
      }
      if (allModules.length === 0) {
        throw new Error('There are no available modules')
      }
      if (allModulesNames.indexOf('AdminPanelWebclient') === -1) {
        throw new Error('AdminPanelWebclient module is not available')
      }
    }
  },

  initModules (appData) {
    _.each(allModules, oModule => {
      if (_.isFunction(oModule.initSubscriptions)) {
        oModule.initSubscriptions(appData)
      }
    })
    _.each(allModules, oModule => {
      if (_.isFunction(oModule.init)) {
        oModule.init(appData)
      }
    })
  },

  isModuleAvailable (moduleName) {
    return allModulesNames.indexOf(moduleName) !== -1 || availableBackendModules.indexOf(moduleName) !== -1
  },

  getPages () {
    if (allPages === null && allModules !== null) {
      allPages = []
      allModules.forEach(module => {
        const modulePages = _.isFunction(module.getPages) && module.getPages()
        if (_.isArray(modulePages)) {
          allPages = allPages.concat(modulePages)
        }
      })
    }
    return allPages === null ? [] : allPages
  },

  getPagesForUserRole (userRole) {
    if (allPages !== null) {
      const pagesOrder = settings.getTabsBarOrder(userRole)
      const userRolePages = allPages.filter(page => _.indexOf(page.pageUserRoles, userRole) !== -1)
      return _.sortBy(userRolePages, (page) => {
        const index = _.indexOf(pagesOrder, page.pageName)
        return index !== -1 ? index : pagesOrder.length
      })
    }
    return []
  },

  getDefaultPageForUser () {
    const
      userRole = store.getters['user/getUserRole'],
      pages = this.getPagesForUserRole(userRole)
    return pages.length ? pages[0] : null
  },

  /**
   * Path is corrected depending on which page is allowed for user (if someone is authenticated) or anonymous (if no one is authenticated)
   * @param matchedRoutes
   * @param toPath
   * @returns {string}
   */
  correctPathForUser (matchedRoutes, toPath = null) {
    const
      userRole = store.getters['user/getUserRole'],
      pages = this.getPagesForUserRole(userRole)
    if (pages.length === 0) {
      return toPath || '/'
    }

    const matchedRouteName = _.isArray(matchedRoutes) && matchedRoutes.length > 0 ? matchedRoutes[0].name : null
    let page = null
    if (matchedRouteName !== null) {
      page = pages.find(page => page.pageName === matchedRouteName) || null
    }
    if (page === null) {
      page = this.getDefaultPageForUser()
    }
    if (page === null) {
      return '/'
    } else if (page.pageName === matchedRouteName) {
      return toPath || page.pagePath
    } else {
      return page.pagePath
    }
  },

  async getTenantOtherDataComponents () {
    if (tenantEditDataComponent === null) {
      for (const module of allModules) {
        if (_.isFunction(module.getTenantOtherDataComponents)) {
          const component = await module.getTenantOtherDataComponents()
          if (component?.default) {
            tenantEditDataComponent = component.default
          }
        }
      }
    }
    return tenantEditDataComponent
  },

  getAdminEntityTabs (getTabsHandlerName = null) {
    let entityTabs = []
    if (getTabsHandlerName !== null && allModules !== null) {
      allModules.forEach(module => {
        const
          getTabsHandler = module[getTabsHandlerName],
          moduleSystemTabs = _.isFunction(getTabsHandler) && getTabsHandler()
        if (_.isArray(moduleSystemTabs)) {
          entityTabs = entityTabs.concat(moduleSystemTabs)
        }
      })
    }
    return entityTabs === null ? [] : entityTabs
  },

  async getUserMainDataComponent () {
    if (userMainDataComponent === null) {
      for (const module of allModules) {
        if (_.isFunction(module.getUserMainDataComponent)) {
          const component = await module.getUserMainDataComponent()
          if (component?.default) {
            userMainDataComponent = component.default
          }
        }
      }
      if (userMainDataComponent === null) {
        const component = await import('components/EditUserMainData')
        if (component?.default) {
          userMainDataComponent = component.default
        }
      }
    }
    return userMainDataComponent
  },

  async getUserOtherDataComponents () {
    if (userOtherDataComponents === null) {
      userOtherDataComponents = []
      for (const module of allModules) {
        if (_.isFunction(module.getUserOtherDataComponents)) {
          const component = await module.getUserOtherDataComponents()
          if (component?.default) {
            userOtherDataComponents.push(component.default)
          }
        }
      }
    }
    return userOtherDataComponents
  },

  getFiltersForUsers () {
    if (userFilters === null && allModules !== null) {
      userFilters = []
      for (const module of allModules) {
        const filters = _.isFunction(module.getFiltersForUsers) && module.getFiltersForUsers()
        if (_.isArray(filters)) {
          userFilters = userFilters.concat(filters)
        }
      }
    }
    return userFilters === null ? [] : userFilters
  },
}
