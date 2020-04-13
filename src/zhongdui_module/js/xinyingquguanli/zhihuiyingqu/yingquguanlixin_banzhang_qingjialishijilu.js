import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import XLSX from 'xlsx';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Select, Modal,
} from 'antd';
//import yingquguanlixin_banzhang_qingjialishijiluxinzeng from './yingquguanlixin_banzhang_qingjialishijiluxinzeng';
import moment from 'moment';
import yingquguanlixin_banzhang_qingjialishijiluxiangqing from './yingquguanlixin_banzhang_qingjialishijiluxiangqing';
const View = [];

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            visible: false,
        };
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                    {/*<Route path = {this.props.match.path +'/yingquguanlixin_banzhang_qingjialishijiluxinzeng/'} component = {yingquguanlixin_banzhang_qingjialishijiluxinzeng} />*/}
                    <Route path = {this.props.match.path +'/yingquguanlixin_banzhang_qingjialishijiluxiangqing/:shenqingdanbianhao'} component = {yingquguanlixin_banzhang_qingjialishijiluxiangqing} />
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
            startValue: null,
            endValue: null,
            shenpiList: [],
            shenpi:'',
            qingjialeixing:'',
            qingjialeixingList: [],
            shenpirenyuanList: [],
            shenqingdanbianhao:'',
            visible: false,
            shenpiren:'',
            instanceStateType:'',
            processBaseId:'',
        };
    }


    hideModal = () => {
        this.setState({
            visible: false,
            shenpirenyuanList: [],
            shenqingdanbianhao:'',
            shenpiren:'',
            instanceStateType:'',
            processBaseId:'',
        });
    }


    //获取审批list
    getshenpiList(value) {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquqingjiashenqingzhunagtaiMeiju",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    list.push(data.data[i]);
                }
                THE.setState({
                    shenpi:value,
                    shenpiList: list,
                });
            }
        });
    }

    //获取请假类型list
    getqingjialeixingList(value) {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquqingjialeixingMeiju",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    list.push(data.data[i]);
                }
                THE.setState({
                    qingjialeixing:value,
                    qingjialeixingList: list,
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

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
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
        let form=this.props.form;
        let qingjialeixing=this.state.qingjialeixing;
        if (typeof (qingjialeixing)=="undefined" || qingjialeixing == '-1'){
            qingjialeixing="";
        }
        let shenpi=this.state.shenpi;
        if (typeof (shenpi)=="undefined" || shenpi == '-1'){
            shenpi="";
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
        let qingjiarenxingming=form.getFieldValue('qingjiarenxingming');
        if (typeof (qingjiarenxingming)=="undefined"){
            qingjiarenxingming="";
        }
        let page = params.page - 1;
        let size = params.rows;
        let juese = '战斗班长';
        //组织排序字段
        let paixu = paixuzuzhi(params.sortField,params.sortOrder);
        $.ajax({
            type:'get',
            url: SERVER + "qingjiajiluchaxunByJuese?page="+page+"&size="+size+"&qingjiarenxingming="+qingjiarenxingming+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&juese="+juese+"&shenqingzhuangtai="+shenpi+"&qingjialeixing="+qingjialeixing+paixu,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["shenqingshijian"] = moment(data.data.content[i]["shenqingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["qingjiakaishishijian"] = moment(data.data.content[i]["qingjiakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["qingjiajieshushijian"] = moment(data.data.content[i]["qingjiajieshushijian"]).format('YYYY-MM-DD HH:mm:ss');
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

    output()  {
        let _headers = ['机构名称','营区名称','申请时间','申请人','计划请假时间','计划销假时间','请假类型','请假理由','审批状态']
        const THE = this;
        let form=this.props.form;
        let qingjialeixing=this.state.qingjialeixing;
        if (typeof (qingjialeixing)=="undefined" || qingjialeixing == '-1'){
            qingjialeixing="";
        }
        let shenpi=this.state.shenpi;
        if (typeof (shenpi)=="undefined" || shenpi == '-1'){
            shenpi="";
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
        let qingjiarenxingming=form.getFieldValue('qingjiarenxingming');
        if (typeof (qingjiarenxingming)=="undefined"){
            qingjiarenxingming="";
        }
        let juese = '战斗班长';
        //组织排序字段
        $.ajax({
            type:'get',
            url: SERVER + "qingjiajiluchaxunByJuese?paze=0&size=10000&qingjiarenxingming="+qingjiarenxingming+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&juese="+juese+"&shenqingzhuangtai="+shenpi+"&qingjialeixing="+qingjialeixing,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                    for (let i = 0; i < data.data.content.length; i++) {
                        data.data.content[i]["key"] = i;
                        data.data.content[i]["shenqingshijian"] = moment(data.data.content[i]["shenqingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                        data.data.content[i]["qingjiakaishishijian"] = moment(data.data.content[i]["qingjiakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                        data.data.content[i]["qingjiajieshushijian"] = moment(data.data.content[i]["qingjiajieshushijian"]).format('YYYY-MM-DD HH:mm:ss');
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
                    if (data.data.content[i]['shenqingshijian'] == null) {
                        obj['申请时间'] = '';
                    } else {
                        obj['申请时间'] = data.data.content[i]['shenqingshijian'];
                    }
                    if (data.data.content[i]['qingjiarenxingming'] == null) {
                        obj['申请人'] = '';
                    } else {
                        obj['申请人'] = data.data.content[i]['qingjiarenxingming'];
                    }
                    if (data.data.content[i]['qingjiakaishishijian'] == null) {
                        obj['计划请假时间'] = '';
                    } else {
                        obj['计划请假时间'] = data.data.content[i]['qingjiakaishishijian'];
                    }
                    if (data.data.content[i]['qingjiajieshushijian'] == null) {
                        obj['计划销假时间'] = '';
                    } else {
                        obj['计划销假时间'] = data.data.content[i]['qingjiajieshushijian'];
                    }
                    if (data.data.content[i]['qingjialeixing'] == null) {
                        obj['请假类型'] = '';
                    } else {
                        obj['请假类型'] = data.data.content[i]['qingjialeixing'];
                    }
                    if (data.data.content[i]['waichudidian'] == null) {
                        obj['外出地点'] = '';
                    } else {
                        obj['外出地点'] = data.data.content[i]['waichudidian'];
                    }
                        if (data.data.content[i]['qingjiazongshichang'] == null) {
                            obj['实际请假时长'] = '';
                        } else {
                            obj['实际请假时长'] = data.data.content[i]['qingjiazongshichang'];
                        }
                    if (data.data.content[i]['qingjiayuanyin'] == null) {
                        obj['请假理由'] = '';
                    } else {
                        obj['请假理由'] = data.data.content[i]['qingjiayuanyin'];
                    }
                    if (data.data.content[i]['shenqingzhuangtai'] == null) {
                        obj['审批状态'] = '';
                    } else {
                        obj['审批状态'] = data.data.content[i]['shenqingzhuangtai'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前请假历史记录没有数据！");
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
                XLSX.writeFile(wb, '请假历史记录.xlsx');
            }
        });

    }

    shenpirenyuanChang(value) {
        const THE = this;
        THE.setState({
            shenpiren: value,
        });
    }

    tongguo(shenqingdanbianhao,processBaseId) {
        const THE = this;
        let instanceStateType = 'PASSED';
        $.ajax({
            type:'GET',
            url: SERVER + "chaxunzhidingjueserenyuanBybanzhang?processBaseId="+processBaseId,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i].key = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    shenpirenyuanList: list,
                    shenqingdanbianhao:shenqingdanbianhao,
                    instanceStateType:instanceStateType,
                    processBaseId:processBaseId,
                    visible: true,
                });
            }
        });
    }

    // jujue(shenqingdanbianhao,processBaseId) {
    //     const THE = this;
    //     let instanceStateType = 'TERMINATED';
    //     $.ajax({
    //         type:'GET',
    //         url: SERVER + "chaxunzhidingjueserenyuanBybanzhang?processBaseId="+processBaseId,
    //         success: function (data) {
    //             let list = [];
    //             if (data.status != 0) {
    //                 message.warning(data.message);
    //                 return;
    //             }
    //             for (let i = 0; i < data.data.length; i++) {
    //                 data.data[i].key = i;
    //                 list.push(data.data[i]);
    //             }
    //             THE.setState({
    //                 shenpirenyuanList: list,
    //                 shenqingdanbianhao:shenqingdanbianhao,
    //                 instanceStateType:instanceStateType,
    //                 processBaseId:processBaseId,
    //                 visible: true,
    //             });
    //         }
    //     });
    // }

    jujue(shenqingdanbianhao,processBaseId) {
        const THE = this;
        let instanceStateType = 'TERMINATED';
        $.ajax({
            type:'POST',
            url: SERVER + "linshiqingjiashenpi?shenqingdanbianhao="+shenqingdanbianhao+"&instanceStateType="+instanceStateType+"&processBaseId="+processBaseId,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    shenqingdanbianhao:'',
                    instanceStateType:'',
                    processBaseId:'',
                });
                message.success("审批成功");
                THE.fetch();
            }
        });
    }

    tijiao() {
        const THE = this;
        let shenpirenbianhao = THE.state.shenpiren;
        if (typeof (shenpirenbianhao) == "undefined" || shenpirenbianhao == '' || shenpirenbianhao == null) {
            message.error("请选择审批人！");
            return;
        }
        let instanceStateType = THE.state.instanceStateType;
        let shenqingdanbianhao = THE.state.shenqingdanbianhao;
        let processBaseId = THE.state.processBaseId;
        $.ajax({
            type:'POST',
            url: SERVER + "linshiqingjiashenpi?shenqingdanbianhao="+shenqingdanbianhao+"&instanceStateType="+instanceStateType+"&shenpirenbianhao="+shenpirenbianhao+"&processBaseId="+processBaseId,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    shenpiren:'',
                    shenpirenyuanList: [],
                    shenqingdanbianhao:'',
                    instanceStateType:'',
                    processBaseId:'',
                    visible: false,
                });
                message.success("审批成功");
                THE.fetch();
            }
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
        this.getqingjialeixingList();
        this.getshenpiList();
    }

    render() {
        let shenpiOptions = this.state.shenpiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );
        let qingjialeixingOptions = this.state.qingjialeixingList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        let shenpirenyuanOptions = this.state.shenpirenyuanList.map(item =>
            <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col'
        },{
            title: '申请时间',
            dataIndex: 'shenqingshijian',
            sorter: true,
        }, {
            title: '申请人',
            dataIndex: 'qingjiarenxingming',
        },{
            title: '计划请假时间',
            dataIndex: 'qingjiakaishishijian',
            sorter: true,
        },{
            title: '计划销假时间',
            dataIndex: 'qingjiajieshushijian',
            sorter: true,
        },{
            title: '请假类型',
            dataIndex: 'qingjialeixing',
        },{
            title: '外出地点',
            dataIndex: 'waichudidian',
        },{
            title: '请假时长',
            dataIndex: 'qingjiazongshichang',
        },{
            title: '请假理由',
            dataIndex: 'qingjiayuanyin',
        },{
            title: '审批状态',
            dataIndex: 'shenqingzhuangtai',
        },{
            title: '审批人',
            dataIndex: 'pifurenxingming',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                if (record['shenqingzhuangtai'] == "申请中") {
                    return (
                        <span>
					      	<Popconfirm placement="topLeft" title="确认要通过这条请假申请?" onConfirm={this.tongguo.bind(this,record['shenqingdanbianhao'],record['processBaseId'])} okText="确认" cancelText="取消">
					        	<a>通过</a>
					    	</Popconfirm>
					    	<Divider type="vertical"/>
					    	<Popconfirm placement="topLeft" title="确认要拒绝这条请假申请?" onConfirm={this.jujue.bind(this,record['shenqingdanbianhao'],record['processBaseId'])}  okText="确认" cancelText="取消">
					        	<a>拒绝</a>
					    	</Popconfirm>
                            <Divider type="vertical"/>
                            <Link to={this.props.match.url+'/yingquguanlixin_banzhang_qingjialishijiluxiangqing/'+ record['shenqingdanbianhao'] }>详情</Link>
                       </span>
                    )
                }else if(record['shenqingzhuangtai'] == "已同意" || record['shenqingzhuangtai'] == "假期中" || record['shenqingzhuangtai'] == "已销假" || record['shenqingzhuangtai'] == "已超假" ){
                    return (
                        <span>
                        <a href={SERVER+'generateReport?shenqingdanbianhao='+record.shenqingdanbianhao} title="打印" target="_blank">打印</a>
                        <Divider type="vertical"/>
                        <Link to={this.props.match.url+'/yingquguanlixin_banzhang_qingjialishijiluxiangqing/'+ record['shenqingdanbianhao'] }>详情</Link>
                    </span>
                    )
                }else {
                    return (
                        <span>
                        <Link to={this.props.match.url+'/yingquguanlixin_banzhang_qingjialishijiluxiangqing/'+ record['shenqingdanbianhao'] }>详情</Link>
                    </span>
                    )
                }
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue,qingjialeixing,shenpi,shenpiren} = this.state;

        return (
            <div>
                <Modal
                    title="审批人选择"
                    visible={this.state.visible}
                    onOk={this.tijiao.bind(this)}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <label>审批人选择</label>
                    <Select style={{margin:5,width:200}} value={shenpiren} onChange={this.shenpirenyuanChang.bind(this)}>
                        {shenpirenyuanOptions}
                    </Select>
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
                    <FormItem label="申请人名称">
                        {getFieldDecorator('qingjiarenxingming',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="请假类型">
                        <Select style={{width: 200}} value={qingjialeixing} onChange={this.getqingjialeixingList.bind(this)}>
                            <Select.Option value="-1">全部</Select.Option>
                            {qingjialeixingOptions}
                        </Select>
                    </FormItem>
                    <FormItem label="审批状态">
                        <Select style={{width: 200}} value={shenpi} onChange={this.getshenpiList.bind(this)}>
                            <Select.Option value="-1">全部</Select.Option>
                            {shenpiOptions}
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search"/>查询
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.output.bind(this)}>
                            <Icon type="export" />导出
                        </Button>
                    </FormItem>
                    {/*<br/>
                    <FormItem>
                        <Button>
                            <Link to={this.props.match.url+'/yingquguanlixin_banzhang_qingjialishijiluxinzeng'}>
                                <Icon type="plus" /><span>录入轮休</span>
                            </Link>
                        </Button>
                    </FormItem>*/}
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