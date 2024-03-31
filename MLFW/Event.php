<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork Event class
 *  Implements PSR-14-compatible event class
 *  ================================ **/

namespace MLFW;

#[AllowDynamicProperties]
class Event implements \Psr\EventDispatcher\StoppableEventInterface {
  private bool $stopped = false;
  /** Event name used for event dispatching */
  protected string $MLFW_event_name;
  /** Array with event data. */
  protected array $MLFW_event_data;

  public function __construct($name,$data=[]) {
    $this->MLFW_event_name = $name;
    $this->MLFW_event_data = $data;
  }

  // Getter and setter for accessing event data as object properties 
  public function __get($name):mixed {
    return $this->MLFW_event_data[$name];
  }

  public function __set($name, $value):void {
    $this->MLFW_event_data[$name]=$value;    
  }

  public function __isset($name):bool {
    return isset($this->MLFW_event_data[$name]);
  }

  public function __unset($name):void {
    unset($this->MLFW_event_data[$name]);
  }

  public function getName():string {
    return $this->MLFW_event_name;
  }

  public function stopPropagation():void {
    $this->stopped = true;
  }

  public function isPropagationStopped():bool {
    return $this->stopped;
  }
}