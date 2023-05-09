# SVG

### SVG 三阶贝塞尔曲线`C`命令中`S`的使用

```svg
 <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    {/*SVG中平滑连接两个贝塞尔曲线

        如果S前面有C或S,则第一个控制点会被假设为前一个命令曲线的第二个控制点的中心对称点，（以签一个结束点为起始点，同时做中心对称，

        求得第二个命令的第一个控制点）
    */}
    <path d="M 10 100 C 50 10, 150 10, 200 100 S 350 190 400 100" strokeWidth={5} stroke="yellow" fill="transparent"/>
    <circle cx={10} cy={100} r={10} fill={'blue'}  />
    <circle cx={50} cy={10} r={10} fill={'blue'}  />
    <circle cx={150} cy={10} r={10} fill={'blue'}  />
    <circle cx={200} cy={100} r={10} fill={'blue'}  />
    
    
    <circle cx={250} cy={190} r={10} fill={'blue'}  />
    <circle cx={350} cy={190} r={10} fill={'blue'}  />
    <circle cx={400} cy={100} r={10} fill={'blue'}  />
</svg>
```


### 二阶贝塞尔曲线Q命令
```svg

<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    {/*使用Q来给定一个控制点，
            用来确定起点和终点的曲线斜率
    
            观察以下的结果可以得知，就算是得知了初始的曲线斜率，相比知道初始的控制点，还是会发生不一致的问题;
            因为Q创建的是二次贝塞尔曲线啊
            */}
    
    <path d="M 20 150 Q 50 50, 80 150" strokeWidth={5} stroke="black" fill="transparent"/>
    <path d="M 20 150 C 35 100, 65 100, 80 150" strokeWidth={5} stroke="red" fill="transparent"/>
    <circle cx={20} cy={150} r={10} fill={'blue'}  />
    <circle cx={35} cy={100} r={10} fill={'blue'}  />
    <circle cx={65} cy={100} r={10} fill={'blue'}  />
    <circle cx={80} cy={150} r={10} fill={'blue'}  />
    
    <circle cx={50} cy={50} r={10} fill={'blue'}  />
</svg>
```

### 二阶贝塞尔曲线Q命令结合T命令，延长二阶贝塞尔曲线

```svg
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    {/*在Q命令后使用T命令来延长二阶贝塞尔曲线
    第一种：接T命令以上一个贝塞尔的控制顶以结束点的中心对称点为第二个贝塞尔的控制点，第二个贝塞尔的起始点就是上一个的结束点
    第二种：在画完第一个贝塞尔曲线之后，继续画第二个；默认使用第一个个的结尾作为开始
    第三种：是第二种的变体
    第四种：以上的具体实现
    */}


    {/*<path d="M 10 100 Q 50 10, 80 100 T 150 100" strokeWidth={5} stroke="black" fill="transparent"/>*/}
    {/*<path d="M 10 100 Q 50 10, 80 100 Q 110 190 150 100" strokeWidth={5} stroke="black" fill="transparent"/>*/}
    {/*<path d="M 10 100 Q 50 10, 80 100 M 80 100 Q 110 190 150 100" strokeWidth={5} stroke="black" fill="transparent"/>*/}
    <path d="M 10 100 Q 50 10, 80 100" strokeWidth={5} stroke="black" fill="transparent"/>
    <path d="M 80 100 Q 110 190, 150 100" strokeWidth={5} stroke="black" fill="transparent"/>
    <circle cx={10} cy={100} r={10} fill={'blue'}  />
    <circle cx={50} cy={10} r={10} fill={'blue'}  />
    <circle cx={80} cy={100} r={10} fill={'blue'}  />


    <circle cx={150} cy={100} r={10} fill={'blue'}  />
    <circle cx={110} cy={190} r={10} fill={'blue'}  />
</svg>


```


### 关于弧的截取相关
```svg
<svg width="325" height="325" xmlns="http://www.w3.org/2000/svg">

    {/*
    // rx ry 长短轴
    // 沿着X方向旋转的角度
    // large-arc-flag 0小角弧度 1大角弧度 ;
    // sweep-flag 0 起点到终点逆时针画 1起点到终点顺时针画
    // 终点
    //
    */}
    {/*
    起始点 0 50 ；终点 50 0；
    半径都是50
    1表示取大角
    0表示起点到终点逆时针（一个是形成大弧的逆时针，一个是形成小弧的逆时针）

    */}
    <path d="M 0 50
           A 50 50, 0, 1, 0, 50 0
           " fill="green"/>
    <path d="M 230 80
           A 45 45, 0, 1, 0, 275 125
           L 275 80 Z" fill="red"/>
    <path d="M 80 230
           A 45 45, 0, 0, 1, 125 275
           L 125 230 Z" fill="purple"/>
    <path d="M 230 230
           A 45 45, 0, 1, 1, 275 275
           L 275 230 Z" fill="blue"/>
</svg>
```
