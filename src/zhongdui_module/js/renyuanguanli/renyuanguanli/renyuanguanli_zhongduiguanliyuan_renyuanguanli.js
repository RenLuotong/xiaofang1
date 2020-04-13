import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import renyuanguanli_zhongduiganbu_renyuanxiangqing from './renyuanguanli_zhongduiganbu_renyuanxiangqing.js';
import renyuanguanli_zhongduiganbu_renyuanxiugai from './renyuanguanli_zhongduiganbu_renyuanxiugai.js';
import renyuanguanli_zhongduiguanliyuan_renyuanmimaxiugai from "./renyuanguanli_zhongduiguanliyuan_renyuanmimaxiugai.js";
import renyuanguanli_zhongduiganbu_renyuantianjia from './renyuanguanli_zhongduiganbu_renyuantianjia.js';
import {
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
    message, Tree, Card,

} from 'antd';
import Orgtree from '../../../../common/components/OrgTree';
import TreeSideBar from '../../../../common/components/TreeSideBar';
let View = [];
const { TreeNode } = Tree;
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
                    <Route path = {this.props.match.path +'/renyuanguanli_zhongduiganbu_renyuanxiangqing/:id'} component = {renyuanguanli_zhongduiganbu_renyuanxiangqing} />
                    <Route path = {this.props.match.path +'/renyuanguanli_zhongduiganbu_renyuanxiugai/:id'} component = {renyuanguanli_zhongduiganbu_renyuanxiugai} />
                    <Route path = {this.props.match.path +'/renyuanguanli_zhongduiguanliyuan_renyuanmimaxiugai/:id'} component = {renyuanguanli_zhongduiguanliyuan_renyuanmimaxiugai} />
                    <Route path = {this.props.match.path +'/renyuanguanli_zhongduiganbu_renyuantianjia'} component = {renyuanguanli_zhongduiganbu_renyuantianjia} />
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
            renyuanList: [],
            zuzhijigouList:[],
            treeList:[],
        };
    }

    getTree() {
        const THE = this;
        $.ajax({
            type:'GET',
            url:SERVER+"zhiduiAlljigou",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                let treeList = THE.state.treeList;
                treeList.push(data.data);
                THE.setState({
                    treeList:treeList
                });
            }
        });
    }

    jigoudaima = ''
    onSelect = (e) => {
      if (e !== null) {
        this.jigoudaima = e;
        this.fetch();
      }
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item} icon={<Icon type="folder" />}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} icon={<Icon type="folder" />}/>;
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        if(JSON.stringify(View) != '{}'){
            form.setFieldsValue(View.fields);
            View = []
        }
        let chakanfanwei = form.getFieldValue('chakanfanwei');
        if (typeof(chakanfanwei) == "undefined"||chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let xingming = form.getFieldValue('xingming');
        if (typeof(xingming) == "undefined") {
            xingming = '';
        }
        let jigoudaima = this.jigoudaima;
        if (typeof(jigoudaima) == "undefined") {
            jigoudaima = '';
        }
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        //组织排序字段
        let paixu = paixuzuzhi(params.sortField,params.sortOrder);
        $.ajax({
            type:'get',
            url: SERVER + "diaoboRenyuanLiebiaoAll?chakanfanwei="+chakanfanwei+"&xingming="+xingming+"&page="+page+"&size="+size+"&jigoudaima="+jigoudaima+paixu,
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

    getZuzhijigouList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "allZhiduiZzjgXialaLiebiao",
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

    componentWillUnmount() {
        View.fields = this.props.form.getFieldsValue();
        View.pagination = this.state.pagination;
        View.jigoudaima = this.jigoudaima;
    }

    componentWillMount() {
        const {fields,pagination,jigoudaima} = View;
        if (typeof (pagination) !== "undefined") {
            this.setState({
                pagination: pagination,
            });
        }
        this.jigoudaima = jigoudaima;
    }

    componentDidMount() {
        this.getTree();
        this.getZuzhijigouList();
        this.fetch();
    }

    render() {

        const zuzhijigouList = this.state.zuzhijigouList.map(
            item => <Select.Option key={item['key']} value={item['jigoumingcheng']}>{item['jigoumingcheng']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
          width: '15%'
        },{
            title: '姓名',
            dataIndex: 'xingming',
          width: '15%'
        }, {
            title: '所属组织机构',
            dataIndex: 'jigoumingcheng',
            sorter: true,
          width: '15%'
        }, {
            title: '所属部门',
            dataIndex: 'suosubumen',
          width: '10%'
        }, {
            title: '性别',
            dataIndex: 'xingbiedaima',
          width: '10%'
        }, {
            title: '入伍时间',
            dataIndex: 'ruzhishijian',
          width: '10%'
        }, {
            title: '联系电话',
            dataIndex: 'yidongdianhua',
        }, {
            title: '操作',
            render: (text, record, index) => (
                <span>
			      	<Link to={this.props.match.url+'/renyuanguanli_zhongduiganbu_renyuanxiangqing/'+record['id'] }>详情</Link>
			      	<Divider type="vertical" />
			      	<Link to={this.props.match.url+'/renyuanguanli_zhongduiganbu_renyuanxiugai/'+record['id'] }>修改</Link>
			      	<Divider type="vertical" />
			      	<Popconfirm placement="topLeft" title="确认要删除该人员?" onConfirm={this.toDelete.bind(this,record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			      	<Divider type="vertical" />
			      	<Link to={this.props.match.url+'/renyuanguanli_zhongduiguanliyuan_renyuanmimaxiugai/'+record['id'] }>修改密码</Link>
			    </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
                <div id="chaxuntongji">
                    <TreeSideBar  onSelect={this.onSelect} />
                <div id="treeRight" style={{flex: '1'}}>
                    <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                        <FormItem label="姓名">
                            {getFieldDecorator('xingming')(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="查看范围">
                            {getFieldDecorator('chakanfanwei',{initialValue: "-1"})(
                                <Select style={{margin:5,width:200}}>
                                    <Select.Option value="-1">管辖范围</Select.Option>
                                    <Select.Option value="所属范围">所属范围</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                                <Icon type="search" />查询
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Button>
                                <Link to={this.props.match.url+'/renyuanguanli_zhongduiganbu_renyuantianjia'}><Icon type="plus" /><span>人员添加</span></Link>
                            </Button>
                        </FormItem>
                    </Form>
                    <Table
                        columns={columns}
                        dataSource={this.state.renyuanList}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                        scroll={{ y: "calc(100vh - 355px)", x: true }}
                    />
                </div>
            </div>
        );
    }
}
const AppComp = Form.create()(App);

export default Appmain;
