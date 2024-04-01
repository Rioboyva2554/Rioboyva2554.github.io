"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[22],{

/***/ "Q5UF":
/*!******************************************************!*\
  !*** ./modules/StandardResetPassword/js/Settings.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L")
;

module.exports = {
	HashModuleName: 'reset-password',

	BottomInfoHtmlText: '',
	CustomLogoUrl: '',
	RecoveryEmail: '',
	RecoveryEmailConfirmed: false,

	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var oAppDataSection = oAppData['StandardResetPassword'];

		if (!_.isEmpty(oAppDataSection))
		{
			this.HashModuleName = Types.pString(oAppDataSection.HashModuleName, this.HashModuleName);

			this.BottomInfoHtmlText = Types.pString(oAppDataSection.BottomInfoHtmlText, this.BottomInfoHtmlText);
			this.CustomLogoUrl = Types.pString(oAppDataSection.CustomLogoUrl, this.CustomLogoUrl);
			this.RecoveryEmail = Types.pString(oAppDataSection.RecoveryEmail, this.RecoveryEmail);
			this.RecoveryEmailConfirmed = Types.pBool(oAppDataSection.RecoveryEmailConfirmed, this.RecoveryEmailConfirmed);
		}
	},

	update: function (sRecoveryEmail)
	{
		this.RecoveryEmail = Types.pString(sRecoveryEmail, this.RecoveryEmail);
		this.RecoveryEmailConfirmed = this.RecoveryEmail === '';
	}
};


/***/ }),

/***/ "Y4Lk":
/*!*****************************************************!*\
  !*** ./modules/StandardResetPassword/js/manager.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




module.exports = function (oAppData) {
	var
		_ = __webpack_require__(/*! underscore */ "C3HO"),

		TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),

		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		
		Settings = __webpack_require__(/*! modules/StandardResetPassword/js/Settings.js */ "Q5UF"),
		
		bAnonymousUser = App.getUserRole() === Enums.UserRole.Anonymous
	;
	
	Settings.init(oAppData);
	
	if (!App.isPublic() && bAnonymousUser)
	{
		var fAddControllersToLoginScreen = function () {
			App.subscribeEvent('AnonymousUserForm::PopulateBeforeButtonsControllers', _.bind(function (oParams) {
				if (_.isFunction(oParams.RegisterBeforeButtonsController) && (oParams.ModuleName === 'StandardLoginFormWebclient' || oParams.ModuleName === 'MailLoginFormWebclient'))
				{
					oParams.RegisterBeforeButtonsController(__webpack_require__(/*! modules/StandardResetPassword/js/views/ForgotPasswordController.js */ "8fb7"));
				}
			}, this));
		};
		
		if (App.isMobile())
		{
			return {
				start: function (ModulesManager)
				{
					fAddControllersToLoginScreen();
				},
				getScreens: function () {
					var
						oScreens = {},
						oLoginScreenView = __webpack_require__(/*! modules/StandardResetPassword/js/views/ResetPasswordFormView.js */ "goeb")
					;
					if (oLoginScreenView)
					{
						oLoginScreenView.ViewTemplate = 'StandardResetPassword_ResetPasswordMobileFormView';
						oScreens[Settings.HashModuleName] = function () {
							return oLoginScreenView;
						};
					}
					return oScreens;
				}
			};
		}
		else
		{
			return {
				start: function (ModulesManager)
				{
					fAddControllersToLoginScreen();
				},
				getScreens: function () {
					var oScreens = {};
					oScreens[Settings.HashModuleName] = function () {
						return __webpack_require__(/*! modules/StandardResetPassword/js/views/ResetPasswordFormView.js */ "goeb");
					};
					return oScreens;
				}
			};
		}
	}
	else if (App.isUserNormalOrTenant() && !App.isMobile())
	{
		return {
			start: function (ModulesManager) {
				if (ModulesManager.isModuleEnabled('SecuritySettingsWebclient'))
				{
					ModulesManager.run(
						'SecuritySettingsWebclient',
						'registerSecuritySettingsSection', 
						[
							function () {
								var oResetPasswordSettingsFormView = __webpack_require__(/*! modules/StandardResetPassword/js/views/ResetPasswordSettingsFormView.js */ "mQBM");
								oResetPasswordSettingsFormView.ViewTemplate = 'StandardResetPassword_ResetPasswordSettingsSectionFormView';
								return oResetPasswordSettingsFormView;
							},
							'StandardResetPassword'
						]
					);
				}
				else
				{
					ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [
						function () { return __webpack_require__(/*! modules/StandardResetPassword/js/views/ResetPasswordSettingsFormView.js */ "mQBM"); },
						Settings.HashModuleName, 
						TextUtils.i18n('STANDARDRESETPASSWORD/LABEL_SETTINGS_TAB')
					]);
				}
			}
		};
	}

	return null;
};


