> Spring MVC属于SpringFrameWork的后续产品，已经融合在Spring Web Flow里面。Spring 框架提供了构建 Web 应用程序的全功能 MVC 模块。使用 Spring 可插入的 MVC 架构，从而在使用Spring进行WEB开发时，可以选择使用Spring的Spring MVC框架或集成其他MVC开发框架，如Struts1(现在一般不用)，Struts 2(一般老项目使用)等。

![](https://tcs-devops.aliyuncs.com/storage/112v48ffbe3493ad1d7091e31583553087f1?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3NCwiaWF0IjoxNjg4NTU2NDc0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY0OGZmYmUzNDkzYWQxZDcwOTFlMzE1ODM1NTMwODdmMSJ9.IDyA7l79w-J6lYdQIc9lvOxB4NIm2NI-9M1yYYmYWEs&download=%E5%9B%BE%E7%89%87.png "")

## 一、SpringMVC基础入门

V即View视图是指用户看到并与之交互的界面。比如由html元素组成的网页界面，或者软件的客户端界面。MVC的好处之一在于它能为应用程序处理很多不同的视图。在视图中其实没有真正的处理发生，它只是作为一种输出数据并允许用户操作的方式。

M即model模型是指模型表示业务规则。在MVC的三个部件中，模型拥有最多的处理任务。被模型返回的数据是中立的，模型与数据格式无关，这样一个模型能为多个视图提供数据，由于应用于模型的代码只需写一次就可以被多个视图重用，所以减少了代码的重复性。

C即controller控制器是指控制器接受用户的输入并调用模型和视图去完成用户的需求，控制器本身不输出任何东西和做任何处理。它只是接收请求并决定调用哪个模型构件去处理请求，然后再确定用哪个视图来显示返回的数据。

### 1.1 概述

**Spring MVC**框架是一个开源的Java平台，为开发强大的基于Java的Web应用程序提供全面的基础架构支持非常容易和非常快速。

Spring框架最初由**Rod Johnson**撰写，并于2003年6月根据**Apache 2.0**许可证首次发布。

**Spring web MVC**框架提供了MVC(模型 - 视图 - 控制器)架构和用于开发灵活和松散耦合的Web应用程序的组件。 **MVC**模式导致应用程序的不同方面(输入逻辑，业务逻辑和UI逻辑)分离，同时提供这些元素之间的松散耦合。

**模型**(Model)封装了应用程序数据，通常它们将由POJO类组成。

**视图**(View)负责渲染模型数据，一般来说它生成客户端浏览器可以解释HTML输出。(jsp、freemarker、thymeleaf for html5)

**控制器**(Controller)负责处理用户请求并构建适当的模型，并将其传递给视图进行渲染。

Spring MVC 是一个模型 - 视图 - 控制器（MVC）的Web框架建立在中央前端控制器servlet（DispatcherServlet），它负责发送每个请求到合适的处理程序，使用视图来最终返回响应结果的概念。Spring MVC 是 Spring 产品组合的一部分，它享有 Spring IoC容器紧密结合Spring松耦合等特点，因此它有Spring的所有优点。



### 1.2 springmvc执行流程

![](https://tcs-devops.aliyuncs.com/storage/112vfec940c76b6ef8edb0f5d6f834e7692c?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3NCwiaWF0IjoxNjg4NTU2NDc0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZmZWM5NDBjNzZiNmVmOGVkYjBmNWQ2ZjgzNGU3NjkyYyJ9.68n_XAkR26QWe9BK2XGmQa3m5YRLOLjjL7kMS8AdXR0&download=%E5%9B%BE%E7%89%87.png "")

![](https://tcs-devops.aliyuncs.com/storage/112vd5253df65ea261b9d94d8eb5519b8f5f?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3NCwiaWF0IjoxNjg4NTU2NDc0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZkNTI1M2RmNjVlYTI2MWI5ZDk0ZDhlYjU1MTliOGY1ZiJ9.OTfg0XTXsDSvId2nXMxilDx3XDFm5BKjnDL5CYdRKs8&download=%E5%9B%BE%E7%89%87.png "")



### SpringMVC快速入门

需求：客户端发起请求，服务器端接收请求，执行逻辑并进行视图跳转。

**开发步骤**

①导入SpringMVC相关坐标

②配置SpringMVC核心控制器DispathcerServlet

③创建Controller类和视图页面

④使用注解配置Controller类中业务方法的映射地址

⑤配置SpringMVC核心文件 spring-mvc.xml

⑥客户端发起请求测试

**1 导入SpringMVC相关坐标**

```xml
<dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.3.20</version>
    </dependency>
<!--json转换-->
 <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.12.3</version>
    </dependency>
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.26</version>
    </dependency>
<dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>4.0.1</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>jsp-api</artifactId>
      <version>2.2</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>
```

2 在web.xml中配置核心控制器DispathcerServlet

```xml
  <servlet>
    <servlet-name>smvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:springmvc.xml</param-value>
    </init-param>
  </servlet>
<servlet-mapping>
  <servlet-name>smvc</servlet-name>
  <url-pattern>/</url-pattern>
</servlet-mapping>
<!-- 配置web项目的web.xml文件的首页 -->
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.jsp</welcome-file>
  </welcome-file-list>
```

3 定义表现层业务处理器Controller，并配置成spring的bean（等同于Servlet）

```java
@Controller
public class HelloController {
    @RequestMapping("/hello")
    public String  hello(){
        System.out.println("hello word");
        return "index.jsp";
    }
}
```

4  配置SpringMVC核心文件 spring-mvc.xml

**第一种方式：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <!--包扫描-->
    <context:component-scan base-package="com.by"></context:component-scan>
​
</beans>
```

**第二种方式：**

不使用注解模式，手写配置

```xml
<!--需要继承controller 里面实现了header-->
<bean name="/hello2" class="com.by.controller.HelloController2"/>
```

controller编写逻辑：

```bash
public class HelloController2 implements Controller {
    
    @Override
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ModelAndView mv=new ModelAndView();
        mv.setViewName("/WEB-INF/success.jsp");
        //mv.setViewName("hello"); 如果xml统一配置路径，可以简写程文件名
        mv.addObject("msg","今天天气很冷");
        return mv;
    }
}
```

结果显示：

![](https://tcs-devops.aliyuncs.com/storage/112v1242a365cf4126698b623e00bf8c31cf?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3NCwiaWF0IjoxNjg4NTU2NDc0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYxMjQyYTM2NWNmNDEyNjY5OGI2MjNlMDBiZjhjMzFjZiJ9.s3Ef9TNvkbRh6JPLXQrbMSHPr3GY9UD-BLaSug3l0ww&download=%E5%9B%BE%E7%89%87.png "")



快速入门二

需求：通过访问地址调转到指定的页面中

**开发步骤**

①创建Controller类和视图页面

②配置SpringMVC核心控制器DispathcerServlet

④使用注解配置Controller类中业务方法的映射地址

⑤配置SpringMVC核心文件 spring-mvc.xml

⑥客户端发起请求测试

### 1.3 Springmvc success操作

方案一 web.xml + spring-mvc.xml 

1. 建立配置 **spring-mvc.xml** 

```scheme
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context" xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans   http://www.springframework.org/schema/beans/spring-beans.xsd   http://www.springframework.org/schema/context   http://www.springframework.org/schema/context/spring-context.xsd   http://www.springframework.org/schema/mvc   http://www.springframework.org/schema/mvc/spring-mvc.xsd">    
    <!--配置视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
         <!-- 设置逻辑视图名的前缀 -->  
        <property name="prefix" value="/WEB-INF/"></property>
        <!-- 设置逻辑视图名的后缀 --> 
        <property name="suffix" value=".jsp"></property>
    </bean>
<!-- 配置Handler -->  
<bean name="/hello2" class="com.by.controller.HelloController2"/>
<bean name="/hello3" class="com.by.controller.HelloController2"/>
</beans>

```

1. 编写controller实例

```java
public class HelloWord2 implements Controller {
    public ModelAndView handleRequest(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
        ModelAndView mv=new ModelAndView();
        mv.setViewName("success");
        //mv.setViewName("hello"); 如果xml统一配置路径，可以简写程文件名
        mv.addObject("msg","今天天气很冷");
        return mv;
    }
}

```

1. 构建页面 **success页面**

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h2>测试成功，欢迎来到这里</h2>
    <h2>页面接收参数:${msg}</h2>
</body>
</html>

```

### 1.4 入门案例工作流程分析  

- 服务器启动

    - 加载web.xml中DispatcherServlet

    - 读取spring-mvc.xml中的配置，加载所有com.by包中所有标记为bean的类

    - 读取bean中方法上方标注@RequestMapping的内容

- 处理请求

    - DispatcherServlet配置拦截所有请求 /

    - 使用请求路径与所有加载的@RequestMapping的内容进行比对

    - 执行对应的方法

    - 根据方法的返回值在webapp目录中查找对应的页面并展示  

1.4.1 SpringMVC 技术架构图

![](https://tcs-devops.aliyuncs.com/storage/112v5615d3debae25cecfe4a594b3726d963?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3NCwiaWF0IjoxNjg4NTU2NDc0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY1NjE1ZDNkZWJhZTI1Y2VjZmU0YTU5NGIzNzI2ZDk2MyJ9.0EpdIMRSUt8BByxP9q89yNCk65iUvq7DCsiMPNIMw3M&download=%E5%9B%BE%E7%89%87.png "")

1.4.2 前端控制器

>  Spring Web 模型-视图-控制（MVC）框架是围绕 ****DispatcherServlet**** 设计的，DispatcherServlet是整个流程控制的中心，由它调用其它组件处理用户的请求和响应，，DispatcherServlet的存在降低了组件之间的耦合性。Spring Web MVC ***DispatcherServlet*** 的请求处理的****工作流程****如下图所示：

![](https://tcs-devops.aliyuncs.com/storage/112v3f615484418eb020008bbf0db4030e82?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3NCwiaWF0IjoxNjg4NTU2NDc0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYzZjYxNTQ4NDQxOGViMDIwMDA4YmJmMGRiNDAzMGU4MiJ9.sN3Y1ZJfnNKtv-DVYtDv3Wb9gOH7qff9QVaAB39qmHA&download=%E5%9B%BE%E7%89%87.png "")

​			

![](https://tcs-devops.aliyuncs.com/storage/112vb6f61deb715164d7d583df052f70cc4c?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3NCwiaWF0IjoxNjg4NTU2NDc0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZiNmY2MWRlYjcxNTE2NGQ3ZDU4M2RmMDUyZjcwY2M0YyJ9.VJvF6qV1gBbCqrobqtFaLAt4SEku2-ixb6SMpGtpje0&download=%E5%9B%BE%E7%89%87.png "")



### 1.5 具体流程

- 第一步：发起请求到前端控制器(DispatcherServlet)

- 第二步：前端控制器请求处理器映射器HandlerMapping查找 Handler （可以根据xml配置、注解进行查找）

- 第三步：处理器映射器**HandlerMapping**向前端控制器返回**Handler，HandlerMapping**会把请求映射为一个***执行链(HandlerExecutionChain***)对象（包含一个Handler处理器（页面控制器）对象，多个**HandlerInterceptor**拦截器对象），通过这种策略模式，很容易添加新的映射策略

- 第四步：前端控制器调用处理器适配器去执行Handler

- 第五步：处理器适配器**HandlerAdapter**将会根据适配的结果去执行**Handler**

- 第六步：Handler执行完成给适配器返回**ModelAndView**

- 第七步：处理器适配器向前端控制器返回**ModelAndView** （**ModelAndView**是springmvc框架的一个底层对象，包括 Model和view）

- 第八步：前端控制器请求视图解析器去进行视图解析 （根据逻辑视图名解析成真正的视图(jsp)），通过这种策略很容易更换其他视图技术，只需要更改视图解析器即可

- 第九步：视图解析器向前端控制器返回View

- 第十步：前端控制器进行视图渲染 （视图渲染将模型数据(在ModelAndView对象中)填充到request域）

- 第十一步：前端控制器向用户响应结果

### 1.6 总结流程

1. Spring MVC所有的请求都经过DispatcherServlet来统一分发。

1. 需要借助HandlerMapping定位到具体的Controller,然后将请求转发到对应的Controller映射。

1. Controller接口将处理用户请求，这和Java Servlet扮演的角色是一致的。一旦Controller处理完用户请求，则返回ModelAndView(数据和视图)对象给DispatcherServlet前端控制器。

**从宏观角度考虑**：DispatcherServlet是整个Web应用的控制器；**带头大哥**

**从微观考虑：** Controller小弟是单个Http请求处理过程中的控制器，而ModelAndView是Http请求过程中返回的模型（Model）和视图（View）。返回的视图需要通过ViewResolver接口（视图解析器）在Web应用中负责查找View对象，从从而将相应结果渲染给客户。



