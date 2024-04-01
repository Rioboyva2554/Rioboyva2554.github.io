(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[23],{

/***/ "C5H3":
/*!***********************************************************!*\
  !*** ./modules/CoreWebclient/js/views/CHeaderItemView.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n")
;

function CHeaderItemView(sLinkText)
{
	this.sName = '';
	
	this.visible = ko.observable(true);
	this.baseHash = ko.observable('');
	this.hash = ko.observable('');
	this.linkText = ko.observable(sLinkText);
	this.isCurrent = ko.observable(false);
	
	this.recivedAnim = ko.observable(false).extend({'autoResetToFalse': 500});
	this.unseenCount = ko.observable(0);
	
	this.allowChangeTitle = ko.observable(false); // allows to change favicon and browser title when browser is inactive
	this.inactiveTitle = ko.observable('');
	
	this.excludedHashes = ko.observableArray([]);
}

CHeaderItemView.prototype.ViewTemplate = 'CoreWebclient_HeaderItemView';

CHeaderItemView.prototype.setName = function (sName)
{
	this.sName = sName.toLowerCase();
	if (this.baseHash() === '')
	{
		this.hash(Routing.buildHashFromArray([sName.toLowerCase()]));
		this.baseHash(this.hash());
	}
	else
	{
		this.hash(this.baseHash());
	}
};

module.exports = CHeaderItemView;


/***/ }),

/***/ "i0GI":
/*!**********************************************************!*\
  !*** ./modules/TenantAdminPanelWebclient/js/Settings.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
	ServerModuleName: 'TenantAdminPanelWebclient',
	HashModuleName: 'tenant-adminpanel',
	
	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
	}
};


/***/ }),

/***/ "SOqY":
/*!*********************************************************!*\
  !*** ./modules/TenantAdminPanelWebclient/js/manager.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = function (oAppData) {
	var
		// $ = require('jquery'),

		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		
		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

		Settings = __webpack_require__(/*! modules/TenantAdminPanelWebclient/js/Settings.js */ "i0GI"),
		
		HeaderItemView = null
	;
	
	Settings.init(oAppData);
	
	var sAppHash = Settings.HashModuleName; 
	
	if (App.getUserRole() === Enums.UserRole.TenantAdmin)
	{
		return {
			/**
			 * Returns list of functions that are return module screens.
			 * 
			 * @returns {Object}
			 */
			getScreens: function ()
			{
				var oScreens = {};
				
				oScreens[sAppHash] = function () {
					return __webpack_require__(/*! modules/TenantAdminPanelWebclient/js/views/MainView.js */ "rxMG");
				};
				
				return oScreens;
			},

			/**
			 * Returns object of header item view of the module.
			 * 
			 * @returns {Object}
			 */
			getHeaderItem: function ()
			{
				var 
					CHeaderItemView = __webpack_require__(/*! modules/CoreWebclient/js/views/CHeaderItemView.js */ "C5H3"),
					oHeaderEntry = 	{};
				;

				if (HeaderItemView === null) {
					HeaderItemView = new CHeaderItemView(TextUtils.i18n('TENANTADMINPANELWEBCLIENT/LABEL_SETTINGS_TAB'));
				}
				oHeaderEntry = {
					item: HeaderItemView,
					name: sAppHash
				};
				
				return oHeaderEntry;
			}
		};
	}
	
	return null;
};


/***/ }),

/***/ "rxMG":
/*!****************************************************************!*\
  !*** ./modules/TenantAdminPanelWebclient/js/views/MainView.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),

	CAbstractScreenView = __webpack_require__(/*! modules/CoreWebclient/js/views/CAbstractScreenView.js */ "doeu"),

	UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R")
;

/**
 * View that is used as screen of the module. Inherits from CAbstractScreenView that has showing and hiding methods.
 * 
 * @constructor
 */
function CMainView()
{
	CAbstractScreenView.call(this, 'TenantAdminPanelWebclient');

	// Text for displaying in browser title.
	this.browserTitle = ko.observable(TextUtils.i18n('TENANTADMINPANELWEBCLIENT/HEADING_BROWSER_TAB'));

	this.sFrameUrl = UrlUtils.getAppPath() + 'adminpanel';

	this.iframeDom = ko.observable(null);

	this.isLogoutStarted = false;
	this.isLogoutError = false;
	App.subscribeEvent('Logout', (params) => {
		if (this.isLogoutError) {
			// second logout is without attempt to logout from tenant adminpanel
			return;
		}
		if (this.isLogoutStarted) {
			// disable logout if we're waiting reply from iframe
			params.logoutPromises.push(new Promise((resolve, reject) => {
				reject();
			}));
			return;
		}
		params.logoutPromises.push(new Promise((resolve, reject) => {
			this.isLogoutStarted = true;
			if (this.iframeDom() && this.iframeDom().length > 0) {
				const loadingTimerId = setTimeout(() => {
					Screens.showLoading(TextUtils.i18n('TENANTADMINPANELWEBCLIENT/INFO_LOGOUT_FROM_ADMINPANEL'));
				}, 1000);

				const errorTimerId = setTimeout(() => {
					this.isLogoutError = true;
					Screens.hideLoading();
					Screens.showReport(TextUtils.i18n('TENANTADMINPANELWEBCLIENT/ERROR_CANNOT_LOGOUT_FROM_ADMINPANEL'), 0);
					$('.report_panel.report a').attr('href', this.sFrameUrl).on('click', () => {
						resolve();
					});
				}, 10000);

				window.addEventListener('message', function(event) {
					if (event && event.origin === window.location.origin && event.data &&
							event.data.eventName === 'after-logout'
					) {
						Screens.hideLoading();
						clearTimeout(loadingTimerId);
						clearTimeout(errorTimerId);
						resolve();
					}
				});

				
				this.iframeDom()[0].contentWindow.postMessage({
					eventName: 'logout'
				}, window.location.origin);
			} else {
				resolve();
			}
		}));
	});

	App.broadcastEvent('TenantAdminPanelWebclient::ConstructView::after', {'Name': this.ViewConstructorName, 'View': this});
}

_.extendOwn(CMainView.prototype, CAbstractScreenView.prototype);

CMainView.prototype.ViewTemplate = 'TenantAdminPanelWebclient_MainView';
CMainView.prototype.ViewConstructorName = 'CMainView';

CMainView.prototype.handleBeforeLogoutAndLogout = function (continueLogout) {
	console.log('handleBeforeLogoutAndLogout', this.iframeDom());
	if (this.iframeDom() && this.iframeDom().length > 0) {
		this.iframeDom()[0].contentWindow.postMessage({
			eventName: 'logout'
		}, '*');

		window.addEventListener('message', function(oEvent) {
			console.log({oEvent});
			if (oEvent && oEvent.data && oEvent.data.eventName === 'after-logout') {
				continueLogout();
			}
		});
	}
};

module.exports = new CMainView();


/***/ })

}]);