<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork Exception class for HTTP status 405
 *  ================================ **/

namespace MLFW;

class Exception405 extends ExceptionHTTPCode {
  public string $methods;
  public int $http_code;

  /** @param string $methods Array or string with HTTP request methods to output 
   */
  public function __construct(string $methods) {
    $this->methods = $methods;
    parent::__construct('This request method is not allowed!');
  }
} 