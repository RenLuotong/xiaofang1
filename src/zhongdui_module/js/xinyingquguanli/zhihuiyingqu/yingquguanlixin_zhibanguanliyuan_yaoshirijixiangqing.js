import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import moment from 'moment';
import { 
	Select,
  	Layout, 
  	Menu, 
  	Breadcrumb, 
  	Icon, 
  	Input, 
  	Form, 
  	Button,
  	Table, 
  	Divider,
    message
} from 'antd';

const { TextArea } = Input;

class App extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			id:this.props.match.params.id,
            yaoshirijizhubiao:{},
            renyuantongjicongbiao:{},
            xunliantongjicongbiao:{},
            paibanqingkuangcongbiao:{},
            chapuchashaocongbiaos:[],
            linshilaiduiqinshucongbiaos:[],
            qingjiatongjicongbiaos:[],
		};
	}
	
	getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "yaoshirijixiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.chapuchashaocongbiaos.length; i++) {
                    if(data.data.chapuchashaocongbiaos[i].shijian !== null && data.data.chapuchashaocongbiaos[i].shijian !== undefined && data.data.chapuchashaocongbiaos[i].shijian !== '') {
                    data.data.chapuchashaocongbiaos[i].shijian = moment(data.data.chapuchashaocongbiaos[i].shijian).format('YYYY-MM-DD HH:mm');
                    }
                }
                for (let i = 0; i < data.data.linshilaiduiqinshucongbiaos.length; i++) {
                    if(data.data.linshilaiduiqinshucongbiaos[i].laiduishijian !== null && data.data.linshilaiduiqinshucongbiaos[i].laiduishijian !== undefined && data.data.linshilaiduiqinshucongbiaos[i].laiduishijian !== '') {
                        data.data.linshilaiduiqinshucongbiaos[i].laiduishijian = moment(data.data.linshilaiduiqinshucongbiaos[i].laiduishijian).format('YYYY-MM-DD HH:mm');
                    }
                    if(data.data.linshilaiduiqinshucongbiaos[i].liduishijian !== null && data.data.linshilaiduiqinshucongbiaos[i].liduishijian !== undefined && data.data.linshilaiduiqinshucongbiaos[i].liduishijian !== '') {
                        data.data.linshilaiduiqinshucongbiaos[i].liduishijian = moment(data.data.linshilaiduiqinshucongbiaos[i].liduishijian).format('YYYY-MM-DD HH:mm');
                    }
                }
                for (let i = 0; i < data.data.qingjiatongjicongbiaos.length; i++) {
                    if(data.data.qingjiatongjicongbiaos[i].liduishijian !== null && data.data.qingjiatongjicongbiaos[i].liduishijian !== undefined && data.data.qingjiatongjicongbiaos[i].liduishijian !== '') {
                        data.data.qingjiatongjicongbiaos[i].liduishijian = moment(data.data.qingjiatongjicongbiaos[i].liduishijian).format('YYYY-MM-DD HH:mm');
                    }
                    if(data.data.qingjiatongjicongbiaos[i].guiduishijian !== null && data.data.qingjiatongjicongbiaos[i].guiduishijian !== undefined && data.data.qingjiatongjicongbiaos[i].guiduishijian !== '') {
                        data.data.qingjiatongjicongbiaos[i].guiduishijian = moment(data.data.qingjiatongjicongbiaos[i].guiduishijian).format('YYYY-MM-DD HH:mm');
                    }
                }
                if(data.data.paibanqingkuangcongbiao.jiaojieshijian !== null && data.data.paibanqingkuangcongbiao.jiaojieshijian !== undefined && data.data.paibanqingkuangcongbiao.jiaojieshijian !== '') {
                    data.data.paibanqingkuangcongbiao.jiaojieshijian = moment(data.data.paibanqingkuangcongbiao.jiaojieshijian).format('YYYY-MM-DD HH:mm');
                }
                THE.setState({
                    yaoshirijizhubiao: data.data.yaoshirijizhubiao,
                    renyuantongjicongbiao:data.data.renyuantongjicongbiao,
                    xunliantongjicongbiao:data.data.xunliantongjicongbiao,
                    paibanqingkuangcongbiao:data.data.paibanqingkuangcongbiao,
                    chapuchashaocongbiaos:data.data.chapuchashaocongbiaos,
                    linshilaiduiqinshucongbiaos:data.data.linshilaiduiqinshucongbiaos,
                    qingjiatongjicongbiaos:data.data.qingjiatongjicongbiaos,
                });
            }
        });
	}

    dayin(){
        var bdhtml=window.document.body.innerHTML;
        var jubuData = document.getElementById("div").innerHTML;
        //把获取的 局部div内容赋给body标签, 相当于重置了 body里的内容
        window.document.body.innerHTML= jubuData;
        //调用打印功能
        window.print();
        window.document.body.innerHTML=bdhtml;//重新给页面内容赋值；
        window.location.reload(true);


        // const element = document.getElementById('mytableriji');
        // // 导出配置
        // const opt = {
        //     margin: 0.5,
        //     filename: '打印.pdf',
        //     image: { type: 'jpeg', quality: 0.98 }, // 导出的图片质量和格式
        //     html2canvas: { scale: 2, useCORS: true,width:1000}, // useCORS很重要，解决文档中图片跨域问题
        //     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        // };
        // if (element) {
        //     html2pdf().set(opt).from(element).save(); // 导出
        // };
	}

	componentDidMount () {
		this.getInfo();
    }
	
  	render() {

  		let yaoshirijizhubiao  = this.state.yaoshirijizhubiao;

        let renyuantongjicongbiao = this.state.renyuantongjicongbiao;
        let xunliantongjicongbiao = this.state.xunliantongjicongbiao;
        let paibanqingkuangcongbiao = this.state.paibanqingkuangcongbiao;


		let chapuchashaocongbiaos = this.state.chapuchashaocongbiaos;
        let linshilaiduiqinshucongbiaos = this.state.linshilaiduiqinshucongbiaos;
        let qingjiatongjicongbiaos = this.state.qingjiatongjicongbiaos;
        let chapuchashaocongbiaoslength = 0;
        if(chapuchashaocongbiaos.length === 0){
            chapuchashaocongbiaoslength = chapuchashaocongbiaos.length + 2;
		}else{
            chapuchashaocongbiaoslength = chapuchashaocongbiaos.length + 1;
		}
  		let chapuchagangbiaotiOptions = <tr>
			<td className="rjibiaoti" rowspan={chapuchashaocongbiaoslength}>查铺查哨</td>
				<td className="rjibiaoti" colspan="1">检查人</td>
				<td className="rjibiaoti" colspan="2">时&#12288;&#12288;间</td>
				<td className="rjibiaoti" colspan="1">领班员</td>
				<td className="rjibiaoti" colspan="1">警卫人员姓名</td>
				<td className="rjibiaoti" colspan="8">检查情况</td>
			</tr>;
        let chapuchagangneirongOptions = '';
		if(chapuchashaocongbiaos.length  === 0){
            chapuchagangneirongOptions = (
				<tr>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="2"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rjiwenben" colspan="8"><span id="teshuinput" style={{ width: '95%'}}></span></td>
				</tr>
            )
		}else{
        chapuchagangneirongOptions = this.state.chapuchashaocongbiaos.map((item,index) =>
			<tr>
				<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{item.jiancharen}</span></td>
				<td className="rji" colspan="2"><span id="teshuinput" style={{ width: '95%'}}>{item.shijian}</span></td>
				<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{item.lingbanyuan}</span></td>
				<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{item.jingweirenyuanxingming}</span></td>
				<td className="rjiwenben" colspan="8"><span id="teshuinput" style={{ width: '95%'}}>{item.jianchaqingkuang}</span></td>
			</tr>
        );
        }
        let linshilaiduiqinshucongbiaoslength = 0;
        if(linshilaiduiqinshucongbiaos.length === 0){
            linshilaiduiqinshucongbiaoslength = linshilaiduiqinshucongbiaos.length + 3;
        }else{
            linshilaiduiqinshucongbiaoslength = linshilaiduiqinshucongbiaos.length + 2;
		}
        let laiduijiashubiaotioneOptions = <tr>
			<td className="rjibiaoti" rowspan={linshilaiduiqinshucongbiaoslength}>临时来队家属</td>
			<td className="rjibiaoti" colspan="1" rowspan="2">消防员姓名</td>
			<td className="rjibiaoti" colspan="1" rowspan="2">亲属姓名</td>
			<td className="rjibiaoti" colspan="1" rowspan="2">关系</td>
			<td className="rjibiaoti" colspan="4">时&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;间</td>
			<td className="rjibiaoti" colspan="6" rowspan="2">病号及处理情况</td>
		</tr>;
        let laiduijiashubiaotitwoOptions = <tr>
			<td className="rjibiaoti" colspan="2">来&#12288;&#12288;队</td>
			<td className="rjibiaoti" colspan="2">离&#12288;&#12288;队</td>
		</tr>;
        let laiduijiashuneirongOptions = '';
        if(linshilaiduiqinshucongbiaos.length  === 0){
            laiduijiashuneirongOptions = (
				<tr>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="2"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="2"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rjiwenben" colspan="6"><span id="teshuinput" style={{ width: '95%'}}></span></td>
				</tr>
            )
        }else{
        laiduijiashuneirongOptions = this.state.linshilaiduiqinshucongbiaos.map((item,index) =>
				<tr>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{item.xiaofangyuanxingming}</span></td>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{item.qinshuxingming}</span></td>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{item.guanxi}</span></td>
					<td className="rji" colspan="2"><span id="teshuinput" style={{ width: '95%'}}>{item.laiduishijian}</span></td>
					<td className="rji" colspan="2"><span id="teshuinput" style={{ width: '95%'}}>{item.liduishijian}</span></td>
					<td className="rjiwenben" colspan="6"><span id="teshuinput" style={{ width: '95%'}}>{item.binghaojichuliqingkuang}</span></td>
				</tr>
        );
        }
        let qingjiatongjicongbiaoslength = 0;
        if(qingjiatongjicongbiaos.length === 0){
            qingjiatongjicongbiaoslength = qingjiatongjicongbiaos.length + 2;
        }else{
            qingjiatongjicongbiaoslength = qingjiatongjicongbiaos.length + 1;
		}
        let qingjiawaichubiaotiOptions = <tr>
			<td className="rjibiaoti" rowspan={qingjiatongjicongbiaoslength}>请假外出、探亲休假</td>
			<td className="rjibiaoti" colspan="1" >姓名</td>
			<td className="rjibiaoti" colspan="1" >职务</td>
			<td className="rjibiaoti" colspan="2" >事由</td>
			<td className="rjibiaoti" colspan="1">时数或天数</td>
			<td className="rjibiaoti" colspan="1">准假部门（人）</td>
			<td className="rjibiaoti" colspan="3">离队时间</td>
			<td className="rjibiaoti" colspan="3">归队时间</td>
			<td className="rjibiaoti" colspan="1">超（误）假时（天）数</td>
		</tr>;
        let qingjiawaichuneirongOptions = '';
        if(qingjiatongjicongbiaos.length  === 0){
            qingjiawaichuneirongOptions = (
				<tr>
					<td className="rji" colspan="1" ><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="1" ><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rjiwenben" colspan="2" ><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="3"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="3"><span id="teshuinput" style={{ width: '95%'}}></span></td>
					<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}></span></td>
				</tr>
            )
        }else {
            qingjiawaichuneirongOptions = this.state.qingjiatongjicongbiaos.map((item, index) =>
				<tr>
					<td className="rji" colspan="1"><span id="teshuinput" style={{width: '95%'}}>{item.xingming}</span>
					</td>
					<td className="rji" colspan="1"><span id="teshuinput" style={{width: '95%'}}>{item.zhiwu}</span>
					</td>
					<td className="rjiwenben" colspan="2"><span id="teshuinput"
																style={{width: '95%'}}>{item.shiyou}</span></td>
					<td className="rji" colspan="1"><span id="teshuinput"
														  style={{width: '95%'}}>{item.shitianshu}</span></td>
					<td className="rji" colspan="1"><span id="teshuinput"
														  style={{width: '95%'}}>{item.zhunjiabumen}</span></td>
					<td className="rji" colspan="3"><span id="teshuinput"
														  style={{width: '95%'}}>{item.liduishijian}</span></td>
					<td className="rji" colspan="3"><span id="teshuinput"
														  style={{width: '95%'}}>{item.guiduishijian}</span></td>
					<td className="rji" colspan="1"><span id="teshuinput"
														  style={{width: '95%'}}>{item.chaojiashitianshu}</span></td>
				</tr>
            );
        }
        let img = '';

        if(yaoshirijizhubiao.qianzitupiandizhi !== null){
        	img = <img src={yaoshirijizhubiao['qianzitupiandizhi']}  style={{marginLeft:10,width:120,height:60}} title="签字"/>
		}
  		
	    return (
	    	<div>
	      	<div id="div">
				<span  style={{ width: 50,marginLeft:20}}>{yaoshirijizhubiao.yue}</span><span style={{marginLeft:10}}>月</span>
				<span  style={{ width: 50,marginLeft:20}}>{yaoshirijizhubiao.ri}</span><span style={{marginLeft:10}}>日</span>
				<span style={{ marginLeft:10}}>星期</span><span  style={{ width: 50,marginLeft:10}}>{yaoshirijizhubiao.xingqi}</span>
				<span style={{marginLeft:220}}>天气</span><span  style={{ width: 100,marginLeft:10}}>{yaoshirijizhubiao.tianqi}</span>
				<span style={{marginLeft:120}}>值班员</span><span  style={{ width: 100,marginLeft:10}}>{yaoshirijizhubiao.zhibanyuan}</span>
				{/*startprint*/}
		        <table id="mytableriji" cellSpacing="0">
                	<tbody>
                    	<tr>
                        	<td className="rjibiaoti" colspan="2" rowspan="2">实力</td>
                        	<td className="rjibiaoti" colspan="6" style={{ width: '40%'}}>编制人数</td>
							<td className="rjibiaoti" colspan="6" style={{ width: '40%'}}>现有人数</td>
                    	</tr>
                    	<tr>
                            <td className="rjibiaoti" style={{ width: '6.5%'}}>干部</td>
							<td className="rji" style={{ width: '6.5%'}}><span id="teshuinput" style={{ width: '95%'}}>{renyuantongjicongbiao.bianzhiganbushu}</span></td>
							<td className="rjibiaoti" style={{ width: '6.5%'}}>消防员</td>
							<td className="rji" style={{ width: '6.5%'}}><span id="teshuinput" style={{ width: '95%'}}>{renyuantongjicongbiao.bianzhixiaofangyuanshu}</span></td>
							<td className="rjibiaoti" style={{ width: '6.5%'}}>合计</td>
							<td className="rji" style={{ width: '6.5%'}}><span id="teshuinput" style={{ width: '95%'}}>{renyuantongjicongbiao.bianzhizongrenshu}</span></td>
							<td className="rjibiaoti" style={{ width: '6.5%'}}>干部</td>
							<td className="rji" style={{ width: '6.5%'}}><span id="teshuinput" style={{ width: '95%'}}>{renyuantongjicongbiao.xianyouganbushu}</span></td>
							<td className="rjibiaoti" style={{ width: '6.5%'}}>消防员</td>
							<td className="rji" style={{ width: '6.5%'}}><span id="teshuinput" style={{ width: '95%'}}>{renyuantongjicongbiao.xianyouxiaofangyuanshu}</span></td>
							<td className="rjibiaoti" style={{ width: '6.5%'}}>合计</td>
							<td className="rji" style={{ width: '6.5%'}}><span id="teshuinput" style={{ width: '95%'}}>{renyuantongjicongbiao.xianyouzongrenshu}</span></td>
                    	</tr>
						<tr>
							<td className="rjibiaoti" rowspan="10">训练、教育或者执行其他任务情况
							</td>
							<td className="rjibiaoti" rowspan="2">区分</td>
							<td className="rjibiaoti" colspan="9" rowspan="2">内容</td>
							<td className="rjibiaoti" colspan="3">人数</td>
						</tr>
						<tr>
							<td className="rjibiaoti">应到</td>
							<td className="rjibiaoti">实到</td>
							<td className="rjibiaoti">到课率</td>
						</tr>
						<tr>
							<td className="rjibiaoti" rowspan="2">早晨</td>
							<td className="rjiwenben" colspan="9" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.zaochenneirong}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.zaochenyingdaorenshu}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}} >{xunliantongjicongbiao.zaochenshidaorenshu}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.zaochendaokelv}</span></td>
						</tr>
						<tr>
						</tr>
						<tr>
							<td className="rjibiaoti" rowspan="2">上午</td>
							<td className="rjiwenben" colspan="9" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.shangwuneirong}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.shangwuyingdaorenshu}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.shangwushidaorenshu}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.shangwudaokelv}</span></td>
						</tr>
						<tr>
						</tr>
						<tr>
							<td className="rjibiaoti" rowspan="2">下午</td>
							<td className="rjiwenben" colspan="9" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.xiawuneirong}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.xiawuyingdaorenshu}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.xiawushidaorenshu}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.xiawudaokelv}</span></td>
						</tr>
						<tr>
						</tr>
						<tr>
							<td className="rjibiaoti" rowspan="2">晚上</td>
							<td className="rjiwenben" colspan="9" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.wanshangneirong}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.wanshangyingdaorenshu}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.wanshangshidaorenshu}</span></td>
							<td className="rji" rowspan="2"><span id="teshuinput" style={{ width: '95%'}}>{xunliantongjicongbiao.wanshangdaokelv}</span></td>
						</tr>
						<tr>
						</tr>
						<tr>
							<td className="rjibiaoti" colspan="2">公差勤务</td>
							<td className="rjiwenben" colspan="12"><span id="teshuinput" style={{ width: '95%'}}>{yaoshirijizhubiao.gongchaiqinwu}</span></td>
						</tr>
						<tr>
							<td className="rjibiaoti" colspan="2">人员或装备变动</td>
							<td className="rjiwenben" colspan="12"><span id="teshuinput" style={{ width: '95%'}}>{yaoshirijizhubiao.renyuanzhuangbeibiandong}</span></td>
						</tr>
						<tr>
							<td className="rjibiaoti" colspan="2">装备、队容风纪、内务卫生检查情况</td>
							<td className="rjiwenben" colspan="12"><span id="teshuinput" style={{ width: '95%'}}>{yaoshirijizhubiao.zhuangbeiduirongneiwujiancha}</span></td>
						</tr>
						{chapuchagangbiaotiOptions}
						{chapuchagangneirongOptions}
						<tr>
							<td className="rjibiaoti" rowspan="4">派班情况</td>
							<td className="rjibiaoti" colspan="1">职务</td>
							<td className="rjibiaoti" colspan="1">交班者</td>
							<td className="rjibiaoti" colspan="1">接班者</td>
							<td className="rjibiaoti" colspan="3">组织者</td>
							<td className="rjibiaoti" colspan="7">交接情况</td>
						</tr>
						<tr>
							<td className="rjibiaoti" colspan="1">值班员</td>
							<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{paibanqingkuangcongbiao.zhibanyuanjiaobanzhe}</span></td>
							<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{paibanqingkuangcongbiao.zhibanyuanjiebanzhe}</span></td>
							<td className="rji" colspan="3"><span id="teshuinput" style={{ width: '95%'}}>{paibanqingkuangcongbiao.zuzhizhe}</span></td>
							<td className="rjiwenben" colspan="7" rowspan="3"><span id="teshuinput" style={{ width: '95%'}}>{paibanqingkuangcongbiao.jiaojieqingkuang}</span></td>
						</tr>
						<tr>
							<td className="rjibiaoti" colspan="1">值日员</td>
							<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{paibanqingkuangcongbiao.zhiriyuanjiaobanzhe}</span></td>
							<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{paibanqingkuangcongbiao.zhiriyuanjiebanzhe}</span></td>
							<td className="rjibiaoti" rowspan="1" colspan="3">交接时间</td>
						</tr>
						<tr>
							<td className="rjibiaoti" colspan="1">厨房值班员</td>
							<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{paibanqingkuangcongbiao.chufangzhibanyuanjiaobanzhe}</span></td>
							<td className="rji" colspan="1"><span id="teshuinput" style={{ width: '95%'}}>{paibanqingkuangcongbiao.chufangzhibanyuanjiebanzhe}</span></td>
							<td className="rji" colspan="3"><span id="teshuinput" style={{ width: '95%'}}>{paibanqingkuangcongbiao.jiaojieshijian}</span></td>
						</tr>
						{laiduijiashubiaotioneOptions}
						{laiduijiashubiaotitwoOptions}
						{laiduijiashuneirongOptions}
						{qingjiawaichubiaotiOptions}
						{qingjiawaichuneirongOptions}
						<tr>
							<td className="rjibiaoti" rowspan="8">上级通知、指示及其他重大事项</td>
							<td className="rjiwenben" rowspan="8" colspan="13" ><span id="teshuinput" style={{ width: '95%'}}>{yaoshirijizhubiao.shangjitongzhijiqitashixiang}</span></td>
						</tr>
                  	</tbody>
              	</table>
				<br/>
				<span  style={{ width: 50,marginLeft:20}}>站（中队）首长签字：</span>
				{img}
				<span style={{ width: 50,marginLeft:600}}>{yaoshirijizhubiao.shi}</span>
				<span style={{ width: 50,marginLeft:10}}>时</span>
				<span style={{ width: 50,marginLeft:10}}>{yaoshirijizhubiao.fen}</span>
				<span style={{ width: 50,marginLeft:10}}>分</span>
			</div>
                {/*endprint*/}
				<br/>
				<Button onClick={this.dayin.bind(this)}>打印</Button>
	      	</div>

	    );
  	}
}

const AppForm = Form.create()(App);
export default AppForm;
