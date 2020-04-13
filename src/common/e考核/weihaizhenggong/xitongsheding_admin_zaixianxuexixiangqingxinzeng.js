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
					ceshitimingcheng: "如何判断自己的思维能力",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "你的修养水平有多高",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "你具备什么样的竞争素质/",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "与他人相处时你的涵养如何",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "检测你的观察能力",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "你是否具有很强的责任感",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "你知道成功的要素吗",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "你是否有事业成就感/",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "你有做领导的潜质吗",
					nandu: "小",
				},
				{
					id: "1",
					ceshitimingcheng: "你对正在从事的职业适应性强吗",
					nandu: "小",
				}
			],
		};
	}

	toDelete() {
	}

	tianjia() {
		if (!confirm("确定添加这些题目吗？")) {
			return;
		}
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

		const rowSelection = {
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
				this.setState({
					selectedRowKeys : selectedRowKeys,
					selectList : selectedRows,
				});
			}
		};

		return (
			<div>
			<Button type="primary" style={{margin:5}} onClick={this.tianjia.bind(this)}>确定添加</Button>
			<Table
				rowSelection={rowSelection}
				columns={columns}
				dataSource={this.state.wenzhangList}
				pagination={this.state.pagination}
			/>
			</div>
		);
	}
}

export default App;
