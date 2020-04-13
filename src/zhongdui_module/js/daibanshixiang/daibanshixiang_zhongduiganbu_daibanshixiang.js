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
                pageSize : 10,
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
        let size = params.rows;
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

    //个人申请 消防员 二级库管员 中队长 大队长
    //库存申请 二级库管员 中队长 大队长 装备科科长 后勤处处长 一级库管员
    //物资调拨 装备科科长 后勤处处长 一级库管员 二级库管员
    //移交 中队长 大队长 ID
    //维修 二级库管员 中队长 大队长 一级库管员 装备科科长 后勤处处长
    //报废 二级库管员 中队长 大队长 一级库管员 装备科科长 后勤处处长
    //个人维修申请 消防员 二级库管员
    //装备预警 一级库管员 二级库管员
    //维修提醒 一级库管员 二级库管员
    //报废提醒 一级库管员 二级库管员


    //器材库存申请 二级库管员 中队长 大队长 装备科科长 后勤处处长 一级库管员
    //器材调拨申请 装备科科长 后勤处处长 一级库管员 二级库管员
    //消防车维修  中队长 战斗班长 大队长 装备科科长
    //器材维修     二级库管员  中队长
    //器材报废   二级库管员   中队长
    //器材一级库维修     一级库管员  中队长  装备科科长  后勤处处长
    //器材一级库报废  一级库管员  中队长  装备科科长  后勤处处长
    //器材预警   二级库管员/一级库管员
    //器材维修提醒  二级库
    //器材报废提醒    二级库
    //器材一级库维修提醒  一级库
    //器材一级库报废提醒 一级库
    //消防车保养提醒 中队长

    chakan(item) {
        const THE = this;
        if (item.zhuwu == "消防员") {
            if (item.daibanleixing == "个人申请") {
                window.location.href = "zhongdui.html#/gerenfanghu_xiaofangyuan_gerenshenqing/gerenfanghu_xiaofangyuan_gerenshenqingxiangqing/"+ item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "个人维修申请") {
                window.location.href = "zhongdui.html#/gerenfanghu_xiaofangyuan_baoxiujilu/gerenfanghu_xiaofangyuan_baoxiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }
        } else if (item.zhuwu == "二级库管员") {
            if (item.daibanleixing == "个人申请") {
                window.location.href = "zhongdui.html#/gerenfanghu_erjikuguanyuan_gerenshenqing/gerenfanghu_erjikuguanyuan_gerenshenqingxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "库存申请") {
                window.location.href = "zhongdui.html#/gerenfanghu_erjikuguanyuan_kucunshenqingjilu/gerenfanghu_erjikuguanyuan_kucunshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "物资调拨") {
                window.location.href = "zhongdui.html#/gerenfanghu_erjikuguanyuan_diaoboshenqingjilu/gerenfanghu_erjikuguanyuan_diaoboshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "维修") {
                window.location.href = "zhongdui.html#/gerenfanghu_erjikuguanyuan_weixiujilu/gerenfanghu_erjikuguanyuan_weixiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "报废") {
                window.location.href = "zhongdui.html#/gerenfanghu_erjikuguanyuan_baofeijilu/gerenfanghu_erjikuguanyuan_baofeijiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "个人维修申请") {
                window.location.href = "zhongdui.html#/gerenfanghu_erjikuguanyuan_chakanxiaofangyuanbaoxiushenqing/gerenfanghu_erjikuguanyuan_chakanxiaofangyuanbaoxiushenqingxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }
            else if (item.daibanleixing == "装备预警") {
                window.location.href = "zhongdui.html#/gerenfanghu_erjikuguanyuan_zhuangbeiyujing";
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "维修提醒") {
                window.location.href = "zhongdui.html#/gerenfanghu_erjikuguanyuan_weixiutixing";
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "报废提醒") {
                window.location.href = "zhongdui.html#/gerenfanghu_erjikuguanyuan_baofeitixing";
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材库存申请") {
                window.location.href = "zhongdui.html#/qicai_erjikuguanyuan_kucunshenqingjilu/kucunshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材调拨申请") {
                window.location.href = "zhongdui.html#/qicai_erjikuguanyuan_diaobojilu/diaobojiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing=="器材维修"){
                window.location.href="zhongdui.html#/qicai_erjikuguanyuan_qicaiweixiujilu/qicaiweixiujiluxiangqing/"+item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing=="器材报废"){
                window.location.href="zhongdui.html#/qicai_erjikuguanyuan_qicaibaofeijilu/qicaibaofeijiluxiangqing/"+item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材预警") {
                window.location.href = "zhongdui.html#/qicai_erjikuguanyuan_qicaiyujing";
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材维修提醒") {
                window.location.href = "zhongdui.html#/qicai_yijikuguanyuan_qicaiweixiuyujing";
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材报废提醒") {
                window.location.href = "zhongdui.html#/qicai_erjikuguanyuan_qicaibaofeiyujing";
                window.event.returnvalue=false;
            }
        } else if (item.zhuwu == "中队长") {
            if (item.daibanleixing == "个人申请") {
                window.location.href = "zhongdui.html#/gerenfanghu_zhongduiganbu_gerenshenqingjilu/gerenfanghu_zhongduiganbu_gerenshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "库存申请") {
                window.location.href = "zhongdui.html#/gerenfanghu_zhongduiganbu_kucunshenqingjilu/gerenfanghu_zhongduiganbu_kucunshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "维修") {
                window.location.href = "zhongdui.html#/gerenfanghu_zhongduiganbu_weixiujilu/gerenfanghu_zhongduiganbu_weixiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "报废") {
                window.location.href = "zhongdui.html#/gerenfanghu_zhongduiganbu_baofeijilu/gerenfanghu_zhongduiganbu_baofeijiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "一级库维修") {
                window.location.href = "zhongdui.html#/gerenfanghu_zhongduiganbu_yijikuweixiujilu/gerenfanghu_zhongduiganbu_weixiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "一级库报废") {
                window.location.href = "zhongdui.html#/gerenfanghu_zhongduiganbu_yijikubaofeijilu/gerenfanghu_zhongduiganbu_baofeijiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "移交") {
                window.location.href = "zhongdui.html#/gerenfanghu_zhongduiganbu_zhuangbeiyijiaojilu/gerenfanghu_zhongduiganbu_zhuangbeiyijiaojiluxiangqing/" + item.guanlianid;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "消防车维修") {
                window.location.href = "zhongdui.html#/qicai_zhongduiganbu_xiaofangcheweixiujilu/xiaofangcheweixiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材库存申请") {
                window.location.href = "zhongdui.html#/qicai_zhongduiganbu_kucunshenqingjilu/qicai_zhongduiganbu_kucunshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing=="器材维修"){
                window.location.href="zhongdui.html#/qicai_zhongduiganbu_qicaiweixiujilu/qicaiweixiujiluxiangqing/"+item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing=="器材报废"){
                window.location.href="zhongdui.html#/qicai_zhongduiganbu_qicaibaofeijilu/qicaibaofeijiluxiangqing/"+item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing=="器材一级库维修") {
                window.location.href = "zhongdui.html#/qicai_zhongduiganbu_yijikuqicaiweixiujilu/qicaiweixiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }
            else if (item.daibanleixing=="器材一级库报废") {
                window.location.href = "zhongdui.html#/qicai_zhongduiganbu_yijikuqicaibaofeijilu/qicaibaofeijiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing=="消防车保养提醒") {
                window.location.href = "zhongdui.html#/qicai_zhongduiganbu_xiaofangchebaoyangtixing";
                window.event.returnvalue=false;
            }
        } else if (item.zhuwu == "一级库管员") {
            if (item.daibanleixing == "库存申请") {
                window.location.href = "zhongdui.html#/gerenfanghu_yijikuguanyuan_kucunshenqingjilu/gerenfanghu_yijikuguanyuan_kucunshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "物资调拨") {
                window.location.href = "zhongdui.html#/gerenfanghu_yijikuguanyuan_diaoboshenqingjilu/gerenfanghu_yijikuguanyuan_diaoboshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "维修") {
                window.location.href = "zhongdui.html#/gerenfanghu_yijikuguanyuan_weixiujilu/gerenfanghu_yijikuguanyuan_weixiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "报废") {
                window.location.href = "zhongdui.html#/gerenfanghu_yijikuguanyuan_baofeijilu/gerenfanghu_yijikuguanyuan_baofeijiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "装备预警") {
                window.location.href = "zhongdui.html#/gerenfanghu_yijikuguanyuan_zhuangbeiyujing";
                window.event.returnvalue=false;
            } else if (item.daibanleixing == "维修提醒") {
                window.location.href = "zhongdui.html#/gerenfanghu_yijikuguanyuan_weixiutixing";
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "报废提醒") {
                window.location.href = "zhongdui.html#/gerenfanghu_yijikuguanyuan_baofeitixing";
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材库存申请") {
                window.location.href = "zhongdui.html#/qicai_yijikuguanyuan_kucunshenqingjilu/kucunshenqingjiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材调拨申请") {
                window.location.href = "zhongdui.html#/qicai_yijikuguanyuan_diaobojilu/diaobojiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }
            else if (item.daibanleixing == "器材一级库维修") {
                window.location.href = "zhongdui.html#/qicai_yijikuguanyuan_qicaiweixiujilu/qicaiweixiujiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }
            else if (item.daibanleixing == "器材一级库报废") {
                window.location.href = "zhongdui.html#/qicai_yijikuguanyuan_qicaibaofeijilu/qicai_yijikuguanyuan_qicaibaofeijiluxiangqing/" + item.shenqingdanbianhao;
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材预警") {
                window.location.href = "zhongdui.html#/qicai_yijikuguanyuan_qicaiyujing";
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材一级库维修提醒") {
                window.location.href = "zhongdui.html#/qicai_yijikuguanyuan_qicaiweixiuyujing";
                window.event.returnvalue=false;
            }else if (item.daibanleixing == "器材一级库报废提醒") {
                window.location.href = "zhongdui.html#/qicai_yijikuguanyuan_qicaibaofeiyujing";
                window.event.returnvalue=false;
            }
        }else if (item.zhuwu == "战斗班长") {
            if (item.daibanleixing == "消防车维修") {
                window.location.href = "zhongdui.html#/qicai_banzhang_xiaofangcheweixiujilu/xiaofangcheweixiujiluxiangqing/" + item.shenqingdanbianhao;
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
            className:'hidden_col'
        }, {
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '待办类型',
            dataIndex: 'daibanleixing',
        }, {
            title: '职务',
            dataIndex: 'zhuwu',
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
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
