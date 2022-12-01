# gitlab的下载与安装


- 安装必要的依赖
```text
sudo apt-get update
sudo apt-get install -y curl openssh-server ca-certificates tzdata perl
```


- 添加gitlab包仓库并安装包
```text
 curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash
```

- 设置访问gitlab的域名信息
```text
 sudo EXTERNAL_URL="https://gitlab.example.com" apt-get install gitlab-ee
```

**参考：**   
https://about.gitlab.com/install/#ubuntu