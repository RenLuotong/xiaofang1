import React, {Component} from 'react';
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
    Tag, Card, Steps
} from 'antd';
import moment from "moment";
const Step = Steps.Step;

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
            info: {},
            form: {},
            processInstanceId:this.props.match.params.processInstanceId,
            qingjiashenpiList:[],
            xiaojiashenpishenpiList:[],
            yanqishenpishenpiList:[],
            currentTime:new Date(),
        };
    }
    getInfo() {
        const THE = this;
        let processInstanceId = THE.state.processInstanceId;
        $.ajax({
            type : 'GET',
            url : SERVER + "activiti/process/instance?processInstanceId=" + processInstanceId,
            success : function (data) {
                let qingjiashenpiList = [];
                let xiaojiashenpishenpiList = [];
                let yanqishenpishenpiList = [];
                let xiaojiashijian = ''
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                const current=THE.state.currentTime;
                if( Date.parse(data.data.form.jihuaxiaojiashijian.valueOf())  < current.valueOf()&& data.data.form.shenqingdanzhuangtai == '假期中'){
                    data.data.form.shenqingdanzhuangtai = '未销假';
                }
                if (data.data.form.yanqishijian== ''||data.data.form.yanqishijian== null||typeof (data.data.form.yanqishijian) ==undefined){
                    data.data.form.yanqishijian== ''
                }else {
                    data.data.form.yanqishijian =moment( data.data.form.yanqishijian).format('YYYY-MM-DD HH:mm:ss') ;
                }
                for (let i = 0; i < data.data.historicUserTaskInstanceList.length; i++) {
                    if(data.data.historicUserTaskInstanceList[i].userTaskExtendedAttributes.liuchengleixing==='qingjia'){
                        qingjiashenpiList.push(data.data.historicUserTaskInstanceList[i]);
                    }
                    if(data.data.historicUserTaskInstanceList[i].userTaskExtendedAttributes.liuchengleixing==='yanqi'){
                        // if(data.data.historicUserTaskInstanceList[i].endTime === null){
                        //     data.data.form.yanqishijian = '';
                        //     data.data.form.yanqiliyou = '';
                        // };
                        yanqishenpishenpiList.push(data.data.historicUserTaskInstanceList[i]);
                    }
                    if(data.data.historicUserTaskInstanceList[i].userTaskExtendedAttributes.liuchengleixing==='xiaojia'){
                        if(data.data.historicUserTaskInstanceList[i].endTime !== null){
                            xiaojiashijian = moment(data.data.historicUserTaskInstanceList[i].startTime).format('YYYY-MM-DD HH:mm:ss');
                        };
                        xiaojiashenpishenpiList.push(data.data.historicUserTaskInstanceList[i]);
                    }
                }
                data.data.form.xiaojiashijian = xiaojiashijian;
                THE.setState({
                    info: data.data,
                    form: data.data.form,
                    qingjiashenpiList:qingjiashenpiList,
                    yanqishenpishenpiList:yanqishenpishenpiList,
                    xiaojiashenpishenpiList:xiaojiashenpishenpiList
                });
            }
        });
    }

    componentWillMount () {
        this.getInfo();
    }


    render() {
        let liuchengleixing = '请假';
        let info = this.state.info;
        let form = this.state.form;
        let list = this.state.qingjiashenpiList;
        let yanqishenpishenpiList = this.state.yanqishenpishenpiList;
        let xiaojiashenpishenpiList = this.state.xiaojiashenpishenpiList;
        let Step = Steps.Step;
        let stepList;
        let stepList2;
        let stepList3;
        if(list.length > 0){
            if (list.length == 1 && list[0].endTime == null) {
                let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                let description1 = "请假:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
                let title2 = list[0].assignee.liuchengjuesemingcheng + ":" + list[0].assignee.xingming;
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description="待审批" status="process"/>
                        </Steps>
                    </div>
                )
            }else if(list.length == 1 && list[0].endTime !== null){
                let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                let description1 = "请假:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
                let title2 = list[0].assignee.liuchengjuesemingcheng + ":" + list[0].assignee.xingming;
                let description2 = ''
                if(info.form.shenpiliuzhuangtai === '同意'){
                    description2 = "请假:审批通过:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                    stepList = (
                        <div>
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                            </p>
                            <Steps id="myStep">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="finish"/>
                            </Steps>
                        </div>
                    )
                }else{
                    description2 = "请假:审批拒绝:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                    stepList = (
                        <div>
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                            </p>
                            <Steps id="myStep" current={1} status="error">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="error"/>
                            </Steps>
                        </div>
                    )
                }
            }else if(list.length == 2 && list[1].endTime == null){
                let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                let description1 = "请假:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
                let title2 = list[0].assignee.liuchengjuesemingcheng + ":" + list[0].assignee.xingming;
                let description2 = "请假:审批通过:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                let title3 = list[1].assignee.liuchengjuesemingcheng + ":" + list[1].assignee.xingming;
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title={title3} description="待审批" status="process"/>
                        </Steps>
                    </div>
                )
            }else if(list.length == 2 && list[1].endTime !== null){
                let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                let description1 = "请假:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
                let title2 = list[0].assignee.liuchengjuesemingcheng + ":" + list[0].assignee.xingming;
                let description2 = "请假:审批通过:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                let title3 = list[1].assignee.liuchengjuesemingcheng + ":" + list[1].assignee.xingming;
                let description3 = '';
                if(info.form.shenpiliuzhuangtai === '同意'){
                    description3 = "请假:审批通过:" +moment(list[1].endTime).format('YYYY-MM-DD HH:mm:ss');
                    stepList = (
                        <div>
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                            </p>
                            <Steps id="myStep">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="finish"/>
                                <Step title={title3} description={description3} status="finish"/>
                            </Steps>
                        </div>
                    )
                }else{
                    description3 = "请假:审批拒绝:" +moment(list[1].endTime).format('YYYY-MM-DD HH:mm:ss');
                    stepList = (
                        <div>
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                            </p>
                            <Steps id="myStep" current={2} status="error">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="finish"/>
                                <Step title={title3} description={description3} status="error"/>
                            </Steps>
                        </div>
                    )
                }
            }else if(list.length == 3 && list[2].endTime == null){
                let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                let description1 = "请假:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
                let title2 = list[0].assignee.liuchengjuesemingcheng + ":" + list[0].assignee.xingming;
                let description2 = "请假:审批通过:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                let title3 = list[1].assignee.liuchengjuesemingcheng + ":" + list[1].assignee.xingming;
                let description3 = "请假:审批通过:" +moment(list[1].endTime).format('YYYY-MM-DD HH:mm:ss');
                let title4 = list[2].assignee.liuchengjuesemingcheng + ":" + list[2].assignee.xingming;
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title={title3} description={description3} status="finish"/>
                            <Step title={title4} description="待审批" status="process"/>
                        </Steps>
                    </div>
                )
            }else if(list.length == 3 && list[2].endTime !== null){
                let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                let description1 = "请假:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
                let title2 = list[0].assignee.liuchengjuesemingcheng + ":" + list[0].assignee.xingming;
                let description2 = "请假:审批通过:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                let title3 = list[1].assignee.liuchengjuesemingcheng + ":" + list[1].assignee.xingming;
                let description3 = "请假:审批通过:" +moment(list[1].endTime).format('YYYY-MM-DD HH:mm:ss');
                let title4 = list[2].assignee.liuchengjuesemingcheng + ":" + list[2].assignee.xingming;
                let description4 = '';
                if(info.form.shenpiliuzhuangtai === '同意'){
                    description4 = "请假:审批通过:" +moment(list[2].endTime).format('YYYY-MM-DD HH:mm:ss');
                    stepList = (
                        <div>
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                            </p>
                            <Steps id="myStep">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="finish"/>
                                <Step title={title3} description={description3} status="finish"/>
                                <Step title={title4} description={description4} status="finish"/>
                            </Steps>
                        </div>
                    )
                }else{
                    description4 = "请假:审批拒绝:" +moment(list[2].endTime).format('YYYY-MM-DD HH:mm:ss');
                    stepList = (
                        <div>
                            <p>
                                <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                            </p>
                            <Steps id="myStep" current={3} status="error">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="finish"/>
                                <Step title={title3} description={description3} status="finish"/>
                                <Step title={title4} description={description4} status="error"/>
                            </Steps>
                        </div>
                    )
                }
            }else{
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={1} description={1} status="finish"/>
                            <Step title={2} description={2} status="finish"/>
                            <Step title={3} description={3} status="finish"/>
                            <Step title={4} description={4} status="finish"/>
                        </Steps>
                    </div>
                )
            }}
        if(yanqishenpishenpiList.length > 0){
            if(yanqishenpishenpiList.length === 1){
                if (yanqishenpishenpiList[0].endTime == null) {
                    let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description1 = "延期:申请时间:" + moment(yanqishenpishenpiList[0].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title2 = yanqishenpishenpiList[0].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[0].assignee.xingming;
                    stepList2 = (
                        <div>
                            <Steps id="myStep">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description="待审批" status="process"/>
                            </Steps>
                        </div>
                    )
                } else {
                    let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description1 = "延期:申请时间:" + moment(yanqishenpishenpiList[0].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title2 = yanqishenpishenpiList[0].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[0].assignee.xingming;
                    let description2 = "延期:审批通过:" + moment(yanqishenpishenpiList[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                    stepList2 = (
                        <div>
                            <Steps id="myStep">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="finish"/>
                            </Steps>
                        </div>
                    )
                }
            }else if(yanqishenpishenpiList.length === 2){
                if (yanqishenpishenpiList[1].endTime == null) {
                    let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description1 = "延期:申请时间:" + moment(yanqishenpishenpiList[0].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title2 = yanqishenpishenpiList[0].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[0].assignee.xingming;
                    let description2 = "延期:审批通过:" + moment(yanqishenpishenpiList[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                    let title3 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description3 = "延期:申请时间:" + moment(yanqishenpishenpiList[1].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title4 = yanqishenpishenpiList[1].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[1].assignee.xingming;
                    stepList2 = (
                        <div>
                            <Steps id="myStep">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="finish"/>
                                <Step title={title3} description={description3} status="finish"/>
                                <Step title={title4} description="待审批" status="process"/>
                            </Steps>
                        </div>
                    )
                } else {
                    let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description1 = "延期:申请时间:" + moment(yanqishenpishenpiList[0].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title2 = yanqishenpishenpiList[0].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[0].assignee.xingming;
                    let description2 = "延期:审批通过:" + moment(yanqishenpishenpiList[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                    let title3 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description3 = "延期:申请时间:" + moment(yanqishenpishenpiList[1].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title4 = yanqishenpishenpiList[1].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[1].assignee.xingming;
                    let description4 = "延期:审批通过:" + moment(yanqishenpishenpiList[1].endTime).format('YYYY-MM-DD HH:mm:ss');
                    stepList2 = (
                        <div>
                            <Steps id="myStep">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="finish"/>
                                <Step title={title3} description={description3} status="finish"/>
                                <Step title={title4} description={description4} status="finish"/>
                            </Steps>
                        </div>
                    )
                }

            }else if(yanqishenpishenpiList.length === 3){
                if (yanqishenpishenpiList[2].endTime == null) {
                    let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description1 = "延期:申请时间:" + moment(yanqishenpishenpiList[0].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title2 = yanqishenpishenpiList[0].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[0].assignee.xingming;
                    let description2 = "延期:审批通过:" + moment(yanqishenpishenpiList[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                    let title3 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description3 = "延期:申请时间:" + moment(yanqishenpishenpiList[1].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title4 = yanqishenpishenpiList[1].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[1].assignee.xingming;
                    let description4 = "延期:审批通过:" + moment(yanqishenpishenpiList[1].endTime).format('YYYY-MM-DD HH:mm:ss');
                    let title5 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description5 = "延期:申请时间:" + moment(yanqishenpishenpiList[2].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title6 = yanqishenpishenpiList[2].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[2].assignee.xingming;
                    stepList2 = (
                        <div>
                            <Steps id="myStep">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="finish"/>
                                <Step title={title3} description={description3} status="finish"/>
                                <Step title={title4} description={description4} status="finish"/>
                                <Step title={title5} description={description5} status="finish"/>
                                <Step title={title6} description="待审批" status="process"/>
                            </Steps>
                        </div>
                    )
                } else {
                    let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description1 = "延期:申请时间:" + moment(yanqishenpishenpiList[0].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title2 = yanqishenpishenpiList[0].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[0].assignee.xingming;
                    let description2 = "延期:审批通过:" + moment(yanqishenpishenpiList[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                    let title3 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description3 = "延期:申请时间:" + moment(yanqishenpishenpiList[1].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title4 = yanqishenpishenpiList[1].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[1].assignee.xingming;
                    let description4 = "延期:审批通过:" + moment(yanqishenpishenpiList[1].endTime).format('YYYY-MM-DD HH:mm:ss');
                    let title5 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description5 = "延期:申请时间:" + moment(yanqishenpishenpiList[2].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title6 = yanqishenpishenpiList[2].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[2].assignee.xingming;
                    let description6 = "延期:审批通过:" + moment(yanqishenpishenpiList[2].endTime).format('YYYY-MM-DD HH:mm:ss');
                    stepList2 = (
                        <div>
                            <Steps id="myStep">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="finish"/>
                                <Step title={title3} description={description4} status="finish"/>
                                <Step title={title4} description={description4} status="finish"/>
                                <Step title={title5} description={description5} status="finish"/>
                                <Step title={title6} description={description6} status="finish"/>
                            </Steps>
                        </div>
                    )
                }

            }else{
                if (yanqishenpishenpiList[yanqishenpishenpiList.length - 1].endTime == null) {
                    let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description1 = "延期:申请时间:" + moment(yanqishenpishenpiList[yanqishenpishenpiList.length - 1].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title2 = yanqishenpishenpiList[yanqishenpishenpiList.length - 1].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[yanqishenpishenpiList.length - 1].assignee.xingming;
                    stepList2 = (
                        <div>
                            <Steps id="myStep">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description="待审批" status="process"/>
                            </Steps>
                        </div>
                    )
                } else {
                    let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                    let description1 = "延期:申请时间:" + moment(yanqishenpishenpiList[yanqishenpishenpiList.length - 1].startTime).format('YYYY-MM-DD HH:mm:ss');
                    let title2 = yanqishenpishenpiList[yanqishenpishenpiList.length - 1].assignee.liuchengjuesemingcheng + ":" + yanqishenpishenpiList[yanqishenpishenpiList.length - 1].assignee.xingming;
                    let description2 = "延期:审批通过:" + moment(yanqishenpishenpiList[yanqishenpishenpiList.length - 1].endTime).format('YYYY-MM-DD HH:mm:ss');
                    stepList2 = (
                        <div>
                            <Steps id="myStep">
                                <Step title={title1} description={description1} status="finish"/>
                                <Step title={title2} description={description2} status="finish"/>
                            </Steps>
                        </div>
                    )
                }
            }
        }
        if(xiaojiashenpishenpiList.length > 0){
            if (xiaojiashenpishenpiList.length == 1 && xiaojiashenpishenpiList[0].endTime == null) {
                let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                let description1 = "销假:申请时间:" + moment(xiaojiashenpishenpiList[0].startTime).format('YYYY-MM-DD HH:mm:ss');
                let title2 = xiaojiashenpishenpiList[0].assignee.liuchengjuesemingcheng + ":" + xiaojiashenpishenpiList[0].assignee.xingming;
                stepList3 = (
                    <div>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description="待审批" status="process"/>
                        </Steps>
                    </div>
                )
            } else {
                let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingrenmingcheng;
                let description1 = "销假:申请时间:" + moment(xiaojiashenpishenpiList[0].startTime).format('YYYY-MM-DD HH:mm:ss');
                let title2 = xiaojiashenpishenpiList[0].assignee.liuchengjuesemingcheng + ":" + xiaojiashenpishenpiList[0].assignee.xingming;
                let description2 = "销假:审批通过:" + moment(xiaojiashenpishenpiList[0].endTime).format('YYYY-MM-DD HH:mm:ss');
                stepList3 = (
                    <div>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                        </Steps>
                    </div>
                )
            }
        }

        return(
            <div>
                {stepList}
                {stepList2}
                {stepList3}
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>基本信息
                </p>
                <Tag id="myTag">申请时间 : {moment(info['startTime']).format('YYYY-MM-DD HH:mm:ss')}</Tag>
                <Tag id="myTag">外出时间 : {moment(form.jihuaqingjiashijian).format('YYYY-MM-DD HH:mm:ss')}</Tag>
                <Tag id="myTag">返回时间 : {moment(form.jihuaxiaojiashijian).format('YYYY-MM-DD HH:mm:ss')}</Tag>
                <br/>
                <Tag id="myTag">延期时间 : {form.yanqishijian}</Tag>
                <Tag id="myTag">销假时间 : {form.xiaojiashijian}</Tag>
                <Tag id="myTag">外出类型 : {form.shijiqingjialeixing}</Tag>
                <br/>
                <Tag id="myTag">外出地点 : {form.waichudidian}</Tag>
                <Tag id="myTag">抄送人 : {form.chaosongrenyuanxingming}</Tag>
                <Tag id="myTag">时长 : {form.qingjiashichang}</Tag>
                <br/>
                <div id="yichangtuogang">外出事由 : {form.qingjialiyou}</div>
                <br/>
                <div id="yichangtuogang">延期原因 : {form.yanqiliyou}</div>
            </div>
        )
    }
}
const AppComp = Form.create()(App);
export default Appmain;
