import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import XLSX from 'xlsx';
import {
    message,
    Popconfirm,
    Icon,
    Button,
    Table,
} from 'antd';

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
                    <Route exact path = {this.props.match.path} component = {App} />
                </Switch>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            xugengList: [],
        };
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
        const THE = this;
        let page = params.page - 1;
        let size = params.rows;
        let leixing = "巡更";
        let list = [];
        $.ajax({
            type:'get',
            url: SERVER + "xungengjihualiebiao?leixing="+leixing+"&page="+page+"&size="+size+"&sort=id,desc",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["rqfw"] = data.data.content[i]["kaishiriqi"] + " ~ " + data.data.content[i]["jieshuriqi"];
                    let xqfwList = data.data.content[i]["xingqifanwei"].split(",");
                    let xqfw = "";
                    for (let i = 0; i < xqfwList.length; i++) {
                    	if (xqfwList[i] == 1||xqfwList[i] == "1") {
                    		xqfw = xqfw + "星期一, ";
                    	}
                    	if (xqfwList[i] == 2||xqfwList[i] == "2") {
                    		xqfw = xqfw + "星期二, ";
                    	}
                    	if (xqfwList[i] == 3||xqfwList[i] == "3") {
                    		xqfw = xqfw + "星期三, ";
                    	}
                    	if (xqfwList[i] == 4||xqfwList[i] == "4") {
                    		xqfw = xqfw + "星期四, ";
                    	}
                    	if (xqfwList[i] == 5||xqfwList[i] == "5") {
                    		xqfw = xqfw + "星期五, ";
                    	}
                    	if (xqfwList[i] == 6||xqfwList[i] == "6") {
                    		xqfw = xqfw + "星期六, ";
                    	}
                    	if (xqfwList[i] == 7||xqfwList[i] == "7") {
                    		xqfw = xqfw + "星期日, ";
                    	}
                    }
                    xqfw = xqfw.substring(0,xqfw.length-2);
                    data.data.content[i]["xqfw"] = xqfw;
                    data.data.content[i]["sjfw"] = data.data.content[i]["shijianfanweikaishi"] + " ~ " + data.data.content[i]["shijianfanweijieshu"];
                    let xgdd = "";
                    if (data.data.content[i]["xungengdidianList"].length != 0 && data.data.content[i]["xungengdidianList"] != null) {
                    	for (let a = 0; a < data.data.content[i]["xungengdidianList"].length; a++) {
                    		xgdd = xgdd + data.data.content[i].xungengdidianList[a].xungendidian + ", ";
                    	}
                    	xgdd = xgdd.substring(0, xgdd.length-2);
                    }
                    data.data.content[i]["xgdd"] = xgdd;
                    if (data.data.content[i]["zhuangtai"] == "正常") {
                        list.push(data.data.content[i]);
                    }
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    xungengList: list,
                    pagination,
                });
            }
        });
    }

    output()  {
        let leixing = "巡更";
        let _headers = ['巡更名称', '巡更日期范围', '巡更星期范围', '巡更时间范围', '巡更地点']
        $.ajax({
            type:'get',
            url: SERVER + "xungengjihualiebiao?leixing="+leixing+"&page=0&size=10000&sort=id,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    let obj={};
                    if (data.data.content[i]['xungengmingcheng'] == null) {
                        obj['巡更名称'] = '';
                    } else {
                        obj['巡更名称'] = data.data.content[i]['xungengmingcheng'];
                    }
                    if (data.data.content[i]['kaishiriqi'] == null && data.data.content[i]['jieshuriqi'] == null) {
                        obj['巡更日期范围'] = '';
                    } else {
                        obj['巡更日期范围'] = data.data.content[i]["kaishiriqi"] + " ~ " + data.data.content[i]["jieshuriqi"];
                    }
                    if (data.data.content[i]['xingqifanwei'] == null) {
                        obj['巡更星期范围'] = '';
                    } else {
                    	let xqfwList = data.data.content[i]["xingqifanwei"].split(",");
	                    let xqfw = "";
	                    for (let i = 0; i < xqfwList.length; i++) {
	                    	if (xqfwList[i] == 1||xqfwList[i] == "1") {
	                    		xqfw = xqfw + "星期一, ";
	                    	}
	                    	if (xqfwList[i] == 2||xqfwList[i] == "2") {
	                    		xqfw = xqfw + "星期二, ";
	                    	}
	                    	if (xqfwList[i] == 3||xqfwList[i] == "3") {
	                    		xqfw = xqfw + "星期三, ";
	                    	}
	                    	if (xqfwList[i] == 4||xqfwList[i] == "4") {
	                    		xqfw = xqfw + "星期四, ";
	                    	}
	                    	if (xqfwList[i] == 5||xqfwList[i] == "5") {
	                    		xqfw = xqfw + "星期五, ";
	                    	}
	                    	if (xqfwList[i] == 6||xqfwList[i] == "6") {
	                    		xqfw = xqfw + "星期六, ";
	                    	}
	                    	if (xqfwList[i] == 7||xqfwList[i] == "7") {
	                    		xqfw = xqfw + "星期日, ";
	                    	}
	                    }
	                    xqfw = xqfw.substring(0,xqfw.length-2);
                        obj['巡更星期范围'] = xqfw;
                    }
                    if (data.data.content[i]['shijianfanweikaishi'] == null && data.data.content[i]['shijianfanweijieshu'] == null) {
                        obj['巡更时间范围'] = '';
                    } else {
                        obj['巡更时间范围'] = data.data.content[i]["shijianfanweikaishi"] + " ~ " + data.data.content[i]["shijianfanweijieshu"];
                    }
                    if (data.data.content[i]['xungengdidianList'] == null) {
                        obj['巡更地点'] = '';
                    } else {
                    	let xgdd = "";
                    	for (let a = 0; a < data.data.content[i]["xungengdidianList"].length; a++) {
                    		xgdd = xgdd + data.data.content[i].xungengdidianList[a].xungendidian + ", ";
                    	}
                    	xgdd = xgdd.substring(0, xgdd.length-2);
                        obj['巡更地点'] = xgdd;
                    }
                    if (data.data.content[i]["zhuangtai"] == "正常") {
                        list.push(obj);
                    }
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前巡更设置列表没有数据！");
                    return;
                }
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
                XLSX.writeFile(wb, '巡更设置.xlsx');
            }
        });

    }

    componentDidMount() {
        this.fetch();
    }

    toDelete(id) {
        const THE = this;
        $.ajax({
            type: 'POST',
            url: SERVER + "shanchuxungengjihua?id="+id,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success('删除成功');
                THE.fetch();
            }
        });
    }
w
    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '巡更名称',
            dataIndex: 'xungengmingcheng',
        }, {
            title: '巡更日期范围',
            dataIndex: 'rqfw',
        }, {
            title: '巡更星期范围',
            dataIndex: 'xqfw',
        }, {
            title: '巡更时间范围',
            dataIndex: 'sjfw',
        }, {
            title: '巡更地点',
            dataIndex: 'xgdd',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm placement="topLeft" title="确认要删除该巡更计划?"
                                onConfirm={this.toDelete.bind(this, record['id'])} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
            ),
        }];

        return (
            <div>
                <Button style={{margin:5}}>
                    <Link to="/yingquguanlixin_zhongduiganbu_xungengtianjia"><Icon type="plus" /><span>巡更计划</span></Link>
                </Button>
                <Button type="primary" htmlType="submit" onClick={this.output.bind(this)}>
                    <Icon type="export" />导出
                </Button>
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

export default Appmain;
