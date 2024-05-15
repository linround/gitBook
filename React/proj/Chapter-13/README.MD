# useRef

- useRef 存储得大都是与界面渲染无关的信息
## 说明
- 可以改变 `ref.current` 属性。
- 当改变` ref.current`属性的值时，react 不会重新渲染该组件，因为 ref 是一个复杂的对象。
- 不要在初始渲染时读写 `ref.current`。这样会造成组件不可预测的行为。



## 关于hooks链表
 在初始阶段，只要调用了 mountWorkInProgressHook 就会形成链表。

调用 mountWorkInProgressHook 的钩子函数包括 mountMemo、mountCallback、
mountRef、mountState、useEffect、useLayoutEffect。因此以上的函数都会形成在一个链表上。
该链表保存在 memoizedState 属性上。

然而 createRef 的值，是不存在该链表上的。

### createRef 与 useRef 的区别
- 现象
  - useEffect 的依赖是 useRef 创建的 ref 对象，当组件更新时，useEffect 不会重新执行。
  - useEffect 的依赖是 createRef 创建的 ref 对象，当组件更新时，useEffect 会重新执行。
  - 初始的时候 createRef 不需要传入初值。因为传入的初值是不会用到的
- 原因
  - 在更新的时候，useRef 是从 链表上获取的旧的ref对象；而 createRef 每次都会重新执行创建一个新的 ref 对象。
  - 在 React 框架中 useRef 在初始化时调用的 mountRef 函数，在更新时调用的是 updateRef；
  - 在 React 框架中 createRef 在初始化和更新时都调用的同一个 createRef。因此不区分初始和更新的情况。
- 与 useEffect 和 useLayoutEffect 结合使用
  - 因为 useEffect 和 useLayoutEffect 都是在dom 形成之后执行的，所以在两者传入的回调中都可以访问 真实DOM
### forwardRef 的作用是什么？
forwardRef 是一个高阶函数，用于将 ref 属性转发给子组件。

### ref.current 赋值的时机是什么

- useEffect 是在形成 effect 链表。dom 挂载后就会调用 effect 链表中的回调函数


那么 ref.current 是在