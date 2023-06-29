import{_ as s,o as a,c as l,O as n}from"./chunks/framework.571309da.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/依赖注入(DI配置).md","filePath":"guide/Spring/依赖注入(DI配置).md"}'),p={name:"guide/Spring/依赖注入(DI配置).md"},t=n(`<p>依赖注入方式【重点】</p><p>问题导入</p><p>依赖注入有几种方式？</p><p>1.1 依赖注入的两种方式</p><ul><li><p>setter注入简单类型==<strong>引用类型(很常用)</strong>==</p></li><li><p>构造器注入简单类型引用类型</p></li></ul><p>1.2 setter方式注入</p><p>问题导入</p><p>setter方式注入使用什么子标签？</p><p>引用类型</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v738a95fd420d32964558ab56d661a96a?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzIxNiwiaWF0IjoxNjg3OTk4NDE2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY3MzhhOTVmZDQyMGQzMjk2NDU1OGFiNTZkNjYxYTk2YSJ9.6AFA4q2NACbs5E0i1bEVYmATzx-Jt-s00Kik3SAC1Dk&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>简单类型</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112vaa2fe5d0b547ab2df2b4540c6a6c2e4f?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzIxNiwiaWF0IjoxNjg3OTk4NDE2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhYTJmZTVkMGI1NDdhYjJkZjJiNDU0MGM2YTZjMmU0ZiJ9.k8dkutp6N7H5Pc436l1AhzRGquersUHAGnjqar1essQ&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>1.3 构造方式注入</p><p>问题导入</p><p>构造方式注入使用什么子标签？</p><p>引用类型</p><p>在bean中定义引用类型属性并提供可访问的构造方法</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class OrderServiceImpl implements OrderService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //引入dao对象</span></span>
<span class="line"><span style="color:#A6ACCD;">   private OrderDao orderDao ;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    public OrderServiceImpl(OrderDao orderDao) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.orderDao = orderDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>配置中使用constructor-arg标签 ref属性注入引用类型对象</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;orderDao&quot; class=&quot;com.by.dao.impl.OrderDaoImpl&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;orderService&quot; class=&quot;com.by.service.impl.OrderServiceImpl&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;constructor-arg name=&quot;orderDao&quot; ref=&quot;orderDao&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span></code></pre></div><p>1.4 依赖注入方式选择</p><ol><li><p>强制依赖使用构造器进行，使用setter注入有概率不进行注入导致null对象出现</p></li><li><p>可选依赖使用setter注入进行，灵活性强</p></li><li><p>Spring框架倡导使用构造器，第三方框架内部大多数采用构造器注入的形式进行数据初始化，相对严谨</p></li><li><p>如果有必要可以两者同时使用，使用构造器注入完成强制依赖的注入，使用setter注入完成可选依赖的注入</p></li><li><p>实际开发过程中还要根据实际情况分析，如果受控对象没有提供setter方法就必须使用构造器注入</p></li><li><p><strong>==自己开发的模块推荐使用setter注入==</strong></p></li></ol><h3 id="_2-依赖自动装配【理解】" tabindex="-1">2 依赖自动装配【理解】 <a class="header-anchor" href="#_2-依赖自动装配【理解】" aria-label="Permalink to &quot;2 依赖自动装配【理解】&quot;">​</a></h3><p>问题导入</p><p>如何配置按照类型自动装配？</p><p>2.1 自动装配概念</p><ul><li><p>IoC容器根据bean所依赖的资源在容器中自动查找并注入到bean中的过程称为自动装配</p></li><li><p>自动装配方式==按类型（常用）==按名称按构造方法不启用自动装配</p></li></ul><p>2.2 自动装配类型</p><p>依赖自动装配</p><blockquote><p>配置中使用bean标签autowire属性设置自动装配的类型---按类型</p></blockquote><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;bookDao&quot; class=&quot;com.by.dao.impl.BookDaoImpl&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;bookService&quot; class=&quot;com.by.service.impl.BookServiceImpl&quot; autowire=&quot;byType&quot;/&gt;</span></span></code></pre></div><p>代码演示：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class BookDaoImpl implements BookDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book dao save ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>serviceImpl：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class BookServiceImpl implements BookService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    private BookDao bookDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setBookDao(BookDao bookDao) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.bookDao = bookDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        bookDao.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book dao running.....&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>测试：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ApplicationContext ac=new ClassPathXmlApplicationContext(&quot;application.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">BookService bookService= (BookService) ac.getBean(&quot;bookService&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"> bookService.save();</span></span></code></pre></div><p>问题导入：</p><p>如果出现两个id怎么办？比如</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;bookDao&quot; class=&quot;com.by.dao.impl.BookDaoImpl&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;bookDao2&quot; class=&quot;com.by.dao.impl.BookDaoImpl&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> &lt;bean id=&quot;bookService&quot; class=&quot;com.by.service.impl.BookServiceImpl&quot; autowire=&quot;byName&quot; /&gt;</span></span></code></pre></div><p>依赖自动装配特征</p><ol><li><p>自动装配用于引用类型依赖注入，不能对简单类型进行操作</p></li><li><p>使用按类型装配时（byType）必须保障容器中相同类型的bean唯一，推荐使用</p></li><li><p>使用按名称装配时（byName）必须保障容器中具有指定名称的bean，因变量名与配置耦合，不推荐使用</p></li><li><p>自动装配优先级低于setter注入与构造器注入，同时出现时自动装配配置失效</p></li></ol><h3 id="_3-集合注入" tabindex="-1">3 集合注入 <a class="header-anchor" href="#_3-集合注入" aria-label="Permalink to &quot;3 集合注入&quot;">​</a></h3><p>准备工作：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class OrderDaoImpl implements OrderDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public int[] array;</span></span>
<span class="line"><span style="color:#A6ACCD;">    public List&lt;String&gt; list;</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Set&lt;String&gt; set;</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Map&lt;String,String&gt; map;</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Properties properties;</span></span>
<span class="line"><span style="color:#A6ACCD;">    //生成Setter方法</span></span></code></pre></div><p>3.1 注入数组类型数据</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;orderDao&quot; class=&quot;com.by.dao.impl.OrderDaoImpl&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;property name=&quot;array&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;array&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;value&gt;100&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;value&gt;200&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;value&gt;300&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/array&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/property&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span></code></pre></div><p>3.2 注入List类型数据</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;property name=&quot;list&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;list&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;value&gt;北京&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;value&gt;河南&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;value&gt;郑州&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;value&gt;高新区&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/list&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/property&gt;</span></span></code></pre></div><p>3.3 注入Set类型数据</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;property name=&quot;set&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;set&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;value&gt;北京&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;value&gt;河南&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;value&gt;郑州&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;value&gt;高新区&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/set&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/property&gt;</span></span></code></pre></div><p>3.4 注入Map类型数据</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;property name=&quot;map&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;map&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;entry key=&quot;country&quot; value=&quot;china&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;entry key=&quot;province&quot; value=&quot;henan&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;entry key=&quot;city&quot; value=&quot;kaifeng&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/map&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/property&gt;</span></span></code></pre></div><p>3.5 注入Properties类型数据</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;property name=&quot;properties&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;props&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;prop key=&quot;country&quot;&gt;china&lt;/prop&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;prop key=&quot;province&quot;&gt;henan&lt;/prop&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;prop key=&quot;city&quot;&gt;kaifeng&lt;/prop&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/props&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/property&gt;</span></span></code></pre></div><blockquote><p>说明：property标签表示setter方式注入，构造方式注入constructor-arg标签内部也可以写<code>&lt;array&gt;、&lt;list&gt;、&lt;set&gt;、&lt;map&gt;、&lt;props&gt;</code>标签</p></blockquote>`,56),e=[t];function o(c,i,r,C,u,A){return a(),l("div",null,e)}const d=s(p,[["render",o]]);export{g as __pageData,d as default};
