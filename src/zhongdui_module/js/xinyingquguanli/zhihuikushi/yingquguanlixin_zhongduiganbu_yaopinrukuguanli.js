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
    Popover,Card, Tree
} from 'antd';
const {TreeNode} = Tree;
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
                pageSize : 10,
                current : 1
            },
            yaopinList: [],
            startValue: null,
            endValue: null,
            shenpizhuangtaiList: [],
            treeList: [],
            showcaidan: "block",
            showanniu: "none",
        };
    }

    //隐藏菜单方法
    yincangcaidan() {
        this.setState({
            showcaidan: "none",
            showanniu: "block",
        })
    }

    //显示菜单方法
    xianshicaidan() {
        this.setState({
            showcaidan: "block",
            showanniu: "none",
        })
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
        if (e.length != 0) {
            this.jigoudaima = e[0];
            this.fetch();
        }
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item} icon={<Icon type="folder"/>}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} icon={<Icon type="folder"/>}/>;
        });
    }

    getshenpizhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tb-yaopin-rukujilus/huoquyaopinrukuzhuangtai",
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
        let chakanfanwei = form.getFieldValue('chakanfanwei');
        if (typeof (chakanfanwei) == "undefined" || chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let jigoudaima = this.jigoudaima;
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb-yaopin-rukujilusNew?page="+page+"&size="+size+"&yaopinmingcheng="+yaopinmingcheng+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&rukuZhuangtai="+shenpizhuangtai+"&chakanfanwei="+chakanfanwei+"&jigoudaima="+jigoudaima+"&sort=rukushijian,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if(data.data.content[i]["shengchanriqi"] !== null && data.data.content[i]["shengchanriqi"] !== ''){
                        data.data.content[i]["shengchanriqi"] = moment(data.data.content[i]["shengchanriqi"]).format('YYYY-MM-DD');
                    }
                    data.data.content[i]["rukushijian"] = moment(data.data.content[i]["rukushijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.content[i]["rukuzhuangtai"] == 'Shenqingzhong'){
                        data.data.content[i]["rukuzhuangtai"] = '已申请'
                    }else if(data.data.content[i]["rukuzhuangtai"] == 'Tongguo'){
                        data.data.content[i]["rukuzhuangtai"] = '已同意'
                    }else if(data.data.content[i]["rukuzhuangtai"] == 'Jujue'){
                        data.data.content[i]["rukuzhuangtai"] = '已拒绝'
                    }else if(data.data.content[i]["rukuzhuangtai"] == 'Shanchu'){
                        data.data.content[i]["rukuzhuangtai"] = '删除'
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    yaopinList: list,
                    pagination,
                });
            }
        });
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
            url: SERVER + "tb-yaopin-rukujilus/shenpi?id="+id+"&zhuangtai=同意",
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
            url: SERVER + "tb-yaopin-rukujilus/shenpi?id="+id+"&zhuangtai=拒绝",
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
        this.getTree();
    }

    render() {

        let shenpizhuangtaiOptions = this.state.shenpizhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );
        let title = (
            <div id="myTitle">
                <Button style={{display: this.state.showcaidan}} onClick={this.yincangcaidan.bind(this)}><Icon
                    type="left"/></Button>
                <div id="myTitleDiv">组织机构</div>
            </div>
        )

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '营区名称',
            dataIndex: 'yingqumingcheng',
        },{
            title: '申请人',
            dataIndex: 'rukurenxingming',
        },{
            title: '药品名称',
            dataIndex: 'yaopinmingcheng',
        },{
            title: '入库数量',
            dataIndex: 'shuliang',
        }
        // ,{
        //     title: '剩余数量',
        //     dataIndex: 'shengyushuliang',
        // }
        ,{
            title: '入库时间',
            dataIndex: 'rukushijian',
        },{
            title: '生产日期',
            dataIndex: 'shengchanriqi',
        },{
            title: '保质期',
            dataIndex: 'baozhiqi',
        },{
            title: '过期阈值',
            dataIndex: 'guoqiyuzhi',
        }

        // ,{
        //     title: '审批状态',
        //     dataIndex: 'rukuzhuangtai',
        // },{
        //     title: '操作',
        //     dataIndex: 'cz',
        //     render: (text, record, index) => {
        //         if (record['rukuzhuangtai'] == "已申请") {
        //             return (
        //                 <span>
		// 			      	<Popconfirm placement="topLeft" title="确认要通过这条药品入库申请?" onConfirm={this.tongguo.bind(this,record['id'])} okText="确认" cancelText="取消">
		// 			        	<a>通过</a>
		// 			    	</Popconfirm>
		// 			    	<Divider type="vertical"/>
		// 			    	<Popconfirm placement="topLeft" title="确认要拒绝这条药品入库申请?" onConfirm={this.jujue.bind(this,record['id'])}  okText="确认" cancelText="取消">
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
            <div id="chaxuntongji">
                <Button style={{display: this.state.showanniu}} onClick={this.xianshicaidan.bind(this)}><Icon
                    type="right"/></Button>
                <div id="treeLeft" style={{display: this.state.showcaidan}}>
                    <Card
                        title={title}
                        id="treeLeftCard"
                        style={{display: this.state.showcaidan}}
                    >
                        {
                            this.state.treeList.length
                                ?
                                <Tree
                                    showIcon
                                    defaultExpandAll
                                    onSelect={this.onSelect}
                                    switcherIcon={<Icon type="down"/>}
                                >
                                    {this.renderTreeNodes(this.state.treeList)}
                                </Tree>
                                :
                                null
                        }
                    </Card>
                </div>
                <div id="treeRight">
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
                    <FormItem label="药品名称">
                        {getFieldDecorator('yaopinmingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="查看范围">
                        {getFieldDecorator('chakanfanwei', {initialValue: "-1"})(
                            <Select style={{width: 200}}>
                                <Select.Option value="-1">管辖范围</Select.Option>
                                <Select.Option value="所属范围">所属范围</Select.Option>
                            </Select>
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
                />
                </div>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
