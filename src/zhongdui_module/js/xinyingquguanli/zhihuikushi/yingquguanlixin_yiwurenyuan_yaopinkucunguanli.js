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
            piciList: [],
        };
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let yaopinmingcheng = form.getFieldValue('yaopinmingcheng');
        if (typeof(yaopinmingcheng) == "undefined") {
            yaopinmingcheng = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "chaxunyaopinkucun?page="+page+"&size="+size+"&yaopinmingcheng="+yaopinmingcheng,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.yaopinkucunList.length; i++) {
                    data.data.yaopinkucunList[i]["key"] = i;
                    data.data.yaopinkucunList[i]["gengxinshijian"] = moment(data.data.yaopinkucunList[i]["gengxinshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    list.push(data.data.yaopinkucunList[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.count;
                THE.setState({
                    yaopinList: list,
                    piciList: data.data.piciList,
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

    expandedRowRender = (record) => {
        let smallList = [];
        console.info(record.kucunbianhao)
        console.info(this.state.piciList)
        for(let i=0;i<this.state.piciList.length;i++){
            if(record.kucunbianhao === this.state.piciList[i].kucunbianhao){
                this.state.piciList[i].gengxinshijian= moment(this.state.piciList[i].gengxinshijian).format('YYYY-MM-DD HH:mm:ss');
                smallList.push(this.state.piciList[i]) ;
            }
        }
        const columns = [
            { title: '批次', dataIndex: 'pici', key: 'pici' },
            { title: '数量', dataIndex: 'shuliang', key: 'shuliang' },
            { title: '更新时间', dataIndex: 'gengxinshijian', key: 'gengxinshijian' },
        ];

        return (
            <Table
                columns={columns}
                dataSource={smallList}
                pagination={false}
            />
        );
    };

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
            title: '药品名称',
            dataIndex: 'yaopinmingcheng',
        },{
            title: '数量',
            dataIndex: 'zaikushuliang',
        },{
            title: '单位',
            dataIndex: 'danweizhongwen',
        },{
            title: '更新时间',
            dataIndex: 'gengxinshijian',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="药品名称">
                        {getFieldDecorator('yaopinmingcheng',)(
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
                    className="components-table-demo-nested"
                    columns={columns}
                    dataSource={this.state.yaopinList}
                    expandedRowRender={this.expandedRowRender}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
