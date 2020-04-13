import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import shuiyuanxiugai from './shuiyuanxiugai';
import shuiyuanxiangqing from './shuiyuanxiangqing';
import shuiyuantianjia from './shuiyuantianjia';
import XLSX from 'xlsx';
import 'antd/dist/antd.css';
import {
	message,
  	Layout,
  	Menu,
  	Breadcrumb,
  	Icon,
  	Input,
  	Form,
  	Button,
  	Table,
  	Divider,
  	Popconfirm
} from 'antd';
import moment from 'moment';

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
			      	<Route path = {this.props.match.path +'/shuiyuanxiugai/:id'} component = {shuiyuanxiugai} />
					<Route path = {this.props.match.path +'/shuiyuanxiangqing/:id'} component = {shuiyuanxiangqing} />
					<Route path = {this.props.match.path +'/shuiyuantianjia'} component = {shuiyuantianjia} />
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
        current : 1,
        showQuickJumper: true,
        showSizeChanger: true
			},
			jueseList: [],
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
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
    const THE = this;
    	$.ajax({
            type:'get',
            url: SERVER + "chaxunshuiyuanliebiao?page="+page+"&size="+size,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
					if ( data.data.content[i]["jianchengriqi"] !== null &&  data.data.content[i]["jianchengriqi"] !== '') {
						data.data.content[i]["jianchengriqi"] = moment(data.data.content[i]["jianchengriqi"]).format('YYYY-MM-DD');
					}
                	list.push(data.data.content[i]);
                }

				const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    jueseList: list,
                    pagination,
                });
            }
        });
	}

	componentDidMount() {
		this.fetch();
	}

	toDelete(id) {
  		const THE = this;
    	$.ajax({
            type:'post',
            url: SERVER + "shanchushuiyuan?id=" + id,
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

  	render() {

  		const columns = [{
        title: 'id',
        dataIndex: 'id',
        colSpan : 0,
        className:'hidden_col',
        width: '5%'
      }, {
        title: '机构名称',
        dataIndex: 'zuzhijigoumingcheng',
        width: '5%'
      }, {
          title: '水源名称',
          dataIndex: 'mingcheng',
        width: '7%'
      }, {
        title: '可用状态',
        dataIndex: 'keyongzhuangtai',
        width: '5%'
      }, {
        title: '所属路段',
        dataIndex: 'suoshuluduan',
        width: '5%'
      }, {
        title: '分类',
        dataIndex: 'fenlei',
        width: '5%'
      }, {
        title: '类型',
        dataIndex: 'leixing',
        width: '5%'
      }, {
        title: '经度',
        dataIndex: 'dizhijingdu',
        width: '7%'
      }, {
        title: '纬度',
        dataIndex: 'dizhiweidu',
        width: '7%'
      }, {
        title: '供水单位',
        dataIndex: 'gongshuidanwei',
        width: '7%'
      }, {
        title: '建成日期',
        dataIndex: 'jianchengriqi',
        width: '7%'
      }, {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
            <Link to={this.props.match.url+'/shuiyuanxiangqing/'+record['id'] }>详情</Link>
                <Divider type="vertical" />
                <Link to={this.props.match.url+'/shuiyuanxiugai/'+record['id']}>修改</Link>
            <Divider type="vertical" />
                <Popconfirm placement="topLeft" title="确认要删除该水源?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
                  <a>删除</a>
              </Popconfirm>
            </span>
          ),
      }
      ];

	    return (
	      	<div>
		        <Button style={{margin:5}}>
					<Link to={this.props.match.url+'/shuiyuantianjia'}><Icon type="plus" /><span>添加水源</span></Link>
				</Button>
		        <Table
		        	columns={columns}
		        	dataSource={this.state.jueseList}
		        	pagination={this.state.pagination}
			        onChange={this.handleTableChange}
              scroll={{ y: "calc(100vh - 355px)", x: true }}
			    />
	      	</div>
	    );
  	}
}

export default Appmain;
