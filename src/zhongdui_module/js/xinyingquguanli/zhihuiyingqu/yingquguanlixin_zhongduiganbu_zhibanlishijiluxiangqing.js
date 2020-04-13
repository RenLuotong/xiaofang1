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
    Tag
} from 'antd';
import moment from "moment";

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
            infoList: [],
            id:this.props.match.params.id,
        };
    }
    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "tb_zhiban/zhibanxiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if (data.data.jihuakaishishijian != null && data.data.jihuakaishishijian != "") {
                    data.data.jihuakaishishijian = moment(data.data.jihuakaishishijian).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data.jihuajieshushijian != null && data.data.jihuajieshushijian != "") {
                    data.data.jihuajieshushijian = moment(data.data.jihuajieshushijian).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data.shijiyihaoshanggangshijian != null && data.data.shijiyihaoshanggangshijian != "") {
                    data.data.shijiyihaoshanggangshijian = moment(data.data.shijiyihaoshanggangshijian).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data.shijiyihaoxiagangshijian != null && data.data.shijiyihaoxiagangshijian != "") {
                    data.data.shijiyihaoxiagangshijian = moment(data.data.shijiyihaoxiagangshijian).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data.shijierhaoshanggangshijian != null && data.data.shijierhaoshanggangshijian != "") {
                    data.data.shijierhaoshanggangshijian = moment(data.data.shijierhaoshanggangshijian).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data.shijierhaoxiagangshijian != null && data.data.shijierhaoxiagangshijian != "") {
                    data.data.shijierhaoxiagangshijian = moment(data.data.shijierhaoxiagangshijian).format('YYYY-MM-DD HH:mm:ss');
                }
                THE.setState({
                    infoList: data.data,
                });
            }
        });
    }

    componentDidMount () {
        this.getInfo();
    }


    render() {
        let infoList = this.state.infoList;

        return(
            <div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>值班记录基本信息
                </p>

                <Tag id="myTag">计划值班开始时间 : {infoList['jihuakaishishijian']}</Tag>
                <Tag id="myTag">计划值班结束时间 : {infoList['jihuajieshushijian']}</Tag>
                <br/>
                <Tag id="myTag">计划1号值班人 : {infoList['extraJihuayihaozhibanrenXingming']}</Tag>
                <Tag id="myTag">计划2号值班人 : {infoList['extraJihuaerhaozhibanrenXingming']}</Tag>
                <Tag id="myTag">录入人姓名 : {infoList['chuangjiangrenxingming']}</Tag>
                <br/>
                <Tag id="myTag">实际1号值班人 : {infoList['extraShijiyihaozhibanrenXingming']}</Tag>
                <Tag id="myTag">实际1号上岗时间 : {infoList['shijiyihaoshanggangshijian']}</Tag>
                <Tag id="myTag">实际1号下岗时间 : {infoList['shijiyihaoxiagangshijian']}</Tag>
                <br/>
                <Tag id="myTag">实际2号值班人 : {infoList['extraShijierhaozhibanrenXingming']}</Tag>
                <Tag id="myTag">实际2号上岗时间 : {infoList['shijierhaoshanggangshijian']}</Tag>
                <Tag id="myTag">实际2号下岗时间 : {infoList['shijierhaoxiagangshijian']}</Tag>
            </div>
        )
    }
}
const AppComp = Form.create()(App);
export default Appmain;
