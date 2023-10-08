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

type和interface的区别：
- 都可进行接口扩展，interface使用extends,type使用&；
- interface可以使用类型重载的方式添加新字段。type无法进行重载
```ts
type a= { name:string }
type b = a&{
age:number
}
const v:b = {
name:'',
age:0
}
```
后缀 as const作用类似于const,确保所有属性都分配为文字类型，而不是更通用的版本，例如string或number
文字都是string，但未必string都是某个特定文字

```ts

declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method as 'GET');
```

## 非空断言!
用于从类型中删除null和undefined,在任何表达式之后写入!,表示该值不是null和undefined;
```ts
function liveDangerously(x?: number | null) {
  console.log(x!.toFixed());
}
```



-[ ] [bigint 的使用](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
-[ ] [symbol创建全局唯一引用](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

## 类型谓词
```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```
## 为函数添加属性
```ts

type des = {
    des:string
    (arg:string):boolean
}
const something:des = (arg)=>{
    return arg+8
}
something.des = 'des'
```

## extends 关键字对类型进行约束
longest 的参数需要具有一个length属性
```ts
function longest<Type extends {length:number}>(
    a:Type,
    b:Type
):boolean {
    return a.length>b.length
}
longest(12,90)


interface A {
    x: number;
    y?: number;
}
interface B extends A {
    a:string
}
const b:B = {
    x:0,y:0,a:''
}

```
## extends 还可以用作类的继承
```ts
class A {
    a(){}
}
class B extends A{
    constructor() {
        super();
    }
    b(){}
}
const d = new B()
console.log(d)
```
# 类型相关操作
可选、只读（readonly）,扩展（extends）,交叉（&）；
## extends 关键字除了具有继承功能外，还可以作为条件约束

```ts
type N = number
type S = string

type NS = N extends S ? string:number

const n:NS = 100

interface X {
    vx:string
}
interface Y extends X{
    vy:string
}
const v:Y = {
    vy:'y',
    vx:'x'
}
```
当条件类型作用于泛型类型时，如果给定联合类型，它们就会变得具有分布式性
```ts
type toArray<Type> = Type extends any ? Type[] : never;
type P = toArray<string|number>
const p:P = ['']
```
使用方括号避免该分布性
```ts
type toArray<Type> = Type extends any ? Type[] : never;
type P = toArray<string|number>
const p:P = ['']
```

## ReturnType
使用ReturnType可以获取函数的类型
```ts
function f() {
    return {
        name:'sk'
    }
}
type ft = ReturnType<typeof f>

type FN = ()=>{name:string}
type fn = ReturnType<FN>
```

// 对某些特定名称进行特殊映射
```ts
type toArray<T> = T[]

type Keys = 'v'|'m'
type ToB<T> = {
    [p in keyof T]:p extends  Keys? toArray<T[p]>:number
}
interface name{
    v:string
    m:number
    c:string
    d:boolean
}
type O = ToB<name>
const o:O = {
    v:[''],
    m:[0],
    c:2,
    d:1
}
```
### as 关键字可以作为类型谓词之外还可以对建进行映射和重写
```ts

type MyAs<T> = {
    [p in keyof T as `get${Capitalize<string & p>}`]:T[p]
}
type My = {
    name:string
    age:string
}
type E = MyAs<My>
const e:E = {
    getAge:'',
    getName:''
}
```

### as结合exclude 进行属性过滤
```ts

type My = {
    name:string
    age:string
}

type Filter<T,U> = {
    [p in keyof T as Exclude<p, U>]:T[p]
}
type X = Filter< My, 'name'>
const x:X = {
    age:''
}
```

### 使用in 操作符进行多个类型遍历
```ts
type config<TS extends {kind:string}> = {
    [t in TS as t["kind"]]:(e:t)=>void
}
type S = {
    kind:'square'
    x:number
}
type C = {
    kind:'circle',
    y:number
}
type R = config<S|C>
const result:R = {
    square(e){},
    circle(e){}
}
```

### 类中的只读属性，可以在构造该类的实例时进行赋值操作
```ts
class Greeter {
    readonly name: string = "world";

    constructor(otherName?: string) {
        if (otherName !== undefined) {
            // 类中的只读属性在构造时可以进行赋值
            this.name = otherName;
        }
    }

    err() {
    }
}
const e = new Greeter('sss')
```

### 关于类关键字的描述
```ts
class A{
    // 可在内部访问静态成员
    // 可在派生类访问
    private static y = 100

    // 可在内部访问静态成员
    // 可在派生类访问
    protected static z = 1000

    // 可在任意地方访问
    static x =0
    // 添加只读属性
    public readonly u = 10
    public v =90
    private readonly w = 10
    protected readonly r = 1
    // 只可在自身访问
    private a(){
        const y = A.y
        const z = A.z
    }

    // 派生类实例和实例不可访问
    // 派生类自身和其自身可访问
    protected aa(){}
    public aaa(){
        this.aa()
        this.a()
    }
    // 可进行跨实例访问
    public aaaa(a:A){
        a.a()
    }
    constructor() {
        this.a()
        this.aa()
        this.aaa()
        this.v = 100
    }

}

const a = new A()
// 静态成员的访问方式
const x = A.x

a.aaa()
class B extends A {
    constructor() {
        super();
        this.aaa()
        this.aa()
    }
    b(){
        this.aa()
        this.aaa()
    }
    bb(a:A){
        // 在A外部，无法跨实例访问A的保护属性和私有属性
        a.aaa()
        const z = A.z
        const x =A.x
    }
}
const b = new B()
b.b()
b.aaa()
// 使用中括号访问私有属性
b['a']()

class C {
    constructor() {
        const z = A.x
    }

}


```

### 关于this 在ts中的一些特殊用法
```ts
class A {
    // 这里的this比较特殊
    // 编译后只有一个a参数
    // this只是用来指定类型
    a(this:A,x:number){
        console.log(this.a,x)
    }
    // this 还可以用来指定类型
    aa(x:this){
        console.log(x)
    }
}
const a = new A()
a.a(0)
a.aa(a)

```

## InstanceType操作符的作用比喻
```ts
class Point {
    createdAt: number;
    x: number;
    y: number
    constructor(x: number, y: number) {
        this.createdAt = Date.now()
        this.x = x;
        this.y = y;
    }
    p(){}
}

// InstanceType 操作符类似下列两个步骤
const p = new Point(1,3)
type A = typeof p


type PointInstance = InstanceType<typeof Point>

function moveRight(point: A) {
    point.x += 5;
    point.createdAt = 10
    point.p()
}
```

### 关于模块化
```text
tsc b.ts  --target es5 --module commonjs
```
- commonjs使用exports或module.exports进行导出模块， 使用require进行带入模块，require加载模块，会导致该模块全部执行；
```text
tsc b.ts  --target es5 --module es2020
```
- es2020 模块使用export或export default方式进行导出，使用import进行导入；这是当前常规的模式；
```text
tsc b.ts  --target es5 --module umd
```
- umd 模式 使用了一个工厂函数，其编译结果兼容AMD和commonjs

### 模块化更近一步，借助webpack或者vite等导打包工具，可以构建直接在浏览器使用的库；