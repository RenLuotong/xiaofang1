import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import yingquguanlixin_houchurenyuan_xiaodujiluxiangqing from './yingquguanlixin_houchurenyuan_xiaodujiluxiangqing';
import yingquguanlixin_houchurenyuan_xiaodujiluxinzeng from './yingquguanlixin_houchurenyuan_xiaodujiluxinzeng';
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
import moment from 'moment';


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
                    <Route path = {this.props.match.path +'/yingquguanlixin_houchurenyuan_xiaodujiluxiangqing/:id'} component = {yingquguanlixin_houchurenyuan_xiaodujiluxiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_houchurenyuan_xiaodujiluxinzeng'} component = {yingquguanlixin_houchurenyuan_xiaodujiluxinzeng} />
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
            startValue: null,
            endValue: null,
        };
    }
    //获取消毒记录
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
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "chaxunxiaodujilu?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["xiaodushijian"] = moment(data.data.content[i]["xiaodushijian"]).format('YYYY-MM-DD HH:mm:ss');
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
            title: '消毒时间',
            dataIndex: 'xiaodushijian',
        },{
            title: '消毒人姓名',
            dataIndex: 'xiaodurenxingming',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                return (
                    <span>
                          	<Link to={this.props.match.url+'/yingquguanlixin_houchurenyuan_xiaodujiluxiangqing/' + record['id'] }>详情</Link>
                       </span>
                )
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue} = this.state;

            return (
                <div>
                    <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
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
                        <br/>
                        <FormItem>
                            <Button>
                                <Link
                                    to={this.props.match.url + '/yingquguanlixin_houchurenyuan_xiaodujiluxinzeng'}><Icon
                                    type="plus"/><span>新增消毒记录</span></Link>
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
