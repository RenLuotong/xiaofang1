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
import yingquguanlixin_yingquguanliyuan_baoguanguiguanlixinzeng from './yingquguanlixin_yingquguanliyuan_baoguanguiguanlixinzeng';
import yingquguanlixin_yingquguanliyuan_baoguanguiguanlixiugai from './yingquguanlixin_yingquguanliyuan_baoguanguiguanlixiugai';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pagination: {
        current : 1,
        showQuickJumper: true,
        showSizeChanger: true
			},
			baoguanguiList: [],
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
            url : SERVER+"shanchubaoguangui?id="+id,
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
		let size = params.rows === undefined ? 10 : params.rows;
		const THE = this;
        $.ajax({
        	type:'GET',
            url : SERVER + "chaxunbaoguangui?page="+page+"&size="+size,
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
					baoguanguiList: list,
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
        width: '25%'
		}, {
		  	title: '保管柜名称',
		  	dataIndex: 'baoguanguimingcheng',
        width: '25%'
		},{
			title: '保管柜状态',
			dataIndex: 'baoguanguizhuangtai',
        width: '25%'
		},{
			title: '关联设备编号',
			dataIndex: 'shebeibianhao',
		}, {
		  	title: '操作',
		  	render: (text, record, index) => (
			    <span>
					<Link to={'yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_baoguanguiguanlixiugai/'+record['id'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除此保管柜吗?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
		  	),
		}];

	    return (
	      	<div>
				<Link to={'yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_baoguanguiguanlixinzeng'}>
		        	<Button type="primary" style={{margin:5}}>新增保管柜</Button>
		        </Link>
		        <Table
		        	columns={columns}
		        	dataSource={this.state.baoguanguiList}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
              scroll={{ y: "calc(100vh - 425px)", x: true }}
		        />
	      	</div>
	    );
  	}
}

export default App;
