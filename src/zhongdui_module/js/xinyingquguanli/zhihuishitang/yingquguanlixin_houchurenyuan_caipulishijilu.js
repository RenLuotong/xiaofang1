import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import yingquguanlixin_houchurenyuan_caipulishijiluxiangqing from './yingquguanlixin_houchurenyuan_caipulishijiluxiangqing';
import yingquguanlixin_houchurenyuan_caipulishijiluxinzeng from './yingquguanlixin_houchurenyuan_caipulishijiluxinzeng';
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
    Popover
} from 'antd';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            pagination: {
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            jiluList: [],
            shenpizhuangtaiList: [],
        };
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
    //获取每周菜谱列表
    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        const THE = this;
        let nianfen = form.getFieldValue('nianfen');
        if (typeof(nianfen) == "undefined") {
            nianfen = '';
        }
        let zhouci = form.getFieldValue('zhouci');
        if (typeof(zhouci) == "undefined") {
            zhouci = '';
        }
        let shenpizhuangtai = form.getFieldValue('shenpizhuangtai');
        if (typeof(shenpizhuangtai) == "undefined"|| shenpizhuangtai == '-1') {
            shenpizhuangtai = '';
        }
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        $.ajax({
            type:'Get',
            url: SERVER + "tb-zhoucaipus?page="+page+"&size="+size+"&nianfen="+nianfen+"&zhouci="+zhouci+"&shenpiZhuangtai="+shenpizhuangtai,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if(data.data.content[i]["shenpizhuangtai"] == 'Shenqingzhong'){
                        data.data.content[i]["shenpizhuangtai"] = '申请中'
                    }else if(data.data.content[i]["shenpizhuangtai"] == 'Tongyi'){
                        data.data.content[i]["shenpizhuangtai"] = '同意'
                    }else if(data.data.content[i]["shenpizhuangtai"] == 'Jujue'){
                        data.data.content[i]["shenpizhuangtai"] = '拒绝'
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    jiluList: list,
                    pagination,
                });
            }
        });
    }
    //获取审批状态
    getshenpizhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER + "tb-zhoucaipus/huoqushipushenpizhuangtai",
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

    //删除(被同意的菜谱不能删除）
    toDelete(id){
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER+"tb-zhoucaipus/shanchu?id="+id,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.fetch();
            }
        });
    }



    componentDidMount() {
        this.fetch();
        this.getshenpizhuangtaiList();

    }

    render() {
        let shenpizhuangtaiOptions = this.state.shenpizhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
          width: '20%'
        },{
            title: '年份',
            dataIndex: 'nianfen',
          width: '20%'
        },{
            title: '周次',
            dataIndex: 'zhouci',
          width: '20%'
        },{
            title: '审批状态',
            dataIndex: 'shenpizhuangtai',
        },  {
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                return (
                    <span>
                          	<Link to={'yingquguanlixin_zhongduiganbu_caipujilu/yingquguanlixin_houchurenyuan_caipulishijiluxiangqing/' + record['id'] }>详情</Link>
                        <Divider type="vertical"/>
                      <Popconfirm placement="topLeft" title="确认要删除该菜谱?"
                                  onConfirm={this.toDelete.bind(this, record['id'])} okText="确认" cancelText="取消">
                        <a>删除</a>
                    </Popconfirm>
                       </span>
                )
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="年份">
                        {getFieldDecorator('nianfen')(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="周次">
                        {getFieldDecorator('zhouci')(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="审批状态">
                        {getFieldDecorator('shenpizhuangtai')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {shenpizhuangtaiOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button>
                            <Link
                                to={'yingquguanlixin_zhongduiganbu_caipujilu/yingquguanlixin_houchurenyuan_caipulishijiluxinzeng'}><Icon
                                type="plus"/><span>新增菜谱申请</span></Link>
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.jiluList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 465px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default AppComp;
