"use strict";
(self["webpackChunkafterlogic_aurora_platform"] = self["webpackChunkafterlogic_aurora_platform"] || []).push([[15],{

/***/ "2XQK":
/*!****************************************************!*\
  !*** ./modules/OfficeDocumentViewer/js/manager.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = function (oAppData) {
	var
		moment = __webpack_require__(/*! moment */ "sdEb"),
		App = __webpack_require__(/*! modules/CoreWebclient/js/App.js */ "9kOp"),
				
		CAbstractFileModel = __webpack_require__(/*! modules/CoreWebclient/js/models/CAbstractFileModel.js */ "17yT")
	;
	
	if (App.isUserNormalOrTenant())
	{
		return {
			start: function () {
				var aExtensionsToView = oAppData['OfficeDocumentViewer'] ? oAppData['OfficeDocumentViewer']['ExtensionsToView'] : [];
				CAbstractFileModel.addViewExtensions(aExtensionsToView);

				App.subscribeEvent('AbstractFileModel::FileView::before', function (oParams) {
					if (oParams['sUrl'])
					{
						oParams['sUrl'] += '&' + moment().unix() ;
					}
				});
			}
		};
	}
	
	return null;
};


/***/ })

}]);