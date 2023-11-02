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
```javascript
var root = createContainer(
      container,// 根节点
      ConcurrentRoot,// 两种应用启动模式： legacy 模式；Concurrent（默认1） 并发模式
      null,
      isStrictMode,// 是否开启严格模式 默认false
      concurrentUpdatesByDefaultOverride,//  通过默认覆盖并发更新 默认false
      identifierPrefix, //默认空字符串 ，React 为 React 生成的 id 使用的可选前缀。 useId . 当在同一页面使用多个根时，可用于避免冲突。必须与服务器上使用的前缀相同
      onRecoverableError// 默认console.error 函数
);
```
### createFiberRoot
相比 createContainer，多了两个参数 hydrate (false)、initialChildren (null);

```javascript
 createFiberRoot(
      containerInfo,
      tag,
      hydrate, // 默认 false
      initialChildren,// 默认null 
      hydrationCallbacks,
      isStrictMode,
      concurrentUpdatesByDefaultOverride,
      identifierPrefix,
      onRecoverableError,
        transitionCallbacks // 这个参数在react 18 版本中无用
    );
```

### new FiberRootNode
得到一个 fiberRoot 节点
```javascript

  function FiberRootNode(

      containerInfo,// 根节点
      tag,// 两种应用启动模式： legacy 模式；Concurrent 模式
      hydrate,// 是否是服务端渲染
      identifierPrefix,// 默认空字符串
      onRecoverableError // 默认console.error 函数
  ) {
    this.tag = tag; // 两种应用启动模式： legacy 模式；Concurrent 模式
    this.containerInfo = containerInfo; // 根容器节点元素
    this.pendingChildren = null;
    this.current = null;
    this.pingCache = null;
    this.finishedWork = null;
    this.timeoutHandle = noTimeout;// 默认-1
    this.context = null;
    this.pendingContext = null;
    this.callbackNode = null;
    this.callbackPriority = NoLane; // 默认0
    this.eventTimes = createLaneMap(NoLanes);// 创建一个数组
    this.expirationTimes = createLaneMap(NoTimestamp); // NoTimestamp 默认-1
    this.pendingLanes = NoLanes;// 进行中的车道
    this.suspendedLanes = NoLanes;// 暂停车道
    this.pingedLanes = NoLanes;// 被探测的车道
    this.expiredLanes = NoLanes;// 过期的车道
    this.mutableReadLanes = NoLanes;// 可变读取通道
    this.finishedLanes = NoLanes;
    this.entangledLanes = NoLanes;// 纠缠车道
    this.entanglements = createLaneMap(NoLanes); // 纠缠
    // React 为 React 生成的 id 使用的可选前缀。
    // useId . 当在同一页面使用多个根时，可用于避免冲突。必须与服务器上使用的前缀相同
    this.identifierPrefix = identifierPrefix;

    this.onRecoverableError = onRecoverableError;

    {
      this.mutableSourceEagerHydrationData = null;
    }

    {
      this.effectDuration = 0;
      this.passiveEffectDuration = 0;
    }

    {
      this.memoizedUpdaters = new Set(); // 记忆更新器
      // 设置 this.pendingUpdatersLaneMap 为一个数组
      // 获取该引用值
      var pendingUpdatersLaneMap = this.pendingUpdatersLaneMap = [];

      // TotalLanes 默认31
      for (var _i = 0; _i < TotalLanes; _i++) {
        // 初始化 pendingUpdatersLaneMap
        pendingUpdatersLaneMap.push(new Set());
      }
    }

    {
      //   这里的tag 默认是 ConcurrentRoot 模式
      switch (tag) {
        case ConcurrentRoot:
          //   hydrate 是false
          this._debugRootType = hydrate ? 'hydrateRoot()' : 'createRoot()';
          break;

        case LegacyRoot:
          this._debugRootType = hydrate ? 'hydrate()' : 'render()';
          break;
      }
    }
  }
```
### createHostRootFiber
#### createFiber
#### new FiberNode
```javascript

  function FiberNode(
      tag,// 3  宿主树的根。可以嵌套在另一个节点内
      pendingProps, // null
      key,// null
      mode // ConcurrentMode
  ) {
    // Instanc
      // 标记不同的组件类型
    this.tag = tag;
    //
    this.key = key;
    this.elementType = null;
    // 组件类型 div span 函数组件

    this.type = null;
    // 实例对象 如若组件的实例 原生DOM实例 function组件没有实例
    //   如果是类组件 stateNode就是类组件的实例对象
      // 如果是函数组件 就是null 函数组件没有实例
    this.stateNode = null; // Fiber


      /*构建fiber树相关*/

      // 指向自己的父级对象
    this.return = null;
    // 指向自己的第一个f子级fiber
    this.child = null;
    // 指向自己的下一个兄弟fiber对象
    this.sibling = null;

    this.index = 0;
    this.ref = null;
    // 即将跟新的props
    this.pendingProps = pendingProps;
    // 旧的props
    this.memoizedProps = null;

      // 旧的state
      this.memoizedState = null;





    // 该fiber对应的组件产生的状态更新会存放在这个队列中
      // 例如setState调用后，会将该组件放在更新队列中
    this.updateQueue = null;
    this.dependencies = null;
    // 记录当前组件及其子组件处于何种渲染模式
    this.mode = mode; // ConcurrentMode

    this.flags = NoFlags; // 0
    this.subtreeFlags = NoFlags;// 0
    this.deletions = null;
    this.lanes = NoLanes;// 0
    this.childLanes = NoLanes;// 0
    // 在fiber树更新的过程中 每个fiber都有一个跟其对应的fiber
      // 称为 current 《==》workinprogress
    //   在渲染完成之后他们会交换位置
    //   alternate指向 当前fiber在 workinprogress 树中的对应的fiber
    this.alternate = null;

    {
      // Note: The following is done to avoid a v8 performance cliff.
      //
      // Initializing the fields below to smis and later updating them with
      // double values will cause Fibers to end up having separate shapes.
      // This behavior/bug has something to do with Object.preventExtension().
      // Fortunately this only impacts DEV builds.
      // Unfortunately it makes React unusably slow for some applications.
      // To work around this, initialize the fields below with doubles.
      //
      // Learn more about this here:
      // https://github.com/facebook/react/issues/14365
      // https://bugs.chromium.org/p/v8/issues/detail?id=8538
      this.actualDuration = Number.NaN;
      this.actualStartTime = Number.NaN;
      this.selfBaseDuration = Number.NaN;
      this.treeBaseDuration = Number.NaN; // It's okay to replace the initial doubles with smis after initialization.
      // This won't trigger the performance cliff mentioned above,
      // and it simplifies other profiler code (including DevTools).

      this.actualDuration = 0;
      this.actualStartTime = -1;
      this.selfBaseDuration = 0;
      this.treeBaseDuration = 0;
    }

    {
      // This isn't directly used but is handy for debugging internals:
      this._debugSource = null;
      this._debugOwner = null;
      this._debugNeedsRemount = false;
      this._debugHookTypes = null;

      if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
        Object.preventExtensions(this);
      }
    }
  }
```
#### fiberRoot 和 rootFiber
- 使用 new FiberRootNode 得到的是  fiberRoot (root)
- 使用 createHostRootFiber 得到的是 rootFiber (uninitializedFiber)
- root.current 指向 uninitializedFiber
- uninitializedFiber.stateNode 指向 root
#### 初始化 rootFiber (uninitializedFiber) 的 memoizedState 属性
```javascript
{
      var _initialState = {
        element: initialChildren,
        isDehydrated: hydrate,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      // 为rootFiber 添加一些初始属性
      uninitializedFiber.memoizedState = _initialState;
    }
```
### initializeUpdateQueue
初始化了 rootFiber (uninitializedFiber) 的 updateQueue 属性
```javascript
function initializeUpdateQueue(fiber) {
    var queue = {
      //   上以此更新之后的state,作为下一次更新的基础
      baseState: fiber.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: NoLanes // 0
      },
      effects: null
    };
    // 初始化 fiber 的 updateQueue
    fiber.updateQueue = queue;
  }
```
### markContainerAsRoot
- 传入两个参数 rootFiber 和 container 真实DOM节点
= 对该容器节点 作标记

```javascript
// internalContainerInstanceKey = '__reactContainer$' + randomKey;
function markContainerAsRoot(hostRoot, node) {
    node[internalContainerInstanceKey] = hostRoot;
  }
```

### listenToAllSupportedEvents
- 给 container 真实DOM节点 添加 属性 _reactListeningvj3cir8a39，值为true


### new ReactDOMRoot
- 返回一个对象，该对象的属性 _internalRoot 指向 fiberRoot

```javascript
function ReactDOMRoot(internalRoot) {

    this._internalRoot = internalRoot;
  }
```
### 描述  fiberRoot 和 rootFiber 部分属性的关系
![](./img/img_4.png)


### React.createElement
