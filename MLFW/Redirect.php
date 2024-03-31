<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork redirect class
 *  Throw this class as exception to make redirect to specific location
 *  ================================ **/

namespace MLFW;

class Redirect extends ExceptionHTTPCode {
  public string $location;
  public int $http_code;

  /** @param string $location URL to redirect
   *  @param int $http_code HTTP status code to use for redirection. 
   *   Most common codes are:
   *   301 — permanent redirect
   *   302 — temporary redirect
   *   303 — temporary redirect with GET request instead of POST or any other method
   */
  public function __construct(string $location, int $http_code=301) {
    $this->location = $location;
    // TODO: make $location a full URL if it is relative
    if (!in_array($http_code,[300,301,302,303,307,308])) throw new ExceptionWrongData('Wrong status code in redirect! It should be one of these: 300, 301, 302, 303, 307, 308');
    $this->http_code = $http_code;
    parent::__construct();
  }
} 