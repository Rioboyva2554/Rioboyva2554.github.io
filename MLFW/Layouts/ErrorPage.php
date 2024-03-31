<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork ErrorPage layout class
 *  ================================ **/

namespace MLFW\Layouts;

use MLFW\Debug;

use function \MLFW\app;

class ErrorPage extends HTML {
  public function getBody():string {
    $result='<h1><span>'.http_response_code().' Error</span></h1>';
    foreach ($this as $subitem) {
      $result.=(string)$subitem.PHP_EOL;
    }
    return $result;
  }
}