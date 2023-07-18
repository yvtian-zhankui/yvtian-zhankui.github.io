### 3.1 多表模型介绍

我们之前学习的都是基于单表操作的，而实际开发中，随着业务难度的加深，肯定需要多表操作的。 

- 多表模型分类 一对一：在任意一方建立外键，关联对方的主键。

- 一对多：在多的一方建立外键，关联一的一方的主键。

- 多对多：借助中间表，中间表至少两个字段，分别关联两张表的主键。    

3.2 多表模型一对一操作

1. 一对一模型： 人和身份证，一个人只有一个身份证

1. 代码实现运行结果：	

    1. 步骤一: sql语句准备

```sql
CREATE TABLE person(    
id INT PRIMARY KEY AUTO_INCREMENT,    
NAME VARCHAR(20),    
age INT);
INSERT INTO person VALUES (NULL,'张三',23);
INSERT INTO person VALUES (NULL,'李四',24);
INSERT INTO person VALUES (NULL,'王五',25);

CREATE TABLE card(    
id INT PRIMARY KEY AUTO_INCREMENT,    
 number VARCHAR(30),   
 pid INT,    
CONSTRAINT cp_fk FOREIGN KEY (pid) REFERENCES person(id));

INSERT INTO card VALUES (NULL,'12345',3);
INSERT INTO card VALUES (NULL,'23456',2);
INSERT INTO card VALUES (NULL,'34567',1);
```

创建实体对象

```java
@Data
public class Card {
    private int id;
    private int number;
    private int pid;  
    private Person p;

}
@Data
public class Person {
    private int id;
    private String name;
    private int age;
}

```



### 步骤二：编写dao接口

```java
public interface OneToOneDao {
    //查询全部card数据
    public List<Card> findAll();
}
```

### 步骤三:配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.eu.themoss.mapper.OneToOneMapper">
    <resultMap id="OneToOne" type="card">
        <id property="id" column="id"/>
        <result property="number" column="number"/>
        <result property="pid" column="pid"/>
        <association property="p" javaType="org.eu.themoss.model.Person">
            <id property="id" column="pid"/>
            <result property="age" column="age"/>
            <result property="name" column="name"/>
        </association>
    </resultMap>


    <select id="selectAll" resultMap="OneToOne">
        select *
        from card c,
             person p
        where c.pid = p.id
    </select>
</mapper>
```

### 步骤四：配置核心配置文件

```xml
<mapper resource="com/by/dao/onetoOneDao.xml"/>
```

### 步骤五：测试类 

```java
@Test
        public void onetest(){
            SqlSession sqlSession = MybatisUtils.getSqlSession(true);
            //获取UserDao接口实现类对象
           OneToOneDao mapper = sqlSession.getMapper(OneToOneDao.class);
            List<Card> list = mapper.findAll();
            for (Card card : list) {
                System.out.println(card);
            }
            MybatisUtils.closeSqlSession(sqlSession);
        }

```

运行结果：

![](https://tcs-devops.aliyuncs.com/storage/112w4d53e88160b18aba5d2cd0991b308432?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IjY0NDljNGQwODhhZWYwZGI0YjhjMWNkMyIsImV4cCI6MTY5MDI0Njg5NiwiaWF0IjoxNjg5NjQyMDk2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnc0ZDUzZTg4MTYwYjE4YWJhNWQyY2QwOTkxYjMwODQzMiJ9.zeJwWHRQgTy1S4GFiwjrxyEKgcMWE9eK92841g9RohE&download=image.png "")

一对一配置总结

```xml
<resultMap>：配置字段和对象属性的映射关系标签。
    id 属性：唯一标识
    type 属性：实体对象类型
<id>：配置主键映射关系标签。
<result>：配置非主键映射关系标签。
    column 属性：表中字段名称
    property 属性： 实体对象变量名称
<association>：配置被包含对象的映射关系标签。
    property 属性：被包含对象的变量名
    javaType 属性：被包含对象的数据类型
```



### 3.3 多表模型一对多操作

1. 一对多模型： 一对多模型：班级和学生，一个班级可以有多个学生。    

1. 代码实现

    1. 步骤一: sql语句准备

```sql
CREATE TABLE classes(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20)
);
INSERT INTO classes VALUES (NULL,'211一等班级');
INSERT INTO classes VALUES (NULL,'211二等班级');

CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(30),
	age INT,
	cid INT,
	CONSTRAINT cs_fk FOREIGN KEY (cid) REFERENCES classes(id)
);
INSERT INTO student VALUES (NULL,'张三',23,1);
INSERT INTO student VALUES (NULL,'李四',24,1);
INSERT INTO student VALUES (NULL,'王五',25,2);
INSERT INTO student VALUES (NULL,'赵六',26,2);

```

### 实体类准备

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Classes {
    private Integer id;     //主键id
    private String name;    //班级名称

    private List<Student> students; //班级中所有学生对象
    
}
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    private Integer id;     //主键id
    private String name;    //学生姓名
    private Integer age;    //学生年龄
}

```

### 步骤二：添加dao接口对象

```text
public interface OneToManyDao {
    public List<Classes> findAll();
}

```

### 步骤三:配置文件

