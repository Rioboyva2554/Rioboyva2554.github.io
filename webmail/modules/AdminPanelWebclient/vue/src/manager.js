import enums from 'src/enums'
import routesManager from 'src/router/routes-manager'
import settings from 'src/settings'
import store from 'src/store'
import { convertLocalstorageData } from 'src/convert-localstorage-data'

import Empty from 'components/Empty'
import EditTenant from 'components/EditTenant'
import EditGroup from 'components/EditGroup'
import GroupFilterForUsers from 'src/components/GroupFilterForUsers'

export default {
  moduleName: 'AdminPanelWebclient',

  requiredModules: [],

  init (appData) {
    convertLocalstorageData()
    settings.init(appData)
  },

  getPages () {
    const UserRoles = enums.getUserRoles()
    const pages = [
      {
        pageName: 'login',
        pagePath: '/',
        pageComponent: () => import('pages/Login.vue'),
        pageUserRoles: [UserRoles.Anonymous],
      },
      {
        pageName: 'system',
        pagePath: '/system',
        pageComponent: () => import('pages/System.vue'),
        pageChildren: routesManager.getRouteChildren('System'),
        pageUserRoles: [UserRoles.SuperAdmin],
        pageTitle: 'ADMINPANELWEBCLIENT.HEADING_SYSTEM_SETTINGS_TABNAME',
      },
    ]
    if (settings.getEnableMultiTenant()) {
      pages.push({
        pageName: 'tenants',
        pagePath: '/tenants',
        pageComponent: () => import('pages/Tenants.vue'),
        pageChildren: [
          { path: 'id/:id', component: EditTenant },
          { path: 'create', component: EditTenant },
          { path: 'search/:search', component: Empty },
          { path: 'search/:search/id/:id', component: EditTenant },
          { path: 'page/:page', component: Empty },
          { path: 'page/:page/id/:id', component: EditTenant },
          { path: 'search/:search/page/:page', component: Empty },
          { path: 'search/:search/page/:page/id/:id', component: EditTenant },
        ].concat(routesManager.getRouteChildren('Tenant')),
        pageUserRoles: [UserRoles.SuperAdmin, UserRoles.TenantAdmin],
        pageTitle: 'ADMINPANELWEBCLIENT.HEADING_TENANTS_SETTINGS_TABNAME',
      })
    }
    if (settings.getAllowGroups()) {
      pages.push({
        pageName: 'groups',
        pagePath: '/groups',
        pageComponent: () => import('pages/Groups.vue'),
        pageChildren: [
          { path: 'id/:id', component: EditGroup },
          { path: 'create', component: EditGroup },
          { path: 'search/:search', component: Empty },
          { path: 'search/:search/id/:id', component: EditGroup },
          { path: 'page/:page', component: Empty },
          { path: 'page/:page/id/:id', component: EditGroup },
          { path: 'search/:search/page/:page', component: Empty },
          { path: 'search/:search/page/:page/id/:id', component: EditGroup },
        ],
        pageUserRoles: [UserRoles.SuperAdmin],
        pageTitle: 'ADMINPANELWEBCLIENT.HEADING_GROUPS_SETTINGS_TABNAME',
      })
    }
    pages.push({
      pageName: 'users',
      pagePath: '/users',
      pageComponent: () => import('pages/Users.vue'),
      pageChildren: routesManager.getAllUserRoutes(),
      pageUserRoles: [UserRoles.SuperAdmin, UserRoles.TenantAdmin],
      pageTitle: 'ADMINPANELWEBCLIENT.HEADING_USERS_SETTINGS_TABNAME',
    })
    return pages
  },

  getAdminSystemTabs () {
    return [
      {
        tabName: 'admin-security',
        tabTitle: 'ADMINPANELWEBCLIENT.LABEL_SECURITY_SETTINGS_TAB',
        tabRouteChildren: [
          { path: 'admin-security', component: () => import('./components/AccountAdminSettings') },
        ],
      },
      {
        tabName: 'admin-db',
        tabTitle: 'ADMINPANELWEBCLIENT.HEADING_DB_SETTINGS',
        tabRouteChildren: [
          { path: 'admin-db', component: () => import('./components/DbAdminSettingsView') },
        ],
      },
      {
        tabName: 'about',
        tabTitle: 'ADMINPANELWEBCLIENT.LABEL_ABOUT_SETTINGS_TAB',
        tabRouteChildren: [
          { path: 'about', component: () => import('./components/AboutAdminSettings') },
        ],
      }
    ]
  },

  getFiltersForUsers () {
    const isUserSuperAdmin = store.getters['user/isUserSuperAdmin']
    if (isUserSuperAdmin) {
      return [
        GroupFilterForUsers
      ]
    }
    return []
  },
}
