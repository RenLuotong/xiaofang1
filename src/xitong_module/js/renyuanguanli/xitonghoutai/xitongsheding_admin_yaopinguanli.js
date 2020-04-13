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
import xitongsheding_admin_yaopinguanlixinzeng from './xitongsheding_admin_yaopinguanlixinzeng';
import xitongsheding_admin_yaopinguanlixiugai from './xitongsheding_admin_yaopinguanlixiugai';

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
					<Route path = {this.props.match.path +'/xitongsheding_admin_yaopinguanlixinzeng/'} component = {xitongsheding_admin_yaopinguanlixinzeng} />
					<Route path = {this.props.match.path +'/xitongsheding_admin_yaopinguanlixiugai/:id'} component = {xitongsheding_admin_yaopinguanlixiugai} />
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
			yaopinList: [],
		};
	}
	handleCancel = () => this.setState({ previewVisible: false })

	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	}
	handleChange = ({fileList}) => {
		this.setState({
			fileList: fileList,
		});
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
            url : SERVER+"tb-yaopins/shanchu?id="+id,
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
		let size = params.rows;
		const THE = this;
        $.ajax({
        	type:'GET',
            url : SERVER + "tb-yaopins/huoquzhengchang?page="+page+"&size="+size,
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
					yaopinList: list,
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
		}, {
			title: '药品编号',
			dataIndex: 'yaopinbianhao',
		},{
		  	title: '药品名称',
		  	dataIndex: 'yaopinmingcheng',
		},{
			title: '药品单位',
			dataIndex: 'danweizhongwen',
		},{
			title: '药品图片',
			dataIndex: 'tupian',
			render: (text, record) => (

				<span>
			    	<img src={record['tupian']} width="100px" height="100px"/>
			    </span>
			),
		}, {
		  	title: '操作',
		  	render: (text, record, index) => (
			    <span>
					<Link to={this.props.match.url+'/xitongsheding_admin_yaopinguanlixiugai/'+record['id'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除此药品吗?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
		  	),
		}];

	    return (
	      	<div>
				<Link to={this.props.match.url+'/xitongsheding_admin_yaopinguanlixinzeng'}>
		        	<Button type="primary" style={{margin:5}}>新增药品</Button>
		        </Link>
		        <Table
		        	columns={columns}
		        	dataSource={this.state.yaopinList}
					pagination={this.state.pagination}
					onChange={this.handleTableChange}
		        />
	      	</div>
	    );
  	}
}

export default Appmain;
