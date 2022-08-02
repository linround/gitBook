# 《精解》vue2

## new Vue
+ 初始化生命周期
+ 初始化事件对象
+ 初始化`render`函数
+ 调用`beforeCreate` 生命钩子
+ 初始化注入
+ 初始化`state`
+ 初始化`Provide`
+ 调用`created`生命钩子
+ 开始挂载
+ + 模板编译
+ + 得到render函数
+ + 挂载组件
+ + 调用`beforeMount`生命钩子
+ + 调用render函数形成`Vnode` 
+ + 调用update进行`Vnode转换为真实Node` 
+ + 调用patch方法将`Vnode转换为真实Node`
+ + 子组件挂载到父组件上完成

