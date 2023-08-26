# Toy研发

### 必读

1. **主题迭代**器暂不支持独立窗口与思源内部的pdf导出，已支持平板端手机端。可以通过修改theme.css为所使用主题的css文件（名称见palette文件夹而非顶栏显示名）解决。
2. **旧便利贴视图**替换为新便利贴视图（不会撤销旧便利贴样式）：首先对块添加块颜色1-8，之后再添加便利贴样式选择原来的便利贴1-8样式。新增的边框样式选择方法相同。
3. 因为思源内置字色重复且区分度低，**字色有修改**，顺序不遵循原样式，如果勤换主题建议使用商店配色插件统一全局配色。字色10-12待补充。
4. 系统**字号不同**可能会影响列表序号对齐。
5. 有其他bug**去GitHub反馈**（定位到某一主题变体）或者发邮件至**2903034828carlton@gmail.com**，因近期生活忙碌不能回复qq群@与qq私聊的内容。

### 主题特色

1. 菜单间距、段落**间距较大**
2. 集成古早大佬与社区分享**共11款特色配色**方案，简洁、风格化、爷青回
3. **Js功能**移植HBuiderX-Light部分功能，包含双击段落缩进、悬浮窗自动展开、悬浮窗迷你化、折叠列表悬浮展开、文档报时与关联、块视图。
4. 追求花里胡哨和少女心。

### 切换主题配色

1. 顶栏右上角第一个**调色盘**图标可以切换主题。
2. 顺序：

    |主题名称|作者|模式|面板色|背景色|提亮色|介绍|
    | ----------------| -------------| ------| --------| --------| ----------| --------------------------------------------|
    |Red Graphite|[geekmai](https://github.com/geekmai/BearLight_for_SiYuan)|☀️|黑|白|红|类bear风格，暴力实现文档圆角|
    |fountain|[whyt-byte](https://github.com/whyt-byte/Fountain_theme_for_Siyuan_Light)|☀️|灰|白|蓝|<br />|
    |Rainy Puff|[rovingMars](https://ld246.com/article/1687343731976/comment/1687743598084#comments)|☀️|浅蓝|浅灰|深青|相比默认白色主体更深沉护眼的配色|
    |P-Book|[lifthrasir](https://ld246.com/article/1683803156009)|☀️|黑|灰|紫|拟印刷物主题P-Book移植|
    |Autumn|[langzhou](https://github.com/langzhou/toy-theme-for-siyuan)<br />|☀️|茶|茶|金|黄色温暖护眼|
    |Eye Protection|langzhou|☀️|绿|绿|绿|护眼豆绿|
    |FruitsPink|[clark-cui](https://github.com/clark-cui/siyuan-themes-fruits-pink)|☀️|粉|粉|粉/蓝/紫|少女粉，在原fruitspink配色基础上大幅度修改|
    |Olive|chenshinshi|☀️|浅绿|浅粉|浅绿|中式古典清新|
    |Sapphire|langzhou|<br />|深蓝|深蓝|水蓝|深蓝色夜间主题|
    |Logseq Cyan|langzhou|<br />|深青|深青|黄|深绿色夜间主题|
    |Lighthaus|[VIWZ](https://github.com/VIWZ/Room)|<br />|黑|黑|黄|适合背景图片插件|

### 借鉴移植总览

1. 配色主题：langzhou（Toy）| whyt-byte（fountain）| geekmai（bearlight）| clark-cui（fruitspink）| lifthrasir（P-Book）| rovingMars（qianlan）| VIWZ（Room）
2. 面板布局：langzhou（Toy）| geekmai（bearlight）| 路人二（mini-vlook）| Roy（Savor）| UserZYF（chuizi）| 少数派
3. 字色样式：UserZYF（chuizi）| langzhou（toy）| chenshinshi（PinkX-room）| VIWZ（Room）
4. 特殊块样式：UserZYF（chuizi）| geekmai（bearlight）| 路人二（mini-vlook）| 微信读书
5. 题头样式：geekmai（bearlight）
6. 按钮交互：langzhou（Toy）| geekmai（bearlight）| Github issues
7. 搜索面板：UFDXD（HBuiderX-Light）| Roy | 熱心網友
8. Js功能：UFDXD（HBuiderX-Light）| Zuoqiu Yingyi（Dark+）| Roy（Savor）
9. 审美影响：StarDustsheep（pink-room）
