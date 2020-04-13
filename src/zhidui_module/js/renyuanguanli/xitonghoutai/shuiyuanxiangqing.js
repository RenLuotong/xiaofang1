import React, { Component } from 'react';
import {Card,message,Icon,Row,Col,Tag,Tree} from 'antd';
import moment from 'moment';

const TreeNode = Tree.TreeNode;

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
            url : SERVER + "huoqvshuiyuanxiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if ( data.data["jianchengriqi"] !== null &&  data.data["jianchengriqi"] !== '') {
                    data.data["jianchengriqi"] = moment(data.data["jianchengriqi"]).format('YYYY-MM-DD');
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
                		<Icon type="info" style={{color: '#1890ff'}}/>水源信息
                	</p>
                    <Tag id="myTag">机构名称 : {info['zuzhijigoumingcheng']}</Tag>
                    <Tag id="myTag">水源名称 : {info['mingcheng']}</Tag>
                    <Tag id="myTag">分类 : {info['fenlei']}</Tag>
                    <Tag id="myTag">类型 : {info['leixing']}</Tag>
                    <Tag id="myTag">可用状态 : {info['keyongzhuangtai']}</Tag>
                    <Tag id="myTag">所属路段 : {info['suoshuluduan']}</Tag>
                    <Tag id="myTag">经度 : {info['dizhijingdu']}</Tag>
                    <Tag id="myTag">纬度 : {info['dizhiweidu']}</Tag>
                    <Tag id="myTag">放置形式 : {info['fangzhixingshi']}</Tag>
                    <Tag id="myTag">接口形式 : {info['jiekouxingshi']}</Tag>
                    <Tag id="myTag">取水形式 : {info['qushuixingshi']}</Tag>
                    <Tag id="myTag">所属管网 : {info['suoshuguanwang']}</Tag>
                    <Tag id="myTag">管网形式 : {info['guanwangxingshi']}</Tag>
                    <Tag id="myTag">管网直径 : {info['guanwangzhijing']}</Tag>
                    <Tag id="myTag">管网压力 : {info['guanwangyali']}</Tag>
                    <Tag id="myTag">流量大小 : {info['liuliangdaxiao']}</Tag>
                    <Tag id="myTag">供水单位 : {info['gongshuidanwei']}天</Tag>
                    <Tag id="myTag">建成日期 : {info['jianchengriqi']}</Tag>
                    {/*<Tag id="myTag">管辖单位 : {info['jigoumingcheng']}</Tag>*/}
                    <br/><br/>
                    <p>
                    	<Icon type="info" style={{color: '#1890ff'}}/>地址
                    </p>
                    <div id="baoyangshouce">
                    	{info['dizhimiaoshu']}
                    </div>
                    <br/><br/>
                    <p>
                        <Icon type="info" style={{color: '#1890ff'}}/>水源相关图片
                    </p>
                    <img src={info['shijingtu']}  style={{margin:10,width:300,height:300}} title="实景图"/>
                    <img src={info['fangweitudong']}  style={{margin:10,width:300,height:300}} title="方位图东"/>
                    <img src={info['fangweituxi']}  style={{margin:10,width:300,height:300}} title="方位图西"/>
                    <img src={info['fangweitunan']}  style={{margin:10,width:300,height:300}} title="方位图南"/>
                    <img src={info['fangweitubei']}  style={{margin:10,width:300,height:300}} title="方位图北"/>
	  			</Card>
        	</div>
    	);
    }
}

export default App;
