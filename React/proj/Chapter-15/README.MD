# useDeferredValue 

useDeferredValue 允许延迟更新一部分UI。

## 作用
- 在加载状态中显示旧的内容。
- 表明内容已经过时。
- 延迟部分 UI 的重新渲染。

## 注意点
- 在一个过渡的更新中，useDeferredValue 总是会返回一个新的值；不会产生延迟渲染，因为更新已经被延迟了。
- 传递给 useDeferredValue的值应该是原始的数据类型(string 或 number),也可以是渲染函数外部的对象。如果在渲染时创建一个对象，并且立刻传递给 useDeferredValue，这个对象在每次渲染时都是不同的值，导致不必要的重复渲染。
- 如果用户输入速度快于接收其延迟值的重新渲染的速度，只会在用户停止输入后重新渲染。
- useDeferredValue 与Suspense集成，如果新值的后台更新暂停了用户界面，用户将看不到回退值。用户会看到 fallback 的值，直到数据加载完毕。
- useDeferredValue 自身不会阻止额外的网络请求。
