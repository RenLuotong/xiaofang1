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
import yingquguanlixin_zhongduiganbu_renyuanbaimingdanxinzeng from './yingquguanlixin_zhongduiganbu_renyuanbaimingdanxinzeng';
import yingquguanlixin_zhongduiganbu_renyuanbaimingdanxiangqing from './yingquguanlixin_zhongduiganbu_renyuanbaimingdanxiangqing';


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
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_renyuanbaimingdanxinzeng/'} component = {yingquguanlixin_zhongduiganbu_renyuanbaimingdanxinzeng} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_renyuanbaimingdanxiangqing/:renyuanbianhao'} component = {yingquguanlixin_zhongduiganbu_renyuanbaimingdanxiangqing} />

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
            mingdanList: [],
            bumenList:[],
        };
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
        let ssbm = form.getFieldValue('ssbm');
        if (typeof(ssbm) == "undefined"||ssbm == "-1") {
            ssbm = '';
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
            url: SERVER + "renyuanLiebiao?suosubumen="+ssbm+"&xingming="+renyuanxingming+"&page="+page+"&size="+size,
            success: function (data) {
                let excelList = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    mingdanList: data.data.content,
                    pagination,
                });
            }
        });
    }
    //导出
    output() {
        let _headers = ['机构名称','营区名称','人员姓名','所属部门','机构名称'];
        let form = this.props.form;
        let ssbm = form.getFieldValue('ssbm');
        if (typeof(ssbm) == "undefined"||ssbm == "-1") {
            ssbm = '';
        }
        let renyuanxingming = form.getFieldValue('renyuanxingming');
        if (typeof(renyuanxingming) == "undefined") {
            renyuanxingming = '';
        }
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "renyuanLiebiao?page=0&size=10000&suosubumen="+ssbm+"&xingming="+renyuanxingming,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
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
                        obj['人员姓名'] = '';
                    } else {
                        obj['人员姓名'] = data.data.content[i]['xingming'];
                    }
                    if (data.data.content[i]['suosubumen'] == null) {
                        obj['所属部门'] = '';
                    } else {
                        obj['所属部门'] = data.data.content[i]['suosubumen'];
                    }
                    if (data.data.content[i]['jigoumingcheng'] == null) {
                        obj['机构名称'] = '';
                    } else {
                        obj['机构名称'] = data.data.content[i]['jigoumingcheng'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前人员白名单没有数据！");
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
                XLSX.writeFile(wb, '人员白名单.xlsx');
            }
        });
    }

    getBumenList() {
        const THE = this;
        let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
        $.ajax({
            type:'GET',
            url: SERVER + "bumenXialaLiebiao?jigoumingcheng="+jigoumingcheng,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    bumenList: list,
                });
            }
        });
    }

    componentDidMount() {
        this.getBumenList();
        this.fetch();
    }

    render() {
        const bumenOptions = this.state.bumenList.map(item => <Select.Option key={item['key']} value={item['bumenmingcheng']}>{item['bumenmingcheng']}</Select.Option>);

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col'
        },{
            title: '人员姓名',
            dataIndex: 'xingming',
        }, {
            title: '所属部门',
            dataIndex: 'suosubumen',
        },{
            title: '机构名称',
            dataIndex: 'jigoumingcheng',
        },{
            title: '操作',
            render: (text, record) => (
                <span>
			      	<Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_renyuanbaimingdanxiangqing/'+record['renyuanbianhao'] }>详情</Link>
			    </span>
            ),
        }];


        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="所属部门">
                        {getFieldDecorator('ssbm')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {bumenOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="人员姓名">
                        {getFieldDecorator('renyuanxingming',)(
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
                    <br/>
                    <FormItem>
                        <Button>
                            <Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_renyuanbaimingdanxinzeng'}>
                                <Icon type="plus" /><span>增加人员白名单</span>
                            </Link>
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.mingdanList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;