/***/ }),

/***/ "GVZc":
/*!**************************************************************************!*\
  !*** ./modules/StandardResetPassword/js/popups/SetRecoveryEmailPopup.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "M4cL");


var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),

	AddressUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Address.js */ "kG5I"),
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),

	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),

	Settings = __webpack_require__(/*! modules/StandardResetPassword/js/Settings.js */ "Q5UF")
;

/**
 * @constructor
 */
function CSetRecoveryEmailPopup()
{
	CAbstractPopup.call(this);

	this.recoveryEmail = ko.observable('');
	this.recoveryEmailFocus = ko.observable(false);
	this.password = ko.observable('');
	this.passwordFocus = ko.observable(false);
	this.updateMode = ko.observable(false);
	this.loading = ko.observable(false);
	
	this.recoveryEmailInfo = ko.observable('');
}

_.extendOwn(CSetRecoveryEmailPopup.prototype, CAbstractPopup.prototype);

CSetRecoveryEmailPopup.prototype.PopupTemplate = 'StandardResetPassword_SetRecoveryEmailPopup';

CSetRecoveryEmailPopup.prototype.onOpen = function (fCallback)
{
	this.fillRecoveryEmailInfo();
	this.updateMode(Types.isNonEmptyString(Settings.RecoveryEmail));
	this.fCallback = fCallback;
	this.recoveryEmailFocus(true);
};

CSetRecoveryEmailPopup.prototype.onClose = function ()
{
	this.recoveryEmail('');
	this.password('');
};

CSetRecoveryEmailPopup.prototype.fillRecoveryEmailInfo = function ()
{
	if (Settings.RecoveryEmail !== '')
	{
		this.recoveryEmailInfo(TextUtils.i18n('STANDARDRESETPASSWORD/INFO_YOUR_CURRENT_RECOVERY_EMAIL', {
			'EMAIL': Settings.RecoveryEmail
		}));
	}
	else
	{
		this.recoveryEmailInfo('');
	}
};

CSetRecoveryEmailPopup.prototype.save = function ()
{
	var sEmail = $.trim(this.recoveryEmail());
	if (sEmail !== '' && !AddressUtils.isCorrectEmail(sEmail))
	{
		Screens.showError(TextUtils.i18n('STANDARDRESETPASSWORD/ERROR_INCORRECT_EMAIL'));
		this.recoveryEmailFocus(true);
		return;
	}
	if ($.trim(this.password()) === '')
	{
		Screens.showError(TextUtils.i18n('STANDARDRESETPASSWORD/ERROR_EMPTY_PASSWORD'));
		this.passwordFocus(true);
		return;
	}
	this.loading(true);
	Ajax.send('StandardResetPassword', 'UpdateSettings',
		{
			'RecoveryEmail': this.recoveryEmail(),
			'Password': this.password()
		},
		this.onUpdateSettingsResponse,
		this
	);
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CSetRecoveryEmailPopup.prototype.onUpdateSettingsResponse = function (oResponse, oRequest)
{
	this.loading(false);
	if (Types.isString(oResponse.Result))
	{
		if (_.isFunction(this.fCallback))
		{
			this.fCallback(oResponse.Result);
		}
		this.closePopup();
	}
	else
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('STANDARDRESETPASSWORD/ERROR_SET_RECOVERY_EMAIL'));
	}
};

module.exports = new CSetRecoveryEmailPopup();


/***/ }),

/***/ "8fb7":
/*!****************************************************************************!*\
  !*** ./modules/StandardResetPassword/js/views/ForgotPasswordController.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var Settings = __webpack_require__(/*! modules/StandardResetPassword/js/Settings.js */ "Q5UF");

/**
 * @constructor
 */
function CForgotPasswordController()
{
	this.sResetPasswordHash = '#' + Settings.HashModuleName;
}

CForgotPasswordController.prototype.ViewTemplate = 'StandardResetPassword_ForgotPasswordController';

module.exports = new CForgotPasswordController();


/***/ }),

