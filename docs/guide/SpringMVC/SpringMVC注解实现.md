### 注解描述

| 注解                 | 描述                                                                                                                                                                                                                                                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @Controller        | 用于标记在一个类上，使用它标记的类就是一个SpringMVC Controller 对象，分发处理器将会扫描使用了该注解的类的方法，并检测该方法是否使用了@RequestMapping 注解。@Controller 只是定义了一个控制器类，而使用@RequestMapping 注解的方法才是真正处理请求的处理器。单单使用@Controller 标记在一个类上还不能真正意义上的说它就是SpringMVC 的一个控制器类，因为这个时候Spring 还不认识它。                                                                                                                      |
| @RequestMapping    | 是一个用来处理请求地址映射的注解，可用于类或方法上。用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径。RequestMapping注解有六个属性：value： 指定请求的实际地址method： 指定请求的method类型， GET、POST、PUT、DELETE等；consumes：指定处理请求的提交内容类型（Content-Type），例如application/json, text/html;produces: 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回；params：  指定request中必须包含某些参数值是，才让该方法处理。headers： 指定request中必须包含某些指定的header值，才能让该方法处理请求。 |
| @PostMapping       | Spring MVC新特性提供了对Restful风格的支持。从命名约定我们可以看到每个注释都是为了处理各自的传入请求方法类型，即@GetMapping用于处理请求方法的GET类型，@ PostMapping用于处理请求方法的POST类型等。如果我们想使用传统的@RequestMapping注释实现URL处理程序，那么它应该是这样的：@RequestMapping(value = "/get/{id}", method = RequestMethod.GET)新方法可以简化为：@GetMapping("/get/{id}")                                                                                    |
| @GetMapping        |                                                                                                                                                                                                                                                                                                                                                             |
| @PutMapping        |                                                                                                                                                                                                                                                                                                                                                             |
| @DeleteMapping     |                                                                                                                                                                                                                                                                                                                                                             |
| @PatchMapping      |                                                                                                                                                                                                                                                                                                                                                             |
| @Resource          | 做bean的注入时使用，可以写在字段和setter方法上,其实@Resource并不是Spring的注解，它的包是javax.annotation.Resource，需要导入，但是Spring支持该注解的注入。默认按照ByName自动注入。@Resource有两个重要的属性：name和type，而Spring将@Resource注解的name属性解析为bean的名字，而type属性则解析为bean的类型。所以，如果使用name属性，则使用byName的自动注入策略，而使用type属性时则使用byType自动注入策略。如果既不制定name也不制定type属性，这时将通过反射机制使用byName自动注入策略。                                          |
| @Autowired         | 做bean的注入时使用，可以写在字段和setter方法上,为Spring提供的注解，需要导入包org.springframework.beans.factory.annotation.Autowired;它是按照类型（byType）装配依赖对象，默认情况下它要求依赖对象必须存在，如果允许null值，可以设置它的required属性为false。如果我们想使用按照名称（byName）来装配，可以结合@Qualifier注解一起使用。                                                                                                                                   |
| @PathVariable      | 用于将请求URL中的模板变量映射到功能处理方法的参数上，即取出uri模板中的变量作为参数。@RequestMapping(value="/users/{userId}/topics/{topicId}")public String test(   @PathVariable(value="userId") int userId,        @PathVariable(value="topicId") int topicId)  如请求的URL为“控制器URL/users/123/topics/456”，则自动将URL中模板变量{userId}和{topicId}绑定到通过@PathVariable注解的同名参数上，即入参后userId=123、topicId=456。        |
| @RequestParam      | @requestParam主要用于在SpringMVC后台控制层获取参数，类似一种是request.getParameter("name")，它有三个常用参数：defaultValue = "0", required = false, value = "isApp"；defaultValue 表示设置默认值，required 铜过boolean设置是否是必须要传入的参数，value 值表示接受的传入的参数类型。                                                                                                                                             |
| @ResponseBody      | 表示该方法的返回结果直接写入 HTTP response body 中，一般在异步获取数据时使用【也就是AJAX】。比如异步获取 json 数据，加上 @ResponseBody 后，会直接返回 json 数据。                                                                                                                                                                                                                                                  |
| @RequestBody       | 是作用在形参列表上，用于将前台发送过来固定格式的数据【xml 格式或者 json等】封装为对应的 JavaBean 对象，封装时使用到的一个对象是系统默认配置的 HttpMessageConverter进行解析，然后封装到形参上。                                                                                                                                                                                                                                         |
| @RestController    | 作用等同于@Controller + @ResponseBody                                                                                                                                                                                                                                                                                                                            |
| @ModelAttribute    | 注解用于将方法的参数或方法的返回值作为Model的属性加入到Model中，然后Spring框架自会将这个Model传递给ViewResolver。Model的生命周期只有一个http请求的处理过程，请求处理完后，Model就销毁了。                                                                                                                                                                                                                                        |
| @SessionAttributes | 注解只用作用在 类 上，作用是将指定的 Model 的键值对保存在 session 中。可以让其他请求共用 session 中的键值对。SessionAttribute有两个参数：　　String[] value：要保存到session中的参数名称　　Class[] typtes：要保存的参数的类型，和value中顺序要对应上所以可以这样写：@SessionAttributes(types = {User.class,Dept.class},value={“attr1”,”attr2”})                                                                                                     |
| @ControllerAdvice  | @ControllerAdvice，是Spring3.2提供的新注解,它是一个Controller增强器,可对controller中被 @RequestMapping注解的方法加一些逻辑处理。最常用的就是异常处理,需要配合@ExceptionHandler使用。                                                                                                                                                                                                                         |
| @Exceptionhandler  | 可以用来处理方法抛出的异常                                                                                                                                                                                                                                                                                                                                               |

