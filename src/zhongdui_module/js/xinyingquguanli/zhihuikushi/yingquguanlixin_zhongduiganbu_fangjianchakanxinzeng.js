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
            previewVisible: false,
            previewImage: '',
            fileList: [],
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

    fangjianleixing=''
    fangjianChange(value){
        this.fangjianleixing=value;
    }

    shifou=''
    shifouChange(value){
        this.shifou=value;
    }

    toCreate() {
        const THE = this;
        let fangjianleixing = this.fangjianleixing;
        let shifou = this.shifou;
        if (fangjianleixing == "") {
            message.error("请选择房间类型！");return;
        }
        let fangjianmingcheng = $("#fangjianmingcheng").val().trim();
        if (fangjianmingcheng == "") {
            message.error("请输入房间名称！");return;
        }
        if (shifou == "") {
            message.error("请选择是否是智能家居房间！");return;
        }
        let fileList = THE.state.fileList;
        if (fileList.length === 0) {
            message.error("请上传房间图片！");return;
        }
        let tupian = '';
        if (fileList.length > 0) {
            tupian = fileList[0]['response'];
        }
        let fangjianmiaoshu = $("#fangjianmiaoshu").val().trim();
        if (fangjianmiaoshu == "") {
            message.error("请输入房间描述！");return;
        }
        if (!confirm("确定添加此房间！")) {
            return;
        }
        let tbFangjianPojo = {};
        tbFangjianPojo["fangjianmingcheng"] = fangjianmingcheng;
        tbFangjianPojo["fangjianmiaoshu"] = fangjianmiaoshu;
        tbFangjianPojo["fangjianleixing"] = fangjianleixing;
        tbFangjianPojo["shifouzhinengjiajufangjian"] = shifou;
        tbFangjianPojo["fangjiantupian"] = tupian;
        $.ajax({
            type:'post',
            url:SERVER+"tianjiazhinengsuofangjian",
            data : JSON.stringify(tbFangjianPojo),
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
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhongduiganbu_fangjianchakan";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zhongduiganbu_fangjianchakan";
        }else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zhongduiganbu_fangjianchakan";
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
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        return (
            <div>
                <label>房间类型&#12288;&#12288;:</label>
                <Select style={{margin:10,width:200}} onChange={this.fangjianChange.bind(this)}>
                    <Select.Option value="JIASHUJIEDAISHI">家属接待室房间</Select.Option>
                    <Select.Option value="ZHINENGSUOFANGJIAN">智能门锁房间</Select.Option>
                    <Select.Option value="KAOQINJIFANGJIAN">考勤机房间</Select.Option>
                    <Select.Option value="SUSHE">宿舍</Select.Option>
                </Select>
                <label>房间名称:</label>
                <Input size="default" id="fangjianmingcheng" style={{margin:10,width:200}}/>
                <label>是否智能家居房间:</label>
                <Select style={{margin:10,width:200}} onChange={this.shifouChange.bind(this)}>
                    <Select.Option value="SHI">是</Select.Option>
                    <Select.Option value="FOU">否</Select.Option>
                </Select>
                <br/>
                <label>上传房间图片:</label>
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
                <label>房间描述:</label>
                <br/>
                <TextArea autosize={{minRows:3}} id="fangjianmiaoshu" style={{width:500}}/>
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
