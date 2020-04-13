import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
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
    Upload,
} from 'antd';




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
            visible: false,
            jiedaishiList: [],
            jeidaishi: '',
            fileList: [],
        };
    }

    getjiedaishiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquKongxianJiashujiedaishifangjian",
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
                    jiedaishiList: list,
                });
            }
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
    toCreate(){
        const THE = this;
        let fangjianId = THE.state.jeidaishi;
        if (fangjianId == "") {
            message.error("请选择接待室！");return;
        }
        let fileList = THE.state.fileList;
        if (fileList.length === 0) {
            message.error("请上传接待室打扫图片！");return;
        }
        let zhaopiandizhiList = [];
        for (let i = 0; fileList.length > i; i++) {
            zhaopiandizhiList.push(fileList[i]['response']);
        }
        let tbFangjiandasaoPojo = {};
        tbFangjiandasaoPojo.fangjianId = fangjianId;
        tbFangjiandasaoPojo["urlList"] = zhaopiandizhiList;
        if (!confirm("确定添加接待室打扫记录！")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER+"shangchuanJiedaishiDasaojilu",
            data:JSON.stringify(tbFangjiandasaoPojo),
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
        window.location.href = "./zhongdui.html#/yingquguanlixin_xiaofangyuan_jiedaishidasaojilu";
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({ fileList }) => this.setState({ fileList })
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

    Chagejiedaishi(value) {
        this.setState({
            jeidaishi: value,
        });
    }


    componentDidMount() {
       this.getjiedaishiList();
    }

    render() {
        const jiedaishi = this.state.jiedaishiList.map(item => <Select.Option key={item['key']} value={item['id']}>{item['fangjianmingcheng']}</Select.Option>);
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        const uploadProps = {
            name: 'files',
            action: SERVER+"files/image",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const {fileList,jeidaishi} = this.state;
        return (
            <div>
                <label>选择接待室:</label>
                <Select style={{margin:10,width:200}} onChange={this.Chagejiedaishi.bind(this)} value={jeidaishi}>
                    {jiedaishi}
                </Select>
                <br/>
                <label>上传接待室打扫图片:</label>
                <br/>
                <br/>
                <br/>
                <Upload
                    {...uploadProps}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    style={{float:"left"}}
                    beforeUpload={this.beforeUpload}
                >
                    {uploadButton}
                </Upload>
                <br/>
                <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
