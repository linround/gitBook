import "reflect-metadata";

// Reflect.metadata 当作 Decorator 使用，当修饰类时，在类上添加元数据，
@Reflect.metadata('inClass', 'A')
class Test {

    public X:string = ''
    // 当修饰类属性时，在类原型的属性上添加元数据，如：
    @Reflect.metadata('inMethod', 'B')
    public hello(): string {
        return 'hello world';
    }
}


// 使用getMetadata 获取定义在这个类上的inClass属性的值
console.log(Reflect.getMetadata('inClass', Test)); // 'A'


// 使用 getMetadata 获取之前定义在这个实例上的 hello属性上的 inMethod 的值
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'




