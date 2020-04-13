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
    Popover, InputNumber, Tag
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
            jiluList: [],
            num: 0,
        };
    }


    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let form=this.props.form;
        let shicaimingcheng=form.getFieldValue('shicaimingcheng');
        if (typeof (shicaimingcheng)=="undefined"){
            shicaimingcheng="";
        }
        let page = params.page - 1;
        let size = params.rows;
        $.ajax({
            type:'get',
            url: SERVER + "chaxunshicaikucun?page="+page+"&size="+size+"&shicaimingcheng="+shicaimingcheng,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["celiangshijian"] = moment(data.data.content[i]["celiangshijian"]).format('YYYY-MM-DD HH:mm:ss');
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

    shezhibaojingshuliang(id,num) {
        this.setState({
            id: id,
            num: num
        })
    }

    numInputChange(value) {
        this.setState({
            num : value
        });
    }

    toUpdate() {
        const THE=this;
        let id=THE.state.id;
        let gaojingyuzhi=THE.state.num;
        if (typeof(gaojingyuzhi) == "undefined"||gaojingyuzhi == null||gaojingyuzhi=='') {
            message.error("请输入报警数量！");return;
        }
        if (!confirm("确定修改报警数量！")) {
            return;
        }
        $.ajax({
            type : 'POST',
            url : SERVER+"shezhigaojingyuzhi?id="+id+"&gaojingyuzhi="+gaojingyuzhi,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                 THE.setState({
                    num: gaojingyuzhi,
                 });
                message.success("修改报警数量成功");
                THE.fetch();
            }
        });
    }

    componentDidMount() {
        this.fetch();
    }

    render() {

        const content = (
            <div>
                <InputNumber style={{margin:5}} value={this.state.num} onChange={this.numInputChange.bind(this)}/>
                <Button type="primary" onClick={this.toUpdate.bind(this)} style={{margin:5}}>修改</Button>
            </div>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '食材名称',
            dataIndex: 'shicaimingcheng',
        },{
            title: '当前库存',
            dataIndex: 'shicaizhongliang',
        },{
            title: '警戒库存',
            dataIndex: 'gaojingyuzhi',
        }, {
            title: '测量时间',
            dataIndex: 'celiangshijian',
        },{
            title: '报警数量设置',
            dataIndex: 'sz',
            render: (text, record, index) => (
                <Popover title="修改报警数量" content={content} trigger="click">
                    <Button onClick={this.shezhibaojingshuliang.bind(this,record['id'],record['gaojingyuzhi'])}>设置</Button>
                </Popover>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Tag id="biaoti">注意: 每天7:30以后才能在消耗秤上进行添加食材操作。</Tag>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="食材名称">
                        {getFieldDecorator('shicaimingcheng',)(
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
