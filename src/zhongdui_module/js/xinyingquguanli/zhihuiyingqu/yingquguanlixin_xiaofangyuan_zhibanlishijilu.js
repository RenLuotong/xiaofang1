import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import yingquguanlixin_xiaofangyuan_zhibanlishijiluxiangqing from "./yingquguanlixin_xiaofangyuan_zhibanlishijiluxiangqing";
import yingquguanlixin_zhongduiganbu_zhibanlishijiluxinzeng from './yingquguanlixin_zhongduiganbu_zhibanlishijiluxinzeng';
import yingquguanlixin_zhongduiganbu_zhibanlishijiluxiangqing from "./yingquguanlixin_zhongduiganbu_zhibanlishijiluxiangqing";
import Yzjl from "./yingquguanlixin_zhibanguanliyuan_zhibanlishijilu";
import ZDJL from "./yingquguanlixin_zhongduiganbu_zhibanlishijilu";
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
    Popover, Tabs
} from 'antd';
import moment from 'moment';
import XLSX from "xlsx";
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
                    <Route path = {this.props.match.path +'/yingquguanlixin_xiaofangyuan_zhibanlishijiluxiangqing/:id'} component = {yingquguanlixin_xiaofangyuan_zhibanlishijiluxiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_zhibanlishijiluxinzeng'} component = {yingquguanlixin_zhongduiganbu_zhibanlishijiluxinzeng} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_zhibanlishijiluxiangqing/:id'} component = {yingquguanlixin_zhongduiganbu_zhibanlishijiluxiangqing} />
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
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            jiluList: [],
            startValue: null,
            endValue: null,
            activeKey:"1",
            showzuzhiyuangong:true,
            showzuzhilingdao:true,
            showzhibanguanliyuan:true,
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
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhiban/gerenGangshaozhibanLiebiao?page="+page+"&size="+size+"&chaxunqishishijian="+kaishishijian+"&chaxunjiezhishijian="+jieshushijian,
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

    //导出
    output() {
        let _headers = ['机构名称','营区名称','值班编号','计划值班开始时间','计划值班结束时间','计划1号值班人','计划2号值班人','实际1号值班人','实际1号上岗时间','实际1号下岗时间','实际2号值班人','实际2号上岗时间','实际2号下岗时间'];
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
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhiban/gerenGangshaozhibanLiebiao?page=0&size=10000&chaxunqishishijian="+kaishishijian+"&chaxunjiezhishijian="+jieshushijian,
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

    //控制tab页方法
    callback(key) {
        const THE = this;
        THE.setState({
            activeKey: key,
        });
    }

    componentWillUnmount() {
        View.pagination = this.state.pagination;
        View.activeKey = this.state.activeKey;
    }

    componentWillMount() {
        if(!View.activeKey){
            View.activeKey = '1';
        }
        const {pagination,activeKey} = View;
        this.setState({
            activeKey: activeKey,
        });
        if (typeof (pagination) !== "undefined") {
            this.setState({
                pagination: pagination,
            });
        }
        let jueselist = sessionStorage.getItem("jueselist");
        if(button_quanxian('showzuzhiyuangong',jueselist) === true){
            this.setState({
                showzuzhiyuangong: false,
            });
        };
        if(button_quanxian('showzuzhilingdao',jueselist) === true){
            this.setState({
                showzuzhilingdao: false,
            });
        };
        if(button_quanxian('showzhibanguanliyuan',jueselist) === true){
            this.setState({
                showzhibanguanliyuan: false,
            });
        };
    }

    componentDidMount() {
        this.fetch();
    }

    render() {

        const columns = [{
          title: 'id',
          dataIndex: 'id',
          colSpan : 0,
          className:'hidden_col',
          width: '10%'
        },{
          title: '计划1号值班人',
          dataIndex: 'extraJihuayihaozhibanrenXingming',
          width: '10%'
        },{
          title: '计划2号值班人',
          dataIndex: 'extraJihuaerhaozhibanrenXingming',
          width: '10%'
        },{
          title: '计划值班开始时间',
          dataIndex: 'jihuakaishishijian',
          width: '10%'
        },{
          title: '计划值班结束时间',
          dataIndex: 'jihuajieshushijian',
          width: '10%'
        },{
          title: '录入人姓名',
          dataIndex: 'chuangjiangrenxingming',
          width: '10%'
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record) => (
                <span>
                    <Link to={this.props.match.url+'/yingquguanlixin_xiaofangyuan_zhibanlishijiluxiangqing/'+ record['id'] }>详情</Link>
			    </span>
            ),
        },];

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
                <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                <Tabs.TabPane tab="组织员工" key="1" disabled={this.state.showzuzhiyuangong}>
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
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.jiluList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 405px)", x: true }}
                />
                </Tabs.TabPane>
                <Tabs.TabPane tab="组织领导" key="2" disabled={this.state.showzuzhilingdao}>
                    <ZDJL />
                </Tabs.TabPane>
                <Tabs.TabPane tab="值班管理员" key="3" disabled={this.state.showzhibanguanliyuan}>
                    <Yzjl />
                </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
