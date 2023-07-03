**问题导入**

请描述一下如何定义环绕通知方法？

7.1 AOP通知分类

- AOP通知描述了抽取的共性功能，根据共性功能抽取的位置不同，最终运行代码时要将其加入到合理的位置

- AOP通知共分为5种类型

    - 前置通知：在切入点方法执行之前执行

    - 后置通知：在切入点方法执行之后执行，无论切入点方法内部是否出现异常，后置通知都会执行。

    - **==环绕通知(重点)：==**手动调用切入点方法并对其进行增强的通知方式。

    - 返回后通知(了解)：在切入点方法执行之后执行，如果切入点方法内部出现异常将不会执行。

    - 抛出异常后通知(了解)：在切入点方法执行之后执行，只有当切入点方法内部出现异常之后才执行。

7.2 AOP通知详解

7.2.1 前置通知

- 名称：@Before

- 类型：**==方法注解==**

- 位置：通知方法定义上方

- 作用：设置当前通知方法与切入点之间的绑定关系，当前通知方法在原始切入点方法前运行

- 范例：

```text
@Before("pt()")
public void before() {
    System.out.println("before advice ...");
}
```

7.2.2 后置通知

- 名称：@After

- 类型：==**方法注解**==

- 位置：通知方法定义上方

- 作用：设置当前通知方法与切入点之间的绑定关系，当前通知方法在原始切入点方法后运行

- 范例：

```text
@After("pt()")
public void after() {
    System.out.println("after advice ...");
}
```

7.2.3 返回后通知

- 名称：@AfterReturning（了解）

- 类型：**==方法注解==**

- 位置：通知方法定义上方

- 作用：设置当前通知方法与切入点之间的绑定关系，当前通知方法在原始切入点方法正常执行完毕后运行

- 范例：

```text
@AfterReturning("pt()")
public void afterReturning() {
    System.out.println("afterReturning advice ...");
}
```

7.2.4 抛出异常后通知

- 名称：@AfterThrowing（了解）

- 类型：**==方法注解==**

- 位置：通知方法定义上方

- 作用：设置当前通知方法与切入点之间的绑定关系，当前通知方法在原始切入点方法运行抛出异常后执行

- 范例：

```text
@AfterThrowing("pt()")
public void afterThrowing() {
    System.out.println("afterThrowing advice ...");
}
```

7.2.5 环绕通知

- 名称：@Around（重点，常用）

- 类型：**==方法注解==**

- 位置：通知方法定义上方

- 作用：设置当前通知方法与切入点之间的绑定关系，当前通知方法在原始切入点方法前后运行

- 范例：：

```text
@Around("pt()")
public Object around(ProceedingJoinPoint pjp) throws Throwable {
    System.out.println("around before advice ...");
    Object ret = pjp.proceed();
    System.out.println("around after advice ...");
    return ret;
}
```

==**环绕通知注意事项**==

1. 环绕通知方法形参必须是ProceedingJoinPoint，表示正在执行的连接点，使用该对象的proceed()方法表示对原始对象方法进行调用，返回值为原始对象方法的返回值。

1. 环绕通知方法的返回值建议写成Object类型，用于将原始对象方法的返回值进行返回，哪里使用代理对象就返回到哪里。



