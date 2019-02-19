window.App || window.Common && (() => {
  class App extends Common {
    constructor() {
      super();
      const config = {
        apiKey: "AIzaSyAlGETt2oe_9zfGwuzdvKzNK9pdqrQqwgA",
        authDomain: "notification-aaa.firebaseapp.com",
        databaseURL: "https://notification-aaa.firebaseio.com",
        projectId: "notification-aaa",
        storageBucket: "notification-aaa.appspot.com",
        messagingSenderId: "592002215665"
      };
      firebase.initializeApp(config);
      const messaging = firebase.messaging();
      messaging.usePublicVapidKey('BDCduUmCdNdkNov_rwvGTDLC7ez8fmREbdx4rS205xN4-wI9WMvhQ72o2HfkXZUbXWTDZRsA68qEV1aBa8dLuC0');
      const tokenDivId = 'token_div';
      const permissionDivId = 'permission_div';
      messaging.onTokenRefresh(function() {
        messaging.getToken().then(function(refreshedToken) {
          console.log('Token refreshed.');
          setTokenSentToServer(false);
          sendTokenToServer(refreshedToken);
          resetUI();
        }).catch(function(err) {
          console.log('Unable to retrieve refreshed token ', err);
          showToken('Unable to retrieve refreshed token ', err);
        });
      });
      messaging.onMessage(function(payload) {
        console.log('Message received. ', payload);
        appendMessage(payload);
      });
      function resetUI() {
        clearMessages();
        showToken('loading...');
        messaging.getToken().then(function(currentToken) {
          if (currentToken) {
            sendTokenToServer(currentToken);
            updateUIForPushEnabled(currentToken);
          } else {
            console.log('No Instance ID token available. Request permission to generate one.');
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
            setTimeout(() => requestPermission(), 2200);
          }
        }).catch(function(err) {
          console.log('An error occurred while retrieving token. ', err);
          showToken('Error retrieving Instance ID token. ', err);
          setTokenSentToServer(false);
        });
      }
      function showToken(currentToken) {
        var tokenElement = document.querySelector('#token');
        tokenElement.textContent = currentToken;
      }
      function sendTokenToServer(currentToken) {
        if (!isTokenSentToServer()) {
          console.log('Sending token to server...');
          // TODO(developer): Send the current token to your server.
          setTokenSentToServer(true);
        } else {
          console.log(
            'Token already sent to server so won\'t send it again unless it changes',
          );
        }
      }
      function isTokenSentToServer() {
        return window.localStorage.getItem('sentToServer') === '1';
      }
      function setTokenSentToServer(sent) {
        window.localStorage.setItem('sentToServer', sent ? '1' : '0');
      }
      function showHideDiv(divId, show) {
        const div = document.querySelector(`#${divId}`);
        div.style = `display: ${show ? 'visible': 'none'}`;
      }
      function requestPermission() {
        console.log('Requesting permission...');
        messaging.requestPermission().then(function() {
          console.log('Notification permission granted.');
          resetUI();
        }).catch(function(err) {
          console.log('Unable to get permission to notify.', err);
        });
      }

      function deleteToken() {
        messaging.getToken().then(function(currentToken) {
          messaging.deleteToken(currentToken).then(function() {
            console.log('Token deleted.');
            setTokenSentToServer(false);
            resetUI();
          }).catch(function(err) {
            console.log('Unable to delete token. ', err);
          });
        }).catch(function(err) {
          console.log('Error retrieving Instance ID token. ', err);
          showToken('Error retrieving Instance ID token. ', err);
        });

      }
      function appendMessage(payload) {
        const messagesElement = document.querySelector('#messages');
        const dataHeaderELement = document.createElement('h5');
        const dataElement = document.createElement('pre');
        dataElement.style = 'overflow-x:hidden;';
        dataHeaderELement.textContent = 'Received message:';
        dataElement.textContent = JSON.stringify(payload, null, 2);
        messagesElement.appendChild(dataHeaderELement);
        messagesElement.appendChild(dataElement);
      }
      function clearMessages() {
        const messagesElement = document.querySelector('#messages');
        while (messagesElement.hasChildNodes()) {
          messagesElement.removeChild(messagesElement.lastChild);
        }
      }
      function updateUIForPushEnabled(currentToken) {
        showHideDiv(tokenDivId, true);
        showHideDiv(permissionDivId, false);
        showToken(currentToken);
      }
      function updateUIForPushPermissionRequired() {
        showHideDiv(tokenDivId, false);
        showHideDiv(permissionDivId, true);
      }
      resetUI();
      this.url = {
        date: '/date.php',
      };
      setTimeout(() => this.setInterval(), 2200);
      if ('serviceWorker' in navigator) {
        document.addEventListener('DOMContentLoaded', () => {
          navigator.serviceWorker.register('/service-worker.js');
          navigator.serviceWorker.ready
          .then(registration => {
            console.info('registration.pushManager.subscribe');
            return registration.pushManager.subscribe({userVisibleOnly: true});
          })
          .then(subscription => {
            const rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
            const rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
            const key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
            const auth = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';
            const endpoint = subscription.endpoint;
            this.logger.info(JSON.stringify({ key, auth, endpoint }, null, 2));
          })
          .catch(console.error);
        }, false);
      }
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
