# useEffect

useEffect 相当于 vue 中的 watch。

```javascript
useEffect(setup, dependencies?)
```


## 使用

- useEffect 可以用来与外部系统建立相应的连接。[也就是能够很好的进行解耦](https://react.dev/reference/react/useEffect#examples-connecting)
- 在使用useEffect 的时候，注意消除请求的条件竞争。参考[这里](https://react.dev/reference/react/useEffect#fetching-data-with-effects)
- 基于前一个状态进行更新。传递一个更新函数，从而减少依赖得传递。参考[这里](https://react.dev/reference/react/useEffect#updating-state-based-on-previous-state-from-an-effect)
## 可能出现的问题
- 在严格模式下，useEffect 会执行两次
- useEffect 无限循环执行的问题
  - 在useEffect 中，更新了某个依赖
  - 状态导致了重复渲染，渲染时导致了 useEffect 依赖的改变

## 关于自定义钩子的示例

## 源码分析
### useEffect 函数是怎样的呢？
在函数组件App 调用的时候。如果存在钩子调用 首先会 对 workInProgressHook进行赋值。
对于多个钩子，会形成 workInProgressHook 链表。在当前这个 hook.memoizedState 中存储当前 effect，
effect包括了deps,create,和 destroy(初始是 undefined)。继续在 当前 fiber 的updateQueue中创建 effect 链表。

- 执行 mountEffect.
- 传入的参数 callback 会被放在 taskQueue 中
- 调用函数 
  - flushPassiveEffects 
  - flushPassiveEffectsImpl 
  - commitPassiveMountEffects 
  - commitPassiveMountEffects_begin 
  - commitPassiveMountEffects_complete
  - commitPassiveMountOnFiber
### 条件竞争的形成和解决方法是什么？
源码示例参考[这里](./raceConditions.html)
### useEffect 执行时机是什么时候，为什么 通过useEffect 可以访问真实DOM？
useEffect 中的函数实在DOM挂载到页面上之后才执行的

### 基于 useEffect 的自定义钩子，此时的fiber 来源是什么？

代码参考：[链接](./customHook.html)  

### useEffect 和 useLayoutEffect 的区别是什么？

### useEffect 未传递参数时，会执行多次吗？

- 当未传递参数时，useEffect 在组件的每次渲染都会执行。这和 useCallback 是一样的。
- 当传递空数组的时候，useEffect 指挥执行初始的这一次。

### setState 执行时，useEffect 执行时机是什么时候呢？

setState 执行后，state 的pending状态就绪后。然后执行从rootFiber 执行渲染,这个时候 useEffect
的依赖就会重新获取，如果依赖发生了变化，那么就会重新执行useEffect。
