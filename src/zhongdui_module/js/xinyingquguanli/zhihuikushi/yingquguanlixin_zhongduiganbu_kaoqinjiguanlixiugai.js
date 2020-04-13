import React from 'react';
import {
    message,
    Select,
    Input,
    Button, Upload, Modal, Icon,
} from 'antd';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            getInfo:{},
            previewVisible: false,
            previewImage: '',
            fileList: [],
            kaoqinjiyongtuList: [],
        };
    }


    getkaoqinjiyongtuList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquKaoqinjiyongtuEnumMeiju",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    list.push(data.data[i]);
                }
                console.log(list)
                THE.setState({
                    kaoqinjiyongtuList: list,
                });
            }
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

    toUpdate() {
        const THE = this;
        let getInfo = THE.state.getInfo;
        let fileList = THE.state.fileList;
        if (getInfo.shebeixuliehao == "") {
            message.error("请输入设备序列号！");return;
        }
        if (getInfo.weizhi == "") {
            message.error("请输入设备地点！");return;
        }
        if (getInfo.yongtu == "") {
            message.error("请选择设备用途！");return;
        }
        if (getInfo.juyuwangip == "") {
            message.error("请输入局域网ip！");return;
        }
        if (getInfo.juyuwangduankou == "") {
            message.error("请输入局域网端口！");return;
        }
        let shebeizhaopian = '';
        if (fileList.length > 0) {
            shebeizhaopian = fileList[0]['response'];
        }
        getInfo['shebeizhaopian'] = shebeizhaopian;
        if (!confirm("确定修改此考勤机！")) {
            return;
        }
        $.ajax({
            type : 'POST',
            url : SERVER+"xiugaiKaoqinji",
            data : JSON.stringify(getInfo),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);return;
                }
                message.success(data.message);
                THE.backPage();
            }
        });
    }

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER+"shebeixinxi?id="+id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    getInfo: data.data,
                    fileList: [{
                        uid: 0,
                        name: 'a.png',
                        status: 'done',
                        url: data.data['shebeizhaopian'],
                        response: data.data['shebeizhaopian'],
                    }],
                });
            }
        });
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
        }else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
        }
    }

    componentDidMount () {
        this.getInfo();
        this.getkaoqinjiyongtuList();
    }

    yongtuChange(value) {
        let getInfo = this.state.getInfo;
        getInfo['yongtu'] = value;
        this.setState({
            getInfo : getInfo
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let getInfo = this.state.getInfo;
        getInfo[name] = value;
        this.setState({
            getInfo : getInfo
        });
    }

    render() {

        let kaoqinjiyongtuListOptions = this.state.kaoqinjiyongtuList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );


        const info = this.state.getInfo;
        let uploadProps = {
            name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList, jgptnsrq} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return(
            <div>
                <label>设备序号 :</label>
                <Input size="default" name="shebeixuliehao" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['shebeixuliehao']}/>
                <label>设备地点&#12288;:</label>
                <Input size="default" name="weizhi" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['weizhi']}/>
                <label>设备用途 :</label>
                <Select value={info['yongtu']} onChange={this.yongtuChange.bind(this)} style={{margin:10,width:200}}>
                    {kaoqinjiyongtuListOptions}
                </Select>
                <br/>
                <label>局域网IP :</label>
                <Input size="default" name="juyuwangip" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['juyuwangip']}/>
                <label>局域网端口 :</label>
                <Input size="default" name="juyuwangduankou" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['juyuwangduankou']}/>
                <label>账号&#12288;&#12288;:</label>
                <Input size="default" name="zhanghao" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['zhanghao']}/>
                <br/>
                <label>密码&#12288;&#12288;:</label>
                <Input size="default" name="mima" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['mima']}/>
                <br/>
                <label>设备图片:</label>
                <div>
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
                <br/>
                <Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
            </div>
        )
    }
}

export default App;
