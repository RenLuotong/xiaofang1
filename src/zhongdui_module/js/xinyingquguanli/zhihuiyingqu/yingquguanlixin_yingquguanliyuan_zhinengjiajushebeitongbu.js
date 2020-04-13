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

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pagination: {
        current : 1,
        showQuickJumper: true,
        showSizeChanger: true
			},
			shebeiList: [],
		};
	}

	shebeitongbu = () => {
		$.ajax({
			type:'POST',
			url : SERVER + "boundshebei/shebeitongbu",
			success : function(data){
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
			}
		});
		this.fetch();
	}

	yijianzhuce = () => {
		$.ajax({
			type:'POST',
			url : SERVER + "boundshebei/yijianzhuce",
			success : function(data){
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
			}
		});
		this.fetch();
	}

	tianjiashebei = () => {
		$.ajax({
			type:'POST',
			url : SERVER + "boundshebei/addDevice",
			success : function(data){
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
			}
		});
		this.fetch();
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
		let size = params.rows === undefined ? 10 : params.rows;
		const THE = this;
        $.ajax({
        	type:'GET',
            url : SERVER + "boundshebei/huoqushebei?page="+page+"&size="+size,
            success : function(data){
				let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
				for (let i = 0; i < data.data.content.length; i++) {
					data.data.content[i]["key"] = i;
					if(data.data.content[i]["state"] === true){
						data.data.content[i]["state"] = '已连接'
					}else{
						data.data.content[i]["state"] = '未连接'
					}
					list.push(data.data.content[i]);
				}
				const pagination = { ...THE.state.pagination };
				pagination.total = data.data.totalElement;
                THE.setState({
					shebeiList: list,
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
		  	title: '设备名称',
		  	dataIndex: 'name',
        width: '25%'
		},{
			title: '父设备名称',
			dataIndex: 'parentDeviceName',
        width: '25%'
		},{
			title: '在线状态',
			dataIndex: 'state',
		},{
			title: '所属',
			dataIndex: 'roomName',
		}];

	    return (
	      	<div>
		        <Button type="primary" style={{margin:5}} onClick={this.shebeitongbu.bind(this)}>设备同步</Button>
				<Button type="primary" style={{margin:5}} onClick={this.yijianzhuce.bind(this)}>一键注册</Button>
				<Button type="primary" style={{margin:5}} onClick={this.tianjiashebei.bind(this)}>添加设备</Button>
		        <Table
		        	columns={columns}
		        	dataSource={this.state.shebeiList}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
              scroll={{ y: "calc(100vh - 425px)", x: true }}
		        />
	      	</div>
	    );
  	}
}

export default App;
