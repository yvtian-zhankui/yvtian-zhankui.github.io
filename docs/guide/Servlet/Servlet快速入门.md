# 1 Servlet

## 1.1 Servlet概述

Servlet是SUN公司提供的一套规范，名称就叫Servlet规范，它也是JavaEE规范之一。我们可以像学习Java基础一样，通过API来学习Servlet。这里需要注意的是，在我们之前JDK的API中是没有Servlet规范的相关内容，需要使用JavaEE的API。目前在Oracle官网中的最新版本是[JavaEE8](https://www.oracle.com/technetwork/java/javaee/documentation/ee8-release-notes-3894362.html)，该网址中介绍了JavaEE8的一些新特性。当然，我们可以通过访问官方API，学习和查阅里面的内容。

## 1.2 Servlet详解

- Servlet是一个运行在web服务端的java小程序，用于接收和响应客户端的请求，基于Http协议

- 要想实现Servlet功能，可以实现Servlet接口，继承GenericServlet或者HttpServlet

- 核心方法：任何客户端请求每次请求时都会执行service方法

## 1.3 servlet版本对应

截止到目前，最新的 Servlet 版本是 6.1。下表列出了各种主要 Servlet 版本其对应的 Java 版本和Tomcat版本。

![](https://tcs-devops.aliyuncs.com/storage/112v65646e34b0b258459f553ba1ef012bc5?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzY5OCwiaWF0IjoxNjg4MDM4ODk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY2NTY0NmUzNGIwYjI1ODQ1OWY1NTNiYTFlZjAxMmJjNSJ9.vTBE3C7UShcAU5LU3HohfWJSQEAmrzvUkJF5XV_JLI0&download=%E5%9B%BE%E7%89%87.png "")

## 1.4 Servlet 主要做的工作

- 允许程序猿注册一个类, 在 Tomcat 收到某个特定的 HTTP 请求的时候, 执行这个类中的一些代码。

- 帮助程序猿解析 HTTP 请求，把 HTTP 请求从一个字符串解析成一个 HttpRequest 对象。

- 帮助程序猿构造 HTTP 响应，程序猿只要给指定的 HttpResponse 对象填写一些属性字段, Servlet 就会自动的按照 HTTP 协议的方式构造出一个 HTTP 响应字符串, 并通过 Socket 写回给客户端。简而言之, Servlet 是一组 Tomcat 提供的 API, 让程序猿自己写的代码能很好的和 Tomcat 配合起来, 从 而更简单的实现一个 web app。而不必关注 Socket, HTTP协议格式, 多线程并发等技术细节, 降低了 web app 的开发门槛, 提高了开发效率。 我们只需要关注生成响应的这个过程。

# 2 Servlet快速入门

## 2.1 servlet编写步骤

1. **前期准备-创建JavaWeb工程**

1. **编写一个普通类继承GenericServlet并重写service方法**

1. **在web.xml配置Servlet **

1. **部署并启动**

1. **浏览器测试运行**

### 2.1.1 创建Javaweb工程

第一步：

![](https://tcs-devops.aliyuncs.com/storage/112vb336f9dab378358b1dfe18b92ea1f704?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzY5OCwiaWF0IjoxNjg4MDM4ODk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZiMzM2ZjlkYWIzNzgzNThiMWRmZTE4YjkyZWExZjcwNCJ9.jqhwhzTRtJBvLI6S8zFZ2EToO2v_k5DBmD6fUJQ-R5E&download=%E5%9B%BE%E7%89%87.png "")

![](https://tcs-devops.aliyuncs.com/storage/112vb9d67fd66546fca968a9c41356224016?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzY5OCwiaWF0IjoxNjg4MDM4ODk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZiOWQ2N2ZkNjY1NDZmY2E5NjhhOWM0MTM1NjIyNDAxNiJ9.yEHcwSYLNCdzTNY7SI5sgLL5syNUGM2pPri522O_slM&download=%E5%9B%BE%E7%89%87.png "")

### 2.1.2 创建servlet类

第一步，pom文件添加jar包

```xml
<dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.0</version>
            <scope>provided</scope>
        </dependency>

最新版本使用下方的
<dependencies>
    <dependency>
        <groupId>jakarta.servlet</groupId>
        <artifactId>jakarta.servlet-api</artifactId>
        <version>6.0.0</version>
    </dependency>
</dependencies>
```

第二步，创建servlet类继承GenericServlet

```java
public class FristServlet extends GenericServlet {
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) 
                                                throws ServletException, IOException {
        System.out.println("firstServlet执行了service方法");
    }
}
```

### 2.1.3 编写web.xml配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!--servlet配置中心-->
    <!--servlet类标签-->
    <servlet>
        <!--给定一个声明名字-->
        <servlet-name>fristServlet</servlet-name>
        <!--servlet全类名-->
        <servlet-class>com.by.web.FristServlet</servlet-class>
    </servlet>
    <!--映射一个servlet访问的URl路径-->
    <servlet-mapping>
        <!--指定要映射的servlet名称-->
        <servlet-name>fristServlet</servlet-name>
        <!--指定访问servlet的url路径-->
        <url-pattern>/fsl</url-pattern>
    </servlet-mapping>
</web-app>
```

### 2.1.4 部署tomcat并启动

点击run选择Edit 或者直接点击右上角小锤子也可以

![](https://tcs-devops.aliyuncs.com/storage/112v7222cc813c992ec658832998c8ef021f?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzY5OCwiaWF0IjoxNjg4MDM4ODk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY3MjIyY2M4MTNjOTkyZWM2NTg4MzI5OThjOGVmMDIxZiJ9.C6mdVW3YF2ePeS3Ogg8eYCywoVw43RjHIW0iNW2U5WU&download=%E5%9B%BE%E7%89%87.png "")

配置添加tomcat文件

![](https://tcs-devops.aliyuncs.com/storage/112vb8e4ed7e4a7b5dfb78a4bee800003747?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzY5OCwiaWF0IjoxNjg4MDM4ODk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZiOGU0ZWQ3ZTRhN2I1ZGZiNzhhNGJlZTgwMDAwMzc0NyJ9.fCmTHGdYB3jrOJbUtYq38wltGse2BdVps3PHWdyw_-o&download=%E5%9B%BE%E7%89%87.png "")

配置项目添加到tomcat中：

![](https://tcs-devops.aliyuncs.com/storage/112v64e3c00158c598f98c559d5b05757bba?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzY5OCwiaWF0IjoxNjg4MDM4ODk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY2NGUzYzAwMTU4YzU5OGY5OGM1NTlkNWIwNTc1N2JiYSJ9.7HKBthK0ZIqqO0ZvuFPMHjXH5ZMw0qMzk7honAswXfM&download=%E5%9B%BE%E7%89%87.png "")



### 2.1.5 浏览器url地址输入

![](https://tcs-devops.aliyuncs.com/storage/112v0839d492d74b32bbe8eb4f78d9f6aa5e?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzY5OCwiaWF0IjoxNjg4MDM4ODk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYwODM5ZDQ5MmQ3NGIzMmJiZThlYjRmNzhkOWY2YWE1ZSJ9.Pj7TuYJ6EEo-djkChMxcAHrdVsuAoIRQmdHRW04fK_E&download=%E5%9B%BE%E7%89%87.png "")

## 2.2 Servlet执行过程分析

> 我们通过浏览器发送请求，请求首先到达Tomcat服务器，由服务器解析请求URL，然后在部署的应用列表中找到我们的应用。接下来，在我们的应用中找应用里的web.xml配置文件，在web.xml中找到FirstServlet的配置，找到后执行service方法，最后由FirstServlet响应客户浏览器。整个过程如下图所示：

![](https://tcs-devops.aliyuncs.com/storage/112v7210408493f00792dacee5d75a79ca28?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzY5OCwiaWF0IjoxNjg4MDM4ODk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY3MjEwNDA4NDkzZjAwNzkyZGFjZWU1ZDc1YTc5Y2EyOCJ9.axzzz04bHkwQfwypjHbqsB0jchiVk47bW3rVtx_IsEY&download=%E5%9B%BE%E7%89%87.png "")

一句话总结执行过程：

浏览器——>Tomcat服务器——>我们的应用——>应用中的web.xml——>FirstServlet——>响应浏览器

## 2.3 继承Httpservlet使用案例

>继承HttpServlet，它是jakarta.servlet.http包下的一个抽象类，是GenericServlet的子类。**如果我们选择继承HttpServlet时，只需要重写doGet和doPost方法，不要覆盖service方法。**
>     
> 使用此种方式，表示我们的请求和响应需要和HTTP协议相关。也就是说，我们是通过HTTP协议来访问的。那么每次请求和响应都符合HTTP协议的规范。请求的方式就是HTTP协议所支持的方式（目前我们只知道GET和POST，而实际HTTP协议支持7种请求方式，GET POST PUT DELETE TRACE OPTIONS HEAD )。

### 2.3.1 在入门案例的工程中创建一个Servlet继承HttpServlet

![](https://tcs-devops.aliyuncs.com/storage/112v25a17712eef2840f3a3759ac287c75b3?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzY5OCwiaWF0IjoxNjg4MDM4ODk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYyNWExNzcxMmVlZjI4NDBmM2EzNzU5YWMyODdjNzViMyJ9.j3VlLv0_dmxfUmndunLh5pnWXdv8YToDbBeT_gt-NlY&download=%E5%9B%BE%E7%89%87.png "")

web.xml配置文件：

```text
<servlet>
    <servlet-name>servletDemo01</servlet-name>
    <servlet-class>com.by.web.ServletDemo01</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>servletDemo01</servlet-name>
    <url-pattern>/servletDemo01</url-pattern>
</servlet-mapping>
```

**第二步：部署项目并测试访问**

当我们在地址栏输入servletDemo01的访问URL时，出现了访问错误，状态码是405。提示信息是：方法不允许。

![](https://tcs-devops.aliyuncs.com/storage/112v87e80097b8844990240a162659321b32?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzY5OCwiaWF0IjoxNjg4MDM4ODk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY4N2U4MDA5N2I4ODQ0OTkwMjQwYTE2MjY1OTMyMWIzMiJ9.Ha8iI4lFgJYt7T0lMhJSUOD8tiD4yhF6WVShayEFQ3s&download=%E5%9B%BE%E7%89%87.png "")

**第三步：分析原因** 

得出HttpServlet的使用结论：

>  **我们继承了HttpServlet，需要重写里面的doGet和doPost方法来接收get方式和post方式的请求。**

为了实现代码的可重用性，我们只需要在doGet或者doPost方法中一个里面提供具体功能即可，而另外的那个方法只需要调用提供了功能的方法。

### 2.3.2 响应行详解

响应行：`HTTP/1.1 200 OK`

| 内容       | 说明       |
| -------- | -------- |
| HTTP/1.1 | 使用协议的版本。 |
| 200      | 响应状态码    |
| OK       | 状态码描述    |

常用状态码介绍：

| 状态码  | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| 200     | 一切都OK>                                                    |
| 302/307 | 请求重定向(客户端行为，两次请求，地址栏发生改变)             |
| 304     | 请求资源未发生变化，使用缓存                                 |
| 404     | 请求资源未找到                                               |
| 405     | 用来访问本页面的 HTTP 谓词不被允许（方法不被允许）请求方式不对 |
| 500     | 服务器错误                                                   |

## 2.4 Servlet使用细节

### 2.4.1 Servlet生命周期

生命周期是指事物从创建到毁灭的过程。

Servlet 也有生命周期，Servlet 的生命周期就是 Servlet 从创建到销毁的过程。Servlet 的生命周期由 Servlet 容器管理，主要分为以下 3 个阶段。

1. 初始化阶段  

1. 运行时阶段 

1. 销毁阶段   

### 2.4.2 初始化阶段

Servlet 初始化是其生命周期的第一个阶段，也是其他阶段的基础。只有完成了初始化，Servlet 才能处理来自客户端的请求。

Servlet 初始化阶段分为 2 步：

1. 加载和实例化 Servlet；

1. 调用 init() 方法进行初始化。

1. 加载和实例化 Servlet

Servlet 容器负责加载和实例化 Servlet。当容器启动或首次请求某个 Servlet 时，容器会读取 web.xml 或 @WebServlet 中的配置信息，对指定的 Servlet 进行加载。加载成功后，容器会通过反射对 Servlet 进行实例化。

> 因为 Servlet 容器是通过 Java 的反射 API 来创建 Servlet 实例的，需要调用 Servlet 的默认构造方法（default constructor，即不带参数的构造方法），所以在编写 Servlet 类时，不能只提供一个带参数的构造方法。

2. 调用 init() 方法进行初始化

加载和实例化完成后，Servlet 容器调用 init() 方法初始化 Servlet 实例。

初始化的目的：让 Servlet 实例在处理请求之前完成一些初始化工作，例如建立数据库连接，获取配置信息等。

在 Servlet 的整个生命周期内，init() 方法只能被调用一次。

初始化期间，Servlet 实例可以通过 ServletConfig 对象获取在 web.xml 或者 @WebServlet 中配置的初始化参数。

### 2.4.3 运行时阶段

运行时阶段是 Servlet 生命周期中最重要的阶段。Servlet 容器接收到来自客户端请求时，容器会针对该请求分别创建一个 ServletRequst 对象和 ServletResponse 对象，将它们以参数的形式传入 service() 方法内，并调用该方法对请求进行理处。

### 2.4.4 销毁阶段

当 Servlet 容器关闭、重启或移除 Servlet 实例时，容器就会调用 destory() 方法，释放该实例使用的资源，例如：关闭数据库连接，关闭文件的输入流和输出流等，随后该实例被 Java 的垃圾收集器所回收。

对于每个 Servlet 实例来说，destory() 方法只能被调用一次。

## 2.5 Servlet 生命周期执行流程

Servlet 生命周期流程如下图所示。

![](https://tcs-devops.aliyuncs.com/storage/112v5aeb0e32de59cc8106b5ce5671a3984e?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzY5OCwiaWF0IjoxNjg4MDM4ODk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY1YWViMGUzMmRlNTljYzgxMDZiNWNlNTY3MWEzOTg0ZSJ9.8MDXdjqKzY1O57afyBWQp_TcgVkVvUGRpeObjTLfYBQ&download=%E5%9B%BE%E7%89%87.png "")

   在 Servlet 的整个生命周期中，创建 Servlet 实例、init() 方法和 destory() 方法都只执行一次。当初始化完成后，Servlet 容器会将该实例保存在内存中，通过调用它的 service() 方法，为接收到的请求服务。

总结：

> servlet对象只会创建一次，销毁一次，所以Servlet对象只有一个实例，如果一个对象实例在应用中是唯一的存在，那么就被称为单例。

### 2.5.1代码演示：

```text
@Override
public void init() throws ServletException {
    System.out.println("servlet创建并初始化成功");
}
​
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("接收客户端的请求。。。");
}
​
@Override
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    doGet(req,resp);
}
​
@Override
public void destroy() {
    System.out.println("对象已销毁。。。。");
}
```

## 2.6 虚拟路径匹配规则

Servlet 虚拟路径匹配规则有以下 4 种：

1. 完全路径匹配 /demo

1. 目录匹配  /demo/*

1. 扩展名匹配 *.do

1. 缺省匹配（默认匹配） / /*

下面我们以 servletDemo 为例，分别介绍 4 种规则。

| 匹配规则                | 使用规则                                                     | 虚拟路径                                         | 可访问的URL                                                  |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------ |
| 完全路径匹配 (精确匹配) | 以/开始，不能包含通配符*。 必须完全匹配                      | /myServlet /user/myServlet /product/index.action | `http://localhost:8080/servletDemo/myServlet http://localhost:8080/servletDemo/user/myServlet http://localhost:8080/servletDemo/product/index.action` |
| 目录匹配                | 以/字符开头，并以/*结尾的字符串。 用于路径匹配               | /user/*                                          | `http://localhost:8080/servletDemo/user/aaa http://localhost:8080/servletDemo/aa` |
| 扩展名匹配              | 以通配符*.开头的字符串。 用于扩展名匹配                      | *.do *.action *.jsp                              | `http://localhost:8080/servletDemo/user.do http://localhost:8080/servletDemo/myServlet.action http://localhost:8080/servletDemo/bb.jsp` |
| 缺省匹配（默认匹配）    | 映射路径为/，表示这个 Servlet 为当前应用的缺省 Servlet 或默认 Servlet，默认处理无法匹配到虚拟路径的请求。 | /                                                | 可以匹配任意请求 URL                                         |

注意：目录匹配和扩展名匹配无法混合使用，即`/rest/*.do`这种写法是不正确的。

### 2.6.1 匹配优先级

Servlet 虚拟路径的匹配优先级顺序为：全路径匹配（精确匹配）> 目录匹配 > 扩展名匹配 > 缺省匹配（默认匹配）。

### 2.6.2 多路径映射

- 我们可以给一个Servlet配置多个访问映射，从而根据不同的请求路径来实现不同的功能。

- 场景分析：

    - 如果访问访问的资源路径是/vip  商品价格打9折

    - 如果访问访问的资源路径是/Cvip  商品价格打5折

    - 如果访问访问的资源路径是其他  商品价格不打折

		

```text
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //1、定义商品价格
    int money=1000;
    //2、获取浏览器访问路径
    String path = req.getRequestURI();
     path = path.substring(path.lastIndexOf("/"));
    //判断路径
    if("/vip".equals(path)){
        System.out.println("商品原价是="+money+"优惠后的价格是="+(money * 0.9));
    }else if ("/cvip".equals(path)){
        System.out.println("商品原价是="+money+"优惠后的价格是="+(money * 0.5));
    }else{
        System.out.println("您不是会员您的商品原价是="+money);
    }
​
}
```

web.xml配置

```text
<servlet>
    <servlet-name>ServletDemo02</servlet-name>
    <servlet-class>com.by.web.ServletDemo02</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>ServletDemo02</servlet-name>
    <url-pattern>/demo02/*</url-pattern>
</servlet-mapping>
```

## 3 TomCat介绍

### 3.1 称服务器

>  服务器的概念非常的广泛，它可以指代一台特殊的计算机（相比普通计算机运行更快、负载更高、价格更贵），也可以指代用于部署网站的应用。我们这里说的服务器，其实是web服务器，或者应用服务器。它本质就是一个软件，一个应用。作用就是发布我们的应用（工程），让用户可以通过浏览器访问我们的应用。

常见的应用服务器，请看下表：

| 服务器名称       | 说明                               |
| ----------- | -------------------------------- |
| weblogic    | 实现了javaEE规范，重量级服务器，又称为javaEE容器   |
| websphereAS | 实现了javaEE规范，重量级服务器。              |
| JBOSSAS     | 实现了JavaEE规范，重量级服务器。免费的。          |
| Tomcat      | 实现了jsp/servlet规范，是一个轻量级服务器，开源免费。 |

### 3.2 Tomcat下载

## 4 ServletConfig

## 4.1 ServletConfig概述

### 4.1.1 基本概念

> 它是Servlet的配置参数对象，在Servlet规范中，允许为每个Servlet都提供一些初始化配置。所以，每个Servlet都有一个自己的ServletConfig。它的作用是在Servlet初始化期间，把一些配置信息传递给Servlet。

### 4.1.2 生命周期

> 由于它是在初始化阶段读取了web.xml中为Servlet准备的初始化配置，并把配置信息传递给Servlet，所以生命周期与Servlet相同。这里需要注意的是，如果Servlet配置了`<load-on-startup>1</load-on-startup>`，那么ServletConfig也会在应用加载时创建。

## 4.2 ServletConfig的使用

### 4.2.1 如何配置

> 如何配置初始化参数，它需要使用`<servlet>`标签中的`<init-param>`标签来配置。Servlet的初始化参数都是配置在Servlet的声明部分的。并且每个Servlet都支持有多个初始化参数，并且初始化参数都是以键值对的形式存在的。接下来，我们看配置示例：

```java
<!--配置servletDemo02-->
    <servlet>
        <servlet-name>servletDemo02</servlet-name>
        <servlet-class>com.by.web.ServletDemo02</servlet-class>
        <!--配置初始化参数-->
        <init-param>
<!--            用于获取初始化参数的key-->
            <param-name>name</param-name>
            <!--初始化参数的值-->
            <param-value>张三</param-value>
        </init-param>
        <init-param>
            <param-name>servletInfo</param-name>
            <param-value>this is Demo02</param-value>
        </init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>servletDemo02</servlet-name>
        <url-pattern>/servletDemo02</url-pattern>
    </servlet-mapping>
```

## 4.2.3 ServletConfig 接口参数

javax.servlet 包提供了一个 ServletConfig 接口，该接口中提供了以下方法。

| 返回值类型            | 方法                          | 功能描述                                                     |
| --------------------- | ----------------------------- | ------------------------------------------------------------ |
| String                | getInitParameter(String name) | 根据初始化参数名 name，返回对应的初始化参数值。              |
| `Enumeration<String>` | getInitParameterNames()       | 返回 Servlet 所有的初始化参数名的枚举集合，如果该 Servlet 没有初始化参数，则返回一个空的集合。 |
| ServletContext        | getServletContext()           | 返回一个代表当前 Web 应用的 ServletContext 对象。            |
| String                | getServletName()              | 返回 Servlet 的名字，即 web.xml 中 `<servlet-name> ` 元素的值。 |

代码演示输出

```java
//创建一个servletConfig对象
 private ServletConfig servletConfig;
​
@Override
    public void init(ServletConfig config) throws ServletException {
       this.servletConfig=config;
    }
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
  //输出servletConfig的值
    System.out.println(servletConfig);
    //获取servlet名字
    String servletName = servletConfig.getServletName();
    System.out.println("servlet的名字是="+servletName);
    //获取自定以name名字
    String name = servletConfig.getInitParameter("name");
    System.out.println("自定义的名字是="+name);
    Enumeration<String> enumer = servletConfig.getInitParameterNames();
    while (enumer.hasMoreElements()) {
        //取出每个names值
        String names = enumer.nextElement();
        //根据key获取Value值
        String value = servletConfig.getInitParameter(names);
        System.out.println("name= "+names+"  value= "+value);
    }
    //获取servletContext对象
    ServletContext servletContext = servletConfig.getServletContext();
    System.out.println(servletContext);
}
```

## 5 ServletContext接口详解

Servlet 容器启动时，会为每个 Web 应用（web下的每个目录都是一个 Web 应用）创建一个唯一的 ServletContext 对象，该对象一般被称为“Servlet 上下文”。

ServletContext 对象的生命周期从 Servlet 容器启动时开始，到容器关闭或应用被卸载时结束。

Web 应用中的所有 Servlet 共享同一个 ServletContext 对象，不同 Servlet 之间可以通过 ServletContext 对象实现数据通讯，因此 ServletContext 对象也被称为 Context 域对象。

> 域对象是服务器在内存上创建的存储空间，该空间用于不同动态资源（例如 Servlet、JSP）之间传递与共享数据。

### 5.1 域对象概念

域对象的概念，它指的是对象有作用域，即有作用范围。

域对象的作用，域对象可以实现数据共享。不同作用范围的域对象，共享数据的能力不一样。

在Servlet规范中，一共有4个域对象。今天我们讲解的ServletContext就是其中一个。它也是我们接触的第一个域对象。它是web应用中最大的作用域，叫application域。每个应用只有一个application域。它可以实现整个应用间的数据共享功能。



### 5.2 ServletContext配置

ServletContext既然被称之为应用上下文对象，所以它的配置是针对整个应用的配置，而非某个特定Servlet的配置。它的配置被称为应用的初始化参数配置。

配置的方式，需要在`<web-app>`标签中使用`<context-param>`来配置初始化参数。具体代码如下：

```text
<!--配置应用初始化参数-->
<context-param>
    <!--用于获取初始化参数的key值-->
    <param-name>namespace</param-name>
    <!--用于获取初始化参数的value值-->
    <param-value>小李子</param-value>
</context-param>
<!--每个应用初始化参数都需要用到context-param标签-->
<context-param>
    <param-name>globalEncoding</param-name>
    <param-value>UTF-8</param-value>
</context-param>
```

### 5.3 ServletContext常用的方法

| 返回值类型  | 方法                            | 功能描述                       |
| ------ | ----------------------------- | -------------------------- |
| String | getInitParameter(String name) | 根据初始化参数名 name，返回对应的初始化参数值。 |
| string | getContextPath()              | 获取虚拟目录                     |
| string | getRealPath(String name)      | 根据虚拟目录获取应用部署的磁盘绝对路径        |

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
   //创建上下文对象
    ServletContext context=getServletContext();
    //获取全局配置的globalEncoding
    String glo = context.getInitParameter("globalEncoding");
    System.out.println(glo);
    //获取虚拟目录
    String pa = context.getContextPath();
    System.out.println("虚拟目录是"+pa);
    //根据虚拟目录获取应用部署的磁盘绝对路径
    //获取c.txt文件的绝对路径
    String c = context.getRealPath("/WEB-INF/c.txt");
    System.out.println(c);

    //向域对象中存储数据
   // context.setAttribute("username","zhangsan");
    context.removeAttribute("username");
}
```

### 5.4 ServletContext常用方法

> 实现共享数据的方法

| 返回值    | 方法名                                      | 说明               |
| ------ | ---------------------------------------- | ---------------- |
| void   | setAttribute(String name, Object value); | 向应用域对象中存储数据      |
| object | getAttribute(String name);               | 通过名称获取应用对象中存储的数据 |
| void   | removeAttribute(String name);            | 通过名称删除应用域对象中的数据  |



## 6 注解开发入门案例

### 6.1 删除web.xml 

直接编写代码就好了

```text
@WebServlet("/webDemo")
public class WebServletDemo extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("servlet 注解执行完成");
    }
}
```

### @WebServlet注解

在 Servlet 中，web.xml 扮演的角色十分的重要，它可以将所有的 Servlet 的配置集中进行管理，但是若项目中 Servelt 数量较多时，web.xml 的配置会变得十分的冗长。这种情况下，注解（Annotation）就是一种更好的选择。

为了简化 Servlet 的配置，Servlet 3.0 中增加了注解支持，例如：@WebServlet、@WebInitParm 、@WebFilter 和 @WebLitener 等，这使得 web.xml 从 Servlet 3.0 开始不再是必选项了。下面我们对 @WebServlet 进行介绍。

### @WebServlet 注解的属性

@WebServlet 用于将一个类声明为 Servlet，该注解会在部署时被容器处理，容器根据其具体的属性配置将相应的类部署为 Servlet。该注解具有下表给出的一些常用属性。

| 属性名        | 类型            | 标签                | 描述                                                         | 是否必需 |
| ------------- | --------------- | ------------------- | ------------------------------------------------------------ | -------- |
| name          | String          | `<servlet-name>`    | 指定 Servlet 的 name 属性。 如果没有显式指定，则取值为该 Servlet 的完全限定名，即包名+类名。 | 否       |
| value         | String[ ]       | `<url-pattern>`     | 该属性等价于 urlPatterns 属性，两者不能同时指定。 如果同时指定，通常是忽略 value 的取值。 | 是       |
| urlPatterns   | String[ ]       | `<url-pattern>`     | 指定一组 Servlet 的 URL 匹配模式。                           | 是       |
| loadOnStartup | int             | `<load-on-startup>` | 指定 Servlet 的加载顺序。                                    | 否       |
| initParams    | WebInitParam[ ] | `<init-param>`      | 指定一组 Servlet 初始化参数。                                | 否       |
| description   | String          | `<description>`     | 指定该 Servlet 的描述信息。                                  | 否       |
| displayName   | String          | `<display-name>`    | 指定该 Servlet 的显示名。                                    | 否       |

## 7 Request&Response

### 7.1 HttpServletResponse响应对象概述

> 在 Servlet API 中，定义了一个 HttpServletResponse 接口，它继承自 ServletResponse 接口。HttpServletResponse 对象专门用来封装 HTTP 响应消息，简称 response 对象。
>
> Servlet 容器会针对每次请求创建一个 response 对象，并把它作为参数传递给 Servlet 的 service 方法。Servlet 处理请求后，会将响应信息封装到 response 对象中，并由容器解析后返回给客户端。

### 7.2 关于响应

> 响应，它表示了服务器端收到请求，同时也已经处理完成，把处理的结果告知用户。简单来说，指的就是服务器把请求的处理结果告知客户端。在B/S架构中，响应就是把结果带回浏览器。

响应对象，顾名思义就是用于在JavaWeb工程中实现上述功能的对象。

### 7.2.1 响应行相关的方法

当 Servlet 返回响应消息时，需要在响应消息中设置状态码。因此，HttpServletResponse 接口定义了发送状态码的方法，如下表。



| 返回值类型 | 方法                    | 描述                           |
| ----- | --------------------- | ---------------------------- |
| void  | setStatus（int status） | 用于设置 HTTP 响应消息的状态码，并生成响应状态行。 |
| void  | sendError（int sc）     | 用于发送表示错误信息的状态码。              |

### 7.2.2 响应头相关的方法

HttpServletResponse 接口中定义了一系列设置 HTTP 响应头字段的方法，如下表所示。

| 返回值类型 | 方法                                   | 描述                                                                        |
| ----- | ------------------------------------ | ------------------------------------------------------------------------- |
| void  | setHeader (String name,String value) | 用于设置响应头字段，其中，参数 name 用于指定响应头字段的名称，参数 value 用于指定响应头字段的值。                   |
| void  | addIntHeader(String name,int value)  | 用于增加值为 int 类型的响应头字段，其中，参数 name 用于指定响应头字段的名称，参数 value 用于指定响应头字段的值，类型为 int。 |
| void  | setIntHeader(String name, int value) | 用于设置值为 int 类型的响应头字段，其中，参数 name 用于指定响应头字段的名称，参数 value 用于指定响应头字段的值，类型为 int。 |
| void  | setContentType(String type)          | 用于设置 Servlet 输出内容的 MIME 类型以及编码格式。                                         |
| void  | setCharacterEncoding(String charset) | 用于设置输出内容使用的字符编码。                                                          |

### 7.2.3 响应体相关的方法

由于在 HTTP 响应消息中，大量的数据都是通过响应消息体传递的。因此 ServletResponse 遵循以 I/O 流传递大量数据的设计理念，在发送响应消息体时，定义了两个与输出流相关的方法。

| 返回值类型               | 方法                | 描述           |
| ------------------- | ----------------- | ------------ |
| ServletOutputStream | getOutputStream() | 用于获取字节输出流对象。 |
| PrintWriter         | getWriter()       | 用于获取字符输出流对象。 |

## 7.3 响应对象的使用示例

### 7.3.1 响应-字节流输出及乱码问题

```text
@WebServlet("/respDemo")
public class RespDemo01 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //获取字节流对象
        ServletOutputStream so = resp.getOutputStream();
        //准备一个消息
        String str="字节输出流";
        resp.setContentType("text/html;charset=utf-8");
        //通过字节输出
        so.write(str.getBytes("utf-8"));

    }
```

### 7.3.2 响应-字符流输出中文问题

```text
@WebServlet("/respDemo2")
public class RespDemo02 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1、获取字符流对象
        PrintWriter writer = resp.getWriter();
        //2、设置响应正文的字符集
        resp.setContentType("text/html;charSet=UTF-8");
        //3、编写预留文字
        String str="使用字符流输出信息";
        //4、响应输出到控制台
        writer.write(str);
    }
```

### 7.3.3 设置响应消息头定时刷新

```text
@WebServlet("/respDemo3")
public class RespDemo03 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        String str="用户名密码错误，3秒后跳转到登录页面";
        //设置编码的字符集
        resp.setContentType("text/html;charSet=UTF-8");
        writer.write(str);
        //设置跳转时间
        resp.setHeader("Refresh","3;URL=/ReqResp/login.html");
        
    }
```



### 7.3.4请求重定向：注意地址栏发生改变。

- 请求重定向：客户端的一次请求到达后，发现需要借助其他servlet来实现功能

- 特点：浏览器地址栏发生改变，发送两次请求，请求域对象中不能共享数据，可以重定向到其他服务器

- 重定向实现原理

    - resp.setStatus(302);

- 设置响应的资源路径（响应到哪里去，通过响应消息头location来指定）

    - resp.setHeader("location","/ReqResp/respdemo");

- 响应对象方法：

    - sendRedirect(String name): 指定重定向

使用示例：

```text
@WebServlet("/respDemo4")
public class RespDemo04 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        System.out.println("respDemo04已经执行");
       /* //1、设置响应状态码
        resp.setStatus(302);
        //2、设置响应资源路径
        resp.setHeader("location","/ReqResp/respDemo5");*/
        
        //重定向方法
        resp.sendRedirect(req.getContextPath()+"/respDemo5");
        req.setAttribute("username","zhangshan");
    }
```

另一个类：

```text
@WebServlet("/respDemo5")
public class RespDemo05 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

       resp.getWriter().write("this is respDemo5");
        Object username = req.getAttribute("username");
        System.out.println(username);
    }
