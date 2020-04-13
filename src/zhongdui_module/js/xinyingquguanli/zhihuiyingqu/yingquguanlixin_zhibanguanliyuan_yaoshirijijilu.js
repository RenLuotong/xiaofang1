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
import yingquguanlixin_zhibanguanliyuan_yaoshirijixiangqing from './yingquguanlixin_zhibanguanliyuan_yaoshirijixiangqing';
import yingquguanlixin_zhibanguanliyuan_yaoshirijixiugai from './yingquguanlixin_zhibanguanliyuan_yaoshirijixiugai';
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
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhibanguanliyuan_yaoshirijixiangqing/:id'} component = {yingquguanlixin_zhibanguanliyuan_yaoshirijixiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhibanguanliyuan_yaoshirijixiugai/:id'} component = {yingquguanlixin_zhibanguanliyuan_yaoshirijixiugai} />
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
            rijiList: [],
        };
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "chaxunYaoshiriji?page="+page+"&size="+size,
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
                    rijiList: list,
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
          width: '20%'
        }
        ,{
            title: '日期',
            dataIndex: 'riqi',
            width: '20%'
        },{
            title: '天气',
            dataIndex: 'tianqi',
            width: '20%'
        }
        ,{
            title: '值班员',
            dataIndex: 'zhibanyuan',
            width: '20%'
        }, {
                title: '签字',
                dataIndex: 'qianzi',
                render: (text, record, index) => {
                    if (record['qianzitupiandizhi'] !== null) {
                        return (
                            <span>
			    	         <img src={record['qianzitupiandizhi']} width="100px" height="100px"/>
			                 </span>
                        )
                    } else {
                        return (
                            <span>还未签字</span>
                            )

                    }
                }
            },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                return (
                    <span>
                           <Link to={this.props.match.url + '/yingquguanlixin_zhibanguanliyuan_yaoshirijixiangqing/' + record['id']}>详情</Link>
                           <Divider type="vertical" />
                           <Link to={this.props.match.url + '/yingquguanlixin_zhibanguanliyuan_yaoshirijixiugai/' + record['id']}>修改</Link>
                       </span>
                )
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.rijiList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 325px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
