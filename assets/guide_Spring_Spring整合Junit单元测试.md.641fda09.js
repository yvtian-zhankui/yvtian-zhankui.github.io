import{_ as s,o as n,c as a,O as t}from"./chunks/framework.571309da.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/Spring整合Junit单元测试.md","filePath":"guide/Spring/Spring整合Junit单元测试.md"}'),l={name:"guide/Spring/Spring整合Junit单元测试.md"},p=t(`<p>3.1 原始Junit测试Spring的问题</p><p>在测试类中，每个测试方法都有以下两行代码：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ApplicationContext ac = new ClassPathXmlApplicationContext(&quot;application.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"> BookDao bookDao =(BookDao)ac.getBean(&quot;bookDao&quot;);</span></span></code></pre></div><p>这两行代码的作用是获取容器，如果不写的话，直接会提示空指针异常。所以又不能轻易删掉。</p><h3 id="_3-2-上述问题解决思路" tabindex="-1">3.2 上述问题解决思路 <a class="header-anchor" href="#_3-2-上述问题解决思路" aria-label="Permalink to &quot;3.2 上述问题解决思路&quot;">​</a></h3><p>让SpringJunit负责创建Spring容器，但是需要将配置文件的名称告诉它</p><p>将需要进行测试Bean直接在测试类中进行注入</p><h3 id="_3-3-spring集成junit步骤" tabindex="-1">3.3 Spring集成Junit步骤 <a class="header-anchor" href="#_3-3-spring集成junit步骤" aria-label="Permalink to &quot;3.3 Spring集成Junit步骤&quot;">​</a></h3><p>①导入spring集成Junit的坐标</p><p>②使用@Runwith注解替换原来的运行期</p><p>③使用@ContextConfiguration指定配置文件或配置类</p><p>④使用@Autowired注入需要测试的对象</p><p>⑤创建测试方法进行测试</p><p>【第一步】导入整合的依赖坐标spring-test</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--junit--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;groupId&gt;junit&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;artifactId&gt;junit&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;version&gt;4.12&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--spring整合junit--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;artifactId&gt;spring-test&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;version&gt;5.1.9.RELEASE&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span></code></pre></div><p>【第二，三，四步】加载配置文件或者配置类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//【第二步】使用Spring整合Junit专用的类加载器</span></span>
<span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">//【第三步】加载配置文件或者配置类</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(classes = {SpringConfiguration.class}) //加载配置类</span></span>
<span class="line"><span style="color:#A6ACCD;">//@ContextConfiguration(locations={&quot;classpath:applicationContext.xml&quot;})//加载配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">public class AccountServiceTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //支持自动装配注入bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private AccountService accountService;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void testFindById(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(accountService.findById(1));</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void testFindAll(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(accountService.findAll());</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>==注意：junit的依赖至少要是4.12版本,可以是4.13等版本,否则出现如下异常：==</strong></p><p><img src="https://tcs-devops.aliyuncs.com/storage/112vd3cfccf343e9705e169746559242142a?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODYwMzUyNywiaWF0IjoxNjg3OTk4NzI3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZkM2NmY2NmMzQzZTk3MDVlMTY5NzQ2NTU5MjQyMTQyYSJ9.BA_Ha3IBwEymgYJ75jNaqdqXCOqtwaevcGLEsAZcwmI&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h3 id="_4-junit断言测试" tabindex="-1">4 junit断言测试： <a class="header-anchor" href="#_4-junit断言测试" aria-label="Permalink to &quot;4 junit断言测试：&quot;">​</a></h3><p>JUnit为所有原语类型、对象和数组（原语或对象）提供重载断言方法。参数顺序为预期值后接实际值。或者，第一个参数可以是失败时输出的字符串消息。</p><p>4.1 断言的方法：</p><table><thead><tr><th>void assertEquals(String message, expected value, actual value)</th><th>断言两个值相等。值可能是类型有 int, short, long, byte, char ,Object. 第一个参数是一个可选的字符串消息 如果预期值与真实值相等，则运行success，反之Failure</th></tr></thead><tbody><tr><td>void assertTrue(String message, boolean condition)</td><td>断言一个条件为真</td></tr><tr><td>void assertFalse(String message,boolean condition)</td><td>断言一个条件为假</td></tr><tr><td>assertTrue(String message, expected value, actual value)</td><td>如果为 true，则运行 success，反之 Failure</td></tr></tbody></table><p>4.2 入门例子</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">String str=&quot;abcde&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">String str1=&quot;abcde&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">assertEquals(str,str1);</span></span>
<span class="line"><span style="color:#A6ACCD;">assertTrue(str.startsWith(&quot;ab&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">assertTrue(str.endsWith(&quot;de&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">//list集合操作断言</span></span>
<span class="line"><span style="color:#A6ACCD;">List&lt;String&gt; list= Arrays.asList(&quot;a&quot;,&quot;b&quot;,&quot;c&quot;,&quot;d&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">System.out.println(list.toString());</span></span>
<span class="line"><span style="color:#A6ACCD;">assertEquals(&quot;a&quot;,list.get(0));</span></span>
<span class="line"><span style="color:#A6ACCD;">assertEquals(4,list.size());</span></span>
<span class="line"><span style="color:#A6ACCD;">assertEquals(&quot;d&quot;,list.get(list.size()-1));</span></span>
<span class="line"><span style="color:#A6ACCD;">//集合操作断言</span></span>
<span class="line"><span style="color:#A6ACCD;">Map&lt;String,Object&gt; map=new HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">map.put(&quot;A&quot;, 1);</span></span>
<span class="line"><span style="color:#A6ACCD;">map.put(&quot;B&quot;, 2);</span></span>
<span class="line"><span style="color:#A6ACCD;">map.put(&quot;C&quot;, 3);</span></span>
<span class="line"><span style="color:#A6ACCD;">Set&lt;String&gt; set = map.keySet();</span></span>
<span class="line"><span style="color:#A6ACCD;">//assertEquals 如果预期值与真实值相等，则运行success，反之Failure</span></span>
<span class="line"><span style="color:#A6ACCD;">//assertEquals 运行Failure会有错误提示，提示预期值是xxx，而实际值是xxx。容易调式</span></span>
<span class="line"><span style="color:#A6ACCD;">assertEquals(3, map.size());</span></span>
<span class="line"><span style="color:#A6ACCD;">//检查是否包含A B C</span></span>
<span class="line"><span style="color:#A6ACCD;">//assertTrue 如果为 true，则运行 success，反之 Failure</span></span>
<span class="line"><span style="color:#A6ACCD;">assertTrue(set.containsAll(Arrays.asList(&quot;A&quot;, &quot;B&quot;, &quot;C&quot;)));</span></span></code></pre></div><p><strong>4.3案例操作dao</strong></p><p><strong>查询所有断言测试</strong></p><p><strong>第一步：在测试类里面注入Dao对象</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">private AccountDao accountDao;</span></span></code></pre></div><p><strong>第二步：构建测试方法</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testDaofindAll(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;测试查询所有&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    assertEquals(2,accountDao.findAll().size());</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p><strong>添加操作断言测试</strong></p><p><strong>构建测试方法</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">@Rollback</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testDaoadd(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    Account account=new Account();</span></span>
<span class="line"><span style="color:#A6ACCD;">    account.setId(null);</span></span>
<span class="line"><span style="color:#A6ACCD;">    account.setName(&quot;测试新增&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    account.setMoney(&quot;12345&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    assertEquals(1,accountDao.save(account));</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>删除操作断言测试</strong></p><p><strong>构建测试方法</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testDel(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;断言测试删除&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    assertEquals(1,accountDao.delete(3));</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>案例导入</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 直接在service查询里面构建就可以</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">assumeTrue(&quot;结果不是false&quot;,false);</span></span>
<span class="line"><span style="color:#A6ACCD;">assumeFalse(&quot;结果不是true&quot;,false);</span></span></code></pre></div>`,39),e=[p];function o(c,i,r,C,u,A){return n(),a("div",null,e)}const y=s(l,[["render",o]]);export{g as __pageData,y as default};