```

### 7.3.5 响应和消息头组合应用-文件下载

思路：

```text
文件下载的思路：
     	1.获取文件路径
      	2.把文件读到字节输入流中
     	3.设置响应消息头支持的类型
      	4.告知浏览器，以下载的方式打开（告知浏览器下载文件的MIME类型）
      	5.使用响应对象的字节输出流输出到浏览器上
      	6.循环读写
      	7.释放资源
```

```text
@WebServlet("/respDemo6")
public class RespDemo06 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        //1、获取文件路径
        ServletContext context = getServletContext();
        String realPath = context.getRealPath("/image/typec.jpg");
        //把文件读取到字节输入流中
        FileInputStream in = new FileInputStream(realPath);
        //设置响应消息头
        /*
        *Content-Type 消息头名称 支持的类型
        application/octet-stream 消息参数 应用的类型字节流
        */
        resp.setHeader("Content-Type","application/octet-stream");
        //设置响应头以下载的方式打开
        /*
        * Content-Disposition 消息头名称 处理的形式
        * attachment;filename 消息头参数 附件形式进行处理 指定下载文件的名称
        * */
        resp.setHeader("Content-Disposition","attachment;filename=typec.jpg");
        //4、指定输出流
        ServletOutputStream os = resp.getOutputStream();
        
        byte[] bytes=new byte[1024];
        int len;
        while ((len = in.read(bytes))!=-1){
            os.write(bytes,0,len);
        }
        in.close();
    }
