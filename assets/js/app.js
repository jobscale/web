App || Common && (() => {
  class App extends Common {
    constructor() {
      super();
      this.url = {
        index: '/getIndex.php',
        date: '/date.php',
      };
      setTimeout(this.index, 220);
      setTimeout(this.setInterval, 2200);
    }
    index() {
      fetch(this.url.index, { method: 'post' })
      .then(res => res.text())
      .catch(e => e.message)
      .then(res => document.write(res));
    }
    date() {
      fetch(this.url.date, { method: 'post' })
      .then(res => res.text())
      .then(res => ({ html: res, element: document.querySelector('#date') || {} }))
      .catch(e => e.message)
      .then(obj => obj.element.innerHTML = obj.html);
    }
    setInterval() {
      setInterval(this.date, 1000);
    }
  }
  window.App = App;
  return new App();
})() || (() => { throw new Error('bad'); })();
