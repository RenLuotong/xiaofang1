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
            yaopinList: [],
            guoqizhuangtaiList: [],
            shengchanrqi: '',
        };
    }

    getguoqizhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tb-yaopin-rukujilus/huoquguoqizhuangtai",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    list.push(data.data[i]);
                }
                THE.setState({
                    guoqizhuangtaiList: list,
                });
            }
        });
    }

    yaopin = ''
    yaopinChang(value) {
        this.yaopin = value;
    }

    onshengchanrqiChange = (value) => {
        this.setState({
            shengchanrqi: value,
        });
    }

    toCreate() {
        const THE = this;
        let yaopin = this.yaopin;
        if (yaopin == "") {
            message.error("请选择药品！");return;
        }
        let yaopinshuliang = $("#yaopinshuliang").val().trim();
        if (yaopinshuliang == "") {
            message.error("请输入药品数量！");return;
        }
        let baozhiqi = $("#baozhiqi").val().trim();
        if (baozhiqi == "") {
            message.error("请输入保质期！");return;
        }
        let guoqiyuzhi = $("#guoqiyuzhi").val().trim();
        if (guoqiyuzhi == "") {
            message.error("请输入过期阈值！");return;
        }
        let shengchanrqi = this.state.shengchanrqi;
        if (shengchanrqi == "" || shengchanrqi == null) {
            message.error("请选择生产日期！");return;
        }else{
            shengchanrqi = moment(shengchanrqi).format('YYYY-MM-DD');
        }
        if (!confirm("确定添加这条药品入库记录！")) {
            return;
        }
        let tbYaopinRukujiluVM = {};
        tbYaopinRukujiluVM["yaopinId"] = yaopin;
        tbYaopinRukujiluVM["shuliang"] = Number(yaopinshuliang);
        tbYaopinRukujiluVM["baozhiqi"] = Number(baozhiqi);
        tbYaopinRukujiluVM["guoqiyuzhi"] = Number(guoqiyuzhi);
        tbYaopinRukujiluVM["shengchanriqi"] = shengchanrqi;
        $.ajax({
            type:'post',
            url:SERVER+"tb-yaopin-rukujilus",
            data : JSON.stringify(tbYaopinRukujiluVM),
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
        let role=sessionStorage.getItem("ROLE");
        if(role=="大队"){
            window.location.href = "./dadui.html#/yingquguanlixin_yiwurenyuan_yaopinrukuguanli";
        }
        else if (role=="中队") {
            window.location.href = "./zhongdui.html#/yingquguanlixin_yiwurenyuan_yaopinrukuguanli";
        }
        else {
            window.location.href = "./zhidui.html#/yingquguanlixin_yiwurenyuan_yaopinrukuguanli";
        }
    }

    getyaopinList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tb-yaopins/huoquzhengchang?page=0&size=100000",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    list.push(data.data.content[i]);
                }
                THE.setState({
                    yaopinList: list,
                });
            }
        });
    }

    componentDidMount() {
        this.getyaopinList();
        this.getguoqizhuangtaiList();
    }

    render() {

        let yaopinOptions = this.state.yaopinList.map(item =>
            <Select.Option key={item['key']} value={item['id']}>{item['yaopinmingcheng']}</Select.Option>
        );
        let guoqizhuangtaiOptions = this.state.guoqizhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );
        const {shengchanrqi} = this.state;


        return (
            <div>
                <label>选择药品:</label>
                <Select style={{margin:10,width:200}} onChange={this.yaopinChang.bind(this)}>
                    {yaopinOptions}
                </Select>
                <label>药品数量:</label>
                <InputNumber size="default" id="yaopinshuliang" style={{margin:10,width:200}} min={1}/>
                <label>保质期(天):</label>
                <InputNumber size="default" id="baozhiqi" style={{margin:10,width:200}} min={1}/>
                <br/>
                <label>过期阈值:</label>
                <InputNumber size="default" id="guoqiyuzhi" style={{margin:10,width:200}} min={1}/>
                <label>生产日期:</label>
                <DatePicker
                    value={shengchanrqi}
                    placeholder="生产日期"
                    format="YYYY-MM-DD"
                    onChange={this.onshengchanrqiChange}
                    style={{margin:10,width:200}}
                />
                <br/>
                <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
