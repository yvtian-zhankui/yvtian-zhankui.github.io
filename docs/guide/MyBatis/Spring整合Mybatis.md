### 1 基于xml方式整合mybatis

实现步骤：

1、导入相关jar包

```text
 <dependencies>
<!--    mybatis相关的jar包-->
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
      <groupId>com.github.pagehelper</groupId>
      <artifactId>pagehelper</artifactId>
      <version>5.2.0</version>
    </dependency>
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.2.4</version>
    </dependency>
<!--    spring相关的jar包-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.3.20</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-tx</artifactId>
      <version>5.3.20</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>5.3.8</version>
    </dependency>
<!--    整合相关的jar包-->
    <!-- mybatis和spring集成依赖 -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>2.0.5</version>
    </dependency>
​
<!--    测试相关的jar包-->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.13</version>
      <scope>test</scope>
    </dependency>
      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-test</artifactId>
          <version>5.3.20</version>
      </dependency>
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.16</version>
    </dependency>
<!--    日志相关的jar包-->
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.11</version>
    </dependency>
    <dependency>
      <groupId>org.logback-extensions</groupId>
      <artifactId>logback-ext-spring</artifactId>
      <version>0.1.5</version>
    </dependency>
    <!--SLF4J转化包 可以打印spring框架的日志-->
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>jcl-over-slf4j</artifactId>
      <version>1.7.25</version>
    </dependency>
  </dependencies>
```

2、编写application配置文件加载mybatis配置

```text
<!--    配置包扫描-->
    <context:component-scan base-package="com.by"/>
    <!--加载数据库配置文件-->
    <context:property-placeholder location="classpath*:jdbc.properties"/>
    <!--配置数据源信息-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" >
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
​
    <!--整合SqlSesionFactoryBean对象(通过此对象创建SqlSessionFactory)  -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="DataSource" ref="dataSource"/>
        <property name="typeAliasesPackage" value="com.by.pojo"/>
        <property name="MapperLocations" value="classpath*:com/by/mapper/*Mapper.xml"/>
    </bean>
​
    <!-- 配置dao接口扫描，底层会基于dao接口创建这个接口的代理对象，这个代理
                       对象内部会通过mybatis访问数据库 -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <!-- 指定SqlSessionFactory对象的名称 -->
        <property name="SqlSessionFactoryBeanName" value="sqlSessionFactory"/>
        <!-- 指定基本包，dao接口所在的包名 -->
        <property name="BasePackage" value="com.by.mapper"/>
    </bean>
```

3、 编写mapper接口

```text
public interface UserMapper {
    
   public List<User> findAll();
   
   @Select("select * from T_user where id=#{id}")
   public User findById(Integer id);
   
    public void update(User user);
​
}
```

4、编写service接口和实现类

```text
public interface UserService {
​
    public List<User> findAll();
​
    public User findById(Integer id);
    public void update(User user);
}
```

实现类

```text
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserMapper userMapper;
​
    @Override
    public List<User> findAll() {
        List<User> userList = userMapper.findAll();
        return userList;
    }
​
    @Override
    public User findById(Integer id) {
​
        return userMapper.findById(id);
    }
​
    @Override
    public void update(User user) {
        userMapper.update(user);
    }
}
```

测试运行

```text
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:application.xml")
public class SpringMTest {
    @Autowired
    private UserService userService;
​
    @Test
    public void SMxmltest(){
        List<User> all = userService.findAll();
        for (User user : all) {
            System.out.println(user);
        }
    }
    @Test
    public void smfindById(){
        User byId = userService.findById(3);
        System.out.println(byId);
    }
```

### 2 基于纯注解整合方案

实现步骤：

1、编写mybatisconfig配置类

```text
public class MybatisConfig {
​
    //定义bean，SqlSessionFactoryBean，用于产生SqlSessionFactory对象
    @Bean
    public SqlSessionFactoryBean sqlSessionFactory(DataSource dataSource){
        SqlSessionFactoryBean sfb=new SqlSessionFactoryBean();
        sfb.setTypeAliasesPackage("com.by.pojo");
        sfb.setDataSource(dataSource);
        return sfb;
    }
​
    //定义bean，返回MapperScannerConfigurer对象
    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer(){
        MapperScannerConfigurer mscf=new MapperScannerConfigurer();
        mscf.setBasePackage("com.by.mapper");
        return mscf;
    }
}
```

2、import引入到springconfig中

```text
@Import({jdbcConfig.class,MybatisConfig.class})
```

### 

