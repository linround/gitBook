# 关于class中的说明
+ 关键字 `public`实例和类本身都可访问；`protected`自身和子类可以访问；`private`只有类自身可以访问；
+ `static`静态类成员通产在原构造函数的属性上
+ 泛型类
````typescript
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
 
const b = new Box("hello!");
````
+ abstract 类和成员  
  抽象方法或抽象字段是尚未提供实现的方法。这些成员必须存在于抽象类中，不能直接实例化。
```typescript
abstract class Base {
  abstract getName(): string;
 
  printName() {
    console.log("Hello, " + this.getName());
  }
}
class x extends Base {
  getName(): string {
    return ''
  }
}
new x()
```