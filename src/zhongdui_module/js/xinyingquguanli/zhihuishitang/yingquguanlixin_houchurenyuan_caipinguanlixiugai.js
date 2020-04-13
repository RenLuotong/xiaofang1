import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import {
    message,
    Popconfirm,
    Button,
    Table,
    Input,
    Select, Icon, Upload, Modal
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
                    <Route exact path = {this.props.match.path} component = {App} />
                </Switch>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            caipinInfo : [],
            caipinleixingList: [],
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

    getcaipinleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tbCaipinLeixing/findAllList",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    list.push(data.data[i]);
                }
                THE.setState({
                    caipinleixingList: list,
                });
            }
        });
    }

    caipinleixingChange(value) {
        let caipinInfo = this.state.caipinInfo;
        caipinInfo['leixing'] = value;
        this.setState({
            caipinInfo : caipinInfo
        });
    }

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "tb-caipins/"+id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    caipinInfo: data.data,
                    fileList: [{
                        uid: 0,
                        name: 'caipin.png',
                        status: 'done',
                        url: data.data['tupian'],
                        response: data.data['tupian'],
                    }],
                });
            }
        });
    }



    toUpdate() {
        const THE = this;
        let caipinInfo = THE.state.caipinInfo;
        let fileList = THE.state.fileList;
        let tupian = '';
        if (fileList.length > 0) {
            tupian = fileList[0]['response'];
        }
        if (!confirm("确定修改此菜品！")) {
            return;
        }
        caipinInfo["tupian"]=tupian;
        $.ajax({
            type : 'POST',
            url : SERVER + "tb-caipins/update",
            data : JSON.stringify(caipinInfo),
            dataType : 'json',
            contentType : "application/json",
            success : function(data){
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("修改菜品成功");
                THE.backPage();
            },
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let caipinInfo = this.state.caipinInfo;
        caipinInfo[name] = value;
        this.setState({
            caipinInfo : caipinInfo
        });
    }


    backPage() {
        window.location.href = "./zhongdui.html#/yingquguanlixin_houchurenyuan_caipinguanli";
    }

    componentDidMount () {
        this.getInfo();
        this.getcaipinleixingList();
    }

    render() {

        let caipinleixingOptions = this.state.caipinleixingList.map(item =>
            <Select.Option key={item['key']} value={item['mingcheng']}>{item['mingcheng']}</Select.Option>
        );

        let info = this.state.caipinInfo;
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

        return (
            <div>
                <label>菜品名称:</label>
                <Input size="default"  name="mingcheng" id="mingcheng" style={{margin:10,width:200}} value={info['mingcheng']} onChange={this.handleInputChange.bind(this)}/>
                <label>菜品类型:</label>
                <Select style={{margin:10,width:200}} onChange={this.caipinleixingChange.bind(this)} value={info['leixing']}>
                    {caipinleixingOptions}
                </Select>
                <br/>
                <label>菜品图片:</label>
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
                <Button type="primary" icon="check" onClick={this.toUpdate.bind(this)}>保存</Button>
            </div>
        );
    }
}

export default Appmain;
