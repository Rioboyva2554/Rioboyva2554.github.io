<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork flash message template
 *  Outputs flash notifications 
 *  or stores them to session to show on next requests (useful when request results to redirect)
 *  ================================ **/

namespace MLFW;

use function MLFW\app;

class Flash extends Template implements \JsonSerializable {
  static protected $messages = [];
  protected $template_file = __DIR__ . '/templates/flash.php';

  public function __construct(string $text='', string $class='success') {
    // loading messages from session
    app()->session(true); // starting session only if it was created during previous requests
    if (!empty($_SESSION['MLFW_flash'])) Flash::$messages = $_SESSION['MLFW_flash'];
    // one message can be passed directly to constructor to write less lines of code
    if (!empty($text)) $this->add_message($text,$class);
  }

  public function __destruct() {
    if (!empty(Flash::$messages)) { // if there are messages which have not been sent to user, saving them to session
      app()->session(false); // starting session 
      $_SESSION['MLFW_flash'] = Flash::$messages;
    }
    else unset($_SESSION['MLFW_flash']); // if all messages were shown, clearing session data
  }

  public function add_message(string $text,string $class):void {
    Flash::$messages[$text]=$class;
  }

  public function success(string $text):void {
    $this->add_message($text,'success');
  }

  public function info(string $text):void {
    $this->add_message($text,'info');
  }

  public function warning(string $text):void {
    $this->add_message($text, 'warning');
  }

  public function error(string $text):void {
    $this->add_message($text, 'error');
  }
  /** This function is called when messages are printed or outputed any other way (i.e. serialized to JSON).
   * It resets message buffer to avoid printing them again on next requests.
   */
  private function outputDone():void {
    Flash::$messages = [];
  }

  function getTemplate():string {   
    ob_start();
    require $this->template_file;
    $this->outputDone();
    $result = ob_get_contents();
    ob_end_clean();
    return $result;
  }

  /** This function is called when Flash object is serialized to JSON to calculate "result" field.
   * The field will be "error" if any error messages present, "warning" if there is no errors but any warnings and "ok" otherwise.
   */
  protected function getResult():string {
    $classes =  array_unique(array_values(Flash::$messages));
    if (in_array('error',$classes)) return 'error';
    elseif (in_array('warning',$classes)) return 'warning';
    else return 'ok';
  }

  /** This function serialized flash messages and calculates total result field using getResult method. */
  public function jsonSerialize():mixed {
    $this->outputDone();    
    return ['result'=>$this->getResult(),'messages'=>$this->$_SESSION['MLFW_messages']];
  }
}