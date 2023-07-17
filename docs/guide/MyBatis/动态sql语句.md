1.1 动态sql语句概述

Mybatis 的映射文件中，前面我们的 SQL 都是比较简单的，有些时候业务逻辑复杂时，我们的 SQL是动态变化的，此时在前面的学习中我们的 SQL 就不能满足要求了。

参考的官方文档，描述如下：

![](https://tcs-devops.aliyuncs.com/storage/112ve8f91374d7a53309c92bcd4ea3c1bf6f?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3Nzg4MCwiaWF0IjoxNjg5NTczMDgwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZlOGY5MTM3NGQ3YTUzMzA5YzkyYmNkNGVhM2MxYmY2ZiJ9.JAr6CPfKDbQBYvBGUOC8Glcurvh_H9ETciKc6FgHyyM&download=%E5%9B%BE%E7%89%87.png "")

1.2 动态 SQL  之<**if>** 

我们根据实体类的不同取值，使用不同的 SQL语句来进行查询。比如在 id如果不为空时可以根据id查询，如果username 不同空时还要加入用户名作为条件。这种情况在我们的多条件组合查询中经常会碰到。

如下图：

```text
  <select id="findColl" parameterType="user" resultType="user">
        select * from T_user
        <where> <!--表示where-->
            <if test="id!=0">
                 id=#{id}
            </if>
            <if test="username!=null and username!=''">
                and username=#{username}
            </if>
        </where>
```

**编写dao接口：**

```text
//多条件查询
public List<User> findColl(User user);
```

当查询条件id和username都存在时，控制台打印的sql语句如下：

```text
     @Test
    public void findCollT(){
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        UserDao mapper = sqlSession.getMapper(UserDao.class);
        User user=new User();
        user.setId(1);
        user.setUsername("张三");
        List<User> coll = mapper.findColl(user);
        System.out.println(coll.toString());
        
        MybatisUtils.closeSqlSession(sqlSession);
    }
```

![](https://tcs-devops.aliyuncs.com/storage/112vca2882de488e1ef304d93a27ed0960c3?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3Nzg4MCwiaWF0IjoxNjg5NTczMDgwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZjYTI4ODJkZTQ4OGUxZWYzMDRkOTNhMjdlZDA5NjBjMyJ9.CEHs3Rli_VdcUdqYLu6qsL51SZQr9qr_WseB9XH8SPc&download=%E5%9B%BE%E7%89%87.png "")

当查询条件只有id存在时，控制台打印的sql语句如下：

```text
 //获得MyBatis框架生成的UserDao接口的实现类
@Test
    public void findCollT(){
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        UserDao mapper = sqlSession.getMapper(UserDao.class);
        User user=new User();
        user.setId(1);
        List<User> coll = mapper.findColl(user);
        System.out.println(coll.toString());
​
        MybatisUtils.closeSqlSession(sqlSession);
    }
​
```

![](https://tcs-devops.aliyuncs.com/storage/112vd366b41f1a3e8d1ba33b4ce5e355ef4f?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDE3Nzg4MCwiaWF0IjoxNjg5NTczMDgwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZkMzY2YjQxZjFhM2U4ZDFiYTMzYjRjZTVlMzU1ZWY0ZiJ9.QOiO9tC_ZecMYpOyTUS27QmUtWGtIufCI6HPGHFqklk&download=%E5%9B%BE%E7%89%87.png "")

总结语法:

```text
<where>：条件标签。如果有动态条件，则使用该标签代替 where 关键字。
<if>：条件判断标签。
<if test=“条件判断”>
    查询条件拼接
</if>
```

1.3 动态sql之set (update  insert)

```sql
  <!-- 动态语句 set 更新语句 update 表名 set name=#{name} -->
 <update id="updateMap" parameterType="map">
        update T_user 
        <set>
            <if test="username!=null">username=#{username},</if>
            <if test="sex!=null">sex=#{sex}</if>
        </set>
        <where>
            <if test="id!=null">id=#{id}</if>
        </where>
    </update>
    <!-- 动态语句 set 插入语句 insert into 表名 set name=#{name},age=#{age} -->
 
    <insert id="saveMap" parameterType="map">
        insert into T_user
        <set>
            <if test="id!=null">id=#{id},</if>
            <if test="username!=null">username=#{username},</if>
            <if test="sex!=null">sex=#{sex},</if>
            <if test="address!=null">address=#{address},</if>
            <if test="birthday!=null">birthday=#{birthday}</if>
        </set>
    </insert>
```

编写dao接口添加方法：

```java
public int updateMap(Map<String ,Object> map);
​
public int saveMap(Map<String ,Object> map);
```

测试类编写：

```text
修改的测试方法
@Test
    public void updatemap(){
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        UserDao mapper = sqlSession.getMapper(UserDao.class);
​
        Map<String,Object> map=new HashMap<>();
        map.put("id",1);
        map.put("username","老六");
        map.put("sex","女");
        int i = mapper.updateMap(map);
        System.out.println(i);
    }
添加的测试方法
    @Test
    public void savemapT(){
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        UserDao mapper = sqlSession.getMapper(UserDao.class);
​
        Map<String,Object> map=new HashMap<>();
        map.put("username","老六");
        map.put("sex","女");
        map.put("address","郑州");
        map.put("birthday",Date.valueOf("2010-03-09"));
        int i = mapper.saveMap(map);
        System.out.println(i);
    }
```

总结语法：

```text
<set>：条件标签。set 元素可以用于动态包含需要更新的列
<if>：条件判断标签。
<if test="条件判断">
    查询条件拼接
</if>
```

1.4 动态sql之choose (when, otherwise)

相当于Java中的switch语句

当when有条件满足的时候，就跳出choose

```text
 <choose>
        <when test="条件1">...</when>
        <when test="条件2">...</when>
        <when test="条件3">...</when>
        <otherwise>其他条件</otherwise>
</choose>
```

代码演示步骤：

1、编写Dao接口代码

2、编写mapper文件

3、测试运行

代码实现：

**编写Dao接口代码**

```text
public List<User> showUserfindAll(
       @Param("username") String username,
        @Param("sex") String sex,
        @Param("address") String address,
        @Param("birthday") Date birthday);
```

编写mapper文件

```text
<!-- 动态语句choose when when otherwise -->
<!-- if elseif elseif else
    <choose>
        <when test=""></when>
        <when test=""></when>
        <when test=""></when>
        <otherwise>...</otherwise>
    </choose>-->
<select id="showUserfindAll" resultType="com.by.pojo.User">
    select * from user where 
    <choose>
        <when test="username!=null and username!=''">
             username like concat("%",#{username},"%")
        </when>
        <when test="sex!=null and sex!=''">
             sex =#{sex}
        </when>
        <when test="address!=null and address!=''">
            address like concat("%",#{address},"%")
        </when>
        <otherwise>
             year(birthday)=year(#{birthday})
        </otherwise>
​
    </choose>
```

另一种写法

```text

 <select id="showUserfindAll" resultType="com.by.pojo.User">
        select * from user where 1=1
        <choose>
            <when test="username!=null">
              <choose>
                 <when test="username.indexOf('%')!=-1">username like #{username}</when>
                 <when test="username.indexOf('_')!=-1">username like #{username}</when>
                 <otherwise>username = #{username}</otherwise>
              </choose>
            </when>
            <when test="sex!=null and sex!=''">
               and sex =#{sex}
            </when>
            <when test="address!=null and address!=''">
                address like concat("%",#{address},"%")
            </when>
            <otherwise>
                birthday=#{birthday}
            </otherwise>
        </choose>
    </select>
```

实体和数据库名字不匹配

```xml
<!-- 查询中如果表字段名和实体类名不一致，不想定义ResultMap,可以使用查询的列名 -->
<sql id="s1p">id,user_name username,birthday birth,address addr,sex sex</sql>
​
<select id="showUserfindAll" resultType="com.by.pojo.User">
    select <include refid="s1p"/> from user where 1=1
    <choose>
        <when test="username!=null">
            <choose>
                <when test="username.indexOf('%')!=-1">user_name like #{username}</when>
                <when test="username.indexOf('_')!=-1">user_name like #{username}</when>
                <otherwise>user_name = #{username}</otherwise>
            </choose>
        </when>
        <when test="sex!=null and sex!=''">
            and sex =#{sex}
        </when>
        <when test="address!=null and address!=''">
            and address like concat("%",#{addr},"%")
        </when>
        <otherwise>
            and year(birthday)=year(#{birth})
        </otherwise>
    </choose>
</select>
```

测试运行

```java
 @Test
    public void test() throws IOException {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory factory=new SqlSessionFactoryBuilder().build(is);
        SqlSession session = factory.openSession();
        UserDao userDao = session.getMapper(UserDao.class);
        List<User> users = userDao.showUserfindAll(null, "男", "河", null);
        System.out.println(users.toString());
​
    }
```



1.5  动态 SQL  之<**foreach>** 

循环执行sql的拼接操作，例如：SELECT * FROM user WHERE id IN (1,2,5)。

**foreach** 迭代一个集合，通常用于in条件

属性：

- item  查询条件

- collection：必须指定

    - list

    - array

    - map—key

- open       ： 括号 (

- separator ：分割符 ，

- close        :括号   ）

例子如下

```text
  <!--循环迭代-->
<select id="findByIds" parameterType="list" resultType="user">
    <!--
        collection: 表示集合存储类型 分别为 list array数组
           open : id in (  是指代  where id in(
           close： 闭合括号
           item : 查询条件
           separator： 分割符
    -->
    select * from T_user
    <where>
    <foreach collection="list" open="id in (" close=")" item="id" separator=",">
        #{id}
    </foreach>
    </where>
</select>
```

编写dao接口：

```text
//根据多个id查询
public List<User> findByIds(List<Integer> ids);
```

测试代码片段如下：

```text
 @Test
    public void findByidst() {
        //获取sqlssession给定的对象
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        UserDao mapper = sqlSession.getMapper(UserDao.class);
        //创建list集合 并赋值
        List<Integer> list=new ArrayList<>();
        list.add(1);
        list.add(3);
        list.add(5);
        //把集合里面的值赋给mapper
        List<User> byIds = mapper.findByIds(list);
        for (User byId : byIds) {
            System.out.println(byId);
        }
        MybatisUtils.closeSqlSession(sqlSession);
    }
```

总结语法:

```text
<foreach>：循环遍历标签。适用于多个参数或者的关系。
    <foreach collection=“”open=“”close=“”item=“”separator=“”>
        获取参数
    </foreach>
```

属性collection：参数容器类型， (list-集合， array-数组)。open：开始的 SQL 语句  id in （。close：结束的 SQL 语句。item：参数变量名。separator：分隔符。

1.6  SQL片段抽取

Sql 中可将重复的 sql 提取出来，使用时用 include 引用即可，最终达到 sql 重用的目的

```text
<!--抽取sql片段简化编写-->
<sql id="selectUser" select * from student</sql>
<!--根据id查询-->
<select id="findById" parameterType="int" resultType="user">
    <include refid="selectUser"></include> where id=#{id}
</select>
<!--根据ids遍历-->
<select id="findByIds" parameterType="list" resultType="student">
    <include refid="selectUser"></include>
    <where>
        <foreach collection="array" open="id in(" close=")" item="id" separator=",">
            #{id}
        </foreach>
    </where>
</select>
```

总结语法:

我们可以将一些重复性的 SQL 语句进行抽取，以达到复用的效果。 

```text
-  <sql>：抽取 SQL 语句标签。 
-  <include>：引入 SQL 片段标签。 
   <sql id=“片段唯一标识”>抽取的 SQL 语句</sql> <include refid=“片段唯一标识”/>
 
```

1.7 知识小结

MyBatis映射文件配置：

```text
<select>：查询
​
<insert>：插入
​
<update>：修改
​
<delete>：删除
​
<where>：where条件
​
<if>：if判断
​
<foreach>：循环
​
<sql>：sql片段抽取
​
```