/***/ "goeb":
/*!*************************************************************************!*\
  !*** ./modules/StandardResetPassword/js/views/ResetPasswordFormView.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	$ = __webpack_require__(/*! jquery */ "M4cL"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	AddressUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Address.js */ "kG5I"),
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
	
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
	Routing = __webpack_require__(/*! modules/CoreWebclient/js/Routing.js */ "W66n"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
	UserSettings = __webpack_require__(/*! modules/CoreWebclient/js/Settings.js */ "OfVV"),
	
	CAbstractScreenView = __webpack_require__(/*! modules/CoreWebclient/js/views/CAbstractScreenView.js */ "doeu"),

	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Settings = __webpack_require__(/*! modules/StandardResetPassword/js/Settings.js */ "Q5UF"),
	
	$html = $('html')
;

/**
 * @constructor
 */
function CResetPasswordFormView()
{
	CAbstractScreenView.call(this, 'StandardResetPassword');
	
	this.sResetPasswordHash = '#' + Settings.HashModuleName;
	
	this.sCustomLogoUrl = Settings.CustomLogoUrl;
	this.sBottomInfoHtmlText = Settings.BottomInfoHtmlText;
	
	this.email = ko.observable('');
	this.emailFocus = ko.observable(false);

	this.newPassword = ko.observable('');
	this.newPasswordFocus = ko.observable(false);

	this.confirmPassword = ko.observable('');
	this.confirmPasswordFocus = ko.observable(false);
	
	this.step = ko.observable(1);
	this.gettingUserPublicId = ko.observable(false);
	this.resetPasswordHashUserPublicId = ko.observable('');
	this.resetPasswordHashInfo = ko.computed(function () {
		if (this.resetPasswordHashUserPublicId())
		{
			return TextUtils.i18n('STANDARDRESETPASSWORD/INFO_RESET_PASSWORD_HASH', {
				'USERNAME': this.resetPasswordHashUserPublicId(),
				'SITE_NAME': UserSettings.SiteName
			});
		}
		if (!this.gettingUserPublicId())
		{
			return TextUtils.i18n('STANDARDRESETPASSWORD/ERROR_LINK_NOT_VALID');
		}
		return '';
	}, this);
	this.recoverThroughEmailText = ko.observable('');
	this.sendRecoveryEmailText = ko.observable('');

	this.gettingRecoveryEmail = ko.observable(false);
	this.continueCommand = Utils.createCommand(this, this.continue, function () { return !this.gettingRecoveryEmail(); });

	this.sendingRecoveryEmail = ko.observable(false);
	this.sendRecoveryEmailCommand = Utils.createCommand(this, this.sendRecoveryEmail, function () { return !this.sendingRecoveryEmail(); });
	
	this.changingPassword = ko.observable(false);
	this.changePasswordCommand = Utils.createCommand(this, this.changePassword, function () { return !this.changingPassword(); });
	this.passwordChanged = ko.observable(false);
	
	this.shake = ko.observable(false).extend({'autoResetToFalse': 800});
	
	App.broadcastEvent('StandardResetPassword::ConstructView::after', {'Name': this.ViewConstructorName, 'View': this});
}

_.extendOwn(CResetPasswordFormView.prototype, CAbstractScreenView.prototype);

CResetPasswordFormView.prototype.ViewTemplate = 'StandardResetPassword_ResetPasswordFormView';
CResetPasswordFormView.prototype.ViewConstructorName = 'CResetPasswordFormView';

CResetPasswordFormView.prototype.onBind = function ()
{
	$html.addClass('non-adjustable-valign');
};

CResetPasswordFormView.prototype.getResetPasswordHash = function () {
	var aHashArray = Routing.getCurrentHashArray();
	if (aHashArray.length >= 2 && aHashArray[0] === Settings.HashModuleName)
	{
		return aHashArray[1];
	}
	return '';
},

CResetPasswordFormView.prototype.onRoute = function ()
{
	var sResetPasswordHash = this.getResetPasswordHash();
	this.resetPasswordHashUserPublicId('');
	if (Types.isNonEmptyString(sResetPasswordHash))
	{
		this.step(0);
		this.gettingUserPublicId(true);
		Ajax.send('StandardResetPassword', 'GetUserPublicId', { 'Hash': sResetPasswordHash }, function (oResponse) {
			this.gettingUserPublicId(false);
			if (Types.isNonEmptyString(oResponse.Result))
			{
				this.resetPasswordHashUserPublicId(oResponse.Result);
			}
		}, this);
	}
	else
	{
		this.step(1);
		_.delay(_.bind(function(){
			if (this.email() === '')
			{
				this.emailFocus(true);
			}
		},this), 1);
	}
};

CResetPasswordFormView.prototype.continue = function ()
{
	var sEmail = $.trim(this.email());
	if (sEmail === '')
	{
		this.emailFocus(true);
		this.shake(true);
	}
	else if (!AddressUtils.isCorrectEmail(sEmail))
	{
		Screens.showError(TextUtils.i18n('STANDARDRESETPASSWORD/ERROR_INCORRECT_EMAIL'));
	}
	else
	{
		this.gettingRecoveryEmail(true);
		Ajax.send('StandardResetPassword', 'GetStarredRecoveryEmailAddress', { UserPublicId: this.email() }, function (oResponse, oRequest) {
			this.gettingRecoveryEmail(false);
			if (Types.isNonEmptyString(oResponse && oResponse.Result))
			{
				this.step(2);
				this.recoverThroughEmailText(TextUtils.i18n('STANDARDRESETPASSWORD/INFO_EMAIL_RECOVER_SENT', {
					'USERNAME': this.email(),
					'EMAIL': oResponse && oResponse.Result,
					'SITE_NAME': UserSettings.SiteName
				}));
				this.sendRecoveryEmailText(TextUtils.i18n('STANDARDRESETPASSWORD/INFO_RECOVERY_LINK_SENT', {
					'USERNAME': this.email(),
					'EMAIL': oResponse && oResponse.Result,
					'SITE_NAME': UserSettings.SiteName
				}));
			}
			else
			{
				Api.showErrorByCode(oResponse, TextUtils.i18n('STANDARDRESETPASSWORD/ERROR_RECOVERY_EMAIL_NOT_FOUND'));
			}
		}, this);
	}
};

CResetPasswordFormView.prototype.backToStep1 = function ()
{
	this.recoverThroughEmailText('');
	this.sendRecoveryEmailText('');
	this.step(1);
	this.emailFocus(true);
};

CResetPasswordFormView.prototype.backToStepLogin = function ()
{
	Routing.setHash('');
};

CResetPasswordFormView.prototype.sendRecoveryEmail = function ()
{
	this.sendingRecoveryEmail(true);
	Ajax.send('StandardResetPassword', 'SendPasswordResetEmail', { UserPublicId: this.email() }, function (oResponse, oRequest) {
		this.sendingRecoveryEmail(false);
		if (oResponse && oResponse.Result)
		{
			this.step(3);
		}
		else
		{
			Api.showErrorByCode(oResponse, TextUtils.i18n('STANDARDRESETPASSWORD/ERROR_RECOVERY_EMAIL_NOT_SENT'));
		}
	}, this);
};

CResetPasswordFormView.prototype.changePassword = function ()
{
	if ($.trim(this.newPassword()) === '')
	{
		this.newPasswordFocus(true);
		this.shake(true);
	}
	else if ($.trim(this.confirmPassword()) === '')
	{
		this.confirmPasswordFocus(true);
		this.shake(true);
	}
	else if (this.newPassword() !== this.confirmPassword())
	{
		Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_PASSWORDS_DO_NOT_MATCH'));
	}
	else
	{
		this.changingPassword(true);
		this.passwordChanged(false);
		Ajax.send('StandardResetPassword', 'ChangePassword', { 'Hash': this.getResetPasswordHash(), 'NewPassword': this.newPassword() }, function (oResponse, oRequest) {
			this.changingPassword(false);
			if (oResponse && oResponse.Result === true)
			{
				this.passwordChanged(true);
			}
			else
			{
				Api.showErrorByCode(oResponse, TextUtils.i18n('STANDARDRESETPASSWORD/ERROR_PASSWORD_CHANGE'));
			}
		}, this);
	}
};

module.exports = new CResetPasswordFormView();


/***/ }),

