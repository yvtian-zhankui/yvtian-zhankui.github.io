import{_ as s,o as a,c as n,O as l}from"./chunks/framework.571309da.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/Bean的生命周期（了解）.md","filePath":"guide/Spring/Bean的生命周期（了解）.md","lastUpdated":1688288112000}'),o={name:"guide/Spring/Bean的生命周期（了解）.md"},p=l(`<p>问题导入</p><p>问题1：多例的Bean能够配置并执行销毁的方法？</p><p>问题2：如何做才执行Bean销毁的方法？</p><h3 id="_1-生命周期相关概念介绍" tabindex="-1">1 生命周期相关概念介绍 <a class="header-anchor" href="#_1-生命周期相关概念介绍" aria-label="Permalink to &quot;1 生命周期相关概念介绍&quot;">​</a></h3><ul><li><p>生命周期：从创建到消亡的完整过程</p></li><li><p>bean生命周期：bean从创建到销毁的整体过程</p></li><li><p>bean生命周期控制：在bean创建后到销毁前做一些事情</p></li></ul><h3 id="_2-代码演示" tabindex="-1">2 代码演示 <a class="header-anchor" href="#_2-代码演示" aria-label="Permalink to &quot;2 代码演示&quot;">​</a></h3><p>2.1 Bean生命周期控制</p><ul><li>提供生命周期控制方法</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class BookDaoImpl implements BookDao {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book dao save ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    //表示bean初始化对应的操作</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void init(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;init...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    //表示bean销毁前对应的操作</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void destory(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;destory...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>applicationContext.xml配置</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--init-method：设置bean初始化生命周期回调函数,此处填写init方法名--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--destroy-method：设置bean销毁生命周期回调函数，仅适用于单例对象，此处填写destory方法名--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;bookDao&quot; class=&quot;com.by.dao.impl.BookDaoImpl&quot; init-method=&quot;init&quot; destroy-method=&quot;destory&quot;/&gt;</span></span></code></pre></div><ul><li>测试类</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class AppForLifeCycle {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static void main( String[] args ) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        //此处需要使用实现类类型，接口类型没有close方法</span></span>
<span class="line"><span style="color:#A6ACCD;">        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;applicationContext.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        BookDao bookDao = (BookDao) ctx.getBean(&quot;bookDao&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        bookDao.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //关闭容器，执行销毁的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">        ctx.close();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>执行结果</strong></p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v02070e6f2e9b41c29763ccf068b787fc?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzODA5MiwiaWF0IjoxNjg3OTMzMjkyLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYwMjA3MGU2ZjJlOWI0MWMyOTc2M2NjZjA2OGI3ODdmYyJ9.7LFljhaoFI_8AhQWKLAv3ccYgHYfCuTHbEndIGB1H3M&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>2.2 Bean生命周期控制</p><ul><li>实现InitializingBean, DisposableBean接口</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class BookServiceImpl implements BookService, InitializingBean, DisposableBean {</span></span>
<span class="line"><span style="color:#A6ACCD;">    private BookDao bookDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setBookDao(BookDao bookDao) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;set .....&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.bookDao = bookDao;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void save() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;book service save ...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        bookDao.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void destroy() throws Exception {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;service destroy&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void afterPropertiesSet() throws Exception {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;service init&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>applicationContext.xml配置：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;bookDao&quot; class=&quot;com.by.dao.impl.BookDaoImpl&quot; init-method=&quot;init&quot; destroy-method=&quot;destory&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;bookService&quot; class=&quot;com.by.service.impl.BookServiceImpl&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;property name=&quot;bookDao&quot; ref=&quot;bookDao&quot;&gt;&lt;/property&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span></code></pre></div><h3 id="_3-bean销毁时机" tabindex="-1">3 Bean销毁时机 <a class="header-anchor" href="#_3-bean销毁时机" aria-label="Permalink to &quot;3 Bean销毁时机&quot;">​</a></h3><ul><li><p>容器关闭前触发bean的销毁</p></li><li><p>关闭容器方式：</p><ul><li><p>手工关闭容器<code>ConfigurableApplicationContext</code>接口<code>close()</code>操作</p></li><li><p>注册关闭钩子，在虚拟机退出前先关闭容器再退出虚拟机<code>ConfigurableApplicationContext</code>接口<code>registerShutdownHook()</code>操作</p></li></ul></li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class AppForLifeCycle {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static void main( String[] args ) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        //此处需要使用实现类类型，接口类型没有close方法</span></span>
<span class="line"><span style="color:#A6ACCD;">        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;applicationContext.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        BookDao bookDao = (BookDao) ctx.getBean(&quot;bookDao&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        bookDao.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //注册关闭钩子函数，在虚拟机退出之前回调此函数，关闭容器</span></span>
<span class="line"><span style="color:#A6ACCD;">        ctx.registerShutdownHook();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //关闭容器</span></span>
<span class="line"><span style="color:#A6ACCD;">        //ctx.close();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,23),e=[p];function t(i,c,r,C,A,u){return a(),n("div",null,e)}const D=s(o,[["render",t]]);export{y as __pageData,D as default};
