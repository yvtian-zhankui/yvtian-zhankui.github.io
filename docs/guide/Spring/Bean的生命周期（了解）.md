问题导入

问题1：多例的Bean能够配置并执行销毁的方法？

问题2：如何做才执行Bean销毁的方法？

### 1 生命周期相关概念介绍

- 生命周期：从创建到消亡的完整过程

- bean生命周期：bean从创建到销毁的整体过程

- bean生命周期控制：在bean创建后到销毁前做一些事情



### 2 代码演示

2.1 Bean生命周期控制

- 提供生命周期控制方法

```text
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ...");
    }
    //表示bean初始化对应的操作
    public void init(){
        System.out.println("init...");
    }
    //表示bean销毁前对应的操作
    public void destory(){
        System.out.println("destory...");
    }
}
```

- applicationContext.xml配置

```text
<!--init-method：设置bean初始化生命周期回调函数,此处填写init方法名-->
<!--destroy-method：设置bean销毁生命周期回调函数，仅适用于单例对象，此处填写destory方法名-->
<bean id="bookDao" class="com.by.dao.impl.BookDaoImpl" init-method="init" destroy-method="destory"/>
```

- 测试类

```text
public class AppForLifeCycle {
    public static void main( String[] args ) {
        //此处需要使用实现类类型，接口类型没有close方法
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        BookDao bookDao = (BookDao) ctx.getBean("bookDao");
        bookDao.save();
        //关闭容器，执行销毁的方法
        ctx.close();
    }
}
```

**执行结果**

![](https://tcs-devops.aliyuncs.com/storage/112v02070e6f2e9b41c29763ccf068b787fc?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzODA5MiwiaWF0IjoxNjg3OTMzMjkyLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYwMjA3MGU2ZjJlOWI0MWMyOTc2M2NjZjA2OGI3ODdmYyJ9.7LFljhaoFI_8AhQWKLAv3ccYgHYfCuTHbEndIGB1H3M&download=%E5%9B%BE%E7%89%87.png "")

2.2 Bean生命周期控制

- 实现InitializingBean, DisposableBean接口

```text
public class BookServiceImpl implements BookService, InitializingBean, DisposableBean {
    private BookDao bookDao;
    public void setBookDao(BookDao bookDao) {
        System.out.println("set .....");
        this.bookDao = bookDao;
    }
    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
    public void destroy() throws Exception {
        System.out.println("service destroy");
    }
    public void afterPropertiesSet() throws Exception {
        System.out.println("service init");
    }
}
```

applicationContext.xml配置：

```text
<bean id="bookDao" class="com.by.dao.impl.BookDaoImpl" init-method="init" destroy-method="destory"></bean>
<bean id="bookService" class="com.by.service.impl.BookServiceImpl">
        <property name="bookDao" ref="bookDao"></property>
</bean>
```





### 3 Bean销毁时机

- 容器关闭前触发bean的销毁

- 关闭容器方式：

    - 手工关闭容器`ConfigurableApplicationContext`接口`close()`操作

    - 注册关闭钩子，在虚拟机退出前先关闭容器再退出虚拟机`ConfigurableApplicationContext`接口`registerShutdownHook()`操作

```text
public class AppForLifeCycle {
    public static void main( String[] args ) {
        //此处需要使用实现类类型，接口类型没有close方法
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
​
        BookDao bookDao = (BookDao) ctx.getBean("bookDao");
        bookDao.save();
        //注册关闭钩子函数，在虚拟机退出之前回调此函数，关闭容器
        ctx.registerShutdownHook();
        //关闭容器
        //ctx.close();
    }
}
```



