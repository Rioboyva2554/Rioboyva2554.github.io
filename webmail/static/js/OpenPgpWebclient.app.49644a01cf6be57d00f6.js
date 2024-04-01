"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[16],{

/***/ "u9h2":
/*!************************************************!*\
  !*** ./modules/OpenPgpWebclient/js/manager.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function IsPgpSupported() {
  return !!(window.crypto && window.crypto.getRandomValues);
}
module.exports = function (oAppData) {
  if (!IsPgpSupported()) {
    return null;
  }
  var Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
    App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
    Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
    ImportKeyPopup = null // ImportKeyPopup requires the OpenPGP library, so it should be required after verifying PGP support only
    // Ajax = require('modules/CoreWebclient/js/Ajax.js')
  ;
  if (App.getUserRole() !== Enums.UserRole.SuperAdmin) {
    var _ = __webpack_require__(/*! underscore */ "C3HO"),
      TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
      Settings = __webpack_require__(/*! modules/OpenPgpWebclient/js/Settings.js */ "W4X/");
    Settings.init(oAppData);
    return {
      start: function start(ModulesManager) {
        var _this = this;
        ImportKeyPopup = __webpack_require__(/*! modules/OpenPgpWebclient/js/popups/ImportKeyPopup.js */ "Aai9");
        App.subscribeEvent('MailWebclient::RegisterMessagePaneController', function (fRegisterMessagePaneController) {
          fRegisterMessagePaneController(__webpack_require__(/*! modules/OpenPgpWebclient/js/views/MessageControlsView.js */ "XaEU"), 'BeforeMessageHeaders');
        });
        if (App.isMobile()) {
          ModulesManager.run('MailMobileWebclient', 'registerComposeToolbarController', [__webpack_require__(/*! modules/OpenPgpWebclient/js/views/ComposeButtonsView.js */ "Lz/N")]);
        } else {
          ModulesManager.run('MailWebclient', 'registerComposeToolbarController', [__webpack_require__(/*! modules/OpenPgpWebclient/js/views/ComposeButtonsView.js */ "Lz/N")]);
        }
        ModulesManager.run('SettingsWebclient', 'registerSettingsTab', [function () {
          return __webpack_require__(/*! modules/OpenPgpWebclient/js/views/OpenPgpSettingsFormView.js */ "JYH5");
        }, Settings.HashModuleName, TextUtils.i18n('OPENPGPWEBCLIENT/LABEL_SETTINGS_TAB')]);
        App.subscribeEvent('MailWebclient::ParseFile::after', function (oFile) {
          if (oFile && _.isFunction(oFile.addAction) && Utils.getFileExtension(oFile.fileName()) === 'asc' && oFile.content && oFile.content()) {
            var OpenPgp = __webpack_require__(/*! modules/OpenPgpWebclient/js/OpenPgp.js */ "F4aK"),
              SendKeyPopup = __webpack_require__(/*! modules/OpenPgpWebclient/js/popups/SendKeyPopup.js */ "zAR3"),
              fOnSuccessCallback = function fOnSuccessCallback() {
                if (oFile.folderName() && oFile.messageUid()) {
                  var sUserEmail = App.currentAccountEmail ? App.currentAccountEmail() : '';
                  var aKeys = OpenPgp.getPublicKeysIfExistsByEmail(sUserEmail);
                  if (aKeys && aKeys[0]) {
                    ModulesManager.run('MailWebclient', 'getMessage', [oFile.folderName(), oFile.messageUid(), function (oMessage) {
                      Popups.showPopup(SendKeyPopup, [oMessage, aKeys[0]]);
                    }]);
                  }
                }
              },
              oActionData = {
                'Text': TextUtils.i18n('OPENPGPWEBCLIENT/ACTION_FILE_IMPORT_KEY'),
                'Handler': function Handler() {
                  Popups.showPopup(ImportKeyPopup, [{
                    armor: oFile.content(),
                    onSuccessCallback: fOnSuccessCallback
                  }]);
                }
              };
            oFile.addAction('import', true, oActionData);
            oFile.removeAction('view');
          }
        });
        App.subscribeEvent('FilesWebclient::ParseFile::after', function (aParams) {
          var oFile = aParams[0];
          if (oFile && _.isFunction(oFile.addAction) && Utils.getFileExtension(oFile.fileName()) === 'asc' && oFile.content && oFile.content()) {
            var oActionData = {
              'Text': TextUtils.i18n('OPENPGPWEBCLIENT/ACTION_FILE_IMPORT_KEY'),
              'Handler': function Handler() {
                Popups.showPopup(ImportKeyPopup, [{
                  armor: oFile.content()
                }]);
              }
            };
            oFile.addAction('import', true, oActionData);
          }
        });
        var createOrUpdateContactResult = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(oParams) {
            var oContact, fCallback, oKey, oResult;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  oContact = oParams.Contact, fCallback = oParams.Callback, oKey = null, oResult = {
                    Error: false,
                    ErrorMessage: ''
                  };
                  if (!(oContact.PublicPgpKey != '')) {
                    _context.next = 6;
                    break;
                  }
                  _context.next = 4;
                  return _this.getKeyInfo(oContact.PublicPgpKey);
                case 4:
                  oKey = _context.sent;
                  if (oKey) {
                    if (oKey.getEmail() !== oContact.ViewEmail) {
                      oResult.Error = true;
                      oResult.ErrorMessage = TextUtils.i18n('OPENPGPWEBCLIENT/ERROR_EMAILS_DO_NOT_MATCH');
                    } else if (oKey.isPrivate()) {
                      oResult.Error = true;
                      oResult.ErrorMessage = TextUtils.i18n('OPENPGPWEBCLIENT/ERROR_ADDED_KEY_NOT_PUBLIC');
                    }
                  } else {
                    oResult.Error = true;
                    oResult.ErrorMessage = TextUtils.i18n('OPENPGPWEBCLIENT/ERROR_IMPORT_NO_KEY_FOUND');
                  }
                case 6:
                  fCallback(oResult);
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return function createOrUpdateContactResult(_x) {
            return _ref.apply(this, arguments);
          };
        }();

        // if (Settings.enableOpenPgpInMail())
        // {
        App.subscribeEvent('ContactsWebclient::beforeCreateContactRequest', createOrUpdateContactResult);
        App.subscribeEvent('ContactsWebclient::beforeUpdateContactRequest', createOrUpdateContactResult);
        // }
      },
      getOpenPgpInMailEnabledObservable: function getOpenPgpInMailEnabledObservable() {
        return Settings.enableOpenPgpInMail;
      },
      getKeyInfo: function getKeyInfo(sValue, fCallback) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var openpgp, COpenPgpKey, oPublicKey, oResult;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                openpgp = __webpack_require__(/*! modules/CoreWebclient/js/vendors/openpgp.js */ "M0hr"), COpenPgpKey = __webpack_require__(/*! modules/OpenPgpWebclient/js/COpenPgpKey.js */ "q1Fa"), oPublicKey = null, oResult = null;
                _context2.next = 3;
                return openpgp.key.readArmored(sValue);
              case 3:
                oPublicKey = _context2.sent;
                if (oPublicKey && !oPublicKey.err && oPublicKey.keys && oPublicKey.keys[0]) {
                  oResult = new COpenPgpKey(oPublicKey.keys[0]);
                }
                if (_.isFunction(fCallback)) {
                  fCallback(oResult);
                }
                return _context2.abrupt("return", oResult);
              case 7:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      getOpenPgpEncryptor: function getOpenPgpEncryptor() {
        var OpenPgp = __webpack_require__(/*! modules/OpenPgpWebclient/js/OpenPgp.js */ "F4aK");
        return OpenPgp;
      },
      getPgpKeyControlsView: function getPgpKeyControlsView(afterRemoveContactKeyHandler) {
        var pgpKeyControlsView = __webpack_require__(/*! modules/OpenPgpWebclient/js/views/PgpKeyControlsView.js */ "/jAl");
        pgpKeyControlsView.setAfterRemoveContactKeyHandler(afterRemoveContactKeyHandler);
        return pgpKeyControlsView;
      },
      getSuggestionsAutocompleteFilteredCallback: function getSuggestionsAutocompleteFilteredCallback(fSuggestionsAutocompleteCallback) {
        return function (oRequest, fResponse) {
          var fResponseWrapper = function fResponseWrapper(oItems) {
            /*---here we can filter or edit response items---*/
            var OpenPgp = __webpack_require__(/*! modules/OpenPgpWebclient/js/OpenPgp.js */ "F4aK");
            var aPublicKeysEmails = OpenPgp.getPublicKeys().map(function (oKey) {
              return oKey.getEmail();
            });
            oItems.forEach(function (oItem) {
              if (!oItem.hasKey) {
                oItem.hasKey = aPublicKeysEmails.includes(oItem.email);
              }
            });
            /*-----------------------------------------------*/
            fResponse(oItems);
          };
          fSuggestionsAutocompleteCallback(oRequest, fResponseWrapper);
        };
      },
      getPrivateKeyPassword: function getPrivateKeyPassword(sEmail, fCallback) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var OpenPgp, sPrivateKeyPassword;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                OpenPgp = __webpack_require__(/*! modules/OpenPgpWebclient/js/OpenPgp.js */ "F4aK");
                _context3.next = 3;
                return OpenPgp.getPrivateKeyPassword(sEmail);
              case 3:
                sPrivateKeyPassword = _context3.sent;
                fCallback(sPrivateKeyPassword);
              case 5:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      encryptSign: function encryptSign(bEncrypt, bSign, sData, aPrincipalsEmail, contactsUUIDs, fOkCallback) {
        var sFromEmail = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
        var sPrivateKeyPassword = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
        var Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
          ErrorsUtils = __webpack_require__(/*! modules/OpenPgpWebclient/js/utils/Errors.js */ "oJ4D"),
          Enums = __webpack_require__(/*! modules/OpenPgpWebclient/js/Enums.js */ "quQ1"),
          OpenPgp = __webpack_require__(/*! modules/OpenPgpWebclient/js/OpenPgp.js */ "F4aK");
        var sPrivateEmail = bSign ? sFromEmail : '',
          sOkReport = '',
          sPgpAction = '',
          fOkHandler = _.bind(function (oRes) {
            if (_.isFunction(fOkCallback)) {
              fOkCallback(oRes.result, bEncrypt);
            }
          }, this),
          fErrorHandler = function fErrorHandler(oRes) {
            ErrorsUtils.showPgpErrorByCode(oRes, sPgpAction);
          };
        if (bEncrypt) {
          if (aPrincipalsEmail.length === 0) {
            Screens.showError(TextUtils.i18n('OPENPGPWEBCLIENT/ERROR_TO_ENCRYPT_SPECIFY_RECIPIENTS'));
          } else {
            var aUserEmail = [sFromEmail],
              aEmailForEncrypt = OpenPgp.findKeysByEmails(aUserEmail, true).length > 0 ? _.union(aPrincipalsEmail, aUserEmail) : aPrincipalsEmail;
            if (bSign) {
              sPgpAction = Enums.PgpAction.EncryptSign;
              OpenPgp.signAndEncrypt(sData, sPrivateEmail, aEmailForEncrypt, sPrivateKeyPassword, fOkHandler, fErrorHandler, contactsUUIDs);
            } else {
              sPgpAction = Enums.PgpAction.Encrypt;
              OpenPgp.encrypt(sData, aEmailForEncrypt, fOkHandler, fErrorHandler, contactsUUIDs);
            }
          }
        } else if (bSign) {
          sPgpAction = Enums.PgpAction.Sign;
          OpenPgp.sign(sData, sPrivateEmail, fOkHandler, fErrorHandler, sPrivateKeyPassword);
        }
      }
    };
  }
  return null;
};

