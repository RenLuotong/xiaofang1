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

	toCreate() {
		const THE = this;
		let zhongzhi = false;
		const { getFieldValue } = THE.props.form;
		let danweimingcheng = $("#danweimingcheng").val().trim();
		let danweileixing = THE.danweileixing;
		let dizhi = $("#dizhi").val().trim();
		let xiaofanganquanzerenren = $("#xiaofanganquanzerenren").val().trim();
		let anquanzerenrendianhua = $("#anquanzerenrendianhua").val().trim();
		let xiaofanganquanguanliren = $("#xiaofanganquanguanliren").val().trim();
		let anquanguanlirendianhua = $("#anquanguanlirendianhua").val().trim();
		let renyuanqingkuang = $("#renyuanqingkuang").val().trim();
		let cengshu = $("#cengshu").val().trim();
		let jianzhugaodu = $("#jianzhugaodu").val().trim();
		let jianzhujiegou = $("#jianzhujiegou").val().trim();
		let zhandimianji = $("#zhandimianji").val().trim();
		let jianzhumianji = $("#jianzhumianji").val().trim();
		let shiyongxingzhi = $("#shiyongxingzhi").val().trim();
		let xiaofangtongdao = $("#xiaofangtongdao").val().trim();
		let lukuan = $("#lukuan").val().trim();
		let jugaochezhankaiweizhi = $("#jugaochezhankaiweizhi").val().trim();


		let xiaokongshiweizhi = $("#xiaokongshiweizhi").val().trim();
		let xiaokongshidianhua = $("#xiaokongshidianhua").val().trim();
		let zidongbaojingxitong = THE.zidongbaojingxitong;
		let zidongpenshuixitong = THE.zidongpenshuixitong;
		let yingjiguangboxitong = THE.yingjiguangboxitong;
		let fangpaiyanxitong = THE.fangpaiyanxitong;
		let dianyuanweizhi = $("#dianyuanweizhi").val().trim();
		let qiyuanweizhi = $("#qiyuanweizhi").val().trim();
		let xiaofangshuichishu = $("#xiaofangshuichishu").val().trim();
		let xiaofangshuichiweizhi = $("#xiaofangshuichiweizhi").val().trim();
		let xiaofangshuichirongliang = $("#xiaofangshuichirongliang").val().trim();
		let xiaofangshuixiang = $("#xiaofangshuixiang").val().trim();
		let xiaofangshuixiangweizhi = $("#xiaofangshuixiangweizhi").val().trim();
		let xiaofangshuixiangrongliang = $("#xiaofangshuixiangrongliang").val().trim();
		let xiaofangshuichibugeifangshi = $("#xiaofangshuichibugeifangshi").val().trim();
		let xiaofangshuichibugeiliuliang = $("#xiaofangshuichibugeiliuliang").val().trim();
		let xiaofangshuixiangbugeifangshi = $("#xiaofangshuixiangbugeifangshi").val().trim();
		let xiaofangshuixiangbugeiliuliang = $("#xiaofangshuixiangbugeiliuliang").val().trim();
		let fanweishuiyuan = $("#fanweishuiyuan").val().trim();
		let shiwaishuanshu = $("#shiwaishuanshu").val().trim();
		let shiwaiguanwang = $("#shiwaiguanwang").val().trim();
		let shiwaizuidashiyongshu = $("#shiwaizuidashiyongshu").val().trim();
		let shineizuidashiyongshu = $("#shineizuidashiyongshu").val().trim();
		let shineishuanloucengjishuliang = $("#shineishuanloucengjishuliang").val().trim();
		let xiaohuoshuanbengshuliang = $("#xiaohuoshuanbengshuliang").val().trim();
		let xiaohuoshuanbengliuliang = $("#xiaohuoshuanbengliuliang").val().trim();
		let xiaohuoshuanbengweizhi = $("#xiaohuoshuanbengweizhi").val().trim();
		let xiaohuoshuanbengjieheqi = $("#xiaohuoshuanbengjieheqi").val().trim();
		let xiaohuoshuanbengbaohufanwei = $("#xiaohuoshuanbengbaohufanwei").val().trim();
		let penlinbengshuliang = $("#penlinbengshuliang").val().trim();
		let penlinbengliuliang = $("#penlinbengliuliang").val().trim();
		let penlinbengweizhi = $("#penlinbengweizhi").val().trim();
		let penlinbengjieheqi = $("#penlinbengjieheqi").val().trim();
		let penlinbengbaohufanwei = $("#penlinbengbaohufanwei").val().trim();
		// let zhongdiantishi = $("#zhongdiantishi").val().trim();
		// let jingdu = $("#jingdu").val().trim();
		// let weidu = $("#weidu").val().trim();
		let fileList = THE.state.fileList;
		let pingmiantu = '';
		if (fileList.length > 0) {
			pingmiantu = fileList[0]['response'];
		}

		if (danweimingcheng == "") {
			message.error("请输入单位名称！");return;
		}
		if (danweileixing == "") {
			message.error("请选择单位类型！");return;

		}
		if (dizhi == "") {
			message.error("请输入单位地址！");return;
		}
		if (xiaofanganquanzerenren == "") {
			message.error("请输入消防安全责任人！");return;
		}
		if (anquanzerenrendianhua == "") {
			message.error("请输入安全责任人电话！");return;
		}
		if(this.checkTel(anquanzerenrendianhua) === false){
			message.error("安全责任人电话格式不对！");return;
		}
		if (xiaofanganquanguanliren == "") {
			message.error("请输入消防安全管理人！");return;
		}
		if (anquanguanlirendianhua == "") {
			message.error("请输入安全管理人电话！");return;
		}
		if(this.checkTel(anquanguanlirendianhua) === false){
			message.error("安全管理人电话格式不对！");return;
		}
		if(xiaokongshidianhua !== ""){
			if(this.checkTel(xiaokongshidianhua)=== false){
				message.error("消控室电话格式不对！");return;
			}
		}
		if (renyuanqingkuang == "") {
			message.error("请输入人员情况！");return;
		}
		if (cengshu == "") {
			message.error("请输入层数！");return;
		}
		if (jianzhugaodu == "") {
			message.error("请输入建筑高度！");return;
		}
		if (jianzhujiegou == "") {
			message.error("请输入建筑结构！");return;
		}
		if (zhandimianji == "") {
			message.error("请输入占地面积！");return;
		}
		if (jianzhumianji == "") {
			message.error("请输入建筑面积！");return;
		}
		if (shiyongxingzhi == "") {
			message.error("请输入使用性质！");return;
		}
		if (xiaofangtongdao == "") {
			message.error("请输入消防通道！");return;
		}
		if (lukuan == "") {
			message.error("请输入路宽！");return;
		}
		if (jugaochezhankaiweizhi == "") {
			message.error("请输入举高车展开位置！");return;
		}
		// if (jingdu == "") {
		// 	message.error("请输入经度！");return;
		// }
		// if (weidu == "") {
		// 	message.error("请输入纬度！");return;
		// }
		if (pingmiantu == "") {
			message.error("请上传平面图！");return;
		}
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
		let panduanchongfu = {};
		for(let i = 0;i<tbgongnengList.length;i++){
			if(panduanchongfu[tbgongnengList[i].fenqu] === undefined){
				panduanchongfu[tbgongnengList[i].fenqu] =  tbgongnengList[i].fenqu;
			}else{
				message.warning("功能分区不能重复！");return;
			}
		}

		if (!confirm("确定添加此重点单位！")) {
			return;
		}
		let vm = {};
		vm["mingcheng"] = danweimingcheng;
		vm["biaoqian"] = danweileixing;
		vm["dizhi"] = dizhi;
		vm["zerenren"] = xiaofanganquanzerenren;
		vm["zerenrendianhua"] = anquanzerenrendianhua;
		vm["guanliren"] = xiaofanganquanguanliren;
		vm["guanlirendianhua"] = anquanguanlirendianhua;
		vm["renshu"] = renyuanqingkuang;
		vm["cengshu"] = cengshu;
		vm["gaodu"] = jianzhugaodu;
		vm["jianzhujiegou"] = jianzhujiegou;
		vm["zhandimianji"] = zhandimianji;
		vm["jianzhumianji"] = jianzhumianji;
		vm["shiyongxingzhi"] = shiyongxingzhi;
		vm["xiaofangtongdao"] = xiaofangtongdao;
		vm["lukuan"] = lukuan;
		vm["zhankaiweizhi"] = jugaochezhankaiweizhi;
		vm["xiaokongshiweizhi"] = xiaokongshiweizhi;
		vm["xiaokongshidianhua"] = xiaokongshidianhua;
		vm["baojingxitong"] = zidongbaojingxitong;
		vm["penshuixitong"] = zidongpenshuixitong;
		vm["yingjiguangbo"] = yingjiguangboxitong;
		vm["fangpaiyan"] = fangpaiyanxitong;
		vm["dianyuanweizhi"] = dianyuanweizhi;
		vm["qiyuanweizhi"] = qiyuanweizhi;
		vm["shuichishu"] = xiaofangshuichishu;
		vm["shuichiweizhi"] = xiaofangshuichiweizhi;
		vm["shuichirongliang"] = xiaofangshuichirongliang;
		vm["shuichibujifangshi"] = xiaofangshuichibugeifangshi;
		vm["shuichibujiliuliang"] = xiaofangshuichibugeiliuliang;
		vm["shuixiangshu"] = xiaofangshuixiang;
		vm["shuixiangweizhi"] = xiaofangshuixiangweizhi;
		vm["shuixiangrongliang"] = xiaofangshuixiangrongliang;
		vm["shuixiangbujifangshi"] = xiaofangshuixiangbugeifangshi;
		vm["shuixiangbujiliuliang"] = xiaofangshuixiangbugeiliuliang;
		vm["shuiyuan"] = fanweishuiyuan;
		vm["shiwaishuanshu"] = shiwaishuanshu;
		vm["guanwang"] = shiwaiguanwang;
		vm["shiwaishuanzuida"] = shiwaizuidashiyongshu;
		vm["shineishuanzuida"] = shineizuidashiyongshu;
		vm["zuishaoshineishuan"] = shineishuanloucengjishuliang;
		vm["shuanshu"] = xiaohuoshuanbengshuliang;
		vm["shuanliuliang"] = xiaohuoshuanbengliuliang;
		vm["shuanweizhi"] = xiaohuoshuanbengweizhi;
		vm["shuanjieheqi"] = xiaohuoshuanbengjieheqi;
		vm["shuanfanwei"] = xiaohuoshuanbengbaohufanwei;

		vm["bengshu"] = penlinbengshuliang;
		vm["bengliuliang"] = penlinbengliuliang;
		vm["bengweizhi"] = penlinbengweizhi;
		vm["bengjieheqi"] = penlinbengjieheqi;
		vm["bengfanwei"] = penlinbengbaohufanwei;

		// vm["jingdu"] = jingdu;
		// vm["weidu"] = weidu;
		vm["tupian"] = pingmiantu;



		vm["fenquList"] = tbgongnengList;
		$.ajax({
			type : 'POST',
			url : SERVER+"xiaqudanwei/create",
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

	componentDidMount() {
	}

	render() {

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
		if(keys.length > 0){
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
					<Input size="default" id="danweimingcheng" style={{margin:10,width:200}}/>
					<label>单位类型&#12288;&#12288;&#12288;&#12288;:</label>
					<Select style={{margin:10,width:200}} onChange={this.danweileixingChang.bind(this)}>
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
					<Input size="default" id="dizhi" style={{margin:10,width:200}} placeholder="必须真实存在地址"/>
					<br/>
					<label>消防安全责任人&#12288;:</label>
					<Input size="default" id="xiaofanganquanzerenren" style={{margin:10,width:200}}/>
					<label>安全责任人电话&#12288;:</label>
					<Input size="default" id="anquanzerenrendianhua" style={{margin:10,width:200}}/>
					<label>消防安全管理人&#12288;:</label>
					<Input size="default" id="xiaofanganquanguanliren" style={{margin:10,width:200}}/>
					<br/>
					<label>安全管理人电话&#12288;:</label>
					<Input size="default" id="anquanguanlirendianhua" style={{margin:10,width:200}}/>
					<label>总人数&#12288;&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="renyuanqingkuang" style={{margin:10,width:200}}/>
					<label>层数&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="cengshu" style={{margin:10,width:200}}/>
					<br/>
					<label>建筑高度&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="jianzhugaodu" style={{margin:10,width:200}} placeholder="米"/>
					<label>建筑结构&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="jianzhujiegou" style={{margin:10,width:200}}/>
					<label>占地面积&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="zhandimianji" style={{margin:10,width:200}} placeholder="平米"/>
					<br/>
					<label>建筑面积&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="jianzhumianji" style={{margin:10,width:200}} placeholder="平米"/>
					<label>使用性质&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="shiyongxingzhi" style={{margin:10,width:200}}/>
					<label>消防通道&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="xiaofangtongdao" style={{margin:10,width:200}}/>
					<br/>
					<label>路宽&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="lukuan" style={{margin:10,width:200}} placeholder="m"/>
					<label>举高车展开位置&#12288;:</label>
					<Input size="default" id="jugaochezhankaiweizhi" style={{margin:10,width:200}}/>
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
					<Input size="default" id="xiaokongshiweizhi" style={{margin:10,width:200}}/>
					<label>消控室电话&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="xiaokongshidianhua" style={{margin:10,width:200}}/>
					<label>自动报警系统&#12288;&#12288;:</label>
					<Select style={{margin:10,width:200}} onChange={this.zidongbaojingxitongChang.bind(this)}>
						<Select.Option value="true">有</Select.Option>
						<Select.Option value="false">无</Select.Option>
					</Select>
					<br/>
					<label>自动喷水系统&#12288;&#12288;:</label>
					<Select style={{margin:10,width:200}} onChange={this.zidongpenshuixitongChang.bind(this)}>
						<Select.Option value="true">有</Select.Option>
						<Select.Option value="false">无</Select.Option>
					</Select>
					<label>应急广播系统&#12288;&#12288;:</label>
					<Select style={{margin:10,width:200}} onChange={this.yingjiguangboxitongChang.bind(this)}>
						<Select.Option value="true">有</Select.Option>
						<Select.Option value="false">无</Select.Option>
					</Select>
					<label>防排烟系统&#12288;&#12288;&#12288;:</label>
					<Select style={{margin:10,width:200}} onChange={this.fangpaiyanxitongChang.bind(this)}>
						<Select.Option value="true">有</Select.Option>
						<Select.Option value="false">无</Select.Option>
					</Select>
					<br/>
					<label>电源位置&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="dianyuanweizhi" style={{margin:10,width:200}}/>
					<label>气源位置&#12288;&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="qiyuanweizhi" style={{margin:10,width:200}}/>
					<br/>
					<label>消防水池数&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaofangshuichishu" style={{margin:10,width:200}}/>
					<label>消防水池位置&#12288;&#12288;:</label>
					<Input size="default" id="xiaofangshuichiweizhi" style={{margin:10,width:200}}/>
					<label>消防水池容量&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaofangshuichirongliang" style={{margin:10,width:200}} placeholder="立方米"/>
					<br/>
					<label>消防水池补给方式:</label>
					<Input size="default" id="xiaofangshuichibugeifangshi" style={{margin:10,width:200}}/>
					<label>消防水池补给流量:</label>
					<InputNumber min={0} size="default" id="xiaofangshuichibugeiliuliang" style={{margin:10,width:200}} placeholder="L/s"/>
					<br/>
					<label>消防水箱数&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaofangshuixiang" style={{margin:10,width:200}}/>
					<label>消防水箱位置&#12288;&#12288;:</label>
					<Input size="default" id="xiaofangshuixiangweizhi" style={{margin:10,width:200}}/>
					<label>消防水箱容量&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaofangshuixiangrongliang" style={{margin:10,width:200}} placeholder="立方米"/>
					<br/>
					<label>消防水箱补给方式:</label>
					<Input size="default" id="xiaofangshuixiangbugeifangshi" style={{margin:10,width:200}}/>
					<label>消防水箱补给流量:</label>
					<InputNumber min={0} size="default" id="xiaofangshuixiangbugeiliuliang" style={{margin:10,width:200}} placeholder="L/s"/>
					<label>1500米内水源&#12288;&#12288;:</label>
					<Input size="default" id="fanweishuiyuan" style={{margin:10,width:200}}/>
					<br/>
					<label>室外栓数&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="shiwaishuanshu" style={{margin:10,width:200}}/>
					<label>室外管网&#12288;&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="shiwaiguanwang" style={{margin:10,width:200}} placeholder="mm"/>
					<label>室外最大使用数&#12288;:</label>
					<InputNumber min={0} size="default" id="shiwaizuidashiyongshu" style={{margin:10,width:200}}/>
					<br/>
					<label>室内最大使用数&#12288;:</label>
					<InputNumber min={0} size="default" id="shineizuidashiyongshu" style={{margin:10,width:200}}/>
					<label>室内栓楼层及数量:</label>
					<Input size="default" id="shineishuanloucengjishuliang" style={{margin:10,width:200}}/>
					<br/>
					<label>消火栓泵数量&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaohuoshuanbengshuliang" style={{margin:10,width:200}}/>
					<label>消火栓泵流量&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="xiaohuoshuanbengliuliang" style={{margin:10,width:200}} placeholder="L/s"/>
					<label>消火栓泵位置&#12288;&#12288;:</label>
					<Input size="default" id="xiaohuoshuanbengweizhi" style={{margin:10,width:200}}/>
					<br/>
					<label>消火栓水泵接合器:</label>
					<Input size="default" id="xiaohuoshuanbengjieheqi" style={{margin:10,width:200}}/>
					<label>消火栓泵保护范围:</label>
					<Input size="default" id="xiaohuoshuanbengbaohufanwei" style={{margin:10,width:200}}/>
					<br/>
					<label>喷淋泵数量&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="penlinbengshuliang" style={{margin:10,width:200}}/>
					<label>喷淋泵流量&#12288;&#12288;&#12288;:</label>
					<InputNumber min={0} size="default" id="penlinbengliuliang" style={{margin:10,width:200}} placeholder="L/s"/>
					<label>喷淋泵位置&#12288;&#12288;&#12288;:</label>
					<Input size="default" id="penlinbengweizhi" style={{margin:10,width:200}}/>
					<br/>
					<label>喷淋泵水泵接合器:</label>
					<Input size="default" id="penlinbengjieheqi" style={{margin:10,width:200}}/>
					<label>喷淋泵保护范围&#12288;:</label>
					<Input size="default" id="penlinbengbaohufanwei" style={{margin:10,width:200}}/>
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
					<Form layout="inline">
						{gongnengformbiaoti}
						{gongnengformItems}
						<br/>
						<Form.Item>
							<Button type="dashed" onClick={this.addgongneng}>
								<Icon type="plus" />功能分区添加
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

