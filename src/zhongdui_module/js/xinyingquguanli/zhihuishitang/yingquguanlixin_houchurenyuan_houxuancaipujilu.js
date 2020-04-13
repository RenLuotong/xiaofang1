import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import yingquguanlixin_houchurenyuan_houxuancaipujiluxiangqing from './yingquguanlixin_houchurenyuan_houxuancaipujiluxiangqing';
import yingquguanlixin_houchurenyuan_houxuancaipujiluxinzeng from './yingquguanlixin_houchurenyuan_houxuancaipujiluxinzeng';
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
                    <Route path = {this.props.match.path +'/yingquguanlixin_houchurenyuan_houxuancaipujiluxiangqing/:id'} component = {yingquguanlixin_houchurenyuan_houxuancaipujiluxiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_houchurenyuan_houxuancaipujiluxinzeng'} component = {yingquguanlixin_houchurenyuan_houxuancaipujiluxinzeng} />
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let nianfen = form.getFieldValue('nianfen');
        if (typeof(nianfen) == "undefined") {
            nianfen = "";
        }
        let zhouci = form.getFieldValue('zhouci');
        if (typeof(zhouci) == "undefined") {
            zhouci = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb-zhouhouxuan-zhubiaos?page="+page+"&size="+size+"&nianfen="+nianfen+"&zhouci="+zhouci,
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

    //删除候选菜谱
    toDelete(id){
        const THE = this;
        $.ajax({
            type : "POST",
            url : SERVER+"tb-zhouhouxuan-zhubiaos/"+id,
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
        },{
            title: '设置荤菜数量',
            dataIndex: 'huncaishuliang',
        },{
            title: '设置素菜数量',
            dataIndex: 'sucaishuliang',
        },{
            title: '设置大锅菜数量',
            dataIndex: 'daguocaishuliang',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                return (
                    <span>
                        <Link to={this.props.match.url+'/yingquguanlixin_houchurenyuan_houxuancaipujiluxiangqing/' + record['id'] }>详情</Link>
                        <Divider type="vertical" />
                        <Popconfirm placement="topLeft" title="确认要删除该候选菜谱?"
                                    onConfirm={this.toDelete.bind(this, record['id'])} okText="确认" cancelText="取消">
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
                            {getFieldDecorator('nianfen',)(
                                <Input style={{width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="周次">
                            {getFieldDecorator('zhouci',)(
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
                                to={this.props.match.url + '/yingquguanlixin_houchurenyuan_houxuancaipujiluxinzeng'}><Icon
                                type="plus"/><span>新增候选菜谱</span></Link>
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
