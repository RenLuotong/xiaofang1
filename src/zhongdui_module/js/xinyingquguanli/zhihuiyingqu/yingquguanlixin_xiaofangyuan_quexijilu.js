import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Modal, Tabs
} from 'antd';
import moment from "moment";
import XLSX from "xlsx";
import ZDJL from "./yingquguanlixin_zhongduiganbu_quexijilu";
import Yzjl from "./yingquguanlixin_zhibanguanliyuan_quexijilu";
const { TextArea } = Input;
const View = [];
class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
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
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            visible: false,
            jiluList: [],
            startValue: null,
            endValue: null,
            activeKey:"1",
            showzuzhiyuangong:true,
            showzuzhilingdao:true,
            showzhibanguanliyuan:true,
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

    showModal = () => {
        this.setState({
            visible: true,
            liyou:'',

        });
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    tijiao(id) {
        this.setState({
            id: id,
            visible: true,
        })
    }

    tijiaoliyou() {
        const THE = this;
        let form = this.props.form;
        let id = THE.state.id;
        let liyou = form.getFieldValue('liyou');
        if (typeof (liyou) == "undefined"||liyou=='') {
            message.error("请输入缺岗理由！");return;
        }
        if (!confirm("确定提交！")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER+"tb_zhibanquexi/tijiaoquexiliyou?id="+id+"&liyou="+liyou,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("提交成功");
                THE.setState({
                    visible: false,

                });
                THE.props.form.setFieldsValue(
                    {
                        liyou: '',
                    }
                );
                THE.fetch();
            }
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
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhibanquexi/huoqugerenquexijilu?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["extraJihuakaishishijian"] = moment(data.data.content[i]["extraJihuakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["extraJihuajieshushijian"] = moment(data.data.content[i]["extraJihuajieshushijian"]).format('YYYY-MM-DD HH:mm:ss');
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
        let _headers = ['机构名称','营区名称','值班编号','计划值班开始时间','计划值班结束时间','缺岗理由']
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
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhibanquexi/huoqugerenquexijilu?page=0&size=10000&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["extraJihuakaishishijian"] = moment(data.data.content[i]["extraJihuakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["extraJihuajieshushijian"] = moment(data.data.content[i]["extraJihuajieshushijian"]).format('YYYY-MM-DD HH:mm:ss');
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
                    if (data.data.content[i]['extraJihuakaishishijian'] == null) {
                        obj['计划值班开始时间'] = '';
                    } else {
                        obj['计划值班开始时间'] = data.data.content[i]['extraJihuakaishishijian'];
                    }
                    if (data.data.content[i]['extraJihuajieshushijian'] == null) {
                        obj['计划值班结束时间'] = '';
                    } else {
                        obj['计划值班结束时间'] = data.data.content[i]['extraJihuajieshushijian'];
                    }
                    if (data.data.content[i]['quexiliyou'] == null) {
                        obj['缺岗理由'] = '';
                    } else {
                        obj['缺岗理由'] = data.data.content[i]['quexiliyou'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前缺岗记录没有数据！");
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
                XLSX.writeFile(wb, '缺岗记录.xlsx');
            }
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
            colSpan: 0,
            className: 'hidden_col',
          width: '10%'
        },{
            title: '计划值班开始时间',
            dataIndex: 'extraJihuakaishishijian',
          width: '10%'
        },{
            title: '计划值班结束时间',
            dataIndex: 'extraJihuajieshushijian',
          width: '10%'
        },{
            title: '缺岗理由',
            dataIndex: 'quexiliyou',
          width: '10%'
        },{
            title: '操作',
            render: (text, record) => (
                <span>
                    <a onClick={this.tijiao.bind(this,record['id'])}>理由</a>
			    </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue} = this.state;

        return (
            <div>
                <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                <Tabs.TabPane tab="组织员工" key="1" disabled={this.state.showzuzhiyuangong}>
                <Modal
                    title="提交缺岗理由"
                    visible={this.state.visible}
                    onOk={this.tijiaoliyou.bind(this)}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <FormItem label="缺岗理由">
                        {getFieldDecorator('liyou')(
                            <TextArea autosize={{minRows:3}}  style={{width:500}}/>
                        )}
                    </FormItem>
                </Modal>
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
                            <Icon type="export"/>导出
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.jiluList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 425px)", x: true }}
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