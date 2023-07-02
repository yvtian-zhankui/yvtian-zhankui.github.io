1 Servlet规范中的过滤器-Filter

### 1.1 过滤器入门

1.1.1 过滤器概念及作用

过滤器——Filter，它是JavaWeb三大组件之一。另外两个是Servlet和Listener。

它是在2000年发布的Servlet2.3规范中加入的一个接口。是Servlet规范中非常实用的技术。

它可以对web应用中的所有资源进行拦截，并且在拦截之后进行一些特殊的操作。

常见应用场景：URL级别的权限控制；过滤敏感词汇；中文乱码问题等等。

总结：

>在程序中访问服务器资源的时候，当一个请求到来，服务器首先判断是否有过滤器与请求资源相关，如果有过滤器可以将请求拦截下来，完成一些特定的功能，再由过滤器决定是否交给请求资源，如果没有则像之前那样直接请求资源了，响应也是类似。

![](https://tcs-devops.aliyuncs.com/storage/112vc8a098560e227dd209dabbc34aeecd7a?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzgyMiwiaWF0IjoxNjg4MDM5MDIyLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZjOGEwOTg1NjBlMjI3ZGQyMDlkYWJiYzM0YWVlY2Q3YSJ9.B3SlfejRveDIQzhORHlbS44Muc7UNFMXNBKElOUaV9I&download=%E5%9B%BE%E7%89%87.png "")

### 1.2 Filter介绍 @webFilter（“/*”）

- filter是一个接口，如果想实现过滤器的功能，必须实现该接口

- 核心方法

| 返回值  | 方法名                        | 作用           |
| ---- | -------------------------- | ------------ |
| void | init(FilterConfig config)  | 初始化方法        |
| void | doFilter(resp,filterChain) | 对请求资源和响应资源过滤 |
| void | destory()                  | 销毁方法         |

- 配置方式

    - 注解方式

    - 配置文件 

### 1.3 FilterChain

- 是一个接口，代表过滤器链对象，由Servlet容器提供实现类对象，直接使用即可。

- 	过滤器定义多个，就会组成过滤器链

-     核心方法： doFilter（） 放行方法

- 注意点：

    - 如果有多个过滤器，在第一个过滤器执行之后调用下一个过滤器，依次类推，直到到达最终访问资源。

    - 如果只有一个过滤器，放行时，就会直接到达最终访问资源

### 1.4 过滤器使用

-  	需求说明：

    -  通过ilter过滤器解决多个资源写出中文乱码的问题

-  最终目的

    -  通本需求,最终掌握Filter过滤器的使用。

-  实现步骤

```text
创建一个web项目。
创建两个Serlet功能类，都向客户端写出中文数据。
创建一个fiter过滤器实现类，写dofiter核心方法。
在方法内解决中文乱码，并放行。
部署井启动项目。
通过浏览器测试。
```

**Servlet类**

```java
@WebServlet("/servletDemo1")
public class ServletDemo1 extends HttpServlet {
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException { 

System.out.println("servletDemo01执行了...");
        //resp.setContentType("text/html;charset=UTF-8");
     resp.getWriter().write("servletDemo01执行了...");
}

```

```java
@WebServlet("/servletDemo02")
public class ServletDemo02 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("servletDemo02执行了...");
        //resp.setContentType("text/html;charset=UTF-8");
        resp.getWriter().write("servletDemo02执行了...");
    }

```

filter代码

```java
@WebFilter("/*")
public class FilterDemo01 implements Filter{
​
@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    System.out.println("filterDemo01执行了...");
​
    //处理乱码
   servletResponse.setContentType("text/html;charset=UTF-8");
    //放行
    filterChain.doFilter(servletRequest,servletResponse);
}
```

### 1.5 过滤器使用的细节

- 配置方式：

    - 注解配置 @WebFilter("拦截路径")

    - 配置文件方式：

```java
<filter>
    <filter-name>FilterDemo1</filter-name>
    <filter-class>com.by.web.filter.FilterDemo1</filter-class>
</filter>
<filter-mapping>
    <filter-name>FilterDemo1</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

- 多个过滤器使用顺序

    - 如果有多个过滤器，取决于过滤映射的顺序

### 1.6 过滤器生命周期

创建

	当应用加载时，实例化对象并执行init初始化方法

提供服务 dofilter

	对象提供服务的过程，执行doFilter方法

销毁

  当应用卸载时或服务器停止的时对象销毁，执行destroy方法

```java
public class FilterDemo3 implements Filter {
​
private FilterConfig filterConfig;
​
/**
​
初始化方法
*/
@Override
public void init(FilterConfig filterConfig) throws ServletException {
System.out.println("FilterDemo3的初始化方法执行了");
//给过滤器配置对象赋值
this.filterConfig = filterConfig;
}
​
/**
​
过滤器的核心方法
*/
@Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
​
System.out.println("FilterDemo3拦截到了请求");
//过滤器放行
chain.doFilter(request,response);
}
​
/**
​
销毁方法
*/
@Override
public void destroy() {
System.out.println("FilterDemo3的销毁方法执行了");
}
​
}
```

配置FilterDemo2

```java
<filter>
    <filter-name>FilterDemo3</filter-name>
    <filter-class>com.by.web.filter.FilterDemo3</filter-class>
    <!--配置过滤器的初始化参数-->
    <init-param>
        <param-name>filterInitParamName</param-name>
        <param-value>filterInitParamValue</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>FilterDemo3</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

