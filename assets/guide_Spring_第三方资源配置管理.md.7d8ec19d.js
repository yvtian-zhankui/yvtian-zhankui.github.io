import{_ as s,o as a,c as n,O as t}from"./chunks/framework.571309da.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/第三方资源配置管理.md","filePath":"guide/Spring/第三方资源配置管理.md"}'),e={name:"guide/Spring/第三方资源配置管理.md"},l=t(`<blockquote><p>说明：以管理DataSource连接池对象为例讲解第三方资源配置管理</p></blockquote><h3 id="_1-管理datasource连接池对象" tabindex="-1">1 管理DataSource连接池对象 <a class="header-anchor" href="#_1-管理datasource连接池对象" aria-label="Permalink to &quot;1 管理DataSource连接池对象&quot;">​</a></h3><p>问题导入</p><p>配置数据库连接参数时，注入驱动类名是用driverClassName还是driver？</p><p>1.1 管理Druid连接池【重点】</p><p><strong>数据库准备</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">create database if not exists springdb character set utf8;</span></span>
<span class="line"><span style="color:#A6ACCD;">create table if not exists by_account(</span></span>
<span class="line"><span style="color:#A6ACCD;">    id int primary key auto_increment,</span></span>
<span class="line"><span style="color:#A6ACCD;">    name varchar(20),</span></span>
<span class="line"><span style="color:#A6ACCD;">    money double</span></span>
<span class="line"><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">insert into by_account values(null,&#39;Tom&#39;,1000);</span></span>
<span class="line"><span style="color:#A6ACCD;">insert into by_account values(null,&#39;Jerry&#39;,1000);</span></span></code></pre></div><p><strong>【第一步】添加Druid连接池依赖</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--    spring的jar包--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;spring-context&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;5.3.20&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--    导入mysqljar包--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;mysql&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;8.0.29&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--    导入druid-jar包--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;com.alibaba&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;druid&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;1.2.4&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span></code></pre></div><blockquote><p>注意：除了添加以上两个依赖之外，别忘了添加spring-context依赖。</p></blockquote><p><strong>手写Driuid连接池测试：</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testDruid() throws Exception {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //创建数据源</span></span>
<span class="line"><span style="color:#A6ACCD;">    DruidDataSource dataSource = new DruidDataSource();</span></span>
<span class="line"><span style="color:#A6ACCD;">    //设置数据库连接参数</span></span>
<span class="line"><span style="color:#A6ACCD;">    dataSource.setDriverClassName(&quot;com.mysql.jdbc.Driver&quot;); </span></span>
<span class="line"><span style="color:#A6ACCD;">    dataSource.setUrl(&quot;jdbc:mysql://localhost:3306/springdb&quot;);   </span></span>
<span class="line"><span style="color:#A6ACCD;">    dataSource.setUsername(&quot;root&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    dataSource.setPassword(&quot;12345&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    //获得连接对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    Connection connection = dataSource.getConnection();    </span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(connection);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>提取Druid.properties配置文件</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">jdbc.driver=com.mysql.jdbc.Driver</span></span>
<span class="line"><span style="color:#A6ACCD;">jdbc.url=jdbc:mysql://localhost:3306/Springdb</span></span>
<span class="line"><span style="color:#A6ACCD;">jdbc.username=root</span></span>
<span class="line"><span style="color:#A6ACCD;">jdbc.password=12345</span></span></code></pre></div><p><strong>读取jdbc.properties配置文件创建连接池</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//加载类路径下的jdbc.properties</span></span>
<span class="line"><span style="color:#A6ACCD;">ResourceBundle bundle = ResourceBundle.getBundle(&quot;jdbc&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">DruidDataSource dataSource=new DruidDataSource();</span></span>
<span class="line"><span style="color:#A6ACCD;">dataSource.setDriverClassName(bundle.getString(&quot;jdbc.driver&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">dataSource.setUrl(bundle.getString(&quot;jdbc.url&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">dataSource.setUsername(bundle.getString(&quot;jdbc.username&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">dataSource.setPassword(bundle.getString(&quot;jdbc.password&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">DruidPooledConnection connection = dataSource.getConnection();</span></span>
<span class="line"><span style="color:#A6ACCD;">System.out.println(connection);</span></span>
<span class="line"><span style="color:#A6ACCD;">//循环遍历读取配置文件信息</span></span>
<span class="line"><span style="color:#A6ACCD;">Enumeration&lt;String&gt; keys = bundle.getKeys();</span></span>
<span class="line"><span style="color:#A6ACCD;">while (keys.hasMoreElements()){</span></span>
<span class="line"><span style="color:#A6ACCD;">    String key = keys.nextElement();</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(bundle.getString(key));</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>配置DruidDataSource连接池Bean对象</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;dataSource&quot; class=&quot;com.alibaba.druid.pool.DruidDataSource&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;driverClassName&quot; value=&quot;com.mysql.jdbc.Driver&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;url&quot; value=&quot;jdbc:mysql://localhost:3306/springdb&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;username&quot; value=&quot;root&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;password&quot; value=&quot;12345&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span></code></pre></div><p><strong>在测试类中从IOC容器中获取连接池对象并打印</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class App {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        ApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;applicationContext.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        DataSource dataSource = (DataSource) ctx.getBean(&quot;dataSource&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(dataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>1.2 管理c3p0连接池</p><p><strong>添加c3p0连接池依赖</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;groupId&gt;c3p0&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;artifactId&gt;c3p0&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;version&gt;0.9.1.2&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span></code></pre></div><p>手写获取jdbc.properties文件：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ResourceBundle rb = ResourceBundle.getBundle(&quot;jdbc&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">ComboPooledDataSource dataSource = new ComboPooledDataSource();</span></span>
<span class="line"><span style="color:#A6ACCD;">dataSource.setDriverClass(rb.getString(&quot;jdbc.driver&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">dataSource.setJdbcUrl(rb.getString(&quot;jdbc.url&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">dataSource.setUser(rb.getString(&quot;jdbc.username&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">dataSource.setPassword(rb.getString(&quot;jdbc.password&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">Connection connection = dataSource.getConnection();</span></span>
<span class="line"><span style="color:#A6ACCD;">System.out.println(connection);</span></span></code></pre></div><p><strong>配置c3p0连接池Bean对象</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;dataSource&quot; class=&quot;com.mchange.v2.c3p0.ComboPooledDataSource&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;driverClass&quot; value=&quot;com.mysql.jdbc.Driver&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;jdbcUrl&quot; value=&quot;jdbc:mysql://localhost:3306/spring_db&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;user&quot; value=&quot;root&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;password&quot; value=&quot;root&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;maxPoolSize&quot; value=&quot;1000&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span></code></pre></div><blockquote><p>注意：同一个Spring容器中不能有两个id=&quot;dataSource&quot;的连接池。</p></blockquote><p><strong>在测试类中从IOC容器中获取连接池对象并打印</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class App {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        ApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;applicationContext.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        DataSource dataSource = (DataSource) ctx.getBean(&quot;dataSource&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(dataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_2-加载properties属性文件【重点】" tabindex="-1">2 加载properties属性文件【重点】 <a class="header-anchor" href="#_2-加载properties属性文件【重点】" aria-label="Permalink to &quot;2 加载properties属性文件【重点】&quot;">​</a></h3><blockquote><p>目的：将数据库的连接参数抽取到一个单独的文件中，与Spring配置文件解耦。</p></blockquote><p>问题导入</p><p>问题1：如何解决使用EL表达式读取属性文件中的值结果读取到了系统属性问题？</p><p>问题2：加载properties文件写法标准写法该怎么写？</p><p>2.1 基本用法</p><p><strong>【第一步】编写jdbc.properties属性文件</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">jdbc.driver=com.mysql.jdbc.Driver</span></span>
<span class="line"><span style="color:#A6ACCD;">jdbc.url=jdbc:mysql://127.0.0.1:3306/spring_db</span></span>
<span class="line"><span style="color:#A6ACCD;">jdbc.username=root</span></span>
<span class="line"><span style="color:#A6ACCD;">jdbc.password=root</span></span></code></pre></div><p><strong>【第二步】在applicationContext.xml中开启开启context命名空间，加载jdbc.properties属性文件</strong></p><p>![image-20210730101826913](file:///D:/%E8%87%AA%E5%B7%B1%E7%A0%94%E5%8F%91/%E6%95%99%E5%AD%A6%E8%AF%BE%E4%BB%B6/spring%E6%95%99%E5%AD%A6%E8%AF%BE%E4%BB%B6/day02/Spring%E7%AC%AC%E4%BA%8C%E5%A4%A9.assets/image-20210730101826913.png?lastModify=1687841936 &quot;&quot;)</p><p><strong>==小技巧：如果同学们觉得上述复制粘贴方式不好改或者容易改错，其实idea是有提示功能的，注意不要选错就行了。有些版本的idea没有这个提示，那么就按照上面复制粘贴的方式改，改完之后可以做成live template模板，后期直接用。==</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;context:property-placeholder location=&quot;jdbc.properties&quot;/&gt;</span></span></code></pre></div><p><strong>【第三步】在配置连接池Bean的地方使用EL表达式获取jdbc.properties属性文件中的值</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;bean class=&quot;com.alibaba.druid.pool.DruidDataSource&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;driverClassName&quot; value=&quot;\${jdbc.driver}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;url&quot; value=&quot;\${jdbc.url}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;username&quot; value=&quot;\${jdbc.username}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;password&quot; value=&quot;\${jdbc.password}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span></code></pre></div><blockquote><p>配置完成之后，运行之前的获取Druid连接池代码，可以获取到连接池对象就表示配置成功。</p></blockquote><p>2.2 配置不加载系统属性</p><p><strong>问题</strong></p><p>如果属性文件中配置的不是jdbc.username，而是username=root，那么使用\${username}获取到的不是root，而是计算机的名称。</p><p><strong>原因</strong></p><p>系统属性的优先级比我们属性文件中的高，替换了我们的username=root。</p><p><strong>解决</strong></p><p>解决1：换一个名称，例如不叫username，叫jdbc.username。</p><p>解决2：使用system-properties-mode=&quot;NEVER&quot;属性表示不使用系统属性。</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;context:property-placeholder location=&quot;jdbc.properties&quot; system-properties-mode=&quot;NEVER&quot;/&gt;</span></span></code></pre></div><p>2.3 加载properties文件写法</p><ul><li>不加载系统属性</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;context:property-placeholder location=&quot;jdbc.properties&quot; system-properties-mode=&quot;NEVER&quot;/&gt;</span></span></code></pre></div><ul><li>加载多个properties文件</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;context:property-placeholder location=&quot;jdbc.properties,msg.properties&quot;/&gt;</span></span></code></pre></div><ul><li>加载所有properties文件</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;context:property-placeholder location=&quot;*.properties&quot;/&gt;</span></span></code></pre></div><ul><li>加载properties文件**==标准格式==**</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;context:property-placeholder location=&quot;classpath:*.properties&quot;/&gt;</span></span></code></pre></div><ul><li>加载properties文件标准格式</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;context:property-placeholder location=&quot;classpath*:*.properties&quot;/&gt;</span></span></code></pre></div>`,65),p=[l];function o(c,r,i,u,d,C){return a(),n("div",null,p)}const y=s(e,[["render",o]]);export{g as __pageData,y as default};
