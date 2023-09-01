# 计算几何
- 除法在计算中最大的劣势就是会引入误差
## 凸包问题
- 遍历所有三角形，找到所有不被三角形包围的点。这些点组成了凸包的顶点
- 遍历所有的有向线，判断这条线是否是极边（所有的点在线的一侧），所有的 极边组成凸包的边缘
- 减而治之，逐步蚕食；
### 如何判断点在多边形的内部或外部？
- 借助三角形的的方式进行判断
### 判断点是否在三角形内部；
- toLeft 测试