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
import moment
    from "moment";
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
            getInfo:{},
            id:this.props.match.params.id,
            gaojingzhaopians:[]

        };
    }
    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "tb_zhibantuogang/tuogangxiangqing?id="+id,
            success : function (data) {
                let list = [];
                if (data.status != 0) {

                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.gaojingtuxiangdizhi.length;i++){
                    let obj = {};
                    obj.url = data.data.gaojingtuxiangdizhi[i];
                    obj.key = i;
                    list.push(obj);
                }
                THE.setState({
                    getInfo:data.data,
                    gaojingzhaopians:list,
                });
            }
        });
    }

    componentDidMount () {
        this.getInfo();
    }


    render() {
        let infoList = this.state.getInfo;
        let imgs = this.state.gaojingzhaopians.map(item =>
            <img src={item['url']}  style={{margin:10,width:300,height:300}}/>
        );

        return(
            <div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>异常脱岗基本信息
                </p>
                <Tag id="myTag">涉及人员 : {infoList['extraTuogangrenXingming']}</Tag>
                <br/>
                <div id="yichangtuogang">异常描述 : {infoList['tuogangmiaoshu']}</div>
                <br/>
                <div id="yichangtuogang">申诉理由 : {infoList['shensuliyou']}</div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>异常脱岗照片
                </p>
                {imgs}
            </div>
        )
    }
}
const AppComp = Form.create()(App);
export default Appmain;
