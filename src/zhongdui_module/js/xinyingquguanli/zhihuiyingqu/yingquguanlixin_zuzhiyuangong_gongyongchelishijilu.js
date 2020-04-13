import React, {Component} from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import XLSX from 'xlsx';
import {
    DatePicker,
    Icon,
    Input,
    Form,
    Button,
    Table,
    message, Select, Divider, Popconfirm, Modal, Tabs
} from 'antd';
import {Link, Route, Switch} from "react-router-dom";
import yingquguanlixin_zuzhiyuangong_gongyongchelishijiluxinzeng
    from "./yingquguanlixin_zuzhiyuangong_gongyongchelishijiluxinzeng";
import ZDJL from "./yingquguanlixin_zhongduiganbu_gongyongchelishijilu";
import yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing
    from './yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing';
import yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang
    from './yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang';
import Yzjl from "./yingquguanlixin_cheliangguanliyuan_yongchelishijilu";;
import ZDYzjl from "./yingquguanlixin_zhiduicheliangguanliyuan_yongchelishijilu";;
const View = [];

class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={this.props.match.path} component={AppComp}/>
                    <Route path={this.props.match.path + '/yingquguanlixin_zuzhiyuangong_gongyongchelishijiluxinzeng/'}
                           component={yingquguanlixin_zuzhiyuangong_gongyongchelishijiluxinzeng}/>
                    <Route
                        path={this.props.match.path + '/yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing/:chepaihaoma/:paichekaishishijian/:paichejieshushijian'}
                        component={yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing}/>
                    <Route
                        path={this.props.match.path + '/yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang/:processInstanceId'}
                        component={yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang}/>
                    <Route
                        path={this.props.match.path + '/yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing/:chepaihaoma/:paichekaishishijian/:paichejieshushijian'}
                        component={yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing}/>
                    <Route
                        path={this.props.match.path + '/yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang/:processInstanceId'}
                        component={yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang}/>
                </Switch>
            </div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            pagination: {
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            jiluList: [],
            shidouchaoqiList: [],
            shenpiList: [],
            shenpi: '',
            visible:false,
            shenpirenyuanList: [],
            currentTime:new Date(),
            shenpiren:'',
            chaosongrenyuan:'',
            yuanchaosongrenyuanxingming: "",
            yuanchaosongrenyuanbianhao: "",
            activeKey:"1",
            showzuzhiyuangong:true,
            showzuzhilingdao:true,
            showcheliangguanliyuan:true,
            showzhiduicheliangguanliyuan:true,
        };
    }

    // getshidouchaoqiList() {
    //     const THE = this;
    //     $.ajax({
    //         type: 'GET',
    //         url: SERVER + "huoquShifouChaoqiMeiju",
    //         success: function (data) {
    //             let list = [];
    //             if (data.status != 0) {
    //                 message.warning(data.message);
    //                 return;
    //             }
    //             for (let i = 0; i < data.data.length; i++) {
    //                 list.push(data.data[i]);
    //             }
    //             THE.setState({
    //                 shidouchaoqiList: list,
    //             });
    //         }
    //     });
    // }

    getshenpiList(value) {
        const THE = this;
        THE.setState({
            shenpi: value,
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

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }

    fetch = (params = {
        rows: this.state.pagination.pageSize,
        page: this.state.pagination.current
    }) => {
        const THE = this;
        let form = this.props.form;
        let page = params.page - 1;
        let size = params.rows === undefined ? 10 : params.rows;
        let processDefinitionKey = yonngcheprocessKey;
        let variables = {};
        let search = '';
        let shenpi = this.state.shenpi;
        if (typeof (shenpi) !== "undefined" && shenpi !== '-1' && shenpi !== '' && shenpi !== null) {
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "cheliangshenqingdanzhuangtai=" + shenpi;
            } else {
                search = search + ",cheliangshenqingdanzhuangtai=" + shenpi;
            }
        }
        let chepaihaoma = form.getFieldValue('chepaihaoma');
        if (typeof(chepaihaoma) !== "undefined"&&chepaihaoma !== ''&&chepaihaoma !== null){
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "chepaihaoma~" + chepaihaoma;
            } else {
                search = search + ",chepaihaoma~" + chepaihaoma;
            }
        }
        let shenqingren = form.getFieldValue('shenqingren');
        if (typeof(shenqingren) !== "undefined"&&shenqingren !== null&&shenqingren !=='') {
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "shenqingyongcherenyuan~" + shenqingren;
            } else {
                search = search + ",shenqingyongcherenyuan~" + shenqingren;
            }
        }
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof (kaishishijian) == "undefined" || kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "jihuachucheshijian>" + kaishishijian;
            } else {
                search = search + ",jihuachucheshijian>" + kaishishijian;
            }
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof (jieshushijian) == "undefined" || jieshushijian == null) {
            jieshushijian = '';
        } else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "jihuachucheshijian<" + jieshushijian;
            } else {
                search = search + ",jihuachucheshijian<" + jieshushijian;
            }
        }
        $.ajax({
            type: 'get',
            url: SERVER + "activiti/process/instances/i-start?page=" + page + "&size=" + size + "&processDefinitionKey=" + processDefinitionKey + "&search=" + search,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["startTime"] = moment(data.data.content[i]["startTime"]).format('YYYY-MM-DD HH:mm:ss');
                    const current = THE.state.currentTime;
                    if( Date.parse(data.data.content[i].form.jihuaguiduishijian.valueOf())  < current.valueOf()&& data.data.content[i].form.cheliangshenqingdanzhuangtai == '外出用车中'){
                        data.data.content[i].form.cheliangshenqingdanzhuangtai = '未归队';
                    }
                    data.data.content[i].form.jihuachucheshijian = moment(data.data.content[i].form.jihuachucheshijian).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i].form.jihuaguiduishijian = moment(data.data.content[i].form.jihuaguiduishijian).format('YYYY-MM-DD HH:mm:ss');
                    list.push(data.data.content[i]);
                }
                const pagination = {...THE.state.pagination};
                pagination.total = data.data.totalElement;
                THE.setState({
                    jiluList: list,
                    pagination,
                });
            }
        });
    }

    output() {
        let _headers = ['机构名称','所属部门','车牌号码', '申请时间', '申请人', '申请单状态', '出营时间', '归营时间','用车时长','驾驶人员','目的地点','是否已出辖区', '用车原因']
        let form = this.props.form;
        let processDefinitionKey = yonngcheprocessKey;
        let variables = {};
        let search = '';
        let shenpi = this.state.shenpi;
        if (typeof (shenpi) !== "undefined" && shenpi !== '-1' && shenpi !== '' && shenpi !== null) {
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "cheliangshenqingdanzhuangtai=" + shenpi;
            } else {
                search = search + ",cheliangshenqingdanzhuangtai=" + shenpi;
            }
        }
        let chepaihaoma = form.getFieldValue('chepaihaoma');
        if (typeof(chepaihaoma) !== "undefined"&&chepaihaoma !== ''&&chepaihaoma !== null){
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "chepaihaoma~" + chepaihaoma;
            } else {
                search = search + ",chepaihaoma~" + chepaihaoma;
            }
        }
        let shenqingren = form.getFieldValue('shenqingren');
        if (typeof(shenqingren) !== "undefined"&&shenqingren !== null&&shenqingren !=='') {
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "shenqingyongcherenyuan~" + shenqingren;
            } else {
                search = search + ",shenqingyongcherenyuan~" + shenqingren;
            }
        }
        let kaishishijian = form.getFieldValue('kaishishijian');
        if (typeof (kaishishijian) == "undefined" || kaishishijian == null) {
            kaishishijian = '';
        } else {
            kaishishijian = moment(kaishishijian).format('YYYY-MM-DD 00:00:00');
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "jihuachucheshijian>" + kaishishijian;
            } else {
                search = search + ",jihuachucheshijian>" + kaishishijian;
            }
        }
        let jieshushijian = form.getFieldValue('jieshushijian');
        if (typeof (jieshushijian) == "undefined" || jieshushijian == null) {
            jieshushijian = '';
        } else {
            jieshushijian = moment(jieshushijian).format('YYYY-MM-DD 23:59:59');
            if (typeof (search) === "undefined" || search === '' || search === null) {
                search = search + "jihuachucheshijian<" + jieshushijian;
            } else {
                search = search + ",jihuachucheshijian<" + jieshushijian;
            }
        }
        $.ajax({
            type: 'get',
            url: SERVER + "activiti/process/instances/i-start?page=0&size=100000&processDefinitionKey=" + processDefinitionKey + "&search=" + search,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    data.data.content[i]["startTime"] = moment(data.data.content[i]["startTime"]).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i].form.jihuachucheshijian = moment(data.data.content[i].form.jihuachucheshijian).format('YYYY-MM-DD HH:mm:ss');
                    data.data.content[i].form.jihuaguiduishijian = moment(data.data.content[i].form.jihuaguiduishijian).format('YYYY-MM-DD HH:mm:ss');
                    let obj = {};
                    if (data.data.content[i].form.jigoumingcheng == null) {
                        obj['机构名称'] = '';
                    } else {
                        obj['机构名称'] = data.data.content[i].form.jigoumingcheng;
                    }
                    if (data.data.content[i].form.suoshubumen == null) {
                        obj['所属部门'] = '';
                    } else {
                        obj['所属部门'] = data.data.content[i].form.suoshubumen;
                    }
                    if (data.data.content[i].form.chepaihaoma == null) {
                        obj['车牌号码'] = '';
                    } else {
                        obj['车牌号码'] = data.data.content[i].form.chepaihaoma;
                    }
                    if (data.data.content[i]['startTime'] == null) {
                        obj['申请时间'] = '';
                    } else {
                        obj['申请时间'] = data.data.content[i]['startTime'];
                    }
                    if (data.data.content[i].form.shenqingyongcherenyuan == null) {
                        obj['申请人'] = '';
                    } else {
                        obj['申请人'] = data.data.content[i].form.shenqingyongcherenyuan;
                    }
                    if (data.data.content[i].form.cheliangshenqingdanzhuangtai == null) {
                        obj['申请单状态'] = '';
                    } else {
                        obj['申请单状态'] = data.data.content[i].form.cheliangshenqingdanzhuangtai;
                    }
                    if (data.data.content[i].form.jihuachucheshijian == null) {
                        obj['出营时间'] = '';
                    } else {
                        obj['出营时间'] = data.data.content[i].form.jihuachucheshijian;
                    }
                    if (data.data.content[i].form.jihuaguiduishijian == null) {
                        obj['归营时间'] = '';
                    } else {
                        obj['归营时间'] = data.data.content[i].form.jihuaguiduishijian;
                    }
                    if (data.data.content[i].form.yongcheshichang == null) {
                        obj['用车时长'] = '';
                    } else {
                        obj['用车时长'] = data.data.content[i].form.yongcheshichang;
                    }
                    if (data.data.content[i].form.jiashirenyuan == null) {
                        obj['驾驶人员'] = '';
                    } else {
                        obj['驾驶人员'] = data.data.content[i].form.jiashirenyuan;
                    }
                    if (data.data.content[i].form.mudididian == null) {
                        obj['目的地点'] = '';
                    } else {
                        obj['目的地点'] = data.data.content[i].form.mudididian;
                    }
                    if (data.data.content[i].form.yichuxiaqu == null) {
                        obj['是否已出辖区'] = '';
                    } else {
                        obj['是否已出辖区'] = data.data.content[i].form.yichuxiaqu;
                    }
                    if (data.data.content[i].form.yongcheliyou == null) {
                        obj['用车原因'] = '';
                    } else {
                        obj['用车原因'] = data.data.content[i].form.yongcheliyou;
                    }
                    list.push(obj);
                }
                let _data = list;
                if (_data == null || _data.length == 0) {
                    message.warning("当前用车历史记录没有数据！");
                    return;
                }

                let headers = _headers
                    .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65 + i) + 1}))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

                let xmldata = _data
                    .map((v, i) => _headers.map((k, j) => Object.assign({}, {
                        v: v[k],
                        position: String.fromCharCode(65 + j) + (i + 2)
                    })))
                    .reduce((prev, next) => prev.concat(next))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

                // 合并 headers 和 data
                let output = Object.assign({}, headers, xmldata);
                // 获取所有单元格的位置
                let outputPos = Object.keys(output);
                // 计算出范围
                let ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

                // 构建 workbook 对象
                let wb = {
                    SheetNames: ['mySheet'],
                    Sheets: {
                        'mySheet': Object.assign({}, output, {'!ref': ref})
                    }
                };

                // 导出 Excel
                XLSX.writeFile(wb, '用车历史记录.xlsx');
            }
        });

    }

    search() {
        const pager = {...this.state.pagination};
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
            shenpirenyuanList: [],
            chaosongrenyuan:'',
        });
    }
    shenpirenyuanChang(value) {
        const THE = this;
        THE.setState({
            shenpiren: value,
        });
    }

    chaosongrenyuanChang(value) {
        const THE = this;
        THE.setState({
            chaosongrenyuan: value,
        });
    }

    guidui(yongcheObj,shenqingleixing){
        const THE = this;
        let taskId =yongcheObj['historicUserTaskInstanceList'][yongcheObj.historicUserTaskInstanceList.length-1].taskInstanceId;
        let processDefinitionKey = yonngcheprocessKey;
        let yuanchaosongrenyuanxingming = yongcheObj['form'].chaosongrenyuanxingming;
        let yuanchaosongrenyuanbianhao = yongcheObj['form'].chaosongrenyuanbianhao;
        let variables = {};
        variables.faqirenliuchengjuese=sessionStorage.getItem("liuchengjuesemingcheng");
        variables.shenqingleixing=shenqingleixing;
        variables.jigoudaima=sessionStorage.getItem("jigoudaima");
        $.ajax({
            type:'POST',
            url: SERVER + "activiti/task/candidaters?taskId="+taskId,
            data : JSON.stringify(variables),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if($.isEmptyObject(data.data) === false){
                    for(var i in data.data) {
                        list.push(data.data[i])
                    }
                    THE.setState({
                        visible: true,
                        shenpirenyuanList: list[0],
                        yuanchaosongrenyuanxingming: yuanchaosongrenyuanxingming,
                        yuanchaosongrenyuanbianhao: yuanchaosongrenyuanbianhao,
                        yongcheObj:yongcheObj,
                        shenqingleixing:shenqingleixing,
                    });
                }
            }
        });
    }

    tijiaoguidui(){
        const THE = this;
        let shenpirenyuan = THE.state.shenpiren;
        if (typeof (shenpirenyuan) == "undefined" || shenpirenyuan == '' || shenpirenyuan == null) {
            message.error("请选择审批人！");
            return;
        }
        let chaosongrenyuan = THE.state.chaosongrenyuan;
        let yuanchaosongrenyuanbianhao = THE.state.yuanchaosongrenyuanbianhao;
        let yuanchaosongrenyuanxingming = THE.state.yuanchaosongrenyuanxingming;
        let shenpirenyuanxingming=shenpirenyuan.split('+')[0];
        let shenpirenyuanbianhao=shenpirenyuan.split('+')[1];
        let yongcheObj = THE.state.yongcheObj;
        let taskId = yongcheObj['historicUserTaskInstanceList'][yongcheObj.historicUserTaskInstanceList.length-1].taskInstanceId;
        //let shenpirenyuanbianhaolist = yongcheObj['form'].shenpirenyuanbianhaolist;
        let shenqingleixing = THE.state.shenqingleixing;
        let cheliangshenqingdanzhuangtai = '归队申请中';
        // shenpirenyuanbianhaolist.push(shenpirenyuanbianhao);
        let variables = {};
        variables.shenpirenyuanxingming = shenpirenyuanxingming;
        variables.shenpirenyuanbianhao = shenpirenyuanbianhao;
        //variables.shenpirenyuanbianhaolist = shenpirenyuanbianhaolist;
        variables.shenqingleixing = shenqingleixing;
        variables.cheliangshenqingdanzhuangtai = cheliangshenqingdanzhuangtai;
        if (chaosongrenyuan !== "" && chaosongrenyuan !== null && chaosongrenyuan !==  "undefined") {
            variables.chaosongrenyuanxingming=yuanchaosongrenyuanxingming + ','+chaosongrenyuan.split('+')[0];
            variables.chaosongrenyuanbianhao=yuanchaosongrenyuanbianhao + ',' +chaosongrenyuan.split('+')[1];
        }
        $.ajax({
            type: 'POST',
            url: SERVER + "activiti/completeTask?taskId="+taskId,
            data: JSON.stringify(variables),
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("申请成功");
                THE.setState({
                    visible: false,
                    shenpirenyuanList: [],
                    shenpiren:'',
                    chaosongrenyuan:'',
                });
                THE.fetch();
            }
        });
    }

    //控制tab页方法
    callback(key) {
        const THE = this;
        THE.setState({
            activeKey: key,
        });
    }

    componentWillUnmount() {
        View.pagination = this.state.pagination;
        View.activeKey = this.state.activeKey;
    }

    componentWillMount() {
        if(!View.activeKey){
            View.activeKey = '1';
        }
        const {pagination,activeKey} = View;
        this.setState({
            activeKey: activeKey,
        });
        if (typeof (pagination) !== "undefined") {
            this.setState({
                pagination: pagination,
            });
        }
        let jueselist = sessionStorage.getItem("jueselist");
        if(button_quanxian('showzuzhiyuangong',jueselist) === true){
            this.setState({
                showzuzhiyuangong: false,
            });
        };
        if(button_quanxian('showzuzhilingdao',jueselist) === true){
            this.setState({
                showzuzhilingdao: false,
            });
        };
        if(button_quanxian('showcheliangguanliyuan',jueselist) === true){
            this.setState({
                showcheliangguanliyuan: false,
            });
        };
        if(button_quanxian('showzhiduicheliangguanliyuan',jueselist) === true){
            this.setState({
                showzhiduicheliangguanliyuan: false,
            });
        };
    }


    componentDidMount() {
        this.fetch();
        this.getshenpiList();
    }

    render() {
        // let shidouchaoqiOptions = this.state.shidouchaoqiList.map(item =>
        //     <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        // );
        let shenpirenyuanOptions = this.state.shenpirenyuanList.map(item =>
            <Select.Option key={item['key']} value={item['xingming']+ '+' + item['renyuanbianhao']}>{item['xingming']}</Select.Option>
        );

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan: 0,
            className: 'hidden_col',
          width: '15%'
        }, {
            title: '申请时间',
            dataIndex: 'startTime',
          width: '10%'
        },{
            title: '车牌号码',
            dataIndex: 'form.chepaihaoma',
          width: '15%'
        }, {
            title: '出营时间',
            dataIndex: 'form.jihuachucheshijian',
          width: '15%'
        }, {
            title: '归营时间',
            dataIndex: 'form.jihuaguiduishijian',
          width: '10%'
        },{
            title: '申请单状态',
            dataIndex: 'form.cheliangshenqingdanzhuangtai',
          width: '10%'
        }, {
            title: '当前审批人',
            dataIndex: 'form.shenpirenyuanxingming',
        },
            //     {
            //     title: '用车原因',
            //     dataIndex: 'form.yongcheliyou',
            // },
            {
                title: '操作',
                dataIndex: 'cz',
                render: (text, record, index) => {
                    if (record['form'].cheliangshenqingdanzhuangtai === "车辆申请同意" || record['form'].cheliangshenqingdanzhuangtai === "外出用车中" || record['form'].cheliangshenqingdanzhuangtai === "未归队" && record['form'].jihuachucheshijian !== undefined && record['form'].jihuaguiduishijian !== undefined) {
                        return (
                            <span>
                            <Popconfirm placement="topLeft" title="确认要归队?"
                                        onConfirm={this.guidui.bind(this, record, '归队')} okText="确认"
                                        cancelText="取消">
					        	<a>归队</a>
					    	</Popconfirm>
					    	<Divider type="vertical"/>
			      	<Link
                        to={this.props.match.url + '/yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang/' + record['processInstanceId']}>详情</Link>
                    <Divider type="vertical"/>
                    <Link
                        to={this.props.match.url + '/yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing/'+ record['form'].chepaihaoma+'/'+record['form'].jihuachucheshijian+'/'+record['form'].jihuaguiduishijian }>轨迹</Link>
			        </span>
                        )
                    } else {
                        return (
                            <span>
			      	<Link
                        to={this.props.match.url + '/yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang/' + record['processInstanceId']}>详情</Link>
			        </span>
                        )
                    }
                },
            }];

        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;
        const {startValue, endValue, shenpi,shenpiren,chaosongrenyuan} = this.state;

        return (
            <div>
                <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                <Tabs.TabPane tab="组织员工" key="1" disabled={this.state.showzuzhiyuangong}>
                <Modal
                    title="归队申请"
                    visible={this.state.visible}
                    onOk={this.tijiaoguidui.bind(this)}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <label>审批人选择</label>
                    <Select style={{margin: 5, width: 200}} value={shenpiren}
                            onChange={this.shenpirenyuanChang.bind(this)}>
                        {shenpirenyuanOptions}
                    </Select>
                    <br/>
                    <label>抄送人选择</label>
                    <Select style={{margin: 5, width: 200}} value={chaosongrenyuan}
                            onChange={this.chaosongrenyuanChang.bind(this)}>
                        {shenpirenyuanOptions}
                    </Select>
                </Modal>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="开始时间">
                        {getFieldDecorator('kaishishijian')(
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                value={startValue}
                                placeholder="开始时间"
                                format="YYYY-MM-DD"
                                onChange={this.onStartChange}
                                style={{width: 200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="结束时间&#12288;">
                        {getFieldDecorator('jieshushijian')(
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                value={endValue}
                                placeholder="结束时间"
                                format="YYYY-MM-DD"
                                onChange={this.onEndChange}
                                style={{width: 200}}
                            />
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="车牌号码">
                        {getFieldDecorator('chepaihaoma')(
                            <Input style={{width: 200}}/>
                        )}
                    </FormItem>
                    <FormItem label="申请单状态">
                        <Select style={{width: 200}} value={shenpi} onChange={this.getshenpiList.bind(this)}>
                            <Select.Option value="-1">全部</Select.Option>
                            <Select.Option value="车辆申请中">车辆申请中</Select.Option>
                            <Select.Option value="车辆申请同意">车辆申请同意</Select.Option>
                            <Select.Option value="车辆申请拒绝">车辆申请拒绝</Select.Option>
                            <Select.Option value="外出用车中">外出用车中</Select.Option>
                            <Select.Option value="未归队">未归队</Select.Option>
                            <Select.Option value="归队申请中">归队申请中</Select.Option>
                            <Select.Option value="已归队">已归队</Select.Option>
                        </Select>
                    </FormItem>
                    {/*<FormItem label="是否超期">*/}
                    {/*    {getFieldDecorator('shifouchaoqi')(*/}
                    {/*        <Select style={{width:200}}>*/}
                    {/*            <Select.Option value="-1">全部</Select.Option>*/}
                    {/*            {shidouchaoqiOptions}*/}
                    {/*        </Select>*/}
                    {/*    )}*/}
                    {/*</FormItem>*/}
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                            <Icon type="search"/>查询
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.output.bind(this)}>
                            <Icon type="export" />导出
                        </Button>
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button>
                            <Link
                                to={this.props.match.url + '/yingquguanlixin_zuzhiyuangong_gongyongchelishijiluxinzeng'}>
                                <Icon type="plus"/><span>用车申请</span>
                            </Link>
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={columns}
                    dataSource={this.state.jiluList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 510px)", x: true }}
                />
                </Tabs.TabPane>
                <Tabs.TabPane tab="组织领导" key="2" disabled={this.state.showzuzhilingdao}>
                    <ZDJL />
                 </Tabs.TabPane>
                 <Tabs.TabPane tab="车辆管理员" key="3" disabled={this.state.showcheliangguanliyuan}>
                     <Yzjl />
                 </Tabs.TabPane>
                 <Tabs.TabPane tab="支队车辆管理员" key="4" disabled={this.state.showzhiduicheliangguanliyuan}>
                     <ZDYzjl />
                 </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
