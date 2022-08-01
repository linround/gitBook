# 模块
+ 在顶级包含`import`或者`export`文件称为模块；  
+ 模块具有自己的作用域范围
## 导入导出
+ 导出
```typescript
// @filename: hello.ts
export default function helloWorld() {
  console.log("Hello, world!");
}
```
+ 导入
````typescript
import helloWorld from "./hello.js";
helloWorld();
````
+ 导入后重命名
```typescript
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;
 
export class RandomNumberGenerator {}
 
export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
```
```typescript
import { pi as π } from "./maths.js";
 
console.log(π);
```
+ 合并为一个`import`
```typescript
// @filename: maths.ts
export const pi = 3.14;
export default class RandomNumberGenerator {}
 
// @filename: app.ts
import RandomNumberGenerator, { pi as π } from "./maths.js";
 
 
console.log(π);
```

+ 将所有导出的对象放在单个命名空间
```typescript
import * as math from "./maths.js";
 
console.log(math.pi);
const absPhi = absolute(phi);
```


## 声明类型的导入
+ 在import后面使用type关键字，用来只导入类型；
```typescript
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
'createCatName' cannot be used as a value because it was imported using 'import type'.
export type Dog = { breeds: string[]; yearOfBirth: number };
export const createCatName = () => "fluffy";
 
// @filename: valid.ts
import type { Cat, Dog } from "./animal.js";
export type Animals = Cat | Dog;
 
// @filename: app.ts
import type { createCatName } from "./animal.js";
const name = createCatName();
```
+ 在导入的对象前可以添加type前缀，表示导入的是类型；
```typescript
// @filename: app.ts
import { createCatName, type Cat, type Dog } from "./animal.js";
 
export type Animals = Cat | Dog;
const name = createCatName();
```