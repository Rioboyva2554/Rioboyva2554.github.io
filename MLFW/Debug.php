<?php 
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork debug class
 *  ================================ **/

namespace MLFW;

class Debug {
  /** @var string **/
  static private $data = '';

  static public function dbg($params): void {
    foreach (func_get_args() as $name=> $value) {
      Debug::$data .= $name.': '.var_export($value,true).PHP_EOL;
    }
  }

  static public function isEmpty():bool {
    return empty(Debug::$data);
  }
  
  static public function output():string  {
    return Debug::$data;
  }
}