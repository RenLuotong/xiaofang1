import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import XLSX from 'xlsx';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Select, Tree,
} from 'antd';
import moment from 'moment';
import renyuanguanli_zhongduiganbu_qingjialishijiluxiangqing
    from './renyuanguanli_zhongduiganbu_qingjialishijiluxiangqing';
import TreeSideBar from '../../../../common/components/TreeSideBar';

const View = [];
const {TreeNode} = Tree;

class App extends Component {

    constructor(props) {
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
            shenpiList: [],
            shenpi: '',
            qingjialeixing: '',
            qingjialeixingList: [],
            shenpirenyuanList: [],
            dangqianshenpirenyuanList: [],
            shenqingdanbianhao: '',
            visible: false,
            shenpiren: '',
            instanceStateType: '',
            processBaseId: '',
            treeList: [],
            currentTime:new Date(),
            showcaidan: "block",
            showanniu: "none",
        };
    }

    hideModal = () => {
        this.setState({
            visible: false,
            shenpirenyuanList: [],
            shenpiren: '',
        });
    }

    getTree() {
        const THE = this;
        $.ajax({
            type: 'GET',
            url: SERVER + "huoxitongsuoyoujigouxialaliebiao",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let treeList = THE.state.treeList;
                treeList.push(data.data);
                THE.setState({
                    treeList: treeList
                });
            }
        });
    }

    jigoudaima = ''
    onSelect = (e) => {
      if (e !== null) {
        this.jigoudaima = e;
        this.fetch();
      }
    }

    //获取审批list
    getshenpiList(value) {
        const THE = this;
        THE.setState({
            shenpi: value,
        });
    }

    //获取请假类型list
    getqingjialeixingList(value) {
        const THE = this;
        $.ajax({
            type: 'GET',
            url: SERVER + "huoquwaichuleixingmeiju",
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
                    qingjialeixing: value,
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
        const pager = {...this.state.pagination};
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

    fetch = (params = {
        rows: this.state.pagination.pageSize,
        page: this.state.pagination.current
    }) => {
        const THE = this;
        let form = this.props.form;
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        let processDefinitionKey = qingjiaprocessKey;
        let search  = '';
        let variables = {};
        let shenpi = this.state.shenpi;
        if (typeof (shenpi) !== "undefined" && shenpi !== '-1' && shenpi !== ''&& shenpi !== null) {
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "shenqingdanzhuangtai="+shenpi;
            }else{
                search = search + ",shenqingdanzhuangtai="+shenpi;
            }
        }
        let qingjialeixing = this.state.qingjialeixing;
        if (typeof (qingjialeixing) !== "undefined" && qingjialeixing !== '-1' && qingjialeixing !== ''&& qingjialeixing !== null) {
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "shijiqingjialeixing="+qingjialeixing;
            }else{
                search = search + ",shijiqingjialeixing="+qingjialeixing;
            }
        }
        let xingming = form.getFieldValue('qingjiarenxingming');
        if (typeof (xingming) !== "undefined" && xingming !== null && xingming !== '') {
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "shenqingrenmingcheng~"+xingming;
            }else{
                search = search + ",shenqingrenmingcheng~"+xingming;
            }
        }
        let chakanfanwei = form.getFieldValue('chakanfanwei');
        let jigoudaima = this.jigoudaima;
        if ((typeof (jigoudaima) !== "undefined" && jigoudaima !== null && jigoudaima !== '') && chakanfanwei === '所属范围') {
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "jigoudaima="+jigoudaima;
            }else{
                search = search + ",jigoudaima="+jigoudaima;
            }
        }else if(typeof (jigoudaima) !== "undefined" && jigoudaima !== null && jigoudaima !== ''){
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "jigoudaima$~"+jigoudaima;
            }else{
                search = search + ",jigoudaima$~"+jigoudaima;
            }
        }else if(typeof (jigoudaima) == "undefined" || jigoudaima == null || jigoudaima == ''){
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "jigoudaima$~"+sessionStorage.getItem('jigoudaima');
            }else{
                search = search + ",jigoudaima$~"+sessionStorage.getItem('jigoudaima');;
            }
        }
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) !== "undefined" && kaishishijian !== null && kaishishijian !== '') {
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "jihuaqingjiashijian>" + moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
            } else {
                search = search + ",jihuaqingjiashijian>" + moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
            }
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) !== "undefined" && jieshushijian !== null && jieshushijian !== '') {
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "jihuaqingjiashijian<" + moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
            } else {
                search = search + ",jihuaqingjiashijian<" + moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
            }
        }
        $.ajax({
            type: 'get',
            url: SERVER + "activiti/process/instances/all?page="+page+"&size="+size+"&processDefinitionKey="+processDefinitionKey+"&search="+search,
            success: function (data) {
                let list = [];
                let renyuanbianhao = sessionStorage.getItem("renyuanbianhao");
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["startTime"] = moment(data.data.content[i]["startTime"]).format('YYYY-MM-DD HH:mm:ss');
                    const current=THE.state.currentTime;
                    if( Date.parse(data.data.content[i].form.jihuaxiaojiashijian.valueOf())  < current.valueOf()&& data.data.content[i].form.shenqingdanzhuangtai == '假期中'){
                        data.data.content[i].form.shenqingdanzhuangtai = '未销假';
                    }
                    data.data.content[i].form.jihuaqingjiashijian = moment(data.data.content[i].form.jihuaqingjiashijian).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i].form.jihuaxiaojiashijian = moment(data.data.content[i].form.jihuaxiaojiashijian).format('YYYY-MM-DD HH:mm:ss');
                    for(let j = 0;j<data.data.content[i].historicUserTaskInstanceList.length;j++){
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = {...THE.state.pagination};
                pagination.total = data.data.totalElement;
                THE.setState({
                    jiluList: list,
                    pagination,
                });
            }
        });
    }

    output() {
        let _headers = ['机构名称', '营区名称', '申请时间', '申请人', '计划请假时间', '计划销假时间', '请假类型', '请假理由', '审批状态']
        const THE = this;
        let form = this.props.form;
        let qingjialeixing = this.state.qingjialeixing;
        if (typeof (qingjialeixing) == "undefined" || qingjialeixing == '-1') {
            qingjialeixing = "";
        }
        let shenpi = this.state.shenpi;
        if (typeof (shenpi) == "undefined" || shenpi == '-1') {
            shenpi = "";
        }
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof (kaishishijian) == "undefined" || kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof (jieshushijian) == "undefined" || jieshushijian == null) {
            jieshushijian = "";
        } else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let qingjiarenxingming = form.getFieldValue('qingjiarenxingming');
        if (typeof (qingjiarenxingming) == "undefined") {
            qingjiarenxingming = "";
        }
        let juese = '中队长';
        //组织排序字段
        $.ajax({
            type: 'get',
            url: SERVER + "qingjiajiluchaxunByJuese?paze=0&size=10000&qingjiarenxingming=" + qingjiarenxingming + "&kaishishijian=" + kaishishijian + "&jieshushijian=" + jieshushijian + "&juese=" + juese + "&shenqingzhuangtai=" + shenpi + "&qingjialeixing=" + qingjialeixing,
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
                    let obj = {};
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
                    .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65 + i) + 1}))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

                let xmldata = _data
                    .map((v, i) => _headers.map((k, j) => Object.assign({}, {
                        v: v[k],
                        position: String.fromCharCode(65 + j) + (i + 2)
                    })))
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
                        'mySheet': Object.assign({}, output, {'!ref': ref})
                    }
                };

                // 导出 Excel
                XLSX.writeFile(wb, '请假历史记录.xlsx');
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
        this.getTree();
        this.getqingjialeixingList();
    }

    render() {
        let qingjialeixingOptions = this.state.qingjialeixingList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
          width: '10%'
        }, {
            title: '申请人机构名称',
            dataIndex: 'form.jigoumingcheng',
          width: '10%'
        }, {
            title: '申请人姓名',
            dataIndex: 'form.shenqingrenmingcheng',
          width: '10%'
        }
            // , {
            //     title: '申请时间',
            //     dataIndex: 'startTime',
            //     sorter: true,
            // }
            , {
                title: '所属部门',
                dataIndex: 'form.shenqingrenbumen',
            width: '10%'
            },{
                title: '外出时间',
                dataIndex: 'form.jihuaqingjiashijian',
            width: '10%'
                // sorter: true,
            }
            // ,{
            //     title: '返回时间',
            //     dataIndex: 'form.jihuaxiaojiashijian',
            //     sorter: true,
            // }
            , {
                title: '外出类型',
                dataIndex: 'form.shijiqingjialeixing',
            width: '10%'
            }
            // , {
            //     title: '外出地点',
            //     dataIndex: 'form.waichudidian',
            // }
            , {
                title: '时长',
                dataIndex: 'form.qingjiashichang',
            width: '10%'
            }
            // , {
            //     title: '外出事由',
            //     dataIndex: 'form.qingjialiyou',
            // }
            , {
                title: '当前审批人姓名',
                dataIndex: 'form.shenpirenyuanxingming',
            width: '10%'
            }, {
                title: '申请单状态',
                dataIndex: 'form.shenqingdanzhuangtai',
            }
            // , {
            //         title: '按钮审批状态',
            //         dataIndex: 'anniushenpizhuangtai',
            //     }
            , {
                title: '操作',
                dataIndex: 'cz',
                render: (text, record, index) => {
                        return (
                       <span>
                        <Link to={'yingquguanlixin_xiaofangyuan_qingjialishijilu/renyuanguanli_zhongduiganbu_qingjialishijiluxiangqing/'+ record['processInstanceId'] }>详情</Link>
                       </span>
                        )
                }
            }];

        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;
        const {startValue, endValue, qingjialeixing, shenpi} = this.state;

        return (
            <div id="chaxuntongji">
              <TreeSideBar  onSelect={this.onSelect} />
                <div id="treeRight" style={{flex: '1'}}>
                    <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                        <FormItem label="开始时间&#12288;">
                            {getFieldDecorator('kaishishijian')(
                                <DatePicker
                                    disabledDate={this.disabledStartDate}
                                    value={startValue}
                                    placeholder="开始时间"
                                    format="YYYY-MM-DD"
                                    onChange={this.onStartChange}
                                    style={{width: 200}}
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
                                    style={{width: 200}}
                                />
                            )}
                        </FormItem>
                        <FormItem label="查看范围&#12288;">
                            {getFieldDecorator('chakanfanwei',{initialValue: "-1"})(
                                <Select style={{width:200}}>
                                    <Select.Option value="-1">管辖范围</Select.Option>
                                    <Select.Option value="所属范围">所属范围</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="申请人名称">
                            {getFieldDecorator('qingjiarenxingming',)(
                                <Input style={{width: 200}}/>
                            )}
                        </FormItem>

                        <FormItem label="外出类型">
                            <Select style={{width: 200}} value={qingjialeixing}
                                    onChange={this.getqingjialeixingList.bind(this)}>
                                <Select.Option value="-1">全部</Select.Option>
                                {qingjialeixingOptions}
                            </Select>
                        </FormItem>
                        <FormItem label="申请单状态">
                            <Select style={{width: 200}} value={shenpi} onChange={this.getshenpiList.bind(this)}>
                                <Select.Option value="-1">全部</Select.Option>
                                <Select.Option value="请假申请中">请假申请中</Select.Option>
                                <Select.Option value="请假同意">请假同意</Select.Option>
                                <Select.Option value="请假拒绝">请假拒绝</Select.Option>
                                <Select.Option value="假期中">假期中</Select.Option>
                                <Select.Option value="未销假">未销假</Select.Option>
                                <Select.Option value="销假申请中">销假申请中</Select.Option>
                                <Select.Option value="已销假">已销假</Select.Option>
                                <Select.Option value="延期申请中">延期申请中</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.search.bind(this)}>
                                <Icon type="search"/>查询
                            </Button>
                        </FormItem>
                        {/*<FormItem>*/}
                        {/*    <Button type="primary" htmlType="submit" onClick={this.output.bind(this)}>*/}
                        {/*        <Icon type="export"/>导出*/}
                        {/*    </Button>*/}
                        {/*</FormItem>*/}
                    </Form>
                    <Table
                        columns={columns}
                        dataSource={this.state.jiluList}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                        scroll={{ y: "calc(100vh - 465px)", x: true }}
                    />
                </div>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default AppComp;
