import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import moment from 'moment';
import {
    message,
    DatePicker,
    Icon,
    Input,
    Form,
    Button,
    Table,
    Divider,
    Select,
    Popconfirm,
    Modal,
    Popover
} from 'antd';
import yingquguanlixin_yiwurenyuan_yaopinrukuguanlixinzeng from './yingquguanlixin_yiwurenyuan_yaopinrukuguanlixinzeng';


const { TextArea } = Input;

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
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_yiwurenyuan_yaopinrukuguanlixinzeng/'} component = {yingquguanlixin_yiwurenyuan_yaopinrukuguanlixinzeng} />
                </Switch>
            </div>
        );
    }
}

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            yaopinList: [],
            startValue: null,
            endValue: null,
            shenpizhuangtaiList: [],
        };
    }

    getshenpizhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tb-yaopin-rukujilus/huoquyaopinrukuzhuangtai",
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
                    shenpizhuangtaiList: list,
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let yaopinmingcheng = form.getFieldValue('yaopinmingcheng');
        if (typeof(yaopinmingcheng) == "undefined") {
            yaopinmingcheng = "";
        }
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
        let shenpizhuangtai = form.getFieldValue('shenpizhuangtai');
        if (typeof(shenpizhuangtai) == "undefined" || shenpizhuangtai == '-1') {
            shenpizhuangtai = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb-yaopin-rukujilus?page="+page+"&size="+size+"&yaopinmingcheng="+yaopinmingcheng+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&rukuZhuangtai="+shenpizhuangtai+"&sort=rukushijian,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if(data.data.content[i]["shengchanriqi"] !== null && data.data.content[i]["shengchanriqi"] !== ''){
                        data.data.content[i]["shengchanriqi"] = moment(data.data.content[i]["shengchanriqi"]).format('YYYY-MM-DD');
                    }
                    data.data.content[i]["rukushijian"] = moment(data.data.content[i]["rukushijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.content[i]["rukuzhuangtai"] == 'Shenqingzhong'){
                        data.data.content[i]["rukuzhuangtai"] = '已申请'
                    }else if(data.data.content[i]["rukuzhuangtai"] == 'Tongguo'){
                        data.data.content[i]["rukuzhuangtai"] = '已同意'
                    }else if(data.data.content[i]["rukuzhuangtai"] == 'Jujue'){
                        data.data.content[i]["rukuzhuangtai"] = '已拒绝'
                    }else if(data.data.content[i]["rukuzhuangtai"] == 'Shanchu'){
                        data.data.content[i]["rukuzhuangtai"] = '删除'
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    yaopinList: list,
                    pagination,
                });
            }
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

    componentDidMount() {
        this.fetch();
        // this.getshenpizhuangtaiList();
    }

    render() {

        let shenpizhuangtaiOptions = this.state.shenpizhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '药品名称',
            dataIndex: 'yaopinmingcheng',
        },{
            title: '入库数量',
            dataIndex: 'shuliang',
        }
        // ,{
        //     title: '剩余数量',
        //     dataIndex: 'shengyushuliang',
        // }
        ,{
            title: '入库时间',
            dataIndex: 'rukushijian',
        },{
            title: '生产日期',
            dataIndex: 'shengchanriqi',
        },{
            title: '保质期',
            dataIndex: 'baozhiqi',
        },{
            title: '过期阈值',
            dataIndex: 'guoqiyuzhi',
        }
        // ,{
        //     title: '审批状态',
        //     dataIndex: 'rukuzhuangtai',
        // }
        ];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue} = this.state;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="开始时间">
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
                    {/*<br/>*/}
                    <FormItem label="药品名称">
                        {getFieldDecorator('yaopinmingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    {/*<FormItem label="审批状态">*/}
                    {/*    {getFieldDecorator('shenpizhuangtai',)(*/}
                    {/*        <Select style={{width:200}}>*/}
                    {/*            <Select.Option value="-1">全部</Select.Option>*/}
                    {/*            {shenpizhuangtaiOptions}*/}
                    {/*        </Select>*/}
                    {/*    )}*/}
                    {/*</FormItem>*/}
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button>
                            <Link to={this.props.match.url+'/yingquguanlixin_yiwurenyuan_yaopinrukuguanlixinzeng'}>
                                <Icon type="plus" /><span>药品入库</span>
                            </Link>
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.yaopinList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
