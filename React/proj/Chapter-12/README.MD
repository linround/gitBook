# useEffect

useEffect 相当于 vue 中的 watch。

```javascript
useEffect(setup, dependencies?)
```

## 使用

- useEffect 可以用来与外部系统建立相应的连接。[也就是能够很好的进行解耦](https://react.dev/reference/react/useEffect#examples-connecting)


## 关于自定义钩子的示例

## 疑问

### useEffect 执行时机是什么时候，为什么 通过useEffect 可以访问真实DOM？

### 基于 useEffect 的自定义钩子，此时的fiber 来源是什么？

代码参考：[链接](./customHook.html)  



### useEffect 未传递参数时，会执行多次吗？

- 当未传递参数时，useEffect 在组件的每次渲染都会执行。这和 useCallback 是一样的。
- 当传递空数组的时候，useEffect 指挥执行初始的这一次。

### setState 执行时，useEffect 执行时机是什么时候呢？

setState 执行后，state 的pending状态就绪后。然后执行从rootFiber 执行渲染,这个时候 useEffect
的依赖就会重新获取，如果依赖发生了变化，那么就会重新执行useEffect。
