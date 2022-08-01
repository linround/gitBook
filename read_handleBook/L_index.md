# 映射类型
+ 有时一种类型基于另一种类型（映射类型建立在索引签名的语法之上）
+ `?`表示属性可选，`-`表示去掉属性的只读性获取可选性
+ 移除属性可读性
```typescript
// 
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
};
type LockedAccount = {
    readonly id: string;
    readonly name: string;
};
// type UnlockedAccount = {
//   id: string;
//   name: string;
// }
type UnlockedAccount = CreateMutable<LockedAccount>;
//
```
+ 移除属性的可选性
```typescript
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
};
// type User = {
//     id: string;
//     name: string;
//     age: number;
// }
type User = Concrete<MaybeUser>;
```

+ 映射类型
通过使用`as`来对属性进行重新命名，并进行映射；
```typescript
type Getters<Type> = {
  [k in keyof Type as `get${Capitalize<string & k>}`]: ()=>Type[k]
}

interface Person {
  nameValue: string;
  age: number
}

type gP = Getters<Person>
const u: gP = {
  getAge(){
    return 0
  },
  getNameValue(){
    return ''
  }
}
```

+ 移除属性
```typescript
// 使用as结合Exclude移除属性
type Remove<Type> = {
  [k in keyof Type as Exclude<k, 'kind'>]: Type[k]
}
interface C {
  kind: '',
  radius: number
}

type Rc = Remove<C>

const r:Rc = {
  radius: 9
}
```
+ 条件映射
```typescript
type ex<Type> = {
  [k in keyof Type]: Type[k] extends {
    pii: true
  } ? Boolean : Number
}

type db = {
  id: {},
  name: {
    pii: false
  },
  age:{
    pii: true
  }
}

type obj = ex<db>

const o:obj = {
  id:0,
  age: true, // 源pii与条件判断一致所以未布尔值
  name:0 // 源pii与条件判断不一致，所以未number
}
```

总结：
+ 使用`keyof`进行映射
+ 使用`？`进行可选，使用`-`表示去掉可选或者只读性
+ 使用`as`可以更改映射属性名
+ 借助`extends`进行条件映射
+ 使用Required 表示属性必须，这里适用于全局
```typescript
interface Props {
  a?: string
  b?: string
}
const o:Props={}
const r:Required<Props> = {
  a:'',
  b:''
}
```
+ 使用Readonly 的方式对类型进行全局只读
```typescript
interface Props {
  a?: string
  b?: string
}
// const o:Props={}
const r:Readonly<Props> = {
  a:'',
  b:''
}
```

+ 使用Record构造一个多属性的，同解结构的对象  
cat两个属性rrr和sss，每个属性的结构是CatInfo
```typescript
interface CatInfo {
  age: number
  name: string
}
type Cat = 'www'|'rrr'

const cats:Record<Cat, CatInfo> = {
  www:{
    age: 1,
    name: ''
  },
  rrr:{
    age: 1,
    name: ''
  }
}
```

+ 使用Pick某个类型中选择相应的key，来构造新的一种属性   
选取age和name两个属性来构造新的类型；
```typescript
interface CatInfo {
  age: number
  name: string
  title: string
}
type Cat = 'age'|'name'

const cats:Pick<CatInfo,Cat> = {
  age:0,
  name: ''
}
```

+ 使用Omit从某个类型中删除key来构造新的属性
```typescript
interface CatInfo {
  age: number
  name: string
  title: string
}
type Cat = 'age'|'name'

const cats:Omit<CatInfo,Cat> = {
  title:''
}
```
+ Exclude从联合类型中排除某个类型
```typescript
type A = 'a'|'b'|'c'
type B = Exclude<A,'a'|'c'>
let b:B = 'b'
```

+ Extract从多个联合类型中提出交集
````typescript
type A = 'a'|'b'|'c'
type B = Extract<A,'a'|'c'|'d'>
let x:B = 'c'
let y:B = 'a'
````

+ 使用Parameters 获取函数参数类型
````typescript
type f1 = (arg:{a:number,b:number})=>void
type t0 = Parameters<f1>
// 获取函数参数
const e0:t0 = [{a:1,b:2}]

type t1 = Parameters<()=>string>
// 函数没有参数
const e1:t1 = []

type t2 = Parameters<(s:string)=>number>
// 有一个字符串参数
const e2:t2 = ['s']

````

+ ReturnType构造一个由函数返回类型组成的类型
````typescript
type f1 = (arg:{a:number,b:number})=>void
type t0 = ReturnType<f1>
// 获取函数返回类型
const e0:t0 = undefined

type t1 = ReturnType<()=>string>
// 函数返回类型是string
const e1:t1 = 'sds'

type t2 = ReturnType<(s:string)=>number>
// 有一个字符串参数
const e2:t2 = 0

type T3 = ReturnType<<T extends number[]>() => T>;
// t3 = number[]
const e3:T3 = [1,2,3]



````