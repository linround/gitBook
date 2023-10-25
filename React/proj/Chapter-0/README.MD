# 搭建本地源代码
- 创建html文件
- 引入[react.development.js](./react.development.js)文件
- 引入[react-dom.development.js](./react-dom.development.js) 文件
- 引入[remix-router](./remix-router.js)文件
- 引入[react-router](./react-router.js)文件
- 引入[react-router-dom](./react-router-dom.js)文件
- 引入[redux](./redux.js)文件
- 引入[babel](./babel.js)文件
- 创建[相关代码](./index.html)
- 查看[编译后的源码内容](./sourceCode.html)
```html
<script type="text/babel" data-presets="react,stage-3">

  const store = Redux.createStore(
    Redux.combineReducers({
      counter: (state = 0, action) => {
        switch (action.type) {
          case 'INCREMENT':
            return state + 1;
          case 'DECREMENT':
            return state - 1;
          default:
            return state;
        }
      },
      random: (state = 0, action) => {
        switch (action.type) {
          case 'RANDOM':
            return Math.random();
          default:
            return state;
        }
      },
    })
  );
  function MyReduxComponent() {
    console.log('MyReduxComponent render')

    const [state, setState] = React.useState(store.getState());

    React.useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setState(store.getState());
      });

      return () => unsubscribe();
    }, [setState]);
    const Increment = ()=>{
      store.dispatch({type:'INCREMENT'})
    }
    const Decrement = ()=>{
      store.dispatch({type:'DECREMENT'})
    }
    const Random = ()=>{
      store.dispatch({type:'RANDOM'})
    }
    return (
      <div>
        <h1>redux</h1>
        <div>
          <button onClick={Increment}>+</button>
          <button onClick={Decrement}>-</button>
          counter:{state.counter}
        </div>
        <div>
          <button onClick={Random}>Random</button>
          random:{state.random}
        </div>
      </div>
    )
  }



  class MyComponent extends React.Component{
    constructor() {
      super()
      this.render = this.render.bind(this)
      this.change = this.change.bind(this)
      this.state = {
        name:'my component state name'
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
          <h1>MyComponent</h1>
          <div>{name}</div>
          <button onClick={this.change}>changeName</button>
        </div>
      )
    }

  }
  const Example = () => {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
      document.title = `You clicked ${count} times`;
    });
    const handleClick = ()=>{
      setCount(count + 1)
    }
    console.log('Example render')
    return (
      <div>
        <MyComponent />
        <MyReduxComponent />
        <h1>Example</h1>
        <p>You clicked {count} times</p>
        <button onClick={handleClick}>
          Click me
        </button>
      </div>
    );
  };


  const root = ReactDOM.createRoot(document.getElementById("root"))
  root.render(<Example />);
</script>
```

