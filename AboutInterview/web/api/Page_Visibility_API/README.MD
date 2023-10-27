# Page_Visibility_API

当用户最小化窗口或切换到 另一个标签页是 API 会发送 `visibilitychange` 事件。
- iframe的可见性和父文档的可见性相同
- 使用css熟悉 隐藏 iframe 不会触发可见性事件

> window 上的blur和focus 事件 可以了解到页面是否处于活动中；而无法检测到页面实际上已经被用户隐藏。
