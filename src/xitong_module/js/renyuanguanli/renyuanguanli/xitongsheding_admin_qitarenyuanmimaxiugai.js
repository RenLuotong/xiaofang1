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
			id:this.props.match.params.id,
			renyuanInfo:{},
		};
	}

	getInfo() {
		const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "renyuanXiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    renyuanInfo: data.data.tbRenyuan,
                });
            }
        });
	}

	backPage() {
		window.location.href = "./xitong.html#/xitongsheding_admin_renyuanguanli";
	}

	editPw() {
		let renyuanInfo = this.state.renyuanInfo;
		let password = $("#password").val().trim();
		if(password == "") {
			message.error("请输入新密码！");
			return;
		}
		if (!confirm("确定修改此人员密码！")) {
            return;
        }
		let adminMimaVM = {};
		adminMimaVM['xinMima'] = hex_md5(password);
		adminMimaVM['renyuanbianhao'] = renyuanInfo['renyuanbianhao'];
		console.log(adminMimaVM);

		const THE = this;
		$.ajax({
    		type : 'POST',
	        url : SERVER+"adminXiugaiMima",
            data : JSON.stringify(adminMimaVM),
            dataType : 'json',
            contentType : "application/json",
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
