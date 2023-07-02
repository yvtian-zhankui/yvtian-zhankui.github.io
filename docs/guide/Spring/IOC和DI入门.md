# IOC入门案例【重点】

问题导入

`<bean>`标签中id属性和class属性的作用是什么？

1.1 门案例思路分析

1. 管理什么？(Service与Dao)

1. 如何将被管理的对象告知IOC容器？(配置文件)

1. 被管理的对象交给IOC容器，如何获取到IoC容器？(接口)

1. IOC容器得到后，如何从容器中获取bean？(接口方法)

1. 使用Spring导入哪些坐标？(pom.xml)

1.2 实现步骤

```text
【第一步】导入Spring坐标
【第二步】定义Spring管理的类（接口）
【第三步】创建Spring配置文件，配置对应类作为Spring管理的bean对象
【第四步】初始化IOC容器（Spring核心容器/Spring容器），通过容器获取bean对象
```

1.3 实现代码

**【第一步】导入Spring坐标**

```text
<dependencies>
    <!--导入spring的坐标spring-context，对应版本是5.2.10.RELEASE-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.2.10.RELEASE</version>
    </dependency>
</dependencies>
```

**【第二步】定义Spring管理的类（接口）**

- OrderDao 接口和OrderDaoImpl实现类

```text
public interface OrderDao {
    public void save();
}
​
public class OrderDaoImpl implements OrderDao {
    public void save() {
        System.out.println("order dao save ...");
    }
}
```

- BookService接口和BookServiceImpl实现类

```jsx
public interface OrderService {
    public void save();
}
​
public class OrderServiceImpl implements BookService {
    private OrderDao orderkDao = new OrderDaoImpl();
    public void save() {
        System.out.println("order service save ...");
        orderDao.save();
    }
}
```

**【第三步】创建Spring配置文件，配置对应类作为Spring管理的bean对象**

- 定义applicationContext.xml配置文件并配置OrderServiceImpl

```text
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
 
    <!--
        bean标签：表示配置bean
        id属性：表示给bean起名字
        class属性：表示给bean定义类型
    -->
    <bean id="orderService" class="com.by.service.impl.OrderServiceImpl"></bean>
​
</beans>
```

**==注意事项：bean定义时id属性在同一个上下文中(IOC容器中)不能重复==**

**【第四步】初始化IOC容器（Spring核心容器/Spring容器），通过容器获取Bean对象**

```text
public class App {
    public static void main(String[] args) {
        //1.创建IoC容器对象，加载spring核心配置文件
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        //2 从IOC容器中获取Bean对象(BookService对象)
        OrderService orderService= (BookService)ctx.getBean("orderService");
        //3 调用Bean对象(BookService对象)的方法
       orderService.save();
    }
}
```

1.4 运行结果

![](https://tcs-devops.aliyuncs.com/storage/112veec826dcf6f9ee9b7dc3801322b75a69?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzMzc4OCwiaWF0IjoxNjg3OTI4OTg4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlZWM4MjZkY2Y2ZjllZTliN2RjMzgwMTMyMmI3NWE2OSJ9.nC4Q9g1zVM2XiZjmMbKVK8yK1-MJP7O0Spvzzm8Ah_o&download=%E5%9B%BE%E7%89%87.png "")

### 1.5spring相关API

1.5.1 ApplicationContext的继承体系

applicationContext：接口类型，代表应用上下文，可以通过其实例获得 Spring 容器中的 Bean 对象

1.5.2 ApplicationContext的实现类

```java
1）ClassPathXmlApplicationContext 

  它是从类的根路径下加载配置文件 推荐使用这种

2）FileSystemXmlApplicationContext 

  它是从磁盘路径上加载配置文件，配置文件可以在磁盘的任意位置。

3）AnnotationConfigApplicationContext

  当使用注解配置容器对象时，需要使用此类来创建 spring 容器。它用来读取注解。
```

1.5.3 getBean()方法使用

```text
public Object getBean(String name) throws BeansException {  
    assertBeanFactoryActive();   
    return getBeanFactory().getBean(name);
}
public <T> T getBean(Class<T> requiredType) throws BeansException {                     assertBeanFactoryActive();
    return getBeanFactory().getBean(requiredType);
}
```

其中，当参数的数据类型是字符串时，表示根据Bean的id从容器中获得Bean实例，返回是Object，需要强转。

当参数的数据类型是Class类型时，表示根据类型从容器中匹配Bean实例，当容器中相同类型的Bean有多个时，则此方法会报错

**getBean()方法使用**

```java
ApplicationContext applicationContext = new 
            ClassPathXmlApplicationContext("applicationContext.xml");
  UserService userService1 = (UserService) applicationContext.getBean("userService");
  UserService userService2 = applicationContext.getBean(UserService.class);
```



### 2 DI入门案例【重点】

问题导入

`<property>`标签中name属性和ref属性的作用是什么？

2.1 DI入门案例思路分析

1. 基于IOC管理bean

1. Service中使用new形式创建的Dao对象是否保留？(否)

1. Service中需要的Dao对象如何进入到Service中？(提供setter方法)

1. Service与Dao间的关系如何描述？(配置)

2.2 实现步骤

```text
【第一步】删除使用new的形式创建对象的代码
【第二步】提供依赖对象对应的setter方法
【第三步】配置service与dao之间的关系
```

2.3 实现代码

**【第一步】删除使用new的形式创建对象的代码**

```text
  public class OrderServiceImpl implements OrderService {
    //引入dao对象
   private OrderDao orderDao ; //【第一步】删除使用new的形式创建对象的代码
   
    @Override
    public void add() {
        System.out.println("order service save ...");
        orderDao.save();
    }
}
```

**【第二步】提供依赖对象对应的setter方法**

```text
public class OrderServiceImpl implements OrderService {
    //引入dao对象
   private OrderDao orderDao ;
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

**【第三步】配置service与dao之间的关系**

> 在applicationContext.xml中配置

```text
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--
        bean标签：表示配置bean
        id属性：表示给bean起名字
        class属性：表示给bean定义类型
    -->
    <bean id="orderDao" class="com.by.dao.impl.OrderDaoImpl"></bean>
    <bean id="orderService" class="com.by.service.impl.OrderServiceImpl">
        <!--配置service和dao的关系
            property标签，表示配置当前bean的属性
            name属性：指代引用哪一个属性
            ref属性：表示参照哪一个id
        -->
        <property name="orderDao" ref="orderDao"/>
    </bean>
</beans>
```

2.4 图解演示

![](https://tcs-devops.aliyuncs.com/storage/112v9cc75796272ceb1246433d2de21c9021?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzMzc4OCwiaWF0IjoxNjg3OTI4OTg4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5Y2M3NTc5NjI3MmNlYjEyNDY0MzNkMmRlMjFjOTAyMSJ9.tBV0bWwUJn0XoCVfRrp3Jj9PIq3yXFZM60F1Mcj6Z9Q&download=%E5%9B%BE%E7%89%87.png "")



