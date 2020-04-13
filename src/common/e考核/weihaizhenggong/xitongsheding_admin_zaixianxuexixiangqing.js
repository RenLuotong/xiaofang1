import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import {
	Button, Divider, Popconfirm,
	Table,Form
} from 'antd';
import xitongsheding_admin_xinlijiankangxiugai from './xitongsheding_admin_xinlijiankangxiugai';
import xitongsheding_admin_zaixianxuexixiangqingtianjia from './xitongsheding_admin_zaixianxuexixiangqingtianjia';
import xitongsheding_admin_xinlijiankangtongji from './xitongsheding_admin_xinlijiankangtongji';
import xitongsheding_admin_xinlijiankangxiangqing from './xitongsheding_admin_xinlijiankangxiangqing';

class Appmain extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pagination: {
				pageSize : 100,
				current : 1
			},
		};
	}

	render() {
		return(
			<div>
				<Switch>
					<Route exact path = {this.props.match.path} component = {AppComp} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_xinlijiankangxiangqing/:id'} component = {xitongsheding_admin_xinlijiankangxiangqing} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_xinlijiankangxiugai/:id'} component = {xitongsheding_admin_xinlijiankangxiugai} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_zaixianxuexixiangqingtianjia'} component = {xitongsheding_admin_zaixianxuexixiangqingtianjia} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_xinlijiankangtongji'} component = {xitongsheding_admin_xinlijiankangtongji} />
				</Switch>
			</div>
		);
	}
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			wenzhangList: [
				{
					id: "1",
					ceshitimingcheng: "我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人",
					nandu: "小",
				}
			],
		};
	}

	toDelete() {
	}



	fetch() {
		const THE = this;
	}

	componentDidMount() {
		this.fetch();
	}

	render() {

		const FormItem = Form.Item;
		const { getFieldDecorator } = this.props.form;

		const columns = [{
			title: 'id',
			dataIndex: 'id',
			colSpan : 0,
			className:'hidden_col'
		}, {
			title: '题目名称',
			dataIndex: 'ceshitimingcheng',
		}, {
			title: '操作',
			render: (text, record, index) => (
				<span>
					<Link to={this.props.match.url+'/xitongsheding_admin_xinlijiankangxiangqing/'+record['id'] }>详情</Link>
					<Divider type="vertical" />
					<Link to={this.props.match.url+'/xitongsheding_admin_xinlijiankangxiugai/'+record['id'] }>修改</Link>
					<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除该题目?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
			),
		}];

		return (
			<div>
				<Link to={this.props.match.url+'/xitongsheding_admin_zaixianxuexixiangqingtianjia'}>
					<Button type="primary" style={{margin:5}}>新增题目</Button>
				</Link>
			<Table
				columns={columns}
				dataSource={this.state.wenzhangList}
				pagination={this.state.pagination}
			/>
			</div>
		);
	}
}

const AppComp = Form.create()(App);

export default Appmain;

