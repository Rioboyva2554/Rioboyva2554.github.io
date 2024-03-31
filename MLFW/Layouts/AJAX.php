<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork HTML layout class
 *  ================================ **/

namespace MLFW\Layouts;

use MLFW\Debug;

use function \MLFW\app;

class AJAX extends HTML {
  public function getTemplate(): string {
    // TODO: Add HTML minification
    return $this->getBody();
  }  
}