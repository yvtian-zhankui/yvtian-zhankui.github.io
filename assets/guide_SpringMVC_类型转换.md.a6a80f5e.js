import{_ as t,o as r,c as e,O as d}from"./chunks/framework.571309da.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/SpringMVC/类型转换.md","filePath":"guide/SpringMVC/类型转换.md","lastUpdated":null}'),o={name:"guide/SpringMVC/类型转换.md"},n=d('<p><a href="http://c.biancheng.net/spring_mvc/" target="_blank" rel="noreferrer">Spring MVC</a> 框架的 Converter 是一个可以将一种数据类型转换成另一种数据类型的接口，这里 S 表示源类型，T 表示目标类型。开发者在实际应用中使用框架内置的类型转换器基本上就够了，但有时需要编写具有特定功能的类型转换器。</p><h3 id="内置转换器" tabindex="-1"><strong>内置转换器</strong> <a class="header-anchor" href="#内置转换器" aria-label="Permalink to &quot;**内置转换器**&quot;">​</a></h3><p>内置的类型转换器在Spring MVC 框架中，对于常用的数据类型，开发者无须创建自己的类型转换器，因为 Spring MVC 框架有许多内置的类型转换器用于完成常用的类型转换。Spring MVC 框架提供的内置类型转换包括以下几种类型。</p><p><strong>1）标量转换器</strong></p><table><thead><tr><th>名称</th><th>作用</th></tr></thead><tbody><tr><td>StringToBooleanConverter</td><td>String 到 boolean 类型转换</td></tr><tr><td>ObjectToStringConverter</td><td>Object 到 String 转换，调用 toString 方法转换</td></tr><tr><td>StringToNumberConverterFactory</td><td>String 到数字转换（例如 Integer、Long 等）</td></tr><tr><td>NumberToNumberConverterFactory</td><td>数字子类型（基本类型）到数字类型（包装类型）转换</td></tr><tr><td>StringToCharacterConverter</td><td>String 到 Character 转换，取字符串中的第一个字符</td></tr><tr><td>NumberToCharacterConverter</td><td>数字子类型到 Character 转换</td></tr><tr><td>CharacterToNumberFactory</td><td>Character 到数字子类型转换</td></tr><tr><td>StringToEnumConverterFactory</td><td>String 到枚举类型转换，通过 Enum.valueOf 将字符串转换为需要的枚举类型</td></tr><tr><td>EnumToStringConverter</td><td>枚举类型到 String 转换，返回枚举对象的 name 值</td></tr><tr><td>StringToLocaleConverter</td><td>String 到 java.util.Locale 转换</td></tr><tr><td>PropertiesToStringConverter</td><td>java.util.Properties 到 String 转换，默认通过 ISO-8859-1 解码</td></tr><tr><td>StringToPropertiesConverter</td><td>String 到 java.util.Properties 转换，默认使用 ISO-8859-1 编码</td></tr></tbody></table><p><strong>2）集合、数组相关转换器</strong></p><table><thead><tr><th>名称</th><th>作用</th></tr></thead><tbody><tr><td>ArrayToCollectionConverter</td><td>任意数组到任意集合（List、Set）转换</td></tr><tr><td>CollectionToArrayConverter</td><td>任意集合到任意数组转换</td></tr><tr><td>ArrayToArrayConverter</td><td>任意数组到任意数组转换</td></tr><tr><td>CollectionToCollectionConverter</td><td>集合之间的类型转换</td></tr><tr><td>MapToMapConverter</td><td>Map之间的类型转换</td></tr><tr><td>ArrayToStringConverter</td><td>任意数组到 String 转换</td></tr><tr><td>StringToArrayConverter</td><td>字符串到数组的转换，默认通过“，”分割，且去除字符串两边的空格（trim）</td></tr><tr><td>ArrayToObjectConverter</td><td>任意数组到 Object 的转换，如果目标类型和源类型兼容，直接返回源对象；否则返回数组的第一个元素并进行类型转换</td></tr><tr><td>ObjectToArrayConverter</td><td>Object 到单元素数组转换</td></tr><tr><td>CollectionToStringConverter</td><td>任意集合（List、Set）到 String 转换</td></tr><tr><td>StringToCollectionConverter</td><td>String 到集合（List、Set）转换，默认通过“，”分割，且去除字符串两边的空格（trim）</td></tr><tr><td>CollectionToObjectConverter</td><td>任意集合到任意 Object 的转换，如果目标类型和源类型兼容，直接返回源对象；否则返回集合的第一个元素并进行类型转换</td></tr><tr><td>ObjectToCollectionConverter</td><td>Object 到单元素集合的类型转换</td></tr></tbody></table>',7),a=[n];function i(c,g,C,l,S,s){return r(),e("div",null,a)}const h=t(o,[["render",i]]);export{_ as __pageData,h as default};
