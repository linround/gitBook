# 关于工作中的一些问题记录

## git 操作中的一些问题
- 关于在`webstorm`中`.gitignore`文件配置`失效`的问题   
[问题描述]()：本地在webstorm的.gitignore文件中配置dist文件夹不提交，但是每次commit的记录中却还是包含dist文件夹；   
[原因]()： .gitignore只能忽略未被track的文件，而git本地缓存。如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。   
[解决方案]()：删除该文件夹

## 关于正则表达式的问题
[问题描述]()：
正则表达式执行结果一会儿为`false`、一会儿`true`
- ![reg1.png](img/reg1.png)

[原因]()： [test()的执行改变了正则表达式lastIndex属性](https://blog.csdn.net/weixin_45337170/article/details/116599089)。连续的执行test方法，后续的执行将会从lastIndex处开始匹配字符串（exec()同样改变正则本身的lastIndex属性值）。

[解决方案]()：  
每次执行完成后清空`lastIndex`即可   
![img_1.png](img/img_1.png)