import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import PropTypes from "prop-types";
//具体导航的名称
const breadcrumbNameMap = {

    '/menulist':'菜单管理',
    '/menuadd':'菜单新增',
    '/xitongsheding_admin_wuzileibieshezhi':'装备管理',
    '/xitongsheding_admin_wuzileibieshezhi/xitongsheding_admin_wuzileibiexiugai/NUM':'装备类别修改',
    '/xitongsheding_admin_wuzileibieshezhi/xitongsheding_admin_wuzileibietianjia':'装备类别添加',
    '/xitongsheding_admin_wuzileibieshezhi/xitongsheding_admin_wuzileixingxiugai/NUM':'装备类型修改',
    '/xitongsheding_admin_wuzileibieshezhi/xitongsheding_admin_wuzileixingxiangqing/NUM':'装备类型详情',
    '/xitongsheding_admin_wuzileibieshezhi/xitongsheding_admin_wuzileixingtianjia':'装备类型添加',
    '/xitongsheding_admin_qitarenyuanguanli':'其他人员管理',
    '/xitongsheding_admin_xiaofangcheleixingshezhi':'消防车类型设置',
    '/xitongsheding_admin_wuzileixingtianjia':'装备类型添加',
    '/xitongsheding_admin_wuzileibietianjia':'装备类别添加',
    '/xitongsheding_admin_xiaofangcheleixingtianjia':'消防车类型添加',

    //11 21 聊城新整理面包屑
    '/xitongsheding_admin_renyuanguanli':'支队人员管理',
    '/xitongsheding_admin_xitongguanliyuantianjia':'支队管理员添加',
    '/xitongsheding_admin_renyuanguanli/xitongsheding_admin_renyuanxiangqing/NUM':'人员详情',
    '/xitongsheding_admin_renyuanguanli/xitongsheding_admin_renyuanxiugai/NUM':'人员修改',
    '/xitongsheding_admin_renyuanguanli/xitongsheding_admin_qitarenyuanmimaxiugai/NUM':'人员密码修改',
    '/xitongsheding_admin_renyuandenglurizhi':'人员登录日志',
    '/xitongsheding_admin_zuzhijigoushezhi':'组织机构设置',
    '/xitongsheding_admin_zuzhijigoutianjia':'组织机构添加',
    '/xitongsheding_admin_zuzhijigoushezhi/xitongsheding_admin_zuzhijigouxiugai/NUM':'组织机构修改',
    '/renyuanguanli_admin_jueseshezhi':'角色管理',
    '/renyuanguanli_admin_juesetianjia':'角色添加',
    '/renyuanguanli_admin_jueseshezhi/renyuanguanli_admin_juesexiugai':'角色修改',
    '/xitongsheding_admin_appguanli':'应用类型管理',
    '/xitongsheding_admin_appguanli/xitongsheding_admin_apptianjia':'产品添加',
    '/xitongsheding_admin_appguanli/xitongsheding_admin_chanpintianjia':'应用类型添加',
    '/xitongsheding_admin_appguanli/xitongsheding_admin_chanpinxiugai/NUM':'应用类型修改',
    '/xitongsheding_admin_adminyingquguanli':'营区管理',
    '/xitongsheding_admin_adminyingquguanli/xitongsheding_admin_yingqutianjia':'营区添加',
    '/xitongsheding_admin_yingquguanli/xitongsheding_admin_yingqutianjia/NUM':'营区修改',
    '/renyuanguanli_zhiduiganbu_zuzhijigoujingweidushezhi':'组织机构经纬度设置',
    '/renyuanguanli_admin_liuchengjueseshezhi':'身份管理',
    '/renyuanguanli_admin_liuchengjuesetianjia':'身份添加',
    '/renyuanguanli_admin_liuchengjueseshezhi/renyuanguanli_admin_liuchengjuesexiugai/NUM':'身份修改',
    '/xitongsheding_admin_wangguanguanli':'网关管理',
    '/xitongsheding_admin_wangguanguanli/xitongsheding_admin_wangguanxinzeng':'网关新增',
    '/xitongsheding_admin_wangguanguanli/xitongsheding_admin_wangguanxiugai/NUM':'网关修改密码',
    '/yingquguanlixin_admin_qingjialishijilu':'请假流程审批',
    '/yingquguanlixin_admin_qingjialishijilu/yingquguanlixin_admin_qingjialishijiluxiangqing/NUM':'请假流程审批详情',
    '/yingquguanlixin_admin_yongchelishijilu':'用车流程审批',
    '/yingquguanlixin_admin_yongchelishijilu/yingquguanlixin_admin_yongchelishijiluqingkuang/NUM':'用车流程审批详情',
    '/yingquguanlixin_admin_yongchelishijilu/yingquguanlixin_admin_yongchelishijiluxiangqing/NUM':'轨迹',
    '/xitongsheding_admin_shiyongshuomingguanli':'使用说明管理',
    '/xitongsheding_admin_shiyongshuomingtianjia':'使用说明添加',
    '/xitongsheding_admin_shiyongshuomingguanli/xitongsheding_admin_shiyongshuomingxiugai':'使用说明修改',

    '/xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli':'隐患类型管理',
    '/xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli/xitongsheding_zhiduiguanliyuan_yinhuanleixingxiugai/NUM':'隐患类型修改',
    '/xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli/xitongsheding_zhiduiguanliyuan_yinhuanleixingtianjia':'隐患类型添加',
    '/xitongsheding_admin_caipinguanli/xitongsheding_admin_caipinleixingguanlixinzeng':'菜品类型管理添加',
    '/xitongsheding_admin_caipinguanli/xitongsheding_admin_caipinleixingguanlixiugai/NUM':'菜品类型管理修改',
    '/xitongsheding_admin_caipinguanli':'菜品管理',
    '/xitongsheding_admin_caipinguanli/xitongsheding_admin_caipinguanlixinzeng':'菜品管理添加',
    '/xitongsheding_admin_caipinguanli/xitongsheding_admin_caipinguanlixiugai/NUM':'菜品管理修改',
    '/xitongsheding_admin_shicaiguanli/xitongsheding_admin_shicaileixingguanlixinzeng':'食材类型管理添加',
    '/xitongsheding_admin_shicaiguanli/xitongsheding_admin_shicaileixingguanlixiugai/NUM':'食材类型管理修改',
    '/xitongsheding_admin_shicaiguanli':'食材管理',
    '/xitongsheding_admin_shicaiguanli/xitongsheding_admin_shicaiguanlixinzeng':'食材管理添加',
    '/xitongsheding_admin_shicaiguanli/xitongsheding_admin_shicaiguanlixiugai/NUM':'食材管理修改',


};
class ZZBreadCrumb extends React.Component {
    //利用PropTypes记住所跳转每个页面的位置
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            pathSnippets: null,
            extraBreadcrumbItems: null
        }
    }
    isRealNum(val){
	    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
	    if(val === "" || val ==null){
	        return false;
	    }
	    if(!isNaN(val)){
	        return true;
	    }else{
	        return false;
	    }
	}
    getPath() {
    	const THE = this;
    	//对路径进行切分，存放到this.state.pathSnippets中
//  	this.state.pathSnippets
		let arrUrl = [];
		let arrName = [];
        let pathSnippets = this.context.router.history.location.pathname.split('/').filter(i => i);
       // console.log("pathSnippets:"+this.state.pathSnippets);
        for(let i=0;i<pathSnippets.length;i++) {
        	if( THE.isRealNum(pathSnippets[i])) {
        		arrUrl[arrUrl.length-1] = arrUrl[arrUrl.length-1] + '/' + pathSnippets[i];
        		arrName.push("NUM");
        	}
        	else{
        		arrUrl.push(pathSnippets[i]);
        		arrName.push(pathSnippets[i]);
        	}
        }
        this.state.pathSnippets = pathSnippets;
    	//将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
        this.state.extraBreadcrumbItems = pathSnippets.map((item, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            const name =  `/${arrName.slice(0, index + 1).join('/')}`;
            if(breadcrumbNameMap[name] != null) {
            	if(index == pathSnippets.length-1){
            		return (
		                <Breadcrumb.Item key={url}>
		                    <span>
		                        {breadcrumbNameMap[name]}
		                    </span>
		                </Breadcrumb.Item>  )
            	}else{
	            	return (
		                <Breadcrumb.Item key={url}>
		                    <Link to={url}>
		                        {breadcrumbNameMap[name]}
		                    </Link>
		                </Breadcrumb.Item>
		            );
	            }
            }
        });
    }

    componentWillMount() {
    //首次加载的时候调用，形成面包屑
        this.getPath();
    }
    componentWillReceiveProps(){
    //任何子页面发生改变，均可调用，完成路径切分以及形成面包屑
        this.getPath();
    }
    render() {
        return (
          <Breadcrumb style={{height: 45, lineHeight: '45px', paddingLeft: 30, backgroundColor: '#fff', borderLeft: '1px solid #E8E8E8'}}>
            {this.state.extraBreadcrumbItems}
          </Breadcrumb>
        )
    }
}
export default ZZBreadCrumb;
