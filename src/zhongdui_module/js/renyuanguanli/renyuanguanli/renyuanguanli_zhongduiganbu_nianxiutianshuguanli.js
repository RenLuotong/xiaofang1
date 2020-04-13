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
import renyuanguanli_zhongduiganbu_nianxiutianshuguanlixinzeng
    from './renyuanguanli_zhongduiganbu_nianxiutianshuguanlixinzeng';
import moment from "moment";
import YearPicker from "../../userInfo/YearPicker.js";
const {TreeNode} = Tree;
const View = [];

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={this.props.match.path} component={AppComp}/>
                    <Route path={this.props.match.path + '/renyuanguanli_zhongduiganbu_nianxiutianshuguanlixinzeng/'}
                           component={renyuanguanli_zhongduiganbu_nianxiutianshuguanlixinzeng}/>
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
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            jiluList: [],
            shenpi: '',
        };
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
        let size = params.rows === undefined ? 10 : params.rows;
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
        $.ajax({
            type: 'get',
            url: SERVER + "activiti/process/instances/i-start?page="+page+"&size="+size+"&processDefinitionKey="+processDefinitionKey+"&search="+search,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }

                for (let i = 0; i < data.data.content.length; i++) {
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

    filterByYear(value) {
        this.props.form.setFieldsValue(
            {
                nianfen:value
            }
        )
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
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
          width: '10%'
        }, {
            title: '申请人姓名',
            dataIndex: 'form.shenqingrenxingming',
          width: '10%'
        }, {
            title: '申请人职务',
            dataIndex: 'form.shenqingrenzhiwu',
          width: '15%'
        }, {
            title: '申请时间',
            dataIndex: 'startTime',
          width: '10%'
        }, {
            title: '年份',
            dataIndex: 'form.nianfen',
          width: '10%'
        }, {
            title: '天数',
            dataIndex: 'form.tianshu',
          width: '15%'
        }, {
            title: '当前审批人姓名',
            dataIndex: 'form.shenpirenyuanxingming',
        }, {
            title: '申请单状态',
            dataIndex: 'form.shenqingdanzhuangtai',
        }];

        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;
        const {shenpi} = this.state;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}} id="nianxiu">
                    <FormItem label="姓名">
                        {getFieldDecorator('xingming')(
                            <Input style={{width: 200}}/>
                        )}
                    </FormItem>
                    <FormItem label="年份">
                        {getFieldDecorator('nianfen')(
                            <YearPicker  operand={12} callback={this.filterByYear.bind(this)}/>
                            // <Input style={{width: 200}}/>
                        )}
                    </FormItem>
                    <FormItem label="申请状态">
                        <Select style={{width: 200}} value={shenpi} onChange={this.getshenpiList.bind(this)}>
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
                    <FormItem style={{bottom: 10}}>
                        <Button>
                            <Link
                                to={this.props.match.url + '/renyuanguanli_zhongduiganbu_nianxiutianshuguanlixinzeng'}>
                                <Icon type="plus"/><span>年休申请</span>
                            </Link>
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.jiluList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 405px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;