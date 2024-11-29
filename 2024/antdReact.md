# antd-design 技术点学习
## webpack 相关测试
| 名称                                                                                                                         | 描述          |
|----------------------------------------------------------------------------------------------------------------------------|-------------|
| [@codecov/webpack-plugin](https://mitudegaoyang.gitbook.io/j/tools/codecov#id-22-guan-lian-github)                         | 代码测试覆盖率检测工具 |
| [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)                                      | 打包分析工具      |
| [circular-dependency-plugin ](https://www.npmjs.com/package/circular-dependency-plugin)                                    | 循环依赖检查工具    |
| [@madccc/duplicate-package-checker-webpack-plugin](https://www.npmjs.com/package/duplicate-package-checker-webpack-plugin) | 依赖包重复检查工具   |




## 常见的一些问题
- 类型判断; 对于对象的判断中。
```javascript
  console.log(typeof 1) // number
  console.log(Object.prototype.toString.call(1)) // [object Number]
  console.log(typeof '1') // string
  console.log(Object.prototype.toString.call('1')) // [object String]
  console.log(typeof undefined) // undefined
  console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
  console.log(typeof null) // object
  console.log(Object.prototype.toString.call(null)) // [object Null]
  console.log(typeof []) // object
  console.log(Object.prototype.toString.call([])) // [object Array]
  console.log(typeof {}) // object
  console.log(Object.prototype.toString.call({})) // [object Object]
  console.log(typeof new Map()) // object
  console.log(Object.prototype.toString.call(new Map())) // [object Map]
  console.log(typeof new Set()) // object
  console.log(Object.prototype.toString.call(new Set())) // [object Set]
```
