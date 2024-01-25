# 场景描述

在用户关闭页面时，进行埋点数据推送。

做法一
- 基于 [beforeunload_event](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/beforeunload_event)

做法二
- 基于 [sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)

## 总结

在c端群体中，做法一会有不好的用户体验；做法二在传参过程中，无法设置请求头数据。
