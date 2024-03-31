<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork JSON layout class
 *  ================================ **/

namespace MLFW\Layouts;

use stdClass;

use function \MLFW\app;

class JSON extends HTML {
  function __construct(object $obj=null) {
    parent::__construct();
    if ($obj!==null) $this->data=$obj;
    else $this->data = new stdClass;
    $this->setMime('application/json');
  }

  public function wrap(object $obj, string $wrapper): void {
    if (!isset($this->data->items)) $this->data->items=[];
    $this->data->items[]=$obj;
  }

  public function wrapAll(array $objs, string $wrapper): void {
    if (!isset($this->data->items)) $this->data->items=[];
    $this->data->items = $this->data->items + $objs;
  }

  public function wrapMethod(array $objs, string $method): void  {
    if (!isset($this->data->items)) $this->data->items=[];
    $this->data->items = $this->data->items + $objs;    
  }

  public function getTemplate(): string {
    return json_encode($this->data);
  }

  public function putText(string $text): void {
    if (!isset($this->data->items)) $this->data->items=[];
    $this->data->items[]=$text;    
  }
}