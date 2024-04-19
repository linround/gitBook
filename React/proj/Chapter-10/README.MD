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

## 总结
- 禁止在循环中使用useCallback：[链接](https://react.dev/reference/react/useCallback#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)

## 源码分析
### 传递多个依赖，同时更新这多个依赖。useCallback的执行情况是怎样的呢？
### 没有传递依赖时以及传递一个空依赖的时候，重复渲染时useCallback的执行情况是怎样的？
