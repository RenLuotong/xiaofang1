import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import moment from 'moment';
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
} from 'antd';
const { TextArea } = Input;
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
            infoList:[],
            id:this.props.match.params.id,
        };
    }
    //获取文章内容详情
    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "tb-wenzhangs/wenzhangxiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if (data.data.gengxinshijian != null && data.data.gengxinshijian != "") {
                    data.data.gengxinshijian = moment(data.data.gengxinshijian).format('YYYY-MM-DD');
                }
                THE.setState({
                    infoList: data.data,
                });
            }
        });
    }


    componentWillMount () {
        this.getInfo();
    }


    render() {
        let infoList = this.state.infoList;
        return(
            <div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>文章内容详情
                </p>
                <p id="zstitle">{infoList['biaoti']}</p>
                <p id="zsauthor">作者：{infoList['zuozhe']}</p>
                <p id="zsdate">日期：{infoList['gengxinshijian']}</p>
                <label>文章内容:</label>
                <br/>
                <div id="zsarticle" dangerouslySetInnerHTML={{__html: infoList['neirong']}}></div>
            </div>
        )
    }
}
const AppComp = Form.create()(App);
export default Appmain;
