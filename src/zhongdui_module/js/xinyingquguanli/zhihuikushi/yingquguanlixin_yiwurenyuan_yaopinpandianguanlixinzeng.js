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
            xitongshuliang:'',
            shengchanrqi: '',
            piciList: [],
            //显示盘亏
            showpankui: 'none',
            //显示盘盈
            showpanying: 'none',
            pici: '',
        };
    }

    kucunChang(value) {
        const THE = this;
        let xitongshuliang = THE.state.xitongshuliang;
        if(xitongshuliang > value){
            THE.setState({
                showpankui: 'block',
                showpanying: 'none'
            });
        }else if(xitongshuliang < value){
            THE.setState({
                showpankui: 'none',
                showpanying: 'block'
            });
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

    yaopin = ''
    yaopinChang(value) {
        const THE = this;
        this.yaopin = value;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvyaopinpici?yaopinId="+value,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    pici:'',
                    xitongshuliang:'',
                    piciList: list,
                });
            }
        });
    }

    onshengchanrqiChange = (value) => {
        this.setState({
            shengchanrqi: value,
        });
    }

    piciChang(value) {
        const THE = this;
        THE.setState({
            pici: value,
        });
        let yaopinId = THE.yaopin;
        $.ajax({
            type : 'GET',
            url : SERVER + "huoqvxitongpicikucunshuliang?yaopinId="+yaopinId+"&picibianhao="+value,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    xitongshuliang: data.data.shuliang,
                });
            }
        });
    }

    toCreate() {
        const THE = this;
        let xitongshuliang = THE.state.xitongshuliang;
        let yaopin = this.yaopin;
        if (yaopin == "") {
            message.error("请选择药品！");return;
        }
        let pici = '';
        pici = this.state.pici;
        if (pici == "") {
            message.error("请选择批次！");return;
        }
        let shijikucunshuliang = $("#shijikucunshuliang").val().trim();
        if (shijikucunshuliang == "") {
            message.error("请输入实际库存数量！");return;
        }
        // let shiyongshuliang = '';
        // let yaopinshuliang = '';
        // let baozhiqi = '';
        // let guoqiyuzhi = '';
        // let shengchanrqi = '';
        // if(xitongshuliang > shijikucunshuliang){
        //     pici = this.pici;
        //     if (pici == "") {
        //         message.error("请选择批次！");return;
        //     }
        //    shiyongshuliang = $("#shiyongshuliang").val().trim();
        //     if (shiyongshuliang == "") {
        //         message.error("请输入使用数量！");return;
        //     }
        // }else if(xitongshuliang < shijikucunshuliang){
        //     yaopinshuliang = $("#yaopinshuliang").val().trim();
        //     if (yaopinshuliang == "") {
        //         message.error("请输入药品数量！");return;
        //     }
        //     baozhiqi = $("#baozhiqi").val().trim();
        //     if (baozhiqi == "") {
        //         message.error("请输入保质期！");return;
        //     }
        //     guoqiyuzhi = $("#guoqiyuzhi").val().trim();
        //     if (guoqiyuzhi == "") {
        //         message.error("请输入过期阈值！");return;
        //     }
        //     shengchanrqi = this.state.shengchanrqi;
        //     if (shengchanrqi == "" || shengchanrqi == null) {
        //         message.error("请选择生产日期！");return;
        //     }else{
        //         shengchanrqi = moment(shengchanrqi).format('YYYY-MM-DD');
        //     }
        // }
        let yaopinpandianjiluVM = {};
        yaopinpandianjiluVM["yaopinId"] = yaopin;
        yaopinpandianjiluVM["xitongkucunshuliang"] = xitongshuliang;
        yaopinpandianjiluVM["shijikucunshuliang"] = Number(shijikucunshuliang);
        // yaopinpandianjiluVM["shuliang"] = Number(yaopinshuliang);
        // yaopinpandianjiluVM["shiyongshuliang"] = Number(shiyongshuliang);
        yaopinpandianjiluVM["picibianhao"] = pici;
        // yaopinpandianjiluVM["baozhiqi"] = Number(baozhiqi);
        // yaopinpandianjiluVM["guoqiyuzhi"] = Number(guoqiyuzhi);
        // yaopinpandianjiluVM["shengchanriqi"] = shengchanrqi;
        if (!confirm("确定添加药品盘点记录！")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER+"shoudongpandianshenqing",
            data : JSON.stringify(yaopinpandianjiluVM),
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
            window.location.href = "./dadui.html#/yingquguanlixin_yiwurenyuan_yaopinpandianguanli";
        }
        else if (role=="中队") {
            window.location.href = "./zhongdui.html#/yingquguanlixin_yiwurenyuan_yaopinpandianguanli";
        }
        else {
            window.location.href = "./zhidui.html#/yingquguanlixin_yiwurenyuan_yaopinpandianguanli";
        }
    }

    componentDidMount() {
        this.getyaopinList();
    }

    render() {
        let yaopinOptions = this.state.yaopinList.map(item =>
            <Select.Option key={item['key']} value={item['id']}>{item['yaopinmingcheng']}</Select.Option>
        );
        let piciOptions = this.state.piciList.map(item =>
            <Select.Option key={item['picibianhao']} value={item['picibianhao']}>{item['pici']}</Select.Option>
        );

        const {xitongshuliang,shengchanrqi,pici} = this.state;
        return (
            <div>
                <label>选择药品&#12288;&#12288;:</label>
                <Select style={{margin:10,width:300}} onChange={this.yaopinChang.bind(this)}>
                    {yaopinOptions}
                </Select>
                <label>批次&#12288;&#12288;&#12288;&#12288;:</label>
                <Select style={{margin:10,width:300}} onChange={this.piciChang.bind(this)} value={pici}>
                    {piciOptions}
                </Select>
                <br/>
                <label>系统库存数量:</label>
                <InputNumber min={0} disabled={true} size="default" style={{margin:10,width:300}} value={xitongshuliang}/>
                <label>实际库存数量:</label>
                <InputNumber size="default" id="shijikucunshuliang" style={{margin:10,width:300}} min={0} onChange={this.kucunChang.bind(this)}/>
                {/*<br/>*/}
                {/*<div style={{display: this.state.showpanying}}>*/}
                {/*<label>盘盈纠正</label>*/}
                {/*<br/>*/}
                {/*<label>药品数量:</label>*/}
                {/*<InputNumber size="default" id="yaopinshuliang" style={{margin:10,width:200}} min={0}/>*/}
                {/*<label>保质期(天):</label>*/}
                {/*<InputNumber size="default" id="baozhiqi" style={{margin:10,width:200}} min={0}/>*/}
                {/*<br/>*/}
                {/*<label>过期阈值:</label>*/}
                {/*<InputNumber size="default" id="guoqiyuzhi" style={{margin:10,width:200}} min={0}/>*/}
                {/*<label>生产日期:</label>*/}
                {/*<DatePicker*/}
                {/*    value={shengchanrqi}*/}
                {/*    placeholder="生产日期"*/}
                {/*    format="YYYY-MM-DD"*/}
                {/*    onChange={this.onshengchanrqiChange}*/}
                {/*    style={{margin:10,width:200}}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*<div style={{display: this.state.showpankui}}>*/}
                {/*<label>盘亏纠正</label>*/}

                {/*<label>使用数量:</label>*/}
                {/*<InputNumber size="default" id="shiyongshuliang" style={{margin:10,width:200}} min={0}/>*/}
                {/*</div>*/}
                <br/>
                <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
