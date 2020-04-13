import React from 'react';
import {
	message,
	Select,
  	Icon,
  	Input,
  	Form,
  	Button,
} from 'antd';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			id:this.props.match.params.id,
			bumenList:[],
			bumenInfo:{},
			renyuanList:[],
		};
	}

	getBumenList(bumenmingcheng) {
  		const THE = this;
  		let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
    	$.ajax({
            type:'GET',
            url: SERVER + "bumenXialaLiebiao?jigoumingcheng="+jigoumingcheng,
            success: function (data) {
            	let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
            		if (data.data[i]["bumenmingcheng"] != bumenmingcheng) {
                    	list.push(data.data[i]);
                    }
                }
                THE.setState({
                    bumenList: list,
                });
            }
        });
  	}

	getInfo() {
		const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "bumenXiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.getBumenList(data.data['bumenmingcheng']);
                THE.getRenyuan(data.data['bumenmingcheng']);
                THE.setState({
                    bumenInfo: data.data,
                });
            }
        });
	}

	getRenyuan(suosubumen) {
		let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
		const THE = this;
    	$.ajax({
            type:'GET',
            url: SERVER + "renyuanXialiaLiebiao?jigoumingcheng=" + jigoumingcheng,
            success: function (data) {
            	let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
            		list.push(data.data[i]);
                }
                THE.setState({
                    renyuanList: list,
                });
            }
        });
	}

	backPage() {
		window.location.href = "./zhidui.html#/renyuanguanli_zhiduiganbu_bumenshezhi";
	}

	toUpdate() {
		if (!confirm("确定修改此部门")) {
            return;
        }
		const THE = this;
		let bumenInfo = THE.state.bumenInfo;
		$.ajax({
            type : 'POST',
            url : SERVER+"tb-bumen",
            data : JSON.stringify(bumenInfo),
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

	componentDidMount() {
		this.getInfo();
    }

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
		let bumenInfo = this.state.bumenInfo;
		bumenInfo[name] = value;
	    this.setState({
	      	bumenInfo : bumenInfo
	    });
  	}

	shangjibumenChange(value) {
		let bumenInfo = this.state.bumenInfo;
		bumenInfo['shangjibumen'] = value;
	    this.setState({
	      	bumenInfo : bumenInfo
	    });
	}

	fuzerenChange(value) {
		let bumenInfo = this.state.bumenInfo;
		bumenInfo['fuzeren'] = value;
	    this.setState({
	      	bumenInfo : bumenInfo
	    });
	}

  	render() {

  		let bumenOptions = this.state.bumenList.map(item => <Select.Option key={item['key']} value={item['bumenmingcheng']}>{item['bumenmingcheng']}</Select.Option>);
  		let renyuanOptions = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>);
		let info = this.state.bumenInfo;

	    return (
	      	<div>
				<label>部门名称</label>
				<Input style={{margin:10,width:200}} name="bumenmingcheng" value={info['bumenmingcheng']} onChange={this.handleInputChange.bind(this)}/>
				<label>上级部门</label>
				<Select style={{margin:10,width:200}} value={info['shangjibumen']} onChange={this.shangjibumenChange.bind(this)}>
					{bumenOptions}
				</Select>
				<label>部门负责人</label>
				<Select style={{margin:10,width:200}} value={info['fuzeren']} onChange={this.fuzerenChange.bind(this)}>
					{renyuanOptions}
				</Select>
	          	<br/>
				<label>部门描述</label>
				<Input style={{margin:10,width:200}} name="bumenmiaoshu" value={info['bumenmiaoshu']} onChange={this.handleInputChange.bind(this)}/>
				<label>部门简称</label>
				<Input style={{margin:10,width:200}} name="bumenjiancheng" value={info['bumenjiancheng']} onChange={this.handleInputChange.bind(this)}/>
				<label>排&#12288;&#12288;&#12288;序:</label>
				<Input style={{margin:5,width:200}} onChange={this.handleInputChange.bind(this)} id="paixu" name="paixu" value={info['paixu']}/>
	          	<br/>
                <Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default App;
