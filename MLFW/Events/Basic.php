<?php
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork event processing class
 *  ================================ **/

namespace MLFW\Events;

use function MLFW\_dbg;

class Basic implements \Psr\EventDispatcher\EventDispatcherInterface, \Psr\EventDispatcher\ListenerProviderInterface {
  private $params;
  private $default_namespace='';

  public function __construct($params) {
    $this->default_namespace = $params['default_namespace'] ?? '';
    $this->params = $params;
  }

  public function getListenersForEvent(object $event): iterable {
    $event_name = $event->getName();
    $events_dir = $this->params['events_dir'] ?? __DIR__.'/../../events'; 
    if (!preg_match('|^\w+$|',$event_name)) throw new \MLFW\ExceptionSecurity(\sprintf("Wrong event name: %s!",$event_name));
    $filelist = glob($events_dir.'/'.$event_name.'/*.txt');
    $handlers = [];
    foreach ($filelist as $file) {
      $handlers+=file($file,FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES);
    }
    return $handlers;
  }

  /** Passes event to all registered handlers. 
   * @param \MLFW\Event $event Objet, contating event name and data
   */
  public function dispatch(object $event) {
    $name = $event->getName();
    $handlers = $this->getListenersForEvent($event);
    $handlers = str_replace('\\\\','\\',$handlers); // to avoid programer mistakes, caused by \\ in common text files
    foreach ($handlers as $handler) {
      try {
        if (strpos($handler,'\\')===false && $this->default_namespace!=='') $result=$this->default_namespace.'\\'.$handler;        
        if (class_exists($handler) && !empty(class_implements($handler)['MLFW\IEventHandler'])) $handler::handleEvent($event); 
        else _dbg(\sprintf("Event \"%s\", handler class %s not found or not implementing IEventHandler interface, skipping!",$name,$handler));
        if ($event->isPropagationStopped()) break; // if propagation stopped, exiting event processing loop
      }
      catch (\MLFW\ExceptionHTTPCode $e) { // if handler throw any of status exception (Exception404, Exception403 and so on), rethrow it to process in main application class
        throw $e;
      }
      catch (\MLFW\ExceptionSecurity $e) {
        // TODO: add logging
        _dbg(\sprintf("Security exception: %s for event %s in handler %s",$e->getMessage(),$name,$handler));
      }
      catch (\Exception $e) {
        _dbg(\sprintf("Exception: %s for event %s in handler %s",$e->getMessage(),$name,$handler));
      }
    }
    return $event;
  }
}