```



## 8 HttpServletRequest请求对象

### 关于请求

请求，顾明思议，就是使用者希望从服务器端索取一些资源，向服务器发出询问。在B/S架构中，就是客户浏览器向服务器发出询问。在我们的JavaEE工程中，客户浏览器发出询问，要遵循HTTP协议所规定的。

请求对象，就是在JavaEE工程中，用于发送请求的对象。我们常用的对象就是ServletRequest和HttpServletRequest，它们的区别就是是否和HTTP协议有关。



### 8.1 常用方法介绍

获取请求行信息

HTTP 请求的请求行中包含请求方法、请求资源名、请求路径等信息，HttpServletRequest 接口定义了一系列获取请求行信息的方法，如下表。



| 返回值类型  | 方法声明             | 描述                                                    |
| ------ | ---------------- | ----------------------------------------------------- |
| String | getMethod()      | 该方法用于获取 HTTP 请求方式（如 GET、POST 等）。                      |
| String | getRequestURI()  | 该方法用于获取请求行中的资源名称部分，即位于 URL 的主机和端口之后，参数部分之前的部分。        |
| String | getQueryString() | 该方法用于获取请求行中的参数部分，也就是 URL 中“?”以后的所有内容。                 |
| String | getContextPath() | 获取虚拟目录的名称                                             |
| String | getServletPath() | 该方法用于获取 Servlet 所映射的路径。                               |
| String | getRemoteAddr()  | 该方法用于获取访问者的 IP 地址。                                    |
| String | getRemoteHost()  | 该方法用于获取访问者的完整主机名，如果无法解析出客户机的完整主机名，则该方法将会返回客户端的 IP 地址。 |

获取请求头信息

当浏览器发送请求时，需要通过请求头向服务器传递一些附加信息，例如客户端可以接收的数据类型、压缩方式、语言等。为了获取请求头中的信息， HttpServletRequest 接口定义了一系列用于获取 HTTP 请求头字段的方法，如下表所示。

| 返回值类型       | 方法声明                    | 描述                      |
| ----------- | ----------------------- | ----------------------- |
| String      | getHeader(String name)  | 根据名称获取请求头消息值。           |
| Enumeration | getHeaders(String name) | 根据名称获取一个消息头所有的值，一个名称多个值 |
| Enumeration | getHeaderNames()        | 该方法返回请求头中所有头字段的枚举集合。    |
| String      | getCharacterEncoding()  | 该方法用于返回请求消息的字符集编码 。     |

获取 form 表单的数据

在实际开发中，我们经常需要获取用户提交的表单数据，例如用户名和密码等。为了方便获取表单中的请求参数，ServletRequest 定义了一系列获取请求参数的方法，如下表所示。



| 返回值类型       | 方法声明                             | 功能描述                                       |
| ----------- | -------------------------------- | ------------------------------------------ |
| String      | getParameter(String name)        | 根据名称获取数据                                   |
| String [ ]  | getParameterValues (String name) | 根据名称获取所有数据（HTTP 请求中可以有多个相同参数名的参数）。         |
| Enumeration | getParameterNames()              | 获取请求中所有参数名，枚举类型。                           |
| Map         | getParameterMap()                | 获取所有参数的键值对数据（请求中的所有参数名和参数值装入一个 Map 对象中返回）。 |

获取请求行信息代码示例

```text
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //获取请求类型
    String method = req.getMethod();
    //获取统一资源标识符
    String requestURI = req.getRequestURI();
    //获取浏览器输入路径
    String requestUrl = req.getRequestURL().toString();
    //应用上下文
    String contextPath = req.getContextPath();
    //获取映射路径
    String path = req.getServletPath();
    //获取？ 后面的值
    String queryString = req.getQueryString();
    //获取访问者ip
    String remoteAddr = req.getRemoteAddr();
    //获取完整的主机名
    String remoteHost = req.getRemoteHost();
    //获取来访的端口号
    int remotePort = req.getRemotePort();
    System.out.println("method="+method);
    System.out.println("requestURI "+requestURI);
    System.out.println("requestUrl "+requestUrl);
    System.out.println("contextPath "+contextPath);
    System.out.println("path "+path);
    System.out.println("remoteAddr "+remoteAddr);
    System.out.println("remoteHost "+remoteHost);
    System.out.println("remotePort "+remotePort);
    System.out.println("queryString "+queryString);

}
```

获取请求头信息

```text
   //根据名称获取请求消息的值 一个名字对应一个值
    String value = req.getHeader("Connection");
    System.out.println(value);
    //根据名称获取请求头所有的值  一个名字对应多个值
    Enumeration<String> values = req.getHeaders("Accept-Encoding");
    while (values.hasMoreElements()){
        System.out.println("getHeaders() "+values.nextElement());
    }
    //获取所有请求头的名称 枚举类
    Enumeration<String> names = req.getHeaderNames();
    while (names.hasMoreElements()){
        System.out.println("getHeaderNames(); "+names.nextElement());
    }
    //获取字符集
    String characterEncoding = req.getCharacterEncoding();
    
    System.out.println("getCharacterEncoding() "+characterEncoding);
}
```

获取请求参数（form表单）

准备工作

创建一个表单页面 register.html

```text
<head>
    <meta charset="UTF-8">
    <title>用户注册</title>
