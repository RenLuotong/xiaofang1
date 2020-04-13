import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {
    Select,
    Icon,
    Input,
    Form,
    Button,
    Table,
    Divider,
    Popconfirm,
    message,
    Tabs,
    InputNumber,
    Modal,
    DatePicker
} from 'antd';
import moment from "moment";
const FormItem = Form.Item;

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

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            List: [],
            pagination: {
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
        };
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

    search() {
        const pager = {...this.state.pagination};
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pager.pageSize,
            page: pager.current,
        });
    }
    handleTableChange = (pagination) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pagination.pageSize,
            page: pagination.current,
        });
    }

    toDelete(id) {
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER + "xiaqudanwei/delete/"+id,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success('删除成功');
                THE.fetch();
            }
        });
    }

    fetch = (params = {
        rows: this.state.pagination.pageSize,
        page: this.state.pagination.current
    }) => {
        let form = this.props.form;
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
        let danweimingcheng = form.getFieldValue('danweimingcheng');
        if (typeof(danweimingcheng) == "undefined") {
            danweimingcheng = "";
        }
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "yanlian/findAll?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&danweimingcheng="+danweimingcheng,
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["shijian"] = moment(data.data.content[i]["shijian"]).format('YYYY-MM-DD HH:mm:ss');
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    List: list,
                    pagination,
                });
            }
        });
    }

    shengcheng(id){
        $.ajax({
            type:'post',
            url: SERVER + "yanlian/export/"+id,
            success: function (data) {
                window.location.href = data.data;
            }
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
          width: '10%'
        }, {
            title: '机构名称',
            dataIndex: 'jigoumingcheng',
          width: '10%'
        }, {
            title: '单位名称',
            dataIndex: 'danweimingcheng',
          width: '10%'
        }, {
            title: '时间',
            dataIndex: 'shijian',
          width: '10%'
        }, {
            title: '录入人姓名',
            dataIndex: 'lururenxingming',
          width: '10%'
        }, {
            title: '单位类型',
            dataIndex: 'biaoqian',
          width: '10%'
        },{
          title: '单位地址',
          dataIndex: 'danweidizhi',
        },{
                title: '操作',
                render: (text, record, index) => {
                        return (
                     <span>
                         <Button type="primary" onClick={this.shengcheng.bind(this,record['id'])} >
                                生成演练记录
                          </Button>
			         </span>
                        )
                },
         }];

        const {getFieldDecorator} = this.props.form;

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
                    <FormItem label="单位名称">
                        {getFieldDecorator('danweimingcheng',)(
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
                    dataSource={this.state.List}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 355px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
