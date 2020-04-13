import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import yingquguanlixin_banzhang_yichangtuogangjiluxiugai from './yingquguanlixin_banzhang_yichangtuogangjiluxiugai';
import XLSX from 'xlsx';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Select,
} from 'antd';
import moment from "moment";
const View = [];

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
                    <Route path = {this.props.match.path +'/yingquguanlixin_banzhang_yichangtuogangjiluxiugai/:id'} component = {yingquguanlixin_banzhang_yichangtuogangjiluxiugai} />
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
        let shejirenyuan = form.getFieldValue('shejirenyuan');
        if (typeof(shejirenyuan) == "undefined") {
            shejirenyuan = "";
        }
        let shifoushensu = form.getFieldValue('shifoushensu');
        if (typeof(shifoushensu) == "undefined" || shifoushensu == '-1') {
            shifoushensu = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhibantuogang/huoqutuogangjilu?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&shejirenyuan="+shejirenyuan+"&shifoushensu="+shifoushensu,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["gaojingshijian"] = moment(data.data.content[i]["gaojingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.content[i]["shifoushensu"] == false){
                        data.data.content[i]["shifoushensu"] = '否'
                    }else if(data.data.content[i]["shifoushensu"] == true){
                        data.data.content[i]["shifoushensu"] = '是'
                    }
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

    output() {
        let _headers = ['机构名称','营区名称','值班编号','异常时间','涉及人员','异常描述','是否申诉']
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
        let shejirenyuan = form.getFieldValue('shejirenyuan');
        if (typeof(shejirenyuan) == "undefined") {
            shejirenyuan = "";
        }
        let shifoushensu = form.getFieldValue('shifoushensu');
        if (typeof(shifoushensu) == "undefined" || shifoushensu == '-1') {
            shifoushensu = "";
        }
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhibantuogang/huoqutuogangjilu?page=0&size=10000&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&shejirenyuan="+shejirenyuan+"&shifoushensu="+shifoushensu,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["gaojingshijian"] = moment(data.data.content[i]["gaojingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.content[i]["shifoushensu"] == false){
                        data.data.content[i]["shifoushensu"] = '否'
                    }else if(data.data.content[i]["shifoushensu"] == true){
                        data.data.content[i]["shifoushensu"] = '是'
                    }
                    let obj={};
                    if (data.data.content[i]['jigoumingcheng'] == null) {
                        obj['机构名称'] = '';
                    } else {
                        obj['机构名称'] = data.data.content[i]['jigoumingcheng'];
                    }
                    if (data.data.content[i]['yingqvmingcheng'] == null) {
                        obj['营区名称'] = '';
                    } else {
                        obj['营区名称'] = data.data.content[i]['yingqvmingcheng'];
                    }
                    if (data.data.content[i]['gaojingshijian'] == null) {
                        obj['异常时间'] = '';
                    } else {
                        obj['异常时间'] = data.data.content[i]['gaojingshijian'];
                    }
                    if (data.data.content[i]['extraTuogangrenXingming'] == null) {
                        obj['涉及人员'] = '';
                    } else {
                        obj['涉及人员'] = data.data.content[i]['extraTuogangrenXingming'];
                    }
                    if (data.data.content[i]['tuogangmiaoshu'] == null) {
                        obj['异常描述'] = '';
                    } else {
                        obj['异常描述'] = data.data.content[i]['tuogangmiaoshu'];
                    }
                    if (data.data.content[i]['shifoushensu'] == null) {
                        obj['是否申诉'] = '';
                    } else {
                        obj['是否申诉'] = data.data.content[i]['shifoushensu'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前异常脱岗记录没有数据！");
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
                XLSX.writeFile(wb, '异常脱岗记录.xlsx');
            }
        });
    }

    componentWillUnmount() {
        View.pagination = this.state.pagination;
    }

    componentWillMount() {
        const {pagination} = View;
        if (typeof (pagination) !== "undefined") {
            this.setState({
                pagination: pagination,
            });
        }

    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col'
        }, {
            title: '异常时间',
            dataIndex: 'gaojingshijian',
        }, {
            title: '涉及人员',
            dataIndex: 'extraTuogangrenXingming',
        }, {
            title: '异常描述',
            dataIndex: 'tuogangmiaoshu',
        }, {
            title: '是否申诉',
            dataIndex: 'shifoushensu',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <Link to={this.props.match.url+'/yingquguanlixin_banzhang_yichangtuogangjiluxiugai/'+record['id'] }>修改</Link>
			    </span>
            ),
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
                    <br/>
                    <FormItem label="涉及人员">
                        {getFieldDecorator('shejirenyuan',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="是否申诉">
                        {getFieldDecorator('shifoushensu',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                <Select.Option value="true">是</Select.Option>
                                <Select.Option value="false">否</Select.Option>
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