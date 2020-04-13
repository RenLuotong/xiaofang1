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
		};
	}

	toCreate() {
		const THE = this;
		let shicaileixingmingcheng = $("#shicaileixingmingcheng").val().trim();
		if (shicaileixingmingcheng == "") {
			message.error("请输入食材类型名称！");
			return;
		}
		if (!confirm("确定添加此食材类型")) {
			return;
		}
		$.ajax({
			type:'post',
			url:SERVER+"tianjiashicaileixing?leixingmingcheng="+shicaileixingmingcheng,
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
		window.location.href = "./xitong.html#/xitongsheding_admin_shicaiguanli";
	}

	componentDidMount () {
    }

  	render() {
	    return (
	      	<div>
				<label>食材类型名称:</label>
				<Input size="default" id="shicaileixingmingcheng" style={{margin:10,width:200}}/>
				<Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default Appmain;
