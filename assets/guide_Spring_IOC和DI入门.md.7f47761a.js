import{_ as s,o as n,c as a,O as p}from"./chunks/framework.571309da.js";const d=JSON.parse('{"title":"IOC入门案例【重点】","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/IOC和DI入门.md","filePath":"guide/Spring/IOC和DI入门.md","lastUpdated":null}'),l={name:"guide/Spring/IOC和DI入门.md"},e=p(`<h1 id="ioc入门案例【重点】" tabindex="-1">IOC入门案例【重点】 <a class="header-anchor" href="#ioc入门案例【重点】" aria-label="Permalink to &quot;IOC入门案例【重点】&quot;">​</a></h1><p>问题导入</p><p><code>&lt;bean&gt;</code>标签中id属性和class属性的作用是什么？</p><p>1.1 门案例思路分析</p><ol><li><p>管理什么？(Service与Dao)</p></li><li><p>如何将被管理的对象告知IOC容器？(配置文件)</p></li><li><p>被管理的对象交给IOC容器，如何获取到IoC容器？(接口)</p></li><li><p>IOC容器得到后，如何从容器中获取bean？(接口方法)</p></li><li><p>使用Spring导入哪些坐标？(pom.xml)</p></li></ol><p>1.2 实现步骤</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">【第一步】导入Spring坐标</span></span>
<span class="line"><span style="color:#A6ACCD;">【第二步】定义Spring管理的类（接口）</span></span>
<span class="line"><span style="color:#A6ACCD;">【第三步】创建Spring配置文件，配置对应类作为Spring管理的bean对象</span></span>
<span class="line"><span style="color:#A6ACCD;">【第四步】初始化IOC容器（Spring核心容器/Spring容器），通过容器获取bean对象</span></span></code></pre></div><p>1.3 实现代码</p><p><strong>【第一步】导入Spring坐标</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;dependencies&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--导入spring的坐标spring-context，对应版本是5.2.10.RELEASE--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;artifactId&gt;spring-context&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;version&gt;5.2.10.RELEASE&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependencies&gt;</span></span></code></pre></div><p><strong>【第二步】定义Spring管理的类（接口）</strong></p><ul><li>OrderDao 接口和OrderDaoImpl实现类</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface OrderDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">public class OrderDaoImpl implements OrderDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;order dao save ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>BookService接口和BookServiceImpl实现类</li></ul><div class="language-jsx"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OrderService</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">save</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">public </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OrderServiceImpl</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">implements</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BookService</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> OrderDao </span><span style="color:#F07178;">orderkDao</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">OrderDaoImpl</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">save</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">System</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">out</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">println</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">order service save ...</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">orderDao</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">save</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p><strong>【第三步】创建Spring配置文件，配置对应类作为Spring管理的bean对象</strong></p><ul><li>定义applicationContext.xml配置文件并配置OrderServiceImpl</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">       xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--</span></span>
<span class="line"><span style="color:#A6ACCD;">        bean标签：表示配置bean</span></span>
<span class="line"><span style="color:#A6ACCD;">        id属性：表示给bean起名字</span></span>
<span class="line"><span style="color:#A6ACCD;">        class属性：表示给bean定义类型</span></span>
<span class="line"><span style="color:#A6ACCD;">    --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;bean id=&quot;orderService&quot; class=&quot;com.by.service.impl.OrderServiceImpl&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/beans&gt;</span></span></code></pre></div><p><strong>==注意事项：bean定义时id属性在同一个上下文中(IOC容器中)不能重复==</strong></p><p><strong>【第四步】初始化IOC容器（Spring核心容器/Spring容器），通过容器获取Bean对象</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class App {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        //1.创建IoC容器对象，加载spring核心配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">        ApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;applicationContext.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //2 从IOC容器中获取Bean对象(BookService对象)</span></span>
<span class="line"><span style="color:#A6ACCD;">        OrderService orderService= (BookService)ctx.getBean(&quot;orderService&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //3 调用Bean对象(BookService对象)的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">       orderService.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>1.4 运行结果</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112veec826dcf6f9ee9b7dc3801322b75a69?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzMzc4OCwiaWF0IjoxNjg3OTI4OTg4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlZWM4MjZkY2Y2ZjllZTliN2RjMzgwMTMyMmI3NWE2OSJ9.nC4Q9g1zVM2XiZjmMbKVK8yK1-MJP7O0Spvzzm8Ah_o&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h3 id="_1-5spring相关api" tabindex="-1">1.5spring相关API <a class="header-anchor" href="#_1-5spring相关api" aria-label="Permalink to &quot;1.5spring相关API&quot;">​</a></h3><p>1.5.1 ApplicationContext的继承体系</p><p>applicationContext：接口类型，代表应用上下文，可以通过其实例获得 Spring 容器中的 Bean 对象</p><p>1.5.2 ApplicationContext的实现类</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">）</span><span style="color:#C792EA;">ClassPathXmlApplicationContext</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  它是从类的根路径下加载配置文件 推荐使用这种</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">）</span><span style="color:#C792EA;">FileSystemXmlApplicationContext</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  它是从磁盘路径上加载配置文件，配置文件可以在磁盘的任意位置。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">）</span><span style="color:#C792EA;">AnnotationConfigApplicationContext</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  当使用注解配置容器对象时，需要使用此类来创建 spring 容器。它用来读取注解。</span></span></code></pre></div><p>1.5.3 getBean()方法使用</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public Object getBean(String name) throws BeansException {  </span></span>
<span class="line"><span style="color:#A6ACCD;">    assertBeanFactoryActive();   </span></span>
<span class="line"><span style="color:#A6ACCD;">    return getBeanFactory().getBean(name);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">public &lt;T&gt; T getBean(Class&lt;T&gt; requiredType) throws BeansException {                     assertBeanFactoryActive();</span></span>
<span class="line"><span style="color:#A6ACCD;">    return getBeanFactory().getBean(requiredType);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>其中，当参数的数据类型是字符串时，表示根据Bean的id从容器中获得Bean实例，返回是Object，需要强转。</p><p>当参数的数据类型是Class类型时，表示根据类型从容器中匹配Bean实例，当容器中相同类型的Bean有多个时，则此方法会报错</p><p><strong>getBean()方法使用</strong></p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">ApplicationContext</span><span style="color:#A6ACCD;"> applicationContext </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#82AAFF;">ClassPathXmlApplicationContext</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">applicationContext.xml</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">UserService</span><span style="color:#A6ACCD;"> userService1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">UserService</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> applicationContext</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getBean</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">userService</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">UserService</span><span style="color:#A6ACCD;"> userService2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> applicationContext</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getBean</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">UserService</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">);</span></span></code></pre></div><h3 id="_2-di入门案例【重点】" tabindex="-1">2 DI入门案例【重点】 <a class="header-anchor" href="#_2-di入门案例【重点】" aria-label="Permalink to &quot;2 DI入门案例【重点】&quot;">​</a></h3><p>问题导入</p><p><code>&lt;property&gt;</code>标签中name属性和ref属性的作用是什么？</p><p>2.1 DI入门案例思路分析</p><ol><li><p>基于IOC管理bean</p></li><li><p>Service中使用new形式创建的Dao对象是否保留？(否)</p></li><li><p>Service中需要的Dao对象如何进入到Service中？(提供setter方法)</p></li><li><p>Service与Dao间的关系如何描述？(配置)</p></li></ol><p>2.2 实现步骤</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">【第一步】删除使用new的形式创建对象的代码</span></span>
<span class="line"><span style="color:#A6ACCD;">【第二步】提供依赖对象对应的setter方法</span></span>
<span class="line"><span style="color:#A6ACCD;">【第三步】配置service与dao之间的关系</span></span></code></pre></div><p>2.3 实现代码</p><p><strong>【第一步】删除使用new的形式创建对象的代码</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class OrderServiceImpl implements OrderService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //引入dao对象</span></span>
<span class="line"><span style="color:#A6ACCD;">   private OrderDao orderDao ; //【第一步】删除使用new的形式创建对象的代码</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void add() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;order service save ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        orderDao.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>【第二步】提供依赖对象对应的setter方法</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class OrderServiceImpl implements OrderService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //引入dao对象</span></span>
<span class="line"><span style="color:#A6ACCD;">   private OrderDao orderDao ;</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setOrderDao(OrderDao orderDao) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.orderDao = orderDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void add() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;order service save ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        orderDao.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>【第三步】配置service与dao之间的关系</strong></p><blockquote><p>在applicationContext.xml中配置</p></blockquote><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">       xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--</span></span>
<span class="line"><span style="color:#A6ACCD;">        bean标签：表示配置bean</span></span>
<span class="line"><span style="color:#A6ACCD;">        id属性：表示给bean起名字</span></span>
<span class="line"><span style="color:#A6ACCD;">        class属性：表示给bean定义类型</span></span>
<span class="line"><span style="color:#A6ACCD;">    --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;bean id=&quot;orderDao&quot; class=&quot;com.by.dao.impl.OrderDaoImpl&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;bean id=&quot;orderService&quot; class=&quot;com.by.service.impl.OrderServiceImpl&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;!--配置service和dao的关系</span></span>
<span class="line"><span style="color:#A6ACCD;">            property标签，表示配置当前bean的属性</span></span>
<span class="line"><span style="color:#A6ACCD;">            name属性：指代引用哪一个属性</span></span>
<span class="line"><span style="color:#A6ACCD;">            ref属性：表示参照哪一个id</span></span>
<span class="line"><span style="color:#A6ACCD;">        --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;orderDao&quot; ref=&quot;orderDao&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/bean&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/beans&gt;</span></span></code></pre></div><p>2.4 图解演示</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v9cc75796272ceb1246433d2de21c9021?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzMzc4OCwiaWF0IjoxNjg3OTI4OTg4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5Y2M3NTc5NjI3MmNlYjEyNDY0MzNkMmRlMjFjOTAyMSJ9.tBV0bWwUJn0XoCVfRrp3Jj9PIq3yXFZM60F1Mcj6Z9Q&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p>`,51),o=[e];function t(c,r,i,C,A,y){return n(),a("div",null,o)}const g=s(l,[["render",t]]);export{d as __pageData,g as default};
