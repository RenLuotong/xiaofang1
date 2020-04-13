import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';

import 'antd/dist/antd.css';
import {
    message,
    DatePicker,
    Select,
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Input,
    Form,
    Button,
    Table,
    Divider
} from 'antd';

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            renyuanInfo:{},
        };
    }


    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan";
        }else{
            window.location.href = "./zhidui.html#/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan";
        }

    }

    editPw() {
        let zhouci = this.zhouci;
        if (typeof (zhouci)=="undefined"||zhouci == null||zhouci == ""){
            message.error("请选择周次！");return;
        }
        if (!confirm("确定修改周次！")) {
            return;
        }
        const THE = this;
        $.ajax({
            type : 'POST',
            url : SERVER+"shoujiguankong/xiugaizhouci",
            data : JSON.stringify(zhouci),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.backPage();
            },
        });
    }

    zhouci = []
    zhouciChang(value) {
        this.zhouci = value;
    }

    componentDidMount() {
    }

    render() {

        return (
            <div>
                    <label>周次:</label>
                    <Select style={{margin:10,width:400}} mode="multiple"  onChange={this.zhouciChang.bind(this)}>
                        <Select.Option value="MONDAY">周一</Select.Option>
                        <Select.Option value="TUESDAY">周二</Select.Option>
                        <Select.Option value="WEDNESDAY">周三</Select.Option>
                        <Select.Option value="THURSDAY">周四</Select.Option>
                        <Select.Option value="FRIDAY">周五</Select.Option>
                        <Select.Option value="SATURDAY">周六</Select.Option>
                        <Select.Option value="SUNDAY">周日</Select.Option>
                    </Select>
                    <Button type="primary" onClick={this.editPw.bind(this)}>提交</Button>
            </div>
        );
    }
}


