import React from 'react';
import ReactDOM from 'react-dom';
import {
    Input,
    Button,
    message, Upload, Modal, Icon, InputNumber
} from 'antd';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
		};
	}

	toCreate() {
        const THE = this;
        let zhuangbeileibiemingcheng = $("#qymc_ipt").val().trim();
        let zhuangbeileibiemiaoshu = $("#frdb_ipt").val().trim();
        let paixu = $("#paixu").val().trim();
        let fileList = THE.state.fileList;
        let zhuangbeileibietupian = '';
        if (fileList.length > 0) {
            zhuangbeileibietupian = fileList[0]['response'];
        }
        if (zhuangbeileibiemingcheng == "") {
            message.error("请输入装备类别名称！");return;
        }
        if (!confirm("确定添加此装备类别！")) {
            return;
        }
        let obj = {};
        obj["mingcheng"] = zhuangbeileibiemingcheng;
        obj["miaoshu"] = zhuangbeileibiemiaoshu;
        obj["paixu"] = paixu;
        obj["tupian"] = zhuangbeileibietupian;
        $.ajax({
            type : 'POST',
            url : SERVER+"xzzhuangbeileibie",
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("添加装备类别成功");
                THE.backPage();
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

    backPage() {
        window.location.href = "./xitong.html#/xitongsheding_admin_wuzileibieshezhi";
    }

  	render() {

        let uploadProps = {
            name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList,guigefileList } = this.state;
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
                    <Input size="default" id="qymc_ipt" style={{margin:10,width:200}}/>
                    <label>装备类别描述:</label>
                    <Input size="default" id="frdb_ipt" style={{margin:10,width:200}}/>
                    <label>装备类别排序:</label>
                    <InputNumber min={1} id="paixu" style={{margin:5,width:200}}/>
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
                    <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
  				</div>
      		</div>
		);
  	}
}

export default App;
