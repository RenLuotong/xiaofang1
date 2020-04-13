import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import yingquguanlixin_zhongduiganbu_caipujiluxiangqing from './yingquguanlixin_zhongduiganbu_caipujiluxiangqing';
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
    Popover, Tabs, Card, Statistic
} from 'antd';
import ZDJL from "./yingquguanlixin_zuzhiyuangong_caipujilu";
import Yzjl from "./yingquguanlixin_houchurenyuan_caipulishijilu";
import yingquguanlixin_houchurenyuan_caipulishijiluxiangqing from './yingquguanlixin_houchurenyuan_caipulishijiluxiangqing';
import yingquguanlixin_houchurenyuan_caipulishijiluxinzeng from './yingquguanlixin_houchurenyuan_caipulishijiluxinzeng';
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
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_caipujiluxiangqing/:id'} component = {yingquguanlixin_zhongduiganbu_caipujiluxiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_houchurenyuan_caipulishijiluxiangqing/:id'} component = {yingquguanlixin_houchurenyuan_caipulishijiluxiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_houchurenyuan_caipulishijiluxinzeng'} component = {yingquguanlixin_houchurenyuan_caipulishijiluxinzeng} />
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
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            pagination2: {
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            //每周菜谱列表
            jiluList: [],
            //每日菜谱列表
            meirList: {},
            activeKey:"1",
            riqi: new  Date(),
            shenpizhuangtaiList: [],
            activeKey2:"1",
            showzuzhiyuangong:true,
            showzuzhilingdao:true,
            showshitangguanliyuan:true,
        };
    }
   //改变日期的值
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onriqiChange = (value) => {
        this.onChange('riqi', value);
    }

    //每周菜谱分页及查询
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

    //每日菜谱分页及查询
    handleTableChange2 = (pagination2) => {
        const pager = { ...this.state.pagination2 };
        pager.current = pagination2.current;
        this.setState({
            pagination2: pager,
        });
        this.fetch({
            rows: pagination2.pageSize,
            page: pagination2.current,
        });
    }
    meirisearch() {
        const pager = { ...this.state.pagination2 };
        pager.current = 1;
        this.setState({
            pagination2: pager,
        });
        this.getmeiricaipuList({
            rows: pager.pageSize,
            page: pager.current,
        });
    }

    //控制tab页方法
    callback(key) {
        const THE = this;
        THE.setState({
            activeKey: key,
        });
    }

    callback2(key) {
        const THE = this;
        THE.setState({
            activeKey2: key,
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
                   data.data.content[i]["shenqingshijian"] = moment(data.data.content[i]["shenqingshijian"]).format('YYYY-MM-DD HH:mm:ss');
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

    //审批通过
    tongguo(id){
        const THE = this;
        let shenpizhuangtai='同意';
        $.ajax({
            type:'POST',
            url: SERVER + "tb-zhoucaipus/shenpi?id="+id+"&zhuangtai="+shenpizhuangtai,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("审批成功");
                THE.fetch();
            }
        });
    }

    //审批拒绝
    jujue(id){
        const THE = this;
        let shenpizhuangtai='拒绝';
        $.ajax({
            type:'POST',
            url: SERVER + "tb-zhoucaipus/shenpi?id="+id+"&zhuangtai="+shenpizhuangtai,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("审批成功");
                THE.fetch();
            }
        });
    }

     //获取每日菜谱
    getmeiricaipuList = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        const THE = this;
        let riqi = THE.state.riqi;
        if (typeof(riqi) == "undefined"||riqi == null) {
            riqi = '';
        } else {
            riqi = moment(riqi).format('YYYY-MM-DD');
        }
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        $.ajax({
            type:'Get',
            url: SERVER + "tb-ricaipus/chakanMoutianCaipu?page="+page+"&size="+size+"&riqi="+riqi,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                //组织数据
                let obj = {};
                obj.zaofan = THE.zuzhishuju(data.data.zaofan);
                obj.wufan = THE.zuzhishuju(data.data.wufan);
                obj.wanfan = THE.zuzhishuju(data.data.wanfan);
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    meirList: obj,
                    pagination,
                });
            }
        });
    }

    //组织数据
    zuzhishuju(data){
        let shuju = '';
        for (let i = 0; i < data.length; i++) {
            if(data[i].caipinmingcheng !== '' && i !== data.length - 1){
                shuju += data[i].caipinmingcheng + ',';
            }else if(data[i].caipinmingcheng !== ''){
                shuju += data[i].caipinmingcheng;
            }
        }
        return shuju;
    }

    componentWillUnmount() {
        View.pagination = this.state.pagination;
        View.activeKey = this.state.activeKey;
        View.activeKey2 = this.state.activeKey2;
    }

    componentWillMount() {
        if(!View.activeKey){
            View.activeKey = '1';
        }
        if(!View.activeKey2){
            View.activeKey2 = '1';
        }
        const {pagination,activeKey,activeKey2} = View;
        this.setState({
            activeKey: activeKey,
            activeKey2: activeKey2,
        });
        if (typeof (pagination) !== "undefined") {
            this.setState({
                pagination: pagination,
            });
        }
        let jueselist = sessionStorage.getItem("jueselist");
        if(button_quanxian('showzuzhiyuangong',jueselist) === true){
            this.setState({
                showzuzhiyuangong: false,
            });
        };
        if(button_quanxian('showzuzhilingdao',jueselist) === true){
            this.setState({
                showzuzhilingdao: false,
            });
        };
        if(button_quanxian('showshitangguanliyuan',jueselist) === true){
            this.setState({
                showshitangguanliyuan: false,
            });
        };
    }


    componentDidMount() {
        this.fetch();
        this.getshenpizhuangtaiList();
        this.getmeiricaipuList();
    }

    render() {
        let shenpizhuangtaiOptions = this.state.shenpizhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );
        let meirList=this.state.meirList;
        //每周菜谱table列
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
          width: '10%'
        },{
            title: '年份',
            dataIndex: 'nianfen',
          width: '10%'
        },{
            title: '周次',
            dataIndex: 'zhouci',
          width: '10%'
        },{
            title: '申请人姓名',
            dataIndex: 'shenqingrenXingming',
          width: '15%'
        },{
            title: '申请时间',
            dataIndex: 'shenqingshijian',
          width: '15%'
        },{
            title: '审批状态',
            dataIndex: 'shenpizhuangtai',
        },  {
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                if (record['shenpizhuangtai'] == "申请中") {
                    return (
                        <span>
                        <Popconfirm placement="topLeft" title="确认要通过该菜谱申请?"
                                    onConfirm={this.tongguo.bind(this, record['id'])} okText="确认" cancelText="取消">
					        	<a>通过</a>
					    	</Popconfirm>
					    	<Divider type="vertical"/>
					    	<Popconfirm placement="topLeft" title="确认要拒绝该菜谱申请?"
                                        onConfirm={this.jujue.bind(this, record['id'])} okText="确认" cancelText="取消">
					        	<a>拒绝</a>
					    	</Popconfirm>
                            <Divider type="vertical"/>
                          	<Link to={this.props.match.url + '/yingquguanlixin_zhongduiganbu_caipujiluxiangqing/' + record['id']}>详情</Link>
                       </span>
                    )
                }else {
                    return(
                    <span>
                          	<Link to={this.props.match.url + '/yingquguanlixin_zhongduiganbu_caipujiluxiangqing/' + record['id']}>详情</Link>
                    </span>
                    ) }
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { riqi} = this.state;

        return (
            <div>
                <Tabs activeKey={this.state.activeKey2} onChange={this.callback2.bind(this)}>
                <Tabs.TabPane tab="组织员工" key="1" disabled={this.state.showzuzhiyuangong}>
                    <ZDJL />
                </Tabs.TabPane>
                 <Tabs.TabPane tab="组织领导" key="2" disabled={this.state.showzuzhilingdao}>
                <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                <Tabs.TabPane tab="每周菜谱" key="1">
                    <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
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
                    </Form>
                    <Table
                        columns={columns}
                        dataSource={this.state.jiluList}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                        scroll={{ y: "calc(100vh - 485px)", x: true }}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="每日菜谱" key="2">
                    <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="日期">
                        {getFieldDecorator('riqi')(
                            <DatePicker
                                value={riqi}
                                placeholder="日期"
                                format="YYYY-MM-DD"
                                onChange={this.onriqiChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.meirisearch.bind(this)}>
                                <Icon type="search" />查询
                            </Button>
                        </FormItem>
                    </Form>
                    <Card title="早餐" bordered={false}>
                        <span style={{ color: 'blue',fontSize:'16px' }}>{meirList['zaofan']}</span>
                    </Card>
                    <Card title="午餐" bordered={false}>
                        <span style={{ color: '#3f8600',fontSize:'16px' }}>{meirList['wufan']}</span>
                    </Card>
                    <Card title="晚餐" bordered={false}>
                        <span style={{ color: '#cf1322',fontSize:'16px' }}>{meirList['wanfan']}</span>
                    </Card>
                </Tabs.TabPane>
                </Tabs>
                </Tabs.TabPane>
                <Tabs.TabPane tab="食堂管理员" key="3" disabled={this.state.showshitangguanliyuan}>
                   <Yzjl />
                </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
