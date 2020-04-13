import React from 'react';
import ReactDOM from 'react-dom';
import {
    message,
    Input,
    Button,
} from 'antd';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    toCreate() {
        const THE = this;
        let yinhuanleixing = $("#yinhuanleixing").val().trim();
        if (yinhuanleixing == "") {
            message.error("请输入隐患类型名称！");
            return;
        }
        if (!confirm("确定添加此隐患类型")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER+"addYinhuanleibie?leixingzhi=" + yinhuanleixing,
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
        window.location.href = "./xitong.html#/xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli";
    }

    render() {

        return (
            <div>
                <div>
                    <label>隐患类型名称:</label>
                    <Input size="default" id="yinhuanleixing" style={{margin:10,width:200}}/>
                    <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
                </div>
            </div>
        );
    }
}

export default App;
