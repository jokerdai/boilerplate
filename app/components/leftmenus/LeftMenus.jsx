import React from 'react';
import './css/leftmenus.css';
import 'bootstrap';
import 'font-awesome-webpack';
/**
 * 左侧菜单插件，配置信息如下：
 * url : 左侧菜单对应的后台url
 * centerDomId:string类型；默认""；中间区域id，当targetType为 norefresh时，可以根据此 id刷新中间iframe
 * targetType ：string类型；默认""，一共三种类型，分别对应后台菜单配置中菜单三种linkType链接类型。
 * norefresh  对应linkType 0，点击头部导航不刷新页面；自己创建；
 * refresh 对应linkType 1 ，点击头部导航直接连接到新的url；
 * newwnd 对应 linkType 2打开新窗口
 * targetTypeFirst ：true/false ；默认false；targetType设置优先，还是菜单中配置linkType设置优先，默认false代表后台设置优先级高
 *
 * defaultMenuInfo：菜单主题区默认值，默认不显示
 * themeData object类型；默认为null；用于配置菜单主题区，类型结构如下：
 {
    "市场" : {
        "QuotaName" : "PV",
        "Measure" : "0",
        "Radio" : "0%",
        "Diff" : "0"
    },
    "商品" : {
        "QuotaName" : "销量",
        "Measure" : "0",
        "Radio" : "0.%",
        "Diff" : "0"
    },
    "促销" : {
        "QuotaName" : "促销",
        "Measure" : "0",
        "Radio" : "0.%",
        "Diff" : "0"
    }
}

 */
class LeftMenus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {

