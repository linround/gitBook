# memo

`memo` 可以让你在组建的props 不变时跳过重新渲染组件。

```javascript
memo(Component, compare)
```

- 用途
    - 当props 不变时跳过重新渲染
    - 使用state更新记忆组件
    - 使用 context 更新记忆组件
    - 最小化 props 变化
    - 可以定义比较函数
- 注意
  - 当props 是引用类型时，memo 会比较引用地址，而不是引用值。

## 使用
```javascript
memo(Component, compare)
```
使用memo 包裹一个组件，从而得到改组件的缓存版本。当该缓存组件的父组件被重新渲染时，只要props没有发生改变，
该缓存组件通常不会被渲染。

## 参数
- Component：需要被缓存的组件。
- compare：比较函数，用于比较新旧props是否相等。默认是浅比较。React 中使用Object.is()进行比较。

## 作用
### 跳过重新渲染，当props 没有发生改变时。
当父组件重新渲染时，子组件通常都会被重新渲染。使用 `memo`, 可以让子组件在props 没有发生改变时，跳过重新渲染。

将一个组件 `memo` 化。只需要使用 memo 将其包裹，然后用它返回的值代替原来的组件。
```javascript
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
```

在下面这个例子中。使用React.memo 时：Greetings 组件在name被改变时会重新渲染，在address 被改变时不会重现渲染。
未使用React.memo 时：Greetings 组件在name和address 被改变时都会重新渲染。
```javascript
function MyApp() {
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    return (
      <>
        <label>
          Name{': '}
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Address{': '}
          <input value={address} onChange={e => setAddress(e.target.value)} />
        </label>
        <Greeting name={name} />
      </>
    );
  }

  const Greeting = React.memo(function Greeting({ name }) {
    console.log("Greeting重复渲染", new Date().toLocaleTimeString());
    return <h3>Hello{name && ', '}{name}!</h3>;
  });

  const root = ReactDOM.createRoot(document.getElementById("root"))
  root.render(
    <MyApp />
  )
```
## 最小化 props 变化
为了更好的利用memo,应该尽可能减少props 变化。例如：如果 props是一个对象，就可以使用useMemo来防止父组件每次重新创建该对象。
```javascript
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  const person = useMemo(
    () => ({ name, age }),
    [name, age]
  );

  return <Profile person={person} />;
}

const Profile = memo(function Profile({ person }) {
  // ...
});
```
一种更好的方式就是让组件接收更加精确的props,例如接收两个私有值，而不是一个对象。
```javascript
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  return <Profile name={name} age={age} />;
}

const Profile = memo(function Profile({ name, age }) {
  // ...
});
```

## memo源码分析
