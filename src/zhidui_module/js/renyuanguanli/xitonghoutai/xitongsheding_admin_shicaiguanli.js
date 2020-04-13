import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import {
	message,
	Popconfirm,
	Button,
	Table,
	Divider, Tabs
} from 'antd';
import xitongsheding_admin_shicaiguanlixinzeng from './xitongsheding_admin_shicaiguanlixinzeng';
import xitongsheding_admin_shicaiguanlixiugai from './xitongsheding_admin_shicaiguanlixiugai';
import Lxgl
	from "../../../../zhidui_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_shicaileixingguanli";
import xitongsheding_admin_shicaileixingguanlixinzeng
	from "../../../../zhidui_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_shicaileixingguanlixinzeng";
import xitongsheding_admin_shicaileixingguanlixiugai
	from "../../../../zhidui_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_shicaileixingguanlixiugai";
const View = [];

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
					<Route path = {this.props.match.path +'/xitongsheding_admin_shicaiguanlixinzeng/'} component = {xitongsheding_admin_shicaiguanlixinzeng} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_shicaiguanlixiugai/:id'} component = {xitongsheding_admin_shicaiguanlixiugai} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_shicaileixingguanlixinzeng/'} component = {xitongsheding_admin_shicaileixingguanlixinzeng} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_shicaileixingguanlixiugai/:id'} component = {xitongsheding_admin_shicaileixingguanlixiugai} />
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
			shicaiList: [],
			activeKey:"1",
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

	toDelete(id){
  		const THE = this;
        $.ajax({
            type : "POST",
            url : SERVER+"jizhongcaigou/shanchu?id="+id,
            success : function(data){
            	if (data.status != 0) {
            		message.warning(data.message);
            		return;
                }
                message.success("删除成功");
                THE.fetch();
            },
            error : function() {
                message.error('操作失败');
            }
        });
  	}

	fetch(params = {rows: this.state.pagination.pageSize,
		page: this.state.pagination.current}) {
		let page = params.page - 1;
		let size = params.rows===undefined?10:params.rows;
		const THE = this;
        $.ajax({
        	type:'GET',
            url : SERVER + "jizhongcaigou/getShicaiPage?page="+page+"&size="+size,
            success : function(data){
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
					shicaiList: list,
					pagination,
                });
            }
        });
	}

	//控制tab页方法
	callback(key) {
		const THE = this;
		THE.setState({
			activeKey: key,
		});
	}

	componentWillUnmount() {
		View.pagination = this.state.pagination;
		View.activeKey = this.state.activeKey;
	}

	componentWillMount() {
		if(!View.activeKey){
			View.activeKey = '1';
		}
		const {pagination,activeKey} = View;
		this.setState({
			activeKey: activeKey,
		});
		if (typeof (pagination) !== "undefined") {
			this.setState({
				pagination: pagination,
			});
		}
	}

	componentDidMount () {
		this.fetch();
    }

  	render() {

  		const columns = [{
			title: 'id',
			dataIndex: 'id',
			colSpan : 0,
			className:'hidden_col',
			width:'15%'
		}, {
		  	title: '食材名称',
			  dataIndex: 'mingcheng',
			  width:'15%'
		},{
			title: '食材类型',
			dataIndex: 'leixing',
			width:'15%'
		},{
			title: '单位',
			dataIndex: 'danwei',
			width:'15%'
		},{
			title: '食材图片',
			dataIndex: 'tupian',
			width:'20%',
			render: (text, record) => (

				<span>
			    	<img src={record['tupian']} width="100px" height="100px"/>
			    </span>
			),
		}, {
		  	title: '操作',
		  	render: (text, record, index) => (
			    <span>
					<Link to={this.props.match.url+'/xitongsheding_admin_shicaiguanlixiugai/'+record['id'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除此食材吗?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
		  	),
		}];

	    return (
	      	<div>
				<Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
				<Tabs.TabPane tab="食材管理" key="1">
				<Link to={this.props.match.url+'/xitongsheding_admin_shicaiguanlixinzeng'}>
		        	<Button type="primary" style={{margin:5}}>新增食材</Button>
		        </Link>
		        <Table
		        	columns={columns}
		        	dataSource={this.state.shicaiList}
					pagination={this.state.pagination}
					onChange={this.handleTableChange}
					scroll={{ y: "calc(100vh - 410px)", x: true }}   
		        />
				</Tabs.TabPane>
				<Tabs.TabPane tab="食材类型管理" key="2">
					<Lxgl />
				</Tabs.TabPane>
				</Tabs>
	      	</div>
	    );
  	}
}

export default Appmain;
