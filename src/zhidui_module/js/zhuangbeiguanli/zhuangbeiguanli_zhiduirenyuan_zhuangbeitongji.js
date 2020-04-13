import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Card, Tag, Tree, Icon, Button} from 'antd';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';

const { TreeNode } = Tree;

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			testTree:[
			  	{
			    	title: '庆云大队',
			    	key: '庆云大队',
			    	children: [
				    	{
					    	title: '渤海中队',
			    			key: '渤海中队',
					  	},
					  	{
					    	title: '张村中队',
			    			key: '张村中队',
					  	},
					  	{
					    	title: '青岛路中队',
			    			key: '青岛路中队',
			    			children: [
						    	{
							    	title: '渤海中队1',
					    			key: '渤海中队1',
							  	},
							  	{
							    	title: '张村中队1',
					    			key: '张村中队1',
							  	},
							  	{
							    	title: '青岛路中队1',
					    			key: '青岛路中队1',
							  	},
							],
					  	},
					],
			  	},
			],
			treeList:[],
			echartInfo: {
				zhuangbeileixingmingchengList: [],
				baofeicount: 0,
				baofeicountList: [],
				baoxiucount: 0,
				baoxiucountList: [],
				beiqincount: 0,
				beiqincountList: [],
				erjiKucunCount: 0,
				erjiKucunCountList: [],
				totalCount: 0,
				totalCountList: [],
				yijiKucunCount: 0,
				yijiKucunCountList: [],
				zhiqinCount: 0,
				zhiqinCountList: [],
			},
			showcaidan: "block",
			showanniu: "none",
		};
	}

	//隐藏菜单方法
	yincangcaidan() {
		this.setState({
			showcaidan: "none",
			showanniu: "block",
		})
	}
	//显示菜单方法
	xianshicaidan(){
		this.setState({
			showcaidan: "block",
			showanniu: "none",
		})
	}

	onSelect = (e) => {
		if (e.length != 0) {
			let onSelect = e[0];
    		this.getTreeInfo(onSelect);
		}
  	}

  	renderTreeNodes = (data) => {
    	return data.map((item) => {
	      	if (item.children) {
	        	return (
	          		<TreeNode title={item.title} key={item.key} dataRef={item} icon={<Icon type="folder" />}>
	            		{this.renderTreeNodes(item.children)}
	          		</TreeNode>
	        	);
	      	}
	      	return <TreeNode {...item} icon={<Icon type="folder" />}/>;
    	});
  	}

  	getTree() {
  		const THE = this;
        let juese = '装备科科长';
		$.ajax({
    		type:'GET',
	        url:SERVER+"zhiduiAlljigou?juese="+juese,
	        success:function(data){
	            if(data.status != 0){
	                message.warning(data.message);
	                return;
	            }
	            let treeList = THE.state.treeList;
	            treeList.push(data.data);
	            THE.setState({
	          		treeList:treeList
	          	});
	        }
	    });
  	}

  	getInfo() {
		const THE = this;
        let juese = '装备科科长';
		$.ajax({
    		type:'GET',
            url:SERVER+"GerenZhuangbeiZhuzhuangtu?juese="+juese,
	        success:function(data){
	            if(data.status != 0){
	                message.warning(data.message);
	                return;
	            }
	            let echartInfo = THE.state.echartInfo;
	            echartInfo.zhuangbeileixingmingchengList = data.data.zhuangbeileixingmingchengList;

	            echartInfo.baofeicount = data.data.baofeicount;
	            echartInfo.baofeicountList = data.data.baofeicountList;

	            echartInfo.baoxiucount = data.data.baoxiucount;
	            echartInfo.baoxiucountList = data.data.baoxiucountList;

	            echartInfo.beiqincount = data.data.beiqincount;
	            echartInfo.beiqincountList = data.data.beiqincountList;

	            echartInfo.erjiKucunCount = data.data.erjiKucunCount;
	            echartInfo.erjiKucunCountList = data.data.erjiKucunCountList;

	            echartInfo.totalCount = data.data.totalCount;
	            echartInfo.totalCountList = data.data.totalCountList;

	            echartInfo.yijiKucunCount = data.data.yijiKucunCount;
	            echartInfo.yijiKucunCountList = data.data.yijiKucunCountList;

	            echartInfo.zhiqinCount = data.data.zhiqinCount;
	            echartInfo.zhiqinCountList = data.data.zhiqinCountList;
	          	THE.setState({
	          		echartInfo:echartInfo
	          	});
	        }
	    });
	}

  	getTreeInfo(jigoudaima) {
		const THE = this;
        let juese = '装备科科长';
		$.ajax({
    		type:'GET',
	        url:SERVER+"GerenZhuangbeiZhuzhuangtu?jigoudaima="+jigoudaima+"&juese="+juese,
	        success:function(data){
	            if(data.status != 0){
	                message.warning(data.message);
	                return;
	            }
	            let echartInfo = THE.state.echartInfo;
	            echartInfo.zhuangbeileixingmingchengList = data.data.zhuangbeileixingmingchengList;

	            echartInfo.baofeicount = data.data.baofeicount;
	            echartInfo.baofeicountList = data.data.baofeicountList;

	            echartInfo.baoxiucount = data.data.baoxiucount;
	            echartInfo.baoxiucountList = data.data.baoxiucountList;

	            echartInfo.beiqincount = data.data.beiqincount;
	            echartInfo.beiqincountList = data.data.beiqincountList;

	            echartInfo.erjiKucunCount = data.data.erjiKucunCount;
	            echartInfo.erjiKucunCountList = data.data.erjiKucunCountList;

	            echartInfo.totalCount = data.data.totalCount;
	            echartInfo.totalCountList = data.data.totalCountList;

	            echartInfo.yijiKucunCount = data.data.yijiKucunCount;
	            echartInfo.yijiKucunCountList = data.data.yijiKucunCountList;

	            echartInfo.zhiqinCount = data.data.zhiqinCount;
	            echartInfo.zhiqinCountList = data.data.zhiqinCountList;
	          	THE.setState({
	          		echartInfo:echartInfo
	          	});
	        }
	    });
	}

  	componentDidMount(){
  		this.getTree();
    	this.getInfo();
    }

	render() {

		let echartInfo = this.state.echartInfo;

		let quanbuOption = {
		    color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid : {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type: 'category',
		            data: echartInfo.zhuangbeileixingmingchengList,
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLabel: {  //实现X轴文字垂直显示
                       	interval: 0,
                       	formatter: function(value)
                       	{
                           return value.split("").join("\n");
                       	}
                   }
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
		            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
		        }
		    ],
		    series : [
		        {
		            name: '装备数量',
		            type: 'bar',
		            barWidth: 30,
		            data: echartInfo.totalCountList,
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

		let zhiqinOption = {
		    color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid : {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type: 'category',
		            data: echartInfo.zhuangbeileixingmingchengList,
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLabel: {  //实现X轴文字垂直显示
                       	interval: 0,
                       	formatter: function(value)
                       	{
                           return value.split("").join("\n");
                       	}
                   }
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
		            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
		        }
		    ],
		    series : [
		        {
		            name: '装备数量',
		            type: 'bar',
		            barWidth: 30,
		            data: echartInfo.zhiqinCountList,
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

		let beiqinOption = {
		    color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid : {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type: 'category',
		            data: echartInfo.zhuangbeileixingmingchengList,
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLabel: {  //实现X轴文字垂直显示
                       	interval: 0,
                       	formatter: function(value)
                       	{
                           return value.split("").join("\n");
                       	}
                   }
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
		            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
		        }
		    ],
		    series : [
		        {
		            name: '装备数量',
		            type: 'bar',
		            barWidth: 30,
		            data: echartInfo.beiqincountList,
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

		let baoxiuOption = {
		    color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid : {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type: 'category',
		            data: echartInfo.zhuangbeileixingmingchengList,
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLabel: {  //实现X轴文字垂直显示
                       	interval: 0,
                       	formatter: function(value)
                       	{
                           return value.split("").join("\n");
                       	}
                   }
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
		            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
		        }
		    ],
		    series : [
		        {
		            name: '装备数量',
		            type: 'bar',
		            barWidth: 30,
		            data: echartInfo.baoxiucountList,
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

		let baofeiOption = {
		    color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid : {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type: 'category',
		            data: echartInfo.zhuangbeileixingmingchengList,
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLabel: {  //实现X轴文字垂直显示
                       	interval: 0,
                       	formatter: function(value)
                       	{
                           return value.split("").join("\n");
                       	}
                   }
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
		            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
		        }
		    ],
		    series : [
		        {
		            name: '装备数量',
		            type: 'bar',
		            barWidth: 30,
		            data: echartInfo.baofeicountList,
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

		let erjikuOption = {
		    color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid : {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type: 'category',
		            data: echartInfo.zhuangbeileixingmingchengList,
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLabel: {  //实现X轴文字垂直显示
                       	interval: 0,
                       	formatter: function(value)
                       	{
                           return value.split("").join("\n");
                       	}
                   }
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
		            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
		        }
		    ],
		    series : [
		        {
		            name: '装备数量',
		            type: 'bar',
		            barWidth: 30,
		            data: echartInfo.erjiKucunCountList,
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

		let yijikuOption = {
		    color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid : {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type: 'category',
		            data: echartInfo.zhuangbeileixingmingchengList,
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLabel: {  //实现X轴文字垂直显示
                       	interval: 0,
                       	formatter: function(value)
                       	{
                           return value.split("").join("\n");
                       	}
                   }
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
		            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
		        }
		    ],
		    series : [
		        {
		            name: '装备数量',
		            type: 'bar',
		            barWidth: 30,
		            data: echartInfo.yijiKucunCountList,
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

		let quanbuExtra = (
			<div id="myExtra">
				<div id="myExtraDiv">{echartInfo.totalCount}&#12288;</div>
				<Tag color="blue" id="echartTag">{echartInfo.totalCount}</Tag>
			</div>
		);

		let zhiqinExtra = (
			<div id="myExtra">
				<div id="myExtraDiv">{echartInfo.zhiqinCount}&#12288;</div>
				<Tag color="blue" id="echartTag">{echartInfo.totalCount}</Tag>
			</div>
		);

		let baiqinExtra = (
			<div id="myExtra">
				<div id="myExtraDiv">{echartInfo.beiqincount}&#12288;</div>
				<Tag color="blue" id="echartTag">{echartInfo.totalCount}</Tag>
			</div>
		);

		let baoxiuExtra = (
			<div id="myExtra">
				<div id="myExtraDiv">{echartInfo.baoxiucount}&#12288;</div>
				<Tag color="blue" id="echartTag">{echartInfo.totalCount}</Tag>
			</div>
		);

		let baofeiExtra = (
			<div id="myExtra">
				<div id="myExtraDiv">{echartInfo.baofeicount}&#12288;</div>
				<Tag color="blue" id="echartTag">{echartInfo.totalCount}</Tag>
			</div>
		);

		let erjikuExtra = (
			<div id="myExtra">
				<div id="myExtraDiv">{echartInfo.erjiKucunCount}&#12288;</div>
				<Tag color="blue" id="echartTag">{echartInfo.totalCount}</Tag>
			</div>
		);

		let yijikuExtra = (
			<div id="myExtra">
				<div id="myExtraDiv">{echartInfo.yijiKucunCount}&#12288;</div>
				<Tag color="blue" id="echartTag">{echartInfo.totalCount}</Tag>
			</div>
		);

		let title = (
			<div id="myTitle">
				<Button style={{display: this.state.showcaidan}} onClick={this.yincangcaidan.bind(this)}><Icon type="left"/></Button>
				<div id="myTitleDiv">组织机构</div>
			</div>
		);

		return (
			<div id="chaxuntongji">
				<Button style={{display: this.state.showanniu}} onClick={this.xianshicaidan.bind(this)}><Icon type="right"/></Button>
				<div id="treeLeft" style={{display: this.state.showcaidan}}>
					<Card
						title={title}
						id="treeLeftCard"
						style={{display: this.state.showcaidan}}
					>
						{
				          	this.state.treeList.length
				            ?
				              	<Tree
						      		showIcon
							        defaultExpandAll
							        onSelect={this.onSelect}
							        switcherIcon={<Icon type="down" />}
						      	>
									{this.renderTreeNodes(this.state.treeList)}
				      			</Tree>
				            :
				            null
				        }
				    </Card>
				</div>

				<div id="treeRight" style={{flex:1}}>
					<Card
						id="echartCard"
				      	title="全部"
				      	extra={quanbuExtra}
				    >
				      	<ReactEchartsCore
				 			echarts={echarts}
				 			option={quanbuOption}
			 			/>
				    </Card>
				    <br/>
				    <Card
						id="echartCard"
				      	title="执勤"
				      	extra={zhiqinExtra}
				    >
				      	<ReactEchartsCore
				 			echarts={echarts}
				 			option={zhiqinOption}
			 			/>
				    </Card>
				    <br/>
				    <Card
						id="echartCard"
				      	title="备勤"
				      	extra={baiqinExtra}
				    >
				      	<ReactEchartsCore
				 			echarts={echarts}
				 			option={beiqinOption}
			 			/>
				    </Card>
				    <br/>
				    <Card
						id="echartCard"
				      	title="维修"
				      	extra={baoxiuExtra}
				    >
				      	<ReactEchartsCore
				 			echarts={echarts}
				 			option={baoxiuOption}
			 			/>
				    </Card>
				    <br/>
				    <Card
						id="echartCard"
				      	title="报废"
				      	extra={baofeiExtra}
				    >
				      	<ReactEchartsCore
				 			echarts={echarts}
				 			option={baofeiOption}
			 			/>
				    </Card>
				    <br/>
				    <Card
						id="echartCard"
				      	title="二级库库存"
				      	extra={erjikuExtra}
				    >
				      	<ReactEchartsCore
				 			echarts={echarts}
				 			option={erjikuOption}
			 			/>
				    </Card>
				    <br/>
				    <Card
						id="echartCard"
				      	title="一级库库存"
				      	extra={yijikuExtra}
				    >
				      	<ReactEchartsCore
				 			echarts={echarts}
				 			option={yijikuOption}
			 			/>
				    </Card>
				</div>
			</div>
		)
	}

}

export default App;