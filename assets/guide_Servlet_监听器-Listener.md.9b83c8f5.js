import{_ as s,o as n,c as a,O as t}from"./chunks/framework.571309da.js";const D=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Servlet/监听器-Listener.md","filePath":"guide/Servlet/监听器-Listener.md","lastUpdated":1688288112000}'),l={name:"guide/Servlet/监听器-Listener.md"},e=t(`<p>Servlet规范中的监听器-Listener</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112va5d85ecf0aa21392038df8f84abb384c?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzgzMCwiaWF0IjoxNjg4MDM5MDMwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhNWQ4NWVjZjBhYTIxMzkyMDM4ZGY4Zjg0YWJiMzg0YyJ9.FtCrKJxhU1rNQzAX-QkHaLabZFkuSr9c1yCdJKZ4C6g&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><ul><li><p>观察者设计模式, 所有的监听器都是观察者设计模式的体现。</p></li><li><p>什么是观察者设计模式呢？</p><ul><li>它是事件驱动的一种体现形式。就好比在做什么事情的时候被人盯着。当对应做到某件事时，触发事件。</li></ul></li><li><p>观察者模式通常由以下三部分组成：</p><pre><code>      事件源：触发事件的对象。

  	事件：触发的动作，里面封装了事件源。

  	监听器：当事件源触发事件时，要做的事情。一般是一个接口，由使用者来实现。
</code></pre></li></ul><p>监听器作用：</p><pre><code>在开发项目中，我们可以对：对象的创建销毁、域对象中的属性变化、会话中相关的内容进行监听