/***/ }),

/***/ "AMrN":
/*!************************************************************!*\
  !*** ./modules/OpenPgpWebclient/js/popups/EncryptPopup.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
  Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  ErrorsUtils = __webpack_require__(/*! modules/OpenPgpWebclient/js/utils/Errors.js */ "oJ4D"),
  Enums = __webpack_require__(/*! modules/OpenPgpWebclient/js/Enums.js */ "quQ1"),
  OpenPgp = __webpack_require__(/*! modules/OpenPgpWebclient/js/OpenPgp.js */ "F4aK");

/**
 * @constructor
 */
function CEncryptPopup() {
  CAbstractPopup.call(this);
  this.data = ko.observable('');
  this.fromEmail = ko.observable('');
  this.emails = ko.observableArray([]);
  this.contactsUUIDs = [];
  this.successEncryptCallback = function () {};
  this.needToSign = ko.observable(true);
  this.needToEncrypt = ko.observable(true);
  this.signEncryptButtonText = ko.computed(function () {
    var text = TextUtils.i18n('OPENPGPWEBCLIENT/ACTION_SIGN_ENCRYPT');
    if (this.needToSign() && !this.needToEncrypt()) {
      text = TextUtils.i18n('OPENPGPWEBCLIENT/ACTION_SIGN');
    }
    if (!this.needToSign() && this.needToEncrypt()) {
      text = TextUtils.i18n('OPENPGPWEBCLIENT/ACTION_ENCRYPT');
    }
    return text;
  }, this);
  this.isEnableSignEncrypt = ko.computed(function () {
    return this.needToSign() || this.needToEncrypt();
  }, this);
  this.signEncryptCommand = Utils.createCommand(this, this.executeSignEncrypt, this.isEnableSignEncrypt);
}
_.extendOwn(CEncryptPopup.prototype, CAbstractPopup.prototype);
CEncryptPopup.prototype.PopupTemplate = 'OpenPgpWebclient_EncryptPopup';

/**
 * @param {string} dataToEncrypt
 * @param {string} fromEmail
 * @param {array} resipientsInfo
 * @param {function} successEncryptCallback
 */
