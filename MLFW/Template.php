<?php
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork basic template class
 *  ================================ **/

namespace MLFW;

use stdClass;
use Stringable,Generator;

#[AllowDynamicProperties]
abstract class Template implements \IteratorAggregate {
  protected $data;
  protected array $subitems;
  public function __construct(object $obj=null) {
    $this->data = $obj; 
  }

  public function getData():mixed {
    return $this->data;
  }

  /** Adds object to objects list in the template. 
  * Template must inherit MLFW\Template class object.
  * @param Stringable $obj Object to wrap with template
  **/
  public function put(Stringable $obj):void {
    $this->subitems[]=$obj;
  }

  /** Adds text string to template 
   * @param string $text Text to add
   **/
  public function putText(string $text):void {
    $this->subitems[]=$this->escape($text);
  }

  /** Wraps object with specified template class and add. 
   * Template must inherit MLFW\Template class object.
   * @param object $obj Object to wrap with template
   * @param string $wrapper Wrapper class name
   **/
  public function wrap(object $obj, string $wrapper):void {
    if (\class_exists($wrapper) && \is_subclass_of($wrapper,'\\MLFW\\Template',true)) { // Allow only Template subclasses for security reasons
      /** @var \Stringable $tmpl */
      $tmpl = new $wrapper($obj);
      $this->put($tmpl);
    }
    else {
      _dbg("Class $wrapper not found!");
    }
  }

  /** Wraps array of object with specified template class. 
   * Template must inherit MLFW\Template class object.
   * @param array $objs Array of objects to wrap with template
   * @param string $wrapper Wrapper class name
   **/  
  public function wrapAll(array $objs, string $wrapper):void { 
    foreach ($objs as $obj) $this->wrap($obj,$wrapper);
  }

  /** Calls specified callback function for each object and wraps it with template class returned by the function.
   * Template must inherit MLFW\Template class object.
   * @param array $objs Array of objects to wrap with template
   * @param callable $cb Callback function. The function should accept one object from $objs array and return template class name as string.
   **/    
  public function wrapCallback(array $objs, callable $cb):void {
    foreach ($objs as $obj) {
      $this->wrap($obj,call_user_func($cb,$obj));
    }
  }

  /** Calls specified method for each object and wraps it with template class returned by the method.
   * Template must inherit MLFW\Template class object.
   * @param array $objs Array of objects to wrap with template
   * @param string $method Method to be called. It should return template class name as string.
   **/    
  public function wrapMethod(array $objs, string $method):void {
    foreach ($objs as $obj) {
      if (\method_exists($obj,$method)) $this->wrap($obj,$obj->$method());
      else _dbg("Object has no method $method!");
    }
  }

  protected function attrEscape(string $str):string {
    return \htmlspecialchars($str,ENT_QUOTES,app()->config('charset','UTF-8'));
  }

  protected function escape(string $str):string {
    return \htmlspecialchars($str,ENT_HTML5,app()->config('charset','UTF-8'));
  }  

  public function getIterator():Generator {
    if (empty($this->subitems) || !\is_iterable($this->subitems)) return;
    yield from $this->subitems;
  }

  /**  This function should return rendered template (for example, HTML code), which can be included to layout template or send directly to user.
   * Usually it called from __toString function (__toString itself can't be abstract)
   **/    
  abstract public function getTemplate():string;

  /** Conversion function, which usually called from parent object template or layout.
   */
  public function __toString():string {
    return $this->getTemplate();
  }
}