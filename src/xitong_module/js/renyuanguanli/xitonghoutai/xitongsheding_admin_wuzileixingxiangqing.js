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
                if(data.data['youwubiaoqian'] === true){
                    data.data['youwubiaoqian'] = '有'
                }else{
                    data.data['youwubiaoqian'] = '无'
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
                        for (let j = 0; j < data.data.zhuangbeixinghaoList[i].teyouxinxixiang.length; j++) {
                            data.data.zhuangbeixinghaoList[i].teyouxinxi += "(" + data.data.zhuangbeixinghaoList[i].teyouxinxixiang[j].key + ":" + data.data.zhuangbeixinghaoList[i].teyouxinxixiang[j].value + ")"
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

    componentDidMount () {
        this.getWuzileixingInfo();
    }

    render() {
        let info = this.state.wuzileixingInfo;

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

        let guigeformbiaoti = ''
        if(this.state.guigeList.length > 0){
            guigeformbiaoti = <div>
                <span style={{ marginLeft: 80,fontSize:16 }}>规格名称</span>
                <span style={{ marginLeft: 160,fontSize:16 }}>规格描述</span>
                <span style={{ marginLeft: 160,fontSize:16 }}>规格排序</span>
                <span style={{ marginLeft: 85,fontSize:16 }}>规格图片</span>
            </div>
        }

        let xinghaoformbiaoti = ''
        if(this.state.xinghaoList.length > 0){
            xinghaoformbiaoti = <div>
                <span style={{ marginLeft: 80,fontSize:16 }}>型号名称</span>
                <span style={{ marginLeft: 160,fontSize:16 }}>生产厂家</span>
                <span style={{ marginLeft: 260,fontSize:16 }}>特有信息</span>
                <span style={{ marginLeft: 260,fontSize:16 }}>型号排序</span>
            </div>
        }

        let zhuanshuxinxiOptions = this.state.zhuanshuxinxiList.map(item => <div style={{ margin: '5px'}}>{item['key']}:<Input style={{margin:10,width:200 }} value={item['value']} readOnly="true"/></div>);

        let guigeOptions = this.state.guigeList.map(item => <div style={{ margin: '5px'}}>
            <Input style={{margin:7,width:200 }} value={item['mingcheng']}  readOnly="true"/><Input style={{margin:10,width:200 }} value={item['miaoshu']} readOnly="true"/><Input style={{margin:10,width:200 }}value={item['paixu']}  readOnly="true"/>
            <div style={{ display: "inline-block",transform:[`translateY(${50}px)`] }}>
                <Upload
                    {...uploadProps}
                    listType="picture-card"
                    fileList={item['tupian']}
                    onPreview={this.handlePreview}
                >
                    {item['tupian'] !== undefined && item['tupian'].length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <div style={{clear:"both"}}></div>
            </div>
        </div>);


        let xinghaoOptions = this.state.xinghaoList.map(item => <div style={{ margin: '5px'}}>
            <Input style={{margin:7,width:200 }} value={item['mingcheng']}  readOnly="true"/><Input style={{margin:10,width:200 }} value={item['changjiaxinxi']}  readOnly="true"/><Input style={{margin:10,width:400 }}value={item['teyouxinxi']} readOnly="true"/><Input style={{margin:10,width:200 }}value={item['paixu']}  readOnly="true"/>
        </div>);
        return (
            <div>
                <div>
                    <div>
                        <p style={{fontSize:18}}>
                            <Icon type="info" style={{color: '#1890ff'}}/>基本信息
                        </p>
                        <label>装备类别&#12288;&#12288;:</label>
                        <Input size="default" id="zhuangbeileibiemingcheng" name="zhuangbeileibiemingcheng"  style={{margin:10,width:200}} value={info['leibiemingcheng']} readOnly="true"/>
                        <label>主要参数&#12288;&#12288;:</label>
                        <Input size="default" id="zycs_ipt" name="zhuyaocanshu"  value={info['zhuyaocanshu']} style={{margin:10,width:200}} readOnly="true"/>
                        <label>计量单位&#12288;&#12288;:</label>
                        <Input size="default" id="lxdh_ipt" name="jiliangdanwei"  style={{margin:10,width:200}} value={info['jiliangdanwei']} readOnly="true"/>
                        <br/>
                        <label>装备类型名称:</label>
                        <Input size="default" name="zhuangbeileixingmingcheng" style={{margin:10,width:200}} value={info['mingcheng']} readOnly="true"/>
                        <label>有无标签&#12288;&#12288;:</label>
                        <Input size="default" id="youwubiaoqian" name="youwubiaoqian"  style={{margin:10,width:200}} value={info['youwubiaoqian']} readOnly="true"/>
                        <label>使用期限&#12288;&#12288;:</label>
                        <InputNumber name="shouming" size="default" id="shouming_ipt" style={{margin:10,width:200}} min={0} placeholder="单位（天）" value={info['shiyongqixian']}  readOnly="true"/>
                        <br/>
                        <label>适用范围&#12288;&#12288;:</label>
                        <Input size="default" id="syfw_ipt" name="shiyongfanwei"  value={info['shiyongfanwei']} style={{margin:10,width:200}} readOnly="true"/>
                        <label>保养周期&#12288;&#12288;:</label>
                        <InputNumber  size="default" id="byzq_ipt" name="baoyangzhouqi"  style={{margin:10,width:200}} value={info['baoyangzhouqi']} placeholder="单位（天）" readOnly="true"/>
                        <label>保存期限&#12288;&#12288;:</label>
                        <InputNumber name="cunfangqixian" size="default" id="cunfangqixian_ipt" style={{margin:10,width:200}} min={0} placeholder="单位（天）" value={info['baocunqixian']}  readOnly="true"/>
                        <br/>
                        <label>装备类型排序:</label>
                        <Input size="default" id="paixu" name="paixu"  style={{margin:10,width:200}} value={info['paixu']} readOnly="true"/>
                        <br/>
                        <label>使用手册&#12288;&#12288;:</label>
                        <br/>
                        <TextArea autosize={{minRows:3}} id="weixiushuoming" name="weixiushuoming" style={{width:1000,marginLeft:2}} value={info['shiyongshouce']}  readOnly="true"/>
                        <br/>
                        <label>装备类型照片:</label>
                        <div style={{marginLeft:2}}>
                            <Upload
                                {...uploadProps}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                // onChange={this.handleChange}
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
                    </div>
                    <br/>
                    <div>
                        <p style={{fontSize:18,marginTop:20}}>
                            <Icon type="info" style={{color: '#1890ff'}}/>规格管理
                        </p>
                            {guigeformbiaoti}
                            {guigeOptions}
                        <br/>
                    </div>
                    <br/>
                    <div>
                        <p style={{fontSize:18,marginTop:20}}>
                            <Icon type="info" style={{color: '#1890ff'}}/>型号管理
                        </p>
                            {xinghaoformbiaoti}
                            {xinghaoOptions}
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(App);
export default WrappedApp;
