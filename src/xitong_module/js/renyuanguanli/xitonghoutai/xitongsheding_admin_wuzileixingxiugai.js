import React from 'react';
import ReactDOM from 'react-dom';
import {
    Upload,
    Modal,
    Icon,
    Input,
    Button,
    message,
    InputNumber,
    Select, Form,
} from 'antd';

const { TextArea } = Input;
let id = 0;

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            wuzileixingInfo:{},
            previewVisible: false,
            previewImage: '',
            fileList: [],
            showguige: "none",
            guigeList: [],
            xinghaoList: [],
            zhuanshuxinxiList:[],
            guigefileList: [],
            visible:false,
            yuanteyouxinxi:[],
            teyouxinxi:{},
            teyouxinxixianshi:{},
            k:'',
            kList:[],
            yuanzhi:[]
        };
    }

    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
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

    addteyou = () => {
        const { form } = this.props;
        const keys4 = form.getFieldValue('keys4');
        const nextKeys = keys4.concat(id++);
        form.setFieldsValue({
            keys4: nextKeys,
        });
    }

    showModal = (k) =>{
        let teyouxinxi = this.state.teyouxinxi;
        let yuanteyouxinxi = [];
        console.log(teyouxinxi[k])
        if(teyouxinxi[k] !== undefined && teyouxinxi[k].length > 0){
            for(let i = 0;i<teyouxinxi[k].length;i++){
                yuanteyouxinxi.push(teyouxinxi[k][i])
            }
            this.setState({
                kList:teyouxinxi[k],
                yuanteyouxinxi:yuanteyouxinxi
            });
        }
        this.setState({
            visible: true,
            k:k,
        });
        this.addteyou();
    }
    hideModal = () => {
        let k = this.state.k;
        let teyouxinxi = this.state.teyouxinxi;
        let yuanzhi = this.state.yuanzhi;
        for(let i = 0;i<yuanzhi.length;i++){
            for(let j = 0;j<teyouxinxi[k].length;j++)
                if(yuanzhi[i].id ===  teyouxinxi[k][j].id){
                    teyouxinxi[k][j][yuanzhi[i].key] = yuanzhi[i].value;
                }
        }

        this.props.form.setFieldsValue({
            keys4: [],
        });
        this.setState({
            teyouxinxi:teyouxinxi,
            visible: false,
            k:'',
            kList:[],
            yuanzhi:[]
        });
    }
    queren() {
        const THE = this;
        let k = THE.state.k;
        let zhongzhi = false;
        const { getFieldValue } = THE.props.form;
        const keys4 = getFieldValue('keys4');
        let kList = THE.state.kList;
        let teyouxinxi = THE.state.teyouxinxi;
        let teyouxinxixianshi = THE.state.teyouxinxixianshi;
        let teyouxinxiList = [];
        THE.props.form.validateFields((err, values) => {
            if (!err) {
                for (let i = 0; i < keys4.length; i++) {
                    let teyouxinxikey = values.teyouxinxikey[keys4[i]];
                    if (teyouxinxikey == "" || typeof(teyouxinxikey)=="undefined") {
                        zhongzhi = true;
                        message.warning("请输入特有信息标题！");return;
                    }
                    let teyouxinxivalue = values.teyouxinxivalue[keys4[i]];
                    if (teyouxinxivalue == "" || typeof(teyouxinxivalue)=="undefined") {
                        zhongzhi = true;
                        message.warning("请输入特有信息内容！");return;
                    }
                    let obj = {};
                    obj.id = teyouxinxikey + i;
                    obj.key = teyouxinxikey;
                    obj.value = teyouxinxivalue;
                    teyouxinxiList.push(obj);
                }
            }
            teyouxinxiList = kList.concat(teyouxinxiList);
            teyouxinxi[k] = teyouxinxiList;
            let xianshi = '';
            let panduanchongfu = {};
            for(let i=0;i<teyouxinxiList.length;i++){
                if(panduanchongfu[teyouxinxiList[i].key] === undefined){
                    panduanchongfu[teyouxinxiList[i].key] =  teyouxinxiList[i].key;
                }else{
                    zhongzhi = true;
                    message.warning("同一型号的特有信息不能重复！");return;
                }
                xianshi += "(" + teyouxinxiList[i].key + ":" + teyouxinxiList[i].value + ")"
            }
            // xianshi = JSON.stringify(teyouxinxiList).split('{')[1];
            // xianshi = JSON.stringify(xianshi).split('}')[0];
            teyouxinxixianshi[k] = xianshi;
        });
        if(zhongzhi === true){
            return;
        }
        THE.props.form.setFieldsValue({
            keys4: [],
        });
        THE.setState({
            teyouxinxi: teyouxinxi,
            teyouxinxixianshi:teyouxinxixianshi,
            k:'',
            visible: false,
        });
    }

    removeteyou = (k) => {
        const { form } = this.props;
        const keys4 = form.getFieldValue('keys4');
        form.setFieldsValue({
            keys4: keys4.filter(key4 => key4 !== k),
        });
    }

    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({fileList}) => {
        this.setState({
            fileList: fileList,
        });
    }

    guigetupianhandleChange(id,fileList){
        console.log(fileList.fileList)
        let guigeList = this.state.guigeList;
        for(let i = 0;i < guigeList.length;i++){
            if(guigeList[i].id === id){
                guigeList[i].guigetupian = fileList.fileList;
            }
        }
        this.setState({
            guigeList: guigeList,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.toCreate();
            }
        });
    }

    wuzileibie = ''
    wuzileibieChang(value) {
        this.wuzileibie = value;
    }

    shifouxiaohaoxing = ''
    shifouxiaohaoxingChang(value) {
        this.shifouxiaohaoxing = value;
    }



    getWuzileixingInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "xqzhuangbeileixing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.zhuanshuxinxixiang.length;i++){
                    data.data.zhuanshuxinxixiang[i].id = i;
                }
                for(let i = 0;i<data.data.zhuangbeiguigeList.length;i++){
                    let list = [];
                    let obj = {};
                    obj.uid = i;
                    obj.name = 'a.png';
                    obj.status = 'done';
                    obj.url = data.data.zhuangbeiguigeList[i].tupian;
                    list.push(obj);
                    data.data.zhuangbeiguigeList[i].tupian = list;
                }
                for(let i = 0;i<data.data.zhuangbeixinghaoList.length;i++){
                    data.data.zhuangbeixinghaoList[i].teyouxinxi = '';
                    if(data.data.zhuangbeixinghaoList[i].teyouxinxixiang !== '' && data.data.zhuangbeixinghaoList[i].teyouxinxixiang !== null){
                    for(let j = 0;j<data.data.zhuangbeixinghaoList[i].teyouxinxixiang.length;j++){
                        data.data.zhuangbeixinghaoList[i].teyouxinxi +="(" + data.data.zhuangbeixinghaoList[i].teyouxinxixiang[j].key + ":" + data.data.zhuangbeixinghaoList[i].teyouxinxixiang[j].value + ")"
                    }
                    }
                }
                THE.setState({
                    wuzileixingInfo: data.data,
                    zhuanshuxinxiList:data.data.zhuanshuxinxixiang,
                    guigeList:data.data.zhuangbeiguigeList,
                    xinghaoList:data.data.zhuangbeixinghaoList,
                    fileList: [{
                        uid: 0,
                        name: 'a.png',
                        status: 'done',
                        url: data.data['tupian'],
                    }]
                });
            }
        });
    }

    toUpdate() {
        const THE = this;
        let zhongzhi = false;
        const { getFieldValue } = THE.props.form;
        let obj = THE.state.wuzileixingInfo;
        let fileList = THE.state.fileList;
        let shebeizhaopian = '';
        if (fileList.length > 0) {
            shebeizhaopian = fileList[0]['response'];
        }
        obj.tupian = shebeizhaopian;
        let zhuanshuxinxiList = THE.state.zhuanshuxinxiList;
        let xinghaoList = THE.state.xinghaoList;
        let guigeList = THE.state.guigeList;
        let zhuangbeiguigeList = [];
        let zhuangbeixinghaoList = [];
        let zhuanshuxinxixiang = [];

        const keys = getFieldValue('keys');
        const keys2 = getFieldValue('keys2');
        const keys3 = getFieldValue('keys3');
        THE.props.form.validateFields((err, values) => {
            if (!err) {
                for (let i = 0; i < keys.length; i++) {
                    let zhuanshuxinxikey = values.zhuanshuxinxikey[keys[i]];
                    if (zhuanshuxinxikey == "" || typeof(zhuanshuxinxikey)=="undefined") {
                        zhongzhi = true;
                        message.warning("请输入专属信息标题！");return;
                    }
                    let zhuanshuxinxivalue = values.zhuanshuxinxivalue[keys[i]];
                    if (zhuanshuxinxivalue == "" || typeof(zhuanshuxinxivalue)=="undefined") {
                        zhongzhi = true;
                        message.warning("请输入专属信息内容！");return;
                    }
                    let obj = {};
                    obj.key = zhuanshuxinxikey;
                    obj.value = zhuanshuxinxivalue;
                    zhuanshuxinxixiang.push(obj);
                }
            }
        });

        THE.props.form.validateFields((err, values) => {
            if (!err) {
                for (let i = 0; i < keys2.length; i++) {
                    let guigefileList = this.state.guigefileList;
                    let guigemingcheng = values.guigemingcheng[keys2[i]];
                    if (guigemingcheng == "" || typeof(guigemingcheng)=="undefined") {
                        zhongzhi = true;
                        message.warning("请输入规格名称！");return;
                    }
                    let guigemiaoshu = values.guigemiaoshu[keys2[i]];
                    let guigepaixu = values.guigepaixu[keys2[i]];
                    let obj = {};
                    obj.mingcheng = guigemingcheng;
                    obj.miaoshu = guigemiaoshu;
                    obj.paixu = guigepaixu;
                    if(guigefileList[keys2[i]] !== undefined && guigefileList[keys2[i]].length > 0){
                        obj.tupian = guigefileList[keys2[i]][0].response;
                    }else{
                        obj.tupian = '';
                    }
                    zhuangbeiguigeList.push(obj);
                }
            }
        });

        THE.props.form.validateFields((err, values) => {
            if (!err) {
                for (let i = 0; i < keys3.length; i++) {
                    let teyouxinxi = THE.state.teyouxinxi;
                    let xinghaomingcheng = values.xinghaomingcheng[keys3[i]];
                    if (xinghaomingcheng == "" || typeof(xinghaomingcheng)=="undefined") {
                        zhongzhi = true;
                        message.warning("请输入型号名称！");return;
                    }
                    let shangchanchangjia = values.shangchanchangjia[keys3[i]];
                    let xinghaopaixu = values.xinghaopaixu[keys3[i]];
                    let obj = {};
                    obj.mingcheng = xinghaomingcheng;
                    obj.changjiaxinxi = shangchanchangjia;
                    obj.teyouxinxixiang = teyouxinxi[keys3[i]];
                    // obj.teyouxinxixiang = teyouxinxi;
                    obj.paixu = xinghaopaixu;
                    zhuangbeixinghaoList.push(obj);
                }
            }
        });

        if(zhongzhi === true){
            return;
        }

        for(let i = 0;i<guigeList.length;i++){
            guigeList[i].tupian = guigeList[i].tupian[0].url;
        }
        zhuanshuxinxixiang = zhuanshuxinxiList.concat(zhuanshuxinxixiang);
        zhuangbeiguigeList = guigeList.concat(zhuangbeiguigeList);
        zhuangbeixinghaoList = xinghaoList.concat(zhuangbeixinghaoList);
        let panduanchongfu = {};
        for(let i = 0;i<zhuanshuxinxixiang.length;i++){
            if(panduanchongfu[zhuanshuxinxixiang[i].key] === undefined){
                panduanchongfu[zhuanshuxinxixiang[i].key] =  zhuanshuxinxixiang[i].key;
            }else{
                for(let i = 0;i<guigeList.length;i++){
                    let list = [];
                    let obj = {};
                    obj.uid = i;
                    obj.name = 'a.png';
                    obj.status = 'done';
                    obj.url = guigeList[i].tupian;
                    list.push(obj);
                    guigeList[i].tupian = list;
                }
                THE.setState({
                    guigeList:guigeList,
                });
                message.warning("专属信息不能重复！");return;
            }
        }
        let panduanchongfu2 = {};
        for(let i = 0;i<zhuangbeiguigeList.length;i++){
            if(panduanchongfu2[zhuangbeiguigeList[i].mingcheng] === undefined){
                panduanchongfu2[zhuangbeiguigeList[i].mingcheng] =  zhuangbeiguigeList[i].mingcheng;
            }else{
                for(let i = 0;i<guigeList.length;i++){
                    let list = [];
                    let obj = {};
                    obj.uid = i;
                    obj.name = 'a.png';
                    obj.status = 'done';
                    obj.url = guigeList[i].tupian;
                    list.push(obj);
                    guigeList[i].tupian = list;
                }
                THE.setState({
                    guigeList:guigeList,
                });
                message.warning("规格名称不能重复！");return;
            }
        }
        let panduanchongfu3 = {};
        for(let i = 0;i<zhuangbeixinghaoList.length;i++){
            if(panduanchongfu3[zhuangbeixinghaoList[i].mingcheng] === undefined){
                panduanchongfu3[zhuangbeixinghaoList[i].mingcheng] =  zhuangbeixinghaoList[i].mingcheng;
            }else{
                for(let i = 0;i<guigeList.length;i++){
                    let list = [];
                    let obj = {};
                    obj.uid = i;
                    obj.name = 'a.png';
                    obj.status = 'done';
                    obj.url = guigeList[i].tupian;
                    list.push(obj);
                    guigeList[i].tupian = list;
                }
                THE.setState({
                    guigeList:guigeList,
                });
                message.warning("型号名称不能重复！");return;
            }
        }
        obj.zhuangbeiguigeList = zhuangbeiguigeList;
        obj.zhuangbeixinghaoList = zhuangbeixinghaoList;
        obj.zhuanshuxinxixiang = zhuanshuxinxixiang;
        if (!confirm("确定修改此装备类型！")) {
            return;
        }
        $.ajax({
            type : 'POST',
            url : SERVER + "xgzhuangbeileixing",
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
            success : function(data){
                if (data.status != 0) {
                    for(let i = 0;i<guigeList.length;i++){
                        let list = [];
                        let obj = {};
                        obj.uid = i;
                        obj.name = 'a.png';
                        obj.status = 'done';
                        obj.url = guigeList[i].tupian;
                        list.push(obj);
                        guigeList[i].tupian = list;
                    }
                    THE.setState({
                        guigeList:guigeList,
                    });
                    message.warning(data.message);
                    return;
                }
                message.success("修改装备类型成功");
                THE.backPage();
            },
        });
    }

    backPage() {
        window.location.href = "./xitong.html#/xitongsheding_admin_wuzileibieshezhi";
    }

    componentDidMount () {
        this.getWuzileixingInfo();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let wuzileixingInfo = this.state.wuzileixingInfo;
        wuzileixingInfo[name] = value;
        this.setState({
            wuzileibieInfo : wuzileixingInfo
        });
    }

    numInputChange(value) {
        let wuzileixingInfo = this.state.wuzileixingInfo;
        wuzileixingInfo['baojingshuliang'] = value;
        this.setState({
            wuzileibieInfo : wuzileixingInfo
        });
    }

    baoyangzhouqiInputChange(value) {
        let wuzileixingInfo = this.state.wuzileixingInfo;
        wuzileixingInfo['baoyangzhouqi'] = value;
        this.setState({
            wuzileibieInfo : wuzileixingInfo
        });
    }

    shoumingInputChange(value) {
        let wuzileixingInfo = this.state.wuzileixingInfo;
        wuzileixingInfo['shiyongqixian'] = value;
        this.setState({
            wuzileibieInfo : wuzileixingInfo
        });
    }

    cunfangqixianInputChange(value) {
        let wuzileixingInfo = this.state.wuzileixingInfo;
        wuzileixingInfo['baocunqixian'] = value;
        this.setState({
            wuzileibieInfo : wuzileixingInfo
        });
    }

    shifouxiaohaoxingChange(value) {
        let wuzileixingInfo = this.state.wuzileixingInfo;
        wuzileixingInfo['shifouxiaohaoxing'] = value;
        this.setState({
            wuzileibieInfo : wuzileixingInfo
        });
    }

    shifouChange(value) {
        let wuzileixingInfo = this.state.wuzileixingInfo;
        wuzileixingInfo['zhuangbeiShenpiQuanxian'] = value;
        this.setState({
            wuzileibieInfo : wuzileixingInfo
        });
    }

    youwuChang(value) {
        const THE = this;
        let id = THE.state.id;
        if(value === '有'){
            THE.setState({
                showguige: "inline-block",
            })
        }else{
            $.ajax({
                type : 'get',
                url : SERVER + "panduanguigexinghao?id="+id,
                success : function(data){
                    if (data.status != 0) {
                        message.warning(data.message);
                        return;
                    }
                    THE.setState({
                        showguige: "none",
                        guigeList:[]
                    })
                    THE.props.form.setFieldsValue(
                        {
                            keys: [],
                        }
                    )
                    let wuzileixingInfo = THE.state.wuzileixingInfo;
                    wuzileixingInfo['youwuzhuangbeiguigexinghao'] = value;
                    THE.setState({
                        wuzileibieInfo : wuzileixingInfo
                    });
                },
            });
        }

    }
    youwubiaoqianChang(value) {
        let wuzileixingInfo = this.state.wuzileixingInfo;
        wuzileixingInfo['youwubiaoqian'] = value;
        this.setState({
            wuzileibieInfo : wuzileixingInfo
        });
    }

    zhuanshuxinxiInputChange(key,id,event){
        const target = event.target;
        const value = target.value;
        let zhuanshuxinxiList = this.state.zhuanshuxinxiList;
        for(let i = 0;i < zhuanshuxinxiList.length;i++){
            if(zhuanshuxinxiList[i].id === id){
                zhuanshuxinxiList[i][key] =  value
            }
        }
        this.setState({
            zhuanshuxinxiList : zhuanshuxinxiList
        });
    }

    guigeInputChange(key,id,event){
        const target = event.target;
        const value = target.value;
        let guigeList = this.state.guigeList;
        for(let i = 0;i < guigeList.length;i++){
            if(guigeList[i].id === id){
                guigeList[i][key] =  value
            }
        }
        this.setState({
            guigeList : guigeList
        });
    }

    xinghaoInputChange(key,id,event){
        const target = event.target;
        const value = target.value;
        let xinghaoList = this.state.xinghaoList;
        for(let i = 0;i < xinghaoList.length;i++){
            if(xinghaoList[i].id === id){
                xinghaoList[i][key] =  value
            }
        }
        this.setState({
            xinghaoList : xinghaoList
        });
    }

    removezhuanshu = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    addzhuanshu = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    removeguige = (k) => {
        const { form } = this.props;
        let keys2 = form.getFieldValue('keys2');
        keys2 = keys2.filter(key2 => key2 !== k);
        form.setFieldsValue({
            keys2: keys2,
        });
    }

    addguige = () => {
        const { form } = this.props;
        const keys2 = form.getFieldValue('keys2');
        const nextKeys = keys2.concat(id++);
        form.setFieldsValue({
            keys2: nextKeys,
        });
        let guigefileList = this.state.guigefileList;
        let obj = [];
        guigefileList.push(obj);
        this.setState({
            guigefileList: guigefileList,
        });
    }

    removexinghao = (k) => {
        const { form } = this.props;
        let keys3 = form.getFieldValue('keys3');
        keys3 = keys3.filter(keys3 => keys3 !== k);
        form.setFieldsValue({
            keys3: keys3,
        });
    }

    addxinghao = () => {
        const { form } = this.props;
        const keys3 = form.getFieldValue('keys3');
        const nextKeys = keys3.concat(id++);
        form.setFieldsValue({
            keys3: nextKeys,
        });
    }

    guigehandleChange = (k,fileList,) => {
        console.log(fileList.fileList)
        let guigefileList = this.state.guigefileList;
        guigefileList[k] = fileList.fileList;
        this.setState({
            guigefileList: guigefileList,
        });
    }

    removeChange(key,id){
        const THE = this;
        let zhuanshuxinxiList = THE.state.zhuanshuxinxiList;
        let guigeList = THE.state.guigeList;
        let xinghaoList = THE.state.xinghaoList;
        if(key === 'zhuanshuxinxiList'){
        for(let i = 0;i < zhuanshuxinxiList.length;i++){
            if(zhuanshuxinxiList[i].id === id){
                zhuanshuxinxiList.splice(i, 1);
            }
        }
            THE.setState({
            zhuanshuxinxiList : zhuanshuxinxiList
        });
        }else if(key === 'guigeList'){
            $.ajax({
                type : 'get',
                url : SERVER + "pdzhuangbeiguigezaiyong?id="+id,
                success : function(data){
                    if (data.status != 0) {
                        message.warning(data.message);
                        return;
                    }
                    for(let i = 0;i < guigeList.length;i++){
                        if(guigeList[i].id === id){
                            guigeList.splice(i, 1);
                        }
                    }
                    THE.setState({
                        guigeList : guigeList
                    });
                },
            });
        }else{
            $.ajax({
                type : 'get',
                url : SERVER + "pdzhuangbeixinghaozaiyong?id="+id,
                success : function(data){
                    if (data.status != 0) {
                        message.warning(data.message);
                        return;
                    }
                    for(let i = 0;i < xinghaoList.length;i++){
                        if(xinghaoList[i].id === id){
                            xinghaoList.splice(i, 1);
                        }
                    }
                    THE.setState({
                        xinghaoList : xinghaoList
                    });
                },
            });
        }
    }
    paixuInputChange(value) {
        let wuzileixingInfo = this.state.wuzileixingInfo;
        wuzileixingInfo.paixu = value;
        this.setState({
            wuzileixingInfo : wuzileixingInfo
        });
    }

    removeteyouChange(key,id){
        let yuanteyouxinxi = this.state.yuanteyouxinxi;
        let k = this.state.k;
        let teyouxinxi = this.state.teyouxinxi;
        let kList = this.state.kList;
        if(key === 'kList'){
            for(let i = 0;i < kList.length;i++){
                if(kList[i].id === id){
                    kList.splice(i, 1);
                }
            }
            teyouxinxi[k] = yuanteyouxinxi;
            this.setState({
                kList : kList,
                teyouxinxi : teyouxinxi
            });
        }
    }

    kListInputChange(key,id,yuanzhi,event){
        let yuan = this.state.yuanzhi;
        let chuchu = true;
        for(let i = 0;i<yuan.length;i++){
            if(yuan[i].id === id && yuan[i].key === key){
                chuchu = false;
            }
        }
        if(chuchu === true){
            let obj = {};
            obj.id = id;
            obj.value = yuanzhi;
            obj.key = key;
            yuan.push(obj)
        }
        const target = event.target;
        const value = target.value;
        let kList = this.state.kList;
        for(let i = 0;i < kList.length;i++){
            if(kList[i].id === id){
                kList[i][key] =  value
            }
        }
        this.setState({
            kList : kList,
            yuanzhi:yuan
        });
    }

    render() {
        let info = this.state.wuzileixingInfo;

        let kOptions = this.state.kList.map(item => <div style={{ margin: '5px'}}><Input style={{margin:7,width:160 }} value={item['key']} onChange={this.kListInputChange.bind(this,'key',item['id'],item['key'])}/>:<Input style={{margin:10,width:160 }} value={item['value']} onChange={this.kListInputChange.bind(this,'value',item['id'],item['value'])}/><Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={this.removeteyouChange.bind(this,'kList',item['id'])}
        /></div>);

        let uploadProps = {
            name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList,guigefileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const { getFieldDecorator, getFieldValue } = this.props.form;
        //专属信息formItems
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const zhuanshuformItems = keys.map((k, index) => {
            return (
                <div
                    key={k}
                >
                    <Form.Item
                        required={false}
                        key={k}
                    >
                        {getFieldDecorator
                        (`zhuanshuxinxikey[${k}]`, {
                        })
                        (
                            <Input style={{margin:10,width:200 }} />
                        )
                        }
                        :
                        {getFieldDecorator
                        (`zhuanshuxinxivalue[${k}]`, {
                        })
                        (
                            <Input style={{margin:10,width:200 }} />
                        )
                        }
                        {keys.length > 0 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 0}
                                onClick={() => this.removezhuanshu(k)}
                            />
                        ) : null}
                    </Form.Item>
                </div>
            )
        });

        //规格formItems
        getFieldDecorator('keys2', { initialValue: [] });
        const keys2 = getFieldValue('keys2');
        let guigeformbiaoti = ''
        if(this.state.guigeList.length > 0 || keys2.length > 0){
            guigeformbiaoti = <div>
                <span style={{ marginLeft: 80,fontSize:16 }}>规格名称</span>
                <span style={{ marginLeft: 160,fontSize:16 }}>规格描述</span>
                <span style={{ marginLeft: 160,fontSize:16 }}>规格排序</span>
                <span style={{ marginLeft: 85,fontSize:16 }}>规格图片</span>
            </div>
        }
        const guigeformItems = keys2.map((k, index) => {
            return (
                <div
                    key={k}
                >
                    <Form.Item
                        required={false}
                        key={k}
                    >
                        {getFieldDecorator
                        (`guigemingcheng[${k}]`, {
                        })
                        (
                            <Input style={{margin:10,width:200 }} />
                        )
                        }
                        {getFieldDecorator
                        (`guigemiaoshu[${k}]`, {
                        })
                        (
                            <Input style={{margin:10,width:200 }} />
                        )
                        }
                        {getFieldDecorator
                        (`guigepaixu[${k}]`, {
                        })
                        (
                            <InputNumber min={1} style={{margin:10,width:200 }} />
                        )
                        }
                        {/*<br/>*/}
                        {getFieldDecorator
                        (`guigetupian[${k}]`, {
                        })
                        (
                            <div style={{ display: "inline-block",transform:[`translateY(${50}px)`] }}>
                                <Upload
                                    {...uploadProps}
                                    listType="picture-card"
                                    fileList={guigefileList[k]}
                                    onPreview={this.handlePreview}
                                    onChange={this.guigehandleChange.bind(this,k)}
                                >
                                    {guigefileList[k] !== undefined && guigefileList[k].length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                                <div style={{clear:"both"}}></div>
                            </div>
                        )
                        }
                        {keys2.length > 0 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys2.length === 0}
                                onClick={() => this.removeguige(k)}
                            />
                        ) : null}
                    </Form.Item>
                </div>
            )
        });

        //型号formItems
        getFieldDecorator('keys3', { initialValue: [] });
        const keys3 = getFieldValue('keys3');
        let xinghaoformbiaoti = ''
        if(this.state.xinghaoList.length > 0 || keys3.length > 0){
            xinghaoformbiaoti = <div>
                <span style={{ marginLeft: 75,fontSize:16 }}>型号名称</span>
                <span style={{ marginLeft: 160,fontSize:16 }}>生产厂家</span>
                <span style={{ marginLeft: 260,fontSize:16 }}>特有信息</span>
                <span style={{ marginLeft: 260,fontSize:16 }}>型号排序</span>
            </div>
        }
        const xinghaoformItems = keys3.map((k, index) => {
            return (
                <div
                    key={k}
                >
                    <Form.Item
                        required={false}
                        key={k}
                    >
                        {getFieldDecorator
                        (`xinghaomingcheng[${k}]`, {
                        })
                        (
                            <Input style={{margin:10,width:200 }} />
                        )
                        }
                        {getFieldDecorator
                        (`shangchanchangjia[${k}]`, {
                        })
                        (
                            <Input style={{margin:10,width:200 }} />
                        )
                        }
                        {getFieldDecorator
                        (`teyouxinxi[${k}]`, {
                            initialValue:this.state.teyouxinxixianshi[k] || '',
                        })
                        (
                            <Input style={{margin:10,width:400 }} readOnly="true"/>
                        )
                        }
                        {keys3.length > 0 ? (
                            <Icon
                                className="dynamic-add-button"
                                type="plus"
                                disabled={keys3.length === 0}
                                onClick={() => this.showModal(k)}
                            />
                        ) : null}
                        {getFieldDecorator
                        (`xinghaopaixu[${k}]`, {
                        })
                        (
                            <InputNumber min={1} style={{margin:10,width:200 }} />
                        )
                        }
                        {keys3.length > 0 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys3.length === 0}
                                onClick={() => this.removexinghao(k)}
                            />
                        ) : null}
                    </Form.Item>
                </div>
            )
        });

        //特有信息formItems
        getFieldDecorator('keys4', { initialValue: [] });
        const keys4 = getFieldValue('keys4');
        const teyouformItems = keys4.map((k, index) => {
            return (
                <div
                    key={k}
                >
                    <Form.Item
                        required={false}
                        key={k}
                    >
                        {getFieldDecorator
                        (`teyouxinxikey[${k}]`, {
                        })
                        (
                            <Input style={{margin:10,width:160 }} />
                        )
                        }
                        :
                        {getFieldDecorator
                        (`teyouxinxivalue[${k}]`, {
                        })
                        (
                            <Input style={{margin:10,width:160 }}/>
                        )
                        }
                        {keys4.length > 0 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys4.length === 0}
                                onClick={() => this.removeteyou(k)}
                            />
                        ) : null}
                    </Form.Item>
                </div>
            )
        });

        let zhuanshuxinxiOptions = this.state.zhuanshuxinxiList.map(item => <div style={{ margin: '5px'}}><Input style={{margin:7,width:200 }} value={item['key']} onChange={this.zhuanshuxinxiInputChange.bind(this,'key',item['id'])}/>:<Input style={{margin:10,width:200 }} value={item['value']} onChange={this.zhuanshuxinxiInputChange.bind(this,'value',item['id'])}/><Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={this.removeChange.bind(this,'zhuanshuxinxiList',item['id'])}
        /></div>);

        let guigeOptions = this.state.guigeList.map(item => <div style={{ margin: '5px'}}>
            <Input style={{margin:7,width:200 }} value={item['mingcheng']} onChange={this.guigeInputChange.bind(this,'mingcheng',item['id'])} readOnly="true"/><Input style={{margin:10,width:200 }} value={item['miaoshu']} onChange={this.guigeInputChange.bind(this,'miaoshu',item['id'])} readOnly="true"/><Input style={{margin:10,width:200 }}value={item['paixu']} onChange={this.guigeInputChange.bind(this,'paixu',item['id'])} readOnly="true"/>
            <div style={{ display: "inline-block",transform:[`translateY(${50}px)`] }}>
                <Upload
                    {...uploadProps}
                    listType="picture-card"
                    fileList={item['tupian']}
                    onPreview={this.handlePreview}
                    // onChange={this.guigetupianhandleChange.bind(this,item['id'])}
                >
                    {item['tupian'] !== undefined && item['tupian'].length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <div style={{clear:"both"}}></div>
            </div><Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={this.removeChange.bind(this,'guigeList',item['id'])}
        />
        </div>);


        let xinghaoOptions = this.state.xinghaoList.map(item => <div style={{ margin: '5px'}}>
            <Input style={{margin:7,width:200 }} value={item['mingcheng']} onChange={this.xinghaoInputChange.bind(this,'mingcheng',item['id'])} readOnly="true"/><Input style={{margin:10,width:200 }} value={item['changjiaxinxi']} onChange={this.xinghaoInputChange.bind(this,'changjiaxinxi',item['id'])} readOnly="true"/><Input style={{margin:10,width:400 }}value={item['teyouxinxi']} onChange={this.xinghaoInputChange.bind(this,'teyouxinxi',item['id'])} readOnly="true"/><Input style={{margin:10,width:200,marginLeft:22 }}value={item['paixu']} onChange={this.xinghaoInputChange.bind(this,'paixu',item['id'])} readOnly="true"/><Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={this.removeChange.bind(this,'xinghaoList',item['id'])}
        />
        </div>);
        return (
            <div>
                <Modal
                    title="添加特有信息"
                    visible={this.state.visible}
                    onOk={this.queren.bind(this)}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form layout="inline">
                        {kOptions}
                        {teyouformItems}
                        <Form.Item>
                            <Button type="dashed" onClick={this.addteyou}>
                                <Icon type="plus" />特有信息添加
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <div>
                    <div>
                        <p style={{fontSize:18}}>
                            <Icon type="info" style={{color: '#1890ff'}}/>基本信息
                        </p>
                        <label>装备类别&#12288;&#12288;:</label>
                        <Select style={{margin:10,width:200}} disabled value={info['leibiemingcheng']}>
                        </Select>
                        <label>主要参数&#12288;&#12288;:</label>
                        <Input size="default" id="zycs_ipt" name="zhuyaocanshu" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['zhuyaocanshu']}/>
                        <label>计量单位&#12288;&#12288;:</label>
                        <Input size="default" id="lxdh_ipt" name="jiliangdanwei" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['jiliangdanwei']}/>
                        <br/>
                        <label>装备类型名称:</label>
                        <Input size="default" name="mingcheng" style={{margin:10,width:200}} value={info['mingcheng']} onChange={this.handleInputChange.bind(this)}/>
                        <label>有无标签&#12288;&#12288;:</label>
                        <Select style={{margin:10,width:200}} onChange={this.youwubiaoqianChang.bind(this)} value={info['youwubiaoqian']}>
                            <Select.Option value={true}>有</Select.Option>
                            <Select.Option value={false}>无</Select.Option>
                        </Select>
                        <label>使用期限&#12288;&#12288;:</label>
                        <InputNumber name="shiyongqixian" size="default" id="shiyongqixian" style={{margin:10,width:200}} min={0} placeholder="单位（天）" value={info['shiyongqixian']} onChange={this.shoumingInputChange.bind(this)}/>
                        <br/>
                        <label>适用范围&#12288;&#12288;:</label>
                        <Input size="default" id="syfw_ipt" name="shiyongfanwei" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['shiyongfanwei']}/>
                        <label>保养周期&#12288;&#12288;:</label>
                        <InputNumber  size="default" id="byzq_ipt" name="baoyangzhouqi" onChange={this.baoyangzhouqiInputChange.bind(this)} style={{margin:10,width:200}} value={info['baoyangzhouqi']} placeholder="单位（天）"/>
                        <label>保存期限&#12288;&#12288;:</label>
                        <InputNumber name="baocunqixian" size="default" id="baocunqixian" style={{margin:10,width:200}} min={0} placeholder="单位（天）" value={info['baocunqixian']} onChange={this.cunfangqixianInputChange.bind(this)}/>
                        <br/>
                        <label>装备类型排序:</label>
                        <InputNumber min={1} size="default" id="paixu" name="paixu" onChange={this.paixuInputChange.bind(this)} style={{margin:10,width:200}} value={info['paixu']}/>
                        <br/>
                        <label>使用手册&#12288;&#12288;:</label>
                        <br/>
                        <TextArea autosize={{minRows:3}} id="shiyongshouce" name="shiyongshouce" style={{width:1000,marginLeft:2}} value={info['shiyongshouce']} onChange={this.handleInputChange.bind(this)}/>
                        <br/>
                        <label>装备类型照片:</label>
                        <div style={{marginLeft:2}}>
                            <Upload
                                {...uploadProps}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                            <div style={{clear:"both"}}></div>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <p style={{fontSize:18,marginTop:20}}>
                            <Icon type="info" style={{color: '#1890ff'}}/>专属信息
                        </p>
                        {zhuanshuxinxiOptions}
                        <Form layout="inline">
                            {zhuanshuformItems}
                            <Form.Item>
                                <Button type="dashed" onClick={this.addzhuanshu}>
                                    <Icon type="plus" />专属信息添加
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <br/>
                    <div>
                        <p style={{fontSize:18,marginTop:20}}>
                            <Icon type="info" style={{color: '#1890ff'}}/>规格管理
                        </p>
                        <Form layout="inline">
                            {guigeformbiaoti}
                            {guigeOptions}
                            {guigeformItems}
                            <br/>
                            <Form.Item>
                                <Button type="dashed" onClick={this.addguige}>
                                    <Icon type="plus" />规格添加
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <br/>
                    <div>
                        <p style={{fontSize:18,marginTop:20}}>
                            <Icon type="info" style={{color: '#1890ff'}}/>型号管理
                        </p>
                        <Form layout="inline">
                            {xinghaoformbiaoti}
                            {xinghaoOptions}
                            {xinghaoformItems}
                            <br/>
                            <Form.Item>
                                <Button type="dashed" onClick={this.addxinghao}>
                                    <Icon type="plus" />型号添加
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <br/>
                    <Button type="primary" icon="check" onClick={this.toUpdate.bind(this)}>保存</Button>
                </div>
            </div>
        );
    }
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(App);
export default WrappedApp;
