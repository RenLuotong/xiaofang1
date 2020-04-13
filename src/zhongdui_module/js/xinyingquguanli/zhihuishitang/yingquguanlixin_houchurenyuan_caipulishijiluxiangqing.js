import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
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
    Popover, Card, Tag,Statistic
} from 'antd';


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
                pageSize : 10,
                current : 1
            },
            jiluList: [],
            id:this.props.match.params.id,
            nianfen:'',
            zhouci:'',
            startTime:'',
            endTime:'',
        };
    }

    //获取这周时间
    huoqushijian(){
        const THE = this;
        $.ajax({
            type:'post',
            url: SERVER + "tb-zhouhouxuan-zhubiaos/chushihuaShijian",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    nianfen: data.data.nianfen,
                    zhouci: data.data.zhouci,
                    startTime: data.data.startTime,
                    endTime: data.data.endTime,
                });
            }
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
    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type:'get',
            url: SERVER + "tb-zhoucaipus/"+id,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                //组织数据
                let obj1 = {};
                obj1.id = 1;
                obj1.xingqi = '周一';
                let obj2 = {};
                obj2.id = 2;
                obj2.xingqi = '周二';
                let obj3 = {};
                obj3.id = 3;
                obj3.xingqi = '周三';
                let obj4 = {};
                obj4.id = 4;
                obj4.xingqi = '周四';
                let obj5 = {};
                obj5.id = 5;
                obj5.xingqi = '周五';
                let obj6 = {};
                obj6.id = 6;
                obj6.xingqi = '周六';
                let obj7 = {};
                obj7.id = 7;
                obj7.xingqi = '周日';
                obj1.zaofan = THE.zuzhishuju(data.data.zhouyi.zaofan);
                obj1.wufan = THE.zuzhishuju(data.data.zhouyi.wufan);
                obj1.wanfan = THE.zuzhishuju(data.data.zhouyi.wanfan);
                obj2.zaofan = THE.zuzhishuju(data.data.zhouer.zaofan);
                obj2.wufan = THE.zuzhishuju(data.data.zhouer.wufan);
                obj2.wanfan = THE.zuzhishuju(data.data.zhouer.wanfan);
                obj3.zaofan = THE.zuzhishuju(data.data.zhousan.zaofan);
                obj3.wufan = THE.zuzhishuju(data.data.zhousan.wufan);
                obj3.wanfan = THE.zuzhishuju(data.data.zhousan.wanfan);
                obj4.zaofan = THE.zuzhishuju(data.data.zhousi.zaofan);
                obj4.wufan = THE.zuzhishuju(data.data.zhousi.wufan);
                obj4.wanfan = THE.zuzhishuju(data.data.zhousi.wanfan);
                obj5.zaofan = THE.zuzhishuju(data.data.zhouwu.zaofan);
                obj5.wufan = THE.zuzhishuju(data.data.zhouwu.wufan);
                obj5.wanfan = THE.zuzhishuju(data.data.zhouwu.wanfan);
                obj6.zaofan = THE.zuzhishuju(data.data.zhouliu.zaofan);
                obj6.wufan = THE.zuzhishuju(data.data.zhouliu.wufan);
                obj6.wanfan = THE.zuzhishuju(data.data.zhouliu.wanfan);
                obj7.zaofan = THE.zuzhishuju(data.data.zhouri.zaofan);
                obj7.wufan = THE.zuzhishuju(data.data.zhouri.wufan);
                obj7.wanfan = THE.zuzhishuju(data.data.zhouri.wanfan);
                list.push(obj1)
                list.push(obj2)
                list.push(obj3)
                list.push(obj4)
                list.push(obj5)
                list.push(obj6)
                list.push(obj7)
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    jiluList: list,
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
        this.huoqushijian();
    }

    render() {

        const { nianfen, zhouci, startTime, endTime} = this.state;

        let caipuOptions = this.state.jiluList.map(item =>
            <Card title={item['xingqi']} bordered={false}>
                <div style={{margin:10,width:'25%',display: 'inline-block'}}>
                    <Statistic
                        title="早餐"
                        value={item['zaofan']}
                        valueStyle={{ color: 'blue',fontSize:'16px' }}
                    />
                </div>
                <div style={{margin:10,width:'25%',display: 'inline-block'}}>
                    <Statistic
                        title="午餐"
                        value={item['wufan']}
                        valueStyle={{ color: '#3f8600',fontSize:'16px' }}
                    />
                </div>
                <div style={{margin:10,width:'25%',display: 'inline-block'}}>
                    <Statistic
                        title="晚餐"
                        value={item['wanfan']}
                        valueStyle={{ color: '#cf1322',fontSize:'16px' }}
                    />
                </div>
            </Card>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '星期',
            dataIndex: 'xingqi',
        },{
            title: '早餐',
            dataIndex: 'zaofan',
        },{
            title: '午餐',
            dataIndex: 'wufan',
        },{
            title: '晚餐',
            dataIndex: 'wanfan',
        }];

        return (
            <div>
                {caipuOptions}
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
