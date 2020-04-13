import React, { Component } from 'react';
import {message, Button, Table, Form, Select, DatePicker, Icon, Tabs, Card, Input, Tag} from 'antd';
import {Link, Route ,Switch} from 'react-router-dom';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

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
            startValue: null,
            endValue: null,
            defaultStarDate: null,
            defaultEndDate: null,
            renyuanchujingList: [],
            cheliangbianhao:this.props.match.params.cheliangbianhao,
        };
    }

    gettianshu() {
        const THE = this;
        var curDate = new Date();
        var year = curDate.getFullYear();
        var month = curDate.getMonth();
        var date = curDate.getDate();
        for (var k = 1; k <= date; k++) {
            var defaultStarDate = new Date(year, month, 1);
            var defaultEndDate = new Date(year, month, date);
            defaultStarDate = moment(defaultStarDate).format('YYYY-MM-DD');
            defaultEndDate = moment(defaultEndDate).format('YYYY-MM-DD');
        }
        THE.setState({
            defaultStarDate: defaultStarDate,
            defaultEndDate: defaultEndDate,
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = moment(this.state.defaultStarDate).format('YYYY-MM-DD 00:00:00');
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = moment(this.state.defaultEndDate).format('YYYY-MM-DD 23:59:59');
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        let cheliangbianhao = THE.state.cheliangbianhao;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquchujingjiluBychelaingbianhao?page="+page+"&size="+size+"&cheliangbinahao="+cheliangbianhao+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&sort=id,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if (data.data.content[i]["chujingkaishishijian"] != null) {
                        data.data.content[i]["chujingkaishishijian"] = moment(data.data.content[i]['chujingkaishishijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data.content[i]["chujingwanchengshijian"] != null) {
                        data.data.content[i]["chujingwanchengshijian"] = moment(data.data.content[i]['chujingwanchengshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    kucunshenqingList: list,
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

    componentWillMount(){
        this.gettianshu();
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
        }, {
            title: '出警开始时间',
            dataIndex: 'chujingkaishishijian',
        },{
            title: '出警结束时间',
            dataIndex: 'chujingwanchengshijian',
        }, {
            title: '出警类型',
            dataIndex: 'chujingleixing',
        }, {
            title: '灾害地址',
            dataIndex: 'zaihaidizhi',
        },{
            title: '随车人员',
            dataIndex: 'suicherenyuan',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue,defaultStarDate,defaultEndDate} = this.state;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="开始时间">
                        {getFieldDecorator('kaishishijian')(
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                value={startValue}
                                placeholder={defaultStarDate}
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
                                placeholder={defaultEndDate}
                                format="YYYY-MM-DD"
                                onChange={this.onEndChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />搜索
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.kucunshenqingList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
