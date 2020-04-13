import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
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
                pageSize : 10,
                current : 1
            },
            jiluList: [],
            startValue: null,
            endValue: null,
            shenpizhuangtaiList: [],
            fangjianzhuangtaiList: [],
        };
    }

    getshenpizhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqujiashujiedaishiShenpizhuangtaiMeiju",
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

    getfangjianzhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqufangjianzhuangtaiMeiju",
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
                    fangjianzhuangtaiList: list,
                });
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
        let fangjianmingcheng = form.getFieldValue('fangjianmingcheng');
        if (typeof(fangjianmingcheng) == "undefined") {
            fangjianmingcheng = "";
        }
        let fangjianzhuangtai = form.getFieldValue('fangjianzhuangtai');
        if (typeof(fangjianzhuangtai) == "undefined" || fangjianzhuangtai == '-1') {
            fangjianzhuangtai = "";
        }
        let shenpizhuangtai = form.getFieldValue('shenpizhuangtai');
        if (typeof(shenpizhuangtai) == "undefined" || shenpizhuangtai == '-1') {
            shenpizhuangtai = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        //组织排序字段
        let paixu = paixuzuzhi(params.sortField,params.sortOrder);
        $.ajax({
            type:'get',
            url: SERVER + "huoqudengluzheJiashujiedaiFangjianshiyongjilu?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&shenpizhuangtai="+shenpizhuangtai+"&fangjianmingcheng="+fangjianmingcheng+"&fangjianZhuangtai="+fangjianzhuangtai+paixu,
            success: function (data) {
                console.log(data)
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
                    }else if(data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] == 'YIJUJUE'){
                        data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] = '已拒绝'
                    }else if(data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] == 'YITONGYI'){
                        data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] = '已同意'
                    }else if(data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] == 'SHIYONGZHONG'){
                        data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] = '使用中'
                    }else if(data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] == 'YITUIFANG'){
                        data.data.tbFangjianshiyongList[i]["shenpizhuangtai"] = '已退房'
                    }
                    if(data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] == 'KONGXIAN'){
                        data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] = '空闲'
                    }else if(data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] == 'SHIYONGZHONG'){
                        data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] = '使用中'
                    }else if(data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] == 'DAIDASAO'){
                        data.data.tbFangjianshiyongList[i]["fangjianzhuangtai"] = '待打扫'
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

    //弹出单个退房理由框
    tuifang(id) {
        const THE = this;
        if (!confirm("确定退房！")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER+"jiashujiedaishiTuifang?id="+id,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("申请成功");
                THE.fetch();
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



    componentDidMount() {
        this.fetch();
        this.getfangjianzhuangtaiList();
        this.getshenpizhuangtaiList();
    }

    render() {
        let shenpizhuangtaiOptions = this.state.shenpizhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );
        let fangjianzhuangtaiOptions = this.state.fangjianzhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '房间名称',
            dataIndex: 'fangjianmingcheng',
        },{
            title: '申请时间',
            dataIndex: 'shenqingshijian',
            sorter: true,
        }, {
            title:'审批状态',
            dataIndex:'shenpizhuangtai',
        }, {
            title:'使用时间',
            dataIndex:'jihuakaishishijian',
            sorter: true,
        },{
            title:'使用理由',
            dataIndex:'shiyongshuoming',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                if (record['shenpizhuangtai'] == "使用中") {
                    return (
                        <span>
                           <a onClick={this.tuifang.bind(this,record['id'])}>退房</a>
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
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
