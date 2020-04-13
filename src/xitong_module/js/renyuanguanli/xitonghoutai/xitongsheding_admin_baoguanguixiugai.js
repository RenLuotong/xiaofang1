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
			baoguanguiInfo : [],
			shebeiList: [],
		};
	}

	getshebeiList() {
		const THE = this;
		$.ajax({
			type:'GET',
			url: SERVER + "huoqvbaoguanguishebei",
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
					shebeiList: list,
				});
			}
		});
	}

	shebeibianhaoChange(value) {
		let baoguanguiInfo = this.state.baoguanguiInfo;
		baoguanguiInfo['shebeibianhao'] = value;
		this.setState({
			baoguanguiInfo : baoguanguiInfo
		});
	}

	getInfo() {
		const THE = this;
		let id = THE.state.id;
		$.ajax({
			type : 'GET',
			url : SERVER + "baoguanguixiangqing?id="+id,
			success : function (data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				THE.setState({
					baoguanguiInfo: data.data,
				});
			}
		});
	}



	toUpdate() {
		const THE = this;
		let baoguanguiInfo = THE.state.baoguanguiInfo;
		if (!confirm("确定修改此保管柜！")) {
			return;
		}
		$.ajax({
			type : 'POST',
			url : SERVER + "xiugaibaoguangui",
			data : JSON.stringify(baoguanguiInfo),
			dataType : 'json',
			contentType : "application/json",
			success : function(data){
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				message.success("修改保管柜成功");
				THE.backPage();
			},
		});
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let baoguanguiInfo = this.state.baoguanguiInfo;
		baoguanguiInfo[name] = value;
		this.setState({
			baoguanguiInfo : baoguanguiInfo
		});
	}


	backPage() {
		window.location.href = "./xitong.html#/xitongsheding_admin_baoguanguiguanli";
	}

	componentDidMount () {
		this.getInfo();
		this.getshebeiList();
    }

  	render() {

		let shebeiListOptions = this.state.shebeiList.map(item =>
			<Select.Option key={item['id']} value={item['shebeibianhao']}>{item['shebeibianhao']}</Select.Option>
		);


		let info = this.state.baoguanguiInfo;

	    return (
	      	<div>
				<label>保管柜名称:</label>
				<Input size="default"  name="mingcheng" id="mingcheng" style={{margin:10,width:200}} value={info['baoguanguimingcheng']} onChange={this.handleInputChange.bind(this)}/>
				<label>设备编号:</label>
				<Select style={{margin:10,width:200}} onChange={this.shebeibianhaoChange.bind(this)} value={info['shebeibianhao']}>
					{shebeiListOptions}
				</Select>
				<Button type="primary" icon="check" onClick={this.toUpdate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default Appmain;
