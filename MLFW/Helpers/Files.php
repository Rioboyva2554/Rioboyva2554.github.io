<?php

/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork HTML Cleaner helper class
 * 
 *  Removes unallowed HTML tags or tag attributes
 *  ================================ **/

namespace MLFW\Helpers;

class Files {
  /** Checks if relative filename doesn't contain unsafe or invalid charaters  
   * and does not allow to open files in root or parent directory.
   * List of disallowed symbols: `\'":;,&<>$| and any sybmols with ASCII codes less than 32
   * @param string $filename Filename to check
   * @return bool True if filename is valid and secure
   *  */
  public static function isNameValid(string $filename):bool {    
    if (strlen($filename)>PHP_MAXPATHLEN || strlen(basename($filename))>255) return false; // if filename is too long, it is not valid
    $filename = str_replace('\\', '/', $filename);
    return !preg_match('#^/|\.\.|[`\'":;,&<>$\|]|[\x00-\x1f]#', $filename); 
  }
}