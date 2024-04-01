<?php
/**
 * This code is licensed under AGPLv3 license or Afterlogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\CoreWebclient;

use Aurora\Api;
use Aurora\System\Application;
use Aurora\System\Module\Decorator;
use Aurora\System\Router;

/**
 * System module that provides Web application core functionality and UI framework.
 *
 * @license https://www.gnu.org/licenses/agpl-3.0.html AGPL-3.0
 * @license https://afterlogic.com/products/common-licensing Afterlogic Software License
 * @copyright Copyright (c) 2023, Afterlogic Corp.
 *
 * @property Settings $oModuleSettings
 *
 * @package Modules
 */
class Module extends \Aurora\System\Module\AbstractWebclientModule
{
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

    /***** private functions *****/
    /**
     * Initializes CoreWebclient Module.
     *
     * @ignore
     */
    public function init()
    {
        \Aurora\System\Router::getInstance()->registerArray(
            self::GetName(),
            [
                'default' => [$this, 'EntryDefault'],
                'error' => [$this, 'EntryDefault'],
                'debugmode' => [$this, 'EntryDefault'],
                'xdebug_session_start' => [$this, 'EntryDefault'],
                'install' => [$this, 'EntryCompatibility']
            ]
        );

        $this->subscribeEvent('Core::UpdateSettings::after', array($this, 'onAfterUpdateSettings'));

        $this->denyMethodsCallByWebApi([
            'SetHtmlOutputHeaders',
        ]);
    }

    /**
     *
     * @param array $aSystemList
     * @return array
     */
    private function getLanguageList($aSystemList)
    {
        $aResultList = [];
        $aLanguageNames = $this->oModuleSettings->LanguageNames;
        foreach ($aSystemList as $sLanguage) {
            if (isset($aLanguageNames[$sLanguage])) {
                $aResultList[] = [
                    'name' => json_decode('"' . $aLanguageNames[$sLanguage] . '"'),
                    'value' => $sLanguage
                ];
            } else {
                $aResultList[] = [
                    'name' => $sLanguage,
                    'value' => $sLanguage
                ];
            }
        }
        return $aResultList;
    }
    /***** private functions *****/

    /***** public functions *****/
    /**
     *
     * @return array
     */
    public function GetSettings()
    {
        \Aurora\System\Api::checkUserRoleIsAtLeast(\Aurora\System\Enums\UserRole::Anonymous);

        $oUser = \Aurora\System\Api::getAuthenticatedUser();
        $oIntegrator = \Aurora\Modules\Core\Module::getInstance()->getIntegratorManager();

        return array(
            'AllowChangeSettings' => $this->oModuleSettings->AllowChangeSettings,
            'AllowClientDebug' => $this->oModuleSettings->AllowClientDebug,
            'AllowDesktopNotifications' => $oUser && null !== $oUser->getExtendedProp(self::GetName() . '::AllowDesktopNotifications') ? $oUser->getExtendedProp(self::GetName() . '::AllowDesktopNotifications') : $this->oModuleSettings->AllowDesktopNotifications,
            'AllowMobile' => $this->oModuleSettings->AllowMobile,
            'AllowPrefetch' => $this->oModuleSettings->AllowPrefetch,
            'AttachmentSizeLimit' => $this->oModuleSettings->AttachmentSizeLimit,
            'AutoRefreshIntervalMinutes' => $oUser && null !== $oUser->getExtendedProp(self::GetName() . '::AutoRefreshIntervalMinutes') ? $oUser->getExtendedProp(self::GetName() . '::AutoRefreshIntervalMinutes') : $this->oModuleSettings->AutoRefreshIntervalMinutes,
            'CustomLogoutUrl' => $this->oModuleSettings->CustomLogoutUrl,
            'DefaultAnonymScreenHash' => $this->oModuleSettings->DefaultAnonymScreenHash,
            'DefaultUserScreenHash' => $this->oModuleSettings->DefaultUserScreenHash,
            'GoogleAnalyticsAccount' => $this->oModuleSettings->GoogleAnalyticsAccount,
            'HeaderModulesOrder' => $this->oModuleSettings->HeaderModulesOrder,
            'IsDemo' => $this->oModuleSettings->IsDemo,
            'IsMobile' => $oIntegrator->isMobile(),
            'LanguageListWithNames' => $this->getLanguageList($oIntegrator->getLanguageList()),
            'MultipleFilesUploadLimit' => $this->oModuleSettings->MultipleFilesUploadLimit,
            'ShowQuotaBar' => $this->oModuleSettings->ShowQuotaBar,
            'ShowQuotaBarTextAsTooltip' => $this->oModuleSettings->ShowQuotaBarTextAsTooltip,
            'QuotaWarningPerc' => $this->oModuleSettings->QuotaWarningPerc,
            'Theme' => $oUser && null !== $oUser->getExtendedProp(self::GetName() . '::Theme') ? $oUser->getExtendedProp(self::GetName() . '::Theme') : $this->oModuleSettings->Theme,
            'ThemeList' => $this->oModuleSettings->ThemeList,
            'HideLogout' => $this->oModuleSettings->HideLogout,
            'BaseUrl' => Application::getBaseUrl(),
        );
    }

