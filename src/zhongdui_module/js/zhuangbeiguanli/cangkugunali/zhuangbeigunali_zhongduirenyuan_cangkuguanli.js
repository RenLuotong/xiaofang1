import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import zhuangbeiguanli_zhongduirenyuan_cangkuxiugai from './zhuangbeiguanli_zhongduirenyuan_cangkuxiugai';
import zhuangbeiguanli_zhongduirenyuan_cangkutianjia from './zhuangbeiguanli_zhongduirenyuan_cangkutianjia';
import zhuangbeigunali_zhongduirenyuan_cangkuguanlixiangqing from './zhuangbeigunali_zhongduirenyuan_cangkuguanlixiangqing';
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
                    <Route path = {this.props.match.path +'/zhuangbeiguanli_zhongduirenyuan_cangkuxiugai/:cangkubianhao'} component = {zhuangbeiguanli_zhongduirenyuan_cangkuxiugai} />
                    <Route path = {this.props.match.path +'/zhuangbeiguanli_zhongduirenyuan_cangkutianjia'} component = {zhuangbeiguanli_zhongduirenyuan_cangkutianjia} />
                    <Route path = {this.props.match.path +'/zhuangbeigunali_zhongduirenyuan_cangkuguanlixiangqing/:cangkubianhao'} component = {zhuangbeigunali_zhongduirenyuan_cangkuguanlixiangqing} />
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
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            cangkuList: [],
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
      let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "cangkuliebiao?page="+page+"&size="+size+"&sort=id,desc",
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
                pagination.total = data.data.totalElement;;
                THE.setState({
                    cangkuList: list,
                    pagination,
                });
            }
        });
    }

    output()  {
        let tbZhuangbeibaojing = {};
        let _headers = ['仓库名称', '仓库位置', '描述']
        $.ajax({
            type:'get',
            url: SERVER + "cangkuLiebiao?page=0&size=10000",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    let obj={};
                    if (data.data.content[i]['cangkumingcheng'] == null) {
                        obj['仓库名称'] = '';
                    } else {
                        obj['仓库名称'] = data.data.content[i]['cangkumingcheng'];
                    }
                    if (data.data.content[i]['dizhi'] == null) {
                        obj['仓库位置'] = '';
                    } else {
                        obj['仓库位置'] = data.data.content[i]['dizhi'];
                    }
                    if (data.data.content[i]['miaoshu'] == null) {
                        obj['描述'] = '';
                    } else {
                        obj['描述'] = data.data.content[i]['miaoshu'];
                    }

                    list.push(obj);
                }
                console.log(data);
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前仓库管理列表没有数据！");
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
                XLSX.writeFile(wb, '仓库管理.xlsx');
            }
        });

    }

    componentDidMount() {
        this.fetch();
    }

    toDelete(cangkubianhao) {
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER + "shanchucangku?cangkubianhao="+cangkubianhao,
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
            className:'hidden_col',
          width: '10%'
        }, {
            title: '仓库名称',
            dataIndex: 'cangkumingcheng',
            key: 'cangkumingcheng',
          width: '10%'
        }, {
            title: '仓库类型',
            dataIndex: 'cangkuleixing',
            key: 'cangkuleixing',
          width: '10%'
        }, {
            title: '仓库描述',
            dataIndex: 'cangkumiaoshu',
            key: 'cangkumiaoshu',
          width: '10%'
        }, {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <span>
                    <Link to={this.props.match.url+'/zhuangbeigunali_zhongduirenyuan_cangkuguanlixiangqing/'+record['cangkubianhao'] }>详情</Link>
			      	<Divider type="vertical" />
			    	<Link to={this.props.match.url+'/zhuangbeiguanli_zhongduirenyuan_cangkuxiugai/'+record['cangkubianhao'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除该仓库?" onConfirm={this.toDelete.bind(this,record['cangkubianhao'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
            ),
        }];

        return (
            <div>
                {/*<Button type="primary" onClick={this.output.bind(this)} style={{margin: 5}}>*/}
                {/*    <Icon type="export" />导出*/}
                {/*</Button>*/}
                <Button style={{margin:5}}>
                    <Link to={this.props.match.url+'/zhuangbeiguanli_zhongduirenyuan_cangkutianjia' }><Icon type="plus" /><span>添加仓库</span></Link>
                </Button>
                <Table
                    columns={columns}
                    dataSource={this.state.cangkuList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 365px)", x: true }}
                />

            </div>
        );
    }
}

export default Appmain;
