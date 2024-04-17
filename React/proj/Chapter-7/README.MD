# useMemo
`useMemo`是一个React 钩子，可以在重复渲染时缓存计算结果。
```javascript
const cachedValue = useMemo(calculateValue, dependencies)
```
- 使用
  - useMemo(calculateValue, dependencies)
- 用途
  - 跳过复杂的重复计算
  - 跳过组件的重新渲染
## 使用
`useMemo(calculateValue, dependencies)`

在组建中调用useMemo，传入一个函数和一个依赖项数组。
```javascript
import { useMemo } from 'react';

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // ...
}
```
## 参数
- calculateValue
  - 这是函数计算得到的缓存值。函数是一个纯函数，没有参数，返回一个类型是any的值。
- dependencies
  - 依赖项必须具有恒定的项数，React 使用 Object.is将每个依赖项与之前的值进行对比。
- 返回值
  - 在初始渲染时，useMemo返回 calculateValue()的结果。
  - 在重复渲染时，他将返回上次渲染已经存储的值；如果依赖发生变化，就会重新执行计算函数，并再次返回值。

## 说明
- useMemo 是一个钩子，可以在自定义钩子或者函数组件的顶部调用。不能再内部循环或者条件语句中调用，如果需要这么做，可以提取一个新的组件并将状态放在新的组件中。
- 在严格模式下，React 会调用两次计算函数。

## 作用
### 跳过复杂的重复计算
在重复渲染时，useMemo可以缓存计算结果，避免重复计算。
```javascript
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```
在初始渲染时，在调用useMemo时会执行这个计算函数，并获取计算函数的返回值。
在随后的渲染时，React 会比较 上次渲染时传入的依赖，如果以来没有发生变化，useMemo 会返回之前已经计算的结果；反之，会重新执行计算函数，并返回值。

**示例：**

默认情况下，React 在每次重复渲染时将会运行整个组件。例如，`TodoList`更新他的状态或者收到一个新的props从父组件，`filterTodos`
就会重新执行。
```javascript
function TodoList({ todos, tab, theme }) {
  const visibleTodos = filterTodos(todos, tab);
  // ...
}
```
通常情况下，这不是问题，但是如果`filterTodos`是一个复杂的函数，可能会导致性能问题。使用useMemo可以避免这个问题。


# 总结
建议使用useMemo 的案例：
- 计算函数有明显的性能问题，并且其依赖很少发生变化。
- 将useMemo 的计算结果，当作prop 传递给 使用 React.memo 包裹的组件。因为useMemo 会缓存计算的结果，结合memo 组件的对比过程。可以更有效的防止组件的重复渲染。
- 将useMemo 的计算结果，当作其他钩子的依赖，例如 useEffect 或者 useCallback。

## 缺点
- 代码可读性降低

## 源码分析
### React.useMemo 做了什么？
- 传入了create 函数和依赖项 deps 数组.在updateMemo 中，首先会传入nextCreate和新的deps，会获取之前的memoizedState，然后获取之前的
prvDeps,将新的deps 和 prevDeps 进行对比，

  如果相等，就返回之前的 prevState.

  如果不相等，就继续执行nextCreate,之后更新 memoizedState,并返回nextValue。

```javascript

  function updateMemo(nextCreate, deps) {
  // 关键点 updateWorkInProgressHook 获取的是什么？
    var hook = updateWorkInProgressHook();
    var nextDeps = deps === undefined ? null : deps;
    // memoizedState 是什么时候被赋值的？
    var prevState = hook.memoizedState;

    if (prevState !== null) {
      // Assume these are defined. If they're not, areHookInputsEqual will warn.
      if (nextDeps !== null) {
        var prevDeps = prevState[1];

        if (areHookInputsEqual(nextDeps, prevDeps)) {
          return prevState[0];
        }
      }
    }

    var nextValue = nextCreate();
    hook.memoizedState = [nextValue, nextDeps];
    return nextValue;
  }
```
- **updateWorkInProgressHook 获取的是什么？**
  - 渲染某个组件时，会 将该组件 赋值到一个全局变量 currentlyRenderingFiber$1。
然后执行该函数组件
  - 更新时执行 updateMemo 时，并从之前的fiber 中获取到之前的 memoizedState.
  - 对传入的依赖进行对比，如果依赖相等，就将之前的计算结果返回。如果依赖不相等，就重新执行计算函数，重新生成结果，并更新 memoizedState。
- **memoizedState 是什么时候被赋值的？**
  - 在mountMemo 中，当时渲染的fiber的memoizedState 会被赋值。
  - 在 updateMemo 中，当依赖发生变化时，会重新赋值。
- **再次回顾ReactElement,fiber,dom之间的关系**

  

  - enqueueConcurrentClassUpdate(fiber, sharedQueue, update, lane);
    - fiber, root上的 
    - sharedQueue, root 上的
    - update,包含着 更新的 ReactElement
    - 将 update于root.fiber 完成了关联。即ReactElement 与 root.fiber 完成了关联
  - 进入 scheduleUpdateOnFiber
  - root 传入 performConcurrentWorkOnRoot
  - prepareFreshStack
  - createWorkInProgress。传入根fiber,将 updateQueue赋值给了 workInProgress.
  - workLoopSync，performUnitOfWork。开始对workInProgress 进行处理。
  - ReactElement 被提升到了 baseState
  - reconcileChildren.从ReactElement 创建了fiber
  - 返回子集fiber.并赋值给了 workProgress.然后继续处理，不断的创建子集fiber。
  - fiber 从ReactElement创建，形成了链表结构。然后从内往外生成DOM结构。 
```javascript
  function Demo() {
    console.log('Demo render');
    const [data, setData] = React.useState(100);
    return /*#__PURE__*/React.createElement("div", {
      onClick: () => {
        debugger
        setData(1)
      }
    }, "改变",data);
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));

  const demoElement = React.createElement(Demo, null)
  root.render( /*#__PURE__*/ demoElement);
```
例如：root=>demoElement=>Demo=>divReactElement

首先 从ReactElement 创建fiber链表，然后由fiber链表生成DOM结构。最终挂载DOM即可。


- **更新时，对应 workInProgress 之前的状态是如何保存的呢？**
  - dispatchSetState 已经绑定了fiber（fiber链表形成时，各种状态已经绑定了fiber）.
  - 调用，setState 时，就可以访问之前的 fiber.进而进行精准的组件更新

  - 关于useMemo：因为组件更新时，fiber 会被放在全局上。
    - updateWorkInProgressHook 获取的是当前的fiber，然后获取之前的memoizedState。然后和新的 deps 进行对比。如果相等，就返回之前的状态。如果不相等，就重新计算。 
