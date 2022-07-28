# JS迁移ts指导
1. [x] 避免使用默认 Export Default
当别的模块import之前模块的Export Default的变量时。如果此时修改变量名，虽然不会对之前的
import产生影响，但是不太符合规范；
2. [x] 在有多个导出时，对于import的语法也不友好，具名导出会对import的规范较为友好；
3. [x] 默认导出的可发现性比较差。
4. [x] 参数太多转换为对象
5. [x] 将多个导出进行汇总（有默认导出的不便使用）`export * from './xxx'`;应为将多个
`export default`汇总到一起不是很方便；

## [命名规范](https://basarat.gitbook.io/typescript/styleguide)
1. [x] 定义变量用小驼峰
2. [x] 定义构造函数类用大驼峰
3. [x] interface大驼峰为命名，小驼峰为成员命名
4. [x] type大驼峰为命名，小驼峰为成员命名
5. [x] Enum大驼峰为命名，小驼峰为成员命名
6. [x] type适用于联合类型和交叉类型，interface适用于extends和implements