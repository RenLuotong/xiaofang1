import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Modal, Select
} from 'antd';
import moment from "moment";
import XLSX from "xlsx";
const { TextArea } = Input;

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                current : 1
            },
        };
    }

    render(){
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

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            jiluList: [],
            jigoumingcheng: '',
            jigouList: [],
            startValue: null,
            endValue: null,
        };
    }

    //开始时间截止时间
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }
    onEndChange = (value) => {
        this.onChange('endValue', value);
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
        let form = this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let jigoumingcheng=this.state.jigoumingcheng;
        if (typeof (jigoumingcheng)=="undefined" || jigoumingcheng == '-1'){
            jigoumingcheng="";
        }
        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "shoujiguankong/daduiShoujigaojing?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&yingqubianhao="+jigoumingcheng+"&sort=gaojingshijian,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["gaojingshijian"] = moment(data.data.content[i]["gaojingshijian"]).format('YYYY-MM-DD HH:mm:ss');
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
            colSpan: 0,
            className: 'hidden_col'
        },{
            title: '营区名称',
            dataIndex: 'yingqumingcheng',
        }, {
            title: '设备ID',
            dataIndex: 'devId',
        },{
            title: '设备名称',
            dataIndex: 'name',
        },{
            title: '区域名称',
            dataIndex: 'roomName',
        },{
            title: '告警时间',
            dataIndex: 'gaojingshijian',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue,jigoumingcheng} = this.state;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="营区名称">
                        <Select style={{width: 200}} value={jigoumingcheng} onChange={this.getJigouList.bind(this)}>
                            <Select.Option value="-1">全部</Select.Option>
                            {jizhouOptions}
                        </Select>
                    </FormItem>
                    <FormItem label="开始时间">
                        {getFieldDecorator('kaishishijian')(
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                value={startValue}
                                placeholder="开始时间"
                                format="YYYY-MM-DD"
                                onChange={this.onStartChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="结束时间">
                        {getFieldDecorator('jieshushijian')(
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                value={endValue}
                                placeholder="结束时间"
                                format="YYYY-MM-DD"
                                onChange={this.onEndChange}
                                style={{width:200}}
                            />
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