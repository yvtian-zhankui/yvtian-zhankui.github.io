## 1.1 框架介绍

- 框架是一款半成品软件，我们可以基于这个半成品软件继续开发，来完成我们个性化的需求！

- 如图:

![](https://tcs-devops.aliyuncs.com/storage/112v0040572534508d1fd5459b77035793d2?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI2MCwiaWF0IjoxNjg5NTczNDYwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYwMDQwNTcyNTM0NTA4ZDFmZDU0NTliNzcwMzU3OTNkMiJ9.fLdCgm0yfGdpMCATy5Tpfa8BcmbcvxSLVv76-lI6snI&download=%E5%9B%BE%E7%89%87.png "")

## 1.2 框架要解决的问题

 框架要解决的最重要的一个问题是技术整合的问题，在 J2EE 的 框架中， 有着各种各样的技术，不同的 软件企业需要从 J2EE 中选择不同的技术，这就使得软件企业最终的应用依赖于这些技术，技术自身的复杂性和技 术的风险性将会直接对应用造成冲击。而应用是软件企业的核心，是竞争力的关键所在，因此应该将应用自身的设 计和具体的实现技术解耦。这样，软件企业的研发将集中在应用的设计上，而不是具体的技术实现，技术实现是应 用的底层支撑，它不应该直接对应用产生影响。

**框架一般处在低层应用平台(如 J2EE)和高层业务逻辑之间的中间层。**

1.3 软件开发的分层重要性

  框架的重要性在于它实现了部分功能，并且能够很好的将低层应用平台和高层业务逻辑进行了缓和。为了实现 软件工程中的“高内聚、低耦合”。把问题划分开来各个解决，易于控制，易于延展，易于分配资源。我们常见的 MVC 软件设计思想就是很好的分层思想。

![](https://tcs-devops.aliyuncs.com/storage/112vacd6378672fe405ee21cff6b62faa802?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI2MCwiaWF0IjoxNjg5NTczNDYwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhY2Q2Mzc4NjcyZmU0MDVlZTIxY2ZmNmI2MmZhYTgwMiJ9.XIRJ-bEq4kb4J54XhVbeL932rI4VoqwX1hAHth27gwY&download=%E5%9B%BE%E7%89%87.png "")

1.3.1 分层开发下的常见框架

常见的 JavaEE 开发框架：                                     

 **1、解决数据的持久化问题的框架**  

![](https://tcs-devops.aliyuncs.com/storage/112v2a1e57fc6467cdfc5e33c671750d2575?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI2MCwiaWF0IjoxNjg5NTczNDYwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYyYTFlNTdmYzY0NjdjZGZjNWUzM2M2NzE3NTBkMjU3NSJ9.PD71Gq2jtCIMNF-3LtNM1CZSkOUH8eqeb24pvveLhs8&download=%E5%9B%BE%E7%89%87.png "")

作为持久层的框架，还有一个封装程度更高的框架就是 Hibernate，但这个框架因为各种原因目前在国内的 流行程度下降太多， 现在公司开发也越来越少使用。 目前使用 Spring Data 来实现数据持久化也是一种趋势。 

**2、解决 WEB 层问题的 MVC 框架**  

通过策略接口，Spring 框架是高度可配置的，而且包含多种视图技术，例如 **JSP** 技术、[POI](https://baike.baidu.com/item/POI/8886826?fromModule=lemma_inlink)。Spring MVC 框架并不知道使用的视图，所以不会强迫开发者只使用 JSP 技术。Spring MVC 分离了控制器、[模型对象](https://baike.baidu.com/item/%E6%A8%A1%E5%9E%8B%E5%AF%B9%E8%B1%A1/56035175?fromModule=lemma_inlink)、过滤器以及处理程序对象的角色，这种分离让它们更容易进行定制。

它是一个典型的教科书式的[mvc](https://baike.baidu.com/item/mvc/85990?fromModule=lemma_inlink)构架，第二是一个纯正的[servlet](https://baike.baidu.com/item/servlet/477555?fromModule=lemma_inlink)系统。而且框架本身有代码，看起来容易理解。

**3、解决技术整合问题的框架**

Spring是Java EE编程领域的一个轻量级开源框架，它集成各类型的工具，通过核心的[Bean](https://baike.baidu.com/item/Bean/3792612?fromModule=lemma_inlink) factory实现了底层的类的实例化和生命周期的管理。spring是控制反转(IOC)和面向切面(AOP)的容器框架

- 目的：解决企业应用开发的复杂性

- 功能：使用基本的JavaBean代替EJB，并提供了更多的企业应用功能

- 范围:   任何java应用

### 1.4 ORM介绍

- ORM(Object Relational Mapping)： 对象关系映射

- 指的是持久化数据和实体对象的映射模式，为了解决面向对象与关系型数据库存在的互不匹配的现象的技术。

- 如图: dao -->实体类-->数据库

![](https://tcs-devops.aliyuncs.com/storage/112vf0dab6e13092c6fafb4f15cf3e0acbe9?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI2MCwiaWF0IjoxNjg5NTczNDYwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZmMGRhYjZlMTMwOTJjNmZhZmI0ZjE1Y2YzZTBhY2JlOSJ9.AbqBNg_xbnQToYOzghge427fqPUER21MOVsP5ssG_4U&download=%E5%9B%BE%E7%89%87.png "")

- 具体映射关系如下图:

![](https://tcs-devops.aliyuncs.com/storage/112v33ade904d3dfcdc15812ee1382d9b4ae?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI2MCwiaWF0IjoxNjg5NTczNDYwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYzM2FkZTkwNGQzZGZjZGMxNTgxMmVlMTM4MmQ5YjRhZSJ9.3i8Xy3RUVrMB6-gQ9KyyzHyohZ_8liJA-HFm3CTJf60&download=%E5%9B%BE%E7%89%87.png "")

1.5 原始jdbc操作（查询数据）

![](https://tcs-devops.aliyuncs.com/storage/112v22fbff1fa6339a6058f0875800d0a43d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI2MCwiaWF0IjoxNjg5NTczNDYwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYyMmZiZmYxZmE2MzM5YTYwNThmMDg3NTgwMGQwYTQzZCJ9.O72VMsvvNWxH_NUBEUOzjXCX3OVMpIW0l29jgaPx--A&download=%E5%9B%BE%E7%89%87.png "")

### 1.6 原始jdbc操作（插入数据）

![](https://tcs-devops.aliyuncs.com/storage/112v3dce5aafd2aca2e0713ab59d90d6c469?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODI2MCwiaWF0IjoxNjg5NTczNDYwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYzZGNlNWFhZmQyYWNhMmUwNzEzYWI1OWQ5MGQ2YzQ2OSJ9.dqNr0TJDq0uurdGgD9JvATkQ8bkm4so1Bqe8RjYtcyE&download=%E5%9B%BE%E7%89%87.png "")

### 1.7 原始jdbc操作的分析

- 原始 JDBC 的操作问题分析     1.频繁创建和销毁数据库的连接会造成系统资源浪费从而影响系统性能。

    - sql 语句在代码中硬编码，如果要修改 sql 语句，就需要修改 java 代码，造成代码不易维护。

    - 查询操作时，需要手动将结果集中的数据封装到实体对象中。

    - 增删改查操作需要参数时，需要手动将实体对象的数据设置到 sql 语句的占位符。 

- 原始 JDBC 的操作问题解决方案     1.使用数据库连接池初始化连接资源。 

    - 将 sql 语句抽取到配置文件中。 

    - 使用反射、内省等底层技术，将实体与表进行属性与字段的自动映射    

### 1.8 什么是Mybatis

 mybatis 是一个优秀的基于java的持久层框架，它内部封装了jdbc，使开发者只需要关注sql语句本身，而不需要花费精力去处理加载驱动、创建连接、创建statement等繁杂的过程。
 采用ORM思想解决了实体和数据库映射的问题，对jdbc 进行了封装，屏蔽了jdbc api 底层访问细节，使我们不用与jdbc api 打交道，就可以完成对数据库的持久化操作。
​
mybatis通过xml或注解的方式将要执行的各种 statement配置起来，并通过java对象和statement中sql的动态参数进行映射生成最终执行的sql语句。
​
最后mybatis框架执行sql并将结果映射为java对象并返回。

MyBatis官网地址：[http://www.mybatis.org/mybatis-3/](http://www.mybatis.org/mybatis-3/) 

​			[https://mybatis.org/mybatis-3/zh/index.html](https://mybatis.org/mybatis-3/zh/index.html)

2  Mybatis的快速入门

**MyBatis案例简化步骤**

	1、导入pom包
	
	1、创建mapper映射文件
	
	2、创建config文件

**准备工作：**

```text
创建数据库：
数据库名称： mybatisdb
创建数据表：
CREATE TABLE `user` (
  `id` int(30) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL
)
```

**导入pom包**

```text
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <version>5.1.47</version>
</dependency>
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>3.5.5</version>
</dependency>
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <version>1.18.16</version>
</dependency
```

**代码开发：**

**1、mapper映射文件编写**

```text
<?xml version="1.0" encoding="UTF-8" ?>
<!--MyBatis的DTD约束-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.by.mapper">
<!--    查询数据源信息-->
    <select id="dbs" resultType="string">
        show databases
    </select>
​
    <select id="showUser" resultType="map">
        select * from user
    </select>
​
    <insert id="save" parameterType="map">
        insert into user values(#{id},#{username},#{sex},#{address},#{birthday})
    </insert>
</mapper>
```

**2、Mybatis配置类编写：**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
​
<!--configuration 核心根标签-->
<configuration>
      <!--引入数据库连接的配置文件-->
    <properties resource="jdbc.properties"/>
    
    <!--environments配置数据库环境，环境可以有多个。default属性指定使用的是哪个-->
    <environments default="mysql">
        <!--environment配置数据库环境  id属性唯一标识-->
        <environment id="mysql">
            <!-- transactionManager事务管理。  type属性，采用JDBC默认的事务-->
            <transactionManager type="JDBC"></transactionManager>
            <!-- dataSource数据源信息   type属性 连接池-->
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
<!--    告诉mybatis 映射文件的位置-->
    <mappers>
        <!-- mapper 引入指定的映射配置文件   resource属性指定映射配置文件的名称 -->
        <mapper resource="com/by/mapper/helloDbMapper.xml"/>
    </mappers>
</configuration>
```

**3、测试类编写**

```java
@Test
public void dbMapperTest() throws Exception {
    InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSessionFactory factory=new SqlSessionFactoryBuilder().build(is);
    SqlSession session = factory.openSession();
    
    //数据源
    List<String> dbs = session.selectList("dbs");
    System.out.println("数据源信息"+dbs);
​
    //数据添加
    Map<String,Object> map=new HashMap<>();
    map.put("id","3");
    map.put("username","周五");
    map.put("sex","男");
    map.put("address","郑州");
    map.put("birthday","2023-01-10");
    int save = session.insert("save", map);
    System.out.println(save);
    session.commit();
​
    //查询所有
    List<Map<String,Object>> showUser = session.selectList("showUser");
    System.out.println(showUser);
​
}
```

### MyBatis快速尝试

**MyBatis开发步骤：**

1. 添加MyBatis的jar包

1. 编写User实体类 

1. 编写持久层接口 **IUserDao**

1. 编写持久层接口的映射文件**IUserDao.xml**

1. 编写核心文件**MyBatisConfig.xml**

1. 编写测试类

2.1  环境搭建

2.2 实现流程

1. **编写User实体**

```text
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer id;
    private String username;
    private Integer sex;
    private String address;
    private Date birthday;
}
```

1. **编写持久层接口 IUserDao**

```java
public interface IUserDao {    
/*    查询所有     */    
public List<User> findAll();
}
```

1. **编写持久层接口的映射文件IUserDao.xml**

```text
<?xml version="1.0" encoding="UTF-8" ?>
<!--MyBatis的DTD约束-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--
    mapper：核心根标签
    namespace属性：名称空间
-->
<mapper namespace="com.by.dao.IUserDao">
    <!--
       select：查询功能的标签
       id属性：唯一标识
       resultType属性：指定结果映射对象类型
       parameterType属性：指定参数映射对象类型
   -->
    <select id="findAll" resultType="com.by.pojo.User">
        select * from user
    </select>
</mapper>
```

1. **编写MyBatis核心文件**

```text
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
​
<!--configuration 核心根标签-->
<configuration>
    <!--引入数据库连接的配置文件-->
    <properties resource="jdbc.properties"/>
​
   
<!-- 给bean实体类配置别名-->
    <typeAliases>
        <typeAlias type="com.by.pojo.User" alias="user"/>
<!--    <package name="com.by.pojo"/>-->
    </typeAliases>
​
    <!--environments配置数据库环境，环境可以有多个。default属性指定使用的是哪个-->
    <environments default="mysql">
        <!--environment配置数据库环境  id属性唯一标识-->
        <environment id="mysql">
            <!-- transactionManager事务管理。  type属性，采用JDBC默认的事务-->
            <transactionManager type="JDBC"></transactionManager>
            <!-- dataSource数据源信息   type属性 连接池-->
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
<!--    告诉mybatis 映射文件的位置-->
    <mappers>
        <!-- mapper 引入指定的映射配置文件   resource属性指定映射配置文件的名称 -->
       <mapper resource="com/by/dao/IUserDao.xml"></mapper>
    </mappers>
</configuration>
```

2.3 编写测试代码

```text
  @Test
    public void findAllTets() throws Exception {
        //1.读取配置文件
        InputStream in = Resources.getResourceAsStream("mybatis-config.xml");
        
        //2.创建sqlSessionFactory 的构建者对象
        SqlSessionFactoryBuilder builder=new SqlSessionFactoryBuilder();
        
        //3.使用构建者创建sqlSessionFactory
        SqlSessionFactory factory = builder.build(in);
        
        //4.使用sqlSessionFactory 生产sqlSession对象
        SqlSession session = factory.openSession();
        
        //5.使用sqlsession 创建dao接口代理对象
        IUserDao userDao = session.getMapper(IUserDao.class);
        
        //6.使用代理对象执行查询所有方法
        List<User> users = userDao.findAll();
        for (User user : users) {
            System.out.println(user);
        }
        //7.释放资源
        in.close();
        session.close();
    }
```

2.4 入门小结：

 通过快速入门示例，我们发现使用 mybatis 是非常容易的一件事情，因为只需要编写 Dao 接口并且按照，Mybatis 要求编写两个配置文件， 就可以实现功能。远比我们之前的 jdbc 方便多了。(我们使用注解之后， 将变得更为简单，只需要编写一个 mybatis 配置文件就够了) 。但是，这里面包含了许多细节，比如为什么会有工厂对象(SqlSessionFactory) ,为什么有了工厂之后还要有构建者对象(SqlSessionFactoryBuilder)，为什么 IUserDao.xml 在创建时有位置和文件名的要求等等。

### 3 基于注解的 mybatis快速入门

   **1、创建mapper接口并添加注解**

```text
/*
      用户操作持久层
 */
public interface IUserMapper {
    //查询所有user
    @Select("select * from user")
    public List<User> findAll();
}
```

**2、修改持久层接口的映射文件UserMapper.xml地址**

```text
<mappers>
    <!-- mapper 引入指定的映射配置文件   resource属性指定映射配置文件的名称 -->
   <mapper resource="com/by/dao/IUserDao.xml"></mapper>
    <!-- class属性指定映射类的名称位置-->
   <mapper class="com.by.mapper.IUserMapper"></mapper>
</mappers>
```

**3、创建测试类**

```text
@Test
public void annmapperTest() throws Exception {
    //1.读取配置文件
    InputStream in = Resources.getResourceAsStream("mybatis-config.xml");
    //创建sqlsession
    SqlSessionFactoryBuilder builder=new SqlSessionFactoryBuilder();
    SqlSessionFactory factory = builder.build(in);
    SqlSession session = factory.openSession();
    IUserMapper mapper = session.getMapper(IUserMapper.class);
    List<User> user = mapper.findAll();
    for (User user1 : user) {
        System.out.println("usermapper="+user1);
    }
}
```

4 知识小结

- 框架       框架是一款半成品软件，我们可以基于框架继续开发，从而完成一些个性化的需求。

- ORM        对象关系映射，数据和实体对象的映射。

- MyBatis       是一个优秀的基于 Java 的持久层框架，它内部封装了 JDBC。

