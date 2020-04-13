import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import xitongsheding_admin_wuzileibiexiugai from './xitongsheding_admin_wuzileibiexiugai';
import xitongsheding_admin_wuzileixingxiugai from './xitongsheding_admin_wuzileixingxiugai';
import xitongsheding_admin_wuzileixingxiangqing from './xitongsheding_admin_wuzileixingxiangqing';
import xitongsheding_admin_wuzileibietianjia from './xitongsheding_admin_wuzileibietianjia';
import xitongsheding_admin_wuzileixingtianjia from './xitongsheding_admin_wuzileixingtianjia';
import {
	message,
	Popconfirm,
  	Button,
  	Table,
  	Divider
	,Tabs,Form,
	Select,
	Icon, Input
} from 'antd';

const FormItem = Form.Item;
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
		      		<Route exact path = {this.props.match.path} component = {AppComp} />
			      	<Route path = {this.props.match.path +'/xitongsheding_admin_wuzileibiexiugai/:id'} component = {xitongsheding_admin_wuzileibiexiugai} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_wuzileixingxiugai/:id'} component = {xitongsheding_admin_wuzileixingxiugai} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_wuzileixingxiangqing/:id'} component = {xitongsheding_admin_wuzileixingxiangqing} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_wuzileibietianjia'} component = {xitongsheding_admin_wuzileibietianjia} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_wuzileixingtianjia'} component = {xitongsheding_admin_wuzileixingtianjia} />
		      	</Switch>
  			</div>
		);
	}
}

class App extends React.Component {

	constructor(props){
        super(props);
        this.state = {
		    wuzileibieList : [],
			activeKey:"1",
			wuzileixingList : [],
			leibie:'',
			zhuangbeilbList:[],
			pagination: {
				showQuickJumper: true,
				showSizeChanger: true,
				current: 1
			},
			pagination2: {
				showQuickJumper: true,
				showSizeChanger: true,
				current: 1
			},
        };
    }

