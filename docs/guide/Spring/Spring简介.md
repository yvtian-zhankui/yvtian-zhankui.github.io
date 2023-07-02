问题导入

我们为什么要学习Spring框架？

1.1 为什么要学

- Spring技术是JavaEE开发必备技能，企业开发技术选型命中率>==90%==

- 专业角度

    - ==**简化开发**==，降低企业级开发的复杂性

    - **==框架整合==**，高效整合其他技术，提高企业级应用开发与运行效率

![](https://tcs-devops.aliyuncs.com/storage/112v94ba5d6ba7196308bb2aad2e490a91c6?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5NGJhNWQ2YmE3MTk2MzA4YmIyYWFkMmU0OTBhOTFjNiJ9.AekXgEShfgxuizRgudxhgsi-bluknstbwxEoHd0IrZk&download=%E5%9B%BE%E7%89%87.png "")

1.2 学什么

- 简化开发

    - ==IOC(反转控制)==

    - ==AOP(面向切面编程)==

        - ==事务处理==

- 框架整合

    - MyBatis

    - MyBatis-plus

    - Struts

    - Struts2

    - Hibernate

    - ……

1.3 怎么学

- 学习Spring框架设计思想

- 学习基础操作，思考操作与思想间的联系

- 学习案例，熟练应用操作的同时，体会思想

![](https://tcs-devops.aliyuncs.com/storage/112vade8f5a2735dcf2b9a657c9a97073bb9?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhZGU4ZjVhMjczNWRjZjJiOWE2NTdjOWE5NzA3M2JiOSJ9.G4oeAWw4kTGQCeE5QADOwV7EoTgHTGqjT-gupt9-KBY&download=%E5%9B%BE%E7%89%87.png "")



### 2 初识Spring

问题导入

目前我们使用的是Spring几版本？

2.1 Spring家族

- 官网：[https://spring.io](https://spring.io/)

- Spring发展到今天已经形成了一种开发的生态圈，Spring提供了若干个项目，每个项目用于完成特定的功能。

![](https://tcs-devops.aliyuncs.com/storage/112v4a59e9186c17f79e56ec907b164e2a7d?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY0YTU5ZTkxODZjMTdmNzllNTZlYzkwN2IxNjRlMmE3ZCJ9.QJ_66Qm61-vpo_ERzNpgvWq2PSJJW0Jys2usGDe2XRk&download=%E5%9B%BE%E7%89%87.png "")

2.2 Spring发展史

![](https://tcs-devops.aliyuncs.com/storage/112vecda6396aa27eee63e16abb88f2fdb11?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlY2RhNjM5NmFhMjdlZWU2M2UxNmFiYjg4ZjJmZGIxMSJ9.uJ4h9ZixXZQYttK4_lW1KB201OjJxbyvqqy5eS2FCPk&download=%E5%9B%BE%E7%89%87.png "")



### 3 Spring体系结构

问题导入

通过系统架构图，Spring能不能进行数据层开发？Spring能不能进行web层开发？

3.1 Spring Framework系统架构图

- Spring Framework是Spring生态圈中最基础的项目，是其他项目的根基

![](https://tcs-devops.aliyuncs.com/storage/112v9e24308e6ef128f6ddcefd9c4376aa38?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnY5ZTI0MzA4ZTZlZjEyOGY2ZGRjZWZkOWM0Mzc2YWEzOCJ9.-HZE4IMoEg4TGOOOSlrvoclZJivOwCbAMwYcsOmp8ac&download=%E5%9B%BE%E7%89%87.png "")

![](https://tcs-devops.aliyuncs.com/storage/112v140ce5b79ad79f6a9e4f5d0bcf8da928?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYxNDBjZTViNzlhZDc5ZjZhOWU0ZjVkMGJjZjhkYTkyOCJ9.JPavakXCJz9n4Cl720c9C-MAlcUFPqSck3L6EcgnvR8&download=%E5%9B%BE%E7%89%87.png "")

### 4 Spring核心概念

问题导入

问题1：目前我们的代码存在什么问题以及怎么解决这些问题？

问题2：请描述什么是IOC，什么是DI？

4.1 目前我们代码存在的问题

![](https://tcs-devops.aliyuncs.com/storage/112vf0549ec15f50e90825b10877f499ecb3?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZmMDU0OWVjMTVmNTBlOTA4MjViMTA4NzdmNDk5ZWNiMyJ9.GTvHMRy7SoZMjP-xJZNLwy1QrKwS_9QKY4q-lxgSey4&download=%E5%9B%BE%E7%89%87.png "")

- 代码书写现状

    - 耦合度偏高

- 解决方案

    - 使用对象时，在程序中不要主动使用new产生对象，转换为由外部提供对象

4.2 核心概念

- ==IOC（Inversion of Control）控制反转==使用对象时，由主动new产生对象转换为由==外部==提供对象，此过程中对象创建控制权由程序转移到外部，此思想称为控制反转。通俗的讲就是“==将new对象的权利交给Spring，我们从Spring中获取对象使用即可==”

- Spring技术对IoC思想进行了实现

    - Spring提供了一个容器，称为==IOC容器==，用来充当IoC思想中的“外部”

    - IOC容器负责对象的创建、初始化等一系列工作，被创建或被管理的对象在IoC容器中统称为==Bean==

- ==DI（Dependency Injection）依赖注入==

    - 在容器中建立bean与bean之间的依赖关系的整个过程，称为依赖注入。

![](https://tcs-devops.aliyuncs.com/storage/112v1064cf243a7fbf4e85f8a7097825e70b?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODUzNTQzNCwiaWF0IjoxNjg3OTMwNjM0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnYxMDY0Y2YyNDNhN2ZiZjRlODVmOGE3MDk3ODI1ZTcwYiJ9.MTNHdC7bWFQIktHiKZXuiLXBxHMF0iyXTY4uWrIm5e8&download=%E5%9B%BE%E7%89%87.png "")

- 目标：充分解耦

    - 使用IoC容器管理bean（IOC)

    - 在IoC容器内将有依赖关系的bean进行关系绑定（DI）

- 最终效果

    - 使用对象时不仅可以直接从IoC容器中获取，并且获取到的bean已经绑定了所有的依赖关系



