import{_ as s,o as n,c as a,O as l}from"./chunks/framework.571309da.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/AOP案例.md","filePath":"guide/Spring/AOP案例.md","lastUpdated":1688356253000}'),p={name:"guide/Spring/AOP案例.md"},e=l(`<h3 id="_1-案例-测量业务层接口万次执行效率" tabindex="-1">1 案例-测量业务层接口万次执行效率 <a class="header-anchor" href="#_1-案例-测量业务层接口万次执行效率" aria-label="Permalink to &quot;1 案例-测量业务层接口万次执行效率&quot;">​</a></h3><p>问题导入</p><p>能描述出环绕通知里面的实现步骤</p><p>1.1 需求和分析</p><p>需求：任意业务层接口执行均可显示其执行效率（执行时长）</p><p>分析：</p><blockquote><p>①：业务功能：业务层接口执行前后分别记录时间，求差值得到执行效率 ②：通知类型选择前后均可以增强的类型——<strong>环绕通知</strong></p></blockquote><p>1.2 代码实现</p><p>【前置工作】环境准备 （在jdbcTemplate CRUD中操作）</p><ol><li><p>Spring整合JdbcTemplate对spring_db数据库中的Account进行CRUD操作</p></li><li><p>Spring整合Junit测试CRUD是否OK。</p></li><li><p>在pom.xml中添加aspectjweaver切入点表达式依赖</p></li><li><p>... ...</p></li></ol><p>【第一步】编写通知类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Component</span></span>
<span class="line"><span style="color:#A6ACCD;">@Aspect</span></span>
<span class="line"><span style="color:#A6ACCD;">public class ProjectAdvice {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //匹配业务层的所有方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Pointcut(&quot;execution(* com.by.service.*Service.*(..))&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private void servicePt(){}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //设置环绕通知，在原始操作的运行前后记录执行时间</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Around(&quot;ProjectAdvice.servicePt()&quot;) //本类类名可以省略不写</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void runSpeed(ProceedingJoinPoint pjp) throws Throwable {</span></span>
<span class="line"><span style="color:#A6ACCD;">        //获取执行的签名对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        Signature signature = pjp.getSignature();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //获取接口/类全限定名</span></span>
<span class="line"><span style="color:#A6ACCD;">        String className = signature.getDeclaringTypeName();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //获取方法名</span></span>
<span class="line"><span style="color:#A6ACCD;">        String methodName = signature.getName();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //记录开始时间</span></span>
<span class="line"><span style="color:#A6ACCD;">        long start = System.currentTimeMillis();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //执行万次操作</span></span>
<span class="line"><span style="color:#A6ACCD;">        for (int i = 0; i &lt; 10000; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">           pjp.proceed();</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        //记录结束时间</span></span>
<span class="line"><span style="color:#A6ACCD;">        long end = System.currentTimeMillis();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //打印执行结果</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;万次执行：&quot;+ className+&quot;.&quot;+methodName+&quot;----&gt;&quot; +(end-start) + &quot;ms&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>【第二步】在SpringConfig配置类上开启AOP注解功能</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Configuration</span></span>
<span class="line"><span style="color:#A6ACCD;">@ComponentScan(&quot;com.by&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">@PropertySource(&quot;classpath:jdbc.properties&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">@Import(jdbcConfig.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@EnableAspectJAutoProxy  //开启aop注解扫描</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>【第三步】运行测试类，查看结果</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(classes = SpringConfig.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private AccountService accountService;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void testFindById(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        Account account = accountService.findById(2);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void testFindAll(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;Account&gt; list = accountService.findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>运行结果：</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112ve323039cc8a330420813f634f140f601?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYxNywiaWF0IjoxNjg4MzU1ODE3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlMzIzMDM5Y2M4YTMzMDQyMDgxM2Y2MzRmMTQwZjYwMSJ9.WMGA4mEQlgEoWM1HSDj7N2BvaoxnjZFoOUpe6Lm45t8&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h3 id="_2-aop通知获取数据" tabindex="-1">2 AOP通知获取数据 <a class="header-anchor" href="#_2-aop通知获取数据" aria-label="Permalink to &quot;2 AOP通知获取数据&quot;">​</a></h3><ul><li><p>获取切入点方法的参数</p><ul><li><p>JoinPoint：适用于前置、后置、返回后、抛出异常后通知</p></li><li><p>ProceedJointPoint：适用于环绕通知</p></li></ul></li><li><p>获取切入点方法返回值</p><ul><li><p>返回后通知</p></li><li><p>环绕通知获</p></li></ul></li><li><p>取切入点方法运行异常信息</p><ul><li><p>抛出异常后通知</p></li><li><p>环绕通知</p></li></ul></li></ul><h3 id="aop切入点数据获取" tabindex="-1">AOP切入点数据获取 <a class="header-anchor" href="#aop切入点数据获取" aria-label="Permalink to &quot;AOP切入点数据获取&quot;">​</a></h3><p>问题导入</p><p>在环绕通知中可以获取到哪些数据？</p><p><strong>数据准备</strong></p><p>dao接口，dao实现类，Test测试类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface UserDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String  findName(int id);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@Component</span></span>
<span class="line"><span style="color:#A6ACCD;">public class UserDaoImpl implements UserDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String findName(int id) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;id&quot;+id);</span></span>
<span class="line"><span style="color:#A6ACCD;">       if(true)throw new NullPointerException();</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;body&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(classes = SpringConfig.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class AppTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private UserDao userDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void test(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        String name = userDao.findName(1);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(name);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p><strong>编写通知类</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Component</span></span>
<span class="line"><span style="color:#A6ACCD;">@Aspect</span></span>
<span class="line"><span style="color:#A6ACCD;">public class MyAcpectde {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Pointcut(&quot;execution(* com.by.dao.impl.UserDaoImpl.*(..))&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void pt(){</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>2.1 获取参数</p><blockquote><p>说明：在前置通知和环绕通知中都可以获取到连接点方法的参数们</p></blockquote><ul><li>JoinPoint对象描述了连接点方法的运行状态，可以获取到原始方法的调用参数</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Before(&quot;pt()&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public void before(JoinPoint jp) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    Object[] args = jp.getArgs(); //获取连接点方法的参数们</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(Arrays.toString(args));</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>ProccedJointPoint是JoinPoint的子类</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Around(&quot;pt()&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public Object around(ProceedingJoinPoint pjp) throws Throwable {</span></span>
<span class="line"><span style="color:#A6ACCD;">    Object[] args = pjp.getArgs(); //获取连接点方法的参数们</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(Arrays.toString(args));</span></span>
<span class="line"><span style="color:#A6ACCD;">    Object ret = pjp.proceed();</span></span>
<span class="line"><span style="color:#A6ACCD;">    return ret;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>2.2 获取返回值</p><blockquote><p>说明：在返回后通知和环绕通知中都可以获取到连接点方法的返回值</p></blockquote><ul><li>抛出异常后通知可以获取切入点方法中出现的异常信息，使用形参可以接收对应的异常对象</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@AfterReturning(value = &quot;pt()&quot;,returning = &quot;ret&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public void afterReturning(String ret) { //变量名要和returning=&quot;ret&quot;的属性值一致</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;afterReturning advice ...&quot;+ret);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>环绕通知中可以手工书写对原始方法的调用，得到的结果即为原始方法的返回值</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Around(&quot;pt()&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public Object around(ProceedingJoinPoint pjp) throws Throwable {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 手动调用连接点方法，返回值就是连接点方法的返回值</span></span>
<span class="line"><span style="color:#A6ACCD;">    Object ret = pjp.proceed();</span></span>
<span class="line"><span style="color:#A6ACCD;">    return ret;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>2.3 获取异常</p><blockquote><p>说明：在抛出异常后通知和环绕通知中都可以获取到连接点方法中出现的异常</p></blockquote><ul><li>抛出异常后通知可以获取切入点方法中出现的异常信息，使用形参可以接收对应的异常对象</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@AfterThrowing(value = &quot;pt()&quot;,throwing = &quot;t&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public void afterThrowing(Throwable t) {//变量名要和throwing = &quot;t&quot;的属性值一致</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;afterThrowing advice ...&quot;+ t);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>抛出异常后通知可以获取切入点方法运行的异常信息，使用形参可以接收运行时抛出的异常对象</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Around(&quot;pt()&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public Object around(ProceedingJoinPoint pjp)  {</span></span>
<span class="line"><span style="color:#A6ACCD;">    Object ret = null;</span></span>
<span class="line"><span style="color:#A6ACCD;">    //此处需要try...catch处理，catch中捕获到的异常就是连接点方法中抛出的异常</span></span>
<span class="line"><span style="color:#A6ACCD;">    try {</span></span>
<span class="line"><span style="color:#A6ACCD;">        ret = pjp.proceed();</span></span>
<span class="line"><span style="color:#A6ACCD;">    } catch (Throwable t) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        t.printStackTrace();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    return ret;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,46),t=[e];function o(c,i,r,C,A,u){return n(),a("div",null,t)}const D=s(p,[["render",o]]);export{d as __pageData,D as default};
