import React from 'react';
import {Button, DatePicker, Divider, Form, Icon, message, Modal, Popconfirm, Select, Table, Tag} from "antd";
import {Link} from "react-router-dom";

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            shebeibianhao:this.props.match.params.shebeibianhao,
            id:this.props.match.params.id,
            getInfo:{},
            fileList: [],
            pagination: {
                pageSize : 10,
                current : 1
            },
            renyuanList: [],
            visible: false,
            renyuansList: [],
        };
    }

    renyuanList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "renyuankaoiqnjiluliebao?page=0&size=10000",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++){
                    data.data.content[i]["key"] = i;
                    list.push(data.data.content[i]);
                }
                THE.setState({
                    renyuansList: list,
                });
            }
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
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

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER+"shebeixinxi?id="+id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    getInfo: data.data,
                    fileList: [{
                        uid: 0,
                        name: 'a.png',
                        status: 'done',
                        url: data.data['shebeizhaopian'],
                        response: data.data['shebeizhaopian'],
                    }],
                });
            }
        });
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let page = params.page - 1;
        let size = params.rows;
        let shebeibianhao = THE.state.shebeibianhao;
        $.ajax({
            type:'post',
            url: SERVER + "kaoqinjibaimingdanrenyuanLiebiao?kaoqinjibianhao="+shebeibianhao+"&page="+page+ "&size="+size,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    renyuanList: data.data.content,
                    pagination,
                });
            }
        });
    }

    toDelete(renyuanbianhao) {
        const THE = this;
        let shebeibianhao = THE.state.shebeibianhao;
        $.ajax({
            type: 'POST',
            url: SERVER + "shanchuKaoqinjibaimingdanrenyuan?renyuanbianhao="+renyuanbianhao+"&kaoqinjibianhao="+shebeibianhao,
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

    tianjiarenyuan(id) {
        const THE = this;
        let form = this.props.form;
        let shebeibianhao = THE.state.shebeibianhao;
        let renyuan = form.getFieldValue('renyuan');
        if (typeof(renyuan) == "undefined" || renyuan == null || renyuan == '') {
            message.warning("请选择人员");
            return;
        }
        if (!confirm("确定添加人员")) {
            return;
        }
        $.ajax({
            type: 'POST',
            url: SERVER + "tianjiaKaoqinjibaimingdanrenyuan?kaoqinjibianhao="+shebeibianhao+"&renyuanbianhao="+renyuan,
            success: function (data) {
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("添加成功");
                THE.setState({
                    visible: false,

                });
                THE.props.form.setFieldsValue(
                    {
                        renyuan: '',
                    }
                );
                THE.fetch();
            }
        });
    }

    componentDidMount () {
        this.getInfo();
        this.fetch();
        this.renyuanList();
    }

    render() {

        let renyuanList = this.state.renyuansList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>);

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col'
        },  {
            title: '组织机构',
            dataIndex: 'jigoumingcheng',
        },{
            title: '人员姓名',
            dataIndex: 'xingming',
        },{
            title: '是否使用人脸',
            dataIndex: 'shifoudhiyongrenlian',
        },{
            title: '是否录入指纹',
            dataIndex: 'shifoushiyongzhiwen',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
			      	<Popconfirm
                        placement="topLeft"
                        title="确认要删除该人员?"
                        onConfirm={this.toDelete.bind(this, record['renyuanbianhao'])}
                        okText="确认"
                        cancelText="取消"
                    >
			        	<a>删除</a>
			    	</Popconfirm>
			    </span>
            ),
        },];

        let imgs = this.state.fileList.map(item =>
            <img src={item['url']}  style={{margin:10,width:300,height:300}}/>
        );

        let shbeitupian;
        shbeitupian = (
            <div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>指纹识别设备图片
                </p>
                {imgs}
            </div>
        )

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        let info = this.state.getInfo;
        return (
            <div>
                <Modal
                    title="添加人员"
                    visible={this.state.visible}
                    onOk={this.tianjiarenyuan.bind(this)}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <FormItem label="人员列表">
                        <span style={{fontSize: 1}}>(当前营区所有在职人员)</span>
                        {getFieldDecorator('renyuan')(
                            <Select style={{width:350}}>
                                {renyuanList}
                            </Select>
                        )}
                    </FormItem>
                </Modal>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>指纹识别设备基本信息
                </p>
                <Tag id="myTag">设备序列号: {info['shebeixuliehao']}</Tag>
                <Tag id="myTag">设备地点: {info['weizhi']}</Tag>
                <Tag id="myTag">设备用途: {info['yongtu']}</Tag>
                <Tag id="myTag">局域网IP: {info['juyuwangip']}</Tag>
                <Tag id="myTag">局域网端口: {info['juyuwangduankou']}</Tag>
                <Tag id="myTag">账号: {info['zhanghao']}</Tag>
                <Tag id="myTag">密码: {info['mima']}</Tag>
                {shbeitupian}
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>指纹识别设备白名单
                </p>
                <Button type="primary" onClick={this.showModal.bind(this)}>添加人员</Button>
                <Table
                    columns={columns}
                    dataSource={this.state.renyuanList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppForm = Form.create()(App);
export default AppForm;
