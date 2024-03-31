<?php
/** ================================
 *  @package MLFW
 *  @author 4X_Pro <me@4xpro.ru>
 *  @version 0.90
 *  @url 
 *  MindLife FrameWork basic application class
 *  ================================ **/

namespace MLFW;

require __DIR__."/interfaces.php";

class Application implements \Psr\Log\LoggerAwareInterface {
  private $_params;
  /** @var \Psr\Log\LoggerInterface */
  public $log;
  /** @var \PDO */
  public $db;
  /** @var \MLFW\IRouter */
  public $router;
  /** @var \Psr\EventDispatcher\EventDispatcherInterface */
  public $events;
  /** @var \MLFW\IAuth */
  public $auth;

  function __construct($params) {
    $this->_params = $params;
    $default_values = [
      'logger'=>'MLFW\\Loggers\\Stub',
      'logger_settings'=>null,
      'router'=>'MLFW\\Routers\\Stub',
      'router_settings'=>null,
      'events'=>'MLFW\\Events\\Basic',
      'events_settings'=>null,
      'auth'=>'MLFW\\Auth\\Stub',
      'auth_settings'=>null,
      'ob_handler'=>null,
      'force_https'=>false,
      'error_reporting'=>0,
      'display_errors'=>0,
      'debug'=>0,
      'charset'=>'utf-8',
      'session_name'=>'MLFW_sid',
      'secret_string'=>'vexqawdr51@$#'
    ];
    foreach ($default_values as $key=>$def_value) if (!isset($this->_params[$key])) $this->_params[$key]=$def_value;    
  }

  function init() {
    if (!\function_exists('app')) require __DIR__."/functions.php";
    // starting output buffering
    \ob_start($this->_params['ob_handler']);
    // enabling errors display
    \ini_set("error_reporting",(string)$this->_params['error_reporting']);
    \ini_set("display_errors",(string)$this->_params['display_errors']);
    // creating logger class and setting it via setLogger method to comply PSR-3
    $this->setLogger(new $this->_params['logger']($this->_params['logger_settings']));    
    // initializing database if needed
    $this->initDB();
    // creating router class
    $this->router = new $this->_params['router']($this->_params['router_settings']);
    // creating events processor
    $this->events = new $this->_params['events']($this->_params['events_settings']);
    // user should be initialized when other components are ready
    $this->initUser();
  }

  function initDB() {
    if (!empty($this->_params['databases'])) { 
      $err_msg = '';
      foreach ($this->_params['databases'] as $dbdata) {
        try {
          $this->db = new \PDO($dbdata['dsn'],$dbdata['user'],$dbdata['password'],$dbdata['options']);
          break; // if connected successfully, no need to try other databases
        }
        catch (\PDOException $e) {
          $err_msg.= $e->getMessage();
        }
      }
      if (!\is_object($this->db)) throw new \PDOException("Unable to connect to any of databases! ".$err_msg);
    }
  }

  function initUser() {
    $this->auth = new $this->_params['auth']($this->_params['auth_settings']);
    if ($this->auth->isBanned()) throw new ExceptionBanned('You are not allowed to visit this site!');
  }

  /** Starts PHP session. If session is already started, does nothing. 
   * If sessions are disabled in PHP configuration, throws ExceptionMisconfig. 
   * For security reasons parameter cookie_httponly is always set.
   *  @param bool $only_if_exists — Start session only if it has already created in previous requests and it's ID is passed via $_COOKIES, $_GET or $_POST.
   *  @param array $params — Parameters to be passed to session_start function.  
   *  @return bool — True if session has been created
   */
  function session(bool $only_if_exists=false, array $params=[]):bool {
    $sess_name = $this->config('session_name','MLFW_sid');
    if ($only_if_exists && empty($_COOKIE[$sess_name]) && empty($_GET[$sess_name]) && empty($_POST[$sess_name])) return false; // if no session ID present,  
    \session_name($sess_name);    
    $status = \session_status();
    if ($status === \PHP_SESSION_DISABLED) throw new ExceptionMisconfig('Sessions are disabled in PHP settings');
    elseif ($status === \PHP_SESSION_NONE) { 
      if (empty($params['cookie_httponly'])) $params['cookie_httponly']=1;
      if (empty($params['cookie_samesite'])) $params['cookie_samesite']='Lax';
      if (empty($params['cookie_secure']) && !empty($_SERVER['HTTPS']))  $params['cookie_secure']=true; // if request via https, set "secure" attribute for cookie
      return \session_start($params);
    }
    return false;
  }

