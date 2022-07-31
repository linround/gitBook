# `keyof`运算符
+ 键索引（得到键的类型）
```typescript
type Point = { x: number; y: number };
type P = keyof Point;
// type P = x|y
const k:P = 'x'
const u:P = 'y'

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// 这里已经指定了对象的键值为number；所以只能推断为number
const x:A = 0 // type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// 以下M为string|number是因为js对象的键始终强制装换为字符串。因此obj[0]就是obj['0']
const z:M = '9'
const y:M = 0 // type M = string | number
```

总结：  
使用keyof来访问类型时，如果键指定类型为number时，那么这个索引结果就是固定的number类型；  
由于js中，对象键都会强制转换为字符串，所以当键是字符串时，其实其可以兼容number;