CEncryptPopup.prototype.onOpen = function (dataToEncrypt, fromEmail, resipientsInfo, successEncryptCallback) {
  this.data(dataToEncrypt);
  this.fromEmail(fromEmail);
  this.emails(resipientsInfo.map(function (info) {
    return info.email;
  }));
  this.contactsUUIDs = resipientsInfo.map(function (info) {
    return info.uuid;
  });
  this.successEncryptCallback = _.isFunction(successEncryptCallback) ? successEncryptCallback : function () {};
  this.needToSign(true);
  this.needToEncrypt(true);
};
CEncryptPopup.prototype.executeSignEncrypt = function () {
  var _this = this;
  var dataToEncrypt = this.data(),
    privateEmail = this.needToSign() ? this.fromEmail() : '',
    successHandler = function successHandler(encryptResult) {
      Screens.showReport(okReport);
      _this.closePopup();
      _this.successEncryptCallback(encryptResult.result, _this.needToEncrypt());
    },
    errorHandler = function errorHandler(encryptResult) {
      if (!encryptResult || !encryptResult.userCanceled) {
        ErrorsUtils.showPgpErrorByCode(encryptResult, pgpAction);
      }
    };
  var okReport = '',
    pgpAction = '';
  if (this.needToEncrypt()) {
    if (this.emails().length === 0) {
      Screens.showError(TextUtils.i18n('OPENPGPWEBCLIENT/ERROR_TO_ENCRYPT_SPECIFY_RECIPIENTS'));
    } else {
      var userEmails = [this.fromEmail()],
        userPublicKeys = OpenPgp.findKeysByEmails(userEmails, true),
        principalsEmails = userPublicKeys.length > 0 ? _.union(this.emails(), userEmails) : this.emails();
      if (this.needToSign()) {
        pgpAction = Enums.PgpAction.EncryptSign;
        okReport = TextUtils.i18n('OPENPGPWEBCLIENT/REPORT_MESSAGE_SIGNED_ENCRYPTED_SUCCSESSFULLY');
        OpenPgp.signAndEncrypt(dataToEncrypt, privateEmail, principalsEmails, '', successHandler, errorHandler, this.contactsUUIDs);
      } else {
        pgpAction = Enums.PgpAction.Encrypt;
        okReport = TextUtils.i18n('OPENPGPWEBCLIENT/REPORT_MESSAGE_ENCRYPTED_SUCCSESSFULLY');
        OpenPgp.encrypt(dataToEncrypt, principalsEmails, successHandler, errorHandler, this.contactsUUIDs);
      }
    }
  } else if (this.needToSign()) {
    pgpAction = Enums.PgpAction.Sign;
    okReport = TextUtils.i18n('OPENPGPWEBCLIENT/REPORT_MESSAGE_SIGNED_SUCCSESSFULLY');
    OpenPgp.sign(dataToEncrypt, privateEmail, successHandler, errorHandler, '');
  }
};
CEncryptPopup.prototype.cancelPopup = function () {
  this.closePopup();
};
module.exports = new CEncryptPopup();

/***/ }),

/***/ "wb42":
/*!****************************************************************!*\
  !*** ./modules/OpenPgpWebclient/js/popups/GenerateKeyPopup.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var _ = __webpack_require__(/*! underscore */ "C3HO"),
  $ = __webpack_require__(/*! jquery */ "M4cL"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  AddressUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Address.js */ "kG5I"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  ErrorsUtils = __webpack_require__(/*! modules/OpenPgpWebclient/js/utils/Errors.js */ "oJ4D"),
  Enums = __webpack_require__(/*! modules/OpenPgpWebclient/js/Enums.js */ "quQ1"),
  OpenPgp = __webpack_require__(/*! modules/OpenPgpWebclient/js/OpenPgp.js */ "F4aK");

/**
 * @constructor
 */
function CGenerateKeyPopup() {
  CAbstractPopup.call(this);
  this.emails = ko.observableArray([]);
  this.selectedEmail = ko.observable('');
  this.password = ko.observable('');
  this.keyLengthOptions = [2048, 4096];
  this.selectedKeyLength = ko.observable(2048);
  this.process = ko.observable(false);
  this.keysExistText = ko.observable('');
}
_.extendOwn(CGenerateKeyPopup.prototype, CAbstractPopup.prototype);
CGenerateKeyPopup.prototype.PopupTemplate = 'OpenPgpWebclient_GenerateKeyPopup';
CGenerateKeyPopup.prototype.onOpen = function () {
  var aDefaultEmails = App.getUserPublicId ? [App.getUserPublicId()] : [],
    aEmails = ModulesManager.run('MailWebclient', 'getAllAccountsFullEmails') || aDefaultEmails,
    aKeys = OpenPgp.getKeys(),
    aKeysEmails = _.map(aKeys, function (oKey) {
      var oEmailParts = AddressUtils.getEmailParts(oKey.user);
      return oEmailParts.email;
    }),
    aEmailsToUse = [];
  _.each(aEmails, function (sEmail) {
    var oEmailParts = AddressUtils.getEmailParts(sEmail);
    if (_.indexOf(aKeysEmails, oEmailParts.email) === -1) {
      aEmailsToUse.push(sEmail);
    }
  });
  if (aEmailsToUse.length === 0) {
    this.keysExistText(TextUtils.i18n('OPENPGPWEBCLIENT/INFO_KEYS_EXIST_PLURAL', {}, null, aEmails.length));
  }
  this.emails(aEmailsToUse);
  this.selectedEmail('');
  this.password('');
  this.selectedKeyLength(2048);
  this.process(false);
};
CGenerateKeyPopup.prototype.generate = function () {
  if (this.emails().length === 0) {
    return;
  }
  var fKeysGenerated = _.bind(function () {
      Screens.showReport(TextUtils.i18n('OPENPGPWEBCLIENT/REPORT_KEY_SUCCESSFULLY_GENERATED'));
      this.process(false);
      this.closePopup();
    }, this),
    fKeysGenerateError = _.bind(function () {
      ErrorsUtils.showPgpErrorByCode({}, Enums.PgpAction.Generate);
      this.process(false);
      this.closePopup();
    }, this);
  this.process(true);
  _.delay(_.bind(function () {
    OpenPgp.generateKey(this.selectedEmail(), $.trim(this.password()), this.selectedKeyLength(), fKeysGenerated, fKeysGenerateError);
  }, this));
};
module.exports = new CGenerateKeyPopup();

/***/ }),

/***/ "zAR3":
/*!************************************************************!*\
  !*** ./modules/OpenPgpWebclient/js/popups/SendKeyPopup.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  ComposeMessageWithData = ModulesManager.run('MailWebclient', 'getComposeMessageWithData'),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a");

/**
 * @constructor
 */
function SendKeyPopup() {
  CAbstractPopup.call(this);
  this.bAllowSendEmails = _.isFunction(ComposeMessageWithData);
  this.sEmail = ko.observable('');
  this.oMessage = ko.observable(null);
  this.sSendKeyText = ko.observable('');
  this.oPublicKey = null;
  this.downloadLinkFilename = ko.observable('');
}
_.extendOwn(SendKeyPopup.prototype, CAbstractPopup.prototype);
SendKeyPopup.prototype.PopupTemplate = 'OpenPgpWebclient_SendKeyPopup';

/**
 * @param {string} oMessage
 * @param {object} oPublicKey
 */
