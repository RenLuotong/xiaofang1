import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import XLSX from 'xlsx';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Select, Tree, Card,
} from 'antd';
import YearPicker from "../../../../zhongdui_module/js/userInfo/YearPicker.js";
import ZuzhiTree from "../../../../common/components/TreeSideBar/index.js";
const {TreeNode} = Tree;
const View = [];
import moment from "moment";

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
                showQuickJumper: true,
                showSizeChanger: true,
                current: 1
            },
            jiluList: [],
            shenpiList: [],
            shenpi: '',
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
        if (e!==null) {
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
        let size = params.rows===undefined?10:params.rows;
        let processDefinitionKey = nianjiashichangprocessKey;
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
        let xingming = form.getFieldValue('xingming');
        if (typeof (xingming) !== "undefined" && xingming !== null && xingming !== '') {
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "shenqingrenxingming~"+xingming;
            }else{
                search = search + ",shenqingrenxingming~"+xingming;
            }
        }
        let nianfen = form.getFieldValue('nianfen');
        if (typeof (nianfen) !== "undefined" && nianfen !== null && nianfen !== '') {
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "nianfen="+nianfen;
            }else{
                search = search + ",nianfen="+nianfen;
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
        }
        $.ajax({
            type: 'get',
            url: SERVER + "activiti/process/instances/i-approval?page=0&size=10000"+"&processDefinitionKey="+processDefinitionKey+"&search="+search,
            success: function (data) {
                let list = [];
                let renyuanbianhao = sessionStorage.getItem("renyuanbianhao");
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }

                for (let i = 0; i < data.data.content.length; i++) {
                    for(let j = 0;j<data.data.content[i].historicUserTaskInstanceList.length;j++){
                        console.log(data.data.content[i].historicUserTaskInstanceList[j].endTime);
                        if(data.data.content[i].historicUserTaskInstanceList[j].assignee.renyuanbianhao == renyuanbianhao && (data.data.content[i].historicUserTaskInstanceList[j].endTime !== null && data.data.content[i].historicUserTaskInstanceList[j].endTime !== '')){
                            data.data.content[i]["shenpizhuangtai"] = '已审批';
                        }else{
                            data.data.content[i]["shenpizhuangtai"] = '未审批';
                        }

                    }
                    data.data.content[i]["startTime"] = moment(data.data.content[i]["startTime"]).format('YYYY-MM-DD HH:mm:ss');
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

    tongguo(taskId,tianshu) {
        const THE = this;
        let variables = {};
        let shenqingdanzhuangtai = '已通过';
        let shenpiliuzhuangtai  = '同意';
        variables.shenpirenyuanbianhao = '';
        variables.shenpirenyuanxingming = '';
        variables.shenqingdanzhuangtai = shenqingdanzhuangtai;
        variables.shenpiliuzhuangtai = shenpiliuzhuangtai;
        variables.tianshu = tianshu;
        $.ajax({
            type: 'POST',
            url: SERVER + "activiti/completeTask?taskId="+taskId,
            data: JSON.stringify(variables),
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("审批成功");
                THE.setState({
                    selectedRowKeys: [],
                    selectList: [],
                });
                THE.fetch();
            }
        });

    }

    jujue(taskId,tianshu) {
        const THE = this;
        let variables = {};
        let shenqingdanzhuangtai = '已拒绝';
        let shenpiliuzhuangtai  = '拒绝';
        variables.shenpirenyuanbianhao = '';
        variables.shenpirenyuanxingming = '';
        variables.shenqingdanzhuangtai = shenqingdanzhuangtai;
        variables.shenpiliuzhuangtai = shenpiliuzhuangtai;
        variables.tianshu = tianshu;
        $.ajax({
            type: 'POST',
            url: SERVER + "activiti/completeTask?taskId="+taskId,
            data: JSON.stringify(variables),
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("审批成功");
                THE.setState({
                    selectedRowKeys: [],
                    selectList: [],
                });
                THE.fetch();
            }
        });
    }

    pilaingtongguo() {//批量通过
        const THE = this;
        let selectList = THE.state.selectList;
        let variablesMap = [];
        if (selectList == null || selectList.length == 0) {
            message.warning("请选择要审批的申请");
            return;
        } else {
            for (let i = 0; i < selectList.length; i++) {
                let length = selectList[i].historicUserTaskInstanceList.length-1;
                let taskInstanceId = selectList[i].historicUserTaskInstanceList[length].taskInstanceId;
                let variables = {};
                let shenqingdanzhuangtai = '已通过';
                let shenpiliuzhuangtai  = '同意';
                variables.shenpirenyuanbianhao = '';
                variables.shenpirenyuanxingming = '';
                variables.shenqingdanzhuangtai = shenqingdanzhuangtai;
                variables.shenpiliuzhuangtai = shenpiliuzhuangtai;
                variables.tianshu = selectList[i]['form'].tianshu;
                variables.taskId = taskInstanceId;
                variablesMap.push(variables)
            }
        }
        $.ajax({
            type: 'POST',
            url: SERVER + "activiti/completeTaskBatch",
            data: JSON.stringify(variablesMap),
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("审批成功")
                THE.setState({
                    selectedRowKeys: [],
                    selectList: [],
                });
                THE.fetch();
            }
        });
    }

    filterByYear(value) {
        this.props.form.setFieldsValue(
            {
                nianfen:value
            }
        )
    }

    nainfenInputChange(processInstanceId,event) {
        const target = event.target;
        const value = target.value;
        let jiluList = this.state.jiluList;
        for(let i = 0;i<jiluList.length;i++){
            if(jiluList[i].processInstanceId === processInstanceId){
                jiluList[i]['form'].tianshu = value;
            }
        }
        this.setState({
            jiluList : jiluList
        });
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
            width:'10%'
        }, {
            title: '申请人机构名称',
            dataIndex: 'form.jigoumingcheng',
            width:'7%'
        }, {
            title: '申请人姓名',
            dataIndex: 'form.shenqingrenxingming',
            width:'7%'
        }, {
            title: '申请人职务',
            dataIndex: 'form.shenqingrenzhiwu',
            width:'10%'
        }, {
            title: '申请时间',
            dataIndex: 'startTime',
            width:'7%'
        }, {
            title: '年份',
            dataIndex: 'form.nianfen',
            width:'10%'
        },{
            title: '天数',
            dataIndex: 'tianshu',
            width:'7%',
            render: (text, record) =>{
                if (record['shenpizhuangtai'] == "未审批") {
                    return (
                        <span>
			    	<input value={record['form'].tianshu} onChange={this.nainfenInputChange.bind(this,record.processInstanceId)} style={{width:50}}/>
			         </span>
                    )
                }else {
                    return (
                        <span>{record['form'].tianshu}</span>
                    )
                }
            }
        }, {
            title: '当前审批人姓名',
            dataIndex: 'form.shenpirenyuanxingming',
            width:'7%'
        }, {
            title: '申请单状态',
            dataIndex: 'form.shenqingdanzhuangtai',
            width:'7%'
        }, {
            title: '审批状态',
            dataIndex: 'shenpizhuangtai',
        }, {
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                if (record['shenpizhuangtai'] == "未审批") {
                    return (
                        <span>
					      	<Popconfirm placement="topLeft" title="确认要通过这条年休申请?"
                                        onConfirm={this.tongguo.bind(this, record['historicUserTaskInstanceList'][record.historicUserTaskInstanceList.length-1].taskInstanceId,record['form'].tianshu)} okText="确认"
                                        cancelText="取消">
					        	<a>通过</a>
					    	</Popconfirm>
					    	<Divider type="vertical"/>
					    	<Popconfirm placement="topLeft" title="确认要拒绝这条年休申请?"
                                        onConfirm={this.jujue.bind(this, record['historicUserTaskInstanceList'][record.historicUserTaskInstanceList.length-1].taskInstanceId,record['form'].tianshu)} okText="确认"
                                        cancelText="取消">
					        	<a>拒绝</a>
					    	</Popconfirm>
                       </span>
                    )
                } else {
                    return
                }
            }
        }];

        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;
        const {shenpi} = this.state;

        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys : selectedRowKeys,
                    selectList : selectedRows,
                });
            },
            getCheckboxProps: record => ({
                disabled: record.form.shenqingdanzhuangtai !== '申请中', // 状态非申请中不可以选
            }),
        };

        return (
            <div id="chaxuntongji">
               <ZuzhiTree  onSelect={this.onSelect} />
                <div id="treeRight" style={{flex:1}}>
                    <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}} id="nianxiu">
                        <FormItem label="姓名">
                            {getFieldDecorator('xingming')(
                                <Input style={{margin: 5, width: 200}}/>
                            )}
                        </FormItem>
                        <FormItem label="查看范围" style={{margin: 3}}>
                            {getFieldDecorator('chakanfanwei', {initialValue: "-1"})(
                                <Select style={{margin: 5, width: 200}}>
                                    <Select.Option value="-1">管辖范围</Select.Option>
                                    <Select.Option value="所属范围">所属范围</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="年份">
                            {getFieldDecorator('nianfen')(
                                <YearPicker  operand={12} callback={this.filterByYear.bind(this)}/>
                                // <Input style={{margin: 5, width: 200}}/>
                            )}
                        </FormItem>
                        <FormItem label="申请状态">
                            <Select style={{margin: 5, width: 200}} value={shenpi}
                                    onChange={this.getshenpiList.bind(this)}>
                                <Select.Option value="-1">全部</Select.Option>
                                <Select.Option value="申请中">申请中</Select.Option>
                                <Select.Option value="已通过">已通过</Select.Option>
                                <Select.Option value="已拒绝">已拒绝</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.search.bind(this)}>
                                <Icon type="search"/>查询
                            </Button>
                        </FormItem>
                        <br/>
                        <FormItem>
                            <Button onClick={this.pilaingtongguo.bind(this)}>
                                批量通过
                            </Button>
                        </FormItem>
                    </Form>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.jiluList}
                        pagination={false}
                        onChange={this.handleTableChange}
                        scroll={{ y: "calc(100vh - 446px)", x: true }}
                    />
                </div>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;