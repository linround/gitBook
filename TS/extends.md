# extends
- 继承接口
```typescript
interface m {
  test:string
}
interface n extends m {}
let mm:m = {
  test:''
}
```
- 类型判断
  - 使用`any`推断出联合类型  


  ![img.png](img.png)
  - 使用类型准确推断
  ![img_1.png](img_1.png)
  - 使用`值`推断出联合类型
  ![img_2.png](img_2.png)
