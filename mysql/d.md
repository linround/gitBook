# MYSQL-1 
- 表：数据存储在称为表的数据库对象中
- 字段：每个表被分解为称为字段（也叫列）
- 记录：记录也称为行数据，它是表中存在的每个单独数据项
- 列：包含表中特定字段关联的所有信息
- null值
- sql约束
  - `NOT NULL约束`
  - `默认值约束`
  - `唯一约束`
  - `主键` 唯一标识数据库表中的每一行记录
  - `外键` 唯一标识任何其他数据库表中的行记录
  - `检查约束` 约束确保列中所有值都满足特定条件
  - `索引` 用于快速地从数据库创建和检索数据

- 数据完整性
  - 实体完整性 表中没有重复的行
  - 域完整性 通过限制值的类型、格式、、范围，为给定列强制执行有效条目
  - 参照完整性 其他记录使用导致这些行无法删除。
  - 用户定义的完整性 实施一些不属于实体，域或参照完整性的特定业务规则。

- 数据库范式都是在数据库中有效组织数据的过程
  - 消除冗余数据（例如，将相同的数据存储在多个表中）
  - 确保数据依赖性是有意义的


- 特俗的运算符
  - `=`检查两个操作数的值是否相等，如果相等，则条件为`true`
  - `!=`检查两个操作数的值是否相等，如果值不相等，则条件为`true`
  - `<>`检查两个操作数的值是否相等，如果值不相等，则条件为`true`
  - `!<`检查左操作数的值是否不小于右操作数的值，
  - `!>` 检查左操作数的值是否不大于右操作数
- 特殊的逻辑运算符
  - `ALL` 用于将值与另一个`值集`中的所有值进行比较
  - `ANY` 用于根据条件将值与列表中的任何适用值进行比较
  - `between` 搜索在给定最小值和最大值内的值
  - `exists` 运算符用于搜索指定表中是否存在满足特定条件的`行`
  - `in`用于将值与已指定的文字值列表进行比较
  - `unique` 搜索指定表的每一行的唯一性（无重复项）




### 外键相关（FOREIGN KEY）
- 创建countries表，countries表中的region_id与regions表中的region_id相关联，同时更新级联和删除级联；
```sql
CREATE TABLE countries (
    country_id CHAR (2) PRIMARY KEY,
    country_name VARCHAR (40) DEFAULT NULL,
    region_id INT (11) NOT NULL,
    FOREIGN KEY (region_id) REFERENCES regions (region_id) ON DELETE CASCADE ON UPDATE CASCADE
);
```
- avg,sum,count，可以执行所谓的针对表或特定表列的聚合数据计算

### 表相关
- 临时表可以在运行时创建，像普通表一样执行各种操作
  - 局部临时变量表仅在当前连接可用。当用户与实例断开连接时，他会自动删除；以哈希（#）符号开头
  - 全局临时变量表以双哈希（##）开头，创建之后，它就像一个永久表，始终为所有用户准备好
- 清空表数据
  - > truncate table students   
- 更新数据；update指定表、set指定更新的列、where指定更新的行
- 删除数据，where子句中含有主键表达式，因此delete语句通常只会删除一行
- where用于指定条件过滤数据
- order by 用于对结果进行排序
  - ESC 升序
  - desc 降序
- limit 用于限制返回行
- join用于查询来自多个相关表的数据
- group by 用于根据一列或多列对数据进行分组
- having 用于过滤分组


- null再sql中是一个特别的值，无法与任何值进行比较（包括自身）；通常，distinct将所有Null值视为相同的值；
- 子句嵌套示例
```gotemplate

select
    employee_id,first_name,last_name,salary
from
    employees e
where
    salary = ( select distinct
                    salary
                from
                    employees e2
                order by salary desc
                limit 1,1)
```


- offset fetch子句用于在开始返回任何行之前跳过结果集中的前N行
- and运算符的短路功能
  - `1=0and 1=1` ,左侧部分`1=0`返回false,导致整个条件返回false，从而不管右侧部分条件的结果；
  - 短路功能可以减少cpu的计算时间，并且再某些情况下防止运行是错误
  - `1 = 0 AND 1/0` 如果数据库系统支持短路功能，则不会评估导致除零错误的表达式(1/0)的右侧部分。
  - 在数据库支持短路功能的情况下，只要一个表达式为真，or运算符就会停止评估条件的其余部分

- between 和 not between
  -  BETWEEN运算符需要低值和高值。 当从用户那里获得输入时，在将其传递给查询之前，应始终检查低值是否小于高值。 如果低值大于高值，将得到一个空的结果集

- [注意sql的时间转换](https://www.yiibai.com/sql/sql-between.html#article-start)

- LIKE运算符
  - like 'ab%'； 匹配以ab开始的字符串
  - like '%ab'； 匹配以ab结尾的字符串
  - like '%ab%'； 匹配包含ab的字符串
  - like 'ab_'； 匹配以ab开始,后面只有一个字符；例如 'abc'（一个下划线代表一个字符，两个下划线代表两个字符）
  - like '_ab'； 匹配以ab结尾，后面只有一个字符；例如 'cab'
  - like '%ab_'； 匹配包含ab，以任意数量字符串开头，最多以一个字符结尾
  - like '_ab%'； 匹配包含ab，最多以一个字符开头，以任意数量字符串结尾


- NOT运算符
  - and not
  - not in
  - not like
  - not between
- Having 引用别名；where引用表字段名
- inner join 取两个表之间的交集   
inner join子句可以连接多个表，只要它们具有关系；通常是外键关系；相当于取笛卡尔积的交集部分
```text

-- 使用内部连接将员工和部门信息连接起来
-- 对连接后的表使用where子句进行筛选

select 
	e.first_name ,
	e.last_name ,
	e.department_id ,
	d.department_id ,
	d.department_name 
from 
	employees e 
		inner join
			departments d on d.department_id  = e.department_id 
where
	e.department_id in(1,2,3)
```

```text

-- 每个员工都有一个岗位，而一个岗位可能会有多个员工。
-- 连接三个表 员工、部门、工作岗位
-- 以员工为基准
-- 首先与现有部门左连接 得到了新的员工部门表
-- 再将这个链接后的表 与工作岗位做连接
-- 得到员工的部门、工作信息
select 
	e.first_name ,j.job_title ,d.department_name 
from 
	employees e 
	inner join departments d on d.department_id =e.department_id 
	inner join jobs j on j.job_id =e.job_id 
where 
	e.department_id in(1,2,3)
```
- left inner  ，[以左表为基准与右表根据条件构建新表，最终根据条件都得到对应的结果](https://blog.csdn.net/Li_Jian_Hui_/article/details/105801454#:~:text=left%20join%E5%B7%A6%E8%BF%9E%E6%8E%A5%EF%BC%8C%E6%98%AF,%E8%A1%8C%E6%95%B0%E5%A4%9A%E3%80%82%20...)




- cross join 交叉连接（生成笛卡尔积）
- 表的自连接
```text
-- 在employee表中，manager_id列指定了员工的经理
-- 以下语句将employees表连接到自身，来查询每位员工的上级经理信息

select
	concat(e.first_name,'  ',e.last_name) as employee ,
	concat(m.first_name,'  ',m.last_name) as manager 
from 
	employees e 
		inner join
		employees m on m.employee_id =e.manager_id 
order by manager
```
- using的用法是on的一种特殊用法，正好两个表的字段名相同
```text
-- round(x,d)  ，x指要处理的数，d是指保留几位小数
select 
	d.department_name,round( avg(salary),1)  avg_salary
from 
	employees e 
	inner join 
	departments d using (department_id)
group by department_name
```
