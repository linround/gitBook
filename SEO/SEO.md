# SEO之路
## 关于SEO
搜索引擎优化（**SEO**）通常指对网站的部分内容进行细微的修改。单独来看，这些修改是非常微小的，但与其他优化结合后，可能会对网站的用户体验以及再自然搜索
结果中的表现产生很显著的影响。**SEO**旨在帮助搜索引擎了解并发现相关网站内容。
## 简单术语
- **索引**-搜索引擎会将其知道的所有网页存储在其索引中
- **抓取**-寻找新网页或更新后的网页的过程
- **抓取工具**-一种从网络中抓取网页并将网页编入索引的自动化软件
- **Googlebot**-Google抓取工具的通用名称
## 如何确认网站是否在Google的索引中？
- 对目标网站执行`site:`搜索，如果能够看到相关结果，则表明网站在索引中
```` text
site:ucalendar.cn
````
- 造成未能抓取到结果可能的原因
  - 此网站与其他网站紧密关联
  - 是刚刚推出的新网站，Google未来得及抓取
  - 网站设计导致Google难以抓取
  - Google在抓取网站是收到了错误的信息
  - 相关策略阻止了Google抓取网站
  
## 如何让目标网站在Google搜索中显示   
通常无需任何操作，只需将网站发布到网网络上即可.[了解抓取过程](./how-search-works.md)
## 帮助Google找到站点内容
提交[站点地图](./build-sitemap.md).站点地图是网站上的一种文件。可告知搜索引擎网站上新增了哪些网页
或者有哪些网页进行了更改。同时Google也会通过其他网页上的连接找到你的网站。了解[网站推广](./seo-starter-guide-promote)。

## 阻止Google抓取部分网页
对于无关信息，可以使用`robots.txt`阻止不必要的抓取；`robots.txt`会告诉搜索引擎是否可以访问该网站并抓取网站内容
```javascript
// 告诉google禁止爬取img和assets文件夹下的内容

User-agent: googlebot
Disallow: /img/
Disallow: /assets/
```

## SEO相关措施
- 创建独特准确的网页标题。`title`会告诉用户和搜索引擎特定网页的主题是什么。
``````html
<title>UCalendar、日历、日程、你的日历</title>
```````
- 使用`meta`进行标记。可以让搜索引擎了解该网页的大致内容。网页的标题可以是几个词或一句话，而网页的`meta`
标记可以是一两个句子甚至一小段话。
```html
<meta name="description" content="UCalendar,让生活更简单，让工作更轻松;行程安排、出行计划、工作总结的好帮手;作者林Round;">
```
- 添加结构化数据标记。结构化数据是可以添加到网站网页中的代码，用于想搜索引擎描述内容，以便搜索引擎更好的了解网页上的信息。
```javascript
{
  "@context": "https://ucalendar.cn/",
    "@type": "日历",
    "url": "https://ucalendar.cn/",
    "logo": "https://ucalendar.cn/img/UCalendar.png"
}
```

- 在网站url中使用字词
- 为每个网页提供仅一种访问网址。防止将不同的用户链接到不同的网页中；如果发现用户通过多个网址访问相同的内容，可以设置一个非首选网址到主导网址的`301重定向`。如果无法重定向，可以使用`rel="canonical"`
的link元素；
```html
<link rel="canonical" href="https://ucalendar.cn/" />
```


## 让网站更加的实用
- 提供文笔优秀、易于理解的内容
- 合理安排内容结构，让用户清楚的指导内容咱不提的起止位置
- 建立新鲜独特的内容，吸引新的用户
- 针对用户而非搜索引擎来优化内容
- 以培养用户信任为目标
- 彰显专业性和权威性
- 避免投放无关广告
- [投放广告后，关注与使用广告拦截器的用户之间的互动](https://www.thinkwithgoogle.com/marketing-strategies/monetization-strategies/adblock-report/)
- 定位文字提供有关链接到的网页的基本说明
- 尽量使用具有描述性的简短文字
- 设置链接格式，提高链接的识别度。从而防止用户没有看到或意外的点击，从而降低内容的实用性
- 关注链接时，网站声誉之间的影响。 如果使用第三方软件来丰富网站的体验及吸引用户，
检查该网站是否会包含不想放到自己网站上的链接。如果无法从中移除某些垃圾链接，可以使用`nofollow`停止跟踪这些链接，`如果是自己为自己提供的功能或内容的链接，务必使用nofollow；`
```html
<a href="https://www.example.com" rel="nofollow">无关链接</a>
```
- 如果不希望搜索引擎跟踪网页中的所有链接，可以在网页的`head`标签中添加以下内容：
```html
<meta name="robots" content="nofollow">
```
- 如果不愿意自己的网站为别的网站背书，将`nofollow`添加到对应的链接即可；
- 优化图片
