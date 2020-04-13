import React, { Component } from 'react';
import {message,Button,Table,Form,Select,Input,Icon,Divider,Tabs,Tree,Card} from 'antd';
import {Link, Route ,Switch} from 'react-router-dom';
import zhuangbeiguanli_zhiduirenyuan_zhuangbeixiangqing from './zhuangbeiguanli_zhiduirenyuan_zhuangbeixiangqing';
const FormItem = Form.Item;
const { TreeNode } = Tree;

const View = [];

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
                    <Route path = {this.props.match.path +'/zhuangbeiguanli_zhiduirenyuan_zhuangbeixiangqing/:id'} component = {zhuangbeiguanli_zhiduirenyuan_zhuangbeixiangqing} />
                </Switch>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leixingbianhao:this.props.match.params.leixingbianhao,
            treeList:[],
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                current: 1
            },
            zhuangbeiList: [],
            jigouList:[],
            jigoumingcheng:'',
            zhuangtai:''
        };
    }

    getJigouList(value) {
        const THE = this;
        let juese = '装备科科长';
        {
            $.ajax({
                type: 'GET',
                url: SERVER + "zhiduiAllZhongduiList?juese="+juese,
                success: function (data) {
                    let list = [];
                    if (data.status != 0) {
                        message.warning(data.message);
                        return;
                    }
                    for (let i = 0; i < data.data.length; i++) {
                        data.data[i]["key"] = i;
                        list.push(data.data[i]);
                    }
                    THE.setState({
                        jigouList: list,
                        jigoumingcheng: value,
                    });
                }
            });
        }

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

    fetch = (params = {
        rows: this.state.pagination.pageSize,
        page: this.state.pagination.current
    }) => {
        let form = this.props.form;
        // let leixingmingcheng = form.getFieldValue('leixingmingcheng');
        // if (typeof(leixingmingcheng) == "undefined") {
        //     leixingmingcheng = "";
        // }
        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        const THE = this;
        let jigoudaima = THE.state.jigoumingcheng;
        if (jigoudaima == "-1" || typeof(jigoudaima) == "undefined") {
            jigoudaima = "";
        }
        let zhuangtai=this.state.zhuangtai;
        if (typeof (zhuangtai)=="undefined" || zhuangtai == '-1'){
            zhuangtai="";
        }
        let leixingbianhao = THE.state.leixingbianhao;
        $.ajax({
            type:'GET',
            url: SERVER + "xqzhuangbeitongji/dazhidui?page="+page+"&size="+size+"&shiyongzhuangtai="+zhuangtai+"&leixingbianhao="+leixingbianhao+"&jigoudaima="+jigoudaima+"&sort=id,desc",
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.length;
                THE.setState({
                    zhuangbeiList: list,
                    pagination,
                });
            }
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

    getzhuangtaiList(value) {
        const THE = this;
        THE.setState({
            zhuangtai:value,
        });
    }


    // componentWillUnmount() {
    //     View.fields = this.props.form.getFieldsValue();
    //     View.pagination = this.state.pagination;
    // }
    //
    // componentWillMount(){
    //     const { fields,pagination,} = View;
    //     this.props.form.setFieldsValue(fields);
    //     if(typeof(pagination) !== "undefined"){
    //         this.setState({
    //             pagination: pagination,
    //         });
    //     }
    // }


    componentDidMount() {
        this.fetch();
        this.getJigouList();
    }

    render() {
        const jizhouOptions = this.state.jigouList.map(item => <Select.Option key={item['id']}
                                                                              value={item['jigoudaima']}>{item['jigoumingcheng']}</Select.Option>);

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
            width:'33%'
        }, {
            title: '机构名称',
            dataIndex: 'jigoumingcheng',
            width:'33%'
        }, {
            title: '装备类型名称',
            dataIndex: 'leixingmingcheng',
        }, {
            title: '数量',
            dataIndex: 'shuliang',
        }];
        const {getFieldDecorator} = this.props.form;
        const {jigoumingcheng,zhuangtai} = this.state;
        return (
                    <div>
                        <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                            <FormItem label="组织机构">
                                <Select style={{width: 200}} value={jigoumingcheng} onChange={this.getJigouList.bind(this)}>
                                    <Select.Option value="-1">全部</Select.Option>
                                    {jizhouOptions}
                                </Select>
                            </FormItem>
                            <FormItem label="使用状态">
                                <Select style={{width: 200}} value={zhuangtai} onChange={this.getzhuangtaiList.bind(this)}>
                                    <Select.Option value="-1">全部</Select.Option>
                                    <Select.Option value="执勤">执勤</Select.Option>
                                    <Select.Option value="库存">库存</Select.Option>
                                    <Select.Option value="报废">报废</Select.Option>
                                </Select>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                                    <Icon type="search" />查询
                                </Button>
                            </FormItem>
                        </Form>
                        <Table
                            columns={columns}
                            dataSource={this.state.zhuangbeiList}
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
