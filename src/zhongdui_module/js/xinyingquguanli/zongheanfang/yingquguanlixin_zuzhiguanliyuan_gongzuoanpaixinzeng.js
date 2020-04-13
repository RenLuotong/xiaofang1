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
    Popover,
    Tag,
    Card,
    InputNumber
} from 'antd';
const { TextArea } = Input;

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
            xianshinianfen:'',
            xianshizhouci:'',
            nianfen:'',
            zhouci:'',
            maxzhouci:100,
            dangqiannian:2020,
            startTime:'',
            endTime:'',
            pagination: {
                pageSize : 5,
                current : 1
            },
            renyuanList: [],
        };
    }
    search() {
        let nianfen =  this.state.xianshinianfen;
        if (!nianfen) {
            message.error("请输入年份！");return;
        }
        let zhouci =  this.state.xianshizhouci;
        if (!zhouci) {
            message.error("请输入周次！");return;
        }
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
            nianfen: nianfen,
            zhouci: zhouci,
        });
        this.fetch({
            rows: pager.pageSize,
            page: pager.current,
        });
    }

    //获取下周时间
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
                    xianshinianfen: data.data.nianfen,
                    xianshizhouci: data.data.zhouci,
                    startTime: data.data.startTime,
                    endTime: data.data.endTime,
                });
            }
        });
        THE.fetch();
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let nianfen = THE.state.xianshinianfen;
        let zhouci = THE.state.xianshizhouci;
        if(!zhouci){
        $.ajax({
            type:'post',
            url: SERVER + "tb-zhouhouxuan-zhubiaos/chushihuaShijian",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    dangqiannian: data.data.nianfen,
                    nianfen: data.data.nianfen,
                    zhouci: data.data.zhouci,
                    startTime: data.data.startTime,
                    endTime: data.data.endTime,
                });
                let nianfen = data.data.nianfen;
                let zhouci = data.data.zhouci;
                $.ajax({
                    type: 'get',
                    url: SERVER + "tb-zhoucaipus/getWeekCount?nianfen="+nianfen,
                    success: function (data) {
                        if (data.status != 0) {
                            message.warning(data.message);
                            return;
                        }
                        THE.setState({
                            maxzhouci: data.data,
                        });
                    }
                });
            }
        });
        }else{
            $.ajax({
                type: 'post',
                url: SERVER + "tb-zhouhouxuan-zhubiaos/chushihuaShijian?zhouci="+zhouci+"&nianfen="+nianfen,
                success: function (data) {
                    if (data.status != 0) {
                        message.warning(data.message);
                        return;
                    }
                    THE.setState({
                        startTime: data.data.startTime,
                        endTime: data.data.endTime,
                    });
                }
            });
        }
    }


    //给下拉框赋值
    zhouyizaofan = []
    zhouyizaofanChang(value) {
        this.zhouyizaofan = value;
    }
    zhouyiwufan = []
    zhouyiwufanChang(value) {
        this.zhouyiwufan = value;
    }
    zhouyiwanfan = []
    zhouyiwanfanChang(value) {
        this.zhouyiwanfan = value;
    }

    zhouerzaofan=[]
    zhouerzaofanChang(value) {
        this.zhouerzaofan = value;
        console.log(value)
    }
    zhouerwufan = []
    zhouerwufanChang(value) {
        this.zhouerwufan = value;
    }
    zhouerwanfan = []
    zhouerwanfanChang(value) {
        this.zhouerwanfan = value;
    }

    zhousanzaofan=[]
    zhousanzaofanChang(value) {
        this.zhousanzaofan = value;
    }
    zhousanwufan = []
    zhousanwufanChang(value) {
        this.zhousanwufan = value;
    }
    zhousanwanfan = []
    zhousanwanfanChang(value) {
        this.zhousanwanfan = value;
    }

    zhousizaofan=[]
    zhousizaofanChang(value) {
        this.zhousizaofan = value;
    }
    zhousiwufan = []
    zhousiwufanChang(value) {
        this.zhousiwufan = value;
    }
    zhousiwanfan = []
    zhousiwanfanChang(value) {
        this.zhousiwanfan = value;
    }

    zhouwuzaofan=[]
    zhouwuzaofanChang(value) {
        this.zhouwuzaofan = value;
    }
    zhouwuwufan = []
    zhouwuwufanChang(value) {
        this.zhouwuwufan = value;
    }
    zhouwuwanfan = []
    zhouwuwanfanChang(value) {
        this.zhouwuwanfan = value;
    }

    zhouliuzaofan=[]
    zhouliuzaofanChang(value) {
        this.zhouliuzaofan = value;
    }
    zhouliuwufan = []
    zhouliuwufanChang(value) {
        this.zhouliuwufan = value;
    }
    zhouliuwanfan = []
    zhouliuwanfanChang(value) {
        this.zhouliuwanfan = value;
    }

    zhourizaofan=[]
    zhourizaofanChang(value) {
        this.zhourizaofan = value;
    }
    zhouriwufan = []
    zhouriwufanChang(value) {
        this.zhouriwufan = value;
    }
    zhouriwanfan = []
    zhouriwanfanChang(value) {
        this.zhouriwanfan = value;
    }


    toCreate() {
        const THE = this;
        let nianfen = THE.state.xianshinianfen;
        let zhouci = THE.state.xianshizhouci;
        let zhouyizhibanbanzhang=THE.zhouyizhibanbanzhang;
        if (zhouyizhibanbanzhang.length < 1){
            message.error("请选择周一值班班长！");return;
        }
        let zhouyizhibanganbu=THE.zhouyizhibanganbu;
        if (zhouyizhibanganbu.length < 1){
            message.error("请选择周一值班干部！");return;
        }
        let zhouyizaoshanganpai = $("#zhouyizaoshanganpai").val().trim();
        if (zhouyizaoshanganpai === "" || typeof (zhouyizaoshanganpai) === "undefined" || zhouyizaoshanganpai === null) {
            message.error("请输入周一早上的安排！");return;
        }
        let zhouyishangwuanpai = $("#zhouyishangwuanpai").val().trim();
        if (zhouyishangwuanpai === "" || typeof (zhouyishangwuanpai) === "undefined" || zhouyishangwuanpai === null) {
            message.error("请输入周一上午的安排！");return;
        }
        let zhouyixiawuanpai = $("#zhouyixiawuanpai").val().trim();
        if (zhouyixiawuanpai === "" || typeof (zhouyixiawuanpai) === "undefined" || zhouyixiawuanpai === null) {
            message.error("请输入周一下午的安排！");return;
        }
        let zhouyiwanshanganpai = $("#zhouyiwanshanganpai").val().trim();
        if (zhouyiwanshanganpai === "" || typeof (zhouyiwanshanganpai) === "undefined" || zhouyiwanshanganpai === null) {
            message.error("请输入周一晚上的安排！");return;
        }
        let zhouerzhibanbanzhang=THE.zhouerzhibanbanzhang;
        if (zhouerzhibanbanzhang.length < 1){
            message.error("请选择周二值班班长！");return;
        }
        let zhouerzhibanganbu=THE.zhouerzhibanganbu;
        if (zhouerzhibanganbu.length < 1){
            message.error("请选择周二值班干部！");return;
        }
        let zhouerzaoshanganpai = $("#zhouerzaoshanganpai").val().trim();
        if (zhouerzaoshanganpai === "" || typeof (zhouerzaoshanganpai) === "undefined" || zhouerzaoshanganpai === null) {
            message.error("请输入周二早上的安排！");return;
        }
        let zhouershangwuanpai = $("#zhouershangwuanpai").val().trim();
        if (zhouershangwuanpai === "" || typeof (zhouershangwuanpai) === "undefined" || zhouershangwuanpai === null) {
            message.error("请输入周二上午的安排！");return;
        }
        let zhouerxiawuanpai = $("#zhouerxiawuanpai").val().trim();
        if (zhouerxiawuanpai === "" || typeof (zhouerxiawuanpai) === "undefined" || zhouerxiawuanpai === null) {
            message.error("请输入周二下午的安排！");return;
        }
        let zhouerwanshanganpai = $("#zhouerwanshanganpai").val().trim();
        if (zhouerwanshanganpai === "" || typeof (zhouerwanshanganpai) === "undefined" || zhouerwanshanganpai === null) {
            message.error("请输入周二晚上的安排！");return;
        }
        let zhousanzhibanbanzhang=THE.zhousanzhibanbanzhang;
        if (zhousanzhibanbanzhang.length < 1){
            message.error("请选择周三值班班长！");return;
        }
        let zhousanzhibanganbu=THE.zhousanzhibanganbu;
        if (zhousanzhibanganbu.length < 1){
            message.error("请选择周三值班干部！");return;
        }
        let zhousanzaoshanganpai = $("#zhousanzaoshanganpai").val().trim();
        if (zhousanzaoshanganpai === "" || typeof (zhousanzaoshanganpai) === "undefined" || zhousanzaoshanganpai === null) {
            message.error("请输入周三早上的安排！");return;
        }
        let zhousanshangwuanpai = $("#zhousanshangwuanpai").val().trim();
        if (zhousanshangwuanpai === "" || typeof (zhousanshangwuanpai) === "undefined" || zhousanshangwuanpai === null) {
            message.error("请输入周三上午的安排！");return;
        }
        let zhousanxiawuanpai = $("#zhousanxiawuanpai").val().trim();
        if (zhousanxiawuanpai === "" || typeof (zhousanxiawuanpai) === "undefined" || zhousanxiawuanpai === null) {
            message.error("请输入周三下午的安排！");return;
        }
        let zhousanwanshanganpai = $("#zhousanwanshanganpai").val().trim();
        if (zhousanwanshanganpai === "" || typeof (zhousanwanshanganpai) === "undefined" || zhousanwanshanganpai === null) {
            message.error("请输入周三晚上的安排！");return;
        }
        let zhousizhibanbanzhang=THE.zhousizhibanbanzhang;
        if (zhousizhibanbanzhang.length < 1){
            message.error("请选择周四值班班长！");return;
        }
        let zhousizhibanganbu=THE.zhousizhibanganbu;
        if (zhousizhibanganbu.length < 1){
            message.error("请选择周四值班干部！");return;
        }
        let zhousizaoshanganpai = $("#zhousizaoshanganpai").val().trim();
        if (zhousizaoshanganpai === "" || typeof (zhousizaoshanganpai) === "undefined" || zhousizaoshanganpai === null) {
            message.error("请输入周四早上的安排！");return;
        }
        let zhousishangwuanpai = $("#zhousishangwuanpai").val().trim();
        if (zhousishangwuanpai === "" || typeof (zhousishangwuanpai) === "undefined" || zhousishangwuanpai === null) {
            message.error("请输入周四上午的安排！");return;
        }
        let zhousixiawuanpai = $("#zhousixiawuanpai").val().trim();
        if (zhousixiawuanpai === "" || typeof (zhousixiawuanpai) === "undefined" || zhousixiawuanpai === null) {
            message.error("请输入周四下午的安排！");return;
        }
        let zhousiwanshanganpai = $("#zhousiwanshanganpai").val().trim();
        if (zhousiwanshanganpai === "" || typeof (zhousiwanshanganpai) === "undefined" || zhousiwanshanganpai === null) {
            message.error("请输入周四晚上的安排！");return;
        }
        let zhouwuzhibanbanzhang=THE.zhouwuzhibanbanzhang;
        if (zhouwuzhibanbanzhang.length < 1){
            message.error("请选择周五值班班长！");return;
        }
        let zhouwuzhibanganbu=THE.zhouwuzhibanganbu;
        if (zhouwuzhibanganbu.length < 1){
            message.error("请选择周五值班干部！");return;
        }
        let zhouwuzaoshanganpai = $("#zhouwuzaoshanganpai").val().trim();
        if (zhouwuzaoshanganpai === "" || typeof (zhouwuzaoshanganpai) === "undefined" || zhouwuzaoshanganpai === null) {
            message.error("请输入周五早上的安排！");return;
        }
        let zhouwushangwuanpai = $("#zhouwushangwuanpai").val().trim();
        if (zhouwushangwuanpai === "" || typeof (zhouwushangwuanpai) === "undefined" || zhouwushangwuanpai === null) {
            message.error("请输入周五上午的安排！");return;
        }
        let zhouwuxiawuanpai = $("#zhouwuxiawuanpai").val().trim();
        if (zhouwuxiawuanpai === "" || typeof (zhouwuxiawuanpai) === "undefined" || zhouwuxiawuanpai === null) {
            message.error("请输入周五下午的安排！");return;
        }
        let zhouwuwanshanganpai = $("#zhouwuwanshanganpai").val().trim();
        if (zhouwuwanshanganpai === "" || typeof (zhouwuwanshanganpai) === "undefined" || zhouwuwanshanganpai === null) {
            message.error("请输入周五晚上的安排！");return;
        }
        let zhouliuzhibanbanzhang=THE.zhouliuzhibanbanzhang;
        if (zhouliuzhibanbanzhang.length < 1){
            message.error("请选择周六值班班长！");return;
        }
        let zhouliuzhibanganbu=THE.zhouliuzhibanganbu;
        if (zhouliuzhibanganbu.length < 1){
            message.error("请选择周六值班干部！");return;
        }
        let zhouliuzaoshanganpai = $("#zhouliuzaoshanganpai").val().trim();
        if (zhouliuzaoshanganpai === "" || typeof (zhouliuzaoshanganpai) === "undefined" || zhouliuzaoshanganpai === null) {
            message.error("请输入周六早上的安排！");return;
        }
        let zhouliushangwuanpai = $("#zhouliushangwuanpai").val().trim();
        if (zhouliushangwuanpai === "" || typeof (zhouliushangwuanpai) === "undefined" || zhouliushangwuanpai === null) {
            message.error("请输入周六上午的安排！");return;
        }
        let zhouliuxiawuanpai = $("#zhouliuxiawuanpai").val().trim();
        if (zhouliuxiawuanpai === "" || typeof (zhouliuxiawuanpai) === "undefined" || zhouliuxiawuanpai === null) {
            message.error("请输入周六下午的安排！");return;
        }
        let zhouliuwanshanganpai = $("#zhouliuwanshanganpai").val().trim();
        if (zhouliuwanshanganpai === "" || typeof (zhouliuwanshanganpai) === "undefined" || zhouliuwanshanganpai === null) {
            message.error("请输入周六晚上的安排！");return;
        }
        let zhourizhibanbanzhang=THE.zhourizhibanbanzhang;
        if (zhourizhibanbanzhang.length < 1){
            message.error("请选择周日值班班长！");return;
        }
        let zhourizhibanganbu=THE.zhourizhibanganbu;
        if (zhourizhibanganbu.length < 1){
            message.error("请选择周日值班干部！");return;
        }
        let zhourzaoshanganpai = $("#zhourzaoshanganpai").val().trim();
        if (zhourzaoshanganpai === "" || typeof (zhourzaoshanganpai) === "undefined" || zhourzaoshanganpai === null) {
            message.error("请输入周日早上的安排！");return;
        }
        let zhourshangwuanpai = $("#zhourshangwuanpai").val().trim();
        if (zhourshangwuanpai === "" || typeof (zhourshangwuanpai) === "undefined" || zhourshangwuanpai === null) {
            message.error("请输入周日上午的安排！");return;
        }
        let zhourxiawuanpai = $("#zhourxiawuanpai").val().trim();
        if (zhourxiawuanpai === "" || typeof (zhourxiawuanpai) === "undefined" || zhourxiawuanpai === null) {
            message.error("请输入周日下午的安排！");return;
        }
        let zhourwanshanganpai = $("#zhourwanshanganpai").val().trim();
        if (zhourwanshanganpai === "" || typeof (zhourwanshanganpai) === "undefined" || zhourwanshanganpai === null) {
            message.error("请输入周日晚上的安排！");return;
        }

        if (!confirm("确定新增此周配档?")) {
            return;
        }
        let zhoucaipuAO = {};
        zhoucaipuAO["zhouyizaoshang"] = zhouyizaoshanganpai;
        zhoucaipuAO["zhouyishangwu"] = zhouyishangwuanpai;
        zhoucaipuAO["zhouyixiawu"] = zhouyixiawuanpai;
        zhoucaipuAO["zhouyiwanshang"] = zhouyiwanshanganpai;
        zhoucaipuAO["zhouerzaoshang"] = zhouerzaoshanganpai;
        zhoucaipuAO["zhouershangwu"] = zhouershangwuanpai;
        zhoucaipuAO["zhouerxiawu"] = zhouerxiawuanpai;
        zhoucaipuAO["zhouerwanshang"] = zhouerwanshanganpai;
        zhoucaipuAO["zhousanzaoshang"] = zhousanzaoshanganpai;
        zhoucaipuAO["zhousanshangwu"] = zhousanshangwuanpai;
        zhoucaipuAO["zhousanxiawu"] = zhousanxiawuanpai;
        zhoucaipuAO["zhousanwanshang"] = zhousanwanshanganpai;
        zhoucaipuAO["zhousizaoshang"] = zhousizaoshanganpai;
        zhoucaipuAO["zhousishangwu"] = zhousishangwuanpai;
        zhoucaipuAO["zhousixiawu"] = zhousixiawuanpai;
        zhoucaipuAO["zhousiwanshang"] = zhousiwanshanganpai;
        zhoucaipuAO["zhouwuzaoshang"] = zhouwuzaoshanganpai;
        zhoucaipuAO["zhouwushangwu"] = zhouwushangwuanpai;
        zhoucaipuAO["zhouwuxiawu"] = zhouwuxiawuanpai;
        zhoucaipuAO["zhouwuwanshang"] = zhouwuwanshanganpai;
        zhoucaipuAO["zhouliuzaoshang"] = zhouliuzaoshanganpai;
        zhoucaipuAO["zhouliushangwu"] = zhouliushangwuanpai;
        zhoucaipuAO["zhouliuxiawu"] = zhouliuxiawuanpai;
        zhoucaipuAO["zhouliuwanshang"] = zhouliuwanshanganpai;
        zhoucaipuAO["zhourizaoshang"] = zhourzaoshanganpai;
        zhoucaipuAO["zhourishangwu"] = zhourshangwuanpai;
        zhoucaipuAO["zhourixiawu"] = zhourxiawuanpai;
        zhoucaipuAO["zhouriwanshang"] = zhourwanshanganpai;

        zhoucaipuAO["zhouyizhibanbanzhang"] = zhouyizhibanbanzhang;
        zhoucaipuAO["zhouyizhibanganbu"] = zhouyizhibanganbu;
        zhoucaipuAO["zhouerzhibanbanzhang"] = zhouerzhibanbanzhang;
        zhoucaipuAO["zhouerzhibanganbu"] = zhouerzhibanganbu;
        zhoucaipuAO["zhousanzhibanbanzhang"] = zhousanzhibanbanzhang;
        zhoucaipuAO["zhousanzhibanganbu"] = zhousanzhibanganbu;
        zhoucaipuAO["zhousizhibanbanzhang"] = zhousizhibanbanzhang;
        zhoucaipuAO["zhousizhibanganbu"] = zhousizhibanganbu;
        zhoucaipuAO["zhouwuzhibanbanzhang"] = zhouwuzhibanbanzhang;
        zhoucaipuAO["zhouwuzhibanganbu"] = zhouwuzhibanganbu;
        zhoucaipuAO["zhouliuzhibanbanzhang"] = zhouliuzhibanbanzhang;
        zhoucaipuAO["zhouliuzhibanganbu"] = zhouliuzhibanganbu;
        zhoucaipuAO["zhourizhibanbanzhang"] = zhourizhibanbanzhang;
        zhoucaipuAO["zhourizhibanganbu"] = zhourizhibanganbu;

        zhoucaipuAO["nianfen"] = nianfen
        zhoucaipuAO["zhouci"] = zhouci;

        $.ajax({
            type:'post',
            url:SERVER+"xinzengzhoupeidang",
            data : JSON.stringify(zhoucaipuAO),
            dataType : 'json',
            contentType : "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("添加成功");
                THE.backPage();
            }
        });
    }

    nianfenChange(value) {
        this.setState({
            xianshinianfen : value
        });
    }
    zhouciChange(value) {
        this.setState({
            xianshizhouci : value
        });
    }

    getRenyuanList(){
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER + "chakanAllFiremenByJigou",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i].key = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    renyuanList: list,
                });
            }
        });
    }

    zhouyizhibanbanzhang = [];
    zhouerzhibanbanzhang = [];
    zhousanzhibanbanzhang = [];
    zhousizhibanbanzhang = [];
    zhouwuzhibanbanzhang = [];
    zhouliuzhibanbanzhang = [];
    zhourizhibanbanzhang = [];
    zhibanbanzhangChang(xingqi,value) {
        if(xingqi === '周一'){
        this.zhouyizhibanbanzhang = value;
        }else if(xingqi === '周二'){
        this.zhouerzhibanbanzhang = value;
        }else if(xingqi === '周三'){
        this.zhousanzhibanbanzhang = value;
        }else if(xingqi === '周四'){
        this.zhousizhibanbanzhang = value;
        }else if(xingqi === '周五'){
        this.zhouwuzhibanbanzhang = value;
        }else if(xingqi === '周六'){
        this.zhouliuzhibanbanzhang = value;
        }else{
        this.zhourizhibanbanzhang = value;
        }
    }

    zhouyizhibanganbu = [];
    zhouerzhibanganbu = [];
    zhousanzhibanganbu = [];
    zhousizhibanganbu = [];
    zhouwuzhibanganbu = [];
    zhouliuzhibanganbu = [];
    zhourizhibanganbu = [];
    zhibanganbuChang(xingqi,value) {
        if(xingqi === '周一'){
            this.zhouyizhibanganbu = value;
        }else if(xingqi === '周二'){
            this.zhouerzhibanganbu = value;
        }else if(xingqi === '周三'){
            this.zhousanzhibanganbu = value;
        }else if(xingqi === '周四'){
            this.zhousizhibanganbu = value;
        }else if(xingqi === '周五'){
            this.zhouwuzhibanganbu = value;
        }else if(xingqi === '周六'){
            this.zhouliuzhibanganbu = value;
        }else{
            this.zhourizhibanganbu = value;
        }
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai";
        }else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai";
        }
    }

    componentWillMount(){
        this.huoqushijian();
    }

    componentDidMount() {
        this.getRenyuanList();
    }

    render() {

        let renyuanOptions = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['xingming']}>{item['xingming']}</Select.Option>);
        const { nianfen, zhouci, startTime, endTime, xianshinianfen, xianshizhouci,maxzhouci,dangqiannian} = this.state;

        return (
            <div layout="inline">
                <label>年份:</label>
                <InputNumber style={{margin:10,width:200}} name="nianfen" value={xianshinianfen} min={dangqiannian-10} max={+dangqiannian+10} onChange={this.nianfenChange.bind(this)}/>
                <label>周次:</label>
                <InputNumber style={{margin:10,width:200}} name="zhouci" value={xianshizhouci} min={1} max={maxzhouci} onChange={this.zhouciChange.bind(this)}/>
                <Button type="primary" onClick={this.search.bind(this)}>设置</Button>
                <br/>
                <Tag id="biaoti">{nianfen}年{zhouci}周  时间段：{startTime}--{endTime}</Tag>
                <Card title="周一" bordered={false}>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班班长:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanbanzhangChang.bind(this,'周一')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班干部:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanganbuChang.bind(this,'周一')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>早上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouyizaoshanganpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>上午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouyishangwuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>下午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouyixiawuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>晚上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouyiwanshanganpai" style={{width:'80%'}}/>
                </Card>
                <Card title="周二" bordered={false}>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班班长:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanbanzhangChang.bind(this,'周二')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班干部:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanganbuChang.bind(this,'周二')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>早上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouerzaoshanganpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>上午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouershangwuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>下午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouerxiawuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>晚上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouerwanshanganpai" style={{width:'80%'}}/>
                </Card>
                <Card title="周三" bordered={false}>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班班长:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanbanzhangChang.bind(this,'周三')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班干部:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanganbuChang.bind(this,'周三')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>早上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhousanzaoshanganpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>上午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhousanshangwuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>下午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhousanxiawuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>晚上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhousanwanshanganpai" style={{width:'80%'}}/>
                </Card>
                <Card title="周四" bordered={false}>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班班长:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanbanzhangChang.bind(this,'周四')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班干部:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanganbuChang.bind(this,'周四')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>早上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhousizaoshanganpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>上午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhousishangwuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>下午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhousixiawuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>晚上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhousiwanshanganpai" style={{width:'80%'}}/>
                </Card>
                <Card title="周五" bordered={false}>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班班长:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanbanzhangChang.bind(this,'周五')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班干部:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanganbuChang.bind(this,'周五')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>早上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouwuzaoshanganpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>上午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouwushangwuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>下午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouwuxiawuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>晚上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouwuwanshanganpai" style={{width:'80%'}}/>
                </Card>
                <Card title="周六" bordered={false}>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班班长:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanbanzhangChang.bind(this,'周六')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班干部:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanganbuChang.bind(this,'周六')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>早上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouliuzaoshanganpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>上午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouliushangwuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>下午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouliuxiawuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>晚上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhouliuwanshanganpai" style={{width:'80%'}}/>
                </Card>
                <Card title="周日" bordered={false}>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班班长:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanbanzhangChang.bind(this,'周日')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>值班干部:</label>
                    <br/>
                    <Select style={{width:'80%'}} onChange={this.zhibanganbuChang.bind(this,'周日')} mode="multiple">
                        {renyuanOptions}
                    </Select>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>早上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhourzaoshanganpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>上午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhourshangwuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>下午:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhourxiawuanpai" style={{width:'80%'}}/>
                    <br/>
                    <label style={{fontSize:16,fontWeight:"bold"}}>晚上:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="zhourwanshanganpai" style={{width:'80%'}}/>
                </Card>
                <br/>
                <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
