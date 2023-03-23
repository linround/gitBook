# sql 记录2
```text
-- 创建课程表
-- CREATE TABLE courses (
--     course_id INT AUTO_INCREMENT PRIMARY KEY,
--     course_name VARCHAR(50) NOT NULL
-- );


-- 存储训练数据
-- CREATE TABLE trainings (
--     employee_id INT,
--     course_id INT,
--     taken_date DATE,
--     PRIMARY KEY (employee_id , course_id)
-- );






-- 插入新的单列
-- alter table courses add credit_hours int not null;


-- 插入新的多列 并将这些列放在course_name之后;
-- alter table courses 
-- add fee numeric(10,2) after course_name,
-- add max_limit int after course_name;




--  更改列的数据类型
-- alter table courses 
-- modify fee numeric (10,5) not null;




-- 删除列
-- alter table courses drop column fee;










-- 同时删除多个列
-- alter table courses 
-- drop column max_limit,
-- drop column credit_hours;





-- 创建一个demo表
-- CREATE TABLE demo_contacts (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50) NOT NULL,
--     relationship VARCHAR(50) NOT NULL,
--     employee_id INT NOT NULL
-- );
-- 删除demo表
-- DROP TABLE demo_contacts;


-- 创建一个demo表 
-- CREATE TABLE big_table (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     val INT
-- );
-- -- 
-- INSERT INTO big_table (val)
-- VALUES
--     (RAND(100));



--  重命名比表
-- alter table big_table 
-- rename to new_big_table;


-- 删除表中的所有数据
-- truncate table big_table  ;

-- select count(*) from big_table bt ; 





-- DELIMITER $$
-- CREATE PROCEDURE load_big_table_data(IN num int)
-- BEGIN
--  DECLARE counter int default 0;
-- 
--  WHILE counter < num DO
--    INSERT INTO big_table(val)
--    VALUES(RAND(100));
--  END WHILE;
-- 
-- END$$
-- 
-- CALL load_big_table_data(100);



--  重命名表
-- alter table courses 
-- rename to courses_new



















--  sql复制
-- select * into courses_new_ from courses_new_1;













-- 局部临时表创建
-- CREATE TABLE #local temp table (  
--     user_id int 
--     user_name varchar (50),  
--     user_address varchar (150)  
-- )




-- 全局临时变量表创建
-- CREATE TABLE ##new global temp table (  
--     User_id int,  
--     User_name varchar (50),  
--     User_address varchar (150)  
-- )


-- CREATE TABLE candidates (
--     id INT PRIMARY KEY,
--     first_name VARCHAR(100) NOT NULL,
--     last_name VARCHAR(100) NOT NULL,
--     email VARCHAR(255) NOT NULL UNIQUE
-- );


-- 添加一列
-- alter table candidates 
-- add column phone varchar(50);






-- 添加多列
-- alter table candidates 
-- add column home_address varchar(255),
-- add column dob date,
-- add column linkedin_account varchar(255);





-- CREATE TABLE persons (
--     person_id INT PRIMARY KEY,
--     first_name VARCHAR(255) NOT NULL,
--     last_name VARCHAR(255) NOT NULL,
--     date_of_birth DATE NOT NULL,
--     phone VARCHAR(25),
--     email VARCHAR(255)
-- );




-- 删除一列

-- alter table persons 
-- drop column email;

-- 删除多列
-- alter table persons 
-- drop column date_of_birth,
-- drop column phone;



-- show databases;












































```
