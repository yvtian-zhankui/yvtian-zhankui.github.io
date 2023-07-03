问题导入

问题1：AOP的作用是什么？

问题2：连接点和切入点有什么区别，二者谁的范围大？

问题3：请描述什么是切面？

1.1 AOP简介和作用【理解】

- AOP(Aspect Oriented Programming)面向切面编程，一种编程范式，指导开发者如何组织程序结构

    - OOP(Object Oriented Programming)面向对象编程

- 作用：在不惊动原始设计的基础上为其进行功能增强。简单的说就是在不改变方法源代码的基础上对方法进行功能增强。

- Spring理念：无入侵式/无侵入式

1.2 AOP 的底层实现

> 实际上，AOP 的底层是通过 Spring 提供的的动态代理技术实现的。在运行期间，Spring通过动态代理技术动态的生成代理对象，代理对象方法执行时进行增强功能的介入，在去调用目标对象的方法，从而完成功能的增强。

1.3 AOP 的动态代理技术

常用的动态代理技术

JDK 代理 : 基于接口的动态代理技术

cglib 代理：基于父类的动态代理技术

![](https://tcs-devops.aliyuncs.com/storage/112v39e01b38cb92e78e0b91ce530c02ffb8?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk1ODI4NSwiaWF0IjoxNjg4MzUzNDg1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYzOWUwMWIzOGNiOTJlNzhlMGI5MWNlNTMwYzAyZmZiOCJ9._Y6FFexdhRYsVLDWAPppjgi1_b0Xz43CCIvFyOLE1BM&download=%E5%9B%BE%E7%89%87.png "")

1.5 JDK 的动态代理

①目标类接口

```text
public interface TargetInterface {
    public void save();
}
```

②目标类

```text
public class Target implements TargetInterface {
    @Override
    public void save() {
        System.out.println("Target 方法运行中....");
    }
}
```

③增强类

```text
public class Advice {
​
    public void beforeRun(){
        System.out.println("前置增强方法。。。。");
    }
​
    public void afterRun(){
        System.out.println("后置增强方法。。。。");
    }
}
```

④ 测试动态代理代码

```text
public class ProxyTest {
    public static void main(String[] args) {
        //目标对象
        final Target target=new Target();
        //增强对象
        final Advice advice=new Advice();
​
        //使用jdk动态代理对象加载目标类
        TargetInterface proxy=(TargetInterface)Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                new InvocationHandler() {
                    //调用代理对象的任何方法，实质执行的都是invoke方法
                    /*
                        proxy 代理对象
                        method 当前执行的目标方法
                        args 传递参数
                     */
                    @Override
                   public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        /*
                            method.invoke： 执行目标方法
                            2个参数： 目标对象 和 实际数据
                         */
                        advice.beforeRun();
                        Object invoke = method.invoke(target, args);
                        advice.afterRun();
                        return invoke;
                    }
                }
        );
        //调用代理对象
        proxy.save();
    }
}
```

  测试结果输出：

![](https://tcs-devops.aliyuncs.com/storage/112v83675ec78351559f4a124283568c3c5d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk1ODI4NSwiaWF0IjoxNjg4MzUzNDg1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY4MzY3NWVjNzgzNTE1NTlmNGExMjQyODM1NjhjM2M1ZCJ9.ZMsQbS1QSHOL-_QhtdicEcPij8KJU2tRX7cLmTF9R3c&download=%E5%9B%BE%E7%89%87.png "")

1.6 cglib 的动态代理

①目标类

```text
public class Target {
    public void save() {
        System.out.println("Target running....");
    }
}
​
增强类
public class Advice {
    public void beforeRun(){
        System.out.println("前置增强方法。。。。");
    }
    public void afterRun(){
        System.out.println("后置增强方法。。。。");
    }
}
```

②动态代理代码

```text
public class ProxyTest {
    public static void main(final String[] args) {
        //目标对象
        final Target target=new Target();
        //增强对象
        final Advice advice=new Advice();
        //返回值 就是动态生成的代理对象 基于cglib
        //1、创建增强器
        Enhancer enhancer=new Enhancer();
        //2、设置父类
        enhancer.setSuperclass(Target.class);
        //3、设置回调
        enhancer.setCallback(new MethodInterceptor() {
            @Override
            public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
               advice.beforeRun();
                Object invoke = method.invoke(target, objects);
                advice.afterRun();
                return invoke;
            }
        });
        //4、创建代理对象
        Target proxy = (Target)enhancer.create();
        //5、调用目标方法
        proxy.save();
    }
}
​
```

1.7 AOP中的核心概念【理解】

Spring 的 AOP 实现底层就是对上面的动态代理的代码进行了封装，封装后我们只需要对需要关注的部分进行代码编写，并通过配置的方式完成指定目标的方法增强。

**在正式讲解 AOP 的操作之前，我们必须理解 AOP 的相关术语，常用的术语如下**：

- 连接点（JoinPoint）：所谓连接点其实就是可以被增强的方法，比如（正在执行的方法，例如：update()、delete()、select()等）都是连接点。 

- 切入点（Pointcut）：进行功能增强了的方法，例如:update()、delete()方法，select()方法没有被增强所以不是切入点，但是是连接点。

    - 在SpringAOP中，一个切入点可以只描述一个具体方法，也可以匹配多个方法

        - 一个具体方法：com.by.dao包下的BookDao接口中的无形参无返回值的save方法

        - 匹配多个方法：所有的save方法，所有的get开头的方法，所有以Dao结尾的接口中的任意方法，所有带有一个参数的方法

- 通知（Advice）：在切入点前后执行的操作，也就是增强的共性功能

    - 在SpringAOP中，功能最终以方法的形式呈现

- 通知类：通知方法所在的类叫做通知类

- 切面（Aspect）：描述通知与切入点的对应关系，也就是哪些通知方法对应哪些切入点方法。其实就是（目标方法+增强）

![](https://tcs-devops.aliyuncs.com/storage/112vef7b2995ef321ec83d6d3ff670a7d7a2?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk1ODI4NSwiaWF0IjoxNjg4MzUzNDg1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlZjdiMjk5NWVmMzIxZWM4M2Q2ZDNmZjY3MGE3ZDdhMiJ9.3M-zJlw6UHsMuavoT0BjNfEYSlbSgfDDByyUuv5O5Cw&download=%E5%9B%BE%E7%89%87.png "")

1.8 AOP 开发明确的事项

1)需要编写的内容

- 编写核心业务代码（目标类的目标方法）

- 编写切面类，切面类中有通知(增强功能方法)

- 在配置文件中，配置织入关系，即将哪些通知与哪些连接点进行结合

2）AOP 技术实现的内容

Spring 框架监控切入点方法的执行。一旦监控到切入点方法被运行，使用代理机制，动态创建目标对象的代理对象，根据通知类别，在代理对象的对应位置，将通知对应的功能织入，完成完整的代码逻辑运行。

3）AOP 底层使用哪种代理方式

在 spring 中，框架会根据目标类是否实现了接口来决定采用哪种动态代理的方式。

1.9 知识要点

- aop：面向切面编程

- aop底层实现：基于JDK的动态代理 和 基于Cglib的动态代理

- aop的重点概念：Pointcut（切入点）：被增强的方法​Advice（通知/ 增强）：封装增强业务逻辑的方法​Aspect（切面）：切点+通知​Weaving（织入）：将切点与通知结合的过程

- 开发明确事项：谁是切点（切点表达式配置）​谁是通知（切面类中的增强方法）​将切点和通知进行织入配置



