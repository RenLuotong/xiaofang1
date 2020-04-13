import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import {
	message,
	Popconfirm,
  	Button,
  	Table,
	Divider
} from 'antd';
import xitongsheding_admin_wangguanxiugai from './xitongsheding_admin_wangguanxiugai';
import xitongsheding_admin_wangguanxinzeng from './xitongsheding_admin_wangguanxinzeng';


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
					<Route path = {this.props.match.path +'/xitongsheding_admin_wangguanxinzeng'} component = {xitongsheding_admin_wangguanxinzeng} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_wangguanxiugai/:deviceId'} component = {xitongsheding_admin_wangguanxiugai} />
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
				pageSize : 10,
				current : 1
			},
			wangguanList: [],
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


	fetch(params = {rows: this.state.pagination.pageSize,
		page: this.state.pagination.current}) {
		let page = params.page - 1;
		let size = params.rows;
		const THE = this;
        $.ajax({
        	type:'GET',
            url : SERVER + "boundshebei/huoquwangguan?page="+page+"&size="+size,
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
					wangguanList: list,
					pagination,
                });
            }
        });
	}

	componentDidMount () {
		this.fetch();
    }

  	render() {

  		const columns = [{
			title: 'id',
			dataIndex: 'id',
			colSpan : 0,
			className:'hidden_col'
		},{
			title: '营区名称',
			dataIndex: 'yingqumingcheng',
		}, {
			title: '网关ID',
			dataIndex: 'deviceId',
		}, {
		  	title: '网关类型',
		  	dataIndex: 'type',
		}, {
			title: '操作',
			render: (text, record, index) => (
				<span>
			      	<Link to={this.props.match.url+'/xitongsheding_admin_wangguanxiugai/'+record['deviceId'] }>修改密码</Link>
			    </span>
			),
		}];

	    return (
	      	<div>
				<Link to={this.props.match.url+'/xitongsheding_admin_wangguanxinzeng'}>
		        	<Button type="primary" style={{margin:5}}>新增网关</Button>
		        </Link>
		        <Table
		        	columns={columns}
		        	dataSource={this.state.wangguanList}
					pagination={this.state.pagination}
					onChange={this.handleTableChange}
		        />
	      	</div>
	    );
  	}
}

export default Appmain;
