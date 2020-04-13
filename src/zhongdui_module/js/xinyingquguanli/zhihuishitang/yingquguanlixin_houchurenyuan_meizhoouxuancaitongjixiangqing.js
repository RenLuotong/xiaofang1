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
            xuancaiList: [],
            id:this.props.match.params.id,
            caipinleixingList: [],
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
        let id = THE.state.id;
        let caipinmingcheng = form.getFieldValue('caipinmingcheng');
        if (typeof(caipinmingcheng) == "undefined") {
            caipinmingcheng = "";
        }
        let caipinleixing = form.getFieldValue('caipinleixing');
        if (typeof(caipinleixing) == "undefined" || caipinleixing == '-1') {
            caipinleixing = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        $.ajax({
            type:'get',
            url: SERVER + "tb-diancaitongji-mingxis/huoqumingxi?zhubiaoId="+id+"&caipinmingcheng="+caipinmingcheng+"&caipinLeixing="+caipinleixing+"&page="+page+"&size="+size,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if(data.data.content[i]["caipinleixing"] == 'Huncai'){
                        data.data.content[i]["caipinleixing"] = '荤菜'
                    }else if(data.data.content[i]["caipinleixing"] == 'Sucai'){
                        data.data.content[i]["caipinleixing"] = '素菜'
                    }else if(data.data.content[i]["caipinleixing"] == 'Daguocai'){
                        data.data.content[i]["caipinleixing"] = '大锅菜'
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    xuancaiList: list,
                    pagination,
                });
            }
        });
    }

    //获取菜品类型list
    getcaipinleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tbCaipinLeixing/findAllList",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    list.push(data.data[i]);
                }
                THE.setState({
                    caipinleixingList: list,
                });
            }
        });
    }

    componentDidMount() {
        this.fetch();
        this.getcaipinleixingList();
    }

    render() {

        let caipinleixingOptions = this.state.caipinleixingList.map(item =>
            <Select.Option key={item['key']} value={item['mingcheng']}>{item['mingcheng']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '菜品',
            dataIndex: 'caipinmingcheng',
        },{
            title: '菜品类型',
            dataIndex: 'caipinleixing',
        },  {
            title: '点击量',
            dataIndex: 'caipindianxuancishu',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="选菜名称">
                        {getFieldDecorator('caipinmingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="选菜类型">
                        {getFieldDecorator('caipinleixing',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {caipinleixingOptions}
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
                    dataSource={this.state.xuancaiList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
