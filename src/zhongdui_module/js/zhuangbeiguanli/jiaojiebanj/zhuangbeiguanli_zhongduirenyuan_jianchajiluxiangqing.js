import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import moment from 'moment';
import { message, Icon, Button, Table, Form, Input, Radio, Tabs,Select,Tag,Card} from 'antd';
import ReactEchartsCore from 'echarts-for-react/';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



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

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            echartInfo: {
                resultList: [],
                youwentishuliangList: [],
                wuwentishuliangList: [],
                pandianshulaingList: [],
                beiqincountList: [],
                jianchaList: [],
                weijianchaList: [],
                totalCount: 0,
                zhubeishuliangList: [],
                data : [
                    { value: 0, name: '检查数量' },
                    { value: 0, name: '未检查数量' },
                    { value: 0, name: '有问题数量' },
                ],
                data2 : [
                    { value: 0, name: '总数量' },
                ],baifenbiList:[]
            },
            y1:'5%',
            y2:'17%',
            barWidth:'90%',
            barWidth2:'45%',
            heighttemp: '1000px',
            pagination: {
                pageSize : 10,
                current : 1
            },
            pagination2: {
                pageSize : 10,
                current : 1
            },
            zhuangbeiList1: [],
            zhuangbeiList2: [],
            infoList1: [],
            infoList2: [],
            activeKey:"1",
            leixing: '',
            xinghao: '',
            leixingList: [],
            xinghaoList: [],
            renyuanList: [],
            renyuan: '',
            id: this.props.match.params.id,
            jianchaleixing: this.props.match.params.jianchaleixing,
        };
    }

    getrenyuanList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "zhongduiXiaofangyuans",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    renyuanList: list,
                });
            }
        });
    }

    search() {
        const pager = {...this.state.pagination};
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
        this.fetchzhiqinzhuangbei({
            rows: pager.pageSize,
            page: pager.current,
        });
    }

    search2() {
        const pager = {...this.state.pagination2};
        pager.current = 1;
        this.setState({
            pagination2: pager,
        });
        this.fetchkucunzhuangbei({
            rows: pager.pageSize,
            page: pager.current,
        });
    }

    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetchzhiqinzhuangbei({
            rows: pagination.pageSize,
            page: pagination.current,
        });
    }

    handleTableChange2 = (pagination) => {
        const pager = { ...this.state.pagination2 };
        pager.current = pagination.current;
        this.setState({
            pagination2: pager,
        });
        this.fetchkucunzhuangbei({
            rows: pagination.pageSize,
            page: pagination.current,
        });
    }

    fetchzhiqinjibenxinxi = () => {
        let jianchaJiluId = this.state.id;
        let juese = '中队长';
        let zhuangbeizhuangtai = '执勤';
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tbGerenfanghuJianchaPandianjibenxinxi?zhuangbeizhuangtai="+zhuangbeizhuangtai+"&juese="+juese+"&jianchaJiluId="+jianchaJiluId
                +"&sort=id,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if (data.data["jianchashuliang"] != null && data.data["kucunzhuangbeishuliang"] != null) {
                    data.data["jianchajindu"] = Math.round(data.data["jianchashuliang"] / data.data["kucunzhuangbeishuliang"] * 10000) / 100.00 + "%";
                }
                THE.setState({
                    infoList1: data.data,
                });
            }
        });
    }

    fetchzkucunjibenxinxi = () => {
        let jianchaJiluId = this.state.id;
        let juese = '中队长';
        let zhuangbeizhuangtai = '二级库存';
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tbGerenfanghuJianchaPandianjibenxinxi?zhuangbeizhuangtai="+zhuangbeizhuangtai+"&juese="+juese+"&jianchaJiluId="+jianchaJiluId
                +"&sort=id,desc",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if (data.data["jianchashuliang"] != null && data.data["kucunzhuangbeishuliang"] != null) {
                    data.data["jianchajindu"] = Math.round(data.data["jianchashuliang"] / data.data["kucunzhuangbeishuliang"] * 10000) / 100.00 + "%";
                }
                THE.setState({
                    infoList2: data.data,
                });
            }
        });
    }


    fetchzhiqinzhuangbei = (params = {
        rows: this.state.pagination.pageSize,
        page: this.state.pagination.current
    }) => {
        let jianchaJiluId = this.state.id;
        let form = this.props.form;
        let xingming = this.state.renyuan;
        if (xingming == "-1") {
            xingming = '';
        }
        let jianchazhuangtai = form.getFieldValue('jianchazhuangtai');
        if (typeof(jianchazhuangtai) == "undefined"||jianchazhuangtai == "-1") {
            jianchazhuangtai = '';
        }
        let youwuwenti = form.getFieldValue('youwuwenti');
        if (typeof(youwuwenti) == "undefined"||youwuwenti == "-1") {
            youwuwenti = '';
        }
        let juese = '中队长';
        let zhuangbeizhuangtai = '执勤';
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        $.ajax({
            type:'get',
            url: SERVER + "tbGerenfanghuZhuangbeiJianchaPandianList?zhuangbeizhuangtai="+zhuangbeizhuangtai+"&juese="+juese+"&jianchazhuangtai="+jianchazhuangtai+"&youwuwenti="+youwuwenti+"&jianchaJiluId="+jianchaJiluId+"&xingming="+xingming+"&page="+page+"&size="+size+"&sort=id,desc",
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
                    zhuangbeiList1: list,
                    pagination,
                });
            }
        });
    }


    fetchkucunzhuangbei = (params = {
        rows: this.state.pagination2.pageSize,
        page: this.state.pagination2.current
    }) => {
        let jianchaJiluId = this.state.id;
        let form = this.props.form;
        let leixing = this.state.leixing;
        if (leixing == "-1") {
            leixing = '';
        }
        let guigexinghao = this.state.xinghao;
        if (guigexinghao == "-1") {
            guigexinghao = '';
        }
        let juese = '中队长';
        let zhuangbeizhuangtai = '二级库存';
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
        let jianchazhuangtai = form.getFieldValue('jianchazhuangtai');
        if (typeof(jianchazhuangtai) == "undefined"||jianchazhuangtai == "-1") {
            jianchazhuangtai = '';
        }
        let youwuwenti = form.getFieldValue('youwuwenti');
        if (typeof(youwuwenti) == "undefined"||youwuwenti == "-1") {
            youwuwenti = '';
        }
        $.ajax({
            type:'get',
            url: SERVER + "tbGerenfanghuZhuangbeiJianchaPandianList?zhuangbeizhuangtai="+zhuangbeizhuangtai+"&juese="+juese+"&jianchazhuangtai="+jianchazhuangtai+"&youwuwenti="+youwuwenti+"&jianchaJiluId="+jianchaJiluId+"&zhuangbeileixingmingcheng="+leixing+"&guigexinghao="+guigexinghao+"&page="+page+"&size="+size+"&sort=jianchazhuangtai,desc"+"&koufenyuanyin,asc",
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
                const pagination2 = { ...THE.state.pagination2 };
                pagination2.total = data.data.totalElement;
                THE.setState({
                    zhuangbeiList2: list,
                    pagination2,
                });
            }
        });
    }


    getInfo() {
        const THE = this;
        let jianchaJiluId = this.state.id;
        $.ajax({
            type:'GET',
            url:SERVER+"zhuangbeijianchajiluTongjitu?juese=中队长&jianchaJiluId="+jianchaJiluId,
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                let echartInfo = THE.state.echartInfo;
                let resultList = [];
                for(let i = 0; i < data.data.resultList.length; i++) {
                    if(i>0){
                        resultList.push(data.data.resultList[i]);
                    }
                }
                echartInfo.resultList = resultList;
                if(data.data.resultList.length>12){
                    const beishu =  Math.round(data.data.resultList.length / 10);
                    const heighttemp = document.documentElement.clientHeight* beishu + 'px';
                    if(data.data.resultList.length>50){
                        THE.setState({
                            heighttemp: heighttemp,
                            y1:'3%',
                            y2:'8%',
                        })
                    }else{
                        const y1 = 15 - (3* beishu) + '%';
                        const y2 = 40 - (7.6* beishu) + '%';
                        THE.setState({
                            heighttemp: heighttemp,
                            y1:y1,
                            y2:y2,
                        })
                    }
                }else{
                    const a = document.documentElement.clientHeight+200 + 'px';
                    THE.setState({
                        heighttemp: a,
                        y1:'15%',
                        y2:'50%',
                        barWidth:60,
                        barWidth2:30,
                    })
                }
                let baifenbiList =[];
                for(let i = 0; i < data.data.baifenbiList.length; i++) {
                    if(i>0){
                        baifenbiList.push(data.data.baifenbiList[i]);
                    }else{
                        echartInfo.data[2].value = data.data.baifenbiList[i];
                    }
                }
                echartInfo.baifenbiList = baifenbiList;
                let youwentishuliangList = [];
                for(let i = 0; i < data.data.youwentishuliangList.length; i++) {
                        youwentishuliangList.push(data.data.youwentishuliangList[i]);
                }
                echartInfo.youwentishuliangList = youwentishuliangList;
                let jianchaList = [];
                let wuwentishuliangList = [];
                for(let i = 0; i < data.data.jianchaList.length; i++) {
                    if(i>0){
                        jianchaList.push(data.data.jianchaList[i]);
                        wuwentishuliangList.push(data.data.jianchaList[i] - data.data.youwentishuliangList[i]);
                    }else{
                        echartInfo.data[0].value = data.data.jianchaList[i];
                    }
                }
                echartInfo.jianchaList = jianchaList;
                let zhubeishuliangList = [];
                let weijianchaList = [];
                for(let i = 0; i < data.data.zhubeishuliangList.length; i++) {
                    if(i>0){
                        zhubeishuliangList.push(data.data.zhubeishuliangList[i]);
                        weijianchaList.push(data.data.zhubeishuliangList[i] - data.data.jianchaList[i]);
                    }else{
                        echartInfo.data[1].value = data.data.zhubeishuliangList[i] - data.data.jianchaList[i];
                        echartInfo.data2[0].value = data.data.zhubeishuliangList[i];
                    }
                }
                echartInfo.zhubeishuliangList = zhubeishuliangList;
                echartInfo.weijianchaList = weijianchaList;
                if(data.data.zhubeishuliangList !=='' && data.data.zhubeishuliangList!==null){
                    echartInfo.totalCount = data.data.zhubeishuliangList[0];
                }
                THE.setState({
                    echartInfo:echartInfo
                });
            }
        });
    }




    callback(key) {
        const THE = this;
        THE.setState({
            activeKey: key,
        });
    }

    getleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "zhuangbeileixingliebiao?zhuangbeileibiemingcheng=个人防护装备",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    leixingList: list,
                });
            }
        });
    }

    getXinghaoList(value) {
        let leibie = '个人防护装备';
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "queryguigexinghao?leixing="+value+"&leibie="+leibie,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    leixing: value,
                    xinghao: '',
                    xinghaoList: list,
                });
            }
        });
    }


    xinghaoChange(value) {
        this.setState({
            xinghao: value,
        });
    }

    renyuanChange(value) {
        this.setState({
            renyuan: value,
        });
    }


    componentDidMount() {
        this.getleixingList();
        this.fetchzhiqinzhuangbei();
        this.fetchkucunzhuangbei();
        this.fetchzhiqinjibenxinxi();
        this.fetchzkucunjibenxinxi();
        this.getInfo();
        this.getrenyuanList();
    }

    render() {

        let echartInfo = this.state.echartInfo;


        let legendData = [];
        for(var item in echartInfo.data){
            legendData.push(echartInfo.data[item].name);
        }


        let option = {
            title: {
                text: '总数',
                subtext: echartInfo.data2[0].value,
                x: '50%',
                y: this.state.y1,
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                data: legendData
            },
            color : ['#006600' , '#0000ff','#DDDDDD' ],
            series: [
                {
                    // name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', this.state.y2],
                    data: echartInfo.data,
                    itemStyle: {
                        normal:{
                            label:{
                                show: true,
                            },
                            labelLine :{show:true}
                        }
                    }
                }
            ]
        };

        let quanbuOption = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  [{
                type: 'value',
                axisLabel: {
                show: true,
                interval: 0,
                showMinLabel: true,
                formatter: '{value} %'
                },
                min:0,
                max: 100,
                splitNumber: 5
                }],
            yAxis:[ {
                splitNumber : 10,
                data: echartInfo.resultList,
                inverse:true,
            },
                {
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {show: false},
                    splitArea: {show: false},
                    splitLine: {show: false},
                    splitNumber : 10,
                    type: 'category',
                    data: echartInfo.resultList,
                    inverse:true,
                },
            ],
            color : ['#006600' , '#0000ff','#DDDDDD' ],
            series: [
                {
                    barMinHeight: 30,
                    name: '百分比',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            offset:['50', '80'],
                            show: true,
                            position: 'right',
                            formatter:'{c}%',
                            textStyle:{ color:'#000',fontSize: '30px' }
                        }
                    },
                    barWidth: this.state.barWidth,
                    data:  echartInfo.baifenbiList,
                },
                {
                    barMinHeight: 30,
                    name: '检查数量',
                    type: 'bar',
                    stack: '总量',
                    itemStyle:{
                        normal:{
                            color:'rgba(128, 128, 128, 0)'
                        }
                    },
                    data: echartInfo.jianchaList,
                },
                {

                    name: '未检查数量',
                    type: 'bar',
                    stack: '总量',
                    itemStyle:{
                        normal:{
                            color:'rgba(128, 128, 128, 0)'
                        }
                    },
                    data: echartInfo.weijianchaList,
                },
                {

                    name: '有问题数量',
                    type: 'bar',
                    stack: '总量',
                    itemStyle:{
                        normal:{
                            color:'rgba(128, 128, 128, 0)'
                        }
                    },
                    data: echartInfo.youwentishuliangList,
                },
                {
                    name: '装备总量',
                    type: 'bar',
                    stack: '总量',
                    itemStyle:{
                        normal:{
                            color:'rgba(128, 128, 128, 0)'
                        }
                    },
                    data: echartInfo.zhubeishuliangList,
                } 
            ]
        };

        let infoList1 = this.state.infoList1;
        let infoList2 = this.state.infoList2;

        let leixingOptions = this.state.leixingList.map(item =>
            <Select.Option key={item['key']} value={item['zhuangbeileixingmingcheng']}>{item['zhuangbeileixingmingcheng']}</Select.Option>
        );
        let renyuanOptions = this.state.renyuanList.map(item =>
            <Select.Option key={item['key']} value={item['xingming']}>{item['xingming']}</Select.Option>
        );
        let xinghaoOptions = this.state.xinghaoList.map(item =>
            <Select.Option key={item['key']} value={item['leixingzhi']}>{item['leixingzhi']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '消防员姓名',
            dataIndex: 'xingming',
        }, {
            title: '装备类型',
            dataIndex: 'zhuangbeileixingmingcheng',
        }, {
            title: '装备型号',
            dataIndex: 'guigexinghao',
        }, {
            title: '装备使用状态',
            dataIndex: 'zhuangbeishiyongzhuangtai',
        },{
            title: '检查状态',
            dataIndex: 'jianchazhuangtai',
        }, {
            title: '损坏原因',
            dataIndex: 'koufenyuanyin',
            render: (text, record) => (
                <div class="jianchajilutd">
                    {text}
                </div>
            ),
        } ];

        const columns2 = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '装备类型',
            dataIndex: 'zhuangbeileixingmingcheng',
        }, {
            title: '装备型号',
            dataIndex: 'guigexinghao',
        }, {
            title: '装备使用状态',
            dataIndex: 'zhuangbeishiyongzhuangtai',
        },{
            title: '使用状态',
            dataIndex: 'zhuangbeishiyongzhuangtai',
        },{
            title: '检查状态',
            dataIndex: 'jianchazhuangtai',
        }, {
            title: '损坏原因',
            dataIndex: 'koufenyuanyin',
            render: (text, record) => (
                <div class="jianchajilutd">
                    {text}
                </div>
            ),
        } ];

        const {getFieldDecorator} = this.props.form;
        const {leixing, xinghao,renyuan} = this.state;

        let stepList2;
        let jianchaleixing = this.state.jianchaleixing;

        if (jianchaleixing === "周清查") {
            stepList2 = (
                <div>
                    <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                        <Tabs.TabPane tab="消防员装备" key="1">
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>检查记录基本信息
                            </p>
                            <Tag id="myTag">检查时间 : {infoList1['jianchariqi']}</Tag>
                            <Tag id="myTag">检查类型 : {infoList1['jianchaleixing']}</Tag>
                            <Tag id="myTag">检查进度 : {infoList1['jianchajindu']}</Tag>
                            <Tag id="myTag">应检查数量 : {infoList1['kucunzhuangbeishuliang']}</Tag>
                            <Tag id="myTag">检查数量 : {infoList1['jianchashuliang']}</Tag>
                            <Tag id="myTag">有问题数量 : {infoList1['zhuangbeisunhuaishuliang']}</Tag>
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>检查消防员装备列表
                            </p>
                            <Form layout="inline" style={{margin: 5}}>
                                <FormItem label="姓名">
                                    <Select
                                        style={{width:200}}
                                        onChange={this.renyuanChange.bind(this)}
                                        value={renyuan}
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        <Select.Option value="-1">全部</Select.Option>
                                        {renyuanOptions}
                                    </Select>
                                </FormItem>
                                <FormItem label="检查状态">
                                    {getFieldDecorator('jianchazhuangtai',{initialValue: "-1"})(
                                        <Select style={{width:200}}>
                                            <Select.Option value="-1">全部</Select.Option>
                                            <Select.Option value="已检查">已检查</Select.Option>
                                            <Select.Option value="未检查">未检查</Select.Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label="有无问题">
                                    {getFieldDecorator('youwuwenti',{initialValue: "-1"})(
                                        <Select style={{width:200}}>
                                            <Select.Option value="-1">全部</Select.Option>
                                            <Select.Option value="有问题">有问题</Select.Option>
                                            <Select.Option value="没问题">没问题</Select.Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                                        <Icon type="search" />查询
                                    </Button>
                                </FormItem>
                            </Form>
                            <Table
                                columns={columns}
                                dataSource={this.state.zhuangbeiList1}
                                pagination={this.state.pagination}
                                onChange={this.handleTableChange}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="库存装备" key="2">
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>检查记录基本信息
                            </p>
                            <Tag id="myTag">检查时间 : {infoList2['jianchariqi']}</Tag>
                            <Tag id="myTag">检查类型 : {infoList2['jianchaleixing']}</Tag>
                            <Tag id="myTag">检查进度 : {infoList2['jianchajindu']}</Tag>
                            <Tag id="myTag">应检查数量 : {infoList2['kucunzhuangbeishuliang']}</Tag>
                            <Tag id="myTag">检查数量 : {infoList2['jianchashuliang']}</Tag>
                            <Tag id="myTag">有问题数量 : {infoList2['zhuangbeisunhuaishuliang']}</Tag>
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>检查库存装备列表
                            </p>
                            <Form layout="inline" style={{margin: 5}}>
                                <FormItem label="类型">
                                    <Select
                                        style={{width:200}}
                                        onChange={this.getXinghaoList.bind(this)}
                                        value={leixing}
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        <Select.Option value="-1">全部</Select.Option>
                                        {leixingOptions}
                                    </Select>
                                </FormItem>
                                <FormItem label="型号">
                                    <Select
                                        style={{width:200}}
                                        onChange={this.xinghaoChange.bind(this)}
                                        value={xinghao}
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        <Select.Option value="-1">全部</Select.Option>
                                        {xinghaoOptions}
                                    </Select>
                                </FormItem>
                                <FormItem label="检查状态">
                                    {getFieldDecorator('jianchazhuangtai',{initialValue: "-1"})(
                                        <Select style={{width:200}}>
                                            <Select.Option value="-1">全部</Select.Option>
                                            <Select.Option value="已检查">已检查</Select.Option>
                                            <Select.Option value="未检查">未检查</Select.Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label="有无问题">
                                    {getFieldDecorator('youwuwenti',{initialValue: "-1"})(
                                        <Select style={{width:200}}>
                                            <Select.Option value="-1">全部</Select.Option>
                                            <Select.Option value="有问题">有问题</Select.Option>
                                            <Select.Option value="没问题">没问题</Select.Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" onClick={this.search2.bind(this)}>
                                        <Icon type="search" />查询
                                    </Button>
                                </FormItem>
                            </Form>
                            <Table
                                columns={columns2}
                                dataSource={this.state.zhuangbeiList2}
                                pagination={this.state.pagination2}
                                onChange={this.handleTableChange2}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="检查装备统计图" key="3">
                            <Card
                                id="echartCard"
                                title="全部"
                                style={{ width: "50%",float:"left" }}
                            >
                                <ReactEchartsCore
                                    style={{height: this.state.heighttemp}}
                                    echarts={echarts}
                                    option={option}
                                />
                            </Card>
                            <Card
                                id="echartCard"
                                title="详情"
                                style={{ width: "50%",float:"right" }}
                            >
                                <ReactEchartsCore
                                    style={{height: this.state.heighttemp}}
                                    echarts={echarts}
                                    option={quanbuOption}
                                />
                            </Card>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            )
        } else{
            stepList2 = (
                <div>
                    <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                        <Tabs.TabPane tab="消防员装备" key="1">
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>检查记录基本信息
                            </p>
                            <Tag id="myTag">检查时间 : {infoList1['jianchariqi']}</Tag>
                            <Tag id="myTag">检查类型 : {infoList1['jianchaleixing']}</Tag>
                            <Tag id="myTag">检查进度 : {infoList1['jianchajindu']}</Tag>
                            <Tag id="myTag">应检查数量 : {infoList1['kucunzhuangbeishuliang']}</Tag>
                            <Tag id="myTag">检查数量 : {infoList1['jianchashuliang']}</Tag>
                            <Tag id="myTag">有问题数量 : {infoList1['zhuangbeisunhuaishuliang']}</Tag>
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>检查执勤装备列表
                            </p>
                            <Form layout="inline" style={{margin: 5}}>
                                <FormItem label="姓名">
                                    <Select
                                        style={{width:200}}
                                        onChange={this.renyuanChange.bind(this)}
                                        value={renyuan}
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        <Select.Option value="-1">全部</Select.Option>
                                        {renyuanOptions}
                                    </Select>
                                </FormItem>
                                <FormItem label="检查状态">
                                    {getFieldDecorator('jianchazhuangtai',{initialValue: "-1"})(
                                        <Select style={{width:200}}>
                                            <Select.Option value="-1">全部</Select.Option>
                                            <Select.Option value="已检查">已检查</Select.Option>
                                            <Select.Option value="未检查">未检查</Select.Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label="有无问题">
                                    {getFieldDecorator('youwuwenti',{initialValue: "-1"})(
                                        <Select style={{width:200}}>
                                            <Select.Option value="-1">全部</Select.Option>
                                            <Select.Option value="有问题">有问题</Select.Option>
                                            <Select.Option value="没问题">没问题</Select.Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                                        <Icon type="search" />查询
                                    </Button>
                                </FormItem>
                            </Form>
                            <Table
                                columns={columns}
                                dataSource={this.state.zhuangbeiList1}
                                pagination={this.state.pagination}
                                onChange={this.handleTableChange}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="检查装备统计图" key="2">
                            <Card
                                id="echartCard"
                                title="全部"
                                style={{ width: "50%",float:"left" }}
                            >
                                <ReactEchartsCore
                                    style={{height: this.state.heighttemp}}
                                    echarts={echarts}
                                    option={option}
                                />
                            </Card>
                            <Card
                                id="echartCard"
                                title="详情"
                                style={{ width: "50%",float:"right" }}
                            >
                                <ReactEchartsCore
                                    style={{height: this.state.heighttemp}}
                                    echarts={echarts}
                                    option={quanbuOption}
                                />
                            </Card>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            )
        }

        return (
            <div>
                {stepList2}
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
