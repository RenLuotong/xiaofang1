import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import {
	Upload,
	message,
	Popconfirm,
	Button,
	Table,
	Input,
	Select, Icon, Modal
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
			danweiList: [],
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
	/*handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.toCreate();
			}
		});
	}*/
	getdanweiList() {
		const THE = this;
		$.ajax({
			type:'GET',
			url: SERVER + "tb-yaopins/huoqudanwei",
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
					danweiList: list,
				});
			}
		});
	}

	danwei = ''
	danweiChang(value) {
		this.danwei = value;
	}



	toCreate() {
		const THE = this;
		let yaopinmingcheng = $("#yaopinmingcheng").val().trim();
		if (yaopinmingcheng == "") {
			message.error("请输入药品名称！");
			return;
		}
		let yaopinbianhao=$("#yaopinbianhao").val().trim();
		if (yaopinbianhao == ""){
			message.error("请输入药品编号！");
			return;
		}
		let danwei = this.danwei;
		if (danwei == "") {
			message.error("请选择单位！");
			return;
		}
		let fileList = THE.state.fileList;
		if (fileList.length === 0) {
			message.error("请上传药品图片！");return;
		}
		let tupian = '';
		if (fileList.length > 0) {
			tupian = fileList[0]['response'];
		}
		if (!confirm("确定添加此药品")) {
			return;
		}

		let tbYaopin = {};
		tbYaopin["yaopinmingcheng"] = yaopinmingcheng;
		tbYaopin["danwei"] = danwei;
		tbYaopin["tupian"]=tupian;
		tbYaopin["yaopinbianhao"]=yaopinbianhao;
		$.ajax({
			type:'post',
			url:SERVER+"tb-yaopins",
			data : JSON.stringify(tbYaopin),
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
		window.location.href = "./zhidui.html#/xitongsheding_admin_yaopinguanli";
	}

	componentDidMount () {
		this.getdanweiList();
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
		let damweiOptions = this.state.danweiList.map(item =>
			<Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
		);

	    return (
	      	<div>
				<label>药品名称&#12288;&#12288;:</label>
				<Input size="default" id="yaopinmingcheng" style={{margin:10,width:200}}/>
				<label>药品编号:</label>
				<Input size="default" id="yaopinbianhao" style={{margin:10,width:200}}/>
				<label>单位:</label>
				<Select style={{margin:10,width:200}} onChange={this.danweiChang.bind(this)}>
					{damweiOptions}
				</Select>
				<br/>
				<label>上传药品图片:</label>
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
				<Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default Appmain;
