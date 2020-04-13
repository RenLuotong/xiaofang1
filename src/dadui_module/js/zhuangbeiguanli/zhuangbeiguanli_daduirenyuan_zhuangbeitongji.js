import React, { Component } from 'react';
import {message,Button,Table,Form,Select,Input,Icon,Divider,Tabs,Tree,Card} from 'antd';
import {Link, Route ,Switch} from 'react-router-dom';
import zhuangbeiguanli_daduirenyuan_zhuangbeitongjixiangqing from './zhuangbeiguanli_daduirenyuan_zhuangbeitongjixiangqing';
import ZhuangbeiTree from '../../../common/components/TreeSideBar/ZhuangbeiTree';
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
                    <Route path = {this.props.match.path +'/zhuangbeiguanli_daduirenyuan_zhuangbeitongjixiangqing/:leixingbianhao'} component = {zhuangbeiguanli_daduirenyuan_zhuangbeitongjixiangqing} />
                </Switch>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            treeList:[],
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                current: 1
            },
            zhuangbeiList: [],
            showcaidan: "block",
            showanniu: "none",
            zhuangtai:'',
            romdata: null
        };
    }

    getTree() {
        const THE = this;
        THE.setState({
            treeList:[]
        });
        let form = this.props.form;
        let leixingmingcheng = form.getFieldValue('leixingmingcheng');
        if (typeof(leixingmingcheng) == "undefined") {
            leixingmingcheng = "";
        }
        let zhuangtai=this.state.zhuangtai;
        if (typeof (zhuangtai)=="undefined" || zhuangtai == '-1'){
            zhuangtai="";
        }
        $.ajax({
            type:'GET',
            url:SERVER+"lbzhuangbeitongji/Web/leibie?leixingmingcheng="+leixingmingcheng+"&shiyongzhuangtai="+zhuangtai,
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                let treeList = THE.state.treeList;
                treeList.push(data.data);
                THE.setState({
                    treeList:treeList
                });
            }
        });
    }

    leibiebianhao = ''

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
        let leixingmingcheng = form.getFieldValue('leixingmingcheng');
        if (typeof(leixingmingcheng) == "undefined") {
            leixingmingcheng = "";
        }
        let zhuangtai=this.state.zhuangtai;
        if (typeof (zhuangtai)=="undefined" || zhuangtai == '-1'){
            zhuangtai="";
        }
        let leibiebianhao = this.leibiebianhao;
        if(leibiebianhao === '0-0'){
            leibiebianhao = ''
        }

        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "lbzhuangbeitongji/Web/leixing?page="+page+"&size="+size+"&shiyongzhuangtai="+zhuangtai+"&leixingmingcheng="+leixingmingcheng+"&leibiebianhao="+leibiebianhao+"&sort=id,desc",
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
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
            romdata: Math.random()
        });
        this.getTree();
        this.fetch({
            rows: pager.pageSize,
            page: pager.current,
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

    getzhuangtaiList(value) {
        const THE = this;
        THE.setState({
            zhuangtai:value,
        });
    }

    componentDidMount() {
        this.getTree();
        this.fetch();
    }

    onSelectTree = (e) => {
        if (e !== null) {
          this.leibiebianhao = e;
          this.fetch();
        }
      }

    render() {
        let form = this.props.form;
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
            width:'30%'
        }, {
            title: '类型名称',
            dataIndex: 'leixingmingcheng',
            width:'30%'
        }, {
            title: '数量',
            dataIndex: 'leixingshuliang',
        }, {
            title: '操作',
            render: (text, record, index) => (
                <span>
                    	<Link to={this.props.match.url + '/zhuangbeiguanli_daduirenyuan_zhuangbeitongjixiangqing/' + record['leixingbianhao']}>详情</Link>
			    	</span>
            ),
        }
        ];

        const {getFieldDecorator} = this.props.form;
        const {zhuangtai} = this.state;
        return (
            <div id="chaxuntongji">
                <ZhuangbeiTree onSelect={this.onSelectTree} mingcheng={form.getFieldValue('leixingmingcheng')} zhuangtai={this.state.zhuangtai} key={this.state.romdata} />

                <div id="treeRight" style={{flex:1}}>
                    <div>
                        <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                            <FormItem label="类型名称">
                                {getFieldDecorator('leixingmingcheng',)(
                                    <Input style={{width:200}}/>
                                )}
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
                </div>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
