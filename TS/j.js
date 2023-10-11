"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var METHOD_METADATA = 'method';
var PATH_METADATA = 'path';
function mapRoute(instance) {
    var prototype = Object.getPrototypeOf(instance);
    // 筛选出类的 methodName
    var methodsNames = Object.getOwnPropertyNames(prototype);
    return methodsNames.map(function (methodName) {
        var fn = prototype[methodName];
        // 取出定义的 metadata
        var route = Reflect.getMetadata(PATH_METADATA, fn);
        var method = Reflect.getMetadata(METHOD_METADATA, fn);
        return {
            route: route,
            method: method,
            fn: fn,
            methodName: methodName
        };
    });
}
var Controller = function (path) {
    return function (target) {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    };
};
var createMappingDecorator = function (method) { return function (path) {
    return function (target, key, descriptor) {
        Reflect.defineMetadata(PATH_METADATA, path, descriptor);
        Reflect.defineMetadata(METHOD_METADATA, method, descriptor);
    };
}; };
var Get = createMappingDecorator('GET');
var Post = createMappingDecorator('POST');
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    SomeClass.prototype.someGetMethod = function () {
        return 'hello world';
    };
    SomeClass.prototype.somePostMethod = function () { };
    __decorate([
        Get('/a')
    ], SomeClass.prototype, "someGetMethod", null);
    __decorate([
        Post('/b')
    ], SomeClass.prototype, "somePostMethod", null);
    SomeClass = __decorate([
        Controller('/test')
    ], SomeClass);
    return SomeClass;
}());
var v1 = Reflect.getMetadata(PATH_METADATA, SomeClass); // '/test'
console.log('=================v1');
console.log(v1);
var instance = new SomeClass();
console.log(instance);
console.log('=================v');
var v = mapRoute(instance);
console.log(v);
