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
    message, Input, Select,Tree, Card,
} from 'antd';
import yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji from './yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji';
const {TreeNode} = Tree;


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
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji/:chepaihaoma'} component = {yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji} />
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
                pageSize : 10,
                current : 1
            },
            YingqucheliangList: [],
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
        let chakanfanwei = form.getFieldValue('chakanfanwei');
        if (typeof (chakanfanwei) == "undefined" || chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let jigoudaima = this.jigoudaima;
        let chepaihaoma = form.getFieldValue('chepaihaoma');
        if (typeof(chepaihaoma) == "undefined"||chepaihaoma == "-1") {
            chepaihaoma = '';
        }
        let page = params.page - 1;
        let size = params.rows;
        let cheliangleibie = 'GONGWUCHE';
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "huoquyingqucheliangliebiao?page="+page+"&size="+size+"&chepaihaoma="+chepaihaoma+"&cheliangLeixingEnum="+cheliangleibie,
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
        let title = (
            <div id="myTitle">
                <Button style={{display: this.state.showcaidan}} onClick={this.yincangcaidan.bind(this)}><Icon type="left"/></Button>
                <div id="myTitleDiv">组织机构</div>
            </div>
        )

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '车辆管理人',
            dataIndex: 'xingming',
        },{
            title: '车牌号码',
            dataIndex: 'chepaihaoma',
        }, {
            title: '车辆品牌',
            dataIndex: 'cheliangpinpai',
        },{
            title: '所属部门',
            dataIndex: 'suosubumen',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
			      	<Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji/'+record['chepaihaoma'] }>轨迹</Link>
			    </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

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
                <Form onSubmit={this.handleSubmit} layout="inline"  style={{margin:5}}>
                    <FormItem label="车牌号码">
                        {getFieldDecorator('chepaihaoma')(
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
                />
                </div>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
