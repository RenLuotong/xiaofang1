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
			id : this.props.match.params.id,
			caipinleixingInfo : [],
			caipinleixingList: [],
		};
	}

	getInfo() {
		const THE = this;
		let id = THE.state.id;
		$.ajax({
			type : 'GET',
			url : SERVER + "tbCaipinLeixing/findOne?id="+id,
			success : function (data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				THE.setState({
					caipinleixingInfo: data.data,
				});
			}
		});
	}



	toUpdate() {
		const THE = this;
		let id = THE.state.id;
		let mingcheng = THE.state.caipinleixingInfo.mingcheng;
		if (!confirm("确定修改此菜品类型！")) {
			return;
		}
		$.ajax({
			type : 'POST',
			url : SERVER + "tbCaipinLeixing/update?id="+id+"&name="+mingcheng,
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
		let caipinleixingInfo = this.state.caipinleixingInfo;
		caipinleixingInfo[name] = value;
		this.setState({
			caipinleixingInfo : caipinleixingInfo
		});
	}


	backPage() {
		window.location.href = "./xitong.html#/xitongsheding_admin_caipinguanli";
	}

	componentDidMount () {
		this.getInfo();
    }

  	render() {

		let info = this.state.caipinleixingInfo;

	    return (
	      	<div>
				<label>菜品类型名称:</label>
				<Input size="default"  name="mingcheng" id="mingcheng" style={{margin:10,width:200}} value={info['mingcheng']} onChange={this.handleInputChange.bind(this)}/>
				<Button type="primary" icon="check" onClick={this.toUpdate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default Appmain;
