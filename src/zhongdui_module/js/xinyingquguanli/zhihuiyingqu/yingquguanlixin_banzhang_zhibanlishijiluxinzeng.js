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
    Upload, InputNumber,
} from 'antd';
import moment from "moment";

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

    toCreate(){
        const THE = this;
        let startValue = this.state.startValue;
        if (typeof(startValue) == "undefined"||startValue == null) {
            message.warning("请选择值班开始时间");
            return;
        } else {
            startValue = moment(startValue).format('YYYY-MM-DD HH:mm:ss');
        }
        let endValue = this.state.endValue;
        if (typeof(endValue) == "undefined"||endValue == null) {
            message.warning("请选择值班结束时间");
            return;
        } else {
            endValue = moment(endValue).format('YYYY-MM-DD HH:mm:ss');
        }
        let yihao = this.yihao;
        if (typeof(yihao) == "undefined"||yihao == null||yihao=='') {
            message.warning("请选择一号值班人");
            return;
        }
        let erhao = this.erhao;
        if (typeof(erhao) == "undefined"||erhao == null||erhao=='') {
            message.warning("请选择二号值班人");
            return;
        }
        if(erhao==yihao){
            message.warning("值班人不能为同一人");
            return;
        }
        if (!confirm("确定新增此值班记录")) {
            return;
        }
        $.ajax({
            type:'POST',
            url:SERVER+"tb_zhiban/luruZhibanjihua?jihuakaishishijian="+startValue+"&jihuajieshushijian="+endValue+"&jihuayihaozhibanrenbianhao="+yihao+"&jihuaerhaozhibanrenbianhao="+erhao,
            data:JSON.stringify(),
            dataType:'json',
            contentType: "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.backPage();
            }
        });
    }
    backPage() {
        window.location.href = "./zhongdui.html#/yingquguanlixin_banzhang_zhibanlishijilu";
    }
    yihao = ''
    yihaoChange(value) {
        this.yihao = value;
    }
    erhao = ''
    erhaoChange(value) {
        this.erhao = value;
    }

    componentDidMount() {
        this.renyuanList();
    }

    render() {
        let renyuanList = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>);

        const { startValue, endValue} = this.state;

        return (
            <div>
                <label>值班计划开始时间:</label>
                <DatePicker
                    showTime
                    disabledDate={this.disabledStartDate}
                    disabledTime={this.disabledStartTime}
                    value={startValue}
                    placeholder="值班计划开始时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={this.onStartChange}
                    style={{margin:10,width:200}}
                />
                <label>值班计划结束时间:</label>
                <DatePicker
                    showTime
                    disabledDate={this.disabledEndDate}
                    disabledTime={this.disabledEndTime}
                    value={endValue}
                    placeholder="值班计划结束时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={this.onEndChange}
                    style={{margin:10,width:200}}
                />
                <br/>
                <label>计划1号值班人&nbsp;&#12288;:</label>
                <Select style={{margin:10,width:200}} onChange={this.yihaoChange.bind(this)}>
                    {renyuanList}
                </Select>
                <label>计划2号值班人&nbsp;&#12288;:</label>
                <Select style={{margin:10,width:200}} onChange={this.erhaoChange.bind(this)}>
                    {renyuanList}
                </Select>
                <br/>
                <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