/***/ "mQBM":
/*!*********************************************************************************!*\
  !*** ./modules/StandardResetPassword/js/views/ResetPasswordSettingsFormView.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var
	_ = __webpack_require__(/*! underscore */ "C3HO"),
	ko = __webpack_require__(/*! knockout */ "p09A"),
	
	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	Types = __webpack_require__(/*! modules/CoreWebclient/js/utils/Types.js */ "KC/L"),
	
	ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
	Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),

	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	SetRecoveryEmailPopup = __webpack_require__(/*! modules/StandardResetPassword/js/popups/SetRecoveryEmailPopup.js */ "GVZc"),
	Settings = __webpack_require__(/*! modules/StandardResetPassword/js/Settings.js */ "Q5UF")
;

/**
 * @constructor
 */
function CResetPasswordSettingsFormView()
{
	CAbstractSettingsFormView.call(this, 'StandardResetPassword');
	
	this.recoveryEmail = ko.observable(Settings.RecoveryEmail);
	this.recoveryEmailConfirmed = ko.observable(Settings.RecoveryEmailConfirmed);
	this.recoveryEmailInfo = ko.computed(function () {
		if (this.recoveryEmail() !== '')
		{
			var sLangName = this.recoveryEmailConfirmed() ? 'INFO_YOU_HAVE_RECOVERY_EMAIL' : 'INFO_YOU_HAVE_NOT_CONFIRMED_RECOVERY_EMAIL';
			return TextUtils.i18n('STANDARDRESETPASSWORD/' + sLangName, {
				'EMAIL': this.recoveryEmail()
			});
		}
		return TextUtils.i18n('STANDARDRESETPASSWORD/INFO_NOT_SET_RECOVERY_EMAIL');
	}, this);
}

_.extendOwn(CResetPasswordSettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CResetPasswordSettingsFormView.prototype.ViewTemplate = 'StandardResetPassword_ResetPasswordSettingsFormView';

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


/***/ })

}]);