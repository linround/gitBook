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

