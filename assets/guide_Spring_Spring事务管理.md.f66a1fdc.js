import{_ as s,o as n,c as a,O as l}from"./chunks/framework.571309da.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/Spring事务管理.md","filePath":"guide/Spring/Spring事务管理.md","lastUpdated":1688356253000}'),p={name:"guide/Spring/Spring事务管理.md"},e=l(`<h3 id="_1-spring事务简介【重点】" tabindex="-1">1 Spring事务简介【重点】 <a class="header-anchor" href="#_1-spring事务简介【重点】" aria-label="Permalink to &quot;1 Spring事务简介【重点】&quot;">​</a></h3><p>问题导入</p><p>Spring提供的事务管理是数据层的事务还是业务层的事务?</p><p>1.1 Spring事务作用</p><ul><li><p>事务作用：在数据层保障一系列的数据库操作同成功同失败</p></li><li><p>Spring事务作用：在数据层或**==业务层==**保障一系列的数据库操作同成功同失败</p></li></ul><h2 id="_2-声明式事务控制" tabindex="-1">2 声明式事务控制 <a class="header-anchor" href="#_2-声明式事务控制" aria-label="Permalink to &quot;2 声明式事务控制&quot;">​</a></h2><h2 id="_2-1-编程式事务控制相关对象" tabindex="-1">2.1 编程式事务控制相关对象 <a class="header-anchor" href="#_2-1-编程式事务控制相关对象" aria-label="Permalink to &quot;2.1 编程式事务控制相关对象&quot;">​</a></h2><h3 id="platformtransactionmanager" tabindex="-1">PlatformTransactionManager <a class="header-anchor" href="#platformtransactionmanager" aria-label="Permalink to &quot;PlatformTransactionManager&quot;">​</a></h3><p>PlatformTransactionManager 接口是 spring 的事务管理器，它里面提供了我们常用的操作事务的方法。</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112vd5027ae11e61d815ff7939084c5ed96a?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZkNTAyN2FlMTFlNjFkODE1ZmY3OTM5MDg0YzVlZDk2YSJ9.TFbz9AZPm_H6v_MOMynCyDQvRUFsgvZZjc-1ZO-MVco&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>注意：</p><p>PlatformTransactionManager 是接口类型，不同的 Dao 层技术则有不同的实现类，例如：Dao 层技术是jdbc 或 mybatis 时：org.springframework.jdbc.datasource.DataSourceTransactionManager</p><p>Dao 层技术是hibernate时：org.springframework.orm.hibernate5.HibernateTransactionManager</p><h3 id="transactiondefinition" tabindex="-1">TransactionDefinition <a class="header-anchor" href="#transactiondefinition" aria-label="Permalink to &quot;TransactionDefinition&quot;">​</a></h3><p>TransactionDefinition 是事务的定义信息对象，里面有如下方法：</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112vccd5154368264c069625ed7b87fd4ab1?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZjY2Q1MTU0MzY4MjY0YzA2OTYyNWVkN2I4N2ZkNGFiMSJ9.3nFaMNUVKDBmzpudBmKo10Z0fjKuihc3c2B2KW20-OY&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>事务隔离级别</p><p>设置隔离级别，可以解决事务并发产生的问题，如脏读、不可重复读和虚读。</p><ul><li><p>ISOLATION_DEFAULT</p></li><li><p>ISOLATION_READ_UNCOMMITTED</p></li><li><p>ISOLATION_READ_COMMITTED</p></li><li><p>ISOLATION_REPEATABLE_READ</p></li><li><p>ISOLATION_SERIALIZABLE</p></li></ul><h3 id="_2-2-什么是声明式事务控制" tabindex="-1">2.2 什么是声明式事务控制 <a class="header-anchor" href="#_2-2-什么是声明式事务控制" aria-label="Permalink to &quot;2.2 什么是声明式事务控制&quot;">​</a></h3><blockquote><p>​ Spring 的声明式事务顾名思义就是采用声明的方式来处理事务。这里所说的声明，就是指在配置文件中声明，用在 Spring 配置文件中声明式的处理事务来代替代码式的处理事务。</p></blockquote><p><strong>声明式事务处理的作用</strong></p><ul><li><p>事务管理不侵入开发的组件。具体来说，业务逻辑对象就不会意识到正在事务管理之中，事实上也应该如此，因为事务管理是属于系统层面的服务，而不是业务逻辑的一部分，如果想要改变事务管理策划的话，也只需要在定义文件中重新配置即可</p></li><li><p>在不需要事务管理的时候，只要在设定文件上修改一下，即可移去事务管理服务，无需改变代码重新编译，这样维护起来极其方便</p></li></ul><p><strong>注意：Spring 声明式事务控制底层就是AOP。</strong></p><h3 id="_2-2-1-声明式事务控制的实现" tabindex="-1">2.2.1 声明式事务控制的实现 <a class="header-anchor" href="#_2-2-1-声明式事务控制的实现" aria-label="Permalink to &quot;2.2.1 声明式事务控制的实现&quot;">​</a></h3><p>声明式事务控制明确事项：</p><ul><li><p>谁是切点？</p></li><li><p>谁是通知？</p></li><li><p>配置切面？</p></li></ul><p>2.2.2 基于xml转账业务案例：</p><p><strong>需求</strong></p><ul><li><p>需求：实现任意两个账户间转账操作</p></li><li><p>需求微缩：A账户减钱，B账户加钱</p></li></ul><p><strong>实现分析：</strong></p><ol><li><p>构建实体数据</p></li><li><p>数据层提供基础操作，指定账户减钱（outMoney），指定账户加钱（inMoney）</p></li><li><p>业务层提供转账操作（transfer），调用减钱与加钱的操作</p></li><li><p>开启注解扫描，开启事务管理</p></li><li><p>事务增强配置</p></li><li><p>配置事务 AOP 织入</p></li><li><p>测试代码运行</p></li></ol><p>结果分析：</p><ul><li><p>程序正常执行时，账户金额A减B加，没有问题</p></li><li><p>程序出现异常后，转账失败，但是异常之前操作成功，异常之后操作失败，整体业务失败</p></li></ul><p><strong>代码实现步骤</strong></p><p>1、构建实体类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Data</span></span>
<span class="line"><span style="color:#A6ACCD;">@AllArgsConstructor</span></span>
<span class="line"><span style="color:#A6ACCD;">@NoArgsConstructor</span></span>
<span class="line"><span style="color:#A6ACCD;">public class IAccount {</span></span>
<span class="line"><span style="color:#A6ACCD;">    private Integer id;</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String name;</span></span>
<span class="line"><span style="color:#A6ACCD;">    private double money;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>2、构建Dao接口及实现类，实现数据读取</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface IAccountDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //转入</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void in(String inMan,Double money);</span></span>
<span class="line"><span style="color:#A6ACCD;">    //转出</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void out(String outMan,Double money);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>实现类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Repository</span></span>
<span class="line"><span style="color:#A6ACCD;">public class IAcountDaoImpl implements IAccountDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private JdbcTemplate jdbcTemplate;</span></span>
<span class="line"><span style="color:#A6ACCD;">    //转入多少钱</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void in(String inMan, Double money) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        jdbcTemplate.update(&quot;update by_account set money=money+? where name=?&quot;,money,inMan);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    //转出多少钱</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void out(String outMan, Double money) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        jdbcTemplate.update(&quot;update by_account set money=money-? where name=? &quot;,money,outMan);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>3、构建service接口及实现类，实现数据业务逻辑处理</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface IAccountService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //转账业务方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void transfer(String inMan,String outMan,double money);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>ServiceImpl实现类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Service(&quot;iAccountService&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class IAccountServiceImpl implements IAccountService {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private IAccountDao iAccountDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void transfer(String inMan, String outMan, double money) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        iAccountDao.out(outMan,money);</span></span>
<span class="line"><span style="color:#A6ACCD;">        int i=1/0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        iAccountDao.in(inMan,money);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>4、开启注解扫描，开启事务管理</p><pre><code>命名空间修改：
</code></pre><p><img src="https://tcs-devops.aliyuncs.com/storage/112v8e713337a530bd6e5a8421364552684d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY4ZTcxMzMzN2E1MzBiZDZlNWE4NDIxMzY0NTUyNjg0ZCJ9.zILllA5eChvTLvR5K46-DP_1EAzO-kQxF-wZb-0gEwk&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>开启注解扫描</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!-- 开启注解扫描--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;context:component-scan base-package=&quot;com.by&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--加载jdbc.properties--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;context:property-placeholder location=&quot;classpath:jdbc.properties&quot; system-properties-mode=&quot;NEVER&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;bean id=&quot;dataSource&quot; class=&quot;com.alibaba.druid.pool.DruidDataSource&quot; &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;driverClassName&quot; value=&quot;\${jdbc.driver}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;url&quot; value=&quot;\${jdbc.url}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;username&quot; value=&quot;\${jdbc.username}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;password&quot; value=&quot;\${jdbc.password}&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/bean&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--    创建jdbctemplate模板对象--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;bean id=&quot;jdbcTemplate&quot; class=&quot;org.springframework.jdbc.core.JdbcTemplate&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;dataSource&quot; ref=&quot;dataSource&quot;&gt;&lt;/property&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/bean&gt;</span></span></code></pre></div><p>开启事务管理</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--开启事务--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;transactionManager&quot; class=&quot;org.springframework.jdbc.datasource.DataSourceTransactionManager&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;dataSource&quot; ref=&quot;dataSource&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span></code></pre></div><p>5、开启事务增强</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--事务增强配置--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;tx:advice id=&quot;txAdvice&quot; transaction-manager=&quot;transactionManager&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;tx:attributes&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;!--事务增强配置--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;tx:advice id=&quot;txAdvice&quot; transaction-manager=&quot;transactionManager&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;!--设置事务的属性信息--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;tx:attributes&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;!-- method 代表切入点</span></span>
<span class="line"><span style="color:#A6ACCD;">            name=”代表方法“</span></span>
<span class="line"><span style="color:#A6ACCD;">            isolation=”代表隔离级别“</span></span>
<span class="line"><span style="color:#A6ACCD;">            propagation=”传播行为“</span></span>
<span class="line"><span style="color:#A6ACCD;">            timeout=”失效时间“</span></span>
<span class="line"><span style="color:#A6ACCD;">            read-only=”是否只读“</span></span>
<span class="line"><span style="color:#A6ACCD;">        --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!-- </span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;tx:method name=&quot;transfer&quot; isolation=&quot;REPEATABLE_READ&quot; propagation=&quot;REQUIRED&quot; read-only=&quot;false&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;tx:method name=&quot;save&quot; isolation=&quot;REPEATABLE_READ&quot; propagation=&quot;REQUIRED&quot; read-only=&quot;false&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;tx:method name=&quot;find&quot; isolation=&quot;REPEATABLE_READ&quot; propagation=&quot;REQUIRED&quot; read-only=&quot;false&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;tx:method name=&quot;*&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/tx:attributes&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/tx:advice&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/tx:attributes&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/tx:advice&gt;</span></span></code></pre></div><p>6、配置事务 AOP 织入</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--    事务aop增强--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;aop:config&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">       &lt;aop:pointcut id=&quot;myPointcut&quot; expression=&quot;execution(* com.by.service.impl.*.*(..))&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;aop:advisor advice-ref=&quot;txAdvice&quot; pointcut-ref=&quot;myPointcut&quot;&gt;&lt;/aop:advisor&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;/aop:config&gt;</span></span></code></pre></div><p>7、测试代码运行</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(&quot;classpath:application.xml&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringTxTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private IAccountService iAccountService;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void TestTx(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        iAccountService.transfer(&quot;Tom&quot;,&quot;Jerry&quot;,500);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_2-3-切点方法的事务参数的配置说明" tabindex="-1">2.3 切点方法的事务参数的配置说明 <a class="header-anchor" href="#_2-3-切点方法的事务参数的配置说明" aria-label="Permalink to &quot;2.3 切点方法的事务参数的配置说明&quot;">​</a></h3><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--事务增强配置--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;tx:advice id=&quot;txAdvice&quot; transaction-manager=&quot;transactionManager&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;tx:attributes&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;tx:method name=&quot;*&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/tx:attributes&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/tx:advice&gt;</span></span></code></pre></div><p>其中，<a href="tx:method" target="_blank" rel="noreferrer">tx:method</a> 代表切点方法的事务参数的配置，例如：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;tx:method name=&quot;transfer&quot; isolation=&quot;REPEATABLE_READ&quot; propagation=&quot;REQUIRED&quot; timeout=&quot;-1&quot; read-only=&quot;false&quot;/&gt;</span></span></code></pre></div><ul><li><p>name：切点方法名称</p></li><li><p>isolation:事务的隔离级别</p></li><li><p>propogation：事务的传播行为</p></li><li><p>timeout：超时时间</p></li><li><p>read-only：是否只读</p></li></ul><h3 id="_2-4-知识要点" tabindex="-1">2.4 知识要点 <a class="header-anchor" href="#_2-4-知识要点" aria-label="Permalink to &quot;2.4 知识要点&quot;">​</a></h3><p><strong>声明式事务控制的配置要点</strong></p><ul><li><p>平台事务管理器配置</p></li><li><p>事务通知的配置</p></li><li><p>事务aop织入的配置</p></li></ul><h3 id="_2-5-基于注解事务处理案例" tabindex="-1">2.5 基于注解事务处理案例 <a class="header-anchor" href="#_2-5-基于注解事务处理案例" aria-label="Permalink to &quot;2.5 基于注解事务处理案例&quot;">​</a></h3><p><strong>代码实现：</strong></p><p>前期工作准备</p><p>1、编辑jdbcConfig配置对事务处理的加载</p><p>2、SpringConfig配置类的构建</p><p>3、使用注解@Transactional 处理业务层转账操作</p><p>4、测试运行</p><p><strong>实现步骤</strong></p><p>1、编辑jdbcConfig配置对事务处理的加载</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class JdbcConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Value(&quot;\${jdbc.driver}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String driver;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Value(&quot;\${jdbc.url}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String url;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Value(&quot;\${jdbc.username}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String userName;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Value(&quot;\${jdbc.password}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String password;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    public DataSource dataSource(){</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        DruidDataSource ds=new DruidDataSource();</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setDriverClassName(driver);</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setUrl(url);</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setUsername(userName);</span></span>
<span class="line"><span style="color:#A6ACCD;">        ds.setPassword(password);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return ds;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //配置jdbcTemplate模板对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    public JdbcTemplate jdbcTemplate(DataSource dataSource){</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        return new JdbcTemplate(dataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    public PlatformTransactionManager transactionManager(DataSource dataSource){</span></span>
<span class="line"><span style="color:#A6ACCD;">        //创建datasource支持的 事务对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        DataSourceTransactionManager transactionManager=new DataSourceTransactionManager();</span></span>
<span class="line"><span style="color:#A6ACCD;">        transactionManager.setDataSource(dataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        return transactionManager;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><pre><code>2、SpringConfig配置类的构建
</code></pre><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Configuration</span></span>
<span class="line"><span style="color:#A6ACCD;">@ComponentScan(&quot;com.by&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">@EnableAspectJAutoProxy //开启aop</span></span>
<span class="line"><span style="color:#A6ACCD;">@PropertySource(&quot;classpath:jdbc.properties&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">@Import(JdbcConfig.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">//开启注解事务驱动</span></span>
<span class="line"><span style="color:#A6ACCD;">@EnableTransactionManagement</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>3、业务层添加注解</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Repository</span></span>
<span class="line"><span style="color:#A6ACCD;">@Transactional</span></span>
<span class="line"><span style="color:#A6ACCD;">public class IAcountDaoImpl implements IAccountDao {</span></span></code></pre></div><p>4、编写测试类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(classes = SpringConfig.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringAnnTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private IAccountService service;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void Testann(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        service.transfer(&quot;Tom&quot;,&quot;Jerry&quot;,500);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_2-6-注解配置声明式事务控制解析" tabindex="-1">2.6 注解配置声明式事务控制解析 <a class="header-anchor" href="#_2-6-注解配置声明式事务控制解析" aria-label="Permalink to &quot;2.6 注解配置声明式事务控制解析&quot;">​</a></h3><p>①使用 @Transactional 在需要进行事务控制的类或是方法上修饰，注解可用的属性同 xml 配置方式，例如隔离级别、传播行为等。</p><p>②注解使用在类上，那么该类下的所有方法都使用同一套注解参数配置。</p><p>③使用在方法上，不同的方法可以采用不同的事务参数配置。</p><p>④Xml配置文件中要开启事务的注解驱动&lt;tx:annotation-driven /&gt;</p><h3 id="_3-spring事务角色【理解】" tabindex="-1">3 Spring事务角色【理解】 <a class="header-anchor" href="#_3-spring事务角色【理解】" aria-label="Permalink to &quot;3 Spring事务角色【理解】&quot;">​</a></h3><p>问题导入</p><p>什么是事务管理员，什么是事务协调员？</p><p>2.1 Spring事务角色</p><ul><li><p>事务管理员：发起事务方，在Spring中通常指代业务层开启事务的方法</p></li><li><p>事务协调员：加入事务方，在Spring中通常指代数据层方法，也可以是业务层方法</p></li></ul><p><img src="https://tcs-devops.aliyuncs.com/storage/112v057381003c90bc09fa1ace0dba06fa1b?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYwNTczODEwMDNjOTBiYzA5ZmExYWNlMGRiYTA2ZmExYiJ9.Kw2bbReCJwoCL_lOqTCEjR6YPS_ti_o0czoapgglkmk&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h3 id="_4-spring事务相关配置" tabindex="-1">4 Spring事务相关配置 <a class="header-anchor" href="#_4-spring事务相关配置" aria-label="Permalink to &quot;4 Spring事务相关配置&quot;">​</a></h3><p>问题导入</p><p>什么样的异常，Spring事务默认是不进行回滚的？</p><p>3.1 事务配置</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v4bdff0889bab8b3bce785e1b7f38b141?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY0YmRmZjA4ODliYWI4YjNiY2U3ODVlMWI3ZjM4YjE0MSJ9.sHwZMAmzl5Unk1-1E5m4MwuNqVu2JxKCZWqmnyXAE1E&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><blockquote><p>说明：对于RuntimeException类型异常或者Error错误，Spring事务能够进行回滚操作。但是对于编译器异常，Spring事务是不进行回滚的，所以需要使用rollbackFor来设置要回滚的异常。</p></blockquote><p>3.2 案例：转账业务追加日志</p><p>需求和分析</p><ul><li><p>需求：实现任意两个账户间转账操作，并对每次转账操作在数据库进行留痕</p></li><li><p>需求微缩：A账户减钱，B账户加钱，数据库记录日志</p></li><li><p>分析：①：基于转账操作案例添加日志模块，实现数据库中记录日志②：业务层转账操作（transfer），调用减钱、加钱与记录日志功能</p></li><li><p>实现效果预期： 无论转账操作是否成功，均进行转账操作的日志留痕</p></li><li><p>存在的问题： 日志的记录与转账操作隶属同一个事务，同成功同失败</p></li><li><p>实现效果预期改进： 无论转账操作是否成功，日志必须保留</p></li><li><p>事务传播行为：事务协调员对事务管理员所携带事务的处理态度</p></li></ul><p><img src="https://tcs-devops.aliyuncs.com/storage/112ve768c65474de125ba99f3d1c2f2a0af8?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlNzY4YzY1NDc0ZGUxMjViYTk5ZjNkMWMyZjJhMGFmOCJ9.2X5i4_lt0EthdSaPcxplqnO2depBhjYEUgTBl6353XE&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>【准备工作】环境整备</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">USE spring_db;</span></span>
<span class="line"><span style="color:#A6ACCD;">CREATE TABLE tbl_log(</span></span>
<span class="line"><span style="color:#A6ACCD;">    id INT PRIMARY KEY AUTO_INCREMENT,</span></span>
<span class="line"><span style="color:#A6ACCD;">    info VARCHAR(255),</span></span>
<span class="line"><span style="color:#A6ACCD;">    createDate DATE</span></span>
<span class="line"><span style="color:#A6ACCD;">);</span></span></code></pre></div><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//logDao 接口</span></span>
<span class="line"><span style="color:#A6ACCD;">public interface LogDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void log(Log log);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">//Log Impl实现类</span></span>
<span class="line"><span style="color:#A6ACCD;">@Repository</span></span>
<span class="line"><span style="color:#A6ACCD;">public class LogDaoImpl implements LogDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private JdbcTemplate jdbcTemplate;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void log(Log l) {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        String sql=&quot;insert into tbl_log (info,createDate) values(info=?,createDate=?)&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">        Object[] obj={l.getInfo(),l.getCreateDate()};</span></span>
<span class="line"><span style="color:#A6ACCD;">        int update = jdbcTemplate.update(sql,obj);</span></span>
<span class="line"><span style="color:#A6ACCD;">        if(update&gt;0){</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(&quot;成功&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">//service 接口 和实现类</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">public interface LogService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //propagation设置事务属性：传播行为设置为当前操作需要新事务</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Transactional</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void log(String outMon, String inMon, Double money);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@Service</span></span>
<span class="line"><span style="color:#A6ACCD;">public class LogServiceImpl implements LogService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private LogDao logDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void log(String outMon, String inMon, Double money) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        Log l=new Log();</span></span>
<span class="line"><span style="color:#A6ACCD;">        l.setInfo(&quot;转账操作由&quot;+outMon+&quot;到&quot;+inMon+&quot;金额：&quot;+money);</span></span>
<span class="line"><span style="color:#A6ACCD;">        l.setCreateDate(new Date());</span></span>
<span class="line"><span style="color:#A6ACCD;">        logDao.log(l);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><p>【第一步】在AccountServiceImpl中调用logService中添加日志的方法</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Service</span></span>
<span class="line"><span style="color:#A6ACCD;">public class IAccountServiceImpl implements IAccountService {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private IAccountDao iAccountDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private LogService logService;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void transfer(String outMan, String inMan , double money) throws IOException{</span></span>
<span class="line"><span style="color:#A6ACCD;">        try{</span></span>
<span class="line"><span style="color:#A6ACCD;">        iAccountDao.out(outMan,money);</span></span>
<span class="line"><span style="color:#A6ACCD;">        int i=1/0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        iAccountDao.in(inMan,money);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }finally {</span></span>
<span class="line"><span style="color:#A6ACCD;">        logService.log(outMan,inMan,money);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>【第二步】在LogService的log()方法上设置事务的传播行为</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface LogService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //propagation设置事务属性：传播行为设置为当前操作需要新事务</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Transactional(propagation = Propagation.REQUIRES_NEW)</span></span>
<span class="line"><span style="color:#A6ACCD;">    void log(String outMon, String inMon, Double money);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>【第三步】运行测试类，查看结果</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(classes = SpringConfig.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringAnnTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private IAccountService service;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void testTransfer() throws IOException {</span></span>
<span class="line"><span style="color:#A6ACCD;">    service.transfer(&quot;Tom&quot;,&quot;Jerry&quot;,500);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>3.3 事务传播行为</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v584e9af02c6940000fd86bdfce0cb01d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYyMywiaWF0IjoxNjg4MzU1ODIzLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY1ODRlOWFmMDJjNjk0MDAwMGZkODZiZGZjZTBjYjAxZCJ9.G42V8ZJf1VaW1A4GOcjOYEVR0O4NRWJ9LNgRXARBbNI&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p>`,114),o=[e];function t(c,i,r,C,A,u){return n(),a("div",null,o)}const D=s(p,[["render",t]]);export{d as __pageData,D as default};
