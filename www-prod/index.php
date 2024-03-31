<?php

namespace AppCatalog;

require __DIR__."/../config/www-prod.php";
require __DIR__."/../vendor/autoload.php";

$app = new \MLFW\Application($site_config);
\MLFW\Root::$app=$app;
$app->main();