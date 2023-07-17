4.1 核心配置文件介绍

核心配置文件包含了 MyBatis 最核心的设置和属性信息。如数据库的连接、事务、连接池信息等。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--MyBatis的DTD约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
​
<!--configuration 核心根标签-->
<configuration>
​
    <!--environments配置数据库环境，环境可以有多个。default属性指定使用的是哪个-->
    <environments default="mysql">
        <!--environment配置数据库环境  id属性唯一标识-->
        <environment id="mysql">
            <!-- transactionManager事务管理。  type属性，采用JDBC默认的事务-->
            <transactionManager type="JDBC"></transactionManager>
            <!-- dataSource数据源信息   type属性 连接池-->
            <dataSource type="POOLED">
                <!-- property获取数据库连接的配置信息 -->
                <property name="driver" value="com.mysql.jdbc.Driver" />
                <property name="url" value="jdbc:mysql:///db1" />
                <property name="username" value="root" />
                <property name="password" value="root" />
            </dataSource>
        </environment>
    </environments>
​
    <!-- mappers引入映射配置文件 -->
    <mappers>
        <!-- mapper 引入指定的映射配置文件   resource属性指定映射配置文件的名称 -->
        <mapper resource="IUserDao.xml"/>
    </mappers>
</configuration>
```

4.2 数据库连接配置文件引入

properties标签引入外部文件

```xml
 <!--引入数据库连接的配置文件-->
    <properties resource="jdbc.properties"/>
```

- 具体使用，如下配置  

```xml
<!-- property获取数据库连接的配置信息 -->
    <property name="driver" value="${driver}" />
    <property name="url" value="${url}" />
    <property name="username" value="${username}" />
    <property name="password" value="${password}" />

```

4.3 起别名

- `<typeAliases>`：为全类名起别名的父标签。

- `<typeAlias>`：为全类名起别名的子标签。

- 属性      type：指定全类名      alias：指定别名

- `<package>`：为指定包下所有类起别名的子标签。(别名就是类名)

- 如下图：

![](https://tcs-devops.aliyuncs.com/storage/112v3cd5b33acae84763d98c3facbbc0daf2?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODE3NiwiaWF0IjoxNjg5NTczMzc2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYzY2Q1YjMzYWNhZTg0NzYzZDk4YzNmYWNiYmMwZGFmMiJ9.CHq3R5G1MdgNl8dvtkyFkLcs_0v0K4T8tHrEjGMHWhA&download=%E5%9B%BE%E7%89%87.png "")

- 具体如下配置    

```xml
  <!--起别名-->
    <typeAliases>
        <typeAlias type="com.by.pojo.User" alias="user"/>
        <!--<package name="com.by.pojo"/>-->
    </typeAliase

```

4.4 总结

![](https://tcs-devops.aliyuncs.com/storage/112v0c0d31b5af55c5b5c9072d56c6479a04?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODE3NiwiaWF0IjoxNjg5NTczMzc2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYwYzBkMzFiNWFmNTVjNWI1YzkwNzJkNTZjNjQ3OWEwNCJ9.UhsIvxAsbC8ZOed_EGF_F075UoeJ5F8sno_gXNPlAhc&download=%E5%9B%BE%E7%89%87.png "")

### Mybatis传统方式开发

Dao 层传统实现方式

- 分层思想：控制层(controller)、业务层(service)、持久层(dao)。

- 调用流程

![](https://tcs-devops.aliyuncs.com/storage/112vf6655a302c1e634c16b6cb30bab651d1?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3ODE3NiwiaWF0IjoxNjg5NTczMzc2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZmNjY1NWEzMDJjMWU2MzRjMTZiNmNiMzBiYWI2NTFkMSJ9.qi8qBewwGOt4Dn63bh7hTsb3dJHcq63QpcltvAgx3AA&download=%E5%9B%BE%E7%89%87.png "")

### LogBack的配置和使用

- 在日常开发过程中，排查问题时难免需要输出 MyBatis 真正执行的 SQL 语句、参数、结果等信息，我们就可以借助 LogBack 的功能来实现执行信息的输出。

- 使用步骤：添加logback.xml配置

```xml
<?xml version="1.0"?>
<configuration>
    <!--定义日志文件的存储地址 logs为当前项目的logs目录 还可以设置为../logs -->
    <property name="LOG_HOME" value="logs" />
    <!-- ch.qos.logback.core.ConsoleAppender 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    <!-- 日志级别 -->
    <root>
        <level value="off" />
        <appender-ref ref="STDOUT" />
    </root>
    <logger name="cn" level="DEBUG"/>
</configuration>
```

pom导入：

```text
<dependency>
　　<groupId>ch.qos.logback</groupId>
　　<artifactId>logback-classic</artifactId>
　　<version>1.2.3</version>
</dependency>
​
<dependency>
      <groupId>org.logback-extensions</groupId>
      <artifactId>logback-ext-spring</artifactId>
      <version>0.1.5</version>
 </dependency>
​
<dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.26</version>
    </dependency>
​
<!--SLF4J转化包 可以打印spring框架的日志-->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>jcl-over-slf4j</artifactId>
    <version>1.7.25</version>
</dependency>
```





