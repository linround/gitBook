# 基本类型
+ string
+ number
+ boolean
+ array
+ any（当不希望某个特定的值导致类型检查错误时，可以使用any）

## 变量的类型注释
在定义变量时，可以选择性的显示添加变量的类型，因为在未添加类型的情况下，
ts会自动尝试去推断代码中的类型；
## 函数
在ts中，可以指定函数的输入和输出值的类型；
### 参数类型注解
+ 声明函数时，可以在每个参数后添加类型注释，声明函数接受哪些类型的参数。参数类型注释在参数名称之后；
### 返回类型注释
+ 添加返回类型注释。返回类型注释出现在参数列表之后
### 匿名函数
匿名函数与函数声明不同。当一个宁函数在ts可以确定如何调用它的地方时，该函数会自动赋予一个类型；
```typescript
const names = ["Alice", "Bob", "Eve"];
 
// forEach 中的匿名函数的参数s，会默认赋予类型string
names.forEach(function (s) {
  console.log(s.toUppercase());
Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());
Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});

```

## 对象类型
除了原始类型以外，常见的就是对象类型。  
例如：
```typescript
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```
使用具有两个属性的类型来注释参数x、y；这两个属性都是number类型。
### 可选类型
对象中某些属性可能会不存在，也可能会存在；所以这个属性是一个可选的值；在ts中使用'?'来表示
属性是可选的；
例如：
```typescript
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```
## 联合类型
自己定义一个语义化的类型变量；该类型变量可以是一个联合类型：
例如：可能是字符串或者数字的类型
````typescript
type id = number | string
````
但是对于联合类型中的方法只有在每个成员都有的情况下才允许操作；解决方案就是
使用代码块缩小联合；例如：
```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

## interface
另外一种命名类型的方式就是接口；
## interface与type的区别
+ type不能够声明合并，但是interface可以
+ interface只能声明对象的类型，不能重命名原始类型
## 类型断言
+ 使用as语法
```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```
+ 使用尖括号语法
```typescript
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

## 文本类型
指定变量为固定的文本值，同时可以进行多个文本值的组合；
```typescript
// 指定文本值为hello
let x: "hello" = "hello";
// 指定alignment的可能值为left或者right或者center
function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
}
```
## 字面推理
当使用对象初始化变量时，ts假定该对象的属性可能会在以后发生更改；
例如：
```typescript
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```
上面的例子中,counter类型被推断为number,其值是可变的；
1. [x] 某些时候类型推断可能存在错误
可以通过类型断言来解决

## null和undefined
```typescript
function doSomething(x: string | undefined) {
  // 当"strictNullChecks": false时，这里的x检查不出来问题
  // 只有当"strictNullChecks": true时，这里可以检查出相关问题  
  console.log("Hello, " + x.toUpperCase());
  // 使用非空断言运算符可以达到正确的效果
  // console.log("Hello, " + x!.toUpperCase());
}
```

## 枚举
枚举是 TypeScript 添加到 JavaScript 的一项功能，它允许描述一个值，该值可能是一组可能的命名常量之一。