依赖注入方式【重点】

问题导入

依赖注入有几种方式？

1.1 依赖注入的两种方式

- setter注入简单类型==**引用类型(很常用)**==

- 构造器注入简单类型引用类型

1.2 setter方式注入

问题导入

setter方式注入使用什么子标签？

引用类型

![](https://tcs-devops.aliyuncs.com/storage/112v738a95fd420d32964558ab56d661a96a?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzIxNiwiaWF0IjoxNjg3OTk4NDE2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY3MzhhOTVmZDQyMGQzMjk2NDU1OGFiNTZkNjYxYTk2YSJ9.6AFA4q2NACbs5E0i1bEVYmATzx-Jt-s00Kik3SAC1Dk&download=%E5%9B%BE%E7%89%87.png "")

简单类型

![](https://tcs-devops.aliyuncs.com/storage/112vaa2fe5d0b547ab2df2b4540c6a6c2e4f?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzIxNiwiaWF0IjoxNjg3OTk4NDE2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhYTJmZTVkMGI1NDdhYjJkZjJiNDU0MGM2YTZjMmU0ZiJ9.k8dkutp6N7H5Pc436l1AhzRGquersUHAGnjqar1essQ&download=%E5%9B%BE%E7%89%87.png "")

1.3 构造方式注入

问题导入

构造方式注入使用什么子标签？

引用类型

在bean中定义引用类型属性并提供可访问的构造方法

```text
public class OrderServiceImpl implements OrderService {
    //引入dao对象
   private OrderDao orderDao ;
​
    public OrderServiceImpl(OrderDao orderDao) {
        this.orderDao = orderDao;
    }
```

配置中使用constructor-arg标签 ref属性注入引用类型对象

```text
<bean id="orderDao" class="com.by.dao.impl.OrderDaoImpl"></bean>
​
<bean id="orderService" class="com.by.service.impl.OrderServiceImpl">
    <constructor-arg name="orderDao" ref="orderDao"/>
</bean>
```

1.4 依赖注入方式选择

1. 强制依赖使用构造器进行，使用setter注入有概率不进行注入导致null对象出现

1. 可选依赖使用setter注入进行，灵活性强

1. Spring框架倡导使用构造器，第三方框架内部大多数采用构造器注入的形式进行数据初始化，相对严谨

1. 如果有必要可以两者同时使用，使用构造器注入完成强制依赖的注入，使用setter注入完成可选依赖的注入

1. 实际开发过程中还要根据实际情况分析，如果受控对象没有提供setter方法就必须使用构造器注入

1. **==自己开发的模块推荐使用setter注入==**

### 2 依赖自动装配【理解】

问题导入

如何配置按照类型自动装配？

2.1 自动装配概念

- IoC容器根据bean所依赖的资源在容器中自动查找并注入到bean中的过程称为自动装配

- 自动装配方式==按类型（常用）==按名称按构造方法不启用自动装配

2.2 自动装配类型

依赖自动装配

> 配置中使用bean标签autowire属性设置自动装配的类型---按类型

```text
<bean id="bookDao" class="com.by.dao.impl.BookDaoImpl"/>
<bean id="bookService" class="com.by.service.impl.BookServiceImpl" autowire="byType"/>
```

代码演示：

```text
public class BookDaoImpl implements BookDao {
    @Override
    public void save() {
        System.out.println("book dao save ...");
    }
```

serviceImpl：

```text
public class BookServiceImpl implements BookService {
    private BookDao bookDao;
    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }
    @Override
    public void save() {
        bookDao.save();
        System.out.println("book dao running.....");
    }
```

测试：

```text
 ApplicationContext ac=new ClassPathXmlApplicationContext("application.xml");
BookService bookService= (BookService) ac.getBean("bookService");
 bookService.save();
```

问题导入：

如果出现两个id怎么办？比如

```text
<bean id="bookDao" class="com.by.dao.impl.BookDaoImpl"/>
<bean id="bookDao2" class="com.by.dao.impl.BookDaoImpl"/>
 <bean id="bookService" class="com.by.service.impl.BookServiceImpl" autowire="byName" />
```

依赖自动装配特征

1. 自动装配用于引用类型依赖注入，不能对简单类型进行操作

1. 使用按类型装配时（byType）必须保障容器中相同类型的bean唯一，推荐使用

1. 使用按名称装配时（byName）必须保障容器中具有指定名称的bean，因变量名与配置耦合，不推荐使用

1. 自动装配优先级低于setter注入与构造器注入，同时出现时自动装配配置失效



### 3 集合注入

准备工作：

```text
public class OrderDaoImpl implements OrderDao {
    public int[] array;
    public List<String> list;
    public Set<String> set;
    public Map<String,String> map;
    public Properties properties;
    //生成Setter方法
```

3.1 注入数组类型数据

```text
 <bean id="orderDao" class="com.by.dao.impl.OrderDaoImpl">
<property name="array">
    <array>
        <value>100</value>
        <value>200</value>
        <value>300</value>
    </array>
</property>
</bean>
```

3.2 注入List类型数据

```text
<property name="list">
    <list>
        <value>北京</value>
        <value>河南</value>
        <value>郑州</value>
        <value>高新区</value>
    </list>
</property>
```

3.3 注入Set类型数据

```text
<property name="set">
    <set>
        <value>北京</value>
        <value>河南</value>
        <value>郑州</value>
        <value>高新区</value>
    </set>
</property>
```

3.4 注入Map类型数据

```text
<property name="map">
    <map>
        <entry key="country" value="china"/>
        <entry key="province" value="henan"/>
        <entry key="city" value="kaifeng"/>
    </map>
</property>
```

3.5 注入Properties类型数据

```text
<property name="properties">
    <props>
        <prop key="country">china</prop>
        <prop key="province">henan</prop>
        <prop key="city">kaifeng</prop>
    </props>
</property>
```

> 说明：property标签表示setter方式注入，构造方式注入constructor-arg标签内部也可以写`<array>、<list>、<set>、<map>、<props>`标签

