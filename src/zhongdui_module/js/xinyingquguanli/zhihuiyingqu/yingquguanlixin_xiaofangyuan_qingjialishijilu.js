import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import XLSX from 'xlsx';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Select, Tree, Card, Modal, Tabs,
} from 'antd';
import yingquguanlixin_xiaofangyuan_qingjialishijiluxinzeng from './yingquguanlixin_xiaofangyuan_qingjialishijiluxinzeng';
import yingquguanlixin_xiaofangyuan_qingjialishijiluxiangqing from './yingquguanlixin_xiaofangyuan_qingjialishijiluxiangqing';
import moment from 'moment';
import ZDJL from "./yingquguanlixin_zhongduiganbu_qingjialishijilu";
import yingquguanlixin_zhongduiganbu_qingjialishijiluxiangqing
    from './yingquguanlixin_zhongduiganbu_qingjialishijiluxiangqing';
import Yzjl from "../../renyuanguanli/renyuanguanli/yingquguanlixin_zuzhiguanliyuan_qingjiajiluchakan";
import renyuanguanli_zhongduiganbu_qingjialishijiluxiangqing from "../../renyuanguanli/renyuanguanli/renyuanguanli_zhongduiganbu_qingjialishijiluxiangqing";
const { TextArea } = Input;
const View = [];


