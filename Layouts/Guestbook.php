<?php

namespace PCatalog\Layouts;

use MLFW\Layouts;
use MLFW\Layouts\HTML;
use function MLFW\app;

class Guestbook extends HTML {
  public $form = '';

  public $style_code = <<<STYLE
#all { max-width: 1240px; margin: auto }
hr { border-width: 1px; border-style: dotted }
.h-entry { margin-bottom: 24px; clear: both }
.u-photo { float: left; margin: 0 10px 5px 0; width: auto }
.p-author { font-size: 110%; font-weight: boldl line-height: 120% }
.dt-published { color: #444; font-size: 80%;  line-height: 225%; }
.e-content { margin-top: 12px }
@media screen and (max-width: 1239px) {
  .container { flex-wrap: wrap; }
}
@media screen and (min-width: 1240px) {
  #postform { order: 2; margin-left: 24px; position: sticky; }
  #wrapper { align-items: start; }
}

textarea { display: block; width: 100% }
.h-feed { margin: auto }
STYLE;  

  public function getBody(): string  {
    return '<div id="all"><header class="container">
    <h1 class="m--1 g--12">'.app()->config('site_title','Гостевая книга').'</h1>
  </header><div class="container"id="wrapper">'.$this->form.'<div class="h-feed g--7 g-s--11 g-t--11 no-margin-vertical">'.parent::getBody().'</div></div>';
  }
}