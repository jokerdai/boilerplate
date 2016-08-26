import 'bootstrap/dist/css/bootstrap.css';
import './less/menus.less';
import React from 'react';
import 'bootstrap';

import { Typeahead } from "react-typeahead";
/**
 * 头部搜索框，用于显示菜单结构，支持模糊查询、点击链接
 */
class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
        this.pathStruct = {map: {}, names: []};
    }

    /* getDefaultProps() {
     return {
     title: '搜索菜单：',
     url: 'http://ls.jd.com/queryLeftMenuJsonp?projectIds=lingzhi&parentId=7462'
     };
     }*/

    componentDidMount() {
        if (this.props.data == null && !! this.props.url) {
            $.ajax({
                url: this.props.url,
                type: 'GET',
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    console.log("获取搜索框信息：" + this.props.title);
                    this.setState({data:data});
                }.bind(this),

                error: function (data, textStatus, errorThrown) {
                    console.error("获取搜索框信息出错！");
                    console.error(textStatus);
                    console.error(errorThrown);
                }.bind(this)
            });
        }
    }

    genMap(path, menu, mapStructure) {
        var scope = this;
        if (menu == null || menu.length == 0) {
            return;
        }
        for (var i = 0; i < menu.length; i++) {
            var m = menu[i];
            var p = path != "" ? path + '-' + m.name : m.name;
            if (!!m.url && !!m.name) {
                mapStructure.map[p] = m.url;
                mapStructure.names.push(p)
            }
            if (m.children != null && m.children.length != 0) {
                scope.genMap(p, m.children, mapStructure);
            }

        }

    }

    optionSelected(value) {
        if (value == '') {
            return false;
        }
        var href = this.pathStruct.map[value];
        if (href == null) {
            return false;
        }
        this.props.searchItemClick(href);
        return false;
    }


    render() {

        var data=this.props.data ||this.state.data;
        //加工路径
        this.genMap('', data, this.pathStruct);

        var searchCfg = {
            options: this.pathStruct.names,
            placeholder: this.props.title,
            className: "topcoat-list",
            customClasses: {
                input: "topcoat-text-input",
                results: "topcoat-list__container",
                listItem: "topcoat-list__item"
            },

            maxVisible: 8,
            onOptionSelected: this.optionSelected.bind(this)

        };
        return (
            <div className="navbar-form navbar-left search-bar form-group">

                <Typeahead  {...searchCfg} />
                <button id="serachButton" className="btn btn-default" type="submit" data-original-title="Search">
                    <span className="glyphicon glyphicon-search"></span>
                </button>
            </div>

        );
    }
}
SearchBox.defaultProps = {

    title: '搜索菜单：',
    url: 'http://ls.jd.com/queryLeftMenuJsonp?projectIds=lingzhi&parentId=7462'

};
export default SearchBox;
