import{_ as s,o as a,c as n,O as l}from"./chunks/framework.571309da.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/JdbcTemplate基本使用.md","filePath":"guide/Spring/JdbcTemplate基本使用.md","lastUpdated":1688285791000}'),p={name:"guide/Spring/JdbcTemplate基本使用.md"},e=l(`<p>01-JdbcTemplate基本使用-概述(了解)</p><p>JdbcTemplate是spring框架中提供的一个对象，是对原始繁琐的Jdbc API对象的简单封装。spring框架为我们提供了很多的操作模板类。例如：操作关系型数据的JdbcTemplate和HibernateTemplate，操作nosql数据库的RedisTemplate，操作消息队列的JmsTemplate等等。</p><h3 id="_02-jdbctemplate基本使用-开发步骤-理解" tabindex="-1">02-JdbcTemplate基本使用-开发步骤(理解) <a class="header-anchor" href="#_02-jdbctemplate基本使用-开发步骤-理解" aria-label="Permalink to &quot;02-JdbcTemplate基本使用-开发步骤(理解)&quot;">​</a></h3><p>①导入spring-jdbc和spring-tx坐标</p><p>②创建数据库表和实体</p><p>③创建JdbcTemplate对象</p><p>④执行数据库操作</p><h3 id="_03-jdbctemplate基本使用-快速入门代码实现-应用" tabindex="-1">03-JdbcTemplate基本使用-快速入门代码实现(应用) <a class="header-anchor" href="#_03-jdbctemplate基本使用-快速入门代码实现-应用" aria-label="Permalink to &quot;03-JdbcTemplate基本使用-快速入门代码实现(应用)&quot;">​</a></h3><p>导入spring-jdbc和spring-tx坐标</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;dependencies&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;junit&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;junit&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;4.13&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;scope&gt;test&lt;/scope&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;com.alibaba&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;druid&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;1.2.4&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;mysql&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;5.1.47&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;com.mchange&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;c3p0&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;0.9.5.4&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;spring-context&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;5.3.20&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;5.3.8&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;spring-tx&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;5.3.20&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;spring-test&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;5.3.20&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/dependencies&gt;</span></span></code></pre></div><p>创建数据库表和实体</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">create table Account(</span></span>
<span class="line"><span style="color:#A6ACCD;">    name  varchar(50),</span></span>
<span class="line"><span style="color:#A6ACCD;">    money double )</span></span></code></pre></div><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class Account {</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String name;</span></span>
<span class="line"><span style="color:#A6ACCD;">    private double money;</span></span>
<span class="line"><span style="color:#A6ACCD;">    //生成getter setter方法</span></span></code></pre></div><p><strong>先测试连接能不能用：</strong></p><p>创建JdbcTemplate对象</p><p>执行数据库操作</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//测试jdbcTemplate能否使用</span></span>
<span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void test(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    //创建数据连接池对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    DruidDataSource druidDataSource=new DruidDataSource();</span></span>
<span class="line"><span style="color:#A6ACCD;">    druidDataSource.setDriverClassName(&quot;com.mysql.jdbc.Driver&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    druidDataSource.setUrl(&quot;jdbc:mysql://localhost:3306/db1&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    druidDataSource.setUsername(&quot;root&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    druidDataSource.setPassword(&quot;12345&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    //创建jdbc模板对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    JdbcTemplate jdbcTemplate=new JdbcTemplate();</span></span>
<span class="line"><span style="color:#A6ACCD;">    //设置数据源对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    jdbcTemplate.setDataSource(druidDataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">    //执行sql语句</span></span>
<span class="line"><span style="color:#A6ACCD;">    int row=jdbcTemplate.update(&quot;insert into account values(?,?)&quot;,&quot;lisi&quot;,5000);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(row);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>04-JdbcTemplate基本使用-spring产生模板对象分析(理解)</p><p>我们可以将JdbcTemplate的创建权交给Spring，将数据源DataSource的创建权也交给Spring，在Spring容器内部将数据源DataSource注入到JdbcTemplate模版对象中,然后通过Spring容器获得JdbcTemplate对象来执行操作。</p><p>05-JdbcTemplate基本使用-spring产生模板对象代码实现(应用)</p><p>配置如下：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;dataSource&quot; class=&quot;com.alibaba.druid.pool.DruidDataSource&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;driverClassName&quot; value=&quot;com.mysql.jdbc.Driver&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;url&quot; value=&quot;jdbc:mysql://localhost:3306/db1&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;username&quot; value=&quot;root&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;password&quot; value=&quot;12345&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/bean&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!--jdbc模板对象--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;bean id=&quot;jdbcTemplate&quot; class=&quot;org.springframework.jdbc.core.JdbcTemplate&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;dataSource&quot; ref=&quot;dataSource&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/bean&gt;</span></span></code></pre></div><p>测试代码：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    //测试Spring产生jdbcTemplate对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void test2() throws PropertyVetoException {</span></span>
<span class="line"><span style="color:#A6ACCD;">        ApplicationContext app = new ClassPathXmlApplicationContext(&quot;application.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        JdbcTemplate jdbcTemplate = app.getBean(JdbcTemplate.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        int row = jdbcTemplate.update(&quot;insert into account values(?,?)&quot;, &quot;lisi&quot;, 5000);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(row);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>06-JdbcTemplate基本使用-spring产生模板对象代码实现（抽取jdbc.properties）(应用)</p><p>将数据库的连接信息抽取到外部配置文件中，和spring的配置文件分离开，有利于后期维护</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">jdbc.driver=com.mysql.jdbc.Driver</span></span>
<span class="line"><span style="color:#A6ACCD;">jdbc.url=jdbc:mysql://localhost:3306/db1</span></span>
<span class="line"><span style="color:#A6ACCD;">jdbc.username=root</span></span>
<span class="line"><span style="color:#A6ACCD;">jdbc.password=12345</span></span></code></pre></div><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--加载jdbc.properties--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;context:property-placeholder location=&quot;classpath:jdbc.properties&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;dataSource&quot; class=&quot;com.alibaba.druid.pool.DruidDataSource&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;driverClassName&quot; value=&quot;\${jdbc.driver}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;url&quot; value=&quot;\${jdbc.url}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;username&quot; value=&quot;\${jdbc.username}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;password&quot; value=&quot;\${jdbc.password}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--jdbc模板对象--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;jdbcTemplate&quot; class=&quot;org.springframework.jdbc.core.JdbcTemplate&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;dataSource&quot; ref=&quot;dataSource&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span></code></pre></div><p>07-JdbcTemplate基本使用-常用操作-更新操作(应用)</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(&quot;classpath:applicationContext.xml&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class JdbcTemplateCRUDTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">private JdbcTemplate jdbcTemplate;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">//修改更新</span></span>
<span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testUpdate(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    jdbcTemplate.update(&quot;update account set money=? where name=?&quot;,10000,&quot;tom&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">//删除</span></span>
<span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testDelete(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    jdbcTemplate.update(&quot;delete from account where name=?&quot;,&quot;tom&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>08-JdbcTemplate基本使用-常用操作-查询操作(应用)</p><p>对应的方法：</p><table><thead><tr><th>方法名</th><th>参数说明</th></tr></thead><tbody><tr><td><code>queryForObject(String sql, Class&lt;T&gt; type)</code></td><td>sql: 表示sql语句 Class：表示返回值类型</td></tr><tr><td><code>queryForObject(String sql,RowMapper&lt;T&gt; rowmapper, Class&lt;T&gt; type)</code></td><td>sql:表示sql语句, RowMappr是一个接口，针对返回不同类型数据，使用这个接口进行封装 。 <code>calss&lt;T&gt;</code>:表示返回值类型</td></tr><tr><td><code>query(sql, rowMapper, class)</code></td><td>sql:表示sql语句, RowMappr是一个接口，针对返回不同类型数据，使用这个接口进行封装 。 <code>calss&lt;T&gt;</code>:表示返回值类型</td></tr></tbody></table><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(&quot;classpath:applicationContext.xml&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class JdbcTemplateCRUDTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">private JdbcTemplate jdbcTemplate;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">//聚合查询</span></span>
<span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testQueryCount(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    Long count = jdbcTemplate.queryForObject(&quot;select count(*) from account&quot;, Long.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(count);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">//查询一个</span></span>
<span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testQueryOne(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    Account account = jdbcTemplate.queryForObject(&quot;select * from account where name=?&quot;, new BeanPropertyRowMapper&lt;Account&gt;(Account.class), &quot;tom&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(account);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">//查询所有</span></span>
<span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testQueryAll(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    List&lt;Account&gt; accountList = jdbcTemplate.query(&quot;select * from account&quot;, new BeanPropertyRowMapper&lt;Account&gt;(Account.class));</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(accountList);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>09 总结 jdbcTemplate基本使用</p><p>①导入spring-jdbc和spring-tx坐标</p><p>②创建数据库表和实体</p><p>③创建JdbcTemplate对象</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">JdbcTemplate jdbcTemplate = newJdbcTemplate();</span></span>
<span class="line"><span style="color:#A6ACCD;">       jdbcTemplate.setDataSource(dataSource);</span></span></code></pre></div><p>④执行数据库操作</p><p>更新操作：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">jdbcTemplate.update (sql,params)</span></span></code></pre></div><p>查询操作：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">jdbcTemplate.query (sql,Mapper,params)</span></span></code></pre></div><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">jdbcTemplate.queryForObject(sql,Mapper,params)</span></span></code></pre></div><h2 id="二、jdbc整合案例" tabindex="-1">二、jdbc整合案例 <a class="header-anchor" href="#二、jdbc整合案例" aria-label="Permalink to &quot;二、jdbc整合案例&quot;">​</a></h2><ul><li><p>JdbcTemplate是jar包里的类，不是自己创建的。</p></li><li><p>JdbcTemplate中有个属性叫：dataSource，源码中已经为其设置了set方法，所以用的是set方法注入属性</p></li><li><p>JdbcTemplate的属性dataSource注入的正是上面数据库连接池对象，等于说把JdbcTemplate对象和数据库连接起来了</p></li></ul><h3 id="实现数据添加功能" tabindex="-1">实现数据添加功能： <a class="header-anchor" href="#实现数据添加功能" aria-label="Permalink to &quot;实现数据添加功能：&quot;">​</a></h3><p>案例分析：</p><p>1.创建dao接口和实现类</p><p>2.使用jdbcTmplate对象添加数据</p><p>3.构建service接口和实现类</p><p>4.测试运行</p><p>实现步骤：</p><p>1、创建Dao接口和实现类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface AccountDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save(Account account);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">实现类如下</span></span>
<span class="line"><span style="color:#A6ACCD;">@Repository</span></span>
<span class="line"><span style="color:#A6ACCD;">public class AccountDaoImpl implements AccountDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private JdbcTemplate jdbcTemplate;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save(Account account) {</span></span>
<span class="line"><span style="color:#A6ACCD;"> //2、调用jdbcTemplate.update(实现添加 删除 修改等)</span></span>
<span class="line"><span style="color:#A6ACCD;">        //创建添加的sql语句</span></span>
<span class="line"><span style="color:#A6ACCD;">        String sql=&quot;insert into by_account values(?,?,?)&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">       Object[] acc= {account.getId(),account.getName(),account.getMoney()};</span></span>
<span class="line"><span style="color:#A6ACCD;">        //调用jdbcTemplate.update(实现添加 删除 修改等)</span></span>
<span class="line"><span style="color:#A6ACCD;">        int update = jdbcTemplate.update(sql, acc);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //返回值添加了几行</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(update);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>3、构建service接口和方法</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface AccountService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save(Account account);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">实现类</span></span>
<span class="line"><span style="color:#A6ACCD;">@Service</span></span>
<span class="line"><span style="color:#A6ACCD;">public class AccountServiceImpl implements BookService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private BookDao bookDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save(Account account) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        bookDao.save(account);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>4、测试运行</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testadd(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    ApplicationContext ac=new ClassPathXmlApplicationContext(&quot;application.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    BookService bookService = ac.getBean(BookService.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">    Account account=new Account();</span></span>
<span class="line"><span style="color:#A6ACCD;">    account.setId(null);</span></span>
<span class="line"><span style="color:#A6ACCD;">    account.setName(&quot;xiaoli&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    account.setMoney(&quot;50000&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    bookService.save(account);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_2、修改name和money的值" tabindex="-1">2、修改name和money的值 <a class="header-anchor" href="#_2、修改name和money的值" aria-label="Permalink to &quot;2、修改name和money的值&quot;">​</a></h3><p>实现步骤</p><p>1、Dao接口添加update方法</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//修改</span></span>
<span class="line"><span style="color:#A6ACCD;">public void update(Account account);</span></span></code></pre></div><p>2、实现类进行数据编写</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Override</span></span>
<span class="line"><span style="color:#A6ACCD;">public void update(Account account) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //根据id修改name和money的值</span></span>
<span class="line"><span style="color:#A6ACCD;">    String sql=&quot;update by_account set name=? ,money=? where id=?&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    Object[] acc={account.getName(),account.getMoney(),account.getId()};</span></span>
<span class="line"><span style="color:#A6ACCD;">    int update = jdbcTemplate.update(sql, acc);</span></span>
<span class="line"><span style="color:#A6ACCD;">    if(update&gt;0){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;修改成功&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }else{</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;修改失败&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>3、service接口和实现类编写</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public void update(Account account);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@Override</span></span>
<span class="line"><span style="color:#A6ACCD;">public void update(Account account) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    bookDao.update(account);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>4、测试类编写</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testUpdate(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    ApplicationContext ac=new ClassPathXmlApplicationContext(&quot;application.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    BookService bookService = ac.getBean(BookService.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">    Account account=new Account();</span></span>
<span class="line"><span style="color:#A6ACCD;">    account.setId(&quot;3&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    account.setName(&quot;大壮&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    account.setMoney(&quot;3000&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    bookService.update(account);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>查询系列根据id查询</p><p><strong>实现步骤：</strong></p><ul><li><p>创建Dao接口方法并实现方法</p></li><li><p>实现查询逻辑</p></li><li><p>创建service方法和实现类</p></li><li><p>测试</p></li></ul><p>第一步：创建Dao接口方法并实现方法</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//查询</span></span>
<span class="line"><span style="color:#A6ACCD;">public Account findById(String id);</span></span></code></pre></div><p>第二步：实现查询逻辑</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Override</span></span>
<span class="line"><span style="color:#A6ACCD;">public Account findById(String id) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    String sql=&quot;select * from by_account where id=?&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    RowMapper&lt;Account&gt; rowMapper=new BeanPropertyRowMapper&lt;Account&gt;(Account.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">    Account account = jdbcTemplate.queryForObject(sql, rowMapper, id);</span></span>
<span class="line"><span style="color:#A6ACCD;">  //  Account account = jdbcTemplate.query(sql, rowMapper, id).get(0);</span></span>
<span class="line"><span style="color:#A6ACCD;">    return account;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>第三步：创建service方法和实现类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//查询</span></span>
<span class="line"><span style="color:#A6ACCD;">public Account findById(String id);</span></span>
<span class="line"><span style="color:#A6ACCD;">实现类：</span></span>
<span class="line"><span style="color:#A6ACCD;"> @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Account findById(String id) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        Account account = bookDao.findById(id);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return account;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>第四步：测试</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testfindById(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    ApplicationContext ac=new ClassPathXmlApplicationContext(&quot;application.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    BookService bookService = ac.getBean(BookService.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">    Account account = bookService.findById(&quot;2&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(account);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>查询所有的数据：</p><p>第一步：创建Dao方法</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public List&lt;Account&gt; findAll();</span></span></code></pre></div><p>第二步：实现逻辑</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Override</span></span>
<span class="line"><span style="color:#A6ACCD;">public List&lt;Account&gt; findAll() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    String sql=&quot;select * from by_account&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    RowMapper&lt;Account&gt; rowMapper=new BeanPropertyRowMapper&lt;Account&gt;(Account.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">    List&lt;Account&gt; list = jdbcTemplate.query(sql, rowMapper);</span></span>
<span class="line"><span style="color:#A6ACCD;">    return list;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>第三步：service接口和实现类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public List&lt;Account&gt; findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@Override</span></span>
<span class="line"><span style="color:#A6ACCD;">public List&lt;Account&gt; findAll() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    List&lt;Account&gt; list = bookDao.findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">    return list;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>第四步：构建测试类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testfindAll(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    ApplicationContext ac=new ClassPathXmlApplicationContext(&quot;application.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    BookService bookService = ac.getBean(BookService.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">    List&lt;Account&gt; list = bookService.findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (Account account : list) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(account);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,90),t=[e];function o(c,i,r,C,A,d){return a(),n("div",null,t)}const g=s(p,[["render",o]]);export{y as __pageData,g as default};
