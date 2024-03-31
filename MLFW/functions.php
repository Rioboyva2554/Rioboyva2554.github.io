<?php
namespace MLFW;
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  Shortcut functions
 *  ================================ **/

function _dbg($data):void {
  \MLFW\Debug::dbg($data);
}

function app():\MLFW\Application {
  return \MLFW\Root::$app;
}
