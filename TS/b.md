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