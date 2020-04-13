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
            url : SERVER + "shoujiguankong/xiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if (data.data.gaojingshijian != null && data.data.gaojingshijian != "") {
                    data.data.gaojingshijian = moment(data.data.gaojingshijian).format('YYYY-MM-DD HH:mm:ss');
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
                    <Icon type="info" style={{color: '#1890ff'}}/>手机脱岗记录基本信息
                </p>

                <Tag id="myTag">告警时间 : {infoList['gaojingshijian']}</Tag>


            </div>
        )
    }
}
const AppComp = Form.create()(App);
export default Appmain;
