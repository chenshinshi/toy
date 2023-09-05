
/**
 * toy主题特性js实现
 * 目标：能跑就行
 * 功能搬运: 请在主题详情页备注来自HBuiderXLight主题
 */

window.HBuilderXLight = {};
window.HBuilderXLight.ButtonControl = {};

// REF https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus/blob/main/theme.js
window.theme = {};

/** --------变量定义---------- */
window.theme.Funs = [];   // 针对不同情况需要触发的函数
window.theme.observers = {}; // 针对不同功能的观测器，每个观测器具有唯一标识

/* 颜色配置文件列表 */
window.theme.colors = [
    'palette/bearlight.css',
    'palette/fountain.css',
    'palette/rainypuff.css',
    'palette/pbook.css',
    'palette/autumn.css',
    'palette/eyeprotection.css',
    'palette/fruitspink.css',
    'palette/olive.css',
    'palette/sapphire.css',
    'palette/logseqcyan.css',
    'palette/lighthaus.css',
];

/* DOM 节点 ID */
window.theme.IDs = {
    STYLE_COLOR: 'custom-id-style-theme-color',
    BUTTON_TOOLBAR_CHANGE_COLOR: 'custom-id-button-toolbar-change-color',
    LOCAL_STORAGE_COLOR_HREF: 'langzhou-color-href',
};

/* 循环迭代器 */
window.theme.Iterator = function* (items) {
    // REF [ES6中的迭代器(Iterator)和生成器(Generator) - 小火柴的蓝色理想 - 博客园](https://www.cnblogs.com/xiaohuochai/p/7253466.html)
    for (let i = 0; true; i = (i + 1) % items.length) {
        yield items[i];
    }
}

/**
 * 加载样式文件
 * @params {string} href 样式地址
 * @params {string} id 样式 ID
 */
window.theme.loadStyle = function (href, id = null) {
    let style = document.createElement('link');
    if (id) style.id = id;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = href;
    document.head.appendChild(style);
}

/**
 * 更新样式文件
 * @params {string} id 样式文件 ID
 * @params {string} href 样式文件地址
 */
window.theme.updateStyle = function (id, href) {
    let style = document.getElementById(id);
    if (style) {
        style.setAttribute('href', href);
    }
    else {
        window.theme.loadStyle(href, id);
    }
}

/**
 * 获取客户端模式
 * @return {string} 'app' 或 'desktop' 或 'mobile'
 */
window.theme.clientMode = (() => {
    const url = new URL(window.location.href);
    switch (true) {
        case url.pathname.startsWith('/stage/build/app/window.html'):
            return 'window';
        case url.pathname.startsWith('/stage/build/app'):
            return 'app';
        case url.pathname.startsWith('/stage/build/desktop'):
            return 'desktop';
        case url.pathname.startsWith('/stage/build/mobile'):
            return 'mobile';
        default:
            return null;
    }
})();

/**----------------------------------去除段落首行缩进---------------------------------*/

function Removefirstlineindent() {

    AddEvent(document.body, "dblclick", (e) => {

        var toolbarEdit = document.querySelector("svg#toolbarEdit.toolbar__icon");
        if (toolbarEdit != null) {
            var iconEdit = toolbarEdit.firstElementChild;
            var xlink_href = iconEdit.getAttribute("xlink:href");
            if (xlink_href == "#iconEdit") {
                return;
            }
        }

        GetItem("段落缩进", (offOn) => {

            if (offOn != "1" && (getComputedStyle(document.getElementsByTagName("head")[0]).backgroundColor != "rgba(0, 0, 0, 0)")) return;

            var element = e.target;
            if ((window.getSelection ? window.getSelection() : document.selection.createRange().text).toString().length != 0) return;

            e.preventDefault();
            if (element.getAttribute("contenteditable") == null) return;

            var item = element.parentElement;
            if (item != null && item.className != "p") return;
            item = element.parentElement.previousElementSibling;

            var isli = false;
            if (item != null && item.getAttribute("draggable") != null) {
                isli = true;
            };

            var element = element.parentElement;
            var data_node_id = element.getAttribute("data-node-id");

            var custom_indent = element.getAttribute("custom-indent");

            if (isli) {
                if (custom_indent == null || custom_indent == "false") {
                    element.setAttribute("custom-indent", true);
                    设置思源块属性(data_node_id, { "custom-indent": "true" });

                } else {
                    element.setAttribute("custom-indent", false);
                    设置思源块属性(data_node_id, { "custom-indent": "false" });

                }
            } else {

                if (custom_indent == null || custom_indent == "true") {
                    element.setAttribute("custom-indent", false);
                    设置思源块属性(data_node_id, { "custom-indent": "false" });

                } else {
                    element.setAttribute("custom-indent", true);
                    设置思源块属性(data_node_id, { "custom-indent": "true" });

                }
            }
        })
    });
}

function GetItem(key, then = null) {
    获取文件("/data/widgets/toy.config.json", (config) => {
        if (config) {//不存在配置文件就要创建
            // console.log(config[key]);
            try {

                if (then) then(config[key]);
            } catch (error) {
                if (then) then(null);
            }
        } else {
            写入文件("/data/widgets/toy.config.json", JSON.stringify({ "HBuilderXLight": 1 }, undefined, 4), then(null));
        }
    });
}

/**----------------------------------为打开文档的标题下显示文档创建日期----------------------------------*/

function showDocumentCreationDate() {
    setInterval(DocumentCreationDate, 300);
}

function DocumentCreationDate() {
    var openDoc = document.querySelectorAll(".layout-tab-container>.fn__flex-1.protyle:not(.fn__none):not([creatTimeOK])");
    if (window.theme.clientMode == "mobile") openDoc = document.querySelectorAll(".fn__flex-column>.fn__flex-1.protyle:not(.fn__none)");
    var allDocumentTitleElement = [];
    for (let index = 0; index < openDoc.length; index++) {
        const element = openDoc[index];
        if (!element.getAttribute("creatTimeOK")) {
            element.setAttribute("creatTimeOK", true);
            if (window.theme.clientMode == "mobile") {
                var editor = element.children[1].children[1];
                var paddingLeft = editor.style.paddingLeft;
                var nodeID = editor.parentElement.firstChild.getAttribute("data-node-id");
                editor.insertAdjacentHTML("beforebegin", `<div data-node-id="${nodeID}" style="padding-left:${paddingLeft};" data-type="docInfoContainer"><div>`)
            }
            allDocumentTitleElement.push(element.children[1].children[1]);
        } else if (window.theme.clientMode == "mobile") {
            // 移动端要检测node-id是否对应并重新刷新
            var editor = element.children[1].children[1];
            var nodeID = editor.parentElement.firstChild.getAttribute("data-node-id");
            var infoContainer = editor.parentElement.querySelector('div[data-type="docInfoContainer"]');
            if (infoContainer.getAttribute("data-node-id") != nodeID) {
                // 切换页面了，此时要重新刷新
                infoContainer.setAttribute("data-node-id", nodeID);
                infoContainer.innerHTML = "";
                allDocumentTitleElement.push(infoContainer);
            }
        }
    }

    for (let index = 0; index < allDocumentTitleElement.length; index++) {
        const element = allDocumentTitleElement[index];
        var documentCreatTimeElement = creatTimeSpanElement(element);
        documentCreatTimeElement.innerText = "获取文档创建日期中……";
        tilteWhlie(element, documentCreatTimeElement);
    }
}

function tilteWhlie(element, documentCreatTimeElement) {
    var i = 0;
    var setID = setInterval(() => {
        var time = getDocumentTime(element);

        if (i == 100) {
            documentCreatTimeElement.innerText = "获取文档创建日期失败";
            clearInterval(setID);
            return;
        }

        if (time != "") {
            documentCreatTimeElement.innerText = time;
            clearInterval(setID);
            return;
        };
        i++;
    }, 1000);
}

/**获取所有打开文档的标题元素 */
function getAllDocumentTitleElement() {
    var openDoc = document.querySelectorAll(".layout-tab-container>.fn__flex-1.protyle:not(.fn__none)");
    var arr = [];
    for (let index = 0; index < openDoc.length; index++) {
        const element = openDoc[index];
        arr.push(element.children[1].children[1].children[1]);
    }
    return arr;
}

/**为文档标题元素下创建时间容器元素 */
function creatTimeSpanElement(tilteElement) {
    var item = tilteElement.children;
    for (let index = 0; index < item.length; index++) {
        const element = item[index];
        if (element.getAttribute("documentCreatTimeElement") != null) return element;
    }
    var documentCreatTimeElement = addinsertCreateElement(tilteElement, "span");
    documentCreatTimeElement.setAttribute("documentCreatTimeElement", "true");
    documentCreatTimeElement.style.display = "block";
    documentCreatTimeElement.style.marginLeft = "3px";
    documentCreatTimeElement.style.marginBottom = "0px";
    documentCreatTimeElement.style.fontSize = "61%";
    documentCreatTimeElement.style.color = "#767676";
    return documentCreatTimeElement;
}

/**获得这个文档的创建时间 */
function getDocumentTime(tilteElement) {
    try {
        var tS = tilteElement.getAttribute("data-node-id");
        if (tS == null) return "";
        var year = tS.substring(0, 4);
        var moon = tS.substring(4, 6);
        var day = tS.substring(6, 8);
        var hour = tS.substring(8, 10);
        var minute = tS.substring(10, 12);
        var second = tS.substring(12, 14);
        return year + "-" + moon + "-" + day + "  " + hour + ":" + minute + ":" + second;
    } catch (error) {
        return "";
    }
}

/**--------------------------------显示文档父文档、子文档 ---------------------------------------------*/

