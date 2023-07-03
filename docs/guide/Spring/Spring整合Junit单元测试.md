## 3.1 原始Junit测试Spring的问题

在测试类中，每个测试方法都有以下两行代码：

```text
 ApplicationContext ac = new ClassPathXmlApplicationContext("application.xml");
 BookDao bookDao =(BookDao)ac.getBean("bookDao");
```

这两行代码的作用是获取容器，如果不写的话，直接会提示空指针异常。所以又不能轻易删掉。

## 3.2 上述问题解决思路

让SpringJunit负责创建Spring容器，但是需要将配置文件的名称告诉它

将需要进行测试Bean直接在测试类中进行注入

## 3.3 Spring集成Junit步骤

①导入spring集成Junit的坐标

②使用@Runwith注解替换原来的运行期

③使用@ContextConfiguration指定配置文件或配置类

④使用@Autowired注入需要测试的对象

⑤创建测试方法进行测试

【第一步】导入整合的依赖坐标spring-test

```text
<!--junit-->
<dependency>
  <groupId>junit</groupId>
  <artifactId>junit</artifactId>
  <version>4.12</version>
</dependency>
<!--spring整合junit-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-test</artifactId>
  <version>5.1.9.RELEASE</version>
</dependency>
```

**可能会出现冲突**  用下面这个

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>6.0.8</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.32</version>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.1.12</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-tx</artifactId>
        <version>5.3.23</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>5.3.23</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.3.23</version>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.24</version>
    </dependency>
</dependencies>
```



【第二，三，四步】加载配置文件或者配置类

```text
//【第二步】使用Spring整合Junit专用的类加载器
@RunWith(SpringJUnit4ClassRunner.class)
//【第三步】加载配置文件或者配置类
@ContextConfiguration(classes = {SpringConfiguration.class}) //加载配置类
//@ContextConfiguration(locations={"classpath:applicationContext.xml"})//加载配置文件
public class AccountServiceTest {
    //支持自动装配注入bean
    @Autowired
    private AccountService accountService;
​
    @Test
    public void testFindById(){
        System.out.println(accountService.findById(1));
    }
​
    @Test
    public void testFindAll(){
        System.out.println(accountService.findAll());
    }
}
```

**==注意：junit的依赖至少要是4.12版本,可以是4.13等版本,否则出现如下异常：==**

![](https://tcs-devops.aliyuncs.com/storage/112vd3cfccf343e9705e169746559242142a?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzUyNywiaWF0IjoxNjg3OTk4NzI3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZkM2NmY2NmMzQzZTk3MDVlMTY5NzQ2NTU5MjQyMTQyYSJ9.BA_Ha3IBwEymgYJ75jNaqdqXCOqtwaevcGLEsAZcwmI&download=%E5%9B%BE%E7%89%87.png "")

## 4 junit断言测试：

JUnit为所有原语类型、对象和数组（原语或对象）提供重载断言方法。参数顺序为预期值后接实际值。或者，第一个参数可以是失败时输出的字符串消息。

4.1 断言的方法：

| void assertEquals(String message, expected value, actual value) | 断言两个值相等。值可能是类型有 int, short, long, byte, char ,Object. 第一个参数是一个可选的字符串消息                                如果预期值与真实值相等，则运行success，反之Failure |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| void assertTrue(String message, boolean condition)              | 断言一个条件为真                                                                                                                               |
| void assertFalse(String message,boolean condition)              | 断言一个条件为假                                                                                                                               |
| assertTrue(String message, expected value, actual value)        | 如果为 true，则运行 success，反之 Failure                                                                                                        |

4.2 入门例子

```text
String str="abcde";
String str1="abcde";
assertEquals(str,str1);
assertTrue(str.startsWith("ab"));
assertTrue(str.endsWith("de"));
//list集合操作断言
List<String> list= Arrays.asList("a","b","c","d");
System.out.println(list.toString());
assertEquals("a",list.get(0));
assertEquals(4,list.size());
assertEquals("d",list.get(list.size()-1));
//集合操作断言
Map<String,Object> map=new HashMap<>();
map.put("A", 1);
map.put("B", 2);
map.put("C", 3);
Set<String> set = map.keySet();
//assertEquals 如果预期值与真实值相等，则运行success，反之Failure
//assertEquals 运行Failure会有错误提示，提示预期值是xxx，而实际值是xxx。容易调式
assertEquals(3, map.size());
//检查是否包含A B C
//assertTrue 如果为 true，则运行 success，反之 Failure
assertTrue(set.containsAll(Arrays.asList("A", "B", "C")));
```

## **4.3案例操作dao**

**查询所有断言测试**

**第一步：在测试类里面注入Dao对象**

```text
@Autowired
private AccountDao accountDao;
```

**第二步：构建测试方法**

```text
@Test
public void testDaofindAll(){
    System.out.println("测试查询所有");
    assertEquals(2,accountDao.findAll().size());
    }
```

**添加操作断言测试**

**构建测试方法**

```text
@Test
@Rollback
public void testDaoadd(){
    Account account=new Account();
    account.setId(null);
    account.setName("测试新增");
    account.setMoney("12345");
    assertEquals(1,accountDao.save(account));
}
```

**删除操作断言测试**

**构建测试方法**

```text
@Test
public void testDel(){
    System.out.println("断言测试删除");
    assertEquals(1,accountDao.delete(3));
}
```

**案例导入**

```text
// 直接在service查询里面构建就可以
​
assumeTrue("结果不是false",false);
assumeFalse("结果不是true",false);
```



