import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import {
	message,
	Upload,
	Modal,
	Popconfirm,
	Button,
	Table,
	Input,
	Select, Icon, Tabs
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
			yaopinInfo : [],
			danweiList : [],
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
					let obj = {};
					obj.danweimingcheng = data.data[i];
					obj.key = i;
					list.push(obj);
				}
				THE.setState({
					danweiList: list,
				});
			}
		});
	}

	danweiChang(value) {
		let yaopinInfo = this.state.yaopinInfo;
		yaopinInfo['danwei'] = value;
		this.setState({
			yaopinInfo : yaopinInfo
		});
	}

	getInfo() {
		const THE = this;
		let id = THE.state.id;
		$.ajax({
			type : 'GET',
			url : SERVER + "tb-yaopins/"+id,
			success : function (data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				THE.setState({
					yaopinInfo: data.data,
					fileList: [{
						uid: 0,
						name: 'yaopin.png',
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
		let yaopinbianhao = THE.state.yaopinInfo.yaopinbianhao;
		let yaopinmingcheng = THE.state.yaopinInfo.yaopinmingcheng;
		let danwei = THE.state.yaopinInfo.danwei;
		let id = THE.state.id;
		let fileList = THE.state.fileList;
		let tupian = '';
		if (fileList.length > 0) {
			tupian = fileList[0]['response'];
		}
		if (!confirm("确定修改此药品！")) {
			return;
		}
		$.ajax({
			type : 'POST',
			url : SERVER + "tb-yaopins/update?id="+id+"&danwei="+danwei+"&yaopinmingcheng="+yaopinmingcheng+"&tupian="+tupian+"&yaopinbianhao="+yaopinbianhao,
			data : JSON.stringify(),
			dataType : 'json',
			contentType : "application/json",
			success : function(data){
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				message.success("修改药品成功");
				THE.backPage();
			},
		});
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let yaopinInfo = this.state.yaopinInfo;
		yaopinInfo[name] = value;
		this.setState({
			yaopinInfo : yaopinInfo
		});
	}


	backPage() {
		window.location.href = "./zhidui.html#/xitongsheding_admin_yaopinguanli";
	}

	componentDidMount () {
		this.getInfo();
		this.getdanweiList();
    }

  	render() {

		let damweiOptions = this.state.danweiList.map(item =>
			<Select.Option key={item['key']} value={item['danweimingcheng']}>{item['danweimingcheng']}</Select.Option>
		);

		let info = this.state.yaopinInfo;
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
				<label>药品名称:</label>
				<Input size="default"  name="yaopinmingcheng" id="yaopinmingcheng" style={{margin:10,width:200}} value={info['yaopinmingcheng']} onChange={this.handleInputChange.bind(this)}/>
				{/*<label>单位:</label>*/}
				{/*<Select style={{margin:10,width:200}} onChange={this.danweiChang.bind(this)} value={info['danwei']}>*/}
				{/*	{damweiOptions}*/}
				{/*</Select>*/}
				<label>药品编号:</label>
				<Input size="default"  name="yaopinbianhao" id="yaopinbianhao" style={{margin:10,width:200}} value={info['yaopinbianhao']} onChange={this.handleInputChange.bind(this)}/>
				<br/>
				<label>药品图片:</label>
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