function displayParentChildDocuments() {

    setInterval(() => {
        var documentCreatTimeElement = document.querySelectorAll("[documentCreatTimeElement]:not([parentChild])");
        for (let index = 0; index < documentCreatTimeElement.length; index++) {
            const element = documentCreatTimeElement[index];
            element.setAttribute("parentChild", true);
            var documentCreatParentChild = creatParentChild(element);
            documentCreatParentChild.innerText = "检查父子文档中……";
            parentChildWhlie(element, documentCreatParentChild);
        }
    }, 300);

    function parentChildWhlie(documentCreatTimeElement, documentCreatParentChild) {

        var i = 300;
        var seid = setInterval(() => {

            i--;
            var docID = documentCreatTimeElement.parentElement.parentElement.firstElementChild.getAttribute("data-node-id");

            if (i < 0) {
                clearInterval(seid);
                documentCreatParentChild.firstChild.remove();
            }

            if (docID == null) return;
            clearInterval(seid);

            //获取文档所在笔记本id
            queryAPI(`SELECT box, path FROM blocks WHERE id = '${docID}'`, (g) => {
                var ParentChild = document.createElement("div");
                ParentChild.innerHTML = `
                <p>
                <span>父文档：</span><span></span>
                </p>
                <p>
                <span>子文档：</span><span></span>
                </p>
                `;

                //检查设置父文档
                if (g[0] == undefined) {
                    documentCreatParentChild.firstChild.remove();
                    return;
                }
                var item1 = g[0].path.split("/");
                if (item1.length >= 3) {//检查有没有父文档；
                    var fatherDocid = item1[item1.length - 2];

                    根据ID获取人类可读路径(fatherDocid, (p) => {
                        var fatherDoName = ((p.split("/")).reverse())[0];
                        ParentChild.firstElementChild.lastElementChild.appendChild(creatA(fatherDocid, fatherDoName));
                        设置子文档()
                    })

                } else {
                    ParentChild.firstElementChild.remove();//无父文档
                    设置子文档()
                }

                function 设置子文档() {
                    //检查设置子文档
                    获取子文档数据(g[0].box, g[0].path, window.siyuan.config.fileTree.sort, (childs) => {
                        if (childs.length == 0) {
                            //没有子文档
                            ParentChild.lastElementChild.remove();//无子文档
                        } else {
                            var doc_css = ParentChild.lastElementChild;
                            var doc_cs = doc_css.lastElementChild;

                            for (let index = 0; index < childs.length; index++) {
                                const element = childs[index];
                                //console.log(element, element.hCtime);
                                var item2 = element.path.split("/");
                                var ID = item2[item2.length - 1].split(".sy")[0];
                                var name = element.name.split(".sy")[0];
                                var doc_c = creatA(ID, name);
                                doc_cs.appendChild(doc_c);
                            }


                            doc_css.style.maxHeight = "100px";
                            doc_css.style.overflow = "scroll";
                            doc_css.style.overflowX = "hidden";
                            doc_css.style.transition = " all .15s cubic-bezier(0, 0, .2, 1) 0ms";


                            AddEvent(doc_css, "mouseenter", () => {
                                //console.log(getComputedStyle(doc_css).height);
                                var item = parseFloat(getComputedStyle(doc_css).height);
                                item = 100 - item;
                                if (item < 2) {
                                    doc_css.style.maxHeight = "500px";
                                    doc_css.style.paddingBottom = "20px";
                                }
                            })

                            AddEvent(doc_css, "mouseleave", () => {
                                if (getComputedStyle(doc_css).height > "100px") {
                                    doc_css.style.maxHeight = "100px";
                                    doc_css.style.removeProperty("padding-bottom");

                                }
                            })

                        }

                        if (ParentChild.firstElementChild != null) {//任意存在父子文档加入dom
                            documentCreatParentChild.firstChild.remove();
                            documentCreatParentChild.appendChild(ParentChild);
                        } else {
                            documentCreatParentChild.firstChild.remove();
                        }
                    });
                }



            });
        }, 100)


    }

    function openHistoryDoc(e) {
        e.stopPropagation();
        if (e.target.tagName == "SPAN" && e.target.getAttribute("data-href")) {
            try {
                window.open(e.target.getAttribute("data-href"));
            } catch (err) {
                console.error(err);
            }
        }
    }

    function creatA(id, name) {
        var as = document.createElement("span");

        var a = document.createElement("span");
        a.setAttribute("data-href", "siyuan://blocks/" + id)
        a.innerHTML = name;
        a.style.paddingRight = "1px";
        a.style.cursor = "pointer";
        a.addEventListener("click", openHistoryDoc, false);


        AddEvent(a, "mouseenter", () => {
            if (a.getAttribute("isclick") == null) {
                a.parentElement.style.textDecoration = "underline";
            } else {
                a.parentElement.style.textDecoration = "none";
            }
        });
        AddEvent(a, "mouseleave", () => { a.parentElement.style.textDecoration = " none" });
        AddEvent(a, "click", () => {
            a.setAttribute("isclick", true);
            a.parentElement.style.color = "rgb(119,28,170)";
        });

        var s = document.createElement("span");
        s.setAttribute("data-type", 'a');
        s.setAttribute("data-href", "siyuan://blocks/" + id)
        s.innerText = "◈";
        s.style.paddingRight = "10px";
        s.style.cursor = "pointer";
        as.style.color = "#767676";
        as.title = "点击可跳转，悬浮◈可预览";
        as.appendChild(a);
        as.appendChild(s);
        return as;
    }


    /**为文档标题元素下父子容器展示元素 */
    function creatParentChild(documentCreatTimeElement) {

        var is = documentCreatTimeElement.nextElementSibling;
        if (is != null && is.getAttribute("documentCreatParentChild") != null) {
            return element;
        } else {
            var documentCreatParentChild = insertCreateAfter(documentCreatTimeElement, "span");
            documentCreatParentChild.setAttribute("documentCreatParentChild", "true");
            documentCreatParentChild.style.display = "block";
            documentCreatParentChild.style.marginLeft = "3px";
            documentCreatParentChild.style.marginBottom = "0px";
            documentCreatParentChild.style.fontSize = "61%";
            documentCreatParentChild.style.color = "#767676";
            return documentCreatParentChild;
        }

    }
}

/**
 * 向指定父级创建追加一个子元素，并可选添加ID,
 * @param {Element} fatherElement 
 * @param {string} addElementTxt 要创建添加的元素标签
 * @param {string} setId 
 * @returns addElementObject
 */
function addinsertCreateElement(fatherElement, addElementTxt, setId = null) {
    if (!fatherElement) console.error("指定元素对象不存在！");
    if (!addElementTxt) console.error("未指定字符串！");

    var element = document.createElement(addElementTxt);

    if (setId) element.id = setId;

    fatherElement.appendChild(element);

    return element;
}

/**
 * 向指定元素后创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
function insertCreateAfter(targetElement, addElementTxt, setId = null) {

    if (!targetElement) console.error("指定元素对象不存在！");
    if (!addElementTxt) console.error("未指定字符串！");

    var element = document.createElement(addElementTxt);

    if (setId) element.id = setId;

    var parent = targetElement.parentNode;//得到父节点
    if (parent.lastChild === targetElement) {
        //如果最后一个子节点是当前元素那么直接添加即可
        parent.appendChild(element);
        return element;
    } else {
        parent.insertBefore(element, targetElement.nextSibling);//否则，当前节点的下一个节点之前添加
        return element;
    }
}

/**----------------------------------自动展开悬浮窗折叠列表,展开搜索条目折叠列表,聚焦单独列表-----体验优化----------------------------------*/

function autoOpenList() {
    setInterval(() => {
        //找到所有的悬浮窗
        var Preview = document.querySelectorAll("[data-oid]");

        //如果发现悬浮窗内首行是折叠列表就展开并打上标记
        if (Preview.length != 0) {
            for (let index = 0; index < Preview.length; index++) {
                diguiTooONE_2(Preview[index], (v) => {
                    if (v.classList.contains("block__content")) {
                        var vs = v.children;
                        for (let index = 0; index < vs.length; index++) {
                            var obj = vs[index].children[1]
                            if (obj == null) continue;
                            const element = obj.firstElementChild.firstElementChild;
                            if (element == null) continue;
                            if (!element.classList.contains("li")) continue;//判断是否是列表
                            if (element.getAttribute("foldTag") != null) continue;//判断是否存在标记
                            if (element.getAttribute("foid") == 0) continue;//判断是折叠
                            setTimeout(() => {
                                element.setAttribute("fold", 0);
                                element.setAttribute("foldTag", true);
                            }, 0)
                        }
                        return true;
                    }
                    return false;
                }, 7)
            }
        }

        var searchPreview = document.querySelector("#searchPreview [data-doc-type='NodeListItem'].protyle-wysiwyg.protyle-wysiwyg--attr>div:nth-child(1)");
        if (searchPreview == null) {
            searchPreview = document.querySelector("#searchPreview [data-doc-type='NodeList'].protyle-wysiwyg.protyle-wysiwyg--attr>div:nth-child(1)>div:nth-child(1)");
        }
        if (searchPreview != null && searchPreview.getAttribute("data-type") == "NodeListItem" && searchPreview.getAttribute("fold") == 1) {
            if (searchPreview.getAttribute("foldTag") == null) {//判断是否存在标记
                searchPreview.setAttribute("fold", 0);
                searchPreview.setAttribute("foldTag", true);
            }
        }
        var contentLIst = [];
        var item1 = document.querySelectorAll(".layout-tab-container>.fn__flex-1.protyle:not(.fn__none) [data-doc-type='NodeListItem'].protyle-wysiwyg.protyle-wysiwyg--attr>div:nth-child(1)");
        var item2 = document.querySelectorAll(".layout-tab-container>.fn__flex-1.protyle:not(.fn__none) [data-doc-type='NodeList'].protyle-wysiwyg.protyle-wysiwyg--attr>div:nth-child(1)>div:nth-child(1)");
        contentLIst = [...item1, ...item2];
        for (let index = 0; index < contentLIst.length; index++) {
            const element = contentLIst[index];
            if (element != null && element.getAttribute("data-type") == "NodeListItem" && element.getAttribute("fold") == 1) {
                if (element.getAttribute("foldTag") != null) continue;//判断是否存在标记
                element.setAttribute("fold", 0);
                element.setAttribute("foldTag", true);
            }
        }

    }, 500)
}

/**
* 递归DOM元素查找深度子级的第一个符合条件的元素-同层全部筛选一遍在依次深度搜索。
* @param {*} element 要查找DOM元素
* @param {*} judgeFun 查找函数 : fun(v) return true or false
* @param {*} xianz 限制递归最大次数
* @returns element
*/
function diguiTooONE_2(element, judgeFun, xianz = 999) {

    if (element == null || element.firstElementChild == null) return null;
    if (judgeFun == null) return null;
    var i = xianz <= 0 ? 10 : xianz;
    return digui(element);

    function digui(elem) {

        if (i <= 0) return null;
        i--;

        var child = elem.children;
        var newchild = [];
        for (let index = 0; index < child.length; index++) {
            const element2 = child[index];
            if (judgeFun(element2)) {
                return element2;
            } else {
                if (newchild.firstElementChild != null) newchild.push(element2);
            }
        }

        for (let index = 0; index < newchild.length; index++) {
            const element2 = newchild[index];
            var item = digui(element2);
            if (item == null) continue;
            return item;
        }
        return null;
    }
}

/**----------------------------------列表折叠内容预览查看---------------------------------- */
function collapsedListPreview() {
    BodyEventRunFun("mouseover", collapsedListPreviewEvent, 3000)
}

function collapsedListPreviewEvent() {
    var _turn = [...document.querySelectorAll(".layout-tab-container>.fn__flex-1.protyle:not(.fn__none) [data-node-id].li[fold='1']"),
    ...document.querySelectorAll("[data-oid] [data-node-id].li[fold='1']"),
    ...document.querySelectorAll("#searchPreview [data-node-id].li[fold='1']")];//查询页面所有的折叠列表
    var turn = [];
    for (let index = 0; index < _turn.length; index++) {//找到列表第一列表项（父项）
        const element = _turn[index].children[1];
        var item = element.className;
        if (item == "p" || item == "h1" || item == "h2" || item == "h3" || item == "h4" || item == "h5" || item == "h6") {
            turn.push(element.firstElementChild)
        }
    }

    //检查注册事件的折叠列表是否恢复未折叠状态,是清除事件和去除标志属性
    var ListPreview = [...document.querySelectorAll(".layout-tab-container>.fn__flex-1.protyle:not(.fn__none) [ListPreview]"),
    ...document.querySelectorAll("[data-oid] [ListPreview]"),
    ...document.querySelectorAll("#searchPreview [ListPreview]")];
    for (let index = 0; index < ListPreview.length; index++) {
        const element = ListPreview[index];
        var fold = element.parentElement.getAttribute("fold")
        if (fold == null || fold == 0) {
            element.removeAttribute("ListPreview");
            var item = element.firstElementChild;
            RemoveEvent(item, "mouseenter", LIstIn);//解绑鼠标进入
            RemoveEvent(item.parentElement.parentElement, "mouseleave", LIstout);//解绑鼠标离开

            var items = Array.from(item.parentElement.parentElement.children);
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                if (element.getAttribute("triggerBlock") != null) {
                    element.remove();
                }
            }
        }
    }

    for (let index = 0; index < turn.length; index++) {//重新注册、筛选未注册鼠标事件折叠列表
        const element = turn[index];
        var elementPP = element.parentElement.parentElement;

        if (element.parentElement.getAttribute("ListPreview") != null) {
            RemoveEvent(element, "mouseenter", LIstIn);//解绑鼠标进入
            RemoveEvent(elementPP, "mouseleave", LIstout);//解绑鼠标离开

            AddEvent(element, "mouseenter", LIstIn);//注册鼠标进入
            AddEvent(elementPP, "mouseleave", LIstout);//注册鼠标离开
        } else {
            element.parentElement.setAttribute("ListPreview", true);
            AddEvent(element, "mouseenter", LIstIn);//注册鼠标进入
            AddEvent(elementPP, "mouseleave", LIstout);//注册鼠标离开
        }
    }
}

