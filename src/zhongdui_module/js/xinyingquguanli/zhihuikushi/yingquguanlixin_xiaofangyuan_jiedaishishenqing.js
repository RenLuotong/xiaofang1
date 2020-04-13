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
            visible: false,
            fangjianList: [],
            time: null,
            dangqiantime:new Date(),
            fangjianzhuangtaiList: [],
        };
    }

    getfangjianzhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqufangjianzhuangtaiMeiju",
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
                    fangjianzhuangtaiList: list,
                });
            }
        });
    }

    disabledTime = (time) => {
        const dangqiantime = this.state.dangqiantime;
        if (!time || !dangqiantime) {
            return false;
        }
        return time.valueOf() <= dangqiantime.valueOf();
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let fangjianmingcheng = form.getFieldValue('fangjianmingcheng');
        if (typeof(fangjianmingcheng) == "undefined") {
            fangjianmingcheng = "";
        }
        let fangjianzhuangtai = form.getFieldValue('fangjianzhuangtai');
        if (typeof(fangjianzhuangtai) == "undefined" || fangjianzhuangtai == '-1') {
            fangjianzhuangtai = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "huoquJiashujiedaishiFangjianLiebiao?page="+page+"&size="+size+"&fangjianmingcheng="+fangjianmingcheng+"&fangjianZhuangtai="+fangjianzhuangtai,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    if(data.data.content[i]["fangjianzhuangtai"] == 'KONGXIAN'){
                        data.data.content[i]["fangjianzhuangtai"] = '空闲'
                    }else if(data.data.content[i]["fangjianzhuangtai"] == 'SHIYONGZHONG'){
                        data.data.content[i]["fangjianzhuangtai"] = '使用中'
                    }else if(data.data.content[i]["fangjianzhuangtai"] == 'DAIDASAO'){
                        data.data.content[i]["fangjianzhuangtai"] = '待打扫'
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

    showModal = () => {
        this.setState({
            visible: true,
            liyou:'',

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

    //弹出单个申请框
    shenqing(id) {
        this.setState({
            id: id,
            visible: true,
        })
    }

    tijiaoshenqing() {
        const THE = this;
        let form = this.props.form;
        let fangjianId = THE.state.id;
        let jihuakaishishijian = form.getFieldValue('jihuakaishishijian');
        if (typeof(jihuakaishishijian) == "undefined"||jihuakaishishijian == null||jihuakaishishijian=='') {
            message.error("请输入使用时间！");return;
        } else {
            jihuakaishishijian = moment(jihuakaishishijian).format('YYYY-MM-DD HH:mm:ss');
        }
        let shiyongliyou = form.getFieldValue('shiyongliyou');
        if (typeof (shiyongliyou) == "undefined"||shiyongliyou=='') {
            message.error("请输入使用说明！");return;
        }
        if (!confirm("确定申请该接待室！")) {
            return;
        }
        let  tbFangjianShiyongPojo = {};
        tbFangjianShiyongPojo["fangjianId"] = fangjianId;
        tbFangjianShiyongPojo["jihuakaishishijian"] = jihuakaishishijian;
        tbFangjianShiyongPojo["shiyongshuoming"] = shiyongliyou;
        $.ajax({
            type:'post',
            url:SERVER+"shenqingshiyongJiashujiedaishifangjian",
            data : JSON.stringify(tbFangjianShiyongPojo),
            dataType : 'json',
            contentType : "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("申请成功");
                THE.setState({
                    visible: false,

                });
                THE.props.form.setFieldsValue(
                    {
                        jihuakaishishijian: '',
                        shiyongliyou: '',
                    }
                );
                THE.fetch();
            }
        });
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onTimeChange = (value) => {
        this.onChange('time', value);
    }

    componentDidMount() {
        this.fetch();
        this.getfangjianzhuangtaiList();
    }

    render() {
        let fangjianzhuangtaiOptions = this.state.fangjianzhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '房间名称',
            dataIndex: 'fangjianmingcheng',
        },{
            title: '房间状态',
            dataIndex: 'fangjianzhuangtai',
        }, {
            title: '房间描述',
            dataIndex: 'fangjianmiaoshu',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                if (record['fangjianzhuangtai'] == "空闲") {
                    return (
                        <span>
                           <a onClick={this.shenqing.bind(this,record['id'])}>申请</a>
                       </span>
                    )
                } else {
                    <span>
                    </span>
                }
            },
        }];


        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { time} = this.state;


        return (
            <div>
                <Modal
                    title="接待室使用申请"
                    visible={this.state.visible}
                    onOk={this.tijiaoshenqing.bind(this)}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <FormItem label="使用时间">
                        {getFieldDecorator('jihuakaishishijian')(
                            <DatePicker
                                disabledDate={this.disabledTime}
                                showTime
                                value={time}
                                placeholder="使用时间"
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={this.onTimeChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="使用理由">
                        {getFieldDecorator('shiyongliyou')(
                            <TextArea autosize={{minRows:3}}  style={{width:500}}/>
                        )}
                    </FormItem>
                </Modal>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="房间名称">
                        {getFieldDecorator('fangjianmingcheng',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="房间状态">
                        {getFieldDecorator('fangjianzhuangtai',)(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {fangjianzhuangtaiOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.fangjianList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
