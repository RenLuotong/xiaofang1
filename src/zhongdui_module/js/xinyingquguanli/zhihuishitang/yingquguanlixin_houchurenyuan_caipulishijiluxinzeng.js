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
    Popover,
    Tag,
    Card,
    InputNumber
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
            xuancaiList: [],
            xianshinianfen:'',
            xianshizhouci:'',
            nianfen:'',
            zhouci:'',
            maxzhouci:100,
            dangqiannian:2020,
            startTime:'',
            endTime:'',
            caipinList: [],
            pagination: {
                pageSize : 5,
                current : 1
            },
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

    search() {
        let nianfen =  this.state.xianshinianfen;
        if (!nianfen) {
            message.error("请输入年份！");return;
        }
        let zhouci =  this.state.xianshizhouci;
        if (!zhouci) {
            message.error("请输入周次！");return;
        }
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
            nianfen: nianfen,
            zhouci: zhouci,
        });
        this.fetch({
            rows: pager.pageSize,
            page: pager.current,
        });
    }

    //获取下周候选菜谱中的菜品list
    getcaipinList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tb-caipins/getAllTbCaipins?page=0&size=10000",
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
                THE.setState({
                    caipinList: list,
                });
            }
        });
    }

    //获取下周时间
    huoqushijian(){
        const THE = this;
        $.ajax({
            type:'post',
            url: SERVER + "tb-zhouhouxuan-zhubiaos/chushihuaShijian",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    nianfen: data.data.nianfen,
                    zhouci: data.data.zhouci,
                    xianshinianfen: data.data.nianfen,
                    xianshizhouci: data.data.zhouci,
                    startTime: data.data.startTime,
                    endTime: data.data.endTime,
                });
            }
        });
        THE.fetch();
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let nianfen = THE.state.xianshinianfen;
        let zhouci = THE.state.xianshizhouci;
        // let form = this.props.form;
        // let caipinmingcheng = form.getFieldValue('caipinmingcheng');
        // if (typeof(caipinmingcheng) == "undefined") {
        //     caipinmingcheng = "";
        // }
        // let caipinleixing = form.getFieldValue('caipinleixing');
        // if (typeof(caipinleixing) == "undefined" || caipinleixing == '-1') {
        //     caipinleixing = "";
        // }
        let page = params.page - 1;
        let size = params.rows;
        if(!zhouci){
        $.ajax({
            type:'post',
            url: SERVER + "tb-zhouhouxuan-zhubiaos/chushihuaShijian",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    dangqiannian: data.data.nianfen,
                    nianfen: data.data.nianfen,
                    zhouci: data.data.zhouci,
                    startTime: data.data.startTime,
                    endTime: data.data.endTime,
                });
                let nianfen = data.data.nianfen;
                let zhouci = data.data.zhouci;
                $.ajax({
                    type: 'get',
                    url: SERVER + "tb-zhoucaipus/getWeekCount?nianfen="+nianfen,
                    success: function (data) {
                        if (data.status != 0) {
                            message.warning(data.message);
                            return;
                        }
                        THE.setState({
                            maxzhouci: data.data,
                        });
                    }
                });
                $.ajax({
                    type:'get',
                    url: SERVER + "tb-diancaitongji-mingxis/huoqumingxiByZhouci?zhouci="+zhouci+"&nianfen="+nianfen+"&page="+page+"&size="+size,
                    success: function (data) {
                        let list = [];
                        if (data.status != 0) {
                            const pagination = { ...THE.state.pagination };
                            pagination.total = 0;
                            THE.setState({
                                xuancaiList: [],
                                pagination,
                            });
                            message.warning(data.message);
                            return;
                        }
                        for (let i = 0; i < data.data.content.length; i++) {
                            data.data.content[i]["key"] = i;
                            if(data.data.content[i]["caipinleixing"] == 'Huncai'){
                                data.data.content[i]["caipinleixing"] = '荤菜'
                            }else if(data.data.content[i]["caipinleixing"] == 'Sucai'){
                                data.data.content[i]["caipinleixing"] = '素菜'
                            }else if(data.data.content[i]["caipinleixing"] == 'Daguocai'){
                                data.data.content[i]["caipinleixing"] = '大锅菜'
                            }
                            list.push(data.data.content[i]);
                        }
                        const pagination = { ...THE.state.pagination };
                        pagination.total = data.data.totalElement;
                        THE.setState({
                            xuancaiList: list,
                            pagination,
                        });
                    }
                });
            }
        });
        }else{
            $.ajax({
                type: 'post',
                url: SERVER + "tb-zhouhouxuan-zhubiaos/chushihuaShijian?zhouci="+zhouci+"&nianfen="+nianfen,
                success: function (data) {
                    if (data.status != 0) {
                        message.warning(data.message);
                        return;
                    }
                    THE.setState({
                        startTime: data.data.startTime,
                        endTime: data.data.endTime,
                    });
                }
            });
            $.ajax({
                type:'get',
                url: SERVER + "tb-diancaitongji-mingxis/huoqumingxiByZhouci?zhouci="+zhouci+"&nianfen="+nianfen+"&page="+page+"&size="+size,
                success: function (data) {
                    let list = [];
                    if (data.status != 0) {
                        const pagination = { ...THE.state.pagination };
                        pagination.total = 0;
                        THE.setState({
                            xuancaiList: [],
                            pagination
                        });
                        message.warning(data.message);
                        return;
                    }
                    for (let i = 0; i < data.data.content.length; i++) {
                        data.data.content[i]["key"] = i;
                        if(data.data.content[i]["caipinleixing"] == 'Huncai'){
                            data.data.content[i]["caipinleixing"] = '荤菜'
                        }else if(data.data.content[i]["caipinleixing"] == 'Sucai'){
                            data.data.content[i]["caipinleixing"] = '素菜'
                        }else if(data.data.content[i]["caipinleixing"] == 'Daguocai'){
                            data.data.content[i]["caipinleixing"] = '大锅菜'
                        }
                        list.push(data.data.content[i]);
                    }
                    const pagination = { ...THE.state.pagination };
                    pagination.total = data.data.totalElement;
                    THE.setState({
                        xuancaiList: list,
                        pagination,
                    });
                }
            });
        }
    }


    //给下拉框赋值
    zhouyizaofan = []
    zhouyizaofanChang(value) {
        this.zhouyizaofan = value;
    }
    zhouyiwufan = []
    zhouyiwufanChang(value) {
        this.zhouyiwufan = value;
    }
    zhouyiwanfan = []
    zhouyiwanfanChang(value) {
        this.zhouyiwanfan = value;
    }

    zhouerzaofan=[]
    zhouerzaofanChang(value) {
        this.zhouerzaofan = value;
        console.log(value)
    }
    zhouerwufan = []
    zhouerwufanChang(value) {
        this.zhouerwufan = value;
    }
    zhouerwanfan = []
    zhouerwanfanChang(value) {
        this.zhouerwanfan = value;
    }

    zhousanzaofan=[]
    zhousanzaofanChang(value) {
        this.zhousanzaofan = value;
    }
    zhousanwufan = []
    zhousanwufanChang(value) {
        this.zhousanwufan = value;
    }
    zhousanwanfan = []
    zhousanwanfanChang(value) {
        this.zhousanwanfan = value;
    }

    zhousizaofan=[]
    zhousizaofanChang(value) {
        this.zhousizaofan = value;
    }
    zhousiwufan = []
    zhousiwufanChang(value) {
        this.zhousiwufan = value;
    }
    zhousiwanfan = []
    zhousiwanfanChang(value) {
        this.zhousiwanfan = value;
    }

    zhouwuzaofan=[]
    zhouwuzaofanChang(value) {
        this.zhouwuzaofan = value;
    }
    zhouwuwufan = []
    zhouwuwufanChang(value) {
        this.zhouwuwufan = value;
    }
    zhouwuwanfan = []
    zhouwuwanfanChang(value) {
        this.zhouwuwanfan = value;
    }

    zhouliuzaofan=[]
    zhouliuzaofanChang(value) {
        this.zhouliuzaofan = value;
    }
    zhouliuwufan = []
    zhouliuwufanChang(value) {
        this.zhouliuwufan = value;
    }
    zhouliuwanfan = []
    zhouliuwanfanChang(value) {
        this.zhouliuwanfan = value;
    }

    zhourizaofan=[]
    zhourizaofanChang(value) {
        this.zhourizaofan = value;
    }
    zhouriwufan = []
    zhouriwufanChang(value) {
        this.zhouriwufan = value;
    }
    zhouriwanfan = []
    zhouriwanfanChang(value) {
        this.zhouriwanfan = value;
    }


    //创建菜谱申请
    toCreate() {
        const THE = this;
        let nianfen = THE.state.xianshinianfen;
        let zhouci = THE.state.xianshizhouci;
        let zhouyizao = this.zhouyizaofan;
        if (zhouyizao == "") {
            message.error("请选择周一早餐的菜品！");return;
        }
        let zhouyiwu=this.zhouyiwufan;
        if (zhouyiwu == "") {
            message.error("请选择周一午餐的菜品！");return;
        }
        let zhouyiwan=this.zhouyiwanfan;
        if (zhouyiwan == "") {
            message.error("请选择周一晚餐的菜品！");return;
        }
        let zhouerzao=this.zhouerzaofan;
        if (zhouerzao == "") {
            message.error("请选择周二早餐的菜品！");return;
        }
        let zhouerwu=this.zhouerwufan;
        if (zhouerwu == "") {
            message.error("请选择周二午餐的菜品！");return;
        }
        let zhouerwan=this.zhouerwanfan;
        if (zhouerwan == "") {
            message.error("请选择周二晚餐的菜品！");return;
        }
        let zhousanzao=this.zhousanzaofan;
        if (zhousanzao == "") {
            message.error("请选择周三早餐的菜品！");return;
        }
        let zhousanwu=this.zhousanwufan;
        if (zhousanwu == "") {
            message.error("请选择周三午餐的菜品！");return;
        }
        let zhousanwan=this.zhousanwanfan;
        if (zhousanwan == "") {
            message.error("请选择周三晚餐的菜品！");return;
        }
        let zhousizao=this.zhousizaofan;
        if (zhousizao == "") {
            message.error("请选择周四早餐的菜品！");return;
        }
        let zhousiwu=this.zhousiwufan;
        if (zhousiwu == "") {
            message.error("请选择周四午餐的菜品！");return;
        }
        let zhousiwan=this.zhousiwanfan;
        if (zhousiwan == "") {
            message.error("请选择周四晚餐的菜品！");return;
        }
        let zhouwuzao=this.zhouwuzaofan;
        if (zhouwuzao == "") {
            message.error("请选择周五早餐的菜品！");return;
        }
        let zhouwuwu=this.zhouwuwufan;
        if (zhouwuwu == "") {
            message.error("请选择周五午餐的菜品！");return;
        }
        let zhouwuwan=this.zhouwuwanfan;
        if (zhouwuwan == "") {
            message.error("请选择周五晚餐的菜品！");return;
        }
        let zhouliuzao=this.zhouliuzaofan;
        if (zhouliuzao == "") {
            message.error("请选择周六早餐的菜品！");return;
        }
        let zhouliuwu=this.zhouliuwufan;
        if (zhouliuwu == "") {
            message.error("请选择周六午餐的菜品！");return;
        }
        let zhouliuwan=this.zhouliuwanfan;
        if (zhouliuwan == "") {
            message.error("请选择周六晚餐的菜品！");return;
        }
        let zhourizao=this.zhourizaofan;
        if (zhourizao == "") {
            message.error("请选择周日早餐的菜品！");return;
        }
        let zhouriwu=this.zhouriwufan;
        if (zhouriwu == "") {
            message.error("请选择周日午餐的菜品！");return;
        }
        let zhouriwan=this.zhouriwanfan;
        if (zhouriwan == "") {
            message.error("请选择周日晚餐的菜品！");return;
        }

        if (!confirm("确定新增此菜谱！")) {
            return;
        }
        let zhoucaipuAO = {};
        zhoucaipuAO["zhouyizao"] = zhouyizao;
        zhoucaipuAO["zhouyiwu"] = zhouyiwu;
        zhoucaipuAO["zhouyiwan"] = zhouyiwan;
        zhoucaipuAO["zhouerzao"] = zhouerzao;
        zhoucaipuAO["zhouerwu"] = zhouerwu;
        zhoucaipuAO["zhouerwan"] = zhouerwan;
        zhoucaipuAO["zhousanzao"] = zhousanzao;
        zhoucaipuAO["zhousanwu"] = zhousanwu;
        zhoucaipuAO["zhousanwan"] = zhousanwan;
        zhoucaipuAO["zhousizao"] = zhousizao;
        zhoucaipuAO["zhousiwu"] = zhousiwu;
        zhoucaipuAO["zhousiwan"] = zhousiwan;
        zhoucaipuAO["zhouwuzao"] = zhouwuzao;
        zhoucaipuAO["zhouwuwu"] = zhouwuwu;
        zhoucaipuAO["zhouwuwan"] = zhouwuwan;
        zhoucaipuAO["zhouliuzao"] = zhouliuzao;
        zhoucaipuAO["zhouliuwu"] = zhouliuwu;
        zhoucaipuAO["zhouliuwan"] = zhouliuwan;
        zhoucaipuAO["zhourizao"] = zhourizao;
        zhoucaipuAO["zhouriwu"] = zhouriwu;
        zhoucaipuAO["zhouriwan"] = zhouriwan;

        zhoucaipuAO["nianfen"] = nianfen;
        zhoucaipuAO["zhouci"] = zhouci;

        $.ajax({
            type:'post',
            url:SERVER+"tb-zhoucaipus/create",
            data : JSON.stringify(zhoucaipuAO),
            dataType : 'json',
            contentType : "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("添加成功");
                THE.backPage();
            }
        });
    }

    nianfenChange(value) {
        this.setState({
            xianshinianfen : value
        });
    }
    zhouciChange(value) {
        this.setState({
            xianshizhouci : value
        });
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhongduiganbu_caipujilu";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zhongduiganbu_caipujilu";
        }else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zhongduiganbu_caipujilu";
        }
    }

    componentWillMount(){
        this.huoqushijian();
    }

    componentDidMount() {
        this.getcaipinList();
    }

    render() {

        let caipinOptions = this.state.caipinList.map(item =>
            <Select.Option key={item['key']} value={item['id']}>{item['mingcheng']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        },{
            title: '菜品',
            dataIndex: 'caipinmingcheng',
        },{
            title: '菜品类型',
            dataIndex: 'caipinleixing',
        },  {
            title: '点击量',
            dataIndex: 'caipindianxuancishu',
        }];

        const { nianfen, zhouci, startTime, endTime, xianshinianfen, xianshizhouci,maxzhouci,dangqiannian} = this.state;

        return (
            <div layout="inline">
                <label>年份:</label>
                <InputNumber style={{margin:10,width:200}} name="nianfen" value={xianshinianfen} min={dangqiannian-10} max={+dangqiannian+10} onChange={this.nianfenChange.bind(this)}/>
                <label>周次:</label>
                <InputNumber style={{margin:10,width:200}} name="zhouci" value={xianshizhouci} min={1} max={maxzhouci} onChange={this.zhouciChange.bind(this)}/>
                <Button type="primary" onClick={this.search.bind(this)}>设置</Button>
                <br/>
                <Tag id="biaoti">本周选菜统计</Tag>
                <Table
                    columns={columns}
                    dataSource={this.state.xuancaiList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
                <Tag id="biaoti">{nianfen}年{zhouci}周  时间段：{startTime}--{endTime}</Tag>
                <Card title="周一" bordered={false}>
                    <label>早餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouyizaofanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>午餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouyiwufanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>晚餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouyiwanfanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                </Card>
                <Card title="周二" bordered={false}>
                    <label>早餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouerzaofanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>午餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouerwufanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>晚餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouerwanfanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                </Card>
                <Card title="周三" bordered={false}>
                    <label>早餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhousanzaofanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>午餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhousanwufanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>晚餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhousanwanfanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                </Card>
                <Card title="周四" bordered={false}>
                    <label>早餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhousizaofanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>午餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhousiwufanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>晚餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhousiwanfanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                </Card>
                <Card title="周五" bordered={false}>
                    <label>早餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouwuzaofanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>午餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouwuwufanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>晚餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouwuwanfanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                </Card>
                <Card title="周六" bordered={false}>
                    <label>早餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouliuzaofanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>午餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouliuwufanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>晚餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouliuwanfanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                </Card>
                <Card title="周日" bordered={false}>
                    <label>早餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhourizaofanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>午餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouriwufanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                    <label>晚餐:</label>
                    <Select style={{margin:10,width:'25%'}} mode="multiple" onChange={this.zhouriwanfanChang.bind(this)}>
                        {caipinOptions}
                    </Select>
                </Card>
                <br/>
                <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
