import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
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
import moment from 'moment';
import yingquguanlixin_zhongduiganbu_fangkejiluxiangqing from "../zongheanfang/yingquguanlixin_zhongduiganbu_fangkejiluxiangqing";

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
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_fangkejiluxiangqing/:id'} component = {yingquguanlixin_zhongduiganbu_fangkejiluxiangqing} />
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
            jiluList: [],
            shenhezhuangtaiList: [],
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

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "myfangkeliebiao?page="+page+"&size="+size,
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
                    jiluList: list,
                    pagination,
                });
            }
        });
    }

    //审批通过
    tongguo(id){
        const THE = this;
        let shenpizhuangtai='通过';
        $.ajax({
            type:'POST',
            url: SERVER + "fangkepifu?id="+id+"&fangwenpifu="+shenpizhuangtai,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("审批成功");
                THE.fetch();
            }
        });
    }

    //审批拒绝
    jujue(id){
        const THE = this;
        let shenpizhuangtai='拒绝';
        $.ajax({
            type:'POST',
            url: SERVER + "fangkepifu?id="+id+"&fangwenpifu="+shenpizhuangtai,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("审批成功");
                THE.fetch();
            }
        });
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
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

    //获取用户名
    getUser(){
        const user=sessionStorage.getItem('userName');
        this.setState({
            user:user,
        })
    }

    componentDidMount() {
        this.fetch();
        this.getUser();
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
          width: '20%'
        },{
            title: '正脸照片',
            dataIndex: 'xianchangzhaopian',
          width: '20%',
            render: (text, record) => (
                <span>
			    	<img src={record['xianchangzhaopian']} width="100px" height="100px"/>
			    </span>
            ),
        },{
            title: '姓名',
            dataIndex: 'xingming',
          width: '20%'
        },{
            title: '理由',
            dataIndex: 'yuanyin',
          width: '20%'
        },{
            title: '审批状态',
            dataIndex: 'fangwenpifu',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                if (record['fangwenpifu'] == "申请中"&&record['beifangwenrenxingming'] == this.state.user) {
                    return (
                        <span>
                        <Popconfirm placement="topLeft" title="确认要通过该访客申请?"
                                    onConfirm={this.tongguo.bind(this, record['id'])} okText="确认" cancelText="取消">
					        	<a>通过</a>
					    	</Popconfirm>
					    	<Divider type="vertical"/>
					    	<Popconfirm placement="topLeft" title="确认要拒绝该访客申请?"
                                        onConfirm={this.jujue.bind(this, record['id'])} okText="确认" cancelText="取消">
					        	<a>拒绝</a>
					    	</Popconfirm>
                            <Divider type="vertical"/>
                            <Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_fangkejiluxiangqing/'+ record['id'] }>详情</Link>
                       </span>
                    )
                }else if (record['fangwenpifu'] == "通过"&&record['beifangwenrenxingming'] == this.state.user) {
                    return(
                        <span>
                            <Popconfirm placement="topLeft" title="确认要拒绝该访客申请?"
                                        onConfirm={this.jujue.bind(this, record['id'])} okText="确认" cancelText="取消">
					        	<a>拒绝</a>
					    	</Popconfirm>
                            <Divider type="vertical"/>
                          <Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_fangkejiluxiangqing/'+ record['id'] }>详情</Link>
                    </span>
                    ) }else {
                    return(
                        <span>
                          <Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_fangkejiluxiangqing/'+ record['id'] }>详情</Link>
                    </span>
                    )
                }
            },
        }];

        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.jiluList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 315px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
