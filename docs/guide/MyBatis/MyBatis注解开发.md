### 1 Mybatis注解开发单表操作

1.1 MyBatis的常用注解 

这几年来注解开发越来越流行，Mybatis也可以使用注解开发方式，这样我们就可以减少编写Mapper

映射文件了。我们先围绕一些基本的CRUD来学习，再学习复杂映射多表操作。

@Insert：实现新增

@Update：实现更新

@Delete：实现删除

@Select：实现查询

@Result：实现结果集封装

@Results：可以与@Result 一起使用，封装多个结果集

@One：实现一对一结果集封装

@Many：实现一对多结果集封装

- 注意：修改MyBatis的核心配置文件，我们使用了注解替代的映射文件，所以我们只需要加载使用了注解的Mapper接口即可

```text
<mappers>
    <!--扫描使用注解的类-->
    <mapper class="com.by.mapper.IUserMapper"></mapper>
</mappers>
```

或者指定扫描包含映射关系的接口所在的包也可以

```text
<mappers>
    <!--扫描使用注解的类所在的包-->
    <package name="com.by.mapper"></package>
</mappers>
```

1.1 注解开发总结

注解可以简化开发操作，省略映射配置文件的编写。 

- 常用注解 @Select(“查询的 SQL 语句”)：执行查询操作注解 @Insert(“查询的 SQL 语句”)：执行新增操作注解 @Update(“查询的 SQL 语句”)：执行修改操作注解 @Delete(“查询的 SQL 语句”)：执行删除操作注解 

- 配置映射关系 `<mappers>` `<package name="接口所在包"/> </mappers>  `  

### 二.MyBatis注解开发的多表操作

### 2.1  MyBatis的注解实现复杂映射开发

实现复杂关系映射之前我们可以在映射文件中通过配置`<resultMap>`来实现，使用注解开发后，我们可以使用@Results注解，@Result注解，@One注解，@Many注解组合完成复杂关系的配置

