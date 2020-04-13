import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, IndexRoute, Route ,Switch ,Redirect} from 'react-router-dom';
import { LocaleProvider, Layout, Menu, Icon, Breadcrumb, Dropdown,Button,Avatar,Badge} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import Zzbreadcrumb from "../zzbreadcrumb.js";
import '../../less/common.less';

import Zhgl from "../userInfo/zhgl.js";
//人员管理
import xitongsheding_admin_wuzileixingshezhi from "../renyuanguanli/xitonghoutai/xitongsheding_admin_wuzileixingshezhi.js";
import xitongsheding_admin_wuzileibieshezhi from '../renyuanguanli/xitonghoutai/xitongsheding_admin_wuzileibieshezhi.js';
import xitongsheding_admin_qitarenyuanguanli from "../renyuanguanli/renyuanguanli/xitongsheding_admin_qitarenyuanguanli.js";
import xitongsheding_admin_renyuandenglurizhi from "../renyuanguanli/renyuanguanli/xitongsheding_admin_renyuandenglurizhi.js";
import xitongsheding_admin_xiaofangcheleixingshezhi from '../renyuanguanli/xitonghoutai/xitongsheding_admin_xiaofangcheleixingshezhi.js';
import xitongsheding_admin_zuzhijigoushezhi from '../renyuanguanli/xitonghoutai/xitongsheding_admin_zuzhijigoushezhi.js';
import xitongsheding_admin_renyuanguanli from "../renyuanguanli/renyuanguanli/xitongsheding_admin_renyuanguanli.js";
import xitongsheding_admin_appguanli from '../renyuanguanli/xitonghoutai/xitongsheding_admin_appguanli.js';
import xitongsheding_admin_yaopinguanli from '../renyuanguanli/xitonghoutai/xitongsheding_admin_yaopinguanli.js';
import xitongsheding_admin_wangguanguanli from '../renyuanguanli/xitonghoutai/xitongsheding_admin_wangguanguanli.js';
import yingquguanlixin_admin_qingjialishijilu from '../renyuanguanli/xitonghoutai/yingquguanlixin_admin_qingjialishijilu.js';
import yingquguanlixin_admin_yongchelishijilu from '../renyuanguanli/xitonghoutai/yingquguanlixin_admin_yongchelishijilu.js';
import shiyongshuoming from '../userInfo/shiyongshuoming.js';
import xitongsheding_admin_shiyongshuomingguanli from '../renyuanguanli/xitonghoutai/xitongsheding_admin_shiyongshuomingguanli.js';
import xitongsheding_admin_shiyongshuomingtianjia from '../renyuanguanli/xitonghoutai/xitongsheding_admin_shiyongshuomingtianjia.js';

