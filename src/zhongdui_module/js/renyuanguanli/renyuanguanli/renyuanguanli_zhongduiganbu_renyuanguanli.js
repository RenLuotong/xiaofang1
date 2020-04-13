import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import renyuanguanli_zhongduiganbu_renyuanxiangqing from './renyuanguanli_zhongduiganbu_renyuanxiangqing';
import {
    Select,
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Input,
    Form,
    Button,
    Table,
    Divider,
    Popconfirm,
    message,

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
                    <Route path = {this.props.match.path +'/renyuanguanli_zhongduiganbu_renyuanxiangqing/:id'} component = {renyuanguanli_zhongduiganbu_renyuanxiangqing} />
                </Switch>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            renyuanList: [],
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
        let form = this.props.form;
        let xingming = form.getFieldValue('xingming');
        if (typeof(xingming) == "undefined") {
            xingming = '';
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "diaoboRenyuanLiebiao?xingming="+xingming+"&page="+page+"&size="+size,
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
                    renyuanList: list,
                    pagination,
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
            title: '姓名',
            dataIndex: 'xingming',
        }, {
            title: '所属组织机构',
            dataIndex: 'jigoumingcheng',
        }, {
            title: '所属部门',
            dataIndex: 'suosubumen',
        }, {
            title: '性别',
            dataIndex: 'xingbiedaima',
        }, {
            title: '入伍时间',
            dataIndex: 'ruzhishijian',
        }, {
            title: '联系电话',
            dataIndex: 'yidongdianhua',
        }, {
            title: '操作',
            render: (text, record, index) => (
                <span>
			      	<Link to={this.props.match.url+'/renyuanguanli_zhongduiganbu_renyuanxiangqing/'+record['id'] }>详情</Link>
			    </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="姓名">
                        {getFieldDecorator('xingming')(
                            <Input style={{margin:5,width:200}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.renyuanList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}
const AppComp = Form.create()(App);

export default Appmain;
