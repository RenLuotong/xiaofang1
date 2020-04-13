import React, { Component } from 'react';
import {
	message,
	Upload,
	Modal,
	DatePicker,
	Select,
	Icon,
	Input,
	Form,
	Button,
	Table,
	Divider,
	InputNumber,
} from 'antd';
const { TextArea } = Input;

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			xiaofangcheleixingList: [],
			previewVisible: false,
			previewImage: '',
			fileList: [],
			baoyangzhouqi: '',
			shoshenyangsuo: 'none',
		};
	}

	handleCancel = () => this.setState({ previewVisible: false })
	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	}
	handleChange = ({fileList}) => {
		this.setState({
			fileList: fileList,
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.toCreate();
			}
		});
	}

	getXiaofangcheleixingList() {
		const THE = this;
		$.ajax({
			type:'GET',
			url : SERVER + "xiaofangcheleixingliebiao",
			success : function(data){
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				for (let i = 0; i < data.data.length; i++) {
					data.data[i]["key"] = i;
				}
				THE.setState({
					xiaofangcheleixingList : data.data,
				});
			}
		});
	}

	toCreate() {
		const THE = this;
		let form = THE.props.form;

		let chepaihaoma = form.getFieldValue('chepaihaoma');
		let xiaofangcheleixing = form.getFieldValue('xiaofangcheleixing');
		let cheliangpinpai = form.getFieldValue('cheliangpinpai');
		let cheliangchangdu = form.getFieldValue('cheliangchangdu');
		let chelianggaodu = form.getFieldValue('chelianggaodu');
		let cheliangkuandu = form.getFieldValue('cheliangkuandu');
		let cheliangzuidazairenshu = form.getFieldValue('cheliangzuidazairenshu');
		let cheliangzuidaxingshisudu = form.getFieldValue('cheliangzuidaxingshisudu');
		let cheliangmanzaizhiliang = form.getFieldValue('cheliangmanzaizhiliang');
		let cheliangfadongjixinghao = form.getFieldValue('cheliangfadongjixinghao');
		let chejiahao = form.getFieldValue('chejiahao');
		let cheliangyouxiangrongliang = form.getFieldValue('cheliangyouxiangrongliang');
		let cheliangshuiguanrongliang = form.getFieldValue('cheliangshuiguanrongliang');
		let cheliangpaomoguanrongliang = form.getFieldValue('cheliangpaomoguanrongliang');
		if(cheliangshuiguanrongliang === '' || cheliangshuiguanrongliang === null || cheliangshuiguanrongliang === undefined){
			message.error("请输入水罐容量！");return;
		}
		if(cheliangpaomoguanrongliang === '' || cheliangpaomoguanrongliang === null || cheliangpaomoguanrongliang === undefined){
			message.error("请输入泡沫车容量！");return;
		}
		if(cheliangyouxiangrongliang === '' || cheliangyouxiangrongliang === null || cheliangyouxiangrongliang === undefined){
			message.error("请输入油箱容量！");return;
		}
		let caigoushijian = form.getFieldValue('caigoushijian');
		let cheliangxinghao = form.getFieldValue('cheliangxinghao');
		let xiaofangchemingcheng = form.getFieldValue('xiaofangchemingcheng');
		let mima = form.getFieldValue('mima');
		let baoyangzhouqi = this.state.baoyangzhouqi;
		let ranyouzhonglei = form.getFieldValue('ranyouzhonglei');
		let chuchangshijian = form.getFieldValue('chuchangshijian');
		let shuibengliuliang = form.getFieldValue('shuibengliuliang');
		let chezaipaoliuliang = form.getFieldValue('chezaipaoliuliang');
		let shuipaoshecheng = form.getFieldValue('shuipaoshecheng');
		let yaokongjuli = form.getFieldValue('yaokongjuli');
		let chezaimiehuoji = form.getFieldValue('chezaimiehuoji');
		let shifoushenyangsuocheliang = form.getFieldValue('shifoushenyangsuocheliang');
		let shenyangsuobiaoshi = form.getFieldValue('shenyangsuobiaoshi');
		if(shifoushenyangsuocheliang === '是' && (shenyangsuobiaoshi === '' || shenyangsuobiaoshi === null || shenyangsuobiaoshi === undefined)){
			message.error("请输入沈阳所标识！");return;
		}
		let shiyongfanwei = form.getFieldValue('shiyongfanwei');
		let fileList = THE.state.fileList;
		let zhaopiandizhiList = [];
		for (let i = 0; fileList.length > i; i++) {
			zhaopiandizhiList.push(fileList[i]['response']);
		}


		if (!confirm("确定添加此条记录吗？")) {
			return;
		}
		let obj = {};
		obj["caigoushijian"] =caigoushijian;
		obj["chejiahao"] = chejiahao;
		obj["cheliangchangdu"] =cheliangchangdu;
		obj["cheliangfadongjixinghao"] =cheliangfadongjixinghao;
		obj["chelianggaodu"] = chelianggaodu;
		obj["cheliangkuandu"] = cheliangkuandu;
		obj["cheliangmanzaizhiliang"] =cheliangmanzaizhiliang;
		obj["cheliangpaomoguanrongliang"] = cheliangpaomoguanrongliang;
		obj["cheliangpinpai"] =cheliangpinpai;
		obj["cheliangshuiguanrongliang"] = cheliangshuiguanrongliang;
		obj["cheliangxinghao"] =cheliangxinghao;
		obj["cheliangyouxiangrongliang"] = cheliangyouxiangrongliang;
		obj["cheliangzuidaxingshisudu"] = cheliangzuidaxingshisudu;
		obj["cheliangzuidazairenshu"] = cheliangzuidazairenshu;
		obj["chepaihaoma"] = chepaihaoma;
		obj["xiaofangcheleixing"] = xiaofangcheleixing;
		// obj["zhenshihaoma"] = zhenshihaoma;
		obj["xiaofangchemingcheng"] = xiaofangchemingcheng;
		obj["mima"] = mima;
		obj["baoyangzhouqi"] = baoyangzhouqi;
		obj["ranyouzhonglei"] = ranyouzhonglei;
		obj["chuchangshijian"] = chuchangshijian;
		obj["shuibengliuliang"] = shuibengliuliang;
		obj["chezaipaoliuliang"] = chezaipaoliuliang;
		obj["shuipaoshecheng"] = shuipaoshecheng;
		obj["yaokongjuli"] = yaokongjuli;
		obj["chezaimiehuoji"] = chezaimiehuoji;
		obj["shifoushenyangsuocheliang"] = shifoushenyangsuocheliang;
		obj["fvid"] = shenyangsuobiaoshi;
		obj["shiyongfanwei"] = shiyongfanwei;

		let data = {};
		data.tbXiaofangcheNew = obj;
		data["zhaopiandizhiList"] = zhaopiandizhiList;

		$.ajax({
			type:'post',
			url:SERVER+"tianjiaXiaofangcheNew",
			data:JSON.stringify(data),
			dataType:'json',
			contentType: "application/json",
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

	baoyangzhouqiChange(value) {
		let baoyangzhouqi = this.state.baoyangzhouqi;
		baoyangzhouqi = value;
		this.setState({
			baoyangzhouqi : baoyangzhouqi
		});
	}

	shifoushenyangChange(value) {
		if(value === '是'){
		this.setState({
			shoshenyangsuo: 'inline',
		});
		}else{
			this.setState({
				shoshenyangsuo: 'none',
			});
		}
	}

	backPage() {
		window.location.href = "./zhongdui.html#/zhuangbeiguanli_zhongduirenyuan_xiaofangcheguanli";
	}

	componentDidMount () {
		this.getXiaofangcheleixingList();
	}

	render() {

		const xiaofangcheleixingList = this.state.xiaofangcheleixingList.map(item => <Select.Option key={item['key']} value={item['xiaofangcheleixing']}>{item['xiaofangcheleixing']}</Select.Option>);

		const FormItem = Form.Item;
		const { getFieldDecorator } = this.props.form;

		let uploadProps = {
			name: 'files',
			action: SERVER+"files",
			headers: {
				Authorization:"Bearer "+sessionStorage.getItem("token")
			},
		};
		const { previewVisible, previewImage, fileList,baoyangzhouqi} = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">上传图片</div>
			</div>
		);

		return (
			<div>
				<Form layout="inline" onSubmit={this.handleSubmit}>
					<FormItem label="消防车名称">
						{getFieldDecorator('xiaofangchemingcheng', {
							rules: [{ required: true, message: '请输入消防车名称', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="消防车密码&#12288;&#12288;&#12288;&#12288;">
						{getFieldDecorator('mima', {
							rules: [{ required: true, message: '消防车密码', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="&nbsp;保养周期(天)&#12288;">
						{getFieldDecorator('baoyangzhouqi', {
							rules: [{ required: true, message: '保养周期'}],
						})(
							<InputNumber style={{margin:5,width:200}} onChange={this.baoyangzhouqiChange.bind(this)} value={baoyangzhouqi}/>
						)}
					</FormItem>
					{/*<FormItem label="&nbsp;保养周期(天)&#12288;">*/}
					{/*		<InputNumber style={{margin:5,width:200}} onChange={this.baoyangzhouqiChange.bind(this)} value={baoyangzhouqi}/>*/}
					{/*</FormItem>*/}
					<br/>
					<FormItem label="车牌号码&#12288;">
						{getFieldDecorator('chepaihaoma', {
							rules: [{ required: true, message: '请输入车牌号码', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="车辆类型&#12288;&#12288;&#12288;&#12288;&#12288;">
						{getFieldDecorator('xiaofangcheleixing', {
							rules: [{ required: true, message: '请选择车辆类型', whitespace: true }],
						})(
							<Select
								style={{margin:5,width:200}}
								showSearch
								optionFilterProp="children"
							>
								{xiaofangcheleixingList}
							</Select>
						)}
					</FormItem>
					<FormItem label="车架号&#12288;&#12288;&#12288;&#12288;">
						{getFieldDecorator('chejiahao', {
							rules: [{ required: true, message: '请输入车架号', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<br/>
					<FormItem label="最大载人数">
						{getFieldDecorator('cheliangzuidazairenshu', {
							rules: [{ required: true, message: '请输入最大载人数', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<span style={{lineHeight:"45px",color:"red"}}>*</span><FormItem label="&nbsp;水罐容量(T)&#12288;&#12288;&#12288;&#12288;">
						{getFieldDecorator('cheliangshuiguanrongliang', {
						})(
							<InputNumber  size="default" min={0} style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<span style={{lineHeight:"45px",color:"red"}}>*</span><FormItem label="&nbsp;泡沫车容量(T)&#12288;">
						{getFieldDecorator('cheliangpaomoguanrongliang', {
						})(
							<InputNumber  size="default" min={0} style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<br/>
					<span style={{lineHeight:"45px",color:"red"}}>*</span><FormItem label="&nbsp;油箱容量(L)">
						{getFieldDecorator('cheliangyouxiangrongliang', {
						})(
							<InputNumber  size="default" min={0} style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="车辆品牌&#12288;&#12288;&#12288;&#12288;&#12288;">
						{getFieldDecorator('cheliangpinpai', {
							rules: [{ required: true, message: '请选择车辆品牌', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="车辆型号&#12288;&#12288;&#12288;">
						{getFieldDecorator('cheliangxinghao', {
							rules: [{ required: true, message: '请输入车辆型号', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<br/>
					<FormItem label="长&nbsp;&nbsp;度(m)&#12288;">
						{getFieldDecorator('cheliangchangdu', {
							rules: [{ required: true, message: '请输入长度', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="高&nbsp;&nbsp;度(m)&#12288;&#12288;&#12288;&#12288;&#12288;">
						{getFieldDecorator('chelianggaodu', {
							rules: [{ required: true, message: '请输入高度', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="宽&nbsp;&nbsp;度(m)&#12288;&#12288;&#12288;">
						{getFieldDecorator('cheliangkuandu', {
							rules: [{ required: true, message: '请输入宽度', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<br/>
					<FormItem label="发动机型号">
						{getFieldDecorator('cheliangfadongjixinghao', {
							rules: [{ required: true, message: '请输入发动机型号', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="最大行驶速度(km/h)">
						{getFieldDecorator('cheliangzuidaxingshisudu', {
							rules: [{ required: true, message: '请输入最大行驶速度', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="车辆满载质量(T)">
						{getFieldDecorator('cheliangmanzaizhiliang', {
							rules: [{ required: true, message: '请输入车辆满载质量', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<br/>
					<FormItem label="采购时间&#12288;">
						{getFieldDecorator('caigoushijian', {
							rules: [{ required: true, message: '请选择采购时间'}],
						})(
							<DatePicker style={{margin:5,width:200}} placeholder="采购时间"/>
						)}
					</FormItem>
					<FormItem label="燃油种类&#12288;&#12288;&#12288;&#12288;&#12288;">
						{getFieldDecorator('ranyouzhonglei', {
							rules: [{ required: true, message: '请输入燃油种类'}],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="出厂时间&#12288;&#12288;&#12288;">
						{getFieldDecorator('chuchangshijian', {
							rules: [{ required: true, message: '请选择出厂时间'}],
						})(
							<DatePicker style={{margin:5,width:200}} placeholder="出厂时间"/>
						)}
					</FormItem>
					<br/>
					<FormItem label="水泵流量&#12288;">
						{getFieldDecorator('shuibengliuliang', {
							rules: [{ required: true, message: '请输入水泵流量'}],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="车载炮流量&#12288;&#12288;&#12288;&#12288;">
						{getFieldDecorator('chezaipaoliuliang', {
							rules: [{ required: true, message: '请输入车载炮流量'}],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="水炮射程&#12288;&#12288;&#12288;">
						{getFieldDecorator('shuipaoshecheng', {
							rules: [{ required: true, message: '请输入水炮射程'}],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<br/>
					<FormItem label="遥控距离&#12288;">
						{getFieldDecorator('yaokongjuli', {
							rules: [{ required: true, message: '请输入遥控距离'}],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="车载灭火剂&#12288;&#12288;&#12288;&#12288;">
						{getFieldDecorator('chezaimiehuoji', {
							rules: [{ required: true, message: '请输入车载灭火剂'}],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="是否沈阳所车辆">
						{getFieldDecorator('shifoushenyangsuocheliang', {
							rules: [{ required: true, message: '请选择是否沈阳所车辆', whitespace: true }],
						})(
							<Select
								style={{margin:5,width:200}}
								showSearch
								optionFilterProp="children"
								onChange={this.shifoushenyangChange.bind(this)}
							>
								<Select.Option value="是">是</Select.Option>
								<Select.Option value="否">否</Select.Option>
							</Select>
						)}
					</FormItem>
					<FormItem label="*&nbsp;沈阳所标识" style={{display:this.state.shoshenyangsuo}}>
						{getFieldDecorator('shenyangsuobiaoshi', {
							// rules: [{ required: true, message: '请输入沈阳所标识'}],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<br/>
					<FormItem label="适用范围&#12288;">
						{getFieldDecorator('shiyongfanwei', {
							rules: [{ required: true, message: '请填写适用范围'}],
						})(
							<TextArea autosize={{minRows:3}} style={{width:1000}}/>
						)}
					</FormItem>
					<br/>
					<FormItem label="&nbsp;&nbsp;&nbsp;车辆照片&#12288;">
						<div>
							<Upload
								{...uploadProps}
								listType="picture-card"
								fileList={fileList}
								onPreview={this.handlePreview}
								onChange={this.handleChange}
							>
								{fileList.length >= 5 ? null : uploadButton}
							</Upload>
							<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
								<img alt="example" style={{ width: '100%' }} src={previewImage} />
							</Modal>
							<div style={{clear:"both"}}></div>
						</div>
					</FormItem>
					<br/>
					<FormItem>
						<Button type="primary" icon="plus" htmlType="submit">保存</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}

const AppForm = Form.create()(App);
export default AppForm;
