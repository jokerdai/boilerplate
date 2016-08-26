import React from 'react';
import Header from  '../header/Header.jsx';
import LeftMenus  from '../leftmenus/LeftMenus.jsx';
import Crumbs from '../crumbs/Crumbs';
/**
 * 左侧菜单和头部菜单和中间部分div，是dashboard外层部分
 */
class Menus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuData: [],
            headerData: []
        };

    }

    componentDidMount() {

        this.jsonpRequest(this.props.url, "soneHeaderCallBack", function (data) {
            console.log("获取头部菜单信息：", data);
            this.setState({headerData: data});
            this.onHeaderMenuClick(this.props.headerCfg.initMenuId);

        }.bind(this), function (data, textStatus, errorThrown) {
            console.error("获取菜单jsonp数据出错！");
            console.error(textStatus);
            console.error(errorThrown);
        }.bind(this));


    }

    render() {
        var headerCfg = {
            searchItemClick: LeftMenus.triggerUrl,
            data: this.state.headerData,
            onHeaderMenuClick: this.onHeaderMenuClick.bind(this),
            targetTypeFirst: this.props.targetTypeFirst,
            targetType: this.props.targetType

        };
        var leftMenuCfg = {
            data: this.state.menuData,
            targetTypeFirst: this.props.targetTypeFirst,
            targetType: this.props.targetType
        };

        return (

            <div>
                <Header {...this.props.headerCfg}{...headerCfg} />
                <LeftMenus {...this.props.leftMenuCfg} {...leftMenuCfg}/>

                <div id="page-wrapper" className="p20" style={{"marginLeft": "202px"}}>
                    <Crumbs title={this.state.title} />
                    <div>
                        {this.props.children}
                    </div>
                </div>

            </div>
        )
            ;
    }

    jsonpRequest(url, jsonpCallback, successCallBack, errorCallBack) {
        $.ajax({
            url: url,
            cache: true,
            type: "GET",
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: jsonpCallback,
            success: successCallBack,
            error: errorCallBack
        });

    }

    processMenuData(data, menuId) {
        var menuData = {};
        for (var i = 0; i < data.length; i++) {
            var child = data[i];
            if (child.id == menuId) {
                menuData = child;
                break;
            }
        }

        return menuData;

    }

    onHeaderMenuClick(menuId) {
        var menuData = this.processMenuData(this.state.headerData, menuId);
        this.setState({menuData: menuData.children, title: menuData.name});
        if (!menuData.children || menuData.children.length == 0) {
            $("#page-wrapper").css("marginLeft", 0);
        } else {
            $("#page-wrapper").css("marginLeft", 202);
        }

    }

}
Menus.defaultProps = {
    url : "http://ls.test.jd.com/queryAllMenuJsonp?projectIds=lingzhi&parentId=7462",
    headerCfg: {
        initMenuId: "7468",
        userInfo: {
            "userName": "宋全旺",
            "logonTime": "2015-08-01"
        }
    },
    leftMenuCfg: {
        themeData: {
            "市场": {
                "QuotaName": "PV",
                "Measure": "10634046",
                "Radio": "3%",
                "Diff": "327848"
            },
            "商品": {
                "QuotaName": "销量",
                "Measure": "803547",
                "Radio": "8.16%",
                "Diff": "60636"
            },
            "促销": {
                "QuotaName": "促销",
                "Measure": "0.00",
                "Radio": "0.%",
                "Diff": "0.00"
            },
            "采购": {
                "QuotaName": "订单数量",
                "Measure": "",
                "Radio": "",
                "Diff": ""
            },
            "供应商": {
                "QuotaName": "供应商评估",
                "Measure": "",
                "Radio": "",
                "Diff": ""
            },
            "库存": {
                "QuotaName": "库存健康",
                "Measure": "",
                "Radio": "",
                "Diff": ""
            },
            "京东帮": {
                "QuotaName": "京东帮",
                "Measure": "",
                "Radio": "",
                "Diff": ""
            }
        }
    },
    targetTypeFirst: false,
    targetType: "norefresh"

}


export default Menus;
