import React from 'react';
import {
    message,
    Select,
    Input,
    Button,
} from 'antd';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            getInfo:{},
        };
    }

    toUpdate() {
        const THE = this;
        let getInfo = THE.state.getInfo
        $.ajax({
            type : 'POST',
            url : SERVER+"updateshebei",
            data : JSON.stringify(getInfo),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);return;
                }
                message.success(data.message);
                THE.backPage();
            }
        });
    }

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER+"shebeixinxi?id="+id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    getInfo: data.data,
                });
            }
        });
    }

    backPage() {
        window.location.href = "./zhongdui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
    }

    componentDidMount () {
        this.getInfo();
    }

    yongtuChange(value) {
        let getInfo = this.state.getInfo;
        getInfo['yongtu'] = value;
        this.setState({
            getInfo : getInfo
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let getInfo = this.state.getInfo;
        getInfo[name] = value;
        this.setState({
            getInfo : getInfo
        });
    }

    render() {
        const info = this.state.getInfo;
        return(
            <div>
                <label>设备序号 :</label>
                <Input size="default" name="shebeixuliehao" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['shebeixuliehao']}/>
                <label>设备地点 :</label>
                <Input size="default" name="weizhi" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['weizhi']}/>
                <br/>
                <label>设备用途 :</label>
                <Select value={info['yongtu']} onChange={this.yongtuChange.bind(this)} style={{margin:10,width:200}}>
                    <Select.Option value="巡更">巡更</Select.Option>
                    <Select.Option value="查铺">查铺</Select.Option>
                    <Select.Option value="请假销假">请假销假</Select.Option>
                </Select>
                <br/>
                <Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
            </div>
        )
    }
}

export default App;
