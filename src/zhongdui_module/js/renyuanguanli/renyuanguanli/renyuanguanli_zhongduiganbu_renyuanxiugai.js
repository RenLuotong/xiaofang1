import React from 'react';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import moment from 'moment';
import {
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
    Checkbox
} from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            bumenList:[],
            leibieList:[],
            zhiwuList:[],
            previewVisible: false,
            previewImage: '',
            fileList: [],
            renyuanInfo:{},
            shenfenzhengInfo:{},
            jiashizhengInfo:{},
            jueseValues:[],
            jueses:[],
            liuchengjueses:[],
            liuchengjueseValues:[],
            zhiwuValues:[],
            zhiwus:[],
            yuanzhuangbeijueseValues:[],
        };
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

    // getliuchengjueseList() {
    //     const THE = this;
    //     $.ajax({
    //         type:'GET',
    //         url:SERVER+"huoquliuchengjueseAntd",
    //         success:function(data) {
    //             if (data.status != 0) {
    //                 message.warning(data.message);
    //                 return;
    //             }
    //             let list = [];
    //             for (let i = 0; i < data.data.length; i++) {
    //                 data.data[i]["key"] = i;
    //                 list.push(data.data[i]);
    //             }
    //             THE.setState({
    //                 liuchengjueses : list,
    //             });
    //         }
    //     });
    // }

    onCheck = (jueseValues) => {
        this.setState({ jueseValues:jueseValues });
    }

    onCheck2 = (liuchengjueseValues) => {
        this.setState({ liuchengjueseValues:liuchengjueseValues });
    }
    onCheck3 = (zhiwuValues) => {
        this.setState({ zhiwuValues:zhiwuValues });
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

    // getBumenList() {
    //     const THE = this;
    //     let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
    //     $.ajax({
    //         type:'GET',
    //         url: SERVER + "bumenXialaLiebiao?jigoumingcheng="+jigoumingcheng,
    //         success: function (data) {
    //             let list = [];
    //             if (data.status != 0) {
    //                 message.warning(data.message);
    //                 return;
    //             }
    //             for (let i = 0; i < data.data.length; i++) {
    //                 data.data[i]["key"] = i;
    //                 list.push(data.data[i]);
    //             }
    //             THE.setState({
    //                 bumenList: list,
    //             });
    //         }
    //     });
    // }
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

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "renyuanXiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let renfo = data.data.tbRenyuan;
                let jigouleibie = data.data.suoshujigouleibie;
                let yuanzhuangbeijueseValues = THE.state.yuanzhuangbeijueseValues;
                if(data.data.tbRenyuan.jueseId !==null && data.data.tbRenyuan.jueseId !==''&& data.data.tbRenyuan.jueseId !==undefined){
                    let shuju = data.data.tbRenyuan.jueseId.split("[")[1];
                    shuju = shuju.split("]")[0];
                    let jueseId = shuju.split(",");
                    for(let i = 0; i < jueseId.length; i++){
                        if(jueseId[i] < 10){
                            yuanzhuangbeijueseValues.push(jueseId[i]);
                        }
                    }
                    THE.setState({
                        yuanzhuangbeijueseValues : yuanzhuangbeijueseValues,
                    });
                }
                $.ajax({
                    type:'GET',
                    url:SERVER+"queryAllZuzhijigouJueses",
                    success:function(data) {
                        if (data.status != 0) {
                            message.warning(data.message);
                            return;
                        }
                        let list = [];
                        let juese = data.data;
                        if(jigouleibie === "支队"){
                            for (let i = 0; i < juese.length; i++) {
                                    data.data[i]["key"] = i;
                                    if(juese[i].label != '中队装备管理员' && juese[i].label != '通讯员'  && juese[i].label != '大队装备管理员' && juese[i].label != '支队管理员' && juese[i].label != '大队通讯员'&& juese[i].label != '超级管理员'){
                                        list.push(juese[i]);
                                    }
                            }
                        }else if(jigouleibie === "大队"){
                            for (let i = 0; i < juese.length; i++) {
                                    data.data[i]["key"] = i;
                                    if(juese[i].label != '支队装备管理员' && juese[i].label != '中队装备管理员' && juese[i].label != '通讯员'  && juese[i].label != '指挥中心' && juese[i].label != '支队管理员' && juese[i].label != '超级管理员'&& juese[i].label != '队伍督察'&& juese[i].label != '专职办'&& juese[i].label != '年休管理员'){
                                        list.push(juese[i]);
                                    }
                            }
                        }else if(jigouleibie === "中队"){
                            for (let i = 0; i < juese.length; i++) {
                                    data.data[i]["key"] = i;
                                    if(juese[i].label != '支队装备管理员' && juese[i].label != '大队装备管理员' && juese[i].label != '大队通讯员'  && juese[i].label != '指挥中心' && juese[i].label != '支队管理员' && juese[i].label != '超级管理员'&& juese[i].label != '队伍督察'&& juese[i].label != '专职办'&& juese[i].label != '年休管理员'){
                                        list.push(juese[i]);
                                    }
                            }
                        }else{
                            for (let i = 0; i < data.data.length; i++) {
                                data.data[i]["key"] = i;
                                list.push(data.data[i]);
                            }
                        }
                        THE.setState({
                            jueses : list,
                        });
                    }
                });
                $.ajax({
                    type:'GET',
                    url:SERVER+"huoquliuchengjueseAntd",
                    success:function(data) {
                        if (data.status != 0) {
                            message.warning(data.message);
                            return;
                        }
                        let list = [];
                        if(jigouleibie === "支队"){
                            for (let i = 0; i <  data.data.length; i++) {
                                data.data[i]["key"] = i;
                                list.push(data.data[i]);
                            }
                        }else{
                            for (let i = 0; i <  data.data.length; i++) {
                                data.data[i]["key"] = i;
                                list.push(data.data[i]);
                            }
                        }
                        THE.setState({
                            liuchengjueses : list,
                        });
                    }
                });
                $.ajax({
                    type:'GET',
                    url: SERVER + "bumenXialaLiebiao?jigoumingcheng="+renfo.jigoumingcheng,
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
                let shenfenzhengInfo = {};
                let jiashizhengInfo = {};
                let list = data.data.tbZhengjianList;
                for (let i = 0; i < list.length; i++) {
                    if (list[i]['zhengjanleixing'] == "身份证") {
                        shenfenzhengInfo = list[i];
                    } else if (list[i]['zhengjanleixing'] == "驾驶证") {
                        jiashizhengInfo = list[i];
                    }
                }
                let jueseValues = [];
                let liuchengjueseValues = [];
                let zhiwuValues = [];
                if(data.data.tbRenyuan.jueseId !== '' && data.data.tbRenyuan.jueseId !== null) {
                    let jueseId = JSON.parse(data.data.tbRenyuan.jueseId)
                    for (let i = 0; i < jueseId.length; i++) {
                        jueseValues.push(jueseId[i]);
                    }
                }
                if(data.data.tbRenyuan.liuchengjuese !== '' && data.data.tbRenyuan.liuchengjuese !== null) {
                    let liuchengjueseId = JSON.parse(data.data.tbRenyuan.liuchengjuese)
                    for (let i = 0; i < liuchengjueseId.length; i++) {
                        liuchengjueseValues.push(liuchengjueseId[i]);
                    }
                }
                if(data.data.tbRenyuan.zhiwu !== '' && data.data.tbRenyuan.zhiwu !== null){
                    let zhiwuId = JSON.parse(data.data.tbRenyuan.zhiwu)
                    for (let i = 0; i < zhiwuId.length; i++) {
                        zhiwuValues.push(zhiwuId[i]);
                    }
                }
                THE.setState({
                    jueseValues:jueseValues,
                    liuchengjueseValues:liuchengjueseValues,
                    zhiwuValues:zhiwuValues,
                    renyuanInfo: data.data.tbRenyuan,
                    shenfenzhengInfo: shenfenzhengInfo,
                    jiashizhengInfo: jiashizhengInfo,
                    imageUrl: data.data.tbRenyuan['zhaopian'],
                    fileList: [{
                        uid: 0,
                        name: '',
                        status: 'done',
                        url: data.data.tbRenyuan['zhaopian'],
                        response: data.data.tbRenyuan['zhaopian'],
                    }]
                });
            }
        });
    }

    toUpdate() {
        const THE = this;
        let yuanzhuangbeijueseValues = THE.state.yuanzhuangbeijueseValues;
        let liuchengjueseValues = THE.state.liuchengjueseValues;
        let jueseValues = THE.state.jueseValues;
        jueseValues = jueseValues.concat(yuanzhuangbeijueseValues);
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
        let tbRenyuan = THE.state.renyuanInfo;
        let jueseId = JSON.stringify(jueseValues);
        let liuchengjueseId = JSON.stringify(liuchengjueseValues);
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
        tbRenyuan['zhaopian'] = zhaopian;
        tbRenyuan["jueseId"] = jueseId;
        tbRenyuan["zhiwu"] = zhiwuId;
        tbRenyuan["liuchengjuese"] = liuchengjueseId;
        let shenfenzhengInfo = THE.state.shenfenzhengInfo;
        let jiashizhengInfo = THE.state.jiashizhengInfo;
        shenfenzhengInfo['zhengjanleixing'] = "身份证";
        jiashizhengInfo['zhengjanleixing'] = "驾驶证";
        shenfenzhengInfo['renyuanbianhao'] = tbRenyuan['renyuanbianhao'];
        jiashizhengInfo['renyuanbianhao'] = tbRenyuan['renyuanbianhao'];
        let tbZhengjianList = [];
        tbZhengjianList.push(shenfenzhengInfo);
        tbZhengjianList.push(jiashizhengInfo);
        if (!confirm("确定修改此条记录吗？")) {
            return;
        }
        let obj = {};
        obj['tbRenyuan'] = tbRenyuan;
        obj['tbZhengjianList'] = tbZhengjianList;
        $.ajax({
            type : 'POST',
            url : SERVER+"xiugaiRenyuan",
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.backPage();
            }
        });
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/renyuanguanli_zhongduiguanliyuan_renyuanguanli";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/renyuanguanli_zhongduiguanliyuan_renyuanguanli";
        }else{
            window.location.href = "./zhidui.html#/renyuanguanli_zhongduiguanliyuan_renyuanguanli";
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo[name] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }

    xingbiedaimaChange(value) {
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['xingbiedaima'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }

    xingbiedaimaChange(value) {
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['xingbiedaima'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }

    zhengzhimianmaoChange(value) {
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['zhengzhimianmao'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }

    hunyinzhuangkuangChange(value) {
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['hunyinzhuangkuang'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }

    suosubumenChange(value) {
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['suosubumen'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }

    waipinChange(value) {
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['iswaipinrenyuan'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }

    chushengriqiChange(value) {
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['chushengriqi'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }

    ruzhishijianChange(value) {
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['ruzhishijian'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }

    shenfenzhengdaoqishijianChange(value) {
        let shenfenzhengInfo = this.state.shenfenzhengInfo;
        shenfenzhengInfo['daoqishijian'] = value;
        this.setState({
            shenfenzhengInfo : shenfenzhengInfo
        });
    }

    jiashizhengdaoqishijianChange(value) {
        let jiashizhengInfo = this.state.jiashizhengInfo;
        jiashizhengInfo['daoqishijian'] = value;
        this.setState({
            jiashizhengInfo : jiashizhengInfo
        });
    }

    xuexingChange(value) {
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['xuexing'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }

    ganbuChange(value) {
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['ganbu'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }
    leibieChange(value){
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['renyuanleixing'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }
    componentDidMount() {
        this.getInfo();
        // this.getBumenList();
        this.getleibieList();
        this.getzhiwuList();
        // this.getliuchengjueseList();
    }

    render() {

        let bumenOptions = this.state.bumenList.map(item => <Select.Option key={item['key']} value={item['bumenmingcheng']}>{item['bumenmingcheng']}</Select.Option>);
        let leibieOptions = this.state.leibieList.map(item => <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>);
        let info = this.state.renyuanInfo;
        let chushengriqi;
        if (info['chushengriqi'] != null && info['chushengriqi'] != "") {
            chushengriqi = moment(info['chushengriqi']);
        }
        let ruzhishijian;
        if (info['ruzhishijian'] != null && info['ruzhishijian'] != "") {
            ruzhishijian = moment(info['ruzhishijian']);
        }
        let shenfenzhengdaoqishijian;
        if (this.state.shenfenzhengInfo['daoqishijian'] != null && this.state.shenfenzhengInfo['daoqishijian'] != "") {
            shenfenzhengdaoqishijian = moment(this.state.shenfenzhengInfo['daoqishijian']);
        }
        let jiashizhengdaoqishijian;
        if (this.state.jiashizhengInfo['daoqishijian'] != null && this.state.jiashizhengInfo['daoqishijian'] != "") {
            jiashizhengdaoqishijian = moment(this.state.jiashizhengInfo['daoqishijian']);
        }
        let uploadProps = {
            name: 'files',
            action: SERVER+"files/image",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList, jgptnsrq } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        return (
            <div>
                <label>用&nbsp;&nbsp;户&nbsp;&nbsp;名</label>
                <Input style={{margin:10,width:200}} disabled id="dengluming" name="dengluming" value={info['dengluming']} onChange={this.handleInputChange.bind(this)} />
                <label>密&#12288;&#12288;码</label>
                <Input style={{margin:10,width:200}} disabled type="password" id="mima" name="mima" value="******" onChange={this.handleInputChange.bind(this)} />
                <label>姓&#12288;&#12288;名</label>
                <Input style={{margin:10,width:200}} id="xingming" name="xingming" value={info['xingming']} onChange={this.handleInputChange.bind(this)} />
                <br/>

                <label>身份证号</label>
                <Input style={{margin:10,width:200}} id="shenfenzhenghao" name="shenfenzhenghao" value={info['shenfenzhenghao']} onChange={this.handleInputChange.bind(this)} />
                <label>性&#12288;&#12288;别</label>
                <Select value={info['xingbiedaima']} onChange={this.xingbiedaimaChange.bind(this)} style={{margin:10,width:200}}>
                    <Select.Option value="男">男</Select.Option>
                    <Select.Option value="女">女</Select.Option>
                </Select>
                <label>民&#12288;&#12288;族</label>
                <Input style={{margin:10,width:200}} id="minzu" name="minzu" value={info['minzu']} onChange={this.handleInputChange.bind(this)} />
                <br/>

                <label>籍&#12288;&#12288;贯</label>
                <Input style={{margin:10,width:200}} id="jiguan" name="jiguan" value={info['jiguan']} onChange={this.handleInputChange.bind(this)} />
                <label>政治面貌</label>
                <Select value={info['zhengzhimianmao']} onChange={this.zhengzhimianmaoChange.bind(this)} style={{margin:10,width:200}}>
                    <Select.Option value="党员">党员</Select.Option>
                    <Select.Option value="团员">团员</Select.Option>
                    <Select.Option value="群众">群众</Select.Option>
                </Select>
                <label>婚姻状况</label>
                <Select value={info['hunyinzhuangkuang']} onChange={this.hunyinzhuangkuangChange.bind(this)} style={{margin:10,width:200}}>
                    <Select.Option value="已婚">已婚</Select.Option>
                    <Select.Option value="未婚">未婚</Select.Option>
                </Select>
                <br/>

                <label>出生日期</label>
                <DatePicker style={{margin:10,width:200}} placeholder="出生日期" value={chushengriqi} onChange={this.chushengriqiChange.bind(this)}/>
                <label>入职时间</label>
                <DatePicker style={{margin:10,width:200}} placeholder="入职时间" value={ruzhishijian} onChange={this.ruzhishijianChange.bind(this)}/>
                <label>通信地址</label>
                <Input style={{margin:10,width:200}} id="tongxindizhi" name="tongxindizhi" value={info['tongxindizhi']} onChange={this.handleInputChange.bind(this)} />
                <br/>

                <label>固定电话</label>
                <Input style={{margin:10,width:200}} id="gudingdianhua" name="gudingdianhua" value={info['gudingdianhua']} onChange={this.handleInputChange.bind(this)} />
                <label>移动电话</label>
                <Input style={{margin:10,width:200}} id="yidongdianhua" name="yidongdianhua" value={info['yidongdianhua']} onChange={this.handleInputChange.bind(this)} />
                <label>手表编号</label>
                <Input style={{margin:10,width:200}} id="lanyabianhao" name="lanyabianhao" value={info['lanyabianhao']} onChange={this.handleInputChange.bind(this)} />
                <br/>

                <label>所属部门</label>
                <Select value={info['suosubumen']} onChange={this.suosubumenChange.bind(this)} style={{margin:10,width:200}}>
                    {bumenOptions}
                </Select>
                <label>是否外聘</label>
                <Select value={info['iswaipinrenyuan']} onChange={this.waipinChange.bind(this)} style={{margin:10,width:200}}>
                    <Select.Option value="是">是</Select.Option>
                    <Select.Option value="否">否</Select.Option>
                </Select>
                <label>血&#12288;&#12288;型</label>
                <Select value={info['xuexing']} onChange={this.xuexingChange.bind(this)} style={{margin:10,width:200}}>
                    <Select.Option value="A型">A型</Select.Option>
                    <Select.Option value="B型">B型</Select.Option>
                    <Select.Option value="AB型">AB型</Select.Option>
                    <Select.Option value="O型">O型</Select.Option>
                </Select>
                <br/>

                <label>身&nbsp;高(cm)</label>
                <Input style={{margin:10,width:200}} id="shengao" name="shengao" value={info['shengao']} onChange={this.handleInputChange.bind(this)} />
                <label>体&nbsp;重(kg)</label>
                <Input style={{margin:10,width:200}} id="tizhong" name="tizhong" value={info['tizhong']} onChange={this.handleInputChange.bind(this)} />
                <label>伤病情况</label>
                <Input style={{margin:10,width:200}} id="jiankangzhuangkuang" name="jiankangzhuangkuang" value={info['jiankangzhuangkuang']} onChange={this.handleInputChange.bind(this)} />
                <br/>

                <label>特长爱好</label>
                <Input style={{margin:10,width:200}} id="techangaihao" name="techangaihao" value={info['techangaihao']} onChange={this.handleInputChange.bind(this)} />
                <label>身&nbsp;&nbsp;份&nbsp;&nbsp;证</label>
                <DatePicker style={{margin:10,width:200}} placeholder="身份证到期时间" value={shenfenzhengdaoqishijian} onChange={this.shenfenzhengdaoqishijianChange.bind(this)}/>
                <label>驾&nbsp;&nbsp;驶&nbsp;&nbsp;证</label>
                <DatePicker style={{margin:10,width:200}} placeholder="驾驶证到期时间" value={jiashizhengdaoqishijian} onChange={this.jiashizhengdaoqishijianChange.bind(this)}/>
                <br/>
                <label>是否干部</label>
                <Select value={info['ganbu']} onChange={this.ganbuChange.bind(this)} style={{margin:10,width:200}}>
                    <Select.Option value="干部">干部</Select.Option>
                    <Select.Option value="职员">职员</Select.Option>
                </Select>
                <label>防&nbsp;&nbsp;丢&nbsp;&nbsp;器</label>
                <Input style={{margin:10,width:200}} id="lanyabianhao1" name="lanyabianhao1" value={info['lanyabianhao1']} onChange={this.handleInputChange.bind(this)} />
                <label>用户类别</label>
                <Select value={info['renyuanleixing']} onChange={this.leibieChange.bind(this)} style={{margin:10,width:200}}>
                    {leibieOptions}
                </Select>
                <br/>
                <label>排&#12288;&#12288;序</label>
                <Input style={{margin:10,width:200}} id="paixu" name="paixu" value={info['paixu']} onChange={this.handleInputChange.bind(this)} />
                <br/>
                <div>
                    <label>照&#12288;&#12288;片</label>
                    <Upload
                        {...uploadProps}
                        listType="picture-card"
                        className="avatar-uploader"
                        onChange={this.handleChange}
                        onPreview={this.handlePreview}
                        showUploadList={false}
                    >
                        {this.state.imageUrl ? <img src={this.state.imageUrl} style={{width: "100%"}} /> : uploadButton}
                    </Upload>
                </div>
                <br/>
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
                    options={this.state.jueses}
                    onChange={this.onCheck}
                />
                <p>
                    <Icon type="info" style={{color: '#1890ff',marginTop:20}}/>选择身份（必填）
                </p>
                <Checkbox.Group
                    value={this.state.liuchengjueseValues}
                    options={this.state.liuchengjueses}
                    onChange={this.onCheck2}
                />
                <br/>
                <Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppForm = Form.create()(App);
export default AppForm;