</head>
<body>
    <form action="/ReqResp/reqdemo03" method="post">
        用户名：<input type="text" name="username" /><br/>
        密码：<input type="password" name="password" /><br/>
        性别：<input type="radio" name="gender" value="1" checked>男
        <input type="radio" name="gender" value="0">女
        <br/>
        <input type="submit" value="注册" />
    </form>
</body>
```

获取请求参数示例：

```text
@Override
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //1、根据名称获取数据 getParameter(String name)
    String username = req.getParameter("username");
    System.out.println("用户名是="+username);
    String password = req.getParameter("password");
    System.out.println("用户密码"+password);
    
    //2、根据名称获取所有数据 getParameterValues (String name)
    String[] genders = req.getParameterValues("gender");
    for (String gender : genders) {
        System.out.println(gender);
    }
   
    //3、getParameterNames() 获取请求中所有参数名。
    Enumeration<String> names = req.getParameterNames();
    while(names.hasMoreElements()){
        System.out.println("所有的参数名字"+names.nextElement());
    }
   
    //4、getParameterMap()获取所有参数的键值对数据
    Map<String, String[]> map = req.getParameterMap();
    for(String key:map.keySet()){
        String[] str = map.get(key);
        System.out.print(str+":");
        for (String value : str) {
            System.out.print(value+" ");
        }
        System.out.println();
    }

}
```

封装请求参数到实体类中

我们通过上面的方法可以获取到请求参数，但是如果参数过多，在进行传递时，方法的形参定义将会变得非常难看。此时我们应该用一个对象来描述这些参数，它就是实体类。这种类的定义，从基础阶段我们就开始使用了。在基础阶段，我们做过一个学生管理系统，用到了一个Student的类，它就是用于描述一个学生的实体类。

我们现在要做的就是把表单中提交过来的数据填充到实体类中。

```text
@Override
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //1、获取所有数据
    String username = req.getParameter("username");
    String password = req.getParameter("password");
    String[] genders = req.getParameterValues("gender");
    //2、封装到实体对象中
    Student stu=new Student();
    stu.setUsername(username);
    stu.setPassword(password);
    stu.setGender(genders);
    //输出stu的数据
    System.out.println(stu);
}
```

使用apache的commons-beanutils实现封装

添加jar文件：

```text
<dependency>
    <groupId>commons-beanutils</groupId>
    <artifactId>commons-beanutils</artifactId>
    <version>1.9.4</version>
