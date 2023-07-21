**实现步骤：**

**导入jar包：**

```xml
  <dependencies>
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
​
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.29</version>
    </dependency>
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.1.16</version>
    </dependency>
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.26</version>
    </dependency>
<!--    <dependency>-->
<!--      <groupId>org.mybatis</groupId>-->
<!--      <artifactId>mybatis-spring</artifactId>-->
<!--      <version>2.0.5</version>-->
<!--    </dependency>-->
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
​
    <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus</artifactId>
      <version>3.1.1</version>
    </dependency>
    <!--mybatisPlus 自动生成器-->
    <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-generator</artifactId>
      <version>3.4.0</version>
    </dependency>
    <!--mybatisPlus默认模板-->
    <dependency>
      <groupId>org.apache.velocity</groupId>
      <artifactId>velocity-engine-core</artifactId>
      <version>2.2</version>
    </dependency>
    <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-extension</artifactId>
      <version>3.4.1</version>
    </dependency>
  </dependencies>
```

1、编写mapper接口

```text
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.by.pojo.User;
​
public interface UserMapper extends BaseMapper<User> {
​
}
```

2、编写mapper映射文件

```text
<?xml version="1.0" encoding="UTF-8" ?>
<!--MyBatis的DTD约束-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.by.mapper.UserMapper">
​
</mapper>
```

3、编写测试类：

```java
@Test
public void MpfindTest() throws Exception {
 InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSessionFactory build = new MybatisSqlSessionFactoryBuilder().build(is);
    SqlSession session = build.openSession();
    UserMapper mapper = session.getMapper(UserMapper.class);
    List<User> users = mapper.selectList(null);
    //List<User> users = userService.findAll();
    for (User user : users) {
        System.out.println(user);
    }
​
}
​
```

### 6.1 MyBatisPlus概述

问题导入

通过入门案例制作，MyBatisPlus的优点有哪些？

MyBatis介绍

- MyBatisPlus（简称MP）是基于MyBatis框架基础上开发的增强型工具，旨在简化开发、提高效率

