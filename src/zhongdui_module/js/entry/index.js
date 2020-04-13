import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Route ,Switch ,Redirect} from 'react-router-dom';
import { LocaleProvider, Layout, Menu, Icon, Breadcrumb, Dropdown, Drawer, Button, Badge, Divider, Avatar } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import '../../less/common.less';
import Zzbreadcrumb from "../zzbreadcrumb.js";
import Zhgl from "../userInfo/zhgl.js";

//人员管理
import renyuanguanli_zhongduiganbu_bumenguanli from '../renyuanguanli/xitonghoutai/renyuanguanli_zhongduiganbu_bumenguanli.js';
import renyuanguanli_zhongduiguanliyuan_renyuanguanli from '../renyuanguanli/renyuanguanli/renyuanguanli_zhongduiguanliyuan_renyuanguanli.js';
import renyuanguanli_zhongduiganbu_nianxiutianshuguanli from '../renyuanguanli/renyuanguanli/renyuanguanli_zhongduiganbu_nianxiutianshuguanli.js';
import yingquguanlixin_zhishiguanliyuan_zhishiwenzhang from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang.js';
//其他按钮相关
import daibanshixiang_zhongduiganbu_daibanshixiang from '../daibanshixiang/daibanshixiang_zhongduiganbu_daibanshixiang.js';
import shiyongshuoming
    from "../../../xitong_module/js/userInfo/shiyongshuoming";
//新营区管理
import yingquguanlixin_xiaofangyuan_fangjianshenqing from '../xinyingquguanli/zhihuikushi/yingquguanlixin_xiaofangyuan_fangjianshenqing.js';
import yingquguanlixin_xiaofangyuan_fangjianshiyongjilu from '../xinyingquguanli/zhihuikushi/yingquguanlixin_xiaofangyuan_fangjianshiyongjilu.js';
import yingquguanlixin_xiaofangyuan_jiedaishidasaojilu  from '../xinyingquguanli/zhihuikushi/yingquguanlixin_xiaofangyuan_jiedaishidasaojilu.js';
import yingquguanlixin_xiaofangyuan_jiedaishishenqing from '../xinyingquguanli/zhihuikushi/yingquguanlixin_xiaofangyuan_jiedaishishenqing.js';
import yingquguanlixin_xiaofangyuan_jiedaishishiyongjilu from '../xinyingquguanli/zhihuikushi/yingquguanlixin_xiaofangyuan_jiedaishishiyongjilu.js';
import yingquguanlixin_xiaofangyuan_zhouhoupingcai from '../xinyingquguanli/zhihuishitang/yingquguanlixin_xiaofangyuan_zhouhoupingcai.js';
import yingquguanlixin_xiaofangyuan_dazhongdianping from '../xinyingquguanli/zhihuishitang/yingquguanlixin_xiaofangyuan_dazhongdianping.js';
import yingquguanlixin_zhongduiganbu_dazhongdianping from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_dazhongdianping.js';
import yingquguanlixin_xiaofangyuan_chayuezhishiwenzhang from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_chayuezhishiwenzhang.js';
import yingquguanlixin_zuzhiguanliyuan_paibanshijianshezhi from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zuzhiguanliyuan_paibanshijianshezhi.js';

