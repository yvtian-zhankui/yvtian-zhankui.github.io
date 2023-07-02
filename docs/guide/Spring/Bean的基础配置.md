### 问题导入

问题1：在`<bean>`标签上如何配置别名？

问题2：Bean的默认作用范围是什么？如何修改？

## 1 Bean基础配置【重点】

配置说明

![](https://tcs-devops.aliyuncs.com/storage/112v1b6f63d95031c8ebe176ee5fe7a4704d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYxYjZmNjNkOTUwMzFjOGViZTE3NmVlNWZlN2E0NzA0ZCJ9.v6ld6zLXR-7ByGNeoBpb8kuw9M0IERElklLKvOnSUUw&download=%E5%9B%BE%E7%89%87.png "")

代码演示

```java
<bean id="orderDao" class="com.by.dao.impl.OrderDaoImpl"></bean>
<bean id="orderService" class="com.by.service.impl.OrderServiceImpl">

```

运行结果

![](https://tcs-devops.aliyuncs.com/storage/112vde7fa6b2ce1afe820929b2210d7114f1?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZkZTdmYTZiMmNlMWFmZTgyMDkyOWIyMjEwZDcxMTRmMSJ9.4M2Lj0I8n_uT5-qwkzJeaRECSvhFOtbR0nC5LN_zens&download=%E5%9B%BE%E7%89%87.png "")



## 2 Bean别名配置

配置说明

| 类型  | 描述                                     |
| --- | -------------------------------------- |
| 名称  | name                                   |
| 类型  | 属性                                     |
| 所属  | bean标签                                 |
| 功能  | 定义bean的别名，可定义多个，使用逗号(,)分号( ; ) 空格（ ）分隔 |
| 范例  |                                        |

![](https://tcs-devops.aliyuncs.com/storage/112vef232baac4c6db3526c4ad04168a0fb8?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlZjIzMmJhYWM0YzZkYjM1MjZjNGFkMDQxNjhhMGZiOCJ9.vnfrigkKeOHglOYTWK3hRmFnfN8LdYk7Vj2mrsTDFLY&download=%E5%9B%BE%E7%89%87.png "")

代码演示

![](https://tcs-devops.aliyuncs.com/storage/112va4d94825f6aa1ff8095442798304126c?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhNGQ5NDgyNWY2YWExZmY4MDk1NDQyNzk4MzA0MTI2YyJ9.Tb-xfAkksuVOCPHzPLhBKB9stpjc7gpl89DHDp2r7KY&download=%E5%9B%BE%E7%89%87.png "")

![](https://tcs-devops.aliyuncs.com/storage/112v4d5c0ef14fd9f666aa534fa2384582ad?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY0ZDVjMGVmMTRmZDlmNjY2YWE1MzRmYTIzODQ1ODJhZCJ9.8KvOVCPI28kcQiG2vPB-wUiA8wcKnvXzTpkplSB8gOI&download=%E5%9B%BE%E7%89%87.png "")

打印结果

![](https://tcs-devops.aliyuncs.com/storage/112va39efcec83ac08b1590004a803b2d2f1?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhMzllZmNlYzgzYWMwOGIxNTkwMDA0YTgwM2IyZDJmMSJ9.tIhTd_Q8YIfuz0OL-htjvK2aRCZhhds3TaHgzSp-0m0&download=%E5%9B%BE%E7%89%87.png "")



## 3 Bean作用范围配置【重点】

配置说明

| 类型  | 描述                                                                                                                                                                                                                                                                             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 名称  | scope                                                                                                                                                                                                                                                                          |
| 类型  | 属性                                                                                                                                                                                                                                                                             |
| 所属  | bean标签                                                                                                                                                                                                                                                                         |
| 功能  | 定义bean的作用范围，可选范围：                                                                                                            singleton：单例(默认)                                                                                                                    prototype：非单例 |
| 范例  |                                                                                                                                                                                                                                                                                |



> 扩展：scope的取值不仅仅只有singleton和prototype，还有request、session、application、 websocket ，表示创建出的对象放置在web容器(tomcat)对应的位置。比如：request表示保存到request域中。

代码演示

```java
<!--    sope 是bean的作用范围 可选单例singleton 非单例prototype-->
    <bean id="bookDao" class="com.by.dao.impl.BookDaoImpl" scope="singleton"></bean>
    <bean id="bookDao" class="com.by.dao.impl.BookDaoImpl" scope="prototype"></bean>
```

```java
@Test
public void springdemo01(){
    //演示单例 非单例
    ApplicationContext ac=new ClassPathXmlApplicationContext("application.xml");
    BookDao bookDao=(BookDao)ac.getBean("bookDao");
    BookDao bookDao2=(BookDao)ac.getBean("bookDao");
    System.out.println(bookDao);
    System.out.println(bookDao2);
}
```

打印结果

![](https://tcs-devops.aliyuncs.com/storage/112ved97e46f4c5d7f585b122daa4d0b9400?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlZDk3ZTQ2ZjRjNWQ3ZjU4NWIxMjJkYWE0ZDBiOTQwMCJ9.QL30mdsjhHJ1wEToQABX4ncXhTB9nw8-7yaWLJjxOQ8&download=%E5%9B%BE%E7%89%87.png "")

**非单例打印结果**

![](https://tcs-devops.aliyuncs.com/storage/112vac1c9afe0f5eaf74dfe565cca5c013e9?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhYzFjOWFmZTBmNWVhZjc0ZGZlNTY1Y2NhNWMwMTNlOSJ9.MRa57qIEfSXsKmjC-5CgYOmXU1WZMZSdsrLf1SrJV9o&download=%E5%9B%BE%E7%89%87.png "")

> 最后给大家说明一下：在我们的实际开发当中，绝大部分的Bean是单例的，也就是说绝大部分Bean不需要配置scope属性。



## 4 Bean的实例化

### 问题导入

Bean的实例化方式有几种？

### 1 Bean是如何创建的【理解】

bean本质上就是对象，创建bean使用构造方法完成



### 2 实例化Bean的三种方式

2.1 构造方法方式【重点】

- BookDaoImpl实现类

```java
public class BookDaoImpl implements BookDao {
    public BookDaoImpl() {
        System.out.println("book dao 构造运行中。。。。");
    }
​
    @Override
    public void save() {
        System.out.println("book dao save....");
    }
}
```

- applicationContext.xml配置

```java
<!--方式一：构造方法实例化bean-->
<bean id="bookDao" class="com.by.dao.impl.BookDaoImpl"/>
```

- AppForInstanceBook测试类

```java
public class AppForInstanceBook {
    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
​
        BookDao bookDao = (BookDao) ctx.getBean("bookDao");
​
        bookDao.save();
    }
}
```

- 运行结果

![](https://tcs-devops.aliyuncs.com/storage/112v580fce2ba06cd35a227f99bbf628ac4f?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY1ODBmY2UyYmEwNmNkMzVhMjI3Zjk5YmJmNjI4YWM0ZiJ9.1kg-QrFH4SvHDlOzPAJLpH8c_rSVLxjeADuuh7eg3s0&download=%E5%9B%BE%E7%89%87.png "")

==注意：无参构造方法如果不存在，将抛出异常`BeanCreationException`==

2.2 静态工厂方式

- OrderDao接口和OrderDaoImpl实现类

```java
public interface OrderDao {
    public void save();
}
public class OrderDaoImpl implements OrderDao {
    public void save() {
        System.out.println("order dao save ...");
    }
}
```

- OrderDaoFactory工厂类

```text
//静态工厂创建对象
public class OrderDaoFactory {
    public static OrderDao getOrderDao(){
        System.out.println("工厂类创建中。。。");
        return new OrderDaoImpl();
    }
}
```

- applicationContext.xml配置

```text
<!--方式二：使用静态工厂实例化bean-->
<bean id="orderDao" class="com.by.factory.OrderDaoFactory" factory-method="getOrderDao"/>
```



- AppForInstanceOrder测试类

```text
public class AppForInstanceOrder {
    public static void main(String[] args) {
        
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
​
        OrderDao orderDao = (OrderDao) ctx.getBean("orderDao");
​
        orderDao.save();
    }
}
```

- 运行结果

![](https://tcs-devops.aliyuncs.com/storage/112v59e9272b6968dec14d3c56ed9ae06e2e?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY1OWU5MjcyYjY5NjhkZWMxNGQzYzU2ZWQ5YWUwNmUyZSJ9.cdCfQxRQUI9vLGHNgSp5sLrECaSsXrDTRS9O7UT6L58&download=%E5%9B%BE%E7%89%87.png "")

2.3 实例工厂方式

- UserDao接口和UserDaoImpl实现类

```java
public interface UserDao {
    public void save();
}
public class UserDaoImpl implements UserDao {
    public void save() {
        System.out.println("user dao save ...");
    }
}
```

- UserDaoFactory工厂类

```java
//实例工厂创建对象
public class UserDaoFactory {
    public UserDao getUserDao(){
        return new UserDaoImpl();
    }
}
```

- applicationContext.xml配置

```java
<!--方式三：使用实例工厂实例化bean-->
  <bean id="userFactoy" class="com.by.factory.UserDaoFactory"/>
​
  <bean id="userDao" factory-method="getUserDao" factory-bean="userFactoy"/>
```

- AppForInstanceUser测试类

```java
public class AppForInstanceUser {
    public static void main(String[] args) {
        //        //创建实例工厂对象
        //        UserDaoFactory userDaoFactory = new UserDaoFactory();
        //        //通过实例工厂对象创建对象
        //        UserDao userDao = userDaoFactory.getUserDao();
        //        userDao.save();
        ApplicationContext ac=new ClassPathXmlApplicationContext("application.xml");
        UserDao userDao = (UserDao)ac.getBean("userDao");
        userDao.save();
    }
}
```

- 运行结果

![](https://tcs-devops.aliyuncs.com/storage/112v4cb8baf8bc0b8f07cbb9b5e8f1b4dc93?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY0Y2I4YmFmOGJjMGI4ZjA3Y2JiOWI1ZThmMWI0ZGM5MyJ9.L6aYX3jAxHX2s6-9N4oAx58_6Uv80RLztvApEjDe8Ig&download=%E5%9B%BE%E7%89%87.png "")

2.4 实现FactoryBean`<T>`方式【扩展,了解】

- 定义`UserDaoFactoryBean` 实现`FactoryBean<UserDao>`

> UserDaoFactoryBean中实例化什么类型的对象泛型就是该类型。

```text
//FactoryBean创建对象
public class UserDaoFactoryBean implements FactoryBean<UserDao> {
    //代替原始实例工厂中创建对象的方法
    public UserDao getObject() throws Exception {
        return new UserDaoImpl();
    }
​
    public Class<?> getObjectType() {
        return UserDao.class;
    }
}
```

- applicationContext.xml配置

```text
<!--方式四：使用FactoryBean实例化bean-->
<bean id="userDao" class="com.by.factory.UserDaoFactoryBean"/>
```

> 使用之前的AppForInstanceUser测试类去运行看结果就行了。注意配置文件中id="userDao"是否重复。



