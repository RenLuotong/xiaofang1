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
	Select, InputNumber, Upload, Modal
} from 'antd';
let id = 0;
const { TextArea } = Input;

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			previewVisible: false,
			previewImage: '',
			fileList: [],
			bianhao:this.props.match.params.bianhao,
			xiaqudanweiInfo:{},
			fenquList: [],
		};
	}

	//校验电话号码
	checkTel(value){
		var value=value.trim();
		var teshudianhua = /^[1][1,2,3,4,5,6,7,8,9][0,1,2,3,4,5,6,7,8,9]$/;
		var isPhone = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;
		var isMob = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
		// var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
		// var isMob=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
		if(isMob.test(value)||isPhone.test(value)||teshudianhua.test(value)){
			return true;
		}
		else{
			return false;
		}
	}

	getInfo() {
		const THE = this;
		let bianhao = THE.state.bianhao;
		$.ajax({
			type : 'GET',
			url : SERVER + "xiaqudanwei/detail/" + bianhao,
			success : function (data) {
				let list = [];
				if (data.status != 0) {

					message.warning(data.message);
					return;
				}
				THE.setState({
					xiaqudanweiInfo: data.data.danwei,
					fenquList: data.data.fenquList,
					fileList: [{
						uid: 0,
						name: 'a.png',
						status: 'done',
						url: data.data.danwei.tupian,
					}],
				});
			}
		});
	}

	toCreate() {
		const THE = this;
		let zhongzhi = false;
		const { getFieldValue } = THE.props.form;
		let fileList = THE.state.fileList;
		let xiaqudanweiInfo = THE.state.xiaqudanweiInfo;
		let fenquList = THE.state.fenquList;
		let pingmiantu = '';
		if (fileList.length > 0) {
			pingmiantu = fileList[0]['response'];
		}
		if (pingmiantu == "") {
			message.error("请上传平面图！");return;
		}
		xiaqudanweiInfo.tupian = pingmiantu;
		let  tbgongnengList = [];
		const keys = getFieldValue('keys');
		THE.props.form.validateFields((err, values) => {
			if (!err) {
				for (let i = 0; i < keys.length; i++) {
					let fenquweizhi = values.fenquweizhi[keys[i]];
					if (fenquweizhi == "" || typeof(fenquweizhi)=="undefined") {
						zhongzhi = true;
						message.warning("请输入分区位置！");return;
					}
					let cengmianji = values.cengmianji[keys[i]];
					let jibenqingkuang = values.jibenqingkuang[keys[i]];
					let zhongdianbuwei = values.zhongdianbuwei[keys[i]];
					let obj = {};
					obj.fenqu = fenquweizhi;
					obj.cengmianji = cengmianji;
					obj.jibenqingkuang = jibenqingkuang;
					obj.zhongdianbuwei = zhongdianbuwei;
					tbgongnengList.push(obj);
				}
			}
		});

		if(zhongzhi === true){
			return;
		}
		fenquList = fenquList.concat(tbgongnengList);
		let panduanchongfu = {};
		for(let i = 0;i<fenquList.length;i++){
			if(panduanchongfu[fenquList[i].fenqu] === undefined){
				panduanchongfu[fenquList[i].fenqu] =  fenquList[i].fenqu;
			}else{
				message.warning("功能分区不能重复！");return;
			}
		}

		xiaqudanweiInfo.fenquList = fenquList;
		let vm = {};
		vm = xiaqudanweiInfo;
		if(vm.zerenrendianhua !== ""){
			if(this.checkTel(vm.zerenrendianhua) === false){
				message.error("安全责任人电话格式不对！");return;
			}
		}
		if(vm.guanlirendianhua !== ""){
			if(this.checkTel(vm.guanlirendianhua) === false){
				message.error("安全管理人电话格式不对！");return;
			}
		}
		if(vm.xiaokongshidianhua !== ""){
			if(this.checkTel(vm.xiaokongshidianhua)=== false){
				message.error("消控室电话格式不对！");return;
			}
		}
		if (!confirm("确定修改此重点单位！")) {
			return;
		}
		let id = xiaqudanweiInfo.id;
		$.ajax({
			type : 'POST',
			url : SERVER+"xiaqudanwei/update/"+id,
			data : JSON.stringify(vm),
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

	backPage() {
		let role=sessionStorage.getItem("ROLE");
		if(role=="中队"){
			window.location.href = "./zhongdui.html#/shuju_zhongdui_zhongdiandanweiguanli";
		}
		else if (role=="大队") {
			window.location.href = "./dadui.html#/shuju_zhongdui_zhongdiandanweiguanli";
		}else {
			window.location.href = "./zhidui.html#/shuju_zhongdui_zhongdiandanweiguanli";
		}
	}

	removegongneng = (k) => {
		const { form } = this.props;
		let keys = form.getFieldValue('keys');
		keys = keys.filter(keys => keys !== k);
		form.setFieldsValue({
			keys: keys,
		});
	}

	addgongneng = () => {
		const { form } = this.props;
		const keys = form.getFieldValue('keys');
		const nextKeys = keys.concat(id++);
		form.setFieldsValue({
			keys: nextKeys,
		});
	}

	danweileixing = ''
	danweileixingChang(value) {
		this.danweileixing = value;
	}

	zidongbaojingxitong = ''
	zidongbaojingxitongChang(value) {
		this.zidongbaojingxitong = value;
	}

	zidongpenshuixitong = ''
	zidongpenshuixitongChang(value) {
		this.zidongpenshuixitong = value;
	}

	yingjiguangboxitong = ''
	yingjiguangboxitongChang(value) {
		this.yingjiguangboxitong = value;
	}

	fangpaiyanxitong = ''
	fangpaiyanxitongChang(value) {
		this.fangpaiyanxitong = value;
	}

	bugeifangshi = ''
	bugeifangshiChang(value) {
		this.bugeifangshi = value;
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

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let xiaqudanweiInfo = this.state.xiaqudanweiInfo;
		xiaqudanweiInfo[name] = value;
		this.setState({
			xiaqudanweiInfo : xiaqudanweiInfo
		});
	}

	handlenoInputChange(name,value) {
		let xiaqudanweiInfo = this.state.xiaqudanweiInfo;
		xiaqudanweiInfo[name] = value;
		this.setState({
			xiaqudanweiInfo : xiaqudanweiInfo
		});
	}

	removeChange(fenqu){
		let fenquList = this.state.fenquList;
		for(let i = 0;i < fenquList.length;i++){
			if(fenquList[i].fenqu === fenqu){
				fenquList.splice(i, 1);
			}
		}
		this.setState({
			fenquList : fenquList
		});
	}

	componentDidMount() {
		this.getInfo();
	}

	render() {

		let info = this.state.xiaqudanweiInfo;

		let fenquOptions = this.state.fenquList.map(item => <div style={{ margin: '5px'}}>
			<Input style={{margin:7,width:200 }} value={item['fenqu']}  readOnly="true"/><Input style={{margin:10,width:200 }} value={item['cengmianji']}  readOnly="true"/><Input style={{margin:10,width:200 }}value={item['jibenqingkuang']}  readOnly="true"/><Input style={{margin:10,width:200 }}value={item['zhongdianbuwei']}  readOnly="true"/><Icon
			className="dynamic-delete-button"
			type="minus-circle-o"
			onClick={this.removeChange.bind(this,item['fenqu'])}
		/>
		</div>);

		const { getFieldDecorator, getFieldValue } = this.props.form;
		let uploadProps = {
			name: 'files',
			action: SERVER+"files",
			headers: {
				Authorization:"Bearer "+sessionStorage.getItem("token")
			},
		};
		const { previewVisible, previewImage, fileList} = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">上传图片</div>
			</div>
		);

		//货架formItems
		getFieldDecorator('keys', { initialValue: [] });
		const keys = getFieldValue('keys');
		let gongnengformbiaoti = ''
		if(keys.length > 0 || this.state.fenquList.length > 0){
			gongnengformbiaoti = <div>
				<span style={{ marginLeft: 80,fontSize:16 }}>分区位置</span>
				<span style={{ marginLeft: 160,fontSize:16 }}>层面积(㎡)</span>
				<span style={{ marginLeft: 140,fontSize:16 }}>基本情况</span>
				<span style={{ marginLeft: 160,fontSize:16 }}>重点部位</span>
			</div>
		}
		const gongnengformItems = keys.map((k, index) => {
			return (
				<div
					key={k}
				>
					<Form.Item
						required={false}
						key={k}
					>
						{getFieldDecorator
						(`fenquweizhi[${k}]`, {
						})
						(
							<Input style={{margin:10,width:200 }} />
						)
						}
						{getFieldDecorator
						(`cengmianji[${k}]`, {
						})
						(
							<InputNumber min={0} style={{margin:10,width:200 }} />
						)
						}
						{getFieldDecorator
						(`jibenqingkuang[${k}]`, {
						})
						(
							<Input style={{margin:10,width:200 }} />
						)
						}
						{getFieldDecorator
						(`zhongdianbuwei[${k}]`, {
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
								onClick={() => this.removegongneng(k)}
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
						<Icon type="info" style={{color: '#1890ff'}}/>单位基本情况
					</p>
					<label>名称&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="danweimingcheng" style={{margin:10,width:200}} value={info['mingcheng']} onChange={this.handleInputChange.bind(this)} name="mingcheng"/>
					<label>单位类型&#12288;&#12288;&#12288;&#12288;:</label>
					<Select style={{margin:10,width:200}} value={info['biaoqian']} onChange={this.handlenoInputChange.bind(this,'biaoqian')}>
						<Select.Option value="高层建筑">高层建筑</Select.Option>
						<Select.Option value="危险品企业">危险品企业</Select.Option>
						<Select.Option value="人员密集场所">人员密集场所</Select.Option>
						<Select.Option value="大跨度大空间">大跨度大空间</Select.Option>
						<Select.Option value="大型商市场">大型商市场</Select.Option>
						<Select.Option value="城市综合体">城市综合体</Select.Option>
						<Select.Option value="地下建筑">地下建筑</Select.Option>
						<Select.Option value="居民社区">居民社区</Select.Option>
						<Select.Option value="村落">村落</Select.Option>
					</Select>
					<label>地址&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="dizhi" style={{margin:10,width:200}} placeholder="必须真实存在地址" value={info['dizhi']} onChange={this.handleInputChange.bind(this)} name="dizhi"/>
					<br/>
					<label>消防安全责任人&#12288;:</label>
					<Input size="default" id="xiaofanganquanzerenren" style={{margin:10,width:200}} value={info['zerenren']} onChange={this.handleInputChange.bind(this)} name="zerenren"/>
					<label>安全责任人电话&#12288;:</label>
					<Input size="default" id="anquanzerenrendianhua" style={{margin:10,width:200}} value={info['zerenrendianhua']} onChange={this.handleInputChange.bind(this)} name="zerenrendianhua"/>
					<label>消防安全管理人&#12288;:</label>
					<Input size="default" id="xiaofanganquanguanliren" style={{margin:10,width:200}} value={info['guanliren']} onChange={this.handleInputChange.bind(this)} name="guanliren"/>
					<br/>
					<label>安全管理人电话&#12288;:</label>
					<Input size="default" id="anquanguanlirendianhua" style={{margin:10,width:200}} value={info['guanlirendianhua']} onChange={this.handleInputChange.bind(this)} name="guanlirendianhua"/>
					<label>总人数&#12288;&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="renyuanqingkuang" style={{margin:10,width:200}} value={info['renshu']} onChange={this.handlenoInputChange.bind(this,'renshu')}/>
					<label>层数&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="cengshu" style={{margin:10,width:200}} value={info['cengshu']} onChange={this.handlenoInputChange.bind(this,'cengshu')}/>
					<br/>
					<label>建筑高度&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="jianzhugaodu" style={{margin:10,width:200}} placeholder="米" value={info['gaodu']} onChange={this.handlenoInputChange.bind(this,'gaodu')}/>
					<label>建筑结构&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="jianzhujiegou" style={{margin:10,width:200}} value={info['jianzhujiegou']} onChange={this.handleInputChange.bind(this)} name="jianzhujiegou"/>
					<label>占地面积&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="zhandimianji" style={{margin:10,width:200}} placeholder="平米" value={info['zhandimianji']} onChange={this.handlenoInputChange.bind(this,'zhandimianji')}/>
					<br/>
					<label>建筑面积&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="jianzhumianji" style={{margin:10,width:200}} placeholder="平米" value={info['jianzhumianji']} onChange={this.handlenoInputChange.bind(this,'jianzhumianji')}/>
					<label>使用性质&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="shiyongxingzhi" style={{margin:10,width:200}} value={info['shiyongxingzhi']} onChange={this.handleInputChange.bind(this)} name="shiyongxingzhi"/>
					<label>消防通道&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="xiaofangtongdao" style={{margin:10,width:200}} value={info['xiaofangtongdao']} onChange={this.handleInputChange.bind(this)} name="xiaofangtongdao"/>
					<br/>
					<label>路宽&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="lukuan" style={{margin:10,width:200}} placeholder="m" value={info['lukuan']} onChange={this.handlenoInputChange.bind(this,'lukuan')}/>
					<label>举高车展开位置&#12288;:</label>
					<Input size="default" id="jugaochezhankaiweizhi" style={{margin:10,width:200}} value={info['zhankaiweizhi']} onChange={this.handleInputChange.bind(this)} name="zhankaiweizhi"/>
					{/*<br/>*/}
					{/*<label>经度&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;:</label>*/}
					{/*<InputNumber min={0} size="default" id="jingdu" style={{margin:10,width:200}}/>*/}
					{/*<label>纬度&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;:</label>*/}
					{/*<InputNumber min={0} size="default" id="weidu" style={{margin:10,width:200}}/>*/}
					<br/>
					<label>单位总平面图&#12288;&#12288;:</label>
					<div>
						<Upload
							{...uploadProps}
							listType="picture-card"
							fileList={fileList}
							onPreview={this.handlePreview}
							onChange={this.handleChange}
						>
							{fileList.length >= 1 ? null : uploadButton}
						</Upload>
						<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
							<img alt="example" style={{ width: '100%' }} src={previewImage} />
						</Modal>
						<div style={{clear:"both"}}></div>
					</div>
				</div>
				<div>
					<p style={{fontSize:18,marginTop:20}}>
						<Icon type="info" style={{color: '#1890ff'}}/>主要消防设施
					</p>
					<label>消控室位置&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="xiaokongshiweizhi" style={{margin:10,width:200}} value={info['xiaokongshiweizhi']} onChange={this.handleInputChange.bind(this)} name="xiaokongshiweizhi"/>
					<label>消控室电话&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="xiaokongshidianhua" style={{margin:10,width:200}} value={info['xiaokongshidianhua']} onChange={this.handleInputChange.bind(this)} name="xiaokongshidianhua"/>
					<label>自动报警系统&#12288;&#12288;:</label>
					<Select style={{margin:10,width:200}} value={info['baojingxitong']} onChange={this.handlenoInputChange.bind(this,'baojingxitong')}>
						<Select.Option value={true}>有</Select.Option>
						<Select.Option value={false}>无</Select.Option>
					</Select>
					<br/>
					<label>自动喷水系统&#12288;&#12288;:</label>
					<Select style={{margin:10,width:200}} value={info['penshuixitong']} onChange={this.handlenoInputChange.bind(this,'penshuixitong')}>
						<Select.Option value={true}>有</Select.Option>
						<Select.Option value={false}>无</Select.Option>
					</Select>
					<label>应急广播系统&#12288;&#12288;:</label>
					<Select style={{margin:10,width:200}} value={info['yingjiguangbo']} onChange={this.handlenoInputChange.bind(this,'yingjiguangbo')}>
						<Select.Option value={true}>有</Select.Option>
						<Select.Option value={false}>无</Select.Option>
					</Select>
					<label>防排烟系统&#12288;&#12288;&#12288;:</label>
					<Select style={{margin:10,width:200}} value={info['fangpaiyan']} onChange={this.handlenoInputChange.bind(this,'fangpaiyan')}>
						<Select.Option value={true}>有</Select.Option>
						<Select.Option value={false}>无</Select.Option>
					</Select>
					<br/>
					<label>电源位置&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="dianyuanweizhi" style={{margin:10,width:200}} value={info['dianyuanweizhi']} onChange={this.handleInputChange.bind(this)} name="dianyuanweizhi"/>
					<label>气源位置&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="qiyuanweizhi" style={{margin:10,width:200}} value={info['qiyuanweizhi']} onChange={this.handleInputChange.bind(this)} name="qiyuanweizhi"/>
					<br/>
					<label>消防水池数&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaofangshuichishu" style={{margin:10,width:200}} value={info['shuichishu']} onChange={this.handlenoInputChange.bind(this,'shuichishu')}/>
					<label>消防水池位置&#12288;&#12288;:</label>
					<Input size="default" id="xiaofangshuichiweizhi" style={{margin:10,width:200}} value={info['shuichiweizhi']} onChange={this.handleInputChange.bind(this)} name="shuichiweizhi"/>
					<label>消防水池容量&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaofangshuichirongliang" style={{margin:10,width:200}} placeholder="立方米" value={info['shuichirongliang']} onChange={this.handlenoInputChange.bind(this,'shuichirongliang')}/>
					<br/>
					<label>消防水池补给方式:</label>
					<Input size="default" id="xiaofangshuichibugeifangshi" style={{margin:10,width:200}}  value={info['shuichibujifangshi']} onChange={this.handleInputChange.bind(this)} name="shuichibujifangshi"/>
					<label>消防水池补给流量:</label>
					<InputNumber min={0} size="default" id="xiaofangshuichibugeiliuliang" placeholder="L/s" style={{margin:10,width:200}} value={info['shuichibujiliuliang']} onChange={this.handlenoInputChange.bind(this,'shuichibujiliuliang')}/>
					<br/>
					<label>消防水箱数&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaofangshuixiang" style={{margin:10,width:200}} value={info['shuixiangshu']} onChange={this.handlenoInputChange.bind(this,'shuixiangshu')}/>
					<label>消防水箱位置&#12288;&#12288;:</label>
					<Input size="default" id="xiaofangshuixiangweizhi" style={{margin:10,width:200}} value={info['shuixiangweizhi']} onChange={this.handleInputChange.bind(this)} name="shuixiangweizhi"/>
					<label>消防水箱容量&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaofangshuixiangrongliang" style={{margin:10,width:200}} placeholder="立方米" value={info['shuixiangrongliang']} onChange={this.handlenoInputChange.bind(this,'shuixiangrongliang')}/>
					<br/>
					<label>消防水箱补给方式:</label>
					<Input size="default" id="xiaofangshuixiangbugeifangshi" style={{margin:10,width:200}} value={info['shuixiangbujifangshi']} onChange={this.handleInputChange.bind(this)} name="shuixiangbujifangshi"/>
					<label>消防水箱补给流量:</label>
					<InputNumber min={0} size="default" id="xiaofangshuixiangbugeiliuliang" style={{margin:10,width:200}} placeholder="L/s" value={info['shuixiangbujiliuliang']} onChange={this.handlenoInputChange.bind(this,'shuixiangbujiliuliang')}/>
					<label>1500米内水源&#12288;&#12288;:</label>
					<Input size="default" id="fanweishuiyuan" style={{margin:10,width:200}} value={info['shuiyuan']} onChange={this.handleInputChange.bind(this)} name="shuiyuan"/>
					<br/>
					<label>室外栓数&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="shiwaishuanshu" style={{margin:10,width:200}} value={info['shiwaishuanshu']} onChange={this.handlenoInputChange.bind(this,'shiwaishuanshu')}/>
					<label>室外管网&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="shiwaiguanwang" style={{margin:10,width:200}} placeholder="mm" value={info['guanwang']} onChange={this.handlenoInputChange.bind(this,'guanwang')}/>
					<label>室外最大使用数&#12288;:</label>
					<InputNumber min={0} size="default" id="shiwaizuidashiyongshu" style={{margin:10,width:200}} value={info['shiwaishuanzuida']} onChange={this.handlenoInputChange.bind(this,'shiwaishuanzuida')}/>
					<br/>
					<label>室内最大使用数&#12288;:</label>
					<InputNumber min={0} size="default" id="shineizuidashiyongshu" style={{margin:10,width:200}} value={info['shineishuanzuida']} onChange={this.handlenoInputChange.bind(this,'shineishuanzuida')}/>
					<label>室内栓楼层及数量:</label>
					<Input size="default" id="shineishuanloucengjishuliang" style={{margin:10,width:200}} value={info['zuishaoshineishuan']} onChange={this.handleInputChange.bind(this)} name="zuishaoshineishuan"/>
					<br/>
					<label>消火栓泵数量&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaohuoshuanbengshuliang" style={{margin:10,width:200}} value={info['shuanshu']} onChange={this.handlenoInputChange.bind(this,'shuanshu')}/>
					<label>消火栓泵流量&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaohuoshuanbengliuliang" style={{margin:10,width:200}} placeholder="L/s" value={info['shuanliuliang']} onChange={this.handlenoInputChange.bind(this,'shuanliuliang')}/>
					<label>消火栓泵位置&#12288;&#12288;:</label>
					<Input size="default" id="xiaohuoshuanbengweizhi" style={{margin:10,width:200}} value={info['shuanweizhi']} onChange={this.handleInputChange.bind(this)} name="shuanweizhi"/>
					<br/>
					<label>消火栓水泵接合器:</label>
					<Input size="default" id="xiaohuoshuanbengjieheqi" style={{margin:10,width:200}} value={info['shuanjieheqi']} onChange={this.handleInputChange.bind(this)} name="shuanjieheqi"/>
					<label>消火栓泵保护范围:</label>
					<Input size="default" id="xiaohuoshuanbengbaohufanwei" style={{margin:10,width:200}} value={info['shuanfanwei']} onChange={this.handleInputChange.bind(this)} name="shuanfanwei"/>
					<br/>
					<label>喷淋泵数量&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="penlinbengshuliang" style={{margin:10,width:200}} value={info['bengshu']} onChange={this.handlenoInputChange.bind(this,'bengshu')}/>
					<label>喷淋泵流量&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="penlinbengliuliang" style={{margin:10,width:200}} placeholder="L/s" value={info['bengliuliang']} onChange={this.handlenoInputChange.bind(this,'bengliuliang')}/>
					<label>喷淋泵位置&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="penlinbengweizhi" style={{margin:10,width:200}} value={info['bengweizhi']} onChange={this.handleInputChange.bind(this)} name="bengweizhi"/>
					<br/>
					<label>喷淋泵水泵接合器:</label>
					<Input size="default" id="penlinbengjieheqi" style={{margin:10,width:200}} value={info['bengjieheqi']} onChange={this.handleInputChange.bind(this)} name="bengjieheqi"/>
					<label>喷淋泵保护范围&#12288;:</label>
					<Input size="default" id="penlinbengbaohufanwei" style={{margin:10,width:200}} value={info['bengfanwei']} onChange={this.handleInputChange.bind(this)} name="bengfanwei"/>
				</div>
				{/*<div>*/}
				{/*	<p style={{fontSize:18,marginTop:20}}>*/}
				{/*		<Icon type="info" style={{color: '#1890ff'}}/>重点提示*/}
				{/*	</p>*/}
				{/*	<TextArea autosize={{minRows:3}} id="zhongdiantishi" style={{width:1000,marginLeft:2}}/>*/}
				{/*</div>*/}
				<div>
					<p style={{fontSize:18,marginTop:20}}>
						<Icon type="info" style={{color: '#1890ff'}}/>功能分区
					</p>
					{gongnengformbiaoti}
					{fenquOptions}
					{gongnengformItems}
					<br/>
					<Form.Item>
						<Button type="dashed" onClick={this.addgongneng}>
							<Icon type="plus" />功能分区添加
						</Button>
					</Form.Item>
				</div>
				<br/>
				<Button type="primary" icon="plus" onClick={this.toCreate.bind(this)}>保存</Button>
			</div>
		);
	}
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(App);
export default WrappedApp;

