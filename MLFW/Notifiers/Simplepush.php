<?php
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork Telegram notification class
 * 
 *  Send notification via Simplepush
 *  Bot key must be specified in config entry API_Simplepush_key
 *  ================================ **/

namespace MLFW\Notifiers;

use function \MLFW\app;

class Simplepush implements \MLFW\INotifier {
  const SIMPLEPUSH_URL = 'https://api.simplepush.io/send';
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
    if (empty($extra)) $extra=[];
    $data = \strip_tags($data);
    $params = ['key'=>$this->api_key,'msg'=>$data]+$extra;
    if (!empty($subject)) $params['title']=$subject;
    $req->post(Simplepush::SIMPLEPUSH_URL,$params);
    $http_status = $req->getStatus();
    if ($http_status===200) return \MLFW\NOTIFIER_OK;
    // elseif ($http_status===403) return \MLFW\NOTIFIER_BLOCKED;
    else return $http_status;
  }
}