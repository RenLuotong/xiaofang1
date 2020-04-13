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
        };
    }

    //获取请假类型list
    getqingjialeixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquqingjialeixingMeiju",
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

    //获取审批人员list
    getshenpirenyuanList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "chaxunzhidingjueserenyuanBybanzhang",
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
                    shenpirenyuanList: list,
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
        // if((sessionStorage.getItem("jigoumingcheng") === "战保大队" || sessionStorage.getItem("jigoumingcheng") === "特勤中队") && value === 'NIANXIU'){
        //     processBaseId = '特殊中队年休班长审批';
        // }else if(value === 'NIANXIU'){
        //     processBaseId = '普通中队年休班长审批';
        // }else{
        //     processBaseId = '临时请假班长审批';
        // }
    }
    shenpirenyuan=''
    shenpirenyuanChang(value) {
        this.shenpirenyuan = value;
    }

    toCreate() {
        const THE = this;
        let waichudidian = $("#waichudidian").val().trim();
        if (waichudidian == ""||waichudidian == null||waichudidian ==  "undefined") {
            message.error("请输入外出地点！");return;
        }
        let qingjialeixing = this.qingjialeixing;
        if (qingjialeixing == ""||qingjialeixing == null||qingjialeixing ==  "undefined") {
            message.error("请选择请假类型！");return;
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
        let shenpirenyuan = this.shenpirenyuan;
        if (shenpirenyuan == ""||shenpirenyuan == null||shenpirenyuan ==  "undefined") {
            message.error("请选择审批人员！");return;
        }
        let qingjialiyou = $("#qingjialiyou").val().trim();
        if (qingjialiyou == ""||qingjialiyou == null||qingjialiyou ==  "undefined") {
            message.error("请输入请假理由！");return;
        }
        let qingjiaAo = {};
        qingjiaAo["qingjiajieshushijian"] = endValue;
        qingjiaAo["qingjiakaishishijian"] = startValue;
        qingjiaAo["qingjialeixing"] = qingjialeixing;
        qingjiaAo["qingjiayuanyin"] = qingjialiyou;
        qingjiaAo["waichudidian"] = waichudidian;
        qingjiaAo["qingjiashenpirenbianhao"] = shenpirenyuan;
        if (!confirm("确定添加请假申请！")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER+"qingjia",
            data : JSON.stringify(qingjiaAo),
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
        window.location.href = "./zhongdui.html#/yingquguanlixin_xiaofangyuan_qingjialishijilu";
    }

    componentDidMount() {
        this.getqingjialeixingList();
        this.getshenpirenyuanList();
    }

    render() {

        let qingjialeixingOptions = this.state.qingjialeixingList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );
        let shenpirenyuanOptions = this.state.shenpirenyuanList.map(item =>
            <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>
        );

        const { startValue, endValue,shichang} = this.state;

        return (
            <div>
                <label>请假类型&#12288;&#12288;:</label>
                <Select style={{margin:10,width:200}} onChange={this.qingjialeixingChang.bind(this)}>
                    {qingjialeixingOptions}
                </Select>
                <label>外出地点&#12288;&#12288;</label>
                <Input style={{width:200}} id="waichudidian"/>
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
                <label>请假时长&#12288;&#12288;:</label>
                <Input min={0} disabled={true} size="default" style={{margin:10,width:200}} value={shichang}/>
                <label>审批人员&#12288;&#12288;:</label>
                <Select style={{margin:10,width:200}} onChange={this.shenpirenyuanChang.bind(this)}>
                    {shenpirenyuanOptions}
                </Select>
                <br/>
                <label>请假理由:</label>
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
