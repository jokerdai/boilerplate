import React from 'react';
import ReacDOM from 'react-dom';
import 'free-jqgrid/js/i18n/grid.locale-cn.js';
import 'free-jqgrid/css/ui.jqgrid.css';
import jqGrid from 'free-jqgrid/js/jquery.jqgrid.src.js';

export default class MyTable extends React.Component{

    constructor(props){
        super (props);
    }

    componentDidMount() {
        this.initJQueryPlugin();
    }

    initJQueryPlugin(){
        $(this.refs.eventsgrid).jqGrid(this.props.options);
    }
    componentWillUpdate(){
        $(this.refs.eventsgrid).GridUnload();
    }

    componentDidUpdate(prevProps, prevState) {
        this.initJQueryPlugin();
    }

    componentWillUnmount(){
        $(this.refs.eventsgrid).GridUnload();
    }

    render () {
        return (
            <div><table ref="eventsgrid" /><div id="eventsgridpager"></div></div>
        );
    }
}
