import React, { Component } from 'react';
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
    Popover
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

        };
    }

    toCreate() {
        const THE = this;
        let lanmumingcheng = $("#lanmumingcheng").val().trim();
        if (lanmumingcheng == "") {
            message.error("请输入栏目名称！");return;
        }
        let lanmumiaoshu = $("#lanmumiaoshu").val().trim();
        if (lanmumiaoshu == "") {
            message.error("请输入栏目描述！");return;
        }
        if (!confirm("确定添加此栏目！")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER+"tb-lanmus/xinzeng?mingcheng="+lanmumingcheng+"&miaoshu="+lanmumiaoshu,
            data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("添加成功");
                THE.backPage();
            }
        });
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="大队"){
            window.location.href = "./dadui.html#/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang";
        }
        else if (role=="中队") {
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang";
        }
        else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang";
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <label>栏目名称:</label>
                <Input size="default" id="lanmumingcheng" style={{margin:10,width:200}}/>
                <br/>
                <label>栏目描述:</label>
                <br/>
                <TextArea autosize={{minRows:3}} id="lanmumiaoshu" style={{width:500}}/>
                <br/>
                <br/>
                <br/>
                <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
