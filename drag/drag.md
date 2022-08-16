# drag 事件

## 在source元素上拖动后，又放置在source元素上的执行情况
+ dataTransfer.getData， 只在source元素上ondrop中执行 可获取数据

|                      | source元素          | target元素 |
|----------------------|-------------------|----------|
| onDragStart          | 执行                | 不执行      |
| onDragEnd            | 执行                | 不执行      |
| onDragOver           | 执行                | 不执行      |
| onDrop               | 执行                | 不执行      |
| onDragEnter          | 执行                | 不执行      |
| onDragLeave          | 执行                | 不执行      |
| onDrag               | 执行                | 不执行      |


## 将source元素拖入到目标元素的执行情况
+ dataTransfer.getData， 只在target元素上ondrop中执行 可获取数据

|                      | source元素 | target元素 |
|----------------------|----------|----------|
| onDragStart          | 执行       | 不执行      |
| onDragEnd            | 执行       | 不执行      |
| onDragOver           | 执行       | 执行       |
| onDrop               | 不执行      | 执行       |
| onDragEnter          | 执行       | 执行       |
| onDragLeave          | 执行       | 执行       |
| onDrag               | 执行       | 不執行      |
| dataTransfer.getData | 不执行      | 執行 可获取数据 |


# 总结
1. [x] dataTransfer.getData只能在drop事件中进行数据获取
2. [x] onDragStart只在源元素上发生执行一次
3. [x] onDragEnd只在鼠标松开后执行一次
4. [x] onDragOver 只要有拖拽的元素进行拖动的动作就会在当前所在的元素上执行（一百毫秒一次，可能是source上执行，也可能是target上执行）
5. [x] ondrop只有在放置目标上执行
6. [x] onDragEnter，onDragLeave 只要有被拖拽的元素进入或离开一次就会执行一次
7. [x] onDrag 只要有拖动的元素会一直执行，但是一直之和source有关

## 问题
9. [x] 在元素上使用onDrop时，需要阻止元素的默认事件；因此可以使用ondragover来阻止默认事件冒泡的调用；这个时候才会正常的执行onDrop事件
10. [x] 在父元素上设置拖拽操作时，当内部有多个子元素时，会频繁触发dragenter和dragleave事件；这个时候借助point-event可以正常解决该问题；另外也可能需要依靠防抖來處理一些便邊緣的接觸的問題
11. [x] 当drag作用在图片上时，在安卓中可能会触发保存图片的默认事件，从而阻止了拖动的实现；