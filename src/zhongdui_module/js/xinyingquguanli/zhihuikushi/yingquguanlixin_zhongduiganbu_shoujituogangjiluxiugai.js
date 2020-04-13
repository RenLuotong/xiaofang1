import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';

import 'antd/dist/antd.css';
import {
    message,
    DatePicker,
    Select,
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Input,
    Form,
    Button,
    Table,
    Divider, TimePicker
} from 'antd';
import moment from "moment";

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            Info:{},
            time:'',
        };
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan";
        }else{
            window.location.href = "./zhidui.html#/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan";
        }

    }

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER+"shoujiguankong/guankongxiangqing?id="+id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if(data.data["chefangshijian"] !=='' && data.data["chefangshijian"] !== null && data.data["chefangshijian"] !== undefined){
                    data.data["shijian"] = moment(data.data["chefangshijian"]).format('HH:mm:ss');
                }else{
                    data.data["shijian"] = moment(data.data["shefangshijian"]).format('HH:mm:ss');
                }
                console.info(data.data.shijian)
                THE.setState({
                    Info: data.data,
                });
            }
        });
    }

    editPw() {
        let Info = this.state.Info;
        let id = this.state.id;
        let guankongshijianAO = {};
        guankongshijianAO.shifouxinzeng = false;
        let time  = this.state.time;
        if (typeof (time)=="undefined"||time == null||time == ""){
            message.error("请选择时间！");return;
        }
        let shijian = [];
        let obj = {};
        if(Info["chefangshijian"] !=='' && Info["chefangshijian"] !== null && Info["chefangshijian"] !== undefined){
            obj.chefangshijian =  moment(time).format('HH:mm');
            obj.shefangshijian =  '';
        }else{
            obj.shefangshijian = moment(time).format('HH:mm');
            obj.chefangshijian =  '';
        }
        shijian.push(obj)
        guankongshijianAO.shijian = shijian;
        guankongshijianAO.zhouci = Info.zhouci;
        guankongshijianAO.id = id;
        if (!confirm("确定修改时间！")) {
            return;
        }
        console.log(guankongshijianAO);
        const THE = this;
        $.ajax({
            type : 'POST',
            url : SERVER+"shoujiguankong/shezhiGuankongShijian",
            data : JSON.stringify(guankongshijianAO),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.backPage();
            },
        });
    }

    shijianChang = (value) => {
        console.log(value)
        this.setState({
            time: value,
        });
    }


    componentDidMount() {
        this.getInfo();
    }

    render() {
        const { time } = this.state;

        return (
            <div>
                <label>设置时间:</label>
                <TimePicker
                    value={time}
                    onChange={this.shijianChang}
                    showTime
                    format="HH:mm:ss"
                    placeholder="设置时间"
                    style={{margin: 10, width: 200}}
                />
                <Button type="primary" onClick={this.editPw.bind(this)}>提交</Button>
            </div>
        );
    }
}


