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
  - 在第二次阶段执行 commitRoot 之后。这个时候挂载的是loading 组件
  - 进入第三次 updateSuspenseComponent
- 第三次 执行，产生的是 fulfilled 状态的 Promise.



### 关于 Promise 状态变化的介绍

首先 SearchResults 在正常的渲染流程中，回执行一次渲染，不过当使用 use 时。
首先会执行正常的渲染流程，直到执行到use 的时候，产生一个 pending 状态的 Promise;
抛出一个 pending 状态的 Promise;此时再次进入了 updateSuspenseComponent 阶段；

执行commitRoot之后，loading 组件挂载到了页面上; 此时进入了 promise.then 的
执行阶段，产生一个 fulfilled 状态的 Promise;此时再次进入了 updateSuspenseComponent 阶段；

执行 pingSuspendedRoot ，执行 ensureRootIsScheduled ；再次进入 updateSuspenseComponent； 

进入了 fulfilled Promise,此时获取 promise.value（promise.value实在 promise.then执行后赋值的）

再次执行了commitRoot，result 组件最终挂载在页面上。 

## 关键 pingSuspendedRoot 是做什么的呢？

pingSuspendedRoot 由内而外执行如下：
- pingSuspendedRoot
- attachPingListener
- throwException
- handleError

### handleError
handleError 是对 workLoop 进行catch 捕获所得的值进行的处理


## 进入 finishConcurrentRender 的目的是什么呢？
首先，无 Suspense 的情况，会执行一次  finishConcurrentRender；当加上 Suspense 时，会执行两次 finishConcurrentRender。

### 那么 Suspense 的作用为什么会多触发一次 finishConcurrentRender 呢？


### 总结

suspense 组件在同步渲染阶段，会执行正常的渲染流程也就是fallback。

正常渲染流程，遇到一个promise的报错。进入再次渲染，此时时pending状态，渲染fallback 组件。

之后进入了微任务执行阶段，promise 的状态变为了 fulfilled, 再次进入渲染过程，此时渲染其子组件。

