# 日历组件

## 日视图组件
+ 如何在点击页面时取得该点坐标的时间值?
> 1. 添加鼠标的点击事件
> 2. 获取鼠标的clientY值（即相对于浏览器除了tabs栏的视口的未知）
> 3. 获取时间列表容器相对于视口的`top`位置，使用元素的 [getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) API即可获取元素相对于视口的未知
> 4. 利用`clientY 减 top`即可获得

![img.png](img/img.png)

+ 手动添加事件时，如何将距离值转换为时间？时间值的边界问题如何处理的？
> 1. 手动添加事件，这个时候获取的是坐标值
> 2. 将坐标值处理为时间，（精确度为分钟）
> 3. 手动添加时间时，需要将边界处理为15分钟的时间格子边界
> 4. 对于开始时间，将余数减掉即可得到上边界
> 5. 对于结束时间，计算与时间格子的差值，再用原有时间加上格子差值；即可得到时间的上边界值；
```javascript

roundTime (time, down = true) {
  const roundTo = 15
  // 以15分钟为单元格子
  const roundDownTime = roundTo * 60 * 1000
  // 对于开始时间取得上边界的方式就是减去余数
  // 对于取下边界 加上一个格子相差的即可
  return down
    ? time - time % roundDownTime
    : time + (roundDownTime - (time % roundDownTime))
}


mouseMove (tms) {
  // 将日期转换为时间戳，精确到分钟
  const mouse = this.toTime(tms)
  console.log('mouseMove')
  if (this.dragEvent && this.dragTime !== null) {
    const start = this.dragEvent.start
    const end = this.dragEvent.end
    const duration = end - start
    const newStartTime = mouse - this.dragTime
    const newStart = this.roundTime(newStartTime)
    const newEnd = newStart + duration

    this.dragEvent.start = newStart
    this.dragEvent.end = newEnd
  } else if (this.createEvent && this.createStart !== null) {
    // 得到结束时的边界时间
    const mouseRounded = this.roundTime(mouse, false)
    // 比较结束时的边界时间和开始时的时间大小
    const min = Math.min(mouseRounded, this.createStart)
    const max = Math.max(mouseRounded, this.createStart)
    // 重新设置新的时间范围
    this.createEvent.start = min
    this.createEvent.end = max
  }
}



startTime (tms) {
  // 将日期转换为时间戳，精确到分钟
  const mouse = this.toTime(tms)
  if (this.dragEvent && this.dragTime === null) {
    const start = this.dragEvent.start
    this.dragTime = mouse - start
  } else {
    // 获取开始的边界时间
    this.createStart = this.roundTime(mouse)
    this.createEvent = {
      name: `Event #${this.events.length}`,
      color: 'black',
      start: this.createStart,
      end: this.createStart,
      timed: true,
    }
    this.events.push(this.createEvent)
  }
}
```


+ 如何将已有事件转换为坐标？ 如何处理已有事件的坐标边界问题？
  + 不需要处理边界问题；
  + 计算bottom和top即可，按实际值计算和显示；
  + 边界问题由源头进行处理；在推拽时，已经处理了边界问题；

```javascript
{
    "event": {},
    "columnCount": 0,
    "column": 0,
    "left": 0,
    "width": 100
}
```

在vuetify的日历中，并没有对边界进行处理，日期是多少就会显示多少的位置。对于时间格子的控制，可以从源头来进行，也就是在创建日期时，处理拖动时的边界问题；


+ 关于$scopedSlots和$slots的区别
> $scopedSlots；  
> 1. 在template中，组件内部自定义插槽。编译后会可以在组件的`$scopedSlots`中访问该插槽
![img.png](img/img2.png)

> 2. 在自定义render函数的组件中，在上级组件的render函数中，渲染对应的AComponent时，在该AComponent中定义scopedSlots属性，即可在该AComponent的render函数中通过$scopedSlots访问上级定义的scopedSlots属性
![img.png](img/img3.png)

> 3. slot通常在模板语法中较为常用，在自定义render函数的语法中只能使用scopedSlots
具体原因就是$slot的来源只能从`_renderChildren`
>![img.png](img/img4.png)

> 4. 从下图来看`_renderChildren`来源：     
![img.png](img/img5.png)


## 周视图组件的一些问题
> 日期视图采用的是flex布局；head和body中的每一列都是flex子元素；


+ 每一列中的`日历事件`是如何计算宽高？
  + 宽度由分组计算而得到
    + 根据事件的开始日期和结束的日期，从而过滤出当天的具体事件;有些类似求交集的方式；
    ```typescript  
    export function isEventOn (event: CalendarEventParsed, dayIdentifier: number): boolean {
      return dayIdentifier >= event.startIdentifier && dayIdentifier <= event.endIdentifier 
    }
    ```
  + 高度有原始的top和bottom进行计算


## 月视图中
+ mouse时间如何获取的单元格
  + 由于在渲染每个单元格时，已经拿到了对应的day的日期数据。所以直接传回即可
+ 当拖拽某个日历时间时，此时鼠标移动到另一个时间很长的A日历事件上，会触发A的mousemove事件，这个时候由于冒泡的原因，会导致事件的时间问题；
+ 当点击某个日历事件时，会冒泡到日历起始的那个日期的事件，而不会触发此时点击所在日期的事件
# refInFor
> 当ref和v-for一起用时，使用$refs访问的对象是一个数组；默认`refInFor`是`true`
```vue
<div ref="test" v-for="i in 5" :key="i">{{i}}</div>
```