SendKeyPopup.prototype.onOpen = function (oMessage, oPublicKey) {
  this.oMessage(oMessage);
  this.sEmail(oMessage.oFrom.getFirstEmail());
  this.sSendKeyText(TextUtils.i18n('OPENPGPWEBCLIENT/INFO_SEND_KEY', {
    'EMAIL': this.sEmail()
  }));
  this.oPublicKey = oPublicKey;
  var sConvertedUser = this.oPublicKey.getUser().replace(/</g, '').replace(/>/g, '');
  this.downloadLinkFilename(TextUtils.i18n('OPENPGPWEBCLIENT/TEXT_PUBLIC_KEY_FILENAME', {
    'USER': sConvertedUser
  }) + '.asc');
};
SendKeyPopup.prototype.sendKey = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var _this = this;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        if (this.bAllowSendEmails && this.oPublicKey.getArmor() !== '' && this.downloadLinkFilename() !== '') {
          Ajax.send('Core', 'SaveContentAsTempFile', {
            'Content': this.oPublicKey.getArmor(),
            'FileName': this.downloadLinkFilename()
          }, function (oResponse) {
            if (oResponse.Result) {
              ComposeMessageWithData({
                attachments: [oResponse.Result],
                replyToMessage: _this.oMessage()
              });
              _this.closePopup();
            }
          }, this);
        }
      case 1:
      case "end":
        return _context.stop();
    }
  }, _callee, this);
}));
module.exports = new SendKeyPopup();

/***/ }),

/***/ "grVS":
/*!*****************************************************************!*\
  !*** ./modules/OpenPgpWebclient/js/popups/ShowKeyArmorPopup.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
  ComposeMessageWithAttachments = ModulesManager.run('MailWebclient', 'getComposeMessageWithAttachments'),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX");

/**
 * @constructor
 */
function CShowKeyArmorPopup() {
  CAbstractPopup.call(this);
  this.bAllowSendEmails = _.isFunction(ComposeMessageWithAttachments);
  this.armor = ko.observable('');
  this.htmlArmor = ko.computed(function () {
    return TextUtils.encodeHtml(this.armor().replace(/\r/g, ''));
  }, this);
  this.user = ko.observable('');
  this["private"] = ko.observable(false);
  this.popupHeading = ko.computed(function () {
    return this["private"]() ? TextUtils.i18n('OPENPGPWEBCLIENT/HEADING_VIEW_PRIVATE_KEY', {
      'USER': this.user()
    }) : TextUtils.i18n('OPENPGPWEBCLIENT/HEADING_VIEW_PUBLIC_KEY', {
      'USER': this.user()
    });
  }, this);
  this.downloadLinkHref = ko.computed(function () {
    var sHref = '#',
      oBlob = null;
    if (Blob && window.URL && _.isFunction(window.URL.createObjectURL)) {
      oBlob = new Blob([this.armor()], {
        type: 'text/plain'
      });
      sHref = window.URL.createObjectURL(oBlob);
    }
    return sHref;
  }, this);
  this.downloadLinkFilename = ko.computed(function () {
    var sConvertedUser = this.user().replace(/</g, '').replace(/>/g, ''),
      sLangKey = this["private"]() ? 'OPENPGPWEBCLIENT/TEXT_PRIVATE_KEY_FILENAME' : 'OPENPGPWEBCLIENT/TEXT_PUBLIC_KEY_FILENAME';
    return TextUtils.i18n(sLangKey, {
      'USER': sConvertedUser
    }) + '.asc';
  }, this);
  this.domKey = ko.observable(null);
}
_.extendOwn(CShowKeyArmorPopup.prototype, CAbstractPopup.prototype);
CShowKeyArmorPopup.prototype.PopupTemplate = 'OpenPgpWebclient_ShowKeyArmorPopup';

/**
 * @param {Object} oKey
 */
CShowKeyArmorPopup.prototype.onOpen = function (oKey) {
  this.armor(oKey.getArmor());
  this.user(oKey.getUser());
  this["private"](oKey.isPrivate());
};
CShowKeyArmorPopup.prototype.send = function () {
  var _this = this;
  var fSend = function fSend() {
    if (_this.bAllowSendEmails && _this.armor() !== '' && _this.downloadLinkFilename() !== '') {
      Ajax.send('Core', 'SaveContentAsTempFile', {
        'Content': _this.armor(),
        'FileName': _this.downloadLinkFilename()
      }, function (oResponse) {
        if (oResponse.Result) {
          ComposeMessageWithAttachments([oResponse.Result]);
          this.closePopup();
        }
      }, _this);
    }
  };
  if (this["private"]()) {
    var sConfirm = TextUtils.i18n('OPENPGPWEBCLIENT/CONFIRM_SEND_PRIVATE_KEY');
    Popups.showPopup(ConfirmPopup, [sConfirm, function (bSend) {
      if (bSend) {
        fSend();
      }
    }]);
  } else {
    fSend();
  }
};
CShowKeyArmorPopup.prototype.select = function () {
  var oDomKey = this.domKey() && this.domKey().length === 1 ? this.domKey()[0] : null,
    oSel = null,
    oRange = null;
  if (oDomKey && window.getSelection && document.createRange) {
    oRange = document.createRange();
    oRange.setStart(oDomKey, 0);
    oRange.setEnd(oDomKey, 1);
    oSel = window.getSelection();
    oSel.removeAllRanges();
    oSel.addRange(oRange);
    if (document.queryCommandSupported('copy')) {
      document.execCommand('copy');
      Screens.showReport(TextUtils.i18n('OPENPGPWEBCLIENT/REPORT_KEY_IN_CLIPBOARD'));
    }
  }
};
module.exports = new CShowKeyArmorPopup();

/***/ }),

/***/ "y1/c":
/*!************************************************************************!*\
  !*** ./modules/OpenPgpWebclient/js/popups/ShowPublicKeysArmorPopup.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Ajax = __webpack_require__(/*! modules/CoreWebclient/js/Ajax.js */ "EFhx"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  ComposeMessageWithAttachments = ModulesManager.run('MailWebclient', 'getComposeMessageWithAttachments'),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX");

/**
 * @constructor
 */
function CShowKeyArmorPopup() {
  CAbstractPopup.call(this);
  this.bAllowSendEmails = _.isFunction(ComposeMessageWithAttachments);
  this.armors = ko.observable('');
  this.htmlArmor = ko.computed(function () {
    return TextUtils.encodeHtml(this.armors().replace(/\r/g, ''));
  }, this);
  this.popupHeading = ko.computed(function () {
    return TextUtils.i18n('OPENPGPWEBCLIENT/HEADING_VIEW_ALL_PUBLIC_KEYS');
  }, this);
  this.downloadLinkHref = ko.computed(function () {
    var sHref = '#',
      oBlob = null;
    if (Blob && window.URL && _.isFunction(window.URL.createObjectURL)) {
      oBlob = new Blob([this.armors()], {
        type: 'text/plain'
      });
      sHref = window.URL.createObjectURL(oBlob);
    }
    return sHref;
  }, this);
  this.downloadLinkFilename = ko.computed(function () {
    return TextUtils.i18n('OPENPGPWEBCLIENT/TEXT_ALL_PUBLIC_KEYS_FILENAME') + '.asc';
  }, this);
  this.domKey = ko.observable(null);
}
_.extendOwn(CShowKeyArmorPopup.prototype, CAbstractPopup.prototype);
CShowKeyArmorPopup.prototype.PopupTemplate = 'OpenPgpWebclient_ShowKeyArmorPopup';

/**
 * @param {string} sArmors
 */
