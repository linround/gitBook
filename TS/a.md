# 关于`is`


要定义用户定义的类型保护，只需要定义一个返回类型为类型谓词的函数

```typescript
type Dice = 1 | 2 | 3 | 4 | 5 | 6

function pipsAreValid(pips: number|false): pips is Dice {
    return (
        pips === 1 ||
        pips === 2 ||
        pips === 3 ||
        pips === 4 ||
        pips === 5 ||
        pips === 6
    )
}

function test(count:number) {
    if(pipsAreValid(count)){
        switch (count){
            case 6:
                console.log('ok')
                break
            case 70:
                console.log('error')
                break
        }
    }
}
```
`pips is Dice` 是这个例子中的类型谓词;   
在`test`函数中，在编译阶段就会出现错误，以上通过类型谓词从而确定了用户输入的值的具体范围；
如果以上类型谓词只是一个`Boolean`,那么就没有办法在`test`函数中来缩小该类型的范围；