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

	shebeibianhao = ''
	shebeibianhaoChange(value) {
		this.shebeibianhao = value;
	}



	toCreate() {
		const THE = this;
		let baoguanguimingcheng = $("#baoguanguimingcheng").val().trim();
		if (baoguanguimingcheng == "") {
			message.error("请输入保管柜名称！");
			return;
		}
		let shebeibianhao = this.shebeibianhao;
		if (shebeibianhao == "") {
			message.error("请选择设备！");
			return;
		}
		if (!confirm("确定添加此保管柜")) {
			return;
		}
		let tbYingqvbaoguangui = {};
		tbYingqvbaoguangui["baoguanguimingcheng"] = baoguanguimingcheng;
		tbYingqvbaoguangui["shebeibianhao"] = shebeibianhao;
		$.ajax({
			type:'post',
			url:SERVER+"tianjiabaoguangui",
			data : JSON.stringify(tbYingqvbaoguangui),
			dataType : 'json',
			contentType : "application/json",
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
		let role=sessionStorage.getItem("ROLE");
		if(role=="中队"){
			window.location.href = "./zhongdui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
		}
		else if (role=="大队") {
			window.location.href = "./dadui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
		}else {
			window.location.href = "./zhidui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
		}
	}

	componentDidMount () {
		this.getshebeiList();
    }

  	render() {
		let shebeiListOptions = this.state.shebeiList.map(item =>
			<Select.Option key={item['id']} value={item['shebeibianhao']}>{item['shebeixuliehao']}</Select.Option>
		);

	    return (
	      	<div>
				<label>保管柜名称:</label>
				<Input size="default" id="baoguanguimingcheng" style={{margin:10,width:200}}/>
				<label>设备编号:</label>
				<Select style={{margin:10,width:200}} onChange={this.shebeibianhaoChange.bind(this)}>
					{shebeiListOptions}
				</Select>
				<Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default Appmain;
