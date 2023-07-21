import{_ as s,o as n,c as a,O as l}from"./chunks/framework.571309da.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/MyBatis/Spring整合Mybatis.md","filePath":"guide/MyBatis/Spring整合Mybatis.md","lastUpdated":null}'),p={name:"guide/MyBatis/Spring整合Mybatis.md"},e=l(`<h3 id="_1-基于xml方式整合mybatis" tabindex="-1">1 基于xml方式整合mybatis <a class="header-anchor" href="#_1-基于xml方式整合mybatis" aria-label="Permalink to &quot;1 基于xml方式整合mybatis&quot;">​</a></h3><p>实现步骤：</p><p>1、导入相关jar包</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;dependencies&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--    mybatis相关的jar包--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;mysql&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;5.1.47&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.mybatis&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;mybatis&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;3.5.5&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;com.github.pagehelper&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;pagehelper&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;5.2.0&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;com.alibaba&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;druid&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;1.2.4&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--    spring相关的jar包--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;spring-context&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;5.3.20&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;spring-tx&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;5.3.20&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;5.3.8&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--    整合相关的jar包--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!-- mybatis和spring集成依赖 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.mybatis&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;mybatis-spring&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;2.0.5&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--    测试相关的jar包--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;junit&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;junit&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;4.13&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;scope&gt;test&lt;/scope&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">          &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">          &lt;artifactId&gt;spring-test&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">          &lt;version&gt;5.3.20&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.projectlombok&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;lombok&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;1.18.16&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--    日志相关的jar包--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;ch.qos.logback&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;logback-classic&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;1.2.11&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.logback-extensions&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;logback-ext-spring&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;0.1.5&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--SLF4J转化包 可以打印spring框架的日志--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;groupId&gt;org.slf4j&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;artifactId&gt;jcl-over-slf4j&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;version&gt;1.7.25&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/dependencies&gt;</span></span></code></pre></div><p>2、编写application配置文件加载mybatis配置</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--    配置包扫描--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;context:component-scan base-package=&quot;com.by&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--加载数据库配置文件--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;context:property-placeholder location=&quot;classpath*:jdbc.properties&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--配置数据源信息--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;bean id=&quot;dataSource&quot; class=&quot;com.alibaba.druid.pool.DruidDataSource&quot; &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;driverClassName&quot; value=&quot;\${jdbc.driver}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;url&quot; value=&quot;\${jdbc.url}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;username&quot; value=&quot;\${jdbc.username}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;password&quot; value=&quot;\${jdbc.password}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/bean&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--整合SqlSesionFactoryBean对象(通过此对象创建SqlSessionFactory)  --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;bean id=&quot;sqlSessionFactory&quot; class=&quot;org.mybatis.spring.SqlSessionFactoryBean&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;DataSource&quot; ref=&quot;dataSource&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;typeAliasesPackage&quot; value=&quot;com.by.pojo&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;MapperLocations&quot; value=&quot;classpath*:com/by/mapper/*Mapper.xml&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/bean&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!-- 配置dao接口扫描，底层会基于dao接口创建这个接口的代理对象，这个代理</span></span>
<span class="line"><span style="color:#A6ACCD;">                       对象内部会通过mybatis访问数据库 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;bean class=&quot;org.mybatis.spring.mapper.MapperScannerConfigurer&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;!-- 指定SqlSessionFactory对象的名称 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;SqlSessionFactoryBeanName&quot; value=&quot;sqlSessionFactory&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;!-- 指定基本包，dao接口所在的包名 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;BasePackage&quot; value=&quot;com.by.mapper&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/bean&gt;</span></span></code></pre></div><p>3、 编写mapper接口</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface UserMapper {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">   public List&lt;User&gt; findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span></span>
<span class="line"><span style="color:#A6ACCD;">   @Select(&quot;select * from T_user where id=#{id}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">   public User findById(Integer id);</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span></span>
<span class="line"><span style="color:#A6ACCD;">    public void update(User user);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>4、编写service接口和实现类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface UserService {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    public List&lt;User&gt; findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    public User findById(Integer id);</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void update(User user);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>实现类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Service</span></span>
<span class="line"><span style="color:#A6ACCD;">public class UserServiceImpl implements UserService{</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private UserMapper userMapper;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public List&lt;User&gt; findAll() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;User&gt; userList = userMapper.findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">        return userList;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public User findById(Integer id) {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        return userMapper.findById(id);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void update(User user) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        userMapper.update(user);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>测试运行</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(&quot;classpath:application.xml&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringMTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private UserService userService;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void SMxmltest(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;User&gt; all = userService.findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">        for (User user : all) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(user);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void smfindById(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        User byId = userService.findById(3);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(byId);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><h3 id="_2-基于纯注解整合方案" tabindex="-1">2 基于纯注解整合方案 <a class="header-anchor" href="#_2-基于纯注解整合方案" aria-label="Permalink to &quot;2 基于纯注解整合方案&quot;">​</a></h3><p>实现步骤：</p><p>1、编写mybatisconfig配置类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class MybatisConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //定义bean，SqlSessionFactoryBean，用于产生SqlSessionFactory对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    public SqlSessionFactoryBean sqlSessionFactory(DataSource dataSource){</span></span>
<span class="line"><span style="color:#A6ACCD;">        SqlSessionFactoryBean sfb=new SqlSessionFactoryBean();</span></span>
<span class="line"><span style="color:#A6ACCD;">        sfb.setTypeAliasesPackage(&quot;com.by.pojo&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        sfb.setDataSource(dataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return sfb;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //定义bean，返回MapperScannerConfigurer对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    public MapperScannerConfigurer mapperScannerConfigurer(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        MapperScannerConfigurer mscf=new MapperScannerConfigurer();</span></span>
<span class="line"><span style="color:#A6ACCD;">        mscf.setBasePackage(&quot;com.by.mapper&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return mscf;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>2、import引入到springconfig中</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Import({jdbcConfig.class,MybatisConfig.class})</span></span></code></pre></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h3>`,21),t=[e];function o(c,r,i,C,A,y){return n(),a("div",null,t)}const u=s(p,[["render",o]]);export{d as __pageData,u as default};
