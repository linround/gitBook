# 字节码相关
使用utf8编码

执行
```gotemplate
fmt.Printf("%#v\n", []byte("世界"))
```
打印
```gotemplate
[]byte{  0xe4, 0xb8, 0x96, 0xe7, 0x95, 0x8c}
```
- `世`的utf编码是 e4、b8、96  
- 对应的2进制编码228、184、150

执行
- utf8字符
```gotemplate
func f3() {
	var v = []byte{228, 184, 150}
	fmt.Println("真实编码", string(v))
}
```
得到`世`；

- rune 类型(用于表示Unicode码点)
```gotemplate
func f5() {
	fmt.Printf("run: %#v\n", string([]rune{19990}))
}
```
得到`世`；


### 切片操作的要点
- 降低内存分配的次数
