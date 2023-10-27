# load 和 DOMContentLoaded
https://javascript.info/onload-ondomcontentloaded
## load 
在整个页面及所有的依赖资源（样式表，图片）都已经完成加载时触发。即等待图片、子框架和异步脚本等其他内容完成加载。
## DOMContentLoaded
当 HTML 文档完全解析，且所有延迟脚本（<script defer src="…"> 和 <script type="module">）下载和执行完毕后，
会触发 DOMContentLoaded 事件。 它不会等待图片、子框架和异步脚本等其他内容完成加载。

## 实践证明
DOMContentLoaded 的执行通常在 load之前
