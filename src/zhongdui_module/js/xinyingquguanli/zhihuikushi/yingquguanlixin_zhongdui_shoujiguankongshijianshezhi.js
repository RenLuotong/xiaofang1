import React, { Component } from 'react';
import {
    Form, Input, Icon, Button, Select, InputNumber, message, DatePicker, TimePicker
} from 'antd';
import moment from "moment";

let id = 0;

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            xiaofangcheList:[],
            endOpen2: false,
            visible: false,
            start: null,
            end: null,
            shezhishijian:''
        };
    }

    //设置时间限制
    getDisabledHours = () => {
        var hours = [];
        if (this.state.start !== null) {
            for (var i = 0; i < this.state.start.hour(); i++) {
                hours.push(i);
            }
        }
        return hours;
    }
    getDisabledMinutes = (selectedHour) => {
        var minutes= [];
        if (this.state.start !== null && selectedHour === this.state.start.hour()){
            for(var i =0; i < this.state.start.minute(); i++){
                minutes.push(i);
            }
        }
        return minutes;
    }
    getDisabledSeconds = (selectedHour,selectedMinute) => {
        var seconds= [];
        if (this.state.start !== null && selectedHour === this.state.start.hour() && selectedMinute === this.state.start.minute()){
            for(var i =0; i < this.state.start.second(); i++){
                seconds.push(i);
            }
        }
        return seconds;
    }
    handleStartOpenChange2 = (open2) => {
        if (!open2) {
            this.setState({ endOpen2: true });
        }
    }
    handleEndOpenChange2 = (open2) => {
        this.setState({ endOpen2: open2 });
    }
    onStart = (value) => {
        this.onChange('start', value);
    }
    onEnd = (value) => {
        this.onChange('end', value);
    }

    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    tijiao(e) {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { form } = this.props;
        let zhouci = form.getFieldValue('zhouci');
        if (typeof (zhouci)=="undefined"||zhouci == null||zhouci == ""){
            message.error("请选择周次！");return;
        }
        const keys = getFieldValue('keys');
        if (keys.length == 0) {
            message.warning("请设置手机管控时间");
            return;
        }
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let postList = [];
                for (let i = 0; i < keys.length; i++) {
                    let shijianfanweikaishi = values.shijianfanweikaishi[keys[i]];
                    if (typeof(shijianfanweikaishi) == "undefined"||shijianfanweikaishi == null||shijianfanweikaishi == '') {
                        message.error("请选择设防时间！");return;
                    } else {
                        shijianfanweikaishi = moment(shijianfanweikaishi).format('HH:mm');
                    }
                    let shijianfanweijieshu = values.shijianfanweijieshu[keys[i]];
                    if (typeof(shijianfanweijieshu) == "undefined"||shijianfanweijieshu == null||shijianfanweijieshu == '') {
                        message.error("请选择撤防时间！");return;
                    } else {
                        shijianfanweijieshu = moment(shijianfanweijieshu).format('HH:mm');
                    }
                    let obj = {};
                    obj.chefangshijian = shijianfanweikaishi;
                    obj.shefangshijian = shijianfanweijieshu;
                    postList.push(obj);
                }
                let guankongshijianAO = {};
                guankongshijianAO.shifouxinzeng = true;
                guankongshijianAO.shijian = postList;
                guankongshijianAO.zhouci = zhouci;
                console.log(guankongshijianAO);
                const THE = this;
                $.ajax({
                    type : 'POST',
                    url : SERVER+"shoujiguankong/xiugaizhouci",
                    data : JSON.stringify(zhouci),
                    dataType : 'json',
                    contentType : "application/json",
                    success : function(data) {
                        if (data.status != 0) {
                            message.warning(data.message);
                            return;
                        }
                    },
                });
                $.ajax({
                    type:'POST',
                    url: SERVER + "shoujiguankong/shezhiGuankongShijian",
                    data : JSON.stringify(guankongshijianAO),
                    dataType : 'json',
                    contentType : "application/json",
                    success: function (data) {
                        if (data.status != 0) {
                            message.warning(data.message);
                            return;
                        }
                        message.success("设置成功");
                        setTimeout(THE.backPage(),1000);
                    }
                });
            }
        });
    }


    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi";
        }else{
            window.location.href = "./zhidui.html#/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi";
        }

    }

    componentDidMount(){
    }

    render(){

        const { getFieldDecorator, getFieldValue } = this.props.form;
        const {start,end,endOpen2} = this.state;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <div
                    key={k}
                >
                    <Form.Item
                        required={false}
                        key={k}
                    >
                        设防时间 :
                        {getFieldDecorator
                        (`shijianfanweikaishi[${k}]`, {
                        })(
                            <TimePicker
                                showTime
                                format="HH:mm:ss"
                                placeholder="设防时间"
                                style={{margin: 10, width: 200}}
                            />
                        )}
                        撤防时间 :
                        {getFieldDecorator
                        (`shijianfanweijieshu[${k}]`, {
                        })(
                            <TimePicker
                                showTime
                                format="HH:mm:ss"
                                placeholder="撤防时间"
                                style={{margin: 10, width: 200}}
                            />
                        )}
                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        ) : null}
                    </Form.Item>
                    <br/>
                </div>
            )
        });

        return(
            <div>
                <Form layout="inline" style={{margin:5}}>
                    <Form.Item label="周次">
                        {getFieldDecorator('zhouci',)(
                            <Select style={{margin:10,width:400}} mode="multiple">
                                <Select.Option value="MONDAY">周一</Select.Option>
                                <Select.Option value="TUESDAY">周二</Select.Option>
                                <Select.Option value="WEDNESDAY">周三</Select.Option>
                                <Select.Option value="THURSDAY">周四</Select.Option>
                                <Select.Option value="FRIDAY">周五</Select.Option>
                                <Select.Option value="SATURDAY">周六</Select.Option>
                                <Select.Option value="SUNDAY">周日</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                </Form>
                <Form onSubmit={this.handleSubmit} layout="inline">
                    {formItems}
                    <Form.Item>
                        <Button type="dashed" onClick={this.add} style={{ width: '200px' }}>
                            <Icon type="plus" />管控时间设置
                        </Button>
                    </Form.Item>
                    <br/>
                    <Form.Item>
                        <Button type="primary" onClick={this.tijiao.bind(this)}>提交</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(App);
export default WrappedApp;