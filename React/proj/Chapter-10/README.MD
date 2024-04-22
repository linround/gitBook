# useCallback

示例代码（babel转换后的）： [链接](./index.html)

在代码中，useCallback 和 memo 结合一起使用。对于Log组件，当print函数不变时，不会重新创建Log组件。
useCallback 缓存函数，当函数的依赖项变化时，函数才会重新创建，当所以name变化时，print函数不会重新创建。
这个时候 Log 就不会重新渲染。

```javascript

  const Log = React.memo(function Log({print}) {
    console.log('Log render')
    return (
      <div>
        <button onClick={print}>print</button>
      </div>
    );
  });
  function Demo() {
    console.log('Demo render')

    const [count, setCount] = React.useState(0);
    const [name, setName] = React.useState('张三');


    /**
     *
     * 改变 count， print 会重新创建
     * 会触发 Log 组件的重新渲染
     *
     * 改变 name， print 不会重新创建
     * 不会触发 Log 组件的重新渲染
     *
     **/
    const print = React.useCallback(()=>{
      console.log('print',count)
    },[count])

    /*
    *
    * 如果使用 print2
    * 当name 变化时，print2 会重新创建
    * 会触发 Log 组件的重新渲染
    *
    * */
    const print2 = ()=>{
      console.log('print2',count)
    }

    return (
      <div>
        <button onClick={() => setCount(count+1)}>改变count:{count}</button>
        <button onClick={() => setName(`张三${Date.now()}`)}>改变 name:{name}</button>
        <Log print={print} />
      </div>
    );
  }






  const root = ReactDOM.createRoot(document.getElementById("root"))
  // root.render(<Example />);
  root.render(
    <Demo />
  )
```
## 使用
- 用于缓存传递给子组件的函数。结合memo使用，可以减少子组件的重复渲染，同时又能保证函数的实时更新。
- 自定义钩子，在必要时可以进行自动的更新方法。

## 源码分析

### 不传递依赖时
- 修改有关state 会触发useCallback重新执行
- 修改无关state 会触发useCallback重新执行
### 传递空数组依赖时
- 修改有关state 不会触发useCallback重新执行
- 修改无关state 不会触发useCallback重新执行

## 问题
### 传递 空数组时，修改无关state 不会触发useCallback重新执行，但是setState 还是能够正确的引用该值，为什么呢？
传递空数组依赖，在进行对比的时候。会认为这两个空数组依赖是相等的，所以useCallback返回的是之前的值。

### 为什么不传递依赖，修改无关的或修改有关的 state 都会触发 useCallback 呢？
如果不传递依赖，只要组件发生重新渲染，useCallback都会执行，返回新的值。因为在 updateCallback 的逻辑中，nextDeps 为 null 时，不会进行比较，直接返回新的函数。
```javascript
 function updateCallback(callback, deps) {
    var hook = updateWorkInProgressHook();
    // dep 未传递时，nextDeps 为 null
    var nextDeps = deps === undefined ? null : deps;
    var prevState = hook.memoizedState;

    if (prevState !== null) {
      // nextDeps 为 null 时，不会进行比较，直接返回新的函数
      if (nextDeps !== null) {
        var prevDeps = prevState[1];

        if (areHookInputsEqual(nextDeps, prevDeps)) {
          return prevState[0];
        }
      }
    }

    hook.memoizedState = [callback, nextDeps];
    console.log('updateCallback 触发')
    return callback;
  }
```

## 总结
- 禁止在循环中使用useCallback：[链接](https://react.dev/reference/react/useCallback#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)
- useCallback 和 useMemo 比较相似。useCallback 返回的是一个函数， useMemo 返回的的函数执行后得到的值
