import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
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
    Popover, Card, Tag,Statistic
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
            pagination: {
                pageSize : 10,
                current : 1
            },
            jiluList: [],
            id:this.props.match.params.id,
            nianfen:this.props.match.params.nianfen,
            zhouci:this.props.match.params.zhouci,
            startTime:'',
            endTime:'',
            Date:new Date().getTime(),
            renyuanList: [],
            zhouyizhibanbanzhang:[],
            zhouerzhibanbanzhang :[],
            zhousanzhibanbanzhang :[],
            zhousizhibanbanzhang :[],
            zhouywuzhibanbanzhang :[],
            zhouliuzhibanbanzhang :[],
            zhourzhibanbanzhang :[],
            zhouyizhibanganbu : [],
            zhouerzhibanganbu : [],
            zhousanzhibanganbu : [],
            zhousizhibanganbu : [],
            zhouwuzhibanganbu : [],
            zhouliuzhibanganbu : [],
            zhourzhibanganbu : [],
        };
    }

    huoqushijian() {
        const THE = this;
        let zhouci = THE.state.zhouci;
        let nianfen = THE.state.nianfen;
        $.ajax({
            type: 'post',
            url: SERVER + "tb-zhouhouxuan-zhubiaos/chushihuaShijian?zhouci="+zhouci+"&nianfen="+nianfen,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    startTime: data.data.startTime,
                    endTime: data.data.endTime,
                });
            }
        });
    }

    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pagination.pageSize,
            page: pagination.current,
        });
    }

    search() {
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pager.pageSize,
            page: pager.current,
        });
    }
    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type:'get',
            url: SERVER + "huoqvzhoupeidangxiangqing?id="+id,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = new Date(THE.state.startTime).getTime() + (i*86400*1000);
                    list.push( data.data[i])
                }
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    jiluList: list,
                    pagination,
                });
            }
        });
    }

    handleInputChange(xingqi,leixing,shijian,event) {
        let THE = this;
        let Date = THE.state.Date;
        if(Date >= shijian){
            message.warning('不能修改今天(包括今天)之前的安排');
            return;
        }else{
        const target = event.target;
        const value = target.value;
        let jiluList = THE.state.jiluList;
        for (let i = 0; i < jiluList.length; i++) {
            if(jiluList[i].xingqi === xingqi){
                if(leixing === 'zaoshang'){
                    jiluList[i].zaoshang = value;
                }else if(leixing === 'shangwu'){
                    jiluList[i].shangwu = value;
                }else if(leixing === 'xiawu'){
                    jiluList[i].xiawu = value;
                }else{
                    jiluList[i].wanshang = value;
                }
            }
        }
        THE.setState({
            jiluList : jiluList
        });
        }
    }

    toUpdate() {
        const THE = this;
        let id = THE.state.id;
        let jiluList = THE.state.jiluList;
        console.log(jiluList)
        let zhoucaipuAO = {};
        zhoucaipuAO["zhouyizaoshang"] = jiluList[0].zaoshang;
        zhoucaipuAO["zhouyishangwu"] = jiluList[0].shangwu;
        zhoucaipuAO["zhouyixiawu"] = jiluList[0].xiawu;
        zhoucaipuAO["zhouyiwanshang"] = jiluList[0].wanshang;
        zhoucaipuAO["zhouerzaoshang"] = jiluList[1].zaoshang;
        zhoucaipuAO["zhouershangwu"] = jiluList[1].shangwu;
        zhoucaipuAO["zhouerxiawu"] = jiluList[1].xiawu;
        zhoucaipuAO["zhouerwanshang"] = jiluList[1].wanshang;
        zhoucaipuAO["zhousanzaoshang"] = jiluList[2].zaoshang;
        zhoucaipuAO["zhousanshangwu"] =jiluList[2].shangwu;
        zhoucaipuAO["zhousanxiawu"] = jiluList[2].xiawu;
        zhoucaipuAO["zhousanwanshang"] = jiluList[2].wanshang;
        zhoucaipuAO["zhousizaoshang"] = jiluList[3].zaoshang;
        zhoucaipuAO["zhousishangwu"] = jiluList[3].shangwu;
        zhoucaipuAO["zhousixiawu"] = jiluList[3].xiawu;
        zhoucaipuAO["zhousiwanshang"] = jiluList[3].wanshang;
        zhoucaipuAO["zhouwuzaoshang"] = jiluList[4].zaoshang;
        zhoucaipuAO["zhouwushangwu"] = jiluList[4].shangwu;
        zhoucaipuAO["zhouwuxiawu"] = jiluList[4].xiawu;
        zhoucaipuAO["zhouwuwanshang"] = jiluList[4].wanshang;
        zhoucaipuAO["zhouliuzaoshang"] = jiluList[5].zaoshang;
        zhoucaipuAO["zhouliushangwu"] = jiluList[5].shangwu;
        zhoucaipuAO["zhouliuxiawu"] = jiluList[5].xiawu;
        zhoucaipuAO["zhouliuwanshang"] = jiluList[5].wanshang;
        zhoucaipuAO["zhourizaoshang"] = jiluList[6].zaoshang;
        zhoucaipuAO["zhourishangwu"] = jiluList[6].shangwu;
        zhoucaipuAO["zhourixiawu"] = jiluList[6].xiawu;
        zhoucaipuAO["zhouriwanshang"] = jiluList[6].wanshang;

        zhoucaipuAO["zhouyizhibanbanzhang"] = jiluList[0].zhibanbanzhang;
        zhoucaipuAO["zhouyizhibanganbu"] = jiluList[0].zhibanganbu;
        zhoucaipuAO["zhouerzhibanbanzhang"] = jiluList[1].zhibanbanzhang;
        zhoucaipuAO["zhouerzhibanganbu"] = jiluList[1].zhibanganbu
        zhoucaipuAO["zhousanzhibanbanzhang"] = jiluList[2].zhibanbanzhang;
        zhoucaipuAO["zhousanzhibanganbu"] = jiluList[2].zhibanganbu
        zhoucaipuAO["zhousizhibanbanzhang"] = jiluList[3].zhibanbanzhang;
        zhoucaipuAO["zhousizhibanganbu"] = jiluList[3].zhibanganbu
        zhoucaipuAO["zhouwuzhibanbanzhang"] = jiluList[4].zhibanbanzhang;
        zhoucaipuAO["zhouwuzhibanganbu"] = jiluList[4].zhibanganbu
        zhoucaipuAO["zhouliuzhibanbanzhang"] = jiluList[5].zhibanbanzhang;
        zhoucaipuAO["zhouliuzhibanganbu"] = jiluList[5].zhibanganbu
        zhoucaipuAO["zhourizhibanbanzhang"] = jiluList[6].zhibanbanzhang;
        zhoucaipuAO["zhourizhibanganbu"] = jiluList[6].zhibanganbu

        zhoucaipuAO["id"] = id;

        $.ajax({
            type:'post',
            url:SERVER+"xiugaizhoupeidang",
            data : JSON.stringify(zhoucaipuAO),
            dataType : 'json',
            contentType : "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.backPage();
            }
        });
    }

    getRenyuanList(){
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER + "chakanAllFiremenByJigou",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i].key = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    renyuanList: list,
                });
            }
        });
    }

    zhibanbanzhangChang(xingqi,shijian,value) {
        let THE = this;
        let Date = THE.state.Date;
        if(Date >= shijian){
            message.warning('不能修改今天(包括今天)之前的安排');
            return;
        }else{
            const THE = this;
            let jiluList = THE.state.jiluList;
            if(xingqi === '周一'){
                jiluList[0].zhibanbanzhang = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else if(xingqi === '周二'){
                jiluList[1].zhibanbanzhang = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else if(xingqi === '周三'){
                jiluList[2].zhibanbanzhang = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else if(xingqi === '周四'){
                jiluList[3].zhibanbanzhang = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else if(xingqi === '周五'){
                jiluList[4].zhibanbanzhang = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else if(xingqi === '周六'){
                jiluList[5].zhibanbanzhang = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else{
                jiluList[6].zhibanbanzhang = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }
        }
    }
    zhibanganbuChang(xingqi,shijian,value) {
        let THE = this;
        let Date = THE.state.Date;
        if(Date >= shijian){
            message.warning('不能修改今天(包括今天)之前的安排');
            return;
        }else{
            const THE = this;
            let jiluList = THE.state.jiluList;
            if(xingqi === '周一'){
                jiluList[0].zhibanganbu = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else if(xingqi === '周二'){
                jiluList[1].zhibanganbu = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else if(xingqi === '周三'){
                jiluList[2].zhibanganbu = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else if(xingqi === '周四'){
                jiluList[3].zhibanganbu = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else if(xingqi === '周五'){
                jiluList[4].zhibanganbu = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else if(xingqi === '周六'){
                jiluList[5].zhibanganbu = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }else{
                jiluList[6].zhibanganbu = value;
                THE.setState({
                    jiluList: jiluList,
                });
            }
        }
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai";
        }else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai";
        }
    }



    componentDidMount() {
        this.fetch();
        this.huoqushijian();
        this.getRenyuanList();
    }

    render() {
        const { nianfen, zhouci, startTime, endTime,zhouyizhibanbanzhang} = this.state;

        let renyuanOptions = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['xingming']}>{item['xingming']}</Select.Option>);
        let gongzuoOptions = this.state.jiluList.map(item =>
            <Card title={item['xingqi']} bordered={false}>
                <label style={{fontSize:16,fontWeight:"bold"}}>值班班长:</label>
                <br/>
                <Select style={{width:'80%'}} onChange={this.zhibanbanzhangChang.bind(this,item['xingqi'],item['key'])} mode="multiple" value={item['zhibanbanzhang']}>
                    {renyuanOptions}
                </Select>
                <br/>
                <label style={{fontSize:16,fontWeight:"bold"}}>值班干部:</label>
                <br/>
                <Select style={{width:'80%'}} onChange={this.zhibanganbuChang.bind(this,item['xingqi'],item['key'])} mode="multiple" value={item['zhibanganbu']}>
                    {renyuanOptions}
                </Select>
                <br/>
                <label style={{fontSize:16,fontWeight:"bold"}}>早上:</label>
                <br/>
                <TextArea autosize={{minRows:3}} value={item['zaoshang']} style={{width:'80%'}}  onChange={this.handleInputChange.bind(this,item['xingqi'],'zaoshang',item['key'])}/>
                <br/>
                <label style={{fontSize:16,fontWeight:"bold"}}>上午:</label>
                <br/>
                <TextArea autosize={{minRows:3}} value={item['shangwu']} style={{width:'80%'}}  onChange={this.handleInputChange.bind(this,item['xingqi'],'shangwu',item['key'])}/>
                <br/>
                <label style={{fontSize:16,fontWeight:"bold"}}>下午:</label>
                <br/>
                <TextArea autosize={{minRows:3}} value={item['xiawu']} style={{width:'80%'}}  onChange={this.handleInputChange.bind(this,item['xingqi'],'xiawu',item['key'])}/>
                <br/>
                <label style={{fontSize:16,fontWeight:"bold"}}>晚上:</label>
                <br/>
                <TextArea autosize={{minRows:3}} value={item['wanshang']} style={{width:'80%'}}  onChange={this.handleInputChange.bind(this,item['xingqi'],'wanshang',item['key'])}/>
            </Card>
        );


        return (
            <div>
                <Tag id="biaoti">{nianfen}年{zhouci}周  时间段：{startTime}--{endTime}</Tag>
                {gongzuoOptions}
                <br/>
                <Button type="primary" icon="check" onClick={this.toUpdate.bind(this)}>保存</Button>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