CShowKeyArmorPopup.prototype.onOpen = function (sArmors) {
  this.armors(sArmors);
};
CShowKeyArmorPopup.prototype.send = function () {
  if (this.bAllowSendEmails && this.armors() !== '' && this.downloadLinkFilename() !== '') {
    Ajax.send('Core', 'SaveContentAsTempFile', {
      'Content': this.armors(),
      'FileName': this.downloadLinkFilename()
    }, function (oResponse) {
      if (oResponse.Result) {
        ComposeMessageWithAttachments([oResponse.Result]);
        this.closePopup();
      }
    }, this);
  }
};
CShowKeyArmorPopup.prototype.select = function () {
  var oDomKey = this.domKey() && this.domKey().length === 1 ? this.domKey()[0] : null,
    oSel = null,
    oRange = null;
  if (oDomKey && window.getSelection && document.createRange) {
    oRange = document.createRange();
    oRange.setStart(oDomKey, 0);
    oRange.setEnd(oDomKey, 1);
    oSel = window.getSelection();
    oSel.removeAllRanges();
    oSel.addRange(oRange);
    if (document.queryCommandSupported('copy')) {
      document.execCommand('copy');
      Screens.showReport(TextUtils.i18n('OPENPGPWEBCLIENT/REPORT_KEY_IN_CLIPBOARD'));
    }
  }
};
module.exports = new CShowKeyArmorPopup();

/***/ }),

/***/ "q2B8":
/*!*******************************************************************!*\
  !*** ./modules/OpenPgpWebclient/js/popups/VerifyPasswordPopup.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  CAbstractPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/CAbstractPopup.js */ "o1lX"),
  ErrorsUtils = __webpack_require__(/*! modules/OpenPgpWebclient/js/utils/Errors.js */ "oJ4D"),
  OpenPgp = __webpack_require__(/*! modules/OpenPgpWebclient/js/OpenPgp.js */ "F4aK");

/**
 * @constructor
 */
function CVerifyPasswordPopup() {
  CAbstractPopup.call(this);
  this.password = ko.observable('');
  this.oKey = null;
  this.fOkCallback = null;
}
_.extendOwn(CVerifyPasswordPopup.prototype, CAbstractPopup.prototype);
CVerifyPasswordPopup.prototype.PopupTemplate = 'OpenPgpWebclient_VerifyPasswordPopup';

/**
 * @param {object} oKey
 * @param {Function} fOkCallback
 */
CVerifyPasswordPopup.prototype.onOpen = function (oKey, fOkCallback) {
  this.password('');
  this.oKey = oKey;
  this.fOkCallback = fOkCallback;
};
CVerifyPasswordPopup.prototype.confirmPasswordAndView = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var oResult;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return OpenPgp.verifyKeyPassword(this.oKey, this.password());
      case 2:
        oResult = _context.sent;
        if (oResult.errors) {
          ErrorsUtils.showPgpErrorByCode(oResult);
        } else {
          if (_.isFunction(this.fOkCallback)) {
            this.fOkCallback();
            this.closePopup();
          }
        }
      case 4:
      case "end":
        return _context.stop();
    }
  }, _callee, this);
}));
module.exports = new CVerifyPasswordPopup();

/***/ }),

/***/ "Lz/N":
/*!*****************************************************************!*\
  !*** ./modules/OpenPgpWebclient/js/views/ComposeButtonsView.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  Utils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Common.js */ "REt5"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
  EncryptPopup = __webpack_require__(/*! modules/OpenPgpWebclient/js/popups/EncryptPopup.js */ "AMrN"),
  Settings = __webpack_require__(/*! modules/OpenPgpWebclient/js/Settings.js */ "W4X/");

/**
 * @constructor for object that display buttons "PGP Sign/Encrypt" and "Undo PGP"
 */
function CComposeButtonsView() {
  this.sId = 'OpenPgp';
  this.bAllowMobile = true;
  this.enableOpenPgpInMail = Settings.enableOpenPgpInMail;
  this.pgpSecured = ko.observable(false);
  this.pgpEncrypted = ko.observable(false);
  this.fromDrafts = ko.observable(false);
  this.disableHeadersEdit = this.pgpEncrypted;
  this.disableBodyEdit = this.pgpSecured;
  this.disableAutosave = this.pgpSecured;
  this.disableFromEdit = ko.computed(function () {
    return this.pgpEncrypted() || this.pgpSecured();
  }, this);
  this.visibleDoPgpButton = ko.computed(function () {
    return this.enableOpenPgpInMail() && (!this.pgpSecured() || this.pgpEncrypted() && this.fromDrafts());
  }, this);
  this.visibleUndoPgpButton = ko.computed(function () {
    return this.enableOpenPgpInMail() && this.pgpSecured() && (!this.pgpEncrypted() || !this.fromDrafts());
  }, this);
  this.isEnableOpenPgpCommand = ko.computed(function () {
    return this.enableOpenPgpInMail() && !this.pgpSecured();
  }, this);
  this.openPgpCommand = Utils.createCommand(this, this.confirmOpenPgp, this.isEnableOpenPgpCommand);
  this.bComposeModeChanged = false;
}
CComposeButtonsView.prototype.ViewTemplate = App.isMobile() ? 'OpenPgpWebclient_ComposeButtonsMobileView' : 'OpenPgpWebclient_ComposeButtonsView';

/**
 * Assigns compose external interface.
 * 
 * @param {Object} oCompose Compose external interface object.
 * @param {Function} oCompose.isHtml Returns **true** if html mode is switched on in html editor.
 * @param {Function} oCompose.hasAttachments Returns **true** if some files were attached to message.
 * @param {Function} oCompose.getPlainText Returns plain text from html editor. If html mode is switched on html text will be converted to plain and returned.
 * @param {Function} oCompose.getFromEmail Returns message sender email.
 * @param {Function} oCompose.getRecipientEmails Returns array of message recipients.
 * @param {Function} oCompose.getRecipientsInfo Returns array of message recipients info.
 * @param {Function} oCompose.saveSilently Saves message silently (without buttons disabling and any info messages).
 * @param {Function} oCompose.setPlainTextMode Sets plain text mode switched on.
 * @param {Function} oCompose.setPlainText Sets plain text to html editor.
 * @param {Function} oCompose.setHtmlTextMode Sets html text mode switched on.
 * @param {Function} oCompose.setHtmlText Sets html text to html editor.
 * @param {Function} oCompose.undoHtml Undo last changes in html editor.
 */
CComposeButtonsView.prototype.assignComposeExtInterface = function (oCompose) {
  this.oCompose = oCompose;
};

/**
 * @param {Object} oParameters
 */
CComposeButtonsView.prototype.doAfterApplyingMainTabParameters = function (oParameters) {
  if (oParameters.OpenPgp) {
    this.pgpSecured(oParameters.OpenPgp.Secured);
    this.pgpEncrypted(oParameters.OpenPgp.Encrypted);
    this.fromDrafts(oParameters.OpenPgp.FromDrafts);
    if (this.pgpSecured() || this.pgpEncrypted()) {
      this.fromDrafts(true);
    }
  }
};

/**
 * @param {Object} oParameters
 */
CComposeButtonsView.prototype.doAfterPreparingMainTabParameters = function (oParameters) {
  oParameters.OpenPgp = {
    Secured: this.pgpSecured(),
    Encrypted: this.pgpEncrypted(),
    FromDrafts: this.fromDrafts()
  };
};

