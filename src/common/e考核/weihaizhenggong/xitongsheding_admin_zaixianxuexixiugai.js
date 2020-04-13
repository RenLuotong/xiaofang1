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
	Tabs, DatePicker
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
				<label>题目名称:</label>
				<Input style={{margin:10,width:200}} value={'练习题'}/>
                <label>测试题难度:</label>
				<Input style={{margin:10,width:200}} value={'小'}/>
                <br/>
				<Button type="primary" icon="plus" onClick={this.SaveCaiDan.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default App;
