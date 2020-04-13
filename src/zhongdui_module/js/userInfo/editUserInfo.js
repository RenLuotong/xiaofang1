import React from 'react';
import moment from 'moment';
import {message,Upload,Modal,DatePicker,Select,Icon,Input,Button} from 'antd';

function getBase64(img, callback) {
  	const reader = new FileReader();
  	reader.addEventListener('load', () => callback(reader.result));
  	reader.readAsDataURL(img);
}

class EditUserInfo extends React.Component {

  	constructor(props) {
	    super(props);
	    this.state = {
	    	renyuanInfo:{},
	    	bumenList:[],
            zhiwuList:[],
            previewVisible: false,
            previewImage: '',
            fileList: [],
            shenfenzhengInfo:{},
            jiashizhengInfo:{},
            zhuangbeilxList: [],
			zhiwu:''
	    };
  	}

// 	[
//  	{
//  		关系表id:关系表id,
//  		装备类型名称:装备类型名称,
//  		装备类型id:装备类型id,
//  		已选择装备规格名称:已选择装备规格名称,
//  		List:[
//  			{
//  				规格id:id,
//  				规格名称:规格名称,
//  				规格对应的装备类型名称:规格对应的装备类型名称
//  			}
//  		]
//  	}
//  ]

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

    getBumenList() {
  		const THE = this;
  		let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
    	$.ajax({
            type:'GET',
            url: SERVER + "bumenXialaLiebiao?jigoumingcheng="+jigoumingcheng,
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

	getZhiwuList() {
        const THE = this;
        let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
        $.ajax({
            url:SERVER+"zhiwuXialaLiebiao?jigoumingcheng="+jigoumingcheng,
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

   	getInfo() {
   		const THE = this;
		$.ajax({
    		type:'get',
	        url:SERVER+"currentRenyuanXiangqing",
	        success:function(data){
	            if(data.status != 0){
	                message.warning(data.message);
	                return;
	            }
	            let shenfenzhengInfo = {};
                let jiashizhengInfo = {};
                let list = data.data.tbZhengjianList;
                for (let i = 0; i < list.length; i++) {
                	if (list[i]['zhengjanleixing'] == "身份证") {
                		shenfenzhengInfo = list[i];
                	} else if (list[i]['zhengjanleixing'] == "驾驶证") {
                		jiashizhengInfo = list[i];
                	}
                }
                if (data.data.list != null) {
                	for (let i = 0; i < data.data.list.length; i++) {
	                	data.data.list[i].name = i + 1;
	                }
                } else {
                	data.data.list = [];
                }
	          	THE.setState({
	          		zhuangbeilxList:data.data.list,
	          		renyuanInfo:data.data.tbRenyuan,
	          		shenfenzhengInfo: shenfenzhengInfo,
                    jiashizhengInfo: jiashizhengInfo,
                    imageUrl: data.data.tbRenyuan['zhaopian'],
	          		fileList: [{
				      	uid: 0,
				      	name: '',
				      	status: 'done',
				      	url: data.data.tbRenyuan['zhaopian'],
				      	response: data.data.tbRenyuan['zhaopian'],
				    }],
					zhiwu:data.data.zhiwu
	          	});
	        }
	    });
	}

	editInfo() {
		const THE = this;
		let tbRenyuan = THE.state.renyuanInfo;
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
        tbRenyuan['zhaopian'] = zhaopian;

        let shenfenzhengInfo = THE.state.shenfenzhengInfo;
        let jiashizhengInfo = THE.state.jiashizhengInfo;
        shenfenzhengInfo['zhengjanleixing'] = "身份证";
        jiashizhengInfo['zhengjanleixing'] = "驾驶证";
        shenfenzhengInfo['renyuanbianhao'] = tbRenyuan['renyuanbianhao'];
        jiashizhengInfo['renyuanbianhao'] = tbRenyuan['renyuanbianhao'];
        let tbZhengjianList = [];
        tbZhengjianList.push(shenfenzhengInfo);
        tbZhengjianList.push(jiashizhengInfo);
        let tbGerenfanghuZhuangbeiRenyuanZhuangbeiXinxiList = [];
        let zhuangbeilxList = THE.state.zhuangbeilxList;
        for (let i = 0; i < zhuangbeilxList.length; i++) {
        	let obj = {};
        	obj.guigexinghao = zhuangbeilxList[i].yixuanguigexinghao;
        	obj.id = zhuangbeilxList[i].id;
        	obj.zhuangbeileixingbianhao = zhuangbeilxList[i].zhuangbeileixingbianhao;
        	tbGerenfanghuZhuangbeiRenyuanZhuangbeiXinxiList.push(obj);
        }
        if (!confirm("确定修改个人信息吗？")) {
            return;
        }
        let obj = {};
        obj['tbRenyuan'] = tbRenyuan;
        obj['tbZhengjianList'] = tbZhengjianList;
        obj['tbGerenfanghuZhuangbeiRenyuanZhuangbeiXinxiList'] = tbGerenfanghuZhuangbeiRenyuanZhuangbeiXinxiList;
		$.ajax({
            type : 'POST',
            url : SERVER+"xiugaiRenyuan",
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
	          	THE.getInfo();
	        }
	    });
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
		let renyuanInfo = this.state.renyuanInfo;
		renyuanInfo[name] = value;
	    this.setState({
	      	renyuanInfo:renyuanInfo
	    });
  	}

	xingbiedaimaChange(value) {
		let renyuanInfo = this.state.renyuanInfo;
		renyuanInfo['xingbiedaima'] = value;
	    this.setState({
	      	renyuanInfo : renyuanInfo
	    });
	}

	xingbiedaimaChange(value) {
		let renyuanInfo = this.state.renyuanInfo;
		renyuanInfo['xingbiedaima'] = value;
	    this.setState({
	      	renyuanInfo : renyuanInfo
	    });
	}

	zhengzhimianmaoChange(value) {
		let renyuanInfo = this.state.renyuanInfo;
		renyuanInfo['zhengzhimianmao'] = value;
	    this.setState({
	      	renyuanInfo : renyuanInfo
	    });
	}

	hunyinzhuangkuangChange(value) {
		let renyuanInfo = this.state.renyuanInfo;
		renyuanInfo['hunyinzhuangkuang'] = value;
	    this.setState({
	      	renyuanInfo : renyuanInfo
	    });
	}

	suosubumenChange(value) {
		let renyuanInfo = this.state.renyuanInfo;
		renyuanInfo['suosubumen'] = value;
	    this.setState({
	      	renyuanInfo : renyuanInfo
	    });
	}

	zhiwuChange(value) {
		let renyuanInfo = this.state.renyuanInfo;
		renyuanInfo['zhiwu'] = value;
	    this.setState({
	      	renyuanInfo : renyuanInfo
	    });
	}

	chushengriqiChange(value) {
		let renyuanInfo = this.state.renyuanInfo;
		renyuanInfo['chushengriqi'] = value;
	    this.setState({
	      	renyuanInfo : renyuanInfo
	    });
	}

	ruzhishijianChange(value) {
		let renyuanInfo = this.state.renyuanInfo;
		renyuanInfo['ruzhishijian'] = value;
	    this.setState({
	      	renyuanInfo : renyuanInfo
	    });
	}

	shenfenzhengdaoqishijianChange(value) {
		let shenfenzhengInfo = this.state.shenfenzhengInfo;
		shenfenzhengInfo['daoqishijian'] = value;
	    this.setState({
	      	shenfenzhengInfo : shenfenzhengInfo
	    });
	}

	jiashizhengdaoqishijianChange(value) {
		let jiashizhengInfo = this.state.jiashizhengInfo;
		jiashizhengInfo['daoqishijian'] = value;
	    this.setState({
	      	jiashizhengInfo : jiashizhengInfo
	    });
	}

	xuexingChange(value) {
		let renyuanInfo = this.state.renyuanInfo;
		renyuanInfo['xuexing'] = value;
	    this.setState({
	      	renyuanInfo : renyuanInfo
	    });
	}

    ganbuChange(value) {
        let renyuanInfo = this.state.renyuanInfo;
        renyuanInfo['ganbu'] = value;
        this.setState({
            renyuanInfo : renyuanInfo
        });
    }

    guigeChange() {

    }

	componentDidMount() {
		this.getInfo();
		this.getBumenList();
		this.getZhiwuList();
	}

  	render() {
		let leixingOptions = this.state.zhuangbeilxList.map(item => {

    		let xinghaoOptions = item.list.map(item1 =>
	        	<Select.Option key={item1['leixingzhi']} value={item1['leixingzhi']} name={item1['leixing']}>{item1['leixingzhi']}</Select.Option>
	        );
	        let idName = "gerenzhuangbei" + item['name'];
    		return (
    			<div key={item['id']} id={idName}>
		    		<label>{item['zhuangbeileixingmingcheng']}</label>
		    		<Select style={{margin:10,width: 200}} value={item['yixuanguigexinghao']} onChange={this.guigeChange.bind(this)} key={item['id']}>
		    			{xinghaoOptions}
		        	</Select>
	        	</div>
    		)

        });

	  	let bumenOptions = this.state.bumenList.map(item => {
	  		return (
	  			<Select.Option key={item['key']} value={item['bumenmingcheng']}>{item['bumenmingcheng']}</Select.Option>
	  		)
	  	});
  		let zhiwuOptions = this.state.zhiwuList.map(item =>
  			<Select.Option key={item['key']} value={item['zhiwumingcheng']}>{item['zhiwumingcheng']}</Select.Option>
  		);
  		let info = this.state.renyuanInfo;
  		let chushengriqi;
  		if (info['chushengriqi'] != null && info['chushengriqi'] != "") {
  			chushengriqi = moment(info['chushengriqi']);
  		}
  		let ruzhishijian;
  		if (info['ruzhishijian'] != null && info['ruzhishijian'] != "") {
  			ruzhishijian = moment(info['ruzhishijian']);
  		}
  		let shenfenzhengdaoqishijian;
  		if (this.state.shenfenzhengInfo['daoqishijian'] != null && this.state.shenfenzhengInfo['daoqishijian'] != "") {
  			shenfenzhengdaoqishijian = moment(this.state.shenfenzhengInfo['daoqishijian']);
  		}
  		let jiashizhengdaoqishijian;
  		if (this.state.jiashizhengInfo['daoqishijian'] != null && this.state.jiashizhengInfo['daoqishijian'] != "") {
  			jiashizhengdaoqishijian = moment(this.state.jiashizhengInfo['daoqishijian']);
  		}
  		let uploadProps = {
            name: 'files',
            action: SERVER+"files/image",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
		const { previewVisible, previewImage, fileList, jgptnsrq,zhiwu } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

	    return (
	      	<div id="edit_password_div">
		      	<label>用&nbsp;&nbsp;户&nbsp;&nbsp;名</label>
				<Input style={{margin:10,width:200}} disabled value={info['dengluming']} />
				<label>密&#12288;&#12288;码</label>
				<Input style={{margin:10,width:200}} disabled type="password" value="******" />
				<label>姓&#12288;&#12288;名</label>
				<Input style={{margin:10,width:200}} id="xingming" name="xingming" value={info['xingming']} onChange={this.handleInputChange.bind(this)} />
	          	<br/>

				<label>身份证号</label>
				<Input style={{margin:10,width:200}} id="shenfenzhenghao" name="shenfenzhenghao" value={info['shenfenzhenghao']} onChange={this.handleInputChange.bind(this)} />
				<label>性&#12288;&#12288;别</label>
				<Select value={info['xingbiedaima']} onChange={this.xingbiedaimaChange.bind(this)} style={{margin:10,width:200}}>
					<Select.Option value="男">男</Select.Option>
	      			<Select.Option value="女">女</Select.Option>
				</Select>
				<label>民&#12288;&#12288;族</label>
				<Input style={{margin:10,width:200}} id="minzu" name="minzu" value={info['minzu']} onChange={this.handleInputChange.bind(this)} />
	          	<br/>

				<label>籍&#12288;&#12288;贯</label>
				<Input style={{margin:10,width:200}} id="jiguan" name="jiguan" value={info['jiguan']} onChange={this.handleInputChange.bind(this)} />
				<label>政治面貌</label>
				<Select value={info['zhengzhimianmao']} onChange={this.zhengzhimianmaoChange.bind(this)} style={{margin:10,width:200}}>
					<Select.Option value="党员">党员</Select.Option>
					<Select.Option value="团员">团员</Select.Option>
	      			<Select.Option value="群众">群众</Select.Option>
				</Select>
				<label>婚姻状况</label>
				<Select value={info['hunyinzhuangkuang']} onChange={this.hunyinzhuangkuangChange.bind(this)} style={{margin:10,width:200}}>
					<Select.Option value="已婚">已婚</Select.Option>
	      			<Select.Option value="未婚">未婚</Select.Option>
				</Select>
	          	<br/>

				<label>出生日期</label>
				<DatePicker style={{margin:10,width:200}} placeholder="出生日期" value={chushengriqi} onChange={this.chushengriqiChange.bind(this)}/>
				<label>入职时间</label>
				<DatePicker style={{margin:10,width:200}} placeholder="入职时间" value={ruzhishijian} onChange={this.ruzhishijianChange.bind(this)}/>
				<label>通信地址</label>
				<Input style={{margin:10,width:200}} id="tongxindizhi" name="tongxindizhi" value={info['tongxindizhi']} onChange={this.handleInputChange.bind(this)} />
	          	<br/>

				<label>固定电话</label>
				<Input style={{margin:10,width:200}} id="gudingdianhua" name="gudingdianhua" value={info['gudingdianhua']} onChange={this.handleInputChange.bind(this)} />
				<label>移动电话</label>
				<Input style={{margin:10,width:200}} id="yidongdianhua" name="yidongdianhua" value={info['yidongdianhua']} onChange={this.handleInputChange.bind(this)} />
				<label>手表编号</label>
				<Input style={{margin:10,width:200}} id="lanyabianhao" name="lanyabianhao" value={info['lanyabianhao']} onChange={this.handleInputChange.bind(this)} />
	          	<br/>

				<label>所属部门</label>
				<Select value={info['suosubumen']} onChange={this.suosubumenChange.bind(this)} style={{margin:10,width:200}}>
					{bumenOptions}
				</Select>
				<label>职&#12288;&#12288;务</label>
				<Select value={zhiwu} onChange={this.zhiwuChange.bind(this)} style={{margin:10,width:200}} disabled>
					{zhiwuOptions}
				</Select>
				<label>血&#12288;&#12288;型</label>
				<Select value={info['xuexing']} onChange={this.xuexingChange.bind(this)} style={{margin:10,width:200}}>
					<Select.Option value="A型">A型</Select.Option>
	      			<Select.Option value="B型">B型</Select.Option>
	      			<Select.Option value="AB型">AB型</Select.Option>
	      			<Select.Option value="O型">O型</Select.Option>
				</Select>
	          	<br/>

				<label>身&nbsp;高(cm)</label>
				<Input style={{margin:10,width:200}} id="shengao" name="shengao" value={info['shengao']} onChange={this.handleInputChange.bind(this)} />
				<label>体&nbsp;重(kg)</label>
				<Input style={{margin:10,width:200}} id="tizhong" name="tizhong" value={info['tizhong']} onChange={this.handleInputChange.bind(this)} />
				<label>伤病情况</label>
				<Input style={{margin:10,width:200}} id="jiankangzhuangkuang" name="jiankangzhuangkuang" value={info['jiankangzhuangkuang']} onChange={this.handleInputChange.bind(this)} />
	          	<br/>

				<label>特长爱好</label>
				<Input style={{margin:10,width:200}} id="techangaihao" name="techangaihao" value={info['techangaihao']} onChange={this.handleInputChange.bind(this)} />
	          	<label>身&nbsp;&nbsp;份&nbsp;&nbsp;证</label>
				<DatePicker style={{margin:10,width:200}} placeholder="身份证到期时间" value={shenfenzhengdaoqishijian} onChange={this.shenfenzhengdaoqishijianChange.bind(this)}/>
				<label>驾&nbsp;&nbsp;驶&nbsp;&nbsp;证</label>
				<DatePicker style={{margin:10,width:200}} placeholder="驾驶证到期时间" value={jiashizhengdaoqishijian} onChange={this.jiashizhengdaoqishijianChange.bind(this)}/>
	          	<br/>

                <label>是否干部</label>
                <Select value={info['ganbu']} onChange={this.ganbuChange.bind(this)} style={{margin:10,width:200}}>
                    <Select.Option value="干部">干部</Select.Option>
                    <Select.Option value="职员">职员</Select.Option>
                </Select>
	          	<label>防&nbsp;&nbsp;丢&nbsp;&nbsp;器</label>
				<Input style={{margin:10,width:200}} id="lanyabianhao1" name="lanyabianhao1" value={info['lanyabianhao1']} onChange={this.handleInputChange.bind(this)} />
	          	<label>验&nbsp;&nbsp;证&nbsp;&nbsp;码</label>
				<Input style={{margin:10,width:200}} disabled value={info['wxyanzhengma']} />
	          	<br/>
				<label>应休时长</label>
				<Input style={{margin:10,width:200}} disabled value={info['yingxiushichang']} />
				<label>已休时长</label>
				<Input style={{margin:10,width:200}} disabled value={info['yixiushichang']} />
				<br/>
      			<label>照&#12288;&#12288;片</label>
                <Upload
      				{...uploadProps}
			        listType="picture-card"
			        className="avatar-uploader"
			        onChange={this.handleChange}
			        showUploadList={false}
		      	>
					{this.state.imageUrl ? <img alt="example" style={{ width: '100%' }} src={this.state.imageUrl} /> : uploadButton}
		      	</Upload>

                <Button type="primary" icon="plus" onClick={this.editInfo.bind(this)}>保存</Button>
			</div>
	    );
  	}
}

export default EditUserInfo;
