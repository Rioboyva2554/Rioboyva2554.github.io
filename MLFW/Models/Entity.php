<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork abstract data entity class
 *  ================================ **/

namespace MLFW\Models;

use DateTime;
use function \MLFW\app, \MLFW\_dbg;

abstract class Entity {
  public $id = null;
  public $created = null;
  public $last_modified;
  public $extra = false;

  /** Default constructor.
   * Decodes extra field from JSON if set, converts created and last_modified from string to DateTime
   */
  function __construct() {
    if (is_string($this->extra)) $this->extra = json_decode($this->extra, false);
    if ($this->created === null) $this->created = new DateTime();
    if (is_string($this->created)) $this->created = new DateTime($this->created);
    if (is_string($this->last_modified)) $this->last_modified = new DateTime($this->last_modified);
  }  

  /** Loads data for object with specified ID anc creates it */
  abstract static function getById(int|string $id):Entity;

  /** Loads multiple objects matching specified conditions and return them as array */
  abstract public static function load(array $conditions = []): array;

  /** Saves object 
   * @return bool True if object saved successfully
   */
  abstract public function save():bool;

  /** Marks object as deleted (but may not delete it from disk or database, it will do the purge function).
   * @return bool True if object deleted successfully
   */
  abstract public function delete():bool;

  /** Completely destroys all object marked as deleted.
   * @return int The number of purged objects
   */
  abstract public static function purge():int;
}