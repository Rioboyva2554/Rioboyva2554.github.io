<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork TSV logger 
 *  Stores log data to tab separated files 
 *  using format DATE LEVEL MESSAGE
 *  The date is stored as YYYY-MM-DD HH:MM:SS
 *  ================================ **/

namespace MLFW\Loggers;

class TSVLog implements \Psr\Log\LoggerInterface {
  use \Psr\Log\LoggerTrait; // for functions debug(), info() and so on
  protected $log_file;
  private $log_level = 0;
  private $text_levels;

  public function __construct($options) {
    $ll = new \Psr\Log\LogLevel;
    $reflectionClass = new \ReflectionClass($ll);
    $this->text_levels = \array_reverse(\array_values($reflectionClass->getConstants())); // reversing array to make most severe values highest numbers
    $this->log_file = $options['log_file'] ?? __DIR__.'/../../logs/log.tsv';
    $this->log_level = $options['log_level'] ?? \Psr\Log\LogLevel::WARNING;
    if (!\is_numeric($this->log_level)) $this->log_level = \array_search(\strtolower($this->log_level),$this->text_levels);
  }

  public function log($level, $message, array $context = array()): void {
    $level_num = \array_search(\strtolower($level),$this->text_levels) or 0; // if wrong level specified, using lowest level (debug)
    if ($level_num<$this->log_level) return; // if message level is larger than configured level, just ignoring it
    $filename = $this->log_file;
    $filename = str_replace('%host%',$_SERVER['HTTP_HOST'],$filename);
    $filename = str_replace('%level%', $this->text_levels[$level_num], $filename);
    $filename = str_replace('%date%', \date('Y-m-d'), $filename);
    $fh = \fopen($filename,'a');
    if ($fh) {
      \flock($fh,\LOCK_EX); // locking file to avoid data loss due to multithreading
      \fputs($fh,\date('Y-m-d H:i:s')."\t".\strtoupper($level)."\t".\str_replace("\t"," ",$message).PHP_EOL); // putting string in format DATE LEVEL MESSAGE
    }
    \fclose($fh);
  }
}
