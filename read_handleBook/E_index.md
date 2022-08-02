# 代码优化


## `typeof`类型守卫
原因：当我们数据是一个联合类型，且其可能为null值，这个时候如果用迭代器
去迭代null值，ts会自动识别出来。所以，在ts中，这是一种很严格的类类型守卫，从而帮助我们去做更合理的控制语句；
```typescript
function printAll(strs: string | string[] | null) {
    if (typeof strs === "object") {
        for (const s of strs) {
            // Object is possibly 'null'.
            console.log(s);
        }
    } else if (typeof strs === "string") {
        console.log(strs);
    } else {
        // do nothing
    }
}
```
使用`typeof`会返回特定的字符串"string"、
"number"、
"bigint"、
"boolean"、
"symbol"、
"undefined"、
"object"、
"function"；   

在ts中，使用typeof检查返回的值是一种类型保护；因为ts中编码了typeof对于不同值的操作方式；也就是说
ts中能够识别出特殊的情况，因为`null`值也会返回"object";

## 真实性缩小
使用诸如！，&&，||，等语句进行缩小范围：
````typescript
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
````

代码优化方面：以下代码存在的问题,strs有四种可能存在的类型，在下面的写法中，
其实是无法处理空字符串的这种情况的；
```typescript
function printAll(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}
```

优化后：
```typescript
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

