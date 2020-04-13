import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form,Input,
} from 'antd';
import moment from "moment";
import XLSX from 'xlsx';

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
            startValue: null,
            endValue: null,
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
        let extraQuexirenXingming = form.getFieldValue('extraQuexirenXingming');
        if (typeof(extraQuexirenXingming) == "undefined" ) {
            extraQuexirenXingming = "";
        }
        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhibanquexi/houqujigouquexijilu?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&quexirenxingming="+extraQuexirenXingming,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["extraJihuakaishishijian"] = moment(data.data.content[i]["extraJihuakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["extraJihuajieshushijian"] = moment(data.data.content[i]["extraJihuajieshushijian"]).format('YYYY-MM-DD HH:mm:ss');
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
        let _headers = ['机构名称','营区名称','值班编号','缺岗人姓名','计划值班开始时间','计划值班结束时间','缺岗理由']
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
        let extraQuexirenXingming = form.getFieldValue('extraQuexirenXingming');
        if (typeof(extraQuexirenXingming) == "undefined" ) {
            extraQuexirenXingming = "";
        }
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhibanquexi/houqujigouquexijilu?page=0&size=10000&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&quexirenxingming="+extraQuexirenXingming,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["extraJihuakaishishijian"] = moment(data.data.content[i]["extraJihuakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["extraJihuajieshushijian"] = moment(data.data.content[i]["extraJihuajieshushijian"]).format('YYYY-MM-DD HH:mm:ss');
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
                    if (data.data.content[i]['zhibanbianhao'] == null) {
                        obj['值班编号'] = '';
                    } else {
                        obj['值班编号'] = data.data.content[i]['zhibanbianhao'];
                    }
                    if (data.data.content[i]['extraQuexirenXingming'] == null) {
                        obj['缺岗人姓名'] = '';
                    } else {
                        obj['缺岗人姓名'] = data.data.content[i]['extraQuexirenXingming'];
                    }
                    if (data.data.content[i]['extraJihuakaishishijian'] == null) {
                        obj['计划值班开始时间'] = '';
                    } else {
                        obj['计划值班开始时间'] = data.data.content[i]['extraJihuakaishishijian'];
                    }
                    if (data.data.content[i]['extraJihuajieshushijian'] == null) {
                        obj['计划值班结束时间'] = '';
                    } else {
                        obj['计划值班结束时间'] = data.data.content[i]['extraJihuajieshushijian'];
                    }
                    if (data.data.content[i]['quexiliyou'] == null) {
                        obj['缺岗理由'] = '';
                    } else {
                        obj['缺岗理由'] = data.data.content[i]['quexiliyou'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前缺岗记录没有数据！");
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
                XLSX.writeFile(wb, '缺岗记录.xlsx');
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
            colSpan: 0,
            className: 'hidden_col',
            width:'20%'
        },{
            title: '缺岗人姓名',
            dataIndex: 'extraQuexirenXingming',
            width:'20%'
        },{
            title: '计划值班开始时间',
            dataIndex: 'extraJihuakaishishijian',
            width:'20%'
        },{
            title: '计划值班结束时间',
            dataIndex: 'extraJihuajieshushijian',
        },{
            title: '缺岗理由',
            dataIndex: 'quexiliyou',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue} = this.state;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
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
                    <FormItem label="缺岗人姓名">
                        {getFieldDecorator('extraQuexirenXingming',)(
                            <Input style={{width:200}}/>
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