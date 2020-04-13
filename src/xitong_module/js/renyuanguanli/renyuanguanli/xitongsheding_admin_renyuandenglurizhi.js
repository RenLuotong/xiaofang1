import React from 'react';
import ReactDOM from 'react-dom';
import { Route ,Switch, Link } from 'react-router-dom'
import moment from 'moment';
import { Form, message, Button, Table, Input, Select, Icon } from 'antd';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			pagination: {
				showQuickJumper: true,
				showSizeChanger: true,
				current : 1
			},
			dengluList: [],
			zuzhijigouList: [],
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
        let jigoumingcheng = form.getFieldValue('jigoumingcheng');
        if (typeof(jigoumingcheng) == "undefined"||jigoumingcheng == "-1") {
        	jigoumingcheng = '';
        }
        let xingming = form.getFieldValue('xingming');
        if (typeof(xingming) == "undefined") {
        	xingming = '';
        }
        let page = params.page - 1;
		let size = params.rows===undefined?10:params.rows;
        const THE = this;
    	$.ajax({
            type:'get',
            url: SERVER + "denglurizhiLiebiao?xingming="+xingming+"&jigoumingcheng="+jigoumingcheng+"&page="+page+"&size="+size+"&sort=denglushijian,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]['denglushijian'] = moment(data.data.content[i]['denglushijian']).format('YYYY-MM-DD HH:mm:ss');
            		list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    dengluList: list,
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
	
	getZuzhijigouList() {
		const THE = this;
    	$.ajax({
            type:'GET',
            url: SERVER + "allZuzhijigouXialaLiebiao",
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
                    zuzhijigouList: list,
                });
            }
        });
	}
	
  	componentDidMount() {
		this.fetch();
		this.getZuzhijigouList();
	}

  	render() {
  		
  		let zuzhijigouList = this.state.zuzhijigouList.map(item => <Select.Option key={item['key']} value={item['jigoumingcheng']}>{item['jigoumingcheng']}</Select.Option>); 
  	
		const columns = [{
			title: 'id',
			dataIndex: 'id',
			colSpan : 0,
			className:'hidden_col',
			width:'25%'
		},{
		  	title: '人员姓名',
			  dataIndex: 'xingming',
			  width:'25%'
		}, {
		  	title: '所属组织机构',
			  dataIndex: 'jigoumingcheng',
			  width:'25%'
		}, {
		  	title: '所属部门',
		  	dataIndex: 'bumenmingcheng',
		}, {
		  	title: '登录时间',
		  	dataIndex: 'denglushijian',
		}];

		const FormItem = Form.Item;
		const { getFieldDecorator } = this.props.form;

    	return (
	      	<div>
				<div>
		     	<Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
	        		<FormItem label="组织机构">
		  				{getFieldDecorator('jigoumingcheng',{initialValue: "-1"})(
		    				<Select style={{width:200}} >
	      			  			<Select.Option value="-1">全部</Select.Option>
	      			  			{zuzhijigouList}
				      		</Select>
		  				)}
					</FormItem>
	        		<FormItem label="姓名">
		      			{getFieldDecorator('xingming')(
		        			<Input style={{width:200}}/>
		      			)}
		    		</FormItem>
					<FormItem>
			            <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
			                <Icon type="search" />查询
			            </Button>
					</FormItem>
	    		</Form>
		      	<Table 
		      		columns={columns} 
		      		dataSource={this.state.dengluList} 
		      		pagination={this.state.pagination}
					onChange={this.handleTableChange}
					scroll={{ y: "calc(100vh - 342px)", x: true }}
		      	/>
				</div>
	      	</div>
    	);
  	}
}
const AppComp = Form.create()(App);
export default AppComp;
