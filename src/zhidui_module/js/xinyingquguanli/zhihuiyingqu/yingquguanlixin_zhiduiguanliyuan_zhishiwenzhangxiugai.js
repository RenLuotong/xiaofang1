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

const { TextArea } = Input;

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
			lanmuInfo : [],
            showdizhi: 'none',
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

	getInfo() {
		const THE = this;
		let id = THE.state.id;
		$.ajax({
			type : 'GET',
			url : SERVER + "tb-lanmus/lanmuxiangqing?id="+id,
			success : function (data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
                if(data.data.leixing == '链接栏目'){
                    THE.setState({
                        showdizhi: 'inline-block',
                    });
                    data.data.leixing = 'Link';
                }else{
                    THE.setState({
                        showdizhi: 'none',
                    });
                    data.data.leixing = 'Ordinary';
                }
				THE.setState({
                    lanmuInfo: data.data,
					fileList: [{
						uid: 0,
						name: 'shicai.png',
						status: 'done',
						url: data.data['tubiao'],
						response: data.data['tubiao'],
					}],
				});
			}
		});
	}



	toUpdate() {
		const THE = this;
		let lanmuInfo = THE.state.lanmuInfo;
		let fileList = THE.state.fileList;
		let tubiao = '';
		if (fileList.length > 0) {
            tubiao = fileList[0]['response'];
		}
		if (!confirm("确定修改此栏目！")) {
			return;
		}
        lanmuInfo.tubiao = tubiao;
		let leixing = lanmuInfo.leixing;
		$.ajax({
			type : 'POST',
			url : SERVER + "tb-lanmus/xiugai?leixing="+leixing,
			data : JSON.stringify(lanmuInfo),
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
		let lanmuInfo = this.state.lanmuInfo;
        lanmuInfo[name] = value;
		this.setState({
            lanmuInfo : lanmuInfo
		});
	}

    lanmuleixingChang(value) {
        const THE = this;
        if(value == 'Link'){
            THE.setState({
                showdizhi: 'inline-block',
            });
        }else{
            THE.setState({
                showdizhi: 'none',
            });
        }
        let lanmuInfo = this.state.lanmuInfo;
        lanmuInfo.lianjie = '';
        lanmuInfo['leixing'] = value;
        THE.setState({
            lanmuInfo : lanmuInfo
        });
    }


    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="大队"){
            window.location.href = "./dadui.html#/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang";
        }
        else if (role=="中队") {
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang";
        }
        else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang";
        }
    }

	componentDidMount () {
		this.getInfo();
    }

  	render() {

		let uploadProps = {
			name: 'files',
			action: SERVER+"files",
			headers: {
				Authorization:"Bearer "+sessionStorage.getItem("token")
			},
		};
		const { previewVisible, previewImage, fileList} = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">上传图片</div>
			</div>
		);


		let info = this.state.lanmuInfo;

	    return (
	      	<div>
				<label>栏目名称:</label>
				<Input size="default" id="mingcheng" name="mingcheng" style={{margin:10,width:200}} value={info['mingcheng']} onChange={this.handleInputChange.bind(this)}/>
				<label>栏目类型:</label>
				<Select style={{margin:10,width:200}} onChange={this.lanmuleixingChang.bind(this)} value={info['leixing']}>
					<Select.Option value="Ordinary">普通栏目</Select.Option>
					<Select.Option value="Link">链接栏目</Select.Option>
				</Select>
				<label style={{display: this.state.showdizhi}}>链接地址:</label>
				<Input size="default" id="lianjie"  name="lianjie"  value={info['lianjie']} onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200,display: this.state.showdizhi}}/>
				<br/>
				<label>栏目图标:</label>
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
				<br/>
				<label>栏目描述:</label>
				<br/>
				<TextArea autosize={{minRows:3}} id="miaoshu" name="miaoshu" value={info['miaoshu']} style={{width:500}} onChange={this.handleInputChange.bind(this)}/>
				<br/>
				<br/>
				<br/>
				<Button type="primary" icon="check" onClick={this.toUpdate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default Appmain;
