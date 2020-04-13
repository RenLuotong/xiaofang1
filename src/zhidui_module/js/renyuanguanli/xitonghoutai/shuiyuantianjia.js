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
	Divider, DatePicker, Upload, Modal,InputNumber
} from 'antd';

const { TextArea } = Input;

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			previewVisible: false,
			previewImage: '',
			fileList: [],
			previewVisible2: false,
			previewImage2: '',
			fileList2: [],
			previewVisible3: false,
			previewImage3: '',
			fileList3: [],
			previewVisible4: false,
			previewImage4: '',
			fileList4: [],
			previewVisible5: false,
			previewImage5: '',
			fileList5: [],
			zuzhijigouList:[],
			feileiList:[],
			zhuangtaiList:[],
			leixingList:[],
            jiekouList:[],
            guanwangList:[],
            fangzhiList:[],
		};
	}

    getjiekouList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvjiekouxingshi",
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
                    jiekouList: list,
                });
            }
        });
    }
    getguanwangList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvguanwangxingshi",
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
                    guanwangList: list,
                });
            }
        });
    }
    getfangzhiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvfangzhixingshi",
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
                    fangzhiList: list,
                });
            }
        });
    }

	getfenleiList() {
		const THE = this;
		$.ajax({
			type:'GET',
			url: SERVER + "huoqvshuiyuanfenlei",
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
					feileiList: list,
				});
			}
		});
	}

	getzhuangtaiList() {
		const THE = this;
		$.ajax({
			type:'GET',
			url: SERVER + "huoqvshuiyuankeyongzhuangtai",
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
					zhuangtaiList: list,
				});
			}
		});
	}

	getleixingList() {
		const THE = this;
		$.ajax({
			type:'GET',
			url: SERVER + "huoqvshuiyuanleixing",
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
					leixingList: list,
				});
			}
		});
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

	handleCancel2 = () => this.setState({ previewVisible2: false })
	handlePreview2 = (file) => {
		this.setState({
			previewImage2: file.url || file.thumbUrl,
			previewVisible2: true,
		});
	}
	handleChange2= ({fileList}) => {
		this.setState({
			fileList2: fileList,
		});
	}


	handleCancel3 = () => this.setState({ previewVisible3: false })
	handlePreview3 = (file) => {
		this.setState({
			previewImage3: file.url || file.thumbUrl,
			previewVisible3: true,
		});
	}
	handleChange3 = ({fileList}) => {
		this.setState({
			fileList3: fileList,
		});
	}


	handleCancel4 = () => this.setState({ previewVisible4: false })
	handlePreview4 = (file) => {
		this.setState({
			previewImage4: file.url || file.thumbUrl,
			previewVisible4: true,
		});
	}
	handleChange4 = ({fileList}) => {
		this.setState({
			fileList4: fileList,
		});
	}


	handleCancel5 = () => this.setState({ previewVisible5: false })
	handlePreview5 = (file) => {
		this.setState({
			previewImage5: file.url || file.thumbUrl,
			previewVisible5: true,
		});
	}
	handleChange5 = ({fileList}) => {
		this.setState({
			fileList5: fileList,
		});
	}



	getZuzhijigouList() {
		const THE = this;
		$.ajax({
			type: 'GET',
			url: SERVER + "zuzhijiegouLiebiao?page=0&size=10000",
			success: function (data) {
				let list = [];
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				for (let i = 0; i < data.data.content.length; i++) {
					data.data.content[i]["key"] = i;
					list.push(data.data.content[i]);
				}
				THE.setState({
					zuzhijigouList: list,
				});
			}
		});
	}

	jianchengriqi = '';
	jianchengriqiChange(value) {
		this.jianchengriqi = value;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.toCreate();
			}
		});
	}

	toCreate() {
		const THE = this;
		let form = THE.props.form;
		let jigoumingcheng = form.getFieldValue('jigoumingcheng');
		if (jigoumingcheng === '' || jigoumingcheng === null || jigoumingcheng === undefined) {
			message.warning("请先选择组织机构！");
			return;
		}
		let shuiyuanmingcheng = form.getFieldValue('shuiyuanmingcheng');
		if (shuiyuanmingcheng === '' || shuiyuanmingcheng === null || shuiyuanmingcheng === undefined) {
			message.warning("请先输入水源名称！");
			return;
		}
		let fenlei = form.getFieldValue('fenlei');
		if (fenlei === '' || fenlei === null || fenlei === undefined) {
			message.warning("请先选择分类！");
			return;
		}
		let leixing = form.getFieldValue('leixing');
		if (leixing === '' || leixing === null || leixing === undefined) {
			message.warning("请先选择类型！");
			return;
		}
		let suoshuluduan = form.getFieldValue('suoshuluduan');
		if (suoshuluduan === '' || suoshuluduan === null || suoshuluduan === undefined) {
			message.warning("请先输入所属路段！");
			return;
		}
		let suoshuguanwang = form.getFieldValue('suoshuguanwang');
		// if (suoshuguanwang === '' || suoshuguanwang === null || suoshuguanwang === undefined) {
		// 	message.warning("请先输入所属管网！");
		// 	return;
		// }
		 let jingdu = form.getFieldValue('jingdu');
		// if (jingdu === '' || jingdu === null || jingdu === undefined) {
		// 	message.warning("请先输入经度！");
		// 	return;
		// }
		 let weidu = form.getFieldValue('weidu');
		// if (weidu === '' || weidu === null || weidu === undefined) {
		// 	message.warning("请先输入纬度！");
		// 	return;
		// }
		 let fangzhixingshi = form.getFieldValue('fangzhixingshi');
		// if (fangzhixingshi === '' || jigoumingcheng === null || fangzhixingshi === undefined) {
		// 	message.warning("请先输入放置形式！");
		// 	return;
		// }
		 let jiekouxingshi = form.getFieldValue('jiekouxingshi');
		// if (jiekouxingshi === '' || jiekouxingshi === null || jiekouxingshi === undefined) {
		// 	message.warning("请先输入接口形式！");
		// 	return;
		// }
		 let qushuixingshi = form.getFieldValue('qushuixingshi');
		// if (qushuixingshi === '' || qushuixingshi === null || qushuixingshi === undefined) {
		// 	message.warning("请先输入取水形式！");
		// 	return;
		// }
		 let guanwangxingshi = form.getFieldValue('guanwangxingshi');
		// if (guanwangxingshi === '' || guanwangxingshi === null || guanwangxingshi === undefined) {
		// 	message.warning("请先输入管网形式！");
		// 	return;
		// }
		 let guanwangzhijing = form.getFieldValue('guanwangzhijing');
		// if (guanwangzhijing === '' || guanwangzhijing === null || guanwangzhijing === undefined) {
		// 	message.warning("请先输入管网直径！");
		// 	return;
		// }
		 let guanwangyali = form.getFieldValue('guanwangyali');
		// if (guanwangyali === '' || guanwangyali === null || guanwangyali === undefined) {
		// 	message.warning("请先输入管网压力！");
		// 	return;
		// }
		 let liuliangdaxiao = form.getFieldValue('liuliangdaxiao');
		// if (liuliangdaxiao === '' || liuliangdaxiao === null || liuliangdaxiao === undefined) {
		// 	message.warning("请先输入流量大小！");
		// 	return;
		// }
		 let gongshuidanwei = form.getFieldValue('gongshuidanwei');
		// if (gongshuidanwei === '' || gongshuidanwei === null || gongshuidanwei === undefined) {
		// 	message.warning("请先输入供水单位！");
		// 	return;
		// }
		let keyongzhuangtai = form.getFieldValue('keyongzhuangtai');
		if (keyongzhuangtai === '' || keyongzhuangtai === null || keyongzhuangtai === undefined) {
			message.warning("请先选择可用状态！");
			return;
		}
		 let jianchengrqi = form.getFieldValue('jianchengrqi');
		// if (jianchengrqi === '' || jianchengrqi === null || jianchengrqi === undefined) {
		// 	message.warning("请先选择建成日期！");
		// 	return;
		// }
		//  let guanxiadanwei = form.getFieldValue('guanxiadanwei');
		// if (guanxiadanwei === '' || guanxiadanwei === null || guanxiadanwei === undefined) {
		// 	message.warning("请先输入管辖单位！");
		// 	return;
		// }
		//  let danweidaima = form.getFieldValue('danweidaima');
		// if (danweidaima === '' || danweidaima === null || danweidaima === undefined) {
		// 	message.warning("请先输入单位代码！");
		// 	return;
		// }
		let dizhimiaoshu = form.getFieldValue('dizhimiaoshu');
		if (dizhimiaoshu === '' || dizhimiaoshu === null || dizhimiaoshu === undefined) {
			message.warning("请先输入地址描述！");
			return;
		}
		let fileList = THE.state.fileList;
		let shijingtu = '';
		if (fileList.length > 0) {
			shijingtu = fileList[0]['response'];
		}
		let fileList2 = THE.state.fileList2;
		let fangweitudong = '';
		if (fileList2.length > 0) {
			fangweitudong = fileList2[0]['response'];
		}
		let fileList3 = THE.state.fileList3;
		let fangweituxi = '';
		if (fileList3.length > 0) {
			fangweituxi = fileList3[0]['response'];
		}
		let fileList4 = THE.state.fileList4;
		let fangweitunan = '';
		if (fileList4.length > 0) {
			fangweitunan = fileList4[0]['response'];
		}
		let fileList5 = THE.state.fileList5;
		let fangweitubei = '';
		if (fileList5.length > 0) {
			fangweitubei = fileList5[0]['response'];
		}

		let obj = {};
		// obj["jigoumingcheng"] = guanxiadanwei;
		// obj["jigoubianma"] = danweidaima;
		obj["dizhijingdu"] = jingdu;
		obj["dizhimiaoshu"] = dizhimiaoshu;
		obj["dizhiweidu"] = weidu;
		obj["fangweitubei"] = fangweitubei;
		obj["fangweitudong"] = fangweitudong;
		obj["fangweitunan"] = fangweitunan;
		obj["fangweituxi"] = fangweituxi;
		obj["fangzhixingshi"] = fangzhixingshi;
		obj["fenlei"] = fenlei;
		obj["gongshuidanwei"] = gongshuidanwei;
		obj["guanwangxingshi"] = guanwangxingshi;
		obj["guanwangyali"] = guanwangyali;
		obj["guanwangzhijing"] = guanwangzhijing;
		obj["jianchengriqi"] = jianchengrqi;
		obj["jiekouxingshi"] = jiekouxingshi;
		obj["zuzhijigoudaima"] = jigoumingcheng;
		obj["keyongzhuangtai"] =keyongzhuangtai;
		obj["leixing"] =leixing;
		obj["liuliangdaxiao"] =liuliangdaxiao;
		obj["mingcheng"] = shuiyuanmingcheng;
		obj["qushuixingshi"] =qushuixingshi;
		obj["shijingtu"] =shijingtu;
		obj["suoshuguanwang"] =suoshuguanwang;
		obj["suoshuluduan"] =suoshuluduan;
		obj["zhuangtai"] =keyongzhuangtai;
		if (!confirm("确定添加此水源")) {
			return;
		}
		$.ajax({
			type:'post',
			url:SERVER+"tianjiashuiyuan",
			data:JSON.stringify(obj),
			dataType:'json',
			contentType: "application/json",
			success:function(data){
				if(data.status != 0){
					message.warning(data.message);
					return;
				}
				message.success(data.message);
				THE.backPage();
			}
		});
	}

	backPage() {
		let role=sessionStorage.getItem("ROLE");
		if(role=="中队"){
			window.location.href = "./zhongdui.html#/renyuanguanli_zhiduiganbu_shuiyuanshezhi";
		}
		else if (role=="大队") {
			window.location.href = "./dadui.html#/renyuanguanli_zhiduiganbu_shuiyuanshezhi";
		}else{
			window.location.href = "./zhidui.html#/renyuanguanli_zhiduiganbu_shuiyuanshezhi";
		}
	}


	componentDidMount() {
		this.getZuzhijigouList();
		this.getfenleiList();
		this.getleixingList();
		this.getzhuangtaiList();

        this.getfangzhiList();
        this.getguanwangList();
        this.getjiekouList();
	}

	render() {

		const { previewVisible, previewImage, fileList,previewVisible2, previewImage2, fileList2,previewVisible3, previewImage3, fileList3,previewVisible4, previewImage4, fileList4,previewVisible5, previewImage5, fileList5 } = this.state;

		const feilei = this.state.feileiList.map(item => <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>);

		const leixing = this.state.leixingList.map(item => <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>);

		const zhuangtai = this.state.zhuangtaiList.map(item => <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>);

        const jiekou = this.state.jiekouList.map(item => <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>);

        const guanwang = this.state.guanwangList.map(item => <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>);

        const fangzhi = this.state.fangzhiList.map(item => <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>);

		let uploadProps = {
			name: 'files',
			action: SERVER+"files",
			headers: {
				Authorization:"Bearer "+sessionStorage.getItem("token")
			},
		};

		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">上传图片</div>
			</div>
		);

		const FormItem = Form.Item;
		const { getFieldDecorator } = this.props.form;

		const zuzhijigouOptions = this.state.zuzhijigouList.map(
			item => <Select.Option key={item['key']} value={item['jigoudaima']}>{item['jigoumingcheng']}</Select.Option>
		);

		return (
			<div>
				<Form layout="inline" onSubmit={this.handleSubmit}>
					<FormItem label="组织机构">
						{getFieldDecorator('jigoumingcheng', {
							rules: [{ required: true, message: '请输入机构名称', whitespace: true }],
						})(
							<Select style={{margin:5,width:200}}>
								{zuzhijigouOptions}
							</Select>
						)}
					</FormItem>
                    <FormItem label="所属管网">
                        {getFieldDecorator('suoshuguanwang', {
                        })(
							<Input style={{margin:5,width:200}}/>
                        )}
                    </FormItem>
					<FormItem label="管网形式">
                        {getFieldDecorator('guanwangxingshi', {
                            rules: [{ required: true, message: '请选择管网形式', whitespace: true }],
                        })(
							<Select style={{margin:5,width:200}}>
                                {guanwang}
							</Select>
                        )}
					</FormItem>
					<br/>
					<FormItem label="类型&#12288;&#12288;">
						{getFieldDecorator('leixing', {
							rules: [{ required: true, message: '请选择类型名称', whitespace: true }],
						})(
							<Select style={{margin:5,width:200}}>
								{leixing}
							</Select>
						)}
					</FormItem>
                    <FormItem label="&#12288;&#12288;纬度">
                        {getFieldDecorator('weidu', {
                        })(
                            <Input style={{margin:5,width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="放置形式">
                        {getFieldDecorator('fangzhixingshi', {
                            rules: [{ required: true, message: '请选择放置形式', whitespace: true }],
                        })(
							<Select style={{margin:5,width:200}}>
                                {fangzhi}
							</Select>
                        )}
                    </FormItem>
					<br/>
                    <FormItem label="水源名称">
                        {getFieldDecorator('shuiyuanmingcheng', {
                            rules: [{ required: true, message: '请输入水源名称', whitespace: true }],
                        })(
                            <Input style={{margin:5,width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="取水形式">
                        {getFieldDecorator('qushuixingshi', {
                        })(
                            <Input style={{margin:5,width:200}}/>
                        )}
                    </FormItem>
					<FormItem label="接口形式">
                        {getFieldDecorator('jiekouxingshi', {
                            rules: [{ required: true, message: '请选择接口形式', whitespace: true }],
                        })(
							<Select style={{margin:5,width:200}}>
                                {jiekou}
							</Select>
                        )}
					</FormItem>
					<br/>
                    <FormItem label="分类&#12288;&#12288;">
                        {getFieldDecorator('fenlei', {
                            rules: [{ required: true, message: '请输入分类名称', whitespace: true }],
                        })(
                            <Select style={{margin:5,width:200}}>
                                {feilei}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="管网直径">
                        {getFieldDecorator('guanwangzhijing', {
                        })(
                            <InputNumber style={{margin:5,width:200}}/>
                        )}
                    </FormItem>
					<FormItem label="&nbsp;&nbsp;&#12288;&#12288;经度">
                        {getFieldDecorator('jingdu', {
                        })(
							<Input style={{margin:5,width:200}}/>
                        )}
					</FormItem>
					<br/>
                    <FormItem label="所属路段">
                        {getFieldDecorator('suoshuluduan', {
                            rules: [{ required: true, message: '请输入所属路段', whitespace: true }],
                        })(
                            <Input style={{margin:5,width:200}}/>
                        )}
                    </FormItem>
					<FormItem label="管网压力">
						{getFieldDecorator('guanwangyali', {
						})(
							<InputNumber style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="&nbsp;&nbsp;流量大小">
						{getFieldDecorator('liuliangdaxiao', {
						})(
							<InputNumber style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<br/>
                    <FormItem label="可用状态">
                        {getFieldDecorator('keyongzhuangtai', {
                            rules: [{ required: true, message: '请输入可用状态', whitespace: true }],
                        })(
                            <Select style={{margin:5,width:200}}>
                                {zhuangtai}
                            </Select>
                        )}
                    </FormItem>
					<FormItem label="供水单位">
						{getFieldDecorator('gongshuidanwei', {
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="&nbsp;&nbsp;建成日期">
						{getFieldDecorator('jianchengrqi', {
						})(
							<DatePicker style={{margin:5,width:200}} placeholder="建成日期" onChange={this.jianchengriqiChange.bind(this)}/>
						)}
					</FormItem>
					{/*<br/>*/}
					{/*<FormItem label="&nbsp;&nbsp;管辖单位">*/}
						{/*{getFieldDecorator('guanxiadanwei', {*/}
						{/*})(*/}
							{/*<Input style={{margin:5,width:200}}/>*/}
						{/*)}*/}
					{/*</FormItem>*/}
					{/*<FormItem label="单位代码">*/}
						{/*{getFieldDecorator('danweidaima', {*/}
						{/*})(*/}
							{/*<Input style={{margin:5,width:200}}/>*/}
						{/*)}*/}
					{/*</FormItem>*/}
					<br/>
					<FormItem label="地址&#12288;&#12288;">
						{getFieldDecorator('dizhimiaoshu',{
							rules: [{ required: true, message: '请输入地址', whitespace: true }],
						})(
							<TextArea autosize={{minRows:3}}  style={{width:500}}/>
						)}
					</FormItem>
					<br/>
					<FormItem label="&#12288;实景图">
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
					</FormItem>
					<FormItem label="方位图东">
						<div>
							<Upload
								{...uploadProps}
								listType="picture-card"
								fileList={fileList2}
								onPreview={this.handlePreview2}
								onChange={this.handleChange2}
							>
								{fileList2.length >= 1 ? null : uploadButton}
							</Upload>
							<Modal visible={previewVisible2} footer={null} onCancel={this.handleCancel2}>
								<img alt="example" style={{ width: '100%' }} src={previewImage2} />
							</Modal>
							<div style={{clear:"both"}}></div>
						</div>
					</FormItem>
					<FormItem label="方位图西">
						<div>
							<Upload
								{...uploadProps}
								listType="picture-card"
								fileList={fileList3}
								onPreview={this.handlePreview3}
								onChange={this.handleChange3}
							>
								{fileList3.length >= 1 ? null : uploadButton}
							</Upload>
							<Modal visible={previewVisible3} footer={null} onCancel={this.handleCancel3}>
								<img alt="example" style={{ width: '100%' }} src={previewImage3} />
							</Modal>
							<div style={{clear:"both"}}></div>
						</div>
					</FormItem>
					<FormItem label="方位图南">
						<div>
							<Upload
								{...uploadProps}
								listType="picture-card"
								fileList={fileList4}
								onPreview={this.handlePreview4}
								onChange={this.handleChange4}
							>
								{fileList4.length >= 1 ? null : uploadButton}
							</Upload>
							<Modal visible={previewVisible4} footer={null} onCancel={this.handleCancel4}>
								<img alt="example" style={{ width: '100%' }} src={previewImage4} />
							</Modal>
							<div style={{clear:"both"}}></div>
						</div>
					</FormItem>
					<FormItem label="方位图北">
						<div>
							<Upload
								{...uploadProps}
								listType="picture-card"
								fileList={fileList5}
								onPreview={this.handlePreview5}
								onChange={this.handleChange5}
							>
								{fileList5.length >= 1 ? null : uploadButton}
							</Upload>
							<Modal visible={previewVisible5} footer={null} onCancel={this.handleCancel5}>
								<img alt="example" style={{ width: '100%' }} src={previewImage5} />
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
