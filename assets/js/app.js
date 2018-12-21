window.App || window.Common && (() => {
  class App extends Common {
    constructor() {
      super();
      this.url = {
        head: '/head.php',
        body: '/body.php',
        date: '/date.php',
      };
      setTimeout(() => this.head(), 220);
      setTimeout(() => this.body(), 220);
      setTimeout(() => this.setInterval(), 2200);
    }
    head() {
      fetch(this.url.head, { method: 'post' })
      .then(res => res.text())
      .catch(e => e.message)
      .then(res => document.head.outerHTML = res);
    }
    body() {
      fetch(this.url.body, { method: 'post' })
      .then(res => res.text())
      .catch(e => e.message)
      .then(res => document.body.outerHTML = res);
    }
    date() {
      fetch(this.url.date, { method: 'post' })
      .then(res => res.text())
      .then(res => ({ html: res, element: document.querySelector('#date') || {} }))
      .catch(e => e.message)
      .then(obj => obj.element.innerHTML = obj.html);
    }
    setInterval() {
      setInterval(() => this.date(), 1000);
    }
  }
  window.App = App;
  return new App();
})() || (() => { throw new Error('bad'); })();
