<?php

namespace PCatalog\Actions;

use Exception;
use PCatalog\Models\Guestbook as ModelGuestbook;
use stdClass;

use function \MLFW\app, \MLFW\_dbg;

class Guestbook implements \MLFW\IAction {
  const MODERATE_NONE = 0; // always pass new messages with no premoderation
  const MODERATE_ONLY_LINKS = 1; // puts message to premoderation if links or phones detected
  const MODERATE_ALWAYS = 2; // always put new messages to premoderation

  public function exec($params=null):\MLFW\Layouts\Basic {
    $l =  new \PCatalog\Layouts\Guestbook;
    // $l =  new \MLFW\Layouts\RSS();
    $l->setDescription(app()->config('site_descr'));
    $l->addLink('canonical',app()->router->fullUrl('guestbook'));

    $l->addLink('stylesheet','./www-dev/s/surface.css');
    $flash = new \MLFW\Flash();
    $l->put($flash);

    if (\MLFW\Helpers\HTTP::isPost()) {
      $new_item = new ModelGuestbook;
      $new_item->text =  filter_input(INPUT_POST,'text',FILTER_DEFAULT);
      $new_item->owner = filter_input(INPUT_POST,'owner',FILTER_SANITIZE_SPECIAL_CHARS);
      $new_item->extra = new stdClass;
      $new_item->extra->email = filter_input(INPUT_POST,'email',FILTER_SANITIZE_EMAIL);
      $new_item->extra->ip = filter_input(INPUT_SERVER,'REMOTE_ADDR',FILTER_VALIDATE_IP,FILTER_FLAG_IPV4|FILTER_FLAG_IPV6);
      $mode = app()->config('guestbook_premoderate_mode',2);
      $new_item->status = $mode; 
      if ($mode==Guestbook::MODERATE_ONLY_LINKS) { // checking for links or phones
        $domains = 'aero|biz|com|edu|gov|info|int|mobi|name|net|org|pro|tel|travel|online|guru|club|ru|su|moscow|eu|ua|com\\.ua|kz|kg|by|uz|ge|az|am|co\\.il|ру|рф'; // TLD domains to recognize
        $text = ' '.$new_item->text.' ';
        if (\preg_match('|https?://|i',$text) ||
          \preg_match("/[a-z\-]\.($domains)\W/i",$text) ||
          \preg_match('|\+?\d{1,3}\s*\(?\d{3,5}\)?\s*\d{1,3}[—–\-\s]*\d{2}[—–\-\s]*\d{2}|',$new_item->text)) $new_item->status = 2;
        else $new_item->status = 0;
      }
      try {
        $new_item->save();
        if ($new_item->status==2) $flash->info('Ваше сообщение поставлено на премодерацию!');
        else $flash->success('Ваше сообщение отправлено!');
        $notifications = app()->config('guestbook_notifications',[]);
        if (!empty($notifications)) {
          $notify_sender = new \MLFW\Notification;
          foreach ($notifications as $receiver=>$notifier) {
            $notify_sender->send($notifier,$receiver,"<b>".$new_item->owner."</b> пишет:\r\n".$new_item->text,'Новое сообщение в гостевой книге');
          }
        }
        app()->events->dispatch(new \MLFW\Event("newpost",['item'=>$new_item]));
      }
      catch (Exception $e) {
        $flash->error('Ошибка сохранения: '.$e->getMessage());
      }
      throw new \MLFW\Redirect("./",303);
    }
    $l->form = new \PCatalog\Templates\GuestbookForm;
    $messages = \PCatalog\Models\Guestbook::load();
    $l->wrapAll($messages,'\\PCatalog\\Templates\\GuestbookEntry');
    _dbg(\sprintf('Memory usage: %d bytes, %d full.',memory_get_peak_usage(),memory_get_peak_usage(true)));

    return $l;
  } 
}