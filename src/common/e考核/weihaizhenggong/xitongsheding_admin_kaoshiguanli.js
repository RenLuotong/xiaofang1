import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import xitongsheding_admin_kaoshiguanlitongji from './xitongsheding_admin_kaoshiguanlitongji';
import xitongsheding_admin_kaoshiguanlixinzeng from './xitongsheding_admin_kaoshiguanlixinzeng';
import xitongsheding_admin_kaoshiguanlixiangqing from './xitongsheding_admin_kaoshiguanlixiangqing';
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
					<Route path = {this.props.match.path +'/xitongsheding_admin_kaoshiguanlitongji'} component = {xitongsheding_admin_kaoshiguanlitongji} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_kaoshiguanlixiangqing'} component = {xitongsheding_admin_kaoshiguanlixiangqing} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_kaoshiguanlixinzeng'} component = {xitongsheding_admin_kaoshiguanlixinzeng} />
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
					kaoshitimu: "测试题",
					kaoshishijian: "2019-9-27",
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
		  	title: '考试题目',
		  	dataIndex: 'kaoshitimu',
		}, {
		  	title: '考试时间',
		  	dataIndex: 'kaoshishijian',
		}, {
			title: '考题数量',
			dataIndex: 'shuliang',
		}, {
		  	title: '操作',
		  	render: (text, record, index) => (
			    <span>
					<Link to={this.props.match.url+'/xitongsheding_admin_kaoshiguanlixiangqing/'+record['id'] }>详情</Link>
					<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除该考试?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
					<Divider type="vertical" />
					<Link to={this.props.match.url+'/xitongsheding_admin_kaoshiguanlitongji/'+record['id'] }>成绩统计</Link>
			    </span>
		  	),
		}];

	    return (
	      	<div>
				<Link to={this.props.match.url+'/xitongsheding_admin_kaoshiguanlixinzeng'}>
					<Button type="primary" style={{margin:5}}>新增考试</Button>
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