import yingquguanlixin_zhongduiganbu_fangjianchakan from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_fangjianchakan.js';
import yingquguanlixin_zhongduiganbu_fangjianshiyongjilu from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_fangjianshiyongjilu.js';
import yingquguanlixin_yiwurenyuan_yaopinrukuguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_yiwurenyuan_yaopinrukuguanli.js';
import yingquguanlixin_yiwurenyuan_yaopinshiyongguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_yiwurenyuan_yaopinshiyongguanli.js';
import yingquguanlixin_yiwurenyuan_yaopinpandianguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_yiwurenyuan_yaopinpandianguanli.js';
import yingquguanlixin_yiwurenyuan_guoqiyaopinchakan from '../xinyingquguanli/zhihuikushi/yingquguanlixin_yiwurenyuan_guoqiyaopinchakan.js';
import yingquguanlixin_yiwurenyuan_yaopinkucunguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_yiwurenyuan_yaopinkucunguanli.js';
import yingquguanlixin_zhongduiganbu_yaopinrukuguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_yaopinrukuguanli.js';
import yingquguanlixin_zhongduiganbu_yaopinshiyongguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_yaopinshiyongguanli.js';
import yingquguanlixin_zhongduiganbu_yaopinkucunguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_yaopinkucunguanli.js';
import yingquguanlixin_zhongduiganbu_yaopinpandianguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_yaopinpandianguanli.js';
import yingquguanlixin_zhongduiganbu_jiedaishishiyongjilu from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_jiedaishishiyongjilu.js';
import yingquguanlixin_zhongduiganbu_jiedaishidasaojilu from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_jiedaishidasaojilu.js';
import yingquguanlixin_houchurenyuan_houxuancaipujilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_houxuancaipujilu.js';
import yingquguanlixin_houchurenyuan_caipulishijilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_caipulishijilu.js';
import yingquguanlixin_houchurenyuan_meizhouxuancaitongji from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_meizhouxuancaitongji.js';
import yingquguanlixin_houchurenyuan_caipindianping from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_caipindianping.js';
import yingquguanlixin_houchurenyuan_liufanshenqingjilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_liufanshenqingjilu.js';
import yingquguanlixin_zhongduiganbu_kaoqinjiguanli from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_kaoqinjiguanli.js';
import yingquguanlixin_zhongduiganbu_kaoqinjibaimingdan from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_kaoqinjibaimingdan.js';
import yingquguanlixin_zhongduiganbu_kaoqinjilu from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_kaoqinjilu.js';
import yingquguanlixin_houchurenyuan_caipinguanli from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_caipinguanli.js';
import yingquguanlixin_houchurenyuan_xiaodujilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_xiaodujilu.js';
import yingquguanlixin_houchurenyuan_kucungaojingjilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_kucungaojingjilu.js';
import yingquguanlixin_houchurenyuan_shicairukujilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_shicairukujilu.js';
import yingquguanlixin_houchurenyuan_shicaikucunjilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_shicaikucunjilu.js';
import yingquguanlixin_houchurenyuan_shicaixiaohaojilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_shicaixiaohaojilu.js';
import yingquguanlixin_zhongduiganbu_shicaixiaohaojilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_shicaixiaohaojilu.js';
import yingquguanlixin_zhongduiganbu_shicaikucunjilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_shicaikucunjilu.js';
import yingquguanlixin_zhongduiganbu_shicairukujilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_shicairukujilu.js';
import yingquguanlixin_zhongduiganbu_daojushiyongjilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_daojushiyongjilu.js';
import yingquguanlixin_zhongduiganbu_xiaodujilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_xiaodujilu.js';
import yingquguanlixin_zhongduiganbu_caipujilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_caipujilu.js';
import yingquguanlixin_zuzhiyuangong_caipujilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zuzhiyuangong_caipujilu.js';
import yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu.js';
import yingquguanlixin_cheliangguanliyuan_yongchelishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_cheliangguanliyuan_yongchelishijilu.js';
import yingquguanlixin_zhongduiganbu_gongyongcheguiji from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_gongyongcheguiji.js';
import yingquguanlixin_banzhang_zhibanlishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_banzhang_zhibanlishijilu.js';
import yingquguanlixin_banzhang_yichangtuogangjilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_banzhang_yichangtuogangjilu.js';
import yingquguanlixin_banzhang_qingjialishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_banzhang_qingjialishijilu.js';
import yingquguanlixin_zhongduiganbu_zhibanlishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_zhibanlishijilu.js';
import yingquguanlixin_zhongduiganbu_yichangtuogangjilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_yichangtuogangjilu.js';
import yingquguanlixin_zhongduiganbu_quexijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_quexijilu.js';
import yingquguanlixin_zhongduiganbu_qingjialishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_qingjialishijilu.js';
import yingquguanlixin_zhongduiganbu_gongyongchelishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_gongyongchelishijilu.js';
import yingquguanlixin_zhongduiganbu_gongyongchehuanchejilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_gongyongchehuanchejilu.js';
import yingquguanlixin_zhongduiganbu_cheliangbaimingdan from '../xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_cheliangbaimingdan.js';
import yingquguanlixin_zhongduiganbu_cheliangchurujilu from '../xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_cheliangchurujilu.js';
import yingquguanlixin_zhongduiganbu_renyuanchurujilu from '../xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_renyuanchurujilu.js';
import yingquguanlixin_zhongduiganbu_renyuanbaimingdan from '../xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_renyuanbaimingdan.js';
import yingquguanlixin_banzhang_ruqinjinggaolishijilu from '../xinyingquguanli/zongheanfang/yingquguanlixin_banzhang_ruqinjinggaolishijilu.js';
import yingquguanlixin_zhongduiganbu_fangkejilu from '../xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_fangkejilu.js';
import yingquguanlixin_fangjianguanliyuan_daidasaojiedaishi from '../xinyingquguanli/zhihuikushi/yingquguanlixin_fangjianguanliyuan_daidasaojiedaishi.js';
import yingquguanlixin_xiaofangyuan_zhibanlishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_zhibanlishijilu.js';
import yingquguanlixin_xiaofangyuan_yichangtuogangjilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_yichangtuogangjilu.js';
import yingquguanlixin_xiaofangyuan_quexijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_quexijilu.js';
import yingquguanlixin_xiaofangyuan_jiaogangjilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_jiaogangjilu.js';
import yingquguanlixin_zhongduiganbu_ruqinjinggaolishijilu from '../xinyingquguanli/zongheanfang/yingquguanlixin_zhongduiganbu_ruqinjinggaolishijilu.js';
import yingquguanlixin_xiaofangyuan_qingjialishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_qingjialishijilu.js';
import yingquguanlixin_yingquguanliyuan_renlianshibieyichakan from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibieyichakan.js';
import yingquguanlixin_yingquguanliyuan_renlianshibiebaimingdan from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_renlianshibiebaimingdan.js';
import yingquguanlixin_yingquguanliyuan_chepaishibieyichakan from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_chepaishibieyichakan.js';
import yingquguanlixin_yingquguanliyuan_zhinengchengguanli from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhinengchengguanli.js';
import yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanli from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_aizhinengshexiangjiguanli.js';
import yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanli from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhoujieshexiangjiguanli.js';
import yingquguanlixin_yingquguanliyuan_baoguanguiguanli from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_baoguanguiguanli.js';
import yingquguanlixin_yingquguanliyuan_zhinengjiajushebeitongbu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_zhinengjiajushebeitongbu.js';
import yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanli from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_yingpanluxiangjiguanli.js';
import yingquguanlixin_zhongduiganbu_shoujituogangjilu from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_shoujituogangjilu.js';
import yingquguanlixin_zhongduiganbu_chushipingjia from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_chushipingjia.js';
import yingquguanlixin_yingquguanliyuan_shicairukushexiangjiguanli from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_yingquguanliyuan_shicairukushexiangjiguanli.js';
import yingquguanlixin_zhongduiganbu_chapushezhi from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_chapushezhi.js';
import yingquguanlixin_zhongduiganbu_chaputianjia from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_chaputianjia.js';
import yingquguanlixin_zhongduiganbu_chaputongji from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_chaputongji.js';
import yingquguanlixin_zhongduiganbu_xungengshezhi from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_xungengshezhi.js';
import yingquguanlixin_zhongduiganbu_xungengtianjia from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_xungengtianjia.js';
import yingquguanlixin_zhongduiganbu_xungengtongji from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_xungengtongji.js';
import yingquguanlixin_zhongduiganbu_chashaotongji from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_chashaotongji.js';
import yingquguanlixin_zuzhiguanliyuan_gongzuoanpai from '../xinyingquguanli/zongheanfang/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai.js';
import yingquguanlixin_zuzhiguanliyuan_qingjiajiluchakan from "../renyuanguanli/renyuanguanli/yingquguanlixin_zuzhiguanliyuan_qingjiajiluchakan";


