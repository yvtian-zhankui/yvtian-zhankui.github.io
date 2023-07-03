### 1 案例-测量业务层接口万次执行效率

问题导入

能描述出环绕通知里面的实现步骤

1.1 需求和分析

需求：任意业务层接口执行均可显示其执行效率（执行时长）

分析：

> ①：业务功能：业务层接口执行前后分别记录时间，求差值得到执行效率	②：通知类型选择前后均可以增强的类型——**环绕通知**

1.2 代码实现

【前置工作】环境准备 （在jdbcTemplate CRUD中操作）

1. Spring整合JdbcTemplate对spring_db数据库中的Account进行CRUD操作

1. Spring整合Junit测试CRUD是否OK。

1. 在pom.xml中添加aspectjweaver切入点表达式依赖

1. ... ...

【第一步】编写通知类

```text
@Component
@Aspect
public class ProjectAdvice {
    //匹配业务层的所有方法
    @Pointcut("execution(* com.by.service.*Service.*(..))")
    private void servicePt(){}
​
    //设置环绕通知，在原始操作的运行前后记录执行时间
    @Around("ProjectAdvice.servicePt()") //本类类名可以省略不写
    public void runSpeed(ProceedingJoinPoint pjp) throws Throwable {
        //获取执行的签名对象
        Signature signature = pjp.getSignature();
        //获取接口/类全限定名
        String className = signature.getDeclaringTypeName();
        //获取方法名
        String methodName = signature.getName();
        //记录开始时间
        long start = System.currentTimeMillis();
        //执行万次操作
        for (int i = 0; i < 10000; i++) {
           pjp.proceed();
        }
        //记录结束时间
        long end = System.currentTimeMillis();
        //打印执行结果
        System.out.println("万次执行："+ className+"."+methodName+"---->" +(end-start) + "ms");
    }
}
```

【第二步】在SpringConfig配置类上开启AOP注解功能

```text
@Configuration
@ComponentScan("com.by")
@PropertySource("classpath:jdbc.properties")
@Import(jdbcConfig.class)
@EnableAspectJAutoProxy  //开启aop注解扫描
public class SpringConfig {
}
```

【第三步】运行测试类，查看结果

```text
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class SpringTest {
    @Autowired
    private AccountService accountService;
    @Test
    public void testFindById(){
        Account account = accountService.findById(2);
    }
    @Test
    public void testFindAll(){
        List<Account> list = accountService.findAll();
    }
}
```

运行结果：

![](https://tcs-devops.aliyuncs.com/storage/112ve323039cc8a330420813f634f140f601?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYxNywiaWF0IjoxNjg4MzU1ODE3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlMzIzMDM5Y2M4YTMzMDQyMDgxM2Y2MzRmMTQwZjYwMSJ9.WMGA4mEQlgEoWM1HSDj7N2BvaoxnjZFoOUpe6Lm45t8&download=%E5%9B%BE%E7%89%87.png "")

### 2 AOP通知获取数据

- 获取切入点方法的参数

    - JoinPoint：适用于前置、后置、返回后、抛出异常后通知

    - ProceedJointPoint：适用于环绕通知

- 获取切入点方法返回值

    - 返回后通知

    - 环绕通知获

- 取切入点方法运行异常信息

    - 抛出异常后通知

    - 环绕通知

### AOP切入点数据获取

问题导入

在环绕通知中可以获取到哪些数据？

**数据准备**

dao接口，dao实现类，Test测试类

```text
public interface UserDao {
    public String  findName(int id);
}
​
@Component
public class UserDaoImpl implements UserDao {
    @Override
    public String findName(int id) {
        System.out.println("id"+id);
       if(true)throw new NullPointerException();
        return "body";
    }
}
​
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class AppTest {
    @Autowired
    private UserDao userDao;
    @Test
    public void test(){
        String name = userDao.findName(1);
        System.out.println(name);
    }
```

**编写通知类**

```text
@Component
@Aspect
public class MyAcpectde {
​
    @Pointcut("execution(* com.by.dao.impl.UserDaoImpl.*(..))")
    public void pt(){
​
    }
    }
```

2.1 获取参数

> 说明：在前置通知和环绕通知中都可以获取到连接点方法的参数们

- JoinPoint对象描述了连接点方法的运行状态，可以获取到原始方法的调用参数

```text
@Before("pt()")
public void before(JoinPoint jp) {
    Object[] args = jp.getArgs(); //获取连接点方法的参数们
    System.out.println(Arrays.toString(args));
}
```

- ProccedJointPoint是JoinPoint的子类

```text
@Around("pt()")
public Object around(ProceedingJoinPoint pjp) throws Throwable {
    Object[] args = pjp.getArgs(); //获取连接点方法的参数们
    System.out.println(Arrays.toString(args));
    Object ret = pjp.proceed();
    return ret;
}
```

2.2 获取返回值

> 说明：在返回后通知和环绕通知中都可以获取到连接点方法的返回值

- 抛出异常后通知可以获取切入点方法中出现的异常信息，使用形参可以接收对应的异常对象

```text
@AfterReturning(value = "pt()",returning = "ret")
public void afterReturning(String ret) { //变量名要和returning="ret"的属性值一致
    System.out.println("afterReturning advice ..."+ret);
}
```

- 环绕通知中可以手工书写对原始方法的调用，得到的结果即为原始方法的返回值

```text
@Around("pt()")
public Object around(ProceedingJoinPoint pjp) throws Throwable {
    // 手动调用连接点方法，返回值就是连接点方法的返回值
    Object ret = pjp.proceed();
    return ret;
}
```

2.3 获取异常

> 说明：在抛出异常后通知和环绕通知中都可以获取到连接点方法中出现的异常

- 抛出异常后通知可以获取切入点方法中出现的异常信息，使用形参可以接收对应的异常对象

```text
@AfterThrowing(value = "pt()",throwing = "t")
public void afterThrowing(Throwable t) {//变量名要和throwing = "t"的属性值一致
    System.out.println("afterThrowing advice ..."+ t);
}
```

- 抛出异常后通知可以获取切入点方法运行的异常信息，使用形参可以接收运行时抛出的异常对象

```text
@Around("pt()")
public Object around(ProceedingJoinPoint pjp)  {
    Object ret = null;
    //此处需要try...catch处理，catch中捕获到的异常就是连接点方法中抛出的异常
    try {
        ret = pjp.proceed();
    } catch (Throwable t) {
        t.printStackTrace();
    }
    return ret;
}
```





