# memo

`memo` 可以让你在组建的props 不变时跳过重新渲染组件。

```javascript
memo(Component, compare)
```

- 用途
    - 当props 不变时跳过重新渲染
    - 使用state更新记忆组件
    - 使用 context 更新记忆组件
    - 最小化 props 变化
    - 可以定义比较函数
- 注意
  - 当props 是引用类型时，memo 会比较引用地址，而不是引用值。

## 使用
```javascript
memo(Component, compare)
```
使用memo 包裹一个组件，从而得到改组件的缓存版本。当该缓存组件的父组件被重新渲染时，只要props没有发生改变，
该缓存组件通常不会被渲染。

## 参数
- Component：需要被缓存的组件。
- compare：比较函数，用于比较新旧props是否相等。默认是浅比较。React 中使用Object.is()进行比较。

## 作用
### 跳过重新渲染，当props 没有发生改变时。
当父组件重新渲染时，子组件通常都会被重新渲染。使用 `memo`, 可以让子组件在props 没有发生改变时，跳过重新渲染。

将一个组件 `memo` 化。只需要使用 memo 将其包裹，然后用它返回的值代替原来的组件。
```javascript
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
```

在下面这个例子中。使用React.memo 时：Greetings 组件在name被改变时会重新渲染，在address 被改变时不会重现渲染。
未使用React.memo 时：Greetings 组件在name和address 被改变时都会重新渲染。
```javascript
function MyApp() {
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    return (
      <>
        <label>
          Name{': '}
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Address{': '}
          <input value={address} onChange={e => setAddress(e.target.value)} />
        </label>
        <Greeting name={name} />
      </>
    );
  }

  const Greeting = React.memo(function Greeting({ name }) {
    console.log("Greeting重复渲染", new Date().toLocaleTimeString());
    return <h3>Hello{name && ', '}{name}!</h3>;
  });

  const root = ReactDOM.createRoot(document.getElementById("root"))
  root.render(
    <MyApp />
  )
```
## 最小化 props 变化
为了更好的利用memo,应该尽可能减少props 变化。例如：如果 props是一个对象，就可以使用useMemo来防止父组件每次重新创建该对象。
```javascript
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  const person = useMemo(
    () => ({ name, age }),
    [name, age]
  );

  return <Profile person={person} />;
}

const Profile = memo(function Profile({ person }) {
  // ...
});
```
一种更好的方式就是让组件接收更加精确的props,例如接收两个私有值，而不是一个对象。
```javascript
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  return <Profile name={name} age={age} />;
}

const Profile = memo(function Profile({ name, age }) {
  // ...
});
```

## memo源码分析

总体执行逻辑：
- 初始渲染 
  - beginWork。（这个时候还是 MemoComponent）
  - updateMemoComponent。标记 `workInProgress.tag = SimpleMemoComponent`;
  - updateSimpleMemoComponent
  - updateFunctionComponent
- 执行更新
  - beginWork。（已经被标记为了 SimpleMemoComponent）
  - updateSimpleMemoComponent。执行浅比较（props,ref，type）,如果都相等只需要执行赋值。不进入
  - updateFunctionComponent（浅比较结果为false,就会进入这里）

###  updateFunctionComponent
- 执行 renderWithHooks，执行函数组件的逻辑，传入了nextProps和context，生成child（ReactElement）。
- 执行 reconcileChildren，生成childFiber。

```javascript

  function memo(type, compare) {
    {
      if (!isValidElementType(type)) {
        error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
      }
    }

    var elementType = {
      $$typeof: REACT_MEMO_TYPE,
      type: type,
      compare: compare === undefined ? null : compare
    };

    {
      var ownName;
      Object.defineProperty(elementType, 'displayName', {
        enumerable: false,
        configurable: true,
        get: function () {
          return ownName;
        },
        set: function (name) {
          ownName = name; // The inner component shouldn't inherit this display name in most cases,
          // because the component may be used elsewhere.
          // But it's nice for anonymous functions to inherit the name,
          // so that our component-stack generation logic will display their frames.
          // An anonymous function generally suggests a pattern like:
          //   React.memo((props) => {...});
          // This kind of inner function is not used elsewhere so the side effect is okay.

          if (!type.name && !type.displayName) {
            type.displayName = name;
          }
        }
      });
    }

    return elementType;
  }
```
创建了一个 `REACT_MEMO_TYPE`类型的元素。


- 为了找出处理重复渲染的逻辑，找到关键的入口处 `renderRootSync`，`workLoopSync`，`updateSimpleMemoComponent`，