/**
 * Receives message properties that are displayed when opening the compose popup.
 * 
 * @param {Object} oMessageProps Receiving message properties.
 * @param {Boolean} oMessageProps.bDraft **true** if message was opened from drafts folder.
 * @param {Boolean} oMessageProps.bPlain **true** if opened for compose message if plain.
 * @param {String} oMessageProps.sRawText Raw plain text of opened for compose message.
 */
CComposeButtonsView.prototype.doAfterPopulatingMessage = function (oMessageProps) {
  this.bComposeModeChanged = false;
  this.fromDrafts(oMessageProps.bDraft);
  if (oMessageProps.bPlain) {
    var bPgpEncrypted = oMessageProps.sRawText.indexOf('-----BEGIN PGP MESSAGE-----') !== -1,
      bPgpSigned = oMessageProps.sRawText.indexOf('-----BEGIN PGP SIGNED MESSAGE-----') !== -1;
    this.pgpSecured(bPgpSigned || bPgpEncrypted);
    this.pgpEncrypted(bPgpEncrypted);
  } else {
    this.pgpSecured(false);
    this.pgpEncrypted(false);
  }
};

/**
 * Executes before message saving. May cancel the saving and continue it later if it's necessary.
 * @param {Function} fContinueSaving Handler for continue message saving if it's necessary.
 * @returns {Boolean} If **true** message saving will be canceled.
 */
CComposeButtonsView.prototype.doBeforeSave = function (fContinueSaving) {
  if (this.pgpSecured()) {
    Popups.showPopup(ConfirmPopup, [TextUtils.i18n('OPENPGPWEBCLIENT/CONFIRM_SAVE_ENCRYPTED_DRAFT'), fContinueSaving, '', TextUtils.i18n('COREWEBCLIENT/ACTION_SAVE')]);
    return true;
  }
  return false;
};
CComposeButtonsView.prototype.confirmOpenPgp = function () {
  if (this.oCompose) {
    if (this.oCompose.getRecipientEmails().length < 1) {
      Screens.showError(TextUtils.i18n('OPENPGPWEBCLIENT/ERROR_TO_ENCRYPT_SPECIFY_RECIPIENTS'));
    } else if (this.oCompose.isHtml()) {
      var sConfirm = TextUtils.i18n('OPENPGPWEBCLIENT/CONFIRM_HTML_TO_PLAIN_FORMATTING'),
        fEncryptPopup = _.bind(function (bRes) {
          if (bRes) {
            this.openPgpPopup();
          }
        }, this);
      if (this.oCompose.hasAttachments()) {
        sConfirm += '\r\n\r\n' + TextUtils.i18n('OPENPGPWEBCLIENT/CONFIRM_HTML_TO_PLAIN_ATTACHMENTS');
      }
      Popups.showPopup(ConfirmPopup, [sConfirm, fEncryptPopup]);
    } else {
      this.openPgpPopup();
    }
  }
};
CComposeButtonsView.prototype.openPgpPopup = function () {
  var _this = this;
  if (this.oCompose) {
    var successCallback = function successCallback(signedEncryptedText, isEncrypted) {
      if (_this.oCompose.isHtml()) {
        _this.oCompose.setPlainTextMode();
        _this.bComposeModeChanged = true;
      }
      _this.oCompose.setPlainText(signedEncryptedText);
      _this.pgpSecured(true);
      _this.pgpEncrypted(isEncrypted);
    };
    Popups.showPopup(EncryptPopup, [this.oCompose.getPlainText(), this.oCompose.getFromEmail(), this.oCompose.getRecipientsInfo(), successCallback]);
  }
};
CComposeButtonsView.prototype.undoPgp = function () {
  var sText = '',
    aText = [];
  if (this.oCompose && this.pgpSecured()) {
    if (this.bComposeModeChanged) {
      this.oCompose.setHtmlTextMode();
      this.bComposeModeChanged = false;
    }
    if (this.fromDrafts() && !this.pgpEncrypted()) {
      sText = this.oCompose.getPlainText();
      aText = sText.split('-----BEGIN PGP SIGNED MESSAGE-----');
      if (aText.length === 2) {
        sText = aText[1];
      }
      aText = sText.split('-----BEGIN PGP SIGNATURE-----');
      if (aText.length === 2) {
        sText = aText[0];
      }
      aText = sText.split('\r\n\r\n');
      if (aText.length > 0) {
        aText.shift();
        sText = aText.join('\r\n\r\n');
      }
      if (this.oCompose.isHtml()) {
        this.oCompose.setHtmlText('<div>' + sText.replace(/\r\n/gi, '<br />') + '</div>');
      } else {
        this.oCompose.setPlainText(sText);
      }
    } else {
      this.oCompose.undoHtml();
    }
    this.pgpSecured(false);
    this.pgpEncrypted(false);
  }
};
module.exports = new CComposeButtonsView();

/***/ }),

/***/ "XaEU":
/*!******************************************************************!*\
  !*** ./modules/OpenPgpWebclient/js/views/MessageControlsView.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  ErrorsUtils = __webpack_require__(/*! modules/OpenPgpWebclient/js/utils/Errors.js */ "oJ4D"),
  Enums = __webpack_require__(/*! modules/OpenPgpWebclient/js/Enums.js */ "quQ1"),
  OpenPgp = __webpack_require__(/*! modules/OpenPgpWebclient/js/OpenPgp.js */ "F4aK"),
  Settings = __webpack_require__(/*! modules/OpenPgpWebclient/js/Settings.js */ "W4X/");
function CMessageControlsView() {
  this.sText = '';
  this.sAccountEmail = '';
  this.sFromEmail = '';
  this.oEncryptionKey = null;
  this.isEncryptedMessage = ko.observable(false);
  this.visibleDecryptControl = ko.observable(false);
  this.visibleVerifyControl = ko.observable(false);
}
CMessageControlsView.prototype.ViewTemplate = 'OpenPgpWebclient_MessageControlsView';
CMessageControlsView.prototype.reset = function () {
  this.sText = '';
  this.sAccountEmail = '';
  this.sFromEmail = '';
  this.isEncryptedMessage(false);
  this.visibleDecryptControl(false);
  this.visibleVerifyControl(false);
};

/**
 * Assigns message pane external interface.
 * 
 * @param {Object} oMessagePane Message pane external interface.
 * @param {Function} oMessagePane.changeText(sText) Function changes displaying text in message pane and in message too so exactly this text will be shown next time.
 */
CMessageControlsView.prototype.assignMessagePaneExtInterface = function (oMessagePane) {
  this.oMessagePane = oMessagePane;
};

/**
 * Receives properties of the message that is displaying in the message pane. 
 * It is called every time the message is changing in the message pane.
 * Receives null if there is no message in the pane.
 * 
 * @param {Object|null} oMessageProps Information about message in message pane.
 * @param {Boolean} oMessageProps.bPlain **true**, if displaying message is plain.
 * @param {String} oMessageProps.sRawText Raw plain text of message.
 * @param {String} oMessageProps.sText Prepared for displaying plain text of message.
 * @param {String} oMessageProps.sAccountEmail Email of account that received message.
 * @param {String} oMessageProps.sFromEmail Message sender email.
 */
