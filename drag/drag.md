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
+ dataTransfer.getData只能在drop事件中进行数据获取
+ onDragStart只在源元素上发生执行一次
+ onDragEnd只在鼠标松开后执行一次
+ onDragOver 只要有拖拽的元素进行拖动的动作就会在当前所在的元素上执行（一百毫秒一次，可能是source上执行，也可能是target上执行）
+ ondrop只有在放置目标上执行
+ onDragEnter，onDragLeave 只要有被拖拽的元素进入或离开一次就会执行一次
+ onDrag 只要有拖动的元素会一直执行，但是一直之和source有关