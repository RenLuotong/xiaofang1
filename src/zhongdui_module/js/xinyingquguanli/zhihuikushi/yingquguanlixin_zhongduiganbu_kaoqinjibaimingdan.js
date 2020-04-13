import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import XLSX from 'xlsx';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, Input, Select, Form,
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
            renyuanList:[],
            jigouList: [],
        };
    }

    getjigouList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquyingqusuoyouzuzhijigoudaima",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    list.push(data.data[i]);
                }
                THE.setState({
                    jigouList: list,
                });
            }
        });
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
        let form = this.props.form;
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        let jigoudaima = form.getFieldValue('jigoudaima');
        if (typeof(jigoudaima) == "undefined"|| jigoudaima == ''|| jigoudaima == null|| jigoudaima == -1) {
            jigoudaima = "";
        }
        let renyuanxingming = form.getFieldValue('renyuanxingming');
        if (typeof(renyuanxingming) == "undefined"|| renyuanxingming == ''|| renyuanxingming == null) {
            renyuanxingming = "";
        }
        $.ajax({
            type:'get',
            url: SERVER + "renyuankaoiqnjiluliebao?page="+page+"&size="+size+"&xingming="+renyuanxingming+"&jigoudaima="+jigoudaima,
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
                    renyuanList: data.data.content,
                    pagination,
                });
            }
        });
    }

    output() {
        const THE = this;
        let form = this.props.form;
        let _headers = ['组织机构', '人员姓名', '是否使用人脸', '是否录入指纹'];
        let jigoudaima = form.getFieldValue('jigoudaima');
        if (typeof(jigoudaima) == "undefined"|| jigoudaima == ''|| jigoudaima == null|| jigoudaima == -1) {
            jigoudaima = "";
        }
        let renyuanxingming = form.getFieldValue('renyuanxingming');
        if (typeof(renyuanxingming) == "undefined"|| renyuanxingming == ''|| renyuanxingming == null) {
            renyuanxingming = "";
        }
        $.ajax({
            type: 'GET',
            url: SERVER + "renyuankaoiqnjiluliebao?xingming="+renyuanxingming+"&jigoudaima="+jigoudaima+"&page=0&size=10000",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    let obj = {};
                    if (data.data.content[i]['jigoumingcheng'] == null) {
                        obj['组织机构'] = '';
                    } else {
                        obj['组织机构'] = data.data.content[i]['jigoumingcheng'];
                    }
                    if (data.data.content[i]['xingming'] == null) {
                        obj['人员姓名'] = '';
                    } else {
                        obj['人员姓名'] = data.data.content[i]['xingming'];
                    }
                    if (data.data.content[i]['shifoudhiyongrenlian'] == null) {
                        obj['是否使用人脸'] = '';
                    } else {
                        obj['是否使用人脸'] = data.data.content[i]['shifoudhiyongrenlian'];
                    }
                    if (data.data.content[i]['shifoushiyongzhiwen'] == null) {
                        obj['是否录入指纹'] = '';
                    } else {
                        obj['是否录入指纹'] = data.data.content[i]['shifoushiyongzhiwen'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("考勤机白名单没有数据！");
                    return;
                }
                let headers = _headers
                    .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65 + i) + 1}))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
                let xmldata = _data
                    .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
                    .reduce((prev, next) => prev.concat(next))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
                console.log(xmldata);
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
                XLSX.writeFile(wb, '考勤机白名单.xlsx');
            }
        });
    }

    componentDidMount() {
        this.fetch();
        this.getjigouList();
    }

    render() {

        let jigouListOptions = this.state.jigouList.map(item =>
            <Select.Option key={item['key']} value={item['jigoudaima']}>{item['jigoumingcheng']}</Select.Option>
        );


        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
          width: '20%'
        },  {
            title: '组织机构',
            dataIndex: 'jigoumingcheng',
          width: '20%'
        },{
            title: '人员姓名',
            dataIndex: 'xingming',
          width: '20%'
        },{
            title: '是否使用人脸',
            dataIndex: 'shifoudhiyongrenlian',
          width: '20%'
        },{
            title: '是否录入指纹',
            dataIndex: 'shifoushiyongzhiwen',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="机构名称">
                        {getFieldDecorator('jigoudaima',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {jigouListOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="人员姓名">
                        {getFieldDecorator('renyuanxingming',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search"/>查询
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.output.bind(this)}>
                            <Icon type="export"/>导出
                        </Button>
                    </FormItem>
                </Form>

                <Table
                    columns={columns}
                    dataSource={this.state.renyuanList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 435px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default AppComp;