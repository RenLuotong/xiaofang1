import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import yingquguanlixin_banzhang_zhibanlishijiluxinzeng from './yingquguanlixin_banzhang_zhibanlishijiluxinzeng';
import yingquguanlixin_banzhang_zhibanlishijiluxiangqing from './yingquguanlixin_banzhang_zhibanlishijiluxiangqing';
import XLSX from 'xlsx';
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
const View = [];

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
                    <Route path = {this.props.match.path +'/yingquguanlixin_banzhang_zhibanlishijiluxinzeng'} component = {yingquguanlixin_banzhang_zhibanlishijiluxinzeng} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_banzhang_zhibanlishijiluxiangqing/:id'} component = {yingquguanlixin_banzhang_zhibanlishijiluxiangqing} />
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
            shenhezhuangtaiList: [],
        };
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD');
        }
        let shenhezhuangtai = form.getFieldValue('shenhezhuangtai');
        if (typeof(shenhezhuangtai) == "undefined"|| shenhezhuangtai == '-1') {
            shenhezhuangtai = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhiban/yingquGangshaozhibanLiebiao?page="+page+"&size="+size+"&chaxunqishishijian="+kaishishijian+"&chaxunjiezhishijian="+jieshushijian+"&auditStateType="+shenhezhuangtai+"&sort=jihuakaishishijian,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["jihuakaishishijian"] = moment(data.data.content[i]["jihuakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["jihuajieshushijian"] = moment(data.data.content[i]["jihuajieshushijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.content[i]["shenhezhuangtai"] == "Shenqingzhong"){
                        data.data.content[i]["shenhezhuangtai"] = '申请中'
                    }else if(data.data.content[i]["shenhezhuangtai"] == "Tongyi"){
                        data.data.content[i]["shenhezhuangtai"] = '同意'
                    }else if(data.data.content[i]["shenhezhuangtai"] == "Jujue"){
                        data.data.content[i]["shenhezhuangtai"] = '拒绝'
                    }
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
    //获取审批状态
    getshenhezhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhiban/huoquzhibanshenhezhuangtai",
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
                    shenhezhuangtaiList: list,
                });
            }
        });
    }
    //导出
    output() {
        let _headers = ['机构名称','营区名称','值班编号','审批状态','计划值班开始时间','计划值班结束时间','计划1号值班人','计划2号值班人','实际1号值班人','实际1号上岗时间','实际1号下岗时间','实际2号值班人','实际2号上岗时间','实际2号下岗时间'];
        let form = this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD');
        }
        let shenhezhuangtai = form.getFieldValue('shenhezhuangtai');
        if (typeof(shenhezhuangtai) == "undefined"|| shenhezhuangtai == '-1') {
            shenhezhuangtai = "";
        }
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhiban/yingquGangshaozhibanLiebiao?page=0&size=10000&chaxunqishishijian="+kaishishijian+"&chaxunjiezhishijian="+jieshushijian+"&auditStateType="+shenhezhuangtai+"&sort=jihuakaishishijian,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["jihuakaishishijian"] = moment(data.data.content[i]["jihuakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["jihuajieshushijian"] = moment(data.data.content[i]["jihuajieshushijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["shijiyihaoshanggangshijian"] = moment(data.data.content[i]["shijiyihaoshanggangshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["shijiyihaoxiagangshijian"] = moment(data.data.content[i]["shijiyihaoxiagangshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["shijierhaoshanggangshijian"] = moment(data.data.content[i]["shijierhaoshanggangshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["shijierhaoxiagangshijian"] = moment(data.data.content[i]["shijierhaoxiagangshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.content[i]["shenhezhuangtai"] == "Shenqingzhong"){
                        data.data.content[i]["shenhezhuangtai"] = '申请中'
                    }else if(data.data.content[i]["shenhezhuangtai"] == "Tongyi"){
                        data.data.content[i]["shenhezhuangtai"] = '同意'
                    }else if(data.data.content[i]["shenhezhuangtai"] == "Jujue"){
                        data.data.content[i]["shenhezhuangtai"] = '拒绝'
                    }
                    let obj={};
                    if (data.data.content[i]['jigoumingcheng'] == null) {
                        obj['机构名称'] = '';
                    } else {
                        obj['机构名称'] = data.data.content[i]['jigoumingcheng'];
                    }
                    if (data.data.content[i]['yingqumingcheng'] == null) {
                        obj['营区名称'] = '';
                    } else {
                        obj['营区名称'] = data.data.content[i]['yingqumingcheng'];
                    }
                    if (data.data.content[i]['zhibanbianhao'] == null) {
                        obj['值班编号'] = '';
                    } else {
                        obj['值班编号'] = data.data.content[i]['zhibanbianhao'];
                    }
                    // if (data.data.content[i]['shenhezhuangtai'] == null) {
                    //     obj['审批状态'] = '';
                    // } else {
                    //     obj['审批状态'] = data.data.content[i]['shenhezhuangtai'];
                    // }
                    if (data.data.content[i]['jihuakaishishijian'] == null) {
                        obj['计划值班开始时间'] = '';
                    } else {
                        obj['计划值班开始时间'] = data.data.content[i]['jihuakaishishijian'];
                    }
                    if (data.data.content[i]['jihuajieshushijian'] == null) {
                        obj['计划值班结束时间'] = '';
                    } else {
                        obj['计划值班结束时间'] = data.data.content[i]['jihuajieshushijian'];
                    }
                    if (data.data.content[i]['extraJihuayihaozhibanrenXingming'] == null) {
                        obj['计划1号值班人'] = '';
                    } else {
                        obj['计划1号值班人'] = data.data.content[i]['extraJihuayihaozhibanrenXingming'];
                    }
                    if (data.data.content[i]['extraJihuaerhaozhibanrenXingming'] == null) {
                        obj['计划2号值班人'] = '';
                    } else {
                        obj['计划2号值班人'] = data.data.content[i]['extraJihuaerhaozhibanrenXingming'];
                    }
                    if (data.data.content[i]['extraShijiyihaozhibanrenXingming'] == null) {
                        obj['实际1号值班人'] = '';
                    } else {
                        obj['实际1号值班人'] = data.data.content[i]['extraShijiyihaozhibanrenXingming'];
                    }
                    if (data.data.content[i]['shijiyihaoshanggangshijian'] == null) {
                        obj['实际1号上岗时间'] = '';
                    } else {
                        obj['实际1号上岗时间'] = data.data.content[i]['shijiyihaoshanggangshijian'];
                    }
                    if (data.data.content[i]['shijiyihaoxiagangshijian'] == null) {
                        obj['实际1号下岗时间'] = '';
                    } else {
                        obj['实际1号下岗时间'] = data.data.content[i]['shijiyihaoxiagangshijian'];
                    }
                    if (data.data.content[i]['extraShijierhaozhibanrenXingming'] == null) {
                        obj['实际2号值班人'] = '';
                    } else {
                        obj['实际2号值班人'] = data.data.content[i]['extraShijierhaozhibanrenXingming'];
                    }
                    if (data.data.content[i]['shijierhaoshanggangshijian'] == null) {
                        obj['实际2号上岗时间'] = '';
                    } else {
                        obj['实际2号上岗时间'] = data.data.content[i]['shijierhaoshanggangshijian'];
                    }
                    if (data.data.content[i]['shijierhaoxiagangshijian'] == null) {
                        obj['实际2号下岗时间'] = '';
                    } else {
                        obj['实际2号下岗时间'] = data.data.content[i]['shijierhaoxiagangshijian'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前值班记录没有数据！");
                    return;
                }

                let headers = _headers
                    .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

                let xmldata = _data
                    .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
                    .reduce((prev, next) => prev.concat(next))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

                // 合并 headers 和 data
                let output = Object.assign({}, headers, xmldata);
                // 获取所有单元格的位置
                let outputPos = Object.keys(output);
                // 计算出范围
                let ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

                // 构建 workbook 对象
                let wb = {
                    SheetNames: ['mySheet'],
                    Sheets: {
                        'mySheet': Object.assign({}, output, { '!ref': ref })
                    }
                };

                // 导出 Excel
                XLSX.writeFile(wb, '值班历史记录.xlsx');
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


    componentWillUnmount() {
        View.pagination = this.state.pagination;
    }

    componentWillMount() {
        const {pagination} = View;
        if (typeof (pagination) !== "undefined") {
            this.setState({
                pagination: pagination,
            });
        }

    }

    componentDidMount() {
        this.fetch();
        // this.getshenhezhuangtaiList();
    }

    render() {
        // let shenhezhuangtaiOptions = this.state.shenhezhuangtaiList.map(item =>
        //     <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        // );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '计划1号值班人',
            dataIndex: 'extraJihuayihaozhibanrenXingming',
        },{
            title: '计划2号值班人',
            dataIndex: 'extraJihuaerhaozhibanrenXingming',
        },{
            title: '计划值班开始时间',
            dataIndex: 'jihuakaishishijian',
        },{
            title: '计划值班结束时间',
            dataIndex: 'jihuajieshushijian',
        },{
            title: '录入人姓名',
            dataIndex: 'chuangjiangrenxingming',
        }

        // ,{
        //     title: '审批状态',
        //     dataIndex: 'shenhezhuangtai',
        // }

        , {
            title: '操作',
            render: (text, record) => (
                <span>
                    <Link to={this.props.match.url+'/yingquguanlixin_banzhang_zhibanlishijiluxiangqing/'+ record['id'] }>详情</Link>
			    </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        let kaishishijian = getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let renyuanbianhao = sessionStorage.getItem("renyuanbianhao");
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
                    {/*<FormItem label="审批状态">*/}
                    {/*    {getFieldDecorator('shenhezhuangtai')(*/}
                    {/*        <Select style={{width:200}}>*/}
                    {/*            <Select.Option value="-1">全部</Select.Option>*/}
                    {/*            {shenhezhuangtaiOptions}*/}
                    {/*        </Select>*/}
                    {/*    )}*/}
                    {/*</FormItem>*/}
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search"/>查询
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.output.bind(this)}>
                            <Icon type="export"/>导出EXCEL
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" >
                            <a href={SERVER+'tb_zhiban/shengchengyingquzhibanjilu?chaxunqishishijian='+kaishishijian+'&chaxunjiezhishijian='+jieshushijian+'&renyuanbianhao='+renyuanbianhao} title="导出PDF" target="_blank">导出PDF</a>
                        </Button>
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button>
                            <Link
                                to={this.props.match.url + '/yingquguanlixin_banzhang_zhibanlishijiluxinzeng'}><Icon
                                type="plus"/><span>新增值班安排</span></Link>
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
