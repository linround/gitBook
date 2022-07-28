# Start
1. [x] 推理类型  
在创建变量并将其分配给特定值时，ts将使用该值作为其类型；
2. [x] 定义类型  
定义一种指定的所需的类型
```typescript
interface User {
  name: string;
  id: number;
}
```
3. [x] 组合类型
通过简单组合的方式来创建复杂的类型，有两种方式可以做到：联合类型和泛型  
3.1. 联合类型  
`type MyBool = true | false;`  
3.2. 泛型  
为类型提供变量。没有泛型的数组可以包含任何值。具有泛型的数组可以面试数组包含的值  
```typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```
声明自己的泛型  

5. [x] 解构类型系统

在js中存在很多怪异的行为；例如：
`````javascript
if ("" == 0) {
  // 开始执行
}
if (1 < x < 3) {
  // x为任意值时都会执行
}

// 访问不存在的属性
const obj = { width: 10, height: 15 };
// 得到NaN的值，但是heigth拼写错误。
const area = obj.width * obj.heigth;
`````
ts在执行程序之前检查是否存在错误，并根据值的类型进行检查，它是一个静态类型检查器；  

## 运行时行为

TypeScript 也是一种保留JavaScript运行时行为的编程语言。例如，在 JavaScript 中除以零会产生Infinity而不是抛出运行时异常。作为一项原则，TypeScript永远不会改变 JavaScript 代码的运行时行为


## 擦除类型

粗略地说，一旦 TypeScript 的编译器检查完你的代码，它就会删除类型以生成生成的“编译”代码。这意味着一旦你的代码被编译，生成的纯 JS 代码就没有类型信息。

这也意味着 TypeScript 永远不会根据它推断的类型改变程序的行为

## 类型匹配
类型匹配只需匹配类型的子集
```typescript
interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
 
// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);
```
变量永远不会被point声明为Point类型。但是，TypeScript在类型检查point中将形状与形状进行比较。Point它们具有相同的形状，因此代码通过
```typescript
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"
 
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"
 
const color = { hex: "#187ABF" };
logPoint(color);
Argument of type '{ hex: string; }' is not assignable to parameter of type 'Point'.
  Type '{ hex: string; }' is missing the following properties from type 'Point': x, y
```
以上point时rect和point3的子集，因此匹配通过；但不是是color变量的子集，所以未通过；


## 未定义类型
此时没有给a指定类型，当类型中全是数字时，默认item就是number类型;如果item中有较多的类型时，
会默认该类型是已有类型的联合类型；
```typescript
const a = [1,2,1,4]
console.log(a)
a.push('9') // 报错
```
## 交叉类型
```typescript
// 属性联合
type Combined = { a: number } & { b: string };
// 例如
const t:Combined = {
    a:0,
    b:'9'
}

```