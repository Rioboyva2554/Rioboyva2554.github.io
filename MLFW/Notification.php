<?php
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork main notifier class
 * 
 *  Provides unified interface to call specific notification providers like Emails, Telegram Bots and so on
 *  ================================ **/

namespace MLFW;

use Exception;

class Notification {

  /** Sends notification using specified notification provider. 
   * Provider classes
   * If provider class is
   * @param string $name Name of notification provider class (like Email, Telegram and so on)
   * @param string $receiver Provider-specific ID of receiver (Email addresss, Telegram chat id, VK id and so on)
   * @param string $message Text of notification message to send. Can contain HTML markup if provider suports it.
   * @param array $files Attached files if neeed
   * @param mixed $extra Provider-specific extra message data
   * @return int Zero if sending was successful, -1 if notification provider not found or any non-zero provider-specific error code
   * 
   * **/
  public static function send(string $name, string $receiver, string $message, string $subject, array $files=[], mixed $extra=null):int {
    $classnames = [$name,'\\MLFW\\Notifiers\\'.$name]; // TODO: add all namespace variants for classname checking with application\Notifiers namespace first and MLFW\Notifiers next
    $config = app()->config('notification_settings',[]); 
    foreach ($classnames as $classname)  {
      if (class_exists($classname)) {
        if (!empty(class_implements($classname)['MLFW\\INotifier'])) {
          $notifier = new $classname($config[$classname] ?? []); // passing config parameters to constructor. The key in notification_settings hash must match full class path
          return $notifier->send($receiver,$message,$subject,$files,$extra); // if class found, executing it's send method and exiting
        }
      }
    }
    _dbg("Notification provider ".htmlspecialchars($name)." class is missing!");
    // TODO: add logging
    return -1;
  }

  // TODO: Add function for mass notification sending
}