# 盒模型
- 标准盒模型 content-box
- IE盒模型 border-box

区别
- 标准盒模型，只包含 content,不包含 border 和 padding
- IE盒模型，包含 content、border、padding

````text
盒模型由四个部分组成，分别是margin、border、padding、content;  

一般可以通过修改 box-sizing 属性来改变元素的盒模型
````

# css 选择符号
- id选择器 (#myid)
- 类选择器 (.myclassname)
- 标签选择器 (div,h1,p)
- 后代选择器 (h1 p)
- 相邻后代（子）选择器 (ul>li)
- 兄弟选择器 (li~a)
- 相邻兄弟选择器 (li+a)
- 属性选择器 (a[data="data"])
- 伪类选择器 (a:hover,li:nth-child)
- 伪类元素选择器 (::before、::after)
- 通配符选择器 (*)

# 单冒号（:）和双冒号（::）的区别。
在css3中 使用单冒号来表示伪类 （:），使用双冒号来表示伪元素 （::）。   
伪类（:）一般匹配的是元素的一些特殊状态，例如：hover、link等；伪元素（::）一般匹配的特殊位置，比如 after、before。

- 伪类（:）  用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。
- 伪元素 （::） 用于创建一些不在文档树中的元素，并为其添加样式

# div 居中
## 水平居中
- 利用margin
- 利用父元素的 text-align
```css
.child {
      border: 1px solid black;
      width: 100px;
      height: 100px;
      display: inline-block;
    }
.parent {
      text-align: center;
    }
```
## 水平垂直居中
- 利用定位和margin实现
```css

    .parent2{
      position: relative;
      width: 300px;
      height: 600px;
      border: 1px solid black;
    }

    .child2 {
      width: 100px;
      height: 100px;
      border: 1px solid black;
        position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
```
- display:flex
