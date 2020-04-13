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
    InputNumber,
    Tag
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

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
            quanbucaiList: [],
            tijiaocaiList: [],
            selectedRowKeys: [],
            selectList: [],
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

    //获取所有菜品
    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        const THE = this;
        let caipinmingcheng = form.getFieldValue('caipinmingcheng');
        if (typeof(caipinmingcheng) == "undefined") {
            caipinmingcheng = "";
        }
        let caipinleixing = form.getFieldValue('caipinleixing');
        if (typeof(caipinleixing) == "undefined" || caipinleixing == '-1') {
            caipinleixing = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        let tijiaocaiList = this.state.tijiaocaiList;
        let tijiaocaiIdList = [];
        for (let i = 0; i < tijiaocaiList.length; i++) {
            tijiaocaiIdList.push(tijiaocaiList[i]['id']);
        }
        $.ajax({
            type:'Get',
            url: SERVER + "tb-caipins/getAllTbCaipins?page="+page+"&size="+size+"&caipinmingcheng="+caipinmingcheng+"&caipinLeixing="+caipinleixing+"&sort=leixing,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if(data.data.content[i]["leixing"] == 'Huncai'){
                        data.data.content[i]["leixing"] = '荤菜'
                    }else if(data.data.content[i]["leixing"] == 'Sucai'){
                        data.data.content[i]["leixing"] = '素菜'
                    }else if(data.data.content[i]["leixing"] == 'Daguocai'){
                        data.data.content[i]["leixing"] = '大锅菜'
                    }
                }
                let quanbucaiList = data.data.content;
                let quanList = [];
                for (let i = 0; i < quanbucaiList.length; i++) {
                    let index = tijiaocaiIdList.indexOf(quanbucaiList[i]['id']);
                    if (index > -1) {
                        tijiaocaiIdList.splice(index,1);
                    } else {
                        quanList.push(quanbucaiList[i]);
                    }
                }
                for (let i = 0; i < quanList.length; i++) {
                    quanList[i]["key"] = quanList[i]['id'];
                    list.push(quanList[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    quanbucaiList: list,
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

    //把菜选入提交单
    xuanze() {
        const THE = this;
        let selectList = THE.state.selectList;
        if (selectList.length == 0) {
            message.error("请选择菜");
            return;
        }
        let quanbucaiList = THE.state.quanbucaiList;
        let tijiaocaiList = THE.state.tijiaocaiList;
        for (let i = 0; i < selectList.length; i++) {
            let obj = {};
            obj.id = selectList[i].id;
            obj.mingcheng = selectList[i].mingcheng;
            obj.leixing = selectList[i].leixing;
            tijiaocaiList.push(obj);
        }
        for (let i = 0; i < selectList.length; i++) {
            let index = quanbucaiList.indexOf(selectList[i]);
            if (index > -1) {
                quanbucaiList.splice(index, 1);
            }
        }
        THE.setState({
            quanbucaiList:  quanbucaiList,
            tijiaocaiList: tijiaocaiList,
            selectList: [],
            selectedRowKeys : [],
        })
        THE.fetch();
    }



    //提交候选菜谱
    toCreate() {
        const THE = this;
        let form = this.props.form;
    }

    backPage() {
        window.location.href = "./zhongdui.html#/yingquguanlixin_houchurenyuan_houxuancaipujilu";
    }

    //撤销候选菜谱提交单的菜品
    toRemove(id) {
        const THE = this;
        let quanbucaiList = this.state.quanbucaiList;
        let tijiaocaiList = this.state.tijiaocaiList;
        for (let i = 0; i < tijiaocaiList.length; i++) {
            if (tijiaocaiList[i].id == id) {
                quanbucaiList.push(tijiaocaiList[i]);
                let index = tijiaocaiList.indexOf(tijiaocaiList[i]);
                if (index > -1) {
                    tijiaocaiList.splice(index, 1);
                }
            }
        }
        this.setState({
            tijiaocaiList : tijiaocaiList,
            quanbucaiList : quanbucaiList,
        });
        THE.fetch();

    }



    componentDidMount() {
        this.fetch();
    }

    render() {

        const columns = [ {
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '车辆编号',
            dataIndex: 'mingcheng',
        },{
            title: '车牌号码',
            dataIndex: 'leixing',
        }];

        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys : selectedRowKeys,
                    selectList : selectedRows,
                });
            },
        };

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        const columns2 = [
            { title: '车辆编号', dataIndex: 'mingcheng', key: 'mingcheng' },
            { title: '车牌号码', dataIndex: 'leixing', key: 'leixing' },
            {
                title: '操作',
                dataIndex: 'zhuangbeizhuangtai',
                render: (text, record, index) => (
                    <span>
			      	<a onClick={this.toRemove.bind(this,record['id'])}>撤销</a>
			    </span>
                ),
            }
        ];

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="车牌号码">
                        {getFieldDecorator('caipinmingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button onClick={this.xuanze.bind(this)} >
                            选择
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.quanbucaiList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />

                <br/>
                <Button type="primary" size="large" onClick={this.toCreate.bind(this)} style={{margin: 5}}>
                    提交人员白名单
                </Button>
                <Table
                    columns={columns2}
                    dataSource={this.state.tijiaocaiList}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
