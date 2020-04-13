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
            renyuanList: [],
            startValue: null,
            endValue: null,
            currentTime:new Date(),
        };
    }


    renyuanList() {
        let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "renyuanXialiaLiebiao?jigoumingcheng=" + jigoumingcheng,
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
                    renyuanList: list,
                });
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
        this.onChange('startValue', value);
    }
    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    renyuan = []
    renyuanChang(value) {
        this.renyuan = value;
    }
    qingjialeixing=''
    qingjialeixingChang(value) {
        this.qingjialeixing = value;
    }

    toCreate() {
        const THE = this;
        let renyuan = this.renyuan;
        if (renyuan == ""||renyuan == null||renyuan ==  "undefined") {
            message.error("请选择轮休人！");return;
        }
        let startValue = this.state.startValue;
        if (typeof(startValue) == "undefined"||startValue == null||startValue == '') {
            message.warning("请选择计划请假时间");
            return;
        } else {
            startValue = moment(startValue).format('YYYY-MM-DD HH:mm:ss');
        }
        let endValue = this.state.endValue;
        if (typeof(endValue) == "undefined"||endValue == null||endValue == '') {
            message.warning("请选择计划销假时间");
            return;
        } else {
            endValue = moment(endValue).format('YYYY-MM-DD HH:mm:ss');
        }
        let qingjialiyou = $("#qingjialiyou").val().trim();
        // if (qingjialiyou == ""||qingjialiyou == null||qingjialiyou ==  "undefined") {
        //     message.error("请输入轮休理由！");return;
        // }
        let lunxiuqingjiaAo = {};
        lunxiuqingjiaAo["lunxiurenrenyuanbianhao"] = renyuan;
        lunxiuqingjiaAo["qingjiajieshushijian"] = endValue;
        lunxiuqingjiaAo["qingjiakaishishijian"] = startValue;
        lunxiuqingjiaAo["qingjiayuanyin"] = qingjialiyou;
        if (!confirm("确定添加轮休申请！")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER+"lunxiuluru",
            data : JSON.stringify(lunxiuqingjiaAo),
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

    backPage() {
        window.location.href = "./zhongdui.html#/yingquguanlixin_banzhang_qingjialishijilu";
    }

    componentDidMount() {
        this.renyuanList();
    }

    render() {
        let renyuanOptions = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>);

        const { startValue, endValue} = this.state;

        return (
            <div>
                <label>轮休人&#12288;&#12288;&#12288;:</label>
                <Select style={{margin:10,width:500}} onChange={this.renyuanChang.bind(this)} mode="multiple">
                    {renyuanOptions}
                </Select>
                <br/>
                <br/>
                <label>计划请假时间:</label>
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
                <label>计划销假时间:</label>
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
                <br/>
                <label>轮休理由:</label>
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