var flag22 = false;

function LIstout(e) {
    items = Array.from(e.target.children);
    flag22 = false;
    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        if (element.getAttribute("triggerBlock") != null) {
            element.remove();
        }
    }
}

function LIstIns(e) {
    var id = setInterval(() => {

        if (!flag22) {
            clearInterval(id);
            return;
        }

        var obj = e.target;

        var timeDiv = addinsertCreateElement(obj, "div");
        timeDiv.style.display = "inline-block";
        timeDiv.style.width = "0px";
        timeDiv.style.height = "16px";

        var X = timeDiv.offsetLeft;
        var Y = timeDiv.offsetTop;
        timeDiv.remove();

        var item = obj.parentElement.parentElement;
        if (item == null) return;
        var items = item.children
        var itemobj = items[items.length - 1];
        if (itemobj != null && itemobj.getAttribute("triggerBlock") != null) {

            var items1 = items[items.length - 1];
            items1.style.top = (Y + 20) + "px";
            items1.style.left = (obj.offsetLeft + 35) + "px";
            var items2 = items[items.length - 2];
            items2.style.top = (Y + 2) + "px";
            items2.style.left = (X + 45) + "px";
            return;
        }

    }, 500);
}

function LIstIn(e) {
    flag22 = true;

    var obj = e.target;
    var timeDiv = addinsertCreateElement(obj, "div");
    timeDiv.style.display = "inline-block";
    timeDiv.style.width = "0px";
    timeDiv.style.height = "16px";

    var X = timeDiv.offsetLeft;
    var Y = timeDiv.offsetTop;
    timeDiv.remove();

    var f = obj.parentElement.parentElement;
    if (!f) return;
    var items = f.children;

    var itemobj = items[items.length - 1];
    if (itemobj != null && itemobj.getAttribute("triggerBlock") != null) return;

    var triggerBlock1 = CreatetriggerBlock(e)//创建触发块1
    //设置触发块样式，将触发块显示在〔 ··· 〕第二行位置
    triggerBlock1.style.top = (Y + 20) + "px";
    triggerBlock1.style.left = (obj.offsetLeft + 35) + "px";

    var triggerBlock2 = CreatetriggerBlock(e)//创建触发块2
    //设置触发块样式，将触发块显示在〔 ··· 〕位置
    triggerBlock2.style.top = (Y + 2) + "px";
    triggerBlock2.style.left = (X + 45) + "px";

    //一秒延时后搜索打开的悬浮窗，将悬浮窗中的列表展开,重复检查三次
    var previewID = obj.parentElement.parentElement.getAttribute("data-node-id");
    var jisu = 0;

    AddEvent(triggerBlock1, "mouseenter", async () => {
        // 等待悬浮窗出现
        await waitForPopover(previewID);
        //一秒延时后搜索打开的悬浮窗，将悬浮窗中的列表展开,重复检查三次
        setTimeout(Suspended, 0)
    });//注册鼠标进入

    AddEvent(triggerBlock2, "mouseenter", async () => {
        // 等待悬浮窗出现
        await waitForPopover(previewID);
        //一秒延时后搜索打开的悬浮窗，将悬浮窗中的列表展开,重复检查三次
        setTimeout(Suspended, 0)
    });//注册鼠标进入
    function Suspended() {
        jisu++;
        var y = false;
        if (jisu == 3) return
        var Sd = document.querySelectorAll("[data-oid]");
        if (Sd.length >= 1) { //如果找到那么就将悬浮窗中列表展开
            for (let index = 0; index < Sd.length; index++) {
                const element = Sd[index];
                var protyle = element.querySelector("div.protyle-wysiwyg");
                if (protyle == null) continue;
                var item = getNode(protyle);
                if (item.getAttribute("data-node-id") == previewID) {
                    item.setAttribute("fold", 0);
                    y = true;
                }
            }
        }
        if (!y) { setTimeout(Suspended, 800) }
    }
    LIstIns(e);
}

function CreatetriggerBlock(e) {
    var objParent = e.target.parentElement;
    var triggerBlock = addinsertCreateElement(objParent.parentElement, "div");//创建触发块
    //设置触发块样式，将触发块显示在〔 ··· 〕位置
    triggerBlock.setAttribute("triggerBlock", true);
    triggerBlock.style.position = "absolute";
    triggerBlock.style.width = "40px";
    triggerBlock.style.height = "15px";
    //triggerBlock.style.background="red";
    triggerBlock.style.display = "flex";
    triggerBlock.style.zIndex = "9";
    triggerBlock.style.cursor = "pointer";
    triggerBlock.style.WebkitUserModify = "read-only";
    triggerBlock.setAttribute("contenteditable", "false");
    triggerBlock.innerHTML = "&#8203";

    //获取折叠列表ID,设置悬浮窗
    //protyle-wysiwyg__embed data-id
    var previewID = objParent.parentElement.getAttribute("data-node-id");
    triggerBlock.setAttribute("class", "protyle-attr");

    triggerBlock.style.opacity = "0.2";
    //在触发块内创建思源超链接 
    triggerBlock.innerHTML = "<span data-type='a' class='list-A' data-href=siyuan://blocks/" + previewID + "> >>> </span>";
    //将这个思源连接样式隐藏
    var a = triggerBlock.firstElementChild;
    a.style.fontSize = "15px";
    a.style.lineHeight = "15px";
    a.style.border = "none";
    return triggerBlock;
}

/** --------------------------------在菜单中添加视图选择选项-------------------------------- */
function addViewSelector() {

    var commonMenu = document.querySelector("div[id=\"commonMenu\"] div.b3-menu__items");
    if (!window.theme.observers["menuAttr"]) window.theme.observers["menuAttr"] = menuAttrMonitor()

    // 监听.b3-menu__items的childList
    function menuAttrMonitor () {
        // window.addEventListener('mouseup', MenuShow)
        var observer = new MutationObserver((ms, o) => {
            for (let m of ms) {
                // 仅在有菜单的时候触发
                if (m.target.children.length) MenuShow();
            }
        })
        observer.observe(commonMenu, {childList:true});
        return observer;
    }

    /* 相关操作 */ 

    function MenuShow() {
        setTimeout(() => {
            let selectinfo = getBlockSelected()
            // 仅在存在选中块的情况下触发
            if (selectinfo) {
                let selecttype = selectinfo.type
                let selectid = selectinfo.id
                if(selecttype=="NodeList"||selecttype=="NodeTable"||selecttype=="NodeParagraph"){
                    setTimeout(()=>InsertMenuItem(selectid,selecttype), 0)
                }
            }
        }, 0);
    }
        
    function InsertMenuItem(selectid,selecttype){
        let readonly = commonMenu.querySelector(".b3-menu__item--readonly")
        let selectview = commonMenu.querySelector('[id="viewselect"]')
        if (readonly) {
            if (!selectview) {
                commonMenu.insertBefore(ViewSelect(selectid,selecttype),readonly)
                commonMenu.insertBefore(MenuSeparator(),readonly)
            }
        }
    }

    /**
     * 获得所选择的块对应的块 ID
     * @returns {string} 块 ID
     * @returns {
     *     id: string, // 块 ID
     *     type: string, // 块类型
     *     subtype: string, // 块子类型(若没有则为 null)
     * }
     * @returns {null} 没有找到块 ID */
    function getBlockSelected() {
        let node_list = document.querySelectorAll('.protyle-wysiwyg--select');
        if (node_list.length === 1 && node_list[0].dataset.nodeId != null) return {
            id: node_list[0].dataset.nodeId,
            type: node_list[0].dataset.type,
            subtype: node_list[0].dataset.subtype,
        };
        return null;
    }

    function ViewSelect(selectid,selecttype){
        let button = document.createElement("button")
        button.id="viewselect"
        button.className="b3-menu__item"
        button.innerHTML='<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">视图选择</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>'
        button.appendChild(SubMenu(selectid,selecttype))
        return button
    }

    function ViewMonitor(event){
        let id = event.currentTarget.getAttribute("data-node-id")
        let attrName = 'custom-'+event.currentTarget.getAttribute("custom-attr-name")
        let attrValue = event.currentTarget.getAttribute("custom-attr-value")
        let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`)
        if(blocks){
            blocks.forEach(block=>block.setAttribute(attrName,attrValue))
        }
        let attrs={}
        attrs[attrName] =attrValue
        设置思源块属性(id,attrs)
    }
    
    /**
     * 定制子菜单节点
     * @param {string} selectid 选中的块id
     * @param {string} selecttype 选中块的类型
     * @param {string} className 希望设置的子菜单在菜单中显示的类名，默认为‘b3-menu__submenu’
     * @returns 添加到菜单中的子菜单节点
     */
    function SubMenu(selectid,selecttype,className = 'b3-menu__submenu') {
        let node = document.createElement('div');
        node.className = className;
        if(selecttype=="NodeList"){
            node.appendChild(listGraphView(selectid))
            node.appendChild(listTableView(selectid))
            node.appendChild(listDefaultView(selectid))
        }
        if(selecttype=="NodeTable"){
            node.appendChild(tableFixWidth(selectid))
            node.appendChild(tableAutoWidth(selectid))
            node.appendChild(tableRemoveth(selectid))
            node.appendChild(tableDefaultth(selectid))
        }
        if(selecttype=="NodeParagraph"){
            node.appendChild(pBlockBorder(selectid))
            node.appendChild(pStickyNote(selectid))
            node.appendChild(pLane(selectid))
            node.appendChild(pDefault(selectid))
        }
        return node;
    }
    /**
     * 将列表转换为导图视图
     * @param {string} selectid 选中的块的ID
     * @returns 添加到菜单中的按钮
     */
    function listGraphView(selectid){
    let button = document.createElement("button")
    button.className="b3-menu__item"
    button.setAttribute("data-node-id",selectid)
    button.setAttribute("custom-attr-name","f")
    button.setAttribute("custom-attr-value","dt")
    
    button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">转换为导图</span>`
    button.onclick=ViewMonitor
    return button
    }
    /**
     * 将列表转换为表格视图
     * @param {string} selectid 选中的块ID
     * @returns 添加到菜单中的按钮
     */
    function listTableView(selectid){
    let button = document.createElement("button")
    button.className="b3-menu__item"
    button.setAttribute("data-node-id",selectid)
    button.setAttribute("custom-attr-name","f")
    button.setAttribute("custom-attr-value","bg")
    
    button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">转换为表格</span>`
    button.onclick=ViewMonitor
    return button
    }
    /**
     * 将列表还原回列表视图
     * @param {string} selectid 选中的块ID
     * @returns 添加到菜单中的按钮
     */
    function listDefaultView(selectid){
    let button = document.createElement("button")
    button.className="b3-menu__item"
    button.onclick=ViewMonitor
    button.setAttribute("data-node-id",selectid)
    button.setAttribute("custom-attr-name","f")
    button.setAttribute("custom-attr-value",'')
    
    button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">恢复为列表</span>`
    return button
    }
    /**
     * 将表格设置为页面宽度
     * @param {string} selectid 选中的块ID
     * @returns 添加到菜单中的按钮
     */
    function tableFixWidth(selectid){
    let button = document.createElement("button")
    button.className="b3-menu__item"
    button.onclick=ViewMonitor
    button.setAttribute("data-node-id",selectid)
    button.setAttribute("custom-attr-name","f")
    button.setAttribute("custom-attr-value","full")
    
    button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">页面宽度</span>`
    return button
    }
    /**
     * 将表格设置为自动宽度
     * @param {string} selectid 选中的块ID
     * @returns 添加到菜单中的按钮
     */
    function tableAutoWidth(selectid){
    let button = document.createElement("button")
    button.className="b3-menu__item"
    button.setAttribute("data-node-id",selectid)
    button.setAttribute("custom-attr-name","f")
    button.setAttribute("custom-attr-value","auto")
    button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconRefresh"></use></svg><span class="b3-menu__label">自动宽度</span>`
    button.onclick=ViewMonitor
    return button
    }
    /**
     * 隐藏表格的表头
     * @param {string} selectid 选中的块ID
     * @returns 添加到菜单中的按钮
     */
    function tableRemoveth(selectid){
    let button = document.createElement("button")
    button.className="b3-menu__item"
    button.onclick=ViewMonitor
    button.setAttribute("data-node-id",selectid)
    button.setAttribute("custom-attr-name","t")
    button.setAttribute("custom-attr-value","biaotou")
    
    button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">空白表头</span>`
    return button
    }
    /**
     * 还原默认的表格表头样式
     * @param {string} selectid 选中的块ID
     * @returns 添加到菜单中的按钮
     */
    function tableDefaultth(selectid){
    let button = document.createElement("button")
    button.className="b3-menu__item"
    button.setAttribute("data-node-id",selectid)
    button.setAttribute("custom-attr-name","t")
    button.setAttribute("custom-attr-value","")
    button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconRefresh"></use></svg><span class="b3-menu__label">默认表头</span>`
    button.onclick=ViewMonitor
    return button
    }
    /**
     * 给文本块添加边框
     * @param {string} selectid 选中的块ID
     * @returns 添加到菜单中的按钮
     */
    function pBlockBorder(selectid){
    let button = document.createElement("button")
    button.className="b3-menu__item"
    button.setAttribute("data-node-id",selectid)
    button.setAttribute("custom-attr-name","bk")
    button.setAttribute("custom-attr-value","1")
    button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#icon-1f514"></use></svg><span class="b3-menu__label">边框</span>`
    button.onclick=ViewMonitor
    return button
    }
    /**
     * 将文本块设置为便利贴形式
     * @param {string} selectid 选中的块ID
     * @returns 添加到菜单中的按钮
     */
    function pStickyNote(selectid){
    let button = document.createElement("button")
    button.className="b3-menu__item"
    button.setAttribute("data-node-id",selectid)
    button.setAttribute("custom-attr-name","bk")
    button.setAttribute("custom-attr-value","bl")
    button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#icon-1f514"></use></svg><span class="b3-menu__label">便利贴</span>`
    button.onclick=ViewMonitor
    return button
    }
    /**
     * 给文本块设置行线
     * @param {string} selectid 选中的块ID
     * @returns 添加到菜单中的按钮
     */
    function pLane(selectid){
    let button = document.createElement("button")
    button.className="b3-menu__item"
    button.setAttribute("data-node-id",selectid)
    button.setAttribute("custom-attr-name","bk")
    button.setAttribute("custom-attr-value","hx")
    button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#icon-1f514"></use></svg><span class="b3-menu__label">行线</span>`
    button.onclick=ViewMonitor
    return button
    }
    /**
     * 给文本块设置行线
     * @param {string} selectid 选中的块ID
     * @returns 添加到菜单中的按钮
     */
    function pDefault(selectid){
    let button = document.createElement("button")
    button.className="b3-menu__item"
    button.setAttribute("data-node-id",selectid)
    button.setAttribute("custom-attr-name","bk")
    button.setAttribute("custom-attr-value","")
    button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconRefresh"></use></svg><span class="b3-menu__label">还原</span>`
    button.onclick=ViewMonitor
    return button
    }
    /**
     * 产生菜单分割线
     * @param {string} className 分割线的类名，默认为'b3-menu__separator'
     * @returns 以供插入的分割线节点
     */
    function MenuSeparator(className = 'b3-menu__separator') {
    let node = document.createElement('button');
    node.className = className;
    return node;
    }
}

