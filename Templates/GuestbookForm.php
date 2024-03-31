<?php

namespace PCatalog\Templates;

class GuestbookForm extends \MLFW\Template {
  public function getTemplate(): string {
    return <<<EOL
    <form action="" method="POST" class="tile g--5 g-t--12 g-s--12 no-margin-vertical" id="postform">
    <legend>Добавьте сообщение</legend>
    <fieldset>
      <label><input type="text" name="owner" required="required" placeholder="Ваше имя" /></label>
      <label><input type="email" name="email" placeholder="Email@example.com" /></label>
      <label><textarea class="g--12" name="text" rows="4" cols="60" required="required" /></textarea></label>
      <label><button type="submit" class="btn--primary">Отправить</button></label>
    </fieldset>
    </form>
EOL;
  }
}