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
			shicaileixingList: [],
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


	getshicaileixingList() {
		const THE = this;
		$.ajax({
			type:'GET',
			url: SERVER + "chaxunshicaileixing?page=0&size=10000",
			success: function (data) {
				let list = [];
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				for(let i = 0;i<data.data.content.length;i++){
					list.push(data.data.content[i]);
				}
				THE.setState({
					shicaileixingList: list,
				});
			}
		});
	}

	getshicaidanweigList() {
		const THE = this;
		$.ajax({
			type:'GET',
			url: SERVER + "jizhongcaigou/huoqushicaidanwei",
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

	shicaileixing = ''
	shicaileixingChange(value) {
		this.shicaileixing = value;
	}

	danwei = ''
	danweiChange(value) {
		this.danwei = value;
	}


	toCreate() {
		const THE = this;
		let shicaimingcheng = $("#shicaimingcheng").val().trim();
		if (shicaimingcheng == "") {
			message.error("请输入食材名称！");
			return;
		}
		let shicaileixing = this.shicaileixing;
		if (shicaileixing == "") {
			message.error("请选择食材类型！");
			return;
		}
		let danwei = this.danwei;
		if (danwei  == "") {
			message.error("请选择单位！");
			return;
		}
		let fileList = THE.state.fileList;
		if (fileList.length === 0) {
			message.error("请上传食材图片！");return;
		}
		let tupian = '';
		if (fileList.length > 0) {
			tupian = fileList[0]['response'];
		}
		if (!confirm("确定添加此食材")) {
			return;
		}
		let caigouShicaiVM = {};
		caigouShicaiVM["mingcheng"] = shicaimingcheng;
		caigouShicaiVM["leixing"] = shicaileixing;
		caigouShicaiVM["danwei"] = danwei;
		caigouShicaiVM["tupian"]=tupian;
		$.ajax({
			type:'post',
			url:SERVER+"jizhongcaigou/xinzeng",
			data : JSON.stringify(caigouShicaiVM),
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
		window.location.href = "./xitong.html#/xitongsheding_admin_shicaiguanli";
	}

	componentDidMount () {
		this.getshicaileixingList();
		this.getshicaidanweigList();
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

		let shicaileixingOptions = this.state.shicaileixingList.map(item =>
			<Select.Option key={item['key']} value={item['leixingmingcheng']}>{item['leixingmingcheng']}</Select.Option>
		);
		let danweiOptions = this.state.danweiList.map(item =>
			<Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
		);

	    return (
	      	<div>
				<label>食材名称:</label>
				<Input size="default" id="shicaimingcheng" style={{margin:10,width:200}}/>
				<label>食材类型:</label>
				<Select style={{margin:10,width:200}} onChange={this.shicaileixingChange.bind(this)}>
					{shicaileixingOptions}
				</Select>
				<label>单位:</label>
				<Select style={{margin:10,width:200}} onChange={this.danweiChange.bind(this)}>
					{danweiOptions}
				</Select>
				<br/>
				<label>上传食材图片:</label>
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
