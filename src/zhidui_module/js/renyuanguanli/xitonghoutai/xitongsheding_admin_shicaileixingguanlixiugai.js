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
			shicaileixingInfo : [],
			shicaileixingList: [],
		};
	}

	getInfo() {
		const THE = this;
		let id = THE.state.id;
		$.ajax({
			type : 'GET',
			url : SERVER + "huoqvshicaileixingxiangqing?id="+id,
			success : function (data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				THE.setState({
					shicaileixingInfo: data.data,
				});
			}
		});
	}



	toUpdate() {
		const THE = this;
		let id = THE.state.id;
		let leixingmingcheng = THE.state.shicaileixingInfo.leixingmingcheng;
		if (!confirm("确定修改此食材类型！")) {
			return;
		}
		$.ajax({
			type : 'POST',
			url : SERVER + "xiugaishicaileixing?id="+id+"&leixingmingcheng="+leixingmingcheng,
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
		let shicaileixingInfo = this.state.shicaileixingInfo;
		shicaileixingInfo[name] = value;
		this.setState({
			shicaileixingInfo : shicaileixingInfo
		});
	}


	backPage() {
		window.location.href = "./xitong.html#/xitongsheding_admin_shicaiguanli";
	}

	componentDidMount () {
		this.getInfo();
    }

  	render() {

		let info = this.state.shicaileixingInfo;

	    return (
	      	<div>
				<label>食材类型名称:</label>
				<Input size="default"  name="leixingmingcheng" id="leixingmingcheng" style={{margin:10,width:200}} value={info['leixingmingcheng']} onChange={this.handleInputChange.bind(this)}/>
				<Button type="primary" icon="check" onClick={this.toUpdate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default Appmain;
