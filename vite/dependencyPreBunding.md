# Dependency Pre-Bundling
首次运行vite,会在本地加载网站之前预绑定项目依赖项。

## 依赖预绑定的原因
- 兼容commonjs 和umd。vite会将所有的代码作为本地ESM 提供。因此，vite 必须先将commonjs或UMD转换为ESM。
- 性能。vite 将多个内部模块的esm 依赖关系转换为单个模块，以提高后续页面的加载性能。
   
  例如lodash-es 由600多个内部模块。当从中导入 debounce 时，浏览器会同时发出多个http请求。大量的请求在浏览器端造成网络拥堵，导致页面加载变慢。

## 自动的依赖查找
如果找不到现有的缓存，vite 会抓取源代码，自动的发现依赖导入，并使用这些发现的导入作为预捆绑的入口点。预捆绑是esbuild 构建的，因此会非常的块。

## 缓存
### 文件系统缓存
vite 缓存预绑定的依赖在 node_modules/.vite 中。它会根据一些来源来决定是否需要重新运行预绑定步骤。
- ` package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
- NODE_ENV value.
### 浏览器缓存
部分依赖请求会通过http 标头进行强缓存，以此提高开发过程的页面加载性能。
