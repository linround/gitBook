# 基础知识

简单看一段代码
```typescript
// Accessing the property 'toLowerCase'
// on 'message' and then calling it
message.toLowerCase();
// Calling 'message'
message();
```
+ 第一行代码会访问一个名为`toLowerCase`的属性，然后后运行;
+ 第二行尝试直接调用`message`;

通常我们并不知道`message`的值，那么就会有以下几个问题：
+ `message`可以直接调用吗？
+ 它有`toLowerCase`这个属性吗？如果有`toLowerCase`可以调用吗？
+ 如果以上两行代码都会调用，他们会返回什么？

假设`message`定义如下：
```typescript
const message = "Hello World!";
```
+ 尝试调用`toLowerCase`时，会得到相同的小写字母的字符串。
+ 当场是运行第二行代码时，会报错
```
TypeError: message is not a function
```


## 如何能够避免错误呢？
对于某些数据，比如string和number，在代码运行时可以使用typeof来判断其类型；
但是对于像函数这种类型的东西，没有相应的机制来识别他们。例如：
```javascript
function fn(x) {
  return x.flip();
}
```
这个函数在给定一个具有flip属性的对象时才能运行。在js中，判断特定值做什么的唯一方法
是调用它，并查看会发生什么。这种行为是的在运行之前很难预测代码的行为，也意味着在编写
代码时，很难知道代码会作什么。  
通过使用`静态类型`系统在运行之前预测预期的代码；

## 静态类型
理想情况下，我们有一个工具来帮助我们在代码运行之前找到这些错误。这就是ts这样的静态类型
检查器所做的。静态类型系统描述了当我们程序运行是的状态和行为，并告诉我们可能会出现的异常行为。
1. [x] 异常字段检查、未调用函数、基本逻辑错误
2. [x] 工具类型：检查我们正在访问的变量或者属性信息；
3. [x] 显示类型：明确变量的类型
4. [x] 擦除类型：编译后成js后，类型会被擦除；
5. [x] 降级：将es6中的模板字符串的写法进行兼容处理，使得其支持低版本浏览器；

## 总结
ts是一种类型检查器，同时tsc是将ts编译为js的编译工具。在编写代码过程中通过静态类型检查能够
在代码运行之前推断出可能出现的错误，tsc能够对ts中的代码进行类型擦除，同时将ts编译为浏览器所需
的对应版本的js代码； 