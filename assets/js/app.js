window.app = {
  index() {
    fetch('/getIndex.php', { method: 'post' })
    .then(res => res.text())
    .catch(e => e.message)
    .then(res => document.write(res));
  },
  intervalDate() {
    setInterval(() => {
      fetch('/date.php', { method: 'post' })
      .then(res => res.text())
      .catch(e => e.message)
      .then(res => document.getElementById('date').innerHTML = res);
    }, 1000);
  },
};
