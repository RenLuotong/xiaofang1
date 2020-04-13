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
import yingquguanlixin_zhongduiganbu_chushipingjiaxiangqing from './yingquguanlixin_zhongduiganbu_chushipingjiaxiangqing';
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
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_chushipingjiaxiangqing/:pingjiabianhao'} component = {yingquguanlixin_zhongduiganbu_chushipingjiaxiangqing} />
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
            caipinList: [],
        };
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let nianfen = form.getFieldValue('nianfen');
        if (typeof(nianfen) == "undefined") {
            nianfen = "";
        }
        let yuefen = form.getFieldValue('yuefen');
        if (typeof(yuefen) == "undefined") {
            yuefen = "";
        }
        let xingming = form.getFieldValue('xingming');
        if (typeof(xingming) == "undefined") {
            xingming = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "chaxunchushipingjia?page="+page+"&size="+size+"&nianfen="+nianfen+"&yuefen="+yuefen+"&xingming="+xingming,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    caipinList: list,
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
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '年份',
            dataIndex: 'nianfen',
        },{
            title: '月份',
            dataIndex: 'yuefen',
        },{
            title: '厨师名称',
            dataIndex: 'chushixingming',
        },  {
            title: '评价星级',
            dataIndex: 'pingjunfen',
            render: (text, record, index) => {
                if (record['pingjunfen'] >= 5) {
                    return (
                        <span>
                            {record['pingjunfen']}分 :★★★★★
                        </span>
                    )
                }else if(record['pingjunfen'] >= 4 && record['pingjunfen'] < 5){
                    return(
                        <span>
                            {record['pingjunfen']}分 :★★★★☆
                        </span>
                    )
                }else if(record['pingjunfen'] >= 3 && record['pingjunfen'] < 4){
                    return(
                        <span>
                            {record['pingjunfen']}分 :★★★☆☆
                        </span>
                    )
                }else if(record['pingjunfen'] >= 2 && record['pingjunfen'] < 3){
                    return(
                        <span>
                            {record['pingjunfen']}分 :★★☆☆☆
                        </span>
                    )
                }else if(record['pingjunfen'] >= 1 && record['pingjunfen'] < 2){
                    return(
                        <span>
                            {record['pingjunfen']}分 :★☆☆☆☆
                        </span>
                    )
                }else if(record['pingjunfen'] >= 0 && record['pingjunfen'] < 1){
                    return(
                        <span>
                            {record['pingjunfen']}分 :☆☆☆☆☆
                        </span>
                    )
                }else{
                    return(
                        <span>
                            {record['pingjunfen']}分
                        </span>
                    )
                }
            },
        },  {
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                return (
                    <span>
                           <Link to={this.props.match.url + '/yingquguanlixin_zhongduiganbu_chushipingjiaxiangqing/' + record['pingjiabianhao']}>详情</Link>
                       </span>
                )
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="年份">
                        {getFieldDecorator('nianfen',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="月份">
                        {getFieldDecorator('yuefen',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="姓名">
                        {getFieldDecorator('xingming',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.caipinList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
