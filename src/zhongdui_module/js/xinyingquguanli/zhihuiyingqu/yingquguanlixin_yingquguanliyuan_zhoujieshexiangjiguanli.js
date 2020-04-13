import React, {Component} from 'react';
import {Link,Route, Switch} from 'react-router-dom';
import 'moment/locale/zh-cn';
import yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlixiugai from './yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlixiugai';
import yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlitianjia from './yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlitianjia';
import XLSX from 'xlsx';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message,
} from 'antd';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
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
        let size = params.rows === undefined ? 10 : params.rows;
        let sblx = "ZHOUJIESHEXIANGJI";
        $.ajax({
            type:'get',
            url: SERVER + "shebeiquanbuxinxi?shebeileixing="+sblx+"&page="+page+"&size="+size,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    shebeiList: data.data.content,
                    pagination,
                });
            }
        });
    }

    toDelete(id) {
        const THE = this;
        $.ajax({
            type: 'POST',
            url: SERVER + "deleteshebei?id="+id,
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

    output() {
        let sblx = "ZHOUJIESHEXIANGJI";
        let _headers = ['机构名称','营区名称','设备序列号', 'IP地址', '端口号', '设备地点', '设备用途', '生产厂家', '设备账号', '设备密码'];
        $.ajax({
            type: 'GET',
            url: SERVER + "shebeiquanbuxinxi?shebeileixing="+sblx+"&page=0&size=10000",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    let obj = {};
                    if (data.data.content[i]['jigoumingcheng'] == null) {
                        obj['机构名称'] = '';
                    } else {
                        obj['机构名称'] = data.data.content[i]['jigoumingcheng'];
                    }
                    if (data.data.content[i]['yingqumingcheng'] == null) {
                        obj['营区名称'] = '';
                    } else {
                        obj['营区名称'] = data.data.content[i]['yingqumingcheng'];
                    }
                    if (data.data.content[i]['shebeixuliehao'] == null) {
                        obj['设备序列号'] = '';
                    } else {
                        obj['设备序列号'] = data.data.content[i]['shebeixuliehao'];
                    }
                    if (data.data.content[i]['juyuwangip'] == null) {
                        obj['IP地址'] = '';
                    } else {
                        obj['IP地址'] = data.data.content[i]['juyuwangip'];
                    }
                    if (data.data.content[i]['juyuwangduankou'] == null) {
                        obj['端口号'] = '';
                    } else {
                        obj['端口号'] = data.data.content[i]['juyuwangduankou'];
                    }
                    if (data.data.content[i]['weizhi'] == null) {
                        obj['设备地点'] = '';
                    } else {
                        obj['设备地点'] = data.data.content[i]['weizhi'];
                    }
                    if (data.data.content[i]['yongtu'] == null) {
                        obj['设备用途'] = '';
                    } else {
                        obj['设备用途'] = data.data.content[i]['yongtu'];
                    }
                    if (data.data.content[i]['shengchanchangjia'] == null) {
                        obj['生产厂家'] = '';
                    } else {
                        obj['生产厂家'] = data.data.content[i]['shengchanchangjia'];
                    }
                    if (data.data.content[i]['zhanghao'] == null) {
                        obj['设备账号'] = '';
                    } else {
                        obj['设备账号'] = data.data.content[i]['zhanghao'];
                    }
                    if (data.data.content[i]['mima'] == null) {
                        obj['设备密码'] = '';
                    } else {
                        obj['设备密码'] = data.data.content[i]['mima'];
                    }

                    list.push(obj);
                }
                let _data = list;

                if (_data == null || _data.length == 0) {
                    message.warning("周界摄像机管理列表没有数据！");
                    return;
                }
                let headers = _headers
                    .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65 + i) + 1}))
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
                        'mySheet': Object.assign({}, output, {'!ref': ref})
                    }
                };
                // 导出 Excel
                XLSX.writeFile(wb, '周界摄像机管理.xlsx');
            }
        });

    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
          width: '10%'
        }, {
            title: '设备序列号',
            dataIndex: 'shebeixuliehao',
          width: '10%'
        }, {
            title: 'IP地址',
            dataIndex: 'juyuwangip',
          width: '10%'
        }, {
            title: '端口号',
            dataIndex: 'juyuwangduankou',
          width: '10%'
        }, {
            title: '设备地点',
            dataIndex: 'weizhi',
          width: '10%'
        }, {
            title: '设备用途',
            dataIndex: 'yongtu',
          width: '10%'
        }, {
            title: '生产厂家',
            dataIndex: 'shengchanchangjia',
          width: '10%'
        }, {
            title: '设备账号',
            dataIndex: 'zhanghao',
          width: '10%'
        }, {
            title: '设备密码',
            dataIndex: 'mima',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <Popconfirm placement="topLeft" title="确认要删除该周界摄像机?"
                                onConfirm={this.toDelete.bind(this, record['id'])} okText="确认" cancelText="取消">
                        <a>删除</a>
                    </Popconfirm>
                    <Divider type="vertical"/>
                    <Link to={'yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlixiugai/' + record['id']}>修改</Link>
                </span>
            ),
        },];

        return (
            <div>
                <Button style={{margin: 5}}>
                    <Link to={'yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlitianjia'}><Icon type="plus"/><span>添加周界摄像机</span></Link>
                </Button>
                <Button type="primary" onClick={this.output.bind(this)} style={{margin: 5}}>
                    <Icon type="export"/>导出
                </Button>
                <Table
                    columns={columns}
                    dataSource={this.state.shebeiList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 425px)", x: true }}
                />
            </div>

        );


    }
}

export default App;