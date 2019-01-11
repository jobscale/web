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
      if ('serviceWorker' in navigator) {
        document.addEventListener('DOMContentLoaded', () => {
          navigator.serviceWorker.register('./service-worker.js');
          navigator.serviceWorker.ready
          .then((registration) => {
            console.info('registration.pushManager.subscribe');
            return registration.pushManager.subscribe({userVisibleOnly: true});
          })
          .then((subscription) => {
            const rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
            const rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
            const key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
            const auth = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';
            const endpoint = subscription.endpoint;
            this.logger.info(JSON.stringify({ key, auth, endpoint }, null, 2));
          })
          .catch(e => console.error(e));
        }, false);
      }
    }
    head() {
      fetch(this.url.head, { method: 'post' })
      .then(res => res.text())
      .catch(e => e.message)
      .then(res => document.querySelector('head').outerHTML = res);
    }
    body() {
      fetch(this.url.body, { method: 'post' })
      .then(res => res.text())
      .catch(e => e.message)
      .then(res => document.querySelector('body').outerHTML = res);
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
