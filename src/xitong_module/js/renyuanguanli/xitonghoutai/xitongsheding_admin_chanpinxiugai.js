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
            id : this.props.match.params.id,
            info:{}
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
        let id = THE.state.id;
        let info = this.state.info;
        let chanpinmingcheng = info.mingcheng;
        if (chanpinmingcheng == "") {
            message.error("请输入应用类型名称！");return;
        }
        let fileList = THE.state.fileList;
        if (fileList.length < 1) {
            message.error("请上传使用说明！");return;
        }
        let url = fileList[0]['response'];
        if (!confirm("确定修改此应用类型！")) {
            return;
        }
        $.ajax({
            type : 'POST',
            url : SERVER+"yingyongleixing/updateLeixing?mingcheng="+chanpinmingcheng+"&shuoming="+url+"&id="+id,
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

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "yingyongleixing/getLeixing?id="+id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    info: data.data,
                    fileList: [{
                        uid: 0,
                        name: 'yingyong.doc',
                        status: 'done',
                        url: data.data['shuoming'],
                        response: data.data['shuoming'],
                    }],
                });
            }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let info = this.state.info;
        info[name] = value;
        this.setState({
            info : info
        });
    }

    backPage() {
        window.location.href = "./xitong.html#/xitongsheding_admin_appguanli";
    }

    componentDidMount () {
        this.getInfo();
    }

  	render() {

        let info = this.state.info;

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
                    <Input size="default" id="mingcheng" name="mingcheng" style={{margin:10,width:200}} value={info['mingcheng']} onChange={this.handleInputChange.bind(this)}/>
                    <br/>
                    <Upload
                        {...props}
                        onChange={this.handleChange}
                    >
                        <Button><Icon type="upload" />更改使用说明</Button>
                    </Upload>
                    <br/>
                    <Button type="primary" icon="plus" onClick={this.toCreate.bind(this)}>添加</Button>
  				</div>
      		</div>
		);
  	}
}

export default App;
