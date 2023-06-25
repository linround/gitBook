# shader
 
## gpu
- 并行处理像素运算
- 特殊函数通过硬件加速；非常复杂得数学操作可以被微芯片解决
  - gpu硬件的加速支持我们使用`角度`，`三角函数`和`指数函数`
  - pow(x1,x2) 求第一个参数的第二个参数次方根
  - exp(x) 返回参数的自然幂（e的x次方）
  - log(x) 返回参数的自然对数
  - sqrt(x) 返回参数的平方根
  - abs(x) 返回参数的绝对值
  - sign(x) 返回参数的符号
  - floor(x) 返回小于或者等于参数的最接近的整数
  - ceil(x) 返回大于或等于参数最近的整数
  - fract(x) 返回参数的小数部分
  - mod(x1,x2) 计算一个参数对另一个参数取模的值
  - clamp(x,x1,x2) 将一个值限制在两个值之间
  - [smoothStep(edg0,deg1,x)](https://thebookofshaders.com/glossary/?search=smoothstep) 计算一个与x有关的平滑差值
  - step(edg,x) 大于阈值1，小于阈值0
  - mix(x,y,a)  权重线性插值 x*(1-a)+y*a 即x+a(y-x)
  - length(x) 返回向量x的长度
  - distance(p1,p2) 返回两个点之间的距离 同length含义一致。都是求长度的方法
  - dot(x,y) 计算两个向量的点积
  - cross(x,y) 计算两个向量的叉积
  - normalize(x) 计算向量的单位向量
- colors
## 图形绘制思路
- 矩形

## 并行管道
- 相互之间进行的运算是盲视的，无记忆的；即不允许数据在管道间流动，也无法知道前一刻管道在做什么；