//中队114新菜单
import yingquguanlixin_zuzhiyuangong_gongyongchelishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zuzhiyuangong_gongyongchelishijilu.js';
import yingquguanlixin_zhibanguanliyuan_yichangtuogangjilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhibanguanliyuan_yichangtuogangjilu.js';
import yingquguanlixin_zhibanguanliyuan_zhibanlishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhibanguanliyuan_zhibanlishijilu.js';
import yingquguanlixin_zhibanguanliyuan_quexijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhibanguanliyuan_quexijilu.js';
import yingquguanlixin_zuzhi_fangjianchakan from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zuzhi_fangjianchakan.js';
import yingquguanlixin_zhongduiganbu_guoqiyaopinchakan from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhongduiganbu_guoqiyaopinchakan.js';
import yingquguanlixin_houchurenyuan_caigouguanli from '../xinyingquguanli/zhihuishitang/yingquguanlixin_houchurenyuan_caigouguanli.js';
import yingquguanlixin_shitangguanliyuan_chushipingjia from '../xinyingquguanli/zhihuishitang/yingquguanlixin_shitangguanliyuan_chushipingjia.js';
import yingquguanlixin_shitangguanliyuan_daojushiyongjilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_shitangguanliyuan_daojushiyongjilu.js';
import yingquguanlixin_zhongduiganbu_jiaogangjilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_jiaogangjilu.js';
import yingquguanlixin_xiaofangyuan_xiaojialishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_xiaofangyuan_xiaojialishijilu.js';
import yingquguanlixin_zhongduiganbu_xiaojialishijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhongduiganbu_xiaojialishijilu.js';
import yingquguanlixin_zuzhiyuangong_gongyongchehuanchejilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zuzhiyuangong_gongyongchehuanchejilu.js';
import yingquguanlixin_cheliangguanliyuan_yongchehuanchejilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_cheliangguanliyuan_yongchehuanchejilu.js';
import yingquguanlixin_cheliangguanliyuan_gongyongchexingcheguiji from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_cheliangguanliyuan_gongyongchexingcheguiji.js';
import yingquguanlixin_fangjianguanliyuan_fangjianshiyongjilu from '../xinyingquguanli/zhihuikushi/yingquguanlixin_fangjianguanliyuan_fangjianshiyongjilu.js';
import yingquguanlixin_yingquguanliyuan_chepaishibieyibaimingdan from '../xinyingquguanli/zongheanfang/yingquguanlixin_yingquguanliyuan_chepaishibieyibaimingdan.js';
import yingquguanlixin_yingquguanliyuan_wangguanguanli from '../xinyingquguanli/zongheanfang/yingquguanlixin_yingquguanliyuan_wangguanguanli.js';
import yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi from '../xinyingquguanli/zhihuikushi/yingquguanlixin_zhineng_shoujituogangjilu.js';
import yingquguanlixin_zhongduiganbu_kucungaojingjilu from '../xinyingquguanli/zhihuishitang/yingquguanlixin_zhongduiganbu_kucungaojingjilu.js';
//要事日记
import yingquguanlixin_zhibanguanliyuan_yaoshirijijilu from '../xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhibanguanliyuan_yaoshirijijilu.js';

