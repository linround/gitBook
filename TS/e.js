var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
        // 对于类装饰器
        // r 实际就是该函数对于自身
        r = c < 3 ? target :
            desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) :
                desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                // 最终的装饰器函数的参数就是该函数自身
                r = (c < 3 ? d(r) :
                c > 3 ? d(target, key, r) :
                    d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
function test() {
    return function (con) {
    };
}
var BugReport = /** @class */ (function () {
    function BugReport(t) {
        this.type = "report";
        this.title = t;
    }
    BugReport = __decorate([
        sealed,
        test()
    ], BugReport);
    return BugReport;
}());
