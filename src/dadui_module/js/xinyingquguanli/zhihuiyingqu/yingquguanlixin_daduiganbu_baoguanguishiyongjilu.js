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
            startValue: null,
            endValue: null,
            yingqumingcheng: '',
            yingquList: [],
        };
    }

    getyingquList(value) {
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
                        yingquList: list,
                        yingqumingcheng: value,
                    });
                }
            });
        }

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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let form=this.props.form;
        let yingqumingcheng=this.state.yingqumingcheng;
        if (typeof (yingqumingcheng)=="undefined" || yingqumingcheng == '-1'){
            yingqumingcheng="";
        }
        let baoguanguimingcheng=form.getFieldValue('baoguanguimingcheng');
        if (typeof (baoguanguimingcheng)=="undefined"){
            baoguanguimingcheng="";
        }
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian= form.getFieldValue('jieshushijian');
        if (typeof (jieshushijian)=="undefined"||jieshushijian==null){
            jieshushijian="";
        } else {
            jieshushijian=moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let shiyongrenmingcheng=form.getFieldValue('shiyongrenmingcheng');
        if (typeof (shiyongrenmingcheng)=="undefined"){
            shiyongrenmingcheng="";
        }
        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        $.ajax({
            type:'get',
            url: SERVER + "chaxunbaoguanguishiyongjilu/all?page="+page+"&size="+size+"&baoguanguimingcheng="+baoguanguimingcheng+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&shiyongrenxingming="+shiyongrenmingcheng+"&yingqvbianhao="+yingqumingcheng,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["shiyongshijian"] = moment(data.data.content[i]["shiyongshijian"]).format('YYYY-MM-DD HH:mm:ss');
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

    componentDidMount() {
        this.fetch();
        this.getyingquList();
    }

    render() {
        const yingquOptions = this.state.yingquList.map(item => <Select.Option key={item['id']}
                                                                              value={item['yingqubianhao']}>{item['mingcheng']}</Select.Option>);

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
            width:'25%'
        },{
            title: '营区名称',
            dataIndex: 'yingqvmingcheng',
            width:'25%'
        }, {
            title: '保管柜名称',
            dataIndex: 'baoguanguimingcheng',
            width:'25%'
        },{
            title: '使用时间',
            dataIndex: 'shiyongshijian',
        },{
            title: '使用人',
            dataIndex: 'shiyongrenxingming',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue,yingqumingcheng} = this.state;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
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
                    <FormItem label="结束时间&#12288;">
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
                    <FormItem label="使用人名称">
                        {getFieldDecorator('shiyongrenmingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="营区名称">
                        <Select style={{width: 200}} value={yingqumingcheng} onChange={this.getyingquList.bind(this)}>
                            <Select.Option value="-1">全部</Select.Option>
                            {yingquOptions}
                        </Select>
                    </FormItem>
                    <FormItem label="保管柜名称">
                        {getFieldDecorator('baoguanguimingcheng',)(
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
                    scroll={{ y: "calc(100vh - 410px)", x: true }}  
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