//装备管理
import zhuangbeiguanli_zhongduirenyuan_zhuangbeitongji from '../zhuangbeiguanli/zhuangbeiguanli/zhuangbeiguanli_zhongduirenyuan_zhuangbeitongji.js';
import zhuangbeiguanli_zhongduirenyuan_cangkuguanli from '../zhuangbeiguanli/cangkugunali/zhuangbeigunali_zhongduirenyuan_cangkuguanli.js';
import zhuangbeigunali_zhongduirenyuan_zhuangbeichaxun from '../zhuangbeiguanli/zhuangbeiguanli/zhuangbeigunali_zhongduirenyuan_zhuangbeichaxun.js';
import zhuangbeiguanli_zhongduirenyuan_zhuangbeixinzengbaofeijilu from '../zhuangbeiguanli/zhuangbeiguanli/zhuangbeigunali_zhongduirenyuan_baofeijilu.js';
import zhuangbeiguanli_zhongduirenyuan_zhuangbeichurukujilu from '../zhuangbeiguanli/zhuangbeiguanli/zhuangbeigunali_zhongduirenyuan_churukujilu.js';
import zhuangbeiguanli_zhongduirenyuan_jiaojiebanjilu from '../zhuangbeiguanli/jiaojiebanj/zhuangbeiguanli_zhongduirenyuan_jiaojiebanjilu.js';

