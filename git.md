# git常用操作

## 版本回退
```typescript
git revert commit-id // 撤销某次commit
git revert --continue // 解决冲突后继续
git push origin // 解决完之后 上传代码

```

## 合并commit
```typescript
git rebase HEAD^2 // 合并最近的两次提交
// 
可以使用git reset进行本地的commit合并
//
可以利用amend来更改（合并）上一次的提交

```