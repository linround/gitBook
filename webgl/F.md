# webgl 二维平面的旋转和缩放
+ 二位平面的旋转矩阵
>[   
> cosQ, -sinQ   
> sinQ, cosQ   
> ]

因此只需要根据旋转的角度计算出`sinQ`, `cosQ`,然后得到旋转矩阵，
最终与坐标点相乘即可得到旋转后的坐标；

+ 二维平面的缩放矩阵
>[   
> Sx, 0   
> 0, Sy   
> ]

- 想要相对某个点进行旋转（改变旋转中心点）
> 改变旋转中心点即改变原点坐标，需要将原来的顶点坐标进行平移变换，乘以平移矩阵   
>[   
> 0, 0,Dx   
> 0, 0,Dy   
> 0, 0, 1   
> ]

```javascript
import { createProgramFromStrings } from '../webglCommon'
// eslint-disable-next-line no-duplicate-imports

'use strict'

export function render(canvas) {
  const gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }
  const vertexShaderSource = `
      // 存储三角形的顶点数据
      attribute vec2 a_position;
      // 存储映射空间的宽高数据
      uniform vec2 u_resolution;
      // 设置旋转的角度
      uniform vec2 u_rotation;
      // 顶点的位移信息
      uniform vec2 u_translation;
      // 缩放值
      uniform vec2 u_scale;
      
      uniform mat3 u_move;
      void main() {
        // 这里只需要将原有的顶点坐标乘以位移矩阵，即可绕规定的点进行旋转，这里是相当于改变原点坐标
        vec2 move_position = (u_move * vec3(a_position, 1)).xy;
         // 旋转位置
         vec2 rotatedPosition = vec2(
           move_position.x * u_rotation.y + move_position.y * u_rotation.x,
           move_position.y * u_rotation.y - move_position.x * u_rotation.x);
           // 对旋转后的坐标进行缩放
           vec2 scaledPosition = rotatedPosition * u_scale;
         // 位置=原来的位置信息+位置信息
         vec2 position = scaledPosition + u_translation;
      
         // 将图像信息归一化到裁剪空间 即位置信息/宽高信息 转换到（0，1）范围
         vec2 zeroToOne = position / u_resolution;
      
         // 从（0，1）=> （0，2）
         vec2 zeroToTwo = zeroToOne * 2.0;
      
         // 从 0->2 to -1->+1 (裁剪空间)
         vec2 clipSpace = zeroToTwo - 1.0;
         // 最终得到裁剪空间的顶点坐标值，并且对y轴做了反转
         gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      }
  `
  const fragmentShaderSource = `
      precision mediump float;
      // 片元的颜色值
      uniform vec4 u_color;
      
      void main() {
         gl_FragColor = u_color;
      }
  `
  
  // 启动一个着色程序
  const program = createProgramFromStrings(
    gl, vertexShaderSource, fragmentShaderSource
  )
  gl.useProgram(program)
  
  // 找到顶点位置的变量
  const positionLocation = gl.getAttribLocation(program, 'a_position')
  
  // 找到全局变量
  // 存储缩放信息
  const scaleLocation = gl.getUniformLocation(program, 'u_scale')
  const moveLocation = gl.getUniformLocation(program, 'u_move')
  // 存储旋转因子
  const rotationLocation = gl.getUniformLocation(program, 'u_rotation')
  
  // 存储像素空间的宽高
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
  // 片段着色器中的颜色值变量
  const colorLocation = gl.getUniformLocation(program, 'u_color')
  // 全局位移变量
  const translationLocation = gl.getUniformLocation(program, 'u_translation')
  
  // 创建顶点数据缓存区
  const positionBuffer = gl.createBuffer()
  // 将顶点缓冲区绑定在绑定点
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  // 为绑定点的缓冲区输入顶点数据
  setGeometry(gl)
  
  const translation = [0, 0]
  const rotation = [0, 1]
  const scale = [1, 1]
  const color = [Math.random(), Math.random(), Math.random(), 1]
  
  drawScene()
  
  function updatePosition(
    value, rota, scaleValue
  ) {
    if (value) {
      translation[0] = value[0]
      translation[1] = value[1]
    }
    if (rota) {
      rotation[0] = rota[0]
      rotation[1] = rota[1]
    }
    if (scaleValue) {
      
      scale[0] = scaleValue[0]
      scale[1] = scaleValue[1]
    }
    drawScene()
  }
  return updatePosition
  
  // 根据顶点着色器的信息和片元着色器信息进行绘制
  function drawScene() {
    
    // 告诉webgl从裁剪空间转换到像素空间的参数
    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )
    
    // 清除画布
    gl.clear(gl.COLOR_BUFFER_BIT)
    
    // 使用特定的着色其程序（虽然之前以及绑定了）
    gl.useProgram(program)
    
    // 开启顶点属性
    gl.enableVertexAttribArray(positionLocation)
    
    // 将之前的顶点缓冲数据绑定到绑定点
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    
    
    for (let i = 0;i < 2;i++) {
      // T告诉顶点属性如何从绑定点的缓冲区读取顶点数据
      const size = 2          // 每次迭代运行提取两个单位数据
      const type = gl.FLOAT   // 每个单位的数据类型是32位浮点型
      const normalize = false // 不需要归一化数据
      const stride = 0        // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）每次迭代运行运动多少内存到下一个数据开始点
      let offset = 0        // 从缓冲起始位置开始读取
      // positionLocation 得到了 positionBuffer的数据
      gl.vertexAttribPointer(
        positionLocation, size, type, normalize, stride, offset
      )
      
      // 设置全局变量宽高值
      gl.uniform2f(
        resolutionLocation, gl.canvas.width, gl.canvas.height
      )
      gl.uniformMatrix3fv(
        moveLocation, false, [
          1, 0, 0,
          0, 1, 0,
          -30, -90, 1
        ]
      )
      // 设置颜色
      gl.uniform4fv(colorLocation, color)
      // 设置缩放
      gl.uniform2fv(scaleLocation, scale)
      // 设置位移全局变量
      gl.uniform2fv(translationLocation, [translation[0] + i, translation[1] + i])
      // 设置旋转
      gl.uniform2fv(rotationLocation, rotation)
      // 开始绘制
      const primitiveType = gl.TRIANGLES
      offset = 0
      const count = 18  // 因为由18个顶点所以要绘制18次
      /**
       * todo
       * 在绘制时会指向顶点着色其程序
       * 在进行像素颜色插值过程中，每个像素都会执行一次片元着色器
       */
      gl.drawArrays(
        primitiveType, offset, count
      )
    }
  
  }
}

// 'F'字样的顶点数据.
function setGeometry(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      // 左边一列
      0, 0,
      30, 0,
      0, 150,
      0, 150,
      30, 0,
      30, 150,
      
      // 顶部一层
      30, 0,
      100, 0,
      30, 30,
      30, 30,
      100, 0,
      100, 30,
      
      // 中间一层
      30, 60,
      67, 60,
      30, 90,
      30, 90,
      67, 60,
      67, 90
    ]),
    gl.STATIC_DRAW
  )
}

```