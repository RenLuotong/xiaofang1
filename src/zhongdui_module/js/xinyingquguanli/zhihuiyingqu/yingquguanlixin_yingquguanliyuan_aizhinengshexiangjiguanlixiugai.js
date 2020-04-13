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
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
        }else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
        }
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

    shengchanchangjiaChange(value) {
        let getInfo = this.state.getInfo;
        getInfo['shengchanchangjia'] = value;
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
                <label>设备序号:</label>
                <Input name="shebeixuliehao" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['shebeixuliehao']}/>
                <label>IP地址:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <Input name="juyuwangip" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['juyuwangip']}/>
                <br/>
                <label>端口号:&#12288;</label>
                <Input name="juyuwangduankou" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['juyuwangduankou']}/>
                <label>设备地点:</label>
                <Input name="weizhi" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['weizhi']}/>
                <br/>
                <label>设备用途:</label>
                <Select value={info['yongtu']} onChange={this.yongtuChange.bind(this)} style={{margin:10,width:200}}>
                    <Select.Option value="TUOGANGLIGANG">检测人员脱岗离岗</Select.Option>
                    <Select.Option value="TUOGANGDAODI">检测人员脱岗倒地</Select.Option>
                </Select>
                <label>生产厂家:</label>
                <Select value={info['shengchanchangjia']} onChange={this.shengchanchangjiaChange.bind(this)} style={{margin:10,width:200}}>
                    <Select.Option value="海康">海康</Select.Option>
                    <Select.Option value="源鸿">源鸿</Select.Option>
                </Select>
                <br/>
                <label>设备账号:</label>
                <Input name="zhanghao" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['zhanghao']}/>
                <label>设备密码:</label>
                <Input name="mima" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['mima']}/>
                <br/>
                <Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
            </div>
        )
    }
}

export default App;
