<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork logger stub class — just do nothing
 *  ================================ **/

 namespace MLFW\Loggers;

 class Stub implements \Psr\Log\LoggerInterface {
  public function emergency($message, array $context = array()):void {}
  public function alert($message, array $context = array()):void {}
  public function critical($message, array $context = array()):void {}
  public function error($message, array $context = array()):void {}
  public function warning($message, array $context = array()):void {}
  public function notice($message, array $context = array()):void {}
  public function info($message, array $context = array()):void {}
  public function debug($message, array $context = array()):void {}
  public function log($level, $message, array $context = array()):void {}
 }