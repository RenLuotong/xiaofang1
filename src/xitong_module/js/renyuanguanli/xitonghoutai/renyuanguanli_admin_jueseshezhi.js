import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import renyuanguanli_admin_juesexiugai from './renyuanguanli_admin_juesexiugai';
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
import renyuanguanli_admin_juesetianjia from "./renyuanguanli_admin_juesetianjia";

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
			      	<Route path = {this.props.match.path +'/renyuanguanli_admin_juesexiugai'} component = {renyuanguanli_admin_juesexiugai} />
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
			jueseList: [],
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
            url: SERVER + "queryZuzhijigouJueses?page="+page+"&size="+size+"&sort=id,desc",
            success: function (data) {
            	console.log(data)
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
                    jueseList: list,
                    pagination,
                });
            }
        });
	}

	componentDidMount() {
		this.fetch();
	}

	toDelete(id) {
  		const THE = this;
    	$.ajax({
            type:'GET',
            url: SERVER + "deleteZuzhijigouJueses/"+id,
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
		  	title: '角色名称',
		  	dataIndex: 'juese',
		}, {
		  	title: '操作',
		  	key: 'action',
		  	render: (text, record) => {
				  if(record['shifouyuliujuese'] == "是"){
					  return(
						  <span>
							</span>
					  )
				  }else{
					  return(
						  <span>
					<Popconfirm placement="topLeft" title="确认要删除该角色?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
					  <a>删除</a>
				  </Popconfirm>
					<Divider type="vertical" />
					<Link to={{ pathname: this.props.match.path +'/renyuanguanli_admin_juesexiugai' ,
						query : {
							juese: record['juese'],
							id:record['id'],
						}}}>修改</Link>
			  </span>
					  )
				  }
		  	},
		}];

	    return (
	      	<div>
		        <Button style={{margin:5}}>
					<Link to="/renyuanguanli_admin_juesetianjia"><Icon type="plus" /><span>添加角色</span></Link>
				</Button>
		        <Table
		        	columns={columns}
		        	dataSource={this.state.jueseList}
		        	pagination={this.state.pagination}
					onChange={this.handleTableChange}
					scroll={{ y: "calc(100vh - 342px)", x: true }}
			    />
	      	</div>
	    );
  	}
}

export default Appmain;