- 官网：[https](https://mybatis.plus/)[://mybatis.plus](https://mybatis.plus/)[/](https://mybatis.plus/)   [https://mp.baomidou.com](https://mp.baomidou.com/)[/](https://mp.baomidou.com/)

MyBatisPlus特性

- 无侵入：只做增强不做改变，不会对现有工程产生影响

- 强大的 CRUD 操作：内置通用 Mapper，少量配置即可实现单表CRUD 操作

- 支持 Lambda：编写查询条件无需担心字段写错

- 支持主键自动生成

- 内置分页插件

- ……



6.2、标准数据层开发

MyBatisPlus的CRUD操作

![](https://tcs-devops.aliyuncs.com/storage/112wdd55de567e64db8006e3f4f477054ba5?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDUwNDA5OCwiaWF0IjoxNjg5ODk5Mjk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndkZDU1ZGU1NjdlNjRkYjgwMDZlM2Y0ZjQ3NzA1NGJhNSJ9.LnKLu4fLO6JOQ_eR1cpO9Y0ayKIr_S14nMer2uXqF-I&download=%E5%9B%BE%E7%89%87.png "")

添加操作：

```text
@Test
public void InsertTest() throws IOException {
    InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSession session = new MybatisSqlSessionFactoryBuilder().build(is).openSession();
    UserMapper mapper = session.getMapper(UserMapper.class);
    User user=new User();
    user.setId(1233444);
    user.setUsername("测试");
    user.setSex("无");
    user.setAddress("adasdada");
    user.setBirthday(Date.valueOf("2020-03-09"));
    mapper.insert(user);
    session.commit();
    session.close();
}
```

修改操作：

```text
@Test
public void update() throws IOException {
    InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSession session = new MybatisSqlSessionFactoryBuilder().build(is).openSession();
    UserMapper mapper = session.getMapper(UserMapper.class);
    User user=new User();
    user.setId(1233444);
    user.setUsername("完成测试");
    user.setSex("女");
    user.setAddress("河南开封");
    user.setBirthday(Date.valueOf("2020-03-09"));
    mapper.update(user,null);
    session.commit();
    session.close();
}
​
//删除操作：
​
@Test
public void delete() throws IOException {
    InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSession session = new MybatisSqlSessionFactoryBuilder().build(is).openSession();
    UserMapper mapper = session.getMapper(UserMapper.class);
    mapper.deleteById(1233444);
    session.commit();
    session.close();
​
}
```

### 七、spring整合mybatisPlus技术

3.1 使用注解模式整合：

**第一步编写配置文件**：

注意：和整合mybatis一样的步骤，就是更改一下 MybatisSqlSessionFactoryBean 其他地方不用修改

```text
public class MybatisConfig {
​
    //定义bean，SqlSessionFactoryBean，用于产生SqlSessionFactory对象
    @Bean
    public MybatisSqlSessionFactoryBean sqlSessionFactory(DataSource dataSource){
        MybatisSqlSessionFactoryBean sfb=new MybatisSqlSessionFactoryBean();
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

**springconfig配置类：**

```text
@Configuration
@ComponentScan("com.by")
@PropertySource("classpath:jdbc.properties")
@Import({jdbcConfig.class,MybatisConfig.class})
public class SpringConfig {
}
```

**第二步：编写mapper接口继承mp 的接口类**

```text
public interface UserMapper extends BaseMapper<User> {
​
}
```

**第三步：编写service接口实现 IService接口**

注意：通用Service CRUD 封装IService接口,进一步封装 CRUD 采用 get 查询单行 ，remove 删除，list 查询集合， page 分页 ，前缀命名方式区分 Mapper方法

```text
public interface UserService extends IService<User> {
​
    public List<User> findUserList();
​
}
```

**第四步：编写Service实现类同时实现impl接口**

```text
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper,User> implements UserService {
    @Autowired
    private UserMapper userMapper;
   
    @Override
    public List<User> findUserList() {
​
        return userMapper.selectList(null);
    }
}
```

**第五步：编写测试类**

```text
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class MtwoTest {
    @Autowired
    public UserService userService;
​
    @Test
    public void findAllt(){
        List<User> userList = userService.findUserList();//自带
        for (User user : userList) {
            System.out.println("   "+user);
        }
        List<User> list = userService.list(null);
        for (User user1 : list) {
            System.out.println("系统提供的方法"+user1);
        }
​
    }
​
}
```

**3.2 通过主键查询**

service接口和实现类编写自己的方法也可以不写：

```text
public User selectById(Integer id);
​
//根据主键查询
@Override
public User selectById(Integer id) {
​
    return userMapper.selectById(id);
}
```

测试方法：

```text
@Test
public void testGetById(){
    User user1 = userService.selectById(1);//自己编写的方法
    User user = userService.getById(1); //系统自带的
    System.out.println("自己编写的方法="+user1);
    System.out.println("系统自带的方法="+user);
}
```

**3.3通过多个主键id批量查询**

```text
@Test
public void selectIds(){
    List<Integer> ids = new ArrayList<>();
    ids.add(1);
    ids.add(2);
    ids.add(3);
​
    Collection<User> userList = userService.listByIds(ids);
    for (User user : userList) {
        System.out.println(user);
    }
​
}
```

3.4 条件查询

要想为sql语句添加where条件，需要使用mybatis plus的条件构造器对象Wrapper，该对象中提供了对sql条件操作的各种方法：

官网：[https://baomidou.com/pages/10c804/#alleq](https://baomidou.com/pages/10c804/#alleq)

示例：查询性别为‘男’，根据生日降序排列

```text
@Test
public void  qwTest(){
    QueryWrapper<User> qw=new QueryWrapper<>();
    qw.like("username","原");
    /*
          or 是或者的意思
          eq 是等于的意思  sex = 男
          orderByDesc 数据排序
     */
    qw.or().eq("sex","男");
    qw.orderByDesc("birthday");
    List<User> list = userService.list(qw);
    for (User user : list) {
        System.out.println(user);
    }
}
```

sql分析：

```text
 select * from user WHERE (user_name LIKE ? OR sex = ?) ORDER BY birthday DESC
```

3.5 **分页查询**

	MyBatis Plus自带分页插件，只要简单的配置即可实现分页功能

- 在spring的配置类中添加mybatis plus的分页插件拦截器

```text
@Bean
public MybatisSqlSessionFactoryBean sqlSessionFactory(DataSource dataSource){
    MybatisSqlSessionFactoryBean sfb=new MybatisSqlSessionFactoryBean();
    sfb.setTypeAliasesPackage("com.by.pojo");
    sfb.setDataSource(dataSource);
    //配置mybatis plus分页插件
    MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
    //设置分页拦截器,指定 mysql数据库类型
    mybatisPlusInterceptor.addInnerInterceptor(
            new PaginationInnerInterceptor(DbType.MYSQL));
    sfb.setPlugins(mybatisPlusInterceptor);
​
    return sfb;
}
```

**编写业务层自己的方法：**

```text
public IPage<User> getPageInfo(int pageNum, int pageSize);
​
 @Override
    public IPage<User> getPageInfo(int pageNum, int pageSize) {
        IPage<User> page = new Page<>(pageNum,pageSize);
        //参数1为分页参数,参数2为分页查询条件
        IPage<User> pageInfo  = userMapper.selectPage(page,null);
        return pageInfo;
    }
```

测试类：

```text
@Test
public void testGetByPage(){
    IPage<User> userPage = new Page<>(1,3);
​
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    //第二个参数为查询条件
    IPage<User> page = userService.page(userPage,queryWrapper); //使用IService中的方法
    //IPage<User> page = userService.getPageInfo(1,3); //自己写的方法
    for (User user : page.getRecords()) {
        System.out.println(user);
    }
    System.out.println("page.getPages():"+page.getPages());
    System.out.println("page.getCurrent():"+page.getCurrent());
    System.out.println("page.getSize():"+page.getSize());
    System.out.println("page.getTotal():"+page.getTotal());
}
```

## 八  快速开发-代码生成器

### pom包导入

```text
<!--代码生成器-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.4.1</version>
</dependency>
​
<!--velocity模板引擎-->
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.3</version>
</dependency>
<dependency>
            <groupId>org.freemarker</groupId>
            <artifactId>freemarker</artifactId>
            <version>2.3.30</version>
        </dependency>

```

### 测试代码块编写

```text
public static void main(String[] args) {
    FastAutoGenerator.create(
            "jdbc:mysql://localhost:3306/mybatisdb?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&useSSL=false",
            "root", "12345")
            .globalConfig(builder -> {
                builder.author("小白程序") // 设置作者
                        .enableSwagger() // 开启 swagger 模式
                        .fileOverride() // 覆盖已生成文件
                        .outputDir("D://ideawork"); // 指定输出目录
            })
            .packageConfig(builder -> {
                builder.parent("com.by") // 设置父包名
                        .moduleName("system") // 设置父包模块名
                        .pathInfo(Collections.singletonMap(OutputFile.xml, "D://ideawork//mapper")); // 设置mapperXml生成路径
            })
            .strategyConfig(builder -> {
                builder.addInclude("user") // 设置需要生成的表名
                        .addTablePrefix("t_", "c_"); // 设置过滤表前缀
            })
            .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
            .execute();
​
}
```

8.2 快速开发-代码生成器 2

旧模式生成策略：

第一步：创建web工程，添加代码生成器相关依赖，其他依赖自行添加

```text
<!--代码生成器-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.4.1</version>
</dependency>
​
<!--velocity模板引擎-->
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.3</version>
</dependency>
<dependency>
            <groupId>org.freemarker</groupId>
            <artifactId>freemarker</artifactId>
            <version>2.3.30</version>
        </dependency>

```

编写测试类：

```text
public class Generator {
    public static void main(String[] args) {
        //1. 创建代码生成器对象，执行生成代码操作
        AutoGenerator autoGenerator = new AutoGenerator();

        //2. 数据源相关配置：读取数据库中的信息，根据数据库表结构生成代码
        DataSourceConfig dataSource = new DataSourceConfig();
        dataSource.setDriverName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/mybatisdb?serverTimezone=UTC");
        dataSource.setUsername("root");
        dataSource.setPassword("12345");
        autoGenerator.setDataSource(dataSource);
        //设置全局配置
        GlobalConfig globalConfig = new GlobalConfig();
       
        globalConfig.setOutputDir("D://byworkes/MybatisMP/MybatisZD/src/main/java");    //设置代码生成位置
        globalConfig.setOpen(false);    //设置生成完毕后是否打开生成代码所在的目录
        globalConfig.setAuthor("小白程序");    //设置作者
        globalConfig.setFileOverride(true);     //设置是否覆盖原始生成的文件
        globalConfig.setMapperName("%sDao");    //设置数据层接口名，%s为占位符，指代模块名称
        globalConfig.setIdType(IdType.ASSIGN_ID);   //设置Id生成策略
        autoGenerator.setGlobalConfig(globalConfig);

        //设置包名相关配置
        PackageConfig packageInfo = new PackageConfig();
        packageInfo.setParent("com.by");   //设置生成的包名，与代码所在位置不冲突，二者叠加组成完整路径
        packageInfo.setEntity("pojo");    //设置实体类包名
        packageInfo.setMapper("dao");   //设置数据层包名
        autoGenerator.setPackageInfo(packageInfo);

        //策略设置
        StrategyConfig strategyConfig = new StrategyConfig();
        strategyConfig.setInclude("user");  //设置当前参与生成的表名，参数为可变参数
        strategyConfig.setTablePrefix("t_","c_");  //设置数据库表的前缀名称，模块名 = 数据库表名 - 前缀名  例如： User = t_user - c_
        strategyConfig.setRestControllerStyle(true);    //设置是否启用Rest风格
        strategyConfig.setVersionFieldName("version");  //设置乐观锁字段名
        strategyConfig.setLogicDeleteFieldName("deleted");  //设置逻辑删除字段名
        strategyConfig.setEntityLombokModel(true);  //设置是否启用lombok
        autoGenerator.setStrategy(strategyConfig);
        //2.执行生成操作
        autoGenerator.execute();

    }
}

```

