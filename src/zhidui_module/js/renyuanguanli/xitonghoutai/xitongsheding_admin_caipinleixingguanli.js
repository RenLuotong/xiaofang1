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
import xitongsheding_admin_caipinleixingguanlixinzeng from './xitongsheding_admin_caipinleixingguanlixinzeng';
import xitongsheding_admin_caipinleixingguanlixiugai from './xitongsheding_admin_caipinleixingguanlixiugai';


// class Appmain extends React.Component {
//
// 	constructor(props) {
// 		super(props);
// 		this.state = {
//
// 		};
// 	}
//
// 	render() {
// 		return(
// 			<div>
// 				<Switch>
// 		      		<Route exact path = {this.props.match.path} component = {App} />
// 					<Route path = {this.props.match.path +'/xitongsheding_admin_caipinleixingguanlixinzeng/'} component = {xitongsheding_admin_caipinleixingguanlixinzeng} />
// 					<Route path = {this.props.match.path +'/xitongsheding_admin_caipinleixingguanlixiugai/:id'} component = {xitongsheding_admin_caipinleixingguanlixiugai} />
// 		      	</Switch>
//   			</div>
// 		);
// 	}
// }

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pagination: {
				showQuickJumper: true,
				showSizeChanger: true,
				current : 1
			},
			caipinleixingList: [],
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
            url : SERVER+"tbCaipinLeixing/delete?id="+id,
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
            url : SERVER + "tbCaipinLeixing/findAll?page="+page+"&size="+size,
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
					caipinleixingList: list,
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
			className:'hidden_col',
			width:'30%'
		}, {
		  	title: '菜品类型名称',
		  	dataIndex: 'mingcheng',
		}, {
		  	title: '操作',
		  	render: (text, record, index) => (
			    <span>
					<Link to={'xitongsheding_admin_caipinguanli/xitongsheding_admin_caipinleixingguanlixiugai/'+record['id'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除此菜品类型吗?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
		  	),
		}];

	    return (
	      	<div>
				<Link to={'xitongsheding_admin_caipinguanli/xitongsheding_admin_caipinleixingguanlixinzeng'}>
		        	<Button type="primary" style={{margin:5}}>新增菜品类型</Button>
		        </Link>
		        <Table
		        	columns={columns}
		        	dataSource={this.state.caipinleixingList}
					pagination={this.state.pagination}
					onChange={this.handleTableChange}
					scroll={{ y: "calc(100vh - 370px)", x: true }}
		        />
	      	</div>
	    );
  	}
}

export default App;
