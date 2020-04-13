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
                    data.data[i]["key"] = i;
                    data.data[i]["zhibanbanzhang"] = data.data[i].zhibanbanzhang.join(',');
                    data.data[i]["zhibanganbu"] = data.data[i].zhibanganbu.join(',');
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


    componentDidMount() {
        this.fetch();
        this.huoqushijian();
    }

    render() {
        const { nianfen, zhouci, startTime, endTime} = this.state;

        let gongzuoOptions = this.state.jiluList.map(item =>
            <Card title={item['xingqi']} bordered={false}>
                <label style={{fontSize:16,fontWeight:"bold"}}>值班班长:</label>
                <br/>
                <Input style={{width:'80%'}} value={item['zhibanbanzhang']} readOnly={true}></Input>
                <br/>
                <label style={{fontSize:16,fontWeight:"bold"}}>值班干部:</label>
                <br/>
                <Input style={{width:'80%'}} value={item['zhibanganbu']} readOnly={true}></Input>
                <br/>
                <label style={{fontSize:16,fontWeight:"bold"}}>早上:</label>
                <br/>
                <TextArea autosize={{minRows:3}} value={item['zaoshang']} style={{width:'80%'}} readOnly={true}/>
                <br/>
                <label style={{fontSize:16,fontWeight:"bold"}}>上午:</label>
                <br/>
                <TextArea autosize={{minRows:3}} value={item['shangwu']} style={{width:'80%'}} readOnly={true}/>
                <br/>
                <label style={{fontSize:16,fontWeight:"bold"}}>下午:</label>
                <br/>
                <TextArea autosize={{minRows:3}} value={item['xiawu']} style={{width:'80%'}} readOnly={true}/>
                <br/>
                <label style={{fontSize:16,fontWeight:"bold"}}>晚上:</label>
                <br/>
                <TextArea autosize={{minRows:3}} value={item['wanshang']} style={{width:'80%'}} readOnly={true}/>
            </Card>
        );


        return (
            <div>
                <Tag id="biaoti">{nianfen}年{zhouci}周  时间段：{startTime}--{endTime}</Tag>
                {gongzuoOptions}
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
