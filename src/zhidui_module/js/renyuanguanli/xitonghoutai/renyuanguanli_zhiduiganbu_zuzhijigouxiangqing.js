import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import moment from 'moment';

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
  	Divider
} from 'antd';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			id:this.props.match.params.id,
			zuzhijigouInfo:{},
			fileList: [],
			previewVisible: false,
            previewImage: '',
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
                THE.setState({
                    zuzhijigouInfo: data.data,
                    fileList: [{
				      	uid: 0,
				      	name: 'a.png',
				      	status: 'done',
				      	url: data.data['pingmiantu'],
				    }]
                });
            }
        });
	}

	componentDidMount () {
		this.getInfo();
    }

  	render() {

  		let info = this.state.zuzhijigouInfo;
  		let gengxinshijian = moment(info['gengxinshijian']).format('YYYY-MM-DD');
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

	    return (
	      	<div>
		        <table id="mytable" cellSpacing="0">
                	<tbody>
                    	<tr>
                        	<th scope="col" className="nobg">组织机构详情</th>
                        	<th scope="col"> </th>
                        	<th scope="col"> </th>
                        	<th scope="col"> </th>
                    	</tr>
                    	<tr>
                            <th scope="row" className="spec">机构名称</th>
                            <td>{info['jigoumingcheng']}</td>
                            <th scope="row" className="spec">机构类别</th>
                            <td>{info['jigouleibie']}</td>
                    	</tr>
                    	<tr>
                            <th scope="row" className="specalt">行政区代码</th>
                            <td className="alt">{info['xingzhengqudaima']}</td>
                            <th scope="row" className="specalt">机构地址</th>
                            <td className="alt">{info['jigoudizhi']}</td>
                    	</tr>
                    	<tr>
                            <th scope="row" className="spec">邮政编码</th>
                            <td>{info['youzhengbianma']}</td>
                            <th scope="row" className="spec">联系电话</th>
                            <td>{info['lianxidianhua']}</td>
                    	</tr>
                    	<tr>
                            <th scope="row" className="specalt">上级机构</th>
                            <td className="alt">{info['shangjijigoumingcheng']}</td>
                            <th scope="row" className="specalt">机构描述</th>
                            <td className="alt">{info['jigoumiaoshu']}</td>
                    	</tr>
                    	<tr>
                            <th scope="row" className="spec">营区面积</th>
                            <td>{info['yingqumianji']}</td>
                            <th scope="row" className="spec">经度</th>
                            <td>{info['jingdu']}</td>
                    	</tr>
                    	<tr>
                            <th scope="row" className="specalt">纬度</th>
                            <td className="alt">{info['weidu']}</td>
                            <th scope="row" className="specalt">单子围栏半径</th>
                            <td className="alt">{info['dianziweilanbanjing']}</td>
                    	</tr>
                  	</tbody>
              	</table>
              	<label>平&nbsp;&nbsp;面&nbsp;&nbsp;图:</label>
	            <div>
                    <Upload
                        {...uploadProps}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        showUploadList={{ showPreviewIcon: true, showRemoveIcon: false }}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
					<div style={{clear:"both"}}></div>
				</div>
	      	</div>
	    );
  	}
}

export default App;
