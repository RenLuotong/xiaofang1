import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';

import 'antd/dist/antd.css';
import {
	InputNumber,
	message,
	Upload,
	Modal,
	DatePicker,
	Select,
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

	constructor(props) {
		super(props);
		this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            shangjijigouList: [],
			yingquList: [],
			shengfenList: [],
			chengshiList: [],
			quxianList: [],
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
					chengshiList: list,
				});
				THE.props.form.setFieldsValue(
					{
						suoshuchengshi: '',
						suoshuquxian: '',
					}
				)
			}
		});
	}

	getquxianList(value) {
		const THE = this;
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
					quxianList: list,
				});
				THE.props.form.setFieldsValue(
					{
						suoshuquxian: '',
					}
				)
			}
		});
	}

	getcitycode() {
		const THE = this;
		{
			$.ajax({
				type: 'GET',
				url: SERVER + "huoqudengluzhezhiduiCityCode",
				success: function (data) {
					if (data.status != 0) {
						message.warning(data.message);
						return;
					}
					let shengcityCode = '';
					let shicityCode = '';
					if(data.data!== undefined && data.data!== null && data.data!== ''){
						shengcityCode = data.data.toString().substring(0,2);
						shicityCode = data.data.toString().substring(0,4);
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
					THE.props.form.setFieldsValue(
						{
							suoshushengfen: shengcityCode,
							suoshuchengshi: shicityCode,
						}
					)
				}
			});
		}
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

    getShangjijigouList() {
  		const THE = this;
  		let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
    	$.ajax({
            type:'GET',
            url: SERVER + "zuzhijigouXialaLiebiao?jigoumingcheng="+jigoumingcheng,
            success: function (data) {
            	let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let obj = {};
                obj['key'] = 0;
                obj['jigoumingcheng'] = jigoumingcheng;
                list.push(obj);
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i + 1;
            		list.push(data.data[i]);
                }
                THE.setState({
                    shangjijigouList: list,
                });
            }
        });
  	}

	toCreate() {
		const THE = this;
		let form = THE.props.form;
		let jigoumingcheng = form.getFieldValue('jigoumingcheng');
		let jigouleibie = form.getFieldValue('jigouleibie');
		let shangjijigoumingcheng = form.getFieldValue('shangjijigoumingcheng');
		let jigoudizhi = form.getFieldValue('jigoudizhi');
		let youzhengbianma = form.getFieldValue('youzhengbianma');
		let lianxidianhua = form.getFieldValue('lianxidianhua');
		let jigoumiaoshu = form.getFieldValue('jigoumiaoshu');
		let yingqumianji = form.getFieldValue('yingqumianji');
		let zhengjiandaoqi = form.getFieldValue('zhengjiandaoqi');
		let suoshuyingqu = form.getFieldValue('suoshuyingqu');
		let paixu = form.getFieldValue('paixu');
		let suoshuquxian = form.getFieldValue('suoshuquxian');
		let fileList = THE.state.fileList;
		let pingmiantu = '';
		if (fileList.length > 0) {
        	pingmiantu = fileList[0]['response'];
        }

		if (!confirm("确定添加此组织机构吗？")) {
            return;
        }
        let obj = {};
        obj["jigoumingcheng"] = jigoumingcheng;
        obj["jigouleibie"] = jigouleibie;
        obj["shangjijigoumingcheng"] = shangjijigoumingcheng;
        obj["jigoudizhi"] = jigoudizhi;
        obj["youzhengbianma"] = youzhengbianma;
        obj["lianxidianhua"] = lianxidianhua;
        obj["jigoumiaoshu"] = jigoumiaoshu;
        obj["yingqumianji"] = yingqumianji;
        obj["pingmiantu"] = pingmiantu;
        obj["zhengjiandaoqi"] = zhengjiandaoqi;
		obj["yingqubianhao"] = suoshuyingqu;
		obj["paixu"] = paixu;
		obj["cityCode"] = suoshuquxian;
        $.ajax({
            type:'post',
            url:SERVER+"tianjiaZuzhijigou",
            data:JSON.stringify(obj),
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

	backPage() {
		window.location.href = "./zhidui.html#/renyuanguanli_zhiduiganbu_zuzhijigoushezhi";
	}

	componentDidMount() {
		this.getShangjijigouList();
		this.getyingquList();
		this.getshengfenList();
		this.getcitycode();
    }

  	render() {

		const yingquOptions = this.state.yingquList.map(item => <Select.Option key={item['id']}
																			   value={item['yingqubianhao']}>{item['mingcheng']}</Select.Option>);

  		let shangjijigouOptions = this.state.shangjijigouList.map(item => <Select.Option key={item['key']} value={item['jigoumingcheng']}>{item['jigoumingcheng']}</Select.Option>);

		const shengfenOptions = this.state.shengfenList.map(item => <Select.Option key={item['id']}
																				   value={item['cityCode']}>{item['extName']}</Select.Option>);

		const  chengshiOptions = this.state.chengshiList.map(item => <Select.Option key={item['id']}
																					value={item['cityCode']}>{item['extName']}</Select.Option>);

		const  quxianOptions = this.state.quxianList.map(item => <Select.Option key={item['id']}
																					value={item['cityCode']}>{item['extName']}</Select.Option>);

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

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

	    return (
	      	<div>
		        <Form layout="inline" onSubmit={this.handleSubmit}>
		          	<FormItem label="机构名称">
		             	{getFieldDecorator('jigoumingcheng', {
            				rules: [{ required: true, message: '请输入机构名称', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="机构类别">
		             	{getFieldDecorator('jigouleibie', {
            				rules: [{ required: true, message: '请选择机构类别', whitespace: true }],
          				})(
            				<Select style={{margin:5,width:200}}>
                                <Select.Option value="中队">中队</Select.Option>
								<Select.Option value="大队">大队</Select.Option>
							</Select>
          				)}
		          	</FormItem>
		          	<FormItem label="上级机构">
		             	{getFieldDecorator('shangjijigoumingcheng', {
            				rules: [{ required: true, message: '请选择上级机构', whitespace: true }],
          				})(
            				<Select style={{margin:5,width:200}}>
								{shangjijigouOptions}
							</Select>
          				)}
		          	</FormItem>
		          	<br/>

		          	<FormItem label="机构地址">
		             	{getFieldDecorator('jigoudizhi', {
            				rules: [{ required: true, message: '请输入机构地址', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="邮政编码">
		             	{getFieldDecorator('youzhengbianma', {
            				rules: [{ required: true, message: '请输入邮政编码', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="联系电话">
		             	{getFieldDecorator('lianxidianhua', {
            				rules: [{
	              				len: 11, message: '请输入11位电话号码！',
	            			}, {
	              				required: true, message: '请输入联系电话',
	            			}],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<br/>

		          	<FormItem label="&nbsp;&nbsp;&nbsp;机构描述">
		             	{getFieldDecorator('jigoumiaoshu', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;营区面积">
		             	{getFieldDecorator('yingqumianji', {
          				})(
            				<Input style={{margin:5,width:200}} placeholder="平方米"/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;证件到期">
		             	{getFieldDecorator('zhengjiandaoqi', {
          				})(
            				<InputNumber min={0} style={{margin:5,width:200}} placeholder="天"/>
          				)}
		          	</FormItem>
					<br/>
					<FormItem label="所属营区">
						{getFieldDecorator('suoshuyingqu', {
							rules: [{ required: true, message: '请选择所属营区', whitespace: true }],
						})(
							<Select style={{margin:5,width:200}}>
								{yingquOptions}
							</Select>
						)}
					</FormItem>
					<FormItem label="&nbsp;&nbsp;&nbsp;排&#12288;&#12288;序">
						{getFieldDecorator('paixu',  {
						})(
							<InputNumber min={1} style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<FormItem label="所属省份">
						{getFieldDecorator('suoshushengfen', {
							rules: [{ required: true, message: '请选择所属省份', whitespace: true}],
						})(
							<Select style={{margin:5,width:200}}
							onChange={this.getchengshiList.bind(this)}
							>
								{shengfenOptions}
							</Select>
						)}
					</FormItem>
					<br/>
					<FormItem label="所属城市">
						{getFieldDecorator('suoshuchengshi', {
							rules: [{ required: true, message: '请选择所属城市', whitespace: true}],
						})(
							<Select style={{margin:5,width:200}}
							onChange={this.getquxianList.bind(this)}
							>
								{chengshiOptions}
							</Select>
						)}
					</FormItem>
					<FormItem label="所属区县">
						{getFieldDecorator('suoshuquxian', {
							rules: [{ required: true, message: '请选择所属区县', whitespace: true }],
						})(
							<Select style={{margin:5,width:200}}

							>
								{quxianOptions}
							</Select>
						)}
					</FormItem>
		          	<br/>
			        <FormItem label="平&#12288;面&#12288;图">
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
