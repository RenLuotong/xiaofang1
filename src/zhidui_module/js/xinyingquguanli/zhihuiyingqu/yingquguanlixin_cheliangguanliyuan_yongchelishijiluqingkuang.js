import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import moment from 'moment';
import {
    message,
    Upload,
    Modal,
    Steps,
    Icon,
    Form,
    Table, Tabs,Tag
} from 'antd';
const { Step } = Steps;

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            pagination: {
                pageSize: 10,
                current: 1,
            },
            getInfo:{},
            suicherenyuanList:[],
            paicheChaoqiList:[],
            shenqingdanbianhao:this.props.match.params.shenqingdanbianhao,
        };
    }

    getInfo() {
        const THE = this;
        let shenqingdanbianhao = THE.state.shenqingdanbianhao;
        $.ajax({
            type : 'GET',
            url : SERVER + "paichexiangqing?shenqingdanbianhao="+shenqingdanbianhao,
            success : function (data) {
                let list = [];
                if (data.status != 0) {

                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.paicheChaoqiList.length; i++) {
                    if (data.data.paicheChaoqiList[i]["gengxinshijian"] != null) {
                        data.data.paicheChaoqiList[i]["gengxinshijian"] = moment(data.data.paicheChaoqiList[i]['gengxinshijian']).format('YYYY-MM-DD HH:mm:ss');
                    }
                }
                if (data.data["shenqingshijian"] != null) {
                    data.data["shenqingshijian"] = moment(data.data['shenqingshijian']).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data["paichekaishishijian"] != null) {
                    data.data["paichekaishishijian"] = moment(data.data['paichekaishishijian']).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data["paichejieshushijian"] != null) {
                    data.data["paichejieshushijian"] = moment(data.data['paichejieshushijian']).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data["gengxinshijian"] != null) {
                    data.data["gengxinshijian"] = moment(data.data['gengxinshijian']).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data["chuyingshijian"] != null) {
                    data.data["chuyingshijian"] = moment(data.data['chuyingshijian']).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data["guiyingshijian"] != null) {
                    data.data["guiyingshijian"] = moment(data.data['guiyingshijian']).format('YYYY-MM-DD HH:mm:ss');
                }
                THE.setState({
                    getInfo:data.data,
                    suicherenyuanList:data.data.suicherenyuanList,
                    paicheChaoqiList:data.data.paicheChaoqiList,
                });
            }
        });
    }




    componentDidMount () {
        this.getInfo();
    }


    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                colSpan: 0,
                className: 'hidden_col'
            },
            {
                title: '车牌号码',
                dataIndex: 'chepaihaoma'
            },
            {
                title: '姓名',
                dataIndex: 'xingming'
            }
        ]

        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                colSpan: 0,
                className: 'hidden_col'
            },
            {
                title: '超期结束时间',
                dataIndex: 'gengxinshijian'
            },
            {
                title: '超期理由',
                dataIndex: 'chaoqiliyou'
            }]

        let info = this.state.getInfo;

        return (
            <div>
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>用车基本信息
                </p>
                <Tag id="myTag3">车牌号码: {info['chepaihaoma']}</Tag>
                <Tag id="myTag3">申请时间: {info['shenqingshijian']}</Tag>
                <Tag id="myTag3">申请人: {info['shenqingren']}</Tag>
                <Tag id="myTag3">用车开始时间: {info['paichekaishishijian']}</Tag>
                <Tag id="myTag3">用车结束时间: {info['paichejieshushijian']}</Tag>
                <Tag id="myTag3">出营时间: {info['chuyingshijian']}</Tag>
                <Tag id="myTag3">归营时间: {info['guiyingshijian']}</Tag>
                <Tag id="myTag3">用车原因: {info['paicheyuanyin']}</Tag>
                <Tag id="myTag3">审批状态: {info['shenpizhuangtai']}</Tag>
                <Tag id="myTag3">是否超期: {info['shifouchaoqi']}</Tag>
                <Tag id="myTag3">超期结束时间: {info['gengxinshijian']}</Tag>

                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>随车人员
                </p>
                <Table
                    columns={columns}
                    dataSource={this.state.suicherenyuanList}
                    scroll={{ y: "calc(100vh - 500px)", x: true }}       
                />
                <p>
                    <Icon type="info" style={{color: '#1890ff'}}/>超期记录
                </p>
                <Table
                    columns={columns2}
                    dataSource={this.state.paicheChaoqiList}
                    scroll={{ y: "calc(100vh - 500px)", x: true }}       
                />
            </div>
        );
    }
}

const AppForm = Form.create()(App);
export default AppForm;
