<style>
body {
  background-color: black;
  color: white;
  margin: 1em;
  font-size: 2em;
}
div {
  padding: 0.5em;
}
</style>
<div><?= exec('hostname'); ?> - hello <?= filter_input(INPUT_SERVER, 'REMOTE_ADDR') ?></div>
<div id='date'><?= (new DateTime)->format('Y-m-d H:i:s') ?></div>
<script>
setInterval(() => {
  fetch('date.php', {
    method: 'post'
  })
  .then((response) => {
    return response.text();
  })
  .catch((error) => {
    console.error(error);
  }).then((text) => {
    document.getElementById('date').innerHTML = text;
  });
}, 1000);
</script>
