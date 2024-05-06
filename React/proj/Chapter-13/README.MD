# useRef


## 关于hooks链表
 在初始阶段，只要调用了 mountWorkInProgressHook 就会形成链表。

调用 mountWorkInProgressHook 的钩子函数包括 mountMemo、mountCallback、
mountRef、mountState、useEffect、useLayoutEffect。因此以上的函数都会形成在一个链表上。
该链表保存在 memoizedState 属性上。
