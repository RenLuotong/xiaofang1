import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Circle, Marker } from 'react-amap';
import { Input, InputNumber, Button, message } from 'antd'

const randomIndex = (len) => (Math.floor(Math.random() * len));
const randomColor = () => {
	const chars = '0123456789abcdef'.split('');
	const len = chars.length;
	return `#${chars[randomIndex(len)]}${chars[randomIndex(len)]}`
		+ `${chars[randomIndex(len)]}${chars[randomIndex(len)]}`
		+ `${chars[randomIndex(len)]}${chars[randomIndex(len)]}`;
};

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			center: {longitude: 122.118755, latitude: 37.506695},
			radius: 0,
			visible: true,
			style: {
				strokeColor: "#D75553", //线颜色
//	            strokeOpacity: 0.2, //线透明度
				strokeWeight: 3,    //线宽
				fillColor: "#1791fc", //填充色
				fillOpacity: 0.05//填充透明度
			},
			zuzhijigouInfo: {},
			jd: 0,
			wd: 0,
			bj: 0,
		};
		this.circleEvents = {
			created: (ins) => {console.log(window.circle = ins)},
			click: () => {console.log('clicked')},
			mouseover: () => {console.log('mouseover')},
		}
		this.events = {
			created: (ins) => {
				var mybounds = new AMap.Bounds([this.state.center.longitude-8, this.state.center.latitude-4], [this.state.center.longitude+8, this.state.center.latitude+4]);
				ins.setBounds(mybounds);
				var bounds = ins.getBounds();
				ins.setLimitBounds(bounds);

			},
		}
	}

	toggleVisible(){
		this.setState({
			visible: !this.state.visible,
		});
	}

	jdChange = (value) => {
		this.setState({
			jd: value,
		});
	}

	wdChange = (value) => {
		this.setState({
			wd: value,
		});
	}

	bjChange = (value) => {
		this.setState({
			bj: value,
		});
	}

	addRound() {
		let jd = this.state.jd;
		let wd = this.state.wd;
		let bj = this.state.bj;
		this.setState({
			center: {
				longitude: jd,
				latitude: wd,
			},
			radius: bj,
		});
	}

	getDianziweilan() {
		console.log(1111)
		const THE = this;
		let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
		$.ajax({
			url:SERVER+"zuzhijigouXiangqingJgmc?jigoumingcheng="+jigoumingcheng,
			success:function(data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				if (data.data['jingdu'] != 0 && data.data['weidu'] != 0 && data.data['dianziweilanbanjing'] != 0) {
					THE.setState({
						zuzhijigouInfo : data.data,
						center: {
							longitude: data.data['jingdu'],
							latitude: data.data['weidu'],
						},
						radius : data.data['dianziweilanbanjing'],
						jd: data.data['jingdu'],
						wd: data.data['weidu'],
						bj: data.data['dianziweilanbanjing'],
					});
				} else {
					THE.setState({
						zuzhijigouInfo : data.data,
						jd: data.data['jingdu'],
						wd: data.data['weidu'],
						bj: data.data['dianziweilanbanjing'],
					});
				}
			}
		});
	}

	toCreate() {
		let zuzhijigouInfo = this.state.zuzhijigouInfo;
		let jd = this.state.jd;
		let wd = this.state.wd;
		let bj = this.state.bj;
		const THE = this;
		if (!confirm("确定保存当前电子围栏？")) {
			return;
		}
		zuzhijigouInfo['jingdu'] = jd;
		zuzhijigouInfo['weidu'] = wd;
		zuzhijigouInfo['dianziweilanbanjing'] = bj;
		$.ajax({
			type : 'POST',
			url : SERVER+"xiugaiZuzhijigou",
			data : JSON.stringify(zuzhijigouInfo),
			dataType : 'json',
			contentType : "application/json",
			success : function(data) {
				if (data.status != 0) {
					message.warning(data.message);
					return;
				}
				message.success("保存电子围栏成功");
				THE.getDianziweilan();
			}
		});
	}

	componentWillMount () {
		this.getDianziweilan();
	}

	render() {

		const { jd, wd, bj } = this.state;
		const styleInput = {
			margin: '10px',
			width: '200px',
		}
		const styleButton = {
			margin: '5px',
		}
		const a = document.documentElement.clientHeight-190 + 'px';

		return (
			<div>
				<div>
					<label>圆心经度&nbsp;:&nbsp;</label>
					<InputNumber size="default" id="jd" style={styleInput} onChange={this.jdChange} value={jd}/>
					<label>圆心纬度&nbsp;:&nbsp;</label>
					<InputNumber size="default" id="wd" style={styleInput} onChange={this.wdChange} value={wd}/>
					<label>圆半径(单位:米)&nbsp;:&nbsp;</label>
					<InputNumber size="default" id="bj" style={styleInput} onChange={this.bjChange} value={bj}/>
					<a href="https://lbs.amap.com/console/show/picker" target="_blank">点击获取经纬度</a>
					<br/>
					<Button type="primary" icon="plus-circle-o" onClick={this.addRound.bind(this)} style={styleButton}>电子围栏预览</Button>
					<Button type="primary" icon="plus-circle-o" onClick={() => { this.toggleVisible() }} style={styleButton}>电子围栏是否可见</Button>
					<Button type="primary" icon="plus-circle-o" onClick={this.toCreate.bind(this)} style={styleButton}>保存电子围栏</Button>
				</div>

				<div style={{width: '98.5%', height: a}}>
					<Map amapkey={'4e1808829fb90fb841c9352870fdae9f'} plugins={['ToolBar']} center={this.state.center} zoom={15}  zooms={[6,19]} events={ this.events }>
						<Circle
							center={ this.state.center }
							radius={ this.state.radius }
							events={ this.circleEvents }
							visible={ this.state.visible }
							style={ this.state.style }
						/>
					</Map>
				</div>
			</div>
		);
	}
}

export default App;
