import React from 'react';
import { Link, Route ,Switch } from 'react-router-dom';
import yingquguanlixin_yingquguanliyuan_baimingdanshanchu from './yingquguanlixin_yingquguanliyuan_baimingdanshanchu';
import yingquguanlixin_yingquguanliyuan_baimingdantianjia from './yingquguanlixin_yingquguanliyuan_baimingdantianjia';
import yingquguanlixin_yingquguanliyuan_xitongwaibaimingdantianjia from './yingquguanlixin_yingquguanliyuan_xitongwaibaimingdantianjia'
import {
    Select,
    Icon,
    Input,
    Form,
    Button,
    Table,
    message, Tabs, Divider, Popconfirm
} from 'antd';
const View = [];

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            pagination2: {
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            baimingdanList: [],
            bumenList:[],
            activeKey:"1",
            xitongwaibaimingdanList:[],
        };
    }

    //控制tab页方法
    callback(key) {
        const THE = this;
        THE.setState({
            activeKey: key,
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

    handleTableChange2 = (pagination2) => {
        const pager = { ...this.state.pagination2 };
        pager.current = pagination2.current;
        this.setState({
            pagination2: pager,
        });
        this.xitongwairenyuan({
            rows: pagination2.pageSize,
            page: pagination2.current,
        });
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let ssbm = form.getFieldValue('ssbm');
        if (typeof(ssbm) == "undefined"||ssbm == "-1") {
            ssbm = '';
        }
        let xm = form.getFieldValue('xm');
        if (typeof(xm) == "undefined") {
            xm = '';
        }
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        let renyuanleibie = '机构人员';
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "renlianshibiebaimingdanliebiao?suosubumen="+ssbm+"&xingming="+xm+"&page="+page+"&size="+size+"&renyuanleibie="+renyuanleibie,
            success: function (data) {
                let excelList = [];
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
                    baimingdanList: data.data.content,
                    pagination,
                });
            }
        });
    }

    xitongwairenyuan = (params = {rows: this.state.pagination2.pageSize,
        page: this.state.pagination2.current}) => {
        let form = this.props.form;
        let renyuanxingming = form.getFieldValue('renyuanxingming');
        if (typeof(renyuanxingming) == "undefined") {
            renyuanxingming = '';
        }
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        let renyuanleibie = '非机构人员';
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "renlianshibiebaimingdanliebiao?xingming="+renyuanxingming+"&page="+page+"&size="+size+"&renyuanleibie="+renyuanleibie,
            success: function (data) {
                let excelList = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                }
                const pagination2 = { ...THE.state.pagination2 };
                pagination2.total = data.data.totalElement;
                THE.setState({
                    xitongwaibaimingdanList: data.data.content,
                    pagination2,
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
    search2() {
        const pager = { ...this.state.pagination2 };
        pager.current = 1;
        this.setState({
            pagination2: pager,
        });
        this.xitongwairenyuan({
            rows: pager.pageSize,
            page: pager.current,
        });
    }

    getBumenList() {
        const THE = this;
        let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
        $.ajax({
            type:'GET',
            url: SERVER + "bumenXialaLiebiao?jigoumingcheng="+jigoumingcheng,
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
                    bumenList: list,
                });
            }
        });
    }

    toDelete(renyuanbianhao){
        const THE = this;
        $.ajax({
            type : "GET",
            url : SERVER+"shanchufeizuzhijigourenyuanbaimingdan?renyuanbiahao="+renyuanbianhao,
            success : function(data){
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("删除成功");
                THE.xitongwairenyuan();
            },
        });
    }

    componentWillUnmount() {
        View.activeKey = this.state.activeKey;
    }

    componentWillMount() {
        const {activeKey} = View;
        if (typeof (activeKey) !== "undefined") {
            this.setState({
                activeKey: activeKey,
            });
        }

    }

    componentDidMount() {
        this.getBumenList();
        this.fetch();
        this.xitongwairenyuan();
    }

    render() {

        const bumenOptions = this.state.bumenList.map(item => <Select.Option key={item['key']} value={item['bumenmingcheng']}>{item['bumenmingcheng']}</Select.Option>);

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
          width: '25%'
        },{
            title: '姓名',
            dataIndex: 'xingming',
          width: '25%'
        }, {
            title: '所属部门',
            dataIndex: 'suosubumen',
          width: '25%'
        }, {
            title: '性别',
            dataIndex: 'xingbiedaima',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
			      	<Link to={'yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_baimingdanshanchu/'+record['renyuanbianhao'] }>详情</Link>
			    </span>
            ),
        }];
        const columns2 = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
          width: '50%'
        },{
            title: '姓名',
            dataIndex: 'xingming',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                return (
                    <span>
                      <Popconfirm placement="topLeft" title="确认要删除该人员?"
                                  onConfirm={this.toDelete.bind(this, record['renyuanbianhao'])} okText="确认" cancelText="取消">
                        <a>删除</a>
                    </Popconfirm>
                        <Divider type="vertical"/>
                        <Link to={'yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_baimingdanshanchu/'+record['renyuanbianhao'] }>详情</Link>
                       </span>
                )
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                    <Tabs.TabPane tab="系统内人员白名单" key="1">
                        <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                            <FormItem label="所属部门">
                                {getFieldDecorator('ssbm',{initialValue: "-1"})(
                                    <Select style={{width:200}}>
                                        <Select.Option value="-1">全部</Select.Option>
                                        {bumenOptions}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="姓名">
                                {getFieldDecorator('xm')(
                                    <Input style={{width:200}}/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                                    <Icon type="search" />查询
                                </Button>
                            </FormItem>
                            <FormItem>
                                <Button>
                                    <Link to={'yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_baimingdantianjia' }><Icon type="plus" /><span>白名单添加</span></Link>
                                </Button>
                            </FormItem>
                        </Form>
                        <Table
                            columns={columns}
                            dataSource={this.state.baimingdanList}
                            pagination={this.state.pagination}
                            onChange={this.handleTableChange}
                            scroll={{ y: "calc(100vh - 485px)", x: true }}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="系统外人员白名单" key="2">
                        <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                            <FormItem label="姓名">
                                {getFieldDecorator('renyuanxingming')(
                                    <Input style={{width:200}}/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" onClick={this.search2.bind(this)}>
                                    <Icon type="search" />查询
                                </Button>
                            </FormItem>
                            <FormItem>
                                <Button>
                                    <Link to={'yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_xitongwaibaimingdantianjia' }><Icon type="plus" /><span>系统外人员白名单添加</span></Link>
                                </Button>
                            </FormItem>
                        </Form>
                        <Table
                            columns={columns2}
                            dataSource={this.state.xitongwaibaimingdanList}
                            pagination={this.state.pagination2}
                            onChange={this.handleTableChange2}
                            scroll={{ y: "calc(100vh - 485px)", x: true }}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

const AppComp = Form.create()(App);
export default AppComp;