### 1.7 FilterConfig介绍

	FilterConfig是一个接口，代表过滤器的配置对象，可以加载一些初始化的参数

核心方法：

| 返回值                | 方法名                       | 作用                 |
| --------------------- | ---------------------------- | -------------------- |
| String                | getFilterName()              | 获取过滤器对象的名称 |
| String                | getinitParameter(String key) | 根据key获取value     |
| `Enumeration<String>` | getinitParameterNames()      | 获取所有参数的key    |
| String                | getServletContext()          | 获取应用上下文对象   |

常用方法演示：

```java
public class FilterDemo3 implements Filter {
​
private FilterConfig filterConfig;
​
/**
​
初始化方法
*/
@Override
public void init(FilterConfig filterConfig) throws ServletException {
System.out.println("FilterDemo3的初始化方法执行了");
    String filtername=filterConfig.getFilterName();
    System.out.println(filtername);
    //根据key获取value
    String username=filterConfig.getInitParameter("username");
    System.out.println(username);
    
}
​
/**
​
过滤器的核心方法
*/
@Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
​
System.out.println("FilterDemo3拦截到了请求");
//过滤器放行
chain.doFilter(request,response);
}
​
/**
​
销毁方法
*/
@Override
public void destroy() {
System.out.println("FilterDemo3的销毁方法执行了");
}
​
}
```

```java
<filter>
    <filter-name>FilterDemo3</filter-name>
    <filter-class>com.by.web.filter.FilterDemo3</filter-class>
    <!--配置过滤器的初始化参数-->
    <init-param>
        <param-name>username</param-name>
        <param-value>xiaoming</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>FilterDemo3</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

### 1.8 过滤器的五种拦截行为

我们的过滤器目前拦截的是请求，但是在实际开发中，我们还有请求转发和请求包含，以及由服务器触发调用的全局错误页面。默认情况下过滤器是不参与过滤的，要想使用，需要我们配置。配置的方式如下：

```xml
<!--配置过滤器-->
<filter>
    <filter-name>FilterDemo04</filter-name>
    <filter-class>com.by.filter.FilterDemo5</filter-class>
    <!--配置开启异步支持，当dispatcher配置ASYNC时，需要配置此行-->
    <async-supported>true</async-supported>
</filter>
<filter-mapping>
    <filter-name>FilterDemo04</filter-name>
    <url-pattern>/error.jsp</url-pattern>
    <!--过滤请求：默认值。-->
    <dispatcher>REQUEST</dispatcher>
    <!--过滤全局错误页面：当由服务器调用全局错误页面时，过滤器工作-->
    <dispatcher>ERROR</dispatcher>
    <!--过滤请求转发：当请求转发时，过滤器工作。-->
    <dispatcher>FORWARD</dispatcher>
    <!--过滤请求包含：当请求包含时，过滤器工作。它只能过滤动态包含，jsp的include指令是静态包含-->
    <dispatcher>INCLUDE</dispatcher>
    <!--过滤异步类型，它要求我们在filter标签中配置开启异步支持-->
    <dispatcher>ASYNC</dispatcher>
</filter-mapping>
 <error-page>
        <exception-type>java.lang.Exception</exception-type>
        <location>/error.jsp</location>
    </error-page>
    <error-page>
        <error-code>404</error-code>
        <location>/error.jsp</location>
    </error-page>
```

```java
public class FilterDemo05 implements Filter{
    /*
        提供服务方法
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("filterDemo05执行了...");
​
  //处理乱码
    servletResponse.setContentType("text/html;charset=UTF-8");
​
    //放行
    filterChain.doFilter(servletRequest,servletResponse);
}
​
}
```

```java
@WebServlet("/servletDemo03")
public class ServletDemo03 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("servletDemo03执行了...");
​
    //int i = 1/ 0;
​
   //请求转发
   //req.getRequestDispatcher("/index.jsp").forward(req,resp);
    //请求包含
    req.getRequestDispatcher("/index.jsp").include(req,resp);
}
```



