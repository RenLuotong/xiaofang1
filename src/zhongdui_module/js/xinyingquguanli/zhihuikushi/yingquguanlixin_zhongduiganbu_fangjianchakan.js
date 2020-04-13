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
import yingquguanlixin_zhongduiganbu_fangjianchakanxinzeng from './yingquguanlixin_zhongduiganbu_fangjianchakanxinzeng';


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
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_fangjianchakanxinzeng/'} component = {yingquguanlixin_zhongduiganbu_fangjianchakanxinzeng} />
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
            fangjianList: [],
            fangjianleixingList: [],
        };
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({fileList}) => {
        this.setState({
            fileList: fileList,
        });
    }

    getfangjianleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquFangjianleixingMeiju",
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
                    fangjianleixingList: list,
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let fangjianmingcheng = form.getFieldValue('fangjianmingcheng');
        if (typeof(fangjianmingcheng) == "undefined") {
            fangjianmingcheng = "";
        }
        let fangjianleixing = form.getFieldValue('fangjianleixing');
        if (typeof(fangjianleixing) == "undefined" || fangjianleixing == '-1') {
            fangjianleixing = "";
        }
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "huoquZhinengMensuoFangjian?page="+page+"&size="+size+"&fangjianmingcheng="+fangjianmingcheng+"&fangjianleixing="+fangjianleixing,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if(data.data.content[i]["fangjianleixing"] == 'ZHINENGSUOFANGJIAN'){
                        data.data.content[i]["fangjianleixing"] = '智能锁房间'
                    }else if(data.data.content[i]["fangjianleixing"] == 'KAOQINJIFANGJIAN'){
                        data.data.content[i]["fangjianleixing"] = '考勤机房间'
                    }else if(data.data.content[i]["fangjianleixing"] == 'JIASHUJIEDAISHI'){
                        data.data.content[i]["fangjianleixing"] = '家属接待室'
                    }else if(data.data.content[i]["fangjianleixing"] == 'SUSHE'){
                        data.data.content[i]["fangjianleixing"] = '宿舍'
                    }
                    if(data.data.content[i]["shifouzhinengjiajufangjian"] == 'FOU'){
                        data.data.content[i]["shifouzhinengjiajufangjian"] = '否'
                    }else if(data.data.content[i]["shifouzhinengjiajufangjian"] == 'SHI'){
                        data.data.content[i]["shifouzhinengjiajufangjian"] = '是'
                    }
                    list.push(data.data.content[i]);
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    fangjianList: list,
                    pagination,
                });
            }
        });
    }


    toDelete(id){
        const THE = this;
        $.ajax({
            type : "POST",
            url : SERVER+"shanchuzhinengsuofangjian?id="+id,
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
        this.getfangjianleixingList();
    }

    render() {

        let fangjianleixingListOptions = this.state.fangjianleixingList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
          width: '15%'
        },{
            title: '房间名称',
            dataIndex: 'fangjianmingcheng',
          width: '15%'
        },{
            title: '房间类型',
            dataIndex: 'fangjianleixing',
          width: '15%'
        },{
            title: '房间描述',
            dataIndex: 'fangjianmiaoshu',
          width: '10%'
        },{
            title: '是否智能家居房间',
            dataIndex: 'shifouzhinengjiajufangjian',
          width: '15%'
        },{
            title: '房间图片',
            dataIndex: 'fangjiantupian',
            render: (text, record) => (

                <span>
			    	<img src={record['fangjiantupian']} width="100px" height="100px"/>
			    </span>
            ),
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <Popconfirm placement="topLeft" title="确认要删除该房间?"
                                onConfirm={this.toDelete.bind(this, record['id'])} okText="确认" cancelText="取消">
                        <a>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="房间名称">
                        {getFieldDecorator('fangjianmingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="房间类型">
                        {getFieldDecorator('fangjianleixing',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {fangjianleixingListOptions}
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
                        <Button>
                            <Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_fangjianchakanxinzeng'}>
                                <Icon type="plus" /><span>新增房间</span>
                            </Link>
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.fangjianList}
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
