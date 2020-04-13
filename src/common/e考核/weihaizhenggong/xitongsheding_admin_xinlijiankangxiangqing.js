import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import moment from 'moment';
import {
	message,
	DatePicker,
	Icon,
	Input,
	Form,
	Button,
	Table,
	Divider,
	Select,
	Popconfirm,
	Modal,
	Popover,
	Tag,
	Card,
} from 'antd';
const { TextArea } = Input;
class Appmain extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return(
			<div>
				<Switch>
					<Route exact path = {this.props.match.path} component = {AppComp} />
				</Switch>
			</div>
		);
	}
}

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			pagination: {
				pageSize : 10,
				current : 1
			},
			infoList:[],
			id:this.props.match.params.id,
		};
	}

	componentWillMount () {
	}


	render() {
		return(
			<div>
				<p style={{fontSize:'18px',fontFamily:'黑体'}}>题目:我干什么很少提前做计划，我属于那种一时兴起想干什么就干什么的人</p>
				<div style={{fontSize:'15px',fontFamily:'黑体'}}>
				<p>选项A:是</p>
				<p>选项B:否</p>
				<p>选项C:有可能是</p>
				<p>选项D:不确定</p>
				<p style={{fontSize:'15px',fontFamily:'黑体',color:'red'}}>正确选项:选项D</p>
				</div>
			</div>
		)
	}
}
const AppComp = Form.create()(App);
export default Appmain;
