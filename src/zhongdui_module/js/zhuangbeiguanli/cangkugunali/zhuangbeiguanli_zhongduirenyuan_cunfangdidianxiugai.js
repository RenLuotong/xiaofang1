import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import {
	message,
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
			cunfangdidianInfo:{},
		};
	}
	
	toUpdate() {
        const THE = this;
        let cunfangdidianInfo = THE.state.cunfangdidianInfo
        if (cunfangdidianInfo["cunfangdidianmingcheng"] == "") {
            message.error("请输入存放地点名称！");return;
        }
        if (!confirm("确定修改此存放地点！")) {
            return;
        }
        $.ajax({
            type : 'POST',
            url : SERVER+"xiugaiCunfangdidian",
            data : JSON.stringify(cunfangdidianInfo),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);return;
                }
                message.success(data.message);
                THE.backPage();
            }
        });
	}

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "cunfangdidianXiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    cunfangdidianInfo: data.data,
                });
            }
        });
    }

    backPage() {
        window.location.href = "./zhongdui.html#/qicai_zhongduiganbu_cunfangdidianguanli";
    }

    componentDidMount () {
        this.getInfo();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let cunfangdidianInfo = this.state.cunfangdidianInfo;
        cunfangdidianInfo[name] = value;
        this.setState({
            cunfangdidianInfo : cunfangdidianInfo
        });
    }

  	render() {

        let info = this.state.cunfangdidianInfo;

		return (
  			<div>
				<label>存放地点类型:</label>
				<Input value={info['leixing']} disabled style={{margin:10,width:200}}/>
				<label>所在仓库名称:</label>
				<Input value={info['cangkumingcheng']} disabled style={{margin:10,width:200}}/>
            	<label>存放地点名称:</label>
                <Input size="default" id="qymc_ipt" name="cunfangdidianmingcheng" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['cunfangdidianmingcheng']}/>
                <br/>
                <label>存放地点位置:</label>
                <Input size="default" id="frdb_ipt" name='dizhi' onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['dizhi']}/>
                <label>存放地点备注:</label>
                <Input size="default" id="lxdh_ipt" name='miaoshu' onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['miaoshu']}/>
                <label>消防车&#12288;&#12288;&#12288;:</label>
                <Input value={info['chepaihaoma']} disabled style={{margin:10,width:200}}/>
                <br/>
                <Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
      		</div>
		);
  	}
}

export default App;
