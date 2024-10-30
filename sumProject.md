# 项目总结
## 工程化
工程化没有特定的相关模式。相对来说是通用的。例如lint,test,compile,link,optimise,deploy;
## lint
在工作项目中使用eslint进行代码规范。
## test
使用jest进行单元测试。
## compile
使用 webpack 进行代码打包编译
## link
在涉及本地开发是，对组件库进行代码调试。
## optimise
nginx 代理缓存静态资源。打包压缩、分块。资源混合，减少页面请求。
## deploy
基于 gitlab 或 github 进行自动化部署。(ci/cd)
