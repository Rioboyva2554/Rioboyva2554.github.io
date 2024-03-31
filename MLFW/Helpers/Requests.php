<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork Requests helper
 * 
 *  Allows to make GET and POST HTTP requests 
 *  and download files to specified location.
 *  ================================ **/

namespace MLFW\Helpers;

class Requests {
  protected $ch;
  protected $last_info;

  public function __construct(array $opts=[]) {
    if (\function_exists('\\curl_init')) {
      $this->ch = \curl_init();
      \curl_setopt($this->ch,\CURLOPT_RETURNTRANSFER,1);
      \curl_setopt($this->ch,\CURLOPT_FOLLOWLOCATION,true); 
      \curl_setopt_array($this->ch,$opts);
    }
    // TODO: add using of fopen if fopen.allow_url enabled
    else throw new \MLFW\ExceptionMisconfig('Curl extension is not loaded!');    
  }

  public function __destruct() {
    if (!empty($this->ch)) \curl_close($this->ch);
  }

  public function setHeaders(array $headers) {
    \curl_setopt($this->ch,\CURLOPT_HTTPHEADER,$headers);
  }

  public function setUserAgent(string $agent):void {
    \curl_setopt($this->ch,\CURLOPT_USERAGENT,$agent);
  }

  public function setTimeout(int $timeout) {
    \curl_setopt($this->ch,\CURLOPT_TIMEOUT,$timeout);
  }

  public function setOpt(int $option, mixed $value) {
    \curl_setopt($this->ch,$option,$value);
  }

  public function setCookies(string $cookies) {
    \curl_setopt($this->ch,\CURLOPT_COOKIE,$cookies);
  }

  /** Sets file where cookies are saved. If file already exists, loads cookies from it. */
  public function setCookieJar(string $filename) {
    if (\is_readable($filename)) \curl_setopt($this->ch,\CURLOPT_COOKIEFILE,$filename);
    \curl_setopt($this->ch,\CURLOPT_COOKIEJAR,$filename);
  }

  /** Return HTTP status code of last request */
  public function getStatus():int {
    return $this->last_info['http_code'];
  }

  /** Return information about last request. See curl_getinfo for description */
  public function getRequestInfo():array {
    return $this->last_info;
  }  

  public function getLastError():int {
    return \curl_errno($this->ch);
  }

  public function getLastErrorDescription():string {
    return \curl_error($this->ch);
  }

  /** Makes GET request and returns it result.
   * @param string $url string URL to make request
   * @param mixed $params String or hash array with parameters to be added to request URL
   * @return string The document body returned by server
   */
  public function get(string $url, mixed $params=null):string {
    if (\is_array($params)) $params = \http_build_query($params);
    if (!empty($params)) $params= (\strpos($url,'?')===false ? '?'.$params : '&'.$params); // if some parameters are in $url, new pareameters should be added with &

    \curl_setopt($this->ch,\CURLOPT_HTTPGET,true);
    \curl_setopt($this->ch,\CURLOPT_URL,$url.$params);
    $result = \curl_exec($this->ch);
    $this->last_info = \curl_getinfo($this->ch);
    return $result;
  }

  /** Makes POST request and returns it result.
   * @param string $url string URL to make request
   * @param mixed $params String or hash array with parameters to send in request body
   * @return string The document body returned by server
   */  
  function post(string $url,mixed $params):string {
    if (\is_array($params)) $params = \http_build_query($params);

    \curl_setopt($this->ch,\CURLOPT_POST,true);
    \curl_setopt($this->ch,\CURLOPT_URL, $url);
    \curl_setopt($this->ch,\CURLOPT_POSTFIELDS,$params);
    $result = \curl_exec($this->ch);
    $this->last_info = \curl_getinfo($this->ch);    
    return $result;
  }

  // TODO: Add PUT and DELETE methods
  
  /** Makes GET request and saves its result to specified file
   * @return int Number of bytes received and written to file
   */
  public function download(string $url, string $filename, mixed $params=null):int {
    \curl_setopt($this->ch,\CURLOPT_FILE,$filename);
    $this->get($url,$params);
    return $this->last_info['size_download'];
  }
}