CMessageControlsView.prototype.doAfterPopulatingMessage = function (oMessageProps) {
  var _this = this;
  if (oMessageProps && oMessageProps.bPlain) {
    this.sText = oMessageProps.sRawText;
    this.sAccountEmail = oMessageProps.sAccountEmail;
    this.sFromEmail = oMessageProps.sFromEmail;
    if (Settings.enableOpenPgpInMail()) {
      this.isEncryptedMessage(oMessageProps.sText.indexOf('-----BEGIN PGP MESSAGE-----') !== -1);
      this.visibleVerifyControl(oMessageProps.sText.indexOf('-----BEGIN PGP SIGNED MESSAGE-----') !== -1);
      if (this.isEncryptedMessage()) {
        OpenPgp.getEncryptionKeyFromArmoredMessage(this.sText).then(function (oEncryptionKey) {
          if (oEncryptionKey) {
            _this.visibleDecryptControl(true);
            _this.oEncryptionKey = oEncryptionKey;
          } else {
            _this.visibleDecryptControl(false);
          }
        });
      }
      this.visibleDecryptControl(this.isEncryptedMessage());
    } else {
      this.visibleDecryptControl(false);
    }
    if ((this.visibleVerifyControl() || this.visibleDecryptControl()) && this.oMessagePane) {
      this.oMessagePane.changeText('<pre>' + TextUtils.encodeHtml(this.sText) + '</pre>');
    }
  } else {
    this.reset();
  }
};
CMessageControlsView.prototype.decryptMessage = function () {
  var fOkHandler = _.bind(function (oRes) {
      if (oRes && oRes.result && !oRes.errors && this.oMessagePane) {
        this.oMessagePane.changeText('<pre>' + TextUtils.plainToHtml(oRes.result, true) + '</pre>');
        this.isEncryptedMessage(false);
        this.visibleDecryptControl(false);
        if (!oRes.notices) {
          Screens.showReport(TextUtils.i18n('OPENPGPWEBCLIENT/REPORT_MESSAGE_SUCCESSFULLY_DECRYPTED_AND_VERIFIED'));
        } else {
          Screens.showError(TextUtils.i18n('OPENPGPWEBCLIENT/ERROR_MESSAGE_SUCCESSFULLY_DECRYPTED_BUT_NOT_VERIFIED'));
        }
      }
    }, this),
    fErrorHandler = function fErrorHandler(oRes) {
      if (oRes && (oRes.errors || oRes.notices)) {
        var bNoSignDataNotice = ErrorsUtils.showPgpErrorByCode(oRes, Enums.PgpAction.DecryptVerify);
        if (bNoSignDataNotice) {
          Screens.showReport(TextUtils.i18n('OPENPGPWEBCLIENT/REPORT_MESSAGE_SUCCESSFULLY_DECRYPTED_AND_NOT_SIGNED'));
        }
      }
    };
  OpenPgp.decryptAndVerify(this.sText, this.oEncryptionKey, this.sFromEmail, '', fOkHandler, fErrorHandler);
};
CMessageControlsView.prototype.verifyMessage = function () {
  var fOkHandler = _.bind(function (oRes) {
      if (oRes && oRes.result && !(oRes.errors || oRes.notices) && this.oMessagePane) {
        this.oMessagePane.changeText('<pre>' + TextUtils.encodeHtml(oRes.result) + '</pre>');
        this.visibleVerifyControl(false);
        Screens.showReport(TextUtils.i18n('OPENPGPWEBCLIENT/REPORT_MESSAGE_SUCCESSFULLY_VERIFIED'));
      }
    }, this),
    fErrorHandler = function fErrorHandler(oRes) {
      if (oRes && (oRes.errors || oRes.notices)) {
        ErrorsUtils.showPgpErrorByCode(oRes, Enums.PgpAction.Verify);
      }
    };
  OpenPgp.verify(this.sText, this.sFromEmail, fOkHandler, fErrorHandler);
};
module.exports = new CMessageControlsView();

/***/ }),

/***/ "JYH5":
/*!**********************************************************************!*\
  !*** ./modules/OpenPgpWebclient/js/views/OpenPgpSettingsFormView.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _ = __webpack_require__(/*! underscore */ "C3HO"),
  ko = __webpack_require__(/*! knockout */ "p09A"),
  TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
  ModulesManager = __webpack_require__(/*! modules/CoreWebclient/js/ModulesManager.js */ "TdEd"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
  ErrorsUtils = __webpack_require__(/*! modules/OpenPgpWebclient/js/utils/Errors.js */ "oJ4D"),
  GenerateKeyPopup = __webpack_require__(/*! modules/OpenPgpWebclient/js/popups/GenerateKeyPopup.js */ "wb42"),
  ImportKeyPopup = __webpack_require__(/*! modules/OpenPgpWebclient/js/popups/ImportKeyPopup.js */ "Aai9"),
  OpenPgp = __webpack_require__(/*! modules/OpenPgpWebclient/js/OpenPgp.js */ "F4aK"),
  Settings = __webpack_require__(/*! modules/OpenPgpWebclient/js/Settings.js */ "W4X/"),
  ShowPublicKeysArmorPopup = __webpack_require__(/*! modules/OpenPgpWebclient/js/popups/ShowPublicKeysArmorPopup.js */ "y1/c"),
  VerifyPasswordPopup = __webpack_require__(/*! modules/OpenPgpWebclient/js/popups/VerifyPasswordPopup.js */ "q2B8"),
  isTeamContactsAvailable = ModulesManager.isModuleAvailable('TeamContacts');

/**
 * @constructor
 */
function COpenPgpSettingsFormView() {
  CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
  this.bTeamContactsAvailable = isTeamContactsAvailable;
  this.enableOpenPgpInMail = ko.observable(Settings.enableOpenPgpInMail());
  this.rememberPassphrase = Settings.rememberPassphrase;
  this.isMailAvailable = ModulesManager.isModuleAvailable('Mail');
  this.keys = ko.observableArray(OpenPgp.getKeys());
  OpenPgp.getKeysObservable().subscribe(function () {
    this.keys(OpenPgp.getKeys());
  }, this);
  this.noOwnKeyInTeamContacts = ko.computed(function () {
    return OpenPgp.ownKeyFromTeamContacts() === false;
  });
  this.publicKeysFromThisDevice = ko.computed(function () {
    return this.keys().filter(function (key) {
      return !key.isFromContacts && key.isPublic();
    }).map(function (key) {
      var isOwn = isTeamContactsAvailable && key.getEmail() === App.getUserPublicId(),
        ownKeyFromTeamContacts = OpenPgp.ownKeyFromTeamContacts(),
        isSameKeyFromTeamContacts = isOwn && ownKeyFromTeamContacts && key.getId() === ownKeyFromTeamContacts.getId();
      return {
        key: key,
        user: key.getUser(),
        isOwn: isOwn,
        hasOwnKeyFromTeamContacts: !!ownKeyFromTeamContacts,
        isSameKeyFromTeamContacts: isSameKeyFromTeamContacts
      };
    });
  }, this);
  this.privateKeysFromThisDevice = ko.computed(function () {
    return this.keys().filter(function (key) {
      return !key.isFromContacts && key.isPrivate();
    }).map(function (key) {
      return {
        key: key,
        user: key.getUser()
      };
    });
  }, this);
  this.keysFromPersonalContacts = ko.computed(function () {
    return this.keys().filter(function (key) {
      return key.isFromContacts;
    }).map(function (key) {
      return {
        key: key,
        user: key.getUser()
      };
    });
  }, this);
  this.oPgpKeyControlsView = ModulesManager.run('OpenPgpWebclient', 'getPgpKeyControlsView');
}
_.extendOwn(COpenPgpSettingsFormView.prototype, CAbstractSettingsFormView.prototype);
COpenPgpSettingsFormView.prototype.ViewTemplate = 'OpenPgpWebclient_OpenPgpSettingsFormView';
COpenPgpSettingsFormView.prototype.saveOwnKeyToTeamContact = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(key) {
    var armor, res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          armor = key.getArmor();
          _context.next = 3;
          return OpenPgp.addKeyToContact(armor, '', true);
        case 3:
          res = _context.sent;
          if (res && res.result) {
            Screens.showReport(TextUtils.i18n('OPENPGPWEBCLIENT/REPORT_KEY_SUCCESSFULLY_IMPORTED_PLURAL', {}, null, 1));
          } else {
            ErrorsUtils.showPgpErrorByCode(res, Enums.PgpAction.Import, TextUtils.i18n('OPENPGPWEBCLIENT/ERROR_IMPORT_KEY'));
          }
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
COpenPgpSettingsFormView.prototype.exportAllPublicKeys = function () {
  var armors = _.map(_.union(this.publicKeysFromThisDevice(), this.keysFromPersonalContacts()), function (keyData) {
    return keyData.key.getArmor();
  });
  if (armors.length > 0) {
    Popups.showPopup(ShowPublicKeysArmorPopup, [armors.join('\n')]);
  }
};
COpenPgpSettingsFormView.prototype.importKey = function () {
  Popups.showPopup(ImportKeyPopup, [{}]);
};
COpenPgpSettingsFormView.prototype.generateNewKey = function () {
  Popups.showPopup(GenerateKeyPopup);
};
COpenPgpSettingsFormView.prototype.removeKeyFromContacts = function (key) {
  this.oPgpKeyControlsView.removeKeyFromContacts(key);
};

/**
 * @param {Object} key
 */
COpenPgpSettingsFormView.prototype.removeKeyFromThisDevice = function (key) {
  this.oPgpKeyControlsView.removeKeyFromThisDevice(key);
};

/**
 * @param {Object} key
 */
COpenPgpSettingsFormView.prototype.showArmor = function (key) {
  var _this = this;
  if (key.isPublic()) {
    this.oPgpKeyControlsView.showArmor(key);
  } else {
    Popups.showPopup(VerifyPasswordPopup, [key, function () {
      _this.oPgpKeyControlsView.showArmor(key);
    }]);
  }
};
COpenPgpSettingsFormView.prototype.getCurrentValues = function () {
  return [this.enableOpenPgpInMail(), this.rememberPassphrase()];
};
COpenPgpSettingsFormView.prototype.revertGlobalValues = function () {
  this.enableOpenPgpInMail(Settings.enableOpenPgpInMail());
  this.rememberPassphrase(Settings.rememberPassphrase());
};
COpenPgpSettingsFormView.prototype.getParametersForSave = function () {
  return {
    'EnableModule': this.enableOpenPgpInMail(),
    'RememberPassphrase': this.rememberPassphrase()
  };
};
COpenPgpSettingsFormView.prototype.applySavedValues = function (oParameters) {
  Settings.update(oParameters.EnableModule);
};
module.exports = new COpenPgpSettingsFormView();

/***/ }),

