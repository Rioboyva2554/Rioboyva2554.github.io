<?php if (!empty(\MLFW\Flash::$messages)): ?>
<div class="alert-wrap">
  <input type="checkbox" id="alert-check">
  <label for="alert-check">✕</label>
  <div class="alert">
    <?php foreach (\MLFW\Flash::$messages as $msg => $class) : ?>
      <p class="<?= \htmlspecialchars($class); ?>"><?= \htmlspecialchars($msg); ?></p>
    <?php endforeach; ?>
  </div>
</div>
<?php endif; ?>