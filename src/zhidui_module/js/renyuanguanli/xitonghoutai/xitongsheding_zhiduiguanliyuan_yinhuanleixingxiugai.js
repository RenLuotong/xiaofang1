import React from 'react';
import ReactDOM from 'react-dom';
import {
    message,
    Upload,
    Modal,
    Icon,
    Input,
    Button,
    Select, Form
} from 'antd';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            info:{},
        };
    }


    toUpdate() {
        const THE = this;
        if (!confirm("确定修改此隐患类型！")) {
            return;
        }
        let obj = this.state.info;
        let leixingzhi = obj.leixingzhi;
        let id = obj.id
        $.ajax({
            type : 'POST',
            url : SERVER + "xiugaiYinhuanleibie?leixingzhi="+leixingzhi+"&id="+id,
            dataType : 'json',
            contentType : "application/json",
            success : function(data){
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("修改隐患类型成功");
                THE.backPage();
            },
        });
    }

    backPage() {
        window.location.href = "./xitong.html#/xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli";
    }



    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        let info = this.state.info;
        info.leixingzhi = value;
        this.setState({
            info
        });
    }

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "chaxunYinhuanleibie?id=" + id,
            success : function (data) {
                let obj={}
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
                    obj.id = data.data.content[i]["id"];
                    obj.leixingzhi = data.data.content[i]["leixingzhi"]
                }
                THE.setState({
                    info: obj,
                });
            }
        });
    }


    componentDidMount () {
        this.getInfo();
    }

    render() {

        const {info} = this.state;
        return (
            <div>
                <div>
                    <label>隐患类型名称:</label>
                    <Input size="default" value={info.leixingzhi} style={{margin:10,width:200}} onChange={this.handleInputChange.bind(this)}/>
                    <Button type="primary" icon="check" onClick={this.toUpdate.bind(this)}>保存</Button>
                </div>
            </div>
        );
    }
}

export default App;
