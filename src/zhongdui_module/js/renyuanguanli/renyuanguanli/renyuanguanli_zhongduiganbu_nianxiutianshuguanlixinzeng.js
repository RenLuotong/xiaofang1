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
import YearPicker from "../../userInfo/YearPicker.js";
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
let id = 0;

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            shichang:'',
            xingming:'',
            shenpirenyuanList: [],
            renyuanList:[],
            taskId:'',
            houxuanrenyuanList:[],
            nianfenList:[]
        };
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

    //获取审批候选人人list
    huoquhouxuanrenlist(){
        const THE = this;
        let processKey = nianjiashichangprocessKey;
        let variables = {};
        $.ajax({
            type:'post',
            url:SERVER+"activiti/process/candidaters?processDefinitionKey="+processKey,
            data : JSON.stringify(variables),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(var i in data.data) {
                    list.push(data.data[i])
                }
                THE.setState({
                    houxuanrenyuanList: list[0]
                });
            }
        });
    }

    shenpirenyuan=''
    shenpirenyuanChang(value) {
        this.shenpirenyuan = value;
    }

    nianfen = '';
    filterByYear(value) {
        this.nianfen = value;
    }

    xingming=''
    xingmingChang(value){
        this.xingming=value;
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

    toCreate(e) {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const keys = getFieldValue('keys');
        let processKey = nianjiashichangprocessKey;
        console.log(keys);
        if (keys.length == 0) {
            message.warning("请新建年休申请");
            return;
        }
        const { form } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let postList = [];
                for (let i = 0; i < keys.length; i++) {
                    let shenqingren = values.sqrxm[keys[i]];
                    if (typeof(shenqingren) == "undefined"||shenqingren == null||shenqingren== '') {
                        message.warning("请选择申请人");
                        return;
                    }
                    let shenqingrenxingming = shenqingren.split('+')[0];
                    let shenqingrenbianhao = shenqingren.split('+')[1];
                    let shenqingrenzhiwu = shenqingren.split('+')[2];
                    let tianshu = values.nxts[keys[i]];
                    if (tianshu == "undefined"||tianshu == null||tianshu== '') {
                        message.warning("请输入年休天数");
                        return;
                    }
                    let nianfen = this.nianfen;
                    // let nianfenList = this.state.nianfenList;
                    // let nianfen = nianfenList[keys[i]];
                    if (typeof(nianfen) == "undefined"||nianfen == null||nianfen== '') {
                        message.warning("请输入年份");
                        return;
                    }
                    let shenpirenyuan = this.shenpirenyuan;
                    // let shenpiren = values.sprxm[keys[i]];
                    if (typeof(shenpirenyuan) == "undefined"||shenpirenyuan == null||shenpirenyuan== '') {
                        message.warning("请选择审批人");
                        return;
                    }
                    let shenpirenyuanxingming = shenpirenyuan.split('+')[0];
                    let shenpirenyuanbianhao = shenpirenyuan.split('+')[1];
                    let shenpirenyuanbianhaolist = [];
                    shenpirenyuanbianhaolist.push(shenpirenyuanbianhao)

                    let obj = {};
                    obj.shenqingrenxingming = shenqingrenxingming;
                    obj.shenqingrenbianhao = shenqingrenbianhao;
                    obj.shenqingrenzhiwu = shenqingrenzhiwu;
                    obj.tianshu = tianshu.toString();
                    obj.nianfen = nianfen.toString();
                    obj.shenpirenyuanxingming = shenpirenyuanxingming;
                    obj.shenpirenyuanbianhao = shenpirenyuanbianhao;
                    obj.shenpirenyuanbianhaolist = shenpirenyuanbianhaolist;
                    obj.jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
                    obj.jigoudaima = sessionStorage.getItem("jigoudaima");
                    obj.shenqingdanzhuangtai = '申请中';
                    postList.push(obj);
                }
                console.log(postList);
                let variablesList = postList;
                const THE = this;
                $.ajax({
                    type:'POST',
                    url: SERVER + "activiti/batchstartProcess?processDefinitionKey="+processKey,
                    data : JSON.stringify(variablesList),
                    dataType : 'json',
                    contentType : "application/json",
                    success: function (data) {
                        if (data.status != 0) {
                            message.warning(data.message);
                            return;
                        }
                        message.success("申请成功");
                        setTimeout(THE.backPage(),1000);
                    }
                });
            }
        });

        // const THE = this;
        // let shenqingren=this.xingming;
        // if (shenqingren == ""||shenqingren == null||shenqingren ==  "undefined") {
        //     message.error("请选择申请人姓名！");return;
        // }
        // let shenqingrenxingming = shenqingren.split('+')[0];
        // let shenqingrenbianhao = shenqingren.split('+')[1];
        // let shenqingrenzhiwu = shenqingren.split('+')[2];
        // let tianshu = $("#tianshu").val().trim();
        // if (tianshu === ""||tianshu === null||tianshu ===  "undefined") {
        //     message.error("请输入年休天数！");return;
        // }
        // let nianfen = $("#nianfen").val().trim();
        // if (nianfen === ""||nianfen === null||nianfen ===  "undefined") {
        //     message.error("请输入年休年份！");return;
        // }
        // let shenpirenyuan = this.shenpirenyuan;
        // if (shenpirenyuan == ""||shenpirenyuan == null||shenpirenyuan ==  "undefined") {
        //     message.error("请选择审批人员！");return;
        // }
        // let shenpirenyuanxingming = shenpirenyuan.split('+')[0];
        // let shenpirenyuanbianhao = shenpirenyuan.split('+')[1];
        // if (!confirm("确定添加年休申请！")) {
        //     return;
        // }
        // let processKey = nianjiashichangprocessKey;
        // let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
        // let jigoudaima = sessionStorage.getItem("jigoudaima");
        // let shenqingdanzhuangtai = '申请中';
        // let variables = {};
        // //let shenpirenyuanbianhaolist = [];
        // //shenpirenyuanbianhaolist.push(shenpirenyuanbianhao)
        // variables.jigoumingcheng = jigoumingcheng;
        // variables.jigoudaima = jigoudaima;
        // variables.shenqingdanzhuangtai = shenqingdanzhuangtai;
        // variables.shenqingrenxingming = shenqingrenxingming;
        // variables.shenqingrenbianhao = shenqingrenbianhao;
        // variables.shenqingrenzhiwu = shenqingrenzhiwu;
        // variables.tianshu = tianshu;
        // variables.nianfen = nianfen;
        // variables.shenpirenyuanxingming = shenpirenyuanxingming;
        // variables.shenpirenyuanbianhao = shenpirenyuanbianhao;
        // //variables.shenpirenyuanbianhaolist = shenpirenyuanbianhaolist;
        // $.ajax({
        //     type: 'post',
        //     url: SERVER + "activiti/startProcess?processDefinitionKey=" + processKey,
        //     data: JSON.stringify(variables),
        //     dataType: 'json',
        //     contentType: "application/json",
        //     success: function (data) {
        //         let list = [];
        //         if (data.status != 0) {
        //             message.warning(data.message);
        //             return;
        //         }
        //         message.success("申请成功");
        //         THE.backPage();
        //     }
        // })
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/renyuanguanli_zhongduiganbu_nianxiutianshuguanli";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/renyuanguanli_zhongduiganbu_nianxiutianshuguanli";
        }else {
            window.location.href = "./zhidui.html#/renyuanguanli_zhongduiganbu_nianxiutianshuguanli";
        }
    }

    componentDidMount() {
        this.getRenyuanList();
        this.huoquhouxuanrenlist();
    }

    render() {
        let shenpirenyuanOptions = this.state.houxuanrenyuanList.map(item =>
            <Select.Option key={item['renyuanbianhao']} value={item['xingming']+ '+' + item['renyuanbianhao']}>{item['xingming']}</Select.Option>
        );
        let renyuanList = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['xingming']+ '+' + item['renyuanbianhao']+ '+' + item['zhiwu']}>{item['xingming']}</Select.Option>);

        const { getFieldDecorator, getFieldValue } = this.props.form;
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
                        申请人姓名 :
                        {getFieldDecorator
                        (`sqrxm[${k}]`, {
                        })
                        (
                            <Select
                                style={{margin:7,width:160 }}
                                showSearch
                                optionFilterProp="children"
                                onChange={this.xingmingChang.bind(this,k)}
                            >
                                {renyuanList}
                            </Select>
                        )
                        }
                        年休天数&#12288;:
                        {getFieldDecorator
                        (`nxts[${k}]`, {
                        })
                        (
                            <InputNumber
                                min={0}
                                size="default"
                                style={{margin:10,width:160 }}
                            />
                        )
                        }
                        {/*年份 :*/}
                        {/*{getFieldDecorator*/}
                        {/*(`nf[${k}]`, {*/}
                        {/*})*/}
                        {/*(*/}
                        {/*    <YearPicker  operand={12} callback={this.filterByYear.bind(this,k)}/>*/}
                        {/*)*/}
                        {/*}*/}
                        {/*审批人姓名 :*/}
                        {/*{getFieldDecorator*/}
                        {/*(`sprxm[${k}]`, {*/}
                        {/*})*/}
                        {/*(*/}
                        {/*    <Select*/}
                        {/*        style={{margin:10,width:160 }}*/}
                        {/*        showSearch*/}
                        {/*        optionFilterProp="children"*/}
                        {/*        onChange={this.shenpirenyuanChang.bind(this,k)}*/}
                        {/*    >*/}
                        {/*        {shenpirenyuanOptions}*/}
                        {/*    </Select>*/}
                        {/*)*/}
                        {/*}*/}
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




        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline">
                    <Form.Item required={false}>
                        年&#12288;&#12288;&#12288;份:
                        {getFieldDecorator('nf')(
                            <YearPicker  operand={12} callback={this.filterByYear.bind(this)}/>
                        )}
                    </Form.Item>
                    <Form.Item required={false} style={{right:17}}>
                        审批人姓名:
                        {getFieldDecorator('sprxm')(
                            <Select
                                style={{margin:10,width:160 }}
                                showSearch
                                optionFilterProp="children"
                                onChange={this.shenpirenyuanChang.bind(this)}
                            >
                                {shenpirenyuanOptions}
                            </Select>
                        )}
                    </Form.Item>
                    <br/>
                    {formItems}
                    <Form.Item>
                        <Button type="dashed" onClick={this.add} style={{ width: '200px' }}>
                            <Icon type="plus" />新建申请
                        </Button>
                    </Form.Item>
                    <br/>
                    <Form.Item>
                        <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
                    </Form.Item>
                </Form>
                {/*<label>申请人姓名:</label>*/}
                {/*<Select style={{margin:10,width:200}} onChange={this.xingmingChang.bind(this)}>*/}
                {/*{renyuanList}*/}
                {/*</Select>*/}
                {/*<label>年休天数:</label>*/}
                {/*<InputNumber min={0} id="tianshu"  size="default" style={{margin:10,width:200}}/>*/}
                {/*<br/>*/}
                {/*<label>年&#12288;&#12288;&#12288;份:</label>*/}
                {/*<Input id="nianfen"  size="default" style={{margin:10,width:200}}/>*/}
                {/*<label>审批人员:</label>*/}
                {/*<Select style={{margin:10,width:200}} onChange={this.shenpirenyuanChang.bind(this)}>*/}
                {/*{shenpirenyuanOptions}*/}
                {/*</Select>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>*/}
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
