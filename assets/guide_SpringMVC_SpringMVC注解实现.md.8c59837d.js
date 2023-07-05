import{_ as s,o as n,c as a,O as t}from"./chunks/framework.571309da.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/SpringMVC/SpringMVC注解实现.md","filePath":"guide/SpringMVC/SpringMVC注解实现.md","lastUpdated":1688557990000}'),e={name:"guide/SpringMVC/SpringMVC注解实现.md"},l=t(`<h3 id="注解描述" tabindex="-1">注解描述 <a class="header-anchor" href="#注解描述" aria-label="Permalink to &quot;注解描述&quot;">​</a></h3><table><thead><tr><th>注解</th><th>描述</th></tr></thead><tbody><tr><td>@Controller</td><td>用于标记在一个类上，使用它标记的类就是一个SpringMVC Controller 对象，分发处理器将会扫描使用了该注解的类的方法，并检测该方法是否使用了@RequestMapping 注解。@Controller 只是定义了一个控制器类，而使用@RequestMapping 注解的方法才是真正处理请求的处理器。单单使用@Controller 标记在一个类上还不能真正意义上的说它就是SpringMVC 的一个控制器类，因为这个时候Spring 还不认识它。</td></tr><tr><td>@RequestMapping</td><td>是一个用来处理请求地址映射的注解，可用于类或方法上。用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径。RequestMapping注解有六个属性：value： 指定请求的实际地址method： 指定请求的method类型， GET、POST、PUT、DELETE等；consumes：指定处理请求的提交内容类型（Content-Type），例如application/json, text/html;produces: 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回；params： 指定request中必须包含某些参数值是，才让该方法处理。headers： 指定request中必须包含某些指定的header值，才能让该方法处理请求。</td></tr><tr><td>@PostMapping</td><td>Spring MVC新特性提供了对Restful风格的支持。从命名约定我们可以看到每个注释都是为了处理各自的传入请求方法类型，即@GetMapping用于处理请求方法的GET类型，@ PostMapping用于处理请求方法的POST类型等。如果我们想使用传统的@RequestMapping注释实现URL处理程序，那么它应该是这样的：@RequestMapping(value = &quot;/get/{id}&quot;, method = RequestMethod.GET)新方法可以简化为：@GetMapping(&quot;/get/{id}&quot;)</td></tr><tr><td>@GetMapping</td><td></td></tr><tr><td>@PutMapping</td><td></td></tr><tr><td>@DeleteMapping</td><td></td></tr><tr><td>@PatchMapping</td><td></td></tr><tr><td>@Resource</td><td>做bean的注入时使用，可以写在字段和setter方法上,其实@Resource并不是Spring的注解，它的包是javax.annotation.Resource，需要导入，但是Spring支持该注解的注入。默认按照ByName自动注入。@Resource有两个重要的属性：name和type，而Spring将@Resource注解的name属性解析为bean的名字，而type属性则解析为bean的类型。所以，如果使用name属性，则使用byName的自动注入策略，而使用type属性时则使用byType自动注入策略。如果既不制定name也不制定type属性，这时将通过反射机制使用byName自动注入策略。</td></tr><tr><td>@Autowired</td><td>做bean的注入时使用，可以写在字段和setter方法上,为Spring提供的注解，需要导入包org.springframework.beans.factory.annotation.Autowired;它是按照类型（byType）装配依赖对象，默认情况下它要求依赖对象必须存在，如果允许null值，可以设置它的required属性为false。如果我们想使用按照名称（byName）来装配，可以结合@Qualifier注解一起使用。</td></tr><tr><td>@PathVariable</td><td>用于将请求URL中的模板变量映射到功能处理方法的参数上，即取出uri模板中的变量作为参数。@RequestMapping(value=&quot;/users/{userId}/topics/{topicId}&quot;)public String test( @PathVariable(value=&quot;userId&quot;) int userId, @PathVariable(value=&quot;topicId&quot;) int topicId) 如请求的URL为“控制器URL/users/123/topics/456”，则自动将URL中模板变量{userId}和{topicId}绑定到通过@PathVariable注解的同名参数上，即入参后userId=123、topicId=456。</td></tr><tr><td>@RequestParam</td><td>@requestParam主要用于在SpringMVC后台控制层获取参数，类似一种是request.getParameter(&quot;name&quot;)，它有三个常用参数：defaultValue = &quot;0&quot;, required = false, value = &quot;isApp&quot;；defaultValue 表示设置默认值，required 铜过boolean设置是否是必须要传入的参数，value 值表示接受的传入的参数类型。</td></tr><tr><td>@ResponseBody</td><td>表示该方法的返回结果直接写入 HTTP response body 中，一般在异步获取数据时使用【也就是AJAX】。比如异步获取 json 数据，加上 @ResponseBody 后，会直接返回 json 数据。</td></tr><tr><td>@RequestBody</td><td>是作用在形参列表上，用于将前台发送过来固定格式的数据【xml 格式或者 json等】封装为对应的 JavaBean 对象，封装时使用到的一个对象是系统默认配置的 HttpMessageConverter进行解析，然后封装到形参上。</td></tr><tr><td>@RestController</td><td>作用等同于@Controller + @ResponseBody</td></tr><tr><td>@ModelAttribute</td><td>注解用于将方法的参数或方法的返回值作为Model的属性加入到Model中，然后Spring框架自会将这个Model传递给ViewResolver。Model的生命周期只有一个http请求的处理过程，请求处理完后，Model就销毁了。</td></tr><tr><td>@SessionAttributes</td><td>注解只用作用在 类 上，作用是将指定的 Model 的键值对保存在 session 中。可以让其他请求共用 session 中的键值对。SessionAttribute有两个参数：　　String[] value：要保存到session中的参数名称　　Class[] typtes：要保存的参数的类型，和value中顺序要对应上所以可以这样写：@SessionAttributes(types = {User.class,Dept.class},value={“attr1”,”attr2”})</td></tr><tr><td>@ControllerAdvice</td><td>@ControllerAdvice，是Spring3.2提供的新注解,它是一个Controller增强器,可对controller中被 @RequestMapping注解的方法加一些逻辑处理。最常用的就是异常处理,需要配合@ExceptionHandler使用。</td></tr><tr><td>@Exceptionhandler</td><td>可以用来处理方法抛出的异常</td></tr></tbody></table><p>1.实战案例</p><p><strong>Url传参数</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@GetMapping(&quot;/save&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public void save(@RequestParam String name,@RequestParam int age){</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;name===&quot;+name);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;age===&quot;+age);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@GetMapping(&quot;/save/{name}/{age}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public void save(@PathVariable(value = &quot;name&quot;) String name,@PathVariable(&quot;age&quot;) int age){</span></span>
<span class="line"><span style="color:#A6ACCD;">    //中文必需转换</span></span>
<span class="line"><span style="color:#A6ACCD;">    name = new String(name.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;name===&quot;+name);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;age===&quot;+age);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">  @GetMapping(&quot;/girl&quot;) //简写模式，发回视图名称</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String test(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;girl&quot;;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>2.获取表单参数</p><p>从Form表单或URL参数中获取</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//index.jsp</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;form action=&quot;login&quot; method=&quot;post&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        UserName:</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;input type=&quot;text&quot; name=&quot;userName&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;br/&gt;&lt;br/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        PassWord:</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;input type=&quot;password&quot; name=&quot;passWord&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;br/&gt;&lt;br/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;button type=&quot;submit&quot;&gt;Login&lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/form&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span></span>
<span class="line"><span style="color:#A6ACCD;">@RequestMapping(value = &quot;/login&quot;,method = RequestMethod.POST)</span></span>
<span class="line"><span style="color:#A6ACCD;">public String userGetUserInfo(String userName,String passWord){</span></span>
<span class="line"><span style="color:#A6ACCD;">        //两个属性值必须与表单里的属性值一模一样</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;用户名：&quot;+userName);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;密码：&quot;+passWord);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;success&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@GetMapping(&quot;/index&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public String index(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    return &quot;index&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>💡 <strong>说明：注意这时候这个User类一定要有无参数的构造函数。</strong></p><h3 id="_3-1-1-中文乱码处理" tabindex="-1">3.1.1 中文乱码处理 <a class="header-anchor" href="#_3-1-1-中文乱码处理" aria-label="Permalink to &quot;3.1.1 中文乱码处理&quot;">​</a></h3><p>SpringMVC提供专用的中文字符过滤器，用于处理乱码问题</p><p>配置在 <strong>web.xml</strong> 里面</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--乱码处理过滤器，与Servlet中使用的完全相同，差异之处在于处理器的类由Spring提供--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;filter&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;filter-name&gt;CharacterEncodingFilter&lt;/filter-name&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;filter-class&gt;org.springframework.web.filter.CharacterEncodingFilter&lt;/filter-class&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;init-param&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;param-name&gt;encoding&lt;/param-name&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;param-value&gt;UTF-8&lt;/param-value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/init-param&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/filter&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;filter-mapping&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;filter-name&gt;CharacterEncodingFilter&lt;/filter-name&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;url-pattern&gt;/*&lt;/url-pattern&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/filter-mapping&gt;</span></span></code></pre></div><p>**解决方案二：**在spring-mvc.xml中使用注解扫描的方式解决</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;mvc:annotation-driven&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;!-- 消息转换器 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;mvc:message-converters register-defaults=&quot;true&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;bean class=&quot;org.springframework.http.converter.StringHttpMessageConverter&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                &lt;property name=&quot;supportedMediaTypes&quot; value=&quot;text/html;charset=UTF-8&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;/bean&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/mvc:message-converters&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/mvc:annotation-driven&gt;</span></span></code></pre></div><p>**解决方案三：**使用全局配置方式</p><p><strong>在WebMvcConfig中添加</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void extendMessageConverters(List&lt;HttpMessageConverter&lt;?&gt;&gt; converters) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        WebMvcConfigurer.super.extendMessageConverters(converters);</span></span>
<span class="line"><span style="color:#A6ACCD;">        for (HttpMessageConverter&lt;?&gt; converter : converters) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            // 解决 Controller 返回普通文本中文乱码问题</span></span>
<span class="line"><span style="color:#A6ACCD;">            if (converter instanceof StringHttpMessageConverter) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                ((StringHttpMessageConverter) converter).setDefaultCharset(StandardCharsets.UTF_8);</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">            // 解决 Controller 返回json对象中文乱码问题</span></span>
<span class="line"><span style="color:#A6ACCD;">            if (converter instanceof MappingJackson2HttpMessageConverter) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                ((MappingJackson2HttpMessageConverter) converter).setDefaultCharset(StandardCharsets.UTF_8);</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><h2 id="一、注解应用" tabindex="-1">一、注解应用 <a class="header-anchor" href="#一、注解应用" aria-label="Permalink to &quot;一、注解应用&quot;">​</a></h2><p>全局演示：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RestController</span></span>
<span class="line"><span style="color:#A6ACCD;">@RequestMapping(&quot;/api/&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class TeacherController {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @GetMapping(&quot;teacher&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String get(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;执行get请求&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;苍老师&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @PostMapping(&quot;teacher&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Integer post(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;执行post请求&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @PutMapping(&quot;teacher&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Integer put(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;执行put请求&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @DeleteMapping(&quot;teacher&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Integer delete(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;执行delete请求&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>上面都是使用后缀为 teacher访问，那么我们可以简写</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//把方法上面的(&quot;teacher&quot;) 去掉直接放到类上面</span></span>
<span class="line"><span style="color:#A6ACCD;">@RestController</span></span>
<span class="line"><span style="color:#A6ACCD;">@RequestMapping(&quot;/api/teacher&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class TeacherController {}</span></span></code></pre></div><p>可以使用一个插件来演示，也可以是用postman来演示：</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v956ae959bb7b1f1586dc069b27e3ee9b?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5NTZhZTk1OWJiN2IxZjE1ODZkYzA2OWIyN2UzZWU5YiJ9.Jwr2UUuP_tWk-nZjyJ8YdPkX8SlLHe8u6Rx1ggZXvUw&amp;download=image.png" alt=""></p><p><strong>GetMapping：另一种写法</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Controller</span></span>
<span class="line"><span style="color:#A6ACCD;">@RequestMapping(&quot;/api&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class BodyController {</span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;">     *之前返回的是ModelAndView spring提供了简易的方式Model参数接收</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    @RequestMapping(method = RequestMethod.GET,value = &quot;/usert&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String userT(Model model) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        model.addAttribute(&quot;name&quot;, &quot;李四&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        model.addAttribute(&quot;age&quot;, 18);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;user&quot;;//使用视图文件</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p><strong>getMapping结合@ResponseBody 案例：</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/*</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseBody 应用方式</span></span>
<span class="line"><span style="color:#A6ACCD;">    * */</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @GetMapping(&quot;/boy&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    //加上此注解，说明此方法直接输出String字符串，不再使用视图渲染,也可以在类上直接注解  @RestController也是可以的</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseBody</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String boy() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;hello c2 中文&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @GetMapping(&quot;/strings&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseBody</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String[] strings() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return new String[]{&quot;java&quot;, &quot;javascript&quot;, &quot;springboot&quot;, &quot;中文编程&quot;};</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @GetMapping(&quot;/books&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseBody</span></span>
<span class="line"><span style="color:#A6ACCD;">    public List&lt;Book&gt; books() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;Book&gt; list = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        list.add(new Book(1, &quot;java11&quot;,180,new Date()));</span></span>
<span class="line"><span style="color:#A6ACCD;">        list.add(new Book(2, &quot;java 基础开发&quot;,280,new Date()));</span></span>
<span class="line"><span style="color:#A6ACCD;">        list.add(new Book(3, &quot;java22&quot;,380,new Date()));</span></span>
<span class="line"><span style="color:#A6ACCD;">        list.add(new Book(4, &quot;java33&quot;,480,new Date()));</span></span>
<span class="line"><span style="color:#A6ACCD;">        return list;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p><strong>PostMapping：</strong></p><p>创建注册页面：<strong>register.jsp</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;%@ page contentType=&quot;text/html;charset=UTF-8&quot; language=&quot;java&quot; %&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Title&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;form action=&quot;/api/regok2&quot; method=&quot;post&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            UserName:</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;input type=&quot;text&quot; name=&quot;username&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;br/&gt;&lt;br/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            PassWord:</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;input type=&quot;password&quot; name=&quot;passWord&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;br/&gt;&lt;br/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;button type=&quot;submit&quot;&gt;Login&lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/form&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><p>编写controller类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@GetMapping(&quot;/register&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String login(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;register&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @PostMapping(&quot;/regok&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String regok(String username){</span></span>
<span class="line"><span style="color:#A6ACCD;">        //重定向</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;数据保存&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(username);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;redirect:http://www.baidu.com&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">        //return &quot;redirect:/&quot;;//重定向当前网站的首页</span></span>
<span class="line"><span style="color:#A6ACCD;">        //return &quot;forward:/WEB-INF/page.jsp&quot;; 转发地址栏不变量，显示的结果变了</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @PostMapping(&quot;/regok2&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public ModelAndView regok2(String username){</span></span>
<span class="line"><span style="color:#A6ACCD;">        ModelAndView mv = new ModelAndView(&quot;success&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        mv.addObject(&quot;name&quot;, username);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;数据保存&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(username);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        return mv;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>DeleteMapping：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RequestMapping(value = &quot;/mds/{id}&quot;, method = RequestMethod.DELETE)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String mds(@PathVariable(&quot;id&quot;) int id, HttpServletRequest req) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        String msg = String.format(&quot;method:%s,deleteById：%d&quot;, req.getMethod(), id);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return msg;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p><strong>测试：</strong></p><p>先运行项目，然后配置下面</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v6a8dca958c93a7c017dca51acee7e756?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY2YThkY2E5NThjOTNhN2MwMTdkY2E1MWFjZWU3ZTc1NiJ9.5thSzHgxklceg_PpxCSgl104Ii5CQn6IBHIKqJS3ooc&amp;download=image.png" alt=""></p><p>配置路径，点击按钮执行：</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v12c18cbd0a3574a1f15f57e14820c807?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYxMmMxOGNiZDBhMzU3NGExZjE1ZjU3ZTE0ODIwYzgwNyJ9.i5_C6Fx8wnWwojPfo0DN_SaoU1Blo9Cpl87Ll8fu0MU&amp;download=image.png" alt=""></p><p><strong>结果展示：</strong></p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v9b4fb007134b14e75296d712f233a9d0?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5YjRmYjAwNzEzNGIxNGU3NTI5NmQ3MTJmMjMzYTlkMCJ9.eWsv_uIIoQpbLczjRbNUyfFW10YK9WTbPWfCLS7H-9I&amp;download=image.png" alt=""></p><p><strong>案例2：</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@DeleteMapping(&quot;/del1&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseBody</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String del1(int id,HttpServletRequest req){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(id);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(req.getMethod());</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;&quot;+id+&quot;=&quot;+req.getMethod();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>配置：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">DELETE http://localhost:8080/api/del1?id=99</span></span></code></pre></div><p><strong>PutMapping：</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RequestMapping(value = &quot;/puts&quot;, method = RequestMethod.PUT)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String puts( String name, HttpServletRequest req) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;name=&quot;+name);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(req.getMethod());</span></span>
<span class="line"><span style="color:#A6ACCD;">        String s = &quot;name的值=&quot; + name + &quot;；获取到的请求方式：&quot; + req.getMethod();</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(s);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;forward:/api/puts2&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    @PutMapping(&quot;/puts2&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseBody</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String puts2(String name, HttpServletRequest req) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        String msg = String.format(&quot;method:%s,hello:%s&quot;, req.getMethod(), name);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(msg);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return msg;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p><strong>测试请求地址：</strong></p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v867e7e3dc3d690b04c7f4e14af06aca7?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY4NjdlN2UzZGMzZDY5MGIwNGM3ZjRlMTRhZjA2YWNhNyJ9.yVxDE_SKuZFBUlQvyrKYMIArqEcINebHLsZ_Lvltsn8&amp;download=image.png" alt=""></p><p><strong>@ModelAttribute：注解用于将方法的参数或方法的返回值作为Model的属性加入到Model中，然后Spring框架自会将这个Model传递给ViewResolver</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@ModelAttribute</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void populateModel(@RequestParam String name, Model model) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        model.addAttribute(&quot;name&quot;, name);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //自动调用 model.addAttribute(&quot;user&quot;,u)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ModelAttribute(&quot;user&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public User user(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        User u = new User(12,&quot;小保安&quot;,20);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return u;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ModelAttribute</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void abc(Model model) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        model.addAttribute(&quot;age&quot;, 28);</span></span>
<span class="line"><span style="color:#A6ACCD;">        model.addAttribute(&quot;uname&quot;, &quot;黄老师&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        model.addAttribute(&quot;adlist&quot;, 28);</span></span>
<span class="line"><span style="color:#A6ACCD;">        model.addAttribute(&quot;age&quot;, 29);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @RequestMapping(value = {&quot;/helloWorld&quot;,&quot;/hello&quot;})</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String helloWorld() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;hello&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @GetMapping(&quot;/ok&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String ok(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;hello&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>访问地址：<a href="http://localhost:8080/hello?name=" target="_blank" rel="noreferrer">http://localhost:8080/hello?name=</a>老六</p><p><a href="http://localhost:8080/ok?name=" target="_blank" rel="noreferrer">http://localhost:8080/ok?name=</a>老六</p><p>测试图示：</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v416bca7875de92d7817d7e98d8a27a16?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTE2MTI3MCwiaWF0IjoxNjg4NTU2NDcwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY0MTZiY2E3ODc1ZGU5MmQ3ODE3ZDdlOThkOGEyN2ExNiJ9.fnQcVLj2WmlsKCnK1ImAL5FrywTkTwti5RZHL46HbZs&amp;download=image.png" alt=""></p>`,57),p=[l];function o(r,c,i,C,A,u){return n(),a("div",null,p)}const y=s(e,[["render",o]]);export{g as __pageData,y as default};
