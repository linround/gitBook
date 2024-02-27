# 函数声明和 var声明

```javascript
function getName() {
  alert(5);
}
var getName = function() {
  alert(4);
};
getName()
// 结果输出 4
```
```javascript
var getName = function() {
  alert(4);
};
function getName() {
  alert(5);
}
getName()
// 结果输出 4
```

以上两个例子都会输出4，因为函数声明和变量声明都会提升，但是函数声明会首先被提升，然后才是变量声明。

