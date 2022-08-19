# webgl 着色器和GLSL（图形库着色器语言）

## glsl
该语言是着色器使用的语言，主要目的是为栅格化图像提供常用的计算功能。它内建的数据类型
- vec2 代表两个值
- vec3 代表三个值
- vec4 代表四个值
- mat2 代表2x2矩阵
- mat3 代表3x3矩阵
- mat4 代表4x4矩阵   
以上可以用来做常量和矢量的计算


```text
vec4 v;
同一个分量表示法
v.x 和 v.s 以及 v.r ， v[0] 表达的是同一个分量。
v.y 和 v.t 以及 v.g ， v[1] 表达的是同一个分量。
v.z 和 v.p 以及 v.b ， v[2] 表达的是同一个分量。
v.w 和 v.q 以及 v.a ， v[3] 表达的是同一个分量。
```
```text
支持矢量调制，意味者你可以交换或重复分量
v.yyyy 和 vec4(v.y, v.y, v.y, v.y)表达一样

v.bgra 和 vec4(v.b, v.g, v.r, v.a)表达一样
```
```text
当构造一个矢量或矩阵时可以一次提供多个分量，例如
vec4(v.rgb, 1) 和 vec4(v.r, v.g, v.b, 1)
```
```text
GLSL是一个强类型的语言
错误，
float f = 1;  // 1是int类型，不能将int型赋值给float


正确
float f = 1.0;      // 使用float
float f = float(1)  // 转换integer为float
```
```text
GLSL有一系列内置方法，其中大多数运算支持多种数据类型，
并且一次可以运算多个分量

T sin(T angle)


T可以是 float, vec2, vec3 或 vec4 。
如果你传的是 vec4 返回的也是 vec4, 
返回结果对应每个分量的正弦值。
换句话说如果 v 是 vec4 类型。

如下
vec4 s = sin(v)
和 
vec4 s = vec4(sin(v.x), sin(v.y), sin(v.z), sin(v.w));
是一样的
```
```text
如果 v1 和 v2 是 vec4; 同时 f 是浮点型，那么

vec4 m = mix(v1, v2, f);
和
vec4 m = vec4(
  mix(v1.x, v2.x, f),
  mix(v1.y, v2.y, f),
  mix(v1.z, v2.z, f),
  mix(v1.w, v2.w, f));
  
 是等价的
```


在[工作原理](./B.md)中提到，webgl每次绘制需要两个着色器，一个顶点着色器，一个片段着色器；每个着色器都是一个方法
。顶点着色器和片段着色器链接在一起最终合成一个着色程序。一个webgl应用通常会有多个着色程序；
# 顶点着色器
顶点着色器的作用是生成裁剪空间坐标。例如：
````text
        // 一个属性值，从缓冲区获取数据
        // a_position属性的数据类型是vec4
        // vec4是一个有四个浮点数据的数据类型。
        // 在JavaScript中你可以把它想象成 a_position = {x: 0, y: 0, z: 0, w: 0}。之前我们设置的size = 2，
        // 属性默认值是0, 0, 0, 1，然后属性将会从缓冲中获取前两个值（ x 和 y ）。 z和w还是默认值 0 和 1 。
        
        attribute vec4 a_position;
    
        // 所有的着色器都有一个main函数
        void main() {
    
        // gl_Position 是一个顶点着色器主要设置的变量
        gl_Position = a_position;
      }

