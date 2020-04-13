import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import XLSX from 'xlsx';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Select,Card, Tree
} from 'antd';
import moment from "moment";
import yingquguanlixin_zhongduiganbu_yichangtuogangjiluxiangqing from './yingquguanlixin_zhongduiganbu_yichangtuogangjiluxiangqing';
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
            treeList: [],
            showcaidan: "block",
            showanniu: "none",
        };
    }

    getTree() {
        const THE = this;
        $.ajax({
            type: 'GET',
            url: SERVER + "zhiduiAlljigou",
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
        let shejirenyuan = form.getFieldValue('shejirenyuan');
        if (typeof(shejirenyuan) == "undefined") {
            shejirenyuan = "";
        }
        let shifoushensu = form.getFieldValue('shifoushensu');
        if (typeof(shifoushensu) == "undefined" || shifoushensu == '-1') {
            shifoushensu = "";
        }
        let chakanfanwei = form.getFieldValue('chakanfanwei');
        if (typeof (chakanfanwei) == "undefined" || chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let jigoudaima = this.jigoudaima;
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
      const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhibantuogang/chaxunTuogangjilu?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&chakanfanwei="+chakanfanwei+"&jigoudaima="+jigoudaima+"&shejirenyuan="+shejirenyuan+"&shifoushensu="+shifoushensu,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["gaojingshijian"] = moment(data.data.content[i]["gaojingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.content[i]["shifoushensu"] == false){
                        data.data.content[i]["shifoushensu"] = '否'
                    }else if(data.data.content[i]["shifoushensu"] == true){
                        data.data.content[i]["shifoushensu"] = '是'
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

    output() {
        let _headers = ['机构名称','营区名称','值班编号','异常时间','涉及人员','异常描述','是否申诉']
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
        let shejirenyuan = form.getFieldValue('shejirenyuan');
        if (typeof(shejirenyuan) == "undefined") {
            shejirenyuan = "";
        }
        let shifoushensu = form.getFieldValue('shifoushensu');
        if (typeof(shifoushensu) == "undefined" || shifoushensu == '-1') {
            shifoushensu = "";
        }
        let chakanfanwei = form.getFieldValue('chakanfanwei');
        if (typeof (chakanfanwei) == "undefined" || chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let jigoudaima = this.jigoudaima;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb_zhibantuogang/chaxunTuogangjilu?page=0&size=10000&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&chakanfanwei="+chakanfanwei+"&jigoudaima="+jigoudaima+"&shejirenyuan="+shejirenyuan+"&shifoushensu="+shifoushensu,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["gaojingshijian"] = moment(data.data.content[i]["gaojingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.content[i]["shifoushensu"] == false){
                        data.data.content[i]["shifoushensu"] = '否'
                    }else if(data.data.content[i]["shifoushensu"] == true){
                        data.data.content[i]["shifoushensu"] = '是'
                    }
                    let obj={};
                    if (data.data.content[i]['jigoumingcheng'] == null) {
                        obj['机构名称'] = '';
                    } else {
                        obj['机构名称'] = data.data.content[i]['jigoumingcheng'];
                    }
                    if (data.data.content[i]['yingqvmingcheng'] == null) {
                        obj['营区名称'] = '';
                    } else {
                        obj['营区名称'] = data.data.content[i]['yingqvmingcheng'];
                    }
                    if (data.data.content[i]['gaojingshijian'] == null) {
                        obj['异常时间'] = '';
                    } else {
                        obj['异常时间'] = data.data.content[i]['gaojingshijian'];
                    }
                    if (data.data.content[i]['extraTuogangrenXingming'] == null) {
                        obj['涉及人员'] = '';
                    } else {
                        obj['涉及人员'] = data.data.content[i]['extraTuogangrenXingming'];
                    }
                    if (data.data.content[i]['tuogangmiaoshu'] == null) {
                        obj['异常描述'] = '';
                    } else {
                        obj['异常描述'] = data.data.content[i]['tuogangmiaoshu'];
                    }
                    if (data.data.content[i]['shifoushensu'] == null) {
                        obj['是否申诉'] = '';
                    } else {
                        obj['是否申诉'] = data.data.content[i]['shifoushensu'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前异常脱岗记录没有数据！");
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
                XLSX.writeFile(wb, '异常脱岗记录.xlsx');
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
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
          width: '10%'
        }, {
            title: '机构名称',
            dataIndex: 'jigoumingcheng',
          width: '10%'
        }, {
            title: '异常时间',
            dataIndex: 'gaojingshijian',
          width: '10%'
        }, {
            title: '涉及人员',
            dataIndex: 'extraTuogangrenXingming',
          width: '10%'
        }, {
            title: '异常描述',
            dataIndex: 'tuogangmiaoshu',
          width: '10%'
        }, {
            title: '是否申诉',
            dataIndex: 'shifoushensu',
          width: '10%'
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                return (
                    <span>
                           <Link to={'yingquguanlixin_xiaofangyuan_yichangtuogangjilu/yingquguanlixin_zhongduiganbu_yichangtuogangjiluxiangqing/' + record['id']}>详情</Link>
                       </span>
                )
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue} = this.state;

        return (
            <div id="chaxuntongji">
              <TreeSideBar  onSelect={this.onSelect} />
                <div id="treeRight" style={{flex: '1'}}>
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
                    <FormItem label="查看范围">
                        {getFieldDecorator('chakanfanwei',{initialValue: "-1"})(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">管辖范围</Select.Option>
                                <Select.Option value="所属范围">所属范围</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="涉及人员">
                        {getFieldDecorator('shejirenyuan',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="是否申诉">
                        {getFieldDecorator('shifoushensu',)(
                            <Select style={{width:200}}>
                            <Select.Option value="-1">全部</Select.Option>
                            <Select.Option value="true">是</Select.Option>
                            <Select.Option value="false">否</Select.Option>
                            </Select>
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
                    scroll={{ y: "calc(100vh - 465px)", x: true }}
                />
                </div>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default AppComp;