import React from 'react';
import ReactDOM from 'react-dom';
import { Input, Button, message } from 'antd';

class EditPassword extends React.Component {
	
  	constructor(props) {
	    super(props);
	    this.state = { 
	    	
	    };
  	}
  	componentWillMount() {
		this.setState({whcid:this.props.whcId});
	}
  	
    componentWillReceiveProps(nextProps) {
		this.setState({whcid:nextProps.whcId});
	}
    
	editPw() {
		let ymm = $("#ymm_ipt").val().trim();
		let newmm_ipt = $("#newmm_ipt").val().trim();
		let confirmmm_ipt = $("#confirmmm_ipt").val().trim();
		
		if(ymm == "" || newmm_ipt == "" || confirmmm_ipt == "") {
			message.error("信息输入不完整！");return;
		}
		
		if(newmm_ipt != confirmmm_ipt) {
			message.error("两次输入密码不一致！");return;
		}
		
		if(newmm_ipt == ymm) {
			message.error("新密码与旧密码相同！");return;
		}
		let obj = {};
		obj['xinMima'] = hex_md5(newmm_ipt);
		obj['yuanMima'] = hex_md5(ymm);
		$.ajax({
			type : 'POST',
            url : SERVER+"xiugaiMima",
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
	        success:function(data){
	            if(data.status != 0){
	                message.warning(data.message);
	                return;
	            }
	            $("#ymm_ipt").val("");
	            $("#newmm_ipt").val("");
	            $("#confirmmm_ipt").val("");
	          	message.success(data.message);
	        },
	        error:function(jqXHR,textStatus,errorThrown){
	        	if(jqXHR.status == 401){
					message.warning("密码错误！");return;
				}
	        	else{
	        		message.warning("服务器偷懒了！");return;
	        	}
	        }
	    });
	}
	
  	render() {
	    return (
	      	<div id="edit_password_div">	
		      	<label>原密码&#12288;</label>	
		      	<Input size="default" id="ymm_ipt"  type="password" className="input_div"/> <br />
		      	<label>新密码&#12288;</label>	
		      	<Input size="default" id="newmm_ipt" type="password"className="input_div"/><br />
		      	<label>确认密码</label>	
		      	<Input size="default" id="confirmmm_ipt"type="password" className="input_div"/><br />
		        <Button type="default" className="editPw_btn" onClick={this.editPw.bind(this)}>提交</Button>
			</div>
	    );
  	}
}

export default EditPassword;
