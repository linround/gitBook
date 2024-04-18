# useState
示例代码： [链接](./index.html)

`useState` 是一个react 钩子，用于在函数组件中添加状态。

```javascript
const [state, setState] = useState(initialState)
```
- 使用
  - 添加状态
  - 基于前一个状态的更新
  - 更新数组或对象时，需要手动合并更新
  - 避免初始状态的重建
  - 使用 key 值来设置状态
  - 存储之前的渲染信息

## 源码解读
- setState 是异步的。
- setState 可以接收一个函数，这个函数的参数时prevState,返回值是新的state。
## dispatcher 的指向关系
![img.png](img.png)
### useState 的实现是什么呢？
- scheduleUpdateOnFiber ，进入更新
- 创建 更新任务，放入taskQueue 中。
- renderRootSync。进行同步渲染。
- pushDispatcher,(只会在开始的时候放置一次，以便后续的 子组件可以访问)。 首先 放置 ContextOnlyDispatcher，在一个全局对象 ReactCurrentDispatcher$2(实际就是 ReactCurrentDispatcher)上
- 创建根 fiber ,并设置为 workInProgress。
- 进入 workLoop,beginWork
- 进入函数组件，此时即可从 ReactCurrentDispatcher获取  ContextOnlyDispatcher
- 使用useState 钩子，在 mountState 函数中，获取当前的 fiberNode ,并创建 包含fiber 的 disPatchState 函数，然后返回状态和 disPatchState 函数。
- disPatchState 函数 由于获取了fiberNode和 lastRenderedState 等属性,所以可以精准的更新 组件。
- lastRenderedState 会在每次更新时，保存上一次的状态。
### 当多个useState 调用时，执行情况是怎样的呢？
- currentlyRenderingFiber$1.memoizedState 会创建一个hookState链表
### 当多个setState调用时，执行情况是怎样的呢？
- 调用第一个 setState时，可以获取到 当前fiberNode 和 lastRenderedState
- queue 被放在 concurrentQueue 中。
- 将新的 update 放在 queue.interleaved,多个setState会放在 concurrentQueues 中
- 会创建一个微任务执行更新，但是继续同步的执行另外的setState。所以因为setState 在处理值的时候是同步的，但是更新 函数组件时 是异步的。所以
  如果一个setState 执行更新多次，该setState函数始终是上一次创建的，所以访问的状态也始终是上一次的。 
- disPatcher 的起点是 fiberRootNode。

## updateState 的过程
### 两个新的state链表是如何进行更新的呢？
- concurrentQueues 中 interleaved属性值转移至 pending
### currentHook 在 mountState 和 updateState 中的作用是什么呢？
