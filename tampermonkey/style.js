// ==UserScript==
// @name         style change
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(() => {
  'use strict';
  let style = 'html{background-color:black;color:white;}body{opacity:0.8;background-color:aliceblue;color:dimgray;}';
  style += '#clock0 div#twd{color:dimgray;}#favs,iframe{opacity:0.4;}';
  document.body.appendChild(document.createElement('style')).innerText = style;
})();

