const x = 10
const y = 2
const v = x*y
const enum A {
    a,
    b,
    c,
    d= 100
    // d=v // 使用const 定义的枚举类型，不能使用计算值，也就是不能写成 x*y的形式,甚至不能间接的使用计算值
}
 enum B {
    a,
    b,
    c,
    d=x*y
}
// 使用 const 定义的枚举类型，在取值是会直接获取该值

const m = A.d
console.log(m)