在servlet规范中共计8个监听器，监听器都是以接口形式提供的，具体功能需要我们自己来完成
</code></pre><h3 id="_2-1-监听对象创建的监听器" tabindex="-1">2.1 监听对象创建的监听器 <a class="header-anchor" href="#_2-1-监听对象创建的监听器" aria-label="Permalink to &quot;2.1 监听对象创建的监听器&quot;">​</a></h3><p><strong>ServletContextListener：用于监听ServletContext对象创建和销毁的监听器</strong></p><p>核心方法：</p><table><thead><tr><th>返回值</th><th>方法名</th><th>作用</th></tr></thead><tbody><tr><td>void</td><td>contextInitialized(ServletContextEvent sce)</td><td>对象创建时执行此方法</td></tr><tr><td>void</td><td>contextDestroyed(ServletContextEvent sce)</td><td>对象销毁执行此方法</td></tr></tbody></table><ul><li><p>参数ServletContextEvent代表事件对象，事件是【创建对象】这个动作</p></li><li><p>事件对象中封装着触发事件的来源，即事件源，就是ServletContext</p></li><li><p>真正的事件指的是创建或销毁ServletContext对象的操作</p></li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">用于监听ServletContext对象创建和销毁的监听器</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">​</span></span>
<span class="line"><span style="color:#F78C6C;font-style:italic;">@since</span><span style="color:#676E95;font-style:italic;"> v 2.3</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServletContextListener</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">EventListener</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">对象创建时执行此方法。该方法的参数是ServletContextEvent事件对象，事件是【创建对象】这个动作</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">事件对象中封装着触发事件的来源，即事件源，就是ServletContext</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">contextInitialized</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">ServletContextEvent</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">sce</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">对象销毁执行此方法</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">contextDestroyed</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">ServletContextEvent</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">sce</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><p><strong>HttpSessionListener：用于监听HttpSession对象创建和销毁的监听器</strong></p><p>核心方法：</p><table><thead><tr><th>返回值</th><th>方法名</th><th>作用</th></tr></thead><tbody><tr><td>void</td><td>csessionCreated(HttpSessionEvent se)</td><td>对象创建时执行此方法</td></tr><tr><td>void</td><td>sessionDestroyed(HttpSessionEvent se)</td><td>对象销毁执行此方法</td></tr></tbody></table><ul><li><p>参数HttpSessionEvent 代表事件对象</p></li><li><p>事件对象中封装着事件源，就是HttpSession</p></li><li><p>真正的事件指的是创建或销毁HttpSession对象的操作</p></li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HttpSessionListener</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">EventListener</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">对象创建时执行此方法。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sessionCreated</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">HttpSessionEvent</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">se</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">对象销毁执行此方法</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sessionDestroyed</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">HttpSessionEvent</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">se</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p><strong>ServletRequestListener：用于监听ServletRequest对象创建和销毁的监听器</strong></p><table><thead><tr><th>返回值</th><th>方法名</th><th>作用</th></tr></thead><tbody><tr><td>void</td><td>requestInitialized (ServletRequestEvent sre)</td><td>对象创建时执行此方法</td></tr><tr><td>void</td><td>requestDestroyed (ServletRequestEvent sre)</td><td>对象销毁执行此方法</td></tr></tbody></table><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface ServletRequestListener extends EventListener {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">对象创建时执行此方法。</span></span>
<span class="line"><span style="color:#A6ACCD;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">public default void requestInitialized (ServletRequestEvent sre) {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">对象销毁执行此方法</span></span>
<span class="line"><span style="color:#A6ACCD;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">public default void requestDestroyed (ServletRequestEvent sre) {</span></span>
<span class="line"><span style="color:#A6ACCD;">} </span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_2-2监听域中属性发生变化的" tabindex="-1">2.2监听域中属性发生变化的 <a class="header-anchor" href="#_2-2监听域中属性发生变化的" aria-label="Permalink to &quot;2.2监听域中属性发生变化的&quot;">​</a></h3><p><strong>ServletContextAttributeListener：用于监听ServletContext域（应用域）中属性发生变化的监听器</strong></p><p>核心方法：</p><table><thead><tr><th>返回值</th><th>方法名</th><th>作用</th></tr></thead><tbody><tr><td>void</td><td>attributeAdded(ServletContextAttributeEvent scae)</td><td>域中添加了属性触发此方法</td></tr><tr><td>void</td><td>attributeRemoved(ServletContextAttributeEvent scae)</td><td>域中删除了属性触发此方法</td></tr><tr><td>void</td><td>attributeReplaced(ServletContextAttributeEvent scae)</td><td>域中属性发生改变触发此方法</td></tr></tbody></table><ul><li><p>参数是ServletContextAttributeEvent事件对象，事件是【添加属性】。</p></li><li><p>事件对象中封装着事件源，即ServletContext。</p></li><li><p>当ServletContext执行setAttribute方法时，此方法可以知道，并执行。</p></li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServletContextAttributeListener</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">EventListener</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    /**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * 域中添加了属性触发此方法。参数是ServletContextAttributeEvent事件对象，事件是【添加属性】。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * 事件对象中封装着事件源，即ServletContext。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * 当ServletContext执行setAttribute方法时，此方法可以知道，并执行。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">attributeAdded</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">ServletContextAttributeEvent</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">scae</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    /**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * 域中删除了属性触发此方法</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">attributeRemoved</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">ServletContextAttributeEvent</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">scae</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    /**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * 域中属性发生改变触发此方法</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">attributeReplaced</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">ServletContextAttributeEvent</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">scae</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p><strong>HttpSessionAttributeListener：用于监听HttpSession域（会话域）中属性发生变化的监听器</strong></p><p>核心方法：</p><table><thead><tr><th>返回值</th><th>方法名</th><th>作用</th></tr></thead><tbody><tr><td>void</td><td>attributeAdded(HttpSessionBindingEvent se)</td><td>域中添加了属性触发此方法</td></tr><tr><td>void</td><td>attributeRemoved(HttpSessionBindingEvent se)</td><td>域中删除了属性触发此方法</td></tr><tr><td>void</td><td>attributeReplaced(HttpSessionBindingEvent se)</td><td>域中属性发生改变触发此方法</td></tr></tbody></table><ul><li><p>参数是HttpSessionBindingEvent事件对象。</p></li><li><p>事件对象中封装着事件源，即HttpSession。</p></li><li><p>真正的事件是指，添加、移除、替换会话域中的属性操作。</p></li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface HttpSessionAttributeListener extends EventListener {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * 域中添加了属性触发此方法。</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public default void attributeAdded(HttpSessionBindingEvent se) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * 域中删除了属性触发此方法</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public default void attributeRemoved(HttpSessionBindingEvent se) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * 域中属性发生改变触发此方法</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public default void attributeReplaced(HttpSessionBindingEvent se) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>ServletRequestAttributeListener：用于监听ServletRequest域（请求域）中属性发生变化的监听器</strong></p><p>核心方法：</p><table><thead><tr><th>返回值</th><th>方法名</th><th>作用</th></tr></thead><tbody><tr><td>void</td><td>attributeAdded(ServletRequestAttributeEvent srae）</td><td>域中添加了属性触发此方法</td></tr><tr><td>void</td><td>attributeRemoved(ServletRequestAttributeEvent srae)</td><td>域中删除了属性触发此方法</td></tr><tr><td>void</td><td>attributeReplaced(ServletRequestAttributeEvent srae)</td><td>域中属性发生改变触发此方法</td></tr></tbody></table><ul><li><p>参数是ServletRequestAttributeEvent事件对象。</p></li><li><p>事件对象中封装着事件源，即ServletRequest。</p></li><li><p>真正的事件是指，添加、移除、替换会话域中的属性操作。</p></li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface ServletRequestAttributeListener extends EventListener {</span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * 域中添加了属性触发此方法。</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public default void attributeAdded(ServletRequestAttributeEvent srae) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * 域中删除了属性触发此方法</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public default void attributeRemoved(ServletRequestAttributeEvent srae) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * 域中属性发生改变触发此方法</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public default void attributeReplaced(ServletRequestAttributeEvent srae) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_2-3-和会话相关的两个感知型监听器" tabindex="-1">2.3 和会话相关的两个感知型监听器 <a class="header-anchor" href="#_2-3-和会话相关的两个感知型监听器" aria-label="Permalink to &quot;2.3 和会话相关的两个感知型监听器&quot;">​</a></h3><p>和会话域相关的两个感知型监听器是无需配置的，直接编写代码即可</p><p><strong>HttpSessionBinderListener：用于感知对象和和会话域绑定的监听器</strong></p><table><thead><tr><th>返回值</th><th>方法名</th><th>作用</th></tr></thead><tbody><tr><td>void</td><td>valueBound(HttpSessionBindingEvent event)</td><td>当数据加入会话域时 绑定此方法执行</td></tr><tr><td>void</td><td>valueUnbound(HttpSessionBindingEvent event)</td><td>会话域移除时也 ，解绑 此方法执行</td></tr></tbody></table><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface HttpSessionBindingListener extends EventListener {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * 当数据加入会话域时，也就是绑定，此方法执行</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public default void valueBound(HttpSessionBindingEvent event) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * 当从会话域移除时，也就是解绑，此方法执行</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public default void valueUnbound(HttpSessionBindingEvent event) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>HttpSessionActivationListener：用于感知会话域中对象钝化和活化的监听器</strong></p><table><thead><tr><th>返回值</th><th>方法名</th><th>作用</th></tr></thead><tbody><tr><td>void</td><td>sessionWillPassivate(HttpSessionEvent se)</td><td>当会话域中的数据钝化时，此方法执行</td></tr><tr><td>void</td><td>sessionDidActivate(HttpSessionEvent se)</td><td>当会话域中的数据活化时（激活），此方法执行</td></tr></tbody></table><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface HttpSessionActivationListener extends EventListener {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * 当会话域中的数据钝化时，此方法执行</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public default void sessionWillPassivate(HttpSessionEvent se) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * 当会话域中的数据活化时（激活），此方法执行</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public default void sessionDidActivate(HttpSessionEvent se) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_3-监听器的使用" tabindex="-1">3 监听器的使用 <a class="header-anchor" href="#_3-监听器的使用" aria-label="Permalink to &quot;3 监听器的使用&quot;">​</a></h3><p>在实际开发中，我们可以根据具体情况来从这8个监听器中选择使用。感知型监听器由于无需配置，只需要根据实际需求编写代码，所以此处我们就不再演示了。我们在剩余6个中分别选择一个监听对象创建销毁和对象域中属性发生变化的监听器演示一下。</p><p>3.1 ServletContextListener的使用</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/*</span></span>
<span class="line"><span style="color:#A6ACCD;">    ServletContext对象的创建和销毁的监听器</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">//@WebListener</span></span>
<span class="line"><span style="color:#A6ACCD;">public class ServletContextListenerDemo implements ServletContextListener{</span></span>
<span class="line"><span style="color:#A6ACCD;">    /*</span></span>
<span class="line"><span style="color:#A6ACCD;">        ServletContext对象创建的时候执行此方法</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void contextInitialized(ServletContextEvent sce) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;监听到了对象的创建...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //获取对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    ServletContext servletContext = sce.getServletContext();</span></span>
<span class="line"><span style="color:#A6ACCD;">   //System.out.println(servletContext);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //添加属性</span></span>
<span class="line"><span style="color:#A6ACCD;">    servletContext.setAttribute(&quot;username&quot;,&quot;zhangsan&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //替换属性</span></span>
<span class="line"><span style="color:#A6ACCD;">    servletContext.setAttribute(&quot;username&quot;,&quot;lisi&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //移除属性</span></span>
<span class="line"><span style="color:#A6ACCD;">    servletContext.removeAttribute(&quot;username&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">/*</span></span>
<span class="line"><span style="color:#A6ACCD;">    ServletContext对象销毁的时候执行此方法</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Override</span></span>
<span class="line"><span style="color:#A6ACCD;">public void contextDestroyed(ServletContextEvent sce) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;监听到了对象的销毁...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>配置监听器：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--配置监听器--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;listener&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;listener-class&gt;com.by.web.listener.ServletContextListenerDemo&lt;/listener-class&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/listener&gt;</span></span></code></pre></div><p>3.2 ServletContextAttributeListener的使用</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/*</span></span>
<span class="line"><span style="color:#A6ACCD;">    应用域对象中的属性变化的监听器</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">//@WebListener</span></span>
<span class="line"><span style="color:#A6ACCD;">public class ServletContextAttributeListenerDemo implements ServletContextAttributeListener{</span></span>
<span class="line"><span style="color:#A6ACCD;">    /*</span></span>
<span class="line"><span style="color:#A6ACCD;">        向应用域对象中添加属性时执行此方法</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void attributeAdded(ServletContextAttributeEvent scae) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;监听到了属性的添加...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //获取应用域对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    ServletContext servletContext = scae.getServletContext();</span></span>
<span class="line"><span style="color:#A6ACCD;">    //获取属性</span></span>
<span class="line"><span style="color:#A6ACCD;">    Object value = servletContext.getAttribute(&quot;username&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(value);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">/*</span></span>
<span class="line"><span style="color:#A6ACCD;">    向应用域对象中替换属性时执行此方法</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Override</span></span>
<span class="line"><span style="color:#A6ACCD;">public void attributeReplaced(ServletContextAttributeEvent scae) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;监听到了属性的替换...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //获取应用域对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    ServletContext servletContext = scae.getServletContext();</span></span>
<span class="line"><span style="color:#A6ACCD;">    //获取属性</span></span>
<span class="line"><span style="color:#A6ACCD;">    Object value = servletContext.getAttribute(&quot;username&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(value);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">/*</span></span>
<span class="line"><span style="color:#A6ACCD;">    向应用域对象中移除属性时执行此方法</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Override</span></span>
<span class="line"><span style="color:#A6ACCD;">public void attributeRemoved(ServletContextAttributeEvent scae) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;监听到了属性的移除...&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">   //获取应用域对象</span></span>
<span class="line"><span style="color:#A6ACCD;">  ServletContext servletContext = scae.getServletContext();</span></span>
<span class="line"><span style="color:#A6ACCD;">  //获取属性</span></span>
<span class="line"><span style="color:#A6ACCD;"> Object value = servletContext.getAttribute(&quot;username&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  System.out.println(value);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,51),p=[e];function o(c,i,r,C,A,y){return n(),a("div",null,p)}const v=s(l,[["render",o]]);export{D as __pageData,v as default};