</dependency>
```

代码实现：

```text
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
  //构建实体对象
    Student stu=new Student();
//获取键值对数据
    Map<String, String[]> map = req.getParameterMap();
    try {
        BeanUtils.populate(stu,map);
    } catch (Exception e) {
        e.printStackTrace();
    }

    System.out.println("封装后的"+stu.toString());
}
```

### 8.2 请求转发

- 请求转发：客户端的一次请求到达后，发现需要借助其他servlet来实现

- 特点：

    - 浏览器地址栏不变

    - 域对象中的数据不丢失

    - 负责转发的servelt转发前后的响应正文会丢失

    - 由转发的目的地来响应客户端

- 在实际开发中，重定向和请求转发都是我们要用到的响应方式，那么他们有什么区别呢？

    - 请求转发是服务器行为、重定向是客户端浏览器行为

    - 请求转发只有一次请求所以可以实现request域对象中的数据共享，而重定向是多次请求、多次响应

    - 请求转发url地址栏不变，而重定向会发生变化

请求转发的方法：

| 返回值类型             | 方法                                                       | 功能描述                                                                  |
| ----------------- | -------------------------------------------------------- | --------------------------------------------------------------------- |
| RequestDispatcher | getRequestDispatcher(String path)                        | 获取请求调度对象                                                              |
| void              | forward(ServletRequest request,ServletResponse response) | 用于将请求转发给另一个 Web 资源。该方法必须在响应提交给客户端之前被调用，否则将抛出 IllegalStateException 异常 |

转发示例

```text
@WebServlet("/reqdemo05")
public class RequestDemo05 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //1、获取请求调度对象
        RequestDispatcher dispatcher = req.getRequestDispatcher("/reqdemo06");
        //给他一个共享的数据
        req.setAttribute("username","zhangsan");
        //使用调度对象获取转发方法
        dispatcher.forward(req,resp);