        if (this.props.data == null && !!this.props.url) {
            $.ajax({
                url: this.props.url,
                cache: true,
                type: "GET",
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'soneLeftMenuCallBack',
                success: function (data) {
                    console.log("获取左侧菜单信息：", data);
                    this.setState({data: data});

                }.bind(this),
                error: function (data, textStatus, errorThrown) {
                    console.error("获取菜单jsonp数据出错！");
                    console.error(textStatus);
                    console.error(errorThrown);
                }.bind(this)
            });

        }

    }

    render() {
        var data = this.props.data || this.state.data;
        var menu = this.createMenuRecursion(data, 1, "");

        return (
            <div ref="left-menu" className="wrap left-menu">
                {menu}
            </div>

        )
    }

    /**
     * 递归构造多级菜单
     */
    createMenuRecursion(data, level, path) {
        var scope = this;
        if (data == null || data.length == 0) {
            return "";
        }
        var levCls = this.getItemLevelClass(level);
        var menuCls = level == 1 ? "left-side" : "itm-lv2";
        var menuListCls = level == 1 ? "sone-left-menu" : "sone-menu-list";

        var resize = level == 1 ? <div className="resizer" onClick={this.onNarrowBroad}>
            <b></b>
        </div> : "";

        var itemList = data.map(function (item, index) {
            var li = null;
            var childLi = null;
            var menuId = (item.menuId || '') == '' ? '' : '"' + item.menuId + '"';
            //找到父text
            var hasChildren = item.children != null && item.children.length > 0;
            if (item.type == "high" || item.type == "") {
                li = scope.createHighMenuItem(path, item, level, hasChildren);
            } else {
                li = scope.createLowMenuItem(path, item, level, hasChildren);
            }
            if (hasChildren) {
                childLi = scope.createMenuRecursion(item.children, level + 1, path);
            }
            var menu =
                <li key={index} id={ menuId }  className={"sidebar-menu item " + levCls } onMouseEnter={scope.onNarrowHover} onMouseOut={scope.onNarrowHoverLeft} >
                   {li}
                   {childLi}
                </li>;

            return menu;
        });

        var menudiv = <div className={menuCls}>
            <ul className={menuListCls}>
             {itemList}
             {resize}
            </ul>
        </div>;
        return menudiv;

    }

    /**
     * 创建高菜单项
     */
    createHighMenuItem(parentId, item, level, hasChildren) {
        //获取默认主题区内容
        var menuInfo = this.getMenuInfo(item);
        var radioDiffFlag = '';
        var spanColor = 'white';
        if (parseInt(menuInfo["Radio"]) > 0) {
            radioDiffFlag = '↑';
            spanColor = 'red';
        } else if (parseInt(menuInfo["Radio"]) == 0) {
            radioDiffFlag = '';
            spanColor = 'white';
        } else if (parseInt(menuInfo["Radio"]) < 0) {
            radioDiffFlag = '↓';
            spanColor = 'green';
        }
        var themeId = parentId == "" ? item.name : parentId + "-" + item.name;
        var onClick = this.onMenuClick.bind(this, {
            linkType: item.linkType,
            url: item.url
        });


        var highMenuItemHtml = (

            <div className="item-div itm-lv1"  onClick={onClick} >
                <div className="tit">
                    <span className={ item.iconClass + " text-center" }></span>
                    <span className="text-center"> { item.name } </span>
                </div>
                <div className="con">
                    <div id={ themeId + "_QuotaName" } className="theme-one" dangerouslySetInnerHTML={{__html: menuInfo["QuotaName"]}}></div>
                    <div id={ themeId + "_Measure" }   className="theme-two">{  menuInfo["Measure"]} </div>
                    <div className="theme-three">
                        <span id={ themeId + "_Flag"  } style={{
                            "fontFamily": "'华文琥珀 Bold', '华文琥珀'",
                            width: "10px",
                            color: spanColor
                        }} dangerouslySetInnerHTML={{__html: radioDiffFlag}}/>
                        <span id={ themeId + "_Radio" } style={{
                            "fontSize": "10px",
                            "marginLeft": "0px",
                            color: spanColor
                        }}  dangerouslySetInnerHTML={{__html: menuInfo["Radio"]}}/>
                        <span id={ themeId + "_Diff" } style={{
                            "fontSize": "10px",
                            "marginLeft": "8px",
                            color: spanColor
                        }} dangerouslySetInnerHTML={{__html: menuInfo["Diff"]}}/>
                    </div>
                </div>
            </div>

        )

        return highMenuItemHtml;
    }

    /**
     * 创建低菜单项
     */
    createLowMenuItem(parentId, item, level, hasChildren) {
        var menuInfo = this.getMenuInfo(item);
        var expandFlag = '';
        if (hasChildren) {
            expandFlag = <i className="menu-expand fa fa-angle-right"></i>;
        }
        var name = item.name || "";
        //var cutName = this.cutStr(name, 16);
        var onClick = this.onMenuClick.bind(this, {
            linkType: item.linkType,
            url: item.url
        });
        var lowMenuItemHtml =
            (
                <div className="item-div itm-lv1" onClick={onClick} >
                    <span className={ item.iconClass } style={ {margin: '0 5px 0 25px'}}></span>
                    <span className="narrow-name" title={ item.name } >{ name }</span>
                    {expandFlag}
                </div>

            );

        return lowMenuItemHtml;
    }

    /**
     * 取出主题区内容，默认值保证主题区不显示
     */
    getMenuInfo(item) {
        var menuInfo = null;
        var itemTheme = this.props.themeData && this.props.themeData[item.name];
        menuInfo = itemTheme || this.props.defaultMenuInfo;
        if (item.infoUrl != "") {
            try {
                menuInfo = eval(item.infoUrl);
            } catch (e) {

            }
        }
        return menuInfo;
    }

    /**
     * 展开、折叠事件
     */
    onNarrowBroad() {
        $(".wrap").toggleClass("narrow-wrap");
        $("#page-wrapper").toggleClass("narrow-content");
        $(".item").find(".itm-lv2").removeAttr("style");
    }

    /**
     * 菜单变窄 hover事件，去掉了，暂时无用
     * @param e
     */
    onNarrowHover(e) {
        if ($(".wrap").hasClass("narrow-wrap")) {
            if ($(e.currentTarget).hasClass("item-open")) {
                this.isOpen = true;
            } else {
                this.isOpen = false;
            }
            $(e.currentTarget).addClass("item-open").find(".itm-lv2").show();
        }
    }

    /**
     * 菜单变窄 hover 离开事件，去掉了，暂时无用
     * @param e
     */
    onNarrowHoverLeft(e) {

        if ($(".wrap").hasClass("narrow-wrap")) {
            if (!this.isOpen) {
                $(e.currentTarget).removeClass("item-open");
            }
            $(e.currentTarget).find(".itm-lv2").hide();
        }
    }

    /**
     * 点击事件代理 ，高亮、菜单展开、折起、触发链接
     * @returns {wrapper}
     */
    onMenuClick(para, e) {
        var o = $(e.currentTarget);
        if (!$(".wrap").hasClass("narrow-wrap")) {
            if (o.parent().hasClass("item-open")) {
                o.parent().removeClass("item-open");
            } else {
                o.parent().parent().children(".item-open").removeClass("item-open");
                o.parent().addClass("item-open");
            }
        }
        //curr
        o.closest("ul").children("li").removeClass("curr");
        o.closest("li").addClass("curr");
        this.menuClick(para);

        e.preventDefault();

    }


    /**
     *点击菜单后，统一处理点击事件,根据配置类型，确定 刷新、不刷新、打开新窗口
     */
    menuClick(para) {
        var link = para.url;
        if (link == undefined || link == "") {
            return true;
        }
        //处理url
        link = this.processPath(link);
        var map = {
            norefresh: 0,
            refresh: 1,
            newwnd: 2
        };
        var resultType = 0;
        if (this.props.targetTypeFirst) {
            resultType = map[this.props.targetType] || 0;
        } else {
            resultType = para.linkType || 0;
        }
        if (resultType == 0) {
            var center = $("#" + para.centerDomId);
            if (center.length == 0) {
                center = $("iframe");
            }
            center.attr('src', link);
        } else if (resultType == 1) {
            window.location.href = link;
        } else {
            window.open(link);
        }
    }

    /**
     * 相对路径变成绝对略经
     * @param url
     * @returns {*}
     */
    processPath(url) {

        var domain = window.location.protocol + "//" + window.location.host;
        //如果绝对路径直接用，否则添加域名
        if (url.indexOf("http") == -1) {
            if (url.indexOf("/") == 0) {
                url = domain + url;
            } else {
                url = domain + "/" + url;
            }
        }
        return url;

    }

    /**
     * 根据级别获取相应 css class 暂时最多支持8级菜单样式
     * @param level
     * @returns {string}
     */
    getItemLevelClass(level) {
        var levelCls = ['item-one', 'item-two', 'item-three', 'item-four', 'item-five', 'item-six', 'item-seven', 'item-eight', 'item-nine'];
        return levelCls[level - 1];
    }

    /**
     * link to the url
     * @param href
     */
    static triggerUrl(href) {
        $(".itm-lv2 a[href='" + href + "']").trigger("click");
        $(".itm-lv1[url='" + href + "']").trigger("click");
        if ($(".itm-lv2 a[href='" + href + "']").length == 0 && $(".itm-lv1[url='" + href + "']").length == 0) {
            window.location.href = href;
        }
    }

}
LeftMenus.defaultProps = {
    url: '',
    //以后要给成从url获取
    defaultMenuInfo: {"QuotaName": "<br>", "Measure": "", "Radio": "", "Diff": ""},
    targetType: 'nofresh',
    centerDomId: 'ifm',
    targetTypeFirst: false

}
export default LeftMenus;