	ChangeZhuangbeilbList(value){
		this.setState({
			leibie: value,
		});
	}
	search() {
		const pager = {...this.state.pagination};
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
		const pager = {...this.state.pagination};
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		});
		this.fetch({
			rows: pagination.pageSize,
			page: pagination.current,
		});
	}

	handleTableChange2 = (pagination2) => {
		const pager = {...this.state.pagination2};
		pager.current = pagination2.current;
		this.setState({
			pagination2: pager,
		});
		this.getWuzileibieList({
			rows: pagination2.pageSize,
			page: pagination2.current,
		});
	}
	fetch = (params = {
		rows: this.state.pagination.pageSize,
		page: this.state.pagination.current
	}) => {
		let form = this.props.form;
		const THE = this;
		let leibiebianhao = THE.state.leibie;
		if (leibiebianhao == "-1" || typeof(leibiebianhao) == "undefined") {
			leibiebianhao = "";
		}
		let leixing = form.getFieldValue('leixing');
		if (typeof(leixing) == "undefined"||leixing == null) {
			leixing = '';
		}
		let youwubiaoqian = form.getFieldValue('youwubiaoqian');
		if (typeof(youwubiaoqian) == "undefined"||youwubiaoqian == "-1") {
			youwubiaoqian = '';
		}
		let page = params.page - 1;
		let size = params.rows===undefined?10:params.rows;
		$.ajax({
			type:'GET',
			url : SERVER + "lbzhuangbeileixing?leibiebianhao="+leibiebianhao+"&page="+page+"&size="+size+"&youwubiaoqian="+youwubiaoqian+"&mingcheng="+leixing,
			success : function(data){
				let list = [];
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				for (let i = 0; i < data.data.content.length; i++) {
					data.data.content[i]["key"] = i;
					if(data.data.content[i]["youwubiaoqian"] === true){
						data.data.content[i]["youwubiaoqian"] = '有'
					}else{
						data.data.content[i]["youwubiaoqian"] = '无'
					}
					list.push(data.data.content[i]);
				}

				const pagination = { ...THE.state.pagination };
				pagination.total = data.data.totalElement;
				THE.setState({
					wuzileixingList : list,
					pagination,
				});
			}
		});
	}


	toDelete2(id) {
		const THE = this;
		$.ajax({
			type : "POST",
			url : SERVER+"sczhuangbeileixing?id="+id,
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


	callback(key) {
		const THE = this;
		THE.setState({
			activeKey: key,
		});
	}

	getWuzileibieList = (params = {
		rows: this.state.pagination2.pageSize,
		page: this.state.pagination2.current
	}) => {
     	const THE = this;
		let page = params.page - 1;
		let size = params.rows===undefined?10:params.rows;
        $.ajax({
        	type:'GET',
            url : SERVER + "lbzhuangbeileibie?size="+size+"&page="+page,
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
				const pagination2 = { ...THE.state.pagination2 };
				pagination2.total = data.data.totalElement;
                THE.setState({
                    wuzileibieList : list,
					zhuangbeilbList: list,
					pagination2
                });
            }
        });
    }

	toDelete(id) {
        const THE = this;
        $.ajax({
            type : "POST",
            url : SERVER+"sczhuangbeileibie?id="+id,
            success : function(data){
            	if (data.status != 0) {
            		message.warning(data.message);
            		return;
                }
                message.success("删除成功");
                THE.getWuzileibieList();
            },
            error : function() {
                message.error('操作失败');
            }
        });
    }

	componentWillUnmount() {
		View.pagination = this.state.pagination;
		View.pagination2 = this.state.pagination2;
		View.leibie = this.state.leibie;
		View.activeKey = this.state.activeKey;
	}

	componentWillMount(){
		if(!View.activeKey){
			View.activeKey = '1';
		}
		const {pagination,pagination2,leibie,activeKey} = View;
		this.setState({
			leibie: leibie,
			activeKey: activeKey,
		});
		if(typeof(pagination) !== "undefined"){
			this.setState({
				pagination: pagination,
			});
		}
		if(typeof(pagination2) !== "undefined"){
			this.setState({
				pagination2: pagination2,
			});
		}
	}

	componentDidMount () {
		this.getWuzileibieList();
		this.fetch();
    }

  	render() {
		const zhuangbeileibieOptions = this.state.zhuangbeilbList.map(item => <Select.Option key={item['id']}
																							 value={item['leibiebianhao']}>{item['mingcheng']}</Select.Option>);

  		const columns = [{
			title: 'id',
			dataIndex: 'id',
			colSpan : 0,
			className:'hidden_col',
			width:'30%'
		},{
		  	title: '装备类别',
			  dataIndex: 'mingcheng',
			  width:'30%'
		}, {
		  	title: '装备类别描述',
		  	dataIndex: 'miaoshu',
		}, {
		  	title: '操作',
		  	render: (text, record, index) => (
			    <span>
			    	<Link to={this.props.match.url+'/xitongsheding_admin_wuzileibiexiugai/'+record['id'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除该装备类别?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
		  	),
		}];

		const columns2 = [{
			title: 'id',
			dataIndex: 'id',
			colSpan : 0,
			className:'hidden_col',
			width:'25%'
		},{
			title: '装备类别名称',
			dataIndex: 'leibiemingcheng',
			width:'25%'
		},{
			title: '装备类型名称',
			dataIndex: 'mingcheng',
			width:'20%'
		}, {
			title: '有无标签',
			dataIndex: 'youwubiaoqian',
		}, {
			title: '操作',
			key: 'action',
			render: (text, record, index) => (
				<span>
			    	<Link to={this.props.match.url+'/xitongsheding_admin_wuzileixingxiangqing/'+record['id'] }>详情</Link>
			      	<Divider type="vertical" />
			      	<Link to={this.props.match.url+'/xitongsheding_admin_wuzileixingxiugai/'+record['id'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除该装备类型?" onConfirm={this.toDelete2.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
			),
		}];

		const FormItem = Form.Item;
		const { getFieldDecorator } = this.props.form;
		const { leibie } = this.state;

	    return (
			<div>
			<Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
			<Tabs.TabPane tab="装备类别管理" key="1">
				<Link to={this.props.match.url+'/xitongsheding_admin_wuzileibietianjia'}>
		        	<Button type="primary" style={{margin:5}}>新增装备类别</Button>
		        </Link>
		        <Table
		        	columns={columns}
		        	dataSource={this.state.wuzileibieList}
					pagination={this.state.pagination2}
					onChange={this.handleTableChange2}
					scroll={{ y: "calc(100vh - 394px)", x: true }}   
		        />
			</Tabs.TabPane>
			<Tabs.TabPane tab="装备类型管理" key="2">
				<Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
					<FormItem label="类别名称">
						<Select style={{width: 200}} value={leibie} onChange={this.ChangeZhuangbeilbList.bind(this)} showSearch>
							<Select.Option value="-1">全部</Select.Option>
							{zhuangbeileibieOptions}
						</Select>
					</FormItem>
					<FormItem label="类型名称">
						{getFieldDecorator('leixing')(
							<Input style={{width:200}}/>
						)}
					</FormItem>
					<FormItem label="有无标签">
						{getFieldDecorator('youwubiaoqian')(
							<Select style={{width:200}}>
								<Select.Option value="-1">全部</Select.Option>
								<Select.Option value="true">有</Select.Option>
								<Select.Option value="false">无</Select.Option>
							</Select>
						)}
					</FormItem>
					<Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
						<Icon type="search" />查询
					</Button>
				</Form>
				<Link to={this.props.match.url+'/xitongsheding_admin_wuzileixingtianjia'}>
					<Button type="primary" style={{margin:5}}>新增装备类型</Button>
				</Link>
				<Table
					columns={columns2}
					dataSource={this.state.wuzileixingList}
					pagination={this.state.pagination}
					onChange={this.handleTableChange}
					scroll={{ y: "calc(100vh - 394px)", x: true }}   
				/>
			</Tabs.TabPane>
			</Tabs>
			</div>
	    );
  	}
}

const AppComp = Form.create()(App);

export default Appmain;
