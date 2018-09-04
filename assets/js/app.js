const app = {
  index() {
    setTimeout(() => {
      fetch('/getIndex.php', { method: 'post' })
      .then(res => res.text())
      .catch(e => e.message)
      .then(res => document.write(res));
    }, 220);
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
