import React from 'react';
import ReactDOM from 'react-dom';
import {
	InputNumber,
	message,
	Upload,
	Modal,
	Select,
  	Icon,
  	Input,
  	Form,
  	Button,
    Tree,
    Tabs,
    DatePicker
} from 'antd';

const { TextArea } = Input;

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dangqiantime:new Date(),
			time: null,
		};
	}

	disabledTime = (time) => {
		const dangqiantime = this.state.dangqiantime;
		if (!time || !dangqiantime) {
			return false;
		}
		return time.valueOf() <= dangqiantime.valueOf();
	}

	onChange = (field, value) => {
		this.setState({
			[field]: value,
		});
	}
	onTimeChange = (value) => {
		this.onChange('time', value);
	}

	componentDidMount() {
    }

    SaveCaiDan() {
        if (!confirm("确定添加此测试题吗？")) {
            return;
        }
    }

    backPage() {
        window.location.href = "./xitong.html#/xitongsheding_admin_xinlijiankang";
    }


  	render() {

		const FormItem = Form.Item;
		const { getFieldDecorator } = this.props.form;
		const { time} = this.state;
	    return (
	      	<div>
		        <Form layout="inline" onSubmit={this.handleSubmit}>
		          	<FormItem label="题库名称">
		             	{getFieldDecorator('jigoumingcheng', {
            				rules: [{ required: true, message: '请输入题目名称', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
					{/*<FormItem label="题目数量">*/}
					{/*	{getFieldDecorator('fabushijian', {*/}
					{/*		rules: [{ required: true, message: '请输入题目数量', whitespace: true }],*/}
					{/*	})(*/}
					{/*		<InputNumber style={{margin:5,width:200}} min={1}/>*/}
					{/*	)}*/}
					{/*</FormItem>*/}
                </Form>
                <br/>
                 <Button type="primary" icon="plus" onClick={this.SaveCaiDan.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

const AppForm = Form.create()(App);
export default AppForm;
