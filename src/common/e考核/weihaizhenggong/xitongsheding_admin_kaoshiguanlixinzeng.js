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
	Tabs
} from 'antd';

const { TextArea } = Input;

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	SaveCaiDan() {
		if (!confirm("确定添加此考试吗？")) {
			return;
		}
	}

	backPage() {
		window.location.href = "./xitong.html#/xitongsheding_admin_kaoshiguanli";
	}


	render() {

		const FormItem = Form.Item;
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Form layout="inline" onSubmit={this.handleSubmit}>
					<FormItem label="考试名称">
						{getFieldDecorator('kaoshimingcheng', {
							rules: [{ required: true, message: '请输入考试名称', whitespace: true }],
						})(
							<Input style={{margin:5,width:200}}/>
						)}
					</FormItem>
					<br/>
					<FormItem label="题库选择">
						{getFieldDecorator('tiku', {
							rules: [{ required: true, message: '请选择题库', whitespace: true }],
						})(
							<Select style={{margin:10,width:200}}>
								<Select.Option value="题库1">题库1</Select.Option>
								<Select.Option value="题库2">题库2</Select.Option>
							</Select>
						)}
					</FormItem>
					<br/>
					<FormItem label="考题数量">
						{getFieldDecorator('kaotishuliang', {
							rules: [{ required: true, message: '请输入考题数量', whitespace: true }],
						})(
							<InputNumber style={{margin:5,width:200}} min={1}/>
						)}
					</FormItem>
				</Form>
				<br/>
				<Button type="primary" icon="plus" onClick={this.SaveCaiDan.bind(this)}>保存</Button>
			</div>
		);
	}
}

const AppForm = Form.create()(App);
export default AppForm;