/***/ "/jAl":
/*!*****************************************************************!*\
  !*** ./modules/OpenPgpWebclient/js/views/PgpKeyControlsView.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var TextUtils = __webpack_require__(/*! modules/CoreWebclient/js/utils/Text.js */ "H20a"),
  ConfirmPopup = __webpack_require__(/*! modules/CoreWebclient/js/popups/ConfirmPopup.js */ "XeMN"),
  Popups = __webpack_require__(/*! modules/CoreWebclient/js/Popups.js */ "oUN1"),
  Screens = __webpack_require__(/*! modules/CoreWebclient/js/Screens.js */ "skxT"),
  OpenPgp = __webpack_require__(/*! modules/OpenPgpWebclient/js/OpenPgp.js */ "F4aK"),
  ShowKeyArmorPopup = __webpack_require__(/*! modules/OpenPgpWebclient/js/popups/ShowKeyArmorPopup.js */ "grVS");
function CPgpKeyControlsView() {}
CPgpKeyControlsView.prototype.ViewTemplate = 'OpenPgpWebclient_PgpKeyControlsView';
var prepareKey = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(key, email, uuid) {
    var keys;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(typeof key === 'string')) {
            _context.next = 5;
            break;
          }
          _context.next = 3;
          return OpenPgp.getKeysFromArmors([{
            Email: email,
            PublicPgpKey: key,
            UUID: uuid
          }]);
        case 3:
          keys = _context.sent;
          return _context.abrupt("return", keys.length === 1 ? keys[0] : null);
        case 5:
          return _context.abrupt("return", key);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function prepareKey(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
CPgpKeyControlsView.prototype.showArmor = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(key, email, uuid) {
    var preparedKey;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return prepareKey(key, email, uuid);
        case 2:
          preparedKey = _context2.sent;
          if (preparedKey) {
            Popups.showPopup(ShowKeyArmorPopup, [preparedKey]);
          }
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
CPgpKeyControlsView.prototype.setAfterRemoveContactKeyHandler = function (afterRemoveContactKeyHandler) {
  this.afterRemoveContactKeyHandler = typeof afterRemoveContactKeyHandler === 'function' ? afterRemoveContactKeyHandler : function () {};
};
CPgpKeyControlsView.prototype.removeKeyFromContacts = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(key, email, uuid) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          this.removeKey(key, email, uuid, 'removeKeyFromContacts');
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3, this);
  }));
  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
CPgpKeyControlsView.prototype.removeKeyFromThisDevice = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(key, email, uuid) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          this.removeKey(key, email, uuid, 'removeKeyFromThisDevice');
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4, this);
  }));
  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
CPgpKeyControlsView.prototype.removeKey = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(key, email, uuid, removeMethodName) {
    var _this = this;
    var preparedKey, removeHandler, confirmText;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return prepareKey(key, email, uuid);
        case 2:
          preparedKey = _context6.sent;
          removeHandler = /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(isRemoveConfirmed) {
              var removeKeyResult;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!isRemoveConfirmed) {
                      _context5.next = 5;
                      break;
                    }
                    _context5.next = 3;
                    return OpenPgp[removeMethodName](preparedKey);
                  case 3:
                    removeKeyResult = _context5.sent;
                    if (!removeKeyResult.result) {
                      Screens.showError(TextUtils.i18n('OPENPGPWEBCLIENT/ERROR_DELETE_KEY'));
                    } else {
                      _this.afterRemoveContactKeyHandler();
                    }
                  case 5:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function removeHandler(_x17) {
              return _ref6.apply(this, arguments);
            };
          }();
          confirmText = TextUtils.i18n('OPENPGPWEBCLIENT/CONFIRM_DELETE_KEY', {
            'KEYEMAIL': preparedKey.getEmail()
          });
          Popups.showPopup(ConfirmPopup, [confirmText, removeHandler]);
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x13, _x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();
module.exports = new CPgpKeyControlsView();

/***/ })

}]);