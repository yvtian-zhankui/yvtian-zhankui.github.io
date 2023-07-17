### 2.1 Resources

- org.apache.ibatis.io.Resources：加载资源的工具类。

- 核心方法

![](https://tcs-devops.aliyuncs.com/storage/112v124ef756c7bfac3217b6aead92b7ff71?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI4MywiaWF0IjoxNjg5NTczNDgzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYxMjRlZjc1NmM3YmZhYzMyMTdiNmFlYWQ5MmI3ZmY3MSJ9.AiqXqon1Q_fxMSyAISDtBwoX2NI9mSwY6DVuPBdLlVk&download=%E5%9B%BE%E7%89%87.png "")

### 2.2 构建器SqlSessionFactoryBuilder

建造者设计模式：

- org.apache.ibatis.session.SqlSessionFactoryBuilder：获取 SqlSessionFactory 工厂对象的功能类

- 核心方法

![](https://tcs-devops.aliyuncs.com/storage/112v522de4fb19908d6e6ae7e57754ecfe8e?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI4MywiaWF0IjoxNjg5NTczNDgzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY1MjJkZTRmYjE5OTA4ZDZlNmFlN2U1Nzc1NGVjZmU4ZSJ9.nk_bf20ZJFU-7LFzR8m1bD9qY2VG-zejdfc47pFAet4&download=%E5%9B%BE%E7%89%87.png "")

- 通过加载mybatis的核心文件的输入流的形式构建一个SqlSessionFactory对象

```java
String resource = "org/mybatis/builder/mybatis-config.xml"; 
InputStream inputStream = Resources.getResourceAsStream(resource); 
SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder(); 
SqlSessionFactory factory = builder.build(inputStream);
```

其中， Resources 工具类，这个类在 org.apache.ibatis.io 包中。Resources 类帮助你从类路径下、文件系统或一个 web URL 中加载资源文件。

### 2.3 工厂对象SqlSessionFactory

工厂设计模式：

- org.apache.ibatis.session.SqlSessionFactory：获取 SqlSession 构建者对象的工厂接口。

- 核心api

![](https://tcs-devops.aliyuncs.com/storage/112v89cd717f619009c297f4bf7db3685465?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI4MywiaWF0IjoxNjg5NTczNDgzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY4OWNkNzE3ZjYxOTAwOWMyOTdmNGJmN2RiMzY4NTQ2NSJ9.nybOSOJu6hlmrvyoM40oHwDG8LYJZh4Cq6iChKbxsh0&download=%E5%9B%BE%E7%89%87.png "")

2.4 SqlSession会话对象

- org.apache.ibatis.session.SqlSession：构建者对象接口。用于执行 SQL、管理事务、接口代理。

- 核心api

![](https://tcs-devops.aliyuncs.com/storage/112v6051fcc63eefe4627b73dec464f8d2dd?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI4MywiaWF0IjoxNjg5NTczNDgzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY2MDUxZmNjNjNlZWZlNDYyN2I3M2RlYzQ2NGY4ZDJkZCJ9.81iq-MJ_fn5Lkcu3_UUDu66HGMfx3zOGUJvsriVlegY&download=%E5%9B%BE%E7%89%87.png "")

SqlSession 实例在 MyBatis 中是非常强大的一个类。在这里你会看到所有执行语句、提交或回滚事务和获取映射器实例的方法。

### 三、接口代理方式实现Dao

### 1.1 代理开发方式介绍

采用 Mybatis 的代理开发方式实现 DAO 层的开发，这种方式是我们后面进入企业的主流。

Mapper 接口开发方法只需要程序员编写Mapper 接口（相当于Dao 接口），由Mybatis 框架根据接口定义创建接口的动态代理对象，代理对象的方法体同上边Dao接口实现类方法。

Mapper 接口开发需要遵循以下规范：

**1) Mapper.xml文件中的namespace与mapper接口的全限定名相同**

**2) Mapper接口方法名和Mapper.xml中定义的每个statement的id相同**

**3) Mapper接口方法的输入参数类型和mapper.xml中定义的每个sql的parameterType的类型相同**

**4) Mapper接口方法的返回值类型和mapper.xml中定义的每个sql的resultType的类型相同**

总结: 

接口开发的方式: 程序员只需定义接口,就可以对数据库进行操作,那么具体的对象怎么创建?

1.程序员负责定义接口

2.在操作数据库,mybatis框架根据接口,通过动态代理的方式生成代理对象,负责数据库的crud操作

### MyBatis 映射配置文件

### 3.1 映射配置文件介绍

- 映射配置文件包含了数据和对象之间的映射关系以及要执行的 SQL 语句