  public function setLogger(\Psr\Log\LoggerInterface $logger):void {
    $this->log = $logger;
  }

  /** Returns parameter from application configuration. If parameter is not set, returns specified default value.
   * @param string $param Parameter name
   * @param mixed $default_value Default value to return if parameter is not defined.
   */
  function config(string $param, mixed $default_value=null):mixed {
    return $this->_params[$param] ?? $default_value;
  }

/*  function class_fqn(string $classname, string $interface):string {
    if (strpos($classname,'\\')===false) { // if no namespace specified

    }
    else $classnames = [$classname];
    if (empty(class_implements($classname)[$interface])) throw new ExceptionClassNotFound(htmlspecialchars("Class $classname not found or does not implement interface $interface."));
    return $classname;

  }*/

  function main():void {
    try {
      $this->init();

      $base_url = \dirname($_SERVER['PHP_SELF']);
      if ($base_url!=='/' && $base_url!=='\\') $url = \str_replace($base_url,'',$_SERVER['REQUEST_URI']);
      else $url = $_SERVER['REQUEST_URI'];
      
      list($controller_class,$controller_params) = $this->router->getAction($url);
      if (!\class_exists($controller_class)) throw new Exception404("Class $controller_class not found!");
      $controller = new $controller_class($controller_params);
      $result = $controller->exec(null);
      print $result;
    } 
    catch (ExceptionAlert $e) {
      if (is_object($this->events)) $this->events->dispatch(new Event('MLFW_alert', ['exception' => $e]));
      if (is_object($this->log)) $this->log->alert(print_r($e, true)); // 
      $this->showError(500, 'Configuration error: ' . $e->getMessage(), $e);
    }
    catch (ExceptionMisconfig $e) {
      if (is_object($this->events)) $this->events->dispatch(new Event('MLFW_error_config',['exception'=>$e]));
      if (is_object($this->log)) $this->log->critical(print_r($e,true)); // 
      $this->showError(500,'Configuration error: '.$e->getMessage(),$e);
    }
    catch (ExceptionSecurity $e) {
      if (is_object($this->events)) $this->events->dispatch(new Event('MLFW_error_security', ['exception' => $e]));
      if (is_object($this->log)) $this->log->error(print_r($e, true));  // security exception should be treated as common errors:
      $this->showError(500,'Security error: '.$e->getMessage(),$e);
    } 
    catch (Exception403 $e) {
      // Just in case let's add event dispatching for 403 error
      if (is_object($this->events)) $this->events->dispatch(new Event('MLFW_error_403', ['exception' => $e])); 
      $this->showError(403, $e->getMessage(), $e);
    }    
    catch (Exception404 $e) {
      // Just in case let's add event dispatching for 404 error
      if (is_object($this->events)) $this->events->dispatch(new Event('MLFW_error_404', ['exception' => $e])); 
      $this->showError(404,$e->getMessage(),$e);
    } 
    catch (Exception410 $e) {
      // Just in case let's add event dispatching for 410 error
      if (is_object($this->events)) $this->events->dispatch(new Event('MLFW_error_410', ['exception' => $e])); 
      $this->showError(410, $e->getMessage(), $e);
    }    
    catch (Exception405 $e) {
      $allow = $e->methods;
      header('Allow: '.$allow);
      $this->showError(405,$e->getMessage(),$e);
    }
    catch (Redirect $e) {
      http_response_code($e->http_code);
      header('Location: '.$e->location);
    }
    catch (\PDOException $e) {
      // No event triggering, only logging the problem
      if (is_object($this->log)) $this->log->error(print_r($e, true));      
      $this->showError(503,$e->getMessage(),$e);
    }    
    catch (\Exception $e) {
      if (is_object($this->events)) $this->events->dispatch(new Event('MLFW_error_common', ['exception' => $e]));
      if (is_object($this->log)) $this->log->error(print_r($e, true));  
      $this->showError(500,'General error: '.$e->getMessage(),$e);
    }
  }

  /** Return language code currently used in application.
   *  By default just returns 'language' setting in configuration. */
  function getLanguage():string {
    return $this->config('language','en-us');
  }

  function showError(int $code,string $text,\Exception $e=null) {
    http_response_code($code);    
    if (class_exists('Layouts\\ErrorPage')) {
      $errpage = new Layouts\ErrorPage();
      $errpage->putText($text);
      print $errpage;
    }
    else {
      header('Content-Type: text/plain; charset=utf-8');
      print $text;
      if ($this->_params['debug'] && !Debug::isEmpty()) print PHP_EOL."Debug info:".Debug::output();
    }
  }
}