    /**
     *
     * @param array $Args
     * @param mixed $Result
     */
    public function onAfterUpdateSettings($Args, &$Result)
    {
        \Aurora\System\Api::checkUserRoleIsAtLeast(\Aurora\System\Enums\UserRole::NormalUser);

        $oUser = \Aurora\System\Api::getAuthenticatedUser();
        if ($oUser && $oUser->isNormalOrTenant()) {
            if (isset($Args['AllowDesktopNotifications'])) {
                $oUser->setExtendedProp(self::GetName() . '::AllowDesktopNotifications', $Args['AllowDesktopNotifications']);
            }
            if (isset($Args['AutoRefreshIntervalMinutes'])) {
                $oUser->setExtendedProp(self::GetName() . '::AutoRefreshIntervalMinutes', $Args['AutoRefreshIntervalMinutes']);
            }
            if (isset($Args['Theme'])) {
                $oUser->setExtendedProp(self::GetName() . '::Theme', $Args['Theme']);
            }

            $oCoreDecorator = \Aurora\Modules\Core\Module::Decorator();
            $oCoreDecorator->UpdateUserObject($oUser);
        }

        if ($oUser && $oUser->Role === \Aurora\System\Enums\UserRole::SuperAdmin) {
            if (isset($Args['Theme'])) {
                $this->setConfig('Theme', $Args['Theme']);
            }
            $Result = $this->saveModuleConfig();
        }
    }

    /**
     * @ignore
     */
    public function SetHtmlOutputHeaders()
    {
        @\header('Content-Type: text/html; charset=utf-8', true);
        $sContentSecurityPolicy = $this->oModuleSettings->ContentSecurityPolicy;
        if (!empty($sContentSecurityPolicy)) {
            $aArgs = [];
            $aAddDefault = [];
            $this->broadcastEvent(
                'AddToContentSecurityPolicyDefault',
                $aArgs,
                $aAddDefault
            );
            if (!empty($aAddDefault)) {
                $aPieces = explode(';', $sContentSecurityPolicy);
                foreach ($aPieces as $iIndex => $sPiece) {
                    $sPrepared = strtolower(trim($sPiece));
                    if (strpos($sPrepared, 'default-src') === 0) {
                        $aPieces[$iIndex] = implode(' ', array_merge([$sPiece], $aAddDefault));
                    }
                }
                $sContentSecurityPolicy = implode(';', $aPieces);
            }
            @\header('Content-Security-Policy: ' . $sContentSecurityPolicy, true);
        }
    }

