# SVG

### SVG 三阶贝塞尔曲线C命令中S的使用

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