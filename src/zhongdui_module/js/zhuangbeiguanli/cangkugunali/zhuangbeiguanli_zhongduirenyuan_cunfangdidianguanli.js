import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import zhuangbeiguanli_zhongduirenyuan_cunfangdidianxiugai from './zhuangbeiguanli_zhongduirenyuan_cunfangdidianxiugai';
import zhuangbeiguanli_zhongduirenyuan_cunfangdidiantianjia from './zhuangbeiguanli_zhongduirenyuan_cunfangdidiantianjia';
import XLSX from 'xlsx';
import {
    message,
    Popconfirm,
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Input,
    Form,
    Button,
    Table,
    Divider
} from 'antd';

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
                    <Route exact path = {this.props.match.path} component = {App} />
                    <Route path = {this.props.match.path +'/zhuangbeiguanli_zhongduirenyuan_cunfangdidianxiugai/:id'} component = {zhuangbeiguanli_zhongduirenyuan_cunfangdidianxiugai} />
                    <Route path = {this.props.match.path +'/zhuangbeiguanli_zhongduirenyuan_cunfangdidiantianjia'} component = {zhuangbeiguanli_zhongduirenyuan_cunfangdidiantianjia} />
                </Switch>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            cunfangdidianList: [],
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "cunfangdidianLiebiao?page="+page+"&size="+size+"&sort=id,desc",
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
                    cunfangdidianList: list,
                    pagination,
                });
            }
        });
    }

    output()  {
        let tbZhuangbeibaojing = {};
        let _headers = ['存放地点名称', '所属仓库', '地址','存放地点类型','车牌号']
        $.ajax({
            type:'get',
            url: SERVER + "cunfangdidianLiebiao?page=0&size=10000",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    let obj={};
                    if (data.data.content[i]['cunfangdidianmingcheng'] == null) {
                        obj['存放地点名称'] = '';
                    } else {
                        obj['存放地点名称'] = data.data.content[i]['cunfangdidianmingcheng'];
                    }
                    if (data.data.content[i]['cangkumingcheng'] == null) {
                        obj['所属仓库'] = '';
                    } else {
                        obj['所属仓库'] = data.data.content[i]['cangkumingcheng'];
                    }
                    if (data.data.content[i]['dizhi'] == null) {
                        obj['地址'] = '';
                    } else {
                        obj['地址'] = data.data.content[i]['dizhi'];
                    }
                    if (data.data.content[i]['leixing'] == null) {
                        obj['存放地点类型'] = '';
                    } else {
                        obj['存放地点类型'] = data.data.content[i]['leixing'];
                    }
                    if (data.data.content[i]['chepaihaoma'] == null) {
                        obj['车牌号'] = '';
                    } else {
                        obj['车牌号'] = data.data.content[i]['chepaihaoma'];
                    }

                    list.push(obj);
                }
                console.log(data);
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前存放地点列表没有数据！");
                    return;
                }
                let headers = _headers
                    .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
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
                        'mySheet': Object.assign({}, output, { '!ref': ref })
                    }
                };

                // 导出 Excel
                XLSX.writeFile(wb, '存放地点管理.xlsx');
            }
        });

    }

    componentDidMount() {
        this.fetch();
    }

    toDelete(id) {
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER + "shanchuCunfangdidian?id="+id,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.fetch();
            }
        });
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '存放地点名称',
            dataIndex: 'cunfangdidianmingcheng',
        }, {
            title: '所属仓库',
            dataIndex: 'cangkumingcheng',
        }, {
            title: '地址',
            dataIndex: 'dizhi',
        }, {
            title: '存放地点类型',
            dataIndex: 'leixing',
        }, {
            title: '车牌号',
            dataIndex: 'chepaihaoma',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <span>
		    	<Link to={this.props.match.url+'/zhuangbeiguanli_zhongduirenyuan_cunfangdidianxiugai/'+record['id'] }>修改</Link>
		      	<Divider type="vertical" />
		      	<Popconfirm placement="topLeft" title="确认要删除该仓库?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
		        	<a>删除</a>
		    	</Popconfirm>
		    </span>
            ),
        }];

        return (
            <div>
                <Button type="primary" onClick={this.output.bind(this)} style={{margin: 5}}>
                    <Icon type="export" />导出
                </Button>
                <Button style={{margin:5}}>
                    <Link to={this.props.match.url+'/zhuangbeiguanli_zhongduirenyuan_cunfangdidiantianjia' }><Icon type="plus" /><span>添加存放地点</span></Link>
                </Button>
                <Table
                    columns={columns}
                    dataSource={this.state.cunfangdidianList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default Appmain;
