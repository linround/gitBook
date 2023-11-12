# render 的过程

## 首次render

# performUnitOfWork

这个函数从父到子构建fiber

```javascript

  // 构建fiber对象
  function performUnitOfWork(unitOfWork) {
    // The current, flushed, state of this fiber is the alternate. Ideally
    // nothing should rely on this, but relying on it here means that we don't
    // need an additional field on the work in progress.

    //   unitOfWork => workInProgress fiber 树中的 rootFiber
    //   current => currentFiber树中的 rootFiber
    var current = unitOfWork.alternate;
debugger
    // 将 unitOfWork 赋值给全局的 current
    setCurrentFiber(unitOfWork);
    var next;

    if ( (unitOfWork.mode & ProfileMode) !== NoMode) {
      startProfilerTimer(unitOfWork);
      next = beginWork$1(current, unitOfWork, subtreeRenderLanes);
      stopProfilerTimerIfRunningAndRecordDelta(unitOfWork, true);
    } else {
        /**
         * beginWork$1:从父到子，构建fiber 节点对象
         * 返回的next 为当前节点的子节点
         * **/
      //  beginWork$1 由父到子进行fiber树构建
      next = beginWork$1(current, unitOfWork, subtreeRenderLanes);
    }
      // 清除给全局的 current
    resetCurrentFiber();
    unitOfWork.memoizedProps = unitOfWork.pendingProps;

    if (next === null) {
      // If this doesn't spawn new work, complete the current work.
        // 这里从子到父 构建其余节点 fiber对象

      completeUnitOfWork(unitOfWork);
    } else {
      //   对于next 不为null 的情况
        // workLoopSync 会继续执行
      workInProgress = next;
    }

    ReactCurrentOwner$2.current = null;
  }
```


1. 创建了root
2. 创建 ReactElement ;这是 要渲染的组件
3. 调用 root.render  传入 要渲染的 ReactElement
4. updateContainer 调用。此处传入了 root 对象上的 fiberRootNode,以及要渲染的组件（作为子元素）
5. 
