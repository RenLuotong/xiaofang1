import React from 'react';
import {Link, Route ,Switch} from 'react-router-dom';
import XLSX from 'xlsx';
import {
    Icon,
    Form,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, Input, Select,
} from 'antd';
import yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji from './yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji';


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
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji/:chepaihaoma'} component = {yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji} />
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
            YingqucheliangList: [],
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
        let chepaihaoma = form.getFieldValue('chepaihaoma');
        if (typeof(chepaihaoma) == "undefined"||chepaihaoma == "-1") {
            chepaihaoma = '';
        }
        let page = params.page - 1;
        let size = params.rows;
        let cheliangleibie = 'GONGWUCHE';
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "huoquyingqucheliangliebiao?page="+page+"&size="+size+"&chepaihaoma="+chepaihaoma+"&cheliangLeixingEnum="+cheliangleibie,
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
                    YingqucheliangList: data.data.content,
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
            title: '车辆管理人',
            dataIndex: 'xingming',
        },{
            title: '车牌号码',
            dataIndex: 'chepaihaoma',
        }, {
            title: '车辆品牌',
            dataIndex: 'cheliangpinpai',
        },{
            title: '所属部门',
            dataIndex: 'suosubumen',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
			      	<Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji/'+record['chepaihaoma'] }>轨迹</Link>
			    </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline"  style={{margin:5}}>
                    <FormItem label="车牌号码">
                        {getFieldDecorator('chepaihaoma')(
                            <Input style={{width:200}}/>
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
                    dataSource={this.state.YingqucheliangList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
