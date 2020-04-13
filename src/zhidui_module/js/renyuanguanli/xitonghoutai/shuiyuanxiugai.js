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
import moment from 'moment';

const { TextArea } = Input;

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id:this.props.match.params.id,
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
			zhuangbeiInfo:{},
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

	getInfo() {
		const THE = this;
		let id = THE.state.id;
		$.ajax({
			type : 'GET',
			url : SERVER + "huoqvshuiyuanxiangqing?id=" + id,
			success : function (data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				if ( data.data["jianchengriqi"] !== null &&  data.data["jianchengriqi"] !== '') {
					data.data["jianchengriqi"] = moment(data.data["jianchengriqi"] );
				}
				THE.setState({
					zhuangbeiInfo: data.data,
					fileList: [{
						uid: 0,
						name: 'a.png',
						status: 'done',
						url: data.data['shijingtu'],
						response: data.data['shijingtu'],
					}],
					fileList2: [{
						uid: 0,
						name: 'a.png',
						status: 'done',
						url: data.data['fangweitudong'],
						response: data.data['fangweitudong'],
					}],
					fileList3: [{
						uid: 0,
						name: 'a.png',
						status: 'done',
						url: data.data['fangweituxi'],
						response: data.data['fangweituxi'],
					}],
					fileList4: [{
						uid: 0,
						name: 'a.png',
						status: 'done',
						url: data.data['fangweitunan'],
						response: data.data['fangweitunan'],
					}],
					fileList5: [{
						uid: 0,
						name: 'a.png',
						status: 'done',
						url: data.data['fangweitubei'],
						response: data.data['fangweitubei'],
					}],
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

	toUpdate() {
		const THE = this;
		let zhuangbeiInfo = THE.state.zhuangbeiInfo;
		let jigoumingcheng = zhuangbeiInfo.zuzhijigoudaima;
		if (jigoumingcheng === '' || jigoumingcheng === null || jigoumingcheng === undefined) {
			message.warning("请先选择组织机构！");
			return;
		}
		let shuiyuanmingcheng = zhuangbeiInfo.mingcheng;
		if (shuiyuanmingcheng === '' || shuiyuanmingcheng === null || shuiyuanmingcheng === undefined) {
			message.warning("请先输入水源名称！");
			return;
		}
		let fenlei = zhuangbeiInfo.fenleiyingwen;
		if (fenlei === '' || fenlei === null || fenlei === undefined) {
			message.warning("请先选择分类！");
			return;
		}else{
            zhuangbeiInfo.fenlei = fenlei;
        }
		let leixing = zhuangbeiInfo.leixingyingwen;
		if (leixing === '' || leixing === null || leixing === undefined) {
			message.warning("请先选择类型！");
			return;
		}else{
            zhuangbeiInfo.leixing = leixing;
        }
		let suoshuluduan = zhuangbeiInfo.suoshuluduan;
		if (suoshuluduan === '' || suoshuluduan === null || suoshuluduan === undefined) {
			message.warning("请先输入所属路段！");
			return;
		}
		let suoshuguanwang = zhuangbeiInfo.suoshuguanwang;
		// if (suoshuguanwang === '' || suoshuguanwang === null || suoshuguanwang === undefined) {
		// 	message.warning("请先输入所属管网！");
		// 	return;
		// }
		let jingdu = zhuangbeiInfo.dizhijingdu;
		// if (jingdu === '' || jingdu === null || jingdu === undefined) {
		// 	message.warning("请先输入经度！");
		// 	return;
		// }
		let weidu = zhuangbeiInfo.dizhiweidu;
		// if (weidu === '' || weidu === null || weidu === undefined) {
		// 	message.warning("请先输入纬度！");
		// 	return;
		// }
		let fangzhixingshi = zhuangbeiInfo.fangzhixingshiyingwen;
        if (fangzhixingshi === '' || fangzhixingshi === null || fangzhixingshi === undefined) {
            message.warning("请先选择放置形式！");
            return;
        }else{
            zhuangbeiInfo.fangzhixingshi = fangzhixingshi;
        }
		let jiekouxingshi = zhuangbeiInfo.jiekouxingshiyingwen;
        if (jiekouxingshi === '' || jiekouxingshi === null || jiekouxingshi === undefined) {
            message.warning("请先选择接口形式！");
            return;
        }else{
            zhuangbeiInfo.jiekouxingshi = jiekouxingshi;
        }
		let qushuixingshi = zhuangbeiInfo.qushuixingshi;
		// if (qushuixingshi === '' || qushuixingshi === null || qushuixingshi === undefined) {
		// 	message.warning("请先输入取水形式！");
		// 	return;
		// }
        let guanwangxingshi = zhuangbeiInfo.guanwangxingshiyingwen;
        if (guanwangxingshi === '' || guanwangxingshi === null || guanwangxingshi === undefined) {
            message.warning("请先选择管网形式！");
            return;
        }else{
            zhuangbeiInfo.guanwangxingshi = guanwangxingshi;
        }
		let guanwangzhijing = zhuangbeiInfo.guanwangzhijing;
		// if (guanwangzhijing === '' || guanwangzhijing === null || guanwangzhijing === undefined) {
		// 	message.warning("请先输入管网直径！");
		// 	return;
		// }
		let guanwangyali = zhuangbeiInfo.guanwangyali;
		// if (guanwangyali === '' || guanwangyali === null || guanwangyali === undefined) {
		// 	message.warning("请先输入管网压力！");
		// 	return;
		// }
		let liuliangdaxiao = zhuangbeiInfo.liuliangdaxiao;
		// if (liuliangdaxiao === '' || liuliangdaxiao === null || liuliangdaxiao === undefined) {
		// 	message.warning("请先输入流量大小！");
		// 	return;
		// }
		let gongshuidanwei = zhuangbeiInfo.gongshuidanwei;
		// if (gongshuidanwei === '' || gongshuidanwei === null || gongshuidanwei === undefined) {
		// 	message.warning("请先输入供水单位！");
		// 	return;
		// }
		let keyongzhuangtai = zhuangbeiInfo.keyongzhuangtaiyingwen;
		if (keyongzhuangtai === '' || keyongzhuangtai === null || keyongzhuangtai === undefined) {
			message.warning("请先选择可用状态！");
			return;
		}else{
            zhuangbeiInfo.keyongzhuangtai = keyongzhuangtai;
        }
		let jianchengrqi = zhuangbeiInfo.jianchengriqi;
		// if (jianchengrqi === '' || jianchengrqi === null || jianchengrqi === undefined) {
		// 	message.warning("请先选择建成日期！");
		// 	return;
		// }
		let dizhimiaoshu = zhuangbeiInfo.dizhimiaoshu;
		if (dizhimiaoshu === '' || dizhimiaoshu === null || dizhimiaoshu === undefined) {
			message.warning("请先输入地址描述！");
			return;
		}
		if (!confirm("确定修改此水源")) {
			return;
		}
		$.ajax({
			type : 'POST',
			url : SERVER+"xiugaishuiyuan",
			data : JSON.stringify(zhuangbeiInfo),
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

	zuzhijigouChange(value) {
		let zhuangbeiInfo = this.state.zhuangbeiInfo;
		zhuangbeiInfo['zuzhijigoudaima'] = value;
		this.setState({
			zhuangbeiInfo : zhuangbeiInfo
		});
	}
	fenleiChange(value) {
		let zhuangbeiInfo = this.state.zhuangbeiInfo;
		zhuangbeiInfo['fenleiyingwen'] = value;
		this.setState({
			zhuangbeiInfo : zhuangbeiInfo
		});
	}
	leixingChange(value) {
		let zhuangbeiInfo = this.state.zhuangbeiInfo;
		zhuangbeiInfo['leixingyingwen'] = value;
		this.setState({
			zhuangbeiInfo : zhuangbeiInfo
		});
	}
    zhuangtaiChange(value) {
        let zhuangbeiInfo = this.state.zhuangbeiInfo;
        zhuangbeiInfo['keyongzhuangtaiyingwen'] = value;
        this.setState({
            zhuangbeiInfo : zhuangbeiInfo
        });
    }
    guanwangxingshiChange(value) {
		let zhuangbeiInfo = this.state.zhuangbeiInfo;
		zhuangbeiInfo['guanwangxingshiyingwen'] = value;
		this.setState({
			zhuangbeiInfo : zhuangbeiInfo
		});
	}
    jiekouxingshiChange(value) {
        let zhuangbeiInfo = this.state.zhuangbeiInfo;
        zhuangbeiInfo['jiekouxingshiyingwen'] = value;
        this.setState({
            zhuangbeiInfo : zhuangbeiInfo
        });
    }
    fangzhixingshiChange(value) {
        let zhuangbeiInfo = this.state.zhuangbeiInfo;
        zhuangbeiInfo['fangzhixingshiyingwen'] = value;
        this.setState({
            zhuangbeiInfo : zhuangbeiInfo
        });
    }
	rqiChange(value) {
		let zhuangbeiInfo = this.state.zhuangbeiInfo;
		zhuangbeiInfo['jianchengriqi'] = value;
		this.setState({
			zhuangbeiInfo : zhuangbeiInfo
		});
	}

	zhijingChange(value) {
		let zhuangbeiInfo = this.state.zhuangbeiInfo;
		zhuangbeiInfo['guanwangzhijing'] = value;
		this.setState({
			zhuangbeiInfo : zhuangbeiInfo
		});
	}

	yaliChange(value) {
		let zhuangbeiInfo = this.state.zhuangbeiInfo;
		zhuangbeiInfo['guanwangyali'] = value;
		this.setState({
			zhuangbeiInfo : zhuangbeiInfo
		});
	}

	liuliangChange(value) {
		let zhuangbeiInfo = this.state.zhuangbeiInfo;
		zhuangbeiInfo['liuliangdaxiao'] = value;
		this.setState({
			zhuangbeiInfo : zhuangbeiInfo
		});
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let zhuangbeiInfo = this.state.zhuangbeiInfo;
		zhuangbeiInfo[name] = value;
		this.setState({
			zhuangbeiInfo : zhuangbeiInfo
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
		this.getInfo();

        this.getfangzhiList();
        this.getguanwangList();
        this.getjiekouList();
	}

	render() {

		let info = this.state.zhuangbeiInfo;

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
				<label>组织机构:</label>
				<Select style={{margin:10,width:200}} value={info['zuzhijigoudaima']} onChange={this.zuzhijigouChange.bind(this)}>
					{zuzhijigouOptions}
				</Select>
				<label>水源名称:</label>
				<Input style={{margin:10,width:200}} name="mingcheng" value={info['mingcheng']} onChange={this.handleInputChange.bind(this)}/>
				<label>&#12288;&#12288;分类:</label>
				<Select style={{margin:10,width:200}} value={info['fenleiyingwen']} onChange={this.fenleiChange.bind(this)}>
					{feilei}
				</Select>
				<br/>
				<label>&#12288;&#12288;类型:</label>
				<Select style={{margin:10,width:200}} value={info['leixingyingwen']} onChange={this.leixingChange.bind(this)}>
					{leixing}
				</Select>
				<label>所属路段:</label>
				<Input style={{margin:10,width:200}} name="suoshuluduan" value={info['suoshuluduan']} onChange={this.handleInputChange.bind(this)}/>
				<label>所属管网:</label>
				<Input style={{margin:10,width:200}} name="suoshuguanwang" value={info['suoshuguanwang']} onChange={this.handleInputChange.bind(this)}/>
				<br/>
				<label>&#12288;&#12288;经度:</label>
				<Input style={{margin:10,width:200}} name="dizhijingdu" value={info['dizhijingdu']} onChange={this.handleInputChange.bind(this)}/>
				<label>&#12288;&#12288;纬度:</label>
				<Input style={{margin:10,width:200}} name="dizhiweidu" value={info['dizhiweidu']} onChange={this.handleInputChange.bind(this)}/>
				<label>放置形式:</label>
				<Select style={{margin:10,width:200}} value={info['fangzhixingshiyingwen']} onChange={this.fangzhixingshiChange.bind(this)}>
                    {fangzhi}
				</Select>
				<br/>
				<label>接口形式:</label>
				<Select style={{margin:10,width:200}} value={info['jiekouxingshiyingwen']} onChange={this.jiekouxingshiChange.bind(this)}>
                    {jiekou}
				</Select>
				<label>取水形式:</label>
				<Input style={{margin:10,width:200}} name="qushuixingshi" value={info['qushuixingshi']} onChange={this.handleInputChange.bind(this)}/>
				<label>管网形式:</label>
				<Select style={{margin:10,width:200}} value={info['guanwangxingshiyingwen']} onChange={this.guanwangxingshiChange.bind(this)}>
                    {guanwang}
				</Select>
				<br/>
				<label>管网直径:</label>
				<InputNumber style={{margin:10,width:200}}  value={info['guanwangzhijing']} onChange={this.zhijingChange.bind(this)}/>
				<label>管网压力:</label>
				<InputNumber style={{margin:10,width:200}}  value={info['guanwangyali']} onChange={this.yaliChange.bind(this)}/>
				<label>流量大小:</label>
				<InputNumber style={{margin:10,width:200}}  value={info['liuliangdaxiao']} onChange={this.liuliangChange.bind(this)}/>
				<br/>
				<label>供水单位:</label>
				<Input style={{margin:10,width:200}} name="gongshuidanwei" value={info['gongshuidanwei']} onChange={this.handleInputChange.bind(this)}/>
				<label>可用状态:</label>
				<Select style={{margin:10,width:200}} value={info['keyongzhuangtaiyingwen']} onChange={this.zhuangtaiChange.bind(this)}>
					{zhuangtai}
				</Select>
				<label>建成日期:</label>
				<DatePicker style={{margin:10,width:200}} placeholder="建成日期" onChange={this.rqiChange.bind(this)} value={info['jianchengriqi']}/>
				<br/>
				{/*<label>管辖单位:</label>*/}
				{/*<Select style={{margin:10,width:200}} value={info['jigoumingcheng']} onChange={this.handleInputChange.bind(this)}>*/}
					{/*{zhuangtai}*/}
				{/*</Select>*/}
				{/*<br/>*/}
				<label>地址&#12288;&#12288;:</label>
				<br/>
				<TextArea autosize={{minRows:3}}  style={{width:500}} name="dizhimiaoshu" value={info['dizhimiaoshu']} onChange={this.handleInputChange.bind(this)}/>
				<br/>
				<br/>
				<br/>
				<label style={{display:'inline-block',verticalAlign:"top"}}>&#12288;实景图:</label>
				<div style={{display:'inline-block',marginRight:'16px',marginBottom:0}}>
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
				<label style={{display:'inline-block',verticalAlign:"top"}}>方位图东:</label>
				<div style={{display:'inline-block',marginRight:'16px',marginBottom:0}}>
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
				<label style={{display:'inline-block',verticalAlign:"top"}}>方位图西:</label>
				<div style={{display:'inline-block',marginRight:'16px',marginBottom:0}}>
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
				<label style={{display:'inline-block',verticalAlign:"top"}}>方位图南:</label>
				<div style={{display:'inline-block',marginRight:'16px',marginBottom:0}}>
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
				<label style={{display:'inline-block',verticalAlign:"top"}}>方位图北:</label>
				<div style={{display:'inline-block',marginRight:'16px',marginBottom:0}}>
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
				<br/>
				<Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
			</div>
		);
	}
}

const AppForm = Form.create()(App);
export default AppForm;
