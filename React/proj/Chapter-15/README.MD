# useDeferredValue 

useDeferredValue 允许延迟更新一部分UI。

## 作用
- 在加载状态中显示旧的内容。
- 表明内容已经过时。
- 延迟部分 UI 的重新渲染。

## 注意点
- 在一个过渡的更新中，useDeferredValue 总是会返回一个新的值；不会产生延迟渲染，因为更新已经被延迟了。
- 传递给 useDeferredValue的值应该是原始的数据类型(string 或 number),也可以是渲染函数外部的对象。如果在渲染时创建一个对象，并且立刻传递给 useDeferredValue，这个对象在每次渲染时，都会被认为是新的值
