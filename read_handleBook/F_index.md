# 对象类型
## 属性修饰符
+ 指定苏醒的类型、属性是否可选、属性是否可写入
## 可选属性
+ 通过在名称末尾添加问号`?`来表述属性可选、
```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
```
## 只读属性
+ 属性使用readonly进行标记。在类型检查器件无法写入标记为只读的属性
+ readonly并不意味着该属性完全不可变。如果一个只读的引用属性，其内部是可写入的；
```typescript
interface home{
  readonly resident: {
    name: string
  }
}
const h:home = {
  resident:{
    name:''
  }
}
h.resident.name = '23'
```

+ 使用映射修饰符可以删除readonly属性
```typescript
interface home{
    readonly resident: {
        name: string
    }
}
const h:home = {
    resident:{
        name:''
    }
}
h.resident.name = '23'

// 移除该类型中的只读属性
type Remove<Type> = {
    - readonly[p in keyof Type]:Type[p]
}
type UnR = Remove<home>
const u:UnR = {
    resident:{
        name: ''
    }
}
u.resident = {
    name: '898'
}
```
## 扩展属性
+ 使用extends进行字段扩展；假设一个BasicAddress，通过扩展得到AddressWithUnit
```typescript
// 传统写法
interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

interface AddressWithUnit {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
    // 添加字段
    unit: string;
}
```
通过extends进行扩展
```typescript

// 通过extends进行扩展

interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress{
  unit: string
}
```
+ 从多种类型进行扩展
```typescript
interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
    color: "red",
    radius: 42,
};
```
## 交叉类型
+ 除了以上使用extends进行结构性的扩展，还可以使用`&`符号进行交叉类型扩展；
  ColorfulCircle会包含Colorful和Circle的所有属性；
```typescript
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;
```
## 泛型的作用
+ 在通用对象类型中,使用泛型来避免重载
## 数组类型
+ Array 本身是一种泛型
+ ReadonlyArray描述了不应更改的数组
## 元组类型
+ 元组类型也是另外一种类型的array,他确切的知道它包含多少个元素，以及它特定的位置包含哪些类型；
```typescript
// StringNumberPair是string和的元组类型number
type StringNumberPair = [string, number];
```
## 只读元组类型
```typescript
type t  = readonly [string,number]
function d(p:t):string{
  return p[0]
}
```

# 总结
+ 泛型可以进行类型推断
+ 泛型可以避免使用函数重载的方式定义类型
+ 扩展运算符包括`&`和`extends`