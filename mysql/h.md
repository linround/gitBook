# 数据库的安全性
## DBMS的安全机制
- 自主安全性机制：存取控制
  - 通过权限在用户之间的传递，使用户自主管理数据库安全性 
- 强制安全性机制
  - 通过对数据和用户强制分类，使得不同的用户类别能够访问不同类别的数量
- 推断控制机制
  - 防止通过历史信息，公开信息，从而推断出私密信息
- 数据加密存储
> DBMS将权利和用户结合在一起，形成一个访问规则表，一句该规则表可以实现对数据库的安全性控制；
> - s：请求主题
> - q：访问对象
> - t：访问权力
> - p：谓词  

`s`用户对`o`的的访问对象，在满足`p`的条件下，具有`t`的权力；

## 视图
- 视图是安全性控制的重要手段
- 通过视图可以限制用户对关系中某些数据的存储
- 通过视图可以将数据访问对象与谓词结合，限制用户对某些元组的存储
- 用户定义视图后，视图便称为以新的数据对象，参与存储矩阵

## 关系级别
- 级别1；读 （`select`）
- 级别2；modify(增、删、改，对数据的操作)
- 级别3；create，drop,alter(对表的操作)
> - 使用`GRANT`来授予用户权力
> - 使用`REVOKE`收回授权命令

## 授权过程
- DBA创建DB，为每个用户创建一个账户
- DBA授予某个用户账户级别的权力
- 具有庄户级别的用户可以创建基本表或视图，他也自动成为该表或该视图的属主账户，拥有该表或该视图的所有访问权利；

## 强制安全性机制
## 嵌入式SQL语言
## 事务
- 一个存取或改变数据库内容的程序的一次执行；或则说一条或多条SQL语句的一次执行被看作一个事务；
- 事务一般由应用程序员提出，因此有开始和结束，结束前需要提交或撤销
- 是数据库系统能够提供一致性状态转换的保证。（例如银行转账的事务）
- 事务原子性（要么全做，要么不做）
- 事务一致性
- 事务隔离性（dbms保证多个事务之间相互不受影响）
- 事务持久性
## 关于游标


## 动态sql  
高级语言==》嵌入式sql语句==》DBMS《==》DB
- 动态sql语句类似于编程，可以定义sql变量。两个特点
  - 动态sql语句的构造
  - 动态sql语句的执行

## 数据字典
数据字典通常存储的是数据库和表的元数据，即模式本身的信息；
- 用户域账户
- 统计与描述
- 物理文件组织信息
- 索引相关信息

### 数据字典与sqlDa
- sqlDa是一个内存数据结构，内可装在关系模式的定义信息，如列的数目，每一列的名字和类型等
- 不同dbms提供的sqlDa格式并不是一致的

### ODBC
- 应用程序调用odbc API时，odbcAPI会调用具体的DBMS Driver 库函数，DBMS Driver库函数则与数据库服务器通讯，执行相应的请求并返回检索结果
- 应用程序使用SQLExecDirect向数据库发生sql命令
- 使用sqlFetch获取产生的结果元组
- 使用sqlBindCol 绑定c语言变量与结果中的属性

> 基于ODBC和JDBC的数据库访问，类似于访问对象；使得对数据库的访问更加方便


- 关系数据库：
  - 面向对象数据库
  - xml数据库
  - Nosql数据库

## IDEF1x
> 使用结构图的方式来详细的描述模型；通过结构化的的图像来详细的描述模型实体之间的联系

- 实体
  - 独立实体
  - 从属实体
- 联系
  - 可标定(1对1 1对多  由1指向多)
  - 非标定
  - 分类联系
  - 非确定联系（多对多，需要引入相交实体）
- 属性
  - 主码
  - 候选码
  - 外来码
## 企业数据分析报告
- 企业的部门 岗位划分：不同岗位复制的各种日常
- 形成各种报表的基础数据
- 各种数据之间的处理关系
- 围绕数据表的业务处理关系
- 尚未实施但未来可能实施的需求
## 概念数据库的设计思路
- 先局部 后全局
- 先全局 后局部
## 局部ER图
- 确定局部范围
- 实体定义
- 联系定义
- 属性分配

## 全局ER图
- 在局部ER图的前提下
- 确定公共实体类型
- 合并两个局部ER模式
- 检查消除冲突
- 全局ER模式优化