import{_ as s,o as a,c as n,O as l}from"./chunks/framework.571309da.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/MyBatis/分页插件.md","filePath":"guide/MyBatis/分页插件.md","lastUpdated":null}'),p={name:"guide/MyBatis/分页插件.md"},e=l(`<p>2.1 分页插件介绍</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v0b60fafb694b30096bfa44d351d1b566?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE4MTQ5OCwiaWF0IjoxNjg5NTc2Njk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYwYjYwZmFmYjY5NGIzMDA5NmJmYTQ0ZDM1MWQxYjU2NiJ9.IdtdIr0Ga2_V0VYL5cGeIHuJ6MEaZLJ6gRUTlECZzO8&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><ul><li><p>分页可以将很多条结果进行分页显示。</p></li><li><p>如果当前在第一页，则没有上一页。如果当前在最后一页，则没有下一页。</p></li><li><p>需要明确当前是第几页，这一页中显示多少条结果。</p></li><li><p>MyBatis分页插件总结</p><ul><li><p>在企业级开发中，分页也是一种常见的技术。而目前使用的 MyBatis 是不带分页功能的，如果想实现分页的 功能，需要我们手动编写 LIMIT 语句。但是不同的数据库实现分页的 SQL 语句也是不同的，所以手写分页 成本较高。这个时候就可以借助分页插件来帮助我们实现分页功能。</p></li><li><p>PageHelper：第三方分页助手。将复杂的分页操作进行封装，从而让分页功能变得非常简单。</p></li></ul></li></ul><p>2.2 分页插件的使用</p><p>MyBatis可以使用第三方的插件来对功能进行扩展，分页助手PageHelper是将分页的复杂操作进行封装，使用简单的方式即可获得分页的相关数据</p><p>开发步骤：</p><p>①导入与PageHelper的jar包</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!-- com.github.pagehelper/pagehelper --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;groupId&gt;com.github.pagehelper&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;artifactId&gt;pagehelper&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;version&gt;5.2.1&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!-- springboot 项目添加如下依赖starter  --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;groupId&gt;com.github.pagehelper&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;artifactId&gt;pagehelper-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;version&gt;1.3.1&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span></code></pre></div><p>②在mybatis核心配置文件中配置PageHelper插件</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!-- 注意：分页助手的插件  配置在通用mapper之前 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> &lt;!--集成分页助手插件--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;plugins&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;plugin interceptor=&quot;com.github.pagehelper.PageInterceptor&quot;&gt;&lt;/plugin&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/plugins&gt;</span></span></code></pre></div><p>③测试分页数据获取</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">        public void pageTest(){</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">            SqlSession sqlSession = MybatisUtils.getSqlSession(true);</span></span>
<span class="line"><span style="color:#A6ACCD;">            //获取UserDao接口实现类对象</span></span>
<span class="line"><span style="color:#A6ACCD;">            UserDao mapper = sqlSession.getMapper(UserDao.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">            //通过分页助手来实现分页功能</span></span>
<span class="line"><span style="color:#A6ACCD;">            // 第一页：显示3条数据</span></span>
<span class="line"><span style="color:#A6ACCD;">            PageHelper.startPage(1,3);</span></span>
<span class="line"><span style="color:#A6ACCD;">             // 第一页：显示3条数据</span></span>
<span class="line"><span style="color:#A6ACCD;">          //  PageHelper.startPage(2,3);</span></span>
<span class="line"><span style="color:#A6ACCD;">            //调用实现类的方法，接收结果</span></span>
<span class="line"><span style="color:#A6ACCD;">            List&lt;User&gt; all = mapper.findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">            for (User user : all) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                System.out.println(user);</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span></code></pre></div><p>2.3 分页插件的参数获取</p><p><strong>获得分页相关的其他参数</strong>：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//其他分页的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">            PageInfo&lt;User&gt; info=new PageInfo&lt;&gt;(all);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(&quot;总条数：&quot; + info.getTotal());</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(&quot;总页数：&quot;+info.getPages());</span></span>
<span class="line"><span style="color:#A6ACCD;">            int pageNum = info.getPageNum();//当前页</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(&quot;当前页：&quot;+pageNum);</span></span>
<span class="line"><span style="color:#A6ACCD;">            int pageSize = info.getPageSize();//每页显示的条数</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(&quot;每页显示条数：&quot;+pageSize);</span></span>
<span class="line"><span style="color:#A6ACCD;">            int prePage = info.getPrePage();//上一页</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(&quot;上一页：&quot; +prePage);</span></span>
<span class="line"><span style="color:#A6ACCD;">            int nextPage = info.getNextPage();//下一页</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(&quot;下一页：&quot; +nextPage);</span></span>
<span class="line"><span style="color:#A6ACCD;">            boolean isFirstPage = info.isIsFirstPage();//是否是第一页</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(&quot;是否是第一页：&quot; +isFirstPage);</span></span>
<span class="line"><span style="color:#A6ACCD;">            boolean isLastPage = info.isIsLastPage();//是否是最后一页</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(&quot;是否是最后一页:&quot;+isLastPage);</span></span>
<span class="line"><span style="color:#A6ACCD;">            MybatisUtils.closeSqlSession(sqlSession);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><p>2.4 分页插件知识小结</p><p>分页：可以将很多条结果进行分页显示。</p><p>分页插件 jar 包：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;  </span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;groupId&gt;com.github.pagehelper&lt;/groupId&gt;  </span></span>
<span class="line"><span style="color:#A6ACCD;">	artifactId&gt;pagehelper&lt;/artifactId&gt;  </span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;version&gt;5.2.0&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span></code></pre></div><p><code>&lt;plugins&gt;</code>：集成插件标签。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--集成分页助手插件--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;plugins&gt;    </span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;plugin interceptor=&quot;com.github.pagehelper.PageInterceptor&quot;&gt;&lt;/plugin&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/plugins&gt;</span></span></code></pre></div><p>分页助手相关 API 1.PageHelper：分页助手功能类。</p><ul><li><p>startPage()：设置分页参数</p></li><li><p>PageInfo：分页相关参数功能类。</p></li><li><p>getTotal()：获取总条数</p></li><li><p>getPages()：获取总页数</p></li><li><p>getPageNum()：获取当前页</p></li><li><p>getPageSize()：获取每页显示条数</p></li><li><p>getPrePage()：获取上一页</p></li><li><p>getNextPage()：获取下一页</p></li><li><p>isIsFirstPage()：获取是否是第一页</p></li><li><p>isIsLastPage()：获取是否是最后一页</p></li></ul>`,23),t=[e];function o(i,c,r,g,C,A){return a(),n("div",null,t)}const d=s(p,[["render",o]]);export{u as __pageData,d as default};
