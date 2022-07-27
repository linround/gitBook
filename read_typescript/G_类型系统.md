# ts 类型系统
## 基本使用
1. [x] 声明变量类型，函数参数类型，函数返回值类型；
```typescript
var num: number = 123;
function identity(num: number): number {
    return num;
}
```
1. [x] 原始类型  
例如`string、number、boolean`
```typescript
var num: number;
var str: string;
var bool: boolean;

num = 123;
num = 123.456;
num = '123'; // Error

str = '123';
str = 123; // Error

bool = true;
bool = false;
bool = 'false'; // Error
```
3. [x] 数组定义
```typescript
var boolArray: boolean[];

boolArray = [true, false];
console.log(boolArray[0]); // true
console.log(boolArray.length); // 2
boolArray[1] = true;
boolArray = [false, false];

boolArray[0] = 'false'; // Error!
boolArray = 'false'; // Error!
boolArray = [true, 'false']; // Error!
```
4. [x] Interfaces是多个类型注释组合成单个类型注释的方式方法,
```typescript
interface Name {
    first: string;
    second: string;
}

var name: Name;
name = {
    first: 'John',
    second: 'Doe'
};

name = {           // Error : `second` is missing
    first: 'John'
};
name = {           // Error : `second` is the wrong type
    first: 'John',
    second: 1337
};
```

5. [x] 内联类型注释。不用创建一个interface，通过借鉴前一个实例来定义内联类型
```typescript
// 相当于 let name = undefined
let name: {
    first: string;
    second: string;
};
name = {
    first: 'John',
    second: 'Doe'
};

name = {           // Error : `second` is missing
    first: 'John'
};
name = {           // Error : `second` is the wrong type
    first: 'John',
    second: 1337
};
```
6. [x] 特殊的类型：any、null、undefined、void  
   类型系统如何处理它们取决于 strictNullChecks 编译器标志（我们稍后会介绍这个标志）。当在 strictNullCheck:false 中时，类型系统会有效地处理 null 和未定义的 JavaScript 文字，就像任何类型的东西一样。这些文字可以分配给任何其他类型。这在以下示例中:
```typescript
var num: number;
var str: string;

// These literals can be assigned to anything
num = null;
str = undefined;
```

7. [x] 表示函数没有返回类型
```typescript
function log(message): void {
    console.log(message);
}
```
8. [x] 泛型  
在函数中，数据结构不依赖于具体的对象类型；
9. [x] 联合类型
即一个数据可以是多个类型中的其中一种。
```typescript
function formatCommandline(command: string[]|string) {
    var line = '';
    if (typeof command === 'string') {
        line = command.trim();
    } else {
        line = command.join(' ').trim();
    }

    // Do stuff with line: string
}
```
10. [x] 交叉类型
具有两个对象，并创建具有这两个对象新特性的对象
```typescript
function extend<T, U>(first: T, second: U): T & U {
  return { ...first, ...second };
}

const x = extend({ a: "hello" }, { b: 42 });

// x now has both `a` and `b`
const a = x.a;
const b = x.b;
```
11. [x] 元组类型
合并了不同类型的对象。
12. [x] 类型别名
```typescript
type StrOrNum = string|number;

// Usage: just like any other notation
var sample: StrOrNum;
sample = 123;
sample = '123';

// Just checking
sample = true; // Error!
```