````
每个顶点调用一次着色器，每次调用都需要设置一个特殊的全局变量`gl_Position`,该变量就是`裁剪空间坐标（投影坐标）`
顶点着色器需要的数据可以通过以下方式获取：
- attributes (从缓冲中获取数据)。例如：顶点坐标、颜色值
- uniforms（在一次绘制中对所有顶点保持一致的值）。例如：裁剪空间坐标
- textures （从像素或纹理元素中获取数据）
### attributes属性
最常用的方法是缓冲和属性；例如将某个属性指向某个数据.   
- 首先找到该属性的位置
````javascript
var positionLoc = gl.getAttribLocation(someShaderProgram, "a_position");
````
- 创建缓冲并在该缓冲区写入数据
```javascript
var buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, someData, gl.STATIC_DRAW);
```
- 开启从缓冲中获取数据绑定缓冲区；vertexAttribPointer默认从当前绑定的缓冲区读取数据
```javascript
// 开启从缓冲中获取数据
gl.enableVertexAttribArray(positionLoc);
gl.bindBuffer(gl.ARRAY_BUFFER, buf);

var numComponents = 3;  // (x, y, z)
var type = gl.FLOAT;    // 32位浮点数据
var normalize = false;  // 不标准化
var offset = 0;         // 从缓冲起始位置开始获取
var stride = 0;         // 到下一个数据跳多少位内存
                        // 0 = 使用当前的单位个数和单位长度 （ 3 * Float32Array.BYTES_PER_ELEMENT ）
 
gl.vertexAttribPointer(positionLoc, numComponents, type, false, stride, offset);
```


## 属性 Attributes

属性可以使用`float`、`vec2`、`vec3`、`vec4`、`mat2`,`mat3`,`mat4`   
- 属性徐要先开启获取数据
- 将缓存的属性绑定到绑定点
- 设置好读取缓存数据的参数
- 使用`vertexAttribPointer`从缓冲区读取数据
## 全局变量  Uniforms
```javascript
/**
 * 根据属性位置可对全局属性进行赋值
 */
gl.uniform1f (floatUniformLoc, v);                 // float
gl.uniform1fv(floatUniformLoc, [v]);               // float 或 float array
gl.uniform2f (vec2UniformLoc,  v0, v1);            // vec2
gl.uniform2fv(vec2UniformLoc,  [v0, v1]);          // vec2 或 vec2 array
gl.uniform3f (vec3UniformLoc,  v0, v1, v2);        // vec3
gl.uniform3fv(vec3UniformLoc,  [v0, v1, v2]);      // vec3 或 vec3 array
gl.uniform4f (vec4UniformLoc,  v0, v1, v2, v4);    // vec4
gl.uniform4fv(vec4UniformLoc,  [v0, v1, v2, v4]);  // vec4 或 vec4 array
 
gl.uniformMatrix2fv(mat2UniformLoc, false, [  4x element array ])  // mat2 或 mat2 array
gl.uniformMatrix3fv(mat3UniformLoc, false, [  9x element array ])  // mat3 或 mat3 array
gl.uniformMatrix4fv(mat4UniformLoc, false, [ 16x element array ])  // mat4 或 mat4 array
 
gl.uniform1i (intUniformLoc,   v);                 // int
gl.uniform1iv(intUniformLoc, [v]);                 // int 或 int array
gl.uniform2i (ivec2UniformLoc, v0, v1);            // ivec2
gl.uniform2iv(ivec2UniformLoc, [v0, v1]);          // ivec2 或 ivec2 array
gl.uniform3i (ivec3UniformLoc, v0, v1, v2);        // ivec3
gl.uniform3iv(ivec3UniformLoc, [v0, v1, v2]);      // ivec3 or ivec3 array
gl.uniform4i (ivec4UniformLoc, v0, v1, v2, v4);    // ivec4
gl.uniform4iv(ivec4UniformLoc, [v0, v1, v2, v4]);  // ivec4 或 ivec4 array
 
gl.uniform1i (sampler2DUniformLoc,   v);           // sampler2D (textures)
gl.uniform1iv(sampler2DUniformLoc, [v]);           // sampler2D 或 sampler2D array
 
gl.uniform1i (samplerCubeUniformLoc,   v);         // samplerCube (textures)
gl.uniform1iv(samplerCubeUniformLoc, [v]);         // samplerCube 或 samplerCube array
```
- 一次性设置所有全局变量
```javascript
/**
 * 着色器里
 * 定义了有三组二维向量
 */
uniform vec2 u_someVec2[3];
 
// JavaScript 初始化时
var someVec2Loc = gl.getUniformLocation(someProgram, "u_someVec2");
 
// 渲染的时候
gl.uniform2fv(someVec2Loc, [1, 2, 3, 4, 5, 6]);  // 设置数组 u_someVec2
```
- 单独设置数组中的某个值
```javascript
// JavaScript 初始化时
var someVec2Element0Loc = gl.getUniformLocation(someProgram, "u_someVec2[0]");
var someVec2Element1Loc = gl.getUniformLocation(someProgram, "u_someVec2[1]");
var someVec2Element2Loc = gl.getUniformLocation(someProgram, "u_someVec2[2]");
 
// 渲染的时候
gl.uniform2fv(someVec2Element0Loc, [1, 2]);  // set element 0
gl.uniform2fv(someVec2Element1Loc, [3, 4]);  // set element 1
gl.uniform2fv(someVec2Element2Loc, [5, 6]);  // set element 2
```
- 对于结构体
```javascript
struct SomeStruct {
  bool active;
  vec2 someVec2;
};
uniform SomeStruct u_someThing;

// 找到结构体中具体的值进行设置
var someThingActiveLoc = gl.getUniformLocation(someProgram, "u_someThing.active");
var someThingSomeVec2Loc = gl.getUniformLocation(someProgram, "u_someThing.someVec2");
```

