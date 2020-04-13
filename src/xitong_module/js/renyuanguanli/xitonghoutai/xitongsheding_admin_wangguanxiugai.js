import React from 'react';
import ReactDOM from 'react-dom';
import {
	message,
	Input,
	Button
} from 'antd';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			deviceId:this.props.match.params.deviceId,
			wangguanInfo:{},
		};
	}

	getInfo() {
		const THE = this;
		let deviceId = THE.state.deviceId;
		$.ajax({
			type : 'GET',
			url : SERVER + "boundshebei/wangguanxiangqing?gwId=" + deviceId,
			success : function (data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				THE.setState({
					wangguanInfo: data.data,
				});
			}
		});
	}

	backPage() {
		window.location.href = "./xitong.html#/xitongsheding_admin_wangguanguanli";
	}

	editPw() {
		let wangguanInfo = this.state.wangguanInfo;
		let password = $("#password").val().trim();
		if(password == "") {
			message.error("请输入新密码！");
			return;
		}
		if (!confirm("确定修改此网关密码！")) {
			return;
		}
		let  gwID = wangguanInfo.deviceId;
		let  oldPwd = wangguanInfo.password;
		let  newPwd = password;
		const THE = this;
		$.ajax({
			type : 'POST',
			url : SERVER+"boundshebei/xiugaiwangguanmima?gwID="+gwID+"&oldPwd="+oldPwd+"&newPwd="+newPwd,
			success : function(data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				message.success(data.message);
				THE.backPage();
			},
		});
	}

	componentDidMount() {
		this.getInfo();
	}

	render() {

		return (
			<div>
				<div id="edit_password_div">
					<label>新密码:</label>
					<Input size="default" id="password" className="input_div" style={{margin:10,width:200}}/>
					<Button type="primary" className="editPw_btn" onClick={this.editPw.bind(this)}>提交</Button>
				</div>
			</div>
		);
	}
}

export default App;
