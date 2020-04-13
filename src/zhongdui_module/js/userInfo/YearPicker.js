/**
 * 使用方法
 * 引入：
 * import YearPicker from "@/common/widget/YearPicker";//路径按照自己的来
 * // 获取年份值
 filterByYear = value => {
    console.log(value);
  };
 * <YearPicker
 operand={12}//点击左箭头或右箭头一次递增的数值，可以不写，默认为0
 callback={this.filterByYear}//用于获取最后选择到的值
 />
 */
import React, { Component } from "react";
import { Icon } from "antd";
import "../../less/calendar.less";//这个文件自己选择一个温暖的地方放

class YearPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			selectedyear: "",
			years: []
		};
	}

	componentWillMount() {
		let { defaultValue } = this.props;
		this.setState({ selectedyear: defaultValue });
	}
	componentDidMount() {
		let _this = this;
		document.addEventListener(
			"click",
			function(e) {
				const { isShow } = _this.state;
				let clsName = e.target.className;
				if (
					clsName.indexOf("calendar") === -1 &&
					e.target.tagName !== "BUTTON" &&
					isShow
				) {
					_this.hide();
				}
			},
			false
		);
	}
	//初始化数据处理
	initData = (operand, defaultValue) => {
		operand = operand ? operand : 12;
		defaultValue = defaultValue ? defaultValue : 2020;
		let year = defaultValue - 1970;
		let curr = year % operand;
		let start = new Date().getFullYear();
		let end = defaultValue + operand - 1 - curr;
		console.log(start)
		this.getYearsArr(start, end);
	};
	//   获取年份范围数组
	getYearsArr = (start, end) => {
		let arr = [];
		for (let i = start; i <= end; i++) {
			arr.push(Number(i));
		}
		this.setState({
			years: arr
		});
	};
	// 显示日历年组件
	show = () => {
		const { selectedyear } = this.state;
		let { operand } = this.props;
		operand = operand ? operand : 12;
		this.initData(operand, selectedyear);
		this.setState({ isShow: true });
	};
	// 隐藏日期年组件
	hide = () => {
		this.setState({ isShow: false });
	};
	hidedata(){
		this.setState({ selectedyear: '' });
		if (this.props.callback) {
			this.props.callback('');
		}
	};
	// 向前的年份
	prev = () => {
		const { years } = this.state;
		let shuzi = new Date().getFullYear();
		if (years[0] <= shuzi) {
			return;
		}
		this.getNewYearRangestartAndEnd("prev");
	};
	// 向后的年份
	next = () => {
		this.getNewYearRangestartAndEnd("next");
	};

	//   获取新的年份
	getNewYearRangestartAndEnd = type => {
		const { selectedyear, years } = this.state;
		let operand = Number(this.props.operand);
		operand = operand ? operand : 12;
		let start = Number(years[0]);
		let end = Number(years[years.length - 1]);
		let newstart;
		let newend;
		if (type == "prev") {
			newstart = parseInt(start - operand);
			newend = parseInt(end - operand);
		}
		if (type == "next") {
			newstart = parseInt(start + operand);
			newend = parseInt(end + operand);
		}
		this.getYearsArr(newstart, newend);
	};

	// 选中某一年
	selects = e => {
		let val = Number(e.target.value);
		this.hide();
		this.setState({ selectedyear: val });
		if (this.props.callback) {
			this.props.callback(val);
		}
	};

	render() {
		const { isShow, years, selectedyear } = this.state;
        let icon = '';
		if(selectedyear !=='' && selectedyear !==undefined && selectedyear !==null){
          icon = <Icon type="close" className="calendar-icon" onClick={this.hidedata.bind(this)}/>;
		}

		return (
			<div className="calendar-wrap">
				<div className="calendar-input">
					<input
						className="calendar-value"
						placeholder="请选择年份"
						onFocus={this.show}
						value={selectedyear}
						readOnly
					/>
					{icon}
				</div>
				{isShow ? (
					<List
						data={years}
						value={selectedyear}
						prev={this.prev}
						next={this.next}
						cback={this.selects}
					/>
				) : (
					""
				)}
			</div>
		);
	}
}
const List = props => {
	const { data, value, prev, next, cback } = props;
	return (
		<div className="calendar-container">
			<div className="calendar-head-year">
				<Icon
					type="double-left"
					className="calendar-btn prev-btn"
					title=""
					onClick={prev}
				/>
				<span className="calendar-year-range">{value}</span>
				<Icon
					type="double-right"
					className="calendar-btn next-btn"
					title=""
					onClick={next}
				/>
			</div>
			<div className="calendar-body-year">
				<ul className="calendar-year-ul">
					{data.map((item, index) => (
						<li
							key={index}
							title={item}
							className={
								item == value
									? "calendar-year-li calendar-year-selected"
									: "calendar-year-li"
							}
						>
							<button onClick={cback} value={item}>
								{item}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default YearPicker;