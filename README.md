# Toy研发

### 已知问题

1. **主题迭代**器不支持独立窗口与思源内部的pdf导出，也不支持平板端手机端，可以通过修改theme.css为所使用主题的css文件（名称见palette文件夹而非顶栏显示名）解决。
2. **便利贴**视图的浅样式与深样式是两套属性，点击浅样式再点击深样式，深样式将覆盖浅样式，如果想再切回浅样式，需要先取消深样式。
3. 因为思源内置字色重复且区分度低，**字色有修改**，顺序不遵循原样式，如果勤换主题建议使用商店配色插件统一全局配色。字色10-12待补充。
4. 系统**字号不同**可能会影响列表序号对齐。
5. 有其他bug**去GitHub反馈**（定位到某一主题变体）或者发邮件至**2903034828carlton@gmail.com**，因近期生活忙碌不能回复qq群@与qq私聊的内容。

### 主题特色

1. 菜单间距、段落**间距较大**
2. 集成古早大佬与社区分享**共11款特色配色**方案，简洁、风格化、爷青回
3. **Js功能**移植HBuiderX-Light部分功能，包含双击段落缩进、悬浮窗自动展开、悬浮窗迷你化、折叠列表悬浮展开、文档报时与关联、块视图。

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
    |Sapphire|langzhou|🌃|深蓝|深蓝|水蓝|深蓝色夜间主题|
    |Logseq Cyan|langzhou|🌃|深青|深青|黄|深绿色夜间主题|
    |Lighthaus|VIWZ|🌃|黑|黑|黄|黑色夜间主题|

### 修改

1. **全局新增**主题迭代，补充标签、引述块、图片、有序无序列表、题头图、代码块、按钮悬浮、顶栏、底栏、面板、搜索面板、闪卡、菜单样式，修改备注、备注框、文字选中、表格、PDF、滚动条、加粗、删除线、列表项、悬浮气泡、悬浮窗样式。
2. **bearlight主题**​~​ ​~修补列表辅助线错位，取消“已关闭笔记本”的浮动显示，修补网页视图显示不全、侧栏搜索UI，统一链接引用样式。**适配**思源新版本，隐藏无关元素，适配设置界面、退出聚焦按钮与tooltips。

### 待修改

1. 底栏适配插件~（朗读、护眼）~
2. 完善链接图标
3. 修改大纲标题样式
4. 題頭圖標懸浮樣式，题头图调整图片位置的按钮
5. 對話框樣式
6. bearlight大纲定位问题
7. b3页面（商店readme）文档适配

### 借鉴移植总览

1. 配色主题：langzhou（Toy）| whyt-byte（fountain）| geekmai（bearlight）| clark-cui（fruitspink）| lifthrasir（P-Book）| rovingMars（qianlan）
2. 面板布局：langzhou（Toy）| geekmai（bearlight）| 路人二（mini-vlook）| Roy（Savor）| UserZYF（chuizi）
3. 字色样式：UserZYF（chuizi）| langzhou（toy）| chenshinshi（PinkX-room）| VIWZ（Room）
4. 特殊块样式：UserZYF（chuizi）| geekmai（bearlight）| 路人二（mini-vlook）| 微信读书
5. 题头样式：geekmai（bearlight）
6. 按钮交互：langzhou（Toy）| geekmai（bearlight）| Github issues
7. 搜索面板：UFDXD（HBuiderX-Light）| Roy | 熱心網友
8. Js功能：UFDXD（HBuiderX-Light）| Zuoqiu Yingyi（Dark+）| Roy（Savor）
9. 审美影响：StarDustsheep（pink-room）
