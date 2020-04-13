import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import moment from 'moment';
import {
    message,
    Upload,
    Modal,
    Steps,
    Icon,
    Form,
    Table, Tabs, Tag, Button, Input, Row, Col, Popconfirm, Divider
} from 'antd';

const { Step } = Steps;
const {TextArea}=Input;
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            getInfo:{},
            suixingrenyuanList:[],
            id:this.props.match.params.id,
            shenpizhuangtai:'',
            shenfenzhengzhaopians:[],
            zhenglianzhaopians:[],
            beifangwenrenxingming:'',
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
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "fangkexiangqing?id="+id,
            success : function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if (data.data["dengjishijian"] != null) {
                    data.data["dengjishijian"] = moment(data.data['dengjishijian']).format('YYYY-MM-DD HH:mm:ss');
                }
                for (let i = 0; i < data.data.fangkesuixingrenyuanList.length; i++) {
                    if (data.data.fangkesuixingrenyuanList[i]["chuyingshijian"] != null) {
                        data.data.fangkesuixingrenyuanList[i]["chuyingshijian"] = moment(data.data.fangkesuixingrenyuanList[i]['chuyingshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (data.data.fangkesuixingrenyuanList[i]["ruyingshijian"] != null) {
                        data.data.fangkesuixingrenyuanList[i]["ruyingshijian"] = moment(data.data.fangkesuixingrenyuanList[i]['ruyingshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                }
                THE.setState({
                    getInfo:data.data,
                    suixingrenyuanList:data.data.fangkesuixingrenyuanList,
                    shenpizhuangtai:data.data.fangwenpifu,
                    beifangwenrenxingming:data.data.beifangwenrenxingming,
                });
            }
        });
    }
    //审批通过
    tongguo(){
        const THE = this;
        let id=this.state.id;
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
                THE.getInfo();
            }
        });
    }

    //审批拒绝
    jujue(){
        const THE = this;
        let id=this.state.id;
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
                THE.getInfo();
            }
        });
    }
    //获取用户名
    getUser(){
        const user=sessionStorage.getItem('userName');
        this.setState({
            user:user,
        })
    }

    toDelete(id) {
        const THE = this;
        $.ajax({
            type: 'POST',
            url: SERVER + "shanchufangkebaimingdan?id="+id,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success('删除成功');
                THE.getInfo();
            }
        });
    }

    componentDidMount () {
        this.getInfo();
        this.getUser();
    }

    render() {
        let shenpi;

        if (this.state.shenpizhuangtai == "申请中"&&this.state.beifangwenrenxingming==this.state.user) {
            shenpi = (
                <div>
                    <Button type="primary" style={{marginTop: 20}} onClick={this.tongguo.bind(this)}>通过</Button>
                    <Button type="" style={{marginLeft: 10}} onClick={this.jujue.bind(this)}>拒绝</Button>
                </div>
            )
        } else if (this.state.shenpizhuangtai == "通过"&&this.state.beifangwenrenxingming==this.state.user) {
            shenpi = (
                <div>
                    <Button type="" style={{marginLeft: 10}} onClick={this.jujue.bind(this)}>拒绝</Button>
                </div>
            )
        }else{
            shenpi = (
                <div>
                </div>
            )
        }

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                colSpan: 0,
                className: 'hidden_col'
            },
            {
                title: '姓名',
                dataIndex: 'name'
            },
            {
                title: '照片',
                dataIndex: 'image',
                render: (text, record) => (
                    <span>
			    	<img src={record['image']} width="100px" height="100px"/>
			    </span>
                ),
            },
            {
                title: '入营时间',
                dataIndex: 'ruyingshijian'
            },
            {
                title: '出营时间',
                dataIndex: 'chuyingshijian'
            },
            {
                title: '下发状态',
                dataIndex: 'xiafazhuangtai'
            },{
                title: '操作',
                dataIndex: 'cz',
                render: (text, record, index) => {
                    if (record['xiafazhuangtai'] == "已下发") {
                        return (
                            <span>
                                 <Popconfirm placement="topLeft" title="确认要删除该人员?"
                                    onConfirm={this.toDelete.bind(this, record['id'])} okText="确认" cancelText="取消">
                                    <a>删除</a>
                                 </Popconfirm>
                            </span>
                        )
                    } else {
                          <span>
                         </span>
                    }
                }
            }]

        let info = this.state.getInfo;

        return (
            <div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>访客个人信息
                </p>
                <Tag id="myTag3">申请人姓名: {info['xingming']}</Tag>
                <Tag id="myTag3">申请时间: {info['dengjishijian']}</Tag>
                <Tag id="myTag3">审批状态: {info['fangwenpifu']}</Tag>
                <br/>
                <Tag id="myTag3">单位: {info['fangkedanwei']}</Tag>
                <Tag id="myTag3">电话号码: {info['dianhuahaoma']}</Tag>
                <Tag id="myTag3">随行车辆车牌: {info['suixingcepaihaohao']}</Tag>
                <Tag id="myTag3">被访问人姓名: {info['beifangwenrenxingming']}</Tag>
                <br/>
                <lable>访问理由：</lable>
                <div id="liyou">{info['yuanyin']}</div>
                <br/>
                <div>
                    <Row>
                       <Col span={6}>身份证照片：</Col>
                       <Col span={6}>正脸照片：</Col>
                    </Row>
                    <Row>
                        <Col span={6}><img src={info['shenfenzhengzhaopian']}style={{margin:10,width:200,height:200}}/></Col>
                        <Col span={6}><img src={info['xianchangzhaopian'] }style={{margin:10,width:200,height:200}}/></Col>
                    </Row>
                </div>
                <br/>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>随行人员
                </p>
                <Table
                    columns={columns}
                    dataSource={this.state.suixingrenyuanList}
                />
                <br/>
                {shenpi}
            </div>
        );
    }
}

const AppForm = Form.create()(App);
export default AppForm;
