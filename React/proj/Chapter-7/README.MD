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
