import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
	message,
	Upload,
	DatePicker,
	Select,
  	Icon,
  	Input,
  	Form,
  	Button
} from 'antd';

function getBase64(img, callback) {
  	const reader = new FileReader();
  	reader.addEventListener('load', () => callback(reader.result));
  	reader.readAsDataURL(img);
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			leibieList:[],
			zuzhijigouList:[],
            bumenList:[],
            zhiwuList:[],
            previewVisible: false,
            previewImage: '',
            fileList: [],
		};
	}

	beforeUpload(file) {
		const img_url = window.URL.createObjectURL(file);

		let getKey = (imgUrl) => {
	   		return new Promise((resolve,reject)=>{
		        let img = new Image();
		        img.src = imgUrl;
		        img.onload = ()=>{
		            const width = img.width;
			    	const height = img.height;
			    	const isJPG = file.type === 'image/jpeg';
				  	if (!isJPG) {
				    	message.error('请上传JPG格式的图片!');
				  	}
				  	const isWidth = width < 1024;
				  	const isHeight = height < 1024;
				  	if (!isWidth || !isHeight) {
				    	message.error('图片尺寸必须小于1024*1024，图片大小必须小于200KB！');
				  	}
				  	var key = 0;
				  	if (!isJPG || !isWidth || !isHeight) {
				  		key = 1;
				  	}
		            resolve(key);
		        }
		        img.onerror = ()=>{
		            reject()
		        }
		    })
		}

		let result= getKey(img_url);
		let key = 0;
		result.then(function(result) {
			key = result;
		});
		if (key == 1) {
			return false;
		} else {
			return true;
		}
	}

	handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = (info) => {
	    if (info.file.status === 'uploading') {
	      	return;
	    }
	    if (info.file.status === 'done') {
	      	getBase64(info.file.originFileObj, imageUrl => this.setState({
	      		fileList: info.fileList,
	        	imageUrl,
	      	}));
	    }
  	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
  			if (!err) {
    			this.toCreate();
  			}
		});
	}

	getZuzhijigouList() {
  		const THE = this;
    	$.ajax({
            type:'GET',
            url: SERVER + "zuzhijigouXialaLiebiao?jigoumingcheng=系统",
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
                    zuzhijigouList: list,
                });
            }
        });
  	}
	zuzhijigouChange(value) {
		let zuzhijigou = value;
		this.getBumenList(zuzhijigou);
		this.getZhiwuList(zuzhijigou);
	}

	yonghuleibieChange(value) {
		let yonghuleibie = value;
	}

	getBumenList(zuzhijigou) {
  		const THE = this;
    	$.ajax({
            type:'GET',
            url: SERVER + "bumenXialaLiebiao?jigoumingcheng="+zuzhijigou,
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
                    bumenList: list,
                });
            }
        });
  	}

	getleibieList() {
		const THE = this;
		$.ajax({
			type:'GET',
			url: SERVER + "huoqurenyuanleixing",
			success: function (data) {
				let list = [];
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				for (let i = 0; i < data.data.length; i++) {
					list.push(data.data[i]);
				}
				THE.setState({
					leibieList: list,
				});
			}
		});
	}

	getZhiwuList(zuzhijigou) {
        const THE = this;
        $.ajax({
            url:SERVER+"zhiwuXialaLiebiao?jigoumingcheng="+zuzhijigou,
            success:function(data) {
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
                    zhiwuList : list,
                });
            }
        });
    }

	toCreate() {
		const THE = this;
		let form = THE.props.form;

		let dengluming = form.getFieldValue('dengluming');
		let mima = form.getFieldValue('mima');
		let xingming = form.getFieldValue('xingming');
		let shenfenzhenghao = form.getFieldValue('shenfenzhenghao');
		let xingbiedaima = form.getFieldValue('xingbiedaima');
		if (typeof(xingbiedaima) == "undefined") {
        	xingbiedaima = '';
        }
		let minzu = form.getFieldValue('minzu');
		let jiguan = form.getFieldValue('jiguan');
		let zhengzhimianmao = form.getFieldValue('zhengzhimianmao');
		if (typeof(zhengzhimianmao) == "undefined") {
        	zhengzhimianmao = '';
        }
		let hunyinzhuangkuang = form.getFieldValue('hunyinzhuangkuang');
		if (typeof(hunyinzhuangkuang) == "undefined") {
        	hunyinzhuangkuang = '';
        }
		let chushengriqi = form.getFieldValue('chushengriqi');
		if (typeof(chushengriqi) == "undefined") {
        	chushengriqi = '';
        }
		let ruzhishijian = form.getFieldValue('ruzhishijian');
		if (typeof(ruzhishijian) == "undefined") {
        	ruzhishijian = '';
        }
		let tongxindizhi = form.getFieldValue('tongxindizhi');
		let gudingdianhua = form.getFieldValue('gudingdianhua');
		let yidongdianhua = form.getFieldValue('yidongdianhua');
		// let zhiwu = form.getFieldValue('zhiwu');
		// if (typeof(zhiwu) == "undefined") {
        // 	zhiwu = '';
        // }
		let yonghuleibie=form.getFieldValue('yonghuleibie');
		if (typeof(yonghuleibie) == "undefined") {
			yonghuleibie = '';
		}
		let fileList = THE.state.fileList;
		for (let i = 0; i < fileList.length; i++) {
			if (typeof(fileList[i]['response']) == 'object') {
				let index = fileList.indexOf(fileList[i]);
				if (index > -1) {
				    fileList.splice(index, 1);
				}
			}
		}
		let zhaopian = '';
		if (fileList.length > 0) {
        	let num = fileList.length - 1;
        	zhaopian = fileList[num]['response'];
        }
		let xuexing = form.getFieldValue('xuexing');
		let shengao = form.getFieldValue('shengao');
		let tizhong = form.getFieldValue('tizhong');
		let jiankangzhuangkuang = form.getFieldValue('jiankangzhuangkuang');
		let techangaihao = form.getFieldValue('techangaihao');
		let suosubumen = form.getFieldValue('suosubumen');
		if (typeof(suosubumen) == "undefined") {
        	suosubumen = '';
        }
		let ganbu = form.getFieldValue('ganbu');
		let lanyabianhao = form.getFieldValue('lanyabianhao');
		let lanyabianhao1 = form.getFieldValue('lanyabianhao1');
		let jigoumingcheng = form.getFieldValue('jigoumingcheng');
		let shenfenzhengdaoqishijian = form.getFieldValue('shenfenzhengdaoqishijian');
		if (typeof(shenfenzhengdaoqishijian) == "undefined") {
        	shenfenzhengdaoqishijian = '';
        }
		let jiashizhengdaoqishijian = form.getFieldValue('jiashizhengdaoqishijian');
		if (typeof(jiashizhengdaoqishijian) == "undefined") {
        	jiashizhengdaoqishijian = '';
        }
        if (!confirm("确定添加此条记录吗？")) {
            return;
        }

        let jueseId = "[8]";

        let tbRenyuan = {};
        tbRenyuan["dengluming"] = dengluming;
        tbRenyuan["mima"] = hex_md5(mima);
        tbRenyuan["xingming"] =xingming;
        tbRenyuan["shenfenzhenghao"] =shenfenzhenghao;
        tbRenyuan["xingbiedaima"] = xingbiedaima;
        tbRenyuan["minzu"] = minzu;
        tbRenyuan["jiguan"] = jiguan;
        tbRenyuan["zhengzhimianmao"] = zhengzhimianmao;
        tbRenyuan["hunyinzhuangkuang"] =hunyinzhuangkuang;
        tbRenyuan["chushengriqi"] =chushengriqi;
        tbRenyuan["ruzhishijian"] = ruzhishijian;
        tbRenyuan["tongxindizhi"] = tongxindizhi;
        tbRenyuan["gudingdianhua"] = gudingdianhua;
        tbRenyuan["yidongdianhua"] = yidongdianhua;
        // tbRenyuan["zhiwu"] =zhiwu;
        tbRenyuan["jigoumingcheng"] =jigoumingcheng;
        tbRenyuan["zhaopian"] = zhaopian;
        tbRenyuan["xuexing"] = xuexing;
        tbRenyuan["yidongdianhua"] = yidongdianhua;
        tbRenyuan["shengao"] = shengao;
        tbRenyuan["tizhong"] = tizhong;
        tbRenyuan["jiankangzhuangkuang"] =jiankangzhuangkuang;
        tbRenyuan["techangaihao"] =techangaihao;
        tbRenyuan["suosubumen"] = suosubumen;
        tbRenyuan["lanyabianhao"] = lanyabianhao;
        tbRenyuan["lanyabianhao1"] = lanyabianhao1;
        tbRenyuan["ganbu"] = ganbu;
        tbRenyuan["jueseId"] = jueseId;
		tbRenyuan["renyuanleixing"] = yonghuleibie;

        let tbZhengjianList = [];
        let shenfenzhengObj = {};
        shenfenzhengObj['zhengjanleixing'] = "身份证";
        shenfenzhengObj['daoqishijian'] = shenfenzhengdaoqishijian;
        tbZhengjianList.push(shenfenzhengObj);
        let jiashizhengObj = {};
        jiashizhengObj['zhengjanleixing'] = "驾驶证";
        jiashizhengObj['daoqishijian'] = jiashizhengdaoqishijian;
        tbZhengjianList.push(jiashizhengObj);

        let obj = {};
        obj['tbRenyuan'] = tbRenyuan;
        obj['tbZhengjianList'] = tbZhengjianList;
        $.ajax({
            type:'post',
            url:SERVER+"tianjiaRenyuan",
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
		window.location.href = "./xitong.html#/xitongsheding_admin_renyuanguanli";
	}

	componentDidMount() {
		this.getZuzhijigouList();
		this.getleibieList();
    }

  	render() {

  		let zuzhijigouOptions = this.state.zuzhijigouList.map(item => <Select.Option key={item['key']} value={item['jigoumingcheng']}>{item['jigoumingcheng']}</Select.Option>);
  		let bumenOptions = this.state.bumenList.map(item => <Select.Option key={item['key']} value={item['bumenmingcheng']}>{item['bumenmingcheng']}</Select.Option>);
  		let zhiwuOptions = this.state.zhiwuList.map(item => <Select.Option key={item['key']} value={item['zhiwumingcheng']}>{item['zhiwumingcheng']}</Select.Option>);
		let leibieOptions = this.state.leibieList.map(item => <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>);
  		const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        let uploadProps = {
            name: 'files',
            action: SERVER+"files/image",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList, jgptnsrq} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

	    return (
	      	<div>
		        <Form layout="inline" onSubmit={this.handleSubmit}>
		          	<FormItem label="用&nbsp;&nbsp;户&nbsp;&nbsp;名">
		             	{getFieldDecorator('dengluming', {
            				rules: [{ required: true, message: '请输入用户名', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="密&#12288;&#12288;码">
		             	{getFieldDecorator('mima', {
            				rules: [{ required: true, message: '请输入密码', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}} type="password"/>
          				)}
		          	</FormItem>
		          	<FormItem label="组织机构">
		             	{getFieldDecorator('jigoumingcheng', {
            				rules: [{ required: true, message: '请选择组织机构', whitespace: true }],
          				})(
            				<Select style={{margin:5,width:200}} onChange={this.zuzhijigouChange.bind(this)}>
            					{zuzhijigouOptions}
            				</Select>
          				)}
		            </FormItem>
		            <br/>

		          	<FormItem label="姓&#12288;&#12288;名">
		             	{getFieldDecorator('xingming', {
		             		rules: [{ required: true, message: '请输入姓名', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;身份证号">
		             	{getFieldDecorator('shenfenzhenghao', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;性&#12288;&#12288;别">
		             	{getFieldDecorator('xingbiedaima', {
          				})(
            				<Select style={{margin:5,width:200}}>
            					<Select.Option value="男">男</Select.Option>
				      			<Select.Option value="女">女</Select.Option>
            				</Select>
          				)}
		          	</FormItem>
		          	<br/>

		          	<FormItem label="&nbsp;&nbsp;&nbsp;民&#12288;&#12288;族">
		             	{getFieldDecorator('minzu', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;籍&#12288;&#12288;贯">
		             	{getFieldDecorator('jiguan', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;政治面貌">
		             	{getFieldDecorator('zhengzhimianmao', {
          				})(
            				<Select style={{margin:5,width:200}}>
            					<Select.Option value="党员">党员</Select.Option>
            					<Select.Option value="团员">团员</Select.Option>
				      			<Select.Option value="群众">群众</Select.Option>
            				</Select>
          				)}
		          	</FormItem>
		          	<br/>

		          	<FormItem label="&nbsp;&nbsp;&nbsp;婚姻状况">
		             	{getFieldDecorator('hunyinzhuangkuang', {
          				})(
            				<Select style={{margin:5,width:200}}>
            					<Select.Option value="已婚">已婚</Select.Option>
				      			<Select.Option value="未婚">未婚</Select.Option>
            				</Select>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;出生日期">
		             	{getFieldDecorator('chushengriqi', {
          				})(
        					<DatePicker style={{margin:5,width:200}} placeholder="出生日期"/>
          				)}
		            </FormItem>
		            <FormItem label="&nbsp;&nbsp;&nbsp;入职时间">
		             	{getFieldDecorator('ruzhishijian', {
          				})(
        					<DatePicker style={{margin:5,width:200}} placeholder="入职时间"/>
          				)}
		            </FormItem>
		            <br/>

		            <FormItem label="&nbsp;&nbsp;&nbsp;通信地址">
		             	{getFieldDecorator('tongxindizhi', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;固定电话">
		             	{getFieldDecorator('gudingdianhua', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;移动电话">
		             	{getFieldDecorator('yidongdianhua', {
            				rules: [{
	              				len: 11, message: '请输入11位电话号码！',
	            			}],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<br/>

		          	<FormItem label="&nbsp;&nbsp;&nbsp;手表编号">
		             	{getFieldDecorator('lanyabianhao', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;防&nbsp;&nbsp;丢&nbsp;&nbsp;器">
		             	{getFieldDecorator('lanyabianhao1', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		            <FormItem label="&nbsp;&nbsp;&nbsp;所属部门">
		             	{getFieldDecorator('suosubumen', {
          				})(
            				<Select style={{margin:5,width:200}}>
            					{bumenOptions}
            				</Select>
          				)}
		            </FormItem>
		            <br/>
					<FormItem label="&nbsp;&nbsp;&nbsp;是否干部">
						{getFieldDecorator('ganbu', {
						})(
							<Select style={{margin:5,width:200}}>
								<Select.Option value="干部">干部</Select.Option>
								<Select.Option value="职员">职员</Select.Option>
							</Select>
						)}
					</FormItem>
		            {/*<FormItem label="&nbsp;&nbsp;&nbsp;职&#12288;&#12288;务">*/}
		            {/* 	{getFieldDecorator('zhiwu', {*/}
          			{/*	})(*/}
            		{/*		<Select style={{margin:5,width:200}}>*/}
            		{/*			{zhiwuOptions}*/}
            		{/*		</Select>*/}
          			{/*	)}*/}
		            {/*</FormItem>*/}
		          	<FormItem label="&nbsp;&nbsp;&nbsp;血&#12288;&#12288;型">
		             	{getFieldDecorator('xuexing', {
          				})(
            				<Select style={{margin:5,width:200}}>
            					<Select.Option value="A型">A型</Select.Option>
				      			<Select.Option value="B型">B型</Select.Option>
				      			<Select.Option value="AB型">AB型</Select.Option>
				      			<Select.Option value="O型">O型</Select.Option>
            				</Select>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;身&nbsp;高(cm)">
		             	{getFieldDecorator('shengao', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<br/>

		          	<FormItem label="&nbsp;&nbsp;&nbsp;体&nbsp;重(kg)">
		             	{getFieldDecorator('tizhong', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;伤病情况">
		             	{getFieldDecorator('jiankangzhuangkuang', {
          				})(
            				<Input style={{margin:5,width:200}} placeholder="受伤经历,现状等"/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;特长爱好">
		             	{getFieldDecorator('techangaihao', {
          				})(
            				<Input style={{margin:5,width:200}} placeholder="体育活动，特殊职业技能等"/>
          				)}
		          	</FormItem>
		          	<br/>

		          	<FormItem label="&nbsp;&nbsp;&nbsp;身&nbsp;&nbsp;份&nbsp;&nbsp;证">
		             	{getFieldDecorator('shenfenzhengdaoqishijian', {
          				})(
        					<DatePicker style={{margin:5,width:200}} placeholder="身份证到期时间"/>
          				)}
		            </FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;驾&nbsp;&nbsp;驶&nbsp;&nbsp;证">
		             	{getFieldDecorator('jiashizhengdaoqishijian', {
          				})(
        					<DatePicker style={{margin:5,width:200}} placeholder="驾驶证到期时间"/>
          				)}
		            </FormItem>
					<FormItem label="用户类别">
						{getFieldDecorator('yonghuleibie', {
							rules: [{ required: true, message: '请选择用户类别', whitespace: true }],
						})(
							<Select style={{margin:5,width:200}} onChange={this.yonghuleibieChange.bind(this)}>
								{leibieOptions}
							</Select>
						)}
					</FormItem>
                    <br/>
		          	<FormItem label="&#12288;照&#12288;&#12288;片">
		          		<div>
		          			<Upload
		          				{...uploadProps}
						        listType="picture-card"
						        className="avatar-uploader"
						        beforeUpload={this.beforeUpload}
						        onChange={this.handleChange}
						        onPreview={this.handlePreview}
						        showUploadList={false}
					      	>
		          				{this.state.imageUrl ? <img src={this.state.imageUrl}/> : uploadButton}
					      	</Upload>
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