    /**
     * @ignore
     */
    public function EntryDefault()
    {
        $sResult = '';

        $oIntegrator = \Aurora\System\Managers\Integrator::getInstance();

        self::Decorator()->SetHtmlOutputHeaders();

        $sUserAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
        if (!\strpos(\strtolower($sUserAgent), 'firefox')) {
            @\header('Last-Modified: ' . \gmdate('D, d M Y H:i:s') . ' GMT');
        }

        $oSettings = &\Aurora\System\Api::GetSettings();
        if ($oSettings) {
            if (($oSettings->CacheCtrl && isset($_COOKIE['aft-cache-ctrl']))) {
                @\setcookie(
                    'aft-cache-ctrl',
                    '',
                    \strtotime('-1 hour'),
                    \Aurora\System\Api::getCookiePath(),
                    null,
                    \Aurora\System\Api::getCookieSecure()
                );
                \MailSo\Base\Http::SingletonInstance()->StatusHeader(304);
                exit();
            }
        }

        $sResult = \file_get_contents($this->GetPath() . '/templates/Index.html');
        if (\is_string($sResult)) {
            if ($oSettings) {
                $sFrameOptions = $oSettings->XFrameOptions;
                if (0 < \strlen($sFrameOptions)) {
                    @\header('X-Frame-Options: ' . $sFrameOptions);
                }
            }

            $sResult = strtr($sResult, array(
                '{{AppVersion}}' => Application::GetVersion(),
                '{{IntegratorDir}}' => $oIntegrator->isRtl() ? 'rtl' : 'ltr',
                '{{IntegratorLinks}}' => $oIntegrator->buildHeadersLink(),
                '{{IntegratorBody}}' => $oIntegrator->buildBody()
            ));
        }


        return $sResult;
    }

    /**
     * @ignore
     */
    public function EntryCompatibility()
    {
        $mResult = '';
        if (basename(\MailSo\Base\Http::SingletonInstance()->GetFullUrl()) !== 'adminpanel') { //TODO
            \header("Location: ./");
        }

        $aCompatibilities = \Aurora\Modules\Core\Module::Decorator()->GetCompatibilities();
        $sContent = '';
        $bResult = true;
        foreach ($aCompatibilities as $sModule => $aItems) {
            $sContent .= "<div class=\"row\">
					<h2>Module: " . $sModule . "</h2>
				</div><br />";
            foreach ($aItems as $aItem) {
                $sValue = '';
                if ($aItem['Result']) {
                    $sValue = $this->getSuccessHtmlValue($aItem['Value']);
                } else {
                    if (is_array($aItem['Value']) && count($aItem['Value']) > 0) {
                        $sValue = $this->getErrorHtmlValue($aItem['Value'][0], isset($aItem['Value'][1]) ? $aItem['Value'][1] : '');
                    }
                }
                $sContent .= "<div class=\"row\">
					<span class=\"field_label\"><b>" . $aItem['Name'] . ":</b> </span>
					<span class=\"field_value_limit\">" . $sValue . "</span>
				</div>";
                $bResult &= $aItem['Result'];
            }
        }
        $sContent .= "<br />";

        $sPath = $this->GetPath() . '/templates/Compatibility.html';
        if (\file_exists($sPath)) {
            $sResult = \file_get_contents($sPath);
            if (\is_string($sResult)) {
                $sResult = strtr($sResult, array(
                    '{{Compatibilities}}' => $sContent,
                    '{{Result}}' => $bResult ?
                    'The current server environment meets all the requirements. Click Next to proceed.' :
                    'Please make sure that all the requirements are met and click Retry.',

                    '{{NextButtonHref}}' => ($bResult) ? './' : './?install',
                    '{{ResultClassSuffix}}' => ($bResult) ? '_ok' : '_error',
                    '{{NextButtonName}}' => ($bResult) ? 'next_btn' : 'retry_btn',
                    '{{NextButtonValue}}' => ($bResult) ? 'Next' : 'Retry'

                ));

                $mResult = $sResult;
            }
        }

        return $mResult;
    }

    protected function getSuccessHtmlValue($sValue)
    {
        return '<span class="state_ok">' . $sValue . '</span>';
    }

    protected function getErrorHtmlValue($sError, $sErrorHelp = '')
    {
        $sResult = '<span class="state_error">' . $sError . '</span>';
        if (!empty($sErrorHelp)) {
            $sResult .= '<span class="field_description">' . $sErrorHelp . '</span>';
        }
        return $sResult;
    }

    protected function getWarningHtmlValue($sVarning, $sVarningHelp = '')
    {
        $sResult = '<span class="state_warning"><img src="./images/alarm.png"> Not detected. <br />' . $sVarning . '</span>';
        if (!empty($sVarningHelp)) {
            $sResult .= '<span class="field_description">' . $sVarningHelp . '</span>';
        }
        return $sResult;
    }
}
