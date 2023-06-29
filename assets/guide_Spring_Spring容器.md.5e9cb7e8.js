import{_ as s,o as a,c as n,O as l}from"./chunks/framework.571309da.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/Spring容器.md","filePath":"guide/Spring/Spring容器.md"}'),p={name:"guide/Spring/Spring容器.md"},e=l(`<h3 id="_1-spring核心容器介绍" tabindex="-1">1 Spring核心容器介绍 <a class="header-anchor" href="#_1-spring核心容器介绍" aria-label="Permalink to &quot;1 Spring核心容器介绍&quot;">​</a></h3><p>问题导入</p><p>问题：按照Bean名称获取Bean有什么弊端，按照Bean类型获取Bean有什么弊端？</p><p>1.1 创建容器</p><ul><li>方式一：类路径加载配置文件</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;applicationContext.xml&quot;);</span></span></code></pre></div><ul><li>方式二：文件路径加载配置文件</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ApplicationContext ctx = new FileSystemXmlApplicationContext(&quot;D:\\\\applicationContext.xml&quot;);</span></span></code></pre></div><ul><li>加载多个配置文件</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;bean1.xml&quot;, &quot;bean2.xml&quot;);</span></span></code></pre></div><p>1.2 获取bean对象</p><ul><li>方式一：使用bean名称获取</li></ul><blockquote><p>弊端：需要自己强制类型转换</p></blockquote><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">BookDao bookDao = (BookDao) ctx.getBean(&quot;bookDao&quot;);</span></span></code></pre></div><ul><li><strong>==方式二：使用bean名称获取并指定类型==</strong></li></ul><blockquote><p>推荐使用</p></blockquote><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">BookDao bookDao = ctx.getBean(&quot;bookDao&quot;, BookDao.class);</span></span></code></pre></div><ul><li>方式三：使用bean类型获取</li></ul><blockquote><p>弊端：如果IOC容器中同类型的Bean对象有多个，此处获取会报错</p></blockquote><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">BookDao bookDao = ctx.getBean(BookDao.class);</span></span></code></pre></div><p>1.3 容器类层次结构</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v9fdae9f80f430bb18c1066f3e77c6c53?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzUwMywiaWF0IjoxNjg3OTk4NzAzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5ZmRhZTlmODBmNDMwYmIxOGMxMDY2ZjNlNzdjNmM1MyJ9.QnMwn-WfcIffCHTp3qDnNmOwSFIKqeLf6sj-xsoPBGU&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>1.4 BeanFactory</p><ul><li>类路径加载配置文件</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Resource resources = new ClassPathResource(&quot;applicationContext.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">BeanFactory bf = new XmlBeanFactory(resources);</span></span>
<span class="line"><span style="color:#A6ACCD;">BookDao bookDao = bf.getBean(&quot;bookDao&quot;, BookDao.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">bookDao.save();</span></span></code></pre></div><ul><li>BeanFactory创建完毕后，所有的Bean均为延迟加载，也就是说我们调用getBean()方法获取Bean对象时才创建Bean对象并返回给我们</li></ul><h3 id="_2-spring核心容器总结" tabindex="-1">2 Spring核心容器总结 <a class="header-anchor" href="#_2-spring核心容器总结" aria-label="Permalink to &quot;2 Spring核心容器总结&quot;">​</a></h3><p>2.1 容器相关</p><ul><li><p>BeanFactory是IoC容器的顶层接口，初始化BeanFactory对象时，加载的bean延迟加载</p></li><li><p>ApplicationContext接口是Spring容器的核心接口，初始化时bean立即加载</p></li><li><p>ApplicationContext接口提供基础的bean操作相关方法，通过其他接口扩展其功能</p></li><li><p>ApplicationContext接口常用初始化类</p><ul><li><p><strong>==ClassPathXmlApplicationContext(常用)==</strong></p></li><li><p>FileSystemXmlApplicationContext</p></li></ul></li></ul><p>2.2 bean相关</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;cartDao&quot;                                          bean的Id</span></span>
<span class="line"><span style="color:#A6ACCD;">      name=&quot;dao cartDaoImpl&quot;                                bean的别名</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;com.by.dao.impl.CartDaoImpl&quot;               bean类型，静态工厂类，FactoryBean类</span></span>
<span class="line"><span style="color:#A6ACCD;">      scope=&quot;singleton&quot;                                 控制bean的实例数量</span></span>
<span class="line"><span style="color:#A6ACCD;">      init-method=&quot;init&quot;                                生命周期初始化方法</span></span>
<span class="line"><span style="color:#A6ACCD;">      destroy-method=&quot;destory&quot;                          生命周期销毁方法</span></span>
<span class="line"><span style="color:#A6ACCD;">      autowire=&quot;byType&quot;                                 自动装配类型</span></span>
<span class="line"><span style="color:#A6ACCD;">      factory-method=&quot;getOrderDao&quot;                      bean工厂方法，应用于静态工厂或实例工厂</span></span>
<span class="line"><span style="color:#A6ACCD;">      factory-bean=&quot;com.by.dao.OrderDaoFactory&quot;         实例工厂bean</span></span>
<span class="line"><span style="color:#A6ACCD;">      lazy-init=&quot;true&quot;&gt;                                 控制bean延迟加载</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span></code></pre></div><p>2.3 依赖注入相关</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;orderDao&quot; class=&quot;com.by.dao.impl.OrderDaoImpl&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;constructor-arg name=&quot;cartDao&quot; ref=&quot;cartDao&quot;/&gt;                 构造器注入引用类型</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;constructor-arg name=&quot;orderDao&quot; ref=&quot;orderDao&quot;/&gt;               </span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;constructor-arg name=&quot;msg&quot; ref=&quot;WARN&quot;/&gt;                        构造器注入简单类型</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;constructor-arg type=&quot;java.lang.String&quot; index=&quot;3&quot; value=&quot;WARN&quot;/&gt;类型匹配与索引匹配</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;cartDao&quot; value=&quot;cartDao&quot;/&gt;                      setter注入引用类型</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;orderDao&quot; value=&quot;orderDao&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;msg&quot; value=&quot;WARN&quot;/&gt;                             setter注入简单类型</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;names&quot;&gt;                                         setter注入集合类型</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;list&gt;                                                      list集合</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;value&gt;second&lt;/value&gt;                                   集合注入简单类型    </span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;ref bean=&quot;dataSource&quot;&gt;&lt;/ref&gt;                           集合注入引用类型</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/list&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/property&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span></code></pre></div><h2 id="三、spring注解开发" tabindex="-1">三、Spring注解开发 <a class="header-anchor" href="#三、spring注解开发" aria-label="Permalink to &quot;三、Spring注解开发&quot;">​</a></h2><h3 id="_1-注解开发定义bean对象【重点】" tabindex="-1">1 注解开发定义Bean对象【重点】 <a class="header-anchor" href="#_1-注解开发定义bean对象【重点】" aria-label="Permalink to &quot;1 注解开发定义Bean对象【重点】&quot;">​</a></h3><blockquote><p>目的：xml配置Bean对象有些繁琐，使用注解简化Bean对象的定义</p></blockquote><p>问题导入</p><p>问题1：使用什么标签进行Spring注解包扫描？</p><p>问题2：@Component注解和@Controller、@Service、@Repository三个衍生注解有什么区别？</p><p>1.1 基本使用</p><p><strong>【第一步】在applicationContext.xml中开启Spring注解包扫描</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">       xmlns:context=&quot;http://www.springframework.org/schema/context&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">       xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans</span></span>
<span class="line"><span style="color:#A6ACCD;">       http://www.springframework.org/schema/beans/spring-beans.xsd</span></span>
<span class="line"><span style="color:#A6ACCD;">        http://www.springframework.org/schema/context</span></span>
<span class="line"><span style="color:#A6ACCD;">        http://www.springframework.org/schema/context/spring-context.xsd&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--开启注解扫描 扫描com.by及其子包下所有的类--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;context:component-scan base-package=&quot;com.by&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/beans&gt;</span></span></code></pre></div><p><strong>【第二步】在类上使用@Component注解定义Bean。</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//@Component定义bean</span></span>
<span class="line"><span style="color:#A6ACCD;">@Component(&quot;orderDao&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class OrderDaoImpl implements OrderDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;order dao save...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">@Component</span></span>
<span class="line"><span style="color:#A6ACCD;">public class OrderServiceImpl implements OrderService {</span></span>
<span class="line"><span style="color:#A6ACCD;">   private OrderDao orderDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setOrderDao(OrderDao orderDao) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.orderDao = orderDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void add() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;order service save ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        orderDao.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><blockquote><p>补充说明：如果@Component注解没有使用参数指定Bean的名称，那么类名首字母小写就是Bean在IOC容器中的默认名称。例如：OrderServiceImpl对象在IOC容器中的名称是orderServiceImpl。</p></blockquote><p><strong>【第三步】在测试类中获取Bean对象</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void ComponentTest(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        ApplicationContext ac=new ClassPathXmlApplicationContext(&quot;application.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        OrderDao orderDao=(OrderDao) ac.getBean(&quot;orderDao&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(orderDao);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //按类型匹配bean</span></span>
<span class="line"><span style="color:#A6ACCD;">        OrderService orderService=ac.getBean(OrderService.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(orderService);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><blockquote><p>注意：在测试类中不要调用orderService的save方法，因为还没有给OrderServiceimpl中的bookDao赋值，调用orderService的save方法会出现空指针异常。</p></blockquote><p><strong>运行结果</strong></p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v5183db693304424990f3f6bfedf50ae6?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzUwMywiaWF0IjoxNjg3OTk4NzAzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY1MTgzZGI2OTMzMDQ0MjQ5OTBmM2Y2YmZlZGY1MGFlNiJ9.nnYQHP_IdZ6Jssm4By1CG4wWjEQ0G-9PCXdbHS-PWAk&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>1.2 @Component三个衍生注解</p><blockquote><p>说明：加粗的注解为常用注解</p></blockquote><ul><li><p>Spring提供<code>@Component</code>注解的三个衍生注解</p><ul><li><p><code>@Controller</code>：用于表现层bean定义</p></li><li><p><code>@Service</code>：用于业务层bean定义</p></li><li><p><code>@Repository</code>：用于数据层bean定义</p></li></ul></li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Service(&quot;cartDao&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class CartDaoImpl implements CartDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">@Repository</span></span>
<span class="line"><span style="color:#A6ACCD;">public class OrderServiceImpl implements OrderService {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><h3 id="_2-纯注解开发模式【重点】" tabindex="-1">2 纯注解开发模式【重点】 <a class="header-anchor" href="#_2-纯注解开发模式【重点】" aria-label="Permalink to &quot;2 纯注解开发模式【重点】&quot;">​</a></h3><p>问题导入</p><p>问题1：配置类上使用什么注解表示该类是一个配置类？</p><p>问题2：配置类上使用什么注解进行Spring注解包扫描？</p><p>2.1 纯注解开发模式介绍</p><ul><li><p>Spring3.0开启了纯注解开发模式，使用Java类替代配置文件，开启了Spring快速开发赛道</p></li><li><p>Java类代替Spring核心配置文件</p></li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--开启注解扫描 扫描com.by及其子包下所有的类--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;context:component-scan base-package=&quot;com.by&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    相当于</span></span>
<span class="line"><span style="color:#A6ACCD;">@Configuration</span></span>
<span class="line"><span style="color:#A6ACCD;">@ComponentScan(&quot;com.by&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringConfig{</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li><p>@Configuration注解用于设定当前类为配置类</p></li><li><p>@ComponentScan注解用于设定扫描路径，此注解只能添加一次，多个数据请用数组格式</p></li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@ComponentScan({com.by.service&quot;,&quot;com.by.dao&quot;})</span></span></code></pre></div><ul><li>读取Spring核心配置文件初始化容器对象切换为读取Java配置类初始化容器对象</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//加载配置文件初始化容器</span></span>
<span class="line"><span style="color:#A6ACCD;">ApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;applicationContext.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">切换为下面</span></span>
<span class="line"><span style="color:#A6ACCD;">//加载配置类初始化容器</span></span>
<span class="line"><span style="color:#A6ACCD;">ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);</span></span></code></pre></div><p>2.2 代码演示</p><p><strong>【第一步】定义配置类代替配置文件</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//声明当前类为Spring配置类</span></span>
<span class="line"><span style="color:#A6ACCD;">@Configuration</span></span>
<span class="line"><span style="color:#A6ACCD;">//Spring注解扫描，相当于&lt;context:component-scan base-package=&quot;com.by&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">@ComponentScan(&quot;com.by&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">//设置bean扫描路径，多个路径书写为字符串数组格式</span></span>
<span class="line"><span style="color:#A6ACCD;">//@ComponentScan({&quot;com.by.service&quot;,&quot;com.by.dao&quot;})</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>【第二步】在测试类中加载配置类，获取Bean对象并使用</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void AppForAnnotaion(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        ApplicationContext ac=new AnnotationConfigApplicationContext(SpringConfig.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        OrderDao orderDao=(OrderDao) ac.getBean(&quot;orderDao&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(orderDao);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //按类型匹配bean</span></span>
<span class="line"><span style="color:#A6ACCD;">        OrderService orderService=ac.getBean(OrderService.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(orderService);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><h3 id="_3-注解开发bean作用范围和生命周期管理" tabindex="-1">3 注解开发Bean作用范围和生命周期管理 <a class="header-anchor" href="#_3-注解开发bean作用范围和生命周期管理" aria-label="Permalink to &quot;3 注解开发Bean作用范围和生命周期管理&quot;">​</a></h3><p>问题导入</p><p>在类上使用什么注解定义Bean的作用范围？</p><p>3.1 bean作用范围注解配置</p><ul><li>使用@Scope定义bean作用范围</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Repository</span></span>
<span class="line"><span style="color:#A6ACCD;">@Scope(&quot;singleton&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class BookDaoImpl implements BookDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>3.2 bean生命周期注解配置</p><ul><li>使用@PostConstruct、@PreDestroy定义bean生命周期</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Repository</span></span>
<span class="line"><span style="color:#A6ACCD;">@Scope(&quot;singleton&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class BookDaoImpl implements BookDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public BookDaoImpl() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book dao constructor ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @PostConstruct</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void init(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book init ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @PreDestroy</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void destroy(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book destory ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>==<strong>注意：@PostConstruct和@PreDestroy注解是jdk中提供的注解，从jdk9开始，jdk中的javax.annotation包被移除了，也就是说这两个注解就用不了了，可以额外导入一下依赖解决这个问题。</strong>==</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;groupId&gt;javax.annotation&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;artifactId&gt;javax.annotation-api&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;version&gt;1.3.2&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span></code></pre></div><h3 id="_4-注解开发依赖注入【重点】" tabindex="-1">4 注解开发依赖注入【重点】 <a class="header-anchor" href="#_4-注解开发依赖注入【重点】" aria-label="Permalink to &quot;4 注解开发依赖注入【重点】&quot;">​</a></h3><p>问题导入</p><p>问题1：请描述@Autowired注解是如何进行自动装配的？</p><p>问题2：请描述@Qualifier注解的作用</p><p>4.1 使用@Autowired注解开启自动装配模式（按类型）</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Service</span></span>
<span class="line"><span style="color:#A6ACCD;">public class BookServiceImpl implements BookService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //@Autowired：注入引用类型，自动装配模式，默认按类型装配</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private BookDao bookDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book service save ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        bookDao.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><blockquote><p>说明：不管是使用配置文件还是配置类，都必须进行对应的Spring注解包扫描才可以使用。@Autowired默认按照类型自动装配，如果IOC容器中同类的Bean有多个，那么默认按照变量名和Bean的名称匹配，建议使用@Qualifier注解指定要装配的bean名称</p></blockquote><p>==注意：自动装配基于反射设计创建对象并暴力反射对应属性为私有属性初始化数据，因此无需提供setter方法。==</p><p>4.2 使用@Qualifier注解指定要装配的bean名称</p><blockquote><p>目的：解决IOC容器中同类型Bean有多个装配哪一个的问题</p></blockquote><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Service</span></span>
<span class="line"><span style="color:#A6ACCD;">public class BookServiceImpl implements BookService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //@Autowired：注入引用类型，自动装配模式，默认按类型装配</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    //@Qualifier：自动装配bean时按bean名称装配</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Qualifier(&quot;bookDao&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    //单独使用和@Qualifier+@Autowired 一样 主要是根据名称注入</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Resource(name=&quot;bookDao&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private BookDao bookDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book service save ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        bookDao.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>==注意：@Qualifier注解无法单独使用，必须配合@Autowired注解使用==</p><p>4.3 使用@Value实现简单类型注入</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Repository(&quot;bookDao&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class BookDaoImpl implements BookDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //@Value：注入简单类型（无需提供set方法）</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Value(&quot;\${name}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String name;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book dao save ...&quot; + name);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>以上@Value注解中使用\${name}从属性文件中读取name值，那么就需要在配置类或者配置文件中加载属性文件。</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Configuration</span></span>
<span class="line"><span style="color:#A6ACCD;">@ComponentScan(&quot;com.by&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">//@PropertySource加载properties配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">@PropertySource({&quot;classpath:jdbc.properties&quot;}) //{}可以省略不写</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>==注意：@PropertySource()中加载多文件请使用数组格式配置，不允许使用通配符*==</p><h3 id="_5-注解开发管理第三方bean【重点】" tabindex="-1">5 注解开发管理第三方Bean【重点】 <a class="header-anchor" href="#_5-注解开发管理第三方bean【重点】" aria-label="Permalink to &quot;5 注解开发管理第三方Bean【重点】&quot;">​</a></h3><p>问题导入</p><p>导入自己定义的配置类有几种方式？</p><table><thead><tr><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>名称</td><td>bean</td></tr><tr><td>类型</td><td>方法注解</td></tr><tr><td>所属位置</td><td>方法定义上方</td></tr><tr><td>功能</td><td>设置该方法的返回值作为Spring管理的bean</td></tr><tr><td>范例</td><td></td></tr></tbody></table><ul><li><p>说明：</p><ul><li><p>因为第三方bean无法在其源码上进行修改，使用@Bean解决第三方bean的引入问题</p></li><li><p>该注解用于替换xml配置的静态工厂和实例工厂创建bean，不区分方法是否为静态或非静态</p></li><li><p>@Bean所在的类必须被spring扫描加载，否则该注解无法生效</p></li></ul></li><li><p>相关属性</p><ul><li>value（默认）：定义bean的访问id</li></ul></li></ul><p><strong>【第一步】单独定义配置类</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class JdbcConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //@Bean：表示当前方法的返回值是一个bean对象，添加到IOC容器中</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    public DataSource dataSource(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        DruidDataSource ds = new DruidDataSource();</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setDriverClassName(&quot;com.mysql.jdbc.Driver&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setUrl(&quot;jdbc:mysql://localhost:3306/springdb&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setUsername(&quot;root&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setPassword(&quot;12345&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return ds;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>【第二步】将独立的配置类加入核心配置</strong></p><table><thead><tr><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>名称</td><td>import</td></tr><tr><td>类型</td><td>类注解</td></tr><tr><td>所属位置</td><td>类定义上方</td></tr><tr><td>功能</td><td>导入第三方bean作为Spring控制的资源</td></tr><tr><td>范例</td><td></td></tr></tbody></table><p>说明：</p><ul><li><p>@Import注解在同一个类上，仅允许添加一次，如果需要导入多个，使用数组的形式进行设定</p></li><li><p>在被导入的类中可以继续使用@Import导入其他资源</p></li><li><p>@bean所在的类可以使用导入的形式进入spring容器无需声明为bean</p></li></ul><p>方式1：@Import注解导入式</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Configuration</span></span>
<span class="line"><span style="color:#A6ACCD;">@ComponentScan(&quot;com.by&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">//@Import:导入配置信息</span></span>
<span class="line"><span style="color:#A6ACCD;">@Import({JdbcConfig.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>方式2：@ComponentScan扫描式</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Configuration</span></span>
<span class="line"><span style="color:#A6ACCD;">@ComponentScan({&quot;com.by.config&quot;,&quot;com.by.service&quot;,&quot;com.by.dao&quot;})  //只要com.by.config包扫到了就行，三个包可以合并写成com.by</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>测试：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">DataSource dataSource = (DataSource) ac.getBean(&quot;dataSource&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">System.out.println(dataSource);</span></span></code></pre></div><h3 id="_6-注解开发为第三方bean注入资源【重点】" tabindex="-1">6 注解开发为第三方Bean注入资源【重点】 <a class="header-anchor" href="#_6-注解开发为第三方bean注入资源【重点】" aria-label="Permalink to &quot;6 注解开发为第三方Bean注入资源【重点】&quot;">​</a></h3><p>问题导入</p><p>配置类中如何注入简单类型数据，如何注入引用类型数据？</p><p>6.1 简单类型依赖注入</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class JdbcConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //1.定义一个方法获得要管理的对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Value(&quot;com.mysql.jdbc.Driver&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String driver;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Value(&quot;jdbc:mysql://localhost:3306/springdb&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String url;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Value(&quot;root&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String userName;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Value(&quot;12345&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String password;</span></span>
<span class="line"><span style="color:#A6ACCD;">    //2.@Bean：表示当前方法的返回值是一个bean对象，添加到IOC容器中</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    public DataSource dataSource(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        DruidDataSource ds = new DruidDataSource();</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setDriverClassName(driver);</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setUrl(url);</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setUsername(userName);</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setPassword(password);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return ds;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><blockquote><p>说明：如果@Value()中使用了EL表达式读取properties属性文件中的内容，那么就需要加载properties属性文件。</p></blockquote><p>6.2 引用类型依赖注入</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//Spring会自动从IOC容器中找到BookDao对象赋值给参数bookDao变量，如果没有就会报错。</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean </span></span>
<span class="line"><span style="color:#A6ACCD;">public DataSource dataSource(BookDao bookDao){</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(bookDao);</span></span>
<span class="line"><span style="color:#A6ACCD;">    DruidDataSource ds = new DruidDataSource();</span></span>
<span class="line"><span style="color:#A6ACCD;">    ds.setDriverClassName(driver);</span></span>
<span class="line"><span style="color:#A6ACCD;">    ds.setUrl(url);</span></span>
<span class="line"><span style="color:#A6ACCD;">    ds.setUsername(userName);</span></span>
<span class="line"><span style="color:#A6ACCD;">    ds.setPassword(password);</span></span>
<span class="line"><span style="color:#A6ACCD;">    return ds;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><blockquote><p>说明：引用类型注入只需要为bean定义方法设置形参即可，容器会根据类型自动装配对象</p></blockquote><h3 id="_7-注解开发总结" tabindex="-1">7 注解开发总结 <a class="header-anchor" href="#_7-注解开发总结" aria-label="Permalink to &quot;7 注解开发总结&quot;">​</a></h3><p><img src="https://tcs-devops.aliyuncs.com/storage/112v3eb17b31861462d7845c85fefa348fc4?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzUwMywiaWF0IjoxNjg3OTk4NzAzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYzZWIxN2IzMTg2MTQ2MmQ3ODQ1Yzg1ZmVmYTM0OGZjNCJ9.fgOc3eBn83LOqQbgodEwrj9VdSRZg5AlJQc8SP54tzo&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p>`,126),o=[e];function t(c,i,r,C,A,u){return a(),n("div",null,o)}const D=s(p,[["render",t]]);export{y as __pageData,D as default};
