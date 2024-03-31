<?php

namespace PCatalog\Models;

use MLFW\ExceptionMisconfig;
use MLFW\ExceptionWrongData;
use MLFW\Models\Entity;
use function MLFW\_dbg;

class Guestbook extends \MLFW\Models\Entity {
  public $status = 0;
  public $owner = null;
  public $text;
  public $email;

  public function __construct() {
    parent::__construct();
    $this->status=2;
  }

  public function __get($name) {
    if ($name==='title') return $this->owner.': '.$this->firstWords($this->text,5);
  }

  private function firstWords(string $text, $count = 5): string {
    $words = explode(" ", $text);
    return implode(" ", array_slice($words, 0, $count));
  }


  public static function getById(int|string $id): Entity {
    // TODO: load object
    return new Guestbook();
  }

  public static function load(array $conditions=[]):array {
    $result = [];
    if (!empty($conditions['premod'])) $dirname = __DIR__.'/../data/guestbook/premod/';
    else $dirname = __DIR__.'/../data/guestbook/';
    $files = array_reverse(glob($dirname.'*.json'));
    if (!empty($conditions['limit'])) $files=array_slice($files,0,$conditions['limit']);
    foreach ($files as $file) {
      $data = unserialize(file_get_contents($file));
      if ($data) $result[]=$data;
    }
    return $result;
  }

  public function save():bool {
    if ($this->status==2) $dirname = __DIR__.'/../data/guestbook/premod/';
    elseif ($this->status==3) $dirname = __DIR__ . '/../data/guestbook/trash/';
    else $dirname = __DIR__.'/../data/guestbook/';
    if (!\is_writable($dirname)) throw new ExceptionMisconfig('Data directory is not writable!'); // TODO: add logging
    $seconds = \time()-\strtotime('today');
    $filename = date('Y-m-d_');
    $try=0;    
    $fullname = $dirname.$filename;
    $fh = @fopen($fullname.$seconds.'.json','x');
    while (!$fh) {
      $try++;
      $seconds++;
      $fh = @fopen($fullname.$seconds.'.json','x');
      if ($try>255) throw new ExceptionWrongData();
    }    
    if ($fh) {
      if (empty($this->id)) $this->id = $filename.'_'.$seconds;
      fputs($fh,serialize($this));
      fclose($fh);
      return true;
    } 
    return false;
  }

  public function delete():bool {
    $this->status = 3; // Object with status 1 is marked for deletion
    return $this->save();
  }

  public static function purge(): int {
    $dirname = __DIR__ . '/../data/guestbook/trash/';
    $trash = \glob($dirname.'*.json');
    $counter = 0;
    foreach ($trash as $file) {
      if (\unlink($file)) $counter++;
    }
    return $counter;
  }

  public function validate():array {
    
    return [];
  }
}