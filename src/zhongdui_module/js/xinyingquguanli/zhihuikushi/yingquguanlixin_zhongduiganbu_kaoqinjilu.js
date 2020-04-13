import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import XLSX from 'xlsx';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, Form, DatePicker, Input, Select,
} from 'antd';
import moment from "moment";
import yingquguanlixin_zhongduiganbu_kaoqinjiluxiangqing
    from "../zhihuikushi/yingquguanlixin_zhongduiganbu_kaoqinjiluxiangqing";

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
        };
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_kaoqinjiluxiangqing/:id'} component = {yingquguanlixin_zhongduiganbu_kaoqinjiluxiangqing} />
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
                pageSize : 10,
                current : 1
            },
            jiluList:[],
            startValue: null,
            endValue: null,
            kaoqinleixingList: [],
        };
    }

    getkaoqinleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "kaoqinleixingMeiju",
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
                    kaoqinleixingList: list,
                });
            }
        });
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
        const THE = this;
        let form = this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let kaoqinjileixing = form.getFieldValue('kaoqinjileixing');
        if (typeof(kaoqinjileixing) == "undefined" || kaoqinjileixing == '-1') {
            kaoqinjileixing = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        $.ajax({
            type:'get',
            url: SERVER + "yingqukaoqinjilu?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&leixing2="+kaoqinjileixing+"&sort=gengxinshijian,desc",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["gengxinshijian"] = moment(data.data.content[i]["gengxinshijian"]).format('YYYY-MM-DD HH:mm:ss');
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    jiluList: data.data.content,
                    pagination,
                });
            }
        });
    }

    output() {
        let _headers = ['机构名称', '人员姓名', '验证类型', '考勤类型', '考勤时间']
        const THE = this;
        let form = this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let kaoqinjileixing = form.getFieldValue('kaoqinjileixing');
        if (typeof(kaoqinjileixing) == "undefined" || kaoqinjileixing == '-1') {
            kaoqinjileixing = "";
        }
        $.ajax({
            type: 'GET',
            url: SERVER + "yingqukaoqinjilu?page=0&size=10000&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&leixing2="+kaoqinjileixing+"&sort=gengxinshijian,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["gengxinshijian"] = moment(data.data.content[i]["gengxinshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    let obj = {};
                    if (data.data.content[i]['jigoumingcheng'] == null) {
                        obj['机构名称'] = '';
                    } else {
                        obj['机构名称'] = data.data.content[i]['jigoumingcheng'];
                    }
                    if (data.data.content[i]['xingming'] == null) {
                        obj['人员姓名'] = '';
                    } else {
                        obj['人员姓名'] = data.data.content[i]['xingming'];
                    }
                    if (data.data.content[i]['leixing'] == null) {
                        obj['验证类型'] = '';
                    } else {
                        obj['验证类型'] = data.data.content[i]['leixing'];
                    }
                    if (data.data.content[i]['leixing2'] == null) {
                        obj['考勤类型'] = '';
                    } else {
                        obj['考勤类型'] = data.data.content[i]['leixing2'];
                    }
                    if (data.data.content[i]['gengxinshijian'] == null) {
                        obj['考勤时间'] = '';
                    } else {
                        obj['考勤时间'] = data.data.content[i]['gengxinshijian'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("考勤记录没有数据！");
                    return;
                }
                let headers = _headers
                    .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65 + i) + 1}))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
                let xmldata = _data
                    .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
                    .reduce((prev, next) => prev.concat(next))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
                console.log(xmldata);
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
                        'mySheet': Object.assign({}, output, {'!ref': ref})
                    }
                };
                // 导出 Excel
                XLSX.writeFile(wb, '考勤记录.xlsx');
            }
        });
    }

    componentDidMount() {
        this.fetch();
        this.getkaoqinleixingList();
    }

    render() {
        let kaoqinleixingListOptions = this.state.kaoqinleixingList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );


        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col'
        }, {
            title: '机构名称',
            dataIndex: 'jigoumingcheng',
        }, {
            title: '人员姓名',
            dataIndex: 'xingming',
        }, {
            title: '验证类型',
            dataIndex: 'leixing',
        }, {
            title: '考勤类型',
            dataIndex: 'leixing2',
        }, {
            title: '考勤时间',
            dataIndex: 'gengxinshijian',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                    return (
                        <span>
                            <Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_kaoqinjiluxiangqing/'+ record['id'] }>详情</Link>
                       </span>
                    )
                }
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue} = this.state;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="开始时间">
                        {getFieldDecorator('kaishishijian')(
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                value={startValue}
                                placeholder="开始时间"
                                format="YYYY-MM-DD"
                                onChange={this.onStartChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="结束时间">
                        {getFieldDecorator('jieshushijian')(
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                value={endValue}
                                placeholder="结束时间"
                                format="YYYY-MM-DD"
                                onChange={this.onEndChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="考勤机类型">
                        {getFieldDecorator('kaoqinjileixing',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {kaoqinleixingListOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.output.bind(this)}>
                            <Icon type="export"/>导出
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.jiluList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;