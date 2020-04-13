import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {
    LocaleProvider,
    message,
    Upload,
    Modal,
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
    Divider,
    Tabs,
    Checkbox
} from 'antd';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bumenList:[],
            leibieList:[],
            previewVisible: false,
            previewImage: '',
            fileList: [],
            zhiduiList: [],
            value: undefined,
            jueseValues:[],
            xianshijueses:[],
            jueses:[],
            liuchengjueseValues:[],
            liuchengjueses:[],
            xianshiliuchengjueses:[],
            zhiwuValues:[],
            zhiwus:[],
        };
    }

    getjueseList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url:SERVER+"queryAllZuzhijigouJueses",
            success:function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let list = [];
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    if(data.data[i].label != '超级管理员' && data.data[i].label != '支队管理员'){
                        list.push(data.data[i]);
                    }
                }
                THE.setState({
                    jueses : list,
                    xianshijueses : list,
                });
            }
        });
    }

    getzhiwuList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url:SERVER+"zhiwuLiebiaoQianduan",
            success:function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let list = [];
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    zhiwus : list,
                });
            }
        });
    }

    getliuchengjueseList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url:SERVER+"huoquliuchengjueseAntd",
            success:function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let list = [];
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    liuchengjueses : list,
                    xianshiliuchengjueses : list,
                });
            }
        });
    }

    onCheck = (jueseValues) => {
        this.setState({ jueseValues:jueseValues });
    }

    onCheck2 = (liuchengjueseValues) => {
        this.setState({ liuchengjueseValues:liuchengjueseValues });
    }
    onCheck3 = (zhiwuValues) => {
        this.setState({ zhiwuValues:zhiwuValues });
    }

    beforeUpload(file) {
        const img_url = window.URL.createObjectURL(file);

        let getKey = (imgUrl) => {
            return new Promise((resolve,reject)=>{
                let img = new Image();
                img.src = imgUrl;
                img.onload = ()=>{
                    const width = img.width;
                    const height = img.height;
                    const isJPG = file.type === 'image/jpeg';
                    // if (!isJPG) {
                    //     message.error('请上传JPG格式的图片!');
                    // }
                    const isWidth = width < 1024;
                    const isHeight = height < 1024;
                    // if (!isWidth || !isHeight) {
                    //     message.error('图片尺寸必须小于1024*1024，图片大小必须小于200KB！');
                    // }
                    var key = 0;
                    if (!isJPG || !isWidth || !isHeight) {
                        key = 1;
                    }
                    resolve(key);
                }
                img.onerror = ()=>{
                    reject()
                }
            })
        }

        let result= getKey(img_url);
        let key = 0;
        result.then(function(result) {
            key = result;
        });
        if (key == 1) {
            return false;
        } else {
            return true;
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                fileList: info.fileList,
                imageUrl,
            }));
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.toCreate();
            }
        });
    }

    getBumenList(value) {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "bumenXialaLiebiao?jigoumingcheng="+value,
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
                    bumenList: list,
                });
            }
        });
    }

    getleibieList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqurenyuanleixing",
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
                    leibieList: list,
                });
            }
        });
    }
    getZhiduiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url:SERVER+"huoquZhiduiZzjgXialaLiebiao",
            success:function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let list = [];
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    zhiduiList : list,
                });
            }
        });
    }

    zhiduiChange(value) {
        let zhidui=[];
        let liucheng=[];
        let jigouleibie = value.split('+')[0];
        let jigoumingcheng = value.split('+')[1];
        let juese = this.state.jueses;
        let liuchengjueses = this.state.liuchengjueses;
        if (jigouleibie === '支队'){
            for(let i=0;i<juese.length;i++){
                if(juese[i].label != '中队装备管理员' && juese[i].label != '通讯员'  && juese[i].label != '大队装备管理员' && juese[i].label != '支队管理员' && juese[i].label != '大队通讯员'&& juese[i].label != '超级管理员'){
                    zhidui.push(juese[i]);
                }
            }
            for(let i=0;i<liuchengjueses.length;i++){
                liucheng.push(liuchengjueses[i]);
            }
            this.setState({
                xianshiliuchengjueses:liucheng,
                xianshijueses : zhidui,
                jueseValues:[],
                liuchengjueseValues:[]
            });
        }else if(jigouleibie === '大队'){
            for(let i=0;i<juese.length;i++){
                if(juese[i].label != '支队装备管理员' && juese[i].label != '中队装备管理员' && juese[i].label != '通讯员'  && juese[i].label != '指挥中心' && juese[i].label != '支队管理员' && juese[i].label != '超级管理员'&& juese[i].label != '队伍督察'&& juese[i].label != '专职办'&& juese[i].label != '年休管理员'){
                    zhidui.push(juese[i]);
                }
            }
            for(let i=0;i<liuchengjueses.length;i++){
                    liucheng.push(liuchengjueses[i]);
            }
            this.setState({
                xianshiliuchengjueses:liucheng,
                xianshijueses : zhidui,
                jueseValues:[],
                liuchengjueseValues:[]
            });
        }else if(jigouleibie === '中队'){
            for(let i=0;i<juese.length;i++){
                if(juese[i].label != '支队装备管理员' && juese[i].label != '大队装备管理员' && juese[i].label != '大队通讯员'  && juese[i].label != '指挥中心' && juese[i].label != '支队管理员' && juese[i].label != '超级管理员'&& juese[i].label != '队伍督察'&& juese[i].label != '专职办'&& juese[i].label != '年休管理员'){
                    zhidui.push(juese[i]);
                }
            }
            for(let i=0;i<liuchengjueses.length;i++){
                    liucheng.push(liuchengjueses[i]);
            }
            this.setState({
                xianshiliuchengjueses:liucheng,
                xianshijueses : zhidui,
                jueseValues:[],
                liuchengjueseValues:[]
            });
        }
        this.getBumenList(jigoumingcheng);
    }

    toCreate() {
        const THE = this;
        let form = THE.props.form;
        let dengluming = form.getFieldValue('dengluming');
        let mima = form.getFieldValue('mima');
        let xingming = form.getFieldValue('xingming');
        let shenfenzhenghao = form.getFieldValue('shenfenzhenghao');
        let xingbiedaima = form.getFieldValue('xingbiedaima');
        if (typeof(xingbiedaima) == "undefined") {
            xingbiedaima = '';
        }
        let minzu = form.getFieldValue('minzu');
        let jiguan = form.getFieldValue('jiguan');
        let zhengzhimianmao = form.getFieldValue('zhengzhimianmao');
        if (typeof(zhengzhimianmao) == "undefined") {
            zhengzhimianmao = '';
        }
        let hunyinzhuangkuang = form.getFieldValue('hunyinzhuangkuang');
        if (typeof(hunyinzhuangkuang) == "undefined") {
            hunyinzhuangkuang = '';
        }
        let chushengriqi = form.getFieldValue('chushengriqi');
        if (typeof(chushengriqi) == "undefined") {
            chushengriqi = '';
        }
        let ruzhishijian = form.getFieldValue('ruzhishijian');
        if (typeof(ruzhishijian) == "undefined") {
            ruzhishijian = '';
        }
        let yonghuleibie=form.getFieldValue('yonghuleibie');
        if (typeof(yonghuleibie) == "undefined") {
            yonghuleibie = '';
        }

        let paixu=form.getFieldValue('paixu');
        if (typeof(paixu) == "undefined") {
            paixu = '';
        }
        let tongxindizhi = form.getFieldValue('tongxindizhi');
        let gudingdianhua = form.getFieldValue('gudingdianhua');
        let yidongdianhua = form.getFieldValue('yidongdianhua');
        let fileList = THE.state.fileList;
        for (let i = 0; i < fileList.length; i++) {
            if (typeof(fileList[i]['response']) == 'object') {
                let index = fileList.indexOf(fileList[i]);
                if (index > -1) {
                    fileList.splice(index, 1);
                }
            }
        }
        let zhaopian = '';
        if (fileList.length > 0) {
            let num = fileList.length - 1;
            zhaopian = fileList[num]['response'];
        }
        let xuexing = form.getFieldValue('xuexing');
        let shengao = form.getFieldValue('shengao');
        let tizhong = form.getFieldValue('tizhong');
        let jiankangzhuangkuang = form.getFieldValue('jiankangzhuangkuang');
        let techangaihao = form.getFieldValue('techangaihao');
        let suosubumen = form.getFieldValue('suosubumen');
        if (typeof(suosubumen) == "undefined") {
            suosubumen = '';
        }
        let lanyabianhao = form.getFieldValue('lanyabianhao');
        let jigoumingcheng = form.getFieldValue('suoshuzhidui');
        if(jigoumingcheng !== '' && jigoumingcheng !== null && typeof(jigoumingcheng)!== "undefined" ){
            jigoumingcheng = jigoumingcheng.split('+')[1];
        }
        let shenfenzhengdaoqishijian = form.getFieldValue('shenfenzhengdaoqishijian');
        if (typeof(shenfenzhengdaoqishijian) == "undefined") {
            shenfenzhengdaoqishijian = '';
        }
        let jiashizhengdaoqishijian = form.getFieldValue('jiashizhengdaoqishijian');
        if (typeof(jiashizhengdaoqishijian) == "undefined") {
            jiashizhengdaoqishijian = '';
        }
        let shifouwaipin = form.getFieldValue('shifouwaipin');
        if (typeof(shifouwaipin) == "undefined") {
            shifouwaipin = '';
        }
        let ganbu = form.getFieldValue('ganbu');

        let liuchengjueseValues = THE.state.liuchengjueseValues;
        let jueseValues = THE.state.jueseValues;
        let zhiwuValues = THE.state.zhiwuValues;
        let zhiwuId = "";
        if (zhiwuValues.length == 0) {
            zhiwuId = "";
        }else{
            zhiwuId = JSON.stringify(zhiwuValues);
        }
        if (jueseValues.length == 0) {
            message.error("必须选择一个角色！");
            return;
        }
        if (liuchengjueseValues.length == 0) {
            message.error("必须选择一个身份！");
            return;
        }
        if (liuchengjueseValues.length > 1) {
            message.error("只能选择一个身份！");
            return;
        }
        let jueseId = JSON.stringify(jueseValues);
        let liuchengjueseId = JSON.stringify(liuchengjueseValues);

        if (!confirm("确定添加此人员吗？")) {
            return;
        }

        let tbRenyuan = {};
        tbRenyuan["dengluming"] = dengluming;
        tbRenyuan["mima"] = hex_md5(mima);
        tbRenyuan["xingming"] =xingming;
        tbRenyuan["shenfenzhenghao"] =shenfenzhenghao;
        tbRenyuan["xingbiedaima"] = xingbiedaima;
        tbRenyuan["minzu"] = minzu;
        tbRenyuan["jiguan"] = jiguan;
        tbRenyuan["zhengzhimianmao"] = zhengzhimianmao;
        tbRenyuan["hunyinzhuangkuang"] =hunyinzhuangkuang;
        tbRenyuan["chushengriqi"] =chushengriqi;
        tbRenyuan["ruzhishijian"] = ruzhishijian;
        tbRenyuan["tongxindizhi"] = tongxindizhi;
        tbRenyuan["gudingdianhua"] = gudingdianhua;
        tbRenyuan["yidongdianhua"] = yidongdianhua;
        tbRenyuan["jigoumingcheng"] =jigoumingcheng;
        tbRenyuan["zhaopian"] = zhaopian;
        tbRenyuan["xuexing"] = xuexing;
        tbRenyuan["yidongdianhua"] = yidongdianhua;
        tbRenyuan["shengao"] = shengao;
        tbRenyuan["tizhong"] = tizhong;
        tbRenyuan["jiankangzhuangkuang"] =jiankangzhuangkuang;
        tbRenyuan["techangaihao"] =techangaihao;
        tbRenyuan["suosubumen"] = suosubumen;
        tbRenyuan["lanyabianhao"] = lanyabianhao;
        tbRenyuan["ganbu"] = ganbu;
        tbRenyuan["jueseId"] = jueseId;
        tbRenyuan["zhiwu"] = zhiwuId;
        tbRenyuan["liuchengjuese"] = liuchengjueseId;
        tbRenyuan["iswaipinrenyuan"] = shifouwaipin;
        tbRenyuan["renyuanleixing"] = yonghuleibie;
        tbRenyuan["paixu"] = paixu;
        let tbZhengjianList = [];
        let shenfenzhengObj = {};
        shenfenzhengObj['zhengjanleixing'] = "身份证";
        shenfenzhengObj['daoqishijian'] = shenfenzhengdaoqishijian;
        tbZhengjianList.push(shenfenzhengObj);
        let jiashizhengObj = {};
        jiashizhengObj['zhengjanleixing'] = "驾驶证";
        jiashizhengObj['daoqishijian'] = jiashizhengdaoqishijian;
        tbZhengjianList.push(jiashizhengObj);

        let obj = {};
        obj['tbRenyuan'] = tbRenyuan;
        obj['tbZhengjianList'] = tbZhengjianList;
        console.log(obj);
        $.ajax({
            type:'post',
            url:SERVER+"tianjiaRenyuan",
            data:JSON.stringify(obj),
            dataType:'json',
            contentType: "application/json",
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
        window.location.href = "./zhidui.html#/renyuanguanli_zhiduiganbu_renyuanguanli";
    }

    componentDidMount() {
        this.getZhiduiList();
        this.getjueseList();
        this.getzhiwuList();
        this.getleibieList();
        this.getliuchengjueseList();
    }

    render() {

        let bumenOptions = this.state.bumenList.map(item => <Select.Option key={item['key']} value={item['bumenmingcheng']}>{item['bumenmingcheng']}</Select.Option>);
        let zhiduiOptions = this.state.zhiduiList.map(item => <Select.Option key={item['key']} value={item['jigouleibie'] + '+' + item['jigoumingcheng']}>{item['jigoumingcheng']}</Select.Option>);
        let leibieOptions = this.state.leibieList.map(item => <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>);

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;


        let uploadProps = {
            name: 'files',
            action: SERVER+"files/image",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        return (
            <div>
                <LocaleProvider locale={zh_CN}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem label="用&nbsp;&nbsp;户&nbsp;&nbsp;名">
                            {getFieldDecorator('dengluming', {
                                rules: [{ required: true, message: '请输入用户名', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="密&#12288;&#12288;码">
                            {getFieldDecorator('mima', {
                                rules: [{ required: true, message: '请输入密码', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}} type="password"/>
                            )}
                        </FormItem>
                        <FormItem label="所属机构">
                            {getFieldDecorator('suoshuzhidui', {
                                rules: [{ required: true, message: '请选择所属组织机构', whitespace: true }],
                            })(
                                <Select style={{margin:5,width:200}} onChange={this.zhiduiChange.bind(this)}>
                                    {zhiduiOptions}
                                </Select>
                            )}
                        </FormItem>
                        <br/>

                        <FormItem label="姓&#12288;&#12288;名">
                            {getFieldDecorator('xingming', {
                                rules: [{ required: true, message: '请输入姓名', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;身份证号">
                            {getFieldDecorator('shenfenzhenghao', {
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;性&#12288;&#12288;别">
                            {getFieldDecorator('xingbiedaima', {
                            })(
                                <Select style={{margin:5,width:200}}>
                                    <Select.Option value="男">男</Select.Option>
                                    <Select.Option value="女">女</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <br/>

                        <FormItem label="&nbsp;&nbsp;&nbsp;民&#12288;&#12288;族">
                            {getFieldDecorator('minzu', {
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;籍&#12288;&#12288;贯">
                            {getFieldDecorator('jiguan', {
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;政治面貌">
                            {getFieldDecorator('zhengzhimianmao', {
                            })(
                                <Select style={{margin:5,width:200}}>
                                    <Select.Option value="党员">党员</Select.Option>
                                    <Select.Option value="团员">团员</Select.Option>
                                    <Select.Option value="群众">群众</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <br/>

                        <FormItem label="&nbsp;&nbsp;&nbsp;婚姻状况">
                            {getFieldDecorator('hunyinzhuangkuang', {
                            })(
                                <Select style={{margin:5,width:200}}>
                                    <Select.Option value="已婚">已婚</Select.Option>
                                    <Select.Option value="未婚">未婚</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;出生日期">
                            {getFieldDecorator('chushengriqi', {
                            })(
                                <DatePicker style={{margin:5,width:200}} placeholder="出生日期"/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;入职时间">
                            {getFieldDecorator('ruzhishijian', {
                            })(
                                <DatePicker style={{margin:5,width:200}} placeholder="入职时间"/>
                            )}
                        </FormItem>
                        <br/>

                        <FormItem label="&nbsp;&nbsp;&nbsp;通信地址">
                            {getFieldDecorator('tongxindizhi', {
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;固定电话">
                            {getFieldDecorator('gudingdianhua', {
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;移动电话">
                            {getFieldDecorator('yidongdianhua', {
                                rules: [{
                                    len: 11, message: '请输入11位电话号码！',
                                }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <br/>

                        <FormItem label="&nbsp;&nbsp;&nbsp;手表编号">
                            {getFieldDecorator('lanyabianhao', {
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="是否干部">
                            {getFieldDecorator('ganbu', {
                                rules: [{ required: true, message: '请选择是否干部', whitespace: true }],
                            })(
                                <Select style={{margin:5,width:200}}>
                                    <Select.Option value="干部">干部</Select.Option>
                                    <Select.Option value="职员">职员</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        {/*<FormItem label="&nbsp;&nbsp;&nbsp;防&nbsp;&nbsp;丢&nbsp;&nbsp;器">*/}
                        {/*{getFieldDecorator('lanyabianhao1', {*/}
                        {/*})(*/}
                        {/*<Input style={{margin:5,width:200}}/>*/}
                        {/*)}*/}
                        {/*</FormItem>*/}
                        <FormItem label="&nbsp;&nbsp;&nbsp;所属部门">
                            {getFieldDecorator('suosubumen', {
                            })(
                                <Select style={{margin:5,width:200}}>
                                    {bumenOptions}
                                </Select>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="&nbsp;&nbsp;&nbsp;身&nbsp;&nbsp;份&nbsp;&nbsp;证">
                            {getFieldDecorator('shenfenzhengdaoqishijian', {
                            })(
                                <DatePicker style={{margin:5,width:200}} placeholder="身份证到期时间"/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;血&#12288;&#12288;型">
                            {getFieldDecorator('xuexing', {
                            })(
                                <Select style={{margin:5,width:200}}>
                                    <Select.Option value="A型">A型</Select.Option>
                                    <Select.Option value="B型">B型</Select.Option>
                                    <Select.Option value="AB型">AB型</Select.Option>
                                    <Select.Option value="O型">O型</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;身&nbsp;高(cm)">
                            {getFieldDecorator('shengao', {
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <br/>

                        <FormItem label="&nbsp;&nbsp;&nbsp;体&nbsp;重(kg)">
                            {getFieldDecorator('tizhong', {
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;伤病情况">
                            {getFieldDecorator('jiankangzhuangkuang', {
                            })(
                                <Input style={{margin:5,width:200}} placeholder="受伤经历,现状等"/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;特长爱好">
                            {getFieldDecorator('techangaihao', {
                            })(
                                <Input style={{margin:5,width:200}} placeholder="体育活动，特殊职业技能等"/>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="&nbsp;&nbsp;&nbsp;驾&nbsp;&nbsp;驶&nbsp;&nbsp;证">
                            {getFieldDecorator('jiashizhengdaoqishijian', {
                            })(
                                <DatePicker style={{margin:5,width:200}} placeholder="驾驶证到期时间"/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;是否外聘">
                            {getFieldDecorator('shifouwaipin', {
                            })(
                                <Select style={{margin:5,width:200}}>
                                    <Select.Option value="是">是</Select.Option>
                                    <Select.Option value="否">否</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="用户类别">
                            {getFieldDecorator('yonghuleibie', {
                                rules: [{ required: true, message: '请输入用户类别', whitespace: true }],
                            })(
                                <Select style={{margin:5,width:200}}>
                                    {leibieOptions}
                                </Select>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="&nbsp;&nbsp;&nbsp;排&#12288;&#12288;序">
                            {getFieldDecorator('paixu', {
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="&#12288;照&#12288;&#12288;片">
                            <div>
                                <Upload
                                    {...uploadProps}
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                                    onPreview={this.handlePreview}
                                    showUploadList={false}
                                >
                                    {this.state.imageUrl ? <img src={this.state.imageUrl}/> : uploadButton}
                                </Upload>
                            </div>
                        </FormItem>
                        <br/>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>选择职务
                        </p>
                        <Checkbox.Group
                            value={this.state.zhiwuValues}
                            options={this.state.zhiwus}
                            onChange={this.onCheck3}
                        />
                        <p>
                            <Icon type="info" style={{color: '#1890ff',marginTop:20}}/>选择角色（必填）
                        </p>
                        <Checkbox.Group
                            value={this.state.jueseValues}
                            options={this.state.xianshijueses}
                            onChange={this.onCheck}
                        />
                        <p>
                            <Icon type="info" style={{color: '#1890ff',marginTop:20}}/>选择身份（必填）
                        </p>
                        <Checkbox.Group
                            value={this.state.liuchengjueseValues}
                            options={this.state.xianshiliuchengjueses}
                            onChange={this.onCheck2}
                        />
                        <br/>
                        <FormItem>
                            <Button type="primary" icon="plus" htmlType="submit">保存</Button>
                        </FormItem>
                    </Form>
                </LocaleProvider>
            </div>
        );
    }
}

const AppForm = Form.create()(App);
export default AppForm;
