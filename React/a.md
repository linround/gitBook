# React 源码解读1
使用React来渲染一个网页的方式
- 直接调用React.render,传入两个参数`模板组件`和`根DOM`元素
- 首先调用React.createRoot来创建一个根元素`root`，调用root.render,传入`模板组件`；
> React构建的网页中，两个最主要的模块就是`react`和`reactDom`
## React
```javascript

let value = 0
function MyApp() {
    const [num,setNum] = React.useState(0)
    const handleSetName = ()=>{
      setNum(value++)
    }
    return <h1 onClick={handleSetName}>value is: { num }</h1>;
}

  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container);
  root.render(<MyApp />);
    
```
### Babel与 React的关系
以上代码最终编译结果：
```javascript
let value = 0;

function MyApp() {
  const [num, setNum] = React.useState(0);

  const handleSetName = () => {
    setNum(value++);
  };

  return /*#__PURE__*/React.createElement("h1", {
    onClick: handleSetName
  }, "value is: ", num);
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render( /*#__PURE__*/React.createElement(MyApp, null));
```
babel 将jsx编译成React.createElement的形式调用来创建元素；

