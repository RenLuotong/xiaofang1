import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import {
	Button, Divider, Popconfirm,
	Table
} from 'antd';

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
					<Route exact path = {this.props.match.path} component = {App} />
				</Switch>
			</div>
		);
	}
}

class App extends React.Component {

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

		const columns = [{
			title: 'id',
			dataIndex: 'id',
			colSpan : 0,
			className:'hidden_col'
		}, {
			title: '题目名称',
			dataIndex: 'ceshitimingcheng',
		}];

		return (
				<Table
					columns={columns}
					dataSource={this.state.wenzhangList}
					pagination={this.state.pagination}
				/>
		);
	}
}

export default App;
