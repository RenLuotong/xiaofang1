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
    Popover, Tabs
} from 'antd';
import ZDJL from "./yingquguanlixin_zhongduiganbu_fangjianshiyongjilu";
import Yzjl from "./yingquguanlixin_xiaofangyuan_fangjianshiyongjilu";

const View = [];


const { TextArea } = Input;

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
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            jiluList: [],
            startValue: null,
            endValue: null,
            shenpizhuangtaiList: [],
            fangjianleixingList: [],
            activeKey:"1",
            showzuzhiyuangong:true,
            showzuzhilingdao:true,
            showfangjianguanliyuan:true,
        };
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
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        //组织排序字段
        let paixu = paixuzuzhi(params.sortField,params.sortOrder);
        $.ajax({
            type:'get',
            url: SERVER + "huoquJiashujiedaishiFangjianshiyongjiluByApp?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&fangjianmingcheng="+fangjianmingcheng+"&shenpizhuangtai="+shenpizhuangtai+"&fangjianleixing="+fangjianleixing+paixu,
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
        if(button_quanxian('showfangjianguanliyuan',jueselist) === true){
            this.setState({
                showfangjianguanliyuan: false,
            });
        };
    }



    componentDidMount() {
        this.fetch();
        this.getshenpizhuangtaiList();
        this.getfangjianleixingList();
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
          width: '15%'
        },{
            title: '申请时间',
            dataIndex: 'shenqingshijian',
            sorter: true,
          width: '10%'
        },{
            title: '审批状态',
            dataIndex: 'shenpizhuangtai',
          width: '15%'
        },{
            title: '使用时间',
            dataIndex: 'jihuakaishishijian',
            sorter: true,
          width: '10%'
        },{
            title: '使用理由',
            dataIndex: 'shiyongshuoming',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                if (record['shenpizhuangtai'] == "申请中") {
                    return (
                        <span>
					      	<Popconfirm placement="topLeft" title="确认要通过该房间使用申请?" onConfirm={this.tongguo.bind(this,record['id'])} okText="确认" cancelText="取消">
					        	<a>通过</a>
					    	</Popconfirm>
					    	<Divider type="vertical"/>
					    	<Popconfirm placement="topLeft" title="确认要拒绝该房间使用申请?" onConfirm={this.jujue.bind(this,record['id'])}  okText="确认" cancelText="取消">
					        	<a>拒绝</a>
					    	</Popconfirm>
                       </span>
                    )
                } else {
                    <span>
                    </span>
                }
            },
        }];



        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue} = this.state;

        return (
            <div>
                <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                <Tabs.TabPane tab="组织员工" key="1" disabled={this.state.showzuzhiyuangong}>
                    <Yzjl />
               </Tabs.TabPane>
               <Tabs.TabPane tab="组织领导" key="2" disabled={this.state.showzuzhilingdao}>
                   <ZDJL />
               </Tabs.TabPane>
                <Tabs.TabPane tab="房间管理员" key="3" disabled={this.state.showfangjianguanliyuan}>
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
                </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
