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
