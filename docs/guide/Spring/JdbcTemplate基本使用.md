01-JdbcTemplate基本使用-概述(了解)

JdbcTemplate是spring框架中提供的一个对象，是对原始繁琐的Jdbc API对象的简单封装。spring框架为我们提供了很多的操作模板类。例如：操作关系型数据的JdbcTemplate和HibernateTemplate，操作nosql数据库的RedisTemplate，操作消息队列的JmsTemplate等等。



### 02-JdbcTemplate基本使用-开发步骤(理解)

①导入spring-jdbc和spring-tx坐标

②创建数据库表和实体

③创建JdbcTemplate对象

④执行数据库操作

### 03-JdbcTemplate基本使用-快速入门代码实现(应用)

导入spring-jdbc和spring-tx坐标

```text
<dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.13</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.2.4</version>
    </dependency>
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>5.1.47</version>
    </dependency>
    <dependency>
      <groupId>com.mchange</groupId>
      <artifactId>c3p0</artifactId>
      <version>0.9.5.4</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.3.20</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>5.3.8</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-tx</artifactId>
      <version>5.3.20</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>5.3.20</version>
    </dependency>
  </dependencies>
```

创建数据库表和实体

```text
create table Account(
    name  varchar(50),
    money double )
```

```text
public class Account {
    private String name;
    private double money;
    //生成getter setter方法
```

**先测试连接能不能用：**

创建JdbcTemplate对象

执行数据库操作

```text
//测试jdbcTemplate能否使用
@Test
public void test(){
    //创建数据连接池对象
    DruidDataSource druidDataSource=new DruidDataSource();
    druidDataSource.setDriverClassName("com.mysql.jdbc.Driver");
    druidDataSource.setUrl("jdbc:mysql://localhost:3306/db1");
    druidDataSource.setUsername("root");
    druidDataSource.setPassword("12345");
    //创建jdbc模板对象
    JdbcTemplate jdbcTemplate=new JdbcTemplate();
    //设置数据源对象
    jdbcTemplate.setDataSource(druidDataSource);
    //执行sql语句
    int row=jdbcTemplate.update("insert into account values(?,?)","lisi",5000);
    System.out.println(row);
}
```

04-JdbcTemplate基本使用-spring产生模板对象分析(理解)

我们可以将JdbcTemplate的创建权交给Spring，将数据源DataSource的创建权也交给Spring，在Spring容器内部将数据源DataSource注入到JdbcTemplate模版对象中,然后通过Spring容器获得JdbcTemplate对象来执行操作。

05-JdbcTemplate基本使用-spring产生模板对象代码实现(应用)

配置如下：

```text
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/db1"/>
        <property name="username" value="root"/>
        <property name="password" value="12345"/>
    </bean>
  <!--jdbc模板对象-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"/>
    </bean>
```

测试代码：

```text
@Test
    //测试Spring产生jdbcTemplate对象
    public void test2() throws PropertyVetoException {
        ApplicationContext app = new ClassPathXmlApplicationContext("application.xml");
        JdbcTemplate jdbcTemplate = app.getBean(JdbcTemplate.class);
        int row = jdbcTemplate.update("insert into account values(?,?)", "lisi", 5000);
        System.out.println(row);
    }
```

06-JdbcTemplate基本使用-spring产生模板对象代码实现（抽取jdbc.properties）(应用)

将数据库的连接信息抽取到外部配置文件中，和spring的配置文件分离开，有利于后期维护

```text
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/db1
jdbc.username=root
jdbc.password=12345
```

```text
<!--加载jdbc.properties-->
<context:property-placeholder location="classpath:jdbc.properties"/>
​
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="${jdbc.driver}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>
<!--jdbc模板对象-->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="dataSource"/>
</bean>
```

07-JdbcTemplate基本使用-常用操作-更新操作(应用)

```text
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class JdbcTemplateCRUDTest {
​
@Autowired
private JdbcTemplate jdbcTemplate;
​
//修改更新
@Test
public void testUpdate(){
    jdbcTemplate.update("update account set money=? where name=?",10000,"tom");
}
//删除
@Test
public void testDelete(){
    jdbcTemplate.update("delete from account where name=?","tom");
}
​
}
```

08-JdbcTemplate基本使用-常用操作-查询操作(应用)

对应的方法：

| 方法名                                                       | 参数说明                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `queryForObject(String sql, Class<T> type)`                  | sql: 表示sql语句   Class：表示返回值类型                     |
| `queryForObject(String sql,RowMapper<T> rowmapper, Class<T> type)` | sql:表示sql语句,                                                                        RowMappr是一个接口，针对返回不同类型数据，使用这个接口进行封装 。                                                                                                                             `calss<T>`:表示返回值类型 |
| `query(sql,  rowMapper,  class)`                             | sql:表示sql语句,                                                                        RowMappr是一个接口，针对返回不同类型数据，使用这个接口进行封装 。                                                                                                                             `calss<T>`:表示返回值类型 |



```text
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class JdbcTemplateCRUDTest {
​
@Autowired
private JdbcTemplate jdbcTemplate;
​
//聚合查询
@Test
public void testQueryCount(){
    Long count = jdbcTemplate.queryForObject("select count(*) from account", Long.class);
    System.out.println(count);
}
//查询一个
@Test
public void testQueryOne(){
    Account account = jdbcTemplate.queryForObject("select * from account where name=?", new BeanPropertyRowMapper<Account>(Account.class), "tom");
    System.out.println(account);
}
//查询所有
@Test
public void testQueryAll(){
    List<Account> accountList = jdbcTemplate.query("select * from account", new BeanPropertyRowMapper<Account>(Account.class));
    System.out.println(accountList);
}
​
}
```

