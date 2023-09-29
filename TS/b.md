# 重学typeScript
## 静态类型检查器
在不运行代码的情况下检测其中的错误称为静态检查。根据被操作的值的种类
来确定是什么错误和什么不是不是错误，这种称为静态类型检查。  
例如**基于值的类型检查程序是否有错误，它是静态类型检查**；
```ts
const obj = {width:10,height:20}
const area = obj.width *obj.height
```
typescript是javascript的超集，且typescript是一个类型化的超集；
typescript的目的在于允许正确的程序通过，同时捕获尽可能多的常见错误。
typescript绝不改变javascript运行时的行为。
## 类型擦除
typescript的编译器完成了检查代码的工作后，他就会擦除类型；也就是说，一旦typescript代码
被编译成javascript后，便没有类型信息。
## 接口声明和类一起使用
```ts
interface User {
  name: string;
  id: number;
}
 
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
```
javascript中的基本类型：boolean,bigint,null,number,string,symbol,undefined他们都可以在接口中使用。
- any:允许任何类型
- unknown：确保使用此类型的人声明类型是什么；
- never:这种类型不可能发生
- void:返回undefined或没有返回值的函数  
-[ ] [the unknown type in typescript](https://mariusschulz.com/blog/the-unknown-type-in-typescript)

## 组合类型
通过组合简单类型来创建复杂类型。即使用联合与泛型。
### 联合
例如可以将boolean类型描述为true或false:
```ts
type MyBool = true|false
```
联合类型的流行用法是描述string或者number的**字面量合法值**
```ts
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```
联合类型提供处理不同类型的方法；例如：
```ts
function getLength(obj:string|string[]) {
    return obj.length
}
```
使用typeof来了解变量的类型
```ts
const obj = {width:10,height:20}
type t = typeof obj
```

### 泛型
泛型为类型提供变量，typeof是用来了解变量的类型；例如：
```ts

interface Backpack<T>{
    add:(obj:T)=>void
    get:()=>T
}
// 申明一个类型为Backpack的静态变量backpack
 const backpack:Backpack<string> = {
    get(){
        console.log('get')
        return 'get'
    },
     add(t:string){
        console.log(t)
     }
 }
 const s = backpack.get()
backpack.add('add')
```
### 结构化的类型系统
typescript的核心原则是类型检查基于对象的属性和行为；在结构化类型系统中，
如果两个对象具有相同的结构，则认为他们是相同的类型；注意结构匹配只需要匹配对象字段的子集；
例如：
```ts
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // 打印 "12, 26"
 
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // 打印 "33, 3"
```
如果对象或类具有所有必须的属性，则typescript将表示他们是匹配的，而不关注其实现细节。

-[x] [探索示例](https://www.typescriptlang.org/zh/docs/handbook/typescript-in-5-minutes.html)
-[x] [阅读完整手册](https://www.typescriptlang.org/docs/handbook/intro.html)


##  联合类型
联合类型是由两个或多个其他类型形成的类型。表示可以是这些类型中的任何一种类型的值。
使用联合类型时，仅当操作对联合体的每个成员都有效时，typescript才会允许该操作 ；
## interface
接口只能用来声明对象类型，
```ts
interface Obj{}
```