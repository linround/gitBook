# 基础知识

简单看一段代码
```typescript
// Accessing the property 'toLowerCase'
// on 'message' and then calling it
message.toLowerCase();
// Calling 'message'
message();
```
+ 第一行代码会访问一个名为toLowerCase的属性，然后后运行;
+ 第二行尝试直接调用message;

通常我们并不知道message的值，那么就会有以下几个问题：
+ message可以直接调用吗？
+ 它有toLowerCase这个属性吗？如果有toLowerCase可以调用吗？
+ 如果以上两行代码都会调用，他们会返回什么？
