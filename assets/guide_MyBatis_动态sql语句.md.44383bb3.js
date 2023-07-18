import{_ as s,o as n,c as a,O as l}from"./chunks/framework.571309da.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/MyBatis/动态sql语句.md","filePath":"guide/MyBatis/动态sql语句.md","lastUpdated":1689580407000}'),p={name:"guide/MyBatis/动态sql语句.md"},o=l(`<p>1.1 动态sql语句概述</p><p>Mybatis 的映射文件中，前面我们的 SQL 都是比较简单的，有些时候业务逻辑复杂时，我们的 SQL是动态变化的，此时在前面的学习中我们的 SQL 就不能满足要求了。</p><p>参考的官方文档，描述如下：</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112ve8f91374d7a53309c92bcd4ea3c1bf6f?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3Nzg4MCwiaWF0IjoxNjg5NTczMDgwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlOGY5MTM3NGQ3YTUzMzA5YzkyYmNkNGVhM2MxYmY2ZiJ9.JAr6CPfKDbQBYvBGUOC8Glcurvh_H9ETciKc6FgHyyM&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>1.2 动态 SQL 之&lt;<strong>if&gt;</strong></p><p>我们根据实体类的不同取值，使用不同的 SQL语句来进行查询。比如在 id如果不为空时可以根据id查询，如果username 不同空时还要加入用户名作为条件。这种情况在我们的多条件组合查询中经常会碰到。</p><p>如下图：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;select id=&quot;findColl&quot; parameterType=&quot;user&quot; resultType=&quot;user&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        select * from T_user</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;where&gt; &lt;!--表示where--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;if test=&quot;id!=0&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                 id=#{id}</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;/if&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;if test=&quot;username!=null and username!=&#39;&#39;&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                and username=#{username}</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;/if&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/where&gt;</span></span></code></pre></div><p><strong>编写dao接口：</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//多条件查询</span></span>
<span class="line"><span style="color:#A6ACCD;">public List&lt;User&gt; findColl(User user);</span></span></code></pre></div><p>当查询条件id和username都存在时，控制台打印的sql语句如下：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void findCollT(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        SqlSession sqlSession = MybatisUtils.getSqlSession(true);</span></span>
<span class="line"><span style="color:#A6ACCD;">        UserDao mapper = sqlSession.getMapper(UserDao.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        User user=new User();</span></span>
<span class="line"><span style="color:#A6ACCD;">        user.setId(1);</span></span>
<span class="line"><span style="color:#A6ACCD;">        user.setUsername(&quot;张三&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;User&gt; coll = mapper.findColl(user);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(coll.toString());</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">        MybatisUtils.closeSqlSession(sqlSession);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p><img src="https://tcs-devops.aliyuncs.com/storage/112vca2882de488e1ef304d93a27ed0960c3?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3Nzg4MCwiaWF0IjoxNjg5NTczMDgwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZjYTI4ODJkZTQ4OGUxZWYzMDRkOTNhMjdlZDA5NjBjMyJ9.CEHs3Rli_VdcUdqYLu6qsL51SZQr9qr_WseB9XH8SPc&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>当查询条件只有id存在时，控制台打印的sql语句如下：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//获得MyBatis框架生成的UserDao接口的实现类</span></span>
<span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void findCollT(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        SqlSession sqlSession = MybatisUtils.getSqlSession(true);</span></span>
<span class="line"><span style="color:#A6ACCD;">        UserDao mapper = sqlSession.getMapper(UserDao.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        User user=new User();</span></span>
<span class="line"><span style="color:#A6ACCD;">        user.setId(1);</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;User&gt; coll = mapper.findColl(user);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(coll.toString());</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        MybatisUtils.closeSqlSession(sqlSession);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><p><img src="https://tcs-devops.aliyuncs.com/storage/112vd366b41f1a3e8d1ba33b4ce5e355ef4f?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3Nzg4MCwiaWF0IjoxNjg5NTczMDgwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZkMzY2YjQxZjFhM2U4ZDFiYTMzYjRjZTVlMzU1ZWY0ZiJ9.QOiO9tC_ZecMYpOyTUS27QmUtWGtIufCI6HPGHFqklk&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>总结语法:</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;where&gt;：条件标签。如果有动态条件，则使用该标签代替 where 关键字。</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;if&gt;：条件判断标签。</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;if test=“条件判断”&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    查询条件拼接</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/if&gt;</span></span></code></pre></div><p>1.3 动态sql之set (update insert)</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">!</span><span style="color:#676E95;font-style:italic;">-- 动态语句 set 更新语句 update 表名 set name=#{name} --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">update</span><span style="color:#A6ACCD;"> id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">updateMap</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> parameterType</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">map</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F78C6C;">update</span><span style="color:#A6ACCD;"> T_user </span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">if</span><span style="color:#A6ACCD;"> test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username!=null</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">username</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">#{username},</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">if</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">if</span><span style="color:#A6ACCD;"> test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">sex!=null</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">sex</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">#{sex}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">if</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">where</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">if</span><span style="color:#A6ACCD;"> test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">id!=null</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">#{id}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">if</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">where</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">update</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">!</span><span style="color:#676E95;font-style:italic;">-- 动态语句 set 插入语句 insert into 表名 set name=#{name},age=#{age} --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">insert</span><span style="color:#A6ACCD;"> id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">saveMap</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> parameterType</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">map</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F78C6C;">insert into</span><span style="color:#A6ACCD;"> T_user</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">if</span><span style="color:#A6ACCD;"> test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">id!=null</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">#{id},</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">if</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">if</span><span style="color:#A6ACCD;"> test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username!=null</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">username</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">#{username},</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">if</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">if</span><span style="color:#A6ACCD;"> test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">sex!=null</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">sex</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">#{sex},</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">if</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">if</span><span style="color:#A6ACCD;"> test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">address!=null</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#F78C6C;">address</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">#{</span><span style="color:#F78C6C;">address</span><span style="color:#A6ACCD;">},</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">if</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">if</span><span style="color:#A6ACCD;"> test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">birthday!=null</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">birthday</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">#{birthday}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">if</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F78C6C;">insert</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>编写dao接口添加方法：</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">updateMap</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">Map</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">String </span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> map</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">saveMap</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">Map</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">String </span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> map</span><span style="color:#89DDFF;">);</span></span></code></pre></div><p>测试类编写：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">修改的测试方法</span></span>
<span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void updatemap(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        SqlSession sqlSession = MybatisUtils.getSqlSession(true);</span></span>
<span class="line"><span style="color:#A6ACCD;">        UserDao mapper = sqlSession.getMapper(UserDao.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        Map&lt;String,Object&gt; map=new HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">        map.put(&quot;id&quot;,1);</span></span>
<span class="line"><span style="color:#A6ACCD;">        map.put(&quot;username&quot;,&quot;老六&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        map.put(&quot;sex&quot;,&quot;女&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        int i = mapper.updateMap(map);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(i);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">添加的测试方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void savemapT(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        SqlSession sqlSession = MybatisUtils.getSqlSession(true);</span></span>
<span class="line"><span style="color:#A6ACCD;">        UserDao mapper = sqlSession.getMapper(UserDao.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        Map&lt;String,Object&gt; map=new HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">        map.put(&quot;username&quot;,&quot;老六&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        map.put(&quot;sex&quot;,&quot;女&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        map.put(&quot;address&quot;,&quot;郑州&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        map.put(&quot;birthday&quot;,Date.valueOf(&quot;2010-03-09&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">        int i = mapper.saveMap(map);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(i);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>总结语法：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;set&gt;：条件标签。set 元素可以用于动态包含需要更新的列</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;if&gt;：条件判断标签。</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;if test=&quot;条件判断&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    查询条件拼接</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/if&gt;</span></span></code></pre></div><p>1.4 动态sql之choose (when, otherwise)</p><p>相当于Java中的switch语句</p><p>当when有条件满足的时候，就跳出choose</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;choose&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;when test=&quot;条件1&quot;&gt;...&lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;when test=&quot;条件2&quot;&gt;...&lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;when test=&quot;条件3&quot;&gt;...&lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;otherwise&gt;其他条件&lt;/otherwise&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/choose&gt;</span></span></code></pre></div><p>代码演示步骤：</p><p>1、编写Dao接口代码</p><p>2、编写mapper文件</p><p>3、测试运行</p><p>代码实现：</p><p><strong>编写Dao接口代码</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public List&lt;User&gt; showUserfindAll(</span></span>
<span class="line"><span style="color:#A6ACCD;">       @Param(&quot;username&quot;) String username,</span></span>
<span class="line"><span style="color:#A6ACCD;">        @Param(&quot;sex&quot;) String sex,</span></span>
<span class="line"><span style="color:#A6ACCD;">        @Param(&quot;address&quot;) String address,</span></span>
<span class="line"><span style="color:#A6ACCD;">        @Param(&quot;birthday&quot;) Date birthday);</span></span></code></pre></div><p>编写mapper文件</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!-- 动态语句choose when when otherwise --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!-- if elseif elseif else</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;choose&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;when test=&quot;&quot;&gt;&lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;when test=&quot;&quot;&gt;&lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;when test=&quot;&quot;&gt;&lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;otherwise&gt;...&lt;/otherwise&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/choose&gt;--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;select id=&quot;showUserfindAll&quot; resultType=&quot;com.by.pojo.User&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    select * from user where </span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;choose&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;when test=&quot;username!=null and username!=&#39;&#39;&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">             username like concat(&quot;%&quot;,#{username},&quot;%&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;when test=&quot;sex!=null and sex!=&#39;&#39;&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">             sex =#{sex}</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;when test=&quot;address!=null and address!=&#39;&#39;&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            address like concat(&quot;%&quot;,#{address},&quot;%&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;otherwise&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">             year(birthday)=year(#{birthday})</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/otherwise&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/choose&gt;</span></span></code></pre></div><p>另一种写法</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;select id=&quot;showUserfindAll&quot; resultType=&quot;com.by.pojo.User&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        select * from user where 1=1</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;choose&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;when test=&quot;username!=null&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">              &lt;choose&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                 &lt;when test=&quot;username.indexOf(&#39;%&#39;)!=-1&quot;&gt;username like #{username}&lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                 &lt;when test=&quot;username.indexOf(&#39;_&#39;)!=-1&quot;&gt;username like #{username}&lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                 &lt;otherwise&gt;username = #{username}&lt;/otherwise&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">              &lt;/choose&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;when test=&quot;sex!=null and sex!=&#39;&#39;&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">               and sex =#{sex}</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;when test=&quot;address!=null and address!=&#39;&#39;&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                address like concat(&quot;%&quot;,#{address},&quot;%&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;/when&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;otherwise&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                birthday=#{birthday}</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;/otherwise&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/choose&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/select&gt;</span></span></code></pre></div><p>实体和数据库名字不匹配</p><div class="language-xml"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 查询中如果表字段名和实体类名不一致，不想定义ResultMap,可以使用查询的列名 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">sql</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">s1p</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">id,user_name username,birthday birth,address addr,sex sex</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">sql</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">select</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">showUserfindAll</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">resultType</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">com.by.pojo.User</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    select </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">include</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">refid</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">s1p</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">/&gt;</span><span style="color:#A6ACCD;"> from user where 1=1</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">choose</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">when</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username!=null</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">choose</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">when</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username.indexOf(&#39;%&#39;)!=-1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">user_name like #{username}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">when</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">when</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username.indexOf(&#39;_&#39;)!=-1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">user_name like #{username}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">when</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">otherwise</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">user_name = #{username}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">otherwise</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">choose</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">when</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">when</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">sex!=null and sex!=&#39;&#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            and sex =#{sex}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">when</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">when</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">test</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">address!=null and address!=&#39;&#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            and address like concat(&quot;%&quot;,#{addr},&quot;%&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">when</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">otherwise</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            and year(birthday)=year(#{birth})</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">otherwise</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">choose</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">select</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>测试运行</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">test</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> throws IOException </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">InputStream</span><span style="color:#A6ACCD;"> is </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Resources</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getResourceAsStream</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mybatis-config.xml</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">SqlSessionFactory</span><span style="color:#A6ACCD;"> factory</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">SqlSessionFactoryBuilder</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">is</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">SqlSession</span><span style="color:#A6ACCD;"> session </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> factory</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">openSession</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">UserDao</span><span style="color:#A6ACCD;"> userDao </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> session</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getMapper</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">UserDao</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">List</span><span style="color:#89DDFF;">&lt;</span><span style="color:#C792EA;">User</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> users </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> userDao</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">showUserfindAll</span><span style="color:#89DDFF;">(null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">男</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">河</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null);</span></span>
<span class="line"><span style="color:#A6ACCD;">        System</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">out</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">users</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toString</span><span style="color:#89DDFF;">());</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span></code></pre></div><p>1.5 动态 SQL 之&lt;<strong>foreach&gt;</strong></p><p>循环执行sql的拼接操作，例如：SELECT * FROM user WHERE id IN (1,2,5)。</p><p><strong>foreach</strong> 迭代一个集合，通常用于in条件</p><p>属性：</p><ul><li><p>item 查询条件</p></li><li><p>collection：必须指定</p><ul><li><p>list</p></li><li><p>array</p></li><li><p>map—key</p></li></ul></li><li><p>open ： 括号 (</p></li><li><p>separator ：分割符 ，</p></li><li><p>close :括号 ）</p></li></ul><p>例子如下</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--循环迭代--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;select id=&quot;findByIds&quot; parameterType=&quot;list&quot; resultType=&quot;user&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!--</span></span>
<span class="line"><span style="color:#A6ACCD;">        collection: 表示集合存储类型 分别为 list array数组</span></span>
<span class="line"><span style="color:#A6ACCD;">           open : id in (  是指代  where id in(</span></span>
<span class="line"><span style="color:#A6ACCD;">           close： 闭合括号</span></span>
<span class="line"><span style="color:#A6ACCD;">           item : 查询条件</span></span>
<span class="line"><span style="color:#A6ACCD;">           separator： 分割符</span></span>
<span class="line"><span style="color:#A6ACCD;">    --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    select * from T_user</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;where&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;foreach collection=&quot;list&quot; open=&quot;id in (&quot; close=&quot;)&quot; item=&quot;id&quot; separator=&quot;,&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        #{id}</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/foreach&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/where&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/select&gt;</span></span></code></pre></div><p>编写dao接口：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//根据多个id查询</span></span>
<span class="line"><span style="color:#A6ACCD;">public List&lt;User&gt; findByIds(List&lt;Integer&gt; ids);</span></span></code></pre></div><p>测试代码片段如下：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void findByidst() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        //获取sqlssession给定的对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        SqlSession sqlSession = MybatisUtils.getSqlSession(true);</span></span>
<span class="line"><span style="color:#A6ACCD;">        UserDao mapper = sqlSession.getMapper(UserDao.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //创建list集合 并赋值</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;Integer&gt; list=new ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">        list.add(1);</span></span>
<span class="line"><span style="color:#A6ACCD;">        list.add(3);</span></span>
<span class="line"><span style="color:#A6ACCD;">        list.add(5);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //把集合里面的值赋给mapper</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;User&gt; byIds = mapper.findByIds(list);</span></span>
<span class="line"><span style="color:#A6ACCD;">        for (User byId : byIds) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(byId);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        MybatisUtils.closeSqlSession(sqlSession);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>总结语法:</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;foreach&gt;：循环遍历标签。适用于多个参数或者的关系。</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;foreach collection=“”open=“”close=“”item=“”separator=“”&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        获取参数</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/foreach&gt;</span></span></code></pre></div><p>属性collection：参数容器类型， (list-集合， array-数组)。open：开始的 SQL 语句 id in （。close：结束的 SQL 语句。item：参数变量名。separator：分隔符。</p><p>1.6 SQL片段抽取</p><p>Sql 中可将重复的 sql 提取出来，使用时用 include 引用即可，最终达到 sql 重用的目的</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--抽取sql片段简化编写--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;sql id=&quot;selectUser&quot; select * from student&lt;/sql&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--根据id查询--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;select id=&quot;findById&quot; parameterType=&quot;int&quot; resultType=&quot;user&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;include refid=&quot;selectUser&quot;&gt;&lt;/include&gt; where id=#{id}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/select&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--根据ids遍历--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;select id=&quot;findByIds&quot; parameterType=&quot;list&quot; resultType=&quot;student&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;include refid=&quot;selectUser&quot;&gt;&lt;/include&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;where&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;foreach collection=&quot;array&quot; open=&quot;id in(&quot; close=&quot;)&quot; item=&quot;id&quot; separator=&quot;,&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            #{id}</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/foreach&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/where&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/select&gt;</span></span></code></pre></div><p>总结语法:</p><p>我们可以将一些重复性的 SQL 语句进行抽取，以达到复用的效果。</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">-  &lt;sql&gt;：抽取 SQL 语句标签。 </span></span>
<span class="line"><span style="color:#A6ACCD;">-  &lt;include&gt;：引入 SQL 片段标签。 </span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;sql id=“片段唯一标识”&gt;抽取的 SQL 语句&lt;/sql&gt; &lt;include refid=“片段唯一标识”/&gt;</span></span></code></pre></div><p>1.7 知识小结</p><p>MyBatis映射文件配置：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;select&gt;：查询</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;insert&gt;：插入</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;update&gt;：修改</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;delete&gt;：删除</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;where&gt;：where条件</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;if&gt;：if判断</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;foreach&gt;：循环</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;sql&gt;：sql片段抽取</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div>`,68),e=[o];function t(c,r,D,C,y,i){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{F as __pageData,u as default};
