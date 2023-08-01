import{_ as s,o as n,c as a,O as l}from"./chunks/framework.571309da.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/MyBatis/整合mybatisplus.md","filePath":"guide/MyBatis/整合mybatisplus.md","lastUpdated":1689910169000}'),p={name:"guide/MyBatis/整合mybatisplus.md"},e=l(`<p><strong>实现步骤：</strong></p><p><strong>导入jar包：</strong></p><div class="language-xml"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependencies</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.springframework</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">spring-context</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">5.3.20</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.springframework</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">spring-jdbc</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">5.3.8</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">mysql</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">mysql-connector-java</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">8.0.29</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">com.alibaba</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">druid</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">1.1.16</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.projectlombok</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">lombok</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">1.18.26</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!--    &lt;dependency&gt;--&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!--      &lt;groupId&gt;org.mybatis&lt;/groupId&gt;--&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!--      &lt;artifactId&gt;mybatis-spring&lt;/artifactId&gt;--&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!--      &lt;version&gt;2.0.5&lt;/version&gt;--&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!--    &lt;/dependency&gt;--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">junit</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">junit</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">4.13</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">scope</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">test</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">scope</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.springframework</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">spring-test</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">5.3.20</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">com.baomidou</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">mybatis-plus</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">3.1.1</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">&lt;!--mybatisPlus 自动生成器--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">com.baomidou</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">mybatis-plus-generator</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">3.4.0</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">&lt;!--mybatisPlus默认模板--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.apache.velocity</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">velocity-engine-core</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">2.2</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">com.baomidou</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">mybatis-plus-extension</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">3.4.1</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependencies</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>1、编写mapper接口</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import com.baomidou.mybatisplus.core.mapper.BaseMapper;</span></span>
<span class="line"><span style="color:#A6ACCD;">import com.by.pojo.User;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">public interface UserMapper extends BaseMapper&lt;User&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>2、编写mapper映射文件</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--MyBatis的DTD约束--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE mapper</span></span>
<span class="line"><span style="color:#A6ACCD;">        PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;https://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;mapper namespace=&quot;com.by.mapper.UserMapper&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/mapper&gt;</span></span></code></pre></div><p>3、编写测试类：</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Test</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MpfindTest</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> throws Exception </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">InputStream</span><span style="color:#A6ACCD;"> is </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Resources</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getResourceAsStream</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mybatis-config.xml</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">SqlSessionFactory</span><span style="color:#A6ACCD;"> build </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MybatisSqlSessionFactoryBuilder</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">is</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">SqlSession</span><span style="color:#A6ACCD;"> session </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> build</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">openSession</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">UserMapper</span><span style="color:#A6ACCD;"> mapper </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> session</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getMapper</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">UserMapper</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">List</span><span style="color:#89DDFF;">&lt;</span><span style="color:#C792EA;">User</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> users </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> mapper</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">selectList</span><span style="color:#89DDFF;">(null);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">//List&lt;User&gt; users = userService.findAll();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">User</span><span style="color:#A6ACCD;"> user </span><span style="color:#89DDFF;font-style:italic;">:</span><span style="color:#A6ACCD;"> users</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        System</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">out</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">user</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span></code></pre></div><h3 id="_6-1-mybatisplus概述" tabindex="-1">6.1 MyBatisPlus概述 <a class="header-anchor" href="#_6-1-mybatisplus概述" aria-label="Permalink to &quot;6.1 MyBatisPlus概述&quot;">​</a></h3><p>问题导入</p><p>通过入门案例制作，MyBatisPlus的优点有哪些？</p><p>MyBatis介绍</p><ul><li><p>MyBatisPlus（简称MP）是基于MyBatis框架基础上开发的增强型工具，旨在简化开发、提高效率</p></li><li><p>官网：<a href="https://mybatis.plus/" target="_blank" rel="noreferrer">https</a><a href="https://mybatis.plus/" target="_blank" rel="noreferrer">😕/mybatis.plus</a><a href="https://mybatis.plus/" target="_blank" rel="noreferrer">/</a> <a href="https://mp.baomidou.com/" target="_blank" rel="noreferrer">https://mp.baomidou.com</a><a href="https://mp.baomidou.com/" target="_blank" rel="noreferrer">/</a></p></li></ul><p>MyBatisPlus特性</p><ul><li><p>无侵入：只做增强不做改变，不会对现有工程产生影响</p></li><li><p>强大的 CRUD 操作：内置通用 Mapper，少量配置即可实现单表CRUD 操作</p></li><li><p>支持 Lambda：编写查询条件无需担心字段写错</p></li><li><p>支持主键自动生成</p></li><li><p>内置分页插件</p></li><li><p>……</p></li></ul><p>6.2、标准数据层开发</p><p>MyBatisPlus的CRUD操作</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112wdd55de567e64db8006e3f4f477054ba5?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDUwNDA5OCwiaWF0IjoxNjg5ODk5Mjk4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndkZDU1ZGU1NjdlNjRkYjgwMDZlM2Y0ZjQ3NzA1NGJhNSJ9.LnKLu4fLO6JOQ_eR1cpO9Y0ayKIr_S14nMer2uXqF-I&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>添加操作：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void InsertTest() throws IOException {</span></span>
<span class="line"><span style="color:#A6ACCD;">    InputStream is = Resources.getResourceAsStream(&quot;mybatis-config.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    SqlSession session = new MybatisSqlSessionFactoryBuilder().build(is).openSession();</span></span>
<span class="line"><span style="color:#A6ACCD;">    UserMapper mapper = session.getMapper(UserMapper.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">    User user=new User();</span></span>
<span class="line"><span style="color:#A6ACCD;">    user.setId(1233444);</span></span>
<span class="line"><span style="color:#A6ACCD;">    user.setUsername(&quot;测试&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    user.setSex(&quot;无&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    user.setAddress(&quot;adasdada&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    user.setBirthday(Date.valueOf(&quot;2020-03-09&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">    mapper.insert(user);</span></span>
<span class="line"><span style="color:#A6ACCD;">    session.commit();</span></span>
<span class="line"><span style="color:#A6ACCD;">    session.close();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>修改操作：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void update() throws IOException {</span></span>
<span class="line"><span style="color:#A6ACCD;">    InputStream is = Resources.getResourceAsStream(&quot;mybatis-config.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    SqlSession session = new MybatisSqlSessionFactoryBuilder().build(is).openSession();</span></span>
<span class="line"><span style="color:#A6ACCD;">    UserMapper mapper = session.getMapper(UserMapper.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">    User user=new User();</span></span>
<span class="line"><span style="color:#A6ACCD;">    user.setId(1233444);</span></span>
<span class="line"><span style="color:#A6ACCD;">    user.setUsername(&quot;完成测试&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    user.setSex(&quot;女&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    user.setAddress(&quot;河南开封&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    user.setBirthday(Date.valueOf(&quot;2020-03-09&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">    mapper.update(user,null);</span></span>
<span class="line"><span style="color:#A6ACCD;">    session.commit();</span></span>
<span class="line"><span style="color:#A6ACCD;">    session.close();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">//删除操作：</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void delete() throws IOException {</span></span>
<span class="line"><span style="color:#A6ACCD;">    InputStream is = Resources.getResourceAsStream(&quot;mybatis-config.xml&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    SqlSession session = new MybatisSqlSessionFactoryBuilder().build(is).openSession();</span></span>
<span class="line"><span style="color:#A6ACCD;">    UserMapper mapper = session.getMapper(UserMapper.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">    mapper.deleteById(1233444);</span></span>
<span class="line"><span style="color:#A6ACCD;">    session.commit();</span></span>
<span class="line"><span style="color:#A6ACCD;">    session.close();</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="七、spring整合mybatisplus技术" tabindex="-1">七、spring整合mybatisPlus技术 <a class="header-anchor" href="#七、spring整合mybatisplus技术" aria-label="Permalink to &quot;七、spring整合mybatisPlus技术&quot;">​</a></h3><p>3.1 使用注解模式整合：</p><p><strong>第一步编写配置文件</strong>：</p><p>注意：和整合mybatis一样的步骤，就是更改一下 MybatisSqlSessionFactoryBean 其他地方不用修改</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class MybatisConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //定义bean，SqlSessionFactoryBean，用于产生SqlSessionFactory对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    public MybatisSqlSessionFactoryBean sqlSessionFactory(DataSource dataSource){</span></span>
<span class="line"><span style="color:#A6ACCD;">        MybatisSqlSessionFactoryBean sfb=new MybatisSqlSessionFactoryBean();</span></span>
<span class="line"><span style="color:#A6ACCD;">        sfb.setTypeAliasesPackage(&quot;com.by.pojo&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        sfb.setDataSource(dataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return sfb;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    //定义bean，返回MapperScannerConfigurer对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    public MapperScannerConfigurer mapperScannerConfigurer(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        MapperScannerConfigurer mscf=new MapperScannerConfigurer();</span></span>
<span class="line"><span style="color:#A6ACCD;">        mscf.setBasePackage(&quot;com.by.mapper&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return mscf;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>springconfig配置类：</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Configuration</span></span>
<span class="line"><span style="color:#A6ACCD;">@ComponentScan(&quot;com.by&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">@PropertySource(&quot;classpath:jdbc.properties&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">@Import({jdbcConfig.class,MybatisConfig.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">public class SpringConfig {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>第二步：编写mapper接口继承mp 的接口类</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface UserMapper extends BaseMapper&lt;User&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>第三步：编写service接口实现 IService接口</strong></p><p>注意：通用Service CRUD 封装IService接口,进一步封装 CRUD 采用 get 查询单行 ，remove 删除，list 查询集合， page 分页 ，前缀命名方式区分 Mapper方法</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public interface UserService extends IService&lt;User&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    public List&lt;User&gt; findUserList();</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>第四步：编写Service实现类同时实现impl接口</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Service</span></span>
<span class="line"><span style="color:#A6ACCD;">public class UserServiceImpl extends ServiceImpl&lt;UserMapper,User&gt; implements UserService {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    private UserMapper userMapper;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public List&lt;User&gt; findUserList() {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">        return userMapper.selectList(null);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>第五步：编写测试类</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">@ContextConfiguration(classes = SpringConfig.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class MtwoTest {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    public UserService userService;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void findAllt(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;User&gt; userList = userService.findUserList();//自带</span></span>
<span class="line"><span style="color:#A6ACCD;">        for (User user : userList) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(&quot;   &quot;+user);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;User&gt; list = userService.list(null);</span></span>
<span class="line"><span style="color:#A6ACCD;">        for (User user1 : list) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(&quot;系统提供的方法&quot;+user1);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>3.2 通过主键查询</strong></p><p>service接口和实现类编写自己的方法也可以不写：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public User selectById(Integer id);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">//根据主键查询</span></span>
<span class="line"><span style="color:#A6ACCD;">@Override</span></span>
<span class="line"><span style="color:#A6ACCD;">public User selectById(Integer id) {</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    return userMapper.selectById(id);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>测试方法：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testGetById(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    User user1 = userService.selectById(1);//自己编写的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    User user = userService.getById(1); //系统自带的</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;自己编写的方法=&quot;+user1);</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;系统自带的方法=&quot;+user);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>3.3通过多个主键id批量查询</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void selectIds(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    List&lt;Integer&gt; ids = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">    ids.add(1);</span></span>
<span class="line"><span style="color:#A6ACCD;">    ids.add(2);</span></span>
<span class="line"><span style="color:#A6ACCD;">    ids.add(3);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    Collection&lt;User&gt; userList = userService.listByIds(ids);</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (User user : userList) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(user);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>3.4 条件查询</p><p>要想为sql语句添加where条件，需要使用mybatis plus的条件构造器对象Wrapper，该对象中提供了对sql条件操作的各种方法：</p><p>官网：<a href="https://baomidou.com/pages/10c804/#alleq" target="_blank" rel="noreferrer">https://baomidou.com/pages/10c804/#alleq</a></p><p>示例：查询性别为‘男’，根据生日降序排列</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void  qwTest(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    QueryWrapper&lt;User&gt; qw=new QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">    qw.like(&quot;username&quot;,&quot;原&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    /*</span></span>
<span class="line"><span style="color:#A6ACCD;">          or 是或者的意思</span></span>
<span class="line"><span style="color:#A6ACCD;">          eq 是等于的意思  sex = 男</span></span>
<span class="line"><span style="color:#A6ACCD;">          orderByDesc 数据排序</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    qw.or().eq(&quot;sex&quot;,&quot;男&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    qw.orderByDesc(&quot;birthday&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    List&lt;User&gt; list = userService.list(qw);</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (User user : list) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(user);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>sql分析：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">select * from user WHERE (user_name LIKE ? OR sex = ?) ORDER BY birthday DESC</span></span></code></pre></div><p>3.5 <strong>分页查询</strong></p><pre><code>MyBatis Plus自带分页插件，只要简单的配置即可实现分页功能
</code></pre><ul><li>在spring的配置类中添加mybatis plus的分页插件拦截器</li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public MybatisSqlSessionFactoryBean sqlSessionFactory(DataSource dataSource){</span></span>
<span class="line"><span style="color:#A6ACCD;">    MybatisSqlSessionFactoryBean sfb=new MybatisSqlSessionFactoryBean();</span></span>
<span class="line"><span style="color:#A6ACCD;">    sfb.setTypeAliasesPackage(&quot;com.by.pojo&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    sfb.setDataSource(dataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">    //配置mybatis plus分页插件</span></span>
<span class="line"><span style="color:#A6ACCD;">    MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();</span></span>
<span class="line"><span style="color:#A6ACCD;">    //设置分页拦截器,指定 mysql数据库类型</span></span>
<span class="line"><span style="color:#A6ACCD;">    mybatisPlusInterceptor.addInnerInterceptor(</span></span>
<span class="line"><span style="color:#A6ACCD;">            new PaginationInnerInterceptor(DbType.MYSQL));</span></span>
<span class="line"><span style="color:#A6ACCD;">    sfb.setPlugins(mybatisPlusInterceptor);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    return sfb;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>编写业务层自己的方法：</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public IPage&lt;User&gt; getPageInfo(int pageNum, int pageSize);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;"> @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public IPage&lt;User&gt; getPageInfo(int pageNum, int pageSize) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        IPage&lt;User&gt; page = new Page&lt;&gt;(pageNum,pageSize);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //参数1为分页参数,参数2为分页查询条件</span></span>
<span class="line"><span style="color:#A6ACCD;">        IPage&lt;User&gt; pageInfo  = userMapper.selectPage(page,null);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return pageInfo;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>测试类：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Test</span></span>
<span class="line"><span style="color:#A6ACCD;">public void testGetByPage(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    IPage&lt;User&gt; userPage = new Page&lt;&gt;(1,3);</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">    QueryWrapper&lt;User&gt; queryWrapper = new QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">    //第二个参数为查询条件</span></span>
<span class="line"><span style="color:#A6ACCD;">    IPage&lt;User&gt; page = userService.page(userPage,queryWrapper); //使用IService中的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    //IPage&lt;User&gt; page = userService.getPageInfo(1,3); //自己写的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (User user : page.getRecords()) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(user);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;page.getPages():&quot;+page.getPages());</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;page.getCurrent():&quot;+page.getCurrent());</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;page.getSize():&quot;+page.getSize());</span></span>
<span class="line"><span style="color:#A6ACCD;">    System.out.println(&quot;page.getTotal():&quot;+page.getTotal());</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="八-快速开发-代码生成器" tabindex="-1">八 快速开发-代码生成器 <a class="header-anchor" href="#八-快速开发-代码生成器" aria-label="Permalink to &quot;八  快速开发-代码生成器&quot;">​</a></h2><h3 id="pom包导入" tabindex="-1">pom包导入 <a class="header-anchor" href="#pom包导入" aria-label="Permalink to &quot;pom包导入&quot;">​</a></h3><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--代码生成器--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;groupId&gt;com.baomidou&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;artifactId&gt;mybatis-plus-generator&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;version&gt;3.4.1&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--velocity模板引擎--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;groupId&gt;org.apache.velocity&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;artifactId&gt;velocity-engine-core&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;version&gt;2.3&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;groupId&gt;org.freemarker&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;artifactId&gt;freemarker&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;version&gt;2.3.30&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/dependency&gt;</span></span></code></pre></div><h3 id="测试代码块编写" tabindex="-1">测试代码块编写 <a class="header-anchor" href="#测试代码块编写" aria-label="Permalink to &quot;测试代码块编写&quot;">​</a></h3><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    FastAutoGenerator.create(</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;jdbc:mysql://localhost:3306/mybatisdb?useUnicode=true&amp;characterEncoding=UTF-8&amp;serverTimezone=Asia/Shanghai&amp;useSSL=false&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;root&quot;, &quot;12345&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .globalConfig(builder -&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">                builder.author(&quot;小白程序&quot;) // 设置作者</span></span>
<span class="line"><span style="color:#A6ACCD;">                        .enableSwagger() // 开启 swagger 模式</span></span>
<span class="line"><span style="color:#A6ACCD;">                        .fileOverride() // 覆盖已生成文件</span></span>
<span class="line"><span style="color:#A6ACCD;">                        .outputDir(&quot;D://ideawork&quot;); // 指定输出目录</span></span>
<span class="line"><span style="color:#A6ACCD;">            })</span></span>
<span class="line"><span style="color:#A6ACCD;">            .packageConfig(builder -&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">                builder.parent(&quot;com.by&quot;) // 设置父包名</span></span>
<span class="line"><span style="color:#A6ACCD;">                        .moduleName(&quot;system&quot;) // 设置父包模块名</span></span>
<span class="line"><span style="color:#A6ACCD;">                        .pathInfo(Collections.singletonMap(OutputFile.xml, &quot;D://ideawork//mapper&quot;)); // 设置mapperXml生成路径</span></span>
<span class="line"><span style="color:#A6ACCD;">            })</span></span>
<span class="line"><span style="color:#A6ACCD;">            .strategyConfig(builder -&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">                builder.addInclude(&quot;user&quot;) // 设置需要生成的表名</span></span>
<span class="line"><span style="color:#A6ACCD;">                        .addTablePrefix(&quot;t_&quot;, &quot;c_&quot;); // 设置过滤表前缀</span></span>
<span class="line"><span style="color:#A6ACCD;">            })</span></span>
<span class="line"><span style="color:#A6ACCD;">            .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板</span></span>
<span class="line"><span style="color:#A6ACCD;">            .execute();</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>8.2 快速开发-代码生成器 2</p><p>旧模式生成策略：</p><p>第一步：创建web工程，添加代码生成器相关依赖，其他依赖自行添加</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--代码生成器--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;groupId&gt;com.baomidou&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;artifactId&gt;mybatis-plus-generator&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;version&gt;3.4.1&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">​</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--velocity模板引擎--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;groupId&gt;org.apache.velocity&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;artifactId&gt;velocity-engine-core&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;version&gt;2.3&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;groupId&gt;org.freemarker&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;artifactId&gt;freemarker&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;version&gt;2.3.30&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/dependency&gt;</span></span></code></pre></div><p>编写测试类：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class Generator {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        //1. 创建代码生成器对象，执行生成代码操作</span></span>
<span class="line"><span style="color:#A6ACCD;">        AutoGenerator autoGenerator = new AutoGenerator();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        //2. 数据源相关配置：读取数据库中的信息，根据数据库表结构生成代码</span></span>
<span class="line"><span style="color:#A6ACCD;">        DataSourceConfig dataSource = new DataSourceConfig();</span></span>
<span class="line"><span style="color:#A6ACCD;">        dataSource.setDriverName(&quot;com.mysql.cj.jdbc.Driver&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        dataSource.setUrl(&quot;jdbc:mysql://localhost:3306/mybatisdb?serverTimezone=UTC&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        dataSource.setUsername(&quot;root&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        dataSource.setPassword(&quot;12345&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        autoGenerator.setDataSource(dataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //设置全局配置</span></span>
<span class="line"><span style="color:#A6ACCD;">        GlobalConfig globalConfig = new GlobalConfig();</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span></span>
<span class="line"><span style="color:#A6ACCD;">        globalConfig.setOutputDir(&quot;D://byworkes/MybatisMP/MybatisZD/src/main/java&quot;);    //设置代码生成位置</span></span>
<span class="line"><span style="color:#A6ACCD;">        globalConfig.setOpen(false);    //设置生成完毕后是否打开生成代码所在的目录</span></span>
<span class="line"><span style="color:#A6ACCD;">        globalConfig.setAuthor(&quot;小白程序&quot;);    //设置作者</span></span>
<span class="line"><span style="color:#A6ACCD;">        globalConfig.setFileOverride(true);     //设置是否覆盖原始生成的文件</span></span>
<span class="line"><span style="color:#A6ACCD;">        globalConfig.setMapperName(&quot;%sDao&quot;);    //设置数据层接口名，%s为占位符，指代模块名称</span></span>
<span class="line"><span style="color:#A6ACCD;">        globalConfig.setIdType(IdType.ASSIGN_ID);   //设置Id生成策略</span></span>
<span class="line"><span style="color:#A6ACCD;">        autoGenerator.setGlobalConfig(globalConfig);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        //设置包名相关配置</span></span>
<span class="line"><span style="color:#A6ACCD;">        PackageConfig packageInfo = new PackageConfig();</span></span>
<span class="line"><span style="color:#A6ACCD;">        packageInfo.setParent(&quot;com.by&quot;);   //设置生成的包名，与代码所在位置不冲突，二者叠加组成完整路径</span></span>
<span class="line"><span style="color:#A6ACCD;">        packageInfo.setEntity(&quot;pojo&quot;);    //设置实体类包名</span></span>
<span class="line"><span style="color:#A6ACCD;">        packageInfo.setMapper(&quot;dao&quot;);   //设置数据层包名</span></span>
<span class="line"><span style="color:#A6ACCD;">        autoGenerator.setPackageInfo(packageInfo);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        //策略设置</span></span>
<span class="line"><span style="color:#A6ACCD;">        StrategyConfig strategyConfig = new StrategyConfig();</span></span>
<span class="line"><span style="color:#A6ACCD;">        strategyConfig.setInclude(&quot;user&quot;);  //设置当前参与生成的表名，参数为可变参数</span></span>
<span class="line"><span style="color:#A6ACCD;">        strategyConfig.setTablePrefix(&quot;t_&quot;,&quot;c_&quot;);  //设置数据库表的前缀名称，模块名 = 数据库表名 - 前缀名  例如： User = t_user - c_</span></span>
<span class="line"><span style="color:#A6ACCD;">        strategyConfig.setRestControllerStyle(true);    //设置是否启用Rest风格</span></span>
<span class="line"><span style="color:#A6ACCD;">        strategyConfig.setVersionFieldName(&quot;version&quot;);  //设置乐观锁字段名</span></span>
<span class="line"><span style="color:#A6ACCD;">        strategyConfig.setLogicDeleteFieldName(&quot;deleted&quot;);  //设置逻辑删除字段名</span></span>
<span class="line"><span style="color:#A6ACCD;">        strategyConfig.setEntityLombokModel(true);  //设置是否启用lombok</span></span>
<span class="line"><span style="color:#A6ACCD;">        autoGenerator.setStrategy(strategyConfig);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //2.执行生成操作</span></span>
<span class="line"><span style="color:#A6ACCD;">        autoGenerator.execute();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,72),o=[e];function t(c,r,i,y,C,D){return n(),a("div",null,o)}const g=s(p,[["render",t]]);export{F as __pageData,g as default};
