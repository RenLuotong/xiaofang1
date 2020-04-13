import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import moment from 'moment';
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
import yingquguanlixin_xiaofangyuan_chayuezhishiwenzhangxiangqing from './yingquguanlixin_xiaofangyuan_chayuezhishiwenzhangxiangqing';
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
                    <Route path = {this.props.match.path +'/yingquguanlixin_xiaofangyuan_chayuezhishiwenzhangxiangqing/:bianhao'} component = {yingquguanlixin_xiaofangyuan_chayuezhishiwenzhangxiangqing} />
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
            wenzhangList: [],
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
    //获取知识库栏目列表
    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let form=this.props.form;
        let lanmumingcheng=form.getFieldValue('lanmumingcheng');
        if (typeof (lanmumingcheng)=="undefined"){
            lanmumingcheng="";
        }
        let page = params.page - 1;
        let size = params.rows;
        $.ajax({
            type:'get',
            url: SERVER + "tb-lanmus/getLanmus?page="+page+"&size="+size+"&mingcheng="+lanmumingcheng,
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
                    wenzhangList: list,
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
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: 'bianhao',
            dataIndex: 'bianhao',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '栏目名称',
            dataIndex: 'mingcheng',
        },{
            title: '栏目描述',
            dataIndex: 'miaoshu',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                return (
                    <span>
                           <Link to={this.props.match.url + '/yingquguanlixin_xiaofangyuan_chayuezhishiwenzhangxiangqing/' + record['bianhao']}>详情</Link>
                       </span>
                )
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="栏目名称">
                        {getFieldDecorator('lanmumingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.wenzhangList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
