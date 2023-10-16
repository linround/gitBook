# react,reactDOM之间是什么样的关系？
- 引入 [react.development.js](./react.development.js)，react的相关属性如下：
![](./assets/img.png)
- 引入[react-dom.development.js](./react-dom.development.js),reactDOM的属性如下：
![](./assets/img_1.png)
- 引入 [redux.js](./redux.js),Redux的属性如下：
![](./assets/img_2.png)
## React.createRoot
-[x] container,挂载到页面的容器元素 
-[ ] options
  -[ ] unstable_strictMode
  -[ ] identifierPrefix
  -[ ] onRecoverableError
  -[ ] transitionCallbacks
```javascript
function createRoot$1(container, options) {
    {
      if (!Internals.usingClientEntryPoint && !true) {
        error('You are importing createRoot from "react-dom" which is not supported. ' + 'You should instead import it from "react-dom/client".');
      }
    }

    return createRoot(container, options);
  }
```
