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
		let zhiwumingcheng = form.getFieldValue('zhiwumingcheng');
		let zhiwumiaoshu = form.getFieldValue('zhiwumiaoshu');
		let zhiwujiancheng = form.getFieldValue('zhiwujiancheng');
		let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
		
		let obj = {};
        obj["zhiwumingcheng"] = zhiwumingcheng;
        obj["zhiwumiaoshu"] = zhiwumiaoshu;
        obj["zhiwujiancheng"] =zhiwujiancheng;
        obj["jigoumingcheng"] =jigoumingcheng;
        $.ajax({
            type:'post',
            url:SERVER+"tianjiaZhiwu",
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
		window.location.href = "./zhidui.html#/renyuanguanli_zhiduiganbu_zhiwushezhi";
	}
	
	componentDidMount() {
		
    }

  	render() {
  		
  		const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

	    return (
	      	<div>
		        <Form layout="inline" onSubmit={this.handleSubmit}>
		          	<FormItem label="职务名称">
		             	{getFieldDecorator('zhiwumingcheng', {
            				rules: [{ required: true, message: '请输入职务名称', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="职务描述">
		             	{getFieldDecorator('zhiwumiaoshu', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<br/>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;职务简称">
		             	{getFieldDecorator('zhiwujiancheng', {
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
