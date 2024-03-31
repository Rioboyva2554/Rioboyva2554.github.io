<?php

/* Rename this file to www-dev.php to get MLFW working. */

$site_config = [
  /* Secret string to use as salt for hashes and keys generation. REPLACE THIS VALUE IN YOUR APPLICATIONS FOR BETTER SECURITY! */
  'secret_string' => 'vexqawdr51@$#',  
  /* This value will be passed to error_reporing PHP function */
  'error_reporting'=>E_ALL, 
  /* This value will be passed to ini_set PHP function. */
  'display_errors'=>1, 
  /* Debugging mode. If enabled, the output of _dbg function will be shown directly on generated page if layout class supports this. */
  'debug'=>1,
  /* Always create site links with https:// prefix whether $_SERVER['HTTPS'] is set or not. */
  'force_https' => false,

  /* Logger class name. 
  Use MLFW\\Loggers\\TSVLog for default logger 
  or MLFW\\Loggers\\Stub to disable logging at all 
  or specify class name for any PSR-3 compatible logger */  
  'logger' => 'MLFW\\Loggers\\TSVLog', 

  /* Logger-depending settings. 
  Settings for TSV logger:
    log_level — minimum severity of logged events
    log_file — filename to write logging events. 
    You can use %date%, %host% and %level% to replace with event date, hostname and severity level respectively. */
  'logger_settings' => ['log_level'=>'info' /*,'log_file'=> __DIR__ . '/../logs/%date%-%level%.tsv'*/],

  /* Authenticiator class name. 
  Use MLFW\\Auth\\Fixed for fixed user list in auth_settings['users]
  or MLFW\\Auth\\Stub if no authenticiation needed (user will be always guest) */
  'auth' => 'MLFW\\Auth\\Fixed', 
  /* Example settings for Stub authenticicator */
  //  'auth_settings'=>['allowed_scope'=>'view,post','username'=>'Гость'],
  /* Settings for Fixed authenticicator:
     users is associative array where keys are user logins and values can be either passwords ot hash with password, id and scope.
     guest_scope — default scope for non logged-in users
     cookie_name — cookie name to store authenticication key. Default is MLFW_auth. 
     cookie_domain and cookie_path — domain and path to pass to setcookie function.
   */
  'auth_settings' => ['users' => ['4X_Pro' => ['password' => '**********', 'id' => 1]]],  

  /* Router class name.
  Use MLFW\\Router\\Stub for single-action applications
  or MLFW\\Routers\\Basic to use router rules from routes/*.json files */
  'router'=>'MLFW\\Routers\\Basic',
  /* Default action class name for Stub router */
  /* 'router_settings' => '\\PCatalog\\Actions\\Index.php', */

  /* Event processor class name. 
  Use MLFW\\Events\\Stub to disable event-processing completely
  or MLFW\\Events\\Basic to use event listeners from events/<EventName>/*.txt files where event listener class are specified*/
  'events'=>'MLFW\\Events\\Basic',
  'events_settings'=>[],

  /* Database connections array. Each connection can have dsn (string in PDO format), user, password and options keys. */
  'databases'=>[
    ['dsn'=>'mysql:dbname=mlfw;host=localhost','user'=>'root','password'=>'*******','options'=>null]
  ],

  /* Associative array for notificators settings. The keys are notificators full classnames, the values are notificator-depended. */
  'notification_settings' => [
    '\\MLFW\\Notifiers\\Telegram' => ['API_key' => '*** Telegram Bot API key here ***'],
    '\\MLFW\\Notifiers\\Simplepush' => ['API_key' => '*** Simplepush token here ***']
  ],

  /* Site name. Used in default title tag, site header and so on */
  'site_title' => 'Mindlife Guestbook',
  /* Site description to use in description meta-tag, subheader and so on. */
  'site_descr' => 'Guestbooks are part of old good Internet',
  /* Session name. */  /* Session name. */
  'session_name'=>'MLFW_sid',

  /*=======================================================
  MLGuestbook-specific settings: */
  /* Notification receivers list in format receiver=>notificator */
  'guestbook_notifications'=>[/*'286031258'=>'Telegram','Mobile'=>'Simplepush'*/],  
  /* Premoderation mode: 0 — no premoderation, 1 — only if domain names or phones found, 2 — always premoderate */
  'guestbook_premoderate_mode'=>1
];