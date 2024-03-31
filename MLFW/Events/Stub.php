<?php
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork event processing stub class — just do nothing
 *  ================================ **/

namespace MLFW\Events;

use function MLFW\_dbg;

class Stub implements \Psr\EventDispatcher\EventDispatcherInterface {
  public function __construct($params) {
  }
 
  /** Really this class do nothing */
  public function dispatch(object $event) {
    return $event;
  }
}