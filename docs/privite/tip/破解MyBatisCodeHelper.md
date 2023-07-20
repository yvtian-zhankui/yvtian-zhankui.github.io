# 破解教程

## 下载 MyBatisCodeHelper-Pro

在 idea 插件市场：https://plugins.jetbrains.com/plugin/9837-mybatiscodehelperpro/versions 下载所需版本。

## 下载 CFR

一个 Java 反编译器，官网：https://www.benf.org/other/cfr

下载好后，将 cfr-0.152.jar 和 MyBatisCodeHelper-Pro-obfuss.jar 放在同一目录下，执行命令：

```cmd
java -jar cfr-0.152.jar MyBatisCodeHelper-Pro-obfuss.jar --renamedupmembers true --hideutf false >> a.txt
```

等待数秒钟命令执行完毕，分析 a.txt 文件：

搜索 @SerializedName(value="validTo")

```java
// 付费密钥
@SerializedName(value="paidKey")
private String e;
// 校验是否通过
@SerializedName(value="valid")
private Boolean c;
// 机器码，激活时会显示
@SerializedName(value="userMac")
private String a;
// 激活的截至日期
@SerializedName(value="validTo")
private Long b; 
```

主要针对`激活时间`  和 `校验是否通过`  对应变量 找到其Setter和Getter方法

## 创建项目

导入依赖

```xml
<dependency>
    <groupId>org.javassist</groupId>
    <artifactId>javassist</artifactId>
    <version>3.25.0-GA</version>
</dependency>

<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.10.1</version>
</dependency>
```

创建App类

```java
package com.cark;

import javassist.*;

import java.io.IOException;

public class App {
    public static void main(String[] args) throws NotFoundException, CannotCompileException, IOException {
        // 加载类
        ClassPool classPool = ClassPool.getDefault();
        // 直接使用 jar 路径
        classPool.appendClassPath("D:\\desktop\\MyBatisCodeHelper-Pro\\lib\\temp\\MyBatisCodeHelper-Pro-obfuss.jar");
        classPool.appendClassPath("D:\\desktop\\MyBatisCodeHelper-Pro\\lib\\temp\\gson-2.10.1.jar");
        // 或者添加 class 目录
        //classPool.appendClassPath("");

        // 获取指定类
        CtClass ctClass = classPool.get("com.ccnode.codegenerator.T.e.b");

        // 修改激活时间get方法
        CtMethod getValidToMethod = ctClass.getDeclaredMethod("e");
        StringBuilder builder = new StringBuilder();
        builder.append("{")
                .append("       return new Long(4797976044000L);")
                .append("}");
        getValidToMethod.setBody(builder.toString());

        // 修改激活时间set方法
        CtMethod setValidToMethod = ctClass.getDeclaredMethod("a", new CtClass[]{classPool.get("java.lang.Long")});
        StringBuilder builder1 = new StringBuilder();
        builder1.append("{")
                .append("        this.e = new Long(4797976044000L);")
                .append("}");
        setValidToMethod.setBody(builder1.toString());

        // 校验是否通过get方法
        CtMethod getValidMethod = ctClass.getDeclaredMethod("b");
        String getValidMethodBuilder = "{" +
                "       return Boolean.TRUE;" +
                "}";
        getValidMethod.setBody(getValidMethodBuilder);

		// 校验是否通过set方法
        CtMethod setValidMethod = ctClass.getDeclaredMethod("a", new CtClass[]{classPool.get("java.lang.Boolean")});
        String setValidMethodBuilder = "{" +
                "this.d=Boolean.TRUE;" +
                "}";
        setValidMethod.setBody(setValidMethodBuilder);

        //名称get方法
        CtMethod getName = ctClass.getDeclaredMethod("a");
        String getNameBuilder = "{" +
                "       return \"你滴振哥\";" +
                "}";
        getName.setBody(getNameBuilder);
        // 对修改的文件，写出到一个新文件
        ctClass.writeFile("D:\\desktop\\MyBatisCodeHelper-Pro\\lib\\temp");
    }
}
```

运行完成后，会将修改的 class 文件生成到指定目录下。

## 替换 jar 包的对应 class 文件

使用压缩工具 Bandzip 或 7zip 替换都有问题。

直接使用 Java 命令替换 jar 包中的指定 class 文件：

```cmd
// MyBatisCodeHelper-Pro-obfuss.jar 文件和 com 是同级目录
jar uvf MyBatisCodeHelper-Pro-obfuss.jar com\ccnode\codegenerator\T\e\b.class

// 输出结果
// 正在添加: com/ccnode/codegenerator/e/e/a.class(输入 = 4937) (输出 = 3210)(压缩了 34%)
```

这里值得注意的是 b.class 必须放在 com\ccnode\codegenerator\e\e\a.class 文件下，要和 jar 里的的路径对应起来。

贴出 jar 命令参数详解：

```cmd
-u 添加文件到jar包中
-v 生成详细的报造，并输出至标准设备
-f 指定jar包的文件名
-c 创建一个jar包
-t 显示jar中的内容列表
-x 解压jar包
-m 指定manifest.mf文件.(manifest.mf文件中可以对jar包及其中的内容作一些一设置)
-0 产生jar包时不对其中的内容进行压缩处理
-M 不产生所有文件的清单文件(Manifest.mf)。这个参数与忽略掉-m参数的设置
-i 为指定的jar文件创建索引文件
-C 表示转到相应的目录下执行jar命令,相当于cd到那个目录，然后不带-C执行jar命令
```

然后将更新后的这个 jar 包，替换原始 jar 包，重启 idea，按如下格式输入离线激活码激活，大功告成。

```
 {
    "paidKey": "abcdefg",
    "valid": true,
    "userMac": "离线注册唯一码",
    "validTo": 4859711999000
}
```

