"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[18],{

/***/ "/cQ7":
/*!**********************************************************!*\
  !*** ./modules/SecuritySettingsWebclient/js/Settings.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),

	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L")
;

module.exports = {
	ModulesOrder: [],
	
	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var oAppDataSection = oAppData['SecuritySettingsWebclient'];
		
		if (!_.isEmpty(oAppDataSection))
		{
			this.ModulesOrder = Types.pArray(oAppDataSection.ModulesOrder);
		}
	}
};


/***/ }),

/***/ "mpRJ":
/*!*********************************************************!*\
  !*** ./modules/SecuritySettingsWebclient/js/manager.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = function (oAppData) {
	var
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),

		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
		
		Settings = __webpack_require__(/*! modules/SecuritySettingsWebclient/js/Settings.js */ "/cQ7")
	;

	Settings.init(oAppData);

	if (App.isUserNormalOrTenant())
	{
		return {
			start: function (ModulesManager) {
				ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [
					function () { return __webpack_require__(/*! modules/SecuritySettingsWebclient/js/views/SecuritySettingsFormView.js */ "SbFz"); },
					'security',
					TextUtils.i18n('SECURITYSETTINGSWEBCLIENT/LABEL_SETTINGS_TAB')
				]);
			},
			registerSecuritySettingsSection: function (fGetTabView, sModuleName) {
				var SettingsView = __webpack_require__(/*! modules/SecuritySettingsWebclient/js/views/SecuritySettingsFormView.js */ "SbFz");
				SettingsView.registerTabSection(fGetTabView, sModuleName);
			}
		};
	}
	
	return null;
};


/***/ }),

/***/ "SbFz":
/*!********************************************************************************!*\
  !*** ./modules/SecuritySettingsWebclient/js/views/SecuritySettingsFormView.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	Settings = __webpack_require__(/*! modules/SecuritySettingsWebclient/js/Settings.js */ "/cQ7")
;

/**
 * @constructor
 */
function CSecuritySettingsFormView()
{
	CAbstractSettingsFormView.call(this);
	
	this.visibleHeading = ko.observable(true);
	this.securitySections = ko.observableArray([]);
	this.hideSecuritySiblings = ko.observable(false);
}

_.extendOwn(CSecuritySettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CSecuritySettingsFormView.prototype.ViewTemplate = 'SecuritySettingsWebclient_SecuritySettingsFormView';

CSecuritySettingsFormView.prototype.registerTabSection = function (fGetSectionView, sModuleName)
{
	const oSection = fGetSectionView();
	oSection.sSsecurityModuleName = sModuleName;
	oSection.bSecurityScreenEmbeded = true;
	oSection.securityVisibleSection = ko.observable(true);

	if (ko.isObservable(oSection.subPage))
	{
		oSection?.visibleHeading(false);

		oSection.subPage.subscribe(function (v) {
			oSection?.visibleHeading(v);
			this.visibleHeading(!v);

			_.each(this.securitySections(), function (oItem) {
				const bHideSection = v ? oItem.sSsecurityModuleName === oSection.sSsecurityModuleName : true;
				oItem.securityVisibleSection(bHideSection);
			})
		}, this);
	}

	this.securitySections().push(oSection);
	var iLastIndex = Settings.ModulesOrder.length;
	this.securitySections(_.sortBy(this.securitySections(), function (oSection) {
		var iIndex = _.indexOf(Settings.ModulesOrder, oSection.sModuleName);
		return iIndex !== -1 ? iIndex : iLastIndex;
	}));
};

CSecuritySettingsFormView.prototype.onShow = function ()
{
	_.each(this.securitySections(), function (oSection) {
		if (_.isFunction(oSection.onShow)) {
			oSection.onShow();
		}
	});
};

module.exports = new CSecuritySettingsFormView();


/***/ })

}]);