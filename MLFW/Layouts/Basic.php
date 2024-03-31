<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork basic layout class (defaults to text/plain )
 *  ================================ **/

namespace MLFW\Layouts;

use MLFW\Debug;

use function \MLFW\app;

class Basic extends \MLFW\Template {
  protected $mime = 'text/plain';
  protected $charset = 'utf-8';
  protected $last_modified =  null;
  protected $headers = [];

  public function __construct() {
    header_register_callback([$this,'headersOutput']);
  }

  public function setMime($mime):void {
    $this->mime = $mime;
  }

  public function setCharset($charset):void {
    $this->charset = $charset;
  }

  public function setHeader($name,$value):void {
    $this->headers[$name]=$value;
  }

  public function addHeader($name,$value):void {
    if (!empty($this->headers[$name])) $this->headers.=', '.$value;
    else $this->headers[$name]=$value;
  }

  public function headersOutput():void {
    if (empty($this->headers['Content-Type'])) $this->headers['Content-Type']=$this->mime.'; charset='.$this->charset;
    if (empty($this->last_modified)) $this->last_modified = time(); // if no last modification date set, use now date
    if (empty($this->headers['Last-Modified'])) $this->headers['Last-Modified']=gmdate('D, d M Y H:i:s \G\M\T',$this->last_modified);
    if (empty($this->headers['Content-Length'])) $this->headers['Content-Length']=ob_get_length();
    foreach ($this->headers as $name=>$value) header($name.': '.$value);
  }

  public function getTemplate(): string {
    $result = '';
    foreach ($this as $obj) $result.=(string)$obj;
    if (app()->config('debug',false) && !Debug::isEmpty()) $result.=PHP_EOL.PHP_EOL.'DEBUG INFO: '.PHP_EOL.Debug::output();
    return $result;
  }
}