```xml
<mapper namespace="com.by.dao.OneToManyDao">
   <resultMap id="oneToMany" type="classes">
    <id column="cid" property="id"/>
   <result column="name" property="name"/>
       <!--
                  collection：配置被包含的集合对象映射关系
                  property：被包含对象的变量名
                  ofType：被包含对象的实际数据类型
              -->
    <collection property="students" ofType="student">
        <id column="sid" property="id"></id>
        <result column="name" property="name"/>
        <result column="age" property="age"/>
    </collection>
   </resultMap>
<select id="findAll" resultMap="oneToMany">
    select c.id cid,c.name,s.id sid,s.name,s.age  from classes c,student s where c.id=s.cid
</select>
</mapper>

```

### 步骤四：配置核心文件

```xml
<mapper resource="com/by/dao/OneToManyDao.xml"/>
```

### 步骤五：测试类     

```java
 @Test
    public void onemanytest(){
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        //获取UserDao接口实现类对象
        OneToManyMapper mapper = sqlSession.getMapper(OneToManyMapper.class);
        List<Classes> list = mapper.findAll();
        for (Classes classes : list) {
            System.out.println(classes);
        }
        MybatisUtils.closeSqlSession(sqlSession);
    }

```

### 一对多配置文件总结：

```xml
<resultMap>：配置字段和对象属性的映射关系标签。
    id 属性：唯一标识
    type 属性：实体对象类型
<id>：配置主键映射关系标签。
<result>：配置非主键映射关系标签。
    column 属性：表中字段名称
    property 属性： 实体对象变量名称
<collection>：配置被包含集合对象的映射关系标签。
    property 属性：被包含集合对象的变量名
    ofType 属性：集合中保存的对象数据类型

```

### 3.4 多表模型多对多操作

多对多模型：学生和课程，一个学生可以选择多门课程、一个课程也可以被多个学生所选择。

代码实现

- 步骤一: sql语句准备

```sql
CREATE TABLE course(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20)
);
INSERT INTO course VALUES (NULL,'语文');
INSERT INTO course VALUES (NULL,'数学');


CREATE TABLE stu_cr(
	id INT PRIMARY KEY AUTO_INCREMENT,
	sid INT,
	cid INT,
	CONSTRAINT sc_fk1 FOREIGN KEY (sid) REFERENCES student(id),
	CONSTRAINT sc_fk2 FOREIGN KEY (cid) REFERENCES course(id)
);
INSERT INTO stu_cr VALUES (NULL,1,1);
INSERT INTO stu_cr VALUES (NULL,1,2);
INSERT INTO stu_cr VALUES (NULL,2,1);
INSERT INTO stu_cr VALUES (NULL,2,2);

```

- 步骤二：实体类准备

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    private Integer id;     //主键id
    private String name;    //课程名称
 
}
student类里面添加 课程集合
    
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    private Integer id;     //主键id
    private String name;    //学生姓名
    private Integer age;    //学生年龄
    private List<Course> courses;   // 学生所选择的课程集合
}

```

步骤三:创建dao接口

```java
public interface ManyToManyDao {
    //查询学生全部数据 得到课表和班级
    public List<Student> findAll();
}
```

步骤四：配置文件

- 数据库字段分析：

```sql
select sc.sid scid,s.id sid,s.name,s.age,c.id cid,c.name cname ,sc.id from student s, course c, stu_cr sc where sc.id=1 and s.cid=1
```

- 映射文件编写

```xml
<mapper namespace="com.by.dao.ManyToManyDao">
    <resultMap id="manyToMany" type="student">
        <id column="sid" property="id"/>
        <result column="sname" property="name"/>
        <result column="sage" property="age"/>
        <!--
            property 指的是student里面定义的集合变量名
            ofType 指的是实体类对象
           -->
        <collection property="courses" ofType="course">
            <id column="cid" property="id"/>
            <result column="cname" property="name"/>
        </collection>
    </resultMap>
<select id="findAll" resultMap="manyToMany">
    select  sc.sid,s.name sname, s.age sage,c.name cname,sc.cid  from student s,course c,stu_cr sc where sc.sid=s.id and sc.cid=c.id
</select>
</mapper>

```

步骤五：测试类

```java
@Test
    public void manytoTest(){
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        //获取UserDao接口实现类对象
        ManyToManyDao mapper = sqlSession.getMapper(ManyToManyDao.class);
        List<Student> manylist = mapper.findAll();
        for (Student student : manylist) {
            System.out.println(student);
        }
        MybatisUtils.closeSqlSession(sqlSession);
    }

```

3.5 多表模型操作总结

```text
 <resultMap>：配置字段和对象属性的映射关系标签。
    id 属性：唯一标识
    type 属性：实体对象类型
<id>：配置主键映射关系标签。
<result>：配置非主键映射关系标签。
    column 属性：表中字段名称
    property 属性： 实体对象变量名称
<association>：配置被包含对象的映射关系标签。
    property 属性：被包含对象的变量名
    javaType 属性：被包含对象的数据类型
<collection>：配置被包含集合对象的映射关系标签。
    property 属性：被包含集合对象的变量名
    ofType 属性：集合中保存的对象数据类型
```