/**-------------------------------------钉住悬浮窗增强------------------------------------- */
//点击思源悬浮窗头栏中央触发块缩小窗口（默认设置钉住），再次点击恢复
//记忆缩小、放大状态窗口大小调整红的状态
//右键窗口中央触发块调整缩小状态窗口透明度
function zoomOutToRestoreTheFloatingWindow() {

    if (window.theme.observers["zoomOutfloatWindow"]) return;
    var observer = new MutationObserver((ms, o) => {
        for (let m of ms) {
            // 如果触发出现的不是悬浮窗那就不管了
            let close = true;
            for (let node of m.addedNodes) {
                // 只要有一个添加的是悬浮窗就触发
                if (node.className.indexOf("block__popover") != -1) close = false;
            }
            // 如果所有都不是悬浮窗就不管了
            if (close) continue;
            
            // TODO: 这个功能好像有点问题，记得修复
            var pins = document.querySelectorAll("[data-type='pin']:not([WindowMin]):not(.protyle-util [data-type='pin'])");

            //任何时候，实验悬浮窗中间最大最小化按钮居中
            var maxMinButton = document.querySelectorAll(".maxMinButton");
            maxMinButton.forEach((v) => {
                v.style.left = ((parseFloat(getComputedStyle(v.parentElement.parentElement).width) * 0.5) - 40) + "px";
            })

            pins.forEach(pin => {
                pin.setAttribute("WindowMin", true);

                var siYuanWindown = pin.parentElement.parentElement;
                var maxMinButton = addinsertCreateElement(pin.parentElement, "div");
                maxMinButton.style.width = "80px";
                maxMinButton.style.position = "absolute";
                maxMinButton.style.left = ((parseFloat(getComputedStyle(siYuanWindown).width) * 0.5) - 40) + "px";
                maxMinButton.style.height = "18.5px";
                maxMinButton.style.top = "3px"
                maxMinButton.style.border = "1px dashed rgb(239,241,220)";
                maxMinButton.style.backgroundColor = "rgba(239, 241, 220, 0.077)";
                maxMinButton.style.zIndex = "99";
                maxMinButton.style.cursor = "pointer";
                maxMinButton.setAttribute('class', "maxMinButton");

                //窗口状态
                var isWindowMin = false;
                var isMove = false;
                var istur = false;

                var WindowMinWidth = "355.4px";
                var WindowMinheight = "200px";
                var WindowMinOpacity = 0.4;
                var WindowMinOpacitytransformscale = "scale(0.7)";

                var danqTime = 0;



                AddEvent(maxMinButton, "click", WindowMin);
                AddEvent(maxMinButton, "mousedown", maxMinButtonMousedown);
                AddEvent(siYuanWindown, "mousedown", siYuanWindownMousedown);
                AddEvent(siYuanWindown, "mouseup", siYuanWindownMouseup);
                AddEvent(siYuanWindown.children[1], "mouseenter", siYuanWindownMouseenter);
                AddEvent(siYuanWindown.children[1], "mouseleave", siYuanWindownMouseleave);

                function WindowMin(e) {

                    if (isMove) { isMove = false; return; }

                    siYuanWindown.setAttribute("isWindowMin", isWindowMin = !isWindowMin);

                    //默认变为钉住状态
                    if (pin.getAttribute("aria-label") == "钉住") pin.click();

                    var siYuanWindownClassStyle = getComputedStyle(siYuanWindown);
                    if (isWindowMin) {//缩小状态
                        //保存？保存了个啥
                        siYuanWindown.setAttribute("WindowMaxWidth", siYuanWindownClassStyle.width);
                        siYuanWindown.setAttribute("WindowMaxHeight", siYuanWindownClassStyle.height);
                        //设置
                        siYuanWindown.style.width = WindowMinWidth;
                        siYuanWindown.style.height = WindowMinheight;
                        siYuanWindown.style.opacity = WindowMinOpacity;
                        siYuanWindown.style.fontSize = "80%";
                        //siYuanWindown.style.transform=WindowMinOpacitytransformscale;

                    } else {//恢复原状态
                        siYuanWindown.style.width = siYuanWindown.getAttribute("WindowMaxWidth");
                        siYuanWindown.style.height = siYuanWindown.getAttribute("WindowMaxHeight");;
                        siYuanWindown.style.opacity = "1";
                        // siYuanWindown.style.transform="none";
                        siYuanWindown.style.fontSize = "100%";

                    }
                    maxMinButton.style.left = ((parseFloat(getComputedStyle(siYuanWindown).width) * 0.5) - 40) + "px";
                }

                function maxMinButtonMousedown(e) {

                    if (e.button == 0) {
                        danqTime = Date.now();
                        AddEvent(maxMinButton, "mousemove", maxMinButtonMousemove);
                        AddEvent(maxMinButton, "mouseup", maxMinButtonMouseup);
                    }

                    if (e.button == 2) {
                        if (!isWindowMin) return;
                        WindowMinOpacity += 0.2;
                        if (WindowMinOpacity > 1) WindowMinOpacity = 0.4;
                        siYuanWindown.style.opacity = WindowMinOpacity;
                    }
                }

                function maxMinButtonMouseup() {
                    if (isMove) {
                        if (((Date.now()) - danqTime) < 200) isMove = false;
                        danqTime = 0;
                    }
                    RemoveEvent(maxMinButton, "mousemove", maxMinButtonMousemove);
                    RemoveEvent(maxMinButton, "mouseup", maxMinButtonMouseup);
                }

                function maxMinButtonMousemove() {
                    isMove = true;
                }

                function siYuanWindownMousedown(e) {
                    if (e.button != 0) return;

                    var elem = e.target;
                    var className = elem.className;
                    if (className != "block__ns" && className != "block__ew" && className != "block__nwse") return
                    istur = true;
                    AddEvent(document.body, "mousemove", resizeWindow);
                }

                function siYuanWindownMouseup() {
                    istur = false;
                    RemoveEvent(document.body, "mousemove", resizeWindow);
                }

                function resizeWindow() {
                    var siYuanWindownClassStyle = getComputedStyle(siYuanWindown);
                    if (isWindowMin) {
                        //console.log("拖动窗口大小", "设置缩小窗口");
                        WindowMinWidth = siYuanWindownClassStyle.width;
                        WindowMinheight = siYuanWindownClassStyle.height;
                    } else {
                        // console.log("拖动窗口大小", "设置放大窗口");
                        siYuanWindown.setAttribute("WindowMaxWidth", siYuanWindownClassStyle.width);
                        siYuanWindown.setAttribute("WindowMaxHeight", siYuanWindownClassStyle.height);
                    }
                    maxMinButton.style.left = ((parseFloat(getComputedStyle(siYuanWindown).width) * 0.5) - 40) + "px";
                }

                function siYuanWindownMouseenter() {
                    if (!isWindowMin || istur) return;
                    siYuanWindown.style.opacity = "1";
                    /*
                    siYuanWindown.style.width = parseFloat(WindowMinWidth)*1.01+"px";
                    siYuanWindown.style.height = parseFloat(WindowMinheight)*1.01+"px";
                    maxMinButton.style.left = ((parseFloat(getComputedStyle(siYuanWindown).width) * 0.5) - 40) + "px";*/

                }
                function siYuanWindownMouseleave() {
                    if (!isWindowMin || istur) return;
                    siYuanWindown.style.opacity = WindowMinOpacity;
                    /*siYuanWindown.style.width = WindowMinWidth;
                    siYuanWindown.style.height = WindowMinheight;
                    maxMinButton.style.left = ((parseFloat(getComputedStyle(siYuanWindown).width) * 0.5) - 40) + "px";*/
                }
            });
        }
        
    });
    observer.observe(document.body, {childList:true});
    window.theme.observers["zoomOutfloatWindow"] = observer;
}

