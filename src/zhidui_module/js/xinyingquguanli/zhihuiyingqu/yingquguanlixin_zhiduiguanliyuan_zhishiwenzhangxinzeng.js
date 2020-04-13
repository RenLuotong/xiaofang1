import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import moment from 'moment';
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
    Popover, Upload
} from 'antd';
import Simditor from "simditor";


const { TextArea } = Input;

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
            //显示链接地址
            showdizhi: 'none',
            previewVisible: false,
            previewImage: '',
            fileList: [],
        };
    }
    richEditor() {
        var editor = new Simditor({
            textarea: $('#editor'),
            toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', 'ol', 'ul', 'blockquote', 'code', 'table','indent', 'outdent', 'alignment', 'hr', 'image'],
            upload : {
                url : SERVER+"files", //文件上传的接口地址
                params: {
                    Authorization:"Bearer "+sessionStorage.getItem("token")
                },
                fileKey: 'fileDataFileName', //server端获取文件数据的參数名
                connectionCount: 3,
                leaveConfirm: '正在上传文件'
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

    toCreate() {
        const THE = this;
        let lanmumingcheng = $("#lanmumingcheng").val().trim();
        if (lanmumingcheng == "") {
            message.error("请输入栏目名称！");return;
        }
        let lanmuleixing = this.lanmuleixing;
        if (lanmuleixing == ""||lanmuleixing == null||lanmuleixing ==  "undefined") {
            message.error("请选择栏目类型！");return;
        }
        let lianjiedizhi = $("#lianjiedizhi").val().trim();
        if (lianjiedizhi == "" && THE.state.showdizhi === 'inline-block') {
            message.error("请输入链接地址！");return;
        }
        let fileList = THE.state.fileList;
        let fengmian = '';
        if (fileList.length > 0) {
            fengmian = fileList[0]['response'];
        }
        let lanmumiaoshu = $("#lanmumiaoshu").val().trim();
        if (lanmumiaoshu == "") {
            message.error("请输入栏目描述！");return;
        }
        if (!confirm("确定添加此栏目！")) {
            return;
        }
        let obj = {};
        obj.mingcheng = lanmumingcheng;
        obj.miaoshu = lanmumiaoshu;
        obj.lianjie = lianjiedizhi;
        obj.tubiao = fengmian;
        $.ajax({
            type:'post',
            url:SERVER+"tb-lanmus/xinzeng?leixing="+lanmuleixing,
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
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
    lanmuleixing=''
    lanmuleixingChang(value) {
        const THE = this;
        if(value == 'Link'){
            THE.setState({
                showdizhi: 'inline-block',
            });
        }else{
            THE.setState({
                showdizhi: 'none',
            });
        }
        this.lanmuleixing = value;
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="大队"){
            window.location.href = "./dadui.html#/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang";
        }
        else if (role=="中队") {
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang";
        }
        else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang";
        }
    }

    componentDidMount() {
    }

    render() {
        let uploadProps = {
            name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图标</div>
            </div>
        );
        return (
            <div>
                <label>栏目名称:</label>
                <Input size="default" id="lanmumingcheng" style={{margin:10,width:200}}/>
                <label>栏目类型:</label>
                <Select style={{margin:10,width:200}} onChange={this.lanmuleixingChang.bind(this)}>
                    <Select.Option value="Ordinary">普通栏目</Select.Option>
                    <Select.Option value="Link">链接栏目</Select.Option>
                </Select>
                <label style={{display: this.state.showdizhi}}>链接地址:</label>
                <Input size="default" id="lianjiedizhi" style={{margin:10,width:200,display: this.state.showdizhi}}/>
                <br/>
                <label>上传图标:</label>
                <br/>
                <br/>
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
                <br/>
                <label>栏目描述:</label>
                <br/>
                <TextArea autosize={{minRows:3}} id="lanmumiaoshu" style={{width:500}}/>
                <br/>
                <br/>
                <br/>
                <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
