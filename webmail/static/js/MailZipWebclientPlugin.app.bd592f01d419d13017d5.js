"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[13],{

/***/ "NAax":
/*!******************************************************!*\
  !*** ./modules/MailZipWebclientPlugin/js/manager.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = function (appData) {
	const
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
		isZipAllowed = appData['MailZipWebclientPlugin'] ? !!appData['MailZipWebclientPlugin'].AllowZip : false
	;

	if (isZipAllowed && App.isUserNormalOrTenant()) {
		const AttachmentUtils = __webpack_require__(/*! modules/MailZipWebclientPlugin/js/utils/Attachment.js */ "D5cQ");
		return {
			start: function (ModulesManager) {
				App.subscribeEvent('MailWebclient::CopyFileProperties::after', function (params) {
					if (params) {
						AttachmentUtils.copyProperties(params);
					}
				});

				App.subscribeEvent('MailWebclient::ParseFile::after', function (file) {
					AttachmentUtils.parse(file);
				});

				App.subscribeEvent('MailWebclient::AddAllAttachmentsDownloadMethod', function (fAddAllAttachmentsDownloadMethod) {
					fAddAllAttachmentsDownloadMethod(AttachmentUtils.getAllAttachmentsDownloadMethod());
				});
			}
		};
	}

	return null;
};


/***/ }),

/***/ "D5cQ":
/*!***************************************************************!*\
  !*** ./modules/MailZipWebclientPlugin/js/utils/Attachment.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const
	ko = __webpack_require__(/*! knockout */ "p09A"),

	TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
	UrlUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Url.js */ "Tt1R"),

	Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
	Api = __webpack_require__(/*! modules/CoreWebclient/js/Api.js */ "/QeJ"),
	Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT")
;

function getActionData(file) {
	return {
		Text: ko.computed(function () {
			if (this.subFilesExpanded()) {
				return TextUtils.i18n('COREWEBCLIENT/ACTION_COLLAPSE_FILE');
			}
			if (this.mailzipSubFilesLoading()) {
				return TextUtils.i18n('COREWEBCLIENT/INFO_LOADING');
			}
			return TextUtils.i18n('COREWEBCLIENT/ACTION_EXPAND_FILE');
		}, file),
		Handler: function () {
			if (!this.mailzipSubFilesLoading()) {
				if (this.subFilesExpanded()) {
					this.subFilesExpanded(false);
				} else {
					this.mailzipExpandFile();
				}
			}
		}.bind(file)
	};
}

module.exports = {
	parse(file) {
		if (file && typeof file.addAction === 'function' && file.extension() === 'zip') {
			file.mailzipSubFilesLoaded = ko.observable(false);
			file.mailzipSubFilesLoading = ko.observable(false);
			file.mailzipExpandFile = function () {
				if (!this.mailzipSubFilesLoaded() && !this.mailzipSubFilesLoading()) {
					this.mailzipSubFilesLoading(true);
					Ajax.send('MailZipWebclientPlugin', 'ExpandFile', { 'Hash': this.hash() }, function (response) {
						this.mailzipSubFilesLoading(false);
						const subFilesData = response.Result && Array.isArray(response.Result.Files) ? response.Result.Files : [];
						const subFiles = [];
						subFilesData.forEach((fileData) => {
							const subFile = file.getNewInstance();
							subFile.parse(fileData);
							subFiles.push(subFile);
						});
						this.subFiles(subFiles);
						this.mailzipSubFilesLoaded(true);
						this.subFilesExpanded(true);
					}, this);
				} else {
					this.subFilesExpanded(true);
				}
			};

			file.removeAction('view');
			file.addAction('expand', true, getActionData(file));
		}
	},

	copyProperties({ file, source }) {
		if (file && typeof file.addAction === 'function' && file.extension() === 'zip') {
			file.mailzipSubFilesLoaded = ko.observable(source.mailzipSubFilesLoaded());
			file.mailzipSubFilesLoading = ko.observable(source.mailzipSubFilesLoading());
			file.mailzipExpandFile = source.mailzipExpandFile.bind(file);

			file.removeAction('expand');
			file.addAction('expand', true, getActionData(file));
		}
	},

	getAllAttachmentsDownloadMethod() {
		return {
			Text: TextUtils.i18n('MAILZIPWEBCLIENTPLUGIN/ACTION_DOWNLOAD_ATTACHMENTS_ZIP'),
			Handler: function (accountId, hashes) {
				Screens.showLoading(TextUtils.i18n('COREWEBCLIENT/INFO_LOADING'));
				Ajax.send('MailZipWebclientPlugin', 'SaveAttachments', {
					AccountID: accountId,
					Attachments: hashes
				}, function (response) {
					Screens.hideLoading();
					if (response.Result && response.Result.Actions && response.Result.Actions.download) {
						var sDownloadLink = response.Result.Actions.download.url;
						UrlUtils.downloadByUrl(sDownloadLink);
					} else {
						Api.showErrorByCode(response);
					}
				});
			}
		};
	}
};


/***/ })

}]);