/** --------------------------------添加主题选择器-------------------------------- */
function addStyleSelector() {
    let drag = document.getElementById('drag'); // 标题栏
    if (window.theme.clientMode == "mobile") drag = document.getElementById('toolbarName'); // 手机端的标题栏不太一样
    const themeStyle = document.getElementById('themeStyle'); // 当前主题引用路径
    if (themeStyle) {
        const THEME_ROOT = new URL(themeStyle.href).pathname.replace('theme.css', ''); // 当前主题根目录
        /* 通过颜色配置文件列表生成完整 URL 路径 */
        const colors_href = [];
        window.theme.colors.forEach(color => colors_href.push(`${THEME_ROOT}${color}`));
        window.theme.iter = window.theme.Iterator(colors_href);
        var color_href = window.siyuan?.storage[window.theme.IDs.LOCAL_STORAGE_COLOR_HREF];
        if (!color_href) {
            localStorage.getItem(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF);
        }
        if (color_href) { // 将迭代器调整为当前配色
            for (let i = 0; i < window.theme.colors.length; ++i) {
                if (window.theme.iter.next().value === color_href) break;
            }
        }
        else { // 迭代器第一个为当前配色
            color_href = window.theme.iter.next().value;
            localStorage.setItem(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
            setLocalStorageVal(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
        }

        /* 加载配色文件 */
        window.theme.updateStyle(window.theme.IDs.STYLE_COLOR, color_href);

        if (window.theme.clientMode == "mobile") {
            // 如果是手机端，就直接给标题栏塞个图标，不然样式不对
            const doc = new DOMParser().parseFromString(`<svg id="${window.theme.IDs.BUTTON_TOOLBAR_CHANGE_COLOR}" class="toolbar__icon"><use xlink:href="#iconTheme"></use></svg>`, 'text/html')
            const svg_change_color = doc.getElementById(window.theme.IDs.BUTTON_TOOLBAR_CHANGE_COLOR)
            svg_change_color.addEventListener('click', e => {
                color_href = window.theme.iter.next().value;
                localStorage.setItem(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
                setLocalStorageVal(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
                window.theme.updateStyle(window.theme.IDs.STYLE_COLOR, color_href);
            });
            if (drag) drag.insertAdjacentElement('afterend', svg_change_color);
            return;
        }

        const button_change_color = document.createElement('button'); // 切换主题颜色按钮
        button_change_color.id = window.theme.IDs.BUTTON_TOOLBAR_CHANGE_COLOR;
        button_change_color.className = 'toolbar__item b3-tooltips b3-tooltips__sw';
        if (window.theme.clientMode == "mobile") button_change_color.className = 'toolbar__item b3-tooltips b3-tooltips__sw';
        button_change_color.ariaLabel = '切换主题颜色';
        button_change_color.innerHTML = `<svg class="toolbar__icon"><use xlink:href="#iconTheme"></use></svg>`;
        button_change_color.addEventListener('click', e => {
            color_href = window.theme.iter.next().value;
            localStorage.setItem(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
            setLocalStorageVal(window.theme.IDs.LOCAL_STORAGE_COLOR_HREF, color_href);
            window.theme.updateStyle(window.theme.IDs.STYLE_COLOR, color_href);
        });

        if (drag) {
            // REF [JS DOM 编程复习笔记 -- insertAdjacentHTML（九） - 知乎](https://zhuanlan.zhihu.com/p/425616377)
            drag.insertAdjacentElement('afterend', button_change_color);
            drag.insertAdjacentHTML('afterend', `<div class="protyle-toolbar__divider"></div>`);
        }
    }
}

//+++++++++++++++++++++++++++++++++思源API++++++++++++++++++++++++++++++++++++
//思源官方API文档  https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md

async function queryAPI(sqlstmt, then, obj = null) {
    await 向思源请求数据("/api/query/sql", {
        stmt: sqlstmt
    }).then((v) => then(v.data, obj))
}

/**
 * 
 * @param {*} 内容块id 
 * @param {*} 回调函数 
 * @param {*} 传递对象 
 */
async function 根据ID获取人类可读路径(内容块id, then, obj = null) {
    await 向思源请求数据('/api/filetree/getHPathByID', {
        id: 内容块id
    }).then((v) => then(v.data, obj))
}

async function 以id获取文档聚焦内容(id, then, obj = null) {
    await 向思源请求数据('/api/filetree/getDoc', {
        id: id,
        k: "",
        mode: 0,
        size: 36,
    }).then((v) => then(v.data, obj))
}

async function 更新块(id, dataType, data, then = null, obj = null) {
    await 向思源请求数据('/api/block/updateBlock', {
        id: id,
        dataType: dataType,
        data: data,
    }).then((v) => {
        if (then) then(v.data, obj);
    })
}

async function 设置思源块属性(内容块id, 属性对象) {
    let url = '/api/attr/setBlockAttrs'
    return 解析响应体(向思源请求数据(url, {
        id: 内容块id,
        attrs: 属性对象,
    }))
}

async function 获取块属性(内容块id, then = null, obj = null) {
    let url = '/api/attr/getBlockAttrs'
    return 向思源请求数据(url, {
        id: 内容块id
    }).then((v) => {
        if (then) then(v.data, obj);
    })
}

async function 向思源请求数据(url, data) {
    const response = await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            Authorization: `Token ''`,
        }
    });
    if (response.status === 200)
        return await response.json();
    else return null;
}

async function 解析响应体(response) {
    let r = await response
    return r.code === 0 ? r.data : null
}

async function 获取文件(path, then = null, obj = null) {
    let url = '/api/file/getFile';
    await 向思源请求数据(url, {
        path: path
    }).then((v) => {
        if (then) then(v, obj);
    });
}

/**
 * 
 * @param {*} notebookID 笔记本id
 * @param {*} dataPath 父文档路径
 * @param {*} sortType 文档排序类型
 * @param {*} then 回调函数
 * @param {*} obj 传递对象
 */
async function 获取子文档数据(notebookID, dataPath, sortType, then = null, obj = null) {
    let url = "/api/filetree/listDocsByPath";
    await 向思源请求数据(url, {
        notebook: notebookID,
        path: dataPath,
        sort: sortType,
    }).then((v) => {
        if (then) then(v.data.files, obj);
    });
}

async function 写入文件(path, filedata, then = null, obj = null, isDir = false, modTime = Date.now()) {

    let blob = new Blob([filedata]);
    let file = new File([blob], path.split('/').pop());
    let formdata = new FormData();
    formdata.append("path", path);
    formdata.append("file", file);
    formdata.append("isDir", isDir);
    formdata.append("modTime", modTime);
    const response = await fetch(
        "/api/file/putFile", {
        body: formdata,
        method: "POST",
        headers: {
            Authorization: `Token ""`,
        },
    });

    if (response.status === 200) {
        if (then) then(obj);
    }
}

/**
 * 设置LocalStorage
 * @param {*} ikey 
 * @param {*} ival 
 */
async function setLocalStorageVal(ikey, ival) {
    let url = "/api/storage/setLocalStorageVal";
    let response = await 向思源请求数据({app: getAppId(), key: ikey, val: ival}, url);
    if (window.top.siyuan.storage != undefined) {
        window.top.siyuan.storage[ikey] = ival;
    }
    function getAppId() {
        let wsurl = window.top.siyuan.ws.ws.url;
        let appIdMatchResult = wsurl.match(new RegExp(`(\\?app=|&app=)[^&]+`, "g"));
        if (appIdMatchResult.length == 1){
            return appIdMatchResult[0].substring(5);
        }else if (appIdMatchResult.length > 1) {
            console.warn("正则获取appId错误", appIdMatchResult);
            return appIdMatchResult[0].substring(5);
        }else {
            console.error("正则获取appId错误", appIdMatchResult);
            return "";
        }
    }
}

function getNode(source) {
    var node = source;
    while (!node.getAttribute("data-node-id")) {
        node = node.children[0];
    }
    return node;
}

async function waitForPopover(popID) {
    var i = 0
    var notReady = true
    while (notReady) {
        let popovers = document.querySelectorAll("[data-oid] div.protyle-wysiwyg")
        for (let protyle of popovers) {
            console.log(protyle);
            if (protyle.firstChild?.getAttribute("data-node-id") == popID) notReady = false;
        }
        i += 1;
        if (i == 50) break;
        await sleep(500);
    }
}

async function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time);
    })
}

/** -----------------------事件监听相关----------------------- */

/**
 * 为元素注册监听事件
 * @param {Element} element 
 * @param {string} strType 
 * @param {Fun} fun 
 */
function AddEvent(element, strType, fun) {
    //判断浏览器有没有addEventListener方法
    if (element.addEventListener) {
        element.addEventListener(strType, fun, false);
        //判断浏览器有没 有attachEvent IE8的方法	
    } else if (element.attachEvent) {
        element.attachEvent("on" + strType, fun);
        //如果都没有则使用 元素.事件属性这个基本方法
    } else {
        element["on" + strType] = fun;
    }
}

/**
 * 为元素解绑监听事件
 * @param {Element}  element ---注册事件元素对象
 * @param {String}   strType ---注册事件名(不加on 如"click")
 * @param {Function} fun	 ---回调函数
 * 
 */
function RemoveEvent(element, strType, fun) {
    //判断浏览器有没有addEventListener方法
    if (element.addEventListener) {
        // addEventListener方法专用删除方法
        element.removeEventListener(strType, fun, false);
        //判断浏览器有没有attachEvent IE8的方法	
    } else if (element.attachEvent) {
        // attachEvent方法专用删除事件方法
        element.detachEvent("on" + strType, fun);
        //如果都没有则使用 元素.事件属性这个基本方法
    } else {
        //删除事件用null
        element["on" + strType] = null;
    }
}

/** -------------------------初始化函数执行--------------------- */
if (window.theme.clientMode == "mobile") {
    window.theme.Funs = [
        addStyleSelector,
        // Removefirstlineindent,//开启段落首行缩进的情况下，双击段落尾部去除缩进
        showDocumentCreationDate,//为打开文档标题下面显示文档创建日期
        // displayParentChildDocuments,//为文档展示父子文档
        addViewSelector,// 菜单中添加视图选择
        // collapseExpand_Head_List,//鼠标中键标题、列表文本折叠/展开
        () => console.log("==============>toy主题:附加CSS和特性JS_已经执行<==============")
    ];
} else {
    window.theme.Funs = [
        addStyleSelector,
        // Removefirstlineindent,//开启段落首行缩进的情况下，双击段落尾部去除缩进
        showDocumentCreationDate,//为打开文档标题下面显示文档创建日期
        // displayParentChildDocuments,//为文档展示父子文档
        autoOpenList,//自动展开悬浮窗内折叠列表（第一次折叠）
        collapsedListPreview,//折叠列表内容预览查看
        zoomOutToRestoreTheFloatingWindow,//钉住悬浮窗增强
        addViewSelector,// 菜单中添加视图选择
        () => console.log("==============>toy主题:附加CSS和特性JS_已经执行<==============")
    ];
}

