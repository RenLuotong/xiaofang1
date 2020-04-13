import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';

import 'antd/dist/antd.css';
import { 
	message,
	Select,
  	Layout, 
  	Menu, 
  	Breadcrumb, 
  	Icon, 
  	Input, 
  	Form, 
  	Button,
  	Table, 
  	Divider
} from 'antd';

class App extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			id:this.props.match.params.id,
			zhiwuInfo:{},
		};
	}
	
	getInfo() {
		const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "zhiwuXiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    zhiwuInfo: data.data,
                });
            }
        });
	}
	
	backPage() {
		window.location.href = "./zhidui.html#/renyuanguanli_zhiduiganbu_zhiwushezhi";
	}
	
	toUpdate() {
		const THE = this;
		let zhiwuInfo = THE.state.zhiwuInfo;
		$.ajax({
            type : 'POST',
            url : SERVER+"xiugaiZhiwu",
            data : JSON.stringify(zhiwuInfo),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.backPage();
            }
        });
	}
	
	handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
		let zhiwuInfo = this.state.zhiwuInfo;
		zhiwuInfo[name] = value;
	    this.setState({
	      	zhiwuInfo : zhiwuInfo
	    });
  	}
	
	componentDidMount() {
		this.getInfo();
    }

  	render() {
  		
  		let info = this.state.zhiwuInfo;
  		
	    return (
	      	<div>
				<label>职务名称</label>
				<Input style={{margin:10,width:200}} name="zhiwumingcheng" value={info['zhiwumingcheng']} onChange={this.handleInputChange.bind(this)}/>
				<label>职务描述</label>
				<Input style={{margin:10,width:200}} name="zhiwumiaoshu" value={info['zhiwumiaoshu']} onChange={this.handleInputChange.bind(this)}/>
      			<br/>
				<label>职务简称</label>
				<Input style={{margin:10,width:200}} name="zhiwujiancheng" value={info['zhiwujiancheng']} onChange={this.handleInputChange.bind(this)}/>
      			<br/>
            	<Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default App;
