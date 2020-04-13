import React from 'react';

import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import XLSX from 'xlsx';
import 'antd/dist/antd.css';
import {
    Select,
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Input,
    Form,
    Button,
    Table,
    Divider,
    Popconfirm,
    message,

} from 'antd';
import renyuanguanli_zhiduiganbu_renyuanmimaxiugai from "./renyuanguanli_zhiduiganbu_renyuanmimaxiugai.js";

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                    <Route path = {this.props.match.path +'/renyuanguanli_zhiduiganbu_renyuanmimaxiugai/:id'} component = {renyuanguanli_zhiduiganbu_renyuanmimaxiugai} />
                </Switch>
            </div>
        );
    }
}

class App extends React.Component{
    constructor(){
        super();
        this.state={
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                current : 1
            },
            renyuanList: [],
        }
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
        let form = this.props.form;
        let xm = form.getFieldValue('xm');
        if (typeof(xm) == "undefined") {
            xm = '';
        }
        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "diaoboRenyuanLiebiao?xingming="+xm+"&page="+page+"&size="+size,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    renyuanList: list,
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
        let form = this.props.form;
        let xm = form.getFieldValue('xm');
        if (typeof(xm) == "undefined") {
            xm = '';
        }
        let _headers = ['人员姓名', '所属组织机构', '所属部门', '性别', '入伍时间', '联系电话']
        $.ajax({
            type:'get',
            url: SERVER + "diaoboRenyuanLiebiao?page=0&size=10000&xingming="+xm,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    let obj={};
                    if (data.data.content[i]['xingming'] == null) {
                        obj['人员姓名'] = '';
                    } else {
                        obj['人员姓名'] = data.data.content[i]['xingming'];
                    }
                    if (data.data.content[i]['jigoumingcheng'] == null) {
                        obj['所属组织机构'] = '';
                    } else {
                        obj['所属组织机构'] = data.data.content[i]['jigoumingcheng'];
                    }
                    if (data.data.content[i]['suosubumen'] == null) {
                        obj['所属部门'] = '';
                    } else {
                        obj['所属部门'] = data.data.content[i]['suosubumen'];
                    }
                    if (data.data.content[i]['xingbiedaima'] == null) {
                        obj['性别'] = '';
                    } else {
                        obj['性别'] = data.data.content[i]['xingbiedaima'];
                    }
                    if (data.data.content[i]['ruzhishijian'] == null) {
                        obj['入伍时间'] = '';
                    } else {
                        obj['入伍时间'] = data.data.content[i]['ruzhishijian'];
                    }
                    if (data.data.content[i]['yidongdianhua'] == null) {
                        obj['联系电话'] = '';
                    } else {
                        obj['联系电话'] = data.data.content[i]['yidongdianhua'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前人员密码修改列表没有数据！");
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
                XLSX.writeFile(wb, '人员密码修改.xlsx');
            }
        });

    }

    componentDidMount() {
        this.fetch();
    }

    render(){
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
            width:'10%'
        }, {
            title: '登陆名',
            dataIndex: 'dengluming',
            width:'10%'
        }, {
            title: '姓名',
            dataIndex: 'xingming',
            width:'14%'
        }, {
            title: '所属组织机构',
            dataIndex: 'jigoumingcheng',
            width:'14%'
        }, {
            title: '所属部门',
            dataIndex: 'suosubumen',
            width:'10%'
        }, {
            title: '性别',
            dataIndex: 'xingbiedaima',
            width:'14%'
        }, {
            title: '入伍时间',
            dataIndex: 'ruzhishijian',
            width:'12%'
        }, {
            title: '联系电话',
            dataIndex: 'yidongdianhua',
        }, {
            title: '操作',
            render: (text, record, index) => (
                <span>
			      	<Link to={this.props.match.url+'/renyuanguanli_zhiduiganbu_renyuanmimaxiugai/'+record['id'] }>修改密码</Link>
			    </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline"  style={{margin:5}}>
                    <FormItem label="姓名">
                        {getFieldDecorator('xm')(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                </Form>
                <Table columns={columns}
                       dataSource={this.state.renyuanList}
                       pagination={this.state.pagination}
                       onChange={this.handleTableChange}/>
                       scroll={{ y: "calc(100vh - 370px)", x: true }}
            </div>
        )
    }
}

const AppComp = Form.create()(App);
export default Appmain;