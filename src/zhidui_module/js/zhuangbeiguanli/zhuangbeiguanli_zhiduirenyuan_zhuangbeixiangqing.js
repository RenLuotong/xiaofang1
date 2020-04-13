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
            url : SERVER + "chakanLiebiaoXiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                data.data.tbGerenfanghuZhuangbei.weixiushuoming = data.data.weixiushuoming;
                if (data.data.tbGerenfanghuZhuangbei.chuchangshijian != null && data.data.tbGerenfanghuZhuangbei.chuchangshijian != "") {
                	data.data.tbGerenfanghuZhuangbei.chuchangshijian = moment(data.data.tbGerenfanghuZhuangbei.chuchangshijian).format('YYYY-MM-DD HH:mm:ss');
                }
                if (data.data.tbGerenfanghuZhuangbei.peifashijian != null && data.data.tbGerenfanghuZhuangbei.peifashijian != "") {
                	data.data.tbGerenfanghuZhuangbei.peifashijian = moment(data.data.tbGerenfanghuZhuangbei.peifashijian).format('YYYY-MM-DD HH:mm:ss');
                }
                THE.setState({
                    zhuangbeiInfo: data.data.tbGerenfanghuZhuangbei,
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
                    <Tag id="myTag">姓名 : {info['shiyongren']}</Tag>
                    <Tag id="myTag">RFID : {info['rFID']}</Tag>
                    <Tag id="myTag">类型 : {info['zhuangbeileixingmingcheng']}</Tag>
                    <Tag id="myTag">型号 : {info['guigexinghao']}</Tag>
                    <Tag id="myTag">出警次数 : {info['chujingcishu']}</Tag>
                    <Tag id="myTag">厂家 : {info['shengchanchangjia']}</Tag>
                    <Tag id="myTag">使用状态 : {info['zhuangbeishiyongzhuangtai']}</Tag>
                    <Tag id="myTag">配发状态 : {info['zhuangbeipeifazhuangtai']}</Tag>
                    <Tag id="myTag">重量 : {info['zhongliang']}</Tag>
                    <Tag id="myTag">体积 : {info['tiji']}</Tag>
                    <Tag id="myTag">尺寸 : {info['chicun']}</Tag>
                    <Tag id="myTag">售后单位 : {info['shouhoufuwudanwei']}</Tag>
                    <Tag id="myTag">保养周期 : {info['baoyangzhouqi']}天</Tag>
                    <Tag id="myTag">使用寿命 : {info['shouming']}天</Tag>
                    <Tag id="myTag">存放期限 : {info['cunfangqixian']}天</Tag>
                    <Tag id="myTag">出厂时间 : {info['chuchangshijian']}</Tag>
                    <Tag id="myTag">配发时间 : {info['peifashijian']}</Tag>
                    <br/><br/>
                    <p>
                    	<Icon type="info" style={{color: '#1890ff'}}/>保养手册
                    </p>
                    <div id="baoyangshouce">
                    	{info['weixiushuoming']}
                    </div>
	  			</Card>
        	</div>
    	);
    }
}

export default App;
