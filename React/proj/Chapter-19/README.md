# Common
记录一些不常见的特性
- [autoCapitalize](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/autocapitalize)；在移动设备的虚拟键盘，来帮助控制用户输入的大小写
- contentEditable；在 React 中使用会出现警告，因为用户编辑不回导致组件的程序更新。
- hidden在元素标签上的作用相当于display:none。鱼visible:hidden表现不一样。
- [is](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/is);原生的html目前可以自定义组件，基于原生的标签进行封装，实现自定义元素。
- [compositionstart](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionstart_event)；检测输入法输入时的字符，此时还未完全输入文字。
- [onWheel](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/wheel_event) 不一定触发 onscroll；
- tabindex为负值时；表示元素是可聚焦的，但是不能通过键盘导航来访问到该元素。
- tabindex为0时；表示元素是可聚焦的，并且可以通过键盘导航来聚焦到该元素，它的相对顺序是当前处于的 DOM 结构来决定的；
- 伪类的书写顺序。link > visited > hover > active > focus.
- hash 路由主要是监听了hashchange事件，history 路由模式监听的是，pushState和replaceState事件。
