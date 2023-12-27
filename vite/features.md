# features
在最基本的层面上。使用vite 进行开发与使用静态文件服务器并无太大区别。vite 提供了很多优于 ESM导入的功能。


## npm 依赖导入和预构建
浏览器esm 不支持裸模块导入
> import { someMethod } from 'my-dep'

以上的导入方式会在浏览器报错，vite 将检测 所有服务源文件中的此类裸模块
导入，并执行以下操作:
- pre-bundle.将commonjs/umd 模块转换为esm
- 将导入重写为有效的url.一边浏览器能够正确的导入。

## typeScript 
vite 开箱即支持导入.ts 文件

vite 只对.ts 文件进行转译,而不执行类型检查。

- 对于生产构建，除了构建命令，也可运行` tsc --noEmit  `
- 在开发时，如果您需要的不仅仅是IDE 提示，可以在单独的进程中运行` tsc --noEmit --watch  `;也课利用vite-plugin-checker 进行检查。

## typeScript 编译选项
`tsconfig.json`中，以下编译选项需要特别注意。

- isolatedModules

  应该被设置为true。 因为esbuild 只进行无类型信息的转译，不支持某些功能，例如 const 枚举和隐式纯类型导入。

## jsx 
.jsx和.tsx 文件是默认支持的。jsx的编译是通过esbuild。
## css
- 导入.css文件将通过HMR 的`<style>` 标签将其内容注入页面
- 支持别名处理
- 支持内联注入，也可通过内联参数关闭内联注入。
## PostCSS
如果项目包含有效的 PostCSS配置，例如post.config.js。他将自动应用于所有导入的CSS。
## 静态资源导入
- url
- raw
- worker
## 多模块导入
vite 支持通过特殊的 import.meta.glob 函数从文件系统导入多个模块。 
默认情况下，匹配的文件是通过动态导入的方式懒加载，并会在构建过程中分割成不同的块。
- 支持以字符串的形式导入文件
- 支持传入多个需要导入的文件路径
- 支持查询选项，为导入提供自定义查询，供其他插件使用

## webAssembly
预编译.wasm文件。
## 构建优化
下面列出的功能会在构建过程中自动应用，无需明确配置。
### css code splitting
vite 会自动提取模块再异步分块中使用的css，并为其生成单独的文件。
加载异步模块时，css文件会通过link标签 自动加载。
### preload Directives Generation
生成预加载指令，`<link rel="modulepreload" />`,在构建的HTML 中直接导入它们。
### Async Chunk Loading Optimization
在实际应用中，rollup 通常会生成 通用代码块，即两个或多个其他代码块共享的代码。
在未优化的情况下，由于模块之间的依赖关系，会造成多个url 请求。 在优化之后，可以将多个模块进行合并，从而减少url 请求。   
**优化前**：
> entry --->A --->C

**优化后**
> entry ---> (A+C)
