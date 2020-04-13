import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Breadcrumb, Switch, Icon } from 'antd';
import PropTypes from "prop-types";
//具体导航的名称
let breadcrumbNameMap;
breadcrumbNameMap = {
    //新营区管理
    '/yingquguanlixin_xiaofangyuan_jiedaishishenqing': '家属接待室申请',
    '/yingquguanlixin_xiaofangyuan_jiedaishishiyongjilu': '家属接待室使用记录',
    '/yingquguanlixin_xiaofangyuan_zhouhoupingcai': '周后评菜',
    '/yingquguanlixin_xiaofangyuan_jiedaishidasaojilu': '家属接待室打扫记录',
    '/yingquguanlixin_xiaofangyuan_jiedaishidasaojilu/yingquguanlixin_xiaofangyuan_jiedaishidasaojiluxiangqing/NUM': '家属接待室打扫记录详情',
    '/yingquguanlixin_xiaofangyuan_jiedaishidasaojilu/yingquguanlixin_xiaofangyuan_jiedaishidasaojiluxinzeng': '家属接待室打扫记录新增',
    '/yingquguanlixin_xiaofangyuan_dazhongdianping': '大众点评',
    '/yingquguanlixin_xiaofangyuan_dazhongdianping/yingquguanlixin_xiaofangyuan_dazhongdianpingxiangqing/NUM': '大众点评详情',
    '/yingquguanlixin_zhongduiganbu_jiedaishidasaojilu': '家属接待室打扫记录',
    '/yingquguanlixin_zhongduiganbu_jiedaishidasaojilu/yingquguanlixin_zhongduiganbu_jiedaishidasaojiluxiangqing/NUM': '家属接待室打扫记录详情',
    '/yingquguanlixin_zhongduiganbu_xiaodujilu': '消毒记录',
    '/yingquguanlixin_zhongduiganbu_xiaodujilu/yingquguanlixin_zhongduiganbu_xiaodujiluxiangqing/NUM': '消毒记录详情',
    '/yingquguanlixin_zhongduiganbu_jiedaishishiyongjilu': '家属接待室使用记录',
    '/yingquguanlixin_houchurenyuan_houxuancaipujilu': '候选菜谱记录',
    '/yingquguanlixin_houchurenyuan_houxuancaipujilu/yingquguanlixin_houchurenyuan_houxuancaipujiluxiangqing/NUM': '候选菜谱记录详情',
    '/yingquguanlixin_houchurenyuan_houxuancaipujilu/yingquguanlixin_houchurenyuan_houxuancaipujiluxinzeng': '候选菜谱记录新增',
    '/yingquguanlixin_houchurenyuan_caipinguanli': '菜品管理',
    '/yingquguanlixin_houchurenyuan_caipinguanli/yingquguanlixin_houchurenyuan_caipinguanlixiugai/NUM': '菜品管理修改',
    '/yingquguanlixin_houchurenyuan_caipinguanli/yingquguanlixin_houchurenyuan_caipinguanlixinzeng': '菜品管理新增',
    '/yingquguanlixin_houchurenyuan_xiaodujilu': '消毒记录',
    '/yingquguanlixin_houchurenyuan_xiaodujilu/yingquguanlixin_houchurenyuan_xiaodujiluxiangqing/NUM': '消毒记录详情',
    '/yingquguanlixin_houchurenyuan_xiaodujilu/yingquguanlixin_houchurenyuan_xiaodujiluxinzeng': '消毒记录新增',
    '/yingquguanlixin_houchurenyuan_liufanshenqingjilu': '留饭申请记录',
    '/yingquguanlixin_banzhang_zhibanlishijilu': '值班历史记录',
    '/yingquguanlixin_banzhang_zhibanlishijilu/yingquguanlixin_banzhang_zhibanlishijiluxinzeng': '值班历史记录新增',
    '/yingquguanlixin_banzhang_zhibanlishijilu/yingquguanlixin_banzhang_zhibanlishijiluxiangqing/NUM': '值班历史记录详情',
    '/yingquguanlixin_banzhang_yichangtuogangjilu': '异常脱岗记录',
    '/yingquguanlixin_banzhang_yichangtuogangjilu/yingquguanlixin_banzhang_yichangtuogangjiluxiugai/NUM': '异常脱岗记录修改',
    '/yingquguanlixin_banzhang_qingjialishijilu': '请假历史记录',
    '/yingquguanlixin_banzhang_qingjialishijilu/yingquguanlixin_banzhang_qingjialishijiluxiangqing/NUM': '请假历史记录详情',
    '/yingquguanlixin_banzhang_qingjialishijilu/yingquguanlixin_banzhang_qingjialishijiluxinzeng': '请假历史记录新增',
    '/yingquguanlixin_banzhang_ruqinjinggaolishijilu': '入侵警告历史记录',
    '/yingquguanlixin_banzhang_ruqinjinggaolishijilu/yingquguanlixin_banzhang_ruqinjinggaolishijiluxiangqing/NUM': '入侵警告历史记录详情',
    '/yingquguanlixin_zhongduiganbu_renyuanbaimingdan': '人员白名单',
    '/yingquguanlixin_zhongduiganbu_renyuanbaimingdan/yingquguanlixin_zhongduiganbu_renyuanbaimingdanxiangqing/NUM': '人员白名单详情',
    '/yingquguanlixin_zhongduiganbu_renyuanbaimingdan/yingquguanlixin_zhongduiganbu_renyuanbaimingdanxinzeng': '人员白名单新增',
    //11 21 聊城新整理面包屑
    '/renyuanguanli_zhongduiguanliyuan_renyuanguanli': '人员管理',
    '/renyuanguanli_zhongduiguanliyuan_renyuanguanli/renyuanguanli_zhongduiganbu_renyuantianjia': '人员添加',
    '/renyuanguanli_zhongduiguanliyuan_renyuanguanli/renyuanguanli_zhongduiganbu_renyuanxiugai/NUM': '人员修改',
    '/renyuanguanli_zhongduiguanliyuan_renyuanguanli/renyuanguanli_zhongduiganbu_renyuanxiangqing/NUM': '人员详情',
    '/renyuanguanli_zhongduiguanliyuan_renyuanguanli/renyuanguanli_zhongduiguanliyuan_renyuanmimaxiugai/NUM': '修改密码',
    '/renyuanguanli_zhongduiganbu_bumenguanli': '部门管理',
    '/renyuanguanli_zhongduiganbu_bumenguanli/renyuanguanli_zhongduiganbu_bumenguanlixiangqing/NUM': '部门详情',
    '/renyuanguanli_zhongduiganbu_bumenguanli/renyuanguanli_zhongduiganbu_bumenxiugai/NUM': '部门修改',
    '/renyuanguanli_zhongduiganbu_bumenguanli/renyuanguanli_zhongduiganbu_bumentianjia': '部门新增',
    '/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang': '知识库栏目',
    '/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang/yingquguanlixin_zhishiguanliyuan_zhishiwenzhangxinzeng': '知识库栏目新增',
    '/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang/yingquguanlixin_zhishiguanliyuan_zhishiwenzhangxiangqing/NUM': '知识库栏目文章详情',
    '/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang/yingquguanlixin_zhishiguanliyuan_zhishiwenzhangxiangqing/NUM/yingquguanlixin_zhishiguanliyuan_zhishiwenzhangneirongxiangqing/NUM': '知识库栏目文章内容详情',
    '/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang/yingquguanlixin_zhishiguanliyuan_zhishiwenzhangxiangqing/NUM/yingquguanlixin_zhishiguanliyuan_zhishiwenzhangneirongxinzeng': '知识库栏目文章新增',
    '/renyuanguanli_zhongduiganbu_nianxiutianshuguanli': '年休天数管理',
    '/renyuanguanli_zhongduiganbu_nianxiutianshuguanli/renyuanguanli_zhongduiganbu_nianxiutianshuguanlixinzeng': '年休申请',


    '/yingquguanlixin_zhongduiganbu_kaoqinjilu': '考勤记录',
    '/yingquguanlixin_zhongduiganbu_kaoqinjilu/yingquguanlixin_zhongduiganbu_kaoqinjiluxiangqing/NUM': '考勤记录详情',
    '/yingquguanlixin_zhongduiganbu_shoujituogangjilu': '手机脱岗记录',
    '/yingquguanlixin_zhongduiganbu_shoujituogangjilu/yingquguanlixin_zhongdui_shoujiguankongshijianshezhi': '新增手机管控时间',
    '/yingquguanlixin_zhongduiganbu_shoujituogangjilu/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan': '手机管控时间查看',
    '/yingquguanlixin_zhongduiganbu_shoujituogangjilu/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan/yingquguanlixin_zhongduiganbu_shoujituogangjiluzhoucixiugai': '周次修改',
    '/yingquguanlixin_zhongduiganbu_shoujituogangjilu/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan/yingquguanlixin_zhongduiganbu_shoujituogangjiluxiugai/NUM': '管控时间修改',
    '/yingquguanlixin_xiaofangyuan_fangjianshenqing': '房间使用申请',
    '/yingquguanlixin_xiaofangyuan_fangjianshiyongjilu': '房间使用记录',
    '/yingquguanlixin_zhongduiganbu_caipujilu': '菜谱记录',
    '/yingquguanlixin_zuzhiyuangong_caipujilu': '菜谱记录',
    '/yingquguanlixin_zhongduiganbu_caipujilu/yingquguanlixin_zhongduiganbu_caipujiluxiangqing/NUM': '每周菜谱记录详情',
    '/yingquguanlixin_zhongduiganbu_dazhongdianping': '菜品评价',
    '/yingquguanlixin_zhongduiganbu_dazhongdianping/yingquguanlixin_zhongduiganbu_dazhongdianpingxiangqing/NUM': '菜品评价详情',
    '/yingquguanlixin_zhongduiganbu_chushipingjia': '厨师评价',
    '/yingquguanlixin_zhongduiganbu_chushipingjia/yingquguanlixin_zhongduiganbu_chushipingjiaxiangqing/NUM': '厨师评价详情',
    '/yingquguanlixin_xiaofangyuan_chayuezhishiwenzhang': '查阅知识文章',
    '/yingquguanlixin_xiaofangyuan_chayuezhishiwenzhang/yingquguanlixin_xiaofangyuan_chayuezhishiwenzhangxiangqing/NUM': '查阅知识文章详情',
    '/yingquguanlixin_xiaofangyuan_zhibanlishijilu': '值班历史记录',
    '/yingquguanlixin_xiaofangyuan_zhibanlishijilu/yingquguanlixin_xiaofangyuan_zhibanlishijiluxiangqing/NUM': '值班历史记录详情',
    '/yingquguanlixin_xiaofangyuan_jiaogangjilu': '叫岗记录',
    '/yingquguanlixin_xiaofangyuan_yichangtuogangjilu': '脱岗记录',
    '/yingquguanlixin_xiaofangyuan_quexijilu': '缺岗记录',
    '/yingquguanlixin_xiaofangyuan_qingjialishijilu': '请销假记录',
    '/yingquguanlixin_xiaofangyuan_qingjialishijilu/yingquguanlixin_xiaofangyuan_qingjialishijiluxiangqing/NUM': '请销假记录详情',
    '/yingquguanlixin_xiaofangyuan_qingjialishijilu/renyuanguanli_zhongduiganbu_qingjialishijiluxiangqing/NUM': '请销假记录详情',
    '/yingquguanlixin_xiaofangyuan_qingjialishijilu/yingquguanlixin_xiaofangyuan_qingjialishijiluxinzeng':'请假申请',
    '/yingquguanlixin_zuzhiyuangong_gongyongchelishijilu': '用车记录',
    '/yingquguanlixin_zuzhiyuangong_gongyongchelishijilu/yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang/NUM': '用车记录详情',
    '/yingquguanlixin_zuzhiyuangong_gongyongchelishijilu/yingquguanlixin_zuzhiyuangong_gongyongchelishijiluxinzeng':'用车申请',
    '/yingquguanlixin_zuzhiyuangong_gongyongchelishijilu/yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing/NUM': '轨迹',
    '/yingquguanlixin_zuzhi_fangjianchakan': '房间查看',
    '/yingquguanlixin_zhongduiganbu_fangjianshiyongjilu': '房间使用记录',
    '/yingquguanlixin_zhongduiganbu_yaopinrukuguanli': '药品入库管理',
    '/yingquguanlixin_zhongduiganbu_yaopinshiyongguanli': '药品使用管理',
    '/yingquguanlixin_zhongduiganbu_yaopinkucunguanli': '药品库存管理',
    '/yingquguanlixin_zhongduiganbu_yaopinpandianguanli': '药品盘点管理',
    '/yingquguanlixin_zhongduiganbu_guoqiyaopinchakan': '过期药品查看',
    '/yingquguanlixin_zhongduiganbu_daojushiyongjilu': '刀具使用记录',
    '/yingquguanlixin_zhongduiganbu_daojushiyongjilu/yingquguanlixin_zhongduiganbu_daojushiyongjiluxiangqing/NUM': '刀具使用记录详情',
    '/yingquguanlixin_zhongduiganbu_shicairukujilu': '食材入库记录',
    '/yingquguanlixin_zhongduiganbu_shicaikucunjilu': '食材库存记录',
    '/yingquguanlixin_zhongduiganbu_shicaixiaohaojilu': '食材消耗记录',
    '/yingquguanlixin_zhongduiganbu_kucungaojingjilu': '库存告警记录',
    '/yingquguanlixin_zhongduiganbu_zhibanlishijilu': '值班历史记录',
    '/yingquguanlixin_xiaofangyuan_zhibanlishijilu/yingquguanlixin_zhongduiganbu_zhibanlishijiluxinzeng': '值班历史记录新增',
    '/yingquguanlixin_xiaofangyuan_zhibanlishijilu/yingquguanlixin_zhongduiganbu_zhibanlishijiluxiangqing/NUM': '值班历史记录详情',
    '/yingquguanlixin_zhongduiganbu_jiaogangjilu': '叫岗记录',
    '/yingquguanlixin_zhongduiganbu_yichangtuogangjilu': '脱岗记录',
    '/yingquguanlixin_xiaofangyuan_yichangtuogangjilu/yingquguanlixin_zhongduiganbu_yichangtuogangjiluxiangqing/NUM': '脱岗记录详情',
    '/yingquguanlixin_zhongduiganbu_quexijilu': '缺岗记录',
    '/yingquguanlixin_zhongduiganbu_qingjialishijilu': '请销假记录',
    '/yingquguanlixin_xiaofangyuan_qingjialishijilu/yingquguanlixin_zhongduiganbu_qingjialishijiluxiangqing/NUM': '请销假记录详情',
    '/yingquguanlixin_zhongduiganbu_gongyongchelishijilu': '用车记录',
    '/yingquguanlixin_zhongduiganbu_gongyongchelishijilu/yingquguanlixin_cheliangguanliyuan_yongchelishijiluxiangqing/NUM': '轨迹',
    '/yingquguanlixin_zhongduiganbu_gongyongchelishijilu/yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang/NUM': '用车记录详情',
    '/yingquguanlixin_zhongduiganbu_gongyongcheguiji': '用车行车轨迹',
    '/yingquguanlixin_zhongduiganbu_gongyongcheguiji/yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji/NUM': '轨迹',
    '/yingquguanlixin_zhongduiganbu_renyuanchurujilu': '人员出入记录',
    '/yingquguanlixin_zhongduiganbu_cheliangchurujilu': '车辆出入记录',
    '/yingquguanlixin_zhongduiganbu_ruqinjinggaolishijilu': '入侵警告历史记录',
    '/yingquguanlixin_zhongduiganbu_ruqinjinggaolishijilu/yingquguanlixin_zhongduiganbu_ruqinjinggaolishijiluxiangqing/NUM': '入侵警告历史记录详情',
    '/yingquguanlixin_yiwurenyuan_yaopinrukuguanli': '药品入库管理',
    '/yingquguanlixin_yiwurenyuan_yaopinrukuguanli/yingquguanlixin_yiwurenyuan_yaopinrukuguanlixinzeng': '药品入库管理新增',
    '/yingquguanlixin_yiwurenyuan_yaopinshiyongguanli': '药品使用管理',
    '/yingquguanlixin_yiwurenyuan_yaopinshiyongguanli/yingquguanlixin_yiwurenyuan_yaopinshiyongguanlixinzeng': '药品使用管理新增',
    '/yingquguanlixin_yiwurenyuan_yaopinpandianguanli': '药品盘点管理',
    '/yingquguanlixin_yiwurenyuan_yaopinpandianguanli/yingquguanlixin_yiwurenyuan_yaopinpandianguanlixinzeng': '药品盘点管理新增',
    '/yingquguanlixin_yiwurenyuan_yaopinkucunguanli': '药品库存管理',
    '/yingquguanlixin_yiwurenyuan_guoqiyaopinchakan': '过期药品查看',
    '/yingquguanlixin_houchurenyuan_caipulishijilu': '菜谱管理',
    '/yingquguanlixin_zhongduiganbu_caipujilu/yingquguanlixin_houchurenyuan_caipulishijiluxiangqing/NUM': '菜谱管理详情',
    '/yingquguanlixin_zhongduiganbu_caipujilu/yingquguanlixin_houchurenyuan_caipulishijiluxinzeng': '菜谱新增',
    '/yingquguanlixin_houchurenyuan_meizhouxuancaitongji': '选菜统计',
    '/yingquguanlixin_houchurenyuan_meizhouxuancaitongji/yingquguanlixin_houchurenyuan_meizhoouxuancaitongjixiangqing/NUM': '选菜统计详情',
    '/yingquguanlixin_houchurenyuan_caipindianping': '菜品评价',
    '/yingquguanlixin_houchurenyuan_caipindianping/yingquguanlixin_houchurenyuan_caipindianpingxiangqing/NUM': '菜品评价详情',
    '/yingquguanlixin_shitangguanliyuan_chushipingjia': '厨师评价',
    '/yingquguanlixin_shitangguanliyuan_chushipingjia/yingquguanlixin_zhongduiganbu_chushipingjiaxiangqing/NUM': '厨师评价详情',
    '/yingquguanlixin_shitangguanliyuan_daojushiyongjilu': '刀具使用记录',
    '/yingquguanlixin_shitangguanliyuan_daojushiyongjilu/yingquguanlixin_zhongduiganbu_daojushiyongjiluxiangqing/NUM': '刀具使用记录详情',
    '/yingquguanlixin_houchurenyuan_shicaixiaohaojilu': '食材消耗记录',
    '/yingquguanlixin_houchurenyuan_kucungaojingjilu': '库存告警记录',
    '/yingquguanlixin_houchurenyuan_shicairukujilu': '食材入库记录',
    '/yingquguanlixin_houchurenyuan_shicaikucunjilu': '食材库存记录',
    '/yingquguanlixin_zhibanguanliyuan_zhibanlishijilu': '值班历史记录',
    '/yingquguanlixin_zhibanguanliyuan_zhibanlishijilu/yingquguanlixin_zhongduiganbu_zhibanlishijiluxinzeng': '值班历史记录新增',
    '/yingquguanlixin_zhibanguanliyuan_zhibanlishijilu/yingquguanlixin_zhongduiganbu_zhibanlishijiluxiangqing/NUM': '值班历史记录详情',
    '/yingquguanlixin_zhibanguanliyuan_yichangtuogangjilu': '脱岗记录',
    '/yingquguanlixin_zhibanguanliyuan_quexijilu': '缺岗记录',
    '/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu': '车辆管理',
    '/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu/yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxiugai/NUM': '车辆修改',
    '/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu/yingquguanlixin_cheliangguanliyuan_cheliangxinxijiluxinzeng': '车辆新增',
    '/yingquguanlixin_cheliangguanliyuan_yongchelishijilu': '用车记录',
    '/yingquguanlixin_cheliangguanliyuan_yongchelishijilu/yingquguanlixin_cheliangguanliyuan_yongchelishijiluqingkuang/NUM': '用车记录详情',
    '/yingquguanlixin_cheliangguanliyuan_gongyongchexingcheguiji': '用车行车轨迹',
    '/yingquguanlixin_cheliangguanliyuan_gongyongchexingcheguiji/yingquguanlixin_zhongduiganbu_gongyongcheguijiguiji/NUM': '轨迹',
    '/yingquguanlixin_zhongduiganbu_cheliangbaimingdan': '车辆白名单',
    '/yingquguanlixin_zhongduiganbu_cheliangbaimingdan/yingquguanlixin_zhongduiganbu_cheliangbaimingdanxinzeng': '车辆白名单新增',
    '/yingquguanlixin_zhongduiganbu_fangkejilu': '访客记录',
    '/yingquguanlixin_zhongduiganbu_fangkejilu/yingquguanlixin_zhongduiganbu_fangkejiluxiangqing/NUM': '访客记录详情',
    '/yingquguanlixin_zhongduiganbu_fangjianchakan': '房间管理',
    '/yingquguanlixin_zhongduiganbu_fangjianchakan/yingquguanlixin_zhongduiganbu_fangjianchakanxinzeng': '新增房间',
    '/yingquguanlixin_fangjianguanliyuan_fangjianshiyongjilu': '房间使用记录',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli': '设备管理',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_zhongduiganbu_kaoqinjiguanlitianjia': '添加指纹识别设备',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiugai/NUM': '指纹识别设备管理详情',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_zhongduiganbu_kaoqinjiguanlixiangqing/NUM': '指纹识别设备管理详情',
    '/yingquguanlixin_zhongduiganbu_kaoqinjibaimingdan': '指纹识别设备白名单',
    '/yingquguanlixin_zhongduiganbu_kaoqinjibaimingdan/yingquguanlixin_zhongduiganbu_kaoqinjibaimingdantianjia': '添加指纹识别设备白名单',
    '/yingquguanlixin_zhongduiganbu_kaoqinjibaimingdan/yingquguanlixin_zhongduiganbu_kaoqinjibaimingdanxiangqing/NUM': '指纹识别设备白名单详情',
    '/yingquguanlixin_zhongduiganbu_kaoqinjibaimingdan/yingquguanlixin_zhongduiganbu_kaoqinjibaimingdanxiugai/NUM': '指纹识别设备白名单修改',
    '/yingquguanlixin_yingquguanliyuan_renlianshibieyichakan': '人脸识别仪管理',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_renlianshibieyichakanxiugai/NUM': '人脸识别仪管理修改',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_renlianshibieyichakantianjia': '人脸识别仪管理新增',
    '/yingquguanlixin_yingquguanliyuan_renlianshibiebaimingdan': '人脸识别白名单',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_baimingdantianjia': '系统内人脸识别白名单新增',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_xitongwaibaimingdantianjia': '系统外人脸识别白名单新增',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_baimingdanshanchu/NUM': '人脸识别白名单详情',
    '/yingquguanlixin_yingquguanliyuan_chepaishibieyichakan': '车牌识别仪管理',
    '/yingquguanlixin_yingquguanliyuan_chepaishibieyibaimingdan': '车牌识别仪白名单',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_chepaishibieyixiugai/NUM': '车牌识别仪管理修改',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_chepaishibieyitianjia': '车牌识别仪管理新增',
    '/yingquguanlixin_yingquguanliyuan_zhinengchengguanli': '智能秤管理',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_zhinengchengguanlixiugai/NUM': '智能秤管理修改',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_zhinengchengguanlitianjia': '智能秤管理新增',
    '/yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanli': 'AI摄像机管理',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanlixiugai/NUM': 'AI摄像机管理修改',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanlitianjia': 'AI摄像机管理新增',
    '/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanli': '周界摄像机管理',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlixiugai/NUM': '周界摄像机管理修改',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanlitianjia': '周界摄像机管理新增',
    '/yingquguanlixin_yingquguanliyuan_baoguanguiguanli': '保管柜管理',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_baoguanguiguanlixiugai/NUM': '保管柜管理修改',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_baoguanguiguanlixinzeng': '保管柜管理新增',
    '/yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanli': '硬盘录像机管理',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanlixiugai/NUM': '硬盘录像机管理修改',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanlitianjia': '硬盘录像机管理新增',
    '/yingquguanlixin_yingquguanliyuan_shicairukushexiangjiguanli': '食材入库摄像机管理',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_shicairukushexiangjixiugai/NUM': '食材入库摄像机管理修改',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_shicairukushexiangjiitianjia': '食材入库摄像机管理新增',
    '/yingquguanlixin_zhongduiganbu_chashaotongji': '查哨统计',
    '/yingquguanlixin_zhongduiganbu_chaputianjia': '查铺计划添加',
    '/yingquguanlixin_zhongduiganbu_chapushezhi': '查铺计划',
    '/yingquguanlixin_zhongduiganbu_chaputongji': '查铺统计',
    '/yingquguanlixin_zhongduiganbu_xungengshezhi': '巡更计划',
    '/yingquguanlixin_zhongduiganbu_xungengtianjia': '巡更计划添加',
    '/yingquguanlixin_zhongduiganbu_xungengtongji': '巡更统计',
    '/yingquguanlixin_yingquguanliyuan_wangguanguanli': '智能家居管理',
    '/yingquguanlixin_yingquguanliyuan_wangguanguanli/xitongsheding_admin_wangguanxiugai/NUM': '修改',
    '/yingquguanlixin_yingquguanliyuan_wangguanguanli/xitongsheding_admin_wangguanxinzeng': '新增',
    '/yingquguanlixin_yingquguanliyuan_zhinengjiajushebeitongbu': '智能家居设备同步',
    '/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi': '手机管控记录',
    '/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan': '手机管控时间查看',
    '/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi/yingquguanlixin_zhongdui_shoujiguankongshijianshezhi': '手机管控时间新增',
    '/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan/yingquguanlixin_zhongduiganbu_shoujituogangjiluzhoucixiugai': '周次修改',
    '/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi/yingquguanlixin_zhongduiganbu_shoujituogangjiluchakan/yingquguanlixin_zhongduiganbu_shoujituogangjiluxiugai/NUM': '时间修改',



    '/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai': '周配档管理',
    '/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai/yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixinzeng': '周配档新增',
    '/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai/yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiangqing/NUM/NUM/NUM': '周配档详情',
    '/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai/yingquguanlixin_zuzhiguanliyuan_gongzuoanpaixiugai/NUM/NUM/NUM': '周配档修改',

    '/yingquguanlixin_zhibanguanliyuan_yaoshirijijilu': '要事日记',
    '/yingquguanlixin_zhibanguanliyuan_yaoshirijijilu/yingquguanlixin_zhibanguanliyuan_yaoshirijixiangqing/NUM': '要事日记详情',
    '/yingquguanlixin_zhibanguanliyuan_yaoshirijijilu/yingquguanlixin_zhibanguanliyuan_yaoshirijixiugai/NUM': '要事日记修改',

    '/yingquguanlixin_houchurenyuan_caigouguanli': '采购管理',
    '/yingquguanlixin_houchurenyuan_caigouguanli/yingquguanlixin_houchurenyuan_caigouguanlixiangqing/NUM': '采购管理详情',

    //装备管理
    '/qicai_zhongduiganbu_dituyingyong': '地图应用',
    '/qicai_zhongduiganbu_chujingjilu': '出警记录',
    '/qicai_zhongduiganbu_chujingjilu/chujingjiluxiangqing/NUM':'出警详情',
    '/qicai_zhongduiganbu_chujingjilu/qicai_zhongduiganbu_chujingrenyuanxiangqing/NUM':'出警人员详情',
    '/qicai_zhongduiganbu_chujingjilu/qicai_zhongduiganbu_chujingcheliangxiangqing/NUM':'出警车辆详情',
    '/qicai_tongxunyuan_chujingxinxi': '出警信息',
    '/qicai_zhongduiganbu_dianziweilan': '电子围栏',
    '/zhuangbeiguanli_zhongduirenyuan_zhuangbeitongji': '装备统计',
    '/zhuangbeiguanli_zhongduirenyuan_zhuangbeitongji/zhuangbeiguanli_zhongduirenyuan_zhuangbeitongjixiangqing/NUM':'装备统计详情',
    '/zhuangbeiguanli_zhongduirenyuan_zhuangbeitongji/zhuangbeiguanli_zhongduirenyuan_zhuangbeitongjixiangqing/NUM/zhuangbeiguanli_zhongduirenyuan_zhuangbeixiangqing/NUM':'装备详情',
    '/zhuangbeiguanli_zhongduirenyuan_zhuangbeichurukujilu': '装备出入库记录',
    '/zhuangbeiguanli_zhongduirenyuan_zhuangbeichurukujilu/zhuangbeiguanli_zhongduirenyuan_churukujiluxiangqing/NUM':'装备出入库记录详情',
    '/zhuangbeiguanli_zhongduirenyuan_zhuangbeixinzengbaofeijilu': '装备新增报废记录',
    '/zhuangbeiguanli_zhongduirenyuan_zhuangbeixinzengbaofeijilu/zhuangbeiguanli_zhongduirenyuan_baofeijiluxiangqing/NUM':'装备新增报废记录详情',
    '/zhuangbeiguanli_zhongduirenyuan_xiaofangcheguanli': '消防车管理',
    '/zhuangbeiguanli_zhongduirenyuan_xiaofangcheguanli/qicai_zhongduiganbu_xiaofangchetianjia':'消防车添加',
    '/zhuangbeiguanli_zhongduirenyuan_xiaofangcheguanli/xiaofangchechaxunxiangqing/NUM':'消防车详情',
    '/zhuangbeiguanli_zhongduirenyuan_xiaofangcheguanli/xiaofangchechaxunxiugai/NUM':'消防车修改',
    '/zhuangbeiguanli_zhongduirenyuan_cangkuguanli': '仓库管理',
    '/zhuangbeiguanli_zhongduirenyuan_cangkuguanli/zhuangbeiguanli_zhongduirenyuan_cangkutianjia':'仓库添加',
    '/zhuangbeiguanli_zhongduirenyuan_cangkuguanli/zhuangbeigunali_zhongduirenyuan_cangkuguanlixiangqing/NUM':'仓库详情',
    '/zhuangbeiguanli_zhongduirenyuan_cangkuguanli/zhuangbeiguanli_zhongduirenyuan_cangkuxiugai/NUM':'仓库修改',
    '/zhuangbeiguanli_zhongduirenyuan_jiaojiebanjilu': '交接班记录',


    '/renyuanguanli_zhiduiganbu_shuiyuanshezhi':'水源管理',
    '/renyuanguanli_zhiduiganbu_shuiyuanshezhi/shuiyuantianjia':'水源添加',
    '/renyuanguanli_zhiduiganbu_shuiyuanshezhi/shuiyuanxiugai/NUM':'水源修改',
    '/renyuanguanli_zhiduiganbu_shuiyuanshezhi/shuiyuanxiangqing/NUM':'水源详情',


    '/shuju_zhongdui_zhongdiandanweiguanli':'重点单位管理',
    '/shuju_zhongdui_zhongdiandanweiguanli/shuju_zhongdui_zhongdiandanweitianjia':'重点单位添加',
    '/shuju_zhongdui_zhongdiandanweiguanli/shuju_zhongdui_zhongdiandanweixiangqing/NUM':'重点单位修改',
    '/shuju_zhongdui_zhongdiandanweiguanli/shuju_zhongdui_zhongdiandanweixiugai/NUM':'重点单位详情',
    '/shuju_zhongdui_yanlianjiluguanli':'演练记录',
    '/shuju_zhongdui_shuxijiluguanli':'熟悉记录',


    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_renlianshibieqiujixiugai/NUM': '人脸识别球机修改',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_renlianshibieqiujitianjia': '人脸识别球机新增',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_zhinengrenlianyingpanluxiangjixiugai/NUM': '智能人脸硬盘录像机修改',
    '/yingquguanlixin_zhongduiganbu_kaoqinjiguanli/yingquguanlixin_yingquguanliyuan_zhinengrenlianyingpanluxiangjitianjia': '智能人脸硬盘录像机新增',


    '/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang':'知识库管理',
    '/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxinzeng':'知识库栏目添加',
    '/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing/NUM':'知识库栏目详情',
    '/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing/NUM/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxinzeng':'知识文章添加',
    '/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing/NUM/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiangqing/NUM':'知识文章详情',
    '/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing/NUM/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangneirongxiugai/NUM':'知识文章修改',

    '/zhoupeidanglist':'周配档管理',
    '/zhoupeidangadd':'周配档添加',
    '/zhoupeidangTimeSet':'周配档时间段设置',
    '/list':'云搜索管理',
    '/list/zhuangbeiguanli_zhongduirenyuan_zhuangbeixiangqing/NUM':'云搜索管理详情',
    '/duirongfengjiList':'队容风纪',
    '/neiwuweishengList':'内务卫生',
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
	    if (val === "" || val ==null) {
	        return false;
	    }
	    let regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
		let regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
		//isNaN() 函数用于检查其参数是否是非数字值。
	    if (!isNaN(val)) {
	        return true;
	    } else {
	    	if (regNumber.test(val)) {
			    return true;
			}else{
			    return false;
			}
	    }
	}
    getPath() {
    	const THE = this;
    	//对路径进行切分，存放到this.state.pathSnippets中
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
