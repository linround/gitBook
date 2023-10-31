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