1.实战案例

**Url传参数**

```text
@GetMapping("/save")
public void save(@RequestParam String name,@RequestParam int age){
    System.out.println("name==="+name);
    System.out.println("age==="+age);
}
​
@GetMapping("/save/{name}/{age}")
public void save(@PathVariable(value = "name") String name,@PathVariable("age") int age){
    //中文必需转换
    name = new String(name.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
    System.out.println("name==="+name);
    System.out.println("age==="+age);
}
​
  @GetMapping("/girl") //简写模式，发回视图名称
    public String test(){
        return "girl";  
    }
```

2.获取表单参数

从Form表单或URL参数中获取

```text
//index.jsp
   
<form action="login" method="post">
        UserName:
        <input type="text" name="userName" />
        <br/><br/>
        PassWord:
        <input type="password" name="passWord"/>
        <br/><br/>
        <button type="submit">Login</button>
    </form>
            
@RequestMapping(value = "/login",method = RequestMethod.POST)
public String userGetUserInfo(String userName,String passWord){
        //两个属性值必须与表单里的属性值一模一样
        System.out.println("用户名："+userName);
        System.out.println("密码："+passWord);
        return "success";
 }
​
@GetMapping("/index")
public String index(){
    
    return "index";
}
```

💡 **说明：注意这时候这个User类一定要有无参数的构造函数。**



### 3.1.1 中文乱码处理 

  SpringMVC提供专用的中文字符过滤器，用于处理乱码问题  

  配置在 **web.xml** 里面

```text
<!--乱码处理过滤器，与Servlet中使用的完全相同，差异之处在于处理器的类由Spring提供-->
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

**解决方案二：**在spring-mvc.xml中使用注解扫描的方式解决

```text
 <mvc:annotation-driven>
        <!-- 消息转换器 -->
        <mvc:message-converters register-defaults="true">
            <bean class="org.springframework.http.converter.StringHttpMessageConverter">
                <property name="supportedMediaTypes" value="text/html;charset=UTF-8"/>
            </bean>
        </mvc:message-converters>
    </mvc:annotation-driven>
```

**解决方案三：**使用全局配置方式

**在WebMvcConfig中添加**

```text
 @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        WebMvcConfigurer.super.extendMessageConverters(converters);
        for (HttpMessageConverter<?> converter : converters) {
            // 解决 Controller 返回普通文本中文乱码问题
            if (converter instanceof StringHttpMessageConverter) {
                ((StringHttpMessageConverter) converter).setDefaultCharset(StandardCharsets.UTF_8);
            }
​
            // 解决 Controller 返回json对象中文乱码问题
            if (converter instanceof MappingJackson2HttpMessageConverter) {
                ((MappingJackson2HttpMessageConverter) converter).setDefaultCharset(StandardCharsets.UTF_8);
            }
        }
    }
