# 重定向
使用场景：
1. 顺利的将网站迁移到新的域名
2. 用户通过不同的网址访问该网站，可以使用重定向将所有来自其他几个网址的流量转到目标网页
3. 合并两个网站时，确保将旧网址的链接重定向到正确的网页
4. 移除了某个网页，并希望将用户转移到新网页


##### 永久重定向
- 在搜索结果中显示新的重定向目标
- 301和308状态码表示网页永久的迁移到新的位置
##### 临时重定向
- 在搜索结果中显示源网页
- 302临时重定向

##### meta refresh
- 即时重定向：在浏览器加载网页立即触发，google会将即时 meta refresh重定向解析为永久重定向。
- 延迟重定向：仅在网站所有者设置的任意秒数后触发，google搜索会将延迟meta refresh重定向解析为临时重定向。
- 可将`meta refresh`置于html的`head`元素中，或置于http的响应标头中；

```text
<meta http-equiv="refresh" content="5; url=https://example.com/newlocation">
```

```text
HTTP/1.1 200 OK
Refresh: 5; url=https://www.example.com/newlocation
```


##### javaScript location 重定向
- 如需设置javascript重定向，在html head内将location属性设置为重定向目标网址；

优缺点：
[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Redirections](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Redirections)
