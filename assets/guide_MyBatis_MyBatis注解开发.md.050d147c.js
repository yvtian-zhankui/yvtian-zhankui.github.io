import{_ as s,o as a,c as n,O as l}from"./chunks/framework.571309da.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/MyBatis/MyBatis注解开发.md","filePath":"guide/MyBatis/MyBatis注解开发.md","lastUpdated":1689775858000}'),p={name:"guide/MyBatis/MyBatis注解开发.md"},e=l(`<h3 id="_1-mybatis注解开发单表操作" tabindex="-1">1 Mybatis注解开发单表操作 <a class="header-anchor" href="#_1-mybatis注解开发单表操作" aria-label="Permalink to &quot;1 Mybatis注解开发单表操作&quot;">​</a></h3><p>1.1 MyBatis的常用注解</p><p>这几年来注解开发越来越流行，Mybatis也可以使用注解开发方式，这样我们就可以减少编写Mapper</p><p>映射文件了。我们先围绕一些基本的CRUD来学习，再学习复杂映射多表操作。</p><p>@Insert：实现新增</p><p>@Update：实现更新</p><p>@Delete：实现删除</p><p>@Select：实现查询</p><p>@Result：实现结果集封装</p><p>@Results：可以与@Result 一起使用，封装多个结果集</p><p>@One：实现一对一结果集封装</p><p>@Many：实现一对多结果集封装</p><ul><li>注意：修改MyBatis的核心配置文件，我们使用了注解替代的映射文件，所以我们只需要加载使用了注解的Mapper接口即可</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;mappers&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--扫描使用注解的类--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;mapper class=&quot;com.by.mapper.IUserMapper&quot;&gt;&lt;/mapper&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/mappers&gt;</span></span></code></pre></div><p>或者指定扫描包含映射关系的接口所在的包也可以</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;mappers&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--扫描使用注解的类所在的包--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;package name=&quot;com.by.mapper&quot;&gt;&lt;/package&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/mappers&gt;</span></span></code></pre></div><p>1.1 注解开发总结</p><p>注解可以简化开发操作，省略映射配置文件的编写。</p><ul><li><p>常用注解 @Select(“查询的 SQL 语句”)：执行查询操作注解 @Insert(“查询的 SQL 语句”)：执行新增操作注解 @Update(“查询的 SQL 语句”)：执行修改操作注解 @Delete(“查询的 SQL 语句”)：执行删除操作注解</p></li><li><p>配置映射关系 <code>&lt;mappers&gt;</code> <code>&lt;package name=&quot;接口所在包&quot;/&gt; &lt;/mappers&gt;  </code></p></li></ul><h3 id="二-mybatis注解开发的多表操作" tabindex="-1">二.MyBatis注解开发的多表操作 <a class="header-anchor" href="#二-mybatis注解开发的多表操作" aria-label="Permalink to &quot;二.MyBatis注解开发的多表操作&quot;">​</a></h3><h3 id="_2-1-mybatis的注解实现复杂映射开发" tabindex="-1">2.1 MyBatis的注解实现复杂映射开发 <a class="header-anchor" href="#_2-1-mybatis的注解实现复杂映射开发" aria-label="Permalink to &quot;2.1  MyBatis的注解实现复杂映射开发&quot;">​</a></h3><p>实现复杂关系映射之前我们可以在映射文件中通过配置<code>&lt;resultMap&gt;</code>来实现，使用注解开发后，我们可以使用@Results注解，@Result注解，@One注解，@Many注解组合完成复杂关系的配置</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112wc7ed96625516348c6557d65e48cfa2e6?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM3NDI3NywiaWF0IjoxNjg5NzY5NDc3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndjN2VkOTY2MjU1MTYzNDhjNjU1N2Q2NWU0OGNmYTJlNiJ9.sSFVMHUzS4BpoWW97Y7aXcHM5nekpusPUMjzRgbDlBM&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p><img src="https://tcs-devops.aliyuncs.com/storage/112waa5fc54d69799089d5871eb90b410efd?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM3NDI3NywiaWF0IjoxNjg5NzY5NDc3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndhYTVmYzU0ZDY5Nzk5MDg5ZDU4NzFlYjkwYjQxMGVmZCJ9.OjR5J0J3fD00kdeIPHKbrr5UwP0QkGC2GsIM6_0f-iI&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h3 id="_2-2-一对一查询" tabindex="-1">2.2 一对一查询 <a class="header-anchor" href="#_2-2-一对一查询" aria-label="Permalink to &quot;2.2  一对一查询&quot;">​</a></h3><p>2.2.1 一对一查询的模型</p><p>一对一查询的需求：查询一个用户信息，与此同时查询出该用户对应的身份证信息</p><p>2.2.2 一对一查询的语句</p><p>对应的sql语句：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">SELECT * FROM card；</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">SELECT * FROM person WHERE id=#{id}</span></span></code></pre></div><p>2.2.3 创建PersonMapper接口</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface PersonMapper {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //根据id查询</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Select(&quot;SELECT * FROM person WHERE id=#{id}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public abstract Person findById(Integer id);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><p>2.2.4 使用注解配置Mapper</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface CardMapper {</span></span>
<span class="line"><span style="color:#A6ACCD;">     @Select(&quot;select * from card&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Results({</span></span>
<span class="line"><span style="color:#A6ACCD;">            @Result(column = &quot;id&quot;, property = &quot;id&quot;),</span></span>
<span class="line"><span style="color:#A6ACCD;">            @Result(column = &quot;number&quot;,property = &quot;number&quot;),</span></span>
<span class="line"><span style="color:#A6ACCD;">            @Result(</span></span>
<span class="line"><span style="color:#A6ACCD;">                    property = &quot;p&quot;,             // 被包含对象的变量名</span></span>
<span class="line"><span style="color:#A6ACCD;">                    javaType = Person.class,    // 被包含对象的实际数据类型</span></span>
<span class="line"><span style="color:#A6ACCD;">                    column = &quot;pid&quot;,             // 根据查询出的card表中的pid字段来查询person表</span></span>
<span class="line"><span style="color:#A6ACCD;">                    /*</span></span>
<span class="line"><span style="color:#A6ACCD;">                        one、@One 一对一固定写法</span></span>
<span class="line"><span style="color:#A6ACCD;">                        select属性：指定调用哪个接口中的哪个方法</span></span>
<span class="line"><span style="color:#A6ACCD;">                     */</span></span>
<span class="line"><span style="color:#A6ACCD;">       one = @One(select = &quot;com.by.mapper.PersonMapper.findById&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            )</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">    public  List&lt;Card&gt; findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>2.2.5 测试类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void oneTest(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        //1.通过工厂对象获取SqlSession对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        SqlSession sqlSession = MybatisUtils.getSqlSession(true);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //2.获取CardMapper接口的实现类对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        CardMapper mapper = sqlSession.getMapper(CardMapper.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //3.调用实现类对象中的方法，接收结果</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;Card&gt; cardList = mapper.findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">        for (Card card : cardList) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(card);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        //4.释放资源</span></span>
<span class="line"><span style="color:#A6ACCD;">        MybatisUtils.closeSqlSession(sqlSession);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><p>2.2.6 一对一配置总结</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Results：封装映射关系的父注解。</span></span>
<span class="line"><span style="color:#A6ACCD;">    Result[] value()：定义了 Result 数组</span></span>
<span class="line"><span style="color:#A6ACCD;">@Result：封装映射关系的子注解。</span></span>
<span class="line"><span style="color:#A6ACCD;">    column 属性：查询出的表中字段名称</span></span>
<span class="line"><span style="color:#A6ACCD;">    property 属性：实体对象中的属性名称</span></span>
<span class="line"><span style="color:#A6ACCD;">    javaType 属性：被包含对象的数据类型</span></span>
<span class="line"><span style="color:#A6ACCD;">    one 属性：一对一查询固定属性</span></span>
<span class="line"><span style="color:#A6ACCD;"> @One：一对一查询的注解。</span></span>
<span class="line"><span style="color:#A6ACCD;">    select 属性：指定调用某个接口中的方法</span></span></code></pre></div><p>2.3 一对多查询</p><p>2.3.1 一对多查询的模型</p><p>一对多查询的需求：查询一个课程，与此同时查询出该该课程对应的学生信息</p><p>2.3.2 一对多查询的语句</p><p>对应的sql语句：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">SELECT * FROM classes</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">SELECT * FROM student WHERE cid=#{cid}</span></span></code></pre></div><p>2.3.3 创建StudentMapper接口</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface StudentMapper {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //根据cid查询student表</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Select(&quot;SELECT * FROM student WHERE cid=#{cid}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public abstract List&lt;Student&gt; findByCid(Integer cid);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><p>2.3.4 使用注解配置Mapper</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//查询全部</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Select(&quot;SELECT * FROM classes&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Results({</span></span>
<span class="line"><span style="color:#A6ACCD;">            @Result(column = &quot;id&quot;,property = &quot;id&quot;),</span></span>
<span class="line"><span style="color:#A6ACCD;">            @Result(column = &quot;name&quot;,property = &quot;name&quot;),</span></span>
<span class="line"><span style="color:#A6ACCD;">            @Result(</span></span>
<span class="line"><span style="color:#A6ACCD;">                    property = &quot;students&quot;,  // 被包含对象的变量名</span></span>
<span class="line"><span style="color:#A6ACCD;">                    javaType = List.class,  // 被包含对象的实际数据类型</span></span>
<span class="line"><span style="color:#A6ACCD;">                    column = &quot;id&quot;,          // 根据查询出的classes表的id字段来查询student表</span></span>
<span class="line"><span style="color:#A6ACCD;">                    /*</span></span>
<span class="line"><span style="color:#A6ACCD;">                        many、@Many 一对多查询的固定写法</span></span>
<span class="line"><span style="color:#A6ACCD;">                        select属性：指定调用哪个接口中的哪个查询方法</span></span>
<span class="line"><span style="color:#A6ACCD;">                     */</span></span>
<span class="line"><span style="color:#A6ACCD;">      many = @Many(select = &quot;com.by.mapper.StudentMapper.findByCid&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            )</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">    public  List&lt;Classes&gt; findAll();</span></span></code></pre></div><p>2.3.5 测试类</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">oneManyTest</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">//1.通过工厂对象获取SqlSession对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">SqlSession</span><span style="color:#A6ACCD;"> sqlSession </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> MybatisUtils</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getSqlSession</span><span style="color:#89DDFF;">(true);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">//2.获取CardMapper接口的实现类对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">ClassesMapper</span><span style="color:#A6ACCD;"> mapper </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> sqlSession</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getMapper</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ClassesMapper</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">//3.调用实现类对象中的方法，接收结果</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">List</span><span style="color:#89DDFF;">&lt;</span><span style="color:#C792EA;">Classes</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> classesList </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> mapper</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">findAll</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">Classes</span><span style="color:#A6ACCD;"> classes </span><span style="color:#89DDFF;font-style:italic;">:</span><span style="color:#A6ACCD;"> classesList</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            System</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">out</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">classes</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">//4.释放资源</span></span>
<span class="line"><span style="color:#A6ACCD;">        MybatisUtils</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">closeSqlSession</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">sqlSession</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span></code></pre></div><p>运行结果查看：</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112w0dbbc17abe04ea824dedf2ee73db3ddd?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM3NDI3NywiaWF0IjoxNjg5NzY5NDc3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMncwZGJiYzE3YWJlMDRlYTgyNGRlZGYyZWU3M2RiM2RkZCJ9.CKZyz8H-NV2wHfsC-9RioBZR2WYTRY3GoUJgNNxlPl0&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>2.3.6 一对多配置总结</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Results：封装映射关系的父注解。</span></span>
<span class="line"><span style="color:#A6ACCD;">    Result[] value()：定义了 Result 数组</span></span>
<span class="line"><span style="color:#A6ACCD;">@Result：封装映射关系的子注解。</span></span>
<span class="line"><span style="color:#A6ACCD;">    column 属性：查询出的表中字段名称</span></span>
<span class="line"><span style="color:#A6ACCD;">    property 属性：实体对象中的属性名称</span></span>
<span class="line"><span style="color:#A6ACCD;">    javaType 属性：被包含对象的数据类型</span></span>
<span class="line"><span style="color:#A6ACCD;">    many 属性：一对多查询固定属性</span></span>
<span class="line"><span style="color:#A6ACCD;">@Many：一对多查询的注解。</span></span>
<span class="line"><span style="color:#A6ACCD;">    select 属性：指定调用某个接口中的方法</span></span></code></pre></div><p>2.4 多对多查询</p><p>2.4.1 多对多查询的模型</p><p>多对多查询的需求：查询学生以及所对应的课程信息</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112wbbc20574016d6a9bde9e075fd840bda2?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM3NDI3NywiaWF0IjoxNjg5NzY5NDc3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndiYmMyMDU3NDAxNmQ2YTliZGU5ZTA3NWZkODQwYmRhMiJ9.LgJep2LOz068Vs31AbzGxTZX6wl2yIzgKGWi5bQijHU&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>2.4.2 多对多查询的语句</p><p>对应的sql语句：</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">SELECT DISTINCT</span><span style="color:#A6ACCD;"> s.id,s.name,s.age </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> student s,stu_cr sc </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> sc.sid</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">s.id</span></span>
<span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> c.id,c.name </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> stu_cr sc,course c </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> sc.cid</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">c.id </span><span style="color:#F78C6C;">AND</span><span style="color:#A6ACCD;"> sc.sid</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">#{id}</span></span></code></pre></div><p>2.4.3 添加CourseMapper 接口方法</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface CourseMapper {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //根据学生id查询所选课程</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Select(&quot;SELECT c.id,c.name FROM stu_cr sc,course c WHERE sc.cid=c.id AND sc.sid=#{id}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public abstract List&lt;Course&gt; findBySid(Integer id);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><p>2.4.4 使用注解配置Mapper</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//查询全部</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Select(&quot;SELECT DISTINCT s.id,s.name,s.age FROM student s,stu_cr sc WHERE sc.sid=s.id&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Results({</span></span>
<span class="line"><span style="color:#A6ACCD;">            @Result(column = &quot;id&quot;,property = &quot;id&quot;),</span></span>
<span class="line"><span style="color:#A6ACCD;">            @Result(column = &quot;name&quot;,property = &quot;name&quot;),</span></span>
<span class="line"><span style="color:#A6ACCD;">            @Result(column = &quot;age&quot;,property = &quot;age&quot;),</span></span>
<span class="line"><span style="color:#A6ACCD;">            @Result(</span></span>
<span class="line"><span style="color:#A6ACCD;">                    property = &quot;courses&quot;,   // 被包含对象的变量名</span></span>
<span class="line"><span style="color:#A6ACCD;">                    javaType = List.class,  // 被包含对象的实际数据类型</span></span>
<span class="line"><span style="color:#A6ACCD;">                    column = &quot;id&quot;,          // 根据查询出student表的id来作为关联条件，去查询中间表和课程表</span></span>
<span class="line"><span style="color:#A6ACCD;">                    /*</span></span>
<span class="line"><span style="color:#A6ACCD;">                        many、@Many 一对多查询的固定写法</span></span>
<span class="line"><span style="color:#A6ACCD;">                        select属性：指定调用哪个接口中的哪个查询方法</span></span>
<span class="line"><span style="color:#A6ACCD;">                     */</span></span>
<span class="line"><span style="color:#A6ACCD;">                    many = @Many(select = &quot;com.by.mapper.CourseMapper.findBySid&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            )</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">    public List&lt;Student&gt; findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><p>2.4.5 测试类</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void ManyToManyTest(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        //1.通过工厂对象获取SqlSession对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        SqlSession sqlSession = MybatisUtils.getSqlSession(true);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //2.获取CardMapper接口的实现类对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //3.调用实现类对象中的方法，接收结果</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;Student&gt; studentList = mapper.findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">        for (Student student : studentList) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(student.getId() + &quot;,&quot; + student.getName() + &quot;,&quot; + student.getAge());</span></span>
<span class="line"><span style="color:#A6ACCD;">            List&lt;Course&gt; courses = student.getCourses();</span></span>
<span class="line"><span style="color:#A6ACCD;">            for (Course cours : courses) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                System.out.println(cours);</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        //4.释放资源</span></span>
<span class="line"><span style="color:#A6ACCD;">        MybatisUtils.closeSqlSession(sqlSession);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>结果打印：</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112w1a5374791ee3f7444f43109803e122ab?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM3NDI3NywiaWF0IjoxNjg5NzY5NDc3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMncxYTUzNzQ3OTFlZTNmNzQ0NGY0MzEwOTgwM2UxMjJhYiJ9.iWWU75x6_vUfiIssSNkLcCTzEn4g7Z8FOttqH1gcR0M&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>2.4.6 多对多配置总结</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Results：封装映射关系的父注解。</span></span>
<span class="line"><span style="color:#A6ACCD;">    Result[] value()：定义了 Result 数组</span></span>
<span class="line"><span style="color:#A6ACCD;">@Result：封装映射关系的子注解。</span></span>
<span class="line"><span style="color:#A6ACCD;">    column 属性：查询出的表中字段名称</span></span>
<span class="line"><span style="color:#A6ACCD;">    property 属性：实体对象中的属性名称</span></span>
<span class="line"><span style="color:#A6ACCD;">    javaType 属性：被包含对象的数据类型</span></span>
<span class="line"><span style="color:#A6ACCD;">    many 属性：一对多查询固定属性</span></span>
<span class="line"><span style="color:#A6ACCD;">@Many：一对多查询的注解。</span></span>
<span class="line"><span style="color:#A6ACCD;">    select 属性：指定调用某个接口中的方法</span></span></code></pre></div>`,71),t=[e];function o(c,i,C,r,A,y){return a(),n("div",null,t)}const u=s(p,[["render",o]]);export{d as __pageData,u as default};
