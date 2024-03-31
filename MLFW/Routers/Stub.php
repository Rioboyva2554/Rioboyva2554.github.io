<?php
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork router stub class for single-page apps. 
 *  Always return controller class name specified in constructor
 *  ================================ **/

namespace MLFW\Routers;

class Stub implements \MLFW\IRouter {
  private $action_name;

  public function __construct($params) {
    $this->action_name = $params;
  }

  public function getAction($url):array {
    return [$this->action_name,[]];
  }

  public function route($name,$params=[]):string {
    $base_url = \dirname($_SERVER['PHP_SELF']);
    return $base_url;
  }

  public function fullUrl($name, $params=[]): string {
    $route = $this->route($name, $params);
    $protocol = !empty($_SERVER['HTTPS']) || \MLFW\app()->config('force_https', false) ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    return $protocol . '://' . $host . $route;
  }

}