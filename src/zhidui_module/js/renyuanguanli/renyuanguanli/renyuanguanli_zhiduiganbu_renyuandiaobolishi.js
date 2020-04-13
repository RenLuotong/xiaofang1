/*人员调动历史*/
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import moment from 'moment';
import { 
	Modal,
	Popover,
	Select,
  	Layout, 
  	Menu, 
  	Breadcrumb, 
  	Icon, 
  	Input, 
  	Form, 
  	Button,
  	Table, 
  	Divider,
  	Popconfirm,
  	message,
} from 'antd';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			renyuanbianhao:this.props.match.params.renyuanbianhao,
			pagination: {
				showQuickJumper: true,
        showSizeChanger: true,
				current : 1
			},
			diaoboList: [],
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
		let renyuanbianhao = this.state.renyuanbianhao;
        let page = params.page - 1;
		let size = params.rows===undefined?10:params.rows;
        const THE = this;
    	$.ajax({
            type:'get',
            url: SERVER + "renyuanlvliXiangqing?renyuanbianhao="+renyuanbianhao+"&page="+page+"&size="+size+"&sort=id,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if (data.data.content[i]['diaodongshijian'] != null && data.data.content[i]['diaodongshijian'] != "") {
			  			data.data.content[i]['diaodongshijian'] = moment(data.data.content[i]['diaodongshijian']).format('YYYY-MM-DD HH:mm:ss');
			  		}
            		list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    diaoboList: list,
                    pagination,
                });
            }
        });
	}
	
  	componentDidMount() {
		this.fetch();
	}

  	render() {
  		
		const columns = [{
			title: 'renyuanbianhao',
			dataIndex: 'renyuanbianhao',
			colSpan : 0,
			className:'hidden_col',
			width:'20%'
		}, {
		  	title: '调拨人',
			  dataIndex: 'diaodongrenxingming',
			  width:'20%'
		}, {
		  	title: '调拨时间',
			  dataIndex: 'diaodongshijian',
			  width:'20%'
		}, {
		  	title: '组织机构',
			  dataIndex: 'jigoumingcheng',
			  width:'20%'
		}, {
		  	title: '所在部门',
		  	dataIndex: 'suosubumen',
		}, {
		  	title: '入职时间',
		  	dataIndex: 'ruzhishijian',
		}];

    	return (
	      	<div>
		      	<Table 
		      		columns={columns} 
		      		dataSource={this.state.diaoboList} 
		      		pagination={this.state.pagination}
		        	onChange={this.handleTableChange}
					title={() => '人员调拨历史'}
					scroll={{ y: "calc(100vh - 370px)", x: true }}
		      	/>
	      	</div>
    	);
  	}
}

export default App;
