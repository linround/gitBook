# typescript编写
`tsconfig.json` 文件说明整个ts解析和分析的分组，从而确定哪些是有效的，哪些是无效的
；除了关于文件信息外，编译上下文还包含了编辑器的选项信息；

## 声明
1. [x] 类型声明
```typescript
class Foo {};
interface Bar {};
type Bas = {};
```
1. [x] 使用已声明的类型
```typescript
var foo: Foo;
var bar: Bar;
var bas: Bas;
```
## [modules](https://basarat.gitbook.io/typescript/project/modules)
## `commonjs`,`amd`,`es modules`
1. [x] amd：z只适用于浏览器
2. [x] commonjs适用于node环境和浏览器环境

#### 模块查找
1. 例如：`import * as foo from 'foo'`
____________________________
+ ./node_modules/foo
+ ./node_modules/foo
+ ../../node_modules/foo
+ Till root of file system  
___________________

