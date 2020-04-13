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
import yingquguanlixin_zhongduiganbu_dazhongdianpingxiangqing from './yingquguanlixin_zhongduiganbu_dazhongdianpingxiangqing';
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
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_dazhongdianpingxiangqing/:caipinpingjiazhubiaobianhao'} component = {yingquguanlixin_zhongduiganbu_dazhongdianpingxiangqing} />
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
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
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
        let zhouci = form.getFieldValue('zhouci');
        if (typeof(zhouci) == "undefined") {
            zhouci = "";
        }
        let caipinmingcheng = form.getFieldValue('caipinmingcheng');
        if (typeof(caipinmingcheng) == "undefined") {
            caipinmingcheng = "";
        }
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tb-caipin-pingjia-zhubiaos/huoqupingjialiebiao?page="+page+"&size="+size+"&nianfen="+nianfen+"&zhouci="+zhouci+"&caipinmingcheng="+caipinmingcheng,
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
            className:'hidden_col',
          width: '25%'
        }
        // ,{
        //     title: '年份',
        //     dataIndex: 'nianfen',
        // },{
        //     title: '周次',
        //     dataIndex: 'zhouci',
        // }
        ,{
            title: '菜品名称',
            dataIndex: 'caipinmingcheng',
            width: '25%'
        },  {
            title: '评价星级',
            dataIndex: 'xingji',
            width: '25%',
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
                           <Link to={this.props.match.url + '/yingquguanlixin_zhongduiganbu_dazhongdianpingxiangqing/' + record['caipinpingjiazhubiaobianhao']}>详情</Link>
                       </span>
                )
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    {/*<FormItem label="年份">*/}
                    {/*    {getFieldDecorator('nianfen',)(*/}
                    {/*        <Input style={{width:200}}/>*/}
                    {/*    )}*/}
                    {/*</FormItem>*/}
                    {/*<FormItem label="周次">*/}
                    {/*    {getFieldDecorator('zhouci',)(*/}
                    {/*        <Input style={{width:200}}/>*/}
                    {/*    )}*/}
                    {/*</FormItem>*/}
                    <FormItem label="菜品名称">
                        {getFieldDecorator('caipinmingcheng',)(
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
                    scroll={{ y: "calc(100vh - 345px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
