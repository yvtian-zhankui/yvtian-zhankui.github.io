import{_ as s,o as a,c as n,O as l}from"./chunks/framework.571309da.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/Bean的基础配置.md","filePath":"guide/Spring/Bean的基础配置.md","lastUpdated":null}'),o={name:"guide/Spring/Bean的基础配置.md"},p=l(`<h3 id="问题导入" tabindex="-1">问题导入 <a class="header-anchor" href="#问题导入" aria-label="Permalink to &quot;问题导入&quot;">​</a></h3><p>问题1：在<code>&lt;bean&gt;</code>标签上如何配置别名？</p><p>问题2：Bean的默认作用范围是什么？如何修改？</p><h2 id="_1-bean基础配置【重点】" tabindex="-1">1 Bean基础配置【重点】 <a class="header-anchor" href="#_1-bean基础配置【重点】" aria-label="Permalink to &quot;1 Bean基础配置【重点】&quot;">​</a></h2><p>配置说明</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v1b6f63d95031c8ebe176ee5fe7a4704d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYxYjZmNjNkOTUwMzFjOGViZTE3NmVlNWZlN2E0NzA0ZCJ9.v6ld6zLXR-7ByGNeoBpb8kuw9M0IERElklLKvOnSUUw&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>代码演示</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">bean id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">orderDao</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">com.by.dao.impl.OrderDaoImpl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#A6ACCD;">bean</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">bean id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">orderService</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">com.by.service.impl.OrderServiceImpl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>运行结果</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112vde7fa6b2ce1afe820929b2210d7114f1?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZkZTdmYTZiMmNlMWFmZTgyMDkyOWIyMjEwZDcxMTRmMSJ9.4M2Lj0I8n_uT5-qwkzJeaRECSvhFOtbR0nC5LN_zens&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h2 id="_2-bean别名配置" tabindex="-1">2 Bean别名配置 <a class="header-anchor" href="#_2-bean别名配置" aria-label="Permalink to &quot;2 Bean别名配置&quot;">​</a></h2><p>配置说明</p><table><thead><tr><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>名称</td><td>name</td></tr><tr><td>类型</td><td>属性</td></tr><tr><td>所属</td><td>bean标签</td></tr><tr><td>功能</td><td>定义bean的别名，可定义多个，使用逗号(,)分号( ; ) 空格（ ）分隔</td></tr><tr><td>范例</td><td></td></tr></tbody></table><p><img src="https://tcs-devops.aliyuncs.com/storage/112vef232baac4c6db3526c4ad04168a0fb8?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlZjIzMmJhYWM0YzZkYjM1MjZjNGFkMDQxNjhhMGZiOCJ9.vnfrigkKeOHglOYTWK3hRmFnfN8LdYk7Vj2mrsTDFLY&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>代码演示</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112va4d94825f6aa1ff8095442798304126c?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhNGQ5NDgyNWY2YWExZmY4MDk1NDQyNzk4MzA0MTI2YyJ9.Tb-xfAkksuVOCPHzPLhBKB9stpjc7gpl89DHDp2r7KY&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v4d5c0ef14fd9f666aa534fa2384582ad?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY0ZDVjMGVmMTRmZDlmNjY2YWE1MzRmYTIzODQ1ODJhZCJ9.8KvOVCPI28kcQiG2vPB-wUiA8wcKnvXzTpkplSB8gOI&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>打印结果</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112va39efcec83ac08b1590004a803b2d2f1?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhMzllZmNlYzgzYWMwOGIxNTkwMDA0YTgwM2IyZDJmMSJ9.tIhTd_Q8YIfuz0OL-htjvK2aRCZhhds3TaHgzSp-0m0&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h2 id="_3-bean作用范围配置【重点】" tabindex="-1">3 Bean作用范围配置【重点】 <a class="header-anchor" href="#_3-bean作用范围配置【重点】" aria-label="Permalink to &quot;3 Bean作用范围配置【重点】&quot;">​</a></h2><p>配置说明</p><table><thead><tr><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>名称</td><td>scope</td></tr><tr><td>类型</td><td>属性</td></tr><tr><td>所属</td><td>bean标签</td></tr><tr><td>功能</td><td>定义bean的作用范围，可选范围： singleton：单例(默认) prototype：非单例</td></tr><tr><td>范例</td><td></td></tr></tbody></table><blockquote><p>扩展：scope的取值不仅仅只有singleton和prototype，还有request、session、application、 websocket ，表示创建出的对象放置在web容器(tomcat)对应的位置。比如：request表示保存到request域中。</p></blockquote><p>代码演示</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;!--</span><span style="color:#A6ACCD;">    sope 是bean的作用范围 可选单例singleton 非单例prototype</span><span style="color:#89DDFF;">--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">bean id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bookDao</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">com.by.dao.impl.BookDaoImpl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> scope</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">singleton</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#A6ACCD;">bean</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">bean id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bookDao</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">com.by.dao.impl.BookDaoImpl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> scope</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prototype</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#A6ACCD;">bean</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Test</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">springdemo01</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">//演示单例 非单例</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">ApplicationContext</span><span style="color:#A6ACCD;"> ac</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ClassPathXmlApplicationContext</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">application.xml</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">BookDao</span><span style="color:#A6ACCD;"> bookDao</span><span style="color:#89DDFF;">=(</span><span style="color:#A6ACCD;">BookDao</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">ac</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getBean</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bookDao</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">BookDao</span><span style="color:#A6ACCD;"> bookDao2</span><span style="color:#89DDFF;">=(</span><span style="color:#A6ACCD;">BookDao</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">ac</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getBean</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bookDao</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">out</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">bookDao</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">out</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">bookDao2</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>打印结果</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112ved97e46f4c5d7f585b122daa4d0b9400?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlZDk3ZTQ2ZjRjNWQ3ZjU4NWIxMjJkYWE0ZDBiOTQwMCJ9.QL30mdsjhHJ1wEToQABX4ncXhTB9nw8-7yaWLJjxOQ8&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p><strong>非单例打印结果</strong></p><p><img src="https://tcs-devops.aliyuncs.com/storage/112vac1c9afe0f5eaf74dfe565cca5c013e9?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhYzFjOWFmZTBmNWVhZjc0ZGZlNTY1Y2NhNWMwMTNlOSJ9.MRa57qIEfSXsKmjC-5CgYOmXU1WZMZSdsrLf1SrJV9o&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><blockquote><p>最后给大家说明一下：在我们的实际开发当中，绝大部分的Bean是单例的，也就是说绝大部分Bean不需要配置scope属性。</p></blockquote><h2 id="_4-bean的实例化" tabindex="-1">4 Bean的实例化 <a class="header-anchor" href="#_4-bean的实例化" aria-label="Permalink to &quot;4 Bean的实例化&quot;">​</a></h2><h3 id="问题导入-1" tabindex="-1">问题导入 <a class="header-anchor" href="#问题导入-1" aria-label="Permalink to &quot;问题导入&quot;">​</a></h3><p>Bean的实例化方式有几种？</p><h3 id="_1-bean是如何创建的【理解】" tabindex="-1">1 Bean是如何创建的【理解】 <a class="header-anchor" href="#_1-bean是如何创建的【理解】" aria-label="Permalink to &quot;1 Bean是如何创建的【理解】&quot;">​</a></h3><p>bean本质上就是对象，创建bean使用构造方法完成</p><h3 id="_2-实例化bean的三种方式" tabindex="-1">2 实例化Bean的三种方式 <a class="header-anchor" href="#_2-实例化bean的三种方式" aria-label="Permalink to &quot;2 实例化Bean的三种方式&quot;">​</a></h3><p>2.1 构造方法方式【重点】</p><ul><li>BookDaoImpl实现类</li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BookDaoImpl</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">implements</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BookDao</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">BookDaoImpl</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        System</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">out</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">println</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">book dao 构造运行中。。。。</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">save</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        System</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">out</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">println</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">book dao save....</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ul><li>applicationContext.xml配置</li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;!--</span><span style="color:#A6ACCD;">方式一：构造方法实例化bean</span><span style="color:#89DDFF;">--&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">bean id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bookDao</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">com.by.dao.impl.BookDaoImpl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">/&gt;</span></span></code></pre></div><ul><li>AppForInstanceBook测试类</li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppForInstanceBook</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">String</span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">args</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">ApplicationContext</span><span style="color:#A6ACCD;"> ctx </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ClassPathXmlApplicationContext</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">applicationContext.xml</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">BookDao</span><span style="color:#A6ACCD;"> bookDao </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">BookDao</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> ctx</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getBean</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bookDao</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        bookDao</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">save</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ul><li>运行结果</li></ul><p><img src="https://tcs-devops.aliyuncs.com/storage/112v580fce2ba06cd35a227f99bbf628ac4f?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY1ODBmY2UyYmEwNmNkMzVhMjI3Zjk5YmJmNjI4YWM0ZiJ9.1kg-QrFH4SvHDlOzPAJLpH8c_rSVLxjeADuuh7eg3s0&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>==注意：无参构造方法如果不存在，将抛出异常<code>BeanCreationException</code>==</p><p>2.2 静态工厂方式</p><ul><li>OrderDao接口和OrderDaoImpl实现类</li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OrderDao</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">save</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OrderDaoImpl</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">implements</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OrderDao</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">save</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        System</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">out</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">println</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">order dao save ...</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ul><li>OrderDaoFactory工厂类</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//静态工厂创建对象</span></span>
<span class="line"><span style="color:#A6ACCD;">public class OrderDaoFactory {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static OrderDao getOrderDao(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;工厂类创建中。。。&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return new OrderDaoImpl();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>applicationContext.xml配置</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--方式二：使用静态工厂实例化bean--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;orderDao&quot; class=&quot;com.by.factory.OrderDaoFactory&quot; factory-method=&quot;getOrderDao&quot;/&gt;</span></span></code></pre></div><ul><li>AppForInstanceOrder测试类</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class AppForInstanceOrder {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">        ApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;applicationContext.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        OrderDao orderDao = (OrderDao) ctx.getBean(&quot;orderDao&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        orderDao.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>运行结果</li></ul><p><img src="https://tcs-devops.aliyuncs.com/storage/112v59e9272b6968dec14d3c56ed9ae06e2e?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY1OWU5MjcyYjY5NjhkZWMxNGQzYzU2ZWQ5YWUwNmUyZSJ9.cdCfQxRQUI9vLGHNgSp5sLrECaSsXrDTRS9O7UT6L58&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>2.3 实例工厂方式</p><ul><li>UserDao接口和UserDaoImpl实现类</li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserDao</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">save</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserDaoImpl</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">implements</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserDao</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">save</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        System</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">out</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">println</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">user dao save ...</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ul><li>UserDaoFactory工厂类</li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">//实例工厂创建对象</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserDaoFactory</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">UserDao</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getUserDao</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">UserDaoImpl</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ul><li>applicationContext.xml配置</li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;!--</span><span style="color:#A6ACCD;">方式三：使用实例工厂实例化bean</span><span style="color:#89DDFF;">--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">bean id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">userFactoy</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">com.by.factory.UserDaoFactory</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">bean id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">userDao</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> factory</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">method</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">getUserDao</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> factory</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">bean</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">userFactoy</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">/&gt;</span></span></code></pre></div><ul><li>AppForInstanceUser测试类</li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppForInstanceUser</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">String</span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">args</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">//        //创建实例工厂对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">//        UserDaoFactory userDaoFactory = new UserDaoFactory();</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">//        //通过实例工厂对象创建对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">//        UserDao userDao = userDaoFactory.getUserDao();</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">//        userDao.save();</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">ApplicationContext</span><span style="color:#A6ACCD;"> ac</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ClassPathXmlApplicationContext</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">application.xml</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">UserDao</span><span style="color:#A6ACCD;"> userDao </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">UserDao</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">ac</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getBean</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">userDao</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        userDao</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">save</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ul><li>运行结果</li></ul><p><img src="https://tcs-devops.aliyuncs.com/storage/112v4cb8baf8bc0b8f07cbb9b5e8f1b4dc93?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNjM2OCwiaWF0IjoxNjg3OTMxNTY4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY0Y2I4YmFmOGJjMGI4ZjA3Y2JiOWI1ZThmMWI0ZGM5MyJ9.L6aYX3jAxHX2s6-9N4oAx58_6Uv80RLztvApEjDe8Ig&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>2.4 实现FactoryBean<code>&lt;T&gt;</code>方式【扩展,了解】</p><ul><li>定义<code>UserDaoFactoryBean</code> 实现<code>FactoryBean&lt;UserDao&gt;</code></li></ul><blockquote><p>UserDaoFactoryBean中实例化什么类型的对象泛型就是该类型。</p></blockquote><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//FactoryBean创建对象</span></span>
<span class="line"><span style="color:#A6ACCD;">public class UserDaoFactoryBean implements FactoryBean&lt;UserDao&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //代替原始实例工厂中创建对象的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    public UserDao getObject() throws Exception {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return new UserDaoImpl();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Class&lt;?&gt; getObjectType() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return UserDao.class;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>applicationContext.xml配置</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--方式四：使用FactoryBean实例化bean--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;userDao&quot; class=&quot;com.by.factory.UserDaoFactoryBean&quot;/&gt;</span></span></code></pre></div><blockquote><p>使用之前的AppForInstanceUser测试类去运行看结果就行了。注意配置文件中id=&quot;userDao&quot;是否重复。</p></blockquote>`,76),e=[p];function t(c,r,D,y,C,i){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{A as __pageData,d as default};
