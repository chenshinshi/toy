# Toy研发

### 声明

1. 原作者langzhou，上传与维护人chenshinshi，本主题包含langzhou、whyt-byte、geekmai、clark-cui、lifthrasir、rovingMars制作的主题配色。
2. 感谢Savor、mini-vlook、chuizi主题提供的顶栏、底栏、有序编号、便利贴样式代码。感谢HBuiderX-Light主题提供的js功能代码。

### 已知问题

1. **主题迭代**器不支持独立窗口，与旧版P-Book主题切换或卸载需再点击迭代按钮应用主题样式。
2. **便利贴**视图的浅样式与深样式是两套属性，点击浅样式再点击深样式，深样式将覆盖浅样式，如果想再切回浅样式，需要先取消深样式。
3. 因为思源内置字色重复且区分度低，**字色有修改**，顺序不遵循原样式，如果勤换主题建议使用商店配色插件统一全局配色。字色10-12待补充。
4. 由于作者不用**代码块**，有代码块美化需求可以使用代码块美化插件。
5. 暂无计划适配**插件商店**Readme**文档**中的元素显示效果。
6. **优先适配**作者使用的思源最晚版本。
7. 系统字号不同可能会影响列表序号位置。
8. 有其他bug**去GitHub反馈**或者在群里和我私聊，群里@可能看不见，不@一定看不见。

### 主题特色

1. 菜单间距、段落**间距较大**，**题头图样式**
2. 集成古早大佬与社区分享**共15款特色配色**方案，简洁、风格化、爷青回
3. **Js功能**移植HBuiderX-Light部分功能，包含双击段落缩进、悬浮窗自动展开、悬浮窗迷你化、折叠列表悬浮展开、文档报时与关联、块视图。
4. 受zhang-light启发支持部分**文档自定义属性**：f=no只读，f=sj段首缩进，f=kd图片限宽400px

### 切换主题配色

1. 顶栏右上角第一个**调色盘**图标可以切换主题。
2. 顺序：

    |主题名称|作者|模式|面板色|背景色|提亮色|介绍|
    | -----------| -------------| ------| --------| --------| ----------| -------------------------------------------------|
    |印象|[langzhou](https://github.com/langzhou/toy-theme-for-siyuan)|☀️|黑|白|绿|仿印象笔记配色，顶栏默认隐藏（感谢Savor代码）<br />|
    |P-Book|[lifthrasir](https://ld246.com/article/1683803156009)|☀️|黑|灰|紫|拟印刷物主题P-Book移植|
    |秋芒|langzhou|☀️|茶|茶|金|黄色温暖护眼|
    |蓝墨|langzhou|🌃|深蓝|深蓝|荧光绿|深蓝色夜间主题|
    |苍青|langzhou|🌃|深青|深青|青|深绿色夜间主题|
    |黑墨|langzhou|🌃|黑|黑|黄|黑色夜间主题|
    |护眼|langzhou|☀️|绿|绿|绿|护眼豆绿|
    |满白|langzhou|☀️|暖白|白|黑|简洁白色|
    |春|langzhou|☀️|冷白|白|绿|简洁白色|
    |此夜|langzhou|🌃|蓝灰|蓝灰|黄|比黑墨亮一点的夜间主题|
    |fountain|[whyt-byte](https://github.com/whyt-byte/Fountain_theme_for_Siyuan_Light)|☀️|灰|白|蓝||
    |bearlight|[geekmai](https://github.com/geekmai/BearLight_for_SiYuan)|☀️|黑|白|红|类bear风格，暴力实现文档圆角|
    |粉紫|[clark-cui](https://github.com/clark-cui/siyuan-themes-fruits-pink)|☀️|粉|粉|粉/蓝/紫|少女粉，在原fruitspink配色基础上大幅度修改|
    |雨青|[rovingMars](https://ld246.com/article/1687343731976/comment/1687743598084#comments)|☀️|浅蓝|浅灰|深青|相比默认白色主体更深沉护眼的配色|
    |粉青|chenshinshi|☀️|浅绿|浅粉|浅绿|中式古典清新|
3. 停止支持的主题配色：Mediawiki-Vector（样式冲突）；Winter（配色重复）

### 修改

1. **全局新增**主题迭代，补充标签、引述块、图片、有序无序列表、题头图、按钮悬浮、顶栏、底栏、面板、搜索面板、闪卡、菜单样式，修改备注、备注框、文字选中、表格、PDF、滚动条、加粗、删除线、列表项、悬浮气泡、悬浮窗样式。
2. **bearlight主题**​~​ ​~修补列表辅助线错位，取消“已关闭笔记本”的浮动显示，修补网页视图显示不全、侧栏搜索UI，统一链接引用样式。**适配**思源新版本，隐藏无关元素，适配设置界面、退出聚焦按钮与tooltips。

### 待修改

1. 底栏适配插件~（朗读、护眼）~
2. 完善链接图标
3. 修改大纲标题样式

### 反馈须知

1. 本主题变体较多，bug须具体定位到某一变体~（名称可见顶栏）~。

### 借鉴移植总览

1. 配色主题：langzhou（Toy）| whyt-byte（fountain）| geekmai（bearlight）| clark-cui（fruitspink）| lifthrasir（P-Book）| rovingMars（qianlan）
2. 面板布局：langzhou（Toy）| geekmai（bearlight）| 路人二（mini-vlook）| Roy（Savor）| UserZYF（chuizi）
3. 字色样式：UserZYF（chuizi）| langzhou（toy）| chenshinshi（PinkX-room）| VIWZ（Room）
4. 特殊块样式：UserZYF（chuizi）| geekmai（bearlight）| 路人二（mini-vlook）
5. 题头样式：geekmai（bearlight）
6. 按钮交互：langzhou（Toy）| geekmai（bearlight）| Github issues
7. 搜索面板：UFDXD（HBuiderX-Light）| Roy | 熱心網友
8. Js功能：UFDXD（HBuiderX-Light）| Zuoqiu Yingyi（Dark+）| Roy（Savor）
9. 审美影响：StarDustsheep（pink-room）
