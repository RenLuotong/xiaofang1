import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import moment from 'moment';
import yingquguanlixin_houchurenyuan_caigouguanlixiangqing from './yingquguanlixin_houchurenyuan_caigouguanlixiangqing';
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
    Popover, Card, Tree
} from 'antd';
import TreeSideBar from '../../../../common/components/TreeSideBar';
const { TreeNode } = Tree;
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
                    <Route path = {this.props.match.path +'/yingquguanlixin_houchurenyuan_caigouguanlixiangqing/:zhubiaobianhao'} component = {yingquguanlixin_houchurenyuan_caigouguanlixiangqing} />
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
            caigouList: [],
            treeList:[],
            startValue: null,
            endValue: null,
        };
    }

    getTree() {
        const THE = this;
        $.ajax({
            type:'GET',
            url:SERVER+"zhiduiAlljigou",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                let treeList = THE.state.treeList;
                treeList.push(data.data);
                THE.setState({
                    treeList:treeList
                });
            }
        });
    }

    jigoudaima = ''
    onSelect = (e) => {
      if (e !== null) {
        this.jigoudaima = e;
        this.fetch();
      }
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD');
        }
        let chakanfanwei = form.getFieldValue('chakanfanwei');
        if (typeof(chakanfanwei) == "undefined"||chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let caigouren = form.getFieldValue('caigouren');
        if (typeof(caigouren) == "undefined") {
            caigouren = '';
        }
        let jigoudaima = this.jigoudaima;
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tbCaigouZhubiao/chaxunzhubiao?page="+page+"&size="+size+"&jigoudaima="+jigoudaima+"&tijiaoren="+caigouren+"&chakanfanwei="+chakanfanwei+"&chaxunkaishishijian="+kaishishijian+"&chaxunjieshushijian="+jieshushijian,
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
                    caigouList: list,
                    pagination,
                });
            }
        });
    }

    dayinpdf() {
        const { getFieldValue } = this.props.form;
        const THE = this;
        let kaishishijian = getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD');
        }
        let jieshushijian = getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD');
        }
        let chakanfanwei = getFieldValue('chakanfanwei');
        if (typeof(chakanfanwei) == "undefined"||chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let caigouren = getFieldValue('caigouren');
        if (typeof(caigouren) == "undefined") {
            caigouren = '';
        }
        let jigoudaima = this.jigoudaima;
        $.ajax({
            type:'get',
            url: SERVER + "daochushicaicaigouhuizong?chaxunkaishishijian="+kaishishijian+"&chaxunjieshushijian="+jieshushijian+"&chakanfanwei="+chakanfanwei+"&jigoudaima="+jigoudaima+"&tijiaoren="+caigouren,
            success: function (data) {
                window.location.href = data.data;
            }
        });
    }

    dayinpdf2() {
        const { getFieldValue } = this.props.form;
        const THE = this;
        let kaishishijian = getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD');
        }
        let jieshushijian = getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD');
        }
        let chakanfanwei = getFieldValue('chakanfanwei');
        if (typeof(chakanfanwei) == "undefined"||chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let caigouren = getFieldValue('caigouren');
        if (typeof(caigouren) == "undefined") {
            caigouren = '';
        }
        let jigoudaima = this.jigoudaima;
        $.ajax({
            type:'get',
            url: SERVER + "daochushicaicaigouxiangqing?chaxunkaishishijian="+kaishishijian+"&chaxunjieshushijian="+jieshushijian+"&chakanfanwei="+chakanfanwei+"&jigoudaima="+jigoudaima+"&tijiaoren="+caigouren,
            success: function (data) {
                window.location.href = data.data;
            }
        });
    }


    componentDidMount() {
        this.fetch();
        this.getTree();
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '机构名称',
            dataIndex: 'jigoumingcheng',
          width: '20%'
        },{
            title: '采购人',
            dataIndex: 'tijiaoren',
          width: '20%'
        },{
            title: '采购日期',
            dataIndex: 'caigouriqi',
          width: '20%'
        },  {
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
              return (
                <span>
                  <Link to={this.props.match.url+'/yingquguanlixin_houchurenyuan_caigouguanlixiangqing/' + record['zhubiaobianhao'] }>详情</Link>
                 </span>
              )
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        let kaishishijian = getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD');
        }
        let jieshushijian = getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD');
        }
        let chakanfanwei = getFieldValue('chakanfanwei');
        if (typeof(chakanfanwei) == "undefined"||chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let caigouren = getFieldValue('caigouren');
        if (typeof(caigouren) == "undefined") {
            caigouren = '';
        }
        let jigoudaima = this.jigoudaima;
        let renyuanbianhao = sessionStorage.getItem("renyuanbianhao");
        const { startValue, endValue} = this.state;

        return (
            <div id="chaxuntongji">
              <TreeSideBar  onSelect={this.onSelect} />
                <div id="treeRight" style={{flex: '1'}}>
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
                        <br/>
                        <FormItem label="采购人&#12288;">
                            {getFieldDecorator('caigouren',)(
                                <Input style={{width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="查看范围">
                            {getFieldDecorator('chakanfanwei',{initialValue: "-1"})(
                                <Select style={{width:200}}>
                                    <Select.Option value="-1">管辖范围</Select.Option>
                                    <Select.Option value="所属范围">所属范围</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.search.bind(this)}>
                                <Icon type="search" />查询
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.dayinpdf.bind(this)} >
                                导出采购汇总
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.dayinpdf2.bind(this)} >
                                导出采购详情
                            </Button>
                        </FormItem>
                    </Form>
                    <Table
                        columns={columns}
                        dataSource={this.state.caigouList}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                        scroll={{ y: "calc(100vh - 405px)", x: true }}
                    />
                </div>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
