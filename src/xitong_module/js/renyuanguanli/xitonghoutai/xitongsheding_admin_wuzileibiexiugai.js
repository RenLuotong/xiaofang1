import React from 'react';
import ReactDOM from 'react-dom';
import {
    Input,
    Button,
    message, Upload, Modal, Icon,InputNumber
} from 'antd';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			id : this.props.match.params.id,
			wuzileibieInfo : [],
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

	getWuzileibieInfo() {
		const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "xqzhuangbeileibie?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    wuzileibieInfo: data.data,
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

	toUpdate() {
		const THE = this;
        let wuzileibieInfo = THE.state.wuzileibieInfo;
        let fileList = THE.state.fileList;
        let zhuangbeileibietupian = '';
        if (fileList.length > 0) {
            zhuangbeileibietupian = fileList[0]['response'];
        }
        wuzileibieInfo.tupian = zhuangbeileibietupian;
        $.ajax({
            type : 'POST',
            url : SERVER + "xgzhuangbeileibie",
            data : JSON.stringify(wuzileibieInfo),
            dataType : 'json',
            contentType : "application/json",
            success : function(data){
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("修改装备类别成功");
                THE.backPage();
            },
        });
	}

	backPage() {
		window.location.href = "./xitong.html#/xitongsheding_admin_wuzileibieshezhi";
	}

	componentDidMount () {
		this.getWuzileibieInfo();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let wuzileibieInfo = this.state.wuzileibieInfo;
        wuzileibieInfo[name] = value;
        this.setState({
            wuzileibieInfo : wuzileibieInfo
        });
    }

    paixuInputChange(value) {
        let wuzileibieInfo = this.state.wuzileibieInfo;
        wuzileibieInfo.paixu = value;
        this.setState({
            wuzileibieInfo : wuzileibieInfo
        });
    }

  	render() {

        let info = this.state.wuzileibieInfo;

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
                <div className="ant-upload-text">Upload</div>
            </div>
        );

		return (
  			<div>
    			<div>
                	<label>装备类别名称:</label>
                    <Input size="default" disabled id="qymc_ipt" name="mingcheng" style={{margin:10,width:200}} value={info['mingcheng']} />
                    <label>装备类别描述:</label>
                    <Input size="default" id="zblbms_ipt" name="miaoshu" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['miaoshu']}/>
                    <label>装备类别排序:</label>
                    <InputNumber min={1} size="default" id="paixu" name="paixu" onChange={this.paixuInputChange.bind(this)} style={{margin:10,width:200}} value={info['paixu']}/>
                    <br/>
                    <label>装备类别图片:</label>
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
      		</div>
		);
  	}
}

export default App;
