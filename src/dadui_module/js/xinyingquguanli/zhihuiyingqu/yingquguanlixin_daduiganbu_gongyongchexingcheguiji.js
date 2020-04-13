import React from 'react';
import {Link, Route ,Switch} from 'react-router-dom';
import XLSX from 'xlsx';
import {
    Icon,
    Form,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, Input, Select, Tree, DatePicker, Card,
} from 'antd';
const { TreeNode } = Tree;
import yingquguanlixin_daduiganbu_gongyongcheguijiguiji from './yingquguanlixin_daduiganbu_gongyongcheguijiguiji';
import ZuzhiTree from "../../../../common/components/TreeSideBar/index.js";

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
                    <Route path = {this.props.match.path +'/yingquguanlixin_daduiganbu_gongyongcheguijiguiji/:chepaihaoma'} component = {yingquguanlixin_daduiganbu_gongyongcheguijiguiji} />
                </Switch>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                current : 1
            },
            YingqucheliangList: [],
            treeList:[],
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
            type:'GET',
            url:SERVER+"daduiAllzhongduiList",
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

    jigoudaima = ''
    onSelect = (e) => {
        if (e!==null) {
            this.jigoudaima = e;
            this.fetch();
        }
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let chepaihaoma = form.getFieldValue('chepaihaoma');
        if (typeof(chepaihaoma) == "undefined"||chepaihaoma == "-1") {
            chepaihaoma = '';
        }
        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        let cheliangleibie = 'GONGWUCHE';
        const THE = this;
        let jigoudaima = this.jigoudaima;
        $.ajax({
            type:'get',
            url: SERVER + "huoquyingqucheliangliebiao?page="+page+"&size="+size+"&chepaihaoma="+chepaihaoma+"&cheliangLeixingEnum="+cheliangleibie+"&jigoudaima="+jigoudaima,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    YingqucheliangList: data.data.content,
                    pagination,
                });
            }
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
        this.getTree();
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
            width:'18%'
        },{
            title: '车辆管理人',
            dataIndex: 'xingming',
            width:'20%'
        },{
            title: '车牌号码',
            dataIndex: 'chepaihaoma',
            width:'20%'
        }, {
            title: '车辆品牌',
            dataIndex: 'cheliangpinpai',
            width:'25%'
        },{
            title: '所属部门',
            dataIndex: 'suosubumen',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
			      	<Link to={this.props.match.url+'/yingquguanlixin_daduiganbu_gongyongcheguijiguiji/'+record['chepaihaoma'] }>轨迹</Link>
			    </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        let tableList;
        tableList = (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline"  style={{margin:5}}>
                    <FormItem label="车牌号码">
                        {getFieldDecorator('chepaihaoma')(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.YingqucheliangList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 370px)", x: true }}
                />
            </div>
        );

        return (
            <div id="chaxuntongji">
                 <ZuzhiTree  onSelect={this.onSelect}  />

                <div id="treeRight" style={{flex:1}}>
                    {tableList}
                </div>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
