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
  	Divider
} from 'antd';

class App extends React.Component {

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
		let mingcheng = form.getFieldValue('mingcheng');
		let miaoshu = form.getFieldValue('miaoshu');

		let obj = {};
        obj["juesemingcheng"] = mingcheng;
        obj["juesemiaoshu"] = miaoshu;
        $.ajax({
            type:'post',
            url:SERVER+"zengjialiuchengjuese",
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
		window.location.href = "./xitong.html#/renyuanguanli_admin_liuchengjueseshezhi";
	}

	componentDidMount() {

    }

  	render() {

  		const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

	    return (
	      	<div>
		        <Form layout="inline" onSubmit={this.handleSubmit}>
		          	<FormItem label="身份名称">
		             	{getFieldDecorator('mingcheng', {
            				rules: [{ required: true, message: '请输入身份名称', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="身份描述">
		             	{getFieldDecorator('miaoshu', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
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