​
```

## 一、注解应用

全局演示：

```text
@RestController
@RequestMapping("/api/")
public class TeacherController {
    @GetMapping("teacher")
    public String get(){
        System.out.println("执行get请求");
        return "苍老师";
    }
    @PostMapping("teacher")
    public Integer post(){
        System.out.println("执行post请求");
        return 1;
    }
    @PutMapping("teacher")
    public Integer put(){
        System.out.println("执行put请求");
        return 1;
    }
    @DeleteMapping("teacher")
    public Integer delete(){
        System.out.println("执行delete请求");
        return 1;
    }
}
```

上面都是使用后缀为 teacher访问，那么我们可以简写

```text
//把方法上面的("teacher") 去掉直接放到类上面
@RestController
@RequestMapping("/api/teacher")
public class TeacherController {}
```

可以使用一个插件来演示，也可以是用postman来演示：

![](https://tcs-devops.aliyuncs.com/storage/112v956ae959bb7b1f1586dc069b27e3ee9b?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5NTZhZTk1OWJiN2IxZjE1ODZkYzA2OWIyN2UzZWU5YiJ9.Jwr2UUuP_tWk-nZjyJ8YdPkX8SlLHe8u6Rx1ggZXvUw&download=image.png "")

**GetMapping：另一种写法**

```text
@Controller
@RequestMapping("/api")
public class BodyController {
/**
     *之前返回的是ModelAndView spring提供了简易的方式Model参数接收
     */
    @RequestMapping(method = RequestMethod.GET,value = "/usert")
    public String userT(Model model) {
        model.addAttribute("name", "李四");
        model.addAttribute("age", 18);
        return "user";//使用视图文件
    }
```

**getMapping结合@ResponseBody 案例：**

```text
    /*
    @ResponseBody 应用方式
    * */
​
    @GetMapping("/boy")
    //加上此注解，说明此方法直接输出String字符串，不再使用视图渲染,也可以在类上直接注解  @RestController也是可以的
    @ResponseBody
    public String boy() {
        return "hello c2 中文";
    }
​
    @GetMapping("/strings")
    @ResponseBody
    public String[] strings() {
        return new String[]{"java", "javascript", "springboot", "中文编程"};
    }
    @GetMapping("/books")
    @ResponseBody
    public List<Book> books() {
        List<Book> list = new ArrayList<>();
​
        list.add(new Book(1, "java11",180,new Date()));
        list.add(new Book(2, "java 基础开发",280,new Date()));
        list.add(new Book(3, "java22",380,new Date()));
        list.add(new Book(4, "java33",480,new Date()));
        return list;
    }
```

**PostMapping：**

创建注册页面：**register.jsp**

```text
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
    <body>
        <form action="/api/regok2" method="post">
            UserName:
            <input type="text" name="username" />
            <br/><br/>
            PassWord:
            <input type="password" name="passWord"/>
            <br/><br/>
            <button type="submit">Login</button>
        </form>
    </body>
</html>
```

编写controller类

```text
@GetMapping("/register")
    public String login(){
        return "register";
    }
​
    @PostMapping("/regok")
    public String regok(String username){
        //重定向
        System.out.println("数据保存");
        System.out.println(username);
​
        return "redirect:http://www.baidu.com";
        //return "redirect:/";//重定向当前网站的首页
        //return "forward:/WEB-INF/page.jsp"; 转发地址栏不变量，显示的结果变了
    }
    @PostMapping("/regok2")
    public ModelAndView regok2(String username){
        ModelAndView mv = new ModelAndView("success");
        mv.addObject("name", username);
        System.out.println("数据保存");
        System.out.println(username);
​
        return mv;
    }
```

DeleteMapping：

```text
 @RequestMapping(value = "/mds/{id}", method = RequestMethod.DELETE)
    public String mds(@PathVariable("id") int id, HttpServletRequest req) {
        String msg = String.format("method:%s,deleteById：%d", req.getMethod(), id);
        return msg;
    }
```

**测试：**

先运行项目，然后配置下面

![](https://tcs-devops.aliyuncs.com/storage/112v6a8dca958c93a7c017dca51acee7e756?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY2YThkY2E5NThjOTNhN2MwMTdkY2E1MWFjZWU3ZTc1NiJ9.5thSzHgxklceg_PpxCSgl104Ii5CQn6IBHIKqJS3ooc&download=image.png "")

配置路径，点击按钮执行：

![](https://tcs-devops.aliyuncs.com/storage/112v12c18cbd0a3574a1f15f57e14820c807?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYxMmMxOGNiZDBhMzU3NGExZjE1ZjU3ZTE0ODIwYzgwNyJ9.i5_C6Fx8wnWwojPfo0DN_SaoU1Blo9Cpl87Ll8fu0MU&download=image.png "")

**结果展示：**

![](https://tcs-devops.aliyuncs.com/storage/112v9b4fb007134b14e75296d712f233a9d0?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5YjRmYjAwNzEzNGIxNGU3NTI5NmQ3MTJmMjMzYTlkMCJ9.eWsv_uIIoQpbLczjRbNUyfFW10YK9WTbPWfCLS7H-9I&download=image.png "")

**案例2：**

```text
 @DeleteMapping("/del1")
    @ResponseBody
    public String del1(int id,HttpServletRequest req){
        System.out.println(id);
        System.out.println(req.getMethod());
        return ""+id+"="+req.getMethod();
    }
```

配置：

```text
DELETE http://localhost:8080/api/del1?id=99
```

**PutMapping：**

```text
 @RequestMapping(value = "/puts", method = RequestMethod.PUT)
    public String puts( String name, HttpServletRequest req) {
        System.out.println("name="+name);
        System.out.println(req.getMethod());
        String s = "name的值=" + name + "；获取到的请求方式：" + req.getMethod();
        System.out.println(s);
        return "forward:/api/puts2";
    }
  
