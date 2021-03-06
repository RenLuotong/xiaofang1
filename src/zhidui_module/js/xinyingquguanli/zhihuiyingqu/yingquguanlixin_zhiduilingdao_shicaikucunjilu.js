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
    Popover, InputNumber
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
                showQuickJumper: true,
                showSizeChanger: true,
                current : 1
            },
            jiluList: [],
            jigoumingcheng: '',
            jigouList: [],
        };
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let form=this.props.form;
        let jigoumingcheng=this.state.jigoumingcheng;
        if (typeof (jigoumingcheng)=="undefined" || jigoumingcheng == '-1'){
            jigoumingcheng="";
        }
        let shicaimingcheng=form.getFieldValue('shicaimingcheng');
        if (typeof (shicaimingcheng)=="undefined"){
            shicaimingcheng="";
        }
        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        $.ajax({
            type:'get',
            url: SERVER + "chaxunshicaikucun/all?page="+page+"&size="+size+"&shicaimingcheng="+shicaimingcheng+"&yingqvbianhao="+jigoumingcheng,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["celiangshijian"] = moment(data.data.content[i]["celiangshijian"]).format('YYYY-MM-DD HH:mm:ss');
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


    getJigouList(value) {
        const THE = this;
        {
            $.ajax({
                type: 'GET',
                url: SERVER + "yingqvliebiao",
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
                        jigouList: list,
                        jigoumingcheng: value,
                    });
                }
            });
        }

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

    componentDidMount() {
        this.fetch();
        this.getJigouList();
    }

    render() {
        const jizhouOptions = this.state.jigouList.map(item => <Select.Option key={item['id']}
                                                                              value={item['yingqubianhao']}>{item['mingcheng']}</Select.Option>);

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
            width:"20%"
        },{
            title: '营区名称',
            dataIndex: 'yingqvmingcheng',
            width:"20%"
        }, {
            title: '食材名称',
            dataIndex: 'shicaimingcheng',
            width:"20%"
        },{
            title: '当前库存',
            dataIndex: 'shicaizhongliang',
            width:"20%"
        },{
            title: '警戒库存',
            dataIndex: 'gaojingyuzhi',
        }, {
            title: '测量时间',
            dataIndex: 'celiangshijian',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue,jigoumingcheng} = this.state;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="营区名称">
                        <Select style={{width: 200}} value={jigoumingcheng} onChange={this.getJigouList.bind(this)}>
                            <Select.Option value="-1">全部</Select.Option>
                            {jizhouOptions}
                        </Select>
                    </FormItem>
                    <FormItem label="食材名称">
                        {getFieldDecorator('shicaimingcheng',)(
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
                    dataSource={this.state.jiluList}
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
