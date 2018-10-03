Common || (() => {
  class Common {
    constructor() {
      this.saver = { ok: 'ok', ng: 'ng' };
      this.logger = (methods => {
        const nativeCode = () => {};
        const self = {};
        methods.forEach((method) => {
          self[method] = window.logger ? window.console[method] : nativeCode;
          window.console[method] = nativeCode;
        });
        return self;
      })(['log', 'info', 'warn', 'error', 'assert']);
    }
    get self() {
      return this.saver;
    }
  }
  window.Common = Common;
})();
