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
