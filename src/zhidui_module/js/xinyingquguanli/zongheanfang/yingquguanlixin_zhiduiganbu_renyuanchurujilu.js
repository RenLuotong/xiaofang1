import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Select,
} from 'antd';
import moment from "moment";
import XLSX from 'xlsx';

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                </Switch>
            </div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                current : 1
            },
            jiluList: [],
            jinchuzhuangtaiList:[],
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let jinchuleixing = form.getFieldValue('jinchuleixing');
        if (typeof(jinchuleixing) == "undefined"||jinchuleixing == "-1") {
            jinchuleixing = '';
        }
        let renyuanxingming = form.getFieldValue('renyuanxingming');
        if (typeof(renyuanxingming) == "undefined") {
            renyuanxingming = '';
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "yingqurenyuanchuruliebiao?churubiaoshi="+jinchuleixing+"&xingming="+renyuanxingming+"&page="+page+"&size="+size+"&sort=gengxinshijian,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["gengxinshijian"] = moment(data.data.content[i]["gengxinshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    jiluList: list,
                    pagination,
                });
            }
        });
    }
    //导出
    output() {
        let _headers = ['机构名称','营区名称','姓名','进出类型','时间'];
        let form = this.props.form;
        let jinchuleixing = form.getFieldValue('jinchuleixing');
        if (typeof(jinchuleixing) == "undefined"||jinchuleixing == "-1") {
            jinchuleixing = '';
        }
        let renyuanxingming = form.getFieldValue('renyuanxingming');
        if (typeof(renyuanxingming) == "undefined") {
            renyuanxingming = '';
        }
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "yingqurenyuanchuruliebiao?page=0&size=10000&churubiaoshi="+jinchuleixing+"&xingming="+renyuanxingming,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["gengxinshijian"] = moment(data.data.content[i]["gengxinshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    let obj={};
                    if (data.data.content[i]['jigoumingcheng'] == null) {
                        obj['机构名称'] = '';
                    } else {
                        obj['机构名称'] = data.data.content[i]['jigoumingcheng'];
                    }
                    if (data.data.content[i]['yingqumingcheng'] == null) {
                        obj['营区名称'] = '';
                    } else {
                        obj['营区名称'] = data.data.content[i]['yingqumingcheng'];
                    }
                    if (data.data.content[i]['xingming'] == null) {
                        obj['姓名'] = '';
                    } else {
                        obj['姓名'] = data.data.content[i]['xingming'];
                    }
                    if (data.data.content[i]['gengxinshijian'] == null) {
                        obj['时间'] = '';
                    } else {
                        obj['时间'] = data.data.content[i]['gengxinshijian'];
                    }
                    if (data.data.content[i]['churubiaoshi'] == null) {
                        obj['进出类型'] = '';
                    } else {
                        obj['进出类型'] = data.data.content[i]['churubiaoshi'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前人员出入记录没有数据！");
                    return;
                }

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
                XLSX.writeFile(wb, '人员出入记录.xlsx');
            }
        });
    }

    //获取进出状态
    getjinchuzhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "huoqurenchefenliuchurubiaoshiEnumMeiju",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    list.push(data.data[i]);
                }
                THE.setState({
                    jinchuzhuangtaiList: list,
                });
            }
        });
    }
    componentDidMount() {
        this.fetch();
        this.getjinchuzhuangtaiList();
    }

    render() {
        let jinchuzhuangtaiOptions = this.state.jinchuzhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );


        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
            width:'33%'
        }, {
            title: '姓名',
            dataIndex: 'xingming',
            width:'33%'
        },{
            title: '进出类型',
            dataIndex: 'churubiaoshi',
        },{
            title: '时间',
            dataIndex: 'gengxinshijian',
        },];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="人员姓名">
                        {getFieldDecorator('renyuanxingming',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="进出类型">
                        {getFieldDecorator('jinchuleixing')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {jinchuzhuangtaiOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search"/>查询
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.output.bind(this)}>
                            <Icon type="export"/>导出
                        </Button>
                    </FormItem>
                </Form>
                <br/>
                <Table
                    columns={columns}
                    dataSource={this.state.jiluList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 370px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;