import React from 'react';
import moment from 'moment';
import XLSX from 'xlsx';

import {
    DatePicker,
    Icon,
    Input,
    Button,
    Table,
    message,
} from 'antd';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            pagination: {
                pageSize : 10,
                current : 1
            },
            xungengList: [],
        };
    }

    //开始时间截止时间
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }
    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pagination.pageSize,
            page: pagination.current,
        });
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let kaishishijian = this.state.startValue;
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = "";
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD HH:mm:ss');
        }
        let jieshushijian = this.state.endValue;
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = "";
        } else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD HH:mm:ss');
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER + "chashaoliebiao?kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&page="+page+"&size="+size+"&sort=shijian,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    if (data.data[i]["shijian"] != null) {
                        data.data[i]["shijian"] = moment(data.data[i]['shijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    list.push(data.data[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    xungengList: list,
                    pagination,
                });
            }
        });
    }

    search() {
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pager.pageSize,
            page: pager.current,
        });
    }

    output()  {
        let kaishishijian = this.state.startValue;
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = "";
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD HH:mm:ss');
        }
        let jieshushijian = this.state.endValue;
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = "";
        } else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD HH:mm:ss');
        }
        $.ajax({
            type:'POST',
            url: SERVER + "chashaoliebiao?kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&page=0&size=10000",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {

                    let obj={};
                    if (data.data[i]['xingming'] == null) {
                        obj['查哨人员'] = '';
                    } else {
                        obj['查哨人员'] = data.data[i]['xingming'];
                    }
                    if (data.data[i]['shijian'] == null) {
                        obj['查哨时间'] = '';
                    } else {
                        obj['查哨时间'] = moment(data.data[i]['shijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data[i]['chashaoshuoming'] == null) {
                        obj['查哨说明'] = '';
                    } else {
                        obj['查哨说明'] = data.data[i]['chashaoshuoming'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前查哨统计列表没有数据！");
                    return;
                }
                let _headers = ['查哨人员', '查哨时间', '查哨说明']

                let headers = _headers
                    .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

                let xmldata = _data
                    .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
                    .reduce((prev, next) => prev.concat(next))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
                // 合并 headers 和 data
                let output = Object.assign({}, headers, xmldata);
                // 获取所有单元格的位置
                let outputPos = Object.keys(output);
                // 计算出范围
                let ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
                // 构建 workbook 对象
                let wb = {
                    SheetNames: ['mySheet'],
                    Sheets: {
                        'mySheet': Object.assign({}, output, { '!ref': ref })
                    }
                };
                // 导出 Excel
                XLSX.writeFile(wb, '查哨统计.xlsx');
            }
        });
    }

    componentDidMount() {
        this.fetch();
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '查哨人员',
            dataIndex: 'xingming',
        }, {
            title: '查哨时间',
            dataIndex: 'shijian',
        }, {
            title: '查哨说明',
            dataIndex: 'chashaoshuoming',
        }];

        const { startValue, endValue } = this.state;

        return (
            <div>
               	开始时间 :
                <DatePicker
                    showTime
                    disabledDate={this.disabledStartDate}
                    value={startValue}
                    placeholder="开始时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={this.onStartChange}
                    style={{width:200,margin:5}}
                />
                结束时间 :
                <DatePicker
                    showTime
                    disabledDate={this.disabledEndDate}
                    value={endValue}
                    placeholder="结束时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={this.onEndChange}
                    style={{width:200,margin:5}}
                />
                <Button type="primary" onClick={this.search.bind(this)} style={{margin:5}}>
                    <Icon type="search" />查询
                </Button>
                <Button type="primary" onClick={this.output.bind(this)} style={{margin:5}}>
                    <Icon type="export" />导出
                </Button>
                <Table
                    columns={columns}
                    dataSource={this.state.xungengList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default App;
