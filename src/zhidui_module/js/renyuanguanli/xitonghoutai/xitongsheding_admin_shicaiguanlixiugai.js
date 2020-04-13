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
			id : this.props.match.params.id,
			shicaiInfo : [],
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

	shicaileixingChange(value) {
		let shicaiInfo = this.state.shicaiInfo;
		shicaiInfo['leixing'] = value;
		this.setState({
			shicaiInfo : shicaiInfo
		});
	}

	danweiChange(value) {
		let shicaiInfo = this.state.shicaiInfo;
		shicaiInfo['danwei'] = value;
		this.setState({
			shicaiInfo : shicaiInfo
		});
	}

	getInfo() {
		const THE = this;
		let id = THE.state.id;
		$.ajax({
			type : 'GET',
			url : SERVER + "jizhongcaigou/getShicaiXiangqing?id="+id,
			success : function (data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				THE.setState({
					shicaiInfo: data.data,
					fileList: [{
						uid: 0,
						name: 'shicai.png',
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
		let shicaiInfo = THE.state.shicaiInfo;
		let fileList = THE.state.fileList;
		let tupian = '';
		if (fileList.length > 0) {
			tupian = fileList[0]['response'];
		}
		if (!confirm("确定修改此食材！")) {
			return;
		}
		shicaiInfo.tupian = tupian;
		$.ajax({
			type : 'POST',
			url : SERVER + "jizhongcaigou/xiugai",
			data : JSON.stringify(shicaiInfo),
			dataType : 'json',
			contentType : "application/json",
			success : function(data){
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				message.success("修改成功");
				THE.backPage();
			},
		});
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let shicaiInfo = this.state.shicaiInfo;
		shicaiInfo[name] = value;
		this.setState({
			shicaiInfo : shicaiInfo
		});
	}


	backPage() {
		window.location.href = "./xitong.html#/xitongsheding_admin_shicaiguanli";
	}

	componentDidMount () {
		this.getInfo();
		this.getshicaileixingList();
		this.getshicaidanweigList();
    }

  	render() {

		let shicaileixingOptions = this.state.shicaileixingList.map(item =>
			<Select.Option key={item['key']} value={item['leixingmingcheng']}>{item['leixingmingcheng']}</Select.Option>
		);
		let danweiOptions = this.state.danweiList.map(item =>
			<Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
		);

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


		let info = this.state.shicaiInfo;

	    return (
	      	<div>
				<label>食材名称:</label>
				<Input size="default"  name="mingcheng" id="mingcheng" style={{margin:10,width:200}} value={info['mingcheng']} onChange={this.handleInputChange.bind(this)}/>
				<label>食材类型:</label>
				<Select style={{margin:10,width:200}} onChange={this.shicaileixingChange.bind(this)} value={info['leixing']}>
					{shicaileixingOptions}
				</Select>
				<label>单位:</label>
				<Select style={{margin:10,width:200}} onChange={this.danweiChange.bind(this)} value={info['danwei']}>
					{danweiOptions}
				</Select>
				<br/>
				<label>食材图片:</label>
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
