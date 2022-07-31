# `typeof`运算符
+ 使用`typeof`来使用上下文的类型
```typescript
let s = "hello";
let n: typeof s; // let n: string
```
+ `typeof`结合`ReturnType`来定义相关的类型；
```typescript
function f() {
  return { x: 10, y: 3 };
}

/*
 * type P = {
 *  x: number;
 *  y: number;
 * }
 */
type P = ReturnType<typeof f>; //
const o:P = {
  x:9,
  y:10
}
```