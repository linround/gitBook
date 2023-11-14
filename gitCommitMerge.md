# 对于本地已经提交的 commit
使用 `reset` 命令即可退回到 目标 commit;接着使用 `amend` 参数，即可。
# 合并多个远程仓库 已经提交的commit
## 创建 commit
- commit 1
- commit 2
- commit 3
- commit 4
- commit 5

![img_1.png](/img/img.png)

## 使用 git log 命令查看

![img_1.png](/img/img_1.png)
- q 退出
## 复制 commit 1 的 SHA 值
`ef8be0285b53fa0a7d30baa90a25d7c8d8f9125f`
## 执行 rebase
`git rebase -i ef8be0285b53fa0a7d30baa90a25d7c8d8f9125f`
## 选择合并的commit

![img_1.png](/img/img_2.png)
## wq 保存并退出
## 填写合并的 commit 信息

![img_1.png](/img/img_3.png)
## wq 保存并退出
## 执行
`git push -f`  必须强制推送

![img_1.png](/img/img_4.png)

## 合并后的结果

![img_1.png](/img/img_5.png)

commit 1 之前的四个 commit 2、 commit 3、 commit 4、 commit 5、被合并成了一个commit
