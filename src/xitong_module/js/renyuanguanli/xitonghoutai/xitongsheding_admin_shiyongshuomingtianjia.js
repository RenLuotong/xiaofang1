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
	  Divider,
	  Upload,
} from 'antd';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			fileList: [],
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
  			if (!err) {
    			this.toCreate();
  			}
		});
	}

	handleChange = ({fileList}) => {
        this.setState({
            fileList: fileList,
        });
    }

	toCreate() {
		const THE = this;
		let form = THE.props.form;
		let mingcheng = form.getFieldValue('mingcheng');
		let fileList = THE.state.fileList;
        if (fileList.length < 1) {
        	message.error("请上传APP！");return;
        }
        let url = fileList[0]['response'];


        $.ajax({
            type:'post',
            url:SERVER+"tbBangzhuWendang/save?mingcheng="+mingcheng+"&lujing="+url,
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
		window.location.href = "./xitong.html#/xitongsheding_admin_shiyongshuomingguanli";
	}



	componentDidMount() {

    }

  	render() {

		const props = {
			name: 'files',
		  action: SERVER+"files",
		  headers: {
			  Authorization:"Bearer "+sessionStorage.getItem("token")
		  },
			onChange(info) {
//		    	if (info.file.status !== 'uploading') {
//		      		console.log(info.file, info.fileList);
//		    	}
			  if (info.file.status === 'done') {
					message.success(`${info.file.name} 文件上传成功`);
			  } else if (info.file.status === 'error') {
					message.error(`${info.file.name} 文件上传失败`);
			  }
			},
	  };

  		const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

	    return (
	      	<div>
		        <Form layout="inline" onSubmit={this.handleSubmit}>
		          	<FormItem label="文件名称">
		             	{getFieldDecorator('mingcheng', {
            				rules: [{ required: true, message: '请输入文件名称', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem >
					  <Upload
    					{...props}
    					onChange={this.handleChange}
    				>
				    	<Button><Icon type="upload" />上传文件</Button>
				  	</Upload>
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
