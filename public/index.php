<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jsx.jp</title>
  <link rel="stylesheet" media="all" href="//jsx.jp/cdn/css/common.css">
</head>
<body>
  <div class="flex-center position-ref full-height">
    <div class="top-right links">
      <a href="http://gate.jsx.jp/login">Login</a>
      <a href="http://gate.jsx.jp/register">Register</a>
    </div>
  <div class="content">
    <div class="title">
      <div>welcome <?= exec('hostname'); ?></div>
    </div>
    <div class="title">
      <div>hello <?= filter_input(INPUT_SERVER, 'REMOTE_ADDR') ?></div>
    </div>
    <div class="title m-b-md">
      <div id='date'><?= (new DateTime)->format('Y-m-d H:i:s') ?></div>
<script>
setInterval(() => {
  fetch('/date.php', { method: 'post' })
  .then(response => response.text())
  .catch(e => e.message)
  .then(text => {
    document.getElementById('date').innerHTML = text;
  });
}, 1000);
</script>
      </div>
      <div class="links">
        <a href="https://laravel.com/docs">Documentation</a>
        <a href="https://laracasts.com">Laracasts</a>
        <a href="https://laravel-news.com">News</a>
        <a href="https://forge.laravel.com">Forge</a>
        <a href="https://github.com/laravel/laravel">GitHub</a>
      </div>
    </div>
  </div>
</body>
</html>
