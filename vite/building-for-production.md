# building for production

## 浏览器兼容性
- Chrome >=87
- Firefox >=78
- Safari >=14
- Edge >=88
最低的编译结果是 `es2015`

## 自定义构建
可通过 `build.rollupOptions` 自定义构建配置。

例如 可以指定多个rollup 输出。这些插件只在构建过程中应用。

## 监听文件变化
> vite build --watch

可配置 `build.watch` 来自定义监听内容

## 多页面应用

## 测试本地应用
在构建完成后，可使用 `vite preview`来预览该应用。

`vite preview` 命令会启动一个本地静态站点服务。这是在本地环境中检查生产构建是否正常的最简单的方法。

## .env 文件
```text
.env // 在所有模式下加载
.env.local // 在所有模式下加载，git会忽略
.env.[mode] // 在指定模式下加载
.env.[mode].local // 在指定模式下加载，git 会忽略

```
可查看 [dotenv](https://github.com/motdotla/dotenv)
- 使用VITE前缀可选择性暴露变量

## html Env Replacement

`import.meta.env`中的任何属性都可以在HTML文件中使用。只需要使用该语法：`%ENV_NAME%`；

## vite 可构建的ssr项目
- [react](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-react)
