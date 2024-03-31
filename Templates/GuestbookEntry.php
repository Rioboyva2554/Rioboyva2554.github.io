<?php

namespace PCatalog\Templates;

class GuestbookEntry extends \MLFW\Template {
  public function getTemplate(): string {
    $avatar = !empty($this->data->extra->email) ? '<img src="https://www.gravatar.com/avatar/'.md5($this->data->extra->email).'?s=48" class="u-photo" alt="{$this->data->owner}" height="48" width="48" />' : '';
    $author = !empty($this->data->extra->email) ? '<a href="mailto:'.$this->data->extra->email.'">'.$this->data->owner.'</a>' : $this->data->owner;
    $text = \MLFW\Helpers\HTMLCleaner::clean($this->data->text, ['a' => 'href', 'img' => ['src', 'alt'],'b'=>[],'i'=>[],'del'=>[],'s'=>[],'strong'=>[],'em'=>[]]);
    $text = nl2br($text);
    $html = <<<EOL
    <div class="h-entry card">
    <div class="h-card">
    {$avatar}
    <b class="p-author">{$author}</b></div> <time datetime="{$this->data->created->format('Y-m-d\\TG:i:s')}" class="dt-published">{$this->data->created->format('d.m.Y G:i')}</time>
    <div class="e-content" style="clear:both">{$text}</div>
    </div>
EOL;
    return $html;  
  }
}