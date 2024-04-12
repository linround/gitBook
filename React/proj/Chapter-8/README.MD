# createContext
```javascript
const MyContext = React.createContext({
    value:'myContext'
  });
```

可以直接使用 `useContext` 获取 `MyContext` 的值；结合 `MyContext.Provider`，可以实现对 `MyContext` 值的更改。

