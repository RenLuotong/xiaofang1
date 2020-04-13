import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Modal, TimePicker, Select, Statistic, Tooltip, Tag
} from 'antd';
import moment from "moment";
import XLSX from "xlsx";
import yingquguanlixin_zhongduiganbu_shoujituogangjiluxiugai from './yingquguanlixin_zhongduiganbu_shoujituogangjiluxiugai';
import yingquguanlixin_zhongduiganbu_shoujituogangjiluzhoucixiugai from './yingquguanlixin_zhongduiganbu_shoujituogangjiluzhoucixiugai';
const { TextArea } = Input;

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
        };
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_shoujituogangjiluxiugai/:id'} component = {yingquguanlixin_zhongduiganbu_shoujituogangjiluxiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_shoujituogangjiluzhoucixiugai'} component = {yingquguanlixin_zhongduiganbu_shoujituogangjiluzhoucixiugai} />
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
                pageSize : 10,
                current : 1
            },
            jiluList: [],
            startValue: null,
            endValue: null,
            shezhishijian:''
        };
    }

    getshezhishijian() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tb-liufans/huoqushijianshezhi",
            success: function (data) {
                let shezhishijian = '';
                let kaishi = '';
                let jieshu = '';
                let zhouci = '';
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    if(data.data[i].configName === '手机管控周次'){
                        zhouci = data.data[i].configValueList.join(',');
                    }
                    if(data.data[i].configName === '手机管控时间范围开始'){
                        kaishi = data.data[i].configValue;
                    }
                    if(data.data[i].configName === '手机管控时间范围截止'){
                        jieshu = data.data[i].configValue;
                    }
                    shezhishijian = '周次(' +zhouci+')';
                }
                THE.setState({
                    shezhishijian: shezhishijian,
                });
            }
        });
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
        let form = this.props.form;
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "shoujiguankong/huoquguankongshijian?page="+page+"&size="+size,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if(data.data.content[i]["chefangshijian"] !=='' && data.data.content[i]["chefangshijian"] !== null && data.data.content[i]["chefangshijian"] !== undefined){
                    data.data.content[i]["shijian"] = data.data.content[i]["chefangshijian"];
                    }else{
                    data.data.content[i]["shijian"] = data.data.content[i]["shefangshijian"];
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    jiluList: list,
                    pagination,
                });
            }
        });
    }

    toDelete(id) {
        const THE = this;
        $.ajax({
            type: 'POST',
            url: SERVER + "shoujiguankong/shanchuguankongshijian?id="+id,
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

    componentDidMount() {
        this.fetch();
        this.getshezhishijian();
    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col'
        },{
            title: '类型',
            dataIndex: 'type',
        },{
            title: '时间',
            dataIndex: 'shijian',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <Link to={this.props.match.url + '/yingquguanlixin_zhongduiganbu_shoujituogangjiluxiugai/' + record['id']}>修改</Link>
                    <Divider type="vertical"/>
                    <Popconfirm placement="topLeft" title="确认要删除该手机管控时间?"
                                onConfirm={this.toDelete.bind(this, record['id'])} okText="确认" cancelText="取消">
                        <a>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue} = this.state;

        return (
            <div>
                <Tag id="biaoti">{this.state.shezhishijian}</Tag>
                <br/>
                <Button>
                    <Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_shoujituogangjiluzhoucixiugai' }><span>周次修改</span></Link>
                </Button>
                <br/>
                <Table
                    columns={columns}
                    dataSource={this.state.jiluList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;