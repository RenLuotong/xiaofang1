import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import xitongsheding_admin_renyuanxiangqing from './xitongsheding_admin_renyuanxiangqing';
import xitongsheding_admin_renyuanxiugai from './xitongsheding_admin_renyuanxiugai';
import xitongsheding_admin_qitarenyuanmimaxiugai from './xitongsheding_admin_qitarenyuanmimaxiugai';
import {
	Select,
  	Icon,
  	Input,
  	Form,
  	Button,
  	Table,
  	Divider,
  	Popconfirm,
  	message
} from 'antd';


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
			      	<Route path = {this.props.match.path +'/xitongsheding_admin_renyuanxiangqing/:id'} component = {xitongsheding_admin_renyuanxiangqing} />
			      	<Route path = {this.props.match.path +'/xitongsheding_admin_renyuanxiugai/:id'} component = {xitongsheding_admin_renyuanxiugai} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_qitarenyuanmimaxiugai/:id'} component = {xitongsheding_admin_qitarenyuanmimaxiugai} />
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
			renyuanList: [],
			bumenList:[],
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

	fetch = (params = {rows: this.state.pagination.pageSize,
						page: this.state.pagination.current}) => {
    	let form = this.props.form;
        let xm = form.getFieldValue('xm');
        if (typeof(xm) == "undefined") {
        	xm = '';
        }
        let page = params.page - 1;
		let size = params.rows===undefined?10:params.rows;
        const THE = this;
        console.log(SERVER);
    	$.ajax({
            type:'get',
            url: SERVER + "zhiduiRenyuanLiebiao?xingming="+xm+"&page="+page+"&size="+size,
            success: function (data) {
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
                    renyuanList: list,
                    pagination,
                });
            }
        });
	}

	search() {
		const pager = { ...this.state.pagination };
    	pager.current = 1;
    	this.setState({
      		pagination: pager,
    	});
    	this.fetch({
      		rows: pager.pageSize,
      		page: pager.current,
    	});
	}

  	toDelete(id) {
  		const THE = this;
    	$.ajax({
            type:'POST',
            url: SERVER + "shanchuRenyuan?id="+id,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.fetch();
            }
        });
  	}

  	getBumenList() {
  		const THE = this;
  		let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
    	$.ajax({
            type:'GET',
            url: SERVER + "bumenXialaLiebiao?jigoumingcheng="+jigoumingcheng,
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
                    bumenList: list,
                });
            }
        });
  	}

  	componentDidMount() {
  		this.getBumenList();
		this.fetch();
	}

  	render() {

  		const bumenOptions = this.state.bumenList.map(item => <Select.Option key={item['key']} value={item['bumenmingcheng']}>{item['bumenmingcheng']}</Select.Option>);

		const columns = [{
			title: 'id',
			dataIndex: 'id',
			colSpan : 0,
			className:'hidden_col',
			width:'7%'
		},{
		  	title: '姓名',
			  dataIndex: 'xingming',
			  width:'10%'
		}, {
		  	title: '所属组织机构',
			  dataIndex: 'jigoumingcheng',
			  width:'10%'
		}, {
		  	title: '所属部门',
			  dataIndex: 'suosubumen',
			  width:'7%'
		}, {
		  	title: '性别',
			  dataIndex: 'xingbiedaima',
			  width:'10%'
		}, {
		  	title: '入伍时间',
			  dataIndex: 'ruzhishijian',
			  width:'10%'
		}, {
		  	title: '联系电话',
		  	dataIndex: 'yidongdianhua',
		}, {
		  	title: '操作',
		  	render: (text, record, index) => (
			    <span>
			      	<Link to={this.props.match.url+'/xitongsheding_admin_renyuanxiangqing/'+record['id'] }>详情</Link>
			      	<Divider type="vertical" />
			      	<Link to={this.props.match.url+'/xitongsheding_admin_renyuanxiugai/'+record['id'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除该人员?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			      	<Divider type="vertical" />
			      	<Link to={this.props.match.url+'/xitongsheding_admin_qitarenyuanmimaxiugai/'+record['id'] }>修改密码</Link>
			    </span>
		  	),
		}];

		const FormItem = Form.Item;
		const { getFieldDecorator } = this.props.form;

    	return (
	      	<div>
		     	<Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
	        		<FormItem label="姓名">
		      			{getFieldDecorator('xm')(
		        			<Input style={{width:200}}/>
		      			)}
		    		</FormItem>
					<FormItem>
			            <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
			                <Icon type="search" />查询
			            </Button>
					</FormItem>
					<FormItem>
						<Button>
							<Link to="/xitongsheding_admin_xitongguanliyuantianjia"><Icon type="plus" /><span>支队管理人员添加</span></Link>
						</Button>
					</FormItem>
	    		</Form>
		      	<Table
		      		columns={columns}
		      		dataSource={this.state.renyuanList}
		      		pagination={this.state.pagination}
					onChange={this.handleTableChange}
					scroll={{ y: "calc(100vh - 342px)", x: true }}
		      	/>
	      	</div>
    	);
  	}
}

const AppComp = Form.create()(App);
export default Appmain;
