# vite
- 性能瓶颈分析插件； [vite-plugin-inspect](https://github.com/antfu/vite-plugin-inspect) 

## 性能优化
- 减少文件的解析操作
- 避免使用 桶文件
- 预热频繁使用的文件
- 使用更少或更原生化的工具链

## 插件
- [虚拟模块的应用](https://cn.vitejs.dev/guide/api-plugin.html)。可以自定义模块名，自定义导出内容，并在项目中使用该模块（`目前默认在开发环境中可使用`），关于在生产环境中使用，可以参考[WindiCss](https://cn.windicss.org/guide/configuration.html)；模拟node_module中的模块。

