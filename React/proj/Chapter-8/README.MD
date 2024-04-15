# createContext
示例代码：[链接](./index.html)

createContext 返回一个 context 对象。
- 组件可以通过 useContext 来订阅 context 的变化。
- 组件可以通过 Consumer 来订阅 context 的变化。
```javascript
const MyContext = React.createContext({
    value:'myContext'
  });
```

可以直接使用 `useContext` 获取 `MyContext` 的值；结合 `MyContext.Provider`，可以实现对 `MyContext` 值的更改。

## 使用方法
对于context 的使用方式有下面两者方式可以进行使用。
### useContext
使用钩子来使用 `MyContext` 的值
```javascript
 function Demo() {
  const {value} = React.useContext(MyContext);
  return React.createElement("div", null, "context:", value);
}
```
### Context.Consumer
使用 `Context.Consumer` 来使用 `MyContext` 的值；目前推荐使用useContext。
```javascript
function ConsumerDemo() {
  return (
    <MyContext.Consumer>
      {({value}) => <div>ConsumerDemo:{value}</div>}
    </MyContext.Consumer>
  )
}
```

## 相关疑问
### 为什么 推荐使用useContext呢？相比Consumer有什么优势？
### Provider的作用是什么？对于子元素 是如何处理的呢？
```javascript

  function App() {
    const [value,setValue] = React.useState(1);
    return (
      <div>
        <MyContext.Provider value={{value}}>
          <Demo />
          <ConsumerDemo/>
        </MyContext.Provider>
        <button onClick={() => setValue(value+1)}>change</button>
      </div>
    )
  }
```

## 源码分析
### createContext 做了什么？
```javascript
const MyContext = React.createContext({
    value: 'myContext'
  });
```
