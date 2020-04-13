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
	Divider,
	Select, InputNumber
} from 'antd';

let id = 0;

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			cangkubianhao:this.props.match.params.cangkubianhao,
			cangkuInfo:{},
			showcangkuweizhi: 'none',
			showhuojia: 'none',
			showqicaixiang: 'none',
			huojiaList: [],
			qicaixiangList: [],
			xiaofangchebianhao:'',
			xiaofangchebianhaoList:[]
		};
	}

	toUpdate() {
		const THE = this;
		let zhongzhi = false;
		const { getFieldValue } = THE.props.form;
        let huojiaList = THE.state.huojiaList;
        let qicaixiangList = THE.state.qicaixiangList;
		let cangkuInfo = THE.state.cangkuInfo;
		let cangkuleixing = cangkuInfo.cangkuleixing;
		if (cangkuInfo.xiaofangchebianhao == "" && cangkuleixing == '消防车') {
			message.error("请输入仓库地址！");return;
		}
		let  tbHuojiaList = [];
		const keys = getFieldValue('keys');
		const keys2 = getFieldValue('keys2');
		THE.props.form.validateFields((err, values) => {
			if (!err) {
				if(cangkuleixing == '普通'){
					for (let i = 0; i < keys.length; i++) {
						let huojiamingcheng = values.huojiamingcheng[keys[i]];
						if (huojiamingcheng == "" || typeof(huojiamingcheng)=="undefined") {
							zhongzhi = true;
							message.warning("请输入货架名称！");return;
						}
						let huojiapaixu = values.huojiapaixu[keys[i]];
						let huojiamiaoshu = values.beizhu[keys[i]];
						let obj = {};
						obj.huojiamingcheng = huojiamingcheng;
						obj.paixu = huojiapaixu;
						obj.huojiamiaoshu = huojiamiaoshu;
						tbHuojiaList.push(obj);
					}
				}else{
					for (let i = 0; i < keys2.length; i++) {
						let huojiamingcheng = values.qicaixiangmingcheng[keys2[i]];
						if (huojiamingcheng == "" || typeof(huojiamingcheng)=="undefined") {
							zhongzhi = true;
							message.warning("请输入器材箱名称！");return;
						}
						let huojiapaixu = values.qicaixiangpaixu[keys2[i]];
						let huojiamiaoshu = values.beizhu[keys2[i]];
						let obj = {};
						obj.huojiamingcheng = huojiamingcheng;
						obj.paixu = huojiapaixu;
						obj.huojiamiaoshu = huojiamiaoshu;
						tbHuojiaList.push(obj);
					}
				}
			}
		});

		if(zhongzhi === true){
			return;
		}

		// if (tbHuojiaList.length == 0 && cangkuleixing == '普通') {
		// 	message.error("请最少添加一个货架！");return;
		// }
		// if (tbHuojiaList.length == 0 && cangkuleixing == '消防车') {
		// 	message.error("请最少添加一个器材箱！");return;
		// }

		if(cangkuleixing === '普通'){
			tbHuojiaList = tbHuojiaList.concat(huojiaList);
		}else{
            tbHuojiaList = tbHuojiaList.concat(qicaixiangList);
        }


		let panduanchongfu = {};
		for(let i = 0;i<tbHuojiaList.length;i++){
			if(panduanchongfu[tbHuojiaList[i].huojiamingcheng] === undefined){
				panduanchongfu[tbHuojiaList[i].huojiamingcheng] =  tbHuojiaList[i].huojiamingcheng;
			}else{
				message.warning("货架或器材箱不能重复！");return;
			}
		}

		if (!confirm("确定修改此仓库！")) {
			return;
		}
		let obj = {};
		obj["tbCangku"] = cangkuInfo;
		obj["tbHuojiaList"] = tbHuojiaList;
		$.ajax({
			type : 'POST',
			url : SERVER+"xiugaicangkuAndhuojia",
			data : JSON.stringify(obj),
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
        let cangkubianhao = THE.state.cangkubianhao;
        $.ajax({
            type : 'GET',
			url: SERVER + "cangkuxiangqing?&cangkubianhao="+cangkubianhao,
            success : function (data) {
				let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if(data.data.tbCangku.cangkuleixing === '普通'){
					THE.setState({
						showhuojia:'block',
						showqicaixiang:'none',
						showcangkuweizhi:'none',
					});
				}else{
					THE.setState({
						showhuojia:'none',
						showqicaixiang:'block',
						showcangkuweizhi:'inline-block'
					});
				}
				for (let i = 0; i < data.data.tbHuojiaList.length; i++) {
					data.data.tbHuojiaList[i]["key"] = i;
					list.push(data.data.tbHuojiaList[i]);
				}
                THE.setState({
                    cangkuInfo: data.data.tbCangku,
					huojiaList: data.data.tbHuojiaList,
					qicaixiangList: data.data.tbHuojiaList,
                });
            }
        });
	}

	backPage() {
		window.location.href = "./zhongdui.html#/zhuangbeiguanli_zhongduirenyuan_cangkuguanli";
	}



	cangkuleixingChang(value) {
		let form = this.props.form;
		let cangkuInfo = this.state.cangkuInfo;
		cangkuInfo['cangkuleixing'] = value;
		if(value === '普通'){
			this.setState({
				showhuojia:'block',
				showqicaixiang:'none',
				showcangkuweizhi:'none',
				xiaofangchebianhao:'',
				cangkuInfo : cangkuInfo,
				qicaixiangList: [],
				huojiaList: [],
			});
			form.setFieldsValue({
				keys: [],
			});
		}else{
			this.setState({
				showhuojia:'none',
				showqicaixiang:'block',
				showcangkuweizhi:'inline-block',
				cangkuInfo : cangkuInfo,
				huojiaList: [],
				qicaixiangList: [],
			});
			form.setFieldsValue({
				keys2: [],
			});
		}
	}

	removehuojia = (k) => {
		const { form } = this.props;
		let keys = form.getFieldValue('keys');
		keys = keys.filter(keys => keys !== k);
		form.setFieldsValue({
			keys: keys,
		});
	}

	addhuojia = () => {
		const { form } = this.props;
		const keys = form.getFieldValue('keys');
		const nextKeys = keys.concat(id++);
		form.setFieldsValue({
			keys: nextKeys,
		});
	}

	removeqicaixiang = (k) => {
		const { form } = this.props;
		let keys2 = form.getFieldValue('keys2');
		keys2 = keys2.filter(keys2 => keys2 !== k);
		form.setFieldsValue({
			keys2: keys2,
		});
	}

	addqicaixiang = () => {
		const { form } = this.props;
		const keys2 = form.getFieldValue('keys2');
		const nextKeys = keys2.concat(id++);
		form.setFieldsValue({
			keys2: nextKeys,
		});
	}

	getxiaofangchebianhaoList() {
		const THE = this;
		let jigoudaima = sessionStorage.getItem("jigoudaima");
		$.ajax({
			type : 'GET',
			url : SERVER+"getXiaofangcheListByjigoudaima?jigoudaima="+jigoudaima,
			success : function(data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				let list = [];
				for (let i = 0; i < data.data.length; i++) {
					data.data[i]["key"] = i;
					list.push(data.data[i]);
				}
				THE.setState({
					xiaofangchebianhaoList : list
				})
			}
		});
	}

	xiaofangchebianhaoChang(value) {
		const THE = this;
		let cangkuInfo = this.state.cangkuInfo;
		cangkuInfo['xiaofangchebianhao'] = value;
		THE.setState({
			cangkuInfo : cangkuInfo
		})
	}

	componentDidMount () {
		this.getInfo();
		this.getxiaofangchebianhaoList();
    }

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
		let cangkuInfo = this.state.cangkuInfo;
		cangkuInfo[name] = value;
	    this.setState({
	      	cangkuInfo : cangkuInfo
	    });
  	}

	paixuInputChange(value) {
		let cangkuInfo = this.state.cangkuInfo;
		cangkuInfo.paixu = value;
		this.setState({
			cangkuInfo : cangkuInfo
		});
	}

	huojiaInputChange(key,id,event){
		const target = event.target;
		const value = target.value;
		let huojiaList = this.state.huojiaList;
		for(let i = 0;i < huojiaList.length;i++){
			if(huojiaList[i].id === id){
				huojiaList[i][key] =  value
			}
		}
		this.setState({
			huojiaList : huojiaList
		});
	}

	qicaixiangInputChange(key,id,event){
		const target = event.target;
		const value = target.value;
		let qicaixiangList = this.state.qicaixiangList;
		for(let i = 0;i < qicaixiangList.length;i++){
			if(qicaixiangList[i].id === id){
				qicaixiangList[i][key] =  value
			}
		}
		this.setState({
			qicaixiangList : qicaixiangList
		});
	}

	removeChange(key,huojiabianhao){
		const THE = this;
		let huojiaList = THE.state.huojiaList;
		let qicaixiangList = THE.state.qicaixiangList;
		if(key === 'huojiaList'){
			$.ajax({
				type : 'get',
				url : SERVER + "huajiashifouyunxushanchu?huojiabianhao="+huojiabianhao,
				success : function(data){
					if (data.status != 0) {
						message.warning(data.message);
						return;
					}
					for(let i = 0;i < huojiaList.length;i++){
						if(huojiaList[i].huojiabianhao === huojiabianhao){
							huojiaList.splice(i, 1);
						}
					}
					THE.setState({
						huojiaList : huojiaList
					});
				},
			});
		}else{
			$.ajax({
				type : 'get',
				url : SERVER + "huajiashifouyunxushanchu?huojiabianhao="+huojiabianhao,
				success : function(data){
					if (data.status != 0) {
						message.warning(data.message);
						return;
					}
					for(let i = 0;i < qicaixiangList.length;i++){
						if(qicaixiangList[i].huojiabianhao === huojiabianhao){
							qicaixiangList.splice(i, 1);
						}
					}
					THE.setState({
						qicaixiangList : qicaixiangList
					});
				},
			});
		}
	}

  	render() {
  		let info = this.state.cangkuInfo;
		const xiaofangchebianhaoOptions = this.state.xiaofangchebianhaoList.map(item => <Select.Option key={item['key']} value={item['cheliangbianhao']}>{item['zhenshihaoma']}</Select.Option>);

		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { xiaofangchebianhao } = this.state;

		//货架formItems
		getFieldDecorator('keys', { initialValue: [] });
		const keys = getFieldValue('keys');
		let huojiaformbiaoti = ''
		if(this.state.qicaixiangList.length >0 ||keys.length > 0){
			huojiaformbiaoti = <div>
				<span style={{ marginLeft: 80,fontSize:16 }}>货架名称</span>
				<span style={{ marginLeft: 160,fontSize:16 }}>货架排序</span>
				<span style={{ marginLeft: 170,fontSize:16 }}>备注</span>
			</div>
		}
		const huojiaformItems = keys.map((k, index) => {
			return (
				<div
					key={k}
				>
					<Form.Item
						required={false}
						key={k}
					>
						{getFieldDecorator
						(`huojiamingcheng[${k}]`, {
						})
						(
							<Input style={{margin:10,width:200 }} />
						)
						}
						{getFieldDecorator
						(`huojiapaixu[${k}]`, {
						})
						(
							<InputNumber min={1} style={{margin:10,width:200 }} />
						)
						}
						{getFieldDecorator
						(`beizhu[${k}]`, {
						})
						(
							<Input style={{margin:10,width:200 }} />
						)
						}
						{keys.length > 0 ? (
							<Icon
								className="dynamic-delete-button"
								type="minus-circle-o"
								disabled={keys.length === 0}
								onClick={() => this.removehuojia(k)}
							/>
						) : null}
					</Form.Item>
				</div>
			)
		});


		//货架formItems
		getFieldDecorator('keys2', { initialValue: [] });
		const keys2 = getFieldValue('keys2');
		let qicaixiangformbiaoti = ''
		if(this.state.qicaixiangList.length >0 || keys2.length > 0){
			qicaixiangformbiaoti = <div>
				<span style={{ marginLeft: 70,fontSize:16 }}>器材箱名称</span>
				<span style={{ marginLeft: 140,fontSize:16 }}>器材箱排序</span>
				<span style={{ marginLeft: 150,fontSize:16 }}>备注</span>
			</div>
		}
		const qicaixiangformItems = keys2.map((k, index) => {
			return (
				<div
					key={k}
				>
					<Form.Item
						required={false}
						key={k}
					>
						{getFieldDecorator
						(`qicaixiangmingcheng[${k}]`, {
						})
						(
							<Input style={{margin:10,width:200 }} />
						)
						}
						{getFieldDecorator
						(`qicaixiangpaixu[${k}]`, {
						})
						(
							<InputNumber min={1} style={{margin:10,width:200 }} />
						)
						}
						{getFieldDecorator
						(`beizhu[${k}]`, {
						})
						(
							<Input style={{margin:10,width:200 }} />
						)
						}
						{keys2.length > 0 ? (
							<Icon
								className="dynamic-delete-button"
								type="minus-circle-o"
								disabled={keys2.length === 0}
								onClick={() => this.removeqicaixiang(k)}
							/>
						) : null}
					</Form.Item>
				</div>
			)
		});

		let huojiaOptions = this.state.huojiaList.map(item => <div style={{ margin: '5px'}}>
			<Input style={{margin:7,width:200 }} value={item['huojiamingcheng']} onChange={this.huojiaInputChange.bind(this,'huojiamingcheng',item['id'])}/><Input style={{margin:10,width:200 }} value={item['paixu']} onChange={this.huojiaInputChange.bind(this,'paixu',item['id'])}/><Input style={{margin:10,width:200 }}value={item['huojiamiaoshu']} onChange={this.huojiaInputChange.bind(this,'huojiamiaoshu',item['id'])}/><Icon
			className="dynamic-delete-button"
			type="minus-circle-o"
			onClick={this.removeChange.bind(this,'huojiaList',item['huojiabianhao'])}
		/>
		</div>);

		let qicaixiangOptions = this.state.qicaixiangList.map(item => <div style={{ margin: '5px'}}>
			<Input style={{margin:7,width:200 }} value={item['huojiamingcheng']} onChange={this.huojiaInputChange.bind(this,'huojiamingcheng',item['id'])}/><Input style={{margin:10,width:200 }} value={item['paixu']} onChange={this.huojiaInputChange.bind(this,'paixu',item['id'])}/><Input style={{margin:10,width:200 }}value={item['huojiamiaoshu']} onChange={this.huojiaInputChange.bind(this,'huojiamiaoshu',item['id'])}/><Icon
			className="dynamic-delete-button"
			type="minus-circle-o"
			onClick={this.removeChange.bind(this,'qicaixiangList',item['huojiabianhao'])}
		/>
		</div>);

		return (
  			<div>
				<div>
					<p style={{fontSize:18,marginTop:20}}>
						<Icon type="info" style={{color: '#1890ff'}}/>基本信息
					</p>
            	<label>仓库名称:</label>
                <Input size="default" id="ckmc_ipt" name="cangkumingcheng" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['cangkumingcheng']}/>
				<label>仓库类型:</label>
				<Select style={{margin:10,width:200}} onChange={this.cangkuleixingChang.bind(this)} value={info['cangkuleixing']}>
					<Select.Option value="普通">普通仓库</Select.Option>
					<Select.Option value="消防车">消防车仓库</Select.Option>
				</Select>
				<br/>
                <label>仓库描述:</label>
                <Input size="default" id="ms_ipt" name="cangkumiaoshu" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['cangkumiaoshu']}/>
				<label>仓库排序:</label>
				<InputNumber min={1} id="paixu" style={{margin:10,width:200}} value={info['paixu']} onChange={this.paixuInputChange.bind(this)}/>
					<br/>
					<label style={{display: this.state.showcangkuweizhi}}>仓库位置:</label>
					<Select style={{margin:10,width:200,display: this.state.showcangkuweizhi}} onChange={this.xiaofangchebianhaoChang.bind(this)} value={info['xiaofangchebianhao']}>
						{xiaofangchebianhaoOptions}
					</Select>

				</div>
				<div style={{display: this.state.showhuojia}}>
					<p style={{fontSize:18,marginTop:20}}>
						<Icon type="info" style={{color: '#1890ff'}}/>货架管理
					</p>
					<Form layout="inline">
						{huojiaformbiaoti}
						{huojiaOptions}
						{huojiaformItems}
						<br/>
						<Form.Item>
							<Button type="dashed" onClick={this.addhuojia}>
								<Icon type="plus" />货架添加
							</Button>
						</Form.Item>
					</Form>
				</div>
				<div style={{display: this.state.showqicaixiang}}>
					<p style={{fontSize:18,marginTop:20}}>
						<Icon type="info" style={{color: '#1890ff'}}/>器材箱管理
					</p>
					<Form layout="inline">
						{qicaixiangformbiaoti}
						{qicaixiangOptions}
						{qicaixiangformItems}
						<br/>
						<Form.Item>
							<Button type="dashed" onClick={this.addqicaixiang}>
								<Icon type="plus" />器材箱添加
							</Button>
						</Form.Item>
					</Form>
				</div>
				<br/>
                <Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
      		</div>
		);
  	}
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(App);
export default WrappedApp;
