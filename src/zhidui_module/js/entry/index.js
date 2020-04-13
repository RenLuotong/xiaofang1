import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, IndexRoute, Route ,Switch ,Redirect} from 'react-router-dom';
import { LocaleProvider, Layout, Menu, Icon, Breadcrumb, Avatar, Dropdown, Drawer, Button, Badge, Divider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import commonLess from '../../less/common.less';
import Zzbreadcrumb from "../zzbreadcrumb";

import Zhgl from "../userInfo/zhgl";
//人员管理
import yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang.js';
import renyuanguanli_zhiduiganbu_renyuanguanli from '../renyuanguanli/renyuanguanli/renyuanguanli_zhiduiganbu_renyuanguanli.js';
import renyuanguanli_zhiduiganbu_renyuandiaobo from '../renyuanguanli/renyuanguanli/renyuanguanli_zhiduiganbu_renyuandiaobo.js';
import renyuanguanli_zhiduiganbu_bumenshezhi from '../renyuanguanli/xitonghoutai/renyuanguanli_zhiduiganbu_bumenshezhi.js';
import renyuanguanli_zhiduiganbu_zhiwushezhi from '../renyuanguanli/xitonghoutai/renyuanguanli_zhiduiganbu_zhiwushezhi.js';
import renyuanguanli_zhiduiganbu_zuzhijigoushezhi from '../renyuanguanli/xitonghoutai/renyuanguanli_zhiduiganbu_zuzhijigoushezhi.js';
import renyuanguanli_zhiduiganbu_zuzhijigoujingweidushezhi from '../renyuanguanli/xitonghoutai/renyuanguanli_zhiduiganbu_zuzhijigoujingweidushezhi.js';
import renyuanguanli_zhiduiganbu_nianxiutianshuguanli from '../renyuanguanli/renyuanguanli/renyuanguanli_zhiduiganbu_nianxiutianshuguanli.js';
import shiyongshuoming
    from "../../../xitong_module/js/userInfo/shiyongshuoming";
import renyuanguanli_zhiduiganbu_nianxiutianshuxiugai
    from "../../../zhidui_module/js/renyuanguanli/renyuanguanli/renyuanguanli_zhiduiganbu_nianxiutianshuxiugai";
//其他按钮相关
import renyuanguanli_zhiduiganbu_renyuantianjia from '../renyuanguanli/renyuanguanli/renyuanguanli_zhiduiganbu_renyuantianjia.js';
import renyuanguanli_zhiduiganbu_bumentianjia from '../renyuanguanli/xitonghoutai/renyuanguanli_zhiduiganbu_bumentianjia.js';
import renyuanguanli_zhiduiganbu_zhiwutianjia from '../renyuanguanli/xitonghoutai/renyuanguanli_zhiduiganbu_zhiwutianjia.js';
import renyuanguanli_zhiduiganbu_zuzhijigoutianjia from '../renyuanguanli/xitonghoutai/renyuanguanli_zhiduiganbu_zuzhijigoutianjia.js';
import daibanshixiang_zhiduiganbu_daibanshixiang from '../daibanshixiang/daibanshixiang_zhiduiganbu_daibanshixiang.js';
import xitongsheding_admin_yingquguanli from '../renyuanguanli/xitonghoutai/xitongsheding_admin_yingquguanli.js';
import renyuanguanli_zhiduiganbu_shuiyuanshezhi from '../renyuanguanli/xitonghoutai/renyuanguanli_zhiduiganbu_shuiyuanshezhi.js';
//支队二期新菜单
import xitongsheding_admin_shicaiguanli from '../renyuanguanli/xitonghoutai/xitongsheding_admin_shicaiguanli.js';
import xitongsheding_admin_shicaileixingguanli from '../renyuanguanli/xitonghoutai/xitongsheding_admin_shicaileixingguanli.js';
import xitongsheding_admin_caipinleixingguanli from '../renyuanguanli/xitonghoutai/xitongsheding_admin_caipinleixingguanli.js';
//引用中队人员功能
import renyuanguanli_zhongduiguanliyuan_renyuanguanli from "../../../zhongdui_module/js/renyuanguanli/renyuanguanli/renyuanguanli_zhongduiguanliyuan_renyuanguanli";
import renyuanguanli_zhongduiganbu_nianxiutianshuguanli
    from "../../../zhongdui_module/js/renyuanguanli/renyuanguanli/renyuanguanli_zhongduiganbu_nianxiutianshuguanli";
import renyuanguanli_zhongduiganbu_bumenguanli from "../../../zhongdui_module/js/renyuanguanli/xitonghoutai/renyuanguanli_zhongduiganbu_bumenguanli";
import yingquguanlixin_zhishiguanliyuan_zhishiwenzhang
    from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang.js';
//引入admin功能
import xitongsheding_admin_wuzileibieshezhi
    from "../../../xitong_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_wuzileibieshezhi";
import xitongsheding_admin_wuzileibietianjia
    from "../../../xitong_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_wuzileibietianjia";
import xitongsheding_admin_wuzileixingshezhi
    from "../../../xitong_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_wuzileixingshezhi";
import xitongsheding_admin_wuzileixingtianjia
    from "../../../xitong_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_wuzileixingtianjia";
import xitongsheding_admin_xiaofangcheleixingshezhi
    from "../../../xitong_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_xiaofangcheleixingshezhi";
import xitongsheding_admin_xiaofangcheleixingtianjia
    from "../../../xitong_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_xiaofangcheleixingtianjia";
import xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli from "../../../zhidui_module/js/renyuanguanli/xitonghoutai/xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli";
import xitongsheding_admin_caipinguanli
    from "../../../xitong_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_caipinguanli";
import xitongsheding_admin_yaopinguanli
    from "../../../xitong_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_yaopinguanli";


import yingquguanlixin_zhiduilingdao_shicaikucunjilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduilingdao_shicaikucunjilu.js';
import yingquguanlixin_zhiduilingdao_shicaixiaohaojilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduilingdao_shicaixiaohaojilu.js';
import yingquguanlixin_zhiduiganbu_yichangtuogangjilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiganbu_yichangtuogangjilu.js';
import yingquguanlixin_zhiduiganbu_gongyongchelishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiganbu_gongyongchelishijilu.js';
import yingquguanlixin_zhiduiganbu_gongyongchexingcheguiji from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiganbu_gongyongchexingcheguiji.js';
import yingquguanlixin_zhiduiganbu_zhibanlishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiganbu_zhibanlishijilu.js';
import yingquguanlixin_zhiduiganbu_qingjialishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiganbu_qingjialishijilu.js';
import yingquguanlixin_zhiduiganbu_baoguanguishiyongjilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiganbu_baoguanguishiyongjilu.js';
import yingquguanlixin_zhiduiganbu_ruqinjinggaolishijilu from '../xinyingquguanli/zongheanfang/yingquguanlixin_zhiduiganbu_ruqinjinggaolishijilu.js';
import yingquguanlixin_zhiduiganbu_shoujituogangjilu from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhiduiganbu_shoujituogangjilu.js';
//支队114新菜单
import yingquguanlixin_zhidui_fangjianchakan from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhidui_fangjianchakan.js';
import yingquguanlixin_zhidui_fangjianshiyongjilu from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhidui_fangjianshiyongjilu.js';
import yingquguanlixin_zhiduiganbu_yaopinrukuguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhiduiganbu_yaopinrukuguanli.js';
import yingquguanlixin_zhiduiganbu_yaopinshiyongguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhiduiganbu_yaopinshiyongguanli.js';
import yingquguanlixin_zhiduiganbu_yaopinpandianguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhiduiganbu_yaopinpandianguanli.js';
import yingquguanlixin_zhiduiganbu_yaopinkucunguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhiduiganbu_yaopinkucunguanli.js';
import yingquguanlixin_zhiduiganbu_guoqiyaopinchakan from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhiduiganbu_guoqiyaopinchakan.js';
import yingquguanlixin_zhiduiganbu_daojushiyongjilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhiduiganbu_daojushiyongjilu';
import yingquguanlixin_zhiduiganbu_shicairukujilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhiduiganbu_shicairukujilu.js';
import yingquguanlixin_zhiduiganbu_kucungaojingjilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhiduiganbu_kucungaojingjilu.js';
import yingquguanlixin_zhiduiganbu_jiaogangjilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiganbu_jiaogangjilu.js';
import yingquguanlixin_zhiduiganbu_quegangjilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiganbu_quegangjilu.js';
import yingquguanlixin_zhiduiganbu_xiaojialishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiganbu_xiaojialishijilu.js';
import yingquguanlixin_zhiduiganbu_gongyongchehuanchejilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiganbu_gongyongchehuanchejilu.js';
import yingquguanlixin_zhiduiganbu_renyuanchurujilu from '../xinyingquguanli/zongheanfang/yingquguanlixin_zhiduiganbu_renyuanchurujilu.js';
import yingquguanlixin_zhiduiganbu_cheliangchurujilu from '../xinyingquguanli/zongheanfang/yingquguanlixin_zhiduiganbu_cheliangchurujilu.js';
//引入中队模块功能
import yingquguanlixin_xiaofangyuan_fangjianshenqing
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_xiaofangyuan_fangjianshenqing";
import yingquguanlixin_xiaofangyuan_fangjianshiyongjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_xiaofangyuan_fangjianshiyongjilu";
import yingquguanlixin_xiaofangyuan_jiedaishidasaojilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_xiaofangyuan_jiedaishidasaojilu";
import yingquguanlixin_xiaofangyuan_jiedaishishenqing
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_xiaofangyuan_jiedaishishenqing";
import yingquguanlixin_xiaofangyuan_jiedaishishiyongjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_xiaofangyuan_jiedaishishiyongjilu";
import yingquguanlixin_xiaofangyuan_zhouhoupingcai
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_xiaofangyuan_zhouhoupingcai";
import yingquguanlixin_xiaofangyuan_dazhongdianping
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_xiaofangyuan_dazhongdianping";
import yingquguanlixin_zhongduiganbu_dazhongdianping
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_dazhongdianping";
import yingquguanlixin_xiaofangyuan_chayuezhishiwenzhang
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_chayuezhishiwenzhang";
import yingquguanlixin_zhongduiganbu_fangjianchakan
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_fangjianchakan";
import yingquguanlixin_zhongduiganbu_fangjianshiyongjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_fangjianshiyongjilu";
import yingquguanlixin_yiwurenyuan_yaopinrukuguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_yiwurenyuan_yaopinrukuguanli";
import yingquguanlixin_yiwurenyuan_yaopinshiyongguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_yiwurenyuan_yaopinshiyongguanli";
import yingquguanlixin_yiwurenyuan_yaopinpandianguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_yiwurenyuan_yaopinpandianguanli";
import yingquguanlixin_yiwurenyuan_guoqiyaopinchakan
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_yiwurenyuan_guoqiyaopinchakan";
import yingquguanlixin_yiwurenyuan_yaopinkucunguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_yiwurenyuan_yaopinkucunguanli";
import yingquguanlixin_zhongduiganbu_yaopinrukuguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_yaopinrukuguanli";
import yingquguanlixin_zhongduiganbu_yaopinshiyongguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_yaopinshiyongguanli";
import yingquguanlixin_zhongduiganbu_yaopinkucunguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_yaopinkucunguanli";
import yingquguanlixin_zhongduiganbu_yaopinpandianguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_yaopinpandianguanli";
import yingquguanlixin_zhongduiganbu_jiedaishishiyongjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_jiedaishishiyongjilu";
import yingquguanlixin_zhongduiganbu_jiedaishidasaojilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_jiedaishidasaojilu";
import yingquguanlixin_houchurenyuan_houxuancaipujilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_houxuancaipujilu";
import yingquguanlixin_houchurenyuan_caipulishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_caipulishijilu";
import yingquguanlixin_houchurenyuan_meizhouxuancaitongji
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_meizhouxuancaitongji";
import yingquguanlixin_houchurenyuan_caipindianping
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_caipindianping";
import yingquguanlixin_houchurenyuan_liufanshenqingjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_liufanshenqingjilu";
import yingquguanlixin_zhongduiganbu_kaoqinjiguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
import yingquguanlixin_zhongduiganbu_kaoqinjibaimingdan
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_kaoqinjibaimingdan";
import yingquguanlixin_zhongduiganbu_kaoqinjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_kaoqinjilu";
import yingquguanlixin_houchurenyuan_kucungaojingjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_kucungaojingjilu";
import yingquguanlixin_houchurenyuan_caipinguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_caipinguanli";
import yingquguanlixin_houchurenyuan_xiaodujilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_xiaodujilu";
import yingquguanlixin_houchurenyuan_shicairukujilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_shicairukujilu";
import yingquguanlixin_houchurenyuan_shicaikucunjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_shicaikucunjilu";
import yingquguanlixin_houchurenyuan_shicaixiaohaojilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_shicaixiaohaojilu";
import yingquguanlixin_zhongduiganbu_shicaixiaohaojilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_shicaixiaohaojilu";
import yingquguanlixin_zhongduiganbu_shicaikucunjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_shicaikucunjilu";
import yingquguanlixin_zhongduiganbu_shicairukujilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_shicairukujilu";
import yingquguanlixin_zhongduiganbu_daojushiyongjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_daojushiyongjilu";
import yingquguanlixin_zhongduiganbu_xiaodujilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_xiaodujilu";
import yingquguanlixin_zhongduiganbu_caipujilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_caipujilu";
import yingquguanlixin_zuzhiyuangong_caipujilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_zuzhiyuangong_caipujilu";
import yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu";
import yingquguanlixin_cheliangguanliyuan_yongchelishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_cheliangguanliyuan_yongchelishijilu";
import yingquguanlixin_zhongduiganbu_gongyongcheguiji
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_gongyongcheguiji";
import yingquguanlixin_banzhang_zhibanlishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_banzhang_zhibanlishijilu";
import yingquguanlixin_banzhang_yichangtuogangjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_banzhang_yichangtuogangjilu";
import yingquguanlixin_banzhang_qingjialishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_banzhang_qingjialishijilu";
import yingquguanlixin_zhongduiganbu_zhibanlishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_zhibanlishijilu";
import yingquguanlixin_zhongduiganbu_yichangtuogangjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_yichangtuogangjilu";
import yingquguanlixin_zhongduiganbu_quexijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_quexijilu";
import yingquguanlixin_zhongduiganbu_qingjialishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_qingjialishijilu";
import yingquguanlixin_zhongduiganbu_gongyongchelishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_gongyongchelishijilu";
import yingquguanlixin_zhongduiganbu_gongyongchehuanchejilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_gongyongchehuanchejilu";
import yingquguanlixin_zhongduiganbu_cheliangbaimingdan
    from "../../../zhongdui_module/js/xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_cheliangbaimingdan";
import yingquguanlixin_zhongduiganbu_cheliangchurujilu
    from "../../../zhongdui_module/js/xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_cheliangchurujilu";
import yingquguanlixin_zhongduiganbu_renyuanchurujilu
    from "../../../zhongdui_module/js/xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_renyuanchurujilu";
import yingquguanlixin_zhongduiganbu_renyuanbaimingdan
    from "../../../zhongdui_module/js/xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_renyuanbaimingdan";
import yingquguanlixin_banzhang_ruqinjinggaolishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zongheanfang/yingquguanlixin_banzhang_ruqinjinggaolishijilu";
import yingquguanlixin_zhongduiganbu_fangkejilu
    from "../../../zhongdui_module/js/xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_fangkejilu";
import yingquguanlixin_fangjianguanliyuan_daidasaojiedaishi
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_fangjianguanliyuan_daidasaojiedaishi";
import yingquguanlixin_xiaofangyuan_zhibanlishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_zhibanlishijilu";
import yingquguanlixin_xiaofangyuan_yichangtuogangjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_yichangtuogangjilu";
import yingquguanlixin_xiaofangyuan_quexijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_quexijilu";
import yingquguanlixin_xiaofangyuan_jiaogangjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_jiaogangjilu";
import yingquguanlixin_zhongduiganbu_ruqinjinggaolishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_ruqinjinggaolishijilu";
import yingquguanlixin_xiaofangyuan_qingjialishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_qingjialishijilu";
import yingquguanlixin_yingquguanliyuan_renlianshibieyichakan
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibieyichakan";
import yingquguanlixin_yingquguanliyuan_renlianshibiebaimingdan
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibiebaimingdan";
import yingquguanlixin_yingquguanliyuan_chepaishibieyichakan
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_chepaishibieyichakan";
import yingquguanlixin_yingquguanliyuan_zhinengchengguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhinengchengguanli";
import yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanli";
import yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanli";
import yingquguanlixin_yingquguanliyuan_baoguanguiguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_baoguanguiguanli";
import yingquguanlixin_yingquguanliyuan_zhinengjiajushebeitongbu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhinengjiajushebeitongbu";
import yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanli";
import yingquguanlixin_zhongduiganbu_shoujituogangjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_shoujituogangjilu";
import yingquguanlixin_zhongduiganbu_chushipingjia
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_chushipingjia";
import yingquguanlixin_yingquguanliyuan_shicairukushexiangjiguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_shicairukushexiangjiguanli";
import yingquguanlixin_zhongduiganbu_chapushezhi
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_chapushezhi";
import yingquguanlixin_zhongduiganbu_chaputianjia
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_chaputianjia";
import yingquguanlixin_zhongduiganbu_chaputongji
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_chaputongji";
import yingquguanlixin_zhongduiganbu_xungengshezhi
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_xungengshezhi";
import yingquguanlixin_zhongduiganbu_xungengtianjia
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_xungengtianjia";
import yingquguanlixin_zhongduiganbu_xungengtongji
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_xungengtongji";
import yingquguanlixin_zhongduiganbu_chashaotongji
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_chashaotongji";
import yingquguanlixin_zuzhiyuangong_gongyongchelishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zuzhiyuangong_gongyongchelishijilu";
import yingquguanlixin_zhibanguanliyuan_yichangtuogangjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhibanguanliyuan_yichangtuogangjilu";
import yingquguanlixin_zhibanguanliyuan_zhibanlishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhibanguanliyuan_zhibanlishijilu";
import yingquguanlixin_zhibanguanliyuan_quexijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhibanguanliyuan_quexijilu";
import yingquguanlixin_zuzhi_fangjianchakan
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zuzhi_fangjianchakan";
import yingquguanlixin_houchurenyuan_caigouguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_caigouguanli";
import yingquguanlixin_shitangguanliyuan_chushipingjia
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_shitangguanliyuan_chushipingjia";
import yingquguanlixin_shitangguanliyuan_daojushiyongjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_shitangguanliyuan_daojushiyongjilu";
import yingquguanlixin_xiaofangyuan_xiaojialishijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_xiaojialishijilu";
import yingquguanlixin_zuzhiyuangong_gongyongchehuanchejilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zuzhiyuangong_gongyongchehuanchejilu";
import yingquguanlixin_cheliangguanliyuan_yongchehuanchejilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_cheliangguanliyuan_yongchehuanchejilu";
import yingquguanlixin_cheliangguanliyuan_gongyongchexingcheguiji
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_cheliangguanliyuan_gongyongchexingcheguiji";
import yingquguanlixin_fangjianguanliyuan_fangjianshiyongjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_fangjianguanliyuan_fangjianshiyongjilu";
import yingquguanlixin_yingquguanliyuan_chepaishibieyibaimingdan
    from "../../../zhongdui_module/js/xinyingquguanli/zongheanfang/yingquguanlixin_yingquguanliyuan_chepaishibieyibaimingdan";
import yingquguanlixin_yingquguanliyuan_wangguanguanli
    from "../../../zhongdui_module/js/xinyingquguanli/zongheanfang/yingquguanlixin_yingquguanliyuan_wangguanguanli";
import yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhineng_shoujituogangjilu";
import yingquguanlixin_zhongduiganbu_xiaojialishijilu from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_xiaojialishijilu";
import yingquguanlixin_zhongduiganbu_jiaogangjilu from '../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_jiaogangjilu';
import yingquguanlixin_zhongduiganbu_kucungaojingjilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_kucungaojingjilu";
import yingquguanlixin_zhongduiganbu_guoqiyaopinchakan
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_guoqiyaopinchakan";
import yingquguanlixin_zuzhiguanliyuan_qingjiajiluchakan from "../../../zhongdui_module/js/renyuanguanli/renyuanguanli/yingquguanlixin_zuzhiguanliyuan_qingjiajiluchakan";
import yingquguanlixin_zuzhiguanliyuan_paibanshijianshezhi from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zuzhiguanliyuan_paibanshijianshezhi.js';

import yingquguanlixin_zuzhiguanliyuan_gongzuoanpai
    from "../../../zhongdui_module/js/xinyingquguanli/zongheanfang/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai";

//要事日记
import yingquguanlixin_zhibanguanliyuan_yaoshirijijilu
    from "../../../zhongdui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhibanguanliyuan_yaoshirijijilu";

//装备管理
import zhuangbeiguanli_zhiduirenyuan_zhuangbeitongji
    from "../zhuangbeiguanli/zhuangbeiguanli_zhiduirenyuan_zhuangbeichaxun";
//消防调度
import qicai_houqinchuzhang_dituyingyong
    from "../xiaofangdiaodu/qicai_houqinchuzhang_dituyingyong";
import qicai_zhiduiganbu_chujingjilu
    from "../xiaofangdiaodu/qicai_zhiduiganbu_chujingjilu";
import qicai_zhiduiganbu_chujingxinxi
    from "../xiaofangdiaodu/qicai_zhiduiganbu_chujingxinxi";
import tongjisun from "../../../zhongdui_module/imgs/tongjisun.png";

import shuju_zhongdui_zhongdiandanweiguanli from '../xiaofangdiaodu/shuju_zhidui_zhongdiandanweiguanli.js';
import shuju_zhongdui_shuxijiluguanli from "../../../zhongdui_module/js/xiaofangdiaodu/shuju_zhongdui_shuxijiluguanli";
import shuju_zhongdui_yanlianjiluguanli
    from "../../../zhongdui_module/js/xiaofangdiaodu/shuju_zhongdui_yanlianjiluguanli";



import yunsousuolist from  '../../../common/yun_sou_suo/List'
import yunsousuoChildlist from  '../../../common/yun_sou_suo/ChildList'
import yunsousuoxiangqing from  '../../../common/yun_sou_suo/Xiangqing'
import addwenzhang from  '../../../common/yun_sou_suo/AddWenZhang'
import editwenzhang from '../../../common/yun_sou_suo/EditWenzhang'
import duirongfengjiList from '../../../common/dui_rong_feng_ji/List'
import neiwuweishengList from '../../../common/nei_wu_wei_sheng/List'

import zhoupeidanglist from '../../../common/周配档/List'
import zhoupeidangadd from '../../../common/周配档/Add'
import {message} from "antd/lib/index";

//e考核

//人员管理
import xitongsheding_admin_zaixianxuexi from "../../../common/e考核/weihaizhenggong/xitongsheding_admin_zaixianxuexi.js";
import xitongsheding_admin_kaoshiguanli from "../../../common/e考核/weihaizhenggong/xitongsheding_admin_kaoshiguanli.js";
import zhoupeidangTimeSet from "../../../common/周配档/TimeSet";
import daiwanshan from "../../../common/daiwanshan";


const SubMenu = Menu.SubMenu;
const { Header, Sider, Content, Footer } = Layout;
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
          clickindex: [],
          showHide: 'inline-block',
          showcaidan: "block",
          showanniu: "none",
          showzuozhan: "none",
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
            window.location.href = "zhidui.html#/zhgl";
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

    getDaiban() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "gerenfanghuDaibanLiebiao",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let count = data.data.length;
                sessionStorage.setItem("count",count);
            }
        });
    }

    //递归方法遍历菜单
    recursion=(dataSource)=>{
      return (
        dataSource.map((item)=>{
            if(item.children && item.key !== "b84d15ddb7a944dd829faeba5debbfc0" && item.title !== "训练秩序"){
                return (
                    <SubMenu key={item.key} title={<span><Icon type={item.tubiao}/><span>{item.title}</span></span>}>
                        {this.recursion(item.children)}
                    </SubMenu>
                )
            }else if(item.children && item.key === "b84d15ddb7a944dd829faeba5debbfc0" && item.title !== "训练秩序") {
                return (
                    <SubMenu key={item.key} title={<span><Icon type={item.tubiao}/><span>{item.title}</span></span>} className="zhiduiguanli">
                        {this.recursion(item.children)}
                    </SubMenu>
                )
            }else if(item.title === "训练秩序") {
                return (
                    <Menu.Item key="880" className="shiyongshuoming">
                        <Link to={"/daiwanshan"}><Icon type="area-chart" /><span>训练秩序</span></Link>
                    </Menu.Item>
                )
            }
          return <Menu.Item key={item.key}><Link to={item.luyou}>{item.title}</Link></Menu.Item>
        })
      )
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

    componentWillMount(){
        /*let caidan = JSON.parse(sessionStorage.getItem("caidan1"));
        for(let i=0;i<caidan.length;i++) {
            // this.setState({
            //     clickindex: [caidan[i].title],
            // })
            if(caidan[i].title === '支队管理'){
            this.getCaidan(caidan[i].title,'chushi');
            }else{
                this.getCaidan("工作秩序");

                this.getCaidan("战备秩序");

                this.getCaidan("生活秩序");
            }
            break;
        }*/
    }


    componentDidMount() {
        this.getCaidans();
        // this.timerID = setInterval(
        //     () => this.getDaiban(),
        //     60000
        // );
    }

    componentWillUnMount() {
        clearInterval(this.timerID);

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
          if(data.data && data.data[0] && data.data[0].children && data.data[0].children[0] && data.data[0].children[0].children && data.data[0].children[0].children[0]&& data.data[0].children[0].children[0].luyou ){
              let redirest = data.data[0].children[0].children[0].luyou;
              THE.setState({
                  redirest: redirest,
              });
          }
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
                    <Sider className="mySider_left" style={{ backgroundColor: '#3460AB' }}>
                    <Menu
                        mode="inline"
                        theme="dark"
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        style={{ height: '100%', borderRight: 0,background: '#3460AB' }}
                    >
                      {this.recursion(this.state.caidan)}
                        <Menu.Item key="88" className="shiyongshuoming">
                            <Link to="/shiyongshuoming"><Icon type="android-o" /><span>使用说明</span></Link>
                        </Menu.Item>
                    </Menu>
                    </Sider>
                    <Content id="root_content_div">
                        <Zzbreadcrumb />
                        <div className='root_content_div_box'>
                            <Switch>
                                <Route path="/zhgl" component={Zhgl} />
                                <Route path="/shiyongshuoming" component={shiyongshuoming} />
                                <Route path="/renyuanguanli_zhiduiganbu_nianxiutianshuxiugai" component={renyuanguanli_zhiduiganbu_nianxiutianshuxiugai} />
                                {/*人员管理*/}
                                <Route path="/renyuanguanli_zhiduiganbu_renyuanguanli" component={renyuanguanli_zhiduiganbu_renyuanguanli} />
                                <Route path="/renyuanguanli_zhiduiganbu_bumenshezhi" component={renyuanguanli_zhiduiganbu_bumenshezhi} />
                                <Route path="/renyuanguanli_zhiduiganbu_zhiwushezhi" component={renyuanguanli_zhiduiganbu_zhiwushezhi} />
                                <Route path="/renyuanguanli_zhiduiganbu_zuzhijigoushezhi" component={renyuanguanli_zhiduiganbu_zuzhijigoushezhi} />
                                <Route path="/renyuanguanli_zhiduiganbu_renyuandiaobo" component={renyuanguanli_zhiduiganbu_renyuandiaobo} />
                                <Route path="/renyuanguanli_zhiduiganbu_zuzhijigoujingweidushezhi" component={renyuanguanli_zhiduiganbu_zuzhijigoujingweidushezhi} />
                                {/*其他按钮相关*/}
                                <Route path="/renyuanguanli_zhiduiganbu_renyuantianjia" component={renyuanguanli_zhiduiganbu_renyuantianjia} />
                                <Route path="/renyuanguanli_zhiduiganbu_bumentianjia" component={renyuanguanli_zhiduiganbu_bumentianjia} />
                                <Route path="/renyuanguanli_zhiduiganbu_zhiwutianjia" component={renyuanguanli_zhiduiganbu_zhiwutianjia} />
                                <Route path="/renyuanguanli_zhiduiganbu_zuzhijigoutianjia" component={renyuanguanli_zhiduiganbu_zuzhijigoutianjia} />

                                <Route path="/xitongsheding_admin_yingquguanli" component={xitongsheding_admin_yingquguanli} />
                                <Route path="/daibanshixiang_zhiduiganbu_daibanshixiang" component={daibanshixiang_zhiduiganbu_daibanshixiang} />
                                <Route path="/yingquguanlixin_zhiduilingdao_shicaikucunjilu" component={yingquguanlixin_zhiduilingdao_shicaikucunjilu} />
                                <Route path="/yingquguanlixin_zhiduilingdao_shicaixiaohaojilu" component={yingquguanlixin_zhiduilingdao_shicaixiaohaojilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_yichangtuogangjilu" component={yingquguanlixin_zhiduiganbu_yichangtuogangjilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_gongyongchelishijilu" component={yingquguanlixin_zhiduiganbu_gongyongchelishijilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_gongyongchexingcheguiji" component={yingquguanlixin_zhiduiganbu_gongyongchexingcheguiji} />
                                <Route path="/yingquguanlixin_zhiduiganbu_zhibanlishijilu" component={yingquguanlixin_zhiduiganbu_zhibanlishijilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_qingjialishijilu" component={yingquguanlixin_zhiduiganbu_qingjialishijilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_baoguanguishiyongjilu" component={yingquguanlixin_zhiduiganbu_baoguanguishiyongjilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_ruqinjinggaolishijilu" component={yingquguanlixin_zhiduiganbu_ruqinjinggaolishijilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_shoujituogangjilu" component={yingquguanlixin_zhiduiganbu_shoujituogangjilu} />
                                <Route path="/renyuanguanli_zhiduiganbu_shuiyuanshezhi" component={renyuanguanli_zhiduiganbu_shuiyuanshezhi} />


                                {/*二期菜单*/}
                                <Route path="/yingquguanlixin_zhidui_fangjianchakan" component={yingquguanlixin_zhidui_fangjianchakan} />
                                <Route path="/yingquguanlixin_zhidui_fangjianshiyongjilu" component={yingquguanlixin_zhidui_fangjianshiyongjilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_yaopinrukuguanli" component={yingquguanlixin_zhiduiganbu_yaopinrukuguanli}/>
                                <Route path="/yingquguanlixin_zhiduiganbu_yaopinshiyongguanli" component={yingquguanlixin_zhiduiganbu_yaopinshiyongguanli}/>
                                <Route path="/yingquguanlixin_zhiduiganbu_yaopinpandianguanli" component={yingquguanlixin_zhiduiganbu_yaopinpandianguanli} />
                                <Route path="/yingquguanlixin_zhiduiganbu_guoqiyaopinchakan" component={yingquguanlixin_zhiduiganbu_guoqiyaopinchakan} />
                                <Route path="/yingquguanlixin_zhiduiganbu_yaopinkucunguanli" component={yingquguanlixin_zhiduiganbu_yaopinkucunguanli}/>
                                <Route path="/yingquguanlixin_zhiduiganbu_daojushiyongjilu" component={yingquguanlixin_zhiduiganbu_daojushiyongjilu}/>
                                <Route path="/yingquguanlixin_zhiduiganbu_shicairukujilu" component={yingquguanlixin_zhiduiganbu_shicairukujilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_kucungaojingjilu" component={yingquguanlixin_zhiduiganbu_kucungaojingjilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_jiaogangjilu" component={yingquguanlixin_zhiduiganbu_jiaogangjilu}/>
                                <Route path="/yingquguanlixin_zhiduiganbu_quegangjilu" component={yingquguanlixin_zhiduiganbu_quegangjilu}/>
                                <Route path="/yingquguanlixin_zhiduiganbu_gongyongchehuanchejilu" component={yingquguanlixin_zhiduiganbu_gongyongchehuanchejilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_renyuanchurujilu" component={yingquguanlixin_zhiduiganbu_renyuanchurujilu} />
                                <Route path="/yingquguanlixin_zhiduiganbu_cheliangchurujilu" component={yingquguanlixin_zhiduiganbu_cheliangchurujilu}/>
                                <Route path="/yingquguanlixin_zhiduiganbu_xiaojialishijilu" component={yingquguanlixin_zhiduiganbu_xiaojialishijilu}/>
                                <Route path="/renyuanguanli_zhiduiganbu_nianxiutianshuguanli" component={renyuanguanli_zhiduiganbu_nianxiutianshuguanli} />
                                <Route path="/xitongsheding_admin_shicaiguanli" component={xitongsheding_admin_shicaiguanli}/>
                                <Route path="/xitongsheding_admin_caipinleixingguanli" component={xitongsheding_admin_caipinleixingguanli}/>
                                <Route path="/xitongsheding_admin_shicaileixingguanli" component={xitongsheding_admin_shicaileixingguanli}/>

                                {/*引入中队功能*/}
                                <Route path="/renyuanguanli_zhongduiguanliyuan_renyuanguanli" component={renyuanguanli_zhongduiguanliyuan_renyuanguanli} />
                                <Route path="/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang" component={yingquguanlixin_zhishiguanliyuan_zhishiwenzhang}/>
                                <Route path="/renyuanguanli_zhongduiganbu_bumenguanli" component={renyuanguanli_zhongduiganbu_bumenguanli}/>
                                <Route path="/renyuanguanli_zhongduiganbu_nianxiutianshuguanli" component={renyuanguanli_zhongduiganbu_nianxiutianshuguanli}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_fangjianshenqing" component={yingquguanlixin_xiaofangyuan_fangjianshenqing} />
                                <Route path="/yingquguanlixin_xiaofangyuan_fangjianshiyongjilu" component={yingquguanlixin_xiaofangyuan_fangjianshiyongjilu} />
                                <Route path="/yingquguanlixin_xiaofangyuan_jiedaishidasaojilu" component={yingquguanlixin_xiaofangyuan_jiedaishidasaojilu}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_jiedaishishenqing" component={yingquguanlixin_xiaofangyuan_jiedaishishenqing}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_jiedaishishiyongjilu" component={yingquguanlixin_xiaofangyuan_jiedaishishiyongjilu}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_zhouhoupingcai" component={yingquguanlixin_xiaofangyuan_zhouhoupingcai} />
                                <Route path="/yingquguanlixin_xiaofangyuan_dazhongdianping" component={yingquguanlixin_xiaofangyuan_dazhongdianping} />
                                <Route path="/yingquguanlixin_zhongduiganbu_dazhongdianping" component={yingquguanlixin_zhongduiganbu_dazhongdianping} />
                                <Route path="/yingquguanlixin_xiaofangyuan_chayuezhishiwenzhang" component={yingquguanlixin_xiaofangyuan_chayuezhishiwenzhang}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_fangjianchakan" component={yingquguanlixin_zhongduiganbu_fangjianchakan}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_fangjianshiyongjilu" component={yingquguanlixin_zhongduiganbu_fangjianshiyongjilu}/>
                                <Route path="/yingquguanlixin_yiwurenyuan_yaopinrukuguanli" component={yingquguanlixin_yiwurenyuan_yaopinrukuguanli}/>
                                <Route path="/yingquguanlixin_yiwurenyuan_yaopinshiyongguanli" component={yingquguanlixin_yiwurenyuan_yaopinshiyongguanli}/>
                                <Route path="/yingquguanlixin_yiwurenyuan_yaopinpandianguanli" component={yingquguanlixin_yiwurenyuan_yaopinpandianguanli}/>
                                <Route path="/yingquguanlixin_yiwurenyuan_guoqiyaopinchakan" component={yingquguanlixin_yiwurenyuan_guoqiyaopinchakan}/>
                                <Route path="/yingquguanlixin_yiwurenyuan_yaopinkucunguanli" component={yingquguanlixin_yiwurenyuan_yaopinkucunguanli}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_yaopinrukuguanli" component={yingquguanlixin_zhongduiganbu_yaopinrukuguanli}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_yaopinshiyongguanli" component={yingquguanlixin_zhongduiganbu_yaopinshiyongguanli}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_yaopinkucunguanli" component={yingquguanlixin_zhongduiganbu_yaopinkucunguanli}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_yaopinpandianguanli" component={yingquguanlixin_zhongduiganbu_yaopinpandianguanli}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_jiedaishishiyongjilu" component={yingquguanlixin_zhongduiganbu_jiedaishishiyongjilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_jiedaishidasaojilu" component={yingquguanlixin_zhongduiganbu_jiedaishidasaojilu}/>
                                <Route path="/yingquguanlixin_houchurenyuan_houxuancaipujilu" component={yingquguanlixin_houchurenyuan_houxuancaipujilu}/>
                                <Route path="/yingquguanlixin_houchurenyuan_caipulishijilu" component={yingquguanlixin_houchurenyuan_caipulishijilu}/>
                                <Route path="/yingquguanlixin_houchurenyuan_meizhouxuancaitongji" component={yingquguanlixin_houchurenyuan_meizhouxuancaitongji}/>
                                <Route path="/yingquguanlixin_houchurenyuan_caipindianping" component={yingquguanlixin_houchurenyuan_caipindianping}/>
                                <Route path="/yingquguanlixin_houchurenyuan_liufanshenqingjilu" component={yingquguanlixin_houchurenyuan_liufanshenqingjilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_kaoqinjiguanli" component={yingquguanlixin_zhongduiganbu_kaoqinjiguanli}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_kaoqinjibaimingdan" component={yingquguanlixin_zhongduiganbu_kaoqinjibaimingdan}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_kaoqinjilu" component={yingquguanlixin_zhongduiganbu_kaoqinjilu}/>
                                <Route path="/yingquguanlixin_houchurenyuan_kucungaojingjilu" component={yingquguanlixin_houchurenyuan_kucungaojingjilu}/>
                                <Route path="/yingquguanlixin_houchurenyuan_caipinguanli" component={yingquguanlixin_houchurenyuan_caipinguanli}/>
                                <Route path="/yingquguanlixin_houchurenyuan_xiaodujilu" component={yingquguanlixin_houchurenyuan_xiaodujilu}/>
                                <Route path="/yingquguanlixin_houchurenyuan_shicairukujilu" component={yingquguanlixin_houchurenyuan_shicairukujilu}/>
                                <Route path="/yingquguanlixin_houchurenyuan_shicaikucunjilu" component={yingquguanlixin_houchurenyuan_shicaikucunjilu}/>
                                <Route path="/yingquguanlixin_houchurenyuan_shicaixiaohaojilu" component={yingquguanlixin_houchurenyuan_shicaixiaohaojilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_shicaixiaohaojilu" component={yingquguanlixin_zhongduiganbu_shicaixiaohaojilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_shicaikucunjilu" component={yingquguanlixin_zhongduiganbu_shicaikucunjilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_shicairukujilu" component={yingquguanlixin_zhongduiganbu_shicairukujilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_daojushiyongjilu" component={yingquguanlixin_zhongduiganbu_daojushiyongjilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_xiaodujilu" component={yingquguanlixin_zhongduiganbu_xiaodujilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_caipujilu" component={yingquguanlixin_zhongduiganbu_caipujilu}/>
                                <Route path="/yingquguanlixin_zuzhiyuangong_caipujilu" component={yingquguanlixin_zuzhiyuangong_caipujilu}/>
                                <Route path="/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu" component={yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu}/>
                                <Route path="/yingquguanlixin_cheliangguanliyuan_yongchelishijilu" component={yingquguanlixin_cheliangguanliyuan_yongchelishijilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_gongyongcheguiji" component={yingquguanlixin_zhongduiganbu_gongyongcheguiji}/>
                                <Route path="/yingquguanlixin_banzhang_zhibanlishijilu" component={yingquguanlixin_banzhang_zhibanlishijilu}/>
                                <Route path="/yingquguanlixin_banzhang_yichangtuogangjilu" component={yingquguanlixin_banzhang_yichangtuogangjilu}/>
                                <Route path="/yingquguanlixin_banzhang_qingjialishijilu" component={yingquguanlixin_banzhang_qingjialishijilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_zhibanlishijilu" component={yingquguanlixin_zhongduiganbu_zhibanlishijilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_yichangtuogangjilu" component={yingquguanlixin_zhongduiganbu_yichangtuogangjilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_quexijilu" component={yingquguanlixin_zhongduiganbu_quexijilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_qingjialishijilu" component={yingquguanlixin_zhongduiganbu_qingjialishijilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_gongyongchelishijilu" component={yingquguanlixin_zhongduiganbu_gongyongchelishijilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_gongyongchehuanchejilu" component={yingquguanlixin_zhongduiganbu_gongyongchehuanchejilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_cheliangbaimingdan" component={yingquguanlixin_zhongduiganbu_cheliangbaimingdan}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_cheliangchurujilu" component={yingquguanlixin_zhongduiganbu_cheliangchurujilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_renyuanchurujilu" component={yingquguanlixin_zhongduiganbu_renyuanchurujilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_renyuanbaimingdan" component={yingquguanlixin_zhongduiganbu_renyuanbaimingdan}/>
                                <Route path="/yingquguanlixin_banzhang_ruqinjinggaolishijilu" component={yingquguanlixin_banzhang_ruqinjinggaolishijilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_fangkejilu" component={yingquguanlixin_zhongduiganbu_fangkejilu}/>
                                <Route path="/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang" component={yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang}/>
                                <Route path="/yingquguanlixin_fangjianguanliyuan_daidasaojiedaishi" component={yingquguanlixin_fangjianguanliyuan_daidasaojiedaishi}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_zhibanlishijilu" component={yingquguanlixin_xiaofangyuan_zhibanlishijilu}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_yichangtuogangjilu" component={yingquguanlixin_xiaofangyuan_yichangtuogangjilu}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_quexijilu" component={yingquguanlixin_xiaofangyuan_quexijilu}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_jiaogangjilu" component={yingquguanlixin_xiaofangyuan_jiaogangjilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_ruqinjinggaolishijilu" component={yingquguanlixin_zhongduiganbu_ruqinjinggaolishijilu}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_qingjialishijilu" component={yingquguanlixin_xiaofangyuan_qingjialishijilu}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_renlianshibieyichakan" component={yingquguanlixin_yingquguanliyuan_renlianshibieyichakan}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_renlianshibiebaimingdan" component={yingquguanlixin_yingquguanliyuan_renlianshibiebaimingdan}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_chepaishibieyichakan" component={yingquguanlixin_yingquguanliyuan_chepaishibieyichakan}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_zhinengchengguanli" component={yingquguanlixin_yingquguanliyuan_zhinengchengguanli}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanli" component={yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanli}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanli" component={yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanli}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_baoguanguiguanli" component={yingquguanlixin_yingquguanliyuan_baoguanguiguanli}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_zhinengjiajushebeitongbu" component={yingquguanlixin_yingquguanliyuan_zhinengjiajushebeitongbu}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanli" component={yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanli}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_shoujituogangjilu" component={yingquguanlixin_zhongduiganbu_shoujituogangjilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_chushipingjia" component={yingquguanlixin_zhongduiganbu_chushipingjia}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_shicairukushexiangjiguanli" component={yingquguanlixin_yingquguanliyuan_shicairukushexiangjiguanli}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_chapushezhi" component={yingquguanlixin_zhongduiganbu_chapushezhi}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_chaputianjia" component={yingquguanlixin_zhongduiganbu_chaputianjia}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_chaputongji" component={yingquguanlixin_zhongduiganbu_chaputongji}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_xungengshezhi" component={yingquguanlixin_zhongduiganbu_xungengshezhi}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_xungengtianjia" component={yingquguanlixin_zhongduiganbu_xungengtianjia}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_xungengtongji" component={yingquguanlixin_zhongduiganbu_xungengtongji}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_chashaotongji" component={yingquguanlixin_zhongduiganbu_chashaotongji}/>


                                <Route path="/yingquguanlixin_zuzhiyuangong_gongyongchelishijilu" component={yingquguanlixin_zuzhiyuangong_gongyongchelishijilu}/>
                                <Route path="/yingquguanlixin_zhibanguanliyuan_yichangtuogangjilu" component={yingquguanlixin_zhibanguanliyuan_yichangtuogangjilu}/>
                                <Route path="/yingquguanlixin_zhibanguanliyuan_zhibanlishijilu" component={yingquguanlixin_zhibanguanliyuan_zhibanlishijilu}/>
                                <Route path="/yingquguanlixin_zhibanguanliyuan_quexijilu" component={yingquguanlixin_zhibanguanliyuan_quexijilu}/>


                                <Route path="/yingquguanlixin_zuzhi_fangjianchakan" component={yingquguanlixin_zuzhi_fangjianchakan}/>
                                <Route path="/yingquguanlixin_houchurenyuan_caigouguanli" component={yingquguanlixin_houchurenyuan_caigouguanli}/>
                                <Route path="/yingquguanlixin_shitangguanliyuan_chushipingjia" component={yingquguanlixin_shitangguanliyuan_chushipingjia}/>
                                <Route path="/yingquguanlixin_shitangguanliyuan_daojushiyongjilu" component={yingquguanlixin_shitangguanliyuan_daojushiyongjilu}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_xiaojialishijilu" component={yingquguanlixin_xiaofangyuan_xiaojialishijilu}/>
                                <Route path="/yingquguanlixin_zuzhiyuangong_gongyongchehuanchejilu" component={yingquguanlixin_zuzhiyuangong_gongyongchehuanchejilu}/>
                                <Route path="/yingquguanlixin_cheliangguanliyuan_yongchehuanchejilu" component={yingquguanlixin_cheliangguanliyuan_yongchehuanchejilu}/>
                                <Route path="/yingquguanlixin_cheliangguanliyuan_gongyongchexingcheguiji" component={yingquguanlixin_cheliangguanliyuan_gongyongchexingcheguiji}/>
                                <Route path="/yingquguanlixin_fangjianguanliyuan_fangjianshiyongjilu" component={yingquguanlixin_fangjianguanliyuan_fangjianshiyongjilu}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_chepaishibieyibaimingdan" component={yingquguanlixin_yingquguanliyuan_chepaishibieyibaimingdan}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_wangguanguanli" component={yingquguanlixin_yingquguanliyuan_wangguanguanli}/>
                                <Route path="/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi" component={yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_xiaojialishijilu" component={yingquguanlixin_zhongduiganbu_xiaojialishijilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_jiaogangjilu" component={yingquguanlixin_zhongduiganbu_jiaogangjilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_kucungaojingjilu" component={yingquguanlixin_zhongduiganbu_kucungaojingjilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_guoqiyaopinchakan" component={yingquguanlixin_zhongduiganbu_guoqiyaopinchakan}/>
                                <Route path="/yingquguanlixin_zuzhiguanliyuan_qingjiajiluchakan" component={yingquguanlixin_zuzhiguanliyuan_qingjiajiluchakan}/>
                                <Route path="/yingquguanlixin_zuzhiguanliyuan_paibanshijianshezhi" component={yingquguanlixin_zuzhiguanliyuan_paibanshijianshezhi}/>

                                <Route path="/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai" component={yingquguanlixin_zuzhiguanliyuan_gongzuoanpai}/>

                                <Route path="/yingquguanlixin_zhibanguanliyuan_yaoshirijijilu" component={yingquguanlixin_zhibanguanliyuan_yaoshirijijilu}/>

                                {/*引入admin功能*/}
                                <Route path="/xitongsheding_admin_wuzileibieshezhi" component={xitongsheding_admin_wuzileibieshezhi}/>
                                <Route path="/xitongsheding_admin_wuzileibietianjia" component={xitongsheding_admin_wuzileibietianjia}/>
                                <Route path="/xitongsheding_admin_wuzileixingshezhi" component={xitongsheding_admin_wuzileixingshezhi}/>
                                <Route path="/xitongsheding_admin_wuzileixingtianjia" component={xitongsheding_admin_wuzileixingtianjia}/>
                                <Route path="/xitongsheding_admin_xiaofangcheleixingshezhi" component={xitongsheding_admin_xiaofangcheleixingshezhi}/>
                                <Route path="/xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli" component={xitongsheding_zhiduiguanliyuan_yinhuanleixingguanli}/>
                                <Route path="/xitongsheding_admin_xiaofangcheleixingtianjia" component={xitongsheding_admin_xiaofangcheleixingtianjia}/>
                                <Route path="/xitongsheding_admin_caipinguanli" component={xitongsheding_admin_caipinguanli}/>
                                <Route path="/xitongsheding_admin_yaopinguanli" component={xitongsheding_admin_yaopinguanli}/>

                                {/*装备管理*/}
                                <Route path="/zhuangbeiguanli_zhiduirenyuan_zhuangbeitongji" component={zhuangbeiguanli_zhiduirenyuan_zhuangbeitongji}/>
                                {/*消防调度*/}
                                <Route path="/qicai_houqinchuzhang_dituyingyong" component={qicai_houqinchuzhang_dituyingyong}/>
                                <Route path="/qicai_zhiduiganbu_chujingjilu" component={qicai_zhiduiganbu_chujingjilu}/>
                                <Route path="/qicai_zhiduiganbu_chujingxinxi" component={qicai_zhiduiganbu_chujingxinxi}/>
                                <Route path="/shuju_zhongdui_zhongdiandanweiguanli" component={shuju_zhongdui_zhongdiandanweiguanli}/>
                                <Route path="/shuju_zhongdui_shuxijiluguanli" component={shuju_zhongdui_shuxijiluguanli}/>
                                <Route path="/shuju_zhongdui_yanlianjiluguanli" component={shuju_zhongdui_yanlianjiluguanli}/>

                                <Route path="/zhoupeidangtimeset" component={zhoupeidangTimeSet} />
                                <Route path="/zhoupeidanglist" component={zhoupeidanglist} />
                                <Route path="/zhoupeidangadd" component={zhoupeidangadd} />
                                <Route path="/duirongfengjilist" component={duirongfengjiList} />
                                <Route path="/neiwuweishenglist" component={neiwuweishengList} />
                                <Route path="/list/zhuangbeiguanli_zhongduirenyuan_zhuangbeixiangqing/:id/" component={yunsousuoChildlist} />
                                <Route path="/list/wenzhangxiangqing/:id/" component={yunsousuoxiangqing} />
                                <Route path="/list/addwenzhang/:id" component={addwenzhang} />
                                <Route
                                  path="/list/editwenzhang/:id/:bianhao"
                                  component={editwenzhang}
                                />
                                <Route path="/list" component={yunsousuolist} />
                            {/* e考核 */}
							<Route path="/xitongsheding_admin_zaixianxuexi" component={xitongsheding_admin_zaixianxuexi} />
							<Route path="/xitongsheding_admin_kaoshiguanli" component={xitongsheding_admin_kaoshiguanli} />
                            <Route path="/daiwanshan" component={daiwanshan} />

                                <Redirect to={this.state.redirest} />
                            </Switch>
                        </div>
                    </Content>

                </Layout>
            </Layout>
        );
    }
}

//export default withRouter(App);

ReactDOM.render(
    <HashRouter >
        <LocaleProvider locale={zh_CN}>
            <App />
        </LocaleProvider>
    </HashRouter>, document.getElementById('root')
);
