import React from 'react';
import moment from 'moment';
import {Modal } from 'react-bootstrap';
/**
 * 头部导航菜单--系统公告、任务下拉菜单，点击带详情弹出框
 */
class DropDownMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {rows: []},
            detailData:{},
            showModal: false
        };
    }

    /*getDefaultProps() {
         return {
         menuStyle: 'messages-menu',
         iconStyle: 'glyphicon-envelope',
         title: '',
         url: 'http://ls.jd.com/salesNotice/queryUnReadByGroupJsonp?page=1&pageSize=5'
         };
    }*/

    componentDidMount() {
        $.ajax({
            url: this.props.url,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function (data) {
                console.log("获取信息：");
                console.log(data);
                this.setState({data: data});
            }.bind(this),

            error: function (data, textStatus, errorThrown) {
                console.error("获取jsonp数据出错！");
                console.error(textStatus);
                console.error(errorThrown);
            }.bind(this)
        });

    }

    openModal(url) {
        console.debug("open modal url ===", url);
        $.ajax({
            url: url,
            type: "GET",
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function (data) {
                console.log("获取通知内容出错",data);
                this.setState({
                    showModal: true,
                    detailData: data
                });
            }.bind(this),
            error: function (data, textStatus, errorThrown) {
                console.error("获取通知内容出错", data);
            }.bind(this)
        });

    }

    closeModal() {
        this.setState({showModal: false});
    }

    render() {
        var scope = this;
        var url = "";
        var modelHtml = "";
        if (this.props.type == "notice") {
            url = "http://ls.jd.com/notices/detailJsonp";
            modelHtml = this.createNoticeDetail(this.state.detailData);
        } else {
            url = "http://ls.jd.com/myWork/viewJsonp";
            modelHtml = this.createTaskDetail(this.state.detailData);
        }
        var list = this.state.data.rows.map(function (n, i) {
            var u = url + "?id=" + n.id;
            if (scope.props.type == "task") {
                u = url + "?taskId=" + n.id;
            }
            var handClick = scope.openModal.bind(scope,u);
            return (
                <li key={scope.props.type+i} onClick={handClick}>
                    <a href="javascript:;;" className="line">
                        <div className="u-name">{i + 1}</div>
                        <div className="u-info">{n.title}</div>
                        <div className="u-time">{moment(new Date(n.updateTime ? n.updateTime : n.createDate)).format('YYYY-MM-DD')}</div>
                    </a>
                </li>

            );
        });

        return (
            <li className={"dropdown  " + this.props.menuStyle}>
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i className={"glyphicon " + this.props.iconStyle}></i>
                    <span className="label  label-success">{this.state.data.total}</span>
                </a>
                <ul className="dropdown-menu fore1" role="menu">
                    <li className="header">
                        <span>{this.props.title}</span>
                    </li>
                    {list}
                    <li  className="footer">
                        <a href="#">更多...</a>
                    </li>
                </ul>
                     {modelHtml}
            </li>

        );

    }


    createNoticeDetail(detailData) {
        var notictHtml = "";
        var dateStr = "";
        if (!this.state.showModal) {
            return "";
        }
        var notice = detailData.notice;
        if (notice.updateTime) {
            dateStr = moment(notice.updateTime).format('YYYY-MM-DD hh:00');
        } else {
            dateStr = moment(notice.createTime).format('YYYY-MM-DD hh:00');
        }

        notictHtml = <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.closeModal.bind(this)} >&times;</button>
                <h4 className="modal-title">通知标题:{notice.title }</h4>
            </div>

            <div className="modal-body">
                <div style={{margin: "2px 10px",borderBottomStyle:"dashed",borderBottomWidth:"2px",borderBottomColor:"#F0F0F0"}}>由 { notice.creator }发表于
         {dateStr}
                &emsp;通知编号：{notice.num }
                &emsp;查看：{ detailData.viewAccount }
                </div>
                <div style={{margin: "3px 10px"}}>
                    <p>{notice.content }</p>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closeModal.bind(this)}>关闭</button>
            </div>
        </Modal>;

        return notictHtml;
    }

    createTaskDetail(detailData) {
        var diaHtml = "";
        if (!this.state.showModal) {
            return "";
        }
        var scope = this;
        var taskTraceList = detailData.taskTraceList || [];

        var taskList = taskTraceList.map(function (item, index) {
            return <tr>
                <td>{item.actionCode}</td>
                <td>{item.description}</td>
                <td>{moment(new Date(item.createDate)).format('YYYY-MM-DD hh:00:ss')}</td>
            </tr>;
        });

        diaHtml = <Modal  show={this.state.showModal} onHide={this.closeModal.bind(this)}>
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.closeModal.bind(this)} >&times;</button>
                <h4 className="modal-title" id="myWork_workTitleLabel">查看任务</h4>
            </div>
            <div className="modal-body">
                <form id="myWorkForm" role="form" noValidate>
                    <fieldset>
                        <div className="hidden">
                            <input type="text" defaultValue={detailData.assignment.id} />
                            <input type="text" defaultValue={detailData.task.id} />
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>任务标题
                                        <input type="text" className="form-control" defaultValue={detailData.task.title} readOnly />
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>任务发布人
                                        <input type="text" className="form-control" defaultValue={detailData.task.ownerName + "(" + detailData.task.owner + ")"} readOnly />
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>任务转派人
                                        <input type="text" className="form-control" defaultValue={detailData.assignment.secondOwner} readOnly />
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>任务完成状态
                                        <input type="text" className="form-control" defaultValue={detailData.assignment.status} readOnly />
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label htmlFor="myWork_taskDescTextArea">任务描述
                                        <textarea className="form-control" rows="6" defaultValue={detailData.task.description}  readOnly></textarea>
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>期望完成时间
                                        <input type="text"  className="form-control" defaultValue={moment(new Date(detailData.task.dueDate)).format('YYYY-MM-DD hh:00')} readOnly />
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>任务接收人
                                        <input  name="mywork_taskOwner" readOnly/>
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>操作备注
                                        <input type="text"  className="form-control" maxLength="50" />
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <table className="table table-hover table-bordered" >
                                        <thead className="header">
                                            <tr>
                                                <th style={{width: "30%"}}>动作</th>
                                                <th style={{width: "50%"}}>备注</th>
                                                <th style={{width: "20%"}}>操作时间</th>
                                            </tr>
                                        </thead>
                                        <tbody>
         {taskList}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closeModal.bind(this)}>关闭</button>
            </div>
        </Modal>;
        return diaHtml;

    }


}
DropDownMenu.defaultProps = {
    menuStyle: 'messages-menu',
    iconStyle: 'glyphicon-envelope',
    title: '',
    url: 'http://ls.jd.com/salesNotice/queryUnReadByGroupJsonp?page=1&pageSize=5',
    type:"notice"
};
export default DropDownMenu;
