## react 源码解读
在本篇react的解读中，尽量详尽的了解react的运行过程以及数据管理，不涉及reactRouter相关的知识点；
参考课程：https://www.bilibili.com/video/BV13j411D7K6?p=2&vd_source=2fbc276c906dcfb63eeb8b5cf37bd9ff

- [搭建react源代码](./proj/Chapter-0/README.MD)
- [react,reactDOM之间是什么样的关系?](./proj/Chapter-1/README.MD)
- [React.createElement函数的作用](./proj/Chapter-3/README.MD)
- [双缓存技术](./proj/Chapter-4/README.MD)
- [enqueueUpdate 的解读](./proj/Chapter-5/README.MD)

# 扩展

- [ ]  Object.seal() 和 Object.freeze() ，Object.preventExtensions() 

- [ ]  ReactElement 与 ReactCurrentOwner的关系 

- [ ]  https://developer.mozilla.org/zh-CN/docs/Web/API/Background_Tasks_API
- [ ] [queueMicrotask](https://developer.mozilla.org/zh-CN/docs/Web/API/queueMicrotask)
queue中的函数会在 Promise之后运行
![](./img/img.png)