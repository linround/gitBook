# react 的类组件渲染
## 类组件源代码
```javascript
 class App extends React.Component{
    constructor(props) {
        super()
        const {name} = props
        this.render = this.render.bind(this)
        this.change = this.change.bind(this)
        this.state = {
            name:name
        }
        console.log('MyComponent constructor')
    }
    componentDidMount(){
        console.log('MyComponent componentDidMount')
    }
    change(){
        this.setState({
            name:'my component new name'
        })
    }
    render(){
        console.log('MyComponent render')
        const {name} = this.state
        return (
            <div>
                <div>{name} 1</div>
                <div>{name} 2</div>
            </div>
        )
    }

}

const root = ReactDOM.createRoot(document.getElementById("root"),{
    identifierPrefix:'react-class'
})
// ReactDOMRoot的原型上具有render方法
root.render(<App name={'app-name'} />);
```

## 类组件编译后的代码
```javascript

class App extends React.Component {
    constructor(props) {
        super();
        const {
            name
        } = props;
        this.render = this.render.bind(this);
        this.change = this.change.bind(this);
        this.state = {
            name: name
        };
        console.log('MyComponent constructor');
    }

    componentDidMount() {
        console.log('MyComponent componentDidMount');
    }

    change() {
        this.setState({
            name: 'my component new name'
        });
    }

    render() {
        console.log('MyComponent render');
        const {
            name
        } = this.state;
        return React.createElement(
            "div",
            null,
            React.createElement("div", null, name, " 1"),
            React.createElement("div", null, name, " 2")
        );
    }

}

const root = ReactDOM.createRoot(document.getElementById("root"), {
    identifierPrefix: 'react-class'
}); // ReactDOMRoot的原型上具有render方法

root.render( React.createElement(App, {
    name: 'app-name'
}));
```


## 函数组件源码
```javascript
function App({name}){
       return (
           <div>
               <div>{name} 1</div>
               <div>{name} 2</div>
           </div>
       )
   }

    const root = ReactDOM.createRoot(document.getElementById("root"),{
        identifierPrefix:'react-class'
    })
    // ReactDOMRoot的原型上具有render方法
    root.render(<App name={'app-name'} />);
```
## 函数组件编译后
```javascript
function App({name}) {
        return React.createElement(
            "div",
            null,
            React.createElement("div", null, name, " 1"),
            React.createElement("div", null, name, " 2")
        );
    }

    const root = ReactDOM.createRoot(document.getElementById("root"), {
        identifierPrefix: 'react-class'
    }); // ReactDOMRoot的原型上具有render方法

    root.render( React.createElement(App, {
        name: 'app-name'
    }));
```
### 观察编译后的 类组件和函数组件
- 使用 ReactDOM.createRoot 创建了一个root对象
- 函数组件和类组件，都调用了`React.createElement`，然后调用了`root.render`进行渲染
### ReactDOM.createRoot
![](./img/img_2.png)
#### 两个参数
#### container
容器dom元素
#### options 可传参数
- hydrate 同于服务端渲染
- unstable_strictMode 是否开启严格模式，默认 false
- identifierPrefix,默认 空字符串
- onRecoverableError，默认console.error 函数
- transitionCallbacks，默认null

### 返回的root对象的属性和方法如下
![](./img/img.png)
#### root中的container
- __reactContainer$rpvbt2f5c8 是一个随机生成的属性，表示是被标记的root节点
 ![](./img/img_1.png)
### isValidContainer
```text
判断是否是合法的DOM容器节点
document.body span li div 的 nodeType 都是 1
document 的 nodeType 是 9
document.createDocumentFragment 创建的节点是 11
以上都是合法容器
```
### createContainer
![](./img/img_3.png)


#### 执行过程
### React.createElement
