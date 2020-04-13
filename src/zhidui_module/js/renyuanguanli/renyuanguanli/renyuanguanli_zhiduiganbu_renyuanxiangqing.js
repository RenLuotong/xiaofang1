import React from 'react';
import moment from 'moment';
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
  	Divider
} from 'antd';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			id:this.props.match.params.id,
			renyuanInfo:{},
			renyuanList:[],
			fileList: [],
			previewVisible: false,
            previewImage: '',
            shenfenzhengInfo:{},
            jiashizhengInfo:{},
			zhiwu: '',
			juse: '',
			liuchengjuese: '',
			renyuanleixing:'',
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

    output() {
    	let name = this.state.renyuanInfo['xingming'];
	  	$("#export").wordExport(name + '_人员履历');
	}

	getInfo() {
		const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "renyuanXiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
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
                THE.getRenyuanlvli(data.data.tbRenyuan['renyuanbianhao']);
                THE.setState({
					zhiwu: data.data.zhiwu,
					juse: data.data.juse,
					liuchengjuese: data.data.liuchengjuese,
					renyuanleixing:data.data.renyuanleixing,
                    renyuanInfo: data.data.tbRenyuan,
                    shenfenzhengInfo: shenfenzhengInfo,
                    jiashizhengInfo: jiashizhengInfo,
                    tupian: data.data.tbRenyuan['zhaopian'],
                    fileList: [{
				      	uid: 0,
				      	name: '',
				      	status: 'done',
				      	url: data.data.tbRenyuan['zhaopian'],
				      	response: data.data.tbRenyuan['zhaopian'],
				    }]
                });
            }
        });
	}

	getRenyuanlvli(renyuanbianhao) {
		const THE = this;
        $.ajax({
            type : 'GET',
            url : SERVER + "renyuanlvliLiebiao?renyuanbianhao=" + renyuanbianhao,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                	data.data[i]["key"] = i;
                }
                THE.setState({
                    renyuanList: data.data,
                });
            }
        });
	}

	componentDidMount () {
		this.getInfo();
    }

  	render() {

  		let info = this.state.renyuanInfo;
  		let shenfenzhengdaoqishijian = this.state.shenfenzhengInfo['daoqishijian'];
  		let jiashizhengdaoqishijian = this.state.jiashizhengInfo['daoqishijian'];
  		let uploadProps = {
            name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList, jgptnsrq } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const columns = [{
		  	title: '时间',
			  dataIndex: 'shijian',
			  width:'50%'
		}, {
		  	title: '职务',
		  	dataIndex: 'zhiwu',
		}];

	    return (
	      	<div>
	      		{/*<Button type="primary" htmlType="submit" onClick={this.output.bind(this)} style={{margin: 5}}>*/}
	            {/*    <Icon type="export" />导出*/}
	            {/*</Button>*/}
	      		<div id="top">
	      			<p></p>
	      			<p id="label3">人员详情</p>
	      		</div>
	      		<div id="export">
		      		<div id="body">
		      			<div id="tupian">
		      				<img id="img1" src={this.state.tupian} width="104" height="104"/>
		      			</div>
		      			<div id="test">
		                    <p id="label1">&#12288;{info['xingming']}</p>
		                    <p id="label2">&#12288;用户名:&nbsp;{info['dengluming']}</p>
		                    <p id="label2">&#12288;密&#12288;码:&nbsp;******</p>
	                    </div>
				        <table id="mytableuser" cellSpacing="0">
		                	<tbody>
		                    	<tr>
		                        	<th scope="col" className="nobg" colSpan="4">基本资料</th>
		                    	</tr>
		                    	<tr>
		                            <th scope="row" className="specalt" colSpan="2">身份证号:&nbsp;{info['shenfenzhenghao']}</th>
		                            <th scope="row" className="specalt" colSpan="2">用户名:&nbsp;{info['dengluming']}</th>
		                    	</tr>
		                    	<tr>
		                            <th scope="row" className="specalt" colSpan="2">性别:&nbsp;{info['xingbiedaima']}</th>
		                            <th scope="row" className="specalt" colSpan="2">密码:&nbsp;******</th>
		                    	</tr>
								<tr>
									<th scope="row" className="specalt" colSpan="2">组织机构:&nbsp;{info['jigoumingcheng']}</th>
									<th scope="row" className="specalt" colSpan="2">出警次数:&nbsp;{info['chujingcishu']}</th>
								</tr>
		                    	<tr>
		                            <th scope="row" className="specalt" colSpan="2">民族:&nbsp;{info['minzu']}</th>
		                            <th scope="row" className="specalt" colSpan="2">手表蓝牙编号:&nbsp;{info['lanyabianhao']}</th>
		                    	</tr>
		                    	<tr>
		                            <th scope="row" className="specalt" colSpan="2">身高(cm):&nbsp;{info['shengao']}</th>
		                            <th scope="row" className="specalt" colSpan="2">防丢器编号:&nbsp;{info['lanyabianhao1']}</th>
		                    	</tr>
		                    	<tr>
		                            <th scope="row" className="specalt" colSpan="2">体重(kg):&nbsp;{info['tizhong']}</th>
		                            <th scope="row" className="specalt" colSpan="2">身份证到期时间:&nbsp;{shenfenzhengdaoqishijian}</th>
		                    	</tr>
		                    	<tr>
		                            <th scope="row" className="specalt" colSpan="2">籍贯:&nbsp;{info['jiguan']}</th>
		                            <th scope="row" className="specalt" colSpan="2">驾驶证到期时间:&nbsp;{jiashizhengdaoqishijian}</th>
		                    	</tr>
		                    	<tr>
		                            <th scope="row" className="specalt" colSpan="2">政治面貌:&nbsp;{info['zhengzhimianmao']}</th>
		                            <th scope="row" className="specalt" colSpan="2">出生日期:&nbsp;{info['chushengriqi']}</th>
		                    	</tr>
		                    	<tr>
		                    		<th scope="row" className="specalt" colSpan="2">婚姻状况:&nbsp;{info['hunyinzhuangkuang']}</th>
		                            <th scope="row" className="specalt" colSpan="2">入职时间:&nbsp;{info['ruzhishijian']}</th>
		                    	</tr>
		                    	<tr>
		                            <th scope="row" className="specalt" colSpan="2">通信地址:&nbsp;{info['tongxindizhi']}</th>
		                            <th scope="row" className="specalt" colSpan="2">更新时间:&nbsp;{moment(info['gengxinshijian']).format('YYYY-MM-DD HH:mm:ss')}</th>
		                    	</tr>
		                    	<tr>
									<th scope="row" className="specalt" colSpan="2">所属部门:&nbsp;{info['suosubumen']}</th>
		                            <th scope="row" className="specalt" colSpan="2">固定电话:&nbsp;{info['gudingdianhua']}</th>
		                    	</tr>
		                    	<tr>
									<th scope="row" className="specalt" colSpan="2">是否干部:&nbsp;{info['ganbu']}</th>
		                            <th scope="row" className="specalt" colSpan="2">移动电话:&nbsp;{info['yidongdianhua']}</th>
		                    	</tr>
		                    	<tr>
		                            <th scope="row" className="specalt" colSpan="2">职务:&nbsp;{this.state.zhiwu}</th>
		                            <th scope="row" className="specalt" colSpan="2">血型:&nbsp;{info['xuexing']}</th>
		                    	</tr>
		                    	<tr>
		                            <th scope="row" className="specalt" colSpan="2">伤病情况:&nbsp;{info['jiankangzhuangkuang']}</th>
		                            <th scope="row" className="specalt" colSpan="2">特长爱好:&nbsp;{info['techangaihao']}</th>
		                    	</tr>
                                <tr>
                                    <th scope="row" className="specalt" colSpan="2">微信验证码:&nbsp;{info['wxyanzhengma']}</th>
									<th scope="row" className="specalt" colSpan="2">设备工号:&nbsp;{info['shebeigonghao']}</th>
                                </tr>
								<tr>
									<th scope="row" className="specalt" colSpan="2">角色:&nbsp;{this.state.juse}</th>
									<th scope="row" className="specalt" colSpan="2">身份:&nbsp;{this.state.liuchengjuese}</th>
								</tr>
								<tr>
									<th scope="row" className="specalt" colSpan="2">是否外聘:&nbsp;{info['iswaipinrenyuan']}</th>
									<th scope="row" className="specalt" colSpan="2">用户类别:&nbsp;{this.state.renyuanleixing}</th>
								</tr>
								<tr>
									<th scope="row" className="specalt" colSpan="2">应休时长:&nbsp;{info['yingxiushichang']}</th>
									<th scope="row" className="specalt" colSpan="2">已休时长:&nbsp;{info['yixiushichang']}</th>
								</tr>
		                  	</tbody>
		              	</table>
		              	<br/>
		              	<Table
		              		showHeader={false}
		              		pagination={false}
							columns={columns}
							dataSource={this.state.renyuanList}
							bordered
							title={() => '人员履历'}
							scroll={{ y: "calc(100vh - 500px)", x: true }}  
						/>
		            </div>
		        </div>
	      	</div>
	    );
  	}
}

const AppForm = Form.create()(App);
export default AppForm;
