<?php
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork authenticication stub class
 *  Always return Guest user with access rights, specified in allowed_scope parameter of constructor
 *  ================================ **/

namespace MLFW\Auth;

use stdClass;

use function MLFW\_dbg;

use const MLFW\USER_GUEST_ID;
use const MLFW\USER_GUEST_LOGIN;

class Stub implements \MLFW\IAuth {
  /** Scope of allowed actions */
  protected $scope=[];
  protected $username;

  public function __construct(array $params=[]) {
    $this->scope = \array_map('\\trim',\explode(',',$params['allowed_scope'] ?? ''));
    $this->username = $params['username'] ?? strtoupper(USER_GUEST_LOGIN[0]).substr(USER_GUEST_LOGIN,1);
  }

  public function impersonate(string $login, string $scope, int|bool|null $lifetime=null):bool {
    return $login===USER_GUEST_LOGIN;
  }

  public function checkAccess(string $action):bool {
    return in_array($action,$this->scope) || in_array('*',$this->scope);
  }

  public function getUserLogin():string {
    return USER_GUEST_LOGIN;
  }

  public function getUserID():int {
    return USER_GUEST_ID;
  }

  public function getUser():object {
    $user = new \stdClass;
    $user->login = $this->getUserLogin();
    $user->id = $this->getUserID();
    $user->password = '*';
    $user->name = $this->username; 
    return $user;
  }

  public function checkPassword(string $login, string $password):bool {
    return true;
  }

  public function isBanned(): bool {
    return false;
  }

  public function isGuest(): bool {
    return true;
  }

  public function logout():void {

  }

  public function generateKey(string $str): string {
    $rand = mt_rand(0,0x7ffffff);
    $crypt_string = \MLFW\app()->config('secret_string');
    return $rand.'-'.\hash("sha256",$rand.$crypt_string.$str);
  }

  public function validateKey(string $str, string $key): bool {
    if (\strpos($key,'-')===false) return false;
    list($rand,$crypted)=explode('-',$key,2);
    $crypt_string = \MLFW\app()->config('secret_string');
    $right_key=\hash("sha256",$rand.$crypt_string.$str);
    return $crypted===$right_key;
  }
}