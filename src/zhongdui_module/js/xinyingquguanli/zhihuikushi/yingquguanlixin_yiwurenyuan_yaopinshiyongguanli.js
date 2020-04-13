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
import yingquguanlixin_yiwurenyuan_yaopinshiyongguanlixinzeng from './yingquguanlixin_yiwurenyuan_yaopinshiyongguanlixinzeng';


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
                    <Route path = {this.props.match.path +'/yingquguanlixin_yiwurenyuan_yaopinshiyongguanlixinzeng/'} component = {yingquguanlixin_yiwurenyuan_yaopinshiyongguanlixinzeng} />
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
            url: SERVER + "huoqvchukuzhuangtai",
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
            url: SERVER + "chaxunyaopinshiyongjilu?page="+page+"&size="+size+"&yaopinmingcheng="+yaopinmingcheng+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&chukuzhuangtai="+shenpizhuangtai,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.yaopinkucunList.length; i++) {
                    data.data.yaopinkucunList[i]["key"] = i;
                    data.data.yaopinkucunList[i]["shenqingshijian"] = moment(data.data.yaopinkucunList[i]["shenqingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    if(data.data.yaopinkucunList[i]["chukuzhuangtai"] == 'YISHENQING'){
                        data.data.yaopinkucunList[i]["chukuzhuangtai"] = '已申请'
                    }else if(data.data.yaopinkucunList[i]["chukuzhuangtai"] == 'YITONGYI'){
                        data.data.yaopinkucunList[i]["chukuzhuangtai"] = '已同意'
                    }else if(data.data.yaopinkucunList[i]["chukuzhuangtai"] == 'YIJUJUE'){
                        data.data.yaopinkucunList[i]["chukuzhuangtai"] = '已拒绝'
                    }
                    if(data.data.yaopinkucunList[i]["chukuleixing"] == 'ZHENGCHANGSHIYONG'){
                        data.data.yaopinkucunList[i]["chukuleixing"] = '正常使用'
                    }else if(data.data.yaopinkucunList[i]["chukuleixing"] == 'PANKUIJIUZHENG'){
                        data.data.yaopinkucunList[i]["chukuleixing"] = '盘亏纠正'
                    }
                    list.push(data.data.yaopinkucunList[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.count;
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
            title: '使用人',
            dataIndex: 'shiyongrenxingming',
        }
        // ,{
        //     title: '审批状态',
        //     dataIndex: 'chukuzhuangtai',
        // }
        ,{
            title: '申请药品',
            dataIndex: 'yaopinmingcheng',
        },{
            title: '批次',
           dataIndex: 'pici',
        },{
            title: '申请时间',
            dataIndex: 'shenqingshijian',
        },{
            title: '使用数量',
            dataIndex: 'shiyongshuliang',
        },{
            title: '出库类型',
            dataIndex: 'chukuleixing',
        },{
            title: '使用理由',
            dataIndex: 'shiyongliyou',
        }];

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
                            <Link to={this.props.match.url+'/yingquguanlixin_yiwurenyuan_yaopinshiyongguanlixinzeng'}>
                                <Icon type="plus" /><span>药品使用</span>
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
