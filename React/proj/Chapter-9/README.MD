# useContext
示例代码：[链接](./index.html)

- 使用
  - 深入的传递值。
  - 更新数据通过上下文
  - 指定默认值
  - 覆盖部分内容上下文
  - 优化重复渲染和对象传递
## 参考
`useContext(MyContext)`

调用 `useContext` 在组件中读取和订阅上下文。
### 参数
- MyContext: 使用 `createContext` 创建的上下文
### 返回值
useContext 获取 context 的值。它会返回最近的Provider 所传递的值。如果没有Provider,那么在
形成Fiber 树的过程中就不会存在对 context 值的修改，那么就会返回该默认值。

```javascript
function Demo() {
    const {value} = React.useContext(MyContext);
    return React.createElement("div", null, "context:", value);
  }
```

## 总结
 useContext 的作用就是获取引用值 _currentValue, 因为 _currentValue  会在Provider 渲染过程中 会被赋一个 context 栈中最近的那个值。
所以useContext 能获取到最近的那个context提供的值。
