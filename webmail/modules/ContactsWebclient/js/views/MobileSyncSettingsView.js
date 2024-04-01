'use strict';

var
	ko = require('knockout'),

	Settings = require('modules/%ModuleName%/js/Settings.js')
;

/**
 * @constructor
 */
function CMobileSyncSettingsView()
{
	this.AddressBooks = ko.observableArray([]);
}

CMobileSyncSettingsView.prototype.ViewTemplate = '%ModuleName%_MobileSyncSettingsView';

/**
 * @param {Object} oDav
 */
CMobileSyncSettingsView.prototype.populate = function (oDav)
{
	if (oDav.Contacts) {
		const aAddressBooks = [];
		Settings.Storages.forEach((oAddressBook) => {
			if (oAddressBook.DisplayName) {
				aAddressBooks.push({
					'DisplayName': oAddressBook.DisplayName,
					'DavUrl': oDav.Contacts[oAddressBook.Id] || ''
				})
			}
		});

		this.AddressBooks(aAddressBooks);
	}
};

module.exports = new CMobileSyncSettingsView();
