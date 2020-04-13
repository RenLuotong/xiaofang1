import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import xitongsheding_admin_wuzileixingxiugai from './xitongsheding_admin_wuzileixingxiugai';
import {
	message,
	Popconfirm,
	Button,
	Table,
	Divider,
	Form,
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
					<Route path = {this.props.match.path +'/xitongsheding_admin_wuzileixingxiugai/:id'} component = {xitongsheding_admin_wuzileixingxiugai} />
				</Switch>
			</div>
		);
	}
}

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			wuzileixingList : [],
			leibie:'',
			zhuangbeilbList:[],
			pagination: {
				pageSize: 10,
				current: 1
			},
		};
	}

	getZhuangbeilbList() {
		const THE = this;
		$.ajax({
			type:'GET',
			url: SERVER + "zhuangbeileibieliebiao",
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
					zhuangbeilbList: list,
				});
			}
		});
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



	fetch = (params = {
		rows: this.state.pagination.pageSize,
		page: this.state.pagination.current
	}) => {
		let form = this.props.form;
		const THE = this;
		let zhuangbeileixing = THE.state.leibie;
		if (zhuangbeileixing == "-1" || typeof(zhuangbeileixing) == "undefined") {
			zhuangbeileixing = "";
		}
		let leixing = form.getFieldValue('leixing');
		if (typeof(leixing) == "undefined"||leixing == null) {
			leixing = '';
		}
		let youwuzhuangbeiguigexinghao = form.getFieldValue('youwuzhuangbeiguigexinghao');
		if (typeof(youwuzhuangbeiguigexinghao) == "undefined"||youwuzhuangbeiguigexinghao == "-1") {
			youwuzhuangbeiguigexinghao = '';
		}
		let youwubiaoqian = form.getFieldValue('youwubiaoqian');
		if (typeof(youwubiaoqian) == "undefined"||youwubiaoqian == "-1") {
			youwubiaoqian = '';
		}
		let page = params.page - 1;
		let size = params.rows;
		$.ajax({
			type:'GET',
			url : SERVER + "getzhuangbeileixingliebiao?zhuangbeileibiemingcheng="+zhuangbeileixing+"&page="+page+"&size="+size+"&youwuzhuangbeiguigexinghao="+youwuzhuangbeiguigexinghao+"&youwubiaoqian="+youwubiaoqian+"&zhuangbeileixingmingcheng="+leixing,
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
					wuzileixingList : list,
					pagination,
				});
			}
		});

	}


	toDelete(id) {
		const THE = this;
		let wuzileixing = {};
		wuzileixing["id"] = id;
		let wuzileixingJson = JSON.stringify(wuzileixing);
		$.ajax({
			type : "POST",
			url : SERVER+"shanchuzhuangbeileixing",
			data : wuzileixingJson,
			contentType : "application/json; charset=utf-8",
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

	componentWillUnmount() {
		View.pagination = this.state.pagination;
		View.leibie = this.state.leibie;
	}

	componentWillMount(){
		const {pagination,leibie} = View;
		this.setState({
			leibie: leibie,
		});
		if(typeof(pagination) !== "undefined"){
			this.setState({
				pagination: pagination,
			});
		}
	}

	componentDidMount () {
		this.getZhuangbeilbList();
		this.fetch();
	}

	render() {

		const zhuangbeileibieOptions = this.state.zhuangbeilbList.map(item => <Select.Option key={item['id']}
																							 value={item['zhuangbeileibiemingcheng']}>{item['zhuangbeileibiemingcheng']}</Select.Option>);


		const columns = [{
			title: 'id',
			dataIndex: 'id',
			colSpan : 0,
			className:'hidden_col'
		},{
			title: '装备类别名称',
			dataIndex: 'zhuangbeileibiemingcheng',
			key: 'zhuangbeileibiemingcheng',
		},{
			title: '装备类型名称',
			dataIndex: 'zhuangbeileixingmingcheng',
			key: 'zhuangbeileixingmingcheng',
		}, {
			title: '审批级别',
			dataIndex: 'zhuangbeiShenpiQuanxian',
			key: 'zhuangbeiShenpiQuanxian',
		}, {
			title: '有无装备规格型号',
			dataIndex: 'youwuzhuangbeiguigexinghao',
			key: 'youwuzhuangbeiguigexinghao',
		}, {
			title: '有无标签',
			dataIndex: 'youwubiaoqian',
			key: 'youwubiaoqian',
		}, {
			title: '操作',
			key: 'action',
			render: (text, record, index) => (
				<span>
			    	<Link to={this.props.match.url+'/xitongsheding_admin_wuzileixingxiugai/'+record['id'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除该装备类型?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
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
				<Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
					<FormItem label="类别名称&#12288;&#12288;&#12288;&#12288;">
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
					<br/>
					<FormItem label="有无装备规格型号">
						{getFieldDecorator('youwuzhuangbeiguigexinghao')(
							<Select style={{width:200}}>
								<Select.Option value="-1">全部</Select.Option>
								<Select.Option value="有">有</Select.Option>
								<Select.Option value="无">无</Select.Option>
							</Select>
						)}
					</FormItem>
					<FormItem label="有无标签">
						{getFieldDecorator('youwubiaoqian')(
							<Select style={{width:200}}>
								<Select.Option value="-1">全部</Select.Option>
								<Select.Option value="有">有</Select.Option>
								<Select.Option value="无">无</Select.Option>
							</Select>
						)}
					</FormItem>
					<Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
						<Icon type="search" />查询
					</Button>
				</Form>
				<Link to="/xitongsheding_admin_wuzileixingtianjia">
					<Button type="primary" style={{margin:5}}>新增装备类型</Button>
				</Link>
				<Table
					columns={columns}
					dataSource={this.state.wuzileixingList}
					pagination={this.state.pagination}
					onChange={this.handleTableChange}
				/>
			</div>
		);
	}
}

const AppComp = Form.create()(App);

export default Appmain;
