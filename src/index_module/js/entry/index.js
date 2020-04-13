import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import less from "../../less/index.less";

class App extends React.Component {
	
  	constructor(props){
		super(props);
		this.state = {
			
		};
	}
  	
  	logout = () => {
  		sessionStorage.removeItem("token");
		sessionStorage.removeItem("ROLE");
		sessionStorage.removeItem("userInfo");
		sessionStorage.removeItem("jigoumingcheng");
		sessionStorage.removeItem("caidan");
  		if (mode === "dev") {
  			location.replace("http://localhost:8080/login.html");
  		} else {
  			location.replace(SERVERADDR+"static/login.html");
  		}
  	}
  	
  	onSubmit1 = () => {
  		this.onSubmitAll("个人防护装备管理");
  	}
  	
  	onSubmit2 = () => {
  		this.onSubmitAll("车辆与器材管理");
  	}
  	
  	onSubmit3 = () => {
  		this.onSubmitAll("营区管理");
  	}
  	
  	onSubmit4 = () => {
  		this.onSubmitAll("人员管理");
  	}
  	
  	onSubmitAll(canshu) {
  		let jigouleibie = sessionStorage.getItem("ROLE");
        let caidan1 = JSON.parse(sessionStorage.getItem("caidan1"));
        let caidan = [];
        for (let i = 0; i < caidan1.length; i++) {
            if(canshu === caidan1[i].key){
            let obj = {};
            obj.child = caidan1[i].children;
            caidan.push(obj)
            }
        }
        let caidanjson = JSON.stringify(caidan);
        sessionStorage.setItem("caidan",caidanjson);
		if (mode == 0) {
			switch (jigouleibie) {
    			case "系统":
        			location.replace("http://localhost:8080/xitong.html");return;
        			break;
        		case "中队":
        			location.replace("http://localhost:8080/zhongdui.html");return;
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
		}
		else {
			switch (jigouleibie) {
    			case "系统":
        			location.replace(SERVERADDR+"static/xitong.html");return;
        			break;
        		case "中队":
        			location.replace(SERVERADDR+"static/zhongdui.html");return;
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
    }
  	
  	componentDidMount() {

  	}

  	render() {
		return (
			<div className="layout_div">
      			<div id="header_div">
      				<div id="header_left">
      					<div id="header_right" onClick={this.logout}></div>
      				</div>
      			</div>
      			<div id="line"></div>
      			<div id="root_content_div">
      				<div id="content">
      					<span id="span">欢迎您登陆系统!</span><br/><br/>
      					<div id="content_img1" onClick={this.onSubmit1}></div>
      					<div id="content_img2" onClick={this.onSubmit2}></div>
      					<div id="content_img3" onClick={this.onSubmit3}></div>
      					<div id="content_img4" onClick={this.onSubmit4}></div>
      				</div>
      			</div>
      		</div>
		);
  	}
}

ReactDOM.render(
	<HashRouter >
		<App />
	</HashRouter>, document.getElementById('root')
);
