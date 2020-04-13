import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Login from 'ant-design-pro/lib/Login';
import { message, Row, Col, LocaleProvider, DatePicker } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import less from "../../less/login.less";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginDemo extends React.Component {

	state = {
		type: 'tab1',
		loading :false,
	}

	onSubmit = (err, values) => {
		const THE = this;
		//console.log('value collected ->', { ...values, autoLogin: this.state.autoLogin });
		values["dengluming"] = values["username"];
//		values["mima"] = hex_md5(values["password"].trim());
		values["mima"] = hex_md5(values["password"]);
		values["rememberMe"] = true;
		if(err != null){
			return;
		}
		THE.setState({loading:true}) ;
		$.ajax({
			type:"post",
			url:SERVER+"authenticate",
			data:JSON.stringify(values),
			dataType:'json',
			async: false,
			contentType: "application/json",
			success:function(data) {
				// let caidan = JSON.stringify(data.data.caidan);
				if (data.status != 0) {
					THE.setState({loading:false}) ;
					message.warning(data.message);
					return;
				}
				sessionStorage.setItem("suosubumen",data.data.userInfo["suosubumen"]);
				sessionStorage.setItem("renyuanleixing",data.data.userInfo["renyuanleixing"]);
				sessionStorage.setItem("jigoudaima",data.data.userInfo["jigoudaima"]);
				if(data.data.liuchengjuesemingchegnList.length > 0 ){
				sessionStorage.setItem("liuchengjuesemingcheng",data.data.liuchengjuesemingchegnList[0])
				};
				sessionStorage.setItem("userName",data.data.userInfo["xingming"]);
				sessionStorage.setItem("renyuanbianhao",data.data.userInfo["renyuanbianhao"]);
				sessionStorage.setItem("jigoumingcheng",data.data.userInfo["jigoumingcheng"]);
				sessionStorage.setItem("ROLE",data.data.userInfo["jigouleibie"]);
				sessionStorage.setItem("zhiwu",data.data.userInfo["zhiwu"]);
				sessionStorage.setItem("token",data.data.jwt);
				// sessionStorage.setItem("caidan1",caidan);
				if(data.data.userInfo["jueseId"] !== null){
					let juese_id = data.data.userInfo["jueseId"].substring(1, data.data.userInfo["jueseId"].length - 1);
					let juese_ids = juese_id.split(",");
					sessionStorage.setItem("jueselist",juese_ids);
				}
				let gs = "";
				gs = data.data.userInfo["xingming"] + '(' + data.data.userInfo["zhiwu"] + ')';
				sessionStorage.setItem("gs",gs);
				// $.ajax({
				// 	type:'GET',
				// 	url: SERVER + "gerenfanghuDaibanLiebiao",
				// 	success: function (data) {
				// 		if (data.status != 0) {
				// 			message.warning(data.message);
				// 			return;
				// 		}
				// 		let count = data.data.length;
				// 		sessionStorage.setItem("count",count);
				// 	}
				// });
				console.log(data.data.userInfo["jigouleibie"]);
				if (mode == "dev") {
					switch (data.data.userInfo["jigouleibie"]) {
						case "系统":
							location.replace("http://localhost:8080/xitong.html");return;
							break;
						case "中队":
							location.replace("http://localhost:8080/zhongdui_tongji.html");return;
							break;
						case "大队":
							location.replace("http://localhost:8080/dadui.html");return;
							break;
						case "支队":
							location.replace("http://localhost:8080/zhidui.html");return;
							break;
						default:
							break;
					}
				} else {
					switch (data.data.userInfo["jigouleibie"]) {
						case "系统":
							location.replace(SERVERADDR+"static/xitong.html");return;
							break;
						case "中队":
							location.replace(SERVERADDR+"static/zhongdui_tongji.html");return;
							break;
						case "大队":
							location.replace(SERVERADDR+"static/dadui.html");return;
							break;
						case "支队":
							location.replace(SERVERADDR+"static/zhidui.html");return;
							break;
						default:
							break;
					}
				}
			},
		});
	}

	render() {
		return (
			<div id="login_div">
				<Login
					defaultActiveKey={this.state.type}
					onSubmit={this.onSubmit}
				>
					<UserName className='nameIpt' name="username" placeholder="请输入用户名"/>
					<Password className='pwIpt' name="password" placeholder="请输入密码"/>
					<Submit className="login_btn" loading={this.state.loading}>登录</Submit>
				</Login>
				<span style={{fontSize: '12px',left: '48%',position:"fixed",bottom:10,color:"white"}}>
                        <a style={{color:"white"}} target="_Blank" href="http://www.beian.miit.gov.cn">鲁ICP备19023982号</a>
                </span>
			</div>
		);
	}
}

ReactDOM.render(
	<HashRouter >
		<LocaleProvider locale={zh_CN}>
			<LoginDemo />
		</LocaleProvider>
	</HashRouter>, document.getElementById('root')
);
