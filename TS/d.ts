function first(v:number) {
    console.log(" 11111111111   外");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("1111111111111  内",v);
    };
}

function second() {
    console.log("2222222222222222  外");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("222222222222   内");
    };
}
// target 实际传入的是 ExampleClass.prototype
// propertyKey 实际传入的就是method方法
// PropertyDescriptor 对该属性method 的属性配置，
function third(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("333333333333   内");
};
class ExampleClass {
    @first(9)
    @second()
    @third
    method() {}
}
