import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Select, Tree, Card,
} from 'antd';
import moment from "moment";
import XLSX from 'xlsx';

const {TreeNode} = Tree;

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize: 10,
                current: 1
            },
        };
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={this.props.match.path} component={AppComp}/>
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
                pageSize: 10,
                current: 1
            },
            shenpi: '',
            jiluList: [],
            startValue: null,
            endValue: null,
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
    xianshicaidan(){
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
        const pager = {...this.state.pagination};
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
        let form = this.props.form;
        let chakanfanwei = form.getFieldValue('chakanfanwei');
        if (typeof (chakanfanwei) == "undefined" || chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let jigoudaima = this.jigoudaima;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof (kaishishijian) == "undefined" || kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof (jieshushijian) == "undefined" || jieshushijian == null) {
            jieshushijian = '';
        } else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let extraQuexirenXingming = form.getFieldValue('extraQuexirenXingming');
        if (typeof (extraQuexirenXingming) == "undefined") {
            extraQuexirenXingming = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type: 'get',
            url: SERVER + "tb_zhibanquexi/houqujigouquexijilu?page=" + page + "&size=" + size + "&kaishishijian=" + kaishishijian + "&jieshushijian=" + jieshushijian + "&quexirenxingming=" + extraQuexirenXingming,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["extraJihuakaishishijian"] = moment(data.data.content[i]["extraJihuakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["extraJihuajieshushijian"] = moment(data.data.content[i]["extraJihuajieshushijian"]).format('YYYY-MM-DD HH:mm:ss');
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

    //导出
    output() {
        let _headers = ['机构名称', '营区名称', '值班编号', '缺岗人姓名', '计划值班开始时间', '计划值班结束时间', '缺岗理由']
        let form = this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof (kaishishijian) == "undefined" || kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof (jieshushijian) == "undefined" || jieshushijian == null) {
            jieshushijian = '';
        } else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let extraQuexirenXingming = form.getFieldValue('extraQuexirenXingming');
        if (typeof (extraQuexirenXingming) == "undefined") {
            extraQuexirenXingming = "";
        }
        const THE = this;
        $.ajax({
            type: 'get',
            url: SERVER + "tb_zhibanquexi/houqujigouquexijilu?page=0&size=10000&kaishishijian=" + kaishishijian + "&jieshushijian=" + jieshushijian + "&quexirenxingming=" + extraQuexirenXingming,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["extraJihuakaishishijian"] = moment(data.data.content[i]["extraJihuakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["extraJihuajieshushijian"] = moment(data.data.content[i]["extraJihuajieshushijian"]).format('YYYY-MM-DD HH:mm:ss');
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
                    if (data.data.content[i]['zhibanbianhao'] == null) {
                        obj['值班编号'] = '';
                    } else {
                        obj['值班编号'] = data.data.content[i]['zhibanbianhao'];
                    }
                    if (data.data.content[i]['extraQuexirenXingming'] == null) {
                        obj['缺岗人姓名'] = '';
                    } else {
                        obj['缺岗人姓名'] = data.data.content[i]['extraQuexirenXingming'];
                    }
                    if (data.data.content[i]['extraJihuakaishishijian'] == null) {
                        obj['计划值班开始时间'] = '';
                    } else {
                        obj['计划值班开始时间'] = data.data.content[i]['extraJihuakaishishijian'];
                    }
                    if (data.data.content[i]['extraJihuajieshushijian'] == null) {
                        obj['计划值班结束时间'] = '';
                    } else {
                        obj['计划值班结束时间'] = data.data.content[i]['extraJihuajieshushijian'];
                    }
                    if (data.data.content[i]['quexiliyou'] == null) {
                        obj['缺岗理由'] = '';
                    } else {
                        obj['缺岗理由'] = data.data.content[i]['quexiliyou'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前缺岗记录没有数据！");
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
                XLSX.writeFile(wb, '缺岗记录.xlsx');
            }
        });
    }

    //获取审批list
    getshenpiList(value) {
        const THE = this;
        // $.ajax({
        //     type:'GET',
        //     url: SERVER + "huoquqingjiashenqingzhunagtaiMeiju",
        //     success: function (data) {
        //         let list = [];
        //         if (data.status != 0) {
        //             message.warning(data.message);
        //             return;
        //         }
        //         for (let i = 0; i < data.data.length; i++) {
        //             list.push(data.data[i]);
        //         }
        //         THE.setState({
        //             shenpi:value,
        //             shenpiList: list,
        //         });
        //     }
        // });
    }
    tongguo(){

    }
    jujue(){

    }
    componentDidMount() {
        this.fetch();
        this.getTree();
    }

    render() {
        let title = (
            <div id="myTitle">
                <Button style={{display: this.state.showcaidan}} onClick={this.yincangcaidan.bind(this)}><Icon type="left"/></Button>
                <div id="myTitleDiv">组织机构</div>
            </div>
        )
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col'
        }, {
            title: '销假人姓名',
            dataIndex: 'xingming',
        }, {
            title: '销假时间',
            dataIndex: 'xiaojiashijian',
        }, {
            title: '销假类型',
            dataIndex: 'xiaojialeixing',
        }, {
            title: '请假时间',
            dataIndex: 'qingjiashijian',
        }, {
            title: '审批状态',
            dataIndex: 'shenqingzhuangtai',
        },{
            title: '销假理由',
            dataIndex: 'liyou',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                if (record['shenqingzhuangtai'] == "申请中") {
                    return (
                        <span>
					      	<Popconfirm placement="topLeft" title="确认要通过这条销假申请?"
                                        onConfirm={this.tongguo.bind(this, record['shenqingdanbianhao'], record['processBaseId'])}
                                        okText="确认" cancelText="取消">
					        	<a>通过</a>
					    	</Popconfirm>
					    	<Divider type="vertical"/>
					    	<Popconfirm placement="topLeft" title="确认要拒绝这条销假申请?"
                                        onConfirm={this.jujue.bind(this, record['shenqingdanbianhao'], record['processBaseId'])}
                                        okText="确认" cancelText="取消">
					        	<a>拒绝</a>
					    	</Popconfirm>
                       </span>
                    )
                } else {
                    return (
                        <span>

                        </span>
                    )
                }
            },
        }];

        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;
        const {startValue, endValue, shenpi} = this.state;

        return (
            <div id="chaxuntongji">
                <Button style={{display: this.state.showanniu}} onClick={this.xianshicaidan.bind(this)}><Icon type="right"/></Button>
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
                    <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                        <FormItem label="开始时间">
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
                        <br/>
                        <FormItem label="查看范围">
                            {getFieldDecorator('chakanfanwei',{initialValue: "-1"})(
                                <Select style={{width:200}}>
                                    <Select.Option value="-1">管辖范围</Select.Option>
                                    <Select.Option value="所属范围">所属范围</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="审批状态">
                            <Select style={{width: 200}} value={shenpi} onChange={this.getshenpiList.bind(this)}>
                                <Select.Option value="-1">全部</Select.Option>
                                {/*{shenpiOptions}*/}
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.search.bind(this)}>
                                <Icon type="search"/>查询
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" onClick={this.output.bind(this)}>
                                <Icon type="export"/>导出
                            </Button>
                        </FormItem>
                        <br/>
                    </Form>
                    <Table
                        columns={columns}
                        dataSource={this.state.jiluList}
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