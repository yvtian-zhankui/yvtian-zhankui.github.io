1 会话技术

## 1.1 会话管理概述

### 1.1.1 什么是会话

这里的会话，指的是web开发中的一次通话过程，当打开浏览器，访问网站地址后，会话开始，当关闭浏览器（或者到了过期时间），会话结束。

举个例子：

> 例如，你在给家人打电话，这时突然有送外卖的外卖小哥敲门，你放下电话去开门，收完外卖回来后，通话还在保持中，继续说话就行了。

### 1.1.2 会话管理作用

什么时候会用到会话管理呢？最常见的就是购物车，当我们登录成功后，把商品加入到购物车之中，此时我们无论再浏览什么商品，当点击购物车时，那些加入的商品都还在购物车中。

在我们的实际开发中，还有很多地方都离不开会话管理技术。比如，我们在论坛发帖，没有登录的游客身份是不允许发帖的。所以当我们登录成功后，无论我们进入哪个版块发帖，只要权限允许的情况下，服务器都会认识我们，从而让我们发帖，因为登录成功的信息一直保留在服务器端的会话中。

通过上面的两个例子，我们可以看出，它是为我们共享数据用的，并且是在不同请求间实现数据共享。也就是说，如果我们需要在多次请求间实现数据共享，就可以考虑使用会话管理技术了。

### 1.1.3 会话管理分类

在JavaEE的项目中，会话管理分为两类。分别是：客户端会话管理技术和服务端会话管理技术。

**客户端会话管理技术**

> ​	它是把要共享的数据保存到了客户端（也就是浏览器端）。每次请求时，把会话信息带到服务器，从而实现多次请求的数据共享。

**服务端会话管理技术**

> ​	它本质仍是采用客户端会话管理技术，只不过保存到客户端的是一个特殊的标识，并且把要共享的数据保存到了服务端的内存对象中。每次请求时，把这个标识带到服务器端，然后使用这个标识，找到对应的内存空间，从而实现数据共享。

## 1.2 客户端会话管理技术

### 1.2.1 Cookie概述

1）什么是Cookie

它是客户端浏览器的缓存文件，里面记录了客户浏览器访问网站的一些内容。同时，也是HTTP协议请求和响应消息头的一部分（在HTTP协议课程中，我们备注了它很重要）。

2）Cookie的API详解

**作用**

它可以保存客户浏览器访问网站的相关内容（需要客户端不禁用Cookie）。从而在每次访问需要同一个内容时，先从本地缓存获取，使资源共享，提高效率。

**Cookie的属性**

| 属性名称    | 属性作用            | 是否重要 |
| ------- | --------------- | ---- |
| name    | cookie的名称       | 必要属性 |
| value   | cookie的值（不能是中文） | 必要属性 |
| path    | cookie的路径       | 重要   |
| domain  | cookie的域名       | 重要   |
| maxAge  | cookie的生存时间。    | 重要   |
| version | cookie的版本号。     | 不重要  |
| comment | cookie的说明。      | 不重要  |

3）Cookie涉及的常用方法

**创建Cookie**

通过指定的名称和值构造一个Cookie

- Cookie的名称必须遵循RFC 2109规范。这就意味着，它只能包含ASCII字母数字字符，

- 不能包含逗号、分号或空格或以$字符开头。

- 创建后无法更改cookie的名称。

- 该值可以是服务器选择发送的任何内容。

- 它的价值可能只有服务器才感兴趣。

- 创建之后，可以使用setValue方法更改cookie的值Cookie(String name, String value)

**向浏览器添加Cookie**

	添加Cookie到响应中。此方法可以多次调用，用以添加多个Cookie。
	
		void  addCookie(Cookie cookie);

**从服务器端获取Cookie**

 Cookie[]   getCookies();

这是HttpServletRequest中的方法。

- 它返回一个Cookie的数组，包含客户端随此请求发送的所有Cookie对象。

- 如果没有符合规则的cookie，则此方法返回null。



### 2 Cookie快速入门

1）需求说明

通过cookie记录最后访问时间，并在浏览器上显示出来

2）案例目的

掌握cookie的基本使用，从创建到添加客户端，再从服务器获取

3）案例步骤

1、通过响应对象写出一个提示信息

2、创建cookie对象，指定name和value。

3、设置最大存活时间

4、通过响应对象，将cookie对象添加到客户端

5、通过请求对象获取cookie

6、写出cookie对象中的访问时间

4）代码示例

