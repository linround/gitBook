"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target :
            desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) :
                desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        // decorators 的产生 Reflect.metadata('Rkey', 'Rvalue')
        // Reflect.decorate
        // 对于 类本身
        // Reflect.decorate 会在类上 添加一个可用 Reflect.getMetadata获取的属性Rkey,其值为 Rvalue
        // 对于类中的方法
        // 由于只能在生成实例后才能访问该方法
        // 所以此时
        // Reflect.decorate 会在类的原型对象target的key 属性上添加一个
        // 可用 Reflect.getMetadata获取的属性Rkey,其值为 Rvalue
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) :
                    c > 3 ? d(target, key, r) :
                        d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// Reflect.metadata 当作 Decorator 使用，当修饰类时，在类上添加元数据，
var Test = /** @class */ (function () {
    function Test() {
    }
    // 当修饰类属性时，在类原型的属性上添加元数据，如：
    Test.prototype.hello = function () {
        return 'hello world';
    };
    // 属性上的装饰器默认传入三个参数
    // 类的原型链、
    // 属性名
    __decorate([
        Reflect.metadata('inMethod', 'B')
    ], Test.prototype, "hello", null);

    // 类上的装饰器默认传入该类本身
    Test = __decorate([
        Reflect.metadata('inClass', 'A')
    ], Test);
    return Test;
}());
console.log(Reflect.getMetadata('inClass', Test)); // 'A'
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'
