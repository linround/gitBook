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