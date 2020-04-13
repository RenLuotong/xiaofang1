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
    Table, Tabs,Tag
} from 'antd';
const { Step } = Steps;

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            pagination: {
                pageSize: 10,
                current: 1,
            },
            getInfo:{},
            form:{},
            info:{},
            suicherenyuanList:[],
            paicheChaoqiList:[],
            processInstanceId:this.props.match.params.processInstanceId,
            jinduList:[],
        };
    }

    getInfo() {
        const THE = this;
        let processInstanceId = THE.state.processInstanceId;
        $.ajax({
            type : 'GET',
            url : SERVER + "activiti/process/instance?processInstanceId=" + processInstanceId,
            success : function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                const current=THE.state.currentTime;
                // if( Date.parse(data.data.form.jihuaxiaojiashijian.valueOf())  < current.valueOf()&& data.data.form.shenqingdanzhuangtai == '假期中'){
                //     data.data.form.shenqingdanzhuangtai = '未销假';
                // }
                if (data.data.form.jihuaguiduishijian== ''||data.data.form.jihuaguiduishijian== null||typeof (data.data.form.jihuaguiduishijian) ==undefined){
                    data.data.form.jihuaguiduishijian== ''
                }else {
                    data.data.form.jihuaguiduishijian =moment( data.data.form.jihuaguiduishijian).format('YYYY-MM-DD HH:mm:ss') ;
                }
                if (data.data.form.jihuachucheshijian== ''||data.data.form.jihuachucheshijian== null||typeof (data.data.form.jihuachucheshijian) ==undefined){
                    data.data.form.jihuachucheshijian== ''
                }else {
                    data.data.form.jihuachucheshijian =moment( data.data.form.jihuachucheshijian).format('YYYY-MM-DD HH:mm:ss') ;
                }
                if (data.data.startTime== ''||data.data.startTime== null||typeof (data.data.startTime) ==undefined){
                    data.data.startTime== ''
                }else {
                    data.data.startTime =moment( data.data.startTime).format('YYYY-MM-DD HH:mm:ss') ;
                }
                // let suicherenyuanList=[];
                // for (let i=0;i<data.data.form.suicherenyuanlist.length;i++){
                //     let obj={};
                //     obj.suicherenyuan=data.data.form.suicherenyuanlist[i];
                //     obj.chepaihaoma=data.data.form.chepaihaoma;
                //     suicherenyuanList.push(obj)
                // }
                for (let i = 0; i < data.data.historicUserTaskInstanceList.length; i++) {
                    if(data.data.historicUserTaskInstanceList[i].userTaskExtendedAttributes.liuchengleixing ==='yongche'){
                        list.push(data.data.historicUserTaskInstanceList[i]);
                    }
                }
                console.log(list)
                THE.setState({
                    jinduList:list,
                    info: data.data,
                    form: data.data.form,
                    // suicherenyuanList: suicherenyuanList,
                });
            }
        });
    }




    componentDidMount () {
        this.getInfo();
    }


    render() {

        let list = this.state.jinduList;
        let info = this.state.info;
        let form = this.state.form;
        let Step = Steps.Step;
        let stepList;

        if (list.length == 1 && list[0].endTime == null) {
            let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description1 = "用车:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
            let title2 = "车辆管理员:" + list[0].assignee.xingming;
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
        }else if(list.length == 1 && list[0].endTime !== null) {
            let title1 =  info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description1 = "用车:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
            let title2 = "车辆管理员:" + list[0].assignee.xingming;
            let description2 = ''
            if (info.form.cheliangshenpiliuzhuangtai === '同意') {
                description2 = "用车:审批通过:" + moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
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
            } else {
                description2 = "用车:审批拒绝:" + moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
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
        }else if(list.length == 2 && list[1].endTime == null && list[1].taskName == '车辆管理员审批'){
            let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description1 = "用车:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
            let title2 = "车辆管理员:" + list[0].assignee.xingming;
            let description2 = "用车:审批通过:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
            let title3 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description3 = "还车:申请时间:" +moment(list[1].startTime).format('YYYY-MM-DD HH:mm:ss');
            let title4 = "车辆管理员:" + list[1].assignee.xingming;
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
        }else if(list.length == 2 && list[1].endTime !== null && list[1].taskName == '车辆管理员审批'){
            let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description1 = "用车:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
            let title2 = "车辆管理员:" + list[0].assignee.xingming;
            let description2 = "用车:审批通过:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
            let title3 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description3 = "还车:申请时间:" +moment(list[1].startTime).format('YYYY-MM-DD HH:mm:ss');
            let title4 = "车辆管理员:" + list[1].assignee.xingming;
            let description4 = "还车:审批通过:" + moment(list[1].endTime).format('YYYY-MM-DD HH:mm:ss');
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
        }else if(list.length == 2 && list[1].endTime == null && list[1].taskName !== '车辆管理员审批'){
            let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description1 = "用车:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
            let title2 = "车辆管理员:" + list[0].assignee.xingming;
            let description2 = "用车:审批通过:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
            let title3 = list[1].assignee.liuchengjuesemingcheng + ":" +  list[1].assignee.xingming;
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
        }else if(list.length == 2 && list[1].endTime !== null && list[1].taskName !== '车辆管理员审批'){
            let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description1 = "用车:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
            let title2 = "车辆管理员:" + list[0].assignee.xingming;
            let description2 = "用车:审批通过:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
            let title3 = list[1].assignee.liuchengjuesemingcheng + ":" +  list[1].assignee.xingming;
            let description3 = '';
            if (info.form.cheliangshenpiliuzhuangtai === '同意') {
                description3 = "用车:审批通过:" + moment(list[1].endTime).format('YYYY-MM-DD HH:mm:ss');
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
            } else {
                description3 = "用车:审批拒绝:" + moment(list[1].endTime).format('YYYY-MM-DD HH:mm:ss');
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
            let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description1 = "用车:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
            let title2 = "车辆管理员:" + list[0].assignee.xingming;
            let description2 = "用车:审批通过:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
            let title3 = list[1].assignee.liuchengjuesemingcheng + ":" +  list[1].assignee.xingming;
            let description3 = "用车:审批通过:" + moment(list[1].endTime).format('YYYY-MM-DD HH:mm:ss');
            let title4 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description4 = "还车:申请时间:" +moment(list[2].startTime).format('YYYY-MM-DD HH:mm:ss');
            let title5 = "车辆管理员:" + list[2].assignee.xingming;
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
                        <Step title={title5} description="待审批" status="process"/>
                    </Steps>
                </div>
            )
        }else if(list.length == 3 && list[2].endTime !== null) {
            let title1 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description1 = "用车:申请时间:" + moment(info.startTime).format('YYYY-MM-DD HH:mm:ss');
            let title2 = "车辆管理员:" + list[0].assignee.xingming;
            let description2 = "用车:审批通过:" +moment(list[0].endTime).format('YYYY-MM-DD HH:mm:ss');
            let title3 = list[1].assignee.liuchengjuesemingcheng + ":" +  list[1].assignee.xingming;
            let description3 = "用车:审批通过:" + moment(list[1].endTime).format('YYYY-MM-DD HH:mm:ss');
            let title4 = info.form.faqirenliuchengjuese + ":" + info.form.shenqingyongcherenyuan;
            let description4 = "还车:申请时间:" +moment(list[2].startTime).format('YYYY-MM-DD HH:mm:ss');
            let title5 = "车辆管理员:" + list[2].assignee.xingming;
            let description5 = "还车:审批通过:" + moment(list[2].endTime).format('YYYY-MM-DD HH:mm:ss');
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
                            <Step title={title5} description={description5} status="finish"/>
                        </Steps>
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
                title: '车牌号码',
                dataIndex: 'chepaihaoma'
            },
            {
                title: '姓名',
                dataIndex: 'suicherenyuan'
            }
        ]

        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                colSpan: 0,
                className: 'hidden_col'
            },
            {
                title: '超期结束时间',
                dataIndex: 'gengxinshijian'
            },
            {
                title: '超期理由',
                dataIndex: 'chaoqiliyou'
            }]



        return (
            <div>
                {stepList}
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>用车基本信息
                </p>
                <Tag id="myTag3">车牌号码: {form.chepaihaoma}</Tag>
                <Tag id="myTag3">申请时间: {info['startTime']}</Tag>
                <Tag id="myTag3">申请人: {form.shenqingyongcherenyuan}</Tag>
                <Tag id="myTag3">申请人机构名称: {form.jigoumingcheng}</Tag>
                <Tag id="myTag3">所属部门: {form.suoshubumen}</Tag>
                <Tag id="myTag3">当前抄送人: {form.chaosongrenyuanxingming}</Tag>
                {/*<Tag id="myTag3">用车开始时间: {form.jihuachucheshijian}</Tag>*/}
                {/*<Tag id="myTag3">用车结束时间: {form.jihuaguiduishijian}</Tag>*/}
                <Tag id="myTag3">出营时间: {form.jihuachucheshijian}</Tag>
                <Tag id="myTag3">归营时间: {form.jihuaguiduishijian}</Tag>
                <Tag id="myTag3">用车时长: {form.yongcheshichang}</Tag>
                <Tag id="myTag3">目的地点: {form.mudididian}</Tag>
                <Tag id="myTag3">是否已出辖区: {form.yichuxiaqu}</Tag>
                <Tag id="myTag3">申请单状态: {form.cheliangshenqingdanzhuangtai}</Tag>
                <br/>
                <div id="yichangtuogang">用车原因 : {form.yongcheliyou}</div>
                <br/>
                {/*<Tag id="myTag3">是否超期: {form.}</Tag>*/}
                {/*<Tag id="myTag3">超期结束时间: {info['gengxinshijian']}</Tag>*/}

                {/*<p>*/}
                {/*    <Icon type="info" style={{color: '#1890ff'}}/>随车人员*/}
                {/*</p>*/}
                {/*<Table*/}
                {/*    columns={columns}*/}
                {/*    dataSource={this.state.suicherenyuanList}*/}
                {/*/>*/}
                {/*<p>*/}
                {/*    <Icon type="info" style={{color: '#1890ff'}}/>超期记录*/}
                {/*</p>*/}
                {/*<Table*/}
                {/*    columns={columns2}*/}
                {/*    dataSource={this.state.form}*/}
                {/*/>*/}
            </div>
        );
    }
}

const AppForm = Form.create()(App);
export default AppForm;
