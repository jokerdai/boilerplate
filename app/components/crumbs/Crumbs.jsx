
//修改为ES6的方式
import React from "react";

class Crumbs extends React.Component{
    render (){
        return (
            <div className="row">
                <div className="col-md-12">
                    <h6 className="">您当前的位置：{this.props.title}</h6>
                </div>
            </div>);
    }
}
export default Crumbs;
