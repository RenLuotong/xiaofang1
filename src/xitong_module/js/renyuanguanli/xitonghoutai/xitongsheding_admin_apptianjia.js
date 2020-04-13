/*APP添加*/
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Select,
    Upload,
    Icon,
    Input,
    Button,
    message, Modal
} from 'antd';

const { TextArea } = Input;

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			biaozhiwei: null,
			leixing: null,
            fileList: [],
            response:'',
            previewVisible: false,
            previewImage: '',
            fileList2: [],
            yingyongList:[]
		};
	}

    getyingyongleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "yingyongleixing/leixingList?page=0&size=10000",
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
                    yingyongList: list,
                });
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
    handleChange2 = ({fileList}) => {
        this.setState({
            fileList2: fileList,
        });
    }

	handleChange = ({fileList}) => {
        this.setState({
            fileList: fileList,
            response:fileList[0].response,
        });
    }

	toCreate() {
        const THE = this;
        let banbenhao = $("#banbenhao").val().trim();
        let gengxinmiaoshu = $("#gengxinmiaoshu").val().trim();
        let leixing = this.state.leixing;
        let fileList = THE.state.fileList;
        if (fileList.length < 1) {
            message.error("请上传应用！");return;
        }
        let url = fileList[0]['response'];
        if (leixing == ""||leixing == null) {
            message.error("请选择应用类型！");return;
        }
        if (banbenhao == "") {
            message.error("请输入版本号！");return;
        }
        let biaozhiwei = this.state.biaozhiwei;
        if (biaozhiwei == ""||biaozhiwei == null) {
            message.error("请选择是否强制更新！");return;
        }

        let fileList2 = THE.state.fileList2;
        if (fileList2.length < 1) {
            message.error("请上传二维码！");return;
        }
        let erweima = fileList2[0]['response'];

        if (!confirm("确定添加此应用！")) {
            return;
        }
        let obj = {};
        obj['leixingId'] = leixing;
        obj["banbenhao"] = banbenhao;
        obj['biaozhiwei'] = biaozhiwei;
        obj['erweima'] = erweima;
        obj['url'] = url;
        obj['gengxinmiaoshu'] = gengxinmiaoshu;
        $.ajax({
            type : 'POST',
            url : SERVER+"tianjiaYingyong",
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("添加应用成功");
                THE.backPage();
            }
        });
	}

	biaozhiweiChange(value) {
		this.setState({
			biaozhiwei : value
		})
	}

	leixingChange(value) {
		this.setState({
			leixing : value
		})
	}

    backPage() {
        window.location.href = "./xitong.html#/xitongsheding_admin_appguanli";
    }

    componentDidMount () {
        this.getyingyongleixingList();
    }

  	render() {

        let yingyongOptions = this.state.yingyongList.map(item =>
            <Select.Option key={item['key']} value={item['id']}>{item['mingcheng']}</Select.Option>
        );

  		const props = {
		  	name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
		  	onChange(info) {
//		    	if (info.file.status !== 'uploading') {
//		      		console.log(info.file, info.fileList);
//		    	}
		    	if (info.file.status === 'done') {
		      		message.success(`${info.file.name} 文件上传成功`);
		    	} else if (info.file.status === 'error') {
		      		message.error(`${info.file.name} 文件上传失败`);
		    	}
		  	},
		};

        let uploadProps = {
            name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList2 } = this.state;

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

		return (
  			<div>
    			<div>
    				<Upload
    					{...props}
    					onChange={this.handleChange}
    				>
				    	<Button><Icon type="upload" />上传应用</Button>
				  	</Upload>
                    <label>应用类型&#12288;&#12288;:</label>
                    <Select onChange={this.leixingChange.bind(this)} style={{margin:10,width:200}}>
                        {yingyongOptions}
					</Select>
                    <label>应用上传链接:</label>
                    <Input size="default" id="shangchuanlianjie" style={{margin:10,width:300}} value={this.state.response} readOnly={true}/>
                    <br/>
                    <label>版本号&#12288;&#12288;&#12288;:</label>
                    <Input size="default" id="banbenhao" style={{margin:10,width:200}}/>
                    <label>是否强制更新:</label>
                    <Select onChange={this.biaozhiweiChange.bind(this)} style={{margin:10,width:300}}>
						<Select.Option value="是">是</Select.Option>
		      			<Select.Option value="否">否</Select.Option>
					</Select>
					<br/>
                    <label>二维码上传&#12288;:</label>
                    <br/>
                    <div>
                        <Upload
                            {...uploadProps}
                            listType="picture-card"
                            fileList={fileList2}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange2}
                        >
                            {fileList2.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                        <div style={{clear:"both"}}></div>
                    </div>
                    <br/>
                    <label>应用更新描述:</label>
                    <br/>
                    <TextArea autosize={{minRows:3}} id="gengxinmiaoshu" name="gengxinmiaoshu" style={{width:1000}} />
                    <br/>
                    <br/>
                    <Button type="primary" icon="plus" onClick={this.toCreate.bind(this)}>添加</Button>
  				</div>
      		</div>
		);
  	}
}

export default App;