//消防调度
import zhuangbeiguanli_zhongduirenyuan_xiaofangcheguanli from '../xiaofangdiaodu/qicai_zhongduiganbu_xiaofangchechaxun.js';
import qicai_zhongduiganbu_dituyingyong from '../xiaofangdiaodu/qicai_zhongduiganbu_dituyingyong.js';
import qicai_zhongduiganbu_dianziweilan from '../xiaofangdiaodu/qicai_zhongduiganbu_dianziweilan.js';
import qicai_zhongduiganbu_chujingjilu from '../xiaofangdiaodu/qicai_zhongduiganbu_chujingjilu.js';

import renyuanguanli_zhiduiganbu_shuiyuanshezhi
    from "../../../zhidui_module/js/renyuanguanli/xitonghoutai/renyuanguanli_zhiduiganbu_shuiyuanshezhi";


import shuju_zhongdui_zhongdiandanweiguanli from '../xiaofangdiaodu/shuju_zhongdui_zhongdiandanweiguanli.js';


import shuju_zhongdui_shuxijiluguanli from '../xiaofangdiaodu/shuju_zhongdui_shuxijiluguanli.js';
import shuju_zhongdui_yanlianjiluguanli from '../xiaofangdiaodu/shuju_zhongdui_yanlianjiluguanli.js';
import tongjisun from '../../imgs/tongjisun.png';
import tongjiNavs from "../../imgs/tongjiNavs.jpg";
import tongjiNav from "../../imgs/tongjiNav.jpg";


import yunsousuolist from  '../../../common/yun_sou_suo/List'
import yunsousuoChildlist from  '../../../common/yun_sou_suo/ChildList'
import yunsousuoxiangqing from  '../../../common/yun_sou_suo/Xiangqing'
import addwenzhang from  '../../../common/yun_sou_suo/AddWenZhang'
import editwenzhang from '../../../common/yun_sou_suo/EditWenzhang'
import duirongfengjiList from '../../../common/dui_rong_feng_ji/List'
import neiwuweishengList from '../../../common/nei_wu_wei_sheng/List'

import zhoupeidanglist from '../../../common/周配档/List'
import zhoupeidangadd from '../../../common/周配档/Add'
import zhoupeidangTimeSet from '../../../common/周配档/TimeSet'

import yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang
    from "../../../zhidui_module/js/xinyingquguanli/zhihuiyingqu/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang";
import {message} from "antd/lib/index";
import daiwanshan from "../../../common/daiwanshan";

