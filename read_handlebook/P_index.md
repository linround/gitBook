# 装饰器


一种特殊声明，可附加在类、方法、访问器、属性、参数；
## 装饰器工厂函数
````typescript
function color(value: string) {
  // 返回装饰器函数
  return function (target) {
    // 在目标上可以处理一些必要的事情
  };
}
````

+ 装饰器可以多个拼装
```typescript
@f @g x
```
或者
```typescript
@f
@g
x
```
以上的运行等价于 `f(g(x))`