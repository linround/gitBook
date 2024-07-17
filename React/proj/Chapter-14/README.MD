# Suspense
[demo链接](https://codesandbox.io/s/thirsty-fast-mtrdz8?file=/src/SearchResults.js)

## 场景

在执行 workLoopSync 阶段，
- demo组件执行，返回 子ReactElement
- 子ReactElement 变成子FiberNode
- 子 FiberNode 进入 beginWork阶段
- 进入 SearchResults 的 组件执行时触发了报错
- 记录报错的 workInProgress.赋值给 erroredWork
- 进入 finishConcurrentRender 阶段，挂载 loading


在 beginWork 阶段会调用两次 updateSuspenseComponent
- 第一次是正常的渲染流程下
- 第二次渲染到 SearchResults 在使用use的时候，产生一个 pending 状态的 Promise;
- 第三次 执行，产生的是 fulfilled 状态的 Promise.
- 



## 进入 finishConcurrentRender 的目的是什么呢？
首先，无 Suspense 的情况，会执行一次  finishConcurrentRender；当加上 Suspense 时，会执行两次 finishConcurrentRender。

### 那么 Suspense 的作用为什么会多触发一次 finishConcurrentRender 呢？
