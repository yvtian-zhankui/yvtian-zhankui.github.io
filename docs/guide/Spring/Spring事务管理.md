### 1 Spring事务简介【重点】

问题导入

Spring提供的事务管理是数据层的事务还是业务层的事务?

1.1 Spring事务作用

- 事务作用：在数据层保障一系列的数据库操作同成功同失败

- Spring事务作用：在数据层或**==业务层==**保障一系列的数据库操作同成功同失败

## 2 声明式事务控制

## 2.1 编程式事务控制相关对象

### PlatformTransactionManager 

PlatformTransactionManager 接口是 spring 的事务管理器，它里面提供了我们常用的操作事务的方法。

![](https://tcs-devops.aliyuncs.com/storage/112vd5027ae11e61d815ff7939084c5ed96a?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZkNTAyN2FlMTFlNjFkODE1ZmY3OTM5MDg0YzVlZDk2YSJ9.TFbz9AZPm_H6v_MOMynCyDQvRUFsgvZZjc-1ZO-MVco&download=%E5%9B%BE%E7%89%87.png "")

注意：

PlatformTransactionManager 是接口类型，不同的 Dao 层技术则有不同的实现类，例如：Dao 层技术是jdbc 或 mybatis 时：org.springframework.jdbc.datasource.DataSourceTransactionManager 

Dao 层技术是hibernate时：org.springframework.orm.hibernate5.HibernateTransactionManager

### TransactionDefinition

TransactionDefinition 是事务的定义信息对象，里面有如下方法：

![](https://tcs-devops.aliyuncs.com/storage/112vccd5154368264c069625ed7b87fd4ab1?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZjY2Q1MTU0MzY4MjY0YzA2OTYyNWVkN2I4N2ZkNGFiMSJ9.3nFaMNUVKDBmzpudBmKo10Z0fjKuihc3c2B2KW20-OY&download=%E5%9B%BE%E7%89%87.png "")

事务隔离级别

设置隔离级别，可以解决事务并发产生的问题，如脏读、不可重复读和虚读。

- ISOLATION_DEFAULT

- ISOLATION_READ_UNCOMMITTED

- ISOLATION_READ_COMMITTED

- ISOLATION_REPEATABLE_READ

- ISOLATION_SERIALIZABLE

### 2.2 什么是声明式事务控制

> ​	Spring 的声明式事务顾名思义就是采用声明的方式来处理事务。这里所说的声明，就是指在配置文件中声明，用在 Spring 配置文件中声明式的处理事务来代替代码式的处理事务。

**声明式事务处理的作用**

- 事务管理不侵入开发的组件。具体来说，业务逻辑对象就不会意识到正在事务管理之中，事实上也应该如此，因为事务管理是属于系统层面的服务，而不是业务逻辑的一部分，如果想要改变事务管理策划的话，也只需要在定义文件中重新配置即可

- 在不需要事务管理的时候，只要在设定文件上修改一下，即可移去事务管理服务，无需改变代码重新编译，这样维护起来极其方便

**注意：Spring 声明式事务控制底层就是AOP。**

### 2.2.1 声明式事务控制的实现

声明式事务控制明确事项：

- 谁是切点？

- 谁是通知？

- 配置切面？

2.2.2 基于xml转账业务案例：

**需求**

- 需求：实现任意两个账户间转账操作

- 需求微缩：A账户减钱，B账户加钱

**实现分析：**

1. 构建实体数据

1. 数据层提供基础操作，指定账户减钱（outMoney），指定账户加钱（inMoney）

1. 业务层提供转账操作（transfer），调用减钱与加钱的操作

1. 开启注解扫描，开启事务管理

1. 事务增强配置

1. 配置事务 AOP 织入

1. 测试代码运行

结果分析：

- 程序正常执行时，账户金额A减B加，没有问题

- 程序出现异常后，转账失败，但是异常之前操作成功，异常之后操作失败，整体业务失败

**代码实现步骤**

1、构建实体类

```text
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IAccount {
    private Integer id;
    private String name;
    private double money;
}
```

2、构建Dao接口及实现类，实现数据读取

```text
public interface IAccountDao {
    //转入
    public void in(String inMan,Double money);
    //转出
    public void out(String outMan,Double money);
}
```

实现类

```text
@Repository
public class IAcountDaoImpl implements IAccountDao {
​
    @Autowired
    private JdbcTemplate jdbcTemplate;
    //转入多少钱
    @Override
    public void in(String inMan, Double money) {
        jdbcTemplate.update("update by_account set money=money+? where name=?",money,inMan);
    }
    //转出多少钱
    @Override
    public void out(String outMan, Double money) {
        jdbcTemplate.update("update by_account set money=money-? where name=? ",money,outMan);
    }
}
```

3、构建service接口及实现类，实现数据业务逻辑处理

```text
public interface IAccountService {
    //转账业务方法
    public void transfer(String inMan,String outMan,double money);
}
```

ServiceImpl实现类

```text
@Service("iAccountService")
public class IAccountServiceImpl implements IAccountService {
​
    @Autowired
    private IAccountDao iAccountDao;
​
    @Override
    public void transfer(String inMan, String outMan, double money) {
        iAccountDao.out(outMan,money);
        int i=1/0;
        iAccountDao.in(inMan,money);
    }
}
```

4、开启注解扫描，开启事务管理

	命名空间修改：

![](https://tcs-devops.aliyuncs.com/storage/112v8e713337a530bd6e5a8421364552684d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY4ZTcxMzMzN2E1MzBiZDZlNWE4NDIxMzY0NTUyNjg0ZCJ9.zILllA5eChvTLvR5K46-DP_1EAzO-kQxF-wZb-0gEwk&download=%E5%9B%BE%E7%89%87.png "")

开启注解扫描

```text
<!-- 开启注解扫描-->
    <context:component-scan base-package="com.by"/>
    <!--加载jdbc.properties-->
    <context:property-placeholder location="classpath:jdbc.properties" system-properties-mode="NEVER"/>
​
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" >
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
<!--    创建jdbctemplate模板对象-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"></property>
    </bean>
```

开启事务管理

```text
<!--开启事务-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>
```

5、开启事务增强

```text
<!--事务增强配置-->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <tx:attributes>
        <!--事务增强配置-->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <!--设置事务的属性信息-->
        <tx:attributes>
        <!-- method 代表切入点
            name=”代表方法“
            isolation=”代表隔离级别“
            propagation=”传播行为“
            timeout=”失效时间“
            read-only=”是否只读“
        -->
<!-- 
    <tx:method name="transfer" isolation="REPEATABLE_READ" propagation="REQUIRED" read-only="false"/>
    <tx:method name="save" isolation="REPEATABLE_READ" propagation="REQUIRED" read-only="false"/>
    <tx:method name="find" isolation="REPEATABLE_READ" propagation="REQUIRED" read-only="false"/>
-->
            <tx:method name="*"/>
        </tx:attributes>
    </tx:advice>
    </tx:attributes>
</tx:advice>
```

6、配置事务 AOP 织入

```text
<!--    事务aop增强-->
   <aop:config>
       <aop:pointcut id="myPointcut" expression="execution(* com.by.service.impl.*.*(..))"/>
        <aop:advisor advice-ref="txAdvice" pointcut-ref="myPointcut"></aop:advisor>
   </aop:config>
```

7、测试代码运行

```text
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:application.xml")
public class SpringTxTest {
    @Autowired
    private IAccountService iAccountService;
    @Test
    public void TestTx(){
        iAccountService.transfer("Tom","Jerry",500);
    }
}
```

### 2.3 切点方法的事务参数的配置说明

```text
<!--事务增强配置-->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <tx:attributes>
        <tx:method name="*"/>
    </tx:attributes>
</tx:advice>
```

其中，[tx:method](tx:method) 代表切点方法的事务参数的配置，例如：

```text
<tx:method name="transfer" isolation="REPEATABLE_READ" propagation="REQUIRED" timeout="-1" read-only="false"/>
```

- name：切点方法名称

- isolation:事务的隔离级别

- propogation：事务的传播行为

- timeout：超时时间

- read-only：是否只读

### 2.4 知识要点

**声明式事务控制的配置要点**

- 平台事务管理器配置

- 事务通知的配置

- 事务aop织入的配置

### 2.5 基于注解事务处理案例

**代码实现：**

	前期工作准备
	
	1、编辑jdbcConfig配置对事务处理的加载
	
	2、SpringConfig配置类的构建
	
	3、使用注解@Transactional 处理业务层转账操作
	
	4、测试运行

**实现步骤**

1、编辑jdbcConfig配置对事务处理的加载

```text
public class JdbcConfig {
    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String userName;
    @Value("${jdbc.password}")
    private String password;
​
    @Bean
    public DataSource dataSource(){
​
        DruidDataSource ds=new DruidDataSource();
        ds.setDriverClassName(driver);
        ds.setUrl(url);
        ds.setUsername(userName);
        ds.setPassword(password);
        return ds;
    }
​
    //配置jdbcTemplate模板对象
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource){
​
        return new JdbcTemplate(dataSource);
    }
    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource){
        //创建datasource支持的 事务对象
        DataSourceTransactionManager transactionManager=new DataSourceTransactionManager();
        transactionManager.setDataSource(dataSource);
​
        return transactionManager;
    }
}
```

	2、SpringConfig配置类的构建

```text
@Configuration
@ComponentScan("com.by")
@EnableAspectJAutoProxy //开启aop
@PropertySource("classpath:jdbc.properties")
@Import(JdbcConfig.class)
//开启注解事务驱动
@EnableTransactionManagement
public class SpringConfig {
}
```

3、业务层添加注解

```text
@Repository
@Transactional
public class IAcountDaoImpl implements IAccountDao {
```

  4、编写测试类

```text
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class SpringAnnTest {
​
    @Autowired
    private IAccountService service;
    @Test
    public void Testann(){
        service.transfer("Tom","Jerry",500);
    }
​
}
```

### 2.6 注解配置声明式事务控制解析

①使用 @Transactional 在需要进行事务控制的类或是方法上修饰，注解可用的属性同 xml 配置方式，例如隔离级别、传播行为等。

②注解使用在类上，那么该类下的所有方法都使用同一套注解参数配置。

③使用在方法上，不同的方法可以采用不同的事务参数配置。

④Xml配置文件中要开启事务的注解驱动<tx:annotation-driven />



### 3 Spring事务角色【理解】

问题导入

什么是事务管理员，什么是事务协调员？

2.1 Spring事务角色

- 事务管理员：发起事务方，在Spring中通常指代业务层开启事务的方法

- 事务协调员：加入事务方，在Spring中通常指代数据层方法，也可以是业务层方法

![](https://tcs-devops.aliyuncs.com/storage/112v057381003c90bc09fa1ace0dba06fa1b?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYwNTczODEwMDNjOTBiYzA5ZmExYWNlMGRiYTA2ZmExYiJ9.Kw2bbReCJwoCL_lOqTCEjR6YPS_ti_o0czoapgglkmk&download=%E5%9B%BE%E7%89%87.png "")

### 4 Spring事务相关配置

问题导入

什么样的异常，Spring事务默认是不进行回滚的？

3.1 事务配置

![](https://tcs-devops.aliyuncs.com/storage/112v4bdff0889bab8b3bce785e1b7f38b141?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY0YmRmZjA4ODliYWI4YjNiY2U3ODVlMWI3ZjM4YjE0MSJ9.sHwZMAmzl5Unk1-1E5m4MwuNqVu2JxKCZWqmnyXAE1E&download=%E5%9B%BE%E7%89%87.png "")

> 说明：对于RuntimeException类型异常或者Error错误，Spring事务能够进行回滚操作。但是对于编译器异常，Spring事务是不进行回滚的，所以需要使用rollbackFor来设置要回滚的异常。

3.2 案例：转账业务追加日志

需求和分析

- 需求：实现任意两个账户间转账操作，并对每次转账操作在数据库进行留痕

- 需求微缩：A账户减钱，B账户加钱，数据库记录日志

- 分析：①：基于转账操作案例添加日志模块，实现数据库中记录日志②：业务层转账操作（transfer），调用减钱、加钱与记录日志功能

- 实现效果预期：    无论转账操作是否成功，均进行转账操作的日志留痕

- 存在的问题：    日志的记录与转账操作隶属同一个事务，同成功同失败

- 实现效果预期改进：    无论转账操作是否成功，日志必须保留

- 事务传播行为：事务协调员对事务管理员所携带事务的处理态度

![](https://tcs-devops.aliyuncs.com/storage/112ve768c65474de125ba99f3d1c2f2a0af8?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlNzY4YzY1NDc0ZGUxMjViYTk5ZjNkMWMyZjJhMGFmOCJ9.2X5i4_lt0EthdSaPcxplqnO2depBhjYEUgTBl6353XE&download=%E5%9B%BE%E7%89%87.png "")

【准备工作】环境整备

```text
USE spring_db;
CREATE TABLE tbl_log(
    id INT PRIMARY KEY AUTO_INCREMENT,
    info VARCHAR(255),
    createDate DATE
);
```

```text
//logDao 接口
public interface LogDao {
    public void log(Log log);
}
//Log Impl实现类
@Repository
public class LogDaoImpl implements LogDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
​
    @Override
    public void log(Log l) {
​
        String sql="insert into tbl_log (info,createDate) values(info=?,createDate=?)";
        Object[] obj={l.getInfo(),l.getCreateDate()};
        int update = jdbcTemplate.update(sql,obj);
        if(update>0){
            System.out.println("成功");
        }
    }
}
//service 接口 和实现类
​
public interface LogService {
    //propagation设置事务属性：传播行为设置为当前操作需要新事务
    @Transactional
    public void log(String outMon, String inMon, Double money);
}
​
@Service
public class LogServiceImpl implements LogService {
    @Autowired
    private LogDao logDao;
    @Override
    public void log(String outMon, String inMon, Double money) {
        Log l=new Log();
        l.setInfo("转账操作由"+outMon+"到"+inMon+"金额："+money);
        l.setCreateDate(new Date());
        logDao.log(l);
    }
}
​
```

【第一步】在AccountServiceImpl中调用logService中添加日志的方法

```text
@Service
public class IAccountServiceImpl implements IAccountService {
​
    @Autowired
    private IAccountDao iAccountDao;
    @Autowired
    private LogService logService;
​
    @Override
    public void transfer(String outMan, String inMan , double money) throws IOException{
        try{
        iAccountDao.out(outMan,money);
        int i=1/0;
        iAccountDao.in(inMan,money);
    }finally {
        logService.log(outMan,inMan,money);
        }
    }
}
```

【第二步】在LogService的log()方法上设置事务的传播行为

```text
public interface LogService {
    //propagation设置事务属性：传播行为设置为当前操作需要新事务
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    void log(String outMon, String inMon, Double money);
}
```

【第三步】运行测试类，查看结果

```text
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class SpringAnnTest {
​
    @Autowired
    private IAccountService service;
   
    @Test
    public void testTransfer() throws IOException {
    service.transfer("Tom","Jerry",500);
    }
}
```

3.3 事务传播行为

![](https://tcs-devops.aliyuncs.com/storage/112v584e9af02c6940000fd86bdfce0cb01d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY1ODRlOWFmMDJjNjk0MDAwMGZkODZiZGZjZTBjYjAxZCJ9.G42V8ZJf1VaW1A4GOcjOYEVR0O4NRWJ9LNgRXARBbNI&download=%E5%9B%BE%E7%89%87.png "")



