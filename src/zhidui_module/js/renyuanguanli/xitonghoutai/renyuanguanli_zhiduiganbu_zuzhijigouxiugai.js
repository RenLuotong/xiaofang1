import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';

import 'antd/dist/antd.css';
import {
	message,
	Upload,
	Modal,
	Select,
	Layout,
	Menu,
	Breadcrumb,
	Icon,
	Input,
	Form,
	Button,
	Table,
	Divider, Tabs, InputNumber
} from 'antd';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			id:this.props.match.params.id,
			zuzhijigouInfo:{},
			previewVisible: false,
            previewImage: '',
            fileList: [],
			yingquList: [],
			shengfenList: [],
			chengshiList: [],
			quxianList: [],
			shengcityCode:'',
			shicityCode:''
		};
	}

	getyingquList() {
		const THE = this;
		{
			$.ajax({
				type: 'GET',
				url: SERVER + "yingquxinxiliebiao",
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
						yingquList: list,
					});
				}
			});
		}
	}

	getshengfenList() {
		const THE = this;
		{
			$.ajax({
				type: 'GET',
				url: SERVER + "queryAreaCityList?deep=0",
				success: function (data) {
					let list = [];
					if (data.status != 0) {
						message.warning(data.message);
						return;
					}
					for (let i = 0; i < data.data.length; i++) {
						data.data[i]["key"] = i;
						data.data[i]["cityCode"] = data.data[i]["cityCode"].toString();
						list.push(data.data[i]);
					}
					THE.setState({
						shengfenList: list,
					});
				}
			});
		}
	}

	getchengshiList(value) {
		const THE = this;
		let zuzhijigouInfo = THE.state.zuzhijigouInfo;
		if(zuzhijigouInfo['cityCode'] !== undefined){
			zuzhijigouInfo['cityCode'] = '';
		}
		$.ajax({
			type:'get',
			url: SERVER + "queryAreaCityList?deep=1&pid="+value,
			success: function (data) {
				let list = [];
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				for (let i = 0; i < data.data.length; i++) {
					data.data[i]["key"] = i;
					data.data[i]["cityCode"] = data.data[i]["cityCode"].toString();
					list.push(data.data[i]);
				}
				THE.setState({
					shengcityCode:value,
					chengshiList: list,
					shicityCode:'',
					zuzhijigouInfo:zuzhijigouInfo
				});
			}
		});
	}

	getquxianList(value) {
		const THE = this;
		let zuzhijigouInfo = THE.state.zuzhijigouInfo;
		if(zuzhijigouInfo['cityCode'] !== undefined){
			zuzhijigouInfo['cityCode'] = '';
		}
		$.ajax({
			type:'get',
			url: SERVER + "queryAreaCityList?deep=2&pid="+value,
			success: function (data) {
				let list = [];
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				for (let i = 0; i < data.data.length; i++) {
					data.data[i]["key"] = i;
					data.data[i]["cityCode"] = data.data[i]["cityCode"].toString();
					list.push(data.data[i]);
				}
				THE.setState({
					shicityCode:value,
					quxianList: list,
					zuzhijigouInfo:zuzhijigouInfo
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

	toUpdate() {
		const THE = this;
		let shicityCode = THE.state.shicityCode;
		let fileList = THE.state.fileList;
		let pingmiantu = '';
		if (fileList.length > 0) {
        	pingmiantu = fileList[0]['response'];
        }
		let obj = THE.state.zuzhijigouInfo;
		obj['pingmiantu'] = pingmiantu;
		if(shicityCode === undefined || shicityCode === null || shicityCode === ''){
			message.warning("请选择所属城市");
			return;
		}
		if(obj['cityCode'] === undefined || obj['cityCode'] === null || obj['cityCode'] === ''){
			message.warning("请选择所属区县");
			return;
		}
		if (!confirm("确定修改此组织机构！")) {
			return;
		}
        $.ajax({
            type : 'POST',
            url : SERVER+"xiugaiZuzhijigou",
            data : JSON.stringify(obj),
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

	getInfo() {
		const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "zuzhijigouXiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
				let shengcityCode = '';
				let shicityCode = '';
				if(data.data['cityCode'] !== undefined && data.data['cityCode'] !== null && data.data['cityCode'] !== ''){
					shengcityCode = data.data['cityCode'].toString().substring(0,2);
					shicityCode = data.data['cityCode'].toString().substring(0,4);
					data.data['cityCode'] = data.data['cityCode'].toString();
				}
				$.ajax({
					type:'get',
					url: SERVER + "queryAreaCityList?deep=1&pid="+shengcityCode,
					success: function (data) {
						let list = [];
						if (data.status != 0) {
							message.warning(data.message);
							return;
						}
						for (let i = 0; i < data.data.length; i++) {
							data.data[i]["key"] = i;
							data.data[i]["cityCode"] = data.data[i]["cityCode"].toString();
							list.push(data.data[i]);
						}
						THE.setState({
							chengshiList: list,
						});
					}
				});
				$.ajax({
					type:'get',
					url: SERVER + "queryAreaCityList?deep=2&pid="+shicityCode,
					success: function (data) {
						let list = [];
						if (data.status != 0) {
							message.warning(data.message);
							return;
						}
						for (let i = 0; i < data.data.length; i++) {
							data.data[i]["key"] = i;
							data.data[i]["cityCode"] = data.data[i]["cityCode"].toString();
							list.push(data.data[i]);
						}
						THE.setState({
							quxianList: list,
						});
					}
				});
                THE.setState({
					shengcityCode:shengcityCode,
					shicityCode:shicityCode,
                    zuzhijigouInfo: data.data,
                    fileList: [{
				      	uid: 0,
				      	name: 'a.png',
				      	status: 'done',
				      	url: data.data['pingmiantu'],
				      	response: data.data['pingmiantu'],
				    }],
                });
            }
        });
	}

	yingquChange(value) {
		let zuzhijigouInfo = this.state.zuzhijigouInfo;
		zuzhijigouInfo['yingqubianhao'] = value;
		this.setState({
			zuzhijigouInfo : zuzhijigouInfo
		});
	}

	cityCodeChange(value) {
		let zuzhijigouInfo = this.state.zuzhijigouInfo;
		zuzhijigouInfo['cityCode'] = value;
		this.setState({
			zuzhijigouInfo : zuzhijigouInfo
		});
	}

	backPage() {
		window.location.href = "./zhidui.html#/renyuanguanli_zhiduiganbu_zuzhijigoushezhi";
	}

	componentDidMount () {
		this.getInfo();
		this.getyingquList();
		this.getshengfenList();
    }

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
		let zuzhijigouInfo = this.state.zuzhijigouInfo;
		zuzhijigouInfo[name] = value;
	    this.setState({
	      	zuzhijigouInfo : zuzhijigouInfo
	    });
  	}

  	render() {

		const yingquOptions = this.state.yingquList.map(item => <Select.Option key={item['id']}
																			   value={item['yingqubianhao']}>{item['mingcheng']}</Select.Option>);

		const shengfenOptions = this.state.shengfenList.map(item => <Select.Option key={item['id']}
																				   value={item['cityCode']}>{item['extName']}</Select.Option>);

		const  chengshiOptions = this.state.chengshiList.map(item => <Select.Option key={item['id']}
																					value={item['cityCode']}>{item['extName']}</Select.Option>);

		const  quxianOptions = this.state.quxianList.map(item => <Select.Option key={item['id']}
																					value={item['cityCode']}>{item['extName']}</Select.Option>);

  		let info = this.state.zuzhijigouInfo;
  		let uploadProps = {
            name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList, jgptnsrq,shengcityCode,shicityCode} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

	    return (
	      	<div>
				<label>机构名称:</label>
				<Input style={{margin:5,width:200}} value={info['jigoumingcheng']} name="jigoumingcheng" onChange={this.handleInputChange.bind(this)}/>
				<label>机构类别:</label>
				<Input style={{margin:5,width:200}} value={info['jigouleibie']} disabled/>
				<label>上级机构:</label>
				<Input style={{margin:5,width:200}} value={info['shangjijigoumingcheng']} disabled/>
	          	<br/>
				<label>机构地址:</label>
				<Input style={{margin:5,width:200}} onChange={this.handleInputChange.bind(this)} id="jigoudizhi" name="jigoudizhi" value={info['jigoudizhi']}/>
				<label>邮政编码:</label>
				<Input style={{margin:5,width:200}} onChange={this.handleInputChange.bind(this)} id="youzhengbianma" name="youzhengbianma" value={info['youzhengbianma']}/>
  				<label>联系电话:</label>
    			<Input style={{margin:5,width:200}} onChange={this.handleInputChange.bind(this)} id="lianxidianhua" name="lianxidianhua" value={info['lianxidianhua']}/>
	          	<br/>
				<label>机构描述:</label>
				<Input style={{margin:5,width:200}} onChange={this.handleInputChange.bind(this)} id="jigoumiaoshu" name="jigoumiaoshu" value={info['jigoumiaoshu']}/>
				<label>营区面积:</label>
				<Input style={{margin:5,width:200}} onChange={this.handleInputChange.bind(this)} id="yingqumianji" name="yingqumianji" value={info['yingqumianji']}/>
				<label>所属营区:</label>
				<Select style={{margin:5,width:200}} id="yingqumianji" name="yingqumianji" value={info['yingqubianhao']} onChange={this.yingquChange.bind(this)}>
					{yingquOptions}
				</Select>
				<br/>
				<label>排&#12288;&#12288;序:</label>
				<Input style={{margin:5,width:200}} onChange={this.handleInputChange.bind(this)} id="paixu" name="paixu" value={info['paixu']}/>
				<label>所属省份:</label>
				<Select style={{margin:5,width:200}} id="suoshushengfen" name="suoshushengfen" value={shengcityCode} onChange={this.getchengshiList.bind(this)}>
					{shengfenOptions}
				</Select>
				<label>所属城市:</label>
				<Select style={{margin:5,width:200}} id="suoshuchengshi" name="suoshuchengshi" value={shicityCode} onChange={this.getquxianList.bind(this)}>
					{chengshiOptions}
				</Select>
	            <br/>
				<label>所属区县:</label>
				<Select style={{margin:5,width:200}} id="cityCode" name="cityCode" value={info['cityCode']} onChange={this.cityCodeChange.bind(this)}>
					{quxianOptions}
				</Select>
	            <br/>
	            <label>平&nbsp;&nbsp;面&nbsp;&nbsp;图:</label>
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
                <Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default App;
