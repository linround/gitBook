# 面试的知识点补充
这里是记录面试的准备过程
## web
- [x] [Page_Visibility_API](./web/api/Page_Visibility_API)
- [x] [onload-ondomcontentloaded](https://javascript.info/onload-ondomcontentloaded)
- [ ] 离线缓存技术
- [x] [b strong i em](./web/b-strong-i-em)


performUnitOfWork
```javascript

function performUnitOfWork(unitOfWork) {
    var current = unitOfWork.alternate;
    var next;

    if (condition) {
        next = beginWork$1(current, unitOfWork, subtreeRenderLanes);
     } else {
        next = beginWork$1(current, unitOfWork, subtreeRenderLanes);
    }
    if (next === null) {
        completeUnitOfWork(unitOfWork);
    } else {
        workInProgress = next;
    }
}               
```
