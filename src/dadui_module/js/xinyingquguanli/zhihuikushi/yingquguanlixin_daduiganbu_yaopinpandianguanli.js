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
    Popover
} from 'antd';


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
                showQuickJumper: true,
                showSizeChanger: true,
                current : 1
            },
            yaopinList: [],
            startValue: null,
            endValue: null,
            shenpizhuangtaiList: [],
        };
    }

    getshenpizhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvpandianzhuangtai",
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let yaopinmingcheng = form.getFieldValue('yaopinmingcheng');
        if (typeof(yaopinmingcheng) == "undefined") {
            yaopinmingcheng = "";
        }
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
        let shenpizhuangtai = form.getFieldValue('shenpizhuangtai');
        if (typeof(shenpizhuangtai) == "undefined" || shenpizhuangtai == '-1') {
            shenpizhuangtai = "";
        }
        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "chaxunyaopinpandianjilu?page="+page+"&size="+size+"&yaopinmingcheng="+yaopinmingcheng+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&pandianzhuangtai="+shenpizhuangtai,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.yaopinkucunList.length; i++) {
                    data.data.yaopinkucunList[i]["key"] = i;
                    data.data.yaopinkucunList[i]["pandianshijian"] = moment(data.data.yaopinkucunList[i]["pandianshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.yaopinkucunList[i]["pandianzhuangtai"] == 'YISHENQING'){
                        data.data.yaopinkucunList[i]["pandianzhuangtai"] = '已申请'
                    }else if(data.data.yaopinkucunList[i]["pandianzhuangtai"] == 'YITONGYI'){
                        data.data.yaopinkucunList[i]["pandianzhuangtai"] = '已同意'
                    }else if(data.data.yaopinkucunList[i]["pandianzhuangtai"] == 'YIJUJUE'){
                        data.data.yaopinkucunList[i]["pandianzhuangtai"] = '已拒绝'
                    }
                    if(data.data.yaopinkucunList[i]["pandianjieguo"] == 'ZHENGCHANG'){
                        data.data.yaopinkucunList[i]["pandianjieguo"] = '正常'
                    }else if(data.data.yaopinkucunList[i]["pandianjieguo"] == 'PANYING'){
                        data.data.yaopinkucunList[i]["pandianjieguo"] = '盘盈'
                    }else if(data.data.yaopinkucunList[i]["pandianjieguo"] == 'PANKUI'){
                        data.data.yaopinkucunList[i]["pandianjieguo"] = '盘亏'
                    }
                    list.push(data.data.yaopinkucunList[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.count;
                THE.setState({
                    yaopinList: list,
                    pagination,
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

    tongguo(id) {
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER + "shenheyaopinpandianshenqing/tongyi?id="+id,
            data : JSON.stringify(),
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
        $.ajax({
            type:'POST',
            url: SERVER + "shenheyaopinpandianshenqing/jujue?id="+id,
            data : JSON.stringify(),
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
        // this.getshenpizhuangtaiList();
    }

    render() {

        let shenpizhuangtaiOptions = this.state.shenpizhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
            width:"12%"
        },{
            title: '盘点人',
            dataIndex: 'pandianrenxingming',
            width:"12%"
        },{
            title: '药品名称',
            dataIndex: 'yaopinmingcheng',
            width:"12%"
        },{
            title: '批次',
            dataIndex: 'pici',
            width:"12%"
        },{
            title: '盘点时间',
            dataIndex: 'pandianshijian',
            width:"24%"
        },{
            title: '盘点结果',
            dataIndex: 'pandianjieguo',
            width:"12%"
        }
        // ,{
        //     title: '盘点状态',
        //     dataIndex: 'pandianzhuangtai',
        // }
        ,{
            title: '系统库存数量',
            dataIndex: 'xitongkucunshuliang',
        },{
            title: '实际库存数量',
            dataIndex: 'shijikucunshuliang',
        }
        // ,{
        //     title: '操作',
        //     dataIndex: 'cz',
        //     render: (text, record, index) => {
        //         if (record['pandianzhuangtai'] == "已申请") {
        //             return (
        //                 <span>
		// 			      	<Popconfirm placement="topLeft" title="确认要通过这条药品盘点申请?" onConfirm={this.tongguo.bind(this,record['id'])} okText="确认" cancelText="取消">
		// 			        	<a>通过</a>
		// 			    	</Popconfirm>
		// 			    	<Divider type="vertical"/>
		// 			    	<Popconfirm placement="topLeft" title="确认要拒绝这条药品盘点申请?" onConfirm={this.jujue.bind(this,record['id'])}  okText="确认" cancelText="取消">
		// 			        	<a>拒绝</a>
		// 			    	</Popconfirm>
        //                </span>
        //             )
        //         } else {
        //             <span>
        //             </span>
        //         }
        //     },
        // }
        ];

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
                    {/*<br/>*/}
                    <FormItem label="药品名称">
                        {getFieldDecorator('yaopinmingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    {/*<FormItem label="审批状态">*/}
                    {/*    {getFieldDecorator('shenpizhuangtai',)(*/}
                    {/*        <Select style={{width:200}}>*/}
                    {/*            <Select.Option value="-1">全部</Select.Option>*/}
                    {/*            {shenpizhuangtaiOptions}*/}
                    {/*        </Select>*/}
                    {/*    )}*/}
                    {/*</FormItem>*/}
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.yaopinList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 370px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
