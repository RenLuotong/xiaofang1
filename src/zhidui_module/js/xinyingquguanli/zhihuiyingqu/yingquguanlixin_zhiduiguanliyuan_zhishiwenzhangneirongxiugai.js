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
            showdizhi: 'none',
            infoList:[],
            id:this.props.match.params.id,
            neirong:''
        };
    }

    //获取文章内容详情
    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "tb-wenzhangs/wenzhangxiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if(data.data.leixing === '链接文章'){
                    THE.setState({
                        showdizhi: 'inline-block',
                    });
                }else{
                    THE.setState({
                        showdizhi: 'none',
                    });
                }
                if (data.data.gengxinshijian != null && data.data.gengxinshijian != "") {
                    data.data.gengxinshijian = moment(data.data.gengxinshijian).format('YYYY-MM-DD');
                }
                THE.setState({
                    infoList: data.data,
                    fileList: [{
                        uid: 0,
                        name: 'a.png',
                        status: 'done',
                        url: data.data['fengmian'],
                        response: data.data['fengmian'],
                    }],
                    neirong:data.data.neirong.replace(/<[^>]+>/g, "")
                });
                THE.richEditor();
            }
        });
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
        let infoList = this.state.infoList;
        let fileList = THE.state.fileList;
        let neirong = $("#editor").val().trim();
        let leixing = infoList.leixing;
        let fengmian = '';
        if (fileList.length > 0) {
            fengmian = fileList[0]['response'];
        }
        if (fengmian == '') {
            message.error("请上传图片！");return;
        }

        infoList.fengmian = fengmian;
        if (!confirm("确定修改此文章！")) {
            return;
        }
        let wenzhangAO = {};
        wenzhangAO["id"] = infoList.id;
        wenzhangAO["fengmian"] = infoList.fengmian;
        wenzhangAO["biaoti"] = infoList.biaoti;
        wenzhangAO["neirong"] = neirong;
        wenzhangAO["zuozhe"] = infoList.zuozhe;
        wenzhangAO["lianjie"] = infoList.lianjie;
        $.ajax({
            type:'post',
            url:SERVER+"tb-wenzhangs/xiugai?leixing="+leixing,
            data : JSON.stringify(wenzhangAO),
            dataType : 'json',
            contentType : "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("修改成功");
                THE.backPage();
            }
        });
    }

    wenzhangleixingChang(value) {
        const THE = this;
        let infoList = THE.state.infoList;
        infoList.leixing = value;
        if(value == '链接文章'){
            infoList.lianjie ='';
            THE.setState({
                showdizhi: 'inline-block',
            });
            THE.setState({
                infoList:infoList
            });
        }else{
            infoList.lianjie ='';
            THE.setState({
                showdizhi: 'none',
            });
            THE.setState({
                infoList:infoList
            });
        }
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="大队"){
            window.location.href = "./dadui.html#/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing/"+this.state.lanmubianhao;
        }
        else if (role=="中队") {
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing/"+this.state.lanmubianhao;
        }
        else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing/"+this.state.lanmubianhao;
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let infoList = this.state.infoList;
        if(name === 'biaoti2'){
            infoList.biaoti = value;
        }else{
            infoList[name] = value;
        }
        this.setState({
            infoList:infoList
        });
    }

    // neirongInputChange(event){
    //     console.log(event)
    //     const target = event.target;
    //     const value = target.value;
    //     console.log(value)
    //     this.setState({
    //         neirong:value
    //     });
    // }

    componentDidMount() {
        this.getInfo();
    }

    render() {
        let infoList = this.state.infoList;
        let  neirong = this.state.neirong;
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
                <Input size="default" id="biaoti2" name="biaoti2" style={{margin:10,width:200}} value={infoList['biaoti']} onChange={this.handleInputChange.bind(this)}/>
                <label>文章类型:</label>
                <Select style={{margin:10,width:200}} onChange={this.wenzhangleixingChang.bind(this)} value={infoList['leixing']}>
                    <Select.Option value="普通文章">普通文章</Select.Option>
                    <Select.Option value="链接文章">链接文章</Select.Option>
                </Select>
                <label style={{display: this.state.showdizhi}}>文章地址:</label>
                <Input size="default" id="lianjie" name="lianjie" style={{margin:10,width:200,display: this.state.showdizhi}}  value={infoList['lianjie']} onChange={this.handleInputChange.bind(this)}/>
                <br/>
                <label>作&#12288;&#12288;者:</label>
                <Input size="default" id="zuozhe" name="zuozhe" style={{margin:10,width:200}} value={infoList['zuozhe']} onChange={this.handleInputChange.bind(this)}/>
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
                <textarea id="editor" value={neirong}>
                   </textarea>
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