## 片段着色器
一个片段着色器是为了当前光栅化的像素提供颜色值；每个像素都将会调用一次片段着色器，每次从全局的特殊变量`gl_FragColor`中获取颜色信息
```javascript
// 片断着色器没有默认精度，所以我们需要设置一个精度
// mediump是一个不错的默认值，代表“medium precision”（中等精度）
precision mediump float;

void main() {
  // gl_FragColor 是一个片断着色器主要设置的变量
  // 这里的颜色可参考rgba格式进行设置
  gl_FragColor = vec4(0, 0, 0, 1); // 返回“瑞迪施紫色”
}
```
Varyings 可变量
可变量是一种顶点着色器给片段着色器穿值的一种方式，为了使用可变量，
需要在两个着色器中定义同名的可变量。给定点着色器中可变量设置的值，
会作为参考进行内插，在绘制像素时传给片段着色器的可变量；
```javascript
const vertexShaderSource = `
    // 定义顶点二维向量
    attribute vec2 a_position;
    // 颜色属性 四维向量 rgba
    attribute vec4 a_color;
    // 全局变量矩阵 3*3的方阵
    uniform mat3 u_matrix;
    // 可变量颜色 四维向量
    varying vec4 to_f_color;
    
    void main() {
      //
      // 位置乘以矩阵
      gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
    
      // Copy the color from the attribute to the varying.
      to_f_color = a_color;
    }
  `
  const fragmentShaderSource = `
    precision mediump float;
    varying vec4 to_f_color;
    
    
    void main() {
      gl_FragColor = to_f_color;
    }
  `
```



