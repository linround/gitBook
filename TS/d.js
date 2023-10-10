var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    // decorators 以数组形式传入的装饰器
    // target 对于函数的原型对象
    // key装饰器处理的属性
    // desc 对该属性的配置项，目前默认为null
    var c = arguments.length,
        r = c < 3 ? target :
            desc === null ?
                desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;

    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        // 这里取值的顺序，是从尾部开始往前取出该装饰器函数
        // 所以从这里即可判断对于的装饰器函数的执行顺序
        for (var i = decorators.length - 1; i >= 0; i--)
            // 取得对应的装饰器
            if (d = decorators[i])
                // 参数小于3，具有类装饰器传入 该函数本身作为参数
                r = (c < 3 ? d(r) :
                    // r 实际就是传入的属性配置器 或者自己传入的属性配置器
                    // 最终执行装饰器函数，并传入参数  target, key, r
                    c > 3 ? d(target, key, r) :
                        d(target, key)) || r;
    return c > 3
    && r
    && Object.defineProperty(target, key, r), r;
};
function first() {
    console.log(" 11111111111   外");
    return function (target, propertyKey, descriptor) {
        console.log("1111111111111  内");
    };
}
function second() {
    console.log("2222222222222222  外");
    return function (target, propertyKey, descriptor) {
        console.log("222222222222   内");
    };
}
function third(target, propertyKey, descriptor) {
    console.log("333333333333   内");
}
;
var ExampleClass = /** @class */ (function () {
    function ExampleClass() {
    }
    ExampleClass.prototype.method = function () { };
    __decorate([
        first(),
        second(),
        third
    ], ExampleClass.prototype, "method", null);
    return ExampleClass;
}());
