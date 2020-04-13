import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {
    Icon,
    Button,
    Table,
    Divider,
    Popconfirm,
    message, DatePicker, Form, Input, Modal, TimePicker, Select, Statistic, Tooltip, Tag
} from 'antd';
import moment from "moment";
import XLSX from "xlsx";
const { TextArea } = Input;
import yingquguanlixin_zhongdui_shoujiguankongshijianshezhi from './yingquguanlixin_zhongdui_shoujiguankongshijianshezhi';
import yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan from './yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan';

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
        };
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongdui_shoujiguankongshijianshezhi'} component = {yingquguanlixin_zhongdui_shoujiguankongshijianshezhi} />
                    <Route path = {this.props.match.path +'/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan'} component = {yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan} />
                </Switch>
            </div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize : 10,
                current : 1
            },
            jiluList: [],
            startValue: null,
            endValue: null,
            endOpen2: false,
            visible: false,
            start: null,
            end: null,
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
                let kaishi = '';
                let jieshu = '';
                let zhouci = '';
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    if(data.data[i].configName === '手机管控周次'){
                        zhouci = data.data[i].configValueList.join(',');
                    }
                    if(data.data[i].configName === '手机管控时间范围开始'){
                        kaishi = data.data[i].configValue;
                    }
                    if(data.data[i].configName === '手机管控时间范围截止'){
                        jieshu = data.data[i].configValue;
                    }
                    shezhishijian = '周次:' +zhouci+ '  开始时间:' + kaishi + '  结束时间:' +jieshu;
                }
                THE.setState({
                    shezhishijian: shezhishijian,
                });
            }
        });
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
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            jieshushijian = '';
        }  else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "shoujiguankong/zhongduiShoujigaojing?page="+page+"&size="+size+"&kaishishijian="+kaishishijian+"&jieshushijian="+jieshushijian,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["gaojingshijian"] = moment(data.data.content[i]["gaojingshijian"]).format('YYYY-MM-DD HH:mm:ss');
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

    //设置手机管控时间
    shezhi() {
        this.setState({
            visible: true,
        })
    }
    tijiao(){
        const THE=this;
        let form = this.props.form;
        let zhouci=form.getFieldValue('zhouci');
        if (typeof (zhouci)=="undefined"||zhouci == null||zhouci == ""){
            message.error("请选择周次！");return;
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
        if (!confirm("确定设置手机管控时间！")) {
            return;
        }
        $.ajax({
            type : 'POST',
            url : SERVER+"shoujiguankong/shezhiGuankongShijian?kaishishijian="+shijianfanweikaishi+"&jieshushijian="+shijianfanweijieshu+"&zhouci="+zhouci+"&sort=gaojingshijian,desc",
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("设置手机管控时间成功");
                THE.setState({
                    visible: false,
                });
                THE.props.form.setFieldsValue(
                    {
                        zhouci:[],
                        shijianfanweikaishi: '',
                        shijianfanweijieshu: '',
                    }
                );
                THE.fetch();
                THE.getshezhishijian();
            }
        });
    }
    componentDidMount() {
        this.fetch();
        this.getshezhishijian();
    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col'
        },{
            title: '设备ID',
            dataIndex: 'devId',
        },{
            title: '设备名称',
            dataIndex: 'name',
        },{
            title: '区域名称',
            dataIndex: 'roomName',
        },{
            title: '告警时间',
            dataIndex: 'gaojingshijian',
        }];

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue,start,end,endOpen2} = this.state;

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
                    <br/>
                    <FormItem label="周次">
                        {getFieldDecorator('zhouci',)(
                            <Select style={{margin:10,width:400}} mode="multiple">
                                <Select.Option value="MONDAY">周一</Select.Option>
                                <Select.Option value="TUESDAY">周二</Select.Option>
                                <Select.Option value="WEDNESDAY">周三</Select.Option>
                                <Select.Option value="THURSDAY">周四</Select.Option>
                                <Select.Option value="FRIDAY">周五</Select.Option>
                                <Select.Option value="SATURDAY">周六</Select.Option>
                                <Select.Option value="SUNDAY">周日</Select.Option>
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
                {/*<Tag id="biaoti">管控时间:({this.state.shezhishijian})</Tag>*/}
                {/*<br/>*/}
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
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
                    <FormItem>
                        <Button type="primary" onClick={this.search.bind(this)}>
                            <Icon type="search"/>查询
                        </Button>
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button type="primary">
                            <Link to={this.props.match.url+'/yingquguanlixin_zhongdui_shoujiguankongshijianshezhi'}>
                                <span>新增手机管控时间</span>
                            </Link>
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary">
                            <Link to={this.props.match.url+'/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan'}>
                                <span>手机管控时间查看</span>
                            </Link>
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