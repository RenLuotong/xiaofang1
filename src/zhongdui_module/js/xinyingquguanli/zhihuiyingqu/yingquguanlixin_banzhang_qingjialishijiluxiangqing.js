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
            shenqingdanbianhao:this.props.match.params.shenqingdanbianhao,
            shenpiList:[],
        };
    }
    getInfo() {
        const THE = this;
        let shenqingdanbianhao = THE.state.shenqingdanbianhao;
        $.ajax({
            type : 'GET',
            url : SERVER + "huoquqingjiaxiangqing?shenqingdanbianhao=" + shenqingdanbianhao,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if ( data.data["shenqingshijian"] !== null &&  data.data["shenqingshijian"] !== '') {
                    data.data["shenqingshijian"] = moment(data.data["shenqingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                }
                if ( data.data["qingjiakaishishijian"] !== null &&  data.data["qingjiakaishishijian"] !== '') {
                    data.data["qingjiakaishishijian"] = moment(data.data["qingjiakaishishijian"]).format('YYYY-MM-DD HH:mm:ss');
                }
                if ( data.data["qingjiajieshushijian"] !== null &&  data.data["qingjiajieshushijian"] !== '') {
                    data.data["qingjiajieshushijian"] = moment(data.data["qingjiajieshushijian"]).format('YYYY-MM-DD HH:mm:ss');
                }
                if ( data.data["chuyingshijian"] !== null &&  data.data["chuyingshijian"] !== '') {
                    data.data["chuyingshijian"] = moment(data.data["chuyingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                }
                if ( data.data["guiyingshijian"] !== null &&  data.data["guiyingshijian"] !== '') {
                    data.data["guiyingshijian"] = moment(data.data["guiyingshijian"]).format('YYYY-MM-DD HH:mm:ss');
                }
                console.log(data.data.qingjiashenpijinduDtoList)
                THE.setState({
                    info: data.data,
                    shenpiList:data.data.qingjiashenpijinduDtoList
                });
            }
        });
    }

    componentDidMount () {
        this.getInfo();
    }


    render() {
        let info = this.state.info;

        let list = this.state.shenpiList;
        let shenpijindu = info.shenqingzhuangtai;
        let qingjialeixing = info.qingjialeixing;
        let jigoumingcheng = info.jigoumingcheng;
        let Step = Steps.Step;
        let stepList;

        //if(qingjialeixing !== '轮休'){
            if(shenpijindu == "申请中" && (jigoumingcheng === '特勤中队' || jigoumingcheng === '战保大队') && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                if (list.length == 1) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title="班长" description="待审批" status="process" icon={<Icon type="user" />}/>
                            <Step title="中队领导" description="待审批" status="wait" icon={<Icon type="user" />}/>
                            <Step title="支队领导" description="待审批" status="wait" icon={<Icon type="user" />}/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "申请中" && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                if (list.length == 1) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title="班长" description="待审批" status="process" icon={<Icon type="user" />}/>
                            <Step title="中队领导" description="待审批" status="wait" icon={<Icon type="user" />}/>
                            <Step title="大队领导" description="待审批" status="wait" icon={<Icon type="user" />}/>
                            <Step title="支队领导" description="待审批" status="wait" icon={<Icon type="user" />}/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "申请中"){
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                if (list.length == 1) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title="班长" description="待审批" status="process" icon={<Icon type="user" />}/>
                            <Step title="中队领导" description="待审批" status="wait" icon={<Icon type="user" />}/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "班长已批准" && (jigoumingcheng === '特勤中队' || jigoumingcheng === '战保大队') && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                if (list.length == 2) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title="中队领导" description="待审批" status="process" icon={<Icon type="user" />}/>
                            <Step title="支队领导" description="待审批" status="wait" icon={<Icon type="user" />}/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "班长已批准" && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                if (list.length == 2) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title="中队领导" description="待审批" status="process" icon={<Icon type="user" />}/>
                            <Step title="大队领导" description="待审批" status="wait" icon={<Icon type="user" />}/>
                            <Step title="支队领导" description="待审批" status="wait" icon={<Icon type="user" />}/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "班长已批准") {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                if (list.length == 2) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title="中队领导" description="待审批" status="process" icon={<Icon type="user" />}/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "班长已拒绝") {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批拒绝 ";
                if (list.length == 2) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep" current={1}status="error">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="error"/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "中队领导已批准" && (jigoumingcheng === '特勤中队' || jigoumingcheng === '战保大队') && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                if (list.length == 3) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title={title3} description={description3} status="finish"/>
                            <Step title="支队领导" description="待审批" status="process" icon={<Icon type="user" />}/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "中队领导已批准" && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                if (list.length == 3) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title={title3} description={description3} status="finish"/>
                            <Step title="大队领导" description="待审批" status="process" icon={<Icon type="user" />}/>
                            <Step title="支队领导" description="待审批" status="wait" icon={<Icon type="user" />}/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "中队领导已批准") {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批拒绝 ";
                if (list.length == 3) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "中队领导已拒绝") {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批拒绝 ";
                if (list.length == 3) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep" current={2}status="error">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title={title3} description={description3} status="error"/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "大队领导已批准") {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "大队领导 ";
                let description4 = "审批通过 ";
                if (list.length == 4) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
                            <Step title="支队领导" description="待审批" status="process" icon={<Icon type="user" />}/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "大队领导已拒绝") {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "大队领导 ";
                let description4 = "审批拒绝 ";
                if (list.length == 4) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep" current={3}status="error">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title={title3} description={description3} status="finish"/>
                            <Step title={title4} description={description4} status="error"/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "已同意" && (jigoumingcheng === '特勤中队' || jigoumingcheng === '战保大队') && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "支队领导 ";
                let description4 = "审批通过 ";
                if (list.length == 4) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "已同意" && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "大队领导 ";
                let description4 = "审批通过 ";
                let title5 = "支队领导 ";
                let description5 = "审批通过 ";
                if (list.length == 5) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title5 += list[4].xingming;
                    description5 += moment(list[4].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "已同意") {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                if (list.length == 3) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "已拒绝" && (jigoumingcheng === '特勤中队' || jigoumingcheng === '战保大队') && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "支队领导 ";
                let description4 = "审批拒绝 ";
                if (list.length == 4) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep" current={3}status="error">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title={title3} description={description3} status="finish"/>
                            <Step title={title4} description={description4} status="error"/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "已拒绝" && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "大队领导 ";
                let description4 = "审批通过 ";
                let title5 = "支队领导 ";
                let description5 = "审批拒绝 ";
                if (list.length == 5) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title5 += list[4].xingming;
                    description5 += moment(list[4].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep" current={4}status="error">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title={title3} description={description3} status="finish"/>
                            <Step title={title4} description={description4} status="finish"/>
                            <Step title={title5} description={description5} status="error"/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "已拒绝") {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批拒绝 ";
                if (list.length == 3) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
                stepList = (
                    <div>
                        <p>
                            <Icon type="info" style={{color: '#1890ff'}}/>审批进度
                        </p>
                        <Steps id="myStep" current={2}status="error">
                            <Step title={title1} description={description1} status="finish"/>
                            <Step title={title2} description={description2} status="finish"/>
                            <Step title={title3} description={description3} status="error"/>
                        </Steps>
                    </div>
                )
            }else if(shenpijindu == "假期中" && (jigoumingcheng === '特勤中队' || jigoumingcheng === '战保大队') && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "支队领导 ";
                let description4 = "审批通过 ";
                if (list.length == 4) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "假期中" && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "大队领导 ";
                let description4 = "审批通过 ";
                let title5 = "支队领导 ";
                let description5 = "审批通过 ";
                if (list.length == 5) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title5 += list[4].xingming;
                    description5 += moment(list[4].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "假期中") {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                if (list.length == 3) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "已销假" && (jigoumingcheng === '特勤中队' || jigoumingcheng === '战保大队') && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "支队领导 ";
                let description4 = "审批通过 ";
                if (list.length == 4) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "已销假" && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "大队领导 ";
                let description4 = "审批通过 ";
                let title5 = "支队领导 ";
                let description5 = "审批通过 ";
                if (list.length == 5) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title5 += list[4].xingming;
                    description5 += moment(list[4].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "已销假") {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                if (list.length == 3) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "已超假" && (jigoumingcheng === '特勤中队' || jigoumingcheng === '战保大队') && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "支队领导 ";
                let description4 = "审批通过 ";
                if (list.length == 4) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "已超假" && qingjialeixing === '年休') {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                let title4 = "大队领导 ";
                let description4 = "审批通过 ";
                let title5 = "支队领导 ";
                let description5 = "审批通过 ";
                if (list.length == 5) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title4 += list[3].xingming;
                    description4 += moment(list[3].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title5 += list[4].xingming;
                    description5 += moment(list[4].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else if(shenpijindu == "已超假") {
                let title1 = "消防员 ";
                let description1 = "申请时间 ";
                let title2 = "班长 ";
                let description2 = "审批通过 ";
                let title3 = "中队领导 ";
                let description3 = "审批通过 ";
                if (list.length == 3) {
                    title1 += list[0].xingming;
                    description1 += moment(list[0].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title2 += list[1].xingming;
                    description2 += moment(list[1].handleTime).format('YYYY-MM-DD HH:mm:ss');
                    title3 += list[2].xingming;
                    description3 += moment(list[2].handleTime).format('YYYY-MM-DD HH:mm:ss');
                }
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
            }else {
                stepList = (
                    <div>无审批进度</div>
                )
            }
        // }else{
        //     <div></div>
        // }


        return(
            <div>
                {stepList}
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>基本信息
                </p>
                <Tag id="myTag">申请时间 : {info['shenqingshijian']}</Tag>
                <Tag id="myTag">计划请假时间 : {info['qingjiakaishishijian']}</Tag>
                <Tag id="myTag">计划销假时间 : {info['qingjiajieshushijian']}</Tag>
                <br/>
                <Tag id="myTag">请假类型 : {info['qingjialeixing']}</Tag>
                <Tag id="myTag">出营时间 : {info['chuyingshijian']}</Tag>
                <Tag id="myTag">归营时间 : {info['guiyingshijian']}</Tag>
                <br/>
                <Tag id="myTag">外出地点 : {info['waichudidian']}</Tag>
                <Tag id="myTag">审批状态 : {info['shenqingzhuangtai']}</Tag>
                <br/>
                <div id="yichangtuogang">请假原因 : {info['qingjiayuanyin']}</div>
            </div>
        )
    }
}
const AppComp = Form.create()(App);
export default Appmain;