![](https://tcs-devops.aliyuncs.com/storage/112vb564eac14ba2dbbada2a31f1913c655c?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI4MywiaWF0IjoxNjg5NTczNDgzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZiNTY0ZWFjMTRiYTJkYmJhZGEyYTMxZjE5MTNjNjU1YyJ9.sP-ip2I6r0wNKksdI8e3qzHgvYiUUqZFeTfeUwrbg-c&download=%E5%9B%BE%E7%89%87.png "")

3.2 查询功能

```text
<Select> 查询功能标签
```

- 属性        id：唯一标识， 配合名称空间使用。    

-  parameterType：指定参数映射的对象类型。       

- resultType：指定结果映射的对象类型。

- SQL 获取参数:        #{属性名}  #表示方式sql注入的  $ 表示sql拼接 where id=1 1=1

- 示例                               

```java
<!--  java.lang.Integer-->
<select id="findById" parameterType="java.lang.String" resultType="com.by.pojo.User">        
select * from user where id=#{id}
</select>
```

### 3.3 新增功能 

```text
<insert>：新增功能标签。
```

- 属性    id：唯一标识， 配合名称空间使用。    

    -  parameterType：指定参数映射的对象类型。       

- SQL 获取参数:        #{属性名}

- 示例

操作步骤：

第一步、编写dao接口

```java
public void save(User user);
```

第二步、编写映射文件

```java
<insert id="save" parameterType="com.by.pojo.User">
    insert into user values(#{id},#{username},#{sex},#{address},#{birthday})
</insert>
```

第三步、测试代码

```java
@Test
public void saveTest() throws IOException {
    //读取配置文件
    InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
​
    //获取建造者对象
    SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
    SqlSessionFactory sessionFactory = builder.build(is);
    SqlSession session = sessionFactory.openSession();
    UserDao mapper = session.getMapper(UserDao.class);
    User user=new User();
   // user.setId(1);
    user.setUsername("张三");
    user.setSex("男");
    user.setAddress("河南开封");
    user.setBirthday("2010-09-12");
    mapper.save(user);
    //提交数据
     session.commit();
    //释放资源
    is.close();
    session.close();
​
}
```

3.4 修改功能

```java
<update>：修改功能标签。
```

- 属性        id：唯一标识， 配合名称空间使用。    

    -  parameterType：指定参数映射的对象类型。       

- SQL 获取参数:        #{属性名}

- 示例

1、编写dao接口

```java
public void update(User user);
```

2、编写映射文件

```xml
<update id="update" parameterType="com.by.pojo.User">
    update user set username=#{username},sex=#{sex} where id=#{id}
</update>
```

3、测试运行

```java
@Test
public void update() throws IOException {
    //读取配置文件
    InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
​
    //获取建造者对象
    SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
    SqlSessionFactory sessionFactory = builder.build(is);
    SqlSession session = sessionFactory.openSession();
    UserDao mapper = session.getMapper(UserDao.class);
​
    User user=new User();
    user.setId(1);
    user.setUsername("张三");
    user.setSex("女");
    mapper.update(user);
      //提交数据
     session.commit();
    //释放资源
    is.close();
    session.close();
​
}
```

3.5 删除功能

```xml
<delete>：查询功能标签。
```

- 属性        id：唯一标识， 配合名称空间使用。    

    -  parameterType：指定参数映射的对象类型。       

- SQL 获取参数:        #{属性名}

1、编写dao接口

```java
public void delete(int id);
```

- 示例

```xml
<delete id="delete" parameterType="java.lang.Integer">
    delete from user where id=#{id}
</delete>

```

3、测试运行

```java
@Test
public void delTest() throws IOException {
    InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
​
    //获取建造者对象
    SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
    SqlSessionFactory sessionFactory = builder.build(is);
    SqlSession session = sessionFactory.openSession();
    UserDao mapper = session.getMapper(UserDao.class);
    mapper.delete(1);
     //提交数据
     session.commit();
    //释放资源
    is.close();
    session.close();
}
```

- 总结： 大家可以发现crud操作，除了标签名称以及sql语句不一样之外，其他属性参数基本一致。

### 3.6抽取工具类

```text
public class MybatisUtils {
    //定义静态的session工厂对象
    static SqlSessionFactory sqlSessionFactory;
    static {
        //读取配置文件
        try {
            InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
            SqlSessionFactoryBuilder builder=new SqlSessionFactoryBuilder();
            sqlSessionFactory = builder.build(is);
        } catch (IOException e) {
            e.printStackTrace();
        }
​
    }
    //提交
    public static SqlSession getSqlSession(boolean autocommit){
        return sqlSessionFactory.openSession(autocommit);
    }
    //关闭
    public static void closeSqlSession(SqlSession sqlSession){
        sqlSession.close();
    }
}
```

测试操作：

```text
@Test
public void findTest() throws IOException {
    //调用utils里面的getsqlSession 包含提交操作
    SqlSession session = MybatisUtils.getSqlSession(true);
    UserDao mapper = session.getMapper(UserDao.class);
    List<User> all = mapper.findAll();
    for (User user : all) {
        System.out.println(user);
    }
    //释放资源
    MybatisUtils.closeSqlSession(session);
}
```

### 3.6 注解实现案例

@insert  添加操作

	1、编写mapper接口

```java
@Insert("insert into T_user values(#{id},#{username},#{sex},#{address},#{birthday})")
public void save(User user);
```

   2、编写测试类

```java
@Test
public void insertTest(){
​
    SqlSession sqlSession = MybatisUtils.getSqlSession(true);
    IUsermapper mapper = sqlSession.getMapper(IUsermapper.class);
    User user=new User();
    user.setUsername("胡二小");
    user.setSex("女");
    user.setAddress("郑州");
    user.setBirthday("2001-09-12");
    mapper.save(user);
    //释放资源
    MybatisUtils.closeSqlSession(sqlSession);
​
}
```

@update修改操作

```text
@Update("update T_user set username=#{username},sex=#{sex} where id=#{id}")
public void update(User user);
```

@Delete删除操作

```text
@Delete("delete from T_user where id=#{id}")
public void delete(int id);
```

### 3.7问题扩展：新增用户 **id** 的返回值

新增用户后， 同时还要返回当前新增用户的 id 值， 因为 id 是由数据库的自动增长来实现的，所以就相

当于我们要在新增后将自动增长 auto_increment 的值返回。

```java
 <insert id="saveUser" parameterType="user">
 
        <!--配置保存时获取插入的id-->
        <!-- selectKey：是指要执行相关的sql
            order: selectKey中sql执行的顺序，after 代表之后，before代表之前
            keyProperty：指的是实体类中的属性
            keyColumn: 指定的是数据库表中的主键字段名
    -->
        <selectKey order="AFTER" keyProperty="id" keyColumn="id" resultType="int">
            select last_insert_id()
        </selectKey>
​
insert into T_user(id,username,sex,address,birthday) values(#{id},#{username},#{sex},#{address},#{birthday})
    </insert>
```

第二种方式：

使用**useGeneratedKeys结合**keyProperty 完成自增id获取

```xml
useGeneratedKeys:（只作用于 insert 和 update ）这会令 MyBatis 使用 JDBC 的 getGeneratedKeys 方法来取出由数据库内部生成的主键（比如：像 MySql 和 SqlServer 这类关系数据库管理系统中的自动递增字段）。
keyProperty:（只作用于 insert 和 update）唯一标记一个属性，MyBatis 会通过 getGeneratedKeys 的返回值或者通过 insert 语句的 selectKey 子元素设置它的键值，默认：unset。如果希望得到多个生成的列，也可以是逗号分隔的属性名称列表。(这里 mysql 里的自增主键是 id)
代码=====

 <insert id="save" parameterType="user" useGeneratedKeys="true" keyProperty="id">
insert into user values(#{id},#{username},#{sex},#{address},#{birthday})
    </insert>


```

**编写步骤：**

1、在dao中添加一个方法

```text
public void saveUser(User user);
```

2、编写映射

3、编写测试

```text
@Test
public void saveTest() throws IOException {
    SqlSession sqlSession = MybatisUtils.getSqlSession(true);
    UserDao mapper = sqlSession.getMapper(UserDao.class);
    User user=new User();
   // user.setId(1);
    user.setUsername("小李子");
    user.setSex("男");
    user.setAddress("郑州");
    user.setBirthday(Date.valueOf("2011-09-12"));
    //mapper.save(user);
    mapper.saveUser(user);
    //打印id的值
    System.out.println("userId="+user.getId());
   MybatisUtils.closeSqlSession(sqlSession);
}
```

总体解释：将插入数据的主键返回到 user 对象中。

- 具体解释：

- SELECT LAST_INSERT_ID()：得到刚 insert 进去记录的主键值，只适用与自增主键

- keyProperty：将查询到主键值设置到 parameterType 指定的对象的那个属性

- keyColumn 指定的是表中的主键字段名

- resultType：指定 SELECTLAST_INSERT_ID() 的结果类型

3.7 映射配置文件小结

![](https://tcs-devops.aliyuncs.com/storage/112va82fff1c2d3d6c540e7f8e3d96c8d28d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI4MywiaWF0IjoxNjg5NTczNDgzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhODJmZmYxYzJkM2Q2YzU0MGU3ZjhlM2Q5NmM4ZDI4ZCJ9.YeJsIQUf041p7wH8xScrKAe__wRMGgzf2r-a_YohbHc&download=%E5%9B%BE%E7%89%87.png "")





