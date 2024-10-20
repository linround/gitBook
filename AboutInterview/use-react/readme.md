# 使用react 编写代码
记录react的使用方法
## 附录
- https://react.dev/learn
- https://javascript.info/operators#string-concatenation-with-binary
# 位运算符
```text
AND ( & )
OR ( | )
XOR ( ^ )
NOT ( ~ )
LEFT SHIFT ( << )
RIGHT SHIFT ( >> )
ZERO-FILL RIGHT SHIFT ( >>> )
```
### ZERO-FILL RIGHT SHIFT 
无符号右移运算符（>>>）（零填充右移）将左操作数计算为无符号数，并将该数字的二进制表示形式移位为右操作数指定的位数，取模 32。向右移动的多余位将被丢弃，零位从左移入。其符号位变为 0，因此结果始终为非负数。与其他按位运算符不同，零填充右移返回一个无符号 32 位整数。
```javascript
const a = 5; //  00000000000000000000000000000101
const b = 2; //  00000000000000000000000000000010
const c = -5; //  11111111111111111111111111111011

console.log(a >>> b); //  00000000000000000000000000000001
// Expected output: 1

console.log(c >>> b); //  00111111111111111111111111111110
// Expected output: 1073741822
```

## 类型转换
```text
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
```
1. "" + 1 相加，将 1 转换为字符串："" + 1 = "1"，然后我们得到 "1" + 0，应用相同的规则
2.  减法 - （像大多数数学操作一样）仅与数字一起使用，它将一个空字符串“”转换为0
3. 字符串加法将数字 5 附加到字符串后
4. 减法总是转换为数字，因此它使“-9”成为数字-9（忽略它周围的空格）
5. 数值转换后 null 变为 0
6. undefined 在数值转换后变为 NaN。

## React 中常见的 `Api`
- useMemo
- useCallback
- useState
- createContext
- useContext
- useEffect
- useRef
- createRef
- forwardRef
- useMemo
- useSyncExternalStore
- useEffectEvent
- createRef


### 优化
- 缓存
> useMemo

### react 常见的工具api
- useImmer

### useEffect

#### 自定义钩子



- 仅从 Effects 内部调用它们。

- 切勿将它们传递给其他组件或 Hook  
当您不确定某些代码是否应该在 Effect 中还是在事件处理程序中时，问问自己为什么需要运行这段代码

当您选择是否将某些逻辑放入事件处理程序或效果中时，您需要回答的主要问题是从用户的角度来看它是什么样的逻辑。如果此逻辑是由特定交互引起的，请将其保留在事件处理程序中。如果是由于用户看到屏幕上的组件引起的，请将其保留在 Effect

尽量忽略链式调用，将链式调用的逻辑放在自己的事件中，而不是使用effect去触发。

- 避免条件竞争

- 结论
> - 如果您可以在渲染期间计算某些内容，则不需要效果。

> - 要缓存昂贵的计算，请添加 useMemo 而不是 useEffect。

> - 要重置整个组件树的状态，请将不同的密钥传递给它。

> - 要重置特定的状态位以响应道具更改，请在渲染期间设置它。

> - 因为显示组件而运行的代码应该在效果中，其余的应该在事件中。

> - 如果您需要更新多个组件的状态，最好在单个事件期间执行此操作。

> - 每当您尝试同步不同组件中的状态变量时，请考虑提升状态。

> - 您可以使用 Effects 获取数据，但需要实施清理以避免竞争条件
#### 数据订阅
有时，您的组件可能需要订阅 React 状态之外的某些数据。该数据可能来自第三方库或内置浏览器 API。由于这些数据可能会在 React 不知情的情况下发生变化，因此您需要手动订阅组件


#### useEffect 的 生命周期

```javascript
function useOnlineStatus() {
  // Not ideal: Manual store subscription in an Effect
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine);
    }

    updateState();

    window.addEventListener('online', updateState);
    window.addEventListener('offline', updateState);
    return () => {
      window.removeEventListener('online', updateState);
      window.removeEventListener('offline', updateState);
    };
  }, []);
  return isOnline;
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```


- 缓存
- 事件之间的逻辑共享


  当你更新状态时，React 将首先调用你的组件函数来计算屏幕上应该显示的内容。然后 React 会将这些更改“提交”到 DOM，从而更新屏幕。然后 React 将运行你的 Effects；
在一开始渲染时会执行第一个函数；在更新渲染时会执行第一个函数，同时执行上一次渲染时第一个函数的返回函数；（待验证）
### useRef
React 在重新渲染之间保留引用。然而，设置状态会重新渲染组件。更改引用不会;   
您可以使用 refs 来存储超时 ID、DOM 元素和其他不影响组件渲染输出的对象;
- 使用场景
> 想要组建记录一些信息，但是不想这个信息触发 render 函数，就可以使用useRef
### useState
以下代码 点击`+3` 和`+1`的结果一致；
>  设置状态请求新的重新渲染，但不会在已经运行的代码中更改它。因此，在调用 setScore(score + 1) 后，score 仍然为 0 ;   
> 设置状态只会在下一次渲染时更改它。在第一次渲染期间，number 为 0。这就是为什么在该渲染的 onClick 处理程序中，即使调用 setNumber(number + 1) 后，number 的值仍然为 0
```javascript
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState({value:9});

  function increment() {
    setScore({value:score.value + 1});
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Score: {score.value}</h1>
    </>
  )
}

```


#### 修复方案如下：  
> 通过在设置状态时传递更新程序函数来解决此问题。请注意如何用 setScore(s => s + 1) 替换 setScore(score + 1) 来修复“+3”按钮。这使您可以对多个状态更新进行排队


```javascript
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(s => s + 1);
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Score: {score}</h1>
    </>
  )
}

```
## pure Component
纯静态组件，只负责渲染，不会改变任何数据；输入什么数据，页面就输出什么数据；
## react 的渲染过程
1. 触发渲染
2. 渲染组件
3. 提交组件的真实DOM节点
### 触发渲染的条件
1. 组件初始渲染
2. 组件 或者其祖先 的状态发生更新

## 状态管理
1. 避免冗余和重复的状态
