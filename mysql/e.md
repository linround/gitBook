# sql 记录1
```text



--  插入一行数据 具有外键
-- INSERT INTO dependents  (
-- first_name,
-- last_name,
-- relationship,
-- employee_id
-- )VALUES('Max32','Su32','Child',104);




-- 

-- select 
-- *
-- from 
-- dependents d 
-- where 
-- employee_id = 176





-- 插入多行数据

-- INSERT INTO dependents (
--     first_name,
--     last_name,
--     relationship,
--     employee_id
-- )
-- VALUES
--     (
--         'Avg',
--         'Lee',
--         'Child',
--         192
--     ),
--     (
--         'Michelle',
--         'Lee',
--         'Child',
--         192
--     );



-- 
-- select *
-- from dependents d where employee_id =192;



-- create table dependents_archive (
--     dependent_id INT (11) AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR (50) NOT NULL,
--     last_name VARCHAR (50) NOT NULL,
--     relationship VARCHAR (25) NOT NULL,
--     employee_id INT (11) NOT NULL,
--     FOREIGN KEY (employee_id) REFERENCES employees (employee_id) ON DELETE CASCADE ON UPDATE CASCADE
-- );

--  复制表到另一个结构相同的表中
-- INSERT INTO dependents_archive 
-- SELECT
--     *
-- FROM
--     dependents;


-- select * from dependents_archive da ;





-- CREATE TABLE STUDENTS (  
--     ID INT NOT NULL,  
--     NAME VARCHAR (20) NOT NULL,  
--     AGE INT NOT NULL,  
--     ADDRESS CHAR (25),  
--     PRIMARY KEY (ID)  
-- );
-- 不需要指定名称直接插入
-- INSERT INTO STUDENTS 
-- VALUES (1, 'ABHIRAM', 22, 'ALLAHABAD');  
-- INSERT INTO STUDENTS
-- VALUES (2, 'ALKA', 20, 'GHAZIABAD');  
-- INSERT INTO STUDENTS
-- VALUES (3, 'DISHA', 21, 'VARANASI');  
-- INSERT INTO STUDENTS
-- VALUES (4, 'ESHA', 21, 'DELHI');  
-- INSERT INTO STUDENTS
-- VALUES (5, 'MANMEET', 23, 'JALANDHAR');
-- 
-- 

-- 清理表
-- truncate table students  

-- 只插入对应列

-- select first_name, last_name from employees e where employee_id =192;

-- update employees 
-- set 
-- last_name = 'zhang'
-- where 
-- employee_id =192;

--  select first_name, last_name from employees e where employee_id =192;

-- 工资小于3000的
-- select 
-- employee_id,first_name,last_name,salary
-- from employees e 
-- where salary <3000

-- 更新工资小于3000的
-- update employees 
-- set salary = 3000
-- where salary <3000;









-- 用最新数据来更新客户表
-- 使用客户ID上的连接在目标和源表之间执行连接

-- CREATE TABLE table1 (column1 INT, column2 INT, column3 VARCHAR (100));
-- INSERT INTO table1 (column1, column2, column3)
-- SELECT 1, 11, 'FIRST'  
-- UNION ALL  
-- SELECT 11,12, 'SECOND'  
-- UNION ALL   
-- SELECT 21, 13, 'THIRD'  
-- UNION ALL   
-- SELECT 31, 14, 'FOURTH';


-- CREATE TABLE table2 (column1 INT, column2 INT, column3 VARCHAR (100));
-- INSERT INTO table2 (column1, column2, column3)
-- SELECT 1, 21, 'TWO-ONE'  
-- UNION ALL  
-- SELECT 11, 22, 'TWO-TWO'  
-- UNION ALL   
-- SELECT 21, 23, 'TWO-THREE'  
-- UNION ALL   
-- SELECT 31, 24, 'TWO-FOUR';






-- 使用join来连接表，同时更新目标表
-- 将t1中的值更新为t2中的column1为21，31行的值 
-- update table1 t1
-- left join table2 t2
-- on t1.column1 = t2.column1 
-- set t1.column2 = t2.column2,
-- t1.column3 =t2.column3 
-- -- 使用where来限制，只更新t1中column1为21，31的
-- where t2.column1 in (21,31);

--
-- select * from dependents d where dependent_id = 16 
--  where子句中含有主键表达式
-- delete from dependents d where dependent_id =16



-- 删除多行

-- delete from dependents 
-- where employee_id  in (100,101,102)
-- select * from dependents d where employee_id  in (100,101,102) 


-- 插叙表中所有的列
-- select * from employees e 
-- 查询特定列
-- select employee_id,first_name,last_name from employees e 

-- 计算员工的服务年份
-- select
-- 	employee_id,
-- 	first_name,
-- 	last_name,
-- 	FLOOR(DATEDIFF(now(),hire_date)/365) as yos
-- from 
-- 	employees;







-- order by子句
-- 将员工按名字first_name升序排序，再按姓氏last_name降序排序；
-- select 
-- 	employee_id,
-- 	first_name,
-- 	last_name,
-- 	hire_date,
-- 	salary
-- from 
-- 	employees e 
-- order by
-- 	first_name ,
-- 	last_name desc;



-- 主键确保表中没有重复的行
-- 当使用selecte语句查询表中的一部分的时候，可能会得到重复的数据项
-- 使用distinct从结果集中删除重复项
-- DEMO1
-- select distinct  salary from employees e order by salary DESC
-- DEMO2
-- select distinct 
-- 	job_id,
-- 	salary 
-- from
-- 	employees e 
-- order by
-- 	job_id ,
-- 	salary desc 




-- 
-- 
-- select distinct 
-- 	phone_number
-- from
-- 	employees e 








-- select
-- 	employee_id,first_name,last_name
-- from 
-- 	employees e 
-- order by
-- -- 根据first_name进行排序
-- 	first_name 
-- 	 先跳过前 3行 取前5个
-- limit 5 offset 3; 








-- 获取工资最高的前五个
-- 先根据工资进行降序排序，再去前五个
-- select 
-- 	salary
-- from
-- 	employees e 
-- order by
-- 	salary desc 
-- limit 5;









-- 得到公司薪水第二高的员工
-- 按照之前的思路，按工资对员工进行降序排序 跳过第一个去第二个，再两名员工薪水相同的情况下，会不满足我们的需

-- 结合distinct来取


-- select distinct 
-- 	salary
-- from
-- 	employees e 
-- order by salary desc
-- --  也可写作  limit 1 offset 1 
-- limit 1 , 1 





-- 使用子句来查询第二低的薪水的员工的信息
-- 
-- select
-- 	employee_id,first_name,last_name,salary
-- from
-- 	employees e 
-- where 
-- 	salary = ( select distinct  
-- 			salary 
-- 		from
-- 			employees e2 
-- 		order by salary desc 
-- 		limit 1,1
-- 		)








-- offset fetch子句用于在开始返回任何行之前跳过结果集中的前N行
-- 例如每个页面有十行，要获取前二十页的行，可以跳过前10行并返回接下来的10行




-- select 
-- 	employee_id,salary
-- from
-- 	employees e 
-- where 
-- 	salary > 14000
-- order by 
-- 	salary desc





-- select 
-- 	employee_id,first_name 
-- from
-- 	employees e 
-- where 
-- 	department_id =5
-- order by 
-- 	first_name 






-- select 
-- 	employee_id,last_name
-- from
-- 	employees e 
-- where 
-- 	last_name ='Zhang'



-- SELECT
--     employee_id, first_name, last_name, hire_date
-- FROM
--     employees
-- WHERE
--     hire_date >= '1999-01-01'
-- ORDER BY
--     hire_date DESC;













-- 查询1999年加入公司的员工
-- 三种方式
-- select 
-- 	employee_id,first_name,last_name,hire_date
-- from 
-- 	employees e 
-- where 
-- 	year (hire_date)=1999
-- order by 
-- 	hire_date desc 











-- desc employees 
-- 使用and运算符获取job_id 为9，且salary大于5000的数据
-- select
-- 	first_name,last_name,job_id,salary
-- from
-- 	employees e 
-- where 
-- 	job_id =9
-- and salary >5000









-- 找到1997到1998年之间加入公司的所有员工

-- select 
-- 	first_name,last_name,hire_date
-- from
-- 	employees e 
-- where 
-- 	year (hire_date)>=1997
-- and year (hire_date)<=1998









-- 查找1997或1998年加入公司的人
-- select 
-- 	first_name,last_name,hire_date
-- from
-- 	employees e 
-- where 
-- 	year (hire_date)=1997 
-- or 	year (hire_date)=1998
-- order by 
-- first_name ,
-- last_name desc;
















-- 查找1997或1998年加入公司并在部门id为3中工作的所有员工
-- select 
-- 	first_name,last_name,hire_date,department_id
-- from
-- 	employees e 
-- where 
-- 	department_id =3
-- and (
-- 	year (hire_date)=1997 
-- 	or 	year (hire_date)=1998
-- )
-- 
-- 
-- order by 
-- first_name ,
-- last_name desc;



-- 为了避免过多的使用or运算符
-- 使用in运算符替换or运算符
-- 查询再1990或1999或2000年加入公司的员工
-- select 
-- 	first_name,
-- 	last_name,
-- 	hire_date
-- from 
-- 	employees e 
-- where 
-- 	year (hire_date) in(1990,1999,2000)
-- order by 
-- 	hire_date 



-- between运算符与数字示例
-- select 
-- 	employee_id,first_name,last_name,salary
-- from
-- 	employees e 
-- where 
-- 	salary between 3000 and 6000;




-- 查找薪水不在2500和10000范围内的所有员工
-- select employee_id,first_name,last_name,salary
-- from
-- 	employees e 
-- where 
-- 	salary not between 3000 and 6000
-- order by salary 






-- 查找1999-01-01到2001-12-31之间加入公司的员工
-- 
-- select 
-- 	employee_id,first_name,last_name,hire_date
-- from 
-- 	employees e 
-- where 
-- 	hire_date between '1999-01-01' and '2001-12-31'
-- order by hire_date 



-- 低值大于高值，导致空值
-- SELECT 
--     first_name, last_name, salary
-- FROM
--     employees
-- WHERE
--     salary BETWEEN 5000 AND 2000;


-- 通过字符查找市场营销和it部门的id

-- select 
-- 	department_id
-- from 
-- 	departments d 
-- where 
-- 	department_name = '市场营销'
-- 	or department_name ='IT'

-- 嵌套子句
--  查找雇员信息

-- select 
-- 	employee_id,first_name,last_name,salary,department_id 
-- from 
-- 	employees e 
-- where 
-- 	department_id IN(
-- 			select 
-- 				department_id
-- 			from 
-- 				departments d 
-- 			where 
-- 				department_name = '市场营销'
-- 				or department_name ='IT'
-- 			)
-- 








-- 查找名字是以Sh开头的所有员工
-- select 
-- 	employee_id,
-- 	first_name,
-- 	last_name
-- from 
-- 	employees e 
-- where 
-- 	first_name like 'Sh%'



-- select 
-- 	employee_id,
-- 	first_name,
-- 	last_name
-- from 
-- 	employees e 
-- where 
-- 	first_name like '%na'









-- select 
-- 	employee_id,
-- 	first_name,
-- 	last_name
-- from 
-- 	employees e 
-- where 
-- 	first_name like '%en%'











-- 
-- select 
-- 	employee_id,
-- 	first_name,
-- 	last_name
-- from 
-- 	employees e 
-- where 
-- 	first_name like 'Jo__'











-- 查找名字以M开头，单不以Ma开头的员工
-- select 
-- 	employee_id,
-- 	first_name,
-- 	last_name
-- from 
-- 	employees e 
-- where 
-- 	first_name like 'M%'
-- 	and first_name not like 'Ma%'
-- order by 
-- 	first_name 





-- select 
-- 	 employee_id, first_name, last_name, phone_number
-- from
-- 	employees e 
-- where 
-- 	phone_number is not null 






-- 查找雇员所有的家人信息
-- SELECT
--             *
--         FROM
--             dependents d




-- 遍历所有雇员
-- 检测，在dependents表中不存在一项  其dependents.employee_id是雇员的employees.employee_id
--  检测没有家人的雇员，即检测所有雇员，是否与家人表人的某一个存在关联
-- SELECT
--     *
-- FROM
--     employees e
-- WHERE
--      not EXISTS (
--         SELECT
--             *
--         FROM
--             dependents d
--         WHERE
--             d.employee_id = e.employee_id
--     );







-- sql别名

-- select
-- 	count(employee_id) headcount
-- from
-- 	employees e 



-- 在select 子句之后评估的任何子句中使用列别名
-- 按照department_id 去统计对应department_id的phone_number个数
-- select
-- 	department_id,
-- 	count(phone_number) headcount
-- from
-- 	employees e 
-- group by
-- 	department_id 
-- having 
-- 	headcount =6
	





-- SELECT 
--     d.department_name, d.location_id 
-- FROM
--     departments AS d











-- 
-- --  以雇员表为基准 通过department_id连接两个表
-- -- 选取连接之后的 对应字段
-- SELECT
--     employee_id,
--     first_name,
--     last_name,
--     department_name,
--     location_id
-- FROM
--     employees e
-- INNER JOIN departments d ON d.department_id = e.department_id
-- ORDER BY
--     first_name;


-- 获取部门id为1，2，3的信息
-- select 
-- 		d.department_id ,d.department_name 
-- from departments d 
-- where 
-- 	department_id in(1,2,3)



-- 获取部门id为1，2，3的员工信息
-- select 
-- 	e.first_name ,
-- 	e.last_name ,
-- 	e.employee_id 
-- from 
-- 	employees e 
-- where 
-- 	department_id in(1,2,3)
-- order by 
-- 	department_id 

-- 
-- -- 使用内部连接将员工和部门信息连接起来
-- -- 对连接后的表使用where子句进行筛选
-- 
-- select 
-- 	e.first_name ,
-- 	e.last_name ,
-- 	e.department_id ,
-- 	d.department_id ,
-- 	d.department_name 
-- from 
-- 	employees e 
-- 		inner join
-- 			departments d on d.department_id  = e.department_id 
-- where
-- 	e.department_id in(1,2,3)











-- 每个员工都有一个岗位，而一个岗位可能会有多个员工。
-- 连接三个表 员工、部门、工作岗位
-- 以员工为基准
-- 首先与现有部门左连接 得到了新的员工部门表
-- 再将这个链接后的表 与工作岗位做连接
-- 得到员工的部门、工作信息
-- select 
-- 	e.first_name ,j.job_title ,d.department_name 
-- from 
-- 	employees e 
-- 	inner join departments d on d.department_id =e.department_id 
-- 	inner join jobs j on j.job_id =e.job_id 
-- where 
-- 	e.department_id in(1,2,3)
















-- 每个地点属于一个且仅属于一个国家/地区，而每个国家地区可以具有多个零点或多个地点。
-- 国家和地区之间是1对多的关系

-- 检索美国，英国，中国的信息
-- select 
-- 	c.country_id ,
-- 	c.country_name 
-- from 
-- 	countries c 
-- where 
-- 	country_id in ('US','UK','CN')
-- 

-- 检索位于美国、英国、中国的地点
-- select 
-- 	l.country_id ,
-- 	l.street_address ,
-- 	l.city 
-- from 
-- 	locations l 
-- where 
-- 	country_id in('us','uk','cn')


	
-- 	使用left join 子句进行连接
-- 	select
-- 		c.country_name ,c.country_id ,l.street_address ,l.city 
-- 	from 
-- 		countries c 
-- 			left join locations l on l.country_id = c.country_id 
-- 	where 
-- 		c.country_id in ('us','uk','cn')


-- 查询街道中表中没国家/地区的地点
-- 以国家表为基准
-- 与地区表建立连接
-- 使用left join 得到国家对应的地区
-- 最终筛选出没有地区的国家
-- 最终得到
-- select 
-- 	c.country_name ,l.location_id 
-- from 
-- 	countries c 
-- left join locations l on l.country_id  = c.country_id 
-- where 
-- 	l.location_id is null 
-- order by c.country_name 



-- 一个国家可能有零个或多个国家，每个国家都位于一个地区
-- 国家和地区之间是一对多的
-- 地点和国家之间是多对1的


-- 
-- select 
-- 	r.region_name  ,
-- 	c.country_name ,
-- 	l.street_address ,
-- 	l.city 
-- from 
-- 	regions r 
-- 	left join countries c on c.region_id = r.region_id 
-- 	left join locations l on l.country_id =c.country_id 
-- 	where 
-- 		c.country_id in('us','uk','cn')





-- CREATE TABLE fruits (
--     fruit_id INTEGER PRIMARY KEY,
--     fruit_name VARCHAR (255) NOT NULL,
--     basket_id INTEGER
-- );
-- CREATE TABLE baskets (
--     basket_id INTEGER PRIMARY KEY,
--     basket_name VARCHAR (255) NOT NULL
-- );
-- 插入数据1
-- INSERT INTO baskets (basket_id, basket_name)
-- VALUES
--     (1, 'A'),
--     (2, 'B'),
--     (3, 'C');
-- 
-- -- 插入数据2
-- INSERT INTO fruits (
--     fruit_id,
--     fruit_name,
--     basket_id
-- )
-- VALUES
--     (1, 'Apple', 1),
--     (2, 'Orange', 1),
--     (3, 'Banana', 2),
--     (4, 'Strawberry', NULL);

-- SELECT
--     basket_name,
--     fruit_name
-- FROM
--     fruits
--  left outer JOIN baskets ON baskets.basket_id = fruits.basket_id
-- UNION
-- 	SELECT
--     basket_name,
--     fruit_name
-- FROM
--     fruits
--  right outer JOIN baskets ON baskets.basket_id = fruits.basket_id;
-- 
-- 






-- 创建表1 销售组织
-- CREATE TABLE sales_organization (
--     sales_org_id INT PRIMARY KEY,
--     sales_org VARCHAR (255)
-- );
-- 
-- -- 创建表2 销售渠道
-- CREATE TABLE sales_channel (
--     channel_id INT PRIMARY KEY,
--     channel VARCHAR (255)
-- );


-- 插入销售组织
-- INSERT INTO sales_organization (sales_org_id, sales_org)
-- VALUES
--     (1, 'Domestic'),
--     (2, 'Export');

--  插入销售渠道
-- INSERT INTO sales_channel (channel_id, channel)
-- VALUES
--     (1, 'Wholesale'),
--     (2, 'Retail'),
--     (3, 'eCommerce'),
--     (4, 'TV Shopping');


-- 查找小搜组织可以拥有的所有可能的销售渠道

-- select 
-- 	so.sales_org ,
-- 	sc.channel 
-- from 
-- 	sales_organization so 
-- 	cross join sales_channel sc 


-- 在employee表中，manager_id列指定了员工的经理
-- 以下语句将employees表连接到自身，来查询每位员工的上级经理信息

-- select
-- 	concat(e.first_name,'  ',e.last_name) as employee ,
-- 	concat(m.first_name,'  ',m.last_name) as manager 
-- from 
-- 	employees e 
-- 		inner join
-- 		employees m on m.employee_id =e.manager_id 
-- order by manager



-- round(x,d)  ，x指要处理的数，d是指保留几位小数
-- 计算每个部门的员工平均工资
-- 首先员工以部门分组
-- 在计算部门的评价薪水
-- select 
-- 	d.department_name,round( avg(salary),1) as  avg_salary
-- from 
-- 	employees e 
-- 	inner join 
-- 	departments d using (department_id)
-- group by department_name

-- 找出部门最低工资
-- select 
-- 	d.department_name, round( min(salary),1) as  avg_salary
-- from 
-- 	employees e 
-- 	inner join 
-- 	departments d using (department_id)
-- group by department_name








-- 每个部门员工最高薪水
-- select 
-- 	d.department_name, round( max(e.salary),1) as  avg_salary
-- from 
-- 	employees e 
-- 	inner join 
-- 	departments d using (department_id)
-- group by department_name
-- order by department_name




-- 返回每个部门的人数

-- select 
-- 	d.department_name, round( count(*) ,1) as  avg_salary
-- from 
-- 	employees e 
-- 	inner join 
-- 	departments d using (department_id)
-- group by department_name
-- order by department_name


-- 返回所有值的总和
-- select 
-- 	d.department_name ,d.department_id , round( sum(salary) ,1) as  avg_salary,sum(job_id) as sj
-- from 
-- 	employees e 
-- 	inner join 
-- 	departments d using (department_id)
-- group by department_id 
-- order by department_id 

-- desc employees 

-- 选取工资列  去重 计算平均 取小数点后一位
-- select 
-- 	round(avg(distinct  salary) ,1) av_salary  
-- from 
-- 	employees e 









--  计算job_id为6的平均值
-- select
-- 	avg(	salary ) 
-- from 
-- 	employees e 
-- where job_id =6




-- 
-- 分组再计算平均值
-- select 
-- 	e.department_id ,
-- 	avg(salary) avg_salary 
-- from 
-- 	employees e 
-- group by
-- 	department_id 


-- 首先连接两个表
-- 在使用部门进行分组
-- 最后计算分组的平均工资
-- 选取平均工资小于5000的
-- 使用平均工资进行升序排序
-- select 
-- 	e.department_id  ,
-- 	d.department_name,
-- 	round(avg(salary),0)  avg_salary
-- from 
-- 	employees e 
-- inner join 
-- 	departments d on d.department_id =e.department_id 
-- group by 
-- 	e.department_id 
-- having avg_salary<5000 
-- order by
-- 	avg_salary





-- 再sql中应用多次avg函数来计算一组平均值的平均值
-- 先计算部门员工的平均工资
-- 再根据部门员工的平均工资，计算每个部门的平均工资

--  查询语句原理
-- 子查询返回每个部门的一组员工平均工资
-- 外部查询返回部门的平均工资
-- select 
-- 	round(avg(employee_sal_avg))
-- from 
-- 	(	
-- 		select 
-- 			avg(salary) employee_sal_avg
-- 		from 
-- 			employees e 
-- 		group by department_id 
-- 	) d








-- 获取员工表中的函数
-- select 
-- 	count(*)
-- from
-- 	employees e 


-- 统计部门为6的员工数目
-- select
-- 	count(*)
-- from 
-- 	employees e 
-- where 
-- 	department_id = 6




-- 结合groupby,统计每个部门的员工数目
-- select 
-- 	department_id ,
-- 	COUNT(*)
-- from 
-- 	employees e 
-- group by
-- 	department_id 






-- 将员工表和部门表通过department_id进行连接
-- 再使用department_id进行分组
-- 统计每个组的数量
-- 选取数量大于5的部分
-- 使用数量进行升序排序
-- select 
-- 	department_id ,
-- 	department_name,
-- 	count(*) as count_value
-- from 
-- 	employees e
-- 		inner join departments d using(department_id)
-- group by
-- 	department_id 
-- having 
-- 	count_value > 5
-- order by 
-- 	count_value











-- 获取员工的工作岗位数
-- select 
-- 	count(distinct  job_id) 
-- from 
-- 	employees e 










-- max函数
-- 取薪水最高的员工信息
-- select
-- 	e.employee_id ,
-- 	e.first_name ,
-- 	e.last_name ,
-- 	salary 
-- from 
-- 	employees e 
-- where 
-- 	salary = (
-- 	
-- 		select 
-- 			max(salary)
-- 		from
-- 			employees e 
-- 	)
	




-- 集合groupby 使用部门进行分组  
-- 取每个分组中salary最大的值

-- select
-- 	department_id ,
-- 	max(salary) 
-- from 
-- 	employees e 
-- group by
-- 	department_id 




-- 连接两张表
-- 再使用部门进行分组
-- 取每个分组中薪水最高的值
-- 挑选薪水大于12000的组
-- 最终基于薪水进行排序

-- select 
-- 	d.department_id ,
-- 	d.department_name,
-- 	max(salary) max_sal 
-- from 
-- 	employees e 
-- 	inner join departments d using(department_id)
-- group by
-- 	e.department_id 
-- having max_sal >12000
-- order by 
-- 	max_sal desc






-- min函数
-- 员工表和部门表进行连接
-- 通过部门进行分组
-- 选取每组中的最低薪资
-- 挑选出最低薪资小于7000的组
-- 基于最低薪资进行降序排序
-- select
-- 	e.department_id ,
-- 	d.department_name ,
-- 	min(salary) min_sal
-- from 
-- 	employees e 
-- 		inner join departments d using(department_id)
-- group by department_id
-- having min_sal<7000
-- order by min_sal desc




-- 统计 每个部门的工资总和和人数
-- 选取工资总和大于50000的部门
-- 然后按照工资总和进行降序排序
-- select
-- 	e.department_id ,
-- 	d.department_name,
-- 	count(*) headcount,
-- 	sum(salary) sum_sal
-- from 
-- 	employees e 
-- 	inner join departments d using(department_id)
-- group by
-- 	department_id 
-- having sum_sal > 30000
-- order by sum_sal desc



-- 使用group by 子句而不使用聚合函数
-- 其行为类似distinct

-- select 
-- 	phone_number
-- from
-- 	employees e 
-- group by phone_number 




-- 获取经理及其下属员工数量
-- 首先获取有经理的员工
-- 通过每个员工的经理进行分类
-- 使用聚合函数count统计每个经理下的员工数目
-- 再得到员工数大于3的经理

-- SELECT 
--     manager_id,
--     count(employee_id) employee_id_2 
-- FROM
--     employees
-- WHERE
--     manager_id IS NOT null
-- group by manager_id   
-- having employee_id_2 > 3
 




-- CREATE TABLE inventory (
--     warehouse VARCHAR(255),
--     product VARCHAR(255) NOT NULL,
--     model VARCHAR(50) NOT NULL,
--     quantity INT,
--     PRIMARY KEY (warehouse,product,model)
-- );





-- INSERT INTO inventory(warehouse, product, model, quantity)
-- VALUES('San Jose', 'iPhone','6s',100);
-- INSERT INTO inventory(warehouse, product, model, quantity)
-- VALUES('San Fransisco', 'iPhone','6s',50);
-- INSERT INTO inventory(warehouse, product, model, quantity)
-- VALUES('San Jose','iPhone','7',50);
-- INSERT INTO inventory(warehouse, product, model, quantity)
-- VALUES('San Fransisco', 'iPhone','7',10);
-- INSERT INTO inventory(warehouse, product, model, quantity)
-- VALUES('San Jose','iPhone','X',150);
-- INSERT INTO inventory(warehouse, product, model, quantity)
-- VALUES('San Fransisco', 'iPhone','X',200);
-- INSERT INTO inventory(warehouse, product, model, quantity)
-- VALUES('San Jose','Samsung','Galaxy S',200);
-- INSERT INTO inventory(warehouse, product, model, quantity)
-- VALUES('San Fransisco','Samsung','Galaxy S',200);
-- INSERT INTO inventory(warehouse, product, model, quantity)
-- VALUES('San Fransisco','Samsung','Note 8',100);
-- INSERT INTO inventory(warehouse, product, model, quantity)
-- VALUES('San Jose','Samsung','Note 8',150);






















-- select *
-- from inventory i 

-- 同时使用两个属性进行分组
-- 计算每个分组的产品数量
-- select
-- 	warehouse ,
-- 	product,
-- 	sum(quantity) qty
-- from 
-- 	inventory i 
-- group by
-- 	warehouse, 
-- 	product 
















-- 使用union all 得到多个结果集
-- 
-- select 
-- 	warehouse ,
-- 	product ,
-- 	sum(quantity) qty
-- from 
-- 	inventory i 
-- group by
-- 	warehouse ,
-- 	product 
-- union all 
-- select 
-- 	warehouse ,
-- 	null ,
-- 	sum(quantity)qty
-- from 
-- 	inventory i2 
-- group by
-- 	warehouse 
-- union all 
-- select 
-- 	null ,
-- 	product ,
-- 	sum(quantity) qty
-- from 
-- 	inventory i3 
-- group by 
-- 	product 
-- union all
-- select
-- 	null ,
-- 	null ,
-- 	SUM(quantity) qty
-- from 
-- 	inventory i 
-- 
-- 
-- 
-- 





-- 使用grouping sets 来生产多个结果集
-- 这里需要注意mysql版本
-- 
-- select
-- 	i.warehouse ,
-- 	i.product 
-- from 
-- 	inventory i 
-- 	group by
-- 		group sets 

-- SELECT
--     first_name as first_name1 ,
--     last_name
-- FROM
--     employees
-- union 
-- SELECT
--     d.relationship  as first_name1,
--     last_name
-- FROM
--     dependents d
-- ORDER BY
--     last_name;


-- select @@version






-- 查找位置id为1700的所有员工
-- 首先找到id为1700的所有部门
-- 再找到对应部门下的员工
-- select
-- 	e.employee_id ,e.first_name ,e.last_name 
-- from 
-- 	employees e 
-- where 
-- 	department_id in(
-- 		select 
-- 			department_id 
-- 		from 
-- 			departments d 
-- 		where 
-- 			d.location_id = 1700
-- 	)
	





-- 查找薪水最高的员工
-- 找到最高薪水是多少
-- 找到拥有这样的薪水的员工

-- select 
-- 	e.employee_id ,e.first_name ,e.last_name 
-- from 
-- 	employees e 
-- where 
-- 	salary = (
-- 		select 
-- 			max(salary) 
-- 		from 
-- 			employees e 	
-- 	)
	




-- 找出高于平均薪水的员工
-- 求平均薪水是多少
-- 找出薪水高于平均薪水的员工

-- select
-- 	e.first_name ,e.last_name ,e.salary 
-- from 
-- 	employees e 
-- where 
-- 	salary > (	
-- 		select
-- 			avg(salary)
-- 		from 
-- 			employees e 
-- 
-- 	)
	


-- 查找存在至少一名员工的薪水大于10000的所有部门

-- SELECT 
--     department_name,d.department_id 
-- FROM
--     departments d
-- WHERE
--     EXISTS( SELECT 
--             *
--         FROM
--             employees e
--         WHERE
--             salary > 10000
--                 AND e.department_id = d.department_id)




-- 查找所有员工薪水都低于10000的部门
-- select  
--     department_name,d.department_id 
-- FROM
--     departments d
-- WHERE
--      not EXISTS( SELECT 
--             *
--         FROM
--             employees e
--         WHERE
--             salary > 10000
--                 AND e.department_id = d.department_id)

-- 按照部门查找最低薪水
-- 有时候存在某些员工的部门已经被撤销，或者部门不在被统计范围内
-- 这个时候需要员工和被统计的部门进行inner join 运算
-- 然后查找新表的部门最低工资；
-- select 
-- 	min(salary) ,e.department_id 
-- from 
-- 	employees e 
-- group by department_id 






-- 查找薪水大于每个部门最低薪水的所有员工
-- select 
-- 	e.employee_id ,e.first_name ,e.last_name 
-- from 
-- 	employees e 
-- where 
-- 	e.salary >=all(
-- 		select 
-- 			min(salary)
-- 		from
-- 			employees e2 
-- 		group by department_id 
-- 	
-- 	)
	





-- 查找薪水大于或等于某个部门的最高薪水的员工
-- 找到每个部门的最高薪水
-- 找到薪水大于或等于某个部门最高薪水的员工
-- select 
-- 	e.employee_id ,e.first_name ,e.last_name 
-- from 
-- 	employees e 
-- where salary >= some (
-- 	select 
-- 		max(salary)
-- 	from
-- 		employees e2 
-- 	group by department_id 
-- 	
-- 	)

-- 返回每个部门的平局工资
-- select 
-- 	avg(e.salary) avg_sal 
-- from 
-- 	employees e 
-- group by department_id 



-- 使用子查询计算所有部门平均工资
-- 找到每个部门平均工资
-- 计算所有部门的平均工资

-- 
-- select 
-- 	round(avg(avg_sal),1) avg_dep_s
-- from 
-- 	(
-- 	select 
-- 		avg(e.salary) avg_sal 
-- 	from 
-- 		employees e 
-- 	group by department_id 
-- 	) dep_s



-- 查找所有员工的工资，平均工资以及每个员工工资与平均工资之间的差值
-- 求平均工资
-- 求平均工资与员工工资之间的差值

-- select 
-- 	e.employee_id ,
-- 	e.first_name ,
-- 	e.last_name ,
-- 	e.salary, 
-- 	(
-- 	select 
-- 		round(avg(e2.salary),0)  
-- 	from 
-- 		employees e2 
-- 	)avg_sal,
-- 	e.salary - (	
-- 		select
-- 			round(avg(e3.salary) ,0) 
-- 		from 
-- 			employees e3 
-- 	)diff_sal
-- from 
-- 	employees e 
-- order by first_name ,last_name 


-- 查找薪水大于所有员工平均薪水的员工
-- select 
-- 	e.employee_id ,
-- 	e.first_name ,
-- 	e.last_name 
-- from 
-- 	employees e 
-- where 
-- 	e.salary >(
-- 		select 
-- 		avg(e2.salary) 
-- 		from 
-- 			employees e2 
-- 	
-- 	)
	








-- 查找薪水高于其部门平均薪水的所有员工
-- 计算对应的部门平均薪水
-- 找到该员工对应部门的平均薪水
-- 查看该员工的薪水是否大于对应部门的平均薪水

-- select
-- 	e.employee_id ,e.last_name ,e.first_name 
-- from 
-- 	employees e 
-- where 
-- 	salary > (
-- 		select
-- 			avg(e2.salary) 
-- 		from 
-- 			employees e2 	
-- 		where 
-- 			e.department_id = e2.department_id 
-- 	
-- 	)
-- 	





-- 查询员工及其部门所有员工的平均薪水
-- 对于每一位员工，需要执行一次相关子查询
-- 查询该员工所在部门的平均工资
-- select 
--  	e.employee_id,
--  	e.first_name ,
--  	e.last_name ,
--  	e.salary ,
--  	(
--  		select 
--  			round(avg(salary),0) 
--  		from 
--  			employees e2 
--  		where department_id =e.department_id 
--  	)avg_sal_dep
-- from 
-- 	employees e 
-- 	inner join
-- 	departments d on e.department_id =d.department_id 



-- 使用exists来查询没有依赖的员工
-- 根据员工id查找对应的依赖信息
-- 返回没有依赖项的员工信息
-- select 
-- 	e.employee_id ,e.first_name ,e.last_name 
-- from 
-- 	employees e 
-- where 
-- 	not exists  (select
-- 		*
-- 	from 
-- 		dependents d
-- 	where d.employee_id =e.employee_id 
-- 	)






-- 查询至少有一个依赖的员工
-- 首先查询该员工的依赖
-- 在判断该员工查询结果是否存在
-- select 
-- 	employee_id ,first_name ,last_name 
-- from 
-- 	employees e 
-- where 
-- 	exists (
-- 		select 
-- 			*
-- 		from 
-- 			dependents d 
-- 		where 
-- 			d.employee_id = e.employee_id 
-- 		
-- 	
-- 	)



-- 查询没有任何家属的员工


-- select 
-- 	first_name ,last_name 
-- from 
-- 	employees e 
-- where 
-- 	not exists (
-- 		select 
-- 			*
-- 		from 
-- 			dependents d 
-- 		where 
-- 			d.employee_id = e.employee_id 
-- 	)
-- 
-- 
-- 
-- 	


-- select 
-- 	employee_id 
-- from employees e 
-- where 
-- 	exists (select null)






-- 查询工资大于部门id为2的员工最高工资的所有员工
-- 找到id为2的部门的所有人工资
-- 使用all 找到大于该部门最高工资的人
-- select
-- 	e.first_name ,e.last_name, e.salary 
-- from 
-- 	employees e 
-- where 
-- 	e.salary >=all(
-- 		select 
-- 			salary 
-- 		from 
-- 			employees e2 
-- 		where 
-- 			e2.department_id =2
-- 	)






-- 查找市场营销部门中员工最低薪资
-- select 
-- min(salary) 
-- from 
-- 	employees e 
-- where department_id =2



-- 查找薪水低于市场营销部门员工最低薪水的所有员工
-- 
-- select 
-- e.employee_id ,e.first_name ,e.last_name ,e.salary ,e.department_id 
-- from 
-- 	employees e 
-- where 
-- 	salary <> all (
-- 			select 
-- 				(salary) 
-- 			from 
-- 				employees e 
-- 			where department_id =2
-- 	)









-- 查找每个部门平均工资
-- select 
-- 	round(avg(salary)) 
-- from 
-- 	employees e 
-- group by department_id 






-- 查找工资等于某个部门平均工资的所有员工
-- select 
-- 	e.employee_id ,e.first_name ,e.last_name ,department_id ,salary 
-- from 
-- 	employees e 
-- where 
-- 	salary = any (
-- 		select 
-- 			round(avg(salary),0) 
-- 		from 
-- 			employees e 
-- 		group by department_id
-- 	)

-- 查找工资不等于每个部门平均工资的所有员工
-- select 
-- 	e.employee_id ,e.first_name ,e.last_name ,department_id ,salary 
-- from 
-- 	employees e 
-- where 
-- 	salary <> any (
-- 		select 
-- 			round(avg(salary),0) 
-- 		from 
-- 			employees e 
-- 		group by department_id
-- 	)



-- 查找薪水大于某个部门平均薪水的所有员工
-- 即大于最小的
-- select 
-- 	e.employee_id ,e.first_name ,e.last_name ,department_id ,salary 
-- from 
-- 	employees e 
-- where 
-- 	salary > any (
-- 		select 
-- 			round(avg(salary),0) 
-- 		from 
-- 			employees e 
-- 		group by department_id
-- 	)



-- 查找薪水低于谋个部门平均薪水的所有员工
-- select 
-- 	e.employee_id ,e.first_name ,e.last_name ,department_id ,salary 
-- from 
-- 	employees e 
-- where 
-- 	salary < any (
-- 		select 
-- 			round(avg(salary),0) 
-- 		from 
-- 			employees e 
-- 		group by department_id
-- 	)

-- 查找薪水低于或等于谋个部门平均薪水的所有员工
-- select 
-- 	e.employee_id ,e.first_name ,e.last_name ,department_id ,salary 
-- from 
-- 	employees e 
-- where 
-- 	salary <= any (
-- 		select 
-- 			round(avg(salary),0) 
-- 		from 
-- 			employees e 
-- 		group by department_id
-- 	)




-- CREATE TABLE projects (
--     project_id INT,
--     project_name VARCHAR(255),
--     start_date DATE NOT NULL,
--     end_date DATE NOT NULL,
--     CONSTRAINT pk_id PRIMARY KEY (project_id)
-- );
-- CREATE TABLE projects2 (
--     project_id INT,
--     project_name VARCHAR(255),
--     start_date DATE NOT NULL,
--     end_date DATE NOT NULL,
--     constraint e  PRIMARY KEY (project_id)
-- );

-- CREATE TABLE project_assignments (
--     project_id INT,
--     employee_id INT,
--     join_date DATE NOT NULL,
--     CONSTRAINT pk_assgn PRIMARY KEY (project_id , employee_id)
-- );

-- CREATE TABLE project_milestones(
--     milestone_id INT,
--     project_id INT,
--     milestone_name VARCHAR(100)
-- );


--  添加主键
-- alter table project_milestones 
-- add CONSTRAINT pk primary key (milestone_id)

-- 删除主键
-- alter table project_milestones 
-- drop primary key

--  添加主键
-- alter table project_milestones 
-- add primary key (project_id)



-- CREATE TABLE projects (
--     project_id INT AUTO_INCREMENT PRIMARY KEY,
--     project_name VARCHAR(255),
--     start_date DATE NOT NULL,
--     end_date DATE NOT NULL
-- );

-- 主键 milestone_id
-- 外键 project_id 关联表projects中的 project_id
-- CREATE TABLE project_milestones (
--     milestone_id INT AUTO_INCREMENT PRIMARY KEY,
--     project_id INT,
--     milestone_name VARCHAR(100)
-- );
-- 单独添加外键
-- ALTER TABLE project_milestones
-- ADD CONSTRAINT fk_project FOREIGN KEY(project_id)
--    REFERENCES projects(project_id);
-- 删除外键
-- alter table project_milestones 
-- drop constraint fk_project

-- 
-- CREATE TABLE users (
--     user_id INT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL
-- );
-- 添加唯一约束 
-- ALTER TABLE users
-- ADD CONSTRAINT uc_username UNIQUE(username);

-- 添加一个新的约束列
-- ALTER TABLE users
-- ADD email VARCHAR(255) UNIQUE;

-- 删除唯一约束
-- ALTER TABLE users
-- DROP CONSTRAINT email;

-- CREATE TABLE training (
--     employee_id INT,
--     course_id INT,
--     taken_date DATE NOT NULL,
--     PRIMARY KEY (employee_id , course_id)
-- );

-- 修改非空约束
-- 将原来的空填写一个默认值
-- 再将对应列转为
-- update training 
-- set taken_date = current_date()
-- where taken_date is null 

-- alter table training 
-- modify taken_date date not null

-- INSERT INTO training(employee_id,course_id,taken_date)
-- VALUES(8,7,20220302);



-- check约束相关

-- 
-- CREATE TABLE products (
--     product_id INT PRIMARY KEY,
--     product_name VARCHAR(255) NOT NULL,
--     selling_price NUMERIC(10,2) CHECK (selling_price > 0)
-- );

-- CREATE TABLE products (
--     product_id INT PRIMARY KEY,
--     product_name VARCHAR(255) NOT NULL,
--     selling_price NUMERIC(10,2) CONSTRAINT positive_selling_price CHECK (selling_price > 0)
-- );



CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR (255) NOT NULL,
    selling_price NUMERIC (10, 2) CHECK (selling_price > 0),
    cost NUMERIC (10, 2) CHECK (cost > 0),
    CONSTRAINT valid_selling_price  CHECK (selling_price > cost)
);









































































































	




select 
	warehouse ,
	sum(quantity) qty
from 
	inventory i 
group by roullup(warehouse)
	 



























































































































































































































































```
