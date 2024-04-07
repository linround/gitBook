# 微前端

## 乾坤
链接：https://github.com/umijs/qiankun

并行在多个端口下运行多个应用，在main 应用中，通过子应用注册，子应用通过微前端框架加载。

加载方式是通过将对应区域挂载普通的DOM元素来实现的。


![img.png](img/img2.png)
`上图区域渲染的是react15的子应用`

### 运行环境
建议node版本 v14。
### 体验
运行乾坤微前端之后，在切换各个子应用的时候，出现的异常较多，暂时放弃乾坤方案。

![img.png](img/img1.png)
## 无界
链接：https://github.com/Tencent/wujie

无界的界面加载方式是通过一个shadowDOM来实现的，这样就不会出现样式污染的问题。
![img.png](img/img4.png)
### 运行环境
建议node版本 v16。
### 项目启动
- 根目录执行pnpm -i;安装所有依赖
- 进入examples/main-vue 目录；运行 yarn install ; yarn start
- 进入examples/react17 目录；运行 yarn start
- 进入examples/vite 目录；运行 yarn install ; yarn start
- 进入examples/vue3目录；运行yarn install；yarn start
### 体验
运行wujie微前端之后，切换子应用的时候，没有出现异常,但是打开弹框后却发生了滚动。
目前成功运行了vite，vue3和react17三个子应用，足够测试为前端的大部分功能了。
![img.png](img/img3.png)
### 通信
#### 路由管理
#### state管理
## micro-app
链接：https://github.com/micro-zoe/micro-app
