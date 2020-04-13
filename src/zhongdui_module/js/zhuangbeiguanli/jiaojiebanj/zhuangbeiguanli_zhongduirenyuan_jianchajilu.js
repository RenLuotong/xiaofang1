import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import zhuangbeiguanli_zhongduirenyuan_jianchajiluxiangqing from './zhuangbeiguanli_zhongduirenyuan_jianchajiluxiangqing';
import moment from 'moment';
import { message, Icon, Button, Table, Form, Input, Radio,DatePicker ,Tabs,} from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


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
                    <Route path = {this.props.match.path +'/zhuangbeiguanli_zhongduirenyuan_jianchajiluxiangqing/:id/:jianchaleixing'} component = {zhuangbeiguanli_zhongduirenyuan_jianchajiluxiangqing} />
                </Switch>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            pagination2: {
                pageSize : 10,
                current : 1
            },
            startValue: null,
            endValue: null,
            startValue2: null,
            endValue2: null,
            activeKey:"1",
            jiaojiebaninfoList: [],
            zhouqingchainfoList:[],
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
    disabledStartDate2 = (startValue) => {
        const endValue = this.state.endValue2;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    disabledEndDate2 = (endValue) => {
        const startValue = this.state.startValue2;
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

    onStartChange2 = (value) => {
        this.onChange('startValue2', value);
    }
    onEndChange2 = (value) => {
        this.onChange('endValue2', value);
    }

    search() {
        const pager = {...this.state.pagination};
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pager.pageSize,
            page: pager.current,
        });
    }

    search2() {
        const pager = {...this.state.pagination2};
        pager.current = 1;
        this.setState({
            pagination2: pager,
        });
        this.fetch2({
            rows: pager.pageSize,
            page: pager.current,
        });
    }

    callback(key) {
        const THE = this;
        THE.setState({
            activeKey: key,
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

    handleTableChange2 = (pagination) => {
        const pager = { ...this.state.pagination2 };
        pager.current = pagination.current;
        this.setState({
            pagination2: pager,
        });
        this.fetch2({
            rows: pagination.pageSize,
            page: pagination.current,
        });
    }


    fetch = (params = {
    	rows: this.state.pagination.pageSize,
        page: this.state.pagination.current
    }) => {
    	let timeType = this.timeType;
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
        let juese = '中队长';
        let jianchaleixing = '交接班检查';
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
		$.ajax({
            type:'get',
            url: SERVER + "zhuangbeijianchajiluList?juese="+juese
                +"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&page="+page+"&size="+size+"&jianchaleixing="+jianchaleixing+"&sort=jianchashijian,desc",
            success: function (data) {
                let list = [];
                let jianchajindu = {};
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.data.length; i++) {
                    data.data.data[i]["key"] = i;
                    if (data.data.data[i]["kaishishijian"] != null) {
                    	data.data.data[i]["kaishishijian"] = moment(data.data.data[i]["kaishishijian"]).format('YYYY-MM-DD');
                    }
                    if (data.data.data[i]["jieshushijian"] != null) {
                    	data.data.data[i]["jieshushijian"] = moment(data.data.data[i]["jieshushijian"]).format('YYYY-MM-DD');
                    }
                    if (data.data.data[i]["jianchashuliang"] != null && data.data.data[i]["kucunzhuangbeishuliang"] != null) {
                        data.data.data[i]["jianchajindu"] = Math.round(data.data.data[i]["jianchashuliang"] / data.data.data[i]["kucunzhuangbeishuliang"] * 10000) / 100.00 + "%";
                    }
                    if(data.data.data[i]['jianchaleixing'] == "交接班检查"){
                        list.push(data.data.data[i]);
                    }
                }
                console.info(list)
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.total;
                THE.setState({
                    jiaojiebaninfoList: list,
                    pagination,
                });
            }
        });
    }

    fetch2 = (params = {
    	rows: this.state.pagination2.pageSize,
        page: this.state.pagination2.current
    }) => {
    	let timeType = this.timeType;
    	let form = this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian2');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian2');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let juese = '中队长';
        let jianchaleixing = '周清查';
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
		$.ajax({
            type:'get',
            url: SERVER + "zhuangbeijianchajiluList?juese="+juese
                +"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&page="+page+"&size="+size+"&jianchaleixing="+jianchaleixing+"&sort=jianchashijian,desc",
            success: function (data) {
                let list = [];
                let jianchajindu = {};
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.data.length; i++) {
                    data.data.data[i]["key"] = i;
                    if (data.data.data[i]["kaishishijian"] != null) {
                    	data.data.data[i]["kaishishijian"] = moment(data.data.data[i]["kaishishijian"]).format('YYYY-MM-DD');
                    }
                    if (data.data.data[i]["jieshushijian"] != null) {
                    	data.data.data[i]["jieshushijian"] = moment(data.data.data[i]["jieshushijian"]).format('YYYY-MM-DD');
                    }
                    if (data.data.data[i]["jianchashuliang"] != null && data.data.data[i]["kucunzhuangbeishuliang"] != null) {
                        data.data.data[i]["jianchajindu"] = Math.round(data.data.data[i]["jianchashuliang"] / data.data.data[i]["kucunzhuangbeishuliang"] * 10000) / 100.00 + "%";
                    }
                    if(data.data.data[i]['jianchaleixing'] == "周清查"){
                        list.push(data.data.data[i]);
                    }
                }
                console.info(list)
                const pagination2 = { ...THE.state.pagination2 };
                pagination2.total = data.data.total;
                THE.setState({
                    zhouqingchainfoList:list,
                    pagination2,
                });
            }
        });
    }

    componentDidMount() {
        this.fetch();
        this.fetch2();
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '中队名称',
            dataIndex: 'jigoumingcheng',
        },{
            title: '检查人',
            dataIndex: 'jiancharen',
        }, {
            title: '检查时间',
            dataIndex: 'jianchariqi',
        },{
            title: '应检查数量',
            dataIndex: 'kucunzhuangbeishuliang',
        },{
            title: '检查数量',
            dataIndex: 'jianchashuliang',
        }, {
            title: '检查进度',
            dataIndex: 'jianchajindu',
        },{
            title: '有问题数量',
            dataIndex: 'zhuangbeisunhuaishuliang',
        },{
            title: '检查类型',
            dataIndex: 'jianchaleixing',
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
			      	<Link to={this.props.match.url+'/zhuangbeiguanli_zhongduirenyuan_jianchajiluxiangqing/'+record['id']+'/'+record['jianchaleixing'] }>详情</Link>
			    </span>
            ),
        }];

        const {getFieldDecorator} = this.props.form;
        const { startValue, endValue,startValue2, endValue2} = this.state;

        return (
            <div>
                <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                <Tabs.TabPane tab="交接班检查" key="1">
                <Form layout="inline" style={{margin: 5}}>
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
                        <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.jiaojiebaninfoList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
                </Tabs.TabPane>
                <Tabs.TabPane tab="周清查" key="2">
                <Form layout="inline" style={{margin: 5}}>
                    <FormItem label="开始时间">
                        {getFieldDecorator('kaishishijian2')(
                            <DatePicker
                                disabledDate={this.disabledStartDate2}
                                value={startValue2}
                                placeholder="开始时间"
                                format="YYYY-MM-DD"
                                onChange={this.onStartChange2}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="结束时间">
                        {getFieldDecorator('jieshushijian2')(
                            <DatePicker
                                disabledDate={this.disabledEndDate2}
                                value={endValue2}
                                placeholder="结束时间"
                                format="YYYY-MM-DD"
                                onChange={this.onEndChange2}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.search2.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.zhouqingchainfoList}
                    pagination={this.state.pagination2}
                    onChange={this.handleTableChange2}
                />
                </Tabs.TabPane>
                </Tabs>

            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
