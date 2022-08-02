# 枚举类型


以下枚举类型就是一个对象，当作为一个类型使用的时候，实际就是指其中某个值  
其是运行时存在的对象；
```typescript
enum UserResponse {
  No = 0,
  Yes = 1,
  z
}
 
function respond(recipient: string, message: UserResponse): UserResponse {
  // ...
  return UserResponse.No
}
respond('sss',UserResponse.No)
console.log(UserResponse)
```

+ 编译时的枚举