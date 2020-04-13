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
	Select,InputNumber
} from 'antd';
let id = 0;

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			showhuojia: 'none',
			showqicaixiang: 'none',
			showcangkuweizhi: 'none',
			xiaofangchebianhao:'',
			xiaofangchebianhaoList:[]
		};
	}

	toCreate() {
		const THE = this;
		let zhongzhi = false;
		const { getFieldValue } = THE.props.form;
		let cangkumingcheng = $("#ckmc_ipt").val().trim();
		let cangkuleixing = THE.cangkuleixing;
		let cangkumiaoshu = $("#ms_ipt").val().trim();
		let paixu = $("#paixu").val().trim();
		let xiaofangchebianhao = THE.state.xiaofangchebianhao;

        if (cangkumingcheng == "") {
        	message.error("请输入仓库名称！");return;
        }
		if (cangkuleixing == "") {
			message.error("请选择仓库类型！");return;

		}
        if (xiaofangchebianhao == "" && cangkuleixing == '消防车') {
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

		let panduanchongfu = {};
		for(let i = 0;i<tbHuojiaList.length;i++){
			if(panduanchongfu[tbHuojiaList[i].huojiamingcheng] === undefined){
				panduanchongfu[tbHuojiaList[i].huojiamingcheng] =  tbHuojiaList[i].huojiamingcheng;
			}else{
				message.warning("货架或器材箱不能重复！");return;
			}
		}

        if (!confirm("确定添加此仓库！")) {
            return;
        }
        let obj = {};
		let tbCangku = {};
		tbCangku["cangkumingcheng"] = cangkumingcheng;
		tbCangku["cangkumiaoshu"] = cangkumiaoshu;
		tbCangku["cangkuleixing"] = cangkuleixing;
		tbCangku["paixu"] = paixu;
		tbCangku["xiaofangchebianhao"] = xiaofangchebianhao;
		obj["tbCangku"] = tbCangku;
		obj["tbHuojiaList"] = tbHuojiaList;
        $.ajax({
            type : 'POST',
            url : SERVER+"tianjiacangkuAndhuojia",
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

	cangkuleixing = ''
	cangkuleixingChang(value) {
		let form = this.props.form;
		if(value === '普通'){
			this.setState({
				showhuojia:'block',
				showqicaixiang:'none',
				showcangkuweizhi:'none',
				xiaofangchebianhao:''
			});
			form.setFieldsValue({
				keys: [],
			});
		}else{
			this.setState({
				showhuojia:'none',
				showqicaixiang:'block',
				showcangkuweizhi:'inline-block'
			});
			form.setFieldsValue({
				keys2: [],
			});
		}
		this.cangkuleixing = value;
	}

	backPage() {
		window.location.href = "./zhongdui.html#/zhuangbeiguanli_zhongduirenyuan_cangkuguanli";
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
		THE.setState({
			xiaofangchebianhao : value
		})
	}

	componentDidMount() {
		this.getxiaofangchebianhaoList();
	}

  	render() {

		const xiaofangchebianhaoOptions = this.state.xiaofangchebianhaoList.map(item => <Select.Option key={item['key']} value={item['cheliangbianhao']}>{item['zhenshihaoma']}</Select.Option>);

		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { xiaofangchebianhao } = this.state;

		//货架formItems
		getFieldDecorator('keys', { initialValue: [] });
		const keys = getFieldValue('keys');
		let huojiaformbiaoti = ''
		if(keys.length > 0){
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
		if(keys2.length > 0){
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

		return (
  			<div>
				<div>
					<p style={{fontSize:18,marginTop:20}}>
						<Icon type="info" style={{color: '#1890ff'}}/>基本信息
					</p>
            	<label>仓库名称:</label>
                <Input size="default" id="ckmc_ipt" style={{margin:10,width:200}}/>
				<label>仓库类型:</label>
				<Select style={{margin:10,width:200}} onChange={this.cangkuleixingChang.bind(this)}>
					<Select.Option value="普通">普通仓库</Select.Option>
					<Select.Option value="消防车">消防车仓库</Select.Option>
				</Select>
				<br/>
                <label>仓库描述:</label>
                <Input size="default" id="ms_ipt" style={{margin:10,width:200}}/>
				<label>仓库排序:</label>
				<InputNumber min={1} size="default" id="paixu" style={{margin:10,width:200}}/>
				<br/>
				<label style={{display: this.state.showcangkuweizhi}}>仓库位置:</label>
					<Select style={{margin:10,width:200,display: this.state.showcangkuweizhi}} onChange={this.xiaofangchebianhaoChang.bind(this)} value={xiaofangchebianhao}>
						{xiaofangchebianhaoOptions}
					</Select>
				<br/>
				</div>
				<div style={{display: this.state.showhuojia}}>
					<p style={{fontSize:18,marginTop:20}}>
						<Icon type="info" style={{color: '#1890ff'}}/>货架管理
					</p>
					<Form layout="inline">
						{huojiaformbiaoti}
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
                <Button type="primary" icon="plus" onClick={this.toCreate.bind(this)}>保存</Button>
      		</div>
		);
  	}
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(App);
export default WrappedApp;