![](https://tcs-devops.aliyuncs.com/storage/112wc7ed96625516348c6557d65e48cfa2e6?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM3NDI3NywiaWF0IjoxNjg5NzY5NDc3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndjN2VkOTY2MjU1MTYzNDhjNjU1N2Q2NWU0OGNmYTJlNiJ9.sSFVMHUzS4BpoWW97Y7aXcHM5nekpusPUMjzRgbDlBM&download=%E5%9B%BE%E7%89%87.png "")

![](https://tcs-devops.aliyuncs.com/storage/112waa5fc54d69799089d5871eb90b410efd?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM3NDI3NywiaWF0IjoxNjg5NzY5NDc3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndhYTVmYzU0ZDY5Nzk5MDg5ZDU4NzFlYjkwYjQxMGVmZCJ9.OjR5J0J3fD00kdeIPHKbrr5UwP0QkGC2GsIM6_0f-iI&download=%E5%9B%BE%E7%89%87.png "")

### 2.2  一对一查询

2.2.1 一对一查询的模型

一对一查询的需求：查询一个用户信息，与此同时查询出该用户对应的身份证信息

2.2.2 一对一查询的语句

对应的sql语句：

```text
SELECT * FROM card；
​
SELECT * FROM person WHERE id=#{id}
```

2.2.3 创建PersonMapper接口

```text
public interface PersonMapper {
    //根据id查询
    @Select("SELECT * FROM person WHERE id=#{id}")
    public abstract Person findById(Integer id);
}
​
```

2.2.4 使用注解配置Mapper

```text
public interface CardMapper {
     @Select("select * from card")
    @Results({
            @Result(column = "id", property = "id"),
            @Result(column = "number",property = "number"),
            @Result(
                    property = "p",             // 被包含对象的变量名
                    javaType = Person.class,    // 被包含对象的实际数据类型
                    column = "pid",             // 根据查询出的card表中的pid字段来查询person表
                    /*
                        one、@One 一对一固定写法
                        select属性：指定调用哪个接口中的哪个方法
                     */
       one = @One(select = "com.by.mapper.PersonMapper.findById")
            )
    })
    public  List<Card> findAll();
}
```

2.2.5 测试类

```text
@Test
    public void oneTest(){
        //1.通过工厂对象获取SqlSession对象
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        //2.获取CardMapper接口的实现类对象
        CardMapper mapper = sqlSession.getMapper(CardMapper.class);
        //3.调用实现类对象中的方法，接收结果
        List<Card> cardList = mapper.findAll();
        for (Card card : cardList) {
            System.out.println(card);
        }
        //4.释放资源
        MybatisUtils.closeSqlSession(sqlSession);
​
    }
​
```

2.2.6  一对一配置总结

```text
@Results：封装映射关系的父注解。
    Result[] value()：定义了 Result 数组
@Result：封装映射关系的子注解。
    column 属性：查询出的表中字段名称
    property 属性：实体对象中的属性名称
    javaType 属性：被包含对象的数据类型
    one 属性：一对一查询固定属性
 @One：一对一查询的注解。
    select 属性：指定调用某个接口中的方法
```



2.3 一对多查询

2.3.1 一对多查询的模型

一对多查询的需求：查询一个课程，与此同时查询出该该课程对应的学生信息

2.3.2 一对多查询的语句

对应的sql语句：

```text
SELECT * FROM classes
​
SELECT * FROM student WHERE cid=#{cid}
```

2.3.3 创建StudentMapper接口

```text
public interface StudentMapper {
    //根据cid查询student表
    @Select("SELECT * FROM student WHERE cid=#{cid}")
    public abstract List<Student> findByCid(Integer cid);
}
​
```

2.3.4 使用注解配置Mapper

```text
//查询全部
    @Select("SELECT * FROM classes")
    @Results({
            @Result(column = "id",property = "id"),
            @Result(column = "name",property = "name"),
            @Result(
                    property = "students",  // 被包含对象的变量名
                    javaType = List.class,  // 被包含对象的实际数据类型
                    column = "id",          // 根据查询出的classes表的id字段来查询student表
                    /*
                        many、@Many 一对多查询的固定写法
                        select属性：指定调用哪个接口中的哪个查询方法
                     */
      many = @Many(select = "com.by.mapper.StudentMapper.findByCid")
            )
    })
    public  List<Classes> findAll();
```

2.3.5 测试类

```java
 @Test
    public void oneManyTest(){
        //1.通过工厂对象获取SqlSession对象
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        //2.获取CardMapper接口的实现类对象
        ClassesMapper mapper = sqlSession.getMapper(ClassesMapper.class);
        //3.调用实现类对象中的方法，接收结果
        List<Classes> classesList = mapper.findAll();
        for (Classes classes : classesList) {
            System.out.println(classes);
        }
        //4.释放资源
        MybatisUtils.closeSqlSession(sqlSession);
​
    }
```

运行结果查看：

![](https://tcs-devops.aliyuncs.com/storage/112w0dbbc17abe04ea824dedf2ee73db3ddd?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM3NDI3NywiaWF0IjoxNjg5NzY5NDc3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMncwZGJiYzE3YWJlMDRlYTgyNGRlZGYyZWU3M2RiM2RkZCJ9.CKZyz8H-NV2wHfsC-9RioBZR2WYTRY3GoUJgNNxlPl0&download=%E5%9B%BE%E7%89%87.png "")

2.3.6 一对多配置总结

```text
@Results：封装映射关系的父注解。
    Result[] value()：定义了 Result 数组
@Result：封装映射关系的子注解。
    column 属性：查询出的表中字段名称
    property 属性：实体对象中的属性名称
    javaType 属性：被包含对象的数据类型
    many 属性：一对多查询固定属性
@Many：一对多查询的注解。
    select 属性：指定调用某个接口中的方法
```



2.4  多对多查询

2.4.1 多对多查询的模型

多对多查询的需求：查询学生以及所对应的课程信息

![](https://tcs-devops.aliyuncs.com/storage/112wbbc20574016d6a9bde9e075fd840bda2?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM3NDI3NywiaWF0IjoxNjg5NzY5NDc3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndiYmMyMDU3NDAxNmQ2YTliZGU5ZTA3NWZkODQwYmRhMiJ9.LgJep2LOz068Vs31AbzGxTZX6wl2yIzgKGWi5bQijHU&download=%E5%9B%BE%E7%89%87.png "")

2.4.2 多对多查询的语句

对应的sql语句：

```sql
SELECT DISTINCT s.id,s.name,s.age FROM student s,stu_cr sc WHERE sc.sid=s.id
SELECT c.id,c.name FROM stu_cr sc,course c WHERE sc.cid=c.id AND sc.sid=#{id}
```

2.4.3  添加CourseMapper 接口方法

```text
public interface CourseMapper {
    //根据学生id查询所选课程
    @Select("SELECT c.id,c.name FROM stu_cr sc,course c WHERE sc.cid=c.id AND sc.sid=#{id}")
    public abstract List<Course> findBySid(Integer id);
}
​
```

2.4.4 使用注解配置Mapper

```text
//查询全部
    @Select("SELECT DISTINCT s.id,s.name,s.age FROM student s,stu_cr sc WHERE sc.sid=s.id")
    @Results({
            @Result(column = "id",property = "id"),
            @Result(column = "name",property = "name"),
            @Result(column = "age",property = "age"),
            @Result(
                    property = "courses",   // 被包含对象的变量名
                    javaType = List.class,  // 被包含对象的实际数据类型
                    column = "id",          // 根据查询出student表的id来作为关联条件，去查询中间表和课程表
                    /*
                        many、@Many 一对多查询的固定写法
                        select属性：指定调用哪个接口中的哪个查询方法
                     */
                    many = @Many(select = "com.by.mapper.CourseMapper.findBySid")
            )
    })
    public List<Student> findAll();
​
```

2.4.5 测试类

```text
@Test
    public void ManyToManyTest(){
        //1.通过工厂对象获取SqlSession对象
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        //2.获取CardMapper接口的实现类对象
        StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
        //3.调用实现类对象中的方法，接收结果
        List<Student> studentList = mapper.findAll();
        for (Student student : studentList) {
            System.out.println(student.getId() + "," + student.getName() + "," + student.getAge());
            List<Course> courses = student.getCourses();
            for (Course cours : courses) {
                System.out.println(cours);
            }
​
        }
        //4.释放资源
        MybatisUtils.closeSqlSession(sqlSession);
​
    }
```

结果打印：

![](https://tcs-devops.aliyuncs.com/storage/112w1a5374791ee3f7444f43109803e122ab?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM3NDI3NywiaWF0IjoxNjg5NzY5NDc3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMncxYTUzNzQ3OTFlZTNmNzQ0NGY0MzEwOTgwM2UxMjJhYiJ9.iWWU75x6_vUfiIssSNkLcCTzEn4g7Z8FOttqH1gcR0M&download=%E5%9B%BE%E7%89%87.png "")

2.4.6 多对多配置总结

```text
@Results：封装映射关系的父注解。
    Result[] value()：定义了 Result 数组
@Result：封装映射关系的子注解。
    column 属性：查询出的表中字段名称
    property 属性：实体对象中的属性名称
    javaType 属性：被包含对象的数据类型
    many 属性：一对多查询固定属性
@Many：一对多查询的注解。
    select 属性：指定调用某个接口中的方法
```

