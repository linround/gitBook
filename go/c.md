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
- 基于测试者是否需要了解被测试对象的内部工作原理
  - 黑盒测试只需要测试包公开的文档和API行为；内部实现对测试代码是透明的
  - 白盒测试有访问内部函数和数据结构的权限，因此可以做到一些普通客户端无法实现的测试



## 相关命令
- go test -cpuprofile=cpu.out  cpu分析
- go test -blockprofile=block.out   代码块分析
- go test -memprofile=mem.out  内存分析
- go tool cover -html=c.out  生成覆盖率html网页
-  go test  -coverprofile=c.out 覆盖率分析

- 对于cpu执行时间的测试
![img.png](img/img2.png)


## 测试的规范
- `基准测试`是测量一个程序在固定工作负载下的性能
  - 默认情况下不运行任何基准测试。我们需要通过-bench命令行标志参数手工指定要运行的基准测试函数
  - go test -bench=. 开启基准测试
  - 基准测试的运算结果可以表名，[内存分配是非常费时间](https://golang-china.github.io/gopl-zh/ch11/ch11-04.html)
  
- 避免脆弱测试代码的方法是只检测你真正关心的属性。保持测试代码的简洁和内部结构的稳定
- 报告了调用的具体函数、它的输入和结果的意义；并且打印的真实返回的值和期望返回的值；并且即使断言失败依然会继续尝试运行更多的测试
```gotemplate

func TestSplit(t *testing.T) {
    s, sep := "a:b:c", ":"
    words := strings.Split(s, sep)
    if got, want := len(words), 3; got != want {
        t.Errorf("Split(%q, %q) returned %d words, want %d",
            s, sep, got, want)
    }
    // ...
}

```
