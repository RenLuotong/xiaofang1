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
		};
	}

	handleChange = ({fileList}) => {
        this.setState({
            fileList: fileList,
            response:fileList[0].response,
        });
    }

	toCreate() {
        const THE = this;
        let chanpinmingcheng = $("#chanpinmingcheng").val().trim();
        if (chanpinmingcheng == "") {
            message.error("请输入应用类型名称！");return;
        }
        let fileList = THE.state.fileList;
        if (fileList.length < 1) {
            message.error("请上传使用说明！");return;
        }
        let url = fileList[0]['response'];
        if (!confirm("确定添加此应用类型！")) {
            return;
        }
        $.ajax({
            type : 'POST',
            url : SERVER+"yingyongleixing/createLeixing?mingcheng="+chanpinmingcheng+"&shuoming="+url,
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("添加应用类型成功");
                THE.backPage();
            }
        });
	}

    backPage() {
        window.location.href = "./xitong.html#/xitongsheding_admin_appguanli";
    }

  	render() {

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

		return (
  			<div>
    			<div>
                    <label>应用类型名称:</label>
                    <Input size="default" id="chanpinmingcheng" style={{margin:10,width:200}}/>
                    <br/>
                    <Upload
                        {...props}
                        onChange={this.handleChange}
                    >
                        <Button><Icon type="upload" />上传使用说明</Button>
                    </Upload>
                    <br/>
                    <Button type="primary" icon="plus" onClick={this.toCreate.bind(this)}>添加</Button>
  				</div>
      		</div>
		);
  	}
}

export default App;
