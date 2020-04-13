import React from 'react';
import {
    message,
    Select,
    Input,
    Button,
} from 'antd';
const { TextArea } = Input;

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            getInfo:{},
            renyuanList: [],
        };
    }

    renyuanList() {
        let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "renyuanXialiaLiebiao?jigoumingcheng=" + jigoumingcheng,
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

    shejirenyuanChange(value) {
        let getInfo = this.state.getInfo;
        getInfo['tuogangrenbianhao'] = value;
        this.setState({
            getInfo : getInfo
        });
    }


    toUpdate() {
        const THE = this;
        let id = THE.state.id;
        let shejirenyuan = this.state.getInfo['tuogangrenbianhao'];
        if (shejirenyuan == "") {
            message.error("请选择涉及人员！");return;
        }
        let tuogangmiaoshu = this.state.getInfo['tuogangmiaoshu'];
        if (tuogangmiaoshu == "") {
            message.error("请输入异常描述！");return;
        }
        $.ajax({
            type : 'POST',
            url : SERVER+"tb_zhibantuogang/bianjituogangjilu?id="+id+"&shejirenyuanbianhao="+shejirenyuan+"&miaoshu="+tuogangmiaoshu,
            data : JSON.stringify(),
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
            url : SERVER + "tb_zhibantuogang/tuogangxiangqing?id="+id,
            success : function (data) {
                let list = [];
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
        window.location.href = "./zhongdui.html#/yingquguanlixin_banzhang_yichangtuogangjilu";
    }

    componentDidMount () {
        this.getInfo();
        this.renyuanList();
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
        let renyuanList = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>);
        const info = this.state.getInfo;
        return(
            <div>
                <label>涉及人员 :</label>
                <Select style={{margin:10,width:200}} value={info['tuogangrenbianhao']} onChange={this.shejirenyuanChange.bind(this)}>
                {renyuanList}
                </Select>
                <br/>
                <label>异常描述 :</label>
                <br/>
                <TextArea autosize={{minRows:3}} id="tuogangmiaoshu" name="tuogangmiaoshu" style={{width:500}}  onChange={this.handleInputChange.bind(this)} value={info['tuogangmiaoshu']}/>
                <br/>
                <Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
            </div>
        )
    }
}

export default App;
