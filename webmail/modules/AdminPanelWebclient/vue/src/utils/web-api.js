import _ from 'lodash'
import axios from 'axios'
import { saveAs } from 'file-saver'
import VueCookies from 'vue-cookies'

import errors from 'src/utils/errors'
import urlUtils from 'src/utils/url'
import notification from 'src/utils/notification'
import { i18n } from 'boot/i18n'

import core from 'src/core'
import eventBus from 'src/event-bus'
import store from 'src/store'

export default {
  sendRequest: function ({ moduleName, methodName, parameters, signal }) {
    return new Promise((resolve, reject) => {
      const unknownError = {
        ErrorCode: 0,
        Module: moduleName,
      }
      const silentError = {
        ErrorCode: errors.getSilentErrorCode(),
        Module: moduleName,
      }

      eventBus.$emit('webApi::Request::before', parameters)

      const postData = {
        Module: moduleName,
        Method: methodName,
      }
      if (!_.isEmpty(parameters)) {
        postData.Parameters = JSON.stringify(parameters)
      }

      // The AuthToken needs to be read from the cookie (not from store) to always match the cookies sent to the server.
      // If a user is also logged in the browser, then his AppData will be received and the login screen will be displayed,
      // because the user is not a superadmin.
      const authToken = VueCookies.get('AuthToken')
      const deviceId = VueCookies.get('DeviceId')
      const headers = { 'X-Client': 'WebClient' }
      if (deviceId) {
        headers['X-DeviceId'] = deviceId
      }
      if (authToken) {
        headers.Authorization = 'Bearer ' + authToken
      }
      axios({
        method: 'post',
        url: urlUtils.getApiHost() + '?/Api/',
        data: new URLSearchParams(postData),
        headers,
        signal,
      }).then(
        (response) => {
          const isOkResponse = response?.status === 200 && !!response?.data
          if (isOkResponse) {
            eventBus.$emit('webApi::Response', {
              moduleName,
              methodName,
              parameters,
              response: response.data,
            })
            const result = response.data.Result
            if (!result) {
              if (response.data.ErrorCode || response.data.ErrorMessage || response.data.SubscriptionsResult) {
                if (
                  store.getters['user/isUserSuperAdminOrTenantAdmin'] &&
                  errors.isAuthError(response.data.ErrorCode) &&
                  methodName !== 'Logout'
                ) {
                  core.logout()
                }
                if (errors.isSystemError(response.data.ErrorCode)) {
                  notification.showError(i18n.global.tc('COREWEBCLIENT.ERROR_UNKNOWN'))
                } else {
                  reject(response.data)
                }
              } else {
                reject(unknownError)
              }
            } else {
              resolve(result)
            }
          } else {
            eventBus.$emit('webApi::Response', {
              moduleName,
              methodName,
              parameters,
              response: unknownError,
            })
            reject(unknownError)
          }
        },
        (error) => {
          eventBus.$emit('webApi::Response', {
            moduleName,
            methodName,
            parameters,
            response: error.code === 'ERR_CANCELED' ? silentError : unknownError,
          })
          reject(error.code === 'ERR_CANCELED' ? silentError : unknownError)
        }
      )
    })
  },

  downloadExportFile: function ({ moduleName, methodName, parameters, fileName, format }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      const authToken = store.getters['user/getAuthToken']
      if (authToken) {
        headers.Authorization = 'Bearer ' + authToken
      }

      const data = new FormData()
      data.set('Module', moduleName)
      data.set('Method', methodName)
      data.set('Parameters', JSON.stringify(parameters))
      if (format) {
        data.set('Format', format)
      }

      axios({
        method: 'post',
        url: urlUtils.getApiHost() + '?/Api/',
        data: data,
        headers: headers,
      }).then((oResponse) => {
        if (oResponse) {
          let resData = oResponse.data.split('\n')
          resData.pop()
          resData = resData.join('\n')
          const oBlob = new Blob([resData])
          saveAs(oBlob, fileName)
          resolve()
        } else {
          reject()
        }
      })
    })
  },
}
