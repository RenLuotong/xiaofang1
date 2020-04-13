import React from 'react';
import ReactDOM from 'react-dom';
import {
	message,
	Upload,
	Modal,
	Icon,
	Input,
	Button,
	Tree,
	Tabs, DatePicker, Select
} from 'antd';

const { TextArea } = Input;

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			id:this.props.match.params.id,
			zuzhijigouInfo:{},
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

	getInfo() {
	}



	backPage() {
		window.location.href = "./xitong.html#/xitongsheding_admin_xinlijiankang";
	}

    SaveCaiDan() {
        if (!confirm("确定修改此测试题！")) {
            return;
        }
    }


	componentDidMount () {
    }


  	render() {

		const { time} = this.state;

	    return (
	      	<div>
				<label>测试题名称:</label>
				<Input
					size="default"
					style={{margin:10,width:1040 }}
					value={'我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人?'}
				/>
				<br/>
                <label>选项A:</label>
				<Input style={{margin:10,width:200}} value={'是'}/>
				<label>选项B:</label>
				<Input style={{margin:10,width:200}} value={'否'}/>
				<label>选项C:</label>
				<Input style={{margin:10,width:200}} value={'有可能是'}/>
				<label>选项D:</label>
				<Input style={{margin:10,width:200}} value={'不确定'}/>
                <br/>
				<label>正确选项:</label>
				<Select style={{margin:10,width:200}} value={'选项D'}>
					<Select.Option value="选项A">选项A</Select.Option>
					<Select.Option value="选项B">选项B</Select.Option>
					<Select.Option value="选项C">选项C</Select.Option>
					<Select.Option value="选项D">选项D</Select.Option>
				</Select>
				<br/>
				<Button type="primary" icon="plus" onClick={this.SaveCaiDan.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default App;
