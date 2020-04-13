import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import yingquguanlixin_zhongduiganbu_kaoqinjiguanlitianjia from './yingquguanlixin_zhongduiganbu_kaoqinjiguanlitianjia';
import yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiugai from './yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiugai';
import yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiangqing from './yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiangqing';
import XLSX from 'xlsx';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Input, Form, Select, Tabs,
} from 'antd';
import BMD from "./yingquguanlixin_zhongduiganbu_kaoqinjibaimingdan";
import RLSBY from "../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibieyichakan";
import yingquguanlixin_yingquguanliyuan_renlianshibieyichakanxiugai from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibieyichakanxiugai';
import yingquguanlixin_yingquguanliyuan_renlianshibieyichakanxiangqing from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibieyichakanxiangqing';
import yingquguanlixin_yingquguanliyuan_renlianshibieyichakantianjia from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibieyichakantianjia';
import RLSBYBMD from "../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibiebaimingdan";
import yingquguanlixin_yingquguanliyuan_baimingdanshanchu from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_baimingdanshanchu';
import yingquguanlixin_yingquguanliyuan_baimingdantianjia from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_baimingdantianjia';
import yingquguanlixin_yingquguanliyuan_xitongwaibaimingdantianjia from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_xitongwaibaimingdantianjia'
import CPSBY from "../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_chepaishibieyichakan";
import yingquguanlixin_yingquguanliyuan_chepaishibieyixiugai from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_chepaishibieyixiugai';
import yingquguanlixin_yingquguanliyuan_chepaishibieyixiangqing from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_chepaishibieyixiangqing';
import yingquguanlixin_yingquguanliyuan_chepaishibieyitianjia from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_chepaishibieyitianjia';
import CPSBYBMD from "../zongheanfang/yingquguanlixin_yingquguanliyuan_chepaishibieyibaimingdan";
import ZNC from "../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhinengchengguanli";
import yingquguanlixin_yingquguanliyuan_zhinengchengguanlixiugai from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhinengchengguanlixiugai';
import yingquguanlixin_yingquguanliyuan_zhinengchengguanlitianjia from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhinengchengguanlitianjia';
import TGSXJ from "../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanli";
import yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanlixiugai from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanlixiugai';
import yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanlitianjia from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanlitianjia';
import ZJSXJ from "../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanli";
import yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlixiugai from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlixiugai';
import yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlitianjia from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlitianjia';
import YPLXJ from "../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanli";
import yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanlixiugai from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanlixiugai';
import yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanlitianjia from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanlitianjia';
import SCSXJ from "../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_shicairukushexiangjiguanli";
import yingquguanlixin_yingquguanliyuan_shicairukushexiangjixiugai from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_shicairukushexiangjixiugai';
import yingquguanlixin_yingquguanliyuan_shicairukushexiangjiitianjia from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_shicairukushexiangjiitianjia';
import BGG from "../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_baoguanguiguanli";
import yingquguanlixin_yingquguanliyuan_baoguanguiguanlixinzeng from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_baoguanguiguanlixinzeng';
import yingquguanlixin_yingquguanliyuan_baoguanguiguanlixiugai from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_baoguanguiguanlixiugai';
import RLSBQJ from "../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibieqiujiguanli";
import yingquguanlixin_yingquguanliyuan_renlianshibieqiujitianjia from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibieqiujitianjia';
import yingquguanlixin_yingquguanliyuan_renlianshibieqiujixiugai from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibieqiujixiugai';
import ZNRLYPLXJ from "../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhinengrenlianyingpanluxiangjiguanli";
import yingquguanlixin_yingquguanliyuan_zhinengrenlianyingpanluxiangjitianjia from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhinengrenlianyingpanluxiangjitianjia';
import yingquguanlixin_yingquguanliyuan_zhinengrenlianyingpanluxiangjixiugai from '../zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhinengrenlianyingpanluxiangjixiugai';

