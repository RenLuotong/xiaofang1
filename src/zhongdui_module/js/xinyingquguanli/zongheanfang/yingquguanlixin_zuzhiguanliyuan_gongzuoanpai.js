import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiangqing from './yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiangqing';
import yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixinzeng from './yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixinzeng';
import yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiugai from './yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiugai';
import {
    message,
    DatePicker,
    Icon,
    Input,
    Form,
    Button,
    Table,
    Divider,
    Select,
    Popconfirm,
    Modal,
    Popover
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
                    <Route path = {this.props.match.path +'/yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiangqing/:id/:nianfen/:zhouci'} component = {yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixinzeng'} component = {yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixinzeng} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiugai/:id/:nianfen/:zhouci'} component = {yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiugai} />
                </Switch>
            </div>
        );
    }
}

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            jiluList: [],
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
    //获取每周菜谱列表
    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        const THE = this;
        let nianfen = form.getFieldValue('nianfen');
        if (typeof(nianfen) == "undefined") {
            nianfen = '';
        }
        let zhouci = form.getFieldValue('zhouci');
        if (typeof(zhouci) == "undefined") {
            zhouci = '';
        }
        let page = params.page - 1;
        let size = params.rows;
        $.ajax({
            type:'Get',
            url: SERVER + "huoqvzhoupeidang?page="+page+"&size="+size+"&nianfen="+nianfen+"&zhouci="+zhouci,
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
                    jiluList: list,
                    pagination,
                });
            }
        });
    }

    //删除
    toDelete(id){
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER+"shanchuzhoupeidang?id="+id,
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



    componentDidMount() {
        this.fetch();

    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '年份',
            dataIndex: 'nianfen',
        },{
            title: '周次',
            dataIndex: 'zhouci',
        },  {
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                return (
                    <span>
                        <Link to={this.props.match.url+'/yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiangqing/' + record['id'] + '/'+ + record['nianfen'] + '/'+ + record['zhouci']} >详情</Link>
                        <Divider type="vertical"/>
                        <Link to={this.props.match.url+'/yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiugai/' + record['id'] + '/'+ + record['nianfen'] + '/'+ + record['zhouci']}>修改</Link>
                        <Divider type="vertical"/>
                        <Popconfirm placement="topLeft" title="确认要删除该周配档?" onConfirm={this.toDelete.bind(this, record['id'])} okText="确认" cancelText="取消">
                        <a>删除</a>
                        </Popconfirm>
                   </span>
                )
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="年份">
                        {getFieldDecorator('nianfen')(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="周次">
                        {getFieldDecorator('zhouci')(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button>
                            <Link
                                to={this.props.match.url + '/yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixinzeng'}><Icon
                                type="plus"/><span>新增周配档</span></Link>
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.jiluList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
