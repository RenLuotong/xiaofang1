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
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';


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
            lanmubianhao:this.props.match.params.bianhao,
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.toCreate();
            }
        });
    }

    toCreate() {
        const THE = this;
        let lanmubianhao=THE.state.lanmubianhao;
        let wenzhangmingcheng = $("#wenzhangmingcheng").val().trim();
        if (wenzhangmingcheng == "") {
            message.error("请输入文章名称！");return;
        }
        let zuozhe = $("#zuozhe").val().trim();
        if (zuozhe == "") {
            message.error("请输入文章作者！");return;
        }
        let wenzhangmiaoshu = $("#editor").val().trim();
        if (wenzhangmiaoshu == "") {
            message.error("请输入文章描述！");return;
        }
        let fileList = THE.state.fileList;
        let fengmian = '';
        if (fileList.length > 0) {
            fengmian = fileList[0]['response'];
        }
        if (!confirm("确定添加此文章！")) {
            return;
        }
        let wenzhangAO = {};
        wenzhangAO["fengmian"] = fengmian;
        wenzhangAO["biaoti"] = wenzhangmingcheng;
        wenzhangAO["lanmubianhao"] = lanmubianhao;
        wenzhangAO["neirong"] = wenzhangmiaoshu;
        wenzhangAO["zuozhe"] = zuozhe;
        $.ajax({
            type:'post',
            url:SERVER+"tb-wenzhangs/xinzeng",
            data : JSON.stringify(wenzhangAO),
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

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="大队"){
            window.location.href = "./dadui.html#/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang/yingquguanlixin_zhishiguanliyuan_zhishiwenzhangxiangqing/"+this.state.lanmubianhao;
        }
        else if (role=="中队") {
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang/yingquguanlixin_zhishiguanliyuan_zhishiwenzhangxiangqing/"+this.state.lanmubianhao;
        }
        else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang/yingquguanlixin_zhishiguanliyuan_zhishiwenzhangxiangqing/"+this.state.lanmubianhao;
        }
    }

    componentDidMount() {
        this.richEditor();
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
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        return (

            <div>
                <label>文章名称:</label>
                <Input size="default" id="wenzhangmingcheng" style={{margin:10,width:200}}/>
                <br/>
                <label>作&#12288;&#12288;者:</label>
                <Input size="default" id="zuozhe" style={{margin:10,width:200}}/>
                <br/>
                <label>上传封面:</label>
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
                <label>文章内容:</label>
                <br/>
                   <textarea id="editor" placeholder="文章内容"></textarea>
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
