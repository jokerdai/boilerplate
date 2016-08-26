import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Router, Route}  from 'react-router';
import Menus from './components/menus/Menus';
import Demo from './components/Demo';


/**
 * 第一个参数： 定义的组件
 * 第二个参数： dom
 */
var dashCfg = {
    url: "http://ls.test.jd.com/queryAllMenuJsonp?projectIds=lingzhi&parentId=7462",
    headerCfg: {
        initMenuId: "7468",
        showNotices: false,
        showTasks:false,
        userInfo: {
            "url":"http://ls.jd.com/jsonp/info",
            "userName": "宋全旺",
            "logonTime": "2015-08-01"
        }
    }

};

//var page =;

ReactDOM.render((
    <Menus  {...dashCfg}>


    <Router>
    <Route path="/" component={App}/>
    <Route path="demo" component={Demo}/>
    
    </Router>
    </Menus>

) ,   document.getElementById('app')    );

