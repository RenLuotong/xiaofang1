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
    Popover,
    Tag
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
                    <Route exact path = {this.props.match.path} component = {AppComp} />
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
            pingjiarenList: [],
            caipinpingjiazhubiaobianhao:this.props.match.params.caipinpingjiazhubiaobianhao,
            caipinmingcheng:'',
        };
    }

    huoqucaipinmingcheng = () => {
        const THE = this;
        let caipinpingjiazhubiaobianhao = THE.state.caipinpingjiazhubiaobianhao;
        $.ajax({
            type:'get',
            url: SERVER + "tb-caipin-pingjia-zhubiaos/huoqupingjialiebiao?zhubiaobianhao="+caipinpingjiazhubiaobianhao,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    caipinmingcheng:  data.data.content[0].caipinmingcheng,
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let form = this.props.form;
        let pingjiaren = form.getFieldValue('pingjiaren');
        if (typeof(pingjiaren) == "undefined") {
            pingjiaren = "";
        }
        let caipinpingjiazhubiaobianhao = THE.state.caipinpingjiazhubiaobianhao;
        $.ajax({
            type:'get',
            url: SERVER + "tb-caipin-pingjia-mingxis/caipinpingjiaxiangqing?zhubiaobianhao="+caipinpingjiazhubiaobianhao+"&pingjiaren="+pingjiaren,
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
                    pingjiarenList: list,
                    pagination,
                });
            }
        });
    }

    componentDidMount() {
        this.fetch();
        this.huoqucaipinmingcheng();
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '评价人',
            dataIndex: 'pingjiarenxingming',
        },{
            title: '评价时间',
            dataIndex: 'pingjiashijian',
        },  {
            title: '评价星级',
            dataIndex: 'xingji',
            render: (text, record, index) => {
                if (record['pingfen'] >= 5) {
                    return (
                        <span>
                            {record['pingfen']}分 :★★★★★
                        </span>
                    )
                }else if(record['pingfen'] >= 4 && record['pingfen'] < 5){
                    return(
                        <span>
                            {record['pingfen']}分 :★★★★☆
                        </span>
                    )
                }else if(record['pingfen'] >= 3 && record['pingfen'] < 4){
                    return(
                        <span>
                            {record['pingfen']}分 :★★★☆☆
                        </span>
                    )
                }else if(record['pingfen'] >= 2 && record['pingfen'] < 3){
                    return(
                        <span>
                            {record['pingfen']}分 :★★☆☆☆
                        </span>
                    )
                }else if(record['pingfen'] >= 1 && record['pingfen'] < 2){
                    return(
                        <span>
                            {record['pingfen']}分 :★☆☆☆☆
                        </span>
                    )
                }else if(record['pingfen'] >= 0 && record['pingfen'] < 1){
                    return(
                        <span>
                            {record['pingfen']}分 :☆☆☆☆☆
                        </span>
                    )
                }else{
                    return(
                        <span>
                            {record['pingfen']}分
                        </span>
                    )
                }
            },
        },{
            title: '理由',
            dataIndex: 'liyou',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Tag id="biaoti">菜品名称 : {this.state.caipinmingcheng}</Tag>
                <br/>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="评价人">
                        {getFieldDecorator('pingjiaren',)(
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
                    dataSource={this.state.pingjiarenList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
