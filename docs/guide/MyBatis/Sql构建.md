SQL 构建对象介绍    

- 我们之前通过注解开发时，相关 SQL 语句都是自己直接拼写的。一些关键字写起来比较麻烦、而且容易出错。 

- MyBatis 给我们提供了 org.apache.ibatis.jdbc.SQL 功能类，专门用于构建 SQL 语句    

![](https://tcs-devops.aliyuncs.com/storage/112wd909597c0381bd2655a5dde0091de0a2?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY5MDM1MDk1OCwiaWF0IjoxNjg5NzQ2MTU4LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMndkOTA5NTk3YzAzODFiZDI2NTVhNWRkZTAwOTFkZTBhMiJ9.QlzWscDoqlWTsvlm7Z_bkOguzs9faCqdcKk9nlPx34Y&download=%E5%9B%BE%E7%89%87.png "")

### sql拼接测试：

```java
public class SqlTest {
    public static void main(String[] args) {
        String sql = getSql();
        System.out.println(sql);
    }
​
    public static String getSql(){
        String sql =new SQL(){
            {
            SELECT("*");
            FROM("student");
            }
        }.toString();
        return sql;
    }
}
```

### 1 查询功能的实现

- 定义功能类并提供获取查询的 SQL 语句的方法。 

- @SelectProvider：生成查询用的 SQL 语句注解。

- type 属性：生成 SQL 语句功能类对象 

- method 属性：指定调用方法  

  **代码演示：**

**1.1 构建成SQL语句功能类对象**

```java
public class ReturnSql {
    //定义方法，返回查询的sql语句
    public String getSelectAll(){

        return new SQL(){
            {
                SELECT("*");

                FROM("t_user");
            }
        }.toString();
    }
}

```

### 更改mapper接口方法：

```java
public interface UserMapper {
   // @Select("select * from t_user")
    @SelectProvider(type = ReturnSql.class,method = "getSelectAll")
    public List<User> selectAll();
}
```

**1.2 实现动态SQL查询**

	根据id和名字查询用户信息：

```text
public String getFindUser(User user){
        return new SQL() {
            {
            SELECT("*");
            FROM("t_user");
            if(user.getId()!=0){
                WHERE("id=#{id}");
            }
                if (user.getUsername()!=null && user.getUsername()!=""){
                    AND().WHERE("username =#{username}");
                }
        }
        }.toString();
    }
```

mapper文件：

```text
@SelectProvider(type = ReturnSql.class,method = "getFindUser")
    public List<User> findColl(User user);
```

测试代码：

```text
 @Test
    public  void test02(){
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        User user=new User();
        user.setId(4);
        user.setUsername("小马");
        List<User> coll = mapper.findColl(user);
        for (User user1 : coll) {
            System.out.println(user1);
        }
    }
```

根据名字和地址模糊查询

功能类对象里面编写方法：

```java
 public String getLikeUser(User user){
        return new SQL() {
            {
               SELECT("*");
               FROM("t_user").WHERE("1=1");
          if (user.getUsername()!=null && user.getUsername()!=""){
          AND().WHERE("username like concat('%',#{username},'%')");
​
                }
                if(user.getAddress()!=null && user.getAddress()!=""){
             AND().WHERE("address like concat('%',#{address},'%')");
                }
            }
        }.toString();
    }
```

mapper接口里面编写：

```java
 @SelectProvider(type = ReturnSql.class,method = "getLikeUser")
    public List<User> findLike(User user);
```

测试类编写：

```java
 @Test
    public  void test02(){
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        User user=new User();
        user.setUsername("小");
        user.setAddress("郑");
        List<User> coll = mapper.findLike(user);
        for (User user1 : coll) {
            System.out.println(user1);
        }
    }
```

### **3  新增功能的实现**

- 定义功能类并提供获取新增的 SQL 语句的方法。 

- @InsertProvider：生成新增用的 SQL 语句注解。 type 属性：生成 SQL 语句功能类对象 method 属性：指定调用方法    

代码演示：

**1、编写功能类对象**

```text
 //定义方法，返回新增的sql语句
    public String getInsert(User user) {
        return new SQL() {
            {
                INSERT_INTO("t_user");
                INTO_VALUES("#{id},#{username},#{sex},#{address},#{birthday}");
            }
        }.toString();
    }
```

**2、编写mapper接口方法**

```text
 //@Insert("INSERT INTO user VALUES (#{id},#{username},#{sex},#{address},#{birthday})")
    @InsertProvider(type = ReturnSql.class,method = "getInsert")
    public Integer insert(User user);
```

**3、编写测试类**

```text
 @Test
    public void test03(){
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        User user=new User();
       // user.setId();
        user.setUsername("李名");
        user.setAddress("新乡");
        user.setSex("男");
        user.setBirthday(Date.valueOf("2022-09-08"));
        Integer insert = mapper.insert(user);
        System.out.println(insert);
    }
```

### 4  修改功能的实现

- 定义功能类并提供获取修改的 SQL 语句的方法。 

- @UpdateProvider：生成修改用的 SQL 语句注解。 type 属性：生成 SQL 语句功能类对象 method 属性：指定调用方法    

代码实现：

**1、编写功能类对象**

```java
 //定义方法，返回修改的sql语句
    public String getUpdate(User user) {
        return new SQL() {
            {
                UPDATE("t_user");
                SET("username=#{username}","sex=#{sex}");
                WHERE("id=#{id}");
            }
        }.toString();
    }
```

**2、编写mapper接口类**

```text
  //修改功能
//@Update("UPDATE student SET  username=#{username},sex=#{sex} where id=#{id}")
 @UpdateProvider(type = ReturnSql.class , method = "getUpdate")
 public abstract Integer update(User user);
```

**3、测试运行**

```text
   @Test
    public void test03(){
        SqlSession sqlSession = MybatisUtils.getSqlSession(true);
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        User user=new User();
        user.setId(9);
        user.setUsername("李明");
        user.setAddress("新乡");
        user.setSex("男");
        user.setBirthday(Date.valueOf("2022-09-08"));
        Integer update = mapper.update(user);
        System.out.println(update);
    }
```

### 动态sql实现修改模式

1、编写功能类

```java
 //动态sql实现修改
    public String doUpdate(User user){
        return  new SQL(){
            {
                UPDATE("t_user");
                if(user.getUsername()!=null){
                    SET("username=#{username}");
                }
                if (user.getSex()!=null){
                    SET("sex=#{sex}");
                }
                if(user.getAddress()!=null){
                    SET("address=#{address}");
                }
                if (user.getId()!=null){
                    WHERE("id=#{id}");
                }
            }
        }.toString();
    }
```

2、编写mapper接口方法

```java
@UpdateProvider(type = ReturnSql.class , method = "doUpdate")
 public abstract Integer update(User user);
```

### 5  删除功能的实现

- 定义功能类并提供获取删除的 SQL 语句的方法。 

- @DeleteProvider：生成删除用的 SQL 语句注解。type 属性：生成 SQL 语句功能类对象 method 属性：指定调用方法

代码实现：

定义功能类：

```text
 //定义方法，返回删除的sql语句
    public String getDelete(Integer id) {
        return new SQL() {
            {
                DELETE_FROM("t_user");
                WHERE("id=#{id}");
            }
        }.toString();
    }
```

定义mapper接口方法：

```text
 //删除功能
    //@Delete("DELETE FROM t_user WHERE id=#{id}")
    @DeleteProvider(type = ReturnSql.class , method = "getDelete")
    public abstract Integer delete(Integer id);
```