setTimeout(() => {
    window.theme.Funs.reverse();
    var index = (window.theme.Funs.length) - 1;
    var ID = setInterval(() => {
        if (index >= 0) {
            window.theme.Funs[index]();
        } else {
            clearInterval(ID);
        }
        index--;
    }, 100)
}, 0)

















// 无用函数

// //渲染进程和主进程通信
// if (window.theme.clientMode == "app") {
//     const { ipcRenderer } = window.require('electron');
//     ipcRenderer.on("siyuan-send_windows", (event, data) => {
//         console.log(data);
//         switch (data.Value) {
//             case "ButtonControl"://按钮状态控制
//                 var ControlButtonIDs = data.ControlButtonIDs;
//                 for (let index = 0; index < ControlButtonIDs.length; index++) {
//                     const ControlButtonID = ControlButtonIDs[index];
//                     window.HBuilderXLight.ButtonControl[ControlButtonID.ButtonID][ControlButtonID.ControlFun]();
//                 }
//                 break;
    
//             default:
//                 break;
//         }
//     });
//     window.HBuilderXLight.broadcast = (data) => {
//         ipcRenderer.send("siyuan-send_windows", data);
//     }
// }

// //+++++++++++++++++++++++++++++++++辅助API++++++++++++++++++++++++++++++++++++

// /**简单判断目前思源是否是手机模式 */
// function isPhone() {
//     return document.getElementById("toolbarName") != null && document.getElementById("toolbar") == null;
// }
// /**简单判断目前思源是否是pc窗口模式 */
// function isPcWindow() {
//     return document.body.classList.contains("body--window");
// }
// /**简单判断目前思源是pc模式 */
// function isPc() {
//     return document.getElementById("windowControls") != null && document.getElementById("toolbar") != null && !document.getElementById("toolbar").classList.contains("toolbar--browser");
// }
// /**简单判断目前思源是否是浏览器模式 */
// function isBrowser() {
//     return document.getElementById("toolbar") != null && document.getElementById("toolbar").classList.contains("toolbar--browser");
// }

// /**
//  * 方便为主题功能添加开关按钮，并选择是否拥有记忆状态
//  * @param {*} ButtonID 按钮ID。
//  * @param {*} ButtonTitle 按钮作用提示文字。
//  * @param {*} ButtonFunctionType 按钮功能类型。:EnumButtonFunctionType 枚举
//  * @param {*} ButtonCharacteristicType 按钮特性类型。:EnumButtonCharacteristicType 枚举
//  * @param {*} NoButtonSvg 按钮激活Svg图标路径
//  * @param {*} OffButtonSvg 按钮未激活Svg图标路径
//  * @param {*} OnClickRunFun 按钮开启执行函数
//  * @param {*} OffClickRunFun 按钮关闭执行函数
//  * @param {*} Memory 是否设置记忆状态 true为是留空或false为不设置记忆状态。
//  */
// function HBuiderXThemeToolbarAddButton(ButtonID, ButtonFunctionType, ButtonCharacteristicType, ButtonTitle, ONButtonSvgURL, OffButtonSvgURL, OnClickRunFun, OffClickRunFun, Memory = false) {

//     //确认主题功能区toolbar是否存在，不存在就创建
//     var HBuiderXToolbar = document.getElementById("HBuiderXToolbar");
//     if (HBuiderXToolbar == null) {
//         if (isPc()) {
//             HBuiderXToolbar = document.createElement("div");
//             HBuiderXToolbar.id = "HBuiderXToolbar";
//             HBuiderXToolbar.style.marginRight = "3px";
//             HBuiderXToolbar.style.marginTop = "6px";
//             document.getElementById("windowControls").parentElement.insertBefore(HBuiderXToolbar, document.getElementById("windowControls"));

//             HBuiderXToolbar.style.width = "35px";
//             HBuiderXToolbar.style.overflow = "hidden";
//             AddEvent(HBuiderXToolbar, "mouseover", () => { HBuiderXToolbar.style.width = "auto" })
//             AddEvent(HBuiderXToolbar, "mouseout", () => { HBuiderXToolbar.style.width = "35px" })

//         } else if (isBrowser()) {
//             HBuiderXToolbar = insertCreateAfter(document.getElementById("barMode"), "div", "HBuiderXToolbar");
//             HBuiderXToolbar.style.marginRight = "3px";
//             HBuiderXToolbar.style.marginTop = "4px";

//             HBuiderXToolbar.style.width = "35px";
//             HBuiderXToolbar.style.overflow = "hidden";
//             AddEvent(HBuiderXToolbar, "mouseover", () => { HBuiderXToolbar.style.width = "auto" })
//             AddEvent(HBuiderXToolbar, "mouseout", () => { HBuiderXToolbar.style.width = "35px" })
//         }
//         else if (isPcWindow()) {
//             HBuiderXToolbar = insertCreateBefore(document.getElementById("minWindow"), "div", "HBuiderXToolbar");
//             HBuiderXToolbar.style.position = "absolute";
//             HBuiderXToolbar.style.height = "25px";
//             HBuiderXToolbar.style.paddingTop = "2px";
//             HBuiderXToolbar.style.overflowY = "scroll";
//             HBuiderXToolbar.style.right = "77px";

//             HBuiderXToolbar.style.width = "35px";
//             HBuiderXToolbar.style.overflow = "hidden";
//             AddEvent(HBuiderXToolbar, "mouseover", () => { HBuiderXToolbar.style.width = "auto" })
//             AddEvent(HBuiderXToolbar, "mouseout", () => { HBuiderXToolbar.style.width = "35px" })
//         } else if (isPhone()) {
//             HBuiderXToolbar = insertCreateBefore(document.getElementById("toolbarEdit"), "div", "HBuiderXToolbar");
//             HBuiderXToolbar.style.position = "relative";
//             HBuiderXToolbar.style.height = "25px";
//             HBuiderXToolbar.style.overflowY = "scroll";
//             HBuiderXToolbar.style.paddingTop = "7px";
//             HBuiderXToolbar.style.marginRight = "9px";
//         }
//     }


//     var addButton = addinsertCreateElement(HBuiderXToolbar, "div");
//     addButton.style.width = "17px";
//     addButton.style.height = "100%";
//     addButton.style.float = "left";
//     addButton.style.marginLeft = "10px";
//     addButton.style.backgroundImage = "url(" + OffButtonSvgURL + ")";
//     addButton.style.backgroundRepeat = "no-repeat";
//     addButton.style.backgroundPosition = "left top";
//     addButton.style.backgroundSize = "100%";
//     addButton.style.cursor = "pointer";

//     addButton.setAttribute("title", ButtonTitle);
//     addButton.id = ButtonID;

//     var offon = "0";
//     var isclick = 0;

//     var broadcastData_off = { "Value": "ButtonControl", "ControlButtonIDs": [{ "ButtonID": ButtonID, "ControlFun": "ControlFun_off" }] };
//     var broadcastData_on = { "Value": "ButtonControl", "ControlButtonIDs": [{ "ButtonID": ButtonID, "ControlFun": "ControlFun_on" }] };

//     if (Memory) {
//         GetItem(ButtonID, (v) => {
//             offon = v;
//             if (offon == "1") {
//                 _on();
//             } else if (offon == null || offon == undefined) {
//                 offon = "0";
//             }
//         });

//     }

//     AddEvent(addButton, "click", () => {
//         window.HBuilderXLight.ButtonControl[ButtonID].Isclick = isclick = 1;

//         if (offon == "0" || offon == null || offon == undefined) {
//             window.HBuilderXLight.broadcast(broadcastData_on);
//             return;
//         }

//         if (offon == "1") {
//             window.HBuilderXLight.broadcast(broadcastData_off);
//             return;
//         }
//     });


//     AddEvent(addButton, "mouseover", () => {
//         if (offon == "0" || offon == null || offon == undefined) {
//             addButton.style.filter = "drop-shadow(rgb(0, 0, 0) 0px 0)";
//         }
//     });
//     AddEvent(addButton, "mouseout", () => {
//         if (offon == "0" || offon == null || offon == undefined) {
//             addButton.style.filter = "none";
//         }
//     });


//     function buttonCharacteristicDispose() {
//         switch (ButtonCharacteristicType) {
//             case 2:
//                 if (ButtonFunctionType == 2) {

//                     var topicfilterButtons = [];
//                     var ButtonControl = window.HBuilderXLight.ButtonControl;

//                     for (var t in ButtonControl) {
//                         if (t != ButtonID && ButtonControl[t].ButtonFunctionType == 2 && ButtonControl[t].OffOn == "1") {
//                             //console.log(t, ButtonControl[t].OffOn);
//                             ButtonControl[t].Isclick = 1;
//                             topicfilterButtons.push(ButtonControl[t]);
//                         }
//                     }

//                     if (topicfilterButtons.length == 0) {
//                         window.HBuilderXLight.ButtonControl[ButtonID].Isclick = isclick = 0;
//                         return;
//                     }
//                     //console.log(ButtonControl[ButtonID].Isclick);
//                     if (window.HBuilderXLight.ButtonControl[ButtonID].Isclick == 1) {
//                         var index = (topicfilterButtons.length) - 1;
//                         var id = setInterval(() => {
//                             if (index >= 0) {
//                                 //console.log(window.HBuilderXLight.ButtonControl[ButtonID].Isclick);

//                                 const element = topicfilterButtons[index];
//                                 element["ControlFun_off"]();
//                             } else {
//                                 // console.log(window.HBuilderXLight.ButtonControl[ButtonID].Isclick);

//                                 clearInterval(id);
//                                 window.HBuilderXLight.ButtonControl[ButtonID].Isclick = isclick = 0;

//                             }
//                             index--;
//                         }, 300)
//                     } else {
//                         for (let index = 0; index < topicfilterButtons.length; index++) {
//                             const element = topicfilterButtons[index];
//                             element["ControlFun_off"]();
//                         }
//                     }
//                 }

//                 break;

//             default:
//                 break;
//         }
//     }

//     function _off() {
//         addButton.style.backgroundImage = "url(" + OffButtonSvgURL + ")";
//         addButton.style.filter = "none";
//         window.HBuilderXLight.ButtonControl[ButtonID].OffOn = offon = "0";
//         //console.log(window.HBuilderXLight.ButtonControl[ButtonID].Isclick);

//         if (Memory && window.HBuilderXLight.ButtonControl[ButtonID].Isclick == 1) {
//             //console.log("bbbbbbbbbbbb")

