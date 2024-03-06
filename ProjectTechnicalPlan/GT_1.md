# 技术栈
- [webpack](https://webpack.docschina.org/)
- [vue](https://vuejs.org/)
- [elementUI](https://element.eleme.cn/#/zh-CN)
- [nginx](https://docs.nginx.com/)
- [docker](https://docs.docker.com/)
## 开发
- [script-ext-html-webpack-plugin](https://www.npmjs.com/package/script-ext-html-webpack-plugin) 为特殊script 脚本添加特殊属性（sync,async,defer）
- [split-chunks-plugin](https://webpack.docschina.org/plugins/split-chunks-plugin/),[动态导入](https://webpack.docschina.org/guides/code-splitting/#entry-points)会自动触发包的分割。

## 部署
部署方案的自动化可有两种实现方式。
- 基于docker的方案需要搭建较为复杂的流程环境，设置非常多的环境参数，例如：主机的登录信息，docker的登录信息；
其优点在于自动化过程完善，基本可以实现一劳永逸。
- 基于scp的方式流程简单，但是自动化不彻底，在每次执行脚本时需要手动输入主机登录的密码。

### 基于docker
docker+gitlab,实现全流程的 `打包+发布+更新服务`
### 基于scp
编写shell 脚本，利用scp 直接上传 静态资源
```shell
#!/usr/bin/bash

# 本地路径
DIST=dist
# 服务器地址
SERVER_HOST=192.168.10.227
# 服务器路径
TARGET_DIST=/home/dev/dockers/nginx/html
# 密码：gtdev
# 打包完，上传到服务器
npm run build && \
scp -r ./$DIST/* dev@$SERVER_HOST:$TARGET_DIST
```

### 缺陷
- 未考虑到前端服务器的备份
