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
            xiaoduzhaopians:[]
        };
    }

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "jiashujiedaishixiangqingById?id=" + id,
            success : function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if (data.data.dasaowanchengshijian != null && data.data.dasaowanchengshijian != "") {
                    data.data.dasaowanchengshijian = moment(data.data.dasaowanchengshijian).format('YYYY-MM-DD');
                }
                for(let i = 0;i<data.data.xiaoduzhaopianList.length;i++){
                    let obj = {};
                    obj.url = data.data.xiaoduzhaopianList[i];
                    obj.key = i;
                    list.push(obj);
                }
                THE.setState({
                    infoList: data.data,
                    xiaoduzhaopians: list,
                });
            }
        });
    }




    componentDidMount() {
        this.getInfo();
    }

    render() {
        let infoList = this.state.infoList;
        let imgs = this.state.xiaoduzhaopians.map(item =>
            <img src={item['url']}  style={{margin:10,width:300,height:300}}/>
        );


        return (
            <div>
                <p>
                <Icon type="info" style={{color: '#1890ff'}}/>接待室打扫基本信息
                </p>
                <Tag id="myTag">接待室 : {infoList['extraFangjianmingcheng']}</Tag>
                <Tag id="myTag">打扫完成时间 : {infoList['dasaowanchengshijian']}</Tag>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>接待室打扫情况图片
                </p>
                {imgs}
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
