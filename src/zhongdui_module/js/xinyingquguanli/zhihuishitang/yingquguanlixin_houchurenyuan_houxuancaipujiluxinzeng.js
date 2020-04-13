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
            visible: false,
            caipinleixingList: [],
            nianfen:'',
            zhouci:'',
            startTime:'',
            endTime:'',
            huncaiMax:'',
            sucaiMax:'',
            daguocaiMax:'',
        };
    }

    //获取这周时间
    huoqushijian(){
        const THE = this;
        $.ajax({
            type:'post',
            url: SERVER + "tb-zhouhouxuan-zhubiaos/chushihuaShijian",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    nianfen: data.data.nianfen,
                    zhouci: data.data.zhouci,
                    startTime: data.data.startTime,
                    endTime: data.data.endTime,
                });
            }
        });
    }

    //获取菜品类型list
    getcaipinleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tbCaipinLeixing/findAllList",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    list.push(data.data[i]);
                }
                THE.setState({
                    caipinleixingList: list,
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
        THE.xuancaiMax();
    }

    //打开设置选菜数量弹出框
    shezhishuliang(){
        const THE = this;
        let tijiaocaiList = THE.state.tijiaocaiList;
        if (tijiaocaiList.length == 0) {
            message.warning("请先填入候选菜谱");
            return;
        }
        THE.setState({
            visible: true,
        })

    }

    //提交候选菜谱
    toCreate() {
        const THE = this;
        let form = this.props.form;
        let tijiaocaiList = THE.state.tijiaocaiList;
        let huncaishuliang = form.getFieldValue('huncaishuliang');
        if (typeof(huncaishuliang) == "undefined"||huncaishuliang == null) {
            message.warning("请设置荤菜数量");
            return;
        }
        let sucaishuliang = form.getFieldValue('sucaishuliang');
        if (typeof(sucaishuliang) == "undefined"||sucaishuliang == null) {
            message.warning("请设置素菜数量");
            return;
        }
        let daguocaicaishuliang = form.getFieldValue('daguocaicaishuliang');
        if (typeof(daguocaicaishuliang) == "undefined"||daguocaicaishuliang == null) {
            message.warning("请设置大锅菜数量");
            return;
        }
        let huncaiList = [];
        let sucaiList = [];
        let daguocaiList = [];
        for (let i = 0; i < tijiaocaiList.length; i++) {
            if(tijiaocaiList[i]["leixing"] == '荤菜'){
                tijiaocaiList[i]["leixing"] = 'Huncai'
            }else if(tijiaocaiList[i]["leixing"] == '素菜'){
                tijiaocaiList[i]["leixing"] = 'Sucai'
            }else if(tijiaocaiList[i]["leixing"] == '大锅菜'){
                tijiaocaiList[i]["leixing"] = 'Daguocai'
            }
            if(tijiaocaiList[i].leixing == 'Huncai'){
                huncaiList.push(tijiaocaiList[i]);
            }else if(tijiaocaiList[i].leixing == 'Sucai'){
                sucaiList.push(tijiaocaiList[i]);
            }else if(tijiaocaiList[i].leixing == 'Daguocai'){
                daguocaiList.push(tijiaocaiList[i]);
            }
        }
        if (!confirm("确定提交候选菜谱?")) {
            return;
        }
        let zhouhouxuanAO = {};
        zhouhouxuanAO["daguocai"] = daguocaiList;
        zhouhouxuanAO["huncai"] = huncaiList;
        zhouhouxuanAO["sucai"] = sucaiList;
        zhouhouxuanAO["daguocaishuliang"] = Number(daguocaicaishuliang);
        zhouhouxuanAO["huncaishuliang"] = Number(huncaishuliang);
        zhouhouxuanAO["sucaishuliang"] = Number(sucaishuliang);
        $.ajax({
            type : 'POST',
            url : SERVER + "tb-zhouhouxuan-zhubiaos/create",
            data : JSON.stringify(zhouhouxuanAO),
            dataType : 'json',
            contentType : "application/json",
            success : function(data){
                if (data.status != 0) {
                    message.warning(data.message);
                    THE.xuancaiMax();
                    return;
                }
                THE.setState({
                    tijiaocaiList: [],
                    visible: false,
                })
                THE.props.form.setFieldsValue(
                    {
                        huncaishuliang: '',
                        sucaishuliang: '',
                        daguocaicaishuliang: '',
                    }
                )
                message.success("添加候选菜谱成功");
                THE.backPage();
            },
        });
    }

    //设置选菜数量最大值
    xuancaiMax(){
        let huncaiList = [];
        let sucaiList = [];
        let daguocaiList = [];
        let tijiaocaiList=this.state.tijiaocaiList;
        const THE=this;
        for (let i = 0; i < tijiaocaiList.length; i++) {
            if(tijiaocaiList[i]["leixing"] == 'Huncai'){
                tijiaocaiList[i]["leixing"] = '荤菜'
            }else if(tijiaocaiList[i]["leixing"] == 'Sucai'){
                tijiaocaiList[i]["leixing"] = '素菜'
            }else if(tijiaocaiList[i]["leixing"] == 'Daguocai'){
                tijiaocaiList[i]["leixing"] = '大锅菜'
            }
            if(tijiaocaiList[i].leixing == '荤菜'){
                huncaiList.push(tijiaocaiList[i]);
            }else if(tijiaocaiList[i].leixing == '素菜'){
                sucaiList.push(tijiaocaiList[i]);
            }else if(tijiaocaiList[i].leixing == '大锅菜'){
                daguocaiList.push(tijiaocaiList[i]);
            }
        }
        THE.setState({
            huncaiMax:huncaiList.length,
            sucaiMax:sucaiList.length,
            daguocaiMax:daguocaiList.length,
        })
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
        THE.xuancaiMax();
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    componentDidMount() {
        this.fetch();
        this.getcaipinleixingList();
        this.huoqushijian();
    }

    render() {

        let caipinleixingOptions = this.state.caipinleixingList.map(item =>
            <Select.Option key={item['key']} value={item['mingcheng']}>{item['mingcheng']}</Select.Option>
        );

        const columns = [ {
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '菜品名称',
            dataIndex: 'mingcheng',
        },{
            title: '菜品类型',
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
        const { nianfen, zhouci, startTime, endTime} = this.state;

        const columns2 = [
            { title: '菜品名称', dataIndex: 'mingcheng', key: 'mingcheng' },
            { title: '菜品类型', dataIndex: 'leixing', key: 'leixing' },
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
                <Modal
                    title="设置菜品数量"
                    visible={this.state.visible}
                    onOk={this.toCreate.bind(this)}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <FormItem label="荤菜数量">
                        {getFieldDecorator('huncaishuliang')(
                            <InputNumber min={1} max={this.state.huncaiMax} size="default"  style={{margin:10,width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="素菜数量">
                        {getFieldDecorator('sucaishuliang')(
                            <InputNumber min={1} max={this.state.sucaiMax} size="default"  style={{margin:10,width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="大锅菜数量">
                        {getFieldDecorator('daguocaicaishuliang')(
                            <InputNumber min={1} max={this.state.daguocaiMax} size="default"  style={{margin:10,width:200}}/>
                        )}
                    </FormItem>
                </Modal>
                <Tag id="biaoti">{nianfen}年{zhouci}周  时间段：{startTime}--{endTime}</Tag>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="菜品名称">
                        {getFieldDecorator('caipinmingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="菜品类型">
                        {getFieldDecorator('caipinleixing',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {caipinleixingOptions}
                            </Select>
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
                <Button type="primary" size="large" onClick={this.shezhishuliang.bind(this)} style={{margin: 5}}>
                    提交候选菜谱
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
