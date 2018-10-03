class Channel {
  constructor() {
    this.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
    this.pluginKey = 'ce9303bb-c19c-41ae-8edb-e6646dcce2d6';
    window.channelPluginSettings = this;
  }
  createElement() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = this.src;
    s.charset = 'UTF-8';
    return s;
  }
  attach() {
    if (window.ChannelIOInitialized) return;
    window.ChannelIOInitialized = true;
    document.body.appendChild(this.createElement());
  }
  initialize() {
    const ch = (...argv) => ch.c(argv);
    ch.q = [];
    ch.c = args => ch.q.push(args);
    window.ChannelIO = ch;
  }
  addEventListener() {
    setTimeout(() => this.attach(), 220);
    window.addEventListener('DOMContentLoaded', this.attach, false);
    window.addEventListener('load', this.attach, false);
  }
  load() {
    if (window.ChannelIO) return;
    this.initialize();
    if (document.readyState === 'complete') this.attach();
    else if (window.attachEvent) window.attachEvent('onload', this.attach);
    else this.addEventListener();
  }
}
setTimeout(() => new Channel().load(), 220);
