# 索引访问类型


+ 与访问对象值一样，可以通过索引老访问类型
```typescript
type Person = { 
    age: number; 
    name: string; 
    alive: boolean 
};
type Age = Person["age"]; // type Age = number
```
+ 索引类型本身就是一种类型，结合`keyof`或其他方式进行索引
```typescript
type Person = { 
  age: number; 
  name: string; 
  alive: boolean 
};
type I1 = Person['age'|'name']  // type I1 = string | number
const i1:I1 = ''

type I2 = Person[keyof Person] // type I2 = string | number | boolean
const i2:I2 = ''

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName]; // type I3 = string | boolean
const i3:I3 = ''
                                 
```
+ 访问数组元组中的类型
```typescript
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

/**
 * type Person = {
 *   name: string;
 *   age: number;
 * }
 */
// 使用number获取数组元组的类型
// 获取数组中，由于索引是number，所以可以获取其元组的类型
type Person = typeof MyArray[number];

type Age = typeof MyArray[number]["age"]; // type Age = number

type Age2 = Person["age"]; // type Age2 = number

// 对于对象就只能获取其中具体的键值
const myObj = {
  name:{
    value:''
  }
}
type mo = typeof myObj['name']
```