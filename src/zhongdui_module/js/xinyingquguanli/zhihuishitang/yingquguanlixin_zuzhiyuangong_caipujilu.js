import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
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

// class Appmain extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//
//         };
//     }
//
//     render() {
//         return(
//             <div>
//                 <Switch>
//                     <Route exact path = {this.props.match.path} component = {AppComp} />
//                 </Switch>
//             </div>
//         );
//     }
// }

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            pagination2: {
                pageSize : 10,
                current : 1
            },
            //每周菜谱列表
            jiluList: [],
            //每日菜谱列表
            meirList: {},
            activeKey:"1",
            riqi: new  Date(),
            shenpizhuangtaiList: [],

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
        let size = params.rows;
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
            riqi = moment(new Date()).format('YYYY-MM-DD');;
        } else {
            riqi = moment(riqi).format('YYYY-MM-DD');
        }
        let page = params.page - 1;
        let size = params.rows;
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


    componentDidMount() {
        this.fetch();
        this.getshenpizhuangtaiList();
        this.getmeiricaipuList();
    }

    render() {
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { riqi} = this.state;
        let meirList=this.state.meirList;

        return (
            <div>
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
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default AppComp;