```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.通过响应对象写出提示信息
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter pw = resp.getWriter();
        pw.write("欢迎访问本网站，您的最后访问时间为：<br>");
​
    //2.创建Cookie对象，用于记录最后访问时间
    Cookie cookie = new Cookie("time",System.currentTimeMillis()+"");
​
    //3.设置最大存活时间
    //cookie.setMaxAge(3600);
    cookie.setMaxAge(0);    // 立即清除
​
    //4.将cookie对象添加到客户端
    resp.addCookie(cookie);
​
    //5.获取cookie
    Cookie[] arr = req.getCookies();
    for(Cookie c : arr) {
        if("time".equals(c.getName())) {
            //6.获取cookie对象中的value，进行写出
            String value = c.getValue();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            pw.write(sdf.format(new Date(Long.parseLong(value))));
        }
    }
```

**细节**

**数量限制：**

Cookie有大小，个数限制。每个网站最多只能存20个cookie，且大小不能超过4kb。同时，所有网站的cookie总数不超过300个。

**存活时间限制setMaxAge()方法接收数字：**

负整数：当前会话有效，浏览器关闭则清除

0：立即清除

正整数：以秒为单位设置存活时间

### cookie路径限制：

第一个类

```text
/*
    Cookie的路径限制
    取自第一次访问的资源路径前缀
    只要以这个前缀为开头(包括子级路径)。都能获取到
    反之获取不到
 */
@WebServlet("/servlet/servletDemo02")
public class ServletDemo02 extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //创建Cookie并添加
        Cookie cookie = new Cookie("username","zhangsan");
        cookie.setMaxAge(3600);
        resp.addCookie(cookie);
    }
```

第二个类

```text
/*
    Cookie的路径限制
 */
@WebServlet("/servlet/servletDemo03")
public class ServletDemo03 extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取Cookie
        Cookie[] arr = req.getCookies();
        for(Cookie c : arr) {
            if("username".equals(c.getName())) {
                String value = c.getValue();
                resp.getWriter().write(value);
            }
        }
    }
```

第三个类：

```text
/*
    Cookie的路径限制
 */
@WebServlet("/servlet/aaa/servletDemo04")
public class ServletDemo04 extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取Cookie
        Cookie[] arr = req.getCookies();
        for(Cookie c : arr) {
            if("username".equals(c.getName())) {
                String value = c.getValue();
                resp.getWriter().write(value);
            }
        }
    }
```

第四个类：

```text
/*
    Cookie的路径限制
 */
@WebServlet("/bbb/servletDemo05")
public class ServletDemo05 extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取Cookie
        Cookie[] arr = req.getCookies();
        for(Cookie c : arr) {
            if("username".equals(c.getName())) {
                String value = c.getValue();
                resp.getWriter().write(value);
            }
        }
    }
```



## 1.3 服务端会话管理概述

### 1.3.1 HttpSession概述

1）HttpSession对象介绍

它是Servlet规范中提供的一个接口。该接口的实现由Servlet规范的实现提供商提供。我们使用的是Tomcat服务器，它对Servlet规范进行了实现，所以HttpSession接口的实现由Tomcat提供。该对象用于提供一种通过多个页面请求或访问网站来标识用户并存储有关该用户的信息的方法。简单说它就是一个服务端会话对象，用于存储用户的会话数据。

同时，它也是Servlet规范中四大域对象之一的会话域对象。并且它也是用于实现数据共享的。但它与我们之前讲解的应用域和请求域是有区别的。

总结：

- HttpSession：服务器端会话管理技术

- 本质也是采用客户端会话管理技术，只不过客户端保存的是一个唯一标识符，而共享的数据保存到了服务端的内存对象中。

- 每次请求时，会将特殊的标识带到服务器端，根据这个标识来找到对应的内存空间，从而实现数据共享

作用：

| 域对象            | 作用范围   | 使用场景                            |
| -------------- | ------ | ------------------------------- |
| ServletContext | 整个应用范围 | 当前项目中需要数据共享时，可以使用此域对象。          |
| ServletRequest | 当前请求范围 | 在请求或者当前请求转发时需要数据共享可以使用此域对象。     |
| HttpSession    | 会话返回   | 在当前会话范围中实现数据共享。它可以在多次请求中实现数据共享。 |

2）HttpSession的获取

获取HttpSession是通过HttpServletRequest接口中的两个方法获取的，如下图所示：

