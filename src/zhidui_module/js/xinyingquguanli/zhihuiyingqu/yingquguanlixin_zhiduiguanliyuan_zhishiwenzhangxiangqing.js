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
import yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiangqing from './yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiangqing';
import yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxinzeng from './yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxinzeng'
import yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiugai from './yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiugai'
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
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiangqing/:id'} component = {yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiangqing} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiugai/:id'} component = {yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiugai} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxinzeng'} component = {yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxinzeng} />

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
            wenzhangList: [],
            bianhao:this.props.match.params.bianhao,
            startValue: null,
            endValue: null,
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

    //获取文章列表
    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        const THE = this;
        let bianhao = THE.state.bianhao;
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
        let wenzhangmingcheng=form.getFieldValue('wenzhangmingcheng');
        if (typeof (wenzhangmingcheng)=="undefined"){
            wenzhangmingcheng="";
        }
        let zuozhe=form.getFieldValue('zuozhe');
        if (typeof (zuozhe)=="undefined"){
            zuozhe="";
        }
        let page = params.page - 1;
        let size = params.rows;
        $.ajax({
            type:'get',
            url: SERVER + "tb-wenzhangs/getWenzhangs?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&lanmubianhao="+bianhao+"&biaoti="+wenzhangmingcheng+"&zuozhe="+zuozhe,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["gengxinshijian"] = moment(data.data.content[i]["gengxinshijian"]).format('YYYY-MM-DD');
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    wenzhangList: list,
                    pagination,
                });
            }
        });
    }
    //删除文章
    toDelete(id){
        const THE = this;
        $.ajax({
            type : "POST",
            url : SERVER+"tb-wenzhangs/shanchu?id="+id,
            success : function(data){
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("删除成功");
                THE.fetch();
            },
            error : function() {
                message.error('操作失败');
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
            className:'hidden_col'
        },{
            title: '文章名称',
            dataIndex: 'biaoti',
        },{
            title: '文章类型',
            dataIndex: 'leixing',
        },{
            title: '作者',
            dataIndex: 'zuozhe',
        }, {
            title: '封面',
            dataIndex: 'fengmian',
            render: (text, record) => (

                <span>
			    	<img src={record['fengmian']} width="100px" height="100px"/>
			    </span>
            ),
        },{
            title: '更新时间',
            dataIndex: 'gengxinshijian',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                if (record['leixing'] == "链接文章") {
                    return (
                        <span>
                            <Link to={this.props.match.url + '/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiugai/' + record['id']}>修改</Link>
                            <Divider type="vertical"/>
                            <Popconfirm
                                placement="topLeft"
                                title="确认要删除该文章?"
                                onConfirm={this.toDelete.bind(this, record['id'])}
                                okText="确认"
                                cancelText="取消">
			        	    <a>删除</a>
			    	        </Popconfirm>
                       </span>
                    )
                }else {
                    return (
                        <span>
                           <Link to={this.props.match.url + '/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiangqing/' + record['id']}>详情</Link>
                           <Divider type="vertical"/>
                           <Popconfirm
                               placement="topLeft"
                               title="确认要删除该文章?"
                               onConfirm={this.toDelete.bind(this, record['id'])}
                               okText="确认"
                               cancelText="取消">
                               <a>删除</a>
                           </Popconfirm>
                           <Divider type="vertical"/>
                           <Link to={this.props.match.url + '/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiugai/' + record['id']}>修改</Link>
                       </span>
                    )
                }
            },
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
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
                    <br/>
                    <FormItem label="文章名称">
                        {getFieldDecorator('wenzhangmingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="作&#12288;&#12288;者">
                        {getFieldDecorator('zuozhe',)(
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
                        <Button>
                            <Link to={this.props.match.url + '/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxinzeng'}>
                                <Icon type="plus"/><span>新增文章</span></Link>
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.wenzhangList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
