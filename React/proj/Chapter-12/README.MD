# useEffect
useEffect 相当于 vue 中的 watch。
```javascript
useEffect(setup, dependencies?)
```
## 使用
- useEffect 
## 疑问
### useEffect 未传递参数时，会执行多次吗？
- 当未传递参数时，useEffect 在组件的每次渲染都会执行。这和 useCallback 是一样的。
- 当传递空数组的时候，useEffect 指挥执行初始的这一次。
