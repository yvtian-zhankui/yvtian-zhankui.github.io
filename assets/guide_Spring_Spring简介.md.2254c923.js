import{_ as i,o as l,c as p,O as I}from"./chunks/framework.571309da.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Spring/Spring简介.md","filePath":"guide/Spring/Spring简介.md"}'),a={name:"guide/Spring/Spring简介.md"},e=I('<p>问题导入</p><p>我们为什么要学习Spring框架？</p><p>1.1 为什么要学</p><ul><li><p>Spring技术是JavaEE开发必备技能，企业开发技术选型命中率&gt;==90%==</p></li><li><p>专业角度</p><ul><li><p>==<strong>简化开发</strong>==，降低企业级开发的复杂性</p></li><li><p><strong>==框架整合==</strong>，高效整合其他技术，提高企业级应用开发与运行效率</p></li></ul></li></ul><p><img src="https://tcs-devops.aliyuncs.com/storage/112v94ba5d6ba7196308bb2aad2e490a91c6?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5NGJhNWQ2YmE3MTk2MzA4YmIyYWFkMmU0OTBhOTFjNiJ9.AekXgEShfgxuizRgudxhgsi-bluknstbwxEoHd0IrZk&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>1.2 学什么</p><ul><li><p>简化开发</p><ul><li><p>==IOC(反转控制)==</p></li><li><p>==AOP(面向切面编程)==</p><ul><li>==事务处理==</li></ul></li></ul></li><li><p>框架整合</p><ul><li><p>MyBatis</p></li><li><p>MyBatis-plus</p></li><li><p>Struts</p></li><li><p>Struts2</p></li><li><p>Hibernate</p></li><li><p>……</p></li></ul></li></ul><p>1.3 怎么学</p><ul><li><p>学习Spring框架设计思想</p></li><li><p>学习基础操作，思考操作与思想间的联系</p></li><li><p>学习案例，熟练应用操作的同时，体会思想</p></li></ul><p><img src="https://tcs-devops.aliyuncs.com/storage/112vade8f5a2735dcf2b9a657c9a97073bb9?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhZGU4ZjVhMjczNWRjZjJiOWE2NTdjOWE5NzA3M2JiOSJ9.G4oeAWw4kTGQCeE5QADOwV7EoTgHTGqjT-gupt9-KBY&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h3 id="_2-初识spring" tabindex="-1">2 初识Spring <a class="header-anchor" href="#_2-初识spring" aria-label="Permalink to &quot;2 初识Spring&quot;">​</a></h3><p>问题导入</p><p>目前我们使用的是Spring几版本？</p><p>2.1 Spring家族</p><ul><li><p>官网：<a href="https://spring.io/" target="_blank" rel="noreferrer">https://spring.io</a></p></li><li><p>Spring发展到今天已经形成了一种开发的生态圈，Spring提供了若干个项目，每个项目用于完成特定的功能。</p></li></ul><p><img src="https://tcs-devops.aliyuncs.com/storage/112v4a59e9186c17f79e56ec907b164e2a7d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY0YTU5ZTkxODZjMTdmNzllNTZlYzkwN2IxNjRlMmE3ZCJ9.QJ_66Qm61-vpo_ERzNpgvWq2PSJJW0Jys2usGDe2XRk&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p>2.2 Spring发展史</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112vecda6396aa27eee63e16abb88f2fdb11?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlY2RhNjM5NmFhMjdlZWU2M2UxNmFiYjg4ZjJmZGIxMSJ9.uJ4h9ZixXZQYttK4_lW1KB201OjJxbyvqqy5eS2FCPk&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h3 id="_3-spring体系结构" tabindex="-1">3 Spring体系结构 <a class="header-anchor" href="#_3-spring体系结构" aria-label="Permalink to &quot;3 Spring体系结构&quot;">​</a></h3><p>问题导入</p><p>通过系统架构图，Spring能不能进行数据层开发？Spring能不能进行web层开发？</p><p>3.1 Spring Framework系统架构图</p><ul><li>Spring Framework是Spring生态圈中最基础的项目，是其他项目的根基</li></ul><p><img src="https://tcs-devops.aliyuncs.com/storage/112v9e24308e6ef128f6ddcefd9c4376aa38?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5ZTI0MzA4ZTZlZjEyOGY2ZGRjZWZkOWM0Mzc2YWEzOCJ9.-HZE4IMoEg4TGOOOSlrvoclZJivOwCbAMwYcsOmp8ac&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><p><img src="https://tcs-devops.aliyuncs.com/storage/112v140ce5b79ad79f6a9e4f5d0bcf8da928?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYxNDBjZTViNzlhZDc5ZjZhOWU0ZjVkMGJjZjhkYTkyOCJ9.JPavakXCJz9n4Cl720c9C-MAlcUFPqSck3L6EcgnvR8&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><h3 id="_4-spring核心概念" tabindex="-1">4 Spring核心概念 <a class="header-anchor" href="#_4-spring核心概念" aria-label="Permalink to &quot;4 Spring核心概念&quot;">​</a></h3><p>问题导入</p><p>问题1：目前我们的代码存在什么问题以及怎么解决这些问题？</p><p>问题2：请描述什么是IOC，什么是DI？</p><p>4.1 目前我们代码存在的问题</p><p><img src="https://tcs-devops.aliyuncs.com/storage/112vf0549ec15f50e90825b10877f499ecb3?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZmMDU0OWVjMTVmNTBlOTA4MjViMTA4NzdmNDk5ZWNiMyJ9.GTvHMRy7SoZMjP-xJZNLwy1QrKwS_9QKY4q-lxgSey4&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><ul><li><p>代码书写现状</p><ul><li>耦合度偏高</li></ul></li><li><p>解决方案</p><ul><li>使用对象时，在程序中不要主动使用new产生对象，转换为由外部提供对象</li></ul></li></ul><p>4.2 核心概念</p><ul><li><p>==IOC（Inversion of Control）控制反转==使用对象时，由主动new产生对象转换为由==外部==提供对象，此过程中对象创建控制权由程序转移到外部，此思想称为控制反转。通俗的讲就是“==将new对象的权利交给Spring，我们从Spring中获取对象使用即可==”</p></li><li><p>Spring技术对IoC思想进行了实现</p><ul><li><p>Spring提供了一个容器，称为==IOC容器==，用来充当IoC思想中的“外部”</p></li><li><p>IOC容器负责对象的创建、初始化等一系列工作，被创建或被管理的对象在IoC容器中统称为==Bean==</p></li></ul></li><li><p>==DI（Dependency Injection）依赖注入==</p><ul><li>在容器中建立bean与bean之间的依赖关系的整个过程，称为依赖注入。</li></ul></li></ul><p><img src="https://tcs-devops.aliyuncs.com/storage/112v1064cf243a7fbf4e85f8a7097825e70b?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYxMDY0Y2YyNDNhN2ZiZjRlODVmOGE3MDk3ODI1ZTcwYiJ9.MTNHdC7bWFQIktHiKZXuiLXBxHMF0iyXTY4uWrIm5e8&amp;download=%E5%9B%BE%E7%89%87.png" alt=""></p><ul><li><p>目标：充分解耦</p><ul><li><p>使用IoC容器管理bean（IOC)</p></li><li><p>在IoC容器内将有依赖关系的bean进行关系绑定（DI）</p></li></ul></li><li><p>最终效果</p><ul><li>使用对象时不仅可以直接从IoC容器中获取，并且获取到的bean已经绑定了所有的依赖关系</li></ul></li></ul>',36),n=[e];function j(s,c,M,N,r,t){return l(),p("div",null,n)}const d=i(a,[["render",j]]);export{o as __pageData,d as default};
