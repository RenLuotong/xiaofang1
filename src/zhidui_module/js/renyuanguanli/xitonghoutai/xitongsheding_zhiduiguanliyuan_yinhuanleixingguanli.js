import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import {
    message,
    Popconfirm,
    Button,
    Table, Form, Divider
} from 'antd';
import xitongsheding_zhiduiguanliyuan_yinhuanleixingtianjia
    from "./xitongsheding_zhiduiguanliyuan_yinhuanleixingtianjia";
import xitongsheding_zhiduiguanliyuan_yinhuanleixingxiugai
    from "./xitongsheding_zhiduiguanliyuan_yinhuanleixingxiugai";

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
                    <Route path = {this.props.match.path +'/xitongsheding_zhiduiguanliyuan_yinhuanleixingtianjia'} component = {xitongsheding_zhiduiguanliyuan_yinhuanleixingtianjia} />
                    <Route path = {this.props.match.path +'/xitongsheding_zhiduiguanliyuan_yinhuanleixingxiugai/:id'} component = {xitongsheding_zhiduiguanliyuan_yinhuanleixingxiugai} />
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
            yinhuanleixingList: [],
        };
    }

    toDelete(id) {
        const THE = this;
        $.ajax({
            type : "POST",
            url : SERVER+"deleteguigexinghao?id=" + id,
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
    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "chaxunYinhuanleibie?page="+page+"&size="+size,
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
                    yinhuanleixingList: list,
                    pagination,
                });
            }
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
            title: '隐患类型',
            dataIndex: 'leixingzhi',
        }, {
            title: '操作',
            render: (text, record, index) => (
                <span>
			      	<Popconfirm placement="topLeft" title="确认要删除此隐患类型?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
                    <Divider type="vertical" />
                     <Link to={this.props.match.url+'/xitongsheding_zhiduiguanliyuan_yinhuanleixingxiugai/'+record['id'] }>修改</Link>
			    </span>
            ),
        }];

        return (
            <div>
                <Link to={this.props.match.url+'/xitongsheding_zhiduiguanliyuan_yinhuanleixingtianjia'}>
                    <Button type="primary" style={{margin:5}}>新增隐患类型</Button>
                </Link>
                <Table
                    columns={columns}
                    dataSource={this.state.yinhuanleixingList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 370px)", x: true }}
                />
            </div>
        );
    }
}
const AppComp = Form.create()(App);
export default Appmain;
