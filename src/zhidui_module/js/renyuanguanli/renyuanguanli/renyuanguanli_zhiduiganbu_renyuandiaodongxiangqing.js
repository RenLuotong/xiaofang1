import React from 'react'
import moment from 'moment';
import {
    LocaleProvider,
    Popconfirm,
    DatePicker,
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Input,
    Form,
    Button,
    Table,
    Divider,
    message,
    Select
} from 'antd';
const FormItem = Form.Item;
class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                showQuickJumper: true,
        showSizeChanger: true,
                current : 1
            },
            zuzhijigouList: [],
            renyuandiaoboxiangqingList: [],
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
        let obj = {};
        let form = this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD HH:mm:ss');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        } else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD HH:mm:ss');
        }
        let jigoumingcheng = form.getFieldValue('zuzhijigou');
        if (typeof(jigoumingcheng) == "undefined"||jigoumingcheng == "-1") {
            jigoumingcheng = '';
        }
        let diaodongren = form.getFieldValue('diaodongren');
        if (typeof(diaodongren) == "undefined"||diaodongren == null) {
            diaodongren = '';
        }

        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "diaoboRenyuanLiebiaos?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&jigoumingcheng="+jigoumingcheng+"&diaodongrenxingming="+diaodongren,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if (data.data.content[i]["diaodongshijian"] != null) {
                        data.data.content[i]["diaodongshijian"] = moment(data.data.content[i]['diaodongshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data.content[i]["ruzhishijian"] != null) {
                        data.data.content[i]["ruzhishijian"] = moment(data.data.content[i]['ruzhishijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    renyuandiaoboxiangqingList: list,
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

    getZuzhijigouList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "allZhiduiZzjgXialaLiebiao",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    zuzhijigouList: list,
                });
            }
        });
    }

    componentDidMount() {
        this.fetch();
        this.getZuzhijigouList();
    }

    render(){
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
            width:'16%'
        },{
            title: '姓名',
            dataIndex: 'xingming',
            width:'16%'
        }, {
            title: '调拨人',
            dataIndex: 'diaodongrenxingming',
            width:'16%'
        }, {
            title: '调拨时间',
            dataIndex: 'diaodongshijian',
            width:'16%'
        }, {
            title: '组织机构',
            dataIndex: 'jigoumingcheng',
            width:'16%'
        }, {
            title: '所在部门',
            dataIndex: 'suosubumen',
        }, {
            title: '入职时间',
            dataIndex: 'ruzhishijian',
        }];

        const { getFieldDecorator } = this.props.form;
        let zuzhijigouOptions = this.state.zuzhijigouList.map(item => <Select.Option key={item['key']} value={item['jigoumingcheng']}>{item['jigoumingcheng']}</Select.Option>);

        return(
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="开始时间">
                        {getFieldDecorator('kaishishijian')(
                            <DatePicker showTime placeholder="开始时间" format="YYYY-MM-DD HH:mm:ss" style={{width: 200}} />
                        )}
                    </FormItem>
                    <FormItem label="结束时间">
                        {getFieldDecorator('jieshushijian')(
                            <DatePicker showTime placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" style={{width: 200}} />
                        )}
                    </FormItem>
                    <FormItem label="调动人">
                        {getFieldDecorator('diaodongren')(
                            <Input type="text" style={{width: 200}}/>
                        )}
                    </FormItem>
                    <FormItem label="组织机构">
                        {getFieldDecorator('zuzhijigou',{ initialValue:"-1",})(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {zuzhijigouOptions}
                            </Select>
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
                    dataSource={this.state.renyuandiaoboxiangqingList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 370px)", x: true }}
                />
            </div>
        )
    }
}
const Appmain = Form.create()(App);
export default Appmain;