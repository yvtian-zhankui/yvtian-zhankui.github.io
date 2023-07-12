import{_ as s,o as a,c as n,O as t}from"./chunks/framework.571309da.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/SpringMVC/文件上传.md","filePath":"guide/SpringMVC/文件上传.md","lastUpdated":null}'),l={name:"guide/SpringMVC/文件上传.md"},e=t(`<p>Spring MVC 框架的文件上传基于 commons-fileupload 组件，并在该组件上做了进一步的封装，简化了文件上传的代码实现，取消了不同上传组件上的编程差异。</p><h3 id="multipartresolver接口" tabindex="-1">MultipartResolver接口 <a class="header-anchor" href="#multipartresolver接口" aria-label="Permalink to &quot;MultipartResolver接口&quot;">​</a></h3><p>在 Spring MVC 中实现文件上传十分容易，它为文件上传提供了直接支持，即 MultpartiResolver 接口。MultipartResolver 用于处理上传请求，将上传请求包装成可以直接获取文件的数据，从而方便操作。</p><p>MultpartiResolver 接口有以下两个实现类：</p><ul><li><p>StandardServletMultipartResolver：使用了 Servlet 3.0 标准的上传方式。</p></li><li><p>CommonsMultipartResolver：使用了 Apache 的 commons-fileupload 来完成具体的上传操作。</p></li></ul><p>MultpartiResolver 接口具有以下方法。</p><table><thead><tr><th>名称</th><th>作用</th></tr></thead><tbody><tr><td>byte[] getBytes()</td><td>以字节数组的形式返回文件的内容</td></tr><tr><td>String getContentType()</td><td>返回文件的内容类型</td></tr><tr><td>InputStream getInputStream()</td><td>返回一个InputStream，从中读取文件的内容</td></tr><tr><td>String getName()</td><td>返回请求参数的名称</td></tr><tr><td>String getOriginalFillename()</td><td>返回客户端提交的原始文件名称</td></tr><tr><td>long getSize()</td><td>返回文件的大小，单位为字节</td></tr><tr><td>boolean isEmpty()</td><td>判断被上传文件是否为空</td></tr><tr><td>void transferTo(File destination)</td><td>将上传文件保存到目标目录下</td></tr></tbody></table><p>下面我们使用 CommonsMultipartResolver 来完成文件上传，分为单文件上传和多文件上传两部分介绍。</p><h3 id="文件上传" tabindex="-1">文件上传 <a class="header-anchor" href="#文件上传" aria-label="Permalink to &quot;文件上传&quot;">​</a></h3><p>1.maven引入</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!-- https://mvnrepository.com/artifact/commons-io/commons-io --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;groupId&gt;commons-io&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;artifactId&gt;commons-io&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;version&gt;2.11.0&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;groupId&gt;commons-fileupload&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;artifactId&gt;commons-fileupload&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;version&gt;1.4&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/dependency&gt;</span></span></code></pre></div><p>2.配置 MultipartResolver</p><p>使用 CommonsMultipartReslover 配置 MultipartResolver 解析器，在 springmvc.xml 中添加代码如下。</p><p>名称固定为：multipartResolver</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!-- 配置MultipartResolver，用于上传文件，使用spring的CommonsMultipartResolver --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;bean id=&quot;multipartResolver&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    class=&quot;org.springframework.web.multipart.commons.CommonsMultipartResolver&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;maxUploadSize&quot; value=&quot;5000000&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;property name=&quot;defaultEncoding&quot; value=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/bean&gt;</span></span></code></pre></div><p>这两种二选一</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Bean(&quot;multipartResolver&quot;) //名称为固定multipartResolver</span></span>
<span class="line"><span style="color:#A6ACCD;">    public CommonsMultipartResolver  multipartResolver2(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        CommonsMultipartResolver resolver  = new CommonsMultipartResolver();</span></span>
<span class="line"><span style="color:#A6ACCD;">        resolver.setDefaultEncoding(&quot;UTF-8&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        resolver.setMaxUploadSize(500000);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return resolver;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><ul><li><p>defaultEncoding：请求的编码格式，默认为 ISO-8859-1，此处设置为 UTF-8（注：defaultEncoding 必须和 JSP 中的 pageEncoding 一致，以便正确读取表单的内容）。</p></li><li><p>maxUploadSize：上传文件大小上限，单位为字节。</p></li></ul><p>3.编写文件上传表单页面</p><p>负责文件上传表单的编码类型必须是“multipart/form-data”类型。</p><p>4.上传页面</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;%@ page contentType=&quot;text/html;charset=UTF-8&quot; language=&quot;java&quot; %&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Title&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;form action=&quot;/upload&quot; method=&quot;post&quot; enctype=&quot;multipart/form-data&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">       &lt;input type=&quot;file&quot; name=&quot;file01&quot;&gt;&lt;br/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">       &lt;input type=&quot;submit&quot; value=&quot;上传&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;/form&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><p>5.编写控制器</p><p>先来一个测试的：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Controller</span></span>
<span class="line"><span style="color:#A6ACCD;">public class UploadController {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @GetMapping(&quot;/upload&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String  get(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;upload&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    @PostMapping(&quot;/upload&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseBody</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String upload(MultipartFile file01, HttpServletRequest req) throws IOException {</span></span>
<span class="line"><span style="color:#A6ACCD;">        //String Path = req.getRealPath(&quot;.&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //找到文件存储的位置</span></span>
<span class="line"><span style="color:#A6ACCD;">        String path = req.getSession().getServletContext().getRealPath(&quot;.&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;ok&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>**debug测试：**测试运行试一下：</p><p>存储文件：controller中编写</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@PostMapping(&quot;/upload&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseBody</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String upload(MultipartFile file01, HttpServletRequest req) throws IOException {</span></span>
<span class="line"><span style="color:#A6ACCD;">        //String Path = req.getRealPath(&quot;.&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //找到文件存储的位置</span></span>
<span class="line"><span style="color:#A6ACCD;">        String path = req.getSession().getServletContext().getRealPath(&quot;.&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //获取文件名字</span></span>
<span class="line"><span style="color:#A6ACCD;">        String name=file01.getOriginalFilename();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //transferTo方法将上传文件写到服务器上指定的文件;</span></span>
<span class="line"><span style="color:#A6ACCD;">        file01.transferTo(new File(path,name));</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;ok&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>也可以把路径写死：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">file01.transferTo(new File(&quot;D:\\\\206&quot;,name));</span></span></code></pre></div><p><img src="https://tcs-devops.aliyuncs.com/storage/112v70b0979ca3f762a14180a1321ebdfb4f?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4OTc1MzU5MSwiaWF0IjoxNjg5MTQ4NzkxLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY3MGIwOTc5Y2EzZjc2MmExNDE4MGExMzIxZWJkZmI0ZiJ9.Tk7zVfYeK4YIOTUNHfD9Svb-6wFULYCjS6sp-IUQeMs&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>加入图片uuid随机生成名字：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">String name= IdUtil.fastSimpleUUID()+&quot;-&quot;+file01.getOriginalFilename();</span></span></code></pre></div><p>加入判断防止用户恶意测试：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">if(file01.isEmpty()){</span></span>
<span class="line"><span style="color:#A6ACCD;">            return &quot;请选择文件&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span></code></pre></div><p>代码修改：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@PostMapping(&quot;/upload&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseBody</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String upload(MultipartFile file01, HttpServletRequest req) throws IOException {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if(file.isEmpty()){</span></span>
<span class="line"><span style="color:#A6ACCD;">            return  &quot;请选择文件&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">         //String Path = req.getRealPath(&quot;.&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //找到文件存储的位置</span></span>
<span class="line"><span style="color:#A6ACCD;">        String path = req.getSession().getServletContext().getRealPath(&quot;.&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //获取文件名字</span></span>
<span class="line"><span style="color:#A6ACCD;">        String name = IdUtil.fastSimpleUUID()+&quot;_&quot;+ file.getOriginalFilename();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //transferTo方法将上传文件写到服务器上指定的文件;</span></span>
<span class="line"><span style="color:#A6ACCD;">        file01.transferTo(new File(path,name));</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;ok&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>配置类中配置：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    public CommonsMultipartResolver multipartResolver(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        CommonsMultipartResolver resolver=new CommonsMultipartResolver();</span></span>
<span class="line"><span style="color:#A6ACCD;">        resolver.setDefaultEncoding(&quot;UTF-8&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        resolver.setMaxUploadSize(5000000);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return resolver;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div>`,39),p=[e];function o(i,r,c,C,u,A){return a(),n("div",null,p)}const y=s(l,[["render",o]]);export{g as __pageData,y as default};
