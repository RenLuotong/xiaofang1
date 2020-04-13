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
    Checkbox,
    InputNumber,
} from 'antd';

const { TextArea } = Input;

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
            previewVisible: false,
            previewImage: '',
            fileList: [],
            xiaofangcheInfo:{},
            xiaofangcheleixingList: [],
            shoshenyangsuo: 'none',
        };
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

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "chaxunXiaofangcheNewXiangqingNew?id=" + id,
            success : function (data) {
                let list = [];
                let fileList = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if(data.data.shifoushenyangsuocheliang === '是'){
                    THE.setState({
                        shoshenyangsuo: 'inline',
                    })
                }else{
                    THE.setState({
                        shoshenyangsuo: 'none',
                    })
                }
                for(let i = 0;i<data.data.zhaopiandizhiList.length;i++){
                    let obj = {};
                    obj.url = data.data.zhaopiandizhiList[i];
                    obj.response = data.data.zhaopiandizhiList[i];
                    obj.uid = i;
                    obj.name = '';
                    obj.status = 'done',
                        list.push(obj);
                }
                THE.setState({
                    xiaofangcheInfo: data.data,
                    fileList: list
                });
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.toUpdate();
            }
        });
    }

    toUpdate() {
        const THE = this;
        let form = THE.props.form;
        let tbRenyuan = THE.state.xiaofangcheInfo;
        tbRenyuan.cheliangshuiguanrongliang = form.getFieldValue('cheliangshuiguanrongliang');
        tbRenyuan.cheliangpaomoguanrongliang = form.getFieldValue('cheliangpaomoguanrongliang');
        tbRenyuan.cheliangyouxiangrongliang = form.getFieldValue('cheliangyouxiangrongliang');

        if(tbRenyuan.cheliangshuiguanrongliang === '' || tbRenyuan.cheliangshuiguanrongliang === null || tbRenyuan.cheliangshuiguanrongliang === undefined){
            message.error("请输入水罐容量！");return;
        }
        if(tbRenyuan.cheliangpaomoguanrongliang === '' || tbRenyuan.cheliangpaomoguanrongliang === null || tbRenyuan.cheliangpaomoguanrongliang === undefined){
            message.error("请输入泡沫车容量！");return;
        }
        if(tbRenyuan.cheliangyouxiangrongliang === '' || tbRenyuan.cheliangyouxiangrongliang === null || tbRenyuan.cheliangyouxiangrongliang === undefined){
            message.error("请输入邮箱容量！");return;
        }

        if(tbRenyuan.shifoushenyangsuocheliang === '是' && (tbRenyuan.fvid === '' || tbRenyuan.fvid === null || tbRenyuan.fvid === undefined)){
            message.error("请输入沈阳所标识！");return;
        }
        let fileList = THE.state.fileList;
        for (let i = 0; i < fileList.length; i++) {
            if (typeof(fileList[i]['response']) == 'object') {
                let index = fileList.indexOf(fileList[i]);
                if (index > -1) {
                    fileList.splice(index, 1);
                }
            }
        }
        let zhaopiandizhiList = [];
        for (let i = 0; fileList.length > i; i++) {
            zhaopiandizhiList.push(fileList[i]['response']);
        }
        if (!confirm("确定修改此条记录吗？")) {
            return;
        }
        let obj = {};
        obj = tbRenyuan;
        let data = {};
        data.tbXiaofangcheNew = obj;
        data["zhaopiandizhiList"] = zhaopiandizhiList;
        $.ajax({
            type : 'POST',
            url : SERVER+"xiugaiXiaofangcheNew",
            data : JSON.stringify(data),
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
        window.location.href = "./zhongdui.html#/zhuangbeiguanli_zhongduirenyuan_xiaofangcheguanli";
    }

    baoyangzhouqiChange(value) {
        let xiaofangcheInfo = this.state.xiaofangcheInfo;
        xiaofangcheInfo.baoyangzhouqi = value;
        this.setState({
            xiaofangcheInfo : xiaofangcheInfo
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let xiaofangcheInfo = this.state.xiaofangcheInfo;
        xiaofangcheInfo[name] = value;
        this.setState({
            xiaofangcheInfo : xiaofangcheInfo
        });
    }

    xingbiedaimaChange(value) {
        let xiaofangcheInfo = this.state.xiaofangcheInfo;
        xiaofangcheInfo['xiaofangcheleixing'] = value;
        this.setState({
            xiaofangcheInfo : xiaofangcheInfo
        });
    }

    suosubumenChange(value) {
        let xiaofangcheInfo = this.state.xiaofangcheInfo;
        xiaofangcheInfo['suosubumen'] = value;
        this.setState({
            xiaofangcheInfo : xiaofangcheInfo
        });
    }

    shenfenzhengdaoqishijianChange(value) {
        let xiaofangcheInfo = this.state.xiaofangcheInfo;
        xiaofangcheInfo['caigoushijian'] = value;
        this.setState({
            xiaofangcheInfo : xiaofangcheInfo
        });
    }
    chuchangshijianshijianChange(value) {
        let xiaofangcheInfo = this.state.xiaofangcheInfo;
        xiaofangcheInfo['chuchangshijian'] = value;
        this.setState({
            xiaofangcheInfo : xiaofangcheInfo
        });
    }

    shifoushenyangChange(value) {
        let xiaofangcheInfo = this.state.xiaofangcheInfo;
        xiaofangcheInfo['shifoushenyangsuocheliang'] = value;
        xiaofangcheInfo['fvid'] = '';
        if(value === '是'){
            this.setState({
                shoshenyangsuo: 'inline',
                xiaofangcheInfo:xiaofangcheInfo
            });
        }else{
            this.setState({
                shoshenyangsuo: 'none',
                xiaofangcheInfo:xiaofangcheInfo
            });
        }
    }

    getXiaofangcheleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url : SERVER + "xiaofangcheleixingliebiao",
            success : function(data){
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                }
                THE.setState({
                    xiaofangcheleixingList : data.data,
                });
            }
        });
    }

    componentDidMount() {
        this.getInfo();
        this.getXiaofangcheleixingList();
    }

    render() {

        const xiaofangcheleixingList = this.state.xiaofangcheleixingList.map(item => <Select.Option key={item['key']} value={item['xiaofangcheleixing']}>{item['xiaofangcheleixing']}</Select.Option>);
        let info = this.state.xiaofangcheInfo;
        let chushengriqi;
        if (info['chushengriqi'] != null && info['chushengriqi'] != "") {
            chushengriqi = moment(info['chushengriqi']);
        }
        let ruzhishijian;
        if (info['ruzhishijian'] != null && info['ruzhishijian'] != "") {
            ruzhishijian = moment(info['ruzhishijian']);
        }
        let caigoushijian;
        if (info['caigoushijian'] != null && info['caigoushijian'] != "") {
            caigoushijian = moment(info['caigoushijian']);
        }
        let chuchangshijian;
        if (info['chuchangshijian'] != null && info['chuchangshijian'] != "") {
            chuchangshijian = moment(info['chuchangshijian']);
        }
        let uploadProps = {
            name: 'files',
            action: SERVER+"files/image",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        const { previewVisible, previewImage, fileList, jgptnsrq } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        // let stepList2;
        //
        // stepList2 = (
        //     <div>
        //         {imgs}
        //     </div>
        // )

        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem label="消防车名称">
                        {getFieldDecorator('xiaofangchemingcheng', {
                            initialValue:info['xiaofangchemingcheng'],
                            rules: [{ required: true, message: '请输入消防车名称', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="xiaofangchemingcheng" name="xiaofangchemingcheng" value={info['xiaofangchemingcheng']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <FormItem label="消防车密码&#12288;&#12288;&#12288;&#12288;">
                        {getFieldDecorator('mima', {
                            initialValue:info['mima'],
                            rules: [{ required: true, message: '消防车密码', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="mima" name="mima" value={info['mima']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <FormItem label="&nbsp;保养周期(天)&#12288;">
                        {getFieldDecorator('baoyangzhouqi', {
                            initialValue:info['baoyangzhouqi'],
                            rules: [{ required: true, message: '保养周期'}],
                        })(
                            <InputNumber  id="baoyangzhouqi" name="baoyangzhouqi" onChange={this.baoyangzhouqiChange.bind(this)} style={{margin:10,width:200}} value={info['baoyangzhouqi']}/>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="车牌号码&#12288;">
                        {getFieldDecorator('chepaihaoma', {
                            initialValue:info['chepaihaoma'],
                            rules: [{ required: true, message: '请输入消防车名称', whitespace: true }],
                        })(
                        <Input style={{margin:10,width:200}} id="chepaihaoma" name="chepaihaoma" value={info['chepaihaoma']} onChange={this.handleInputChange.bind(this)} />
                        )}
                    </FormItem>
                    <FormItem label="车辆类型&#12288;&#12288;&#12288;&#12288;&#12288;">
                        {getFieldDecorator('xiaofangcheleixing', {
                            initialValue:info['xiaofangcheleixing'],
                            rules: [{ required: true, message: '请选择车辆类型', whitespace: true }],
                        })(
                            <Select value={info['xiaofangcheleixing']} onChange={this.xingbiedaimaChange.bind(this)} style={{margin:10,width:200}}>
                                {xiaofangcheleixingList}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="车架号&#12288;&#12288;&#12288;&#12288;">
                        {getFieldDecorator('chejiahao', {
                            initialValue:info['chejiahao'],
                            rules: [{ required: true, message: '请输入车架号', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="chejiahao" name="chejiahao" value={info['chejiahao']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="最大载人数">
                        {getFieldDecorator('cheliangzuidazairenshu', {
                            initialValue:info['cheliangzuidazairenshu'],
                            rules: [{ required: true, message: '请输入最大载人数', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="cheliangzuidazairenshu" name="cheliangzuidazairenshu" value={info['cheliangzuidazairenshu']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <span style={{lineHeight:"45px",color:"red"}}>*</span><FormItem label="&nbsp;水罐容量(T)&#12288;&#12288;&#12288;&#12288;">
                        {getFieldDecorator('cheliangshuiguanrongliang', {
                            initialValue:info['cheliangshuiguanrongliang'],
                        })(
                            <InputNumber  size="default" min={0} style={{margin:10,width:200}} id="cheliangshuiguanrongliang"  value={info['cheliangshuiguanrongliang']} />

                        )}
                    </FormItem>
                    <span style={{lineHeight:"45px",color:"red"}}>*</span><FormItem label="&nbsp;泡沫车容量(T)&#12288;">
                        {getFieldDecorator('cheliangpaomoguanrongliang', {
                            initialValue:info['cheliangpaomoguanrongliang'],
                        })(
                            <InputNumber  size="default" min={0} style={{margin:10,width:200}} id="cheliangpaomoguanrongliang"  value={info['cheliangpaomoguanrongliang']} />

                        )}
                    </FormItem>
                    <br/>
                    <span style={{lineHeight:"45px",color:"red"}}>*</span><FormItem label="&nbsp;油箱容量(L)">
                        {getFieldDecorator('cheliangyouxiangrongliang', {
                            initialValue:info['cheliangyouxiangrongliang'],
                        })(
                            <InputNumber  size="default" min={0} style={{margin:10,width:200}} id="cheliangyouxiangrongliang"  value={info['cheliangyouxiangrongliang']}  />

                        )}
                    </FormItem>
                    <FormItem label="车辆品牌&#12288;&#12288;&#12288;&#12288;&#12288;">
                        {getFieldDecorator('cheliangpinpai', {
                            initialValue:info['cheliangpinpai'],
                            rules: [{ required: true, message: '请选择车辆品牌', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="cheliangpinpai" name="cheliangpinpai" value={info['cheliangpinpai']} onChange={this.handleInputChange.bind(this)} />
                        )}
                    </FormItem>
                    <FormItem label="车辆型号&#12288;&#12288;&#12288;">
                        {getFieldDecorator('cheliangxinghao', {
                            initialValue:info['cheliangxinghao'],
                            rules: [{ required: true, message: '请输入车辆型号', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="cheliangxinghao" name="cheliangxinghao" value={info['cheliangxinghao']} onChange={this.handleInputChange.bind(this)} />
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="长&nbsp;&nbsp;度(m)&#12288;">
                        {getFieldDecorator('cheliangchangdu', {
                            initialValue:info['cheliangchangdu'],
                            rules: [{ required: true, message: '请输入长度', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="cheliangchangdu" name="cheliangchangdu" value={info['cheliangchangdu']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <FormItem label="高&nbsp;&nbsp;度(m)&#12288;&#12288;&#12288;&#12288;&#12288;">
                        {getFieldDecorator('chelianggaodu', {
                            initialValue:info['chelianggaodu'],
                            rules: [{ required: true, message: '请输入高度', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="chelianggaodu" name="chelianggaodu" value={info['chelianggaodu']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <FormItem label="宽&nbsp;&nbsp;度(m)&#12288;&#12288;&#12288;">
                        {getFieldDecorator('cheliangkuandu', {
                            initialValue:info['cheliangkuandu'],
                            rules: [{ required: true, message: '请输入宽度', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="cheliangkuandu" name="cheliangkuandu" value={info['cheliangkuandu']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="发动机型号">
                        {getFieldDecorator('cheliangfadongjixinghao', {
                            initialValue:info['cheliangfadongjixinghao'],
                            rules: [{ required: true, message: '请输入发动机型号', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="cheliangfadongjixinghao" name="cheliangfadongjixinghao" value={info['cheliangfadongjixinghao']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <FormItem label="最大行驶速度(km/h)">
                        {getFieldDecorator('cheliangzuidaxingshisudu', {
                            initialValue:info['cheliangzuidaxingshisudu'],
                            rules: [{ required: true, message: '请输入最大行驶速度', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="cheliangzuidaxingshisudu" name="cheliangzuidaxingshisudu" value={info['cheliangzuidaxingshisudu']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <FormItem label="车辆满载质量(T)">
                        {getFieldDecorator('cheliangmanzaizhiliang', {
                            initialValue:info['cheliangmanzaizhiliang'],
                            rules: [{ required: true, message: '请输入车辆满载质量', whitespace: true }],
                        })(
                            <Input style={{margin:10,width:200}} id="cheliangmanzaizhiliang" name="cheliangmanzaizhiliang" value={info['cheliangmanzaizhiliang']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="采购时间&#12288;">
                        {getFieldDecorator('caigoushijian', {
                            initialValue:caigoushijian,
                            rules: [{ required: true, message: '请选择采购时间'}],
                        })(
                            <DatePicker style={{margin:10,width:200}} placeholder="请选择采购时间" value={caigoushijian} onChange={this.shenfenzhengdaoqishijianChange.bind(this)}/>

                        )}
                    </FormItem>
                    <FormItem label="燃油种类&#12288;&#12288;&#12288;&#12288;&#12288;">
                        {getFieldDecorator('ranyouzhonglei', {
                            initialValue:info['ranyouzhonglei'],
                            rules: [{ required: true, message: '请输入燃油种类'}],
                        })(
                            <Input style={{margin:10,width:200}} id="ranyouzhonglei" name="ranyouzhonglei" value={info['ranyouzhonglei']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <FormItem label="出厂时间&#12288;&#12288;&#12288;">
                        {getFieldDecorator('chuchangshijian', {
                            initialValue:chuchangshijian,
                            rules: [{ required: true, message: '请选择出厂时间'}],
                        })(
                            <DatePicker style={{margin:10,width:200}} placeholder="请选择出厂时间" value={chuchangshijian} onChange={this.chuchangshijianshijianChange.bind(this)}/>

                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="水泵流量&#12288;">
                        {getFieldDecorator('shuibengliuliang', {
                            initialValue:info['shuibengliuliang'],
                            rules: [{ required: true, message: '请输入水泵流量'}],
                        })(
                            <Input style={{margin:10,width:200}} id="shuibengliuliang" name="shuibengliuliang" value={info['shuibengliuliang']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <FormItem label="车载炮流量&#12288;&#12288;&#12288;&#12288;">
                        {getFieldDecorator('chezaipaoliuliang', {
                            initialValue:info['chezaipaoliuliang'],
                            rules: [{ required: true, message: '请输入车载炮流量'}],
                        })(
                            <Input style={{margin:10,width:200}} id="chezaipaoliuliang" name="chezaipaoliuliang" value={info['chezaipaoliuliang']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <FormItem label="水炮射程&#12288;&#12288;&#12288;">
                        {getFieldDecorator('shuipaoshecheng', {
                            initialValue:info['shuipaoshecheng'],
                            rules: [{ required: true, message: '请输入水炮射程'}],
                        })(
                            <Input style={{margin:10,width:200}} id="shuipaoshecheng" name="shuipaoshecheng" value={info['shuipaoshecheng']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="遥控距离&#12288;">
                        {getFieldDecorator('yaokongjuli', {
                            initialValue:info['yaokongjuli'],
                            rules: [{ required: true, message: '请输入遥控距离'}],
                        })(
                            <Input style={{margin:10,width:200}} id="yaokongjuli" name="yaokongjuli" value={info['yaokongjuli']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <FormItem label="车载灭火剂&#12288;&#12288;&#12288;&#12288;">
                        {getFieldDecorator('chezaimiehuoji', {
                            initialValue:info['chezaimiehuoji'],
                            rules: [{ required: true, message: '请输入车载灭火剂'}],
                        })(
                            <Input style={{margin:10,width:200}} id="chezaimiehuoji" name="chezaimiehuoji" value={info['chezaimiehuoji']} onChange={this.handleInputChange.bind(this)} />

                        )}
                    </FormItem>
                    <FormItem label="是否沈阳所车辆">
                        {getFieldDecorator('shifoushenyangsuocheliang', {
                            initialValue:info['shifoushenyangsuocheliang'],
                            rules: [{ required: true, message: '请选择是否沈阳所车辆', whitespace: true }],
                        })(
                            <Select
                                style={{margin:5,width:200}}
                                showSearch
                                optionFilterProp="children"
                                onChange={this.shifoushenyangChange.bind(this)}
                                value={info['shifoushenyangsuocheliang']}
                            >
                                <Select.Option value="是">是</Select.Option>
                                <Select.Option value="否">否</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="*&nbsp;沈阳所标识" style={{display:this.state.shoshenyangsuo}}>
                        {getFieldDecorator('shenyangsuobiaoshi', {
                            initialValue:info['fvid'],
                            // rules: [{ required: true, message: '请输入沈阳所标识'}],
                        })(
                            <Input style={{margin:10,width:200}} id="fvid" name="fvid" value={info['fvid']} onChange={this.handleInputChange.bind(this)}/>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="适用范围&#12288;">
                        {getFieldDecorator('shiyongfanwei', {
                            initialValue:info['shiyongfanwei'],
                            rules: [{ required: true, message: '请填写适用范围'}],
                        })(
                            <TextArea autosize={{minRows:3}} id="shiyongfanwei" name="shiyongfanwei" style={{width:1000}} value={info['shiyongfanwei']} onChange={this.handleInputChange.bind(this)}/>

                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="&nbsp;&nbsp;&nbsp;车辆照片&#12288;">
                        <div>
                            <Upload
                                {...uploadProps}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 5 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                            <div style={{clear:"both"}}></div>
                        </div>
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button type="primary" icon="plus" htmlType="submit">保存</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const AppForm = Form.create()(App);
export default AppForm;
