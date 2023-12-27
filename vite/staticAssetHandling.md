# static asset handling

## 使用url 来导入资源
这个行为和 webpack 的 file-loader 相似。
- 常见的 图像，media,字体文件类型，会被自动检测未资产。
- 被引用的资产将作为 构建资产图的一部分，获得散列文件名，并可有插件处理以进行优化。
- typescript 默认不将静态资产导入视为有效模块。
## 导入字符串资源
资源可以被当作字符串导入，使用`?raw`后缀

## 导入 worker 脚本
使用后缀 `?worker` 或 `?sharedworker`
```javascript
import Worker from './shader.js?worker'
const worker = new Worker()

import SharedWorker from './shader.js?sharedworker'
const sharedWorker = new SharedWorker()

```
