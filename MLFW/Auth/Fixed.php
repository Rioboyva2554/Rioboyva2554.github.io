<?php
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork authenticication class for fixed user list
 *  Authenticicates users from list passed to $params['users'] in constructor
 *  The list should be hash, where keys are logins 
 *  and values are either strings with crypted or plaintext passwords
 *  either hashes with user options (password is required, scope, name, id are optional).
 *  ================================ **/

namespace MLFW\Auth;

use function MLFW\app, MLFW\_dbg;

class Fixed implements \MLFW\IAuth {  
  protected $userdata;
  protected $scope;

  protected $userlist;
  protected $guest_scope;
  protected $default_scope;
  protected $cookie_name;
  protected $cookie_domain;
  protected $cookie_path;

  public function __construct($params=[]) {
    $this->userlist = $params['users'] ?? [];
    $this->guest_scope = $params['guest_scope'] ?? ''; // by default guest has no any rights
    $this->default_scope = $params['default_scope'] ?? '*'; // and registered user will have any rights by default
    $this->cookie_name = $params['cookie_name'] ?? 'MLFW_auth'; 
    $this->cookie_domain = $params['cookie_domain'] ?? ''; 
    $this->cookie_path = $params['cookie_path'] ?? ''; 
    $cookie = filter_input(INPUT_COOKIE,$this->cookie_name,FILTER_SANITIZE_SPECIAL_CHARS);
    $user_loaded = false;
    if (!empty($cookie) && \strpos($cookie,':')!==false) { // cookie must in format login:password_hash. If no : found, cookie is malformed and guest mode will be used
      list($login,$key)=explode(':',$cookie,2); 
      $user = $this->getUserFromList($login);
      if (!empty($user)) { // if user found, checking his key
        $pass = $user['password'];
        if (\password_verify($pass,$key)) { // if key is right, loading
          $scope = $user['scope'];
          $user_loaded = $this->impersonate($login,$scope);
        }
      }
    }
    if (!$user_loaded) $this->impersonate(\MLFW\USER_GUEST_LOGIN,$this->guest_scope);
  }

  /** Loads specified user profile as currently active user.
   * 
   */
  function impersonate($login,$scope='*',bool|int|null $lifetime=null):bool {
    if (!$login || $login===\MLFW\USER_GUEST_LOGIN) {
      $newdata = ['login'=>\MLFW\USER_GUEST_LOGIN,'scope'=>$scope,'id'=>\MLFW\USER_GUEST_ID,'password'=>'*'];
      if ($lifetime!==null && isset($_COOKIE[$this->cookie_name])) \setcookie($this->cookie_name,"",1,$this->cookie_domain,$this->cookie_path,false,true);  // will send cookie reset header only if cookie already set. If no cookie was received, no reason to reset it
    }
    else {
      $newdata = $this->getUserFromList($login);
      if (empty($newdata)) return false;
      $hash = \password_hash($newdata['password'],\PASSWORD_DEFAULT);
      $expires = time()+$lifetime;
      if ($lifetime!==null) \setcookie($this->cookie_name,$login.':'.$hash,$expires,$this->cookie_domain,$this->cookie_path,false,true);
    }
    $this->userdata = $newdata;
    $this->scope = $scope;
    return true;
  }

  /** Checks if current user has rights to perform specified action.
   * @param string $action 
   */
  public function checkAccess(string $action):bool {
    return in_array($action,$this->scope) || in_array('*',$this->scope);
  }

  function isGuest():bool {
    return $this->userdata['login']===\MLFW\USER_GUEST_LOGIN;
  }

  /** Returns user login (unique and only lowercase letters and digits) */
  function getUserLogin():string {
    return $this->userdata['login'];
  }

  public function getUserID():int {
    return $this->userdata['id'];
  }  

  /** Returns user display name */
  function getUserName():string {
    return $this->userdata['name'];
  }

  /* function getUserParam($param_name,$default=false) {
    return $this->userdata->$param_name ?? $default;
  }*/

  function checkPassword(string $login, string $password): bool {
    $user = $this->getUserFromList($login);
    if (empty($user)) return false;
    return $password===$user['password'] || \password_verify($password,$user['password']); // password in user settings may be either plaintext or crypted with password_hash
  }

  function isBanned(): bool {
    return false; // TODO: add checks by IP
  }

  function getUser():object {
    $user = new \stdClass;
    $user->login = $this->getUserLogin();
    $user->id = $this->getUserID();
    $user->password = '*';
    $user->name = mb_convert_case($user->login,\MB_CASE_TITLE); 
    return $user;
  }

  function logout(): void {
    $this->impersonate(\MLFW\USER_GUEST_LOGIN,$this->guest_scope,-1);
  }

  function getUserFromList($login) {
    if (empty($this->userlist[$login])) return null;
    if (is_array($this->userlist[$login])) { 
      if (empty($this->userlist[$login]['password'])) throw new \MLFW\ExceptionMisconfig(sprintf('User %s has no password set.',$login));
      $user = $this->userlist[$login];
    }
    else $user = ['password'=>$this->userlist[$login]]; // if only password string is given, transforming it to hash
    if (empty($user['id'])) $user['id']=array_search($login,array_keys($this->userlist))+1; // users ids enumeration starts from 1
    if (empty($user['scope'])) $user['scope'] = $this->default_scope;
    return $user;
  }

  public function generateKey(string $str): string {
    $rand = mt_rand(0, 0x7ffffff);
    $crypt_string = \MLFW\app()->config('secret_string');
    return $rand.'-'.\hash("sha256",$rand.$crypt_string.$this->userdata['password'].$str.$this->userdata['login']);
  }

  public function validateKey(string $str, string $key): bool {
    if (\strpos($key, '-') === false) return false;
    list($rand, $crypted) = explode('-', $key, 2);
    $crypt_string = \MLFW\app()->config('secret_string');
    $right_key = \hash("sha256",$rand.$crypt_string.$this->userdata['password'].$str. $this->userdata['login']);
    return $crypted === $right_key;
  }
 
}