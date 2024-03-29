var sidebarServlet = [
            {
                text: 'Servlet',
                collapsible: true,
                collapsed: false,
                items: [
                { text: 'Servlet快速入门', link: '/guide/Servlet/Servlet快速入门' }, 
                { text: 'Cooike&Session', link: '/guide/Servlet/Cooike&Session' }, 
                { text: '过滤器-filter', link: '/guide/Servlet/过滤器-filter' }, 
                { text: '监听器-Listener', link: '/guide/Servlet/监听器-Listener' }, 
              ]
              },
              ];

var sidebarSpring = [
              {
                text: 'Spring',
                collapsible: true,
                collapsed: false,
                items: [
                
                { text: 'Spring简介', link: '/guide/Spring/Spring简介' }, 
                { text: 'IOC和DI入门', link: '/guide/Spring/IOC和DI入门' },
                { text: 'Bean的基础配置', link: '/guide/Spring/Bean的基础配置' },
                { text: 'Bean的生命周期（了解）', link: '/guide/Spring/Bean的生命周期（了解）' },
                { text: '依赖注入(DI配置)', link: '/guide/Spring/依赖注入(DI配置)' }, 
                { text: '第三方资源配置管理', link: '/guide/Spring/第三方资源配置管理' },
                { text: 'Spring容器', link: '/guide/Spring/Spring容器' },
                { text: 'JdbcTemplate基本使用', link: '/guide/Spring/JdbcTemplate基本使用' },
                { text: 'Spring整合Junit单元测试', link: '/guide/Spring/Spring整合Junit单元测试' },
                { text: 'AOP简介', link: '/guide/Spring/AOP简介' }, 
                { text: 'Aop基于xml和注解应用', link: '/guide/Spring/Aop基于xml和注解应用' },
                { text: 'AOP通知类型【重点】', link: '/guide/Spring/AOP通知类型【重点】' },
                { text: 'AOP案例', link: '/guide/Spring/AOP案例' },
                { text: 'Spring事务管理', link: '/guide/Spring/Spring事务管理' },
                { text: 'spring整合logBack日志框架', link: '/guide/Spring/spring整合logBack日志框架' },
                { text: 'Spring总结', link: '/guide/Spring/Spring总结' },
                { text: 'Spring合集版', link: '/guide/Spring/itheima/Spring' }, 
             
              ]
              },
            ];

var sidebarSpringMVC = [
            {
                text: 'SpringMVC',
                collapsible: true,
                collapsed: false,
                items: [
                    { text: '自我总结', link: '/guide/SpringMVC/MVC笔记/MVC自我总结' },
                    { text: '基础入门', link: '/guide/SpringMVC/SpringMVC教程' }, 
                    { text: '组件介绍', link: '/guide/SpringMVC/组件介绍' }, 
                    { text: '注解实现', link: '/guide/SpringMVC/SpringMVC注解实现' }, 
                    { text: '类型转换', link: '/guide/SpringMVC/类型转换' },   
                    { text: '数据交互', link: '/guide/SpringMVC/数据交互' },  
                    { text: '异常处理', link: '/guide/SpringMVC/异常处理' },  
                    { text: '数据校验', link: '/guide/SpringMVC/数据校验' }, 
                    { text: '文件上传', link: '/guide/SpringMVC/文件上传' },                               
              ]
              },
              ];

var sidebarMS = [
            {
                text: '面试',
                collapsible: true,
                collapsed: false,
                items: [
                    { text: 'Redis面试题', link: '/guide/面试/Redis面试题' }, 
                    { text: 'MySQL面试题', link: '/guide/面试/MySQL面试题' }, 
                    { text: '框架篇面试题', link: '/guide/面试/框架篇面试题' },                                
              ]
              },
              ];

var sidebarMyBatis = [
            {
                text: 'MyBatis',
                collapsible: true,
                collapsed: false,
                items: [
                    { text: 'Mybatis简介', link: '/guide/MyBatis/Mybatis简介' }, 
                    { text: 'MyBatis的相关api', link: '/guide/MyBatis/MyBatis的相关api' },
                    { text: 'Mybatis核心配置文件介绍', link: '/guide/MyBatis/Mybatis核心配置文件介绍' },  
                    { text: '动态sql语句', link: '/guide/MyBatis/动态sql语句' }, 
                    { text: '分页插件', link: '/guide/MyBatis/分页插件' },
                    { text: 'MyBatis的多表操作', link: '/guide/MyBatis/MyBatis的多表操作' },  
                    { text: 'MyBatis注解开发', link: '/guide/MyBatis/MyBatis注解开发' }, 
                    { text: 'Sql构建', link: '/guide/MyBatis/Sql构建' },
                    { text: 'mybatis缓存机制', link: '/guide/MyBatis/mybatis缓存机制' },  
                    { text: 'Spring整合Mybatis', link: '/guide/MyBatis/Spring整合Mybatis' },
                    { text: '整合mybatisplus', link: '/guide/MyBatis/整合mybatisplus' },                  
              ]
              },
              ];

export default {
    markdown: {
    //lineNumbers: true
    },
    lang: 'zh-CN',
    base:'/',
    title: '振的网站', //站点标题
    head:[
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    ignoreDeadLinks: true,
    lastUpdated: true,
    themeConfig: {
        siteTitle: "振的网站",
        logo: "/logo.png",
        lastUpdatedText: '最后更新',
        
        docFooter: {
          prev: '上一篇',
          next: '下一篇',
        },
         returnToTopLabel: '返回顶部',
        outlineTitle: '导航栏',
        darkModeSwitchLabel: '夜间模式',
        sidebarMenuLabel: '目录',
        
        editLink: {
            
          pattern: 'https://github.com/yvtian-zhankui/yvtian-zhankui.github.io/tree/main/docs/:path',
          text: '编辑本页内容'
        },
         nav: [//上方导航
          { text: "学习笔记", link: "/guide/" },
          { text: "GitHub", link: "https://github.com/yvtian-zhankui" },
          { text: "Gitee", link: "https://gitee.com/c555c" },
          {
            text: "其它",
            items: [
              {
                items: [
                  { text: "破解插件", link: "/privite/tip/破解MyBatisCodeHelper" },
                ],
              },
              // {
              //   items: [
              //     { text: "Item B1", link: "/item-B1" },
              //     { text: "Item B2", link: "/item-B2" },
              //   ],
              // },
            ],
      },
    ],
         socialLinks: [ //右侧导航图标
          { icon: "github", link: "https://github.com/yvtian-zhankui/yvtian-zhankui.github.io" },
        ],
         sidebar: {
            '/guide/Servlet/' : sidebarServlet,
            '/guide/Spring/' : sidebarSpring,
            '/guide/SpringMVC/' : sidebarSpringMVC,
            '/guide/面试/' : sidebarMS,
            '/guide/MyBatis/':sidebarMyBatis,
         } ,
        
    },
   
}

