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
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            wuziList: [],
            selectedRowKeys: [],
            selectList: [],
            startValue: null,
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
        let shijian = form.getFieldValue('shijian');
        if (typeof(shijian) == "undefined"||shijian == null) {
            shijian = '';
        } else {
            shijian = moment(shijian).format('YYYY-MM-DD');
        }
        let tongyongmingcheng = form.getFieldValue('tongyongmingcheng');
        if (typeof(tongyongmingcheng) == "undefined"||tongyongmingcheng == null) {
            tongyongmingcheng = '';
        }
        const THE = this;
        let page = params.page - 1;
      let size = params.rows === undefined ? 10 : params.rows;
        $.ajax({
            type:'Get',
            url: SERVER + "chaxunjiaojiebanxiangqing?page="+page+"&size="+size+"&riqi="+shijian+"&tongyongmingcheng="+tongyongmingcheng+"&sort=id,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["id"] = data.data.content[i]["jilumingxibianhao"];
                    data.data.content[i]["key"] = data.data.content[i]["jilumingxibianhao"];
                    data.data.content[i]["weizhi"] = data.data.content[i]["cangkumingcheng"] + '(' + data.data.content[i]["huojiamingcheng"] + ')';
                    if(data.data.content[i]["gengxinshijian"] !== undefined && data.data.content[i]["gengxinshijian"] !== null){
                    data.data.content[i]["gengxinshijian"] = moment(data.data.content[i]["gengxinshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if(data.data.content[i]["jianchashijian"] !== undefined && data.data.content[i]["jianchashijian"] !== null) {
                        data.data.content[i]["jianchashijian"] = moment(data.data.content[i]["jianchashijian"]).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if(data.data.content[i]["xiuzhengzhuangtai"] === true){
                        data.data.content[i]["fuwei"] = '√';
                    }else{
                        data.data.content[i]["fuwei"] = '✗';
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    wuziList: list,
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

    //复位
    fuwei(){
        const THE = this;
        let selectList = THE.state.selectList;
        console.log(selectList)
        if (selectList == null || selectList.length == 0) {
            message.warning("请选择要复位的装备");
            return;
        }

        let jiaojiebanDTO = {};
        let jilubianhaoList = [];
        for (let i = 0; i < selectList.length; i++) {
            jilubianhaoList.push(selectList[i].jilumingxibianhao);
        }
        if (!confirm("确定要复位这些装备吗？")) {
            return;
        }
        jiaojiebanDTO.jilubianhaoList = jilubianhaoList;
        $.ajax({
            type:'post',
            url:SERVER+"jiaojiebanjianchaxinxixiuzheng",
            data:JSON.stringify(jiaojiebanDTO),
            dataType:'json',
            contentType: "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("提交成功");
                THE.setState({
                    selectList : [],
                    selectedRowKeys : [],
                });
                THE.fetch();
            }
        });
    }
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onStartChange = (value) => {
        this.onChange('startValue', value);
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
        },{
            title: '装备名称',
            dataIndex: 'zhuangbeimingcheng',
          width: '15%'
        }, {
            title: '位置',
            dataIndex: 'weizhi',
          width: '15%'
        }, {
            title: '状态',
            dataIndex: 'jianchazhuangtai',
          width: '15%'
        }, {
            title: '更新时间',
            dataIndex: 'gengxinshijian',
          width: '15%'
        }, {
            title: '检查时间',
            dataIndex: 'jianchashijian',
          width: '15%'
        },{
            title: '复位',
            dataIndex: 'fuwei',
          width: '15%'
        }];


        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                let wuziList = this.state.wuziList;
                let select = this.state.selectList;
                let obj = {};
                for(let i = 0;i<wuziList.length;i++){
                    for(let j = 0;j<selectedRowKeys.length;j++){
                        obj[selectedRowKeys[j]] = selectedRowKeys[j];
                        if (wuziList[i].id === selectedRowKeys[j]) {
                            select.push(wuziList[i])
                        }
                    }
                }
                for(let i = 0;i<select.length;i++) {
                    if (obj[select[i].id] === undefined) {
                        select.splice(i, 1)
                    }
                }
                let obj2 = {};
                let select2 = [];
                for(let i = 0;i<select.length;i++){
                    if(obj2[select[i].id] === undefined){
                        select2.push(select[i])
                        obj2[select[i].id] = obj[select[i].id];
                    }
                }
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys : selectedRowKeys,
                    selectList : select2,
                });
            },
            getCheckboxProps: record => ({
                disabled: record.xiuzhengzhuangtai === true, // 状态为正常不可以选
            }),
        };
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue} = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="时间">
                        {getFieldDecorator('shijian')(
                            <DatePicker
                                value={startValue}
                                placeholder="时间"
                                format="YYYY-MM-DD"
                                onChange={this.onStartChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="装备名称">
                        {getFieldDecorator('tongyongmingcheng',)(
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
                        <Button onClick={this.fuwei.bind(this)}>
                            复位
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.wuziList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 405px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
