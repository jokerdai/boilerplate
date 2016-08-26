import React from 'react';
import ReacDOM from 'react-dom';
import 'free-jqgrid/js/i18n/grid.locale-cn.js';
import 'free-jqgrid/css/ui.jqgrid.css';
import jqGrid from 'free-jqgrid/js/jquery.jqgrid.src.js';

export default class JQGrid extends React.Component{

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
JQGrid.defaultProps={
    options:{
            datatype: "local",
            data: [
            { id: "1", invdate: "2007-10-01", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00" },
            { id: "2", invdate: "2007-10-02", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00" },
            { id: "3", invdate: "2007-09-01", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00" },
            { id: "4", invdate: "2007-10-04", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00" },
            { id: "5", invdate: "2007-10-05", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00" },
            { id: "6", invdate: "2007-09-06", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00" },
            { id: "7", invdate: "2007-10-04", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00" },
            { id: "8", invdate: "2007-10-03", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00" },
            { id: "9", invdate: "2007-09-01", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00" }
        ],
            height: 250,
            width: 780,
            colModel: [
                { label: 'Inv No', name: 'id', width: 75, key:true },
                { label: 'Date', name: 'invdate', width: 90 },
                { label: 'Client', name: 'name', width: 100 },
                { label: 'Amount', name: 'amount', width: 80 },
                { label: 'Tax', name: 'tax', width: 80 },
                { label: 'Total', name: 'total', width: 80 },
                { label: 'Notes', name: 'note', width: 150 }
            ],
            viewrecords: true, // show the current page, data rang and total records on the toolbar
            caption: "Load jqGrid through Javascript Array",
        }

    };
