# 泛型
+ 避免通用类型中的函数重载
+ 进行自动的类型推断
+ 支持`extends`泛型约束
```typescript
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```