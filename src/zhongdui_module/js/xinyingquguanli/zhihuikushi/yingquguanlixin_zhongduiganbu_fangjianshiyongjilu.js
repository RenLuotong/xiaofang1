import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import moment from 'moment';
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
    Popover, Tree, Card
} from 'antd';
import TreeSideBar from '../../../../common/components/TreeSideBar';

const {TreeNode} = Tree;
const { TextArea } = Input;

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
            shenpizhuangtaiList: [],
            fangjianleixingList: [],
            treeList: [],
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


    getfangjianleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquFangjianleixingMeiju",
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
                    fangjianleixingList: list,
                });
            }
        });
    }

    getshenpizhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquzhinengmensuoshenpizhuangtaiMeiju",
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
        let fangjianmingcheng = form.getFieldValue('fangjianmingcheng');
        if (typeof(fangjianmingcheng) == "undefined") {
            fangjianmingcheng = "";
        }
        let shenpizhuangtai = form.getFieldValue('shenpizhuangtai');
        if (typeof(shenpizhuangtai) == "undefined" || shenpizhuangtai == '-1') {
            shenpizhuangtai = "";
        }
        let fangjianleixing = form.getFieldValue('fangjianleixing');
        if (typeof(fangjianleixing) == "undefined" || fangjianleixing == '-1') {
            fangjianleixing = "";
        }
        let chakanfanwei = form.getFieldValue('chakanfanwei');
        if (typeof (chakanfanwei) == "undefined" || chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let jigoudaima = this.jigoudaima;
        let page = params.page - 1;
      let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        //组织排序字段
        let paixu = paixuzuzhi(params.sortField,params.sortOrder);
        $.ajax({
            type:'get',
            url: SERVER + "chaxunJiashujiedaishiFangjianshiyongjilu?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&fangjianmingcheng="+fangjianmingcheng+"&shenpizhuangtai="+shenpizhuangtai+"&fangjianleixing="+fangjianleixing+"&chakanfanwei="+chakanfanwei+"&jigoudaima="+jigoudaima+paixu,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.tbFangjianshiyongList.length; i++) {
                    data.data.tbFangjianshiyongList[i]["key"] = i;
                    data.data.tbFangjianshiyongList[i]["shenqingshijian"] = moment(data.data.tbFangjianshiyongList[i]["shenqingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.tbFangjianshiyongList[i]["jihuakaishishijian"] = moment(data.data.tbFangjianshiyongList[i]["jihuakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] == 'SHENQINGZHONG'){
                        data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] = '申请中'
                    }else if(data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] == 'YITONGYI'){
                        data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] = '已同意'
                    }else if(data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] == 'YIJUJUE'){
                        data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] = '已拒绝'
                    }
                    if(data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] == 'KONGXIAN'){
                        data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] = '空闲'
                    }else if(data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] == 'SHIYONGZHONG'){
                        data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] = '使用中'
                    }else if(data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] == 'DAIDASAO'){
                        data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] = '待打扫'
                    }
                    if(data.data.tbFangjianshiyongList[i]["fangjianleixingEnum"] == 'ZHINENGSUOFANGJIAN'){
                        data.data.tbFangjianshiyongList[i]["fangjianleixingEnum"] = '智能锁房间'
                    }else if(data.data.tbFangjianshiyongList[i]["fangjianleixingEnum"] == 'KAOQINJIFANGJIAN'){
                        data.data.tbFangjianshiyongList[i]["fangjianleixingEnum"] = '考勤机房间'
                    }else if(data.data.tbFangjianshiyongList[i]["fangjianleixingEnum"] == 'JIASHUJIEDAISHI'){
                        data.data.tbFangjianshiyongList[i]["fangjianleixingEnum"] = '家属接待室'
                    }else if(data.data.tbFangjianshiyongList[i]["fangjianleixingEnum"] == 'SUSHE'){
                        data.data.tbFangjianshiyongList[i]["fangjianleixingEnum"] = '宿舍'
                    }
                    list.push(data.data.tbFangjianshiyongList[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.count;
                THE.setState({
                    jiluList: list,
                    pagination,
                });
            }
        });
    }


    tongguo(id) {
        const THE = this;
        let shenpizhuangtai = 'YITONGYI';
        let  tbFangjianshiyongshenpiPojo = {};
        tbFangjianshiyongshenpiPojo["fangjianshiyongId"] = id;
        tbFangjianshiyongshenpiPojo["shenpizhuangtai"] = shenpizhuangtai;
        $.ajax({
            type:'POST',
            url: SERVER + "shenheyongfangshenqing",
            data : JSON.stringify(tbFangjianshiyongshenpiPojo),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("审批成功");
                THE.fetch();
            }
        });
    }

    jujue(id) {
        const THE = this;
        let shenpizhuangtai = 'YIJUJUE';
        let  tbFangjianshiyongshenpiPojo = {};
        tbFangjianshiyongshenpiPojo["fangjianshiyongId"] = id;
        tbFangjianshiyongshenpiPojo["shenpizhuangtai"] = shenpizhuangtai;
        $.ajax({
            type:'POST',
            url: SERVER + "shenheyongfangshenqing",
            data : JSON.stringify(tbFangjianshiyongshenpiPojo),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("审批成功");
                THE.fetch();
            }
        });
    }



    componentDidMount() {
        this.fetch();
        this.getshenpizhuangtaiList();
        this.getfangjianleixingList();
        this.getTree();
    }

    render() {

        let fangjianleixingListOptions = this.state.fangjianleixingList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );


        let shenpizhuangtaiOptions = this.state.shenpizhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
          width: '10%'
        },{
            title: '申请人机构名称',
            dataIndex: 'jigoumingcheng',
          width: '10%'
        },{
            title: '房间名称',
            dataIndex: 'fangjianmingcheng',
          width: '10%'
        },{
            title: '房间类型',
            dataIndex: 'fangjianleixingEnum',
          width: '10%'
        },{
            title: '申请人',
            dataIndex: 'extraShenqingrenxingming',
          width: '10%'
        },{
            title: '申请时间',
            dataIndex: 'shenqingshijian',
            sorter: true,
          width: '10%'
        },{
            title: '审批状态',
            dataIndex: 'shenpizhuangtai',
          width: '10%'
        },{
            title: '使用时间',
            dataIndex: 'jihuakaishishijian',
            sorter: true,
        },{
            title: '使用理由',
            dataIndex: 'shiyongshuoming',
        }];



        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue} = this.state;

        return (
            <div id="chaxuntongji">
              <TreeSideBar  onSelect={this.onSelect} />
                <div id="treeRight" style={{flex: '1'}}>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
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
                    <FormItem label="房间类型">
                        {getFieldDecorator('fangjianleixing',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {fangjianleixingListOptions}
                            </Select>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="房间名称">
                        {getFieldDecorator('fangjianmingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="审批状态">
                        {getFieldDecorator('shenpizhuangtai',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {shenpizhuangtaiOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="查看范围">
                        {getFieldDecorator('chakanfanwei', {initialValue: "-1"})(
                            <Select style={{margin: 5, width: 200}}>
                                <Select.Option value="-1">管辖范围</Select.Option>
                                <Select.Option value="所属范围">所属范围</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
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
