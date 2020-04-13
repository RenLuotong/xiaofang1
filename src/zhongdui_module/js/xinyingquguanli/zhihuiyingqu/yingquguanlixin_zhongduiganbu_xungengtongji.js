import React from 'react';
import moment from 'moment';
import XLSX from 'xlsx';
import {
    DatePicker,
    Icon,
    Input,
    Button,
    Table,
    message,
} from 'antd';

class App extends React.Component {
	
    constructor(props) {
        super(props);
        this.state = {
        	info: {
        		xungengmingcheng: null, 
        	},//巡更计划 巡更人 巡更地点 input框取值
            startValue: moment(new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate()), "YYYY-MM-DD 00:00:00"),
            endValue: moment(new Date(), "YYYY-MM-DD HH:mm:ss"),
            pagination: {
                pageSize : 10,
                current : 1
            },
            xungengList: [],
            //按计划共有10次巡更，8次准时，2次未到;准时率80%，未到率20%
            xungengInfo: {
            	zongcishu: 0,
            	zhunshi: 0,
            	chidao: 0,
            	zhunshilv: 0,
            	chidaolv: 0,
            },
        };
    }

	searchType = 0//1.本月2.上月3.今年
    //开始时间截止时间
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }
    onEndChange = (value) => {
        this.onChange('endValue', value);
    }
    
    handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
		let info = this.state.info;
		info[name] = value;
	    this.setState({
	      	info : info
	    });
  	}

    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pagination.pageSize,
            page: pagination.current,
        });
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
    	let searchType = this.searchType;//1.本月2.上月3.今年
        let leixing = "巡更";
        let xungengmingcheng = this.state.info.xungengmingcheng;
        if (xungengmingcheng == null) {
            xungengmingcheng = '';
        }
        let startValue;
        let endValue;
        if (searchType == 1) {
        	//本月
  		    startValue = new Date();
  		    startValue.setDate(1);
	    	endValue = new Date();
	    	startValue = moment(startValue).format('YYYY-MM-DD 00:00:00');
	    	endValue = moment(endValue).format('YYYY-MM-DD HH:mm:ss');
    	} else if (searchType == 2) {
    		//上月
    		startValue = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1);
			let day = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
			endValue = new Date(new Date().getFullYear(), new Date().getMonth()-1, day);
			startValue = moment(startValue).format('YYYY-MM-DD 00:00:00');
	    	endValue = moment(endValue).format('YYYY-MM-DD 23:59:59');
    	} else if (searchType == 3) {
    		//今年
    		startValue = new Date();
    		startValue.setDate(1);
	    	startValue.setMonth(0);
	    	endValue = new Date();
	    	startValue = moment(startValue).format('YYYY-MM-DD 00:00:00');
	    	endValue = moment(endValue).format('YYYY-MM-DD HH:mm:ss');
    	} else {
    		startValue = this.state.startValue;
	        if (typeof(startValue) == "undefined"||startValue == null) {
                startValue = "";
	        } else {
                startValue = moment(startValue).format('YYYY-MM-DD HH:mm:ss');
            }
	        endValue = this.state.endValue;
	        if (typeof(endValue) == "undefined"||endValue == null) {
                endValue = "";
	        } else {
                endValue = moment(endValue).format('YYYY-MM-DD HH:mm:ss');
            }
    	}
        let page = params.page - 1;
        let size = params.rows
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "xungengjiluliebiao?leixing="+leixing+"&xungengmingcheng="+xungengmingcheng+"&kaishishijian="+startValue+"&jieshushijian="+endValue+"&page="+page+"&size="+size,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let key = 0;
      			let rukudanList = [];
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = key;
        			key = key + 1;
                    if (data.data.content[i]["xungengshijian"] != null) {
                        data.data.content[i]["xungengshijian"] = moment(data.data.content[i]['xungengshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    data.data.content[i]["num"] = 0;
                    if (data.data.content[i]["xgjlDTOList"] != null) {
                    	data.data.content[i]["num"] = data.data.content[i]["xgjlDTOList"].length;
                    	if (data.data.content[i]["xgjlDTOList"].length != 0) {
                    		for (let a = 0; a < data.data.content[i]["xgjlDTOList"].length; a++) {
				        		data.data.content[i].xgjlDTOList[a]["key"] = key;
				        		data.data.content[i].xgjlDTOList[a]["shijian"] = moment(data.data.content[i].xgjlDTOList[a]["shijian"]).format('YYYY-MM-DD HH:mm:ss');
				        		key = key + 1;
				        	}
				        	data.data.content[i]['children'] = data.data.content[i].xgjlDTOList;
                    	} else {
                    		data.data.content[i]['children'] = null;
                    	}
                    }
                    let xgdd = "";
                    if (data.data.content[i]["xungengdidianList"].length != 0 && data.data.content[i]["xungengdidianList"] != null) {
                    	for (let a = 0; a < data.data.content[i]["xungengdidianList"].length; a++) {
                    		xgdd = xgdd + data.data.content[i].xungengdidianList[a] + ", ";
                    	}
                    	xgdd = xgdd.substring(0, xgdd.length-2);
                    }
                    data.data.content[i]["xgdd"] = xgdd;
                    data.data.content[i]["xgmc"] = data.data.content[i]["xungengmingcheng"];
                }
                let xungengInfo = {};
                xungengInfo.zongcishu = data.data.additional.zongcishu;
                xungengInfo.zhunshi = data.data.additional.xungengcishu;
                xungengInfo.chidao = data.data.additional.zongcishu - data.data.additional.xungengcishu;
                if (data.data.additional.zongcishu == 0) {
                    xungengInfo.zhunshilv = 0;
                    xungengInfo.chidaolv = 0;
                } else {
                    xungengInfo.zhunshilv = Math.round(xungengInfo.zhunshi / xungengInfo.zongcishu * 10000) / 100.00;
                    xungengInfo.chidaolv = Math.round(xungengInfo.chidao / xungengInfo.zongcishu * 10000) / 100.00;
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    xungengList: data.data.content,
                    xungengInfo: xungengInfo,
                    pagination,
                });
            }
        });
    }
        
    thisMonthSearch() {
    	this.searchType = 1
        this.search();
    }
    
    lastMonthSearch() {
    	this.searchType = 2
        this.search();
    }
    
    thisYearSearch() {
    	this.searchType = 3
        this.search();
    }

    thisSelectSearch() {
        this.searchType = 0
        this.search();
    }
    
    search() {
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pager.pageSize,
            page: pager.current,
        });
    }
    
    output() {
    	let searchType = this.searchType;//1.本月2.上月3.今年
        let leixing = "巡更";
        let xungengmingcheng = this.state.info.xungengmingcheng;
        if (xungengmingcheng == null) {
            xungengmingcheng = '';
        }
        let startValue;
        let endValue;
        if (searchType == 1) {
        	//本月
  		    startValue = new Date();
  		    startValue.setDate(1);
	    	endValue = new Date();
	    	startValue = moment(startValue).format('YYYY-MM-DD 00:00:00');
	    	endValue = moment(endValue).format('YYYY-MM-DD HH:mm:ss');
    	} else if (searchType == 2) {
    		//上月
    		startValue = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1);
			let day = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
			endValue = new Date(new Date().getFullYear(), new Date().getMonth()-1, day);
			startValue = moment(startValue).format('YYYY-MM-DD 00:00:00');
	    	endValue = moment(endValue).format('YYYY-MM-DD 23:59:59');
    	} else if (searchType == 3) {
    		//今年
    		startValue = new Date();
    		startValue.setDate(1);
	    	startValue.setMonth(0);
	    	endValue = new Date();
	    	startValue = moment(startValue).format('YYYY-MM-DD 00:00:00');
	    	endValue = moment(endValue).format('YYYY-MM-DD HH:mm:ss');
    	} else {
    		startValue = this.state.startValue;
	        if (typeof(startValue) == "undefined"||startValue == null) {
                startValue = "";
	        } else {
                startValue = moment(startValue).format('YYYY-MM-DD HH:mm:ss');
            }
	        endValue = this.state.endValue;
	        if (typeof(endValue) == "undefined"||endValue == null) {
                endValue = "";
	        } else {
                endValue = moment(endValue).format('YYYY-MM-DD HH:mm:ss');
            }
    	}
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "xungengjiluliebiao?leixing="+leixing+"&xungengmingcheng="+xungengmingcheng+"&kaishishijian="+startValue+"&jieshushijian="+endValue+"&page=0&size=100000",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let key = 0;
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = key;
        			key = key + 1;
                    if (data.data.content[i]["xungengshijian"] != null) {
                        data.data.content[i]["xungengshijian"] = moment(data.data.content[i]['xungengshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    data.data.content[i]["num"] = 0;
                    if (data.data.content[i]["xgjlDTOList"] != null) {
                    	data.data.content[i]["num"] = data.data.content[i]["xgjlDTOList"].length;
                    	if (data.data.content[i]["xgjlDTOList"].length != 0) {
                    		for (let a = 0; a < data.data.content[i]["xgjlDTOList"].length; a++) {
				        		data.data.content[i].xgjlDTOList[a]["key"] = key;
				        		data.data.content[i].xgjlDTOList[a]["shijian"] = moment(data.data.content[i].xgjlDTOList[a]["shijian"]).format('YYYY-MM-DD HH:mm:ss');
				        		key = key + 1;
				        	}
				        	data.data.content[i]['children'] = data.data.content[i].xgjlDTOList;
                    	} else {
                    		data.data.content[i]['children'] = null;
                    	}
                    }
                    let xgdd = "";
                    if (data.data.content[i]["xungengdidianList"].length != 0 && data.data.content[i]["xungengdidianList"] != null) {
                    	for (let a = 0; a < data.data.content[i]["xungengdidianList"].length; a++) {
                    		xgdd = xgdd + data.data.content[i].xungengdidianList[a] + ", ";
                    	}
                    	xgdd = xgdd.substring(0, xgdd.length-2);
                    }
                    data.data.content[i]["xgdd"] = xgdd;
                    data.data.content[i]["xgmc"] = data.data.content[i]["xungengmingcheng"];
                }
                
                
                let list = [];
                for (let i = 0; i < data.data.content.length; i++) {
                	let obj = {};
                	if (data.data.content[i]['xgmc'] == null) {
                        obj['巡更计划名称'] = '';
                    } else {
                        obj['巡更计划名称'] = data.data.content[i]['xgmc'];
                    }
                    if (data.data.content[i]['xgdd'] == null) {
                        obj['巡更计划地点'] = '';
                    } else {
                        obj['巡更计划地点'] = data.data.content[i]['xgdd'];
                    }
                    if (data.data.content[i]['danqianriqi'] == null) {
                        obj['巡更计划时间'] = '';
                    } else {
                        obj['巡更计划时间'] = data.data.content[i]['danqianriqi'];
                    }
                    if (data.data.content[i]['num'] == null) {
                        obj['巡更执行次数'] = '';
                    } else {
                        obj['巡更执行次数'] = data.data.content[i]['num'];
                    }
                    obj['巡更人'] = '';
                	obj['巡更地点'] = '';
                	obj['巡更时间'] = '';
                	list.push(obj);
                    if (data.data.content[i]['children'] != null) {
                    	for (let a = 0; a < data.data.content[i].xgjlDTOList.length; a++) {
                    		let obja = {};
                    		obja['巡更计划名称'] = '';
		                	obja['巡更计划地点'] = '';
		                	obja['巡更计划时间'] = '';
		                	obja['巡更执行次数'] = '';
		                	if (data.data.content[i].xgjlDTOList[a]['xingming'] == null) {
		                        obja['巡更人'] = '';
		                    } else {
		                        obja['巡更人'] = data.data.content[i].xgjlDTOList[a]['xingming'];
		                    }
		                    if (data.data.content[i].xgjlDTOList[a]['xungendidian'] == null) {
		                        obja['巡更地点'] = '';
		                    } else {
		                        obja['巡更地点'] = data.data.content[i].xgjlDTOList[a]['xungendidian'];
		                    }
		                    if (data.data.content[i].xgjlDTOList[a]['shijian'] == null) {
		                        obja['巡更时间'] = '';
		                    } else {
		                        obja['巡更时间'] = data.data.content[i].xgjlDTOList[a]['shijian'];
		                    }
		                    list.push(obja);
                    	}
                    }
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前巡更统计没有数据！");
                    return;
                }
				let _headers = ['巡更计划名称','巡更计划地点','巡更计划时间','巡更执行次数','巡更人','巡更地点','巡更时间'];
                let headers = _headers
                    .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

                let xmldata = _data
                    .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
                    .reduce((prev, next) => prev.concat(next))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
                // 合并 headers 和 data
                let output = Object.assign({}, headers, xmldata);
                // 获取所有单元格的位置
                let outputPos = Object.keys(output);
                // 计算出范围
                let ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
                // 构建 workbook 对象
                let wb = {
                    SheetNames: ['mySheet'],
                    Sheets: {
                        'mySheet': Object.assign({}, output, { '!ref': ref })
                    }
                };
                // 导出 Excel
                XLSX.writeFile(wb, '巡更统计.xlsx');
            }
        });
    }
    
    componentDidMount() {
        this.fetch();
    }

    render() {
    	
        const columns = [
        	{title: '巡更计划名称', dataIndex: 'xgmc'},
        	{title: '巡更计划地点', dataIndex: 'xgdd'},
        	{title: '巡更计划时间', dataIndex: 'danqianriqi'},
        	{title: '巡更执行次数', dataIndex: 'num'},
        	{title: '巡更人', dataIndex: 'xingming'},
        	{title: '巡更地点', dataIndex: 'xungendidian'},
        	{title: '巡更时间', dataIndex: 'shijian'},
        ];

        const { startValue, endValue } = this.state;
        let info = this.state.info;
        let xungengInfo = this.state.xungengInfo;

        return (
            <div>
				巡更计划 :
				<Input style={{width:200,margin:5}} name="xungengmingcheng" value={info['xungengmingcheng']} onChange={this.handleInputChange.bind(this)}/>
				开始时间 :
				<DatePicker
                    showTime
	                disabledDate={this.disabledStartDate}
	                value={startValue}
                    placeholder="开始时间"
	                format="YYYY-MM-DD HH:mm:ss"
	                onChange={this.onStartChange}
	                style={{width:200,margin:5}}
	            />
				结束时间 :
				<DatePicker
                    showTime
	                disabledDate={this.disabledEndDate}
	                value={endValue}
                    placeholder="结束时间"
	                format="YYYY-MM-DD HH:mm:ss"
	                onChange={this.onEndChange}
	                style={{width:200,margin:5}}
	            />
                <Button type="primary" onClick={this.thisSelectSearch.bind(this)} style={{margin:5}}>
                    <Icon type="search" />查询
                </Button>
            	<br/>
                <Button type="primary" onClick={this.thisMonthSearch.bind(this)} style={{margin:5}}>
                    <Icon type="search" />本月查询
                </Button>
                <Button type="primary" onClick={this.lastMonthSearch.bind(this)} style={{margin:5}}>
                    <Icon type="search" />上月查询
                </Button>
                <Button type="primary" onClick={this.thisYearSearch.bind(this)} style={{margin:5}}>
                    <Icon type="search" />本年查询
                </Button>
                <Button type="primary" onClick={this.output.bind(this)} style={{margin:5}}>
                    <Icon type="export" />导出
                </Button>
                <p className="xungengp">
                按计划共有 {xungengInfo['zongcishu']} 次巡更，{xungengInfo['zhunshi']} 次已到，{xungengInfo['chidao']} 次未到
                </p>
                <p className="xungengp">
				已到率 {xungengInfo['zhunshilv']} %，未到率 {xungengInfo['chidaolv']} %
				</p>
                <Table
                    columns={columns}
                    dataSource={this.state.xungengList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default App;
