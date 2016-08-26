
import 'bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DropDownMenu from './DropDownMenu.jsx';
import SearchBox from './SearchBox.jsx';

/**
 * 头部控件主要配置项目如下：
 * showSearch : true/false ；默认true；是否显示搜索框
 * showNotices:true/false ；默认true；是否显示系统公告
 * showTasks：true/false ；默认true；是否显示任务通知
 * logoUrl：string类型；默认""；系统logo url
 * userInfo：object 结构即 {userName:"张三",logonTime:"2012-04-05"}；用户登录信息，userName logonTime 需要自己设置
 * logoutUrl：string类型；默认""；用户退出登录需要访问的url
 * navBefore ：string类型；默认""；用于指定添加到头部导航的第一条第一个菜单项dom，自己添加的，不是通过获取后台配置json获取的
 * navAfter ：string类型；默认""；头部导航最后一条，自己添加的，不是通过获取后台配置json获取的
 * url: string类型；默认类型项目url，"http://ls.jd.com/queryAllMenuJsonp?projectIds=lingzhi&parentId=7462"；头部菜单获取的url，后台jsonp服务
 * initMenuId: int/string类型；默认""；页面第一次出现的时候,用户初始化左侧菜单的Id，同时高亮显示该ID头部菜单
 *
 * centerDomId:string类型；默认""；中间区域id，当targetType为 norefresh，可以根据此 id刷新中间iframe
 * targetType ：string类型；默认""，一共三种类型，分别对应后台菜单配置中菜单三种linkType链接类型。
 * norefresh  对应linkType 0，点击头部导航不刷新页面；自己创建；
 * refresh 对应linkType 1 ，点击头部导航直接连接到新的url；
 * newwnd 对应 linkType 2打开新窗口
 * targetTypeFirst ：true/false ；默认false；targetType设置优先，还是菜单中配置linkType设置优先，默认false代表后台设置优先级高
 *
 * 回调事件如下：
 * logoutCallBack:function 类型，用户点击注销后需要执行的函数
 * @author songquanwang
 */
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            userName: this.props.userInfo.userName
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
                jsonpCallback: "soneHeaderCallBack",
                success: function (data) {
                    console.log("获取头部菜单信息：", data);
                    this.setState({data: data});

                }.bind(this),
                error: function (data, textStatus, errorThrown) {
                    console.error("Header获取菜单jsonp数据出错！");
                    console.error(textStatus);
                    console.error(errorThrown);
                }.bind(this)
            });

        }
            if(this.props.userInfo.url){
                $.ajax({
                url: this.props.userInfo.url,
                cache: true,
                type: "GET",
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    console.debug("获取人员信息：", data);
                    this.setState({userName: data.userName});

                }.bind(this),
                error: function (data, textStatus, errorThrown) {
                    console.error("Header获取人员信息数据出错！");
                    console.error(textStatus);
                    console.error(errorThrown);
                }.bind(this)
            });

            }

    }

   /* componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    }*/

    componentDidUpdate() {
        this.layout();
        window.onresize = this.layout;

    }


    render() {
        var data = this.props.data || this.state.data;

        var logoStyle = {};
        var logoText = this.props.logoText;

        var userName = this.props.userInfo.userName;

        var searchEle = this.props.showSearch ? <SearchBox searchItemClick={this.props.searchItemClick} data={data}  /> : null;

        var noticeEle = this.props.showNotices ?
            <DropDownMenu type="notice" title="营销体系通知：" url="http://ls.jd.com/notices/queryNoticelistJsonp?page=1&pageSize=5" menuStyle="messages-menu" iconStyle="glyphicon-envelope" /> : null;

        var taskEle = this.props.showTasks ?
            <DropDownMenu type="task" title="您的任务：" url="http://ls.jd.com/myWork/listUnReadJsonp?page=1&pageSize=5" menuStyle="projects-menu" iconStyle="glyphicon-list" />
            : null;

        var result = {firstLevels: [], secondLevels: []};

        this.createHeaderMenuRecursion(result, data, 1);

        var headerSecondMenu = result.secondLevels.length > 0 ?
            <div className="cont" style="display:none;">
                <ul>
                 {result.secondLevels}
                </ul>
            </div> : "";
        var userInfo = this.createUserInfo();

        var navBefore = this.props.navBefore;
        var navAfter = this.props.navAfter;

        function show() {
            $(".fore3").show();
        }

        function hide() {
            $(".fore3").hide();
        }

        return (
            <div id="header">
                <div className="header-main">
                    <div className="logo" style={ logoStyle }>{logoText}</div>
                    <div  className="nav headerNav" id="navlist">
                        <ul id="navfouce">
                           {navBefore}
                           {result.firstLevels}
                           {navAfter}
                        </ul>
                    </div>
                    <div className="nav-option">
                        <a href="javascript:;" className="prev">&lt;</a>
                        <a href="javascript:;" className="next">&gt;</a>
                    </div>
                    <div className="navbar-right">
                         {searchEle}
                        <ul className=" navbar-nav">
                             {noticeEle}
                             {taskEle}
                            <li className="dropdown user-menu" onMouseOver={show}  onMouseLeave={ hide}>
                                <a className="dropdown-toggle"   href="#">
                                    <i className="glyphicon glyphicon-user" ></i>
                                &nbsp;
                                    <i style={{"fontStyle": "normal"}} >{this.state.userName}</i>
                                    <i className="caret"></i>
                                </a>
                                <ul className="fore3 " role="menu">
                                 {userInfo}
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className="box" id="navbox" style={{height: "0px", opacity: 0, overflow: "hidden"}}>
                    {headerSecondMenu}
                    </div>
                </div>
            </div>


        )
    }

    /**
     * 递归构造多级头部菜单 暂时只支持两层
     */
    createHeaderMenuRecursion(resultElm, data, level) {
        var scope = this;
        if (data == null || data.length == 0) {
            return;
        }
        if (level > 2) {
            return;
        }
        var itemList = data.map(function (item, index) {
            //后台有bug 暂时先补一下
            var li = null;
            var hasChildren = item.children != null && item.children.length > 0;
            li = scope.createHeaderMenuItem(item, level, hasChildren);
            if (level == 1 || item.position == "top") {
                //暂时不是递归 直接传递dom
                if (hasChildren) {
                    scope.createHeaderMenuRecursion(resultElm, item.children, level + 1);
                }
                return li;
            }

        }).filter(function (item) {

            return item != undefined;

        });
        if (level == 1) {
            resultElm.firstLevels = resultElm.firstLevels.concat(itemList);
        } else if (level == 2) {
            resultElm.secondLevels = resultElm.secondLevels.concat(itemList);
        }
        return;

    }

    /**
     * 创建头部导航菜单项
     */
    createHeaderMenuItem(item, level, hasChildren) {
        var menuId = (item.menuId || item.resourceName || '') == '' ? '' : item.menuId;
        //mock
        item.linkType = 0;
        var onClick = this.onMenuClick.bind(this, {
            level: item.level,
            sonMenuNum: item.sonMenuNum,
            menuId: item.id,
            url: item.url,
            linkType: item.linkType

        });
        var curr = item.id == this.props.initMenuId ? "curr" : null;
        var headerMenuItem =
            <li id={ menuId } className={curr}>
                <a href={ item.url }   > { item.name }</a>
            </li>;
        return headerMenuItem;
    }


    /*
     * 创建用户信息
     */
    createUserInfo() {
        //用户信息
        var userInfo = this.props.userInfo;
        userInfo.userName = userInfo.userName || '';
        userInfo.logonTime = userInfo.logonTime || '';
        userInfo.userImg = userInfo.userImg || this.props.userImg;
        var logoutUrl = this.props.logoutUrl;
        var userInfoEle =
            [
                <li  className="text-center user-header ">
                    <div style={{background: "(url(" + userInfo.userImg + "))"}}></div>

                    <h4 className="text-center">
                        {this.state.userName}
                    </h4>
                    <p className="text-center">
                    </p>
                </li>,
                <li className="user-footer">
                    <div className="pull-right">
                        <a ref="logoutBtn" className="btn btn-default btn-flat" href="javascript:;;" onClick={this.logoutFun.bind(this)} >注销</a>
                    </div>
                </li>
            ];
        return userInfoEle;

    }

    layout() {
        var w = $(document.body).width();
        //实际导航数量
        var n = $(".headerNav").find("li").length;
        //屏幕可以容纳导航个数
        var num = parseInt((w - 656) / 110);
        var step = 0;
        var isClick = false;
        if (n <= num) {
            //num = n;
            $(".nav-option").hide();
        } else if (n > num) {
            $(".nav-option").show();
        }
        $(".nav-option .next").css("left", (250 + 110 * num) + "px");
        $(".nav-option .next").css("left", (240 + 110 * num) + "px");
        $(".headerNav").css("width", 110 * num + "px");
        $(".headerNav ul").css("width", 110 * n + "px");

        $(".nav-option .next").click(function () {
            if (step < (n - num) && !isClick) {
                step++;
                isClick = true;
                $(".nav ul").animate({
                    "left": -step * 110 + "px"
                }, 1000);
                setTimeout(function () {
                    isClick = false;
                }, 1000);
            }
        });
        $(".nav-option .prev").click(function () {
            if (step != 0 && !isClick) {
                step--;
                isClick = true;
                $(".nav ul").animate({
                    "left": -step * 110 + "px"
                }, 1000);
                setTimeout(function () {
                    isClick = false;
                }, 1000);
            }
        });

    }

    logoutFun() {
        this.props.logoutCallBack && this.props.logoutCallBack();
        window.location.href = this.props.logoutUrl;

    }

    /**
     *为导航添加点击事件
     */
    onMenuClick(para, e) {
        var o = e.currentTarget;
        if ($(o).parent().hasClass("curr")) {
            return false;
        }
        //点击一级菜单 隐藏left menu 修改iframe
        var li = $(o).closest("li");
        var parentLis = li.parent().children("li");
        parentLis.removeClass("curr");
        li.addClass("curr");
        var index = li.parent().children("li").index(li);
        para.index = index;
        this.menuClick(para);

        return false;

    }

    /**
     *点击菜单后，统一处理点击事件,根据配置类型，确定 刷新、不刷新、打开新窗口
     */
    menuClick(para) {
        var link = para.url;
        if (link == undefined || link == "") {
            return true;
        }
        link = this.processPath(link);
        //先判断menu 链接类型
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
            //如果点击一级导航，但是一级导航下面有二级导航，则不反应
            if (parseInt(para.level) == 1 && parseInt(para.sonMenuNum) > 0) {
                return false;
            }
            this.props.onHeaderMenuClick && this.props.onHeaderMenuClick(para.menuId);

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


}

Header.defaultProps = {
    showSearch: true,
    showNotices: true,
    showTasks: true,
    centerDomId: 'ifm',
    userInfo: {},
    userImg: './img/avatar3.png',
    logoClass: null,
    //logoText:'零智平台',http://ls.jd.com/logout
    logoutUrl: 'javascript:;;',
    navBefore: null,
    navAfter: null,
    targetType: 'nofresh',
    currHeaderMenu: 0,
    targetTypeFirst: false,
    initMenuId: -100

}


export default Header;