整体代码如下：
```javascript
import { createShader, createProgram } from '../webglCommon'

export function triangles(canvas) {
  // Get A WebGL context
  const gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }

  // Get the strings for our GLSL shaders
  // 顶点着色器源
  const vertexShaderSource = `
        // 一个属性值，从缓冲区获取数据
        // a_position属性的数据类型是vec4
        // vec4是一个有四个浮点数据的数据类型。
        // 在JavaScript中你可以把它想象成 a_position = {x: 0, y: 0, z: 0, w: 0}。之前我们设置的size = 2，
        // 属性默认值是0, 0, 0, 1，然后属性将会从缓冲中获取前两个值（ x 和 y ）。 z和w还是默认值 0 和 1 。
        
        attribute vec4 a_position;
        // 设置一个全局偏移量
        uniform vec4 u_offset;
        // 所有的着色器都有一个main函数
        void main() {
    
        // gl_Position 是一个顶点着色器主要设置的变量
        gl_Position = a_position + u_offset;
      }
          `
  // 片段着色器
  const fragmentShaderSource = `
        
    
        // 片断着色器没有默认精度，所以我们需要设置一个精度
        // mediump是一个不错的默认值，代表“medium precision”（中等精度）
        precision mediump float;
    
        void main() {
        // gl_FragColor 是一个片断着色器主要设置的变量
        // 这里的颜色可参考rgba格式进行设置
        gl_FragColor = vec4(0, 0, 0, 1); // 返回“瑞迪施紫色”
      }
          `

  // 创建顶点着色器
  const vertexShader = createShader(
    gl, gl.VERTEX_SHADER, vertexShaderSource
  )
  // 创建片段着色器
  const fragmentShader = createShader(
    gl, gl.FRAGMENT_SHADER, fragmentShaderSource
  )

  // 将两个着色器链接在一起
  const program = createProgram(
    gl, vertexShader, fragmentShader
  )
  // 获取全局偏移量的位置
  const offsetLoc = gl.getUniformLocation(program, 'u_offset')


  // 创建好了着色程序，我们还需要对他提供数据
  // glsl着色程序唯一输入是一个属性值a_position，从刚创建的着色程序找到这个属性值所在位置
  // 寻找属性值位置应该在初始化的时候完成，而不是在渲染时完成
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')

  // 属性值从缓冲区获取，所以创建一个缓冲
  const positionBuffer = gl.createBuffer()

  // webgl可以通过绑定点操控全局范围内的许多数据，可以吧绑定点想象成一个全局变量
  // 首先绑定一个数据源到绑定点，然后引用绑定点指向该数据源
  // 以下我们绑定位置信息缓冲（下面的绑定点就是ARRAY_BUFFER）
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  // 三个二维点坐标
  const positions = [
    -0.2, 0.2,
    0.2, 0.2,
    -0.2, -0.2,
    // 添加下面三点即可利用三角形绘制矩形
    0.2, 0.2,
    -0.2, -0.2,
    0.2, -0.2
  ]
  // webgl需要强数据类型。所以 new Float32Array(positions) 创建了32位浮点型数据序列
  // 并从positions中复制数据待序列中，
  // gl.bufferData复制这些数据到GPU的positionBuffer对象上
  // 数据最终传递到positionBuffer是因为上一步我们已经将它绑定在了ARRAY_BUFFER（也就是绑定点）上
  // 最后一个参数gl.STATIC_DRAW是提示WebGL我们将怎么使用这些数据
  // WebGL会根据提示做出一些优化。
  // gl.STATIC_DRAW提示WebGL我们不会经常改变这些数据。
  gl.bufferData(
    gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW
  )

  // 以上都是初始代码，在页面加载时只会运行一次.
  // 以下是渲染代码

  // 告诉webgl怎样吧提供的gl_Position裁剪空间坐标对应到画布像素坐标（通常画布像素坐标也叫屏幕坐标）
  // 需要调用gl.viewport 方法并传递画布的当前尺寸
  // 这样就告诉webgl裁剪空间的-1=>+1分别对应到X轴的0=>gl.canvas.width 和y轴的 0 -> gl.canvas.height
  gl.viewport(
    0, 0, gl.canvas.width, gl.canvas.height
  )

  // 用0, 0, 0, 0清空画布，分别对应 r, g, b, alpha （红，绿，蓝，阿尔法）值
  gl.clearColor(
    0, 0, 0, 0
  )
  gl.clear(gl.COLOR_BUFFER_BIT)


  // 告诉webgl运行哪个着色程序
  gl.useProgram(program)


  /**
   * todo
   * 必须在使用程序后，才能对程序中的变量做相关的赋值操作
   * [x,y,z,w]
   * x 水平方向平移  计算单位是相对于投影坐标
   * x 垂直方向平移  计算单位是相对于投影坐标
   * z
   * w 以自身中心点 来进缩放(-1,+无穷)开区间为放大缩小值
   */
  // 在绘制前为偏移量赋值
  gl.uniform4fv(offsetLoc, [0, 0, 0, 8])  // 向右偏移一半屏幕宽度

  // 告诉webgl怎么从我们之前准备的缓冲中获取数据给着色器中的属性
  // 首先需要启用对应的属性
  gl.enableVertexAttribArray(positionAttributeLocation)

  // 将绑定点绑定到缓冲数据（positionBuffer）
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
  const size = 2          // 每次迭代运行提取两个单位数据
  const type = gl.FLOAT   // 每个单位的数据类型是32位浮点型
  const normalize = false // 不需要归一化数据
  const stride = 0        // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）每次迭代运行运动多少内存到下一个数据开始点
  const offset = 0        // 从缓冲起始位置开始读取
  // 一个额外的信息是gl.vertexAttribPointer是将属性绑定到当前的ARRAY_BUFFER。
  // 换句话说就是绑定到 positionBuffer上。
  // 这也意味着现在利用绑定点随意将 ARRAY_BUFFER绑定到其它数据上后，该属性依然从positionBuffer上读取数据
  /**
   * todo
   * 从array_buffer中为当前位置填写数据
   * positionAttributeLocation 是属性位置，不是缓冲区，所以不能使用gl.bufferData为属性提供数据
   * gl.bufferData是用来想指向的当前的缓冲却填充数据
   *
   * 缓冲区数据填好了之后
   * 使用vertexAttribPointer将缓冲区的数据填写给当前属性的位置
   */
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset
  )




  // 开始绘制
  // 因为count = 3，所以顶点着色器将运行三次
  // 第一次运行将会从位置缓冲中读取前两个值赋给属性值a_position.x和a_position.y
  // 第二次运行a_position.xy将会被赋予后两个值，
  // 最后一次运行将被赋予最后两个值

  // 因为我们设置primitiveType（图元类型）为 gl.TRIANGLES（三角形）， 顶点着色器每运行三次
  // WebGL将会根据三个gl_Position值绘制一个三角形，
  // 不论我们的画布大小是多少，在裁剪空间中每个方向的坐标范围都是 -1 到 1 。
  const primitiveType = gl.TRIANGLES
  // 这里每6次顶点着色器处理成像素坐标点后才会渲染
  const count = 6


  // WebGL将会把它们从裁剪空间转换到屏幕空间并在屏幕空间绘制一个三角形， 如果画布大小是400×300我们会得到类似以下的转换
  //   0, 0,   -> 200, 150 位置1
  //   0, 0.5, -> 200, 225 位置2
  //   0.7, 0, -> 340, 150 位置3

  // 从以上的推断可以得出相关结论
  // canvas中心点为基础点（0，0）
  // （-1，-1） 表示（200 + (200*(-1)),150 + (150*(-1))）
  // （-0.5，0.3） 表示（200 + (200*(-5)),150 + (150*(-3))）
  gl.drawArrays(
    primitiveType, offset, count
  )
}



// todo
/**
 *
 * 上面的例子中顶点着色器只是简单传递了位置信息
 * 由于位置坐标就是裁剪空间中的坐标，所以着色器没有特殊的执行，
 * 如果想要实现三位渲染，那么就需要提供合适的着色器将三维坐标转换到裁剪空间坐标
 * 因为webgl只是一个光栅化的API
 *
 * 裁剪空间的x坐标范围是 -1 到 +1. 这就意味着0在中间并且正值在它右边。
 * 裁剪空间中 -1 是最底端 +1 是最顶端
 * 对于描述二维空间中的物体，比起裁剪空间坐标你可能更希望使用屏幕像素坐标
 */

```
# 总结
webgl的功能就是创建不同的着色器，想着色器提供数据，然后调用
gl.drawArrays和gl.drawElements让webgl调用顶点着色器程序处理每个顶点
，调用片段着色器来渲染每个像素；

# 参考链接
- [Unity3D - Shader - 模型、世界、观察、裁剪空间坐标转换](https://blog.csdn.net/biezhihua/article/details/78926849)
- [webgl语法简介](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-shaders-and-glsl.html)