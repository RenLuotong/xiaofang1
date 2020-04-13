import React, { Component } from 'react';
import {message,Button,Table,Form,Select,DatePicker,Icon,Divider,Popconfirm,
    Modal} from 'antd';
import {Link, Route ,Switch} from 'react-router-dom';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

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
                showQuickJumper: true,
                showSizeChanger: true,
                current : 1
            },
            wuziList: [],
            startValue: null,
            endValue: null,
            jigoumingcheng: '',
            jigouList: [],
            visible: false,
            liyouList: [],
            liyou:'',
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




    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        const THE = this;
        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        $.ajax({
            type:'GET',
            url: SERVER + "gerenfanghuDaibanLiebiao",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    list.push(data.data[i]);
                }
                // const pagination = { ...THE.state.pagination };
                // pagination.total = data.data.totalElement;
                THE.setState({
                    wuziList: list,
                    // pagination,
                });
            }
        });
    }

    chakan(item) {
        const THE = this;
        if (item.zhuwu == "装备科科长") {
            if (item.daibanleixing == "库存申请") {
                window.location.href = "zhidui.html#/gerenfanghu_zhuangbeikekezhang_kucunshenqingjilu/gerenfanghu_zhuangbeikekezhang_kucunshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "物资调拨") {
                window.location.href = "zhidui.html#/gerenfanghu_zhuangbeikekezhang_wuzidiaobo/gerenfanghu_zhuangbeikekezhang_wuzidiaoboxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "维修") {
                window.location.href = "zhidui.html#/gerenfanghu_zhuangbeikekezhang_weixiujilu/gerenfanghu_zhuangbeikekezhang_weixiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "报废") {
                window.location.href = "zhidui.html#/gerenfanghu_zhuangbeikekezhang_baofeijilu/gerenfanghu_zhuangbeikekezhang_baofeijiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "消防车维修") {
                window.location.href = "zhidui.html#/qicai_zhuangbeikezhang_xiaofangcheweixiujilu/xiaofangcheweixiujiluxiangqing/"  + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材库存申请") {
                window.location.href = "zhidui.html#/qicai_zhuangbeikezhang_kucunshenqingjilu/qicai_zhuangbeikezhang_kucunshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材调拨申请") {
                window.location.href = "zhidui.html#/qicai_zhuangbeikezhang_diaobojilu/diaobojiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }
            else if (item.daibanleixing == "器材一级库维修") {
                window.location.href = "zhidui.html#/qicai_zhuangbeikezhang_qicaiweixiujilu/qicaiweixiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }
            else if (item.daibanleixing == "器材一级库报废") {
                window.location.href = "zhidui.html#/qicai_zhuangbeikezhang_qicaibaofeijilu/qicaibaofeijiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }
        } else if (item.zhuwu == "后勤处处长") {
            if (item.daibanleixing == "库存申请") {
                window.location.href = "zhidui.html#/gerenfanghu_houqinchuchuzhang_kucunshenqingjilu/gerenfanghu_houqinchuchuzhang_kucunshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "物资调拨") {
                window.location.href = "zhidui.html#/gerenfanghu_houqinchuchuzhang_wuzidiaobo/gerenfanghu_houqinchuchuzhang_wuzidiaoboxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "维修") {
                window.location.href = "zhidui.html#/gerenfanghu_houqinchuchuzhang_weixiujilu/gerenfanghu_houqinchuchuzhang_weixiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "报废") {
                window.location.href = "zhidui.html#/gerenfanghu_houqinchuchuzhang_baofeijilu/gerenfanghu_houqinchuchuzhang_baofeijiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材库存申请") {
                window.location.href = "zhidui.html#/qicai_houqinchuzhang_kucunshenqingjilu/qicai_houqinchuzhang_kucunshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材调拨申请") {
                window.location.href = "zhidui.html#/qicai_houqinchuzhang_diaobojilu/diaobojiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }
            else if (item.daibanleixing == "器材一级库维修") {
                window.location.href = "zhidui.html#/qicai_houqinchuzhang_qicaiweixiujilu/qicaiweixiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }
            else if (item.daibanleixing == "器材一级库报废") {
                window.location.href = "zhidui.html#/qicai_houqinchuzhang_qicaibaofeijilu/qicaibaofeijiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }
        }
        $.ajax({
            type:'POST',
            url: SERVER + "DaibanYidu?id=" + item.id,
            async:false,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
            }
        });
        $.ajax({
            type:'GET',
            url: SERVER + "gerenfanghuDaibanLiebiao",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let count = data.data.length;
                sessionStorage.setItem("count",count);
                THE.fetch();
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
        // this.props.history.getDaiban;
        // this.getDaiban();
    }

    render() {

        const columns = [{
            title: 'shenqingdanbianhao',
            dataIndex: 'shenqingdanbianhao',
            colSpan : 0,
            className:'hidden_col',
            width:'20%'
        }, {
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
            width:'20%'
        }, {
            title: '待办类型',
            dataIndex: 'daibanleixing',
            width:'20%'
        }, {
            title: '职务',
            dataIndex: 'zhuwu',
            width:'20%'
        }, {
            title: '待办信息',
            dataIndex: 'daibanxinxi',
        },{
            title: '操作',
            render: (text, record) => (
                <span>
                    <Button type="primary" onClick={this.chakan.bind(this, record)}>查看</Button>
                </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.wuziList}
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
