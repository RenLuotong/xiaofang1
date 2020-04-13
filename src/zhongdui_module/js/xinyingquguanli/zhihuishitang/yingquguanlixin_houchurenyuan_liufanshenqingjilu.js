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
    Popover,
    TimePicker, Tag
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
            jiluList: [],
            startValue: null,
            endValue: null,
            start: null,
            end: null,
            visible: false,
            endOpen2: false,
            shenpizhuangtaiList: [],
            liufanleixingList:[],
            shezhishijian:''
        };
    }

    getshezhishijian() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tb-liufans/huoqushijianshezhi",
            success: function (data) {
                let shezhishijian = '';
                let zhongwukaishi = '';
                let zhongwujieshu = '';
                let wanshangkaishi = '';
                let wanshangjieshu = '';
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    if(data.data[i].configName === '留饭管理-留饭申请开始时间设置-晚上留饭'){
                        wanshangkaishi = data.data[i].configValue;
                    }
                    if(data.data[i].configName === '留饭管理-留饭申请结束时间设置-晚上留饭'){
                        wanshangjieshu = data.data[i].configValue;
                    }
                    if(data.data[i].configName === '留饭管理-留饭申请开始时间设置-中午留饭'){
                        zhongwukaishi = data.data[i].configValue;
                    }
                    if(data.data[i].configName === '留饭管理-留饭申请结束时间设置-中午留饭'){
                        zhongwujieshu = data.data[i].configValue;
                    }
                    shezhishijian = '午饭留饭时间(' +zhongwukaishi+ '-' + zhongwujieshu+ ')  晚饭留饭时间(' + wanshangkaishi + '-' +wanshangjieshu + ')';
                }
                THE.setState({
                    shezhishijian: shezhishijian,
                });
            }
        });
    }



    //设置时间限制
    getDisabledHours = () => {
        var hours = [];
        if (this.state.start !== null) {
            for (var i = 0; i < this.state.start.hour(); i++) {
                hours.push(i);
            }
        }
        return hours;
    }
    getDisabledMinutes = (selectedHour) => {
        var minutes= [];
        if (this.state.start !== null && selectedHour === this.state.start.hour()){
            for(var i =0; i < this.state.start.minute(); i++){
                minutes.push(i);
            }
        }
        return minutes;
    }
    getDisabledSeconds = (selectedHour,selectedMinute) => {
        var seconds= [];
        if (this.state.start !== null && selectedHour === this.state.start.hour() && selectedMinute === this.state.start.minute()){
            for(var i =0; i < this.state.start.second(); i++){
                seconds.push(i);
            }
        }
        return seconds;
    }
    handleStartOpenChange2 = (open2) => {
        if (!open2) {
            this.setState({ endOpen2: true });
        }
    }
    handleEndOpenChange2 = (open2) => {
        this.setState({ endOpen2: open2 });
    }

    onStart = (value) => {
        this.onChange('start', value);
    }
    onEnd = (value) => {
        this.onChange('end', value);
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

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    //获取留饭申请记录
    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        const THE = this;
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian= form.getFieldValue('jieshushijian');
        if (typeof (jieshushijian)=="undefined"||jieshushijian==null){
            jieshushijian="";
        } else {
            jieshushijian=moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let shenpizhuangtai = form.getFieldValue('shenpizhuangtai');
        if (typeof(shenpizhuangtai) == "undefined"|| shenpizhuangtai == '-1') {
            shenpizhuangtai = '';
        }
        let leixing = form.getFieldValue('leixing');
        if (typeof(leixing) == "undefined"|| leixing == '-1') {
            leixing = '';
        }
        let page = params.page - 1;
        let size = params.rows;
        $.ajax({
            type:'Get',
            url: SERVER + "tb-liufans/huoquliufanjilu?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian+"&shenpizhuangtai="+shenpizhuangtai+"&leixing="+leixing,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["shenqingshijian"] = moment(data.data.content[i]["shenqingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i]["liufanshijian"] = moment(data.data.content[i]["liufanshijian"]).format('YYYY-MM-DD');
                    if(data.data.content[i]["shenpizhuangtai"] == 'Shenqingzhong'){
                        data.data.content[i]["shenpizhuangtai"] = '申请中'
                    }else if(data.data.content[i]["shenpizhuangtai"] == 'Jiedan'){
                        data.data.content[i]["shenpizhuangtai"] = '接单'
                    }else if(data.data.content[i]["shenpizhuangtai"] == 'Jujue'){
                        data.data.content[i]["shenpizhuangtai"] = '拒绝'
                    }
                    if(data.data.content[i]["leixing"] == 'Zhongwu'){
                        data.data.content[i]["leixing"] = '中午留饭'
                    }else if(data.data.content[i]["leixing"] == 'Wanshang'){
                        data.data.content[i]["leixing"] = '晚上留饭'
                    }
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

    //获取审批状态
    getshenpizhuangtaiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tb-liufans/huoquliufanshenpizhuangtai",
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
                    shenpizhuangtaiList: list,
                });
            }
        });
    }

    //获取留饭类型
    getliufanleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tb-liufans/huoquliufanleixing",
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
                    liufanleixingList: list,
                });
            }
        });
    }

    //设置留饭时间
    shezhi() {
        this.setState({
            visible: true,
        })
    }


    //提交设置时间申请
    tijiao() {
        const THE=this;
        let form = this.props.form;
        let liufanleixing=form.getFieldValue('liufanleixing');
        if (typeof (liufanleixing) == "undefined"||liufanleixing=='') {
            message.error("请选择留饭类型！");return;
        }
        let shijianfanweikaishi=form.getFieldValue('shijianfanweikaishi');
        if (typeof(shijianfanweikaishi) == "undefined"||shijianfanweikaishi == null||shijianfanweikaishi == '') {
            message.error("请选择开始时间！");return;
        } else {
            shijianfanweikaishi = moment(shijianfanweikaishi).format('HH:mm');
        }
        let shijianfanweijieshu=form.getFieldValue('shijianfanweijieshu');
        if (typeof(shijianfanweijieshu) == "undefined"||shijianfanweijieshu == null||shijianfanweijieshu == '') {
            message.error("请选择结束时间！");return;
        } else {
            shijianfanweijieshu = moment(shijianfanweijieshu).format('HH:mm');
        }
        if (!confirm("确定设置留饭时间！")) {
            return;
        }
        $.ajax({
            type : 'POST',
            url : SERVER+"tb-liufans/shezhiliufanshijian?kaishishijian="+shijianfanweikaishi+"&jieshushijian="+shijianfanweijieshu+"&liufanliexing="+liufanleixing,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("设置留饭时间成功");
                THE.setState({
                    visible: false,
                });
                THE.props.form.setFieldsValue(
                    {
                        shijianfanweikaishi: '',
                        shijianfanweijieshu: '',
                        liufanleixing:'',
                    }
                );
                THE.fetch();
                THE.getshezhishijian();
            }
        });
    }


    //审批通过
    tongguo(id) {
        const THE = this;
        let shenpizhuangtai='接单';
        $.ajax({
            type:'POST',
            url: SERVER + "tb-liufans/shenpi?id="+id+"&zhuangtai="+shenpizhuangtai,
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
    jujue(id) {
        const THE = this;
        let shenpizhuangtai='拒绝';
        $.ajax({
            type:'POST',
            url: SERVER + "tb-liufans/shenpi?id="+id+"&zhuangtai="+shenpizhuangtai,
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

    componentDidMount() {
        this.fetch();
        this.getshenpizhuangtaiList();
        this.getliufanleixingList();
        this.getshezhishijian();
    }

    render() {
        let shenpizhuangtaiOptions = this.state.shenpizhuangtaiList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );
        let liufanleixingOptions = this.state.liufanleixingList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '申请时间',
            dataIndex: 'shenqingshijian',
        }, {
            title: '审批状态',
            dataIndex: 'shenpizhuangtai',
        }, {
            title: '留饭申请人',
            dataIndex: 'shenqingrenxingming',
        },{
            title: '留饭人数',
            dataIndex: 'liufanrenshu',
        }, {
            title: '留饭时间',
            dataIndex: 'liufanshijian',
        },{
            title: '留饭类型',
            dataIndex: 'leixing',
        }, {
            title: '留饭理由',
            dataIndex: 'liyou',
        },{
            title: '操作',
            dataIndex: 'cz',
            render: (text, record, index) => {
                if (record['shenpizhuangtai'] == "申请中") {
                    return (
                        <span>
					      	<Popconfirm placement="topLeft" title="确认要通过该留饭申请?" onConfirm={this.tongguo.bind(this,                                   record['id'])} okText="确认" cancelText="取消">
					        	<a>通过</a>
					    	</Popconfirm>
					    	<Divider type="vertical"/>
					    	<Popconfirm placement="topLeft" title="确认要拒绝该留饭申请?" onConfirm={this.jujue.bind(this,                                   record['id'])}  okText="确认" cancelText="取消">
					        	<a>拒绝</a>
					    	</Popconfirm>
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
        const { startValue, endValue,start, end, endOpen2} = this.state;

        return (
            <div>
                <Modal
                    title="设置时间"
                    visible={this.state.visible}
                    onOk={this.tijiao.bind(this)}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <FormItem label="留饭类型">
                        {getFieldDecorator('liufanleixing')(
                            <Select style={{width:200}}>
                                {liufanleixingOptions}
                            </Select>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="时间范围">
                        {getFieldDecorator('shijianfanweikaishi',{
                        })(
                            <TimePicker
                                showTime
                                format="HH:mm:ss"
                                value={start}
                                placeholder="开始时间"
                                onChange={this.onStart}
                                onOpenChange={this.handleStartOpenChange2}
                                style={{margin: 10, width: 200}}
                            />
                        )}
                        <a>---</a>
                        {getFieldDecorator('shijianfanweijieshu',{
                        })(
                            <TimePicker
                                disabledHours={this.getDisabledHours}
                                disabledMinutes={this.getDisabledMinutes}
                                disabledSeconds={this.getDisabledSeconds}
                                showTime
                                format="HH:mm:ss"
                                value={end}
                                placeholder="结束时间"
                                onChange={this.onEnd}
                                onOpenChange={this.handleEndOpenChange2}
                                open={endOpen2}
                                style={{margin: 10, width: 200}}
                            />
                        )}
                    </FormItem>
                </Modal>
                <Tag id="biaoti">{this.state.shezhishijian}</Tag>
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
                    <FormItem label="留饭类型">
                        {getFieldDecorator('leixing')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {liufanleixingOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="审批状态">
                        {getFieldDecorator('shenpizhuangtai')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                {shenpizhuangtaiOptions}
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
                        <Button type="primary" onClick={this.shezhi.bind(this)}>
                               <span>设置时间</span>
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.jiluList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
