**问题导入：**

- 	mybatis 缓存分为一级缓存和二级缓存，那这两级缓存是怎么实现的呢？

- 	他们的存储结构，作用范围，失效场景是什么？

4.1 缓存是什么？

缓存存在于内存中的临时数据，访问速度比一般随机存取存储器（RAM）快的一种高速存储器

- 为什么使用缓存：

    - 减少和数据库交互的次数，提高执行效率

    - 什么样的数据能使用缓存，什么样的数据不能使用

- 适用于缓存：

    - 经常改变的数据。

    - 数据的正确与否对最终结果影响很大的。

    - 例如：商品的库存，银行的汇率，股市的牌价

4.2 Mybatis中的一级缓存和二级缓存

​	**一级缓存：**

- 它是mybatis中的sqlSession对象的缓存当我们执行查询之后，查询的结果会同时存入到SqlSession为们提供一块区域中。

- 该区域的结构是一个Map，当我们再次查询同样的数据，Mybatis会先去SqlSession中查询是否有，有的话直接拿出来用。

- 当SqlSession对象消失时，mybatis的一级缓存也就消失了。

![](https://tcs-devops.aliyuncs.com/storage/112w3befc59ab7f5e4cd1ec126806988e6c6?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM4MDM0NiwiaWF0IjoxNjg5Nzc1NTQ2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnczYmVmYzU5YWI3ZjVlNGNkMWVjMTI2ODA2OTg4ZTZjNiJ9.wcgl_YhlZrtsJyS_SP64LykDdCmm3NM4zsB-anFvvW4&download=%E5%9B%BE%E7%89%87.png "")

**一级缓存实现方式**

​	

```text
@Test
public void findTest() throws IOException {
    //调用utils里面的getsqlSession 包含提交操作
    SqlSession session = MybatisUtils.getSqlSession(true);
    UserDao mapper = session.getMapper(UserDao.class);
    //第一次
    System.out.println("第一次");
    List<User> all = mapper.findAll();
    System.out.println(all.get(0));
    System.out.println("第二次");
    List<User> all2 = mapper.findAll();
    System.out.println(all.get(0));
​
    System.out.println("比较两个对象是否一样");
    System.out.println(all.equals(all2));
 
​
    //释放资源
    MybatisUtils.closeSqlSession(session);
}
```

查看结果：

![](https://tcs-devops.aliyuncs.com/storage/112wf4b111808b0e17f8f8853d760201d391?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM4MDM0NiwiaWF0IjoxNjg5Nzc1NTQ2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndmNGIxMTE4MDhiMGUxN2Y4Zjg4NTNkNzYwMjAxZDM5MSJ9.cJB6km95yl-0pbHa07dpIc_3D_GGFzsqt7J9sNIujrc&download=%E5%9B%BE%E7%89%87.png "")

清空缓存的方法：

```text
session.clearCache();//此方法也可以清空缓存
```

![](https://tcs-devops.aliyuncs.com/storage/112w3b87e76d7271f075ef7b473d969a716c?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM4MDM0NiwiaWF0IjoxNjg5Nzc1NTQ2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnczYjg3ZTc2ZDcyNzFmMDc1ZWY3YjQ3M2Q5NjlhNzE2YyJ9.K72XPy3h2W-1TOIOqBaGD0Jqiax6K3fBPqHOVOz_UIg&download=%E5%9B%BE%E7%89%87.png "")

查看结果：

![](https://tcs-devops.aliyuncs.com/storage/112wc2affdcdd2fd98440778497c1f7fb420?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM4MDM0NiwiaWF0IjoxNjg5Nzc1NTQ2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndjMmFmZmRjZGQyZmQ5ODQ0MDc3ODQ5N2MxZjdmYjQyMCJ9.CIcdBjpYwiOhsfx75lINaAyuEBzHTLDcUbxjq44-9_I&download=%E5%9B%BE%E7%89%87.png "")

4.3 一级缓存失效场景

一级缓存是 SqlSession 范围的缓存，当调用 SqlSession 的修改，添加，删除，commit()，close()等方法时，就会清空一级缓存

代码实例：

```text
//第一次
System.out.println("第一次");
List<User> all = mapper.findAll();
System.out.println(all.get(0));
User user=new User();
user.setId(3);
user.setUsername("程序员爱什么？");
mapper.update(user);
​
System.out.println("第二次");
List<User> all2 = mapper.findAll();
System.out.println(all.get(0));
System.out.println("第三次");
List<User> all3 = mapper.findAll();
System.out.println(all.get(0));
​
System.out.println("比较两个对象是否一样");
System.out.println(all.equals(all2));
```

运行结果查看：

![](https://tcs-devops.aliyuncs.com/storage/112wba5f76de0b8645371d4e39bee287e4ea?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM4MDM0NiwiaWF0IjoxNjg5Nzc1NTQ2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndiYTVmNzZkZTBiODY0NTM3MWQ0ZTM5YmVlMjg3ZTRlYSJ9.HCHzoAQs-EhnZQmfYOZvvbC0DU48YUbilMGDIfYdlys&download=%E5%9B%BE%E7%89%87.png "")

**测试缓存关闭失效场景：**

```text
@Test
    public void IuserTest() throws IOException {
​
        //获取sqlsession 对象
        System.out.println("第一次加载");
        SqlSession session = MyBatisUtils.getSqlSession(true);
        IuserMapper mapper = session.getMapper(IuserMapper.class);
        List<User> all = mapper.findAll();
        System.out.println(all.get(0));
        //在这个位置关闭就会报错
       // session.close();
​
        System.out.println("第二次加载");
        SqlSession session2 = MyBatisUtils.getSqlSession(true);
        IuserMapper mapper2 = session.getMapper(IuserMapper.class);
        List<User> all2 = mapper2.findAll();
        System.out.println(all2.get(0));
        User user=new User();
        user.setId(13);
        user.setUsername("程序员");
        user.setSex("女");
        user.setAddress("爱代码否？爱money");
        user.setBirthday(Date.valueOf("2023-03-15"));
        mapper2.update(user);
​
        session2.commit();
        session2.close();
        System.out.println("第三次加载");
        SqlSession session3 = MyBatisUtils.getSqlSession(true);
        IuserMapper mapper3 = session.getMapper(IuserMapper.class);
        List<User> all3 = mapper3.findAll();
        System.out.println(all3.get(0));
​
        System.out.println("对象比较");
        System.out.println(mapper==mapper2);
        System.out.println(mapper2==mapper3);
        session3.close();
    }
​
```



**4.4 二级缓存**

- 二级缓存是 mapper 映射级别的缓存，多个 SqlSession 去操作同一个 Mapper 映射的 sql 语句，多个 SqlSession 可以共用二级缓存，二级缓存是跨 SqlSession 的。

- 他指的是SqlSessionFactory对象的缓存。由同一个SqlSessionFactory对象创建的SqlSession共享其缓存

**原理解析**

mybatis 二级缓存也是通过PerpetualCache 缓存对象存储的，所以存储结构也是基于HashMap的。 二级缓存是基于mapper文件的namespace 的。也就是说多个SqlSession 可以共享一个mapper 中的二级缓存区域。 

![](https://tcs-devops.aliyuncs.com/storage/112wd325e63d2ef9e7998b54568949073846?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM4MDM0NiwiaWF0IjoxNjg5Nzc1NTQ2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndkMzI1ZTYzZDJlZjllNzk5OGI1NDU2ODk0OTA3Mzg0NiJ9.2sptGtNvZZd7fs-aKy_mr2r5N_qAqLOgOpI878pJLAk&download=%E5%9B%BE%E7%89%87.png "")

 一个sqlSession  的会将执行的结果保存到二级缓存区，其他的SqlSession在获取的时候，不会从数据库获取数据，而是从缓存中获取数据。但是最终得到的对象是不相等的，因为二级缓存中缓存的是数据，而不是对象。 当其中有一个SqlSession 执行了事物提交操作，就会清空二级缓存，导致二级缓存失效，其他的SqlSession  想要获取数据，需要从新从数据库取。

**4.4.1 开启二级缓存**

**实现步骤：**

**第一步：**

在核心配置文件中配置：

```text
<configuration>
    <!--引入数据库连接的配置文件-->
    <properties resource="jdbc.properties"/>
    <!--开启二级缓存-->
    <settings>
        <setting name="cacheEnabled" value="true"/>
    </settings>
    
```

- cacheEnabled 的取值默认就为 true，所以这一步可以省略不配置。

    - 为 true 代表开启二级缓存；

    - 为 false 代表不开启二级缓存。

**第二步 mapper配置文件：**

```text

<cache eviction="FIFO" flushInterval="60000" size="5120" readOnly="true" />
<select id="findAll" resultType="user" useCache="true">
        select * from T_user
    </select>
```

映射文件中的`<select>`标签中设置 useCache=”true”代表当前这个 select要使用二级缓存，如果不使用二级缓存可以设置为 false。

**注意：**针对每次查询都需要最新的数据 sql，要设置成 useCache=false，禁用二级缓存。

使用缓存的时候，最好给实体类序列化一下：**implements  Serializable**

**测试代码：**

```java
@Test
public void findcahe() throws IOException {
    //调用utils里面的getsqlSession 包含提交操作
​
    SqlSession session1 = MybatisUtils.getSqlSession(true);
    UserDao mapper1 = session1.getMapper(UserDao.class);
    SqlSession session2 = MybatisUtils.getSqlSession(true);
    UserDao mapper2 = session2.getMapper(UserDao.class);
    //第一次
    System.out.println("第一次");
    List<User> user1 = mapper1.findAll();
    System.out.println(user1.get(0));
    session1.close();
​
    System.out.println("第二次");
    List<User> user2 = mapper2.findAll();
    System.out.println(user2.get(0));
    session2.close();
​
    System.out.println("比较两个对象是否一样");
    System.out.println("测试是否相等"+(user2==user1));
​
}
```

结果展示：

![](https://tcs-devops.aliyuncs.com/storage/112w2df829a9abbd15f46f87d8cde7fabb15?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM4MDM0NiwiaWF0IjoxNjg5Nzc1NTQ2LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMncyZGY4MjlhOWFiYmQxNWY0NmY4N2Q4Y2RlN2ZhYmIxNSJ9.Wb8q93TvF90wob8Mp2CY6fk3ms_U1OhYhd7N7jhzSJQ&download=%E5%9B%BE%E7%89%87.png "")

注解的使用方式：

```text
@CacheNamespace(eviction = FifoCache.class, flushInterval = 60000, size = 1024, readWrite = true)
    @Select("select * from T_user") @Options(useCache = true)
    public List<User> findAll();
```