![](https://tcs-devops.aliyuncs.com/storage/112vec89568d344e881fcfbb6eff9b82ed45?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzgxMiwiaWF0IjoxNjg4MDM5MDEyLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlYzg5NTY4ZDM0NGU4ODFmY2ZiYjZlZmY5YjgyZWQ0NSJ9.xWPBdP6JTohMC59rJ1qE_O9U7mLlFcJlhYtBkOLRqcE&download=%E5%9B%BE%E7%89%87.png "")

这两个方法的区别：

![](https://tcs-devops.aliyuncs.com/storage/112v2ba5433dbe083e18218b4af5952f54a5?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzgxMiwiaWF0IjoxNjg4MDM5MDEyLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYyYmE1NDMzZGJlMDgzZTE4MjE4YjRhZjU5NTJmNTRhNSJ9.rHh6N_CRdhJcqJUc4PdPqBGbnXG-S2gqYsn_gqBruJs&download=%E5%9B%BE%E7%89%87.png "")

3）HttpSession获取方法

| 返回值         | 方法名                        | 说明                     |
| ----------- | -------------------------- | ---------------------- |
| HttpSession | getSession()               | 获取HttpSession          |
| HttpSession | getSession（boolean create） | 获取HttpSession 获取到就自动创建 |



4）HttpSession的常用方法

| 返回值    | 方法名                                     | 说明           |
| ------ | --------------------------------------- | ------------ |
| void   | setAttribute(String var1, Object var2); | 设置共享数据       |
| Object | getAttribute(String var1）               | 获取共享数据       |
| void   | removeAttribute(String var1）            | 移除共享数据       |
| String | getid（）                                 | 获取唯一标识       |
| void   | invalidate();                           | 让session立即失效 |



### 1.3.2 HttpSession的入门案例

1）需求说明

通过第一个Servlet设置共享数据用户名，并在第二个Servlet获取到

2）案例目的

通过本案例的讲解，同学们可以清楚的认识到会话域的作用，即多次请求间的数据共享。因为是两次请求，请求域肯定不一样了，所以不能用请求域实现。

最终掌握HttpSession对象的获取和使用。

3）实现步骤

1.获取请求的用户名

2.获取HttpSession的对象

3.将用户名信息添加到共享数据中

4.在第二个Servlet中获取HttpSession对象

5.获取共享数据用户名

6.将获取的用户名响应给客户端浏览器

```text
@WebServlet("/servletDemo01")
public class ServletDemo01 extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.获取请求的用户名
        String username = req.getParameter("username");
​
   //2.获取HttpSession的对象
    HttpSession session = req.getSession();
    System.out.println(session);
    System.out.println(session.getId());
​
    //3.将用户名信息添加到共享数据中
    session.setAttribute("username",username);
​
}
```

```text
@WebServlet("/servletDemo02")
public class ServletDemo02 extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.获取HttpSession对象
        HttpSession session = req.getSession();
        System.out.println(session);
        System.out.println(session.getId());
​
    //2.获取共享数据
    Object username = session.getAttribute("username");
​
    //3.将数据响应给浏览器
    resp.getWriter().write(username+"");
}
```



3）原理分析

HttpSession，它虽然是服务端会话管理技术的对象，但它本质仍是一个Cookie。是一个由服务器自动创建的特殊的Cookie，Cookie的名称就是JSESSIONID，Cookie的值是服务器分配的一个唯一的标识。

当我们使用HttpSession时，浏览器在没有禁用Cookie的情况下，都会把这个Cookie带到服务器端，然后根据唯一标识去查找对应的HttpSession对象，找到了，我们就可以直接使用了。

Cookie禁用演示：

```java
/*
    Cookie的禁用
 */
@WebServlet("/servletDemo03")
public class ServletDemo03 extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.获取HttpSession对象
        HttpSession session = req.getSession(false);
        System.out.println(session);
        if(session == null) {
            resp.setContentType("text/html;charset=UTF-8");
            resp.getWriter().write("为了不影响正常的使用，请不要禁用浏览器的Cookie~");
        }
    }
```

**解决方案：**

	**说明：**

HttpSession，它虽然是服务端会话管理技术的对象，但它本质仍是一个Cookie。是一个由服务器自动创建的特殊的Cookie，Cookie的名称就是JSESSIONID，Cookie的值是服务器分配的一个唯一的标识。

当我们使用HttpSession时，浏览器在没有禁用Cookie的情况下，都会把这个Cookie带到服务器端，然后根据唯一标识去查找对应的HttpSession对象，找到了，我们就可以直接使用了。下图就是我们入门案例中，HttpSession分配的唯一标识，同学们可以看到两次请求的JSESSIONID的值是一样的：

**session01里面添加一段话**

```text
  @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        1.获取请求的用户名
        String username = req.getParameter("username");
//        2.获取HttpSession的对象
        HttpSession session=req.getSession();
        System.out.println(session);
//        3.将用户名信息添加到共享数据中
       session.setAttribute("username",username);
       resp.getWriter().write("<a href='"+resp.encodeURL("http://localhost:8080/lomodal/session03")+"'>go to session03<a/>");
​
    }
```