//其他按钮设定
import xitongsheding_admin_wuzileixingtianjia from "../renyuanguanli/xitonghoutai/xitongsheding_admin_wuzileixingtianjia.js";
import xitongsheding_admin_wuzileibietianjia from '../renyuanguanli/xitonghoutai/xitongsheding_admin_wuzileibietianjia.js';
import xitongsheding_admin_xitongguanliyuantianjia from "../renyuanguanli/renyuanguanli/xitongsheding_admin_xitongguanliyuantianjia.js";
import xitongsheding_admin_xiaofangcheleixingtianjia from '../renyuanguanli/xitonghoutai/xitongsheding_admin_xiaofangcheleixingtianjia.js';
import xitongsheding_admin_zuzhijigoutianjia from '../renyuanguanli/xitonghoutai/xitongsheding_admin_zuzhijigoutianjia.js';
import xitongsheding_admin_apptianjia from '../renyuanguanli/xitonghoutai/xitongsheding_admin_apptianjia.js';
import xitongsheding_admin_chanpintianjia from '../renyuanguanli/xitonghoutai/xitongsheding_admin_chanpintianjia.js';
import xitongsheding_admin_caipinguanli from '../renyuanguanli/xitonghoutai/xitongsheding_admin_caipinguanli.js';
import xitongsheding_admin_baoguanguiguanli from '../renyuanguanli/xitonghoutai/xitongsheding_admin_baoguanguiguanli.js';
import renyuanguanli_admin_jueseshezhi from '../renyuanguanli/xitonghoutai/renyuanguanli_admin_jueseshezhi.js';
import renyuanguanli_admin_juesetianjia from '../renyuanguanli/xitonghoutai/renyuanguanli_admin_juesetianjia.js';
import renyuanguanli_admin_liuchengjueseshezhi from '../renyuanguanli/xitonghoutai/renyuanguanli_admin_liuchengjueseshezhi.js';
import renyuanguanli_admin_liuchengjuesetianjia from '../renyuanguanli/xitonghoutai/renyuanguanli_admin_liuchengjuesetianjia.js';
import xitongsheding_admin_adminyingquguanli from '../renyuanguanli/xitonghoutai/xitongsheding_admin_yingquguanli.js';
import renyuanguanli_zhiduiganbu_zuzhijigoujingweidushezhi
	from "../../../zhidui_module/js/renyuanguanli/xitonghoutai/renyuanguanli_zhiduiganbu_zuzhijigoujingweidushezhi";
import xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli
	from "../../../zhidui_module/js/renyuanguanli/xitonghoutai/xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli";
import xitongsheding_admin_shicaiguanli
	from "../../../zhidui_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_shicaiguanli";
import tongjisun from "../../../zhongdui_module/imgs/tongjisun.png";

import MenuList from '../菜单管理/MenuList';
import MenuAdd from '../菜单管理/MenuAdd';
import {message} from "antd/lib/index";
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
class App extends React.Component {
    constructor(props) {
	    super(props);
    	this.state = {
			caidan:[],
			key:"",
			count: 0,
			openKeys: [],
			redirest:"/",
			rootSubmenuKeys : [],
    		// openKeys: ['sub1'],
			showcaidan: "block",
			showanniu: "none",
        weidushu: null
    	};
	}

	onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    let arr = [];
    arr.push(openKeys[0]);
    arr.push(openKeys[openKeys.length - 1]);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys: arr });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
	}

	//???
  	toggle = () => {
    	this.setState({
      		collapsed: !this.state.collapsed,
    	});
  	}

  	user_menu_dropdown_click = ({ key }) => {
  		if(key == "1"){
  			window.location.href = "xitong.html#/zhgl";
  		}
  		if(key == "2"){
  			sessionStorage.removeItem("token");
  			sessionStorage.removeItem("ROLE");
  			sessionStorage.removeItem("userInfo");
  			sessionStorage.removeItem("jigoumingcheng");
			sessionStorage.removeItem("caidan");
  			location.href = "login.html";
  		}
  	}

	//隐藏菜单方法
	yincangcaidan() {
		this.setState({
			showcaidan: "none",
			showanniu: "block",
		})
	}
	//显示菜单方法
	xianshicaidan(){
		this.setState({
			showcaidan: "block",
			showanniu: "none",
		})
	}

	//递归方法遍历菜单
  recursion=(dataSource)=>{
    return (
      dataSource.map((item)=>{
        if(item.children){
          return (
            <SubMenu key={item.key} title={<span><span>{item.title}</span></span>}>
              {this.recursion(item.children)}
            </SubMenu>
          )
        }
		return <Menu.Item key={item.key}><Link to={item.luyou}>{item.title}</Link></Menu.Item>
      })
    )
  }


	onSubmit = () => {
		this.getCaidan('其他');
	}

	componentWillMount(){
		// let caidan = JSON.parse(sessionStorage.getItem("caidan1"));
		// for(let i=0;i<caidan.length;i++) {
		// 	this.getCaidan(caidan[i].title,'chushi');
		// 	break;
		// }
	}

	componentDidMount() {
      this.getCaidans();
	}

  getCaidans = () => {
    const THE = this;
    let data = {
      fenlei: 'WEB'
    }
    $.ajax({
      type:'GET',
      url:SERVER+"caidan/current-login-user",
      data: data,
      success:function(data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        let arr = [];
        data.data && data.data.length > 0 && data.data.map( item => {
          arr.push(item.key);
        })
        THE.setState({
          caidan: data.data,
          rootSubmenuKeys: arr
        })
      }
    });
  }

  	render() {
		let {year, month, day, week, hh, mm, ss} = this.state;

  		const user_menu = (
	  		<Menu onClick={this.user_menu_dropdown_click}>
	    		<Menu.Item key="1">帐号管理</Menu.Item>
	    		<Menu.Item key="2">退出</Menu.Item>
	  		</Menu>
		);

		const userName = sessionStorage.getItem("gs");

    	return (
      		<Layout className="myLayout">
            <Header id="zhuye_header_div" style={{ backgroundColor: '#3460AB', borderBottom:'1px solid #e8e8e8' }}>
              <div className="tongji_headerLeft" style={{display: 'flex',width: '50%'}}>
                <p className="navLogo"></p>
                <p className="tongji_headerLeft_p1"
                   style={{width: '25%',lineHeight: '90px',height: 'auto',color: '#fff',fontSize: '22px'}}>
                  {sessionStorage.getItem('jigoumingcheng')}
                </p>
                <p className="tongji_headerLeft_p1"
                   style={{lineHeight: '90px',height: 'auto',color: '#fff',fontSize: '30px'}}>
                  大数据管理平台
                </p>
              </div>
              <div className="tongjiNavRight" style={{justifyContent: 'center',width: '11%'}}>
                <a onClick={this.toMyMessage}>
                  <Badge count={this.state.weidushu}>
                    <Icon type="bell" style={{fontSize: '22px',color: '#fff',marginLeft:'30px'}}/>
                  </Badge>
                </a>
                <p className="poweroffNav" style={{height: '100%',margin: '0',width: '60%'}}>
                  <Dropdown className="dl-dropdown" overlay={user_menu}>
                    <a className="ant-dropdown-link" style={{color: '#fff'}}>
                      <Avatar icon="user" style={{marginRight: 5}}/>
                      {sessionStorage.getItem("userName")}
                      <Icon type="down" style={{color: '#6177A0'}} />
                    </a>
                  </Dropdown>
                </p>
              </div>
            </Header>
        		<Layout id="layout_div">
            <Sider className="mySider_left"  style={{ backgroundColor: '#3460AB' }}>
            <Menu
                mode="inline"
                theme="dark"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ background: '#3460AB' }}
            >
							{this.recursion(this.state.caidan)}
							<Menu.Item key="88" className="shiyongshuoming">
								<Link to="/shiyongshuoming"><Icon type="android-o" /><span>使用说明</span></Link>
							</Menu.Item>
              </Menu>
            </Sider>
          			<Content id="root_content_div" >
          				<Zzbreadcrumb />
				          <div className='root_content_div_box'>
					          <Switch>
						          <Route path="/menuadd" component={MenuAdd} />
						          <Route path="/menulist" component={MenuList} />
						          {/*<人员管理*/}
						          <Route path="/shiyongshuoming" component={shiyongshuoming} />
						          <Route path="/xitongsheding_admin_wuzileixingshezhi" component={xitongsheding_admin_wuzileixingshezhi} />
						          <Route path="/xitongsheding_admin_wuzileibieshezhi" component={xitongsheding_admin_wuzileibieshezhi} />
						          <Route path="/xitongsheding_admin_qitarenyuanguanli" component={xitongsheding_admin_qitarenyuanguanli} />
						          <Route path="/xitongsheding_admin_renyuandenglurizhi" component={xitongsheding_admin_renyuandenglurizhi} />
						          <Route path="/xitongsheding_admin_xiaofangcheleixingshezhi" component={xitongsheding_admin_xiaofangcheleixingshezhi} />
						          <Route path="/xitongsheding_admin_zuzhijigoushezhi" component={xitongsheding_admin_zuzhijigoushezhi} />
						          <Route path="/xitongsheding_admin_renyuanguanli" component={xitongsheding_admin_renyuanguanli} />
						          <Route path="/xitongsheding_admin_appguanli" component={xitongsheding_admin_appguanli} />
						          <Route path="/xitongsheding_admin_shiyongshuomingguanli" component={xitongsheding_admin_shiyongshuomingguanli} />
						          <Route path="/xitongsheding_admin_shiyongshuomingtianjia" component={xitongsheding_admin_shiyongshuomingtianjia} />                            {/*<其他按钮设定*/}
						          <Route path="/xitongsheding_admin_xitongguanliyuantianjia" component={xitongsheding_admin_xitongguanliyuantianjia} />
						          <Route path="/xitongsheding_admin_wuzileixingtianjia" component={xitongsheding_admin_wuzileixingtianjia} />
						          <Route path="/xitongsheding_admin_wuzileibietianjia" component={xitongsheding_admin_wuzileibietianjia} />
						          <Route path="/xitongsheding_admin_xiaofangcheleixingtianjia" component={xitongsheding_admin_xiaofangcheleixingtianjia} />
						          <Route path="/xitongsheding_admin_zuzhijigoutianjia" component={xitongsheding_admin_zuzhijigoutianjia} />
						          <Route path="/zhgl" component={Zhgl} />
						          <Route path="/xitongsheding_admin_apptianjia" component={xitongsheding_admin_apptianjia} />
						          <Route path="/xitongsheding_admin_chanpintianjia" component={xitongsheding_admin_chanpintianjia} />
						          <Route path="/xitongsheding_admin_yaopinguanli" component={xitongsheding_admin_yaopinguanli} />
						          <Route path="/xitongsheding_admin_wangguanguanli" component={xitongsheding_admin_wangguanguanli} />
						          <Route path="/xitongsheding_admin_caipinguanli" component={xitongsheding_admin_caipinguanli} />
						          <Route path="/xitongsheding_admin_baoguanguiguanli" component={xitongsheding_admin_baoguanguiguanli} />
						          <Route path="/renyuanguanli_admin_jueseshezhi" component={renyuanguanli_admin_jueseshezhi} />
						          <Route path="/renyuanguanli_admin_juesetianjia" component={renyuanguanli_admin_juesetianjia} />
						          <Route path="/renyuanguanli_admin_liuchengjueseshezhi" component={renyuanguanli_admin_liuchengjueseshezhi} />
						          <Route path="/renyuanguanli_admin_liuchengjuesetianjia" component={renyuanguanli_admin_liuchengjuesetianjia} />
						          <Route path="/xitongsheding_admin_adminyingquguanli" component={xitongsheding_admin_adminyingquguanli} />
						          <Route path="/renyuanguanli_zhiduiganbu_zuzhijigoujingweidushezhi" component={renyuanguanli_zhiduiganbu_zuzhijigoujingweidushezhi} />
						          <Route path="/yingquguanlixin_admin_qingjialishijilu" component={yingquguanlixin_admin_qingjialishijilu} />
						          <Route path="/yingquguanlixin_admin_yongchelishijilu" component={yingquguanlixin_admin_yongchelishijilu} />

						          <Route path="/xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli" component={xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli} />
						          <Route path="/xitongsheding_admin_shicaiguanli" component={xitongsheding_admin_shicaiguanli} />

						          <Redirect to="/xitongsheding_admin_renyuanguanli" />
					          </Switch>
				          </div>
          			</Content>
        		</Layout>
      		</Layout>
    	);
  	}
}

ReactDOM.render(
	<HashRouter >
		<LocaleProvider locale={zh_CN}>
			<App />
		</LocaleProvider>
	</HashRouter>, document.getElementById('root')
);
