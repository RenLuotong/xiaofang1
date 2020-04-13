import React, {Component} from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import XLSX from 'xlsx';
import {
    DatePicker,
    Icon,
    Input,
    Form,
    Button,
    Table,
    message, Select, Divider, Popconfirm
} from 'antd';
import {Link, Route, Switch} from "react-router-dom";
import yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing from './yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing';
import yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang from './yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang';

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
                    <Route path = {this.props.match.path +'/yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing/:chepaihaoma/:paichekaishishijian/:paichejieshushijian'} component = {yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang/:shenqingdanbianhao'} component = {yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang} />
                </Switch>
            </div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            pagination: {
                pageSize : 10,
                current : 1
            },
            cheliangtongxingList:[],
            shidouchaoqiList: [],
            shenpizhuangtaiList: [],
        };
    }

    getshidouchaoqiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquShifouChaoqiMeiju",
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
                    shidouchaoqiList: list,
                });
            }
        });
    }

    getshenpizhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquGongwucheshenpimeijuMeiju",
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
                    shenpizhuangtaiList: list,
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let chepaihaoma = form.getFieldValue('chepaihaoma');
        if (typeof(chepaihaoma) == "undefined"||chepaihaoma == "-1") {
            chepaihaoma = '';
        }
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD HH:mm:ss');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        } else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD HH:mm:ss');
        }
        let shenqingren = form.getFieldValue('shenqingren');
        if (typeof(shenqingren) == "undefined"||shenqingren == "-1") {
            shenqingren = '';
        }
        let shenpizhuangtai = form.getFieldValue('shenpizhuangtai');
        if (typeof(shenpizhuangtai) == "undefined"||shenpizhuangtai == "-1") {
            shenpizhuangtai = '';
        }
        let shifouchaoqi = form.getFieldValue('shifouchaoqi');
        if (typeof(shifouchaoqi) == "undefined"||shifouchaoqi == "-1") {
            shifouchaoqi = '';
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        //组织排序字段
        let paixu = paixuzuzhi(params.sortField,params.sortOrder);
        $.ajax({
            type:'get',
            url: SERVER+"huoqugongwucheyongchejiluByrenyuanbianhao?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&shenqingren="+shenqingren+"&shenpizhuangtai="+shenpizhuangtai+"&shifouchaoqi="+shifouchaoqi+"&chepaihaoma="+chepaihaoma+paixu,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if (data.data.content[i]["shenqingshijian"] != null) {
                        data.data.content[i]["shenqingshijian"] = moment(data.data.content[i]['shenqingshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data.content[i]["paichekaishishijian"] != null) {
                        data.data.content[i]["paichekaishishijian"] = moment(data.data.content[i]['paichekaishishijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data.content[i]["paichejieshushijian"] != null) {
                        data.data.content[i]["paichejieshushijian"] = moment(data.data.content[i]['paichejieshushijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data.content[i]["chuyingshijian"] != null) {
                        data.data.content[i]["chuyingshijian"] = moment(data.data.content[i]['chuyingshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data.content[i]["guiyingshijian"] != null) {
                        data.data.content[i]["guiyingshijian"] = moment(data.data.content[i]['guiyingshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if(data.data.content[i]["shenpizhuangtai"] == 'SHENQINGZHONG'){
                        data.data.content[i]["shenpizhuangtai"] = '申请中'
                    }else if(data.data.content[i]["shenpizhuangtai"] == 'YITONGYI'){
                        data.data.content[i]["shenpizhuangtai"] = '已同意'
                    }else if(data.data.content[i]["shenpizhuangtai"] == 'YIJUJUE'){
                        data.data.content[i]["shenpizhuangtai"] = '已拒绝'
                    }
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    cheliangtongxingList: data.data.content,
                    pagination,
                });
            }
        });
    }
    output()  {
        let _headers = ['机构名称','营区名称','车牌号码','申请时间','申请人','审批状态','出营时间','归营时间','用车原因','是否超期']
        let form = this.props.form;
        let chepaihaoma = form.getFieldValue('chepaihaoma');
        if (typeof(chepaihaoma) == "undefined"||chepaihaoma == "-1") {
            chepaihaoma = '';
        }
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD HH:mm:ss');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        } else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD HH:mm:ss');
        }
        let shenqingren = form.getFieldValue('shenqingren');
        if (typeof(shenqingren) == "undefined"||shenqingren == "-1") {
            shenqingren = '';
        }
        let shenpizhuangtai = form.getFieldValue('shenpizhuangtai');
        if (typeof(shenpizhuangtai) == "undefined"||shenpizhuangtai == "-1") {
            shenpizhuangtai = '';
        }
        let shifouchaoqi = form.getFieldValue('shifouchaoqi');
        if (typeof(shifouchaoqi) == "undefined"||shifouchaoqi == "-1") {
            shifouchaoqi = '';
        }
        $.ajax({
            type:'get',
            url: SERVER+"huoqugongwucheyongchejiluByrenyuanbianhao?page=0&size=100000&chepaihaoma="+chepaihaoma+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&shenqingren="+shenqingren+"&shenpizhuangtai="+shenpizhuangtai+"&shifouchaoqi="+shifouchaoqi,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    if (data.data.content[i]["shenqingshijian"] != null) {
                        data.data.content[i]["shenqingshijian"] = moment(data.data.content[i]['shenqingshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data.content[i]["paichekaishishijian"] != null) {
                        data.data.content[i]["paichekaishishijian"] = moment(data.data.content[i]['paichekaishishijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data.content[i]["paichejieshushijian"] != null) {
                        data.data.content[i]["paichejieshushijian"] = moment(data.data.content[i]['paichejieshushijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data.content[i]["chuyingshijian"] != null) {
                        data.data.content[i]["chuyingshijian"] = moment(data.data.content[i]['chuyingshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data.content[i]["guiyingshijian"] != null) {
                        data.data.content[i]["guiyingshijian"] = moment(data.data.content[i]['guiyingshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if(data.data.content[i]["shenpizhuangtai"] == 'SHENQINGZHONG'){
                        data.data.content[i]["shenpizhuangtai"] = '申请中'
                    }else if(data.data.content[i]["shenpizhuangtai"] == 'YITONGYI'){
                        data.data.content[i]["shenpizhuangtai"] = '已同意'
                    }else if(data.data.content[i]["shenpizhuangtai"] == 'YIJUJUE'){
                        data.data.content[i]["shenpizhuangtai"] = '已拒绝'
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
                    if (data.data.content[i]['chepaihaoma'] == null) {
                        obj['车牌号码'] = '';
                    } else {
                        obj['车牌号码'] = data.data.content[i]['chepaihaoma'];
                    }
                    if (data.data.content[i]['shenqingshijian'] == null) {
                        obj['申请时间'] = '';
                    } else {
                        obj['申请时间'] = data.data.content[i]['shenqingshijian'];
                    }
                    if (data.data.content[i]['shenqingren'] == null) {
                        obj['申请人'] = '';
                    } else {
                        obj['申请人'] = data.data.content[i]['shenqingren'];
                    }
                    if (data.data.content[i]['shenpizhuangtai'] == null) {
                        obj['审批状态'] = '';
                    } else {
                        obj['审批状态'] = data.data.content[i]['shenpizhuangtai'];
                    }
                    if (data.data.content[i]['chuyingshijian'] == null) {
                        obj['出营时间'] = '';
                    } else {
                        obj['出营时间'] = data.data.content[i]['chuyingshijian'];
                    }
                    if (data.data.content[i]['guiyingshijian'] == null) {
                        obj['归营时间'] = '';
                    } else {
                        obj['归营时间'] = data.data.content[i]['guiyingshijian'];
                    }
                    if (data.data.content[i]['yongcheyuanyin'] == null) {
                        obj['用车原因'] = '';
                    } else {
                        obj['用车原因'] = data.data.content[i]['yongcheyuanyin'];
                    }
                    if (data.data.content[i]['shifouchaoqi'] == null) {
                        obj['是否超期'] = '';
                    } else {
                        obj['是否超期'] = data.data.content[i]['shifouchaoqi'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前用车历史记录没有数据！");
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
                XLSX.writeFile(wb, '用车历史记录.xlsx');
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

    componentDidMount() {
        this.fetch();
        this.getshidouchaoqiList();
        this.getshenpizhuangtaiList();
    }

    render() {
        let shidouchaoqiOptions = this.state.shidouchaoqiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );
        let shenpizhuangtaiOptions = this.state.shenpizhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );


        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '车牌号码',
            dataIndex: 'chepaihaoma',
        }, {
            title: '申请时间',
            dataIndex: 'shenqingshijian',
            sorter: true,
        }, {
            title: '申请人',
            dataIndex: 'shenqingren',
        }, {
            title: '审批状态',
            dataIndex: 'shenpizhuangtai',
        }, {
            title: '出营时间',
            dataIndex: 'chuyingshijian',
            sorter: true,
        }, {
            title: '归营时间',
            dataIndex: 'guiyingshijian',
            sorter: true,
        }, {
            title: '用车原因',
            dataIndex: 'yongcheyuanyin',
        }, {
            title: '是否超期',
            dataIndex: 'shifouchaoqi',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                 if (record['chuyingshijian'] !== undefined && record['guiyingshijian'] !== undefined) {
                    return (
                        <span>
			      	<Link to={this.props.match.url+'/yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang/'+record['shenqingdanbianhao']}>详情</Link>
                    <Divider type="vertical" />
                    <Link to={this.props.match.url+'/yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing/'+record['chepaihaoma']+'/'+record['chuyingshijian']+'/'+record['guiyingshijian'] }>轨迹</Link>
			        </span>
                    )
                }else{
                    return (
                        <span>
			      	<Link to={this.props.match.url+'/yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang/'+record['shenqingdanbianhao']}>详情</Link>
			        </span>
                    )
                }
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue } = this.state;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline"  style={{margin:5}}>
                    <FormItem label="开始时间">
                        {getFieldDecorator('kaishishijian')(
                            <DatePicker
                                showTime
                                disabledDate={this.disabledStartDate}
                                value={startValue}
                                placeholder="开始时间"
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={this.onStartChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="结束时间">
                        {getFieldDecorator('jieshushijian')(
                            <DatePicker
                                showTime
                                disabledDate={this.disabledEndDate}
                                value={endValue}
                                placeholder="结束时间"
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={this.onEndChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="车牌号码">
                        {getFieldDecorator('chepaihaoma')(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="申请人&#12288;">
                        {getFieldDecorator('shenqingren')(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="审批状态">
                        {getFieldDecorator('shenpizhuangtai')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {shenpizhuangtaiOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="是否超期">
                        {getFieldDecorator('shifouchaoqi')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {shidouchaoqiOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.output.bind(this)}>
                            <Icon type="export" />导出
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.cheliangtongxingList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
