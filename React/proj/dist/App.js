"use strict";

var _reactDom = require("../react-dom.development");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _component = require("./component");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = _reactDom2.default.createRoot(document.getElementById("root"));

root.render(_component.MyComponent);