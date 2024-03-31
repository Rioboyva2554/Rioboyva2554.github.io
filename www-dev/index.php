<?php

namespace PCatalog;

require __DIR__."/../config/www-dev.php";
require __DIR__."/../vendor/autoload.php";

$app = new \MLFW\Application($site_config);
\MLFW\Root::$app=$app;
$app->main();