'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	
	TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js'),
	Types = require('%PathToCoreWebclientModule%/js/utils/Types.js'),
	
	Ajax = require('%PathToCoreWebclientModule%/js/Ajax.js'),
	Api = require('%PathToCoreWebclientModule%/js/Api.js'),
	App = require('%PathToCoreWebclientModule%/js/App.js'),
	ConfirmPopup = require('%PathToCoreWebclientModule%/js/popups/ConfirmPopup.js'),
	ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js'),
	Popups = require('%PathToCoreWebclientModule%/js/Popups.js'),
	Screens = require('%PathToCoreWebclientModule%/js/Screens.js'),
	
	CAbstractSettingsFormView = ModulesManager.run('AdminPanelWebclient', 'getAbstractSettingsFormViewClass')
;

/**
 * @constructor
 */
function CIPAllowListAdminSettingsFormView()
{
	CAbstractSettingsFormView.call(this);
	
	this.iUserId = 0;
	
	this.userPublicId = ko.observable('');
	this.ipAllowlistEnabled = ko.observable(false);
	
	App.subscribeEvent('ReceiveAjaxResponse::after', _.bind(function (oParams) {
		if (oParams.Request.Module === 'Core' && oParams.Request.Method === 'GetUser')
		{
			if (oParams.Response.Result && oParams.Request.Parameters.Id === this.iUserId)
			{
				this.userPublicId(oParams.Response.Result.PublicId);
			}
		}
	}, this));

	this.ipAllowlistStatusForUserText = ko.computed(function () {
		if (this.ipAllowlistEnabled())
		{
			return TextUtils.i18n('%MODULENAME%/INFO_IP_ALLOWLIST_ENABLED_FOR_USER', {'USER': this.userPublicId()});
		}
		
		return TextUtils.i18n('%MODULENAME%/INFO_IP_ALLOWLIST_DISABLED_FOR_USER', {'USER': this.userPublicId()});
	}, this);
}

_.extendOwn(CIPAllowListAdminSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CIPAllowListAdminSettingsFormView.prototype.ViewTemplate = '%ModuleName%_IPAllowListAdminSettingsFormView';

CIPAllowListAdminSettingsFormView.prototype.onRouteChild = function ()
{
	this.ipAllowlistEnabled(false);
	this.requestPerUserSettings();
};

CIPAllowListAdminSettingsFormView.prototype.requestPerUserSettings = function ()
{
	Ajax.send('%ModuleName%', 'GetUserSettings', { 'UserId': this.iUserId }, function (oResponse, oRequest) {
		if (oResponse.Result && oRequest.Parameters.UserId === this.iUserId)
		{
			this.ipAllowlistEnabled(Types.pBool(oResponse.Result.IpAllowlistEnabled));
		}
	}, this);
};

CIPAllowListAdminSettingsFormView.prototype.comfirmDisableUserIpAllowlist = function ()
{
	Popups.showPopup(ConfirmPopup, [TextUtils.i18n('%MODULENAME%/CONFIRM_DISABLE_IP_ALLOWLIST', {'USER': this.userPublicId()}), _.bind(function (bDisableUserIpAllowlist) {
		if (bDisableUserIpAllowlist)
		{
			this.disableUserIpAllowlist();
		}
	}, this), '', TextUtils.i18n('%MODULENAME%/ACTION_DISABLE_IP_ALLOWLIST')]);
};

CIPAllowListAdminSettingsFormView.prototype.disableUserIpAllowlist = function ()
{
	Ajax.send('%ModuleName%', 'DisableUserIpAllowlist', { 'UserId': this.iUserId }, function (oResponse, oRequest) {
		if (oResponse.Result)
		{
			this.ipAllowlistEnabled(false);
			Screens.showReport(TextUtils.i18n('%MODULENAME%/REPORT_DISABLE_USER_IP_ALLOWLIST', {'USER': this.userPublicId()}));
		}
		else
		{
			Api.showErrorByCode(oResponse, TextUtils.i18n('%MODULENAME%/ERROR_DISABLE_USER_IP_ALLOWLIST', {'USER': this.userPublicId()}));
		}
	}, this);
};

CIPAllowListAdminSettingsFormView.prototype.setAccessLevel = function (sEntityType, iUserId)
{
	this.visible(sEntityType === 'User');
	this.iUserId = iUserId;
};

module.exports = new CIPAllowListAdminSettingsFormView();
