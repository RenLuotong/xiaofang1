/*app管理*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    message,
    Popconfirm,
    Button,
    Table, Tabs, Card, Input
} from 'antd';

const { TextArea } = Input;
class App extends React.Component {

	constructor(props){
        super(props);
        this.state = {
			wendangList:[],
			appurlList:[],
            chanpinList:[],
            activeKey:"",
        };
	}

	fetch = () => {
        const THE = this;
    	$.ajax({
            type:'get',
            url: SERVER + "getRizhiList",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    for(let j = 0;j<data.data[i].rizhis.length;j++){
                        data.data[i].rizhis[j]["gengxinshijian"] = moment(data.data[i].rizhis[j]["gengxinshijian"]).format('YYYY-MM-DD HH:mm:ss');

                    }
                    data.data[i]["key"] = i;
                    list.push(data.data[i]);
                }
                THE.setState({
                    chanpinList: list,
                    activeKey:list[0].mingcheng
                });
            }
        });
	}
	fetch2 = () => {
        const THE = this;
    	$.ajax({
            type:'GET',
            url: SERVER + "zuixinYingyongs",
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
                    appurlList: list
                });
            }
        });
	}

    callback(key) {
        const THE = this;
        THE.setState({
            activeKey: key,
        });
    }

	componentDidMount() {
		this.fetch();
		// this.fetch2();
	}

  	render() {
			let wendangOptions = this.state.wendangList.map((item,index) =>
				<li className="liNum"><span className="tabNum">.
				</span>
			<a href={item['lujing']} title={item['mingcheng']} target="_blank">{item['mingcheng']}</a>
				</li>
				);
				let appurlOptions = this.state.appurlList.map((item,index) =>
				<li className="liNum"><span className="tabNum">.
				</span>
			<a href={item['url']} title={item['leixing']} target="_blank">{item['leixing']}下载</a>
				</li>
				);

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: 'url',
            dataIndex: 'url',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '应用类型名称',
            dataIndex: 'leixing',
        }, {
            title: '更新时间',
            dataIndex: 'gengxinshijian',
        }, {
            title: '应用下载',
            render: (text, record, index) => (
                <span>
					<a href={record['url']} title="应用下载" target="_blank">应用下载</a>
			    </span>
            ),
        }];

        const chanpinOptions = this.state.chanpinList.map((item,index) =>{
            let listOptions = item['rizhis'].map(list =>
                <Card title={item['mingcheng'] + ":版本" + list['banbenhao']} style={{fontSize:18}}>
                    <span>是否强制更新:{list['biaozhiwei']}</span>
                    <span style={{marginLeft:100}}>更新时间:{list['gengxinshijian']}</span>
                    <a href={list['url']} title="下载链接" target="_blank" style={{marginLeft:100}}>下载链接</a>
                    <img src={list['erweima']}  style={{margin:10,width:150,height:150,marginLeft:100}}/>
                    <br/>
                    <span style={{marginTop:20}}>更新说明:</span>
                    <br/>
                    <TextArea autosize={{minRows:3}} style={{width:1000,marginTop:10}} value={list['gengxinmiaoshu']} readOnly={true}/>
                    <br/>
                </Card>
            );
            return(
                <Tabs.TabPane tab={item['mingcheng']} key={item['mingcheng']}>
                    <li className="liNum">
                        <a href={item['wendang']} title="使用文档下载" target="_blank">使用文档下载</a>
                    </li>
                    <br/>
                    {listOptions}
                </Tabs.TabPane>
            )
        });


	    return (
	      	<div>
                <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)}>
                    {chanpinOptions}
                </Tabs>
				  {/*{wendangOptions}{appurlOptions}*/}
                  {/*<li className="liNum"><span className="tabNum">.*/}
                  {/*</span>*/}
                  {/*<a href={SERVER+'shuchutongjidaochuexcel'} title="数据统计导出" target="_blank">数据统计导出</a>*/}
                  {/*</li>*/}
				{/* <li className="liNum"><span className="tabNum">1
				</span>
				<a href="http://140.249.19.181:8905/upload/消防一体化平台软件系统操作手册.docx" title="消防一体化平台软件系统操作手册" target="_blank">消防一体化平台软件系统操作手册</a>
				</li>
				<li className="liNum"><span className="tabNum">2
				</span>
					<a href="http://140.249.19.181:8905/upload/装备智能管理系统RFID射频标识安装使用指南.pdf" title="装备智能管理系统 RFID 射频标识安装使用指南" target="_blank">装备智能管理系统 RFID 射频标识安装使用指南</a>
				</li>
				<li className="liNum"><span className="tabNum">3
				</span>
					<a href="http://140.249.19.181:8905/upload/1/e9aa7bf7-4de9-4aea-baad-99cdbe2884e5.apk" title="手机App下载" target="_blank">手机App下载</a>
				</li>
				<li className="liNum"><span className="tabNum">4
				</span>
					<a href="http://140.249.19.181:8905/upload/1/ce0bf139-a571-4ac1-a256-bf34dedb76d5.apk" title="手持机App下载" target="_blank">手持机App下载</a>
				</li>
				<li className="liNum"><span className="tabNum">5
				</span>
					<a href="http://140.249.19.181:8905/upload/1/697350da-d10d-44b5-889c-59b509599654.apk" title="车载应用App" target="_blank">车载应用App下载</a>
				</li> */}
	      	</div>
	    );
  	}
}

export default App;
