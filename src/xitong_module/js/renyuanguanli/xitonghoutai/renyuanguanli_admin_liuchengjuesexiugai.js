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
			liuchengjueseInfo:{},
		};
	}

	getInfo() {
		const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "huoquliuchengjuese?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
					liuchengjueseInfo: data.data,
                });
            }
        });
	}

	backPage() {
		window.location.href = "./xitong.html#/renyuanguanli_admin_liuchengjueseshezhi";
	}

	toUpdate() {
		const THE = this;
		let liuchengjueseInfo = THE.state.liuchengjueseInfo;
		if (liuchengjueseInfo.juesemingcheng === '' || liuchengjueseInfo.juesemingcheng === null|| liuchengjueseInfo.juesemingcheng === undefined) {
			message.error("请输入身份名称！");
			return;
		}
		$.ajax({
            type : 'POST',
            url : SERVER+"xiugailiuchengjuese",
            data : JSON.stringify(liuchengjueseInfo),
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
		let liuchengjueseInfo = this.state.liuchengjueseInfo;
		liuchengjueseInfo[name] = value;
	    this.setState({
			liuchengjueseInfo : liuchengjueseInfo
	    });
  	}

	componentDidMount() {
		this.getInfo();
    }

  	render() {

  		let info = this.state.liuchengjueseInfo;

	    return (
	      	<div>
				<label>身份名称</label>
				<Input style={{margin:10,width:200}} name="juesemingcheng" value={info['juesemingcheng']} onChange={this.handleInputChange.bind(this)}/>
				<label>身份描述</label>
				<Input style={{margin:10,width:200}} name="juesemiaoshu" value={info['juesemiaoshu']} onChange={this.handleInputChange.bind(this)}/>
      			<br/>
            	<Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default App;