const { Header, Sider, Content, Footer } = Layout;
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
          clickindex: [],
          showcaidan: "block",
          showanniu: "none",
          showyijiku: "none",
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
            window.location.href = "zhongdui.html#/zhgl";
        }
        if(key == "2"){
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("ROLE");
            sessionStorage.removeItem("userInfo");
            sessionStorage.removeItem("jigoumingcheng");
            sessionStorage.removeItem("caidan");
            sessionStorage.removeItem("zhiwu");
            location.href = "login.html";
        }
        if(key == "3"){
            this.showkeshihua();
        }
    }

    showkeshihua = () => {
        let clientHeight = (document.documentElement.clientHeight + 180) +'px';
        let clientWidth = document.documentElement.clientWidth +'px';
        this.toFullscreen();
        layer.open({
            type: 2,
            title:['可视化图像','text-align:center'],
            area: [clientWidth, clientHeight],
            shadeClose: true,
            content: " ./common/html/keshihuatuxing.html",
            end: function () {
                document.webkitCancelFullScreen();
            }
        });
    }

    toFullscreen = () => {
        /*判断是否全屏*/
        var isFullscreen = document.fullScreenElement//W3C
            ||document.msFullscreenElement //IE
            ||document.mozFullScreenElement //火狐
            ||document.webkitFullscreenElement //谷歌
            ||false;
        if(!isFullscreen){
            var el = document.documentElement;
            if (el.requestFullscreen) {
                el.requestFullscreen();
            } else if (el.mozRequestFullScreen) {
                el.mozRequestFullScreen();
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
            } else if (el.msRequestFullscreen) {
                el.msRequestFullscreen();
            }
        }else{
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }


    //动态生成左边菜单
    getCaidan(val,chushi) {
        const THE = this;
        let caidan = JSON.parse(sessionStorage.getItem("caidan1"));
        let caidanKey = [];
        let caidans = [];
        let temparr = [];
        for(let i=0;i<caidan.length;i++){
            if(val === caidan[i].key){
                temparr.push(caidan[i])
            }
        }
        if(temparr.length === 0){
            alert('无信息');
        }
        if(chushi !== 'chushi'){
        this.setState({
            clickindex: [val]
        })
        }
        for (let i = 0; i < temparr[0].children.length; i++) {
            caidanKey.push(temparr[0].children[i].key);
        }
        let obj = {};
        obj.child = temparr[0].children;
        caidans.push(obj)
        if(caidans !== null && caidans !== ''){
            let redirest = caidans[0].child[0].children[0].url;
            THE.setState({
                redirest: redirest,
            });
        }
        // console.log(caidans,caidanKey)
        THE.setState({
            [val]: caidans,
            rootSubmenuKeys: caidanKey
        });
        let caidanjson = JSON.stringify(caidans);
        sessionStorage.setItem("caidan",caidanjson);
    }

    // getDaiban() {
    //     const THE = this;
    //     $.ajax({
    //         type:'GET',
    //         url: SERVER + "gerenfanghuDaibanLiebiao",
    //         success: function (data) {
    //             if (data.status != 0) {
    //                 message.warning(data.message);
    //                 return;
    //             }
    //             let count = data.data.length;
    //             sessionStorage.setItem("count",count);
    //         }
    //     });
    // }

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
          if(item.children && item.title !== "训练秩序"){
            return (
              <SubMenu key={item.key} title={<span><Icon type={item.tubiao}/><span>{item.title}</span></span>}>
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

    componentWillMount(){
        // let caidan = JSON.parse(sessionStorage.getItem("caidan1"));
        // for(let i=0;i<caidan.length;i++) {
        //     // this.setState({
        //     //     clickindex: [caidan[i].title],
        //     // })
        //     this.getCaidan(caidan[i].title,'chushi');
        //     break;
        // }
    }


    componentDidMount() {
        this.getCaidans();
        // this.timerID = setInterval(
        //     () => this.getDaiban(),
        //     60000
        // );
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

    toIndex(){
        window.location.href = `zhongdui_tongji.html#/tongji_zong`;
    }


    componentWillUnMount() {
        clearInterval(this.intervalId);
        clearInterval(this.timerID);

    }

    render() {
        let {year, month, day, week, hh, mm, ss} = this.state;
        const user_menu = (
            <Menu onClick={this.user_menu_dropdown_click}>
                <Menu.Item key="1">帐号管理</Menu.Item>
                {/*<Menu.Item key="3">可视化图像</Menu.Item>*/}
                <Menu.Item key="2">退出</Menu.Item>
            </Menu>
        );
        const userName = sessionStorage.getItem("gs");
        return (
            <Layout className="myLayout">
                <Header id="zhuye_header_div" style={{ backgroundColor: '#3460AB', borderBottom:'1px solid #e8e8e8' }}>
                    <div className="tongji_headerLeft" style={{display: 'flex',width: '50%'}}>
                      <div className="navLogo" style={{position:"relative",width:"60px",height:'60px'}}  onClick={this.toIndex}></div>
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
                    {/*<Button style={{display: this.state.showanniu}} onClick={this.xianshicaidan.bind(this)}><Icon type="right"/></Button>*/}
                    <Sider className="mySider_left" style={{ background: '#3460AB' }}>
                        {/*<Button style={{display: this.state.showcaidan}} onClick={this.yincangcaidan.bind(this)}><Icon type="left"/></Button>*/}
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
                                {/*人员管理*/}
                                <Route path="/renyuanguanli_zhongduiganbu_bumenguanli" component={renyuanguanli_zhongduiganbu_bumenguanli} />
                                <Route path="/renyuanguanli_zhongduiguanliyuan_renyuanguanli" component={renyuanguanli_zhongduiguanliyuan_renyuanguanli} />
                                <Route path="/renyuanguanli_zhongduiganbu_nianxiutianshuguanli" component={renyuanguanli_zhongduiganbu_nianxiutianshuguanli} />
                                <Route path="/yingquguanlixin_zhishiguanliyuan_zhishiwenzhang" component={yingquguanlixin_zhishiguanliyuan_zhishiwenzhang}/>
                                {/*其他按钮相关*/}
                                <Route path="/zhgl" component={Zhgl} />
                                <Route path="/daibanshixiang_zhongduiganbu_daibanshixiang" component={daibanshixiang_zhongduiganbu_daibanshixiang}  />
                                <Route path="/shiyongshuoming" component={shiyongshuoming} />

                                {/* 新营区管理 */}
                                <Route path="/yingquguanlixin_xiaofangyuan_fangjianshenqing" component={yingquguanlixin_xiaofangyuan_fangjianshenqing} />
                                <Route path="/yingquguanlixin_xiaofangyuan_fangjianshiyongjilu" component={yingquguanlixin_xiaofangyuan_fangjianshiyongjilu} />
                                <Route path="/yingquguanlixin_xiaofangyuan_jiedaishidasaojilu" component={yingquguanlixin_xiaofangyuan_jiedaishidasaojilu}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_jiedaishishenqing" component={yingquguanlixin_xiaofangyuan_jiedaishishenqing}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_jiedaishishiyongjilu" component={yingquguanlixin_xiaofangyuan_jiedaishishiyongjilu}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_zhouhoupingcai" component={yingquguanlixin_xiaofangyuan_zhouhoupingcai} />
                                <Route path="/yingquguanlixin_xiaofangyuan_dazhongdianping" component={yingquguanlixin_xiaofangyuan_dazhongdianping} />
                                <Route path="/yingquguanlixin_zhongduiganbu_dazhongdianping" component={yingquguanlixin_zhongduiganbu_dazhongdianping} />
                                <Route path="/yingquguanlixin_xiaofangyuan_chayuezhishiwenzhang" component={yingquguanlixin_xiaofangyuan_chayuezhishiwenzhang}/>
                                <Route path="/yingquguanlixin_zuzhiguanliyuan_paibanshijianshezhi" component={yingquguanlixin_zuzhiguanliyuan_paibanshijianshezhi}/>
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
                                <Route path="/yingquguanlixin_zuzhiguanliyuan_qingjiajiluchakan" component={yingquguanlixin_zuzhiguanliyuan_qingjiajiluchakan} />


                                {/* 聊城二期 */}
                                <Route path="/yingquguanlixin_zuzhiyuangong_gongyongchelishijilu" component={yingquguanlixin_zuzhiyuangong_gongyongchelishijilu}/>
                                <Route path="/yingquguanlixin_zhibanguanliyuan_yichangtuogangjilu" component={yingquguanlixin_zhibanguanliyuan_yichangtuogangjilu}/>
                                <Route path="/yingquguanlixin_zhibanguanliyuan_zhibanlishijilu" component={yingquguanlixin_zhibanguanliyuan_zhibanlishijilu}/>
                                <Route path="/yingquguanlixin_zhibanguanliyuan_quexijilu" component={yingquguanlixin_zhibanguanliyuan_quexijilu}/>
                                <Route path="/yingquguanlixin_zuzhi_fangjianchakan" component={yingquguanlixin_zuzhi_fangjianchakan}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_guoqiyaopinchakan" component={yingquguanlixin_zhongduiganbu_guoqiyaopinchakan}/>
                                <Route path="/yingquguanlixin_houchurenyuan_caigouguanli" component={yingquguanlixin_houchurenyuan_caigouguanli}/>
                                <Route path="/yingquguanlixin_shitangguanliyuan_chushipingjia" component={yingquguanlixin_shitangguanliyuan_chushipingjia}/>
                                <Route path="/yingquguanlixin_shitangguanliyuan_daojushiyongjilu" component={yingquguanlixin_shitangguanliyuan_daojushiyongjilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_jiaogangjilu" component={yingquguanlixin_zhongduiganbu_jiaogangjilu}/>
                                <Route path="/yingquguanlixin_xiaofangyuan_xiaojialishijilu" component={yingquguanlixin_xiaofangyuan_xiaojialishijilu}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_xiaojialishijilu" component={yingquguanlixin_zhongduiganbu_xiaojialishijilu}/>
                                <Route path="/yingquguanlixin_zuzhiyuangong_gongyongchehuanchejilu" component={yingquguanlixin_zuzhiyuangong_gongyongchehuanchejilu}/>
                                <Route path="/yingquguanlixin_cheliangguanliyuan_yongchehuanchejilu" component={yingquguanlixin_cheliangguanliyuan_yongchehuanchejilu}/>
                                <Route path="/yingquguanlixin_cheliangguanliyuan_gongyongchexingcheguiji" component={yingquguanlixin_cheliangguanliyuan_gongyongchexingcheguiji}/>
                                <Route path="/yingquguanlixin_fangjianguanliyuan_fangjianshiyongjilu" component={yingquguanlixin_fangjianguanliyuan_fangjianshiyongjilu}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_chepaishibieyibaimingdan" component={yingquguanlixin_yingquguanliyuan_chepaishibieyibaimingdan}/>
                                <Route path="/yingquguanlixin_yingquguanliyuan_wangguanguanli" component={yingquguanlixin_yingquguanliyuan_wangguanguanli}/>
                                <Route path="/yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi" component={yingquguanlixin_zhinengjiaju_shoujiguankongshijiansheizhi}/>
                                <Route path="/yingquguanlixin_zhongduiganbu_kucungaojingjilu" component={yingquguanlixin_zhongduiganbu_kucungaojingjilu}/>
                                <Route path="/yingquguanlixin_zuzhiguanliyuan_gongzuoanpai" component={yingquguanlixin_zuzhiguanliyuan_gongzuoanpai}/>
                                <Route path="/yingquguanlixin_zhibanguanliyuan_yaoshirijijilu" component={yingquguanlixin_zhibanguanliyuan_yaoshirijijilu}/>

                                {/*装备管理*/}
                                <Route path="/zhuangbeiguanli_zhongduirenyuan_zhuangbeitongji" component={zhuangbeiguanli_zhongduirenyuan_zhuangbeitongji}/>
                                <Route path="/zhuangbeiguanli_zhongduirenyuan_cangkuguanli" component={zhuangbeiguanli_zhongduirenyuan_cangkuguanli}/>
                                <Route path="/zhuangbeigunali_zhongduirenyuan_zhuangbeichaxun" component={zhuangbeigunali_zhongduirenyuan_zhuangbeichaxun}/>
                                <Route path="/zhuangbeiguanli_zhongduirenyuan_zhuangbeixinzengbaofeijilu" component={zhuangbeiguanli_zhongduirenyuan_zhuangbeixinzengbaofeijilu}/>
                                <Route path="/zhuangbeiguanli_zhongduirenyuan_zhuangbeichurukujilu" component={zhuangbeiguanli_zhongduirenyuan_zhuangbeichurukujilu}/>
                                <Route path="/zhuangbeiguanli_zhongduirenyuan_jiaojiebanjilu" component={zhuangbeiguanli_zhongduirenyuan_jiaojiebanjilu}/>
                                {/*消防调度*/}
                                <Route path="/zhuangbeiguanli_zhongduirenyuan_xiaofangcheguanli" component={zhuangbeiguanli_zhongduirenyuan_xiaofangcheguanli}/>
                                <Route path="/qicai_zhongduiganbu_dituyingyong" component={qicai_zhongduiganbu_dituyingyong}/>
                                <Route path="/qicai_zhongduiganbu_dianziweilan" component={qicai_zhongduiganbu_dianziweilan}/>
                                <Route path="/qicai_zhongduiganbu_chujingjilu" component={qicai_zhongduiganbu_chujingjilu}/>

                                <Route path="/renyuanguanli_zhiduiganbu_shuiyuanshezhi" component={renyuanguanli_zhiduiganbu_shuiyuanshezhi}/>

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
                                <Route path="/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang" component={yingquguanlixin_zhiduiguanliyuan_zhishiwenzhang}/>
                                <Route path="/daiwanshan" component={daiwanshan} />
                                <Redirect to={this.state.redirest}/>
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
