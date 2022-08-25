# webgl 二维平面中的位移

本次位移方案采用传统的改变位移坐标的方案进行位移
> `存储一个全局的二维变量[tx,ty]`来分别表示顶点的在x,y轴的位移信息；  
> `顶点信息+位移信息 构成新的顶点信息`，重新绘制新的顶点信息即可；

```javascript
  const gl = canvas.getContext('webgl')
if (!gl) {
  return
}
const vertexShaderSource = `
      // 存储三角形的顶点数据
      attribute vec2 a_position;
      // 存储映射空间的宽高数据
      uniform vec2 u_resolution;
      // 顶点的位移信息
      uniform vec2 u_translation;
      
      void main() {
         // 位置=原来的位置信息+位置信息
         vec2 position = a_position + u_translation;
      
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
const color = [Math.random(), Math.random(), Math.random(), 1]

drawScene()

function updatePosition(value) {
  if (value) {
    translation[0] = value[0]
    translation[1] = value[1]
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
  
  // 设置颜色
  gl.uniform4fv(colorLocation, color)
  
  // 设置位移全局变量
  gl.uniform2fv(translationLocation, translation)
  
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

```