window.Common || (() => {
  class Common {
    constructor() {
      this.saver = { ok: 'ok', ng: 'ng' };
      this.logger = Common._logger;
    }
    get self() {
      return this.saver;
    }
  }
  Common._logger || (Common._logger = (methods => {
    const nativeCode = () => {};
    const self = {};
    methods.forEach((method) => {
      self[method] = window.logger ? window.console[method] : nativeCode;
      window.console[method] = nativeCode;
    });
    return self;
  })(['log', 'info', 'warn', 'error', 'assert']));
  window.Common = Common;
})();
