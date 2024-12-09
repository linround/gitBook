# useTransition

useTransition 是 React 的一个钩子。允许在不阻塞用户界面的情况下更新状态。

## 使用
- 将状态标记为非阻塞
- 在过渡过程中更新父组件
- 在过渡期间显示待处理的视觉状态
- 防止不必要的 loading
- 构建支持暂停功能的路由器
## 参数
useTransition 不接受任何参数
## 返回值
useTransition 返回一个数组，包含两个元素：
- startTransition：一个函数，用于启动过渡
- isPending：一个布尔值，表示是否有过渡正在进行中

## 注意事项
- 传递给startTransition的函数 必须是同步函数
- 标记为过渡的状态更新会被其他状态更新打断
- 过渡更新不能用于控制文本的输入
- 如果有多个正在进行的过渡更新，React 会将将他们批处理在一起

## 关于场景
- [在切换tab 时间，假设三个tabA、tabB、tabC。](https://codesandbox.io/s/tkyfgs?file=/src/App.js&utm_medium=sandpack)tabB 渲染时间很长，在渲染渲染 tabB的时间内，点击了tabC.这个时候就会使得tabC的渲染处在等待中。如果使用 transition 组件，就可以立即渲染tabC.

## useTransition 做了什么
- useTransition 也是一个hook.返回一个 startTransition 函数和一个 isPending 布尔值。
- 并发模式下的状态更新分类：React 将更新分为不同的优先级类别，其中某些更新被认为是紧急的，而其他更新（如从服务器获取数据）则可以中断或延后更新
- 使用 startTransition 函数，实际上告诉React这个更新不是非常紧急的，可以中断或延后处理这个次要的更新。
- startTransition 的作用就是触发了React 的并发渲染机制，从而导致了渲染任务是可中断的
- isPending 提供了一个标志。
- 有一个组件ui渲染的时间很长，这个时候使用 startTransition 启用并发渲染，防止该组件的渲染阻塞后续的渲染。

## 关于并发渲染的分析
### workLoopConcurrent
在执行 过程中会判断 shouldYield；在子fiber 较深较多的情况下，会中断渲染。

#### shouldYield
计算当前时间与开始时间的渲染过程是否超过了 5ms。如果超过了就会被中断该fiber。
使用保持taskQueue中有一个任务，然后不断的执行这个任务，就能逐渐的进行并发更新。
### workLoopSync
由于workLoopSync 


## 是在那里标记了某个组件是并发渲染的呢？

## 总结
- transition 是一个非常有用的 hook，可以用于优化用户体验.比如终止某个页面的渲染过渡。
- useTransition 带来的是“可中断”的异步UI渲染。可优化实际工作中遇到的卡顿现象。
- 通过 startTransition 函数，可以告诉React这个更新不是非常紧急的，从而启动并发更新。
- 在并发渲染过程中，workLoopConcurrent 会判断 shouldYield，如果超过了5ms，就会中断该fiber的渲染。
- 并返回一个回调函数
- workLoop 返回一个布尔值，表明是否存在任务。
- 布尔值传递给 requestHostCallback
- 在requestHostCallback中，performWorkUntilDeadline会通过定时器调用 flushWork
- flushWork 会异步调用调用 workLoop
- 通过并发调度由此不断的异步执行渲染任务即可实现并发渲染。
![img.png](img.png)

任务队列中的任务是被可以通过中断、恢复这套机制来执行的。
- performConcurrentWorkOnRoot是可以被中断的
- 因为 workLoopConcurrent 不断地跳出循环 再执行 workLoopConcurrent
![img_1.png](img_1.png)


因为set函数是任务执行时间很长，就会造成阻塞，所以使用useTransition可以解决这个问题。
set函数的渲染也可以认为是异步，因为是通过postMessage来实现的。但是组件的渲染是同步的，但是由于useTransition的存在，可以使得组件的渲染是异步逐步渲染的。
所以当新的set函数触发的时候，不会被之前的阻塞，而是会被中断，然后继续执行新的set函数。


## 参考
- [彻底搞懂 React 18 并发机制的原理](https://juejin.cn/post/7171231346361106440#heading-0)
