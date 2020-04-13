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
	Tabs, DatePicker,
	Card
} from 'antd';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';

const { TextArea } = Input;

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			id:this.props.match.params.id,
			renyuanList:['赵一', '钱二', '孙三', '李四', '周五', '武六', '王七'],
			fenshuList:[100, 90, 70, 94, 90, 90, 60],
			heighttemp:document.documentElement.clientHeight*0.60 + 'px'
		};
	}


	getInfo() {
	}







	componentDidMount () {
	}


	render() {

		let option = {
			color: ['#3398DB'],
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis:  {
				type: 'value',
			},
			yAxis:[ {
				type : 'category',
				data : this.state.renyuanList,
				axisTick: {
					alignWithLabel: true
				}
			},
			],
			series : [
				{
					name:'取得分数',
					type:'bar',
					barWidth: '40%',
					data:this.state.fenshuList,
					itemStyle: {
						normal: {
							label: {
								show: true, //开启显示
								position: 'top', //在上方显示
								textStyle: { //数值样式
									color: 'black',
									fontSize: 16
								}
							}
						}
					},
				}
			]
		};

		const {heighttemp} = this.state;



		return (
			<div>
					<ReactEchartsCore
						style={{height: heighttemp}}
						echarts={echarts}
						option={option}
					/>
			</div>
		);
	}
}

export default App;
