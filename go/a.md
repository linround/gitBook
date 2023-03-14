# 关于go语言的细节
- 在每一个函数之前写一个说明函数行为的注释也是一个好习惯。这些惯例很重要，因为这些内容会被像godoc这样的工具检测到，并且在执行命令时显示这些注释
- 关于go语言是如何知道一个变量是何时可以被回收的呢？
> 基本的实现思路是，从每个包级的变量和每个当前运行函数的每一个局部变量开始，通过指针或引用的访问路径遍历，是否可以找到该变量。如果不存在这样的访问路径，那么说明该变量是不可达的。也就是说
> 它是否存在并不会影响程序后续的计算结果；
- 将短生命周期对象的指针保存到具有长生命周期的对象中，特别是保存到全局变量时，会阻止对短生命周期对象的垃圾回收（从而影响程序的性能）；
- nil 可以赋值给任何指针或引用类型的变量。常量有更灵活的赋值规则，因为这样可以避免不必要的显示类型转换；
- 库或模块的目的都是为了支持模块化、封装、单独编译、代码重用；
- 声明语句的作用域是指源代码中可以有效使用这个名字的范围。
- 关于声明语句和生命周期；声明语句的作用域对应的是一个源代码的文本区域；他是一个编译时的属性。
- 一个变量的生命周期指的是程序运行时变量存在的有效时间段，在这个时间段内可以被程序的其他部分引用；是一个运行时的概念；


- go语言的数据类型分类：基础类型、复合类型、引用类型、接口类型
  - 基础类型：数字，字符串、布尔型
  - 复合类型：数组和结构体
  - 引用类型： 指针、切片、字典、函数、通道（意味着对任一引用类型数据修改都会影响所有该引用的拷贝）


- %取模运算符的符号和被取模数的符号总是一致的，因此-5%3和-5%-3结果都是-2
- 除法运算符/的行为则依赖于操作数是否全为整数，比如5.0/4.0的结果是1.25，但是5/4的结果是1
- 数据类型强制转换时，注意类型的的可转换范围，uint8最大为255,转换较大值会导致精度丢失
- float32的有效bit位只有23个，其它的bit位用于指数和符号
  - > var f float32 = 16777216 // 1 << 24  
    >  // f+1 是个很特殊的数   
    > fmt.Println(f == f+1)    // "true"!
- %q 打印带单引号的字符
- %c 打印字符
- %g 打印浮点数
- %f 打印浮点数
- %e 打印浮点数（带指数）


- 数组时国定长度序列
- 切片是可变长序列
  - 切片操作超出cap 的上线会导致panic异常；但是超出len(s)意味着扩展了slice;

- 禁止对map元素取址的原因是map可能随着元素数量的增长而重新分配更大的内存空间，从而可能导致之前的地址无效

- 同一结构体实例，可以使用 `==` 直接进行比较
  - 结构体中 得益于匿名嵌入的特性，我们可以直接访问叶子属性而不需要给出完整的路径
    - ```gotemplate
      type point struct {
        X, Y int
      }

      type circle struct {
        // 直接写了类型，而不指定名字
        point
        // Center point
        Radius int
      }

      type wheel struct {
        Circle circle
        Spokes int
      } 



- 结构体成员Tag,默认使用Go语言结构体的成员名字作为JSON的对象（通过reflect反射技术)
```gotemplate
type Movie struct {
	Title  string // 后面这部分统称为结构体成员Tag
	Year   int    `json:"released"`
	Color  bool   `json:"color,omitempty"`
	Actors []string
}
```


- text/template 和 html/template
  - html/template 会对特殊字符进行转义，从而能够正常显示特殊字符
  - text/template 不会对特殊字符转移，导致在显示过程中出现安全问题
  - 关于html 的可信任属性的使用


- 两个函数形式参数列表和返回值列表中的变量类型一一对应，那么这两个函数被认为有相同的类型或签名

- defer语句；在调用普通函数或方法前加上关键字defer，就完成了defer所需要的语法；
- 知道包含改defer语句的函数执行完毕时，defer后面的函数才会被执行
- 即使存在panic，最终也会调用对应的defer语句
- defer语句中的函数会在return语句更新返回值变量后再执行，又因为在函数中定义的匿名函数可以访问该函数包括返回值变量在内的所有变量，所以，对匿名函数采用defer机制，可以使其观察函数的返回值。
- 延迟执行的匿名函数甚至可以修改函数返回给调用者的返回值


## 记录函数的进入和退出的时间点

```gotemplate

package main

import (
	"log"
	"time"
)

func main() {
	bigSlowOperation()
}
func bigSlowOperation() {
	// 记录函数的进入和退出实际
	// 记录进入 trace即bigSlowOperation的时间
	// 使用defer记录退出bigSlowOperation的时间
	defer trace("bigSlowOperation")()
	time.Sleep(10 * time.Second)
}
func trace(msg string) func() {
	start := time.Now()
	log.Printf("enter %s", msg)
	return func() {
		log.Printf("exit %s (%s)", msg, time.Since(start))
	}
}

```

## panic、recover
- 使用recover 可以接收panic发送的错误相关信息
- 区分的恢复所有的panic异常，不是可取的做法；因为在panic之后，无法保证包级变量的状态仍然和我们预期一致。比如，对数据结构的一次重要更新没有被完整完成、文件或者网络连接没有被关闭、获得的锁没有被释放。此外，如果写日志时产生的panic被不加区分的恢复，可能会导致漏洞被忽略。


```gotemplate
package main

import "fmt"

func main() {
	defer func() {
		p := recover()
		if p != nil {
			fmt.Println("接收到的错误信息：", p)
		}
	}()
	fmt.Println("main正常执行：，main")
	panic("mainPanic")
}

```
- ，如果一个类型名本身是一个指针的话，是不允许其出现在接收器中的

- 一个对象的变量或者方法如果对调用方是不可见的话，一般就被定义为“封装”。封装有时候也被叫做信息隐藏，同时也是面向对象编程最关键的一个方面


## 关于make 的相关操作
```gotemplate

package main

import "fmt"

type Buffer struct {
	buf     []byte
	initial [64]byte
}

func (b *Buffer) Grow(n int) {
	if b.buf == nil {
		// 这里发生了内存（cap）分配,
		// 这里初始化了一个长度为0的数组
		b.buf = b.initial[:0]

	}
	//
	if len(b.buf)+n < cap(b.buf) {
		// make
		// 参数1是类型
		// 参数2是长度
		// 参数三是预留内存空间
		buf := make([]byte, len(b.buf)+n, 2*cap(b.buf)+n)
		fmt.Println(len(buf))
		fmt.Println(cap(buf))
		b.buf = buf
	}
	b.buf[5] = 5
	fmt.Println(n)
}

func main() {
	var b Buffer
	b.Grow(20)

}

```
