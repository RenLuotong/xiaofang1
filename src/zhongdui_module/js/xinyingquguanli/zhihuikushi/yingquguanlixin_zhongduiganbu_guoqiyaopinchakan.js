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
    Popover,Tree,Card
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
            guoqizhuangtaiList: [],
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
    getguoqizhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tb-yaopin-rukujilus/huoquguoqizhuangtai",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    if(data.data[i].value !== '未过期'){
                    list.push(data.data[i]);
                    }
                }
                THE.setState({
                    guoqizhuangtaiList: list,
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
        let guoqizhuangtai = form.getFieldValue('guoqizhuangtai');
        if (typeof(guoqizhuangtai) == "undefined" || guoqizhuangtai == '-1') {
            guoqizhuangtai = "";
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
            url: SERVER + "huoqvjijiangguoqiyiguoqiyaopinNew?page="+page+"&size="+size+"&yaopinmingcheng="+yaopinmingcheng+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&chakanfanwei="+chakanfanwei+"&jigoudaima="+jigoudaima+"&guoqizhuangtai="+guoqizhuangtai,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["guoqishijian"] = moment(data.data.content[i]["guoqishijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["gengxinshijian"]=moment(data.data.content[i]["gengxinshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.content[i]["guoqizhuangtai"] == 'WEIGUOQI'){
                        data.data.content[i]["guoqizhuangtai"] = '未过期'
                    }else if(data.data.content[i]["guoqizhuangtai"] == 'YIGUOQI'){
                        data.data.content[i]["guoqizhuangtai"] = '已过期'
                    }else if(data.data.content[i]["guoqizhuangtai"] == 'JIJIANGGUOQI'){
                        data.data.content[i]["guoqizhuangtai"] = '即将过期'
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

    componentDidMount() {
        this.fetch();
        this.getguoqizhuangtaiList();
        this.getTree();
    }

    render() {

        let guoqizhuangtaiOptions = this.state.guoqizhuangtaiList.map(item =>
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
            dataIndex: 'yingqvmingcheng',
        },{
            title: '药品名称',
            dataIndex: 'yaopinmingcheng',
        },{
            title: '批次',
            dataIndex: 'pici',
        },{
            title: '过期时间',
            dataIndex: 'guoqishijian',
        },{
            title: '过期状态',
            dataIndex: 'guoqizhuangtai',
        },{
            title: '过期阈值',
            dataIndex: 'guoqiyuzhi',
        },{
            title: '更新时间',
            dataIndex: 'gengxinshijian',
        },{
            title: '剩余数量',
            dataIndex: 'shengyushuliang',
        }];

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
                    <FormItem label="过期状态">
                        {getFieldDecorator('guoqizhuangtai',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {guoqizhuangtaiOptions}
                            </Select>
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
