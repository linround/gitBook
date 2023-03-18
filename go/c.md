# 关于flag包

flag用于解析命令行

```gotemplate
package main

import (
    "flag"
    "fmt"
    "strings"
)

var n = flag.Bool("n", false, "omit trailing newline")
var sep = flag.String("s", " ", "separator")

func main() {
    flag.Parse()
    fmt.Print(strings.Join(flag.Args(), *sep))
    if !*n {
        fmt.Println()
    }
}

```

## go语言的一些优势
- 所有导入的包必须在每个文件的开头显示声明，这样编译器就没有必要读取和分析整个源文件来判断包的依赖关系。
- 禁止包的循环依赖，因为没有循环依赖，包的依赖关系形成一个有向无环图，每个包可以被独立编译，而且很可能是并发编译。
- 编译后包的目标文件不仅仅记录包本身的导出信息，目标文件同时还记录了包的依赖关系。因此在编译第一个包的时候，编译器只需要读取每个直接导入包的目标文件，而不需要遍历所有依赖的文件（因为很多都是重复依赖）

## 包和工具
- 通过限制包内变量的可见性，可以强制用户通过某些特定的函数来访问和更新内部变量，这样可以保证内部变量的一致性和并发时的互斥约束；
- 每个包里面可以执行init函数；对于main包，main函数才会执行；
- 循环导入会爆错
- 报的init执行 依照深度优先的原则
- 在测试时，必须指定对应的Test（首字母大写）前缀
-  go test -v -run="Canal"
  - `-v` 用于打印每个测试函数的名字和运行时间
  - `-run="Canal|Name"` 正则匹配，运行对应的匹配函数