09 总结 jdbcTemplate基本使用

①导入spring-jdbc和spring-tx坐标

②创建数据库表和实体

③创建JdbcTemplate对象

```text
JdbcTemplate jdbcTemplate = newJdbcTemplate();
       jdbcTemplate.setDataSource(dataSource);
```

④执行数据库操作

更新操作：

```text
jdbcTemplate.update (sql,params)
```

查询操作：

```text
jdbcTemplate.query (sql,Mapper,params)
```

```text
jdbcTemplate.queryForObject(sql,Mapper,params)
```

## 二、jdbc整合案例

- JdbcTemplate是jar包里的类，不是自己创建的。

- JdbcTemplate中有个属性叫：dataSource，源码中已经为其设置了set方法，所以用的是set方法注入属性

- JdbcTemplate的属性dataSource注入的正是上面数据库连接池对象，等于说把JdbcTemplate对象和数据库连接起来了

### 实现数据添加功能：

案例分析：

1.创建dao接口和实现类

2.使用jdbcTmplate对象添加数据

3.构建service接口和实现类

4.测试运行

实现步骤：

1、创建Dao接口和实现类

```text
public interface AccountDao {
    public void save(Account account);
}
实现类如下
@Repository
public class AccountDaoImpl implements AccountDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public void save(Account account) {
 //2、调用jdbcTemplate.update(实现添加 删除 修改等)
        //创建添加的sql语句
        String sql="insert into by_account values(?,?,?)";
       Object[] acc= {account.getId(),account.getName(),account.getMoney()};
        //调用jdbcTemplate.update(实现添加 删除 修改等)
        int update = jdbcTemplate.update(sql, acc);
        //返回值添加了几行
        System.out.println(update);
    }
}
```

3、构建service接口和方法

```text
public interface AccountService {
    public void save(Account account);
}
实现类
@Service
public class AccountServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;
    @Override
    public void save(Account account) {
        bookDao.save(account);
    }
}
```

4、测试运行

```text
@Test
public void testadd(){
    ApplicationContext ac=new ClassPathXmlApplicationContext("application.xml");
    BookService bookService = ac.getBean(BookService.class);
    Account account=new Account();
    account.setId(null);
    account.setName("xiaoli");
    account.setMoney("50000");
    bookService.save(account);
}
```

### 2、修改name和money的值

实现步骤

1、Dao接口添加update方法

```text
//修改
public void update(Account account);
```

2、实现类进行数据编写

```text
@Override
public void update(Account account) {
    //根据id修改name和money的值
    String sql="update by_account set name=? ,money=? where id=?";
    Object[] acc={account.getName(),account.getMoney(),account.getId()};
    int update = jdbcTemplate.update(sql, acc);
    if(update>0){
        System.out.println("修改成功");
    }else{
        System.out.println("修改失败");
    }
}
```

3、service接口和实现类编写

```text
public void update(Account account);
​
@Override
public void update(Account account) {
    bookDao.update(account);
}
```

4、测试类编写

```text
@Test
public void testUpdate(){
    ApplicationContext ac=new ClassPathXmlApplicationContext("application.xml");
    BookService bookService = ac.getBean(BookService.class);
    Account account=new Account();
    account.setId("3");
    account.setName("大壮");
    account.setMoney("3000");
    bookService.update(account);
}
```

查询系列根据id查询

**实现步骤：**

- 创建Dao接口方法并实现方法

- 实现查询逻辑

- 创建service方法和实现类

- 测试

第一步：创建Dao接口方法并实现方法

```text
//查询
public Account findById(String id);
```

第二步：实现查询逻辑

```text
@Override
public Account findById(String id) {
    String sql="select * from by_account where id=?";
    RowMapper<Account> rowMapper=new BeanPropertyRowMapper<Account>(Account.class);
    Account account = jdbcTemplate.queryForObject(sql, rowMapper, id);
  //  Account account = jdbcTemplate.query(sql, rowMapper, id).get(0);
    return account;
}
```

第三步：创建service方法和实现类

```text
//查询
public Account findById(String id);
实现类：
 @Override
    public Account findById(String id) {
        Account account = bookDao.findById(id);
        return account;
    }
```

第四步：测试

```text
@Test
public void testfindById(){
    ApplicationContext ac=new ClassPathXmlApplicationContext("application.xml");
    BookService bookService = ac.getBean(BookService.class);
    Account account = bookService.findById("2");
    System.out.println(account);
}
```

查询所有的数据：

第一步：创建Dao方法

```text
public List<Account> findAll();
```

第二步：实现逻辑

```text
@Override
public List<Account> findAll() {
    String sql="select * from by_account";
    RowMapper<Account> rowMapper=new BeanPropertyRowMapper<Account>(Account.class);
    List<Account> list = jdbcTemplate.query(sql, rowMapper);
    return list;
}
```

第三步：service接口和实现类

```text
public List<Account> findAll();
​
@Override
public List<Account> findAll() {
    List<Account> list = bookDao.findAll();
    return list;
}
```

第四步：构建测试类

```text
@Test
public void testfindAll(){
    ApplicationContext ac=new ClassPathXmlApplicationContext("application.xml");
    BookService bookService = ac.getBean(BookService.class);
    List<Account> list = bookService.findAll();
    for (Account account : list) {
        System.out.println(account);
    }
}
```





