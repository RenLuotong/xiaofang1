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
            caigouxiangqingList: [],
            zhubiaobianhao:this.props.match.params.zhubiaobianhao,
            shicaileixingList: [],
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let form = this.props.form;
        let zhubiaobianhao = THE.state.zhubiaobianhao;
        let shicaimingcheng = form.getFieldValue('shicaimingcheng');
        if (typeof(shicaimingcheng) == "undefined") {
            shicaimingcheng = "";
        }
        let shicaileixing = form.getFieldValue('shicaileixing');
        if (typeof(shicaileixing) == "undefined" || shicaileixing == '-1') {
            shicaileixing = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        $.ajax({
            type:'get',
            url: SERVER + "tbCaigouZhubiao/chakanmingxi?zhubiaobianhao="+zhubiaobianhao+"&page="+page+"&size="+size+"&mingcheng="+shicaimingcheng+"&leixing="+shicaileixing,
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
                    caigouxiangqingList: list,
                    pagination,
                });
            }
        });
    }

    //获取食材类型list
    getshicaileixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "chaxunshicaileixing?page=0&size=10000",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.content.length;i++){
                    list.push(data.data.content[i]);
                }
                THE.setState({
                    shicaileixingList: list,
                });
            }
        });
    }

    componentDidMount() {
        this.fetch();
        this.getshicaileixingList();
    }

    render() {

        let shicaileixingOptions = this.state.shicaileixingList.map(item =>
            <Select.Option key={item['key']} value={item['leixingmingcheng']}>{item['leixingmingcheng']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '食材名称',
            dataIndex: 'shicaimingcheng',
        },{
            title: '食材类型',
            dataIndex: 'shicaileixing',
        },  {
            title: '单位',
            dataIndex: 'danwei',
        },  {
            title: '采购数量',
            dataIndex: 'caigoushuliang',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="食材名称">
                        {getFieldDecorator('shicaimingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="食材类型">
                        {getFieldDecorator('shicaileixing',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {shicaileixingOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search"/>查询
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.caigouxiangqingList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
