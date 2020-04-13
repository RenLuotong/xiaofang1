import React, { Component } from 'react';
import {Card,message,Steps,Icon,Row,Col,Tag} from 'antd';
import moment from 'moment';

const Step = Steps.Step;

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            zhuangbeiInfo:{},
        };
    }

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "xqzhuangbeichuruku?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if (data.data.caozuoshijian != null && data.data.caozuoshijian != "") {
                    data.data.caozuoshijian = moment(data.data.caozuoshijian).format('YYYY-MM-DD HH:mm:ss');
                }
                THE.setState({
                    zhuangbeiInfo: data.data,
                });
            }
        });
    }



    componentDidMount(){
        this.getInfo();
    }

    render(){

        let info = this.state.zhuangbeiInfo;

        return(
            <div>
                <Card id="myCard" style={{'fontSize': '20px'}}>
                    <p>
                        <Icon type="info" style={{color: '#1890ff'}}/>基本信息
                    </p>
                    <Tag id="myTag">操作人姓名 : {info['caozuorenxingming']}</Tag>
                    <Tag id="myTag">操作类型 : {info['leixing']}</Tag>
                    <Tag id="myTag">操作时间 : {info['caozuoshijian']}</Tag>
                    <Tag id="myTag">装备类型名称 : {info['zhuangbeimingcheng']}</Tag>
                    <Tag id="myTag">装备规格名称 : {info['zhuangbeiguige']}</Tag>
                    <Tag id="myTag">装备型号名称 : {info['zhuangbeixinghao']}</Tag>
                    <Tag id="myTag">仓库名称 : {info['xiancangkumingcheng']}</Tag>
                    <Tag id="myTag">货架名称 : {info['xianhuojiamingcheng']}</Tag>
                </Card>
            </div>
        );
    }
}

export default App;