//             SetItem(ButtonID, "0", () => {
//                 OffClickRunFun(addButton);
//                 window.HBuilderXLight.ButtonControl[ButtonID].Isclick = isclick = 0;
//             });
//         } else {
//             //console.log("aaaaaaaaaaa")
//             OffClickRunFun(addButton);
//             window.HBuilderXLight.ButtonControl[ButtonID].Isclick = isclick = 0;
//         };
//     }
//     function _on() {
//         addButton.style.backgroundImage = "url(" + ONButtonSvgURL + ")";
//         addButton.style.filter = "drop-shadow(rgb(0, 0, 0) 0px 0)";
//         window.HBuilderXLight.ButtonControl[ButtonID].OffOn = offon = "1";
//         //console.log(window.HBuilderXLight.ButtonControl[ButtonID].Isclick);
//         if (Memory && window.HBuilderXLight.ButtonControl[ButtonID].Isclick == 1) {
//             SetItem(ButtonID, "1", () => {
//                 OnClickRunFun(addButton);
//                 buttonCharacteristicDispose();
//             });
//         } else {
//             OnClickRunFun(addButton);
//             buttonCharacteristicDispose();
//         }
//     }

//     window.HBuilderXLight.ButtonControl[ButtonID] = {
//         "ControlFun_off": _off,
//         "ControlFun_on": _on,
//         "OffOn": offon,
//         "Isclick": isclick,
//         "ButtonFunctionType": ButtonFunctionType,
//         "ButtonCharacteristicType": ButtonCharacteristicType
//     }
// }

// function setItem(key, value) {
//     window.HBuilderXLight.config[key] = value;
// }

// function getItem(key) {
//     return window.HBuilderXLight.config[key] === undefined ? null : window.HBuilderXLight.config[key];
// }

// function removeItem(key) {
//     delete window.HBuilderXLight.config[key];
// }


// function SetItem(key, value, fun = null) {
//     获取文件("/data/widgets/toy.config.json", (config) => {
//         if (config) {//不存在配置文件就要创建
//             config[key] = value;
//             //console.log(config);
//             写入文件("/data/widgets/toy.config.json", JSON.stringify(config, undefined, 4), fun);
//         } else {
//             写入文件("/data/widgets/toy.config.json", JSON.stringify({ "HBuilderXLight": 1, key: value }, undefined, 4), fun);
//         }
//     });
// }

// function GetItem(key, then = null) {
//     获取文件("/data/widgets/toy.config.json", (config) => {
//         if (config) {//不存在配置文件就要创建
//             // console.log(config[key]);
//             try {

//                 if (then) then(config[key]);
//             } catch (error) {
//                 if (then) then(null);
//             }
//         } else {
//             写入文件("/data/widgets/toy.config.json", JSON.stringify({ "HBuilderXLight": 1 }, undefined, 4), then(null));
//         }
//     });
// }

// function RemoveItem(key, fun = null) {
//     获取文件("/data/widgets/toy.config.json", (config) => {
//         if (config) {//不存在配置文件就要创建
//             delete config[key];
//             //console.log(config);
//             写入文件("/data/widgets/toy.config.json", JSON.stringify(config, undefined, 4), fun);
//         } else {
//             写入文件("/data/widgets/toy.config.json", JSON.stringify({ "HBuilderXLight": 1 }, undefined, 4), fun);
//         }
//     });
// }

// /**
//  * 在DIV光标位置插入内容
//  * @param {*} content 
//  */
// function insertContent(content) {
//     if (content) {
//         var sel = window.getSelection();
//         if (sel.rangeCount > 0) {
//             var range = sel.getRangeAt(0); //获取选择范围
//             range.deleteContents(); //删除选中的内容
//             var el = document.createElement("div"); //创建一个空的div外壳
//             el.innerHTML = content; //设置div内容为我们想要插入的内容。
//             var frag = document.createDocumentFragment(); //创建一个空白的文档片段，便于之后插入dom树
//             var node = el.firstChild;
//             var lastNode = frag.appendChild(node);
//             range.insertNode(frag); //设置选择范围的内容为插入的内容
//             var contentRange = range.cloneRange(); //克隆选区

//             contentRange.setStartAfter(lastNode); //设置光标位置为插入内容的末尾
//             contentRange.collapse(true); //移动光标位置到末尾
//             sel.removeAllRanges(); //移出所有选区
//             sel.addRange(contentRange); //添加修改后的选区

//         }
//     }
// }

// /**
//  * 获取DIV文本光标位置
//  * @param {*} element 
//  * @returns 
//  */
// function getPosition(element) {
//     var caretOffset = 0;
//     var doc = element.ownerDocument || element.document;
//     var win = doc.defaultView || doc.parentWindow;
//     var sel;
//     if (typeof win.getSelection != "undefined") {
//         //谷歌、火狐
//         sel = win.getSelection();
//         if (sel.rangeCount > 0) {
//             var range = sel.getRangeAt(0);
//             var preCaretRange = range.cloneRange(); //克隆一个选区
//             preCaretRange.selectNodeContents(element); //设置选区的节点内容为当前节点
//             preCaretRange.setEnd(range.endContainer, range.endOffset); //重置选中区域的结束位置
//             caretOffset = preCaretRange.toString().length;
//         }
//     } else if ((sel = doc.selection) && sel.type != "Control") {
//         //IE
//         var textRange = sel.createRange();
//         var preCaretTextRange = doc.body.createTextRange();
//         preCaretTextRange.moveToElementText(element);
//         preCaretTextRange.setEndPoint("EndToEnd", textRange);
//         caretOffset = preCaretTextRange.text.length;
//     }
//     return caretOffset;
// };
// /**
//  * 在指定DIV索引位置设置光标
//  * @param {*} element 
//  * @param {*} index 
//  */
// function setCursor(element, index) {
//     var codeEl = element.firstChild;
//     var selection = window.getSelection();
//     // 创建新的光标对象
//     let range = selection.getRangeAt(0);
//     // 光标对象的范围界定为新建的代码节点
//     range.selectNodeContents(codeEl)
//     // 光标位置定位在代码节点的最大长度
//     // console.log(codeEl.length);
//     range.setStart(codeEl, index);
//     // 使光标开始和光标结束重叠
//     range.collapse(true)
//     selection.removeAllRanges()
//     selection.addRange(range)
// }

// /**
//  * 获得文本的占用的宽度
//  * @param {*} text 字符串文班
//  * @param {*} font 文本字体的样式
//  * @returns 
//  */
// function getTextWidth(text, font) {
//     var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
//     var context = canvas.getContext("2d");
//     context.font = font;
//     var metrics = context.measureText(text);
//     return metrics.width;
// }

// /**
//  * 触发元素的事件
//  * @param {触发元素事件} type 
//  * @param {*} element 
//  * @param {*} detail 
//  */
// function trigger(type, element) {
//     var customEvent = new Event(type, { bubbles: false, cancelable: true });
//     element.dispatchEvent(customEvent);
// }

// /**
//  * 向body注入新style覆盖原本的css
//  * @param {css文本字符串} csstxt 
//  */
// function injectionCss(csstxt) {
//     var styleElement = document.createElement('style');

//     styleElement.innerText = t;

//     document.body.appendChild(styleElement);
// };

// /**
//  * 向指定父级创建追加一个子元素，并可选添加ID,
//  * @param {Element} fatherElement 
//  * @param {string} addElementTxt 要创建添加的元素标签
//  * @param {string} setId 
//  * @returns addElementObject
//  */
// function addinsertCreateElement(fatherElement, addElementTxt, setId = null) {
//     if (!fatherElement) console.error("指定元素对象不存在！");
//     if (!addElementTxt) console.error("未指定字符串！");

//     var element = document.createElement(addElementTxt);

//     if (setId) element.id = setId;

//     fatherElement.appendChild(element);

//     return element;
// }


// /**
//  * 向指定元素后创建插入一个元素，可选添加ID
//  * @param {*} targetElement 目标元素
//  * @param {*} addElementTxt 要创建添加的元素标签
//  * @param {*} setId 为创建元素设置ID
//  */
// function insertCreateAfter(targetElement, addElementTxt, setId = null) {

//     if (!targetElement) console.error("指定元素对象不存在！");
//     if (!addElementTxt) console.error("未指定字符串！");

//     var element = document.createElement(addElementTxt);

//     if (setId) element.id = setId;

//     var parent = targetElement.parentNode;//得到父节点
//     if (parent.lastChild === targetElement) {
//         //如果最后一个子节点是当前元素那么直接添加即可
//         parent.appendChild(element);
//         return element;
//     } else {
//         parent.insertBefore(element, targetElement.nextSibling);//否则，当前节点的下一个节点之前添加
//         return element;
//     }
// }


// /**
//  * 向指定元素前创建插入一个元素，可选添加ID
//  * @param {*} targetElement 目标元素
//  * @param {*} addElementTxt 要创建添加的元素标签
//  * @param {*} setId 为创建元素设置ID
//  */
// function insertCreateBefore(targetElement, addElementTxt, setId = null) {

//     if (!targetElement) console.error("指定元素对象不存在！");
//     if (!addElementTxt) console.error("未指定字符串！");

//     var element = document.createElement(addElementTxt);

//     if (setId) element.id = setId;

//     targetElement.parentElement.insertBefore(element, targetElement);

//     return element;
// }

// /**
//  * 为元素注册监听事件
//  * @param {Element} element 
//  * @param {string} strType 
//  * @param {Fun} fun 
//  */
// function AddEvent(element, strType, fun) {
//     //判断浏览器有没有addEventListener方法
//     if (element.addEventListener) {
//         element.addEventListener(strType, fun, false);
//         //判断浏览器有没 有attachEvent IE8的方法	
//     } else if (element.attachEvent) {
//         element.attachEvent("on" + strType, fun);
//         //如果都没有则使用 元素.事件属性这个基本方法
//     } else {
//         element["on" + strType] = fun;
//     }
// }

// /**
//  * 为元素解绑监听事件
//  * @param {Element}  element ---注册事件元素对象
//  * @param {String}   strType ---注册事件名(不加on 如"click")
//  * @param {Function} fun	 ---回调函数
//  * 
//  */
// function RemoveEvent(element, strType, fun) {
//     //判断浏览器有没有addEventListener方法
//     if (element.addEventListener) {
//         // addEventListener方法专用删除方法
//         element.removeEventListener(strType, fun, false);
//         //判断浏览器有没有attachEvent IE8的方法	
//     } else if (element.attachEvent) {
//         // attachEvent方法专用删除事件方法
//         element.detachEvent("on" + strType, fun);
//         //如果都没有则使用 元素.事件属性这个基本方法
//     } else {
//         //删除事件用null
//         element["on" + strType] = null;
//     }
// }

// /**
// * 加载脚本文件
// * @param {string} url 脚本地址
// * @param {string} type 脚本类型
// */
// function loadScript(url, type = 'module') {
//     let script = document.createElement('script');
//     if (type) script.setAttribute('type', type);
//     script.setAttribute('src', url);
//     document.head.appendChild(script);
// }

// /**
//  * 得到思源toolbar
//  * @returns 
//  */
// function getSiYuanToolbar() { return document.getElementById("toolbar"); }

// /**
//  * 得到HBuiderXToolbar
//  * @returns 
//  */
// function getHBuiderXToolbar() { return document.getElementById("HBuiderXToolbar"); }


// /**
//  * 加载样式文件
//  * @param {string} url 样式地址
//  * @param {string} id 样式 ID
//  */
// function loadStyle(url, id, cssName) {

//     var headElement = document.head;

//     let style = document.getElementById(id);
//     if (id != null) {
//         if (style) headElement.removeChild(style);
//     }

//     style = document.createElement('link');
//     if (id != null) style.id = id;


//     style.setAttribute('type', 'text/css');
//     style.setAttribute('rel', 'stylesheet');
//     style.setAttribute('href', url);
//     if (cssName != null) style.setAttribute("class", cssName);
//     headElement.appendChild(style);
//     return style;
// }

