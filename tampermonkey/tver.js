// ==UserScript==
// @name         tver style
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tver.jp/*/*
// @grant        none
// ==/UserScript==

(() => {
  const scale = '170%';
  const top = '-132px';
  const style = `body {
transform: scale(${scale}, ${scale});
transform-origin: top;
margin-top: ${top};
}`;
  const main = () => {
    const element = document.createElement('style');
    element.textContent = style;
    document.head.appendChild(element);
  };
  const action = () => {
    const check = () => document.querySelector('iframe[src^="https://i.fod"]');
    if (!check()) return;
    const element = document.createElement('div');
    const style = 'font-size: 3em; cursor: pointer; text-align: right;';
    element.setAttribute('style', style);
    element.textContent = '>>> WIDE SIZE <<<';
    document.querySelector('#cx_player').append(element);
    element.addEventListener('click', () => {
      element.setAttribute('style', 'color: dimgray;');
      main();
    });
  };
  setTimeout(action, 3000);
})();
