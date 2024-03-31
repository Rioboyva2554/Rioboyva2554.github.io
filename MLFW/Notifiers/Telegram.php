<?php
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork Telegram notification class
 * 
 *  Send notification via Telegram Bot
 *  Bot key must be specified in config entry API_Telegram_key
 *  ================================ **/

namespace MLFW\Notifiers;

use function \MLFW\app;

class Telegram implements \MLFW\INotifier {
  const TELEGRAM_ALLOWED_TAGS = '<b><strong><i>em><u><ins><s><strike><del><tg-spoiler><a><tg-emoji><code><pre>';
  const TELEGRAM_URL = 'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage';
  protected $api_key;

  public function __construct(array $params) {
    $this->api_key = $params['API_key'];
  }

  public function send(string $receiver, string $data, string $subject, array $files=[], mixed $extra=null):int {
    if (empty($this->api_key)) {
      // TODO: log warning
      return \MLFW\NOTIFIER_NO_API_KEY;
    }
    $req = new \MLFW\Helpers\Requests();
    if (empty($extra['parse_mode'])) $extra['parse_mode']='HTML';
    if ($extra['parse_mode']=='HTML') {
      $data = \strip_tags($data,Telegram::TELEGRAM_ALLOWED_TAGS); // removing tags not allowed by Telegram
    }
    $url = \str_replace('{BOT_TOKEN}',$this->api_key,Telegram::TELEGRAM_URL);
    $params = ['chat_id'=>$receiver,'text'=>$subject."\r\n".$data]+$extra;
    $body = $req->post($url,$params);
    $http_status = $req->getStatus();
    if ($http_status===200) return \MLFW\NOTIFIER_OK;
    elseif ($http_status===403) return \MLFW\NOTIFIER_BLOCKED;
    else return $http_status;
  }
}