# git 操作中的一些问题
1.关于在`webstorm`中`.gitignore`文件配置`失效`的问题   
[问题描述]()：本地在webstorm的.gitignore文件中配置dist文件夹不提交，但是每次commit的记录中却还是包含dist文件夹；   
[原因]()： .gitignore只能忽略未被track的文件，而git本地缓存。如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。   
[解决方案]()：删除该文件夹