// /**
//  * 取出两个数组的不同元素
//  * @param {*} arr1 
//  * @param {*} arr2 
//  * @returns 
//  */
// function getArrDifference(arr1, arr2) {
//     return arr1.concat(arr2).filter(function (v, i, arr) {
//         return arr.indexOf(v) === arr.lastIndexOf(v);
//     });
// }

// /**
//  * 取出两个数组的相同元素
//  * @param {*} arr1 
//  * @param {*} arr2 
//  * @returns 
//  */
// function getArrEqual(arr1, arr2) {
//     let newArr = [];
//     for (let i = 0; i < arr2.length; i++) {
//         for (let j = 0; j < arr1.length; j++) {
//             if (arr1[j] === arr2[i]) {
//                 newArr.push(arr1[j]);
//             }
//         }
//     }
//     return newArr;
// }

// /**
//  * 思源吭叽元素属性解析看是否包含那种行级元素类型
//  * @param {} attributes 
//  * @param {*} attribute 
//  * @returns 
//  */
// function attributesContains(attributes, attribute) {
//     if (attribute == true) return;
//     if (attributes == null) return false;
//     var arr = attributes.split(" ");
//     if (arr.length != 0) {
//         arr.forEach((v) => {
//             if (v == attribute) attribute = true;
//         });
//         return attribute == true ? true : false;
//     } else {
//         return attributes == attribute;
//     }
// }
// /**
//  * 间隔执行指定次数的函数(不立即执行)
//  * @param {*} time 间隔时间s
//  * @param {*} frequency 执行次数
//  * @param {*} Fun 执行函数
//  */
// function IntervalFunTimes(time, frequency, Fun) {

//     for (let i = 0; i < frequency; i++) {
//         sleep(time * i).then(v => {
//             Fun();
//         })
//     }

//     function sleep(time2) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve()
//             }, time2)
//         })
//     }
// }

// /**
//  * 获得当前浏览器缩放系数 默认值为1
//  * @returns 
//  */
// function detectZoom() {
//     var ratio = 0, screen = window.screen, ua = navigator.userAgent.toLowerCase();
//     if (window.devicePixelRatio !== undefined) {
//         ratio = window.devicePixelRatio;
//     } else if (~ua.indexOf('msie')) {
//         if (screen.deviceXDPI && screen.logicalXDPI) {
//             ratio = screen.deviceXDPI / screen.logicalXDPI;
//         }
//     } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
//         ratio = window.outerWidth / window.innerWidth;
//     }
//     if (ratio) {
//         ratio = Math.round(ratio * 100);
//     }
//     return ratio * 0.01;
// };
// /**
//  * 递归DOM元素查找深度子级的一批符合条件的元素返回数组
//  * @param {*} element 要查找DOM元素
//  * @param {*} judgeFun 查找函数 : fun(v) return true or false
//  * @returns array
//  */
// function diguiTooALL(element, judgeFun) {

//     var target = [];

//     if (element == null) return null;
//     if (judgeFun == null) return null;


//     digui(element);
//     return target;

//     function digui(elem) {
//         var child = elem.children;
//         if (child.length == 0) return;

//         for (let index = 0; index < child.length; index++) {
//             const element2 = child[index];
//             if (judgeFun(element2)) {
//                 target.push(element2);
//                 digui(element2);
//             } else {
//                 digui(element2);
//             }
//         }
//     }
// };

// /**
// * 递归DOM元素查找深度子级的第一个符合条件的元素 - 子级的子级深度搜索赶紧后在搜索下一个子级
// * @param {*} element 要查找DOM元素
// * @param {*} judgeFun 查找函数: fun(v) return true or false
// * @returns element
// */
// function diguiTooONE_1(element, judgeFun, xianz = 999) {

//     if (element == null) return null;
//     if (judgeFun == null) return null;
//     var i = xianz <= 0 ? 10 : xianz;

//     return digui(element);

//     function digui(elem) {

//         if (i <= 0) return null;
//         i--;

//         var child = elem.children;
//         if (child.length == 0) return null;

//         for (let index = 0; index < child.length; index++) {
//             const element2 = child[index];
//             if (judgeFun(element2)) {
//                 return element2;
//             } else {
//                 var item = digui(element2);
//                 if (item == null) continue;
//                 return item;
//             }
//         }
//         return null;
//     }
// }

// /**
// * 递归DOM元素查找深度子级的第一个符合条件的元素-同层全部筛选一遍在依次深度搜索。
// * @param {*} element 要查找DOM元素
// * @param {*} judgeFun 查找函数 : fun(v) return true or false
// * @param {*} xianz 限制递归最大次数
// * @returns element
// */
// function diguiTooONE_2(element, judgeFun, xianz = 999) {

//     if (element == null || element.firstElementChild == null) return null;
//     if (judgeFun == null) return null;
//     var i = xianz <= 0 ? 10 : xianz;
//     return digui(element);

//     function digui(elem) {

//         if (i <= 0) return null;
//         i--;

//         var child = elem.children;
//         var newchild = [];
//         for (let index = 0; index < child.length; index++) {
//             const element2 = child[index];
//             if (judgeFun(element2)) {
//                 return element2;
//             } else {
//                 if (newchild.firstElementChild != null) newchild.push(element2);
//             }
//         }

//         for (let index = 0; index < newchild.length; index++) {
//             const element2 = newchild[index];
//             var item = digui(element2);
//             if (item == null) continue;
//             return item;
//         }
//         return null;
//     }
// }
// /**
//  * 不断查找元素父级的父级知道这个父级符合条件函数
//  * @param {*} element 起始元素
//  * @param {*} judgeFun 条件函数
//  * @param {*} upTimes 限制向上查找父级次数
//  * @returns 返回符合条件的父级，或null
//  */
// function isFatherFather(element, judgeFun, upTimes) {
//     var i = 0;
//     for (; ;) {
//         if (!element) return null;
//         if (upTimes < 1 || i >= upTimes) return null;
//         if (judgeFun(element)) return element;
//         element = element.parentElement;
//         i++;
//     }
// }


// /**
//  * 获得焦点所在的块
//  * @return {HTMLElement} 光标所在块
//  * @return {null} 光标不在块内
//  */
// function getFocusedBlock() {
//     let block = window.getSelection()
//         && window.getSelection().focusNode
//         && window.getSelection().focusNode.parentElement; // 当前光标
//     while (block != null && block.dataset.nodeId == null) block = block.parentElement;
//     return block;
// }


// /**
//  * 获得指定块位于的编辑区
//  * @params {HTMLElement} 
//  * @return {HTMLElement} 光标所在块位于的编辑区
//  * @return {null} 光标不在块内
//  */
// function getTargetEditor(block) {
//     while (block != null && !block.classList.contains('protyle-content')) block = block.parentElement;
//     return block;
// }


// /**
//  * 清除选中文本
//  */
// function clearSelections() {
//     if (window.getSelection) {
//         var selection = window.getSelection();
//         selection.removeAllRanges();
//     } else if (document.selection && document.selection.empty) {
//         document.selection.empty();
//     }
// }

/**
 * body全局事件频率优化执行
 * @param {*} eventStr 那种事件如 "mouseover"
 * @param {*} fun(e) 执行函数,e：事件对象
 * @param {*} accurate 精确度：每隔多少毫秒检测一次触发事件执行
 * @param {*} delay 检测到事件触发后延时执行的ms
 * @param {*} frequency 执行后再延时重复执行几次
 * @param {*} frequencydelay 执行后再延时重复执行之间的延时时间ms
 */
function BodyEventRunFun(eventStr, fun, accurate = 100, delay = 0, frequency = 1, frequencydelay = 16) {
    var isMove = true;
    var _e = null;
    AddEvent(document.body, eventStr, (e) => { isMove = true; _e = e })
    setInterval(() => {
        if (!isMove) return;
        isMove = false;
        setTimeout(() => {
            fun(_e);
            if (frequency == 1) return;
            if (frequencydelay < 16) frequencydelay = 16;

            var _frequencydelay = frequencydelay;
            // 由于已经执行了一次，所以延时从1开始
            for (let index = 1; index < frequency; index++) {
                setTimeout(() => { fun(_e); }, frequencydelay);
                frequencydelay += _frequencydelay;
            }

        }, delay);
    }, accurate);
}

// /**
//  * 为元素添加思源悬浮打开指定ID块内容悬浮窗事件
//  * @param {*} element 绑定的元素
//  * @param {*} id 悬浮窗内打开的块的ID
//  */
// function suspensionToOpenSiyuanSuspensionWindow(element, id) {
//     element.setAttribute("data-defids", '[""]');
//     element.classList.add("popover__block");
//     element.setAttribute("data-id", id);
// }

// /**
//  * 为元素添加思源点击打开指定ID块内容悬浮窗事件
//  * @param {*} element 绑定的元素
//  * @param {*} id 悬浮窗内打开的块的ID
//  */
// function clickToOpenSiyuanFloatingWindow(element, id) {
//     element.classList.add("protyle-wysiwyg__embed");
//     element.setAttribute("data-id", id);
// }

// /**
//  * 控制台打印输出
//  * @param {*} obj 
//  */
// function c(...data) {
//     console.log(data);
// }

// /**
//  * 安全While循环
//  * frequency:限制循环次数
//  * 返回值不等于null终止循环
//  */
// function WhileSafety(fun, frequency = 99999) {
//     var i = 0;
//     if (frequency <= 0) {
//         console.log("安全循环次数小于等于0")
//         return;
//     }
//     while (i < frequency) {
//         var _return = fun();
//         if (_return != null || _return != undefined) return _return;
//         i++;
//     }
// }
// /**设置思源块展开 */
// function setBlockfold_0(BlockId) {
//     设置思源块属性(BlockId, { "fold": "0" });
// }
// /**设置思源块折叠 */
// function setBlockfold_1(BlockId) {
//     设置思源块属性(BlockId, { "fold": "1" });
// }

// /**
//     * 得到光标编辑状态下的显示commonMenu菜单;
//     * @returns 
//     */
// function getcommonMenu_Cursor() {
//     if ((window.getSelection ? window.getSelection() : document.selection.createRange().text).toString().length != 0) return null;
//     var commonMenu = document.querySelector("#commonMenu:not(.fn__none)");
//     if (commonMenu == null) return null;
//     if (commonMenu.firstChild == null) return null;
//     if (commonMenu.children.length < 8) {
//         return commonMenu;
//     }
//     return null;
// }

// /**
//     * 得到光标选中编辑状态下的显示commonMenu菜单;
//     * @returns 
//     */
// function getcommonMenu_Cursor2() {
//     if ((window.getSelection ? window.getSelection() : document.selection.createRange().text).toString().length != 0) {
//         return document.querySelector("#commonMenu:not(.fn__none)");
//     };
//     return null;
// }

// /**
//  * 得到快选中状态下的显示commonMenu菜单;
//  * @returns 
//  */
// function getcommonMenu_Bolck() {
//     var commonMenu = document.querySelector("#commonMenu:not(.fn__none)");
//     if (commonMenu.children.length < 8) {
//         return commonMenu;
//     }
//     return null;
// }

// function getNotebookID(docId, then) {
//     queryAPI(`SELECT box, path FROM blocks WHERE id = '${docId}'`, (g) => {
//         let notebook = g[0].box;
//         then(notebook);
//     });
// }

// function getDocPath(docId, then) {
//     queryAPI(`SELECT box, path FROM blocks WHERE id = '${docId}'`, (g) => {
//         let thisDocPath = g[0].path;
//         then(thisDocPath);
//     });
// }

