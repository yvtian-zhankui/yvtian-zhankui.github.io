import{_ as s,o as n,c as a,O as p}from"./chunks/framework.571309da.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/Aop基于xml和注解应用.md","filePath":"guide/Spring/Aop基于xml和注解应用.md","lastUpdated":1688518267000}'),l={name:"guide/Spring/Aop基于xml和注解应用.md"},e=p(`<p>基于 XML 的 AOP 开发</p><p>问题导入</p><p>问题1：在通知方法中如何定义切入点表达式？</p><p>问题2：如何配置切面？</p><p>问题3：在配置类上如何开启AOP注解功能？</p><p>2.1 快速入门</p><p>①导入 AOP 相关坐标</p><p>②创建目标接口和目标类（内部有切点）</p><p>③创建切面类（内部有增强方法）</p><p>④将目标类和切面类的对象创建权交给 spring</p><p>⑤在 applicationContext.xml 中配置织入关系</p><p>⑥测试代码</p><p>2.1.1实现步骤</p><p><strong>第一步</strong> 导入 AOP 相关坐标</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--导入spring的context坐标，context依赖aop--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;artifactId&gt;spring-context&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;version&gt;5.0.5.RELEASE&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!-- aspectj的织入 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;groupId&gt;org.aspectj&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;artifactId&gt;aspectjweaver&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;version&gt;1.8.13&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span></code></pre></div><p><strong>第二步</strong> 创建目标接口和目标类（内部有切点）</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/*</span></span>
<span class="line"><span style="color:#A6ACCD;">    目标接口</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">public interface TargetInterface {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void method();</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@Component</span></span>
<span class="line"><span style="color:#A6ACCD;">public class Terget implements TargetInterface {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void method() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;Target 正在运行中....&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>第三步</strong> 创建切面类（内部有增强方法）</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class MyAspect {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //前置增强方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void before(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;前置代码增强.....&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>导入aop命名空间</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112vfa9fd1a8048d38f7709476b7ffe21a1d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYwMSwiaWF0IjoxNjg4MzU1ODAxLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZmYTlmZDFhODA0OGQzOGY3NzA5NDc2YjdmZmUyMWExZCJ9.i0KAGEmPrTDn4GkJNvhmE5vtDuKID5mht2teKFKQZr0&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><div class="language-xml"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">beans</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">xmlns</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://www.springframework.org/schema/beans</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">       </span><span style="color:#C792EA;">xmlns</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">xsi</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://www.w3.org/2001/XMLSchema-instance</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">       </span><span style="color:#C792EA;">xmlns</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">aop</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://www.springframework.org/schema/aop</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">       </span><span style="color:#C792EA;">xmlns</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">context</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://www.springframework.org/schema/context</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">       </span><span style="color:#C792EA;">xsi</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">schemaLocation</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">            http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd</span></span>
<span class="line"><span style="color:#C3E88D;">            http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd</span></span>
<span class="line"><span style="color:#C3E88D;">            http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">beans</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p><strong>第四步</strong> 在 applicationContext.xml 中配置织入关系</p><p>配置切点表达式和前置增强的织入关系</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;aop:config&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--引用myAspect的Bean为切面对象--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;aop:aspect ref=&quot;myAspect&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;!--配置Target的method方法执行时要进行myAspect的before方法前置增强--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;aop:before method=&quot;before&quot; pointcut=&quot;execution(public void com.by.aop.Target.method())&quot;&gt;&lt;/aop:before&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/aop:aspect&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/aop:config&gt;</span></span></code></pre></div><p><strong>第六步</strong> 测试代码</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(&quot;classpath:applicationContext.xml&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class AopTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private TargetInterface target;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void test1(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        target.method();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>2.2 XML 配置 AOP 详解</p><ol><li>切点表达式的写法</li></ol><p>表达式语法：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">execution([修饰符] 返回值类型 包名.类名.方法名(参数))</span></span></code></pre></div><ul><li><p>访问修饰符可以省略</p></li><li><p>返回值类型、包名、类名、方法名可以使用星号* 代表任意</p></li><li><p>包名与类名之间一个点 . 代表当前包下的类，两个点 .. 表示当前包及其子包下的类</p></li><li><p>参数列表可以使用两个点 .. 表示任意个数，任意类型的参数列表</p></li></ul><p>例如：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">execution(public void com.by.aop.Target.method())   </span></span>
<span class="line"><span style="color:#A6ACCD;">execution(void com.by.aop.Target.*(..))</span></span>
<span class="line"><span style="color:#A6ACCD;">execution(* com.by.aop.*.*(..))</span></span>
<span class="line"><span style="color:#A6ACCD;">execution(* com.by.aop..*.*(..))</span></span>
<span class="line"><span style="color:#A6ACCD;">execution(* *..*.*(..))</span></span></code></pre></div><ol start="2"><li>通知的类型</li></ol><p>通知的配置语法：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;aop:通知类型 method=“切面类中方法名” pointcut=“切点表达式&quot;&gt;&lt;/aop:通知类型&gt;</span></span></code></pre></div><p><img src="https://tcs-devops.aliyuncs.com/storage/112v7b11ff0d66495105301a63e49e7f69ca?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYwMSwiaWF0IjoxNjg4MzU1ODAxLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY3YjExZmYwZDY2NDk1MTA1MzAxYTYzZTQ5ZTdmNjljYSJ9.cuoINzza5KdGZzzEgHvlRMaH4P7UYEQ_jgPNLfmcBFM&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><ol start="3"><li>切点表达式的抽取</li></ol><p>当多个增强的切点表达式相同时，可以将切点表达式进行抽取，在增强中使用 pointcut-ref 属性代替 pointcut 属性来引用抽取后的切点表达式。</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;aop:config&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--引用myAspect的Bean为切面对象--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;aop:aspect ref=&quot;myAspect&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;aop:pointcut id=&quot;myPointcut&quot; expression=&quot;execution(* com.by.aop.*.*(..))&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;aop:before method=&quot;before&quot; pointcut-ref=&quot;myPointcut&quot;&gt;&lt;/aop:before&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/aop:aspect&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/aop:config&gt;</span></span></code></pre></div><p>2.3 知识要点</p><ul><li>aop织入的配置</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;aop:config&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;aop:aspect ref=“切面类”&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;aop:before method=“通知方法名称” pointcut=“切点表达式&quot;&gt;&lt;/aop:before&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/aop:aspect&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/aop:config&gt;</span></span></code></pre></div><ul><li><p>通知的类型：前置通知、后置通知、环绕通知、异常抛出通知、最终通知</p></li><li><p>切点表达式的写法：</p></li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">execution([修饰符] 返回值类型 包名.类名.方法名(参数))</span></span></code></pre></div><h3 id="_3-基于注解的-aop-开发" tabindex="-1">3.基于注解的 AOP 开发 <a class="header-anchor" href="#_3-基于注解的-aop-开发" aria-label="Permalink to &quot;3.基于注解的 AOP 开发&quot;">​</a></h3><p>3.1 AOP案例思路分析</p><ul><li><p>案例设定：测定接口执行效率</p></li><li><p>简化设定：在接口执行前输出当前系统时间</p></li><li><p>开发模式：XML or <strong>==注解==</strong></p></li><li><p>思路分析：</p><ul><li><p>导入坐标（pom.xml）</p></li><li><p>制作连接点方法（原始操作，dao接口与实现类）</p></li><li><p>制作共性功能 （通知类与通知）</p></li><li><p>定义切入点</p></li><li><p>绑定切入点与通知关系（切面）</p></li></ul></li></ul><p>3.2 AOP入门案例实现</p><p>【第二步】定义dao接口与实现类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface BookDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save();</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void update();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@Repository</span></span>
<span class="line"><span style="color:#A6ACCD;">public class BookDaoImpl implements BookDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(System.currentTimeMillis());</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book dao save ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void update() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book dao update ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>【第三步】定义通知类，制作通知方法</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//通知类必须配置成Spring管理的bean</span></span>
<span class="line"><span style="color:#A6ACCD;">@Component</span></span>
<span class="line"><span style="color:#A6ACCD;">public class MyAdvice {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void method(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(System.currentTimeMillis());</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>【第四步】定义切入点表达式、配置切面(绑定切入点与通知关系)</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//通知类必须配置成Spring管理的bean</span></span>
<span class="line"><span style="color:#A6ACCD;">@Component</span></span>
<span class="line"><span style="color:#A6ACCD;">//设置当前类为切面类类</span></span>
<span class="line"><span style="color:#A6ACCD;">@Aspect</span></span>
<span class="line"><span style="color:#A6ACCD;">public class MyAdvice {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //设置切入点，@Pointcut注解要求配置在方法上方</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Pointcut(&quot;execution(void com.by.dao.BookDao.save())&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void pt(){</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    //设置在切入点pt()的前面运行当前操作(前置通知)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Before(&quot;pt()&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void method(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(System.currentTimeMillis());</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><img src="https://tcs-devops.aliyuncs.com/storage/112vf8179df81cdb016cc06fc26f0cdb9c40?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYwMSwiaWF0IjoxNjg4MzU1ODAxLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZmODE3OWRmODFjZGIwMTZjYzA2ZmMyNmYwY2RiOWM0MCJ9.dnKwiidTPwemGAAKz3GJvYWOM5jaryHDBvoN11SdnxM&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>【第五步】在配置类中进行Spring注解包扫描和开启AOP功能</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Configuration</span></span>
<span class="line"><span style="color:#A6ACCD;">@ComponentScan(&quot;com.by&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">//开启注解开发AOP功能</span></span>
<span class="line"><span style="color:#A6ACCD;">@EnableAspectJAutoProxy</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>测试类和运行结果</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class App {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        BookDao bookDao = ctx.getBean(BookDao.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        bookDao.update();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><img src="https://tcs-devops.aliyuncs.com/storage/112v6860092f1998ea5627e5d1a6cf3a66c8?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYwMSwiaWF0IjoxNjg4MzU1ODAxLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY2ODYwMDkyZjE5OThlYTU2MjdlNWQxYTZjZjNhNjZjOCJ9.zHKRhaB0e7OILbP4n03b3gdThxTmH4meBJ-irQvZYrA&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h3 id="_4-注解-配置文件结合案例" tabindex="-1">4 注解+配置文件结合案例 <a class="header-anchor" href="#_4-注解-配置文件结合案例" aria-label="Permalink to &quot;4  注解+配置文件结合案例&quot;">​</a></h3><p>基于注解+配置的aop开发步骤：</p><p>①创建目标接口和目标类（内部有切点）</p><p>②创建切面类（内部有增强方法）</p><p>③将目标类和切面类的对象创建权交给 spring</p><p>④在切面类中使用注解配置织入关系</p><p>⑤在配置文件中开启组件扫描和 AOP 的自动代理</p><p>⑥测试</p><p>4.1 AOP入门案例实现</p><p><strong>第一步</strong> 创建目标接口和目标类（内部有切点）</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface TargetInterface {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void method();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">public class Target implements TargetInterface {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void method() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;Target running....&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>第二步</strong> 创建切面类（内部有增强方法)</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class MyAspect {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //前置增强方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void before(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;前置代码增强.....&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>第三步</strong> 将目标类和切面类的对象创建权交给 spring</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Component(&quot;target&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class Target implements TargetInterface {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void method() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;Target running....&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">@Component(&quot;myAspect&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class MyAspect {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void before(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;前置代码增强.....&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>第四步</strong> 在切面类中使用注解配置织入关系</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Component(&quot;myAspect&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">@Aspect</span></span>
<span class="line"><span style="color:#A6ACCD;">public class MyAspect {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Before(&quot;execution(* com.by.aop.*.*(..))&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void before(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;前置代码增强.....&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>第五步</strong> 在配置文件中开启组件扫描和 AOP 的自动代理</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--组件扫描--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;context:component-scan base-package=&quot;com.by.aop&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--aop的自动代理--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;aop:aspectj-autoproxy&gt;&lt;/aop:aspectj-autoproxy&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><p><strong>第六步</strong> 测试代码</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(&quot;classpath:applicationContext.xml&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class AopTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private TargetInterface target;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void test1(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        target.method();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>第七步</strong> 测试结果</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112vc5feb64d949dd6eb5506f3d8f8bc054a?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYwMSwiaWF0IjoxNjg4MzU1ODAxLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZjNWZlYjY0ZDk0OWRkNmViNTUwNmYzZDhmOGJjMDU0YSJ9.OaiubKX49cOu23DuwNmhkm666r-i0OXQlmh5ZsLWcec&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h3 id="_5-aop工作流程【理解】" tabindex="-1">5 AOP工作流程【理解】 <a class="header-anchor" href="#_5-aop工作流程【理解】" aria-label="Permalink to &quot;5 AOP工作流程【理解】&quot;">​</a></h3><p>问题导入</p><p>什么是目标对象？什么是代理对象？</p><p>5.1 AOP工作流程</p><ol><li><p>Spring容器启动</p></li><li><p>读取所有切面配置中的切入点</p></li><li><p>初始化bean，判定bean对应的类中的方法是否匹配到任意切入点</p><ol><li><p>匹配失败，创建原始对象</p></li><li><p>匹配成功，创建原始对象（目标对象）的代理对象</p></li></ol></li><li><p>获取bean执行方法</p><ol><li><p>获取的bean是原始对象时，调用方法并执行，完成操作</p></li><li><p>获取的bean是代理对象时，根据代理对象的运行模式运行原始方法与增强的内容，完成操作</p></li></ol></li></ol><p>5.2 AOP核心概念</p><p>目标对象（Target）：被代理的对象，也叫原始对象，该对象中的方法没有任何功能增强。代理对象（Proxy）：代理后生成的对象，由Spring帮我们创建代理对象。</p><p>5.3 在测试类中验证代理对象</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class App {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        BookDao bookDao = ctx.getBean(BookDao.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        bookDao.update();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //打印对象的类名</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(bookDao.getClass());</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><img src="https://tcs-devops.aliyuncs.com/storage/112v09206a0718cd818998c6df4eb14a9174?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODk2MDYwMSwiaWF0IjoxNjg4MzU1ODAxLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYwOTIwNmEwNzE4Y2Q4MTg5OThjNmRmNGViMTRhOTE3NCJ9.s944r5o9XQcTEZveBsmzFh5NcQYYS52Bae5Wl4mnrNY&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>回顾切入点表达式</p><p>6.1 语法格式</p><ul><li><p>切入点：要进行增强的方法</p></li><li><p>切入点表达式：要进行增强的方法的描述方式execution(void com.by.dao.BookDao.update())execution(void com.by.dao.impl.BookDaoImpl.update())</p><ul><li><p>描述方式一：执行com.by.dao包下的BookDao接口中的无参数update方法</p></li><li><p>描述方式二：执行com.by.dao.impl包下的BookDaoImpl类中的无参数update方法</p></li></ul></li><li><p>切入点表达式标准格式：动作关键字(访问修饰符 返回值 包名.类/接口名.方法名(参数) 异常名）execution(public User com.by.service.UserService.findById(int))</p><ul><li><p>动作关键字：描述切入点的行为动作，例如execution表示执行到指定切入点</p></li><li><p>访问修饰符：public，private等，可以省略</p></li><li><p>返回值：写返回值类型</p></li><li><p>包名：多级包使用点连接</p></li><li><p>类/接口名：</p></li><li><p>方法名：</p></li><li><p>参数：直接写参数的类型，多个类型用逗号隔开</p></li><li><p>异常名：方法定义中抛出指定异常，可以省略</p></li></ul></li></ul><p>6.2 通配符</p><blockquote><p>目的：可以使用通配符描述切入点，快速描述。</p></blockquote><ul><li>：单个独立的任意符号，可以独立出现，也可以作为前缀或者后缀的匹配符出现</li></ul><blockquote><p>匹配com.by包下的任意包中的UserService类或接口中所有find开头的带有一个参数的方法</p></blockquote><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">execution（</span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> com</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">by</span><span style="color:#89DDFF;">.*.</span><span style="color:#A6ACCD;">UserService</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">find</span><span style="color:#89DDFF;">*(*)</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><ul><li>.. ：多个连续的任意符号，可以独立出现，常用于简化包名与参数的书写</li></ul><blockquote><p>匹配com包下的任意包中的UserService类或接口中所有名称为findById的方法</p></blockquote><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">execution（</span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">User</span><span style="color:#A6ACCD;"> com</span><span style="color:#89DDFF;">..</span><span style="color:#A6ACCD;">UserService</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">findById</span><span style="color:#89DDFF;">(..)</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><ul><li>+：专用于匹配子类类型</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">execution(* *..*Service+.*(..))</span></span></code></pre></div><p>6.3 书写技巧</p><ul><li><p>所有代码按照标准规范开发，否则以下技巧全部失效</p></li><li><p>描述切入点通**==常描述接口==**，而不描述实现类</p></li><li><p>访问控制修饰符针对接口开发均采用public描述（<strong>==可省略访问控制修饰符描述==</strong>）</p></li><li><p>返回值类型对于增删改类使用精准类型加速匹配，对于查询类使用*通配快速描述</p></li><li><p><strong>==包名==<strong>书写</strong>==尽量不使用..匹配==</strong>，效率过低，常用*做单个包描述匹配，或精准匹配</p></li><li><p><strong>==接口名/类名==<strong>书写名称与模块相关的</strong>==采用*匹配==</strong>，例如UserService书写成*Service，绑定业务层接口名</p></li><li><p><strong>==方法名==<strong>书写以</strong>==动词==<strong>进行</strong>==精准匹配==</strong>，名词采用<em>匹配，例如getById书写成getBy</em>,selectAll书写成selectAll</p></li><li><p>参数规则较为复杂，根据业务方法灵活调整</p></li><li><p>通常**==不使用异常==<strong>作为</strong>==匹配==**规则</p></li></ul>`,110),o=[e];function t(c,i,r,C,A,y){return n(),a("div",null,o)}const u=s(l,[["render",t]]);export{g as __pageData,u as default};