class Appmain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
        };
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_xiaofangyuan_qingjialishijiluxinzeng/'} component = {yingquguanlixin_xiaofangyuan_qingjialishijiluxinzeng} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_xiaofangyuan_qingjialishijiluxiangqing/:processInstanceId'} component = {yingquguanlixin_xiaofangyuan_qingjialishijiluxiangqing} />
                    <Route
                        path={this.props.match.path + '/yingquguanlixin_zhongduiganbu_qingjialishijiluxiangqing/:processInstanceId'}
                        component={yingquguanlixin_zhongduiganbu_qingjialishijiluxiangqing}/>
                    <Route
                        path={this.props.match.path + '/renyuanguanli_zhongduiganbu_qingjialishijiluxiangqing/:processInstanceId'}
                        component={renyuanguanli_zhongduiganbu_qingjialishijiluxiangqing}/>
                </Switch>
            </div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            jiluList: [],
            startValue: null,
            endValue: null,
            shenpiList: [],
            shenpi:'',
            qingjialeixing:'',
            qingjialeixingList: [],
            xiaojiavisible: false,
            yanqivisible:false,
            qingjiaobj:{},
            shenpirenyuanList: [],
            chaosongrenyuanList: [],
            shenpiren: '',
            chaosongren: '',
            xiaojiayanqi:'',
            time:'',
            dangqianxiaojiashijian:'',
            currentTime:new Date(),
            dangqianqingjiashijian:'',
            shichang: '',
            yuanchaosongrenyuanxingming: "",
            yuanchaosongrenyuanbianhao: "",
            activeKey:"1",
            showzuzhiyuangong:true,
            showzuzhilingdao:true,
            showzuzhiguanliyuan:true,
        };
    }

    onTimeChange = (value) => {
        let shichang = '';
        let tianshu = ''
        let xiaoshi = ''
        const dangqianqingjiashijian = moment(this.state.dangqianqingjiashijian, 'YYYY-MM-DD HH:mm:ss').valueOf();
        if(dangqianqingjiashijian !== null && dangqianqingjiashijian !== ''){
            xiaoshi = parseInt((value - dangqianqingjiashijian) / 3600000);
            if(xiaoshi < 24){
                shichang = xiaoshi + '小时';
            }else{
                tianshu = parseInt(xiaoshi/24);
                xiaoshi = xiaoshi%24;
                shichang = tianshu + '天' +xiaoshi + '小时';
            }
        }
        this.setState({
            time: value,
            shichang: shichang,
        });
    }


    shenpirenyuanChang(value) {
        const THE = this;
        THE.setState({
            shenpiren: value,
        });
    }
    chaosongrenyuanChang(value) {
        const THE = this;
        THE.setState({
            chaosongren: value,
        });
    }

    hideModal = () => {
        this.setState({
            xiaojiavisible: false,
            shenpirenyuanList: [],
            chaosongrenyuanList: [],
            shenpiren:'',
            chaosongren: '',
        });
    }

    hideModal2 = () => {
        this.setState({
            yanqivisible: false,
            shenpirenyuanList: [],
            chaosongrenyuanList: [],
            shenpiren:'',
            chaosongren: '',
            time:''
        });
        $("#yanqiliyou").val("");
    }


    xiaojia(qingjiaobj,xiaojiayanqi) {
        const THE = this;
        let taskId =qingjiaobj['historicUserTaskInstanceList'][qingjiaobj.historicUserTaskInstanceList.length-1].taskInstanceId;
        let variables = {};
        let yuanchaosongrenyuanxingming = qingjiaobj['form'].chaosongrenyuanxingming;
        let yuanchaosongrenyuanbianhao = qingjiaobj['form'].chaosongrenyuanbianhao;
        variables.faqirenliuchengjuese=sessionStorage.getItem("liuchengjuesemingcheng");
        variables.xiaojiayanqi=xiaojiayanqi;
        $.ajax({
            type:'POST',
            url: SERVER + "activiti/task/copyperson?taskId="+taskId,
            data : JSON.stringify(variables),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if($.isEmptyObject(data.data) === false) {
                    for (var i in data.data) {
                        list.push(data.data[i])
                    }
                    THE.setState({
                        chaosongrenyuanList: list[0],
                        yuanchaosongrenyuanxingming: yuanchaosongrenyuanxingming,
                        yuanchaosongrenyuanbianhao: yuanchaosongrenyuanbianhao,
                    });
                }
            }
        });
        $.ajax({
            type:'POST',
            url: SERVER + "activiti/task/candidaters?taskId="+taskId,
            data : JSON.stringify(variables),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if($.isEmptyObject(data.data) === false) {
                    for (var i in data.data) {
                        list.push(data.data[i])
                    }
                    THE.setState({
                        xiaojiavisible: true,
                        shenpirenyuanList: list[0],
                        qingjiaobj: qingjiaobj,
                        xiaojiayanqi: xiaojiayanqi,
                    });
                }
            }
        });
    }

    yanqi(qingjiaobj,xiaojiayanqi) {
        const THE = this;
        let taskId =qingjiaobj['historicUserTaskInstanceList'][qingjiaobj.historicUserTaskInstanceList.length-1].taskInstanceId;
        let dangqianxiaojiashijian = qingjiaobj.form.dangqianxiaojiashijian;
        let dangqianqingjiashijian = qingjiaobj.form.jihuaqingjiashijian;
        let yuanchaosongrenyuanxingming = qingjiaobj['form'].chaosongrenyuanxingming;
        let yuanchaosongrenyuanbianhao = qingjiaobj['form'].chaosongrenyuanbianhao;
        let variables = {};
        variables.faqirenliuchengjuese=sessionStorage.getItem("liuchengjuesemingcheng");
        variables.xiaojiayanqi=xiaojiayanqi;
        variables.yanqishenpiliuzhuangtai = '';
        $.ajax({
            type:'POST',
            url: SERVER + "activiti/task/copyperson?taskId="+taskId,
            data : JSON.stringify(variables),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if($.isEmptyObject(data.data) === false) {
                    for (var i in data.data) {
                        list.push(data.data[i])
                    }
                    THE.setState({
                        chaosongrenyuanList: list[0],
                        yuanchaosongrenyuanxingming: yuanchaosongrenyuanxingming,
                        yuanchaosongrenyuanbianhao: yuanchaosongrenyuanbianhao,
                    });
                }
            }
        });
        $.ajax({
            type:'POST',
            url: SERVER + "activiti/task/candidaters?taskId="+taskId,
            data : JSON.stringify(variables),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if($.isEmptyObject(data.data) === false) {
                    for (var i in data.data) {
                        list.push(data.data[i])
                    }
                    THE.setState({
                        yanqivisible: true,
                        shenpirenyuanList: list[0],
                        qingjiaobj: qingjiaobj,
                        xiaojiayanqi: xiaojiayanqi,
                        dangqianxiaojiashijian: dangqianxiaojiashijian,
                        dangqianqingjiashijian: dangqianqingjiashijian,
                    });
                }
            }
        });
    }

    tijiaoyanqi() {
        const THE = this;
        let shenpirenyuan = THE.state.shenpiren;
        if (typeof (shenpirenyuan) == "undefined" || shenpirenyuan == '' || shenpirenyuan == null) {
            message.error("请选择审批人！");
            return;
        }
        let chaosongren = THE.state.chaosongren;
        if (typeof (chaosongren) == "undefined" || chaosongren == '' || chaosongren == null) {
            message.error("请选择抄送人！");
            return;
        }
        let yuanchaosongrenyuanbianhao = THE.state.yuanchaosongrenyuanbianhao;
        let yuanchaosongrenyuanxingming = THE.state.yuanchaosongrenyuanxingming;
        let yanqishijian = THE.state.time;
        if (typeof (yanqishijian) == "undefined" || yanqishijian == '' || yanqishijian == null) {
            message.error("请选择延期后时间！");
            return;
        }
        let yanqiliyou = $("#yanqiliyou").val().trim();
        if (yanqiliyou == ""||yanqiliyou == null||yanqiliyou ==  "undefined") {
            message.error("请输入延期理由！");return;
        }
        let shenpirenyuanxingming=shenpirenyuan.split('+')[0];
        let shenpirenyuanbianhao=shenpirenyuan.split('+')[1];
        let qingjiaobj = THE.state.qingjiaobj;
        let taskId = qingjiaobj['historicUserTaskInstanceList'][qingjiaobj.historicUserTaskInstanceList.length-1].taskInstanceId;
        //let shenpirenyuanbianhaolist = qingjiaobj['form'].shenpirenyuanbianhaolist;
        let xiaojiayanqi = THE.state.xiaojiayanqi;
        let shichang = THE.state.shichang;
        let shenqingdanzhuangtai = '延期申请中';
        //shenpirenyuanbianhaolist.push(shenpirenyuanbianhao);
        let variables = {};
        variables.shenpirenyuanxingming = shenpirenyuanxingming;
        variables.shenpirenyuanbianhao = shenpirenyuanbianhao;
        //variables.shenpirenyuanbianhaolist = shenpirenyuanbianhaolist;
        variables.xiaojiayanqi = xiaojiayanqi;
        variables.shenqingdanzhuangtai = shenqingdanzhuangtai;
        // variables.jihuaxiaojiashijian = yanqishijian;
        variables.yanqishijian = yanqishijian;
        variables.yanqiliyou = yanqiliyou;
        variables.yanqishenpiliuzhuangtai = '';
        variables.qingjiashichang = shichang;
        variables.chaosongrenyuanxingming=yuanchaosongrenyuanxingming + ','+chaosongren.split('+')[0];
        variables.chaosongrenyuanbianhao=yuanchaosongrenyuanbianhao + ',' +chaosongren.split('+')[1];
        // if (chaosongren !== "" && chaosongren !== null && chaosongren !==  "undefined") {
        //     variables.chaosongrenyuanxingming=yuanchaosongrenyuanxingming + ','+chaosongren.split('+')[0];
        //     variables.chaosongrenyuanbianhao=yuanchaosongrenyuanbianhao + ',' +chaosongren.split('+')[1];
        // }
        $.ajax({
            type: 'POST',
            url: SERVER + "activiti/completeTask?taskId="+taskId,
            data: JSON.stringify(variables),
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("申请成功");
                $("#yanqiliyou").val("");
                THE.setState({
                    yanqivisible: false,
                    shenpirenyuanList: [],
                    chaosongrenyuanList: [],
                    chaosongren:'',
                    time:''
                });
                THE.fetch();
            }
        });
    }


    tijiaoxiaojia() {
        const THE = this;
        let shenpirenyuan = THE.state.shenpiren;
        if (typeof (shenpirenyuan) == "undefined" || shenpirenyuan == '' || shenpirenyuan == null) {
            message.error("请选择审批人！");
            return;
        }
        let chaosongren = THE.state.chaosongren;
        if (typeof (chaosongren) == "undefined" || chaosongren == '' || chaosongren == null) {
            message.error("请选择抄送人！");
            return;
        }
        let yuanchaosongrenyuanbianhao = THE.state.yuanchaosongrenyuanbianhao;
        let yuanchaosongrenyuanxingming = THE.state.yuanchaosongrenyuanxingming;
        let shenpirenyuanxingming=shenpirenyuan.split('+')[0];
        let shenpirenyuanbianhao=shenpirenyuan.split('+')[1];
        let qingjiaobj = THE.state.qingjiaobj;
        let taskId = qingjiaobj['historicUserTaskInstanceList'][qingjiaobj.historicUserTaskInstanceList.length-1].taskInstanceId;
        //let shenpirenyuanbianhaolist = qingjiaobj['form'].shenpirenyuanbianhaolist;
        let xiaojiayanqi = THE.state.xiaojiayanqi;
        let shenqingdanzhuangtai = '销假申请中';
        //shenpirenyuanbianhaolist.push(shenpirenyuanbianhao);
        let variables = {};
        variables.shenpirenyuanxingming = shenpirenyuanxingming;
        variables.shenpirenyuanbianhao = shenpirenyuanbianhao;
        //variables.shenpirenyuanbianhaolist = shenpirenyuanbianhaolist;
        variables.xiaojiayanqi = xiaojiayanqi;
        variables.shenqingdanzhuangtai = shenqingdanzhuangtai;
        variables.chaosongrenyuanxingming=yuanchaosongrenyuanxingming + ','+chaosongren.split('+')[0];
        variables.chaosongrenyuanbianhao=yuanchaosongrenyuanbianhao + ',' +chaosongren.split('+')[1];

        // if (chaosongren !== "" && chaosongren !== null && chaosongren !==  "undefined") {
        //     variables.chaosongrenyuanxingming=yuanchaosongrenyuanxingming + ','+chaosongren.split('+')[0];
        //     variables.chaosongrenyuanbianhao=yuanchaosongrenyuanbianhao + ',' +chaosongren.split('+')[1];
        // }
        $.ajax({
            type: 'POST',
            url: SERVER + "activiti/completeTask?taskId="+taskId,
            data: JSON.stringify(variables),
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("申请成功");
                THE.setState({
                    xiaojiavisible: false,
                    shenpirenyuanList: [],
                    chaosongrenyuanList: [],
                    chaosongren:'',
                });
                THE.fetch();
            }
        });
    }


    //获取审批list
    getshenpiList(value) {
        const THE = this;
        THE.setState({
            shenpi:value,
        });
    }

    //获取请假类型list
    getqingjialeixingList(value) {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquwaichuleixingmeiju",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    list.push(data.data[i]);
                }
                THE.setState({
                    qingjialeixing:value,
                    qingjialeixingList: list,
                });
            }
        });
    }


    //开始时间截止时间
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }
    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    disabledDate = (time) => {
        const current=this.state.currentTime;
        const dangqianxiaojiashijian = moment(this.state.dangqianxiaojiashijian, 'YYYY-MM-DD HH:mm:ss').valueOf();
        if (!time||!current) {
            return false;
        }
        if (typeof(dangqianxiaojiashijian) == "undefined"||dangqianxiaojiashijian == null) {
            return time.valueOf() <= current.valueOf();
        }else{
            return time.valueOf() <= dangqianxiaojiashijian.valueOf();
        }
    }

    disabledTime=(time)=>{
        const current=this.state.currentTime;
        const dangqianxiaojiashijian = moment(this.state.dangqianxiaojiashijian, 'YYYY-MM-DD HH:mm:ss').valueOf();
        if (!time || !current) {
            return false;
        }
        if (typeof(dangqianxiaojiashijian) == "undefined"||dangqianxiaojiashijian == null) {
            return time.valueOf() <= current.valueOf();
        }else{
            return time.valueOf() <= dangqianxiaojiashijian.valueOf();
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
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
        let form=this.props.form;
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        let processDefinitionKey = qingjiaprocessKey;
        let variables={};
        let search  = '';
        let shenpi = this.state.shenpi;
        if (typeof (shenpi) !== "undefined" && shenpi !== '-1' && shenpi !== ''&& shenpi !== null) {
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "shenqingdanzhuangtai="+shenpi;
            }else{
                search = search + ",shenqingdanzhuangtai="+shenpi;
            }
        }
        let qingjialeixing = this.state.qingjialeixing;
        if (typeof (qingjialeixing) !== "undefined" && qingjialeixing !== '-1' && qingjialeixing !== ''&& qingjialeixing !== null) {
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "shijiqingjialeixing="+qingjialeixing;
            }else{
                search = search + ",shijiqingjialeixing="+qingjialeixing;
            }
        }
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "jihuaqingjiashijian>"+kaishishijian;
            }else{
                search = search + ",jihuaqingjiashijian>"+kaishishijian;
            }
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "jihuaqingjiashijian<"+jieshushijian;
            }else{
                search = search + ",jihuaqingjiashijian<"+jieshushijian;
            }
        }
        $.ajax({
            type:'get',
            url: SERVER + "activiti/process/instances/i-start?page="+page+"&size="+size+"&processDefinitionKey="+processDefinitionKey+"&search="+search,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["startTime"] = moment(data.data.content[i]["startTime"]).format('YYYY-MM-DD HH:mm:ss');
                    const current=THE.state.currentTime;
                    if( Date.parse(data.data.content[i].form.jihuaxiaojiashijian.valueOf())  < current.valueOf()&& data.data.content[i].form.shenqingdanzhuangtai == '假期中'){
                        data.data.content[i].form.shenqingdanzhuangtai = '未销假';
                    }
                    data.data.content[i].form.jihuaqingjiashijian = moment(data.data.content[i].form.jihuaqingjiashijian).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i].form.jihuaxiaojiashijian = moment(data.data.content[i].form.jihuaxiaojiashijian).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.content[i].form.yanqishijian !== '' && data.data.content[i].form.yanqishijian !== null&& data.data.content[i].form.yanqishijian !== undefined){
                        data.data.content[i].form.dangqianxiaojiashijian =moment(data.data.content[i].form.yanqishijian).format('YYYY-MM-DD HH:mm:ss') ;
                    }else{
                        data.data.content[i].form.dangqianxiaojiashijian = moment(data.data.content[i].form.jihuaxiaojiashijian).format('YYYY-MM-DD HH:mm:ss');
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
    output()  {
        let _headers = ['机构名称', '所属部门','申请时间', '申请人', '计划请假时间', '计划销假时间', '请假类型','外出地点','实际请假时长', '请假理由','申请单状态']
        const THE = this;
        let form=this.props.form;
        let processDefinitionKey = qingjiaprocessKey;
        let variables={};
        let search  = '';
        let shenpi = this.state.shenpi;
        if (typeof (shenpi) !== "undefined" && shenpi !== '-1' && shenpi !== ''&& shenpi !== null) {
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "shenqingdanzhuangtai="+shenpi;
            }else{
                search = search + ",shenqingdanzhuangtai="+shenpi;
            }
        }
        let qingjialeixing = this.state.qingjialeixing;
        if (typeof (qingjialeixing) !== "undefined" && qingjialeixing !== '-1' && qingjialeixing !== ''&& qingjialeixing !== null) {
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "shijiqingjialeixing="+qingjialeixing;
            }else{
                search = search + ",shijiqingjialeixing="+qingjialeixing;
            }
        }
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "jihuaqingjiashijian>"+kaishishijian;
            }else{
                search = search + ",jihuaqingjiashijian>"+kaishishijian;
            }
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
            if(typeof (search) === "undefined" || search === '' || search === null){
                search = search + "jihuaqingjiashijian<"+jieshushijian;
            }else{
                search = search + ",jihuaqingjiashijian<"+jieshushijian;
            }
        }
        let juese = '消防员';
        //组织排序字段
        $.ajax({
            type:'get',
            url: SERVER + "activiti/process/instances/i-start?paze=0&size=10000&processDefinitionKey="+processDefinitionKey+"&search="+search,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["startTime"] = moment(data.data.content[i]["startTime"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i].form.jihuaqingjiashijian = moment(data.data.content[i].form.jihuaqingjiashijian).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i].form.jihuaxiaojiashijian = moment(data.data.content[i].form.jihuaxiaojiashijian).format('YYYY-MM-DD HH:mm:ss');let obj = {};
                    if (data.data.content[i].form.jigoumingcheng == null) {
                        obj['机构名称'] = '';
                    } else {
                        obj['机构名称'] = data.data.content[i].form.jigoumingcheng;
                    }
                    if (data.data.content[i].form.shenqingrenbumen == null) {
                        obj['所属部门'] = '';
                    } else {
                        obj['所属部门'] = data.data.content[i].form.shenqingrenbumen;
                    }
                    if (data.data.content[i]["startTime"] == null) {
                        obj['申请时间'] = '';
                    } else {
                        obj['申请时间'] = data.data.content[i]["startTime"];
                    }
                    if (data.data.content[i].form.shenqingrenmingcheng == null) {
                        obj['申请人'] = '';
                    } else {
                        obj['申请人'] = data.data.content[i].form.shenqingrenmingcheng;
                    }
                    if (data.data.content[i].form.jihuaqingjiashijian== null) {
                        obj['计划请假时间'] = '';
                    } else {
                        obj['计划请假时间'] = data.data.content[i].form.jihuaqingjiashijian;
                    }
                    if (data.data.content[i].form.jihuaxiaojiashijian == null) {
                        obj['计划销假时间'] = '';
                    } else {
                        obj['计划销假时间'] = data.data.content[i].form.jihuaxiaojiashijian;
                    }
                    if (data.data.content[i].form.shijiqingjialeixing == null) {
                        obj['请假类型'] = '';
                    } else {
                        obj['请假类型'] = data.data.content[i].form.shijiqingjialeixing;
                    }
                    if (data.data.content[i].form.waichudidian == null) {
                        obj['外出地点'] = '';
                    } else {
                        obj['外出地点'] = data.data.content[i].form.waichudidian;
                    }
                    if (data.data.content[i].form.qingjiashichang == null) {
                        obj['实际请假时长'] = '';
                    } else {
                        obj['实际请假时长'] = data.data.content[i].form.qingjiashichang;
                    }
                    if (data.data.content[i].form.qingjialiyou == null) {
                        obj['请假理由'] = '';
                    } else {
                        obj['请假理由'] = data.data.content[i].form.qingjialiyou;
                    }
                    if (data.data.content[i].form.shenqingdanzhuangtai == null) {
                        obj['申请单状态'] = '';
                    } else {
                        obj['申请单状态'] = data.data.content[i].form.shenqingdanzhuangtai;
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前请假历史记录没有数据！");
                    return;
                }


                let headers = _headers
                    .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

                let xmldata = _data
                    .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
                    .reduce((prev, next) => prev.concat(next))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

                // 合并 headers 和 data
                let output = Object.assign({}, headers, xmldata);
                // 获取所有单元格的位置
                let outputPos = Object.keys(output);
                // 计算出范围
                let ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

                // 构建 workbook 对象
                let wb = {
                    SheetNames: ['mySheet'],
                    Sheets: {
                        'mySheet': Object.assign({}, output, { '!ref': ref })
                    }
                };
                // 导出 Excel
                XLSX.writeFile(wb, '请假历史记录.xlsx');
            }
        });

    }

    //控制tab页方法
    callback(key) {
        const THE = this;
        THE.setState({
            activeKey: key,
        });
    }

    componentWillUnmount() {
        View.pagination = this.state.pagination;
        View.activeKey = this.state.activeKey;
    }

    componentWillMount() {
        if(!View.activeKey){
            View.activeKey = '1';
        }
        const {pagination,activeKey} = View;
        this.setState({
            activeKey: activeKey,
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
        if(button_quanxian('showzuzhiguanliyuan',jueselist) === true){
            this.setState({
                showzuzhiguanliyuan: false,
            });
        };
    }

    componentDidMount() {
        this.fetch();
        this.getqingjialeixingList();
    }

    render() {
        let qingjialeixingOptions = this.state.qingjialeixingList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        let shenpirenyuanOptions = this.state.shenpirenyuanList.map(item =>
            <Select.Option key={item['key']} value={item['xingming']+ '+' + item['renyuanbianhao']}>{item['xingming']}</Select.Option>
        );

        let chaosongrenyuanOptions = this.state.chaosongrenyuanList.map(item =>
            <Select.Option key={item['key']} value={item['xingming']+ '+' + item['renyuanbianhao']}>{item['xingming']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
          width: '10%'
        },{
            title: '申请时间',
            dataIndex: 'startTime',
          width: '10%'
        }
        ,{
             title: '所属部门',
             dataIndex: 'form.shenqingrenbumen',
            width: '10%'
         }, {
            title: '外出时间',
            dataIndex: 'form.jihuaqingjiashijian',
            width: '10%'
        }
            // ,{
        //     title: '返回时间',
        //     dataIndex: 'form.jihuaxiaojiashijian',
        // }
        ,{
            title: '外出类型',
            dataIndex: 'form.shijiqingjialeixing',
            width: '10%'
        },{
            title: '外出地点',
            dataIndex: 'form.waichudidian',
            width: '10%'
        },{
            title: '时长',
            dataIndex: 'form.qingjiashichang',
            width: '10%'
        }
        // ,{
        //     title: '外出事由',
        //     dataIndex: 'form.qingjialiyou',
        // }
        ,{
            title: '申请单状态',
            dataIndex: 'form.shenqingdanzhuangtai',
            width: '10%'
        },{
            title: '当前审批人',
            dataIndex: 'form.shenpirenyuanxingming',
        }
        , {
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                if (record['form'].shenqingdanzhuangtai === "假期中"|| record['form'].shenqingdanzhuangtai === "未销假") {
                    return (
                        <span>
					      	<Popconfirm placement="topLeft" title="确认要销假?"
                                        onConfirm={this.xiaojia.bind(this, record,'销假')} okText="确认"
                                        cancelText="取消">
					        	<a>销假</a>
					    	</Popconfirm>
					    	<Divider type="vertical"/>
					    	<Popconfirm placement="topLeft" title="确认要延期?"
                                        onConfirm={this.yanqi.bind(this, record,'延期')} okText="确认"
                                        cancelText="取消">
					        	<a>延期</a>
					    	</Popconfirm>
                            <Divider type="vertical"/>
                            <a href={SERVER+'generateReport?processInstanceId='+ record['processInstanceId']} title="打印" target="_blank">打印</a>
                            <Divider type="vertical"/>
                        <Link to={this.props.match.url+'/yingquguanlixin_xiaofangyuan_qingjialishijiluxiangqing/'+ record['processInstanceId'] }>详情</Link>
                       </span>
                    )
                } else if(record['form'].shenqingdanzhuangtai == "请假同意"){
                    return(
                        <span>
                            <a href={SERVER+'generateReport?processInstanceId='+ record['processInstanceId']} title="打印" target="_blank">打印</a>
                            <Divider type="vertical"/>
                            <Link to={this.props.match.url+'/yingquguanlixin_xiaofangyuan_qingjialishijiluxiangqing/'+ record['processInstanceId'] }>详情</Link>
                        </span>
                    )
                }else {
                    return(
                        <span>
                        <Link to={this.props.match.url+'/yingquguanlixin_xiaofangyuan_qingjialishijiluxiangqing/'+ record['processInstanceId'] }>详情</Link>
                        </span>
                    )
                }
            }
        }
        ];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue,qingjialeixing,shenpi, shenpiren,time,chaosongren} = this.state;

        return (
            <div>
                <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                <Tabs.TabPane tab="组织员工" key="1" disabled={this.state.showzuzhiyuangong}>
                <Modal
                    title="延期申请"
                    visible={this.state.yanqivisible}
                    onOk={this.tijiaoyanqi.bind(this)}
                    onCancel={this.hideModal2}
                    okText="确认"
                    cancelText="取消"
                >
                    <label>审批人选择:</label>
                    <Select style={{margin: 10, width: 200}} value={shenpiren}
                            onChange={this.shenpirenyuanChang.bind(this)}>
                        {shenpirenyuanOptions}
                    </Select>
                    <br/>
                    <label>抄送人选择:</label>
                    <Select style={{margin: 10, width: 200}} value={chaosongren}
                            onChange={this.chaosongrenyuanChang.bind(this)}>
                        {chaosongrenyuanOptions}
                    </Select>
                    <br/>
                    <label>延期后时间:</label>
                    <DatePicker
                        showTime
                        value={time}
                        disabledDate={this.disabledDate}
                        disabledTime={this.disabledTime}
                        placeholder="延期后时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={this.onTimeChange}
                        style={{margin:10,width:200}}
                    />
                    <br/>
                    <label>延期理由&#12288;:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="yanqiliyou" style={{margin: 10, width: 500}}/>
                </Modal>
                <Modal
                    title="销假申请"
                    visible={this.state.xiaojiavisible}
                    onOk={this.tijiaoxiaojia.bind(this)}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <label>审批人选择</label>
                    <Select style={{margin: 5, width: 200}} value={shenpiren}
                            onChange={this.shenpirenyuanChang.bind(this)}>
                        {shenpirenyuanOptions}
                    </Select>
                    <br/>
                    <label>抄送人选择:</label>
                    <Select style={{margin: 5, width: 200}} value={chaosongren}
                            onChange={this.chaosongrenyuanChang.bind(this)}>
                        {chaosongrenyuanOptions}
                    </Select>
                    <br/>
                </Modal>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="开始时间">
                        {getFieldDecorator('kaishishijian')(
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                value={startValue}
                                placeholder="开始时间"
                                format="YYYY-MM-DD"
                                onChange={this.onStartChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="结束时间&#12288;">
                        {getFieldDecorator('jieshushijian')(
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                value={endValue}
                                placeholder="结束时间"
                                format="YYYY-MM-DD"
                                onChange={this.onEndChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="外出类型">
                        <Select style={{width: 200}} value={qingjialeixing} onChange={this.getqingjialeixingList.bind(this)}>
                            <Select.Option value="-1">全部</Select.Option>
                            {qingjialeixingOptions}
                        </Select>
                    </FormItem>
                    <FormItem label="申请单状态">
                        <Select style={{width: 200}} value={shenpi} onChange={this.getshenpiList.bind(this)}>
                            <Select.Option value="-1">全部</Select.Option>
                            <Select.Option value="请假申请中">请假申请中</Select.Option>
                            <Select.Option value="请假同意">请假同意</Select.Option>
                            <Select.Option value="请假拒绝">请假拒绝</Select.Option>
                            <Select.Option value="假期中">假期中</Select.Option>
                            <Select.Option value="未销假">未销假</Select.Option>
                            <Select.Option value="销假申请中">销假申请中</Select.Option>
                            <Select.Option value="已销假">已销假</Select.Option>
                            <Select.Option value="延期申请中">延期申请中</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search"/>查询
                        </Button>
                    </FormItem>
                    <FormItem>
                    <Button type="primary" htmlType="submit" onClick={this.output.bind(this)}>
                        <Icon type="export" />导出
                    </Button>
                </FormItem>
                    <br/>
                    <FormItem>
                        <Button>
                            <Link to={this.props.match.url+'/yingquguanlixin_xiaofangyuan_qingjialishijiluxinzeng'}>
                                <Icon type="plus" /><span>请假申请</span>
                            </Link>
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
                <Tabs.TabPane tab="组织领导" key="2" disabled={this.state.showzuzhilingdao}>
                     <ZDJL />
                </Tabs.TabPane>
                <Tabs.TabPane tab="组织管理员" key="3" disabled={this.state.showzuzhiguanliyuan}>
                     <Yzjl />
                 </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
