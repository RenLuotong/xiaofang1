//人员白名单照片管理
//白名单添加
import React from 'react';
import { Upload, Icon, Modal, Button, message,Select } from 'antd';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            renyuanList: [],
            previewVisible: false,
            previewImage: '',
            fileList: [],
            renyuanSelect: '',
        };
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

    handleChange = ({ fileList }) => this.setState({ fileList })

    toCreate() {
        const THE = this;
        let renyuan = this.state.renyuanSelect;
        let zhaopian = this.state.fileList;
        if(renyuan == '') {
            message.warning("请选择营区人员！");return;
        }
        if(zhaopian == null || zhaopian.length == 0) {
            message.warning("请上传照片！");return;
        }
        let zhaopianList = [];
        for (let i = 0; i < zhaopian.length; i++) {
            zhaopianList.push(zhaopian[i].response);
        }
        if (!confirm("确定添加白名单信息")) {
            return;
        }
        let renliantupianVM = {};
        renliantupianVM["renyuanbianhao"] = renyuan;
        renliantupianVM["renliantupianList"] = zhaopianList;
        $.ajax({
            type:'POST',
            url:SERVER+"tianjiayqrltupian",
            data:JSON.stringify(renliantupianVM),
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

    renyuanChange(value) {
        this.setState({
            renyuanSelect : value,
        });
    }

    renyuanList() {
        let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "renyuanXialiaLiebiao?jigoumingcheng=" + jigoumingcheng,
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
                    renyuanList: list,
                });
            }
        });
    }

    backPage() {
        window.location.href = "./zhongdui.html#/yingquguanlixin_zhongduiganbu_renyuanbaimingdan";
    }

    componentDidMount() {
        this.renyuanList();
    }

    render() {

        const { previewVisible, previewImage, fileList } = this.state;

        const uploadProps = {
            name: 'files',
            action: SERVER+"files/image",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        let renyuanList = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>);

        return (
            <div>
                <label>营区人员 :</label>
                <Select style={{margin:5,width:200}} onChange={this.renyuanChange.bind(this)}>
                    {renyuanList}
                </Select>
                <br/>
                <label>人员照片 :</label>
                <br/>
                <div>
                <Upload
                    {...uploadProps}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    style={{float:"left"}}
                    beforeUpload={this.beforeUpload}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                    <div style={{clear:"both"}}></div>
                </div>
                <br/>
                <Button type="primary" icon="plus" onClick={this.toCreate.bind(this)}>保存</Button>
            </div>
        );
    }

}

export default App;