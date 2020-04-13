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
    Popover,
    InputNumber,
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
            startValue: null,
            endValue: null,
            qingjialeixingList: [],
            currentTime:new Date(),
            shichang:'',
            shenpirenyuanList: [],
            chaosongrenyuanList: [],
        };
    }

    //获取请假类型list
    getqingjialeixingList() {
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
                    qingjialeixingList: list,
                });
            }
        });
    }

    //获取候选人
    huoquhouxuanrenList() {
        const THE = this;
        let variables={};
        variables.faqirenliuchengjuese=sessionStorage.getItem("liuchengjuesemingcheng");
        let processDefinitionKey = qingjiaprocessKey;
        $.ajax({
            type:'POST',
            url: SERVER + "activiti/process/candidaters?processDefinitionKey="+processDefinitionKey,
            data : JSON.stringify(variables),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if($.isEmptyObject(data.data) === false){
                for(var i in data.data) {
                    list.push(data.data[i])
                }

                THE.setState({
                    shenpirenyuanList: list[0],
                });
                }
            }
        });
    }

    //获取抄送人
    huoquchaosongrenList() {
        const THE = this;
        let variables={};
        variables.faqirenliuchengjuese=sessionStorage.getItem("liuchengjuesemingcheng");
        let processDefinitionKey = qingjiaprocessKey;
        $.ajax({
            type:'POST',
            url: SERVER + "activiti/process/copyperson?processDefinitionKey="+processDefinitionKey,
            data : JSON.stringify(variables),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if($.isEmptyObject(data.data) === false){
                    for(var i in data.data) {
                        list.push(data.data[i])
                    }

                    THE.setState({
                        chaosongrenyuanList: list[0],
                    });
                }
            }
        });
    }

    //开始时间截止时间
    disabledStartDate = (startValue) => {
        const current=this.state.currentTime;
        if (!startValue || !current) {
            return false;
        }
        return startValue.valueOf()<=current.valueOf();
    }
    disabledEndDate = (endValue) => {
        const current=this.state.currentTime;
        const startValue = this.state.startValue;
        if (!endValue||!current) {
            return false;
        }
        if (typeof(startValue) == "undefined"||startValue == null) {
            return endValue.valueOf() <= current.valueOf();
        }else{
            return endValue.valueOf() <= startValue.valueOf();
        }
    }
    disabledStartTime = (startValue) => {
        const current = this.state.current;
        if (!startValue || !current) {
            return false;
        }
        return startValue.valueOf() <= current.valueOf();
    }
    disabledEndTime=(endValue)=>{
        const current=this.state.currentTime;
        const startValue = this.state.startValue;
        if (!endValue || !current) {
            return false;
        }
        if (typeof(startValue) == "undefined"||startValue == null) {
            return endValue.valueOf() <= current.valueOf();
        }else{
            return endValue.valueOf() <= startValue.valueOf();
        }
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onStartChange = (value) => {
        let shichang = '';
        let tianshu = ''
        let xiaoshi = ''
        this.onChange('startValue', value);
        if(this.state.endValue !== null && this.state.endValue !== ''){
            xiaoshi = parseInt((this.state.endValue - value) / 3600000);
            if(xiaoshi < 24){
                shichang = xiaoshi + '小时';
            }else{
                tianshu = parseInt(xiaoshi/24);
                xiaoshi = xiaoshi%24;
                shichang = tianshu + '天' +xiaoshi + '小时';
            }
        }
        this.setState({
            shichang: shichang,
        });
    }
    onEndChange = (value) => {
        let shichang = '';
        let tianshu = ''
        let xiaoshi = ''
        if(this.state.startValue !== null && this.state.startValue !== ''){
           xiaoshi = parseInt((value - this.state.startValue) / 3600000);
           if(xiaoshi < 24){
               shichang = xiaoshi + '小时';
           }else{
               tianshu = parseInt(xiaoshi/24);
               xiaoshi = xiaoshi%24;
               shichang = tianshu + '天' +xiaoshi + '小时';
           }
        }
        this.setState({
            shichang: shichang,
        });
        this.onChange('endValue', value);
    }

    qingjialeixing=''
    qingjialeixingChang(value) {
        this.qingjialeixing = value;
    }
    shenpirenyuan=''
    shenpirenyuanChang(value) {
        this.shenpirenyuan = value;
    }

    chaosongrenyuan=''
    chaosongrenyuanChang(value) {
        this.chaosongrenyuan = value;
    }

    toCreate() {
        if(panduanshenfen(sessionStorage.getItem("liuchengjuesemingcheng")) === true){
            message.error("你不需要发起该申请！");return;
        };
        const THE = this;
        let qingjialeixing = this.qingjialeixing;
        if (qingjialeixing == ""||qingjialeixing == null||qingjialeixing ==  "undefined") {
            message.error("请选择外出类型！");return;
        }
        let waichudidian = $("#waichudidian").val().trim();
        if (waichudidian == ""||waichudidian == null||waichudidian ==  "undefined") {
            message.error("请输入外出地点！");return;
        }
        let startValue = this.state.startValue;
        if (typeof(startValue) == "undefined"||startValue == null||startValue == '') {
            message.warning("请选择外出时间");
            return;
        }
        let endValue = this.state.endValue;
        if (typeof(endValue) == "undefined"||endValue == null||endValue == '') {
            message.warning("请选择返回时间");
            return;
        }
        let diff = endValue.diff(startValue, 'second');
        if( qingjialeixing == "事假（短）" && diff > 86399){
            message.warning("事假（短）时长不能超过一天");
            return;
        }
        let shenpirenyuan = this.shenpirenyuan;
        if (shenpirenyuan == ""||shenpirenyuan == null||shenpirenyuan ==  "undefined") {
            message.error("请选择审批人！");return;
        }
        let chaosongrenyuan = this.chaosongrenyuan;
        if (chaosongrenyuan == ""||chaosongrenyuan == null||chaosongrenyuan ==  "undefined") {
            message.error("请选择抄送人！");return;
        }
        let shenpirenxingming=shenpirenyuan.split('+')[1];
        let shenpirenbianhao=shenpirenyuan.split('+')[0];
        let qingjialiyou = $("#qingjialiyou").val().trim();
        if (qingjialiyou == ""||qingjialiyou == null||qingjialiyou ==  "undefined") {
            message.error("请输入外出事由！");return;
        }
        let shenqingdanzhuangtai = '请假申请中';
        let processDefinitionKey = qingjiaprocessKey;
        let shenpirenyuanbianhaolist=[];
        shenpirenyuanbianhaolist.push(shenpirenbianhao);
        let variables = {};
        variables.waichudidian = waichudidian;
        variables.shijiqingjialeixing = qingjialeixing;
        variables.jihuaqingjiashijian=startValue;
        variables.jihuaxiaojiashijian=endValue;
        variables.qingjiashichang=this.state.shichang;
        variables.qingjialiyou=qingjialiyou;
        variables.shenqingrenmingcheng=sessionStorage.getItem("userName");
        variables.shenqingrenbianhao=sessionStorage.getItem("renyuanbianhao");
        variables.shenqingrenrenyuanleixing=sessionStorage.getItem("renyuanleixing");
        variables.shenqingdanzhuangtai=shenqingdanzhuangtai;
        variables.faqirenliuchengjuese=sessionStorage.getItem("liuchengjuesemingcheng");
        variables.shenpirenyuanxingming=shenpirenxingming;
        variables.shenpirenyuanbianhao=shenpirenbianhao;
        //variables.shenpirenyuanbianhaolist=shenpirenyuanbianhaolist;
        variables.jigoumingcheng=sessionStorage.getItem("jigoumingcheng");
        variables.jigoudaima=sessionStorage.getItem("jigoudaima");
        variables.shenqingrenbumen=sessionStorage.getItem("suosubumen");
        variables.chaosongrenyuanxingming=chaosongrenyuan.split('+')[1];
        variables.chaosongrenyuanbianhao=chaosongrenyuan.split('+')[0];
        // if (chaosongrenyuan !== "" && chaosongrenyuan !== null && chaosongrenyuan !==  "undefined") {
        //     variables.chaosongrenyuanxingming=chaosongrenyuan.split('+')[1];
        //     variables.chaosongrenyuanbianhao=chaosongrenyuan.split('+')[0];
        // }
        if (!confirm("确定添加请假申请！")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER+"activiti/startProcess?processDefinitionKey="+processDefinitionKey,
            data : JSON.stringify(variables),
            dataType : 'json',
            contentType : "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("申请成功");
                THE.backPage();
            }
        });
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_xiaofangyuan_qingjialishijilu";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_xiaofangyuan_qingjialishijilu";
        }else{
            window.location.href = "./zhidui.html#/yingquguanlixin_xiaofangyuan_qingjialishijilu";
        }

    }

    componentDidMount() {
        this.getqingjialeixingList();
        this.huoquhouxuanrenList();
        this.huoquchaosongrenList();
    }

    render() {

        let qingjialeixingOptions = this.state.qingjialeixingList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );
        let shenpirenyuanOptions = this.state.shenpirenyuanList.map(item =>
            <Select.Option key={item['key']} value={item['renyuanbianhao'] + '+' + item['xingming']}>{item['xingming']}</Select.Option>
        );
        let chaosongrenyuanOptions = this.state.chaosongrenyuanList.map(item =>
            <Select.Option key={item['key']} value={item['renyuanbianhao'] + '+' + item['xingming']}>{item['xingming']}</Select.Option>
        );

        const { startValue, endValue,shichang} = this.state;

        return (
            <div>
                <label>外出类型:</label>
                <Select style={{margin:10,width:200}} onChange={this.qingjialeixingChang.bind(this)}>
                    {qingjialeixingOptions}
                </Select>
                <label>外出地点:</label>
                <Input style={{margin:10,width:200}} id="waichudidian"/>
                <br/>
                <label>外出时间:</label>
                <DatePicker
                    showTime
                    disabledDate={this.disabledStartDate}
                    disabledTime={this.disabledStartTime}
                    value={startValue}
                    placeholder="计划请假时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={this.onStartChange}
                    style={{margin:10,width:200}}
                />
                <label>返回时间:</label>
                <DatePicker
                    showTime
                    disabledDate={this.disabledEndDate}
                    disabledTime={this.disabledEndTime}
                    value={endValue}
                    placeholder="计划销假时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={this.onEndChange}
                    style={{margin:10,width:200}}
                />
                <br/>
                <label>时长&#12288;&#12288;:</label>
                <Input min={0} disabled={true} size="default" style={{margin:10,width:200}} value={shichang}/>
                <label>审批人&#12288;:</label>
                <Select style={{margin:10,width:200}} onChange={this.shenpirenyuanChang.bind(this)}>
                    {shenpirenyuanOptions}
                </Select>
                <br/>
                <label>抄送人&#12288;:</label>
                <Select style={{margin:10,width:200}} onChange={this.chaosongrenyuanChang.bind(this)}>
                    {chaosongrenyuanOptions}
                </Select>
                <br/>
                <label>外出事由:</label>
                <br/>
                <TextArea autosize={{minRows:3}} id="qingjialiyou" style={{width:500}}/>
                <br/>
                <br/>
                <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
