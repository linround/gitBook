!function e(r,t,n){function o(i,f){if(!t[i]){if(!r[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var a=t[i]={exports:{}};r[i][0].call(a.exports,(function(e){return o(r[i][1][e]||e)}),a,a.exports,e,r,t,n)}return t[i].exports}for(var u="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sayHello=void 0,t.sayHello=function(e){return"Hello from ".concat(e)}},{}],2:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o,u=e("./greet");n="greeting",o="TypeScript",document.getElementById(n).innerText=(0,u.sayHello)(o)},{"./greet":1}]},{},[2]);
//# sourceMappingURL=sourcemap/bundle.js.map
