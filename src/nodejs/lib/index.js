"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const component_1 = require("./component");
const name = '';
function test() {
    return name;
}
exports.test = test;
const item = {
    name: 'lu'
};
console.log((0, component_1.getName)(item));
let person;
person = {
    name: 'l',
    age: 26
};
