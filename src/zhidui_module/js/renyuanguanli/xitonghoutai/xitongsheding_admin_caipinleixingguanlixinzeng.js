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
		let caipinleixingmingcheng = $("#caipinleixingmingcheng").val().trim();
		if (caipinleixingmingcheng == "") {
			message.error("请输入菜品类型名称！");
			return;
		}
		if (!confirm("确定添加此菜品类型")) {
			return;
		}
		$.ajax({
			type:'post',
			url:SERVER+"tbCaipinLeixing/create?name="+caipinleixingmingcheng,
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
		window.location.href = "./xitong.html#/xitongsheding_admin_caipinguanli";
	}

	componentDidMount () {
    }

  	render() {
	    return (
	      	<div>
				<label>菜品类型名称:</label>
				<Input size="default" id="caipinleixingmingcheng" style={{margin:10,width:200}}/>
				<Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default Appmain;
