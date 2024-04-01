<?php
/**
 * This code is licensed under AGPLv3 license or Afterlogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\PersonalContacts;

use Aurora\Api;
use Aurora\Modules\Contacts\Enums\SortField;
use Aurora\Modules\Contacts\Enums\StorageType;
use Aurora\Modules\Contacts\Models\Contact;
use Aurora\Modules\Contacts\Module as ContactsModule;

/**
 * @license https://www.gnu.org/licenses/agpl-3.0.html AGPL-3.0
 * @license https://afterlogic.com/products/common-licensing Afterlogic Software License
 * @copyright Copyright (c) 2023, Afterlogic Corp.
 *
 * @property Settings $oModuleSettings
 *
 * @package Modules
 */
class Module extends \Aurora\System\Module\AbstractModule
{
    public static $sStorage = StorageType::Personal;
    protected static $iStorageOrder = 0;

    public function init()
    {
        $this->subscribeEvent('Contacts::GetStorages', array($this, 'onGetStorages'));
        $this->subscribeEvent('Contacts::IsDisplayedStorage::after', array($this, 'onAfterIsDisplayedStorage'));
        $this->subscribeEvent('Contacts::CreateContact::before', array($this, 'onBeforeCreateContact'));
        $this->subscribeEvent('Contacts::PrepareFiltersFromStorage', array($this, 'prepareFiltersFromStorage'));
        $this->subscribeEvent('Mail::ExtendMessageData', array($this, 'onExtendMessageData'));
        $this->subscribeEvent('Contacts::CheckAccessToObject::after', array($this, 'onAfterCheckAccessToObject'));
        $this->subscribeEvent('Contacts::GetContactSuggestions', array($this, 'onGetContactSuggestions'));
    }

    /**
     * @return Module
     */
    public static function getInstance()
    {
        return parent::getInstance();
    }

    /**
     * @return Module
     */
    public static function Decorator()
    {
        return parent::Decorator();
    }

    /**
     * @return Settings
     */
    public function getModuleSettings()
    {
        return $this->oModuleSettings;
    }

    public function onGetStorages(&$aStorages)
    {
        $aStorages[self::$iStorageOrder] = self::$sStorage;
        $aStorages[self::$iStorageOrder + 1] = StorageType::Collected;
    }

    public function onAfterIsDisplayedStorage($aArgs, &$mResult)
    {
        if ($aArgs['Storage'] === StorageType::Collected) {
            $mResult = false;
        }
    }

    public function onBeforeCreateContact(&$aArgs, &$mResult)
    {
        if (isset($aArgs['Contact'])) {
            if (!isset($aArgs['Contact']['Storage']) || $aArgs['Contact']['Storage'] === '') {
                $aArgs['Contact']['Storage'] = self::$sStorage;
            }
        }
    }

    public function prepareFiltersFromStorage(&$aArgs, &$mResult)
    {
        $iAddressBookId = 0;
        if (isset($aArgs['Storage'])) {
            $aStorageParts = \explode('-', $aArgs['Storage']);
            if (isset($aStorageParts[0]) && $aStorageParts[0] === StorageType::AddressBook) {
                $iAddressBookId = $aStorageParts[1];
                if (!is_numeric($iAddressBookId)) {
                    return;
                }

                $iAddressBookId = (int) $iAddressBookId;
                $aArgs['Storage'] = StorageType::AddressBook;
            }
            $sStorage = $aArgs['Storage'];

            if ($sStorage === self::$sStorage || $sStorage === StorageType::All ||
                $sStorage === StorageType::Collected || $sStorage === StorageType::AddressBook) {
                $aArgs['IsValid'] = true;
                $iUserId = isset($aArgs['UserId']) ? $aArgs['UserId'] : Api::getAuthenticatedUserId();

                if (!isset($mResult)) {
                    $mResult = Contact::query();
                }

                $bAuto = ($sStorage === StorageType::Collected);
                if ($bAuto) {
                    $sStorage = StorageType::Personal;
                }

                $bSuggestions = isset($aArgs['Suggestions']) ? !!$aArgs['Suggestions'] : false;

                $mResult = $mResult->orWhere(function ($query) use ($iUserId, $sStorage, $bAuto, $bSuggestions, $iAddressBookId) {
                    $query = $query->where('IdUser', $iUserId);

                    if ($sStorage === StorageType::All) {
                        $query = $query->whereIn('Storage', [StorageType::Personal, StorageType::AddressBook]);
                    } else {
                        $query = $query->where('Storage', $sStorage);
                        if ($sStorage === StorageType::AddressBook && $iAddressBookId > 0) {
                            $query = $query->where('AddressBookId', $iAddressBookId);
                        }
                    }
                    // if (isset($aArgs['SortField']) && $aArgs['SortField'] === SortField::Frequency) {
                    //     $query->whereNotNull('DateModified');
                    // } else
                    if (!$bSuggestions) {
                        $query->where('Auto', $bAuto)->orWhereNull('Auto');
                    }
                });
            }
        }
    }

