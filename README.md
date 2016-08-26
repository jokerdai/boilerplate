# 基于React的UI组件

入门图书 ：  [《React导学》](http://item.jd.com/10355630413.html) [《ES6 标准入门》](http://item.jd.com/10103331283.html)

本项目完全按照这本书[《Learn Webpack and React》](http://survivejs.com/webpack_react/introduction/)里介绍的方法构建，请仔细阅读该书。

 - 安装babun： http://sq.jd.com/lG1vH6
 - 安装nodejs：http://npm.taobao.org/mirrors/node/latest-v5.x/node-v5.0.0-x64.msi
 - git  clone http://source.jd.com/app/ls-ui-boilerplate.git
 
 
    cd ls-ui-boilerplate
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    cnpm install
    npm start
    
 - 配置hosts: 127.0.0.1 sone.dev.jd.com
 - 然后访问：http://sone.dev.jd.com:8080/public/index.html


## UI 组件编写规范

 - 组件对应的css、图片和js代码要放到同一个目录
 

```
    export default class Charts extends React.Component {
        constructor(props) {
            super(props);
            console.debug(props);
        }
    
        render() {
            if (this.props.isLoading) {
                return (
                    <div>
                        <img src="./loading.gif" />
                    </div>
                )
            }else{
    
                return (
                    <Highcharts config = {this.gethighcharts(this.props.mdxResults, 'column')}></Highcharts>
                )
            }
        }
    }
    Charts.defaultProps={isLoading: false};
```

## UI 组件列表

### 菜单
   菜单组件Menus分为两个部分,头部菜单Header 和左侧菜单LeftMenu。这两个组件可以单独使用，但是一般是通过Menus整体使用。

   使用方法如下：
```
   <Menus {...config}>

   ....整体页面中间区域

   <Menus>
```
   Menus本身只包含两个配置项，targetTypeFirst，targetType。为了统一为左侧菜单和头部菜单设置导航方式，具体意义与头部和左侧菜单
   相应配置项含义相同。
   Menus方法的其他配置项分两部分 headerCfg 头部菜单配置项；leftMenuCfg左侧菜单配置项，为了传递左侧菜单和头部菜单配置项。

```
  {
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
  	targetTypeFirst: true,
  	targetType: "href"

  }
```
#### headerCfg配置项如下：

    showSearch : true/false ；默认true；是否显示搜索框
    showNotices:true/false ；默认true；是否显示系统公告
    showTasks：true/false ；默认true；是否显示任务通知
    logoUrl：string类型；默认""；系统logo url
    userInfo：object 结构即 {userName:"张三",logonTime:"2012-04-05"}；用户登录信息，userName logonTime 需要自己设置
    logoutUrl：string类型；默认""；用户退出登录需要访问的url
    navBefore ：string类型；默认""；用于指定添加到头部导航的第一条第一个菜单项dom，自己添加的，不是通过获取后台配置json获取的
    navAfter ：string类型；默认""；头部导航最后一条，自己添加的，不是通过获取后台配置json获取的
    url: string类型；默认类型项目url，"http://ls.jd.com/queryAllMenuJsonp?projectIds=lingzhi&parentId=7462"；头部菜单获取的url，后台jsonp服务
    initMenuId: int/string类型；默认""；页面第一次出现的时候,用户初始化左侧菜单的Id，同时高亮显示该ID头部菜单

    centerDomId:string类型；默认""；中间区域id，当targetType为 norefresh，可以根据此 id刷新中间iframe
    targetType ：string类型；默认""，一共三种类型，分别对应后台菜单配置中菜单三种linkType链接类型。
    norefresh ：对应linkType 0，点击头部导航不刷新页面；自己创建；
    refresh ：对应linkType 1 ，点击头部导航直接连接到新的url；
    newwnd ：对应 linkType 2打开新窗口
    targetTypeFirst ：true/false ；默认false；targetType设置优先，还是菜单中配置linkType设置优先，默认false代表后台设置优先级高

#### leftMenuCfg配置项如下：

    url : 左侧菜单对应的后台url
    centerDomId:string类型；默认""；中间区域id，当targetType为 norefresh时，可以根据此 id刷新中间iframe
    targetType ：string类型；默认""，一共三种类型，分别对应后台菜单配置中菜单三种linkType链接类型。
    norefresh  对应linkType 0，点击头部导航不刷新页面；自己创建；
    refresh 对应linkType 1 ，点击头部导航直接连接到新的url；
    newwnd 对应 linkType 2打开新窗口
    targetTypeFirst ：true/false ；默认false；targetType设置优先，还是菜单中配置linkType设置优先，默认false代表后台设置优先级高

    defaultMenuInfo：菜单主题区默认值，默认不显示

### 地图
1.echarts
创建地图基本模板

     import Emap from "./echarts/Emap.jsx";
     <Emap config = {this.gethighcharts(this.props.mdxResults)}></Emap>

子菜单
 
     var config = this.props.config;


### 日期
1.react-bootstrap-daterangepicker（如文件夹daterangepicker）
日期范围选择组件,
点击控件创建一个下拉菜单,用户可以选择一个范围的日期。
功能包括限制可选择的日期范围,如:昨天,近7天,近14天,自定义等等;
可以定位的字符串和日期格式,
风格默认与bootstrap3主题相匹配的。

初始值汉化需要通过state 设置

     startDate={this.state.startDate}
     endDate={this.state.endDate}
     ranges={this.state.ranges}
     locale={this.state.locale}
     onEvent={this.handleEvent.bind(this)}

### 多选框
####1.react-bootstrap-multiselect（如文件夹multiselect）

创建你的模板，同时也要在相应的的文件引入css文件
```
import 'react-bootstrap-multiselect/css/bootstrap-multiselect.css';
import  React from 'react';
import Multiselect from 'react-bootstrap-multiselect';
class multiselect extends React.Component {
    render: function () {
        return (
            <Multiselect />
        );
    }
});
```
注意在数据同步
以防this.state.myData多选组件的变化之外,单选框和复选框状态不会自动更新。如果你想同步状态,您必须调用.syncData(多选)像下面的例子。

```
import 'react-bootstrap-multiselect/css/bootstrap-multiselect.css';
import  React from 'react';
import Multiselect from 'react-bootstrap-multiselect';
class multiselect extends React.Component {
     constructor(props) {
         super(props);
        var that = this;
        $("element").on("event", function(){
            $.get("new-data-from-url", function(newData){
                that.setState(newData);

                // to sync manually do
                this.refs.myRef.syncData();
            });
        });

        return {
            myData : [{value:'One',selected:true},{value:'Two'}]
        };
    },
    render: function () {
        return (
            <Multiselect onChange={this.handleChange} ref="myRef" data={this.state.myData} multiple />
        );
    }
});
```
####2.ComboMenu
主要的功能有:支持多级数据展示,单选多选,只读和搜索等功能;（如文件夹comboMenu）
从服务器读取：
第一种ajax
```
 <ComboMenuCategory   ref="comcate" url="../app/components/comboMenu/json/indicators.json"  title="品类" onChanged={this.changeCatalogs}/>
 $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                var cal = $(this.refs.cmbMenu.getDOMNode());
                var config=this.props.config;
                cal.comboMenu(config);
                cal.comboMenu("setData", data);
                cal.comboMenu("setValue",data[0].value);

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
```
第二种MDX
```
  <Combolinkage title="品类"   data={this.props.mdxResults}  onChanged={this.changeCatalogs}/>
             var tit = this.props.title;
               var data = this.props.data;
                if(data.length != 0&& data instanceof Array){
                    cal.comboMenu({
                        height: 30,
                        width: 180,
                        popWidth: 120,
                        allLeafCanSelect: false,
                        titleWidth: 40,
                        useSearch: true,
                        useSearch: true,
                        hasAllData: false,
                        title: tit,
                        onHide: function () {
                            var category = cal.comboMenu("getValue");
                            self.onChanged(category);
                        }

                    });
                    cal.comboMenu("setData", data);
```

 cal.comboMenu可以通过自己的需求对comboMenu进行默认设置
```
 	   height : 30,//高度
 		width : 190,//宽度
 		popWidth : null, // 除了第一级的下拉菜单，其它下拉菜单的宽。如果不设，会默认与width值相等
 		showSingleLevel : true, // 是否只显示选择值的单级值。如果是false,则显示其祖先到本级的值
 		allLeafCanSelect : false, // 所有的节点都可以选。默认为false，也就是只有最末级的节点可以选
 		hasAllData : false, // 是否添加所有数据可以选择的条目，如果设置为true，在下拉里的第一级的第一行会有一个“全部数据”的选项
 		joinStr : " > ", // 搜索功能后，父子级之间的连接字符
 		title : "", // 标题
 		titleWidth : 0, // 标题的宽度
 		useSearch : true, // 是否用搜索功能
 		multiple : false, // 是否支持多选，如果支持多选，只能选择最末级的条目。
 		readOnly : false, // 是否为只读状态。
 		addParentAndLevel : true, // 是否需要控件来添加parent和level属性。默认为true。如果数据已经有parent和level属性了，可设置为false。
 		onChanged : null, // onChanged事件，如果是单选，返回false可以取消事件，多选不可以取消事件。只会触发
 		onShow : null,
 		onHide : null,
 		onClick : null,
 		onSelected : null
```


#### 部门

通过MDX查询获取数据（步骤），注意的是需要把获取的数据转换三级分类json;（如文件夹Querylinkage）
```
var processTreeData=function(rawData) {
    var scope = this;
    var resultData = new Array();
    if (rawData == null || rawData.length == 0) {
        //  return resultData;
        return;
    }
    // 设置数型控件值的算法：
    var maxLevel = 3;
    // 初始化边界为空
    var boundary = [];

    for (var pos = 0; pos < maxLevel; pos++) {
        boundary[pos] = {value: null}
    }
    for (var i = 1; i < rawData.length; i++) {
        var row = rawData[i];
        if (row[maxLevel - 1].value == "null") {
            continue;
        }
        var k = 0;
        // 查找插入位置
        for (; k < maxLevel; k++) {
            if (row[k].value != boundary[k].text) {
                break;
            }
        }
        //insert the child
        for (var start = k; start < maxLevel; start++) {
            var s=row[start].properties.uniquename;
            var w=s.substring(s.lastIndexOf('[')+1,s.lastIndexOf(']'));

            var v = parseInt(w);
            var child = {value:v, text: row[start].value, children: []};

            var container = resultData;
            if (start - 1 >= 0) {
                container = boundary[start - 1].children;
            }
            container.push(child);

            boundary[start] = child;
        }


    }
    return resultData;
}
```


获取的json数据通过ComboMenu来展示;
```
 if (DepartStore.isLoading()) {
            return (
                <div>
                    <img src="./loading.gif" style={{width: '60px'}}/>
                </div>
            );
        }
        return (
            <Combolinkage title="部门"   data={this.props.mdxResults}  onChanged={this.changeCatalogs}/>

        )
```

### 查询区 (支持联动)

通过MDX获取数据转换三级分类，方法同上面的部门；根据品类的数据，查下面的品牌，再查下面的SKU，支持三级联动；（如文件夹Querylinkage）





### 引言区
展示信息的功能;（如文件夹introduction）
主要用了react-bootstrap-Panel 组件，分为标题和内容两部分需要从主界面传；
<Introduction   title="UI标准化组件"  content={this.state.dateRange } />
子组件通过<div className="bordered-blue">控制引言模板的样式；

```
<div className="bordered-blue">
      <Panel header={this.props.title}>
           {this.props.content}
       </Panel>
</div>
```

### tab
添加快速、动态标签功能（如文件夹tab)
TabbedArea里的defaultActiveKey属性设置默认打开的标签，与TabPane 里的 eventKey属性相对应；
```
<div className="tab-blue">
    <TabbedArea defaultActiveKey={13}>
                <TabPane eventKey={1} tab='alt' >
                         <TestALT />
                </TabPane>
    </TabbedArea>
</div>
```

TabbedArea 用<div className="tab-blue">包裹起来，设置tabs的样式；

###treeview
以简单和优雅的方式来显示一些继承树结构，如视图树、列表树等等。（如文件夹treeview）









### 图表




### 图图联动和下钻(如文件夹stockExam)
drilldown	向下钻取	向下钻取数据，深入到其中的具体数据

```
  drilldown: function (e) {
                        console.dir(e);
                        var chart = this;
                        if (!e.seriesOptions) {
                            var name = e.point.name;
                            var data = e.point.options;
                            chart.showLoading('正在加载 ...');
                            setTimeout(function () {
                                chart.hideLoading();
                                chart.addSeriesAsDrilldown(e.point, data);
                            }, 1000);
                        }
                    }

```
点击二级品类的销量会深入去查对应的三级品类的销量
在执行drilldown的同时 我们也执行了plotOptions里面的point事件使得能够联动  当前品类的其他数据如：销量额，库存数量等等；

```
  plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {
                                self.handleChartClick(this);
                            }
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                }
            },
```
### 图图表（如文件夹chart2chart)
分为条件搜索区和图表显示区，
在条件搜索区里可以任意放各种查询条件；在显示区可以通过配置得到你想要展示的数据的图表形式
注意:加载时会调用

```
loadingSecondResults() {
        this.isLoading = true;
     }
```

页面会有加载的效果，当数据处理成功返回data

```
receivedSecondResults(data) {
        this.isLoading = false;
        this.mdxResults= data;


    }
```

我们需要把isLoading 改为false，并把页面的默认的mdxResults改为data
案例：chart2chart文件夹
共用的CACaction.js目的是为了C2chart.jsx(视图)与C2ChartColStore.js和C2ChartPieStore.js通信接口
C2chart.jsx里面用AltContainer其中的store属性设置相对应的store方法

```
setTimeout(()=>{
            if(!this.getInstance().isLoading()){
                this.getInstance().performSecondSearch();
  }
})
```

调用SearchC2ChartSource实现后台异步数据处理，返回data

```
receivedSecondResults(data) {
        this.isLoading = false;
        this.mdxResults= data;
}
```

将mdxResults值会传给子组件，子组件需要配图的展现形式，如：饼图，柱图

<Highcharts config = {this.gethighcharts(this.props.mdxResults, 'column')}></Highcharts>

