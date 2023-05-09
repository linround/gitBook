# 数据库相关-完整性
### 数据库完整性
##### 广义完整性
语义完整性、并发控制、安全控制、db故障恢复
#### 狭义完整性
专指语义完整性、

#### 为什么会引发数据库的完整性？
- 不正当的数据库操作，如输入错误，操作错误，程序处理错误

#### 如何定义数据库的完整性
- DBMS允许用户自定义一些完整性约束规则
- 当db更新操作时，DBMS自动按照完整性进行检查，以确保新操作符合语义完整性
#### 完整性约束规则（O,P,A,R）
- 数据集合；
  - 列、多列，元组集合
- 谓词条件：什么样的约束？
- 触发条件：什么时候检查？
- 响应动作：不满足是怎么办？
#### 约束种类
- 与完整性约束（单列）
- 关系完整性约束（多列），即表完整性约束
- 按约束状态分类
  - 静态约束
    - 列完整性--域完整性约束
    - 表完整性--关系完整性约束
  - 动态约束
    - 触发器 

    
## create table 
- 定义关系模式、定义完整性、定义物理存储特性
- 定义完整性约束
  - 列完整性
  - 表完整性

### 列约束
- not null
- 为约束命名
- unique 唯一性约束
- 主键约束
- check 约束
- 外键约束（另外一个table的主键）
- 级联约束（关联性删除，更新）
### 表约束
- unique 几列的唯一性
- primary key: 几列联合为主键
- check:元组多列满足条件
- foreign key 外键 
- 级联约束


#### 触发器
当某一件事发生是，对该事件产生的结果（或是每一元组，或整个操作的所有元组）；如果满足条件，则执行后面的操作；