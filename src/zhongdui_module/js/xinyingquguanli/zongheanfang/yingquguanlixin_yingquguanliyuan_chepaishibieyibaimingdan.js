import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Select,
} from 'antd';
import moment from "moment";
import XLSX from 'xlsx';
import yingquguanlixin_zhongduiganbu_cheliangbaimingdanxinzeng from './yingquguanlixin_zhongduiganbu_cheliangbaimingdanxinzeng';

// class Appmain extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }
//
//     render(){
//         return(
//             <div>
//                 <Switch>
//                     <Route exact path = {this.props.match.path} component = {AppComp} />
//                     <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_cheliangbaimingdanxinzeng/'} component = {yingquguanlixin_zhongduiganbu_cheliangbaimingdanxinzeng} />
//                 </Switch>
//             </div>
//         );
//     }
// }

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            startValue: null,
            endValue: null,
            mingdanList: [],
            cheliangleibieiList: [],
        };
    }
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let form=this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let cheliangguanliren=form.getFieldValue('cheliangguanliren');
        if (typeof (cheliangguanliren)=="undefined"){
            cheliangguanliren="";
        }
        let cheliangleibie = form.getFieldValue('cheliangleibie');
        if (typeof(cheliangleibie) == "undefined"||cheliangleibie == "-1") {
            cheliangleibie = '';
        }
        let page = params.page - 1;
        let size = params.rows;
        $.ajax({
            type:'get',
            url: SERVER + "chepaibaimingdanlie?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijan="+jieshushijian+"&cheliangguanlirenxingming="+cheliangguanliren+"&cheliangleixing="+cheliangleibie,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["gengxinshijian"] = moment(data.data.content[i]["gengxinshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    mingdanList: list,
                    pagination,
                });
            }
        });
    }
    //导出
    output() {
        let _headers = ['机构名称','营区名称','车牌号码','车辆品牌','车辆类别','时间','车辆管理人'];
        let form = this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let cheliangguanliren=form.getFieldValue('cheliangguanliren');
        if (typeof (cheliangguanliren)=="undefined"){
            cheliangguanliren="";
        }
        let cheliangleibie = form.getFieldValue('cheliangleibie');
        if (typeof(cheliangleibie) == "undefined"||cheliangleibie == "-1") {
            cheliangleibie = '';
        }
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "chepaibaimingdanlie?page=0&size=10000&kaishishijian="+kaishishijian+"&jieshushijan="+jieshushijian+"&cheliangguanlirenxingming="+cheliangguanliren+"&cheliangleixing="+cheliangleibie,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["gengxinshijian"] = moment(data.data.content[i]["gengxinshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    let obj={};
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
                    if (data.data.content[i]['chepaihaoma'] == null) {
                        obj['车牌号码'] = '';
                    } else {
                        obj['车牌号码'] = data.data.content[i]['chepaihaoma'];
                    }
                    if (data.data.content[i]['cheliangpinpai'] == null) {
                        obj['车辆品牌'] = '';
                    } else {
                        obj['车辆品牌'] = data.data.content[i]['cheliangpinpai'];
                    }
                    if (data.data.content[i]['cheliangleixing'] == null) {
                        obj['车辆类别'] = '';
                    } else {
                        obj['车辆类别'] = data.data.content[i]['cheliangleixing'];
                    }
                    if (data.data.content[i]['gengxinshijian'] == null) {
                        obj['时间'] = '';
                    } else {
                        obj['时间'] = data.data.content[i]['gengxinshijian'];
                    }
                    if (data.data.content[i]['cheliangguanlirenxingming'] == null) {
                        obj['车辆管理人'] = '';
                    } else {
                        obj['车辆管理人'] = data.data.content[i]['cheliangguanlirenxingming'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前车辆白名单没有数据！");
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
                XLSX.writeFile(wb, '车辆白名单.xlsx');
            }
        });
    }

    getcheliangleibieiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "cheliangleixingMeiju",
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
                    cheliangleibieiList: list,
                });
            }
        });
    }
    componentDidMount() {
        this.fetch();
        this.getcheliangleibieiList();
    }

    render() {
        let cheliangleibieOptions = this.state.cheliangleibieiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
          width: '20%'
        }, {
            title: '车牌号码',
            dataIndex: 'chepaihaoma',
          width: '20%'
        },{
            title: '车辆品牌',
            dataIndex: 'cheliangpinpai',
          width: '20%'
        },{
            title: '车辆类别',
            dataIndex: 'cheliangleixing',
          width: '20%'
        },{
            title: '时间',
            dataIndex: 'gengxinshijian',
        },{
            title: '车辆管理人',
            dataIndex: 'cheliangguanlirenxingming',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue} = this.state;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="开始时间&#12288;">
                        {getFieldDecorator('kaishishijian')(
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                value={startValue}
                                placeholder="开始时间"
                                format="YYYY-MM-DD"
                                onChange={this.onStartChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="结束时间">
                        {getFieldDecorator('jieshushijian')(
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                value={endValue}
                                placeholder="结束时间"
                                format="YYYY-MM-DD"
                                onChange={this.onEndChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="车辆管理人">
                        {getFieldDecorator('cheliangguanliren',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="车辆类别">
                        {getFieldDecorator('cheliangleibie')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {cheliangleibieOptions}
                            </Select>
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
                    <br/>
                    <FormItem>
                      {/*  <Button>
                            <Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_cheliangbaimingdanxinzeng'}>
                                <Icon type="plus" /><span>增加车辆白名单</span>
                            </Link>
                        </Button>*/}
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.mingdanList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 485px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default AppComp;