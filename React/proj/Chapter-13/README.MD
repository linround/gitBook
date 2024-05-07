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
  - 是

### forwardRef 的作用是什么？
forwardRef 是一个高阶函数，用于将 ref 属性转发给子组件。
