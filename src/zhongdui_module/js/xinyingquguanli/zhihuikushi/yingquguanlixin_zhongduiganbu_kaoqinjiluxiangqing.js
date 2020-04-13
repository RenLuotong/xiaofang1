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
    Tag,
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
            getInfo:{},
            id:this.props.match.params.id,
            kaoqinzhaopians:[]

        };
    }
    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "getYingqukaoqinjiluById?id="+id,
            success : function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if (data.data.gengxinshijian != null && data.data.gengxinshijian != "") {
                    data.data.gengxinshijian = moment(data.data.gengxinshijian).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data.zhaopianlujing != null && data.data.zhaopianlujing != "") {
                    let obj = {};
                    obj.url = data.data.zhaopianlujing;
                    obj.key = 1;
                    list.push(obj);
                }
                THE.setState({
                    getInfo:data.data,
                    kaoqinzhaopians:list,
                });
            }
        });
    }

    componentDidMount () {
        this.getInfo();
    }


    render() {
        let infoList = this.state.getInfo;
        let imgs = this.state.kaoqinzhaopians.map(item =>
            <img src={item['url']}  style={{margin:10,width:300,height:300}}/>
        );

        return(
            <div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>考勤记录基本信息
                </p>
                <Tag id="myTag">机构名称 : {infoList['jigoumingcheng']}</Tag>
                <Tag id="myTag">人员姓名 : {infoList['xingming']}</Tag>
                <Tag id="myTag">验证类型 : {infoList['leixing']}</Tag>
                <br/>
                <Tag id="myTag">考勤类型 : {infoList['leixing2']}</Tag>
                <Tag id="myTag">考勤时间 : {infoList['gengxinshijian']}</Tag>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>人脸照片
                </p>
                {imgs}
            </div>
        )
    }
}
const AppComp = Form.create()(App);
export default Appmain;
