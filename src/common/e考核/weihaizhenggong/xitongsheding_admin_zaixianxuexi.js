import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import xitongsheding_admin_zaixianxuexixiugai from './xitongsheding_admin_zaixianxuexixiugai';
import xitongsheding_admin_zaixianxuexitianjia from './xitongsheding_admin_zaixianxuexitianjia';
import xitongsheding_admin_zaixianxuexixiangqing from './xitongsheding_admin_zaixianxuexixiangqing';
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
			      	<Route path = {this.props.match.path +'/xitongsheding_admin_zaixianxuexixiugai/:id'} component = {xitongsheding_admin_zaixianxuexixiugai} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_zaixianxuexitianjia'} component = {xitongsheding_admin_zaixianxuexitianjia} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_zaixianxuexixiangqing/:id'} component = {xitongsheding_admin_zaixianxuexixiangqing} />
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
					ceshitimingcheng: "练习题",
					shuliang: "10",
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
		  	title: '题库名称',
		  	dataIndex: 'ceshitimingcheng',
		}, {
		  	title: '题目数量',
		  	dataIndex: 'shuliang',
		}, {
		  	title: '操作',
		  	render: (text, record, index) => (
			    <span>
			    	<Link to={this.props.match.url+'/xitongsheding_admin_zaixianxuexixiangqing/'+record['id'] }>查看题目</Link>
					<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除该题库?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
		  	),
		}];

	    return (
	      	<div>
		        <Link to={this.props.match.url+'/xitongsheding_admin_zaixianxuexitianjia'}>
		        	<Button type="primary" style={{margin:5}}>新增题库</Button>
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

export default Appmain;
