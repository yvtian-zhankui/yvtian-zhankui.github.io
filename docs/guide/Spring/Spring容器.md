### 1 Spring核心容器介绍

问题导入

问题：按照Bean名称获取Bean有什么弊端，按照Bean类型获取Bean有什么弊端？

1.1 创建容器

- 方式一：类路径加载配置文件

```text
ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
```

- 方式二：文件路径加载配置文件

```text
ApplicationContext ctx = new FileSystemXmlApplicationContext("D:\\applicationContext.xml");
```

- 加载多个配置文件

```text
ApplicationContext ctx = new ClassPathXmlApplicationContext("bean1.xml", "bean2.xml");
```

1.2 获取bean对象

- 方式一：使用bean名称获取

> 弊端：需要自己强制类型转换

```text
BookDao bookDao = (BookDao) ctx.getBean("bookDao");
```

- **==方式二：使用bean名称获取并指定类型==**

> 推荐使用

```text
BookDao bookDao = ctx.getBean("bookDao", BookDao.class);
```

- 方式三：使用bean类型获取

> 弊端：如果IOC容器中同类型的Bean对象有多个，此处获取会报错

```text
BookDao bookDao = ctx.getBean(BookDao.class);
```

1.3 容器类层次结构

![](https://tcs-devops.aliyuncs.com/storage/112v9fdae9f80f430bb18c1066f3e77c6c53?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzUwMywiaWF0IjoxNjg3OTk4NzAzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5ZmRhZTlmODBmNDMwYmIxOGMxMDY2ZjNlNzdjNmM1MyJ9.QnMwn-WfcIffCHTp3qDnNmOwSFIKqeLf6sj-xsoPBGU&download=%E5%9B%BE%E7%89%87.png "")

1.4 BeanFactory

- 类路径加载配置文件

```text
Resource resources = new ClassPathResource("applicationContext.xml");
BeanFactory bf = new XmlBeanFactory(resources);
BookDao bookDao = bf.getBean("bookDao", BookDao.class);
bookDao.save();
```

- BeanFactory创建完毕后，所有的Bean均为延迟加载，也就是说我们调用getBean()方法获取Bean对象时才创建Bean对象并返回给我们



### 2 Spring核心容器总结

2.1 容器相关

- BeanFactory是IoC容器的顶层接口，初始化BeanFactory对象时，加载的bean延迟加载

- ApplicationContext接口是Spring容器的核心接口，初始化时bean立即加载

- ApplicationContext接口提供基础的bean操作相关方法，通过其他接口扩展其功能

- ApplicationContext接口常用初始化类

    - **==ClassPathXmlApplicationContext(常用)==**

    - FileSystemXmlApplicationContext

2.2 bean相关

```text
<bean id="cartDao"                                          bean的Id
      name="dao cartDaoImpl"                                bean的别名
      class="com.by.dao.impl.CartDaoImpl"               bean类型，静态工厂类，FactoryBean类
      scope="singleton"                                 控制bean的实例数量
      init-method="init"                                生命周期初始化方法
      destroy-method="destory"                          生命周期销毁方法
      autowire="byType"                                 自动装配类型
      factory-method="getOrderDao"                      bean工厂方法，应用于静态工厂或实例工厂
      factory-bean="com.by.dao.OrderDaoFactory"         实例工厂bean
      lazy-init="true">                                 控制bean延迟加载
    
</bean>
```

2.3 依赖注入相关

```text
<bean id="orderDao" class="com.by.dao.impl.OrderDaoImpl">
    <constructor-arg name="cartDao" ref="cartDao"/>                 构造器注入引用类型
    <constructor-arg name="orderDao" ref="orderDao"/>               
    <constructor-arg name="msg" ref="WARN"/>                        构造器注入简单类型
    <constructor-arg type="java.lang.String" index="3" value="WARN"/>类型匹配与索引匹配
    <property name="cartDao" value="cartDao"/>                      setter注入引用类型
    <property name="orderDao" value="orderDao"/>
    <property name="msg" value="WARN"/>                             setter注入简单类型
    <property name="names">                                         setter注入集合类型
        <list>                                                      list集合
            <value>second</value>                                   集合注入简单类型    
            <ref bean="dataSource"></ref>                           集合注入引用类型
        </list>
    </property>
​
</bean>
```

## 三、Spring注解开发

### 1 注解开发定义Bean对象【重点】

> 目的：xml配置Bean对象有些繁琐，使用注解简化Bean对象的定义

问题导入

问题1：使用什么标签进行Spring注解包扫描？

问题2：@Component注解和@Controller、@Service、@Repository三个衍生注解有什么区别？

1.1 基本使用

**【第一步】在applicationContext.xml中开启Spring注解包扫描**

```text
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
​
<!--开启注解扫描 扫描com.by及其子包下所有的类-->
<context:component-scan base-package="com.by"/>
</beans>
```

**【第二步】在类上使用@Component注解定义Bean。**

```text
//@Component定义bean
@Component("orderDao")
public class OrderDaoImpl implements OrderDao {
    @Override
    public void save() {
        System.out.println("order dao save...");
    }
}
@Component
public class OrderServiceImpl implements OrderService {
   private OrderDao orderDao;
​
    public void setOrderDao(OrderDao orderDao) {
        this.orderDao = orderDao;
    }
​
    @Override
    public void add() {
        System.out.println("order service save ...");
        orderDao.save();
    }
}
```

> 补充说明：如果@Component注解没有使用参数指定Bean的名称，那么类名首字母小写就是Bean在IOC容器中的默认名称。例如：OrderServiceImpl对象在IOC容器中的名称是orderServiceImpl。

**【第三步】在测试类中获取Bean对象**

```text
 @Test
    public void ComponentTest(){
        ApplicationContext ac=new ClassPathXmlApplicationContext("application.xml");
        OrderDao orderDao=(OrderDao) ac.getBean("orderDao");
        System.out.println(orderDao);
        //按类型匹配bean
        OrderService orderService=ac.getBean(OrderService.class);
        System.out.println(orderService);
    }
}
```

> 注意：在测试类中不要调用orderService的save方法，因为还没有给OrderServiceimpl中的bookDao赋值，调用orderService的save方法会出现空指针异常。

**运行结果**

![](https://tcs-devops.aliyuncs.com/storage/112v5183db693304424990f3f6bfedf50ae6?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzUwMywiaWF0IjoxNjg3OTk4NzAzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY1MTgzZGI2OTMzMDQ0MjQ5OTBmM2Y2YmZlZGY1MGFlNiJ9.nnYQHP_IdZ6Jssm4By1CG4wWjEQ0G-9PCXdbHS-PWAk&download=%E5%9B%BE%E7%89%87.png "")

1.2 @Component三个衍生注解

> 说明：加粗的注解为常用注解

- Spring提供`@Component`注解的三个衍生注解

    - `@Controller`：用于表现层bean定义

    - `@Service`：用于业务层bean定义

    - `@Repository`：用于数据层bean定义

```text
@Service("cartDao")
public class CartDaoImpl implements CartDao {
   
}
@Repository
public class OrderServiceImpl implements OrderService {
}
​
```



### 2 纯注解开发模式【重点】

问题导入

问题1：配置类上使用什么注解表示该类是一个配置类？

问题2：配置类上使用什么注解进行Spring注解包扫描？

2.1 纯注解开发模式介绍

- Spring3.0开启了纯注解开发模式，使用Java类替代配置文件，开启了Spring快速开发赛道

- Java类代替Spring核心配置文件

```text
<!--开启注解扫描 扫描com.by及其子包下所有的类-->
<context:component-scan base-package="com.by"/>
    相当于
@Configuration
@ComponentScan("com.by")
public class SpringConfig{
}
```

- @Configuration注解用于设定当前类为配置类

- @ComponentScan注解用于设定扫描路径，此注解只能添加一次，多个数据请用数组格式

```text
@ComponentScan({com.by.service","com.by.dao"})
```

- 读取Spring核心配置文件初始化容器对象切换为读取Java配置类初始化容器对象

```text
//加载配置文件初始化容器
ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
切换为下面
//加载配置类初始化容器
ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
```

2.2 代码演示

**【第一步】定义配置类代替配置文件**

```text
//声明当前类为Spring配置类
@Configuration
//Spring注解扫描，相当于<context:component-scan base-package="com.by"/>
@ComponentScan("com.by")
//设置bean扫描路径，多个路径书写为字符串数组格式
//@ComponentScan({"com.by.service","com.by.dao"})
public class SpringConfig {
}
```

**【第二步】在测试类中加载配置类，获取Bean对象并使用**

```text
 @Test
    public void AppForAnnotaion(){
        ApplicationContext ac=new AnnotationConfigApplicationContext(SpringConfig.class);
        OrderDao orderDao=(OrderDao) ac.getBean("orderDao");
        System.out.println(orderDao);
        //按类型匹配bean
        OrderService orderService=ac.getBean(OrderService.class);
        System.out.println(orderService);
    }
```



### 3 注解开发Bean作用范围和生命周期管理

问题导入

在类上使用什么注解定义Bean的作用范围？

3.1 bean作用范围注解配置

- 使用@Scope定义bean作用范围

```text
@Repository
@Scope("singleton")
public class BookDaoImpl implements BookDao {
}
```

3.2 bean生命周期注解配置

- 使用@PostConstruct、@PreDestroy定义bean生命周期

```text
@Repository
@Scope("singleton")
public class BookDaoImpl implements BookDao {
    public BookDaoImpl() {
        System.out.println("book dao constructor ...");
    }
    @PostConstruct
    public void init(){
        System.out.println("book init ...");
    }
    @PreDestroy
    public void destroy(){
        System.out.println("book destory ...");
    }
}
```

==**注意：@PostConstruct和@PreDestroy注解是jdk中提供的注解，从jdk9开始，jdk中的javax.annotation包被移除了，也就是说这两个注解就用不了了，可以额外导入一下依赖解决这个问题。**==

```text
<dependency>
  <groupId>javax.annotation</groupId>
  <artifactId>javax.annotation-api</artifactId>
  <version>1.3.2</version>
</dependency>
```



### 4 注解开发依赖注入【重点】

问题导入

问题1：请描述@Autowired注解是如何进行自动装配的？

问题2：请描述@Qualifier注解的作用

4.1 使用@Autowired注解开启自动装配模式（按类型）

```text
@Service
public class BookServiceImpl implements BookService {
    //@Autowired：注入引用类型，自动装配模式，默认按类型装配
    @Autowired
    private BookDao bookDao;
​
    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
```

> 说明：不管是使用配置文件还是配置类，都必须进行对应的Spring注解包扫描才可以使用。@Autowired默认按照类型自动装配，如果IOC容器中同类的Bean有多个，那么默认按照变量名和Bean的名称匹配，建议使用@Qualifier注解指定要装配的bean名称

==注意：自动装配基于反射设计创建对象并暴力反射对应属性为私有属性初始化数据，因此无需提供setter方法。==

4.2 使用@Qualifier注解指定要装配的bean名称

> 目的：解决IOC容器中同类型Bean有多个装配哪一个的问题

```text
@Service
public class BookServiceImpl implements BookService {
    //@Autowired：注入引用类型，自动装配模式，默认按类型装配
    @Autowired
    //@Qualifier：自动装配bean时按bean名称装配
    @Qualifier("bookDao")
    //单独使用和@Qualifier+@Autowired 一样 主要是根据名称注入
    @Resource(name="bookDao")
    private BookDao bookDao;
​
    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
```

==注意：@Qualifier注解无法单独使用，必须配合@Autowired注解使用==

4.3 使用@Value实现简单类型注入

```text
@Repository("bookDao")
public class BookDaoImpl implements BookDao {
    //@Value：注入简单类型（无需提供set方法）
    @Value("${name}")
    private String name;
​
    public void save() {
        System.out.println("book dao save ..." + name);
    }
}
```

以上@Value注解中使用${name}从属性文件中读取name值，那么就需要在配置类或者配置文件中加载属性文件。

```text
@Configuration
@ComponentScan("com.by")
//@PropertySource加载properties配置文件
@PropertySource({"classpath:jdbc.properties"}) //{}可以省略不写
public class SpringConfig {
}
```

==注意：@PropertySource()中加载多文件请使用数组格式配置，不允许使用通配符*==



### 5 注解开发管理第三方Bean【重点】

问题导入

导入自己定义的配置类有几种方式？

| 类型   | 描述                       |
| ---- | ------------------------ |
| 名称   | bean                     |
| 类型   | 方法注解                     |
| 所属位置 | 方法定义上方                   |
| 功能   | 设置该方法的返回值作为Spring管理的bean |
| 范例   |                          |

- 说明：

    - 因为第三方bean无法在其源码上进行修改，使用@Bean解决第三方bean的引入问题

    - 该注解用于替换xml配置的静态工厂和实例工厂创建bean，不区分方法是否为静态或非静态

    - @Bean所在的类必须被spring扫描加载，否则该注解无法生效

- 相关属性

    - value（默认）：定义bean的访问id 

**【第一步】单独定义配置类**

```text
public class JdbcConfig {
    //@Bean：表示当前方法的返回值是一个bean对象，添加到IOC容器中
    @Bean
    public DataSource dataSource(){
        DruidDataSource ds = new DruidDataSource();
        ds.setDriverClassName("com.mysql.jdbc.Driver");
        ds.setUrl("jdbc:mysql://localhost:3306/springdb");
        ds.setUsername("root");
        ds.setPassword("12345");
        return ds;
    }
}
```

**【第二步】将独立的配置类加入核心配置**

| 类型   | 描述                     |
| ---- | ---------------------- |
| 名称   | import                 |
| 类型   | 类注解                    |
| 所属位置 | 类定义上方                  |
| 功能   | 导入第三方bean作为Spring控制的资源 |
| 范例   |                        |

说明：

- @Import注解在同一个类上，仅允许添加一次，如果需要导入多个，使用数组的形式进行设定

- 在被导入的类中可以继续使用@Import导入其他资源

- @bean所在的类可以使用导入的形式进入spring容器无需声明为bean

方式1：@Import注解导入式

```text
@Configuration
@ComponentScan("com.by")
//@Import:导入配置信息
@Import({JdbcConfig.class})
public class SpringConfig {
}
```

方式2：@ComponentScan扫描式

```text
@Configuration
@ComponentScan({"com.by.config","com.by.service","com.by.dao"})  //只要com.by.config包扫到了就行，三个包可以合并写成com.by
public class SpringConfig {
}
```

测试：

```text
DataSource dataSource = (DataSource) ac.getBean("dataSource");
System.out.println(dataSource);
```

### 6 注解开发为第三方Bean注入资源【重点】

问题导入

配置类中如何注入简单类型数据，如何注入引用类型数据？

6.1 简单类型依赖注入

```text
public class JdbcConfig {
    //1.定义一个方法获得要管理的对象
    @Value("com.mysql.jdbc.Driver")
    private String driver;
    @Value("jdbc:mysql://localhost:3306/springdb")
    private String url;
    @Value("root")
    private String userName;
    @Value("12345")
    private String password;
    //2.@Bean：表示当前方法的返回值是一个bean对象，添加到IOC容器中
    @Bean
    public DataSource dataSource(){
        DruidDataSource ds = new DruidDataSource();
        ds.setDriverClassName(driver);
        ds.setUrl(url);
        ds.setUsername(userName);
        ds.setPassword(password);
        return ds;
    }
}
```

> 说明：如果@Value()中使用了EL表达式读取properties属性文件中的内容，那么就需要加载properties属性文件。

6.2 引用类型依赖注入

```text
//Spring会自动从IOC容器中找到BookDao对象赋值给参数bookDao变量，如果没有就会报错。
​
@Bean 
public DataSource dataSource(BookDao bookDao){
    System.out.println(bookDao);
    DruidDataSource ds = new DruidDataSource();
    ds.setDriverClassName(driver);
    ds.setUrl(url);
    ds.setUsername(userName);
    ds.setPassword(password);
    return ds;
}
```

> 说明：引用类型注入只需要为bean定义方法设置形参即可，容器会根据类型自动装配对象



### 7 注解开发总结

![](https://tcs-devops.aliyuncs.com/storage/112v3eb17b31861462d7845c85fefa348fc4?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzUwMywiaWF0IjoxNjg3OTk4NzAzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYzZWIxN2IzMTg2MTQ2MmQ3ODQ1Yzg1ZmVmYTM0OGZjNCJ9.fgOc3eBn83LOqQbgodEwrj9VdSRZg5AlJQc8SP54tzo&download=%E5%9B%BE%E7%89%87.png "")



