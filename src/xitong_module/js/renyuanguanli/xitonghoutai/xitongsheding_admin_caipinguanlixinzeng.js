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

	caipinleixing = ''
	caipinleixingChange(value) {
		this.caipinleixing = value;
	}



	toCreate() {
		const THE = this;
		let caipinmingcheng = $("#caipinmingcheng").val().trim();
		if (caipinmingcheng == "") {
			message.error("请输入菜品名称！");
			return;
		}
		let caipinleixing = this.caipinleixing;
		if (caipinleixing == "") {
			message.error("请选择菜品类型！");
			return;
		}
		let fileList = THE.state.fileList;
		if (fileList.length === 0) {
			message.error("请上传菜品图片！");return;
		}
		let tupian = '';
		if (fileList.length > 0) {
			tupian = fileList[0]['response'];
		}
		if (!confirm("确定添加此菜品")) {
			return;
		}
		let tbCaipin = {};
		tbCaipin["mingcheng"] = caipinmingcheng;
		tbCaipin["leixing"] = caipinleixing;
		tbCaipin["tupian"] = tupian;
		$.ajax({
			type:'post',
			url:SERVER+"tb-caipins/create",
			data : JSON.stringify(tbCaipin),
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
		window.location.href = "./xitong.html#/xitongsheding_admin_caipinguanli";
	}

	componentDidMount () {
		this.getcaipinleixingList();
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

		let caipinleixingOptions = this.state.caipinleixingList.map(item =>
			<Select.Option key={item['key']} value={item['mingcheng']}>{item['mingcheng']}</Select.Option>
		);

	    return (
	      	<div>
				<label>菜品名称:</label>
				<Input size="default" id="caipinmingcheng" style={{margin:10,width:200}}/>
				<label>菜品类型:</label>
				<Select style={{margin:10,width:200}} onChange={this.caipinleixingChange.bind(this)}>
					{caipinleixingOptions}
				</Select>
				<br/>
				<label>上传菜品图片:</label>
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
