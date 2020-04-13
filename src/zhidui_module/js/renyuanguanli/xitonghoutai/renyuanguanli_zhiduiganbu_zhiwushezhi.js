import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import renyuanguanli_zhiduiganbu_zhiwuxiugai from './renyuanguanli_zhiduiganbu_zhiwuxiugai';
import XLSX from 'xlsx';
import 'antd/dist/antd.css';
import {
	message,
  	Layout,
  	Menu,
  	Breadcrumb,
  	Icon,
  	Input,
  	Form,
  	Button,
  	Table,
  	Divider,
  	Popconfirm
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
			      	<Route path = {this.props.match.path +'/renyuanguanli_zhiduiganbu_zhiwuxiugai/:id'} component = {renyuanguanli_zhiduiganbu_zhiwuxiugai} />
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
				showQuickJumper: true,
        showSizeChanger: true,
				current : 1
			},
			zhiwuList: [],
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
		let size = params.rows===undefined?10:params.rows;
        const THE = this;
    	$.ajax({
            type:'get',
            url: SERVER + "zhiwuLiebiao?page="+page+"&size="+size+"&sort=id,desc",
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
                    zhiwuList: list,
                    pagination,
                });
            }
        });
	}


    output()  {
        let _headers = ['职务名称', '职务描述', '职务简称']
        $.ajax({
            type:'get',
            url: SERVER + "zhiwuLiebiao?page=0&size=10000",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    let obj={};
                    if (data.data.content[i]['zhiwumingcheng'] == null) {
                        obj['职务名称'] = '';
                    } else {
                        obj['职务名称'] = data.data.content[i]['zhiwumingcheng'];
                    }
                    if (data.data.content[i]['zhiwumiaoshu'] == null) {
                        obj['职务描述'] = '';
                    } else {
                        obj['职务描述'] = data.data.content[i]['zhiwumiaoshu'];
                    }
                    if (data.data.content[i]['zhiwujiancheng'] == null) {
                        obj['职务简称'] = '';
                    } else {
                        obj['职务简称'] = data.data.content[i]['zhiwujiancheng'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前职务管理列表没有数据！");
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
                XLSX.writeFile(wb, '职务管理.xlsx');
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
            url: SERVER + "shanchuZhiwu?id="+id,
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
			width:'20%'
		}, {
		  	title: '职务名称',
			  dataIndex: 'zhiwumingcheng',
			  width:'20%'
		}, {
		  	title: '职务描述',
			  dataIndex: 'zhiwumiaoshu',
			  width:'20%'
		}, {
		  	title: '职务简称',
		  	dataIndex: 'zhiwujiancheng',
		}, {
		  	title: '操作',
		  	key: 'action',
		  	render: (text, record) => (
			    <span>
			      	<Popconfirm placement="topLeft" title="确认要删除该职务?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			      	<Divider type="vertical" />
			      	<Link to={this.props.match.url+'/renyuanguanli_zhiduiganbu_zhiwuxiugai/'+record['id'] }>修改</Link>
			    </span>
		  	),
		}];

	    return (
	      	<div>
		        <Button style={{margin:5}}>
					<Link to="/renyuanguanli_zhiduiganbu_zhiwutianjia"><Icon type="plus" /><span>添加职务</span></Link>
				</Button>
		        <Table
		        	columns={columns}
		        	dataSource={this.state.zhiwuList}
		        	pagination={this.state.pagination}
					onChange={this.handleTableChange}
					scroll={{ y: "calc(100vh - 370px)", x: true }}
			    />
	      	</div>
	    );
  	}
}

export default Appmain;
