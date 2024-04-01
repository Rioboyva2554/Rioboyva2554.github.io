'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	
	TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js'),
	Types = require('%PathToCoreWebclientModule%/js/utils/Types.js'),
	
	ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js'),
	Popups = require('%PathToCoreWebclientModule%/js/Popups.js'),

	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	SetRecoveryEmailPopup = require('modules/%ModuleName%/js/popups/SetRecoveryEmailPopup.js'),
	Settings = require('modules/%ModuleName%/js/Settings.js')
;

/**
 * @constructor
 */
function CResetPasswordSettingsFormView()
{
	CAbstractSettingsFormView.call(this, '%ModuleName%');
	
	this.recoveryEmail = ko.observable(Settings.RecoveryEmail);
	this.recoveryEmailConfirmed = ko.observable(Settings.RecoveryEmailConfirmed);
	this.recoveryEmailInfo = ko.computed(function () {
		if (this.recoveryEmail() !== '')
		{
			var sLangName = this.recoveryEmailConfirmed() ? 'INFO_YOU_HAVE_RECOVERY_EMAIL' : 'INFO_YOU_HAVE_NOT_CONFIRMED_RECOVERY_EMAIL';
			return TextUtils.i18n('%MODULENAME%/' + sLangName, {
				'EMAIL': this.recoveryEmail()
			});
		}
		return TextUtils.i18n('%MODULENAME%/INFO_NOT_SET_RECOVERY_EMAIL');
	}, this);
}

_.extendOwn(CResetPasswordSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CResetPasswordSettingsFormView.prototype.ViewTemplate = '%ModuleName%_ResetPasswordSettingsFormView';

CResetPasswordSettingsFormView.prototype.setRecoveryEmail = function ()
{
	Popups.showPopup(SetRecoveryEmailPopup, [function (sRecoveryEmail) {
		this.updateSettings(sRecoveryEmail);
	}.bind(this)]);
};

CResetPasswordSettingsFormView.prototype.changeRecoveryEmail = function ()
{
	Popups.showPopup(SetRecoveryEmailPopup, [function (sRecoveryEmail) {
		this.updateSettings(sRecoveryEmail);
	}.bind(this)]);
};

CResetPasswordSettingsFormView.prototype.updateSettings = function (sRecoveryEmail)
{
	Settings.update(sRecoveryEmail);
	this.recoveryEmail(Settings.RecoveryEmail);
	this.recoveryEmailConfirmed(Settings.RecoveryEmailConfirmed);
};

module.exports = new CResetPasswordSettingsFormView();
