# 关于函数
在ts中，语法`(a: string) => void`表示一个带有一个参名为a的函数，参数a的类型为字符串，该函数没有返回值；
```typescript
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
 
function printToConsole(s: string) {
  console.log(s);
}
 
greeter(printToConsole);
```
同样也可以使用类型别名来命名函数类型
```typescript
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

## 函数调用签名
```typescript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
const a:DescribableFunction = function(id:number){
  return !!id
}
a.description = 'name'
```
在js中，`函数除了可以调用之外还可以具有属性`；但是函数类型表达式语法不允许声明属性；
通过上面的方式我们可以声明一个函数a，并设置了该函数的调用签名`description`

## 构造签名
js中可以通过new操作符调用，ts中将其成为构造函数，因此通常会创建一个新的对象；
可以通过在调用签名前添加关键字`new`来编写构造函数；
```typescript
type SomeConstructor = {
  new (s: number): Object;
};
function fn(ctor: SomeConstructor) {
  return new ctor(0);
}
class ctor{
  public text = 0
  constructor(text:number){
    this.text = text
  }
}
fn(ctor)
```

对于一些对象，比如Date，可以不带new,可以任意组合相同类型的调用函数签名；

## 通用函数
通常编写一个函数，输入类型和输出类型是相关的；在ts中，当我们想要描述两个值之间的对应
关系时，可以使用泛型；通过在函数签名中声明一个类型参数；
````typescript
function f<Type>(arr:Type[]):Type | undefined{
  return arr[0]
}
````
## 类型推断
不必指定Type，类型是由ts推断-自行选择的；此示例中，ts可以推断input的类型
以及output基于函数表达式的返回值参数类型；
```typescript
// 自动推断input时arr中的类型
// 自动推断返回值output
// 这里的推断可以直接从map函数的返回开始，而不是从map函数的定义开始
function map<input,output>(arr: input[],func:(arg:input)=> output):output[]{
  return arr.map(func)
}
map([1,2,3],function(input:number){
  input++
})
```

## 指定参数类型
`ts`通常在泛型中推断出预期的类型。但是也可以指定类型；例如：合并两个数组
```typescript
function combine<Type>(a:Array<Type>,b:Array<Type>):Type[]{
  return a.concat(b)
}
```
## 如何编写良好的泛型函数


# 待完善···