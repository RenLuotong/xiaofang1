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
import moment from "moment";

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
            jiluList: [],
            fileList: [],
            xiaodushijian:moment(new Date()),
        };
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
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
        // let xiaodushijian =moment(THE.state.xiaodushijian).format('YYYY-MM-DD HH:mm:ss');
        let fileList = THE.state.fileList;
        if (fileList.length === 0) {
            message.error("请上传消毒图片！");return;
        }
        let zhaopiandizhiList = [];
        for (let i = 0; fileList.length > i; i++) {
            zhaopiandizhiList.push(fileList[i]['response']);
        }
        let xiaodujiluAO = {};
        xiaodujiluAO["urlList"] = zhaopiandizhiList;
        // xiaodujiluAO["xiaodushijian"]=xiaodushijian;
        if (!confirm("确定添加消毒记录！")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER+"zengjiaxiaodujilu",
            data:JSON.stringify(xiaodujiluAO),
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
        window.location.href = "./zhongdui.html#/yingquguanlixin_houchurenyuan_xiaodujilu";
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
                        //message.error('请上传JPG格式的图片!');
                   // }
                    const isWidth = width < 1024;
                    const isHeight = height < 1024;
                   // if (!isWidth || !isHeight) {
                       // message.error('图片尺寸必须小于1024*1024，图片大小必须小于200KB！');
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

    componentDidMount() {
    }

    render() {
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
        const {fileList} = this.state;
        return (
            <div>
                    {/*<label>上传消毒时间:</label>&nbsp;&nbsp;*/}
                    {/*    <DatePicker*/}
                    {/*        showTime={true}*/}
                    {/*        defaultValue={this.state.xiaodushijian}*/}
                    {/*        disabled*/}
                    {/*        placeholder="消毒时间"*/}
                    {/*        format="YYYY-MM-DD HH:mm:ss"*/}
                    {/*        onChange={this.onStartChange}*/}
                    {/*        style={{width:200}}*/}
                    {/*    />*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                <label>上传消毒图片:</label>
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