const View = [];
class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_kaoqinjiguanlitianjia'} component = {yingquguanlixin_zhongduiganbu_kaoqinjiguanlitianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiugai/:id'} component = {yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiangqing/:shebeibianhao/:id'} component = {yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_renlianshibieyichakanxiugai/:id'} component = {yingquguanlixin_yingquguanliyuan_renlianshibieyichakanxiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_renlianshibieyichakanxiangqing/:id'} component = {yingquguanlixin_yingquguanliyuan_renlianshibieyichakanxiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_renlianshibieyichakantianjia'} component = {yingquguanlixin_yingquguanliyuan_renlianshibieyichakantianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_baimingdanshanchu/:renyuanbianhao'} component = {yingquguanlixin_yingquguanliyuan_baimingdanshanchu} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_baimingdantianjia'} component = {yingquguanlixin_yingquguanliyuan_baimingdantianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_xitongwaibaimingdantianjia'} component = {yingquguanlixin_yingquguanliyuan_xitongwaibaimingdantianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_chepaishibieyixiugai/:id'} component = {yingquguanlixin_yingquguanliyuan_chepaishibieyixiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_chepaishibieyixiangqing/:id'} component = {yingquguanlixin_yingquguanliyuan_chepaishibieyixiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_chepaishibieyitianjia'} component = {yingquguanlixin_yingquguanliyuan_chepaishibieyitianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_zhinengchengguanlixiugai/:id'} component = {yingquguanlixin_yingquguanliyuan_zhinengchengguanlixiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_zhinengchengguanlitianjia'} component = {yingquguanlixin_yingquguanliyuan_zhinengchengguanlitianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanlixiugai/:id'} component = {yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanlixiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanlitianjia'} component = {yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanlitianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlixiugai/:id'} component = {yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlixiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlitianjia'} component = {yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlitianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanlixiugai/:id'} component = {yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanlixiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanlitianjia'} component = {yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanlitianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_shicairukushexiangjixiugai/:id'} component = {yingquguanlixin_yingquguanliyuan_shicairukushexiangjixiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_shicairukushexiangjiitianjia'} component = {yingquguanlixin_yingquguanliyuan_shicairukushexiangjiitianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_baoguanguiguanlixinzeng/'} component = {yingquguanlixin_yingquguanliyuan_baoguanguiguanlixinzeng} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_baoguanguiguanlixiugai/:id'} component = {yingquguanlixin_yingquguanliyuan_baoguanguiguanlixiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_renlianshibieqiujitianjia/'} component = {yingquguanlixin_yingquguanliyuan_renlianshibieqiujitianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_renlianshibieqiujixiugai/:id'} component = {yingquguanlixin_yingquguanliyuan_renlianshibieqiujixiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_zhinengrenlianyingpanluxiangjitianjia/'} component = {yingquguanlixin_yingquguanliyuan_zhinengrenlianyingpanluxiangjitianjia} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yingquguanliyuan_zhinengrenlianyingpanluxiangjixiugai/:id'} component = {yingquguanlixin_yingquguanliyuan_zhinengrenlianyingpanluxiangjixiugai} />
                </Switch>
            </div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            shebeiList:[],
            kaoqinjiyongtuList: [],
            activeKey:"1",
        };
    }

    //控制tab页方法
    callback(key) {
        const THE = this;
        THE.setState({
            activeKey: key,
        });
    }

    getkaoqinjiyongtuList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquKaoqinjiyongtuEnumMeiju",
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
                    kaoqinjiyongtuList: list,
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
        let shebeiyongtu = form.getFieldValue('shebeiyongtu');
        if (typeof(shebeiyongtu) == "undefined"|| shebeiyongtu == '-1') {
            shebeiyongtu = "";
        }
        let liantongzhuangtai = form.getFieldValue('liantongzhuangtai');
        if (typeof(liantongzhuangtai) == "undefined"|| liantongzhuangtai == '-1') {
            liantongzhuangtai = "";
        }
        $.ajax({
            type:'post',
            url: SERVER + "kaoqinjiLiebiao?page="+page+"&size="+size+"&kaoqinjiyongtu="+shebeiyongtu+"&liantongzhuangtai="+liantongzhuangtai,
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
            url: SERVER + "shanchuKaoqinji?id="+id,
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
        let _headers = ['机构名称','设备序列号', '设备地点', '设备用途', '设备状态', '连通状态']
        let form = this.props.form;
        let shebeiyongtu = form.getFieldValue('shebeiyongtu');
        if (typeof(shebeiyongtu) == "undefined"|| shebeiyongtu == '-1') {
            shebeiyongtu = "";
        }
        let liantongzhuangtai = form.getFieldValue('liantongzhuangtai');
        if (typeof(liantongzhuangtai) == "undefined"|| liantongzhuangtai == '-1') {
            liantongzhuangtai = "";
        }
        $.ajax({
            type: 'post',
            url: SERVER + "kaoqinjiLiebiao?page=0&size=10000&kaoqinjiyongtu="+shebeiyongtu+"&liantongzhuangtai="+liantongzhuangtai,
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
                    if (data.data.content[i]['shebeixuliehao'] == null) {
                        obj['设备序列号'] = '';
                    } else {
                        obj['设备序列号'] = data.data.content[i]['shebeixuliehao'];
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
                    if (data.data.content[i]['shebeizhuangtai'] == null) {
                        obj['设备状态'] = '';
                    } else {
                        obj['设备状态'] = data.data.content[i]['shebeizhuangtai'];
                    }
                    if (data.data.content[i]['liantongzhuangtai'] == null || data.data.content[i]['liantongzhuangtai'] == "") {
                        obj['连通状态'] = '未连通';
                    } else {
                        obj['连通状态'] = data.data.content[i]['liantongzhuangtai'];
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("指纹识别设备管理列表没有数据！");
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
                XLSX.writeFile(wb, '指纹识别设备管理.xlsx');
            }
        });
    }

    componentWillUnmount() {
        View.pagination = this.state.pagination;
        View.activeKey = this.state.activeKey;
    }

    componentWillMount() {
        if(!View.activeKey){
            View.activeKey = '1';
        }
        const {pagination,activeKey} = View;
        this.setState({
            activeKey: activeKey,
        });
        if (typeof (pagination) !== "undefined") {
            this.setState({
                pagination: pagination,
            });
        }
    }

    componentDidMount() {
        this.fetch();
        this.getkaoqinjiyongtuList();
    }

    render() {
        let kaoqinjiyongtuListOptions = this.state.kaoqinjiyongtuList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );


        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
          width: '15%'
        }, {
            title: '设备序列号',
            dataIndex: 'shebeixuliehao',
          width: '15%'
        }, {
            title: '设备地点',
            dataIndex: 'weizhi',
          width: '15%'
        }, {
            title: '设备用途',
            dataIndex: 'yongtu',
          width: '15%'
        }, {
            title: '设备状态',
            dataIndex: 'shebeizhuangtai',
          width: '15%'
        }, {
            title: '连通状态',
            dataIndex: 'liantongzhuangtai',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <Link to={this.props.match.url + '/yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiangqing/' + record['shebeibianhao']+'/'+record['id']}>详情</Link>
                    <Divider type="vertical"/>
                    <Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiugai/'+record['id'] }>修改</Link>
                    <Divider type="vertical"/>
			      	<Popconfirm
			      		placement="topLeft"
			      		title="确认要删除该指纹识别设备?"
                        onConfirm={this.toDelete.bind(this, record['id'])}
                        okText="确认"
                        cancelText="取消"
                    >
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
            ),
        },];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                <Tabs.TabPane tab="指纹识别设备管理" key="1">
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="设备用途">
                        {getFieldDecorator('shebeiyongtu',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {kaoqinjiyongtuListOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="连通状态">
                        {getFieldDecorator('liantongzhuangtai',)(
                            <Select style={{width:200}}>
                            <Select.Option value="-1">全部</Select.Option>
                            <Select.Option value="连通">连通</Select.Option>
                            <Select.Option value="未连通">未连通</Select.Option>
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
                </Form>
                <Button style={{margin: 5}}>
                    <Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_kaoqinjiguanlitianjia'}>
                        <Icon type="plus"/><span>添加指纹识别设备</span>
                    </Link>
                </Button>
                <Table
                    columns={columns}
                    dataSource={this.state.shebeiList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 465px)", x: true }}
                />
                </Tabs.TabPane>
                <Tabs.TabPane tab="指纹识别设备白名单" key="2">
                   <BMD />
                </Tabs.TabPane>
                <Tabs.TabPane tab="人脸识别仪管理" key="3">
                    <RLSBY />
                </Tabs.TabPane>
                <Tabs.TabPane tab="人脸白名单" key="4">
                    <RLSBYBMD />
                 </Tabs.TabPane>
                 <Tabs.TabPane tab="人脸识别球机" key="13">
                     <RLSBQJ />
                 </Tabs.TabPane>
                 <Tabs.TabPane tab="智能人脸硬盘录像机" key="14">
                     <ZNRLYPLXJ />
                 </Tabs.TabPane>
                 <Tabs.TabPane tab="车牌识别仪管理" key="5">
                     <CPSBY />
                 </Tabs.TabPane>
                 <Tabs.TabPane tab="车牌识别仪白名单" key="6">
                     <CPSBYBMD />
                 </Tabs.TabPane>
                    <Tabs.TabPane tab="智能秤管理" key="7">
                        <ZNC />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="脱岗摄像机管理" key="8">
                        <TGSXJ />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="周界摄像机管理" key="9">
                        <ZJSXJ />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="硬盘录像机管理" key="10">
                        <YPLXJ />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="食材入库摄像机管理" key="11">
                        <SCSXJ />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="保管柜管理" key="12">
                        <BGG />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;