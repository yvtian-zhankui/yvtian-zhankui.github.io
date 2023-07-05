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
                { text: 'Spring合集版', link: '/guide/Spring/itheima/Spring' }, 
              ]
              },
            ];

var sidebarSpringMVC = [
            {
                text: 'Servlet',
                collapsible: true,
                collapsed: false,
                items: [
                { text: 'SpringMVC注解实现', link: '/guide/SpringMVC/SpringMVC注解实现' }, 
                { text: '组件介绍', link: '/guide/SpringMVC/组件介绍' }, 
                { text: 'Spring MVC教程', link: '/guide/SpringMVC/SpringMVC教程' }, 
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
                  { text: "饮食记录", link: "/privite/健康/饮食" },
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
         } ,
        
    },
   
}

