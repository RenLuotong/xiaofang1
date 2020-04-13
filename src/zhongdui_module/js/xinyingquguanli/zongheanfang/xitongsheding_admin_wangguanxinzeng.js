import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import {
	message,
	Popconfirm,
  	Button,
  	Table,
	Input,
	Select
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
			yingquList: [],
		};
	}


	getyingquList() {
		const THE = this;
		$.ajax({
			type:'GET',
			url: SERVER + "yingquxinxiliebiao",
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
					yingquList: list,
				});
			}
		});
	}

	yingqu = ''
	yingquChang(value) {
		this.yingqu = value;
	}



	toCreate() {
		const THE = this;
		let deviceId = $("#deviceId").val().trim();
		if (deviceId == "") {
			message.error("请输入网关账号！");
			return;
		}
		let devicePasswd = $("#devicePasswd").val().trim();
		if (devicePasswd == "") {
			message.error("请输入网关密码！");
			return;
		}
		let yingqu = this.yingqu;
		if (yingqu == "") {
			message.error("请选择营区！");
			return;
		}
		if (!confirm("确定添加此网关")) {
			return;
		}
		$.ajax({
			type:'post',
			url:SERVER+"boundshebei/tianjiawangguan?yingqubianhao="+yingqubianhao+"&deviceId="+deviceId+"&devicePasswd"+devicePasswd,
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
		let role=sessionStorage.getItem("ROLE");
		if(role=="中队"){
			window.location.href = "./zhongdui.html#/xitongsheding_admin_wangguanguanli";
		}
		else if (role=="大队") {
			window.location.href = "./dadui.html#/xitongsheding_admin_wangguanguanli";
		}else {
			window.location.href = "./zhidui.html#/xitongsheding_admin_wangguanguanli";
		}
	}

	componentDidMount () {
		this.getyingquList();
    }

  	render() {
		let yingquOptions = this.state.yingquList.map(item =>
			<Select.Option key={item['yingqubianhao']} value={item['yingqubianhao']}>{item['mingcheng']}</Select.Option>
		);

	    return (
	      	<div>
				<label>营区名称:</label>
				<Select style={{margin:10,width:200}} onChange={this.yingquChang.bind(this)}>
					{yingquOptions}
				</Select>
				<label>网关账号:</label>
				<Input style={{margin:5,width:200}} id="deviceId"/>
				<label>网关密码:</label>
				<Input style={{margin:5,width:200}} type="password" id="devicePasswd"/>
				<br/>
				<Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default Appmain;
