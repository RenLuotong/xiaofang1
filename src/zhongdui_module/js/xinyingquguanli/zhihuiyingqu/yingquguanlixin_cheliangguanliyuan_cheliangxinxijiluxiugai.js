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
            cheliangxinxiInfo:{},
            bumenList:[],
            //显示所属部门框
            showbumen: 'none',
            //显示车主姓名框
            showguanliren: 'none',
            renyuanList: [],
        };
    }

    renyuanList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqudangqianyingquRenyuanLiebiao",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    renyuanList: list,
                });
            }
        });
    }

    toUpdate() {
        const THE = this;
        let cheliangxinxiInfo = THE.state.cheliangxinxiInfo
        $.ajax({
            type : 'POST',
            url : SERVER+"updateYingqucheliang",
            data : JSON.stringify(cheliangxinxiInfo),
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
            url : SERVER+"Yingqucheliangxinxi?id="+id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    cheliangxinxiInfo: data.data,
                });
            }
        });
    }

    //获取部门list
    getBumenList() {
        const THE = this;
        let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
        $.ajax({
            type:'GET',
            url: SERVER+ "bumenXialaLiebiao?jigoumingcheng="+jigoumingcheng,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                }
                THE.setState({
                    bumenList: data.data,
                });
            }
        });
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu";
        }else {
            window.location.href = "./zhidui.html#/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu";
        }
    }

    componentDidMount () {
        this.getInfo();
        this.getBumenList();
        this.renyuanList();
    }

    //选择所属部门
    suosubumenChange(value) {
        let cheliangxinxiInfo = this.state.cheliangxinxiInfo;
        cheliangxinxiInfo['suosubumen'] = value;
        this.setState({
            cheliangxinxiInfo : cheliangxinxiInfo
        });
    }

    //选择车辆管理人员
    guanlirenyuanChange(value) {
        let cheliangxinxiInfo = this.state.cheliangxinxiInfo;
        cheliangxinxiInfo['cheliangguanliren'] = value;
        this.setState({
            cheliangxinxiInfo : cheliangxinxiInfo
        });
    }

    //选择车辆类型
    cheliangleixingChange(value) {
        let cheliangxinxiInfo = this.state.cheliangxinxiInfo;
        cheliangxinxiInfo['cheliangleixing'] = value;
        this.setState({
            cheliangxinxiInfo : cheliangxinxiInfo
        });
        if(value == '公务车'){
            this.setState({
                showbumen: 'inline-block',
                showguanliren: 'none'
            });
        }else if(value == '私家车'){
            this.setState({
                showbumen: 'none',
                showguanliren: 'inline-block'
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let cheliangxinxiInfo = this.state.cheliangxinxiInfo;
        cheliangxinxiInfo[name] = value;
        this.setState({
            cheliangxinxiInfo : cheliangxinxiInfo
        });
    }

    render() {
        let bumenOptions = this.state.bumenList.map(item => <Select.Option key={item['key']} value={item['bumenmingcheng']}>{item['bumenmingcheng']}</Select.Option>);
        let info = this.state.cheliangxinxiInfo;
        let renyuanList = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>);

        return (
            <div>
                <label>车辆品牌:</label>
                <Input size="default" id="ppmc_ipt" name="cheliangpinpai" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['cheliangpinpai']}/>
                <label>车牌号码:</label>
                <Input size="default" id="ppmc_ipt" name="chepaihaoma" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['chepaihaoma']}/>
                <label>车辆类别:</label>
                <Select value={info['cheliangleixing']} onChange={this.cheliangleixingChange.bind(this)} style={{margin:10,width:200}}>
                    <Select.Option value="公务车">公务车</Select.Option>
                    <Select.Option value="私家车">私家车</Select.Option>
                </Select>
                <br/>
                {/*<div style={{display: this.state.showbumen}}>*/}
                {/*    <label >所属部门:</label>*/}
                {/*    <Select value={info['suosubumen']} onChange={this.suosubumenChange.bind(this)}style={{margin:10,width:200}}>*/}
                {/*        {bumenOptions}*/}
                {/*    </Select>*/}
                {/*</div>*/}
                <div style={{display: this.state.showbumen}}>
                    <label >GPS设备ID:</label>
                    <Input size="default" id="gpsshebeiid" name="gpsshebeiid" onChange={this.handleInputChange.bind(this)} style={{margin:10,width:200}} value={info['gpsshebeiid']}/>
                </div>
                <div style={{display: this.state.showguanliren}}>
                    <label>车主姓名:</label>
                    <Select value={info['cheliangguanliren']} onChange={this.guanlirenyuanChange.bind(this)} style={{margin:10,width:200}}>
                        {renyuanList}
                    </Select>
                </div>
                <br/>
                <Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
            </div>
        );
    }
}

export default App;