    public function onExtendMessageData($aData, &$oMessage)
    {
        $oApiFileCache = new \Aurora\System\Managers\Filecache();

        $oUser = Api::getAuthenticatedUser();

        foreach ($aData as $aDataItem) {
            $oPart = $aDataItem['Part'];
            $bVcard = $oPart instanceof \MailSo\Imap\BodyStructure &&
                    ($oPart->ContentType() === 'text/vcard' || $oPart->ContentType() === 'text/x-vcard');
            $sData = $aDataItem['Data'];
            if ($bVcard && !empty($sData)) {
                $oContact = new Contact();
                try {
                    $oContact->InitFromVCardStr($oUser->Id, $sData);

                    $oContact->UUID = '';

                    $bContactExists = false;
                    if (0 < strlen($oContact->ViewEmail)) {
                        $aLocalContacts = ContactsModule::Decorator()->GetContactsByEmails(
                            $oUser->Id,
                            self::$sStorage,
                            [$oContact->ViewEmail],
                            null,
                            false
                        );
                        $oLocalContact = count($aLocalContacts) > 0 ? $aLocalContacts[0] : null;
                        if ($oLocalContact) {
                            $oContact->UUID = $oLocalContact->UUID;
                            $bContactExists = true;
                        }
                    }

                    $sTemptFile = md5($sData).'.vcf';
                    if ($oApiFileCache && $oApiFileCache->put($oUser->UUID, $sTemptFile, $sData)) { // Temp files with access from another module should be stored in System folder
                        if (class_exists('\Aurora\Modules\Mail\Classes\Vcard')) {
                            $oVcard = \Aurora\Modules\Mail\Classes\Vcard::createInstance();

                            $oVcard->Uid = $oContact->UUID;
                            $oVcard->File = $sTemptFile;
                            $oVcard->Exists = !!$bContactExists;
                            $oVcard->Name = $oContact->FullName;
                            $oVcard->Email = $oContact->ViewEmail;

                            $oMessage->addExtend('VCARD', $oVcard);
                        }
                    } else {
                        Api::Log('Can\'t save temp file "'.$sTemptFile.'"', \Aurora\System\Enums\LogLevel::Error);
                    }
                } catch(\Exception $oEx) {
                    Api::LogException($oEx);
                }
            }
        }
    }

    public function onAfterCheckAccessToObject(&$aArgs, &$mResult)
    {
        $oUser = $aArgs['User'];
        $oContact = isset($aArgs['Contact']) ? $aArgs['Contact'] : null;

        if ($oContact instanceof Contact && $oContact->Storage === self::$sStorage) {
            if ($oUser->Role !== \Aurora\System\Enums\UserRole::SuperAdmin && $oUser->Id !== $oContact->IdUser) {
                $mResult = false;
            } else {
                $mResult = true;
            }
        }
    }

    public function onGetContactSuggestions(&$aArgs, &$mResult)
    {
        if ($aArgs['Storage'] === 'all' || $aArgs['Storage'] === self::$sStorage) {
            $mResult['personal'] = ContactsModule::Decorator()->GetContacts(
                $aArgs['UserId'],
                self::$sStorage,
                0,
                $aArgs['Limit'],
                $aArgs['SortField'],
                $aArgs['SortOrder'],
                $aArgs['Search']
            );
        }
    }
}