    @PutMapping("/puts2")
    @ResponseBody
    public String puts2(String name, HttpServletRequest req) {
        String msg = String.format("method:%s,hello:%s", req.getMethod(), name);
        System.out.println(msg);
        return msg;
    }
```

**测试请求地址：**

![](https://tcs-devops.aliyuncs.com/storage/112v867e7e3dc3d690b04c7f4e14af06aca7?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY4NjdlN2UzZGMzZDY5MGIwNGM3ZjRlMTRhZjA2YWNhNyJ9.yVxDE_SKuZFBUlQvyrKYMIArqEcINebHLsZ_Lvltsn8&download=image.png "")

**@ModelAttribute：注解用于将方法的参数或方法的返回值作为Model的属性加入到Model中，然后Spring框架自会将这个Model传递给ViewResolver**

```text
    @ModelAttribute
    public void populateModel(@RequestParam String name, Model model) {
        model.addAttribute("name", name);
    }
​
    //自动调用 model.addAttribute("user",u)
    @ModelAttribute("user")
    public User user(){
        User u = new User(12,"小保安",20);
        return u;
    }
​
    @ModelAttribute
    public void abc(Model model) {
        model.addAttribute("age", 28);
        model.addAttribute("uname", "黄老师");
        model.addAttribute("adlist", 28);
        model.addAttribute("age", 29);
    }
​
    @RequestMapping(value = {"/helloWorld","/hello"})
    public String helloWorld() {
        return "hello";
    }
​
    @GetMapping("/ok")
    public String ok(){
        return "hello";
    }
```

访问地址：[http://localhost:8080/hello?name=](http://localhost:8080/hello?name=)老六

[http://localhost:8080/ok?name=](http://localhost:8080/ok?name=)老六

测试图示：

![](https://tcs-devops.aliyuncs.com/storage/112v416bca7875de92d7817d7e98d8a27a16?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY0MTZiY2E3ODc1ZGU5MmQ3ODE3ZDdlOThkOGEyN2ExNiJ9.fnQcVLj2WmlsKCnK1ImAL5FrywTkTwti5RZHL46HbZs&download=image.png "")







