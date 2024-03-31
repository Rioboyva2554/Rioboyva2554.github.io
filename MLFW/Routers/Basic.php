<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork basic router class, based on JSON-configurable route rules
 * 
 *  Always return controller class name specified in constructor
 *  ================================ **/

namespace MLFW\Routers;

use stdClass;

class Basic implements \MLFW\IRouter {
  private $params;
  private $default_namespace='';
  private $named_rules = null; // only named rules will be cached

  public function __construct($params) {
    $this->default_namespace = $params['default_namespace'] ?? '';
    $this->params = $params;
  }

  private function loadRules() {
    $route_files = $this->params['route_files'] ?? __DIR__.'/../../routes/*.json'; 
    $filelist = glob($route_files);
    $rules = [];
    foreach ($filelist as $filename) {
      if (is_file($filename) && is_readable($filename)) {
        $data = json_decode(file_get_contents($filename),false);
        if (is_array($data)) {
          /** @var stdClass $route */
          foreach ($data as $route) {
            if (empty($route->action)) \MLFW\_dbg(sprintf('No routing action in route %s!',print_r($route,true)));
            elseif (empty($route->rule)) \MLFW\_dbg(sprintf('No routing pattern in route %s!',print_r($route,true)));
            else {
              if (!empty($route->name)) { // caching named routers to use in route function
                if (!empty($this->named_rules[$route->name])) \MLFW\_dbg(sprintf("Duplicated route name %s!",$route->name));
                $this->named_rules[$route->name]=$route;
              }
              $pattern = str_replace('\\}','}',str_replace('\\{','{',preg_quote($route->rule,'|')));
              $where = $route->patterns ?? [];
              preg_match_all('|{(\w+)}|u',$pattern,$matches);
              $route->named_params = $matches[1];
              $route->processed_pattern = $pattern;
              foreach ($route->named_params as $param) {
                $replace = $where->$param ?? '\\w+';
                $route->processed_pattern = str_replace('{'.$param.'}','('.$replace.')',$route->processed_pattern);
              }
              $rules[]=$route;
            }
          }
        }
        else \MLFW\_dbg(sprintf('Wrong routing data in file %s!',$filename));
      }
      else \MLFW\_dbg(sprintf("Error loading route rules! File %s is not readable!",$filename));
    }
    // TODO: Maybe add priority sorting
    return $rules;
  }

  public function getAction($url): array {
    $url_matched = false;
    $rules = $this->loadRules();
    $allow_methods = [];
    foreach ($rules as $route) {        
      if (\preg_match('|^'.$route->processed_pattern.'$|u',$url,$matches)) {
        $methods = [];
        if (empty($route->methods)) $methods = ['*'];
        elseif (\is_string($route->methods)) $methods = explode(',',$route->methods);
        $methods = array_map('\\strtoupper',array_map('\\trim',$methods)); // making method list uppercase and removing spaces
        $url_matched = true;
        if (in_array(\MLFW\Helpers\HTTP::requestMethod(),$methods) || in_array('*',$methods)) {// if request method is in allowed list or any method allowed
          $params = [];
          for ($i=0, $count=count($route->named_params); $i<$count; $i++) {
            if (isset($matches[$i+1])) $params[$route->named_params[$i]]=$matches[$i+1];
            else \MLFW\_dbg(sprintf('Parameter %s is not matched!',$route->named_params[$i]));
          }
          $result = $route->action;
          if (strpos($result,'\\')===false && $this->default_namespace!=='') $result=$this->default_namespace.'\\'.$result;
          return [$result,$params];
        }
        else $allow_methods = $allow_methods + $methods; // adding methods to output in Allow header
      }
    }
    
    if ($url_matched) throw new \MLFW\Exception405(join(', ',$allow_methods));
    else throw new \MLFW\Exception404('No route for this URL!');
  }

  public function route($name,$params=[]):string {
    $base_url = \str_replace('\\','/',\dirname($_SERVER['PHP_SELF'])); // str_replace is to change Windows dir styles to Unix ones
    if ($this->named_rules===null) $this->loadRules();
    $result='';
    if (empty($this->named_rules[$name])) \MLFW\_dbg(sprintf('No route with name %s!',$name));
    else {
      $result = $this->named_rules[$name]->rule;
      foreach ($params as $key=>$value) {
        $result = str_replace('{'.$key.'}',urlencode($value),$result);
      }
      $result = $base_url.$result;
    }
    return $result;
  }

  public function fullUrl($name,$params=[]):string {
    $route = $this->route($name,$params);
    $protocol = !empty($_SERVER['HTTPS']) || \MLFW\app()->config('force_https', false) ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    return $protocol.'://'.$host.$route;
  }
}