```

```text
@WebServlet("/reqdemo06")
public class RequestDemo06 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       //获取共享数据
        Object username = req.getAttribute("username");
        System.out.println(username);
        resp.setContentType("text/html;charSet=UTF-8");
      resp.getWriter().write("恭喜你转发成功已到达本类");

    }
```

请求包含

在实际开发中，我们可能需要把两个Servlet的内容合并到一起来响应浏览器，而同学们都知道HTTP协议的特点是一请求，一响应的方式。所以绝对不可能出现有两个Servlet同时响应方式。那么我们就需要用到请求包含，把两个Servlet的响应内容合并输出；

```text
@WebServlet("/reqdemo05")
public class RequestDemo05 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charSet=UTF-8");
        resp.getWriter().write("保存好我的账号密码我怕忘记"+"<br/>");
        //获取请求调度对象
        RequestDispatcher dispatcher = req.getRequestDispatcher("/reqdemo06");
        //给他一个共享的数据
        req.setAttribute("username","zhangsan");
        //使用调度对象获取转发方法
        dispatcher.include(req,resp);
```

```text
@WebServlet("/reqdemo06")
public class RequestDemo06 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       //获取共享数据
        Object username = req.getAttribute("username");
        System.out.println(username);
        resp.setContentType("text/html;charSet=UTF-8");
      resp.getWriter().write("我已记录你的账号忘记的时候找我拿");

    }
```

### 细节问题

- 请求转发的注意事项：负责转发的Servlet，转发前后的响应正文丢失，由转发目的地来响应浏览器。

- 请求包含的注意事项：被包含者的响应消息头丢失。因为它被包含起来了。

