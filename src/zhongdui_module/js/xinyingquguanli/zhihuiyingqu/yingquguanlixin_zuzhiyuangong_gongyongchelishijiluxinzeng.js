import React from 'react';
import {
    message,
    Select,
    Input,
    Form,
    Button, DatePicker,Radio
} from 'antd';
import moment from "./yingquguanlixin_xiaofangyuan_qingjialishijiluxinzeng";
const { TextArea } = Input;
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            currentTime:new Date(),
            shichang:'',
            renyuanList: [],
            chepaiList:[],
            cheliangbianhaoList:[],
            shenpirenyuanList: [],
            suicherenyuanList:[]
        };
    }

    renyuanList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqudangqianyingquRenyuanLiebiao",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    if( data.data[i]["renyuanbianhao"] !== sessionStorage.getItem("renyuanbianhao")){
                        list.push(data.data[i]);
                    }
                }
                THE.setState({
                    renyuanList: list,
                });
            }
        });
    }

    chepaiList() {
        const THE = this;
        let cheliangLeixingEnum = '公务车';
        $.ajax({
            type:'GET',
            url: SERVER + "YingqucheliangList?page=0&size=10000"+"&cheliangLeixingEnum="+cheliangLeixingEnum,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    if(data.data.content[i].paichezhuangai === '空闲'){
                        //data.data.content[i]["key"] = i;
                        list.push( data.data.content[i]);
                    }
                }
                THE.setState({
                    chepaiList: list,
                });
            }
        });
    }

    //创建申请
    toCreate() {
        if(panduanshenfen(sessionStorage.getItem("liuchengjuesemingcheng")) === true){
            message.error("你不需要发起该申请！");return;
        };
        const THE = this;
        let form = THE.props.form;
        // let suicherenyuanList = this.suicherenyuanList;
        // if (typeof(suicherenyuanList) == "undefined" || suicherenyuanList == null || suicherenyuanList == "") {
        //     message.warning("请选择随车人员");
        //     return;
        // }
        // let suicherenyuanxingming = [];
        // let suicherenyuanbianhao = [];
        // for (let i=0;i<suicherenyuanList.length;i++){
        //     let suicherenyuan=suicherenyuanList[i];
        //      suicherenyuanxingming.push(suicherenyuan.split('+')[1]);
        //      suicherenyuanbianhao.push(suicherenyuan.split('+')[0]);
        // }
        // suicherenyuanxingming.push(sessionStorage.getItem("userName"));
        // suicherenyuanbianhao.push(sessionStorage.getItem("renyuanbianhao"));
        let chepaihaomaList = this.chepaihaoma;
        if (typeof(chepaihaomaList) == "undefined" || chepaihaomaList == null || chepaihaomaList == "") {
            message.warning("请选择车牌号码");
            return;
        }
        let chepaihaoma=chepaihaomaList.split('+')[0];
        let cheliangbianhao=chepaihaomaList.split('+')[1];
        // let jiashirenyuan = this.jiashirenyuan;
        // if (typeof(jiashirenyuan) == "undefined" || jiashirenyuan == null || jiashirenyuan == "") {
        //     message.warning("请选择驾驶人员");
        //     return;
        // }
        // let jiashirenyuanxingming=jiashirenyuan.split('+')[1];
        // let jiashirenyuanbianhao=jiashirenyuan.split('+')[0];
        let kaishishijian=form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null||kaishishijian == '') {
            message.warning("请选择使用时间");
            return;
        }
        let jieshushijian=form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null||jieshushijian == '') {
            message.warning("请选择归还时间");
            return;
        }
        let yichuxiaqu = this.yichuxiaqu;
        if (typeof(yichuxiaqu) == "undefined" || yichuxiaqu == null || yichuxiaqu == "") {
            message.warning("请选择是否已出辖区");
            return;
        }
        let shenpirenyuan = this.shenpirenyuan;
        if (shenpirenyuan == ""||shenpirenyuan == null||shenpirenyuan ==  "undefined") {
            message.error("请选择审批人员！");return;
        }
        let shenpirenxingming=shenpirenyuan.split('+')[1];
        let shenpirenbianhao=shenpirenyuan.split('+')[0];
        let mudididian = form.getFieldValue('mudididian');
        if (typeof(mudididian) == "undefined" || mudididian == null || mudididian == "") {
            message.warning("请输入目的地点");
            return;
        }
        let chaosongrenyuan = this.chaosongrenyuan;
        // if (chaosongrenyuan == ""||chaosongrenyuan == null||chaosongrenyuan ==  "undefined") {
        //     message.error("请选择抄送人员！");return;
        // }
        let shiyongliyou = form.getFieldValue('shiyongliyou');
        if (typeof(shiyongliyou) == "undefined" || shiyongliyou == null || shiyongliyou == "") {
            message.warning("请输入使用理由");
            return;
        }
        let cheliangshenqingdanzhuangtai = '车辆申请中';
        let processDefinitionKey = yonngcheprocessKey;
        //let shenpirenyuanbianhaolist=[];
        //shenpirenyuanbianhaolist.push(shenpirenbianhao);
        let variables = {};
        variables.suoshubumen = sessionStorage.getItem("suosubumen");
        variables.shenqingyongcherenyuan = sessionStorage.getItem("userName");
        variables.shenqingyongcherenyuanbianhao = sessionStorage.getItem("renyuanbianhao");
        // variables.suicherenyuanlist = suicherenyuanxingming;
        // variables.suicherenyuanbianhaolist = suicherenyuanbianhao;
        variables.chepaihaoma = chepaihaoma;
        variables.cheliangbianhao = cheliangbianhao;
        // variables.jiashirenyuan = jiashirenyuanxingming;
        // variables.jiashirenyuanbianhao = jiashirenyuanbianhao;
        variables.jihuachucheshijian = kaishishijian;
        variables.jihuaguiduishijian = jieshushijian;
        variables.yongcheshichang = this.state.shichang;;
        variables.mudididian = mudididian;
        variables.yichuxiaqu = yichuxiaqu;
        variables.yongcheliyou = shiyongliyou;
        variables.shenpirenyuanxingming = shenpirenxingming;
        variables.shenpirenyuanbianhao = shenpirenbianhao;
        //variables.shenpirenyuanbianhaolist = shenpirenyuanbianhaolist;
        variables.cheliangshenqingdanzhuangtai = cheliangshenqingdanzhuangtai;
        variables.jigoumingcheng=sessionStorage.getItem("jigoumingcheng");
        variables.jigoudaima=sessionStorage.getItem("jigoudaima");
        variables.faqirenliuchengjuese=sessionStorage.getItem("liuchengjuesemingcheng");
        if (chaosongrenyuan !== "" && chaosongrenyuan !== null && chaosongrenyuan !==  "undefined") {
            variables.chaosongrenyuanxingming=chaosongrenyuan.split('+')[1];
            variables.chaosongrenyuanbianhao=chaosongrenyuan.split('+')[0];
        }

        if (!confirm("确定进行用车申请?")) {
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
                message.success(data.message);
                THE.backPage();
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

    shenpirenyuan=''
    shenpirenyuanChang(value) {
        this.shenpirenyuan = value;
    }
    chaosongrenyuan=''
    chaosongrenyuanChang(value) {
        this.chaosongrenyuan = value;
    }
    yichuxiaqu=''
    yichuxiaquChange(value) {
        const THE = this;
        THE.yichuxiaqu = value.target.value;
        let variables={};
        variables.yichuxiaqu= value.target.value;
        variables.jigoudaima=sessionStorage.getItem("jigoudaima");
        let processDefinitionKey = yonngcheprocessKey;
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
        this.props.form.setFieldsValue(
            {
                shenpirenyuan: '',
                chaosongrenyuan: ''
            }
        )
        this.shenpirenyuan = '';
        this.chaosongrenyuan = '';
    }
    suicherenyuanList=''
    suicherenyuanChang(value){
        this.suicherenyuanList = value;
        let suicherenyuanList = [];
        let sessionobj = {};
        sessionobj.suicherenyuanxingming = sessionStorage.getItem("userName");
        sessionobj.suicherenyuanbianhao = sessionStorage.getItem("renyuanbianhao");
        suicherenyuanList.push(sessionobj);
        for (let i=0;i<value.length;i++){
            let suicherenyuan=value[i];
            let obj = {};
            obj.suicherenyuanxingming = suicherenyuan.split('+')[1];
            obj.suicherenyuanbianhao = suicherenyuan.split('+')[0];
            suicherenyuanList.push(obj)
        }
        this.props.form.setFieldsValue(
            {
                jiashirenyuan: ''
            }
        )
        this.jiashirenyuan = '';
        this.setState({
            suicherenyuanList: suicherenyuanList,
        });
    }
    jiashirenyuan=''
    jiashirenyuanChang(value) {
        this.jiashirenyuan = value;
    }
    chepaihaoma=''
    chepaihaomaChange(value){
        this.chepaihaoma = value;
    }
    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zuzhiyuangong_gongyongchelishijilu";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zuzhiyuangong_gongyongchelishijilu";
        }else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zuzhiyuangong_gongyongchelishijilu";
        }
    }

    componentDidMount() {
        this.renyuanList();
        this.chepaiList();
        let sessionobj = {};
        let suicherenyuanList = [];
        sessionobj.suicherenyuanxingming = sessionStorage.getItem("userName");
        sessionobj.suicherenyuanbianhao = sessionStorage.getItem("renyuanbianhao");
        suicherenyuanList.push(sessionobj);
        this.setState({
            suicherenyuanList: suicherenyuanList,
        });
    }

    render() {

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        let renyuanList = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']+ '+' + item['xingming']}>{item['xingming']}</Select.Option>);
        let jiashirenyuanList = this.state.suicherenyuanList.map(item => <Select.Option key={item['suicherenyuanbianhao']} value={item['suicherenyuanbianhao']+ '+' + item['suicherenyuanxingming']}>{item['suicherenyuanxingming']}</Select.Option>);
        let chepaiList = this.state.chepaiList.map(item => <Select.Option key={item['key']} value={item['chepaihaoma']+ '+' + item['cheliangbianhao']}>{item['chepaihaoma']}</Select.Option>);
        let shenpirenyuanOptions = this.state.shenpirenyuanList.map(item =>
            <Select.Option key={item['key']} value={item['renyuanbianhao'] + '+' + item['xingming']}>{item['xingming']}</Select.Option>
        );
        const { startValue, endValue,shichang} = this.state;
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    {/*<FormItem label="请选择随车人员&#12288;&#12288;">*/}
                    {/*    {getFieldDecorator('suicherenyuanList', {*/}
                    {/*    })(*/}
                    {/*        <Select style={{width:200}} mode="multiple" onChange={this.suicherenyuanChang.bind(this)}>*/}
                    {/*            {renyuanList}*/}
                    {/*        </Select>*/}
                    {/*    )}*/}
                    {/*</FormItem>*/}
                    <FormItem label="请选择车牌号码&#12288;&#12288;" >
                        {getFieldDecorator('chepaihaoma', {
                        })(
                            <Select style={{width:200}}onChange={this.chepaihaomaChange.bind(this)}>
                                {chepaiList}
                            </Select>
                        )}
                    </FormItem>
                    {/*<FormItem label="请输入驾驶人员" >*/}
                    {/*    {getFieldDecorator('jiashirenyuan', {*/}
                    {/*    })(*/}
                    {/*        <Select style={{width:200}} onChange={this.jiashirenyuanChang.bind(this)}>*/}
                    {/*            {jiashirenyuanList}*/}
                    {/*        </Select>*/}
                    {/*    )}*/}
                    {/*</FormItem>*/}
                    <FormItem label="请选择出车时间">
                        {getFieldDecorator('kaishishijian')(
                            <DatePicker
                                showTime
                                disabledDate={this.disabledStartDate}
                                disabledTime={this.disabledStartTime}
                                value={startValue}
                                placeholder="请选择使用时间"
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={this.onStartChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="请选择返回时间">
                        {getFieldDecorator('jieshushijian')(
                            <DatePicker
                                showTime
                                disabledDate={this.disabledEndDate}
                                disabledTime={this.disabledEndTime}
                                value={endValue}
                                placeholder="请选择归还时间"
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={this.onEndChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="请选择是否已出辖区" >
                        {getFieldDecorator('yichuxiaqu', {
                        })(
                            <Radio.Group style={{width:200}} onChange={this.yichuxiaquChange.bind(this)}>
                                <Radio value="是">是</Radio>
                                <Radio value="否">否</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem label="请选择审批人员" >
                        {getFieldDecorator('shenpirenyuan', {
                        })(
                            <Select style={{width:200}} onChange={this.shenpirenyuanChang.bind(this)}>
                                {shenpirenyuanOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="请输入目的地点" >
                        {getFieldDecorator('mudididian', {
                        })(
                            <Input style={{width:200}} id="mudididian"/>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="用车时长&#12288;&#12288;&#12288;&#12288;&#12288;">
                        <Input min={0} disabled={true} size="default" style={{width:200}} value={shichang}/>
                    </FormItem>
                    <FormItem label="请选择抄送人员" >
                        {getFieldDecorator('chaosongrenyuan', {
                        })(
                            <Select style={{width:200}} onChange={this.chaosongrenyuanChang.bind(this)}>
                                {shenpirenyuanOptions}
                            </Select>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="请输入使用理由" >
                        {getFieldDecorator('shiyongliyou', {
                        })(
                            <TextArea autosize={{minRows:3}} id="shiyongliyou" style={{width:500}}/>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button type="primary"  icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const AppForm = Form.create()(App);
export default AppForm;
