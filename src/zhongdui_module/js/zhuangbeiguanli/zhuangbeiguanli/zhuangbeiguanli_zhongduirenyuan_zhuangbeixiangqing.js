import React, { Component } from 'react';
import {Card, message, Icon, Row, Col, Tag, Tree, Select} from 'antd';
import moment from 'moment';

const TreeNode = Tree.TreeNode;

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
        	id:this.props.match.params.id,
        	zhuangbeiInfo:{},
            zhuanshuxinxixiang:[],
            teyouxinxixiang:[],
        };
    }

    getInfo() {
		const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "xqzhuangbei?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                if(data.data.youwubiaoqian === true){
                    data.data.youwubiaoqian = '有';
                }else{
                    data.data.youwubiaoqian = '无';
                }
                if(data.data.zhuanshuxinxixiang === null || data.data.zhuanshuxinxixiang === ''){
                    data.data.zhuanshuxinxixiang = [];
                }
                if(data.data.teyouxinxixiang === null || data.data.teyouxinxixiang === ''){
                    data.data.teyouxinxixiang = [];
                }
                if (data.data.shengchanriqi != null && data.data.shengchanriqi != "") {
                	data.data.shengchanriqi = moment(data.data.shengchanriqi).format('YYYY-MM-DD');
                }
                THE.setState({
                    zhuangbeiInfo: data.data,
                    zhuanshuxinxixiang:data.data.zhuanshuxinxixiang,
                    teyouxinxixiang:data.data.teyouxinxixiang,
                });
            }
        });
	}

    componentDidMount(){
    	this.getInfo();
    }


    render(){
        let qitaxinxiOptions = '';
        if(this.state.teyouxinxixiang.length > 0 || this.state.zhuanshuxinxixiang.length > 0){
            qitaxinxiOptions = <p>
                <Icon type="info" style={{color: '#1890ff'}}/>其他信息
            </p>
        }

        const teyouxinxixiangOptions = this.state.teyouxinxixiang.map(item => <Tag id="myTag">{item['key']} : {item['value']}</Tag>);
        const zhuanshuxinxixiangOptions = this.state.zhuanshuxinxixiang.map(item => <Tag id="myTag">{item['key']} : {item['value']}</Tag>);

    	let info = this.state.zhuangbeiInfo;

        return(
            <div>
            	<Card id="myCard" style={{'fontSize': '20px'}}>
	  				<p>
                		<Icon type="info" style={{color: '#1890ff'}}/>基本信息
                	</p>
                    <Tag id="myTag">机构名称 : {info['jigoumingcheng']}</Tag>
                    <Tag id="myTag">仓库名称 : {info['cangkumingcheng']}</Tag>
                    <Tag id="myTag">货架名称 : {info['huojiamingcheng']}</Tag>
                    <Tag id="myTag">类别名称 : {info['leibiemingcheng']}</Tag>
                    <Tag id="myTag">类型名称 : {info['mingcheng']}</Tag>
                    <Tag id="myTag">规格名称 : {info['guigemingcheng']}</Tag>
                    <Tag id="myTag">型号名称 : {info['xinghaomingcheng']}</Tag>
                    <Tag id="myTag">使用状态 : {info['shiyongzhuangtai']}</Tag>
                    <Tag id="myTag">使用期限 : {info['shiyongqixian']}天</Tag>
                    <Tag id="myTag">保存期限 : {info['baocunqixian']}天</Tag>
                    <Tag id="myTag">保养周期 : {info['baoyangzhouqi']}天</Tag>
                    <Tag id="myTag">生产厂家 : {info['changjiaxinxi']}</Tag>
                    <Tag id="myTag">生产日期 : {info['shengchanriqi']}</Tag>
                    <Tag id="myTag">计量单位 : {info['jiliangdanwei']}</Tag>
                    <Tag id="myTag">主要参数 : {info['zhuyaocanshu']}</Tag>
                    <Tag id="myTag">有无标签 : {info['youwubiaoqian']}</Tag>
                    <Tag id="myTag">适用范围 : {info['shiyongfanwei']}</Tag>
                    <Tag id="myTag">RFID : {info['rfid']}</Tag>
                    <br/><br/>
                    {qitaxinxiOptions}
                    {teyouxinxixiangOptions}
                    {zhuanshuxinxixiangOptions}
                    <p>
                    	<Icon type="info" style={{color: '#1890ff'}}/>使用手册
                    </p>
                    <div id="baoyangshouce">
                    	{info['shiyongshouce']}
                    </div>
	  			</Card>
        	</div>
    	);
    }
}

export default App;
