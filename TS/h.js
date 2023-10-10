"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function makeInClass() {
    return function (target) {
        Reflect.defineMetadata('inClass', 'A', target);
    };
}
function makeInMethod() {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('inMethod', 'B', target, propertyKey);
    };
}
// Reflect.metadata 当作 Decorator 使用，当修饰类时，在类上添加元数据，
// @Reflect.metadata('inClass', 'A')
var Test = /** @class */ (function () {
    function Test() {
        this.X = '';
    }
    // 当修饰类属性时，在类原型的属性上添加元数据，如：
    // @Reflect.metadata('inMethod', 'B')
    Test.prototype.hello = function () {
        return 'hello world';
    };
    __decorate([
        makeInMethod()
    ], Test.prototype, "hello", null);
    Test = __decorate([
        makeInClass()
    ], Test);
    return Test;
}());
// 使用getMetadata 获取定义在这个类上的inClass属性的值
console.log(Reflect.getMetadata('inClass', Test)); // 'A'
// 使用 getMetadata 获取之前定义在这个实例上的 hello属性上的 inMethod 的值
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'
