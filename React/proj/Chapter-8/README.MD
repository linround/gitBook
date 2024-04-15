# createContext
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
使用 `Context.Consumer` 来使用 `MyContext` 的值
```javascript
function ConsumerDemo() {
  return (
    <MyContext.Consumer>
      {({value}) => <div>ConsumerDemo:{value}</div>}
    </MyContext.Consumer>
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
