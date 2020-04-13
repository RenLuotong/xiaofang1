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
            yaopinList: [],
            piciList: [],
        };
    }

    yaopin = ''
    yaopinChang(value) {
        const THE = this;
        THE.yaopin = value;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvyaopinpici/feiyiguoqi?yaopinId="+value,
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
                    piciList: list,
                });
            }
        });
    }

    pici = ''
    piciChang(value) {
        this.pici = value;
    }

    renyuan = ''
    renyuanChang(value) {
        this.renyuan = value;
    }

    toCreate() {
        const THE = this;
        let yaopin = this.yaopin;
        if (yaopin == "") {
            message.error("请选择药品！");return;
        }
        let pici = this.pici;
        if (pici == "") {
            message.error("请选择批次！");return;
        }
        let shiyongshuliang = $("#shiyongshuliang").val().trim();
        if (shiyongshuliang == "") {
            message.error("请输入使用数量！");return;
        }
        let shiyongren = this.renyuan;
        if (shiyongren == "") {
            message.error("请输入使用人！");return;
        }
        let shiyongliyou = $("#shiyongliyou").val().trim();
        if (shiyongliyou == "") {
            message.error("请输入使用理由！");return;
        }
        if (!confirm("确定添加这条药品使用记录！")) {
            return;
        }
        let yaopinshiyongjiluVM = {};
        yaopinshiyongjiluVM["yaopinId"] = yaopin;
        yaopinshiyongjiluVM["shiyongrenbianhao"] = shiyongren;
        yaopinshiyongjiluVM["shiyongshuliang"] = Number(shiyongshuliang);
        yaopinshiyongjiluVM["shiyongliyou"] = shiyongliyou;
        yaopinshiyongjiluVM["picibianhao"] = pici;
        $.ajax({
            type:'post',
            url:SERVER+"yaopinshiyongshenqing",
            data : JSON.stringify(yaopinshiyongjiluVM),
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

    getRenyuanList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "renyuanLiebiao?page=0&size=100",
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
                    renyuanList: list,
                });
            }
        });
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="大队"){
            window.location.href = "./dadui.html#/yingquguanlixin_yiwurenyuan_yaopinshiyongguanli";
        }
        else if (role=="中队") {
            window.location.href = "./zhongdui.html#/yingquguanlixin_yiwurenyuan_yaopinshiyongguanli";
        }
        else {
            window.location.href = "./zhidui.html#/yingquguanlixin_yiwurenyuan_yaopinshiyongguanli";
        }
    }

    componentDidMount() {
        this.getyaopinList();
        this.getRenyuanList();
    }

    render() {

        let renyuanList = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>);

        let yaopinOptions = this.state.yaopinList.map(item =>
            <Select.Option key={item['key']} value={item['id']}>{item['yaopinmingcheng']}</Select.Option>
        );
        let piciOptions = this.state.piciList.map(item =>
            <Select.Option key={item['picibianhao']} value={item['picibianhao']}>{item['pici']}</Select.Option>
        );


        return (
            <div>
                <label>选择药品:</label>
                <Select style={{margin:10,width:200}} onChange={this.yaopinChang.bind(this)}>
                    {yaopinOptions}
                </Select>
                <label>批次&#12288;:</label>
                <Select style={{margin:10,width:600}} onChange={this.piciChang.bind(this)}>
                    {piciOptions}
                </Select>
                <br/>
                <label>使用数量:</label>
                <InputNumber size="default" id="shiyongshuliang" style={{margin:10,width:200}} min={1}/>
                <label>使用人:</label>
                <Select style={{margin:10,width:600}} onChange={this.renyuanChang.bind(this)}>
                    {renyuanList}
                </Select>
                <br/>
                <label>使用理由:</label>
                <br/>
                <TextArea autosize={{minRows:3}} id="shiyongliyou" style={{width:500}}/>
                <br/>
                <br/>
                <br/>
                <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
