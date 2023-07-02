Servlet规范中的监听器-Listener

![](https://tcs-devops.aliyuncs.com/storage/112va5d85ecf0aa21392038df8f84abb384c?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9hcHBJZCI6IjVlNzQ4MmQ2MjE1MjJiZDVjN2Y5YjMzNSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTY4ODY0MzgzMCwiaWF0IjoxNjg4MDM5MDMwLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMnZhNWQ4NWVjZjBhYTIxMzkyMDM4ZGY4Zjg0YWJiMzg0YyJ9.FtCrKJxhU1rNQzAX-QkHaLabZFkuSr9c1yCdJKZ4C6g&download=%E5%9B%BE%E7%89%87.png "")

- 观察者设计模式, 所有的监听器都是观察者设计模式的体现。

- 什么是观察者设计模式呢？

    - 它是事件驱动的一种体现形式。就好比在做什么事情的时候被人盯着。当对应做到某件事时，触发事件。

- 观察者模式通常由以下三部分组成：

            事件源：触发事件的对象。

			事件：触发的动作，里面封装了事件源。

			监听器：当事件源触发事件时，要做的事情。一般是一个接口，由使用者来实现。

监听器作用：

	在开发项目中，我们可以对：对象的创建销毁、域对象中的属性变化、会话中相关的内容进行监听

	在servlet规范中共计8个监听器，监听器都是以接口形式提供的，具体功能需要我们自己来完成

### 2.1 监听对象创建的监听器

**ServletContextListener：用于监听ServletContext对象创建和销毁的监听器**

核心方法：

| 返回值  | 方法名                                         | 作用         |
| ---- | ------------------------------------------- | ---------- |
| void | contextInitialized(ServletContextEvent sce) | 对象创建时执行此方法 |
| void | contextDestroyed(ServletContextEvent sce)   | 对象销毁执行此方法  |

- 参数ServletContextEvent代表事件对象，事件是【创建对象】这个动作

- 事件对象中封装着触发事件的来源，即事件源，就是ServletContext

- 真正的事件指的是创建或销毁ServletContext对象的操作

```java
/**
​
用于监听ServletContext对象创建和销毁的监听器
​
@since v 2.3
*/
​
public interface ServletContextListener extends EventListener {
​
/**
​
对象创建时执行此方法。该方法的参数是ServletContextEvent事件对象，事件是【创建对象】这个动作
​
事件对象中封装着触发事件的来源，即事件源，就是ServletContext
*/
public default void contextInitialized(ServletContextEvent sce) {
}
​
/**
​
对象销毁执行此方法
*/
public default void contextDestroyed(ServletContextEvent sce) {
}
​
}
​
​
```

**HttpSessionListener：用于监听HttpSession对象创建和销毁的监听器**

核心方法：

| 返回值  | 方法名                                   | 作用         |
| ---- | ------------------------------------- | ---------- |
| void | csessionCreated(HttpSessionEvent se)  | 对象创建时执行此方法 |
| void | sessionDestroyed(HttpSessionEvent se) | 对象销毁执行此方法  |

- 参数HttpSessionEvent 代表事件对象

- 事件对象中封装着事件源，就是HttpSession

- 真正的事件指的是创建或销毁HttpSession对象的操作

```java
public interface HttpSessionListener extends EventListener {
​
/**
​
对象创建时执行此方法。
*/
public default void sessionCreated(HttpSessionEvent se) {
}
​
/**
​
对象销毁执行此方法
*/
public default void sessionDestroyed(HttpSessionEvent se) {
}
​
}
```



**ServletRequestListener：用于监听ServletRequest对象创建和销毁的监听器**

| 返回值  | 方法名                                          | 作用         |
| ---- | -------------------------------------------- | ---------- |
| void | requestInitialized (ServletRequestEvent sre) | 对象创建时执行此方法 |
| void | requestDestroyed (ServletRequestEvent sre)   | 对象销毁执行此方法  |

```text
public interface ServletRequestListener extends EventListener {
​
/**
​
对象创建时执行此方法。
*/
public default void requestInitialized (ServletRequestEvent sre) {
}
​
/**
​
对象销毁执行此方法
*/
public default void requestDestroyed (ServletRequestEvent sre) {
} 
​
}
```



### 2.2监听域中属性发生变化的

**ServletContextAttributeListener：用于监听ServletContext域（应用域）中属性发生变化的监听器**

核心方法：

| 返回值  | 方法名                                                  | 作用            |
| ---- | ---------------------------------------------------- | ------------- |
| void | attributeAdded(ServletContextAttributeEvent scae)    | 域中添加了属性触发此方法  |
| void | attributeRemoved(ServletContextAttributeEvent scae)  | 域中删除了属性触发此方法  |
| void | attributeReplaced(ServletContextAttributeEvent scae) | 域中属性发生改变触发此方法 |

- 参数是ServletContextAttributeEvent事件对象，事件是【添加属性】。

- 事件对象中封装着事件源，即ServletContext。

- 当ServletContext执行setAttribute方法时，此方法可以知道，并执行。

```java
public interface ServletContextAttributeListener extends EventListener {
    /**
     * 域中添加了属性触发此方法。参数是ServletContextAttributeEvent事件对象，事件是【添加属性】。
     * 事件对象中封装着事件源，即ServletContext。
     * 当ServletContext执行setAttribute方法时，此方法可以知道，并执行。
     */
    public default void attributeAdded(ServletContextAttributeEvent scae) {
    }
​
    /**
     * 域中删除了属性触发此方法
     */
    public default void attributeRemoved(ServletContextAttributeEvent scae) {
    }
​
    /**
     * 域中属性发生改变触发此方法
     */
    public default void attributeReplaced(ServletContextAttributeEvent scae) {
    }
}
```

**HttpSessionAttributeListener：用于监听HttpSession域（会话域）中属性发生变化的监听器**

核心方法：

| 返回值  | 方法名                                           | 作用            |
| ---- | --------------------------------------------- | ------------- |
| void | attributeAdded(HttpSessionBindingEvent se)    | 域中添加了属性触发此方法  |
| void | attributeRemoved(HttpSessionBindingEvent se)  | 域中删除了属性触发此方法  |
| void | attributeReplaced(HttpSessionBindingEvent se) | 域中属性发生改变触发此方法 |

- 参数是HttpSessionBindingEvent事件对象。

- 事件对象中封装着事件源，即HttpSession。

- 真正的事件是指，添加、移除、替换会话域中的属性操作。

```text
public interface HttpSessionAttributeListener extends EventListener {
​
    /**
     * 域中添加了属性触发此方法。
     */
    public default void attributeAdded(HttpSessionBindingEvent se) {
    }
​
    /**
     * 域中删除了属性触发此方法
     */
    public default void attributeRemoved(HttpSessionBindingEvent se) {
    }
​
    /**
     * 域中属性发生改变触发此方法
     */
    public default void attributeReplaced(HttpSessionBindingEvent se) {
    }
}
```

**ServletRequestAttributeListener：用于监听ServletRequest域（请求域）中属性发生变化的监听器**

核心方法：

| 返回值  | 方法名                                                  | 作用            |
| ---- | ---------------------------------------------------- | ------------- |
| void | attributeAdded(ServletRequestAttributeEvent srae）    | 域中添加了属性触发此方法  |
| void | attributeRemoved(ServletRequestAttributeEvent srae)  | 域中删除了属性触发此方法  |
| void | attributeReplaced(ServletRequestAttributeEvent srae) | 域中属性发生改变触发此方法 |

- 参数是ServletRequestAttributeEvent事件对象。

- 事件对象中封装着事件源，即ServletRequest。

- 真正的事件是指，添加、移除、替换会话域中的属性操作。

```text
public interface ServletRequestAttributeListener extends EventListener {
    /**
     * 域中添加了属性触发此方法。
     */
    public default void attributeAdded(ServletRequestAttributeEvent srae) {
    }
​
    /**
     * 域中删除了属性触发此方法
     */
    public default void attributeRemoved(ServletRequestAttributeEvent srae) {
    }
​
    /**
     * 域中属性发生改变触发此方法
     */
    public default void attributeReplaced(ServletRequestAttributeEvent srae) {
    }
}
```

### 2.3 和会话相关的两个感知型监听器

和会话域相关的两个感知型监听器是无需配置的，直接编写代码即可

**HttpSessionBinderListener：用于感知对象和和会话域绑定的监听器**

| 返回值  | 方法名                                         | 作用                |
| ---- | ------------------------------------------- | ----------------- |
| void | valueBound(HttpSessionBindingEvent event)   | 当数据加入会话域时 绑定此方法执行 |
| void | valueUnbound(HttpSessionBindingEvent event) | 会话域移除时也 ，解绑 此方法执行 |

```text
public interface HttpSessionBindingListener extends EventListener {
​
    /**
     * 当数据加入会话域时，也就是绑定，此方法执行
     */
    public default void valueBound(HttpSessionBindingEvent event) {
    }
​
    /**
     * 当从会话域移除时，也就是解绑，此方法执行
     */
    public default void valueUnbound(HttpSessionBindingEvent event) {
    }
}
```

**HttpSessionActivationListener：用于感知会话域中对象钝化和活化的监听器**

| 返回值  | 方法名                                       | 作用                    |
| ---- | ----------------------------------------- | --------------------- |
| void | sessionWillPassivate(HttpSessionEvent se) | 当会话域中的数据钝化时，此方法执行     |
| void | sessionDidActivate(HttpSessionEvent se)   | 当会话域中的数据活化时（激活），此方法执行 |

```text
public interface HttpSessionActivationListener extends EventListener {
​
    /**
     * 当会话域中的数据钝化时，此方法执行
     */
    public default void sessionWillPassivate(HttpSessionEvent se) {
    }
​
    /**
     * 当会话域中的数据活化时（激活），此方法执行
     */
    public default void sessionDidActivate(HttpSessionEvent se) {
    }
}
```



### 3 监听器的使用

在实际开发中，我们可以根据具体情况来从这8个监听器中选择使用。感知型监听器由于无需配置，只需要根据实际需求编写代码，所以此处我们就不再演示了。我们在剩余6个中分别选择一个监听对象创建销毁和对象域中属性发生变化的监听器演示一下。

3.1 ServletContextListener的使用

```text
/*
    ServletContext对象的创建和销毁的监听器
 */
//@WebListener
public class ServletContextListenerDemo implements ServletContextListener{
    /*
        ServletContext对象创建的时候执行此方法
     */
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("监听到了对象的创建...");
​
    //获取对象
    ServletContext servletContext = sce.getServletContext();
   //System.out.println(servletContext);
​
    //添加属性
    servletContext.setAttribute("username","zhangsan");
​
    //替换属性
    servletContext.setAttribute("username","lisi");
​
    //移除属性
    servletContext.removeAttribute("username");
}
​
/*
    ServletContext对象销毁的时候执行此方法
 */
@Override
public void contextDestroyed(ServletContextEvent sce) {
    System.out.println("监听到了对象的销毁...");
}
​
}
```

配置监听器：

```text
<!--配置监听器-->
<listener>
    <listener-class>com.by.web.listener.ServletContextListenerDemo</listener-class>
</listener>
```

3.2 ServletContextAttributeListener的使用

```text
/*
    应用域对象中的属性变化的监听器
 */
//@WebListener
public class ServletContextAttributeListenerDemo implements ServletContextAttributeListener{
    /*
        向应用域对象中添加属性时执行此方法
     */
    @Override
    public void attributeAdded(ServletContextAttributeEvent scae) {
        System.out.println("监听到了属性的添加...");
​
    //获取应用域对象
    ServletContext servletContext = scae.getServletContext();
    //获取属性
    Object value = servletContext.getAttribute("username");
    System.out.println(value);
}
​
/*
    向应用域对象中替换属性时执行此方法
 */
@Override
public void attributeReplaced(ServletContextAttributeEvent scae) {
    System.out.println("监听到了属性的替换...");
​
    //获取应用域对象
    ServletContext servletContext = scae.getServletContext();
    //获取属性
    Object value = servletContext.getAttribute("username");
    System.out.println(value);
}
​
/*
    向应用域对象中移除属性时执行此方法
 */
@Override
public void attributeRemoved(ServletContextAttributeEvent scae) {
    System.out.println("监听到了属性的移除...");
​
   //获取应用域对象
  ServletContext servletContext = scae.getServletContext();
  //获取属性
 Object value = servletContext.getAttribute("username");
  System.out.println(value);
}
​
}
```