- 进行浅比较.因为并没有递归的对每一个属性值进行比较。
```javascript

/**
 * 执行浅比较
 * 如果值相等返回true （认为相等）
 * objA 不是 对象或者是null，或者objB 不是对象或者是null，返回false（认为不相等）
 * 如果objA 和 objB 的key的数量不相等，返回false（认为不相等）
 * 遍历objA 的key，如果objB 不包含该key，或者objA 和 objB 的key对应的值不相等，返回false（认为不相等）
 * 其他情况返回true（认为相等）
 * **/
  function shallowEqual(objA, objB) {
    if (objectIs(objA, objB)) {
      return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    } // Test for A's keys different from B.


    for (var i = 0; i < keysA.length; i++) {
      var currentKey = keysA[i];

      if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey])) {
        return false;
      }
    }

    return true;
  }


/**
 * 浅比较存在的问题
 * 以下 a和b实际来看，最终的渲染结果应该是相同的，但是浅比较会认为不相等。这个时候就会造成页面重新刷新。
 * */
var a = {
  "name": {
    "v": "1"
  }
}
var b = {
  "name": {
    "v": "1"
  }
}
shallowEqual(a,b) // false
```

## 总结
React.memo 通过 创建一个 REACT_MEMO_TYPE 类型的元素，
- performUnitOfWork
- beginWork$1
- reconcileChildren
- createChild
- createFiberFromElement
- createFiberFromTypeAndProps


REACT_MEMO_TYPE 元素 通过上述步骤的调用，创建了 tag为 MemoComponent 的fiber.  此后即可执行 MemoComponent相关的初始逻辑和更新逻辑。

在执行 updateFunctionComponent 的逻辑中，通过对属性（props,ref,type）的浅比较,从而避免了函数组件重新执行，避免创建新的ReactElement和fiber.
也就避免了重新生成DOM，更新DOM的过程。

纯渲染组件，建议使用React.memo包裹，可以避免不必要的重新渲染。


## 遗留问题
- 💬 performUnitOfWork 中的 workInProgress 在一开始是如何创建的呢？
    - workLoop 中。从 taskQueue 中获取 task.
    - task 中的回调进入 performConcurrentWorkOnRoot
    - 进入 prepareFreshStack
    - createWorkInProgress。传入💬root.current,创建完成最初的fiber
    - 进入 workLoopSync，进入 performUnitOfWork

- 关于root
  - root.current 最开始是一个 uninitializedFiber，uninitializedFiber.stateNode指向了root.
  - 调用root的render方法，传入要渲染的ReactElement:MyApp。
  - MyApp 放在 update.payload.element 中。
  - 处理 uninitializedFiber 和 update。
  - 处理 uninitializedFiber.updateQueue.shared.interleaved 赋值了 update
  - 最终root.current就和MyApp 进行了关联
  - scheduleCallback$1调用。创建 performConcurrentWorkOnRoot传入了root的回调函数。
  - 创建一个包含该回调函数的task,放入taskQueue中。
  - 通过postMessage调用 performWorkUntilDeadline
  - 进入 workLoop,获取任务队列中的任务，并调用任务的回调（performConcurrentWorkOnRoot）。
  - 进入 renderRootSync，进入 prepareFreshStack。
  - 进入 workLoopSync
  - updateHostRoot
  - element 进入了 newBaseState，并赋值给了 queue.baseState.(workInProgress.updateQueue.baseState)
  - 开始reconcileChildren(传入了 workInProgress,ReactElement)
  - 创建MyApp的fiber
  - 调用 renderWithHooks，继续生成ReactElement.
  - 再次进入 reconcileChildren，生成childFiber
  - 以此循环的生成 fiber 链表
  - [x] 💬fiber 链表生成后，Dom 的生成时机在什么时候
    - 关键入口处 `reconcileChildren`
    - 从父到子创建fiber，beginWork是生成fiber 链表
    - 进入 completeUnitOfWork,从子到父生成DOM。并appendChild到父节点上。
  - [x] 💬fiber 链表生成后，Dom 生成并且父子关系的时机在什么时候
  - commitRoot，获取 finishedWork
  - commitBeforeMutationEffects ，传入 finishedWork
  - commitMutationEffects，传入 finishedWork
  - commitMutationEffectsOnFiber（将fiber 上的DOM渲染刀页面上）
- [x] 💬React中的ReactElement、fiber、Dom之间的关系？
  - 通过逐个调用ReactElement生成Fiber链表，通过深度fiber链表生成完成之后再生成Dom 树（深度优先遍历的方式）。
