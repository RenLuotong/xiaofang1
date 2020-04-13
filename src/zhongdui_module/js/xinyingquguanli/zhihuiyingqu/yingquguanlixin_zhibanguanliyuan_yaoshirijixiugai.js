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
    message,
    DatePicker
} from 'antd';

const { TextArea } = Input;

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			id:this.props.match.params.id,
            info:{},
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
                THE.setState({
                    jiaojieshijian:data.data.paibanqingkuangcongbiao.jiaojieshijian,
                    info: data.data,
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

    add(panduan){
        const THE = this;
        let chapuchashaocongbiaos = THE.state.chapuchashaocongbiaos;
        let linshilaiduiqinshucongbiaos = THE.state.linshilaiduiqinshucongbiaos;
        let qingjiatongjicongbiaos = THE.state.qingjiatongjicongbiaos;
        if(panduan === '查铺查哨'){
        let obj = {};
        obj.jiancharen = '';
        obj.shijian = '';
        obj.lingbanyuan = '';
        obj.jingweirenyuanxingming = '';
        obj.jianchaqingkuang = '';
        chapuchashaocongbiaos .push(obj);
        THE.setState({
            chapuchashaocongbiaos: chapuchashaocongbiaos,
        });
        }else if(panduan === '临时来队家属'){
            let obj = {};
            obj.xiaofangyuanxingming = '';
            obj.qinshuxingming = '';
            obj.guanxi = '';
            obj.laiduishijian = '';
            obj.liduishijian = '';
            obj.chuliqingkuang = '';
            linshilaiduiqinshucongbiaos .push(obj);
            THE.setState({
                linshilaiduiqinshucongbiaos: linshilaiduiqinshucongbiaos,
            });
		}else{
            let obj = {};
            obj.xingming = '';
            obj.zhiwu = '';
            obj.shiyou = '';
            obj.shijian = '';
            obj.zhunjiabumen = '';
            obj.liduishijian = '';
            obj.guiduishijian = '';
            obj.chaojiashishu = '';
            qingjiatongjicongbiaos .push(obj);
            THE.setState({
                qingjiatongjicongbiaos: qingjiatongjicongbiaos,
            });
		}
    }

    remove(panduan,index){
        const THE = this;
        let chapuchashaocongbiaos = THE.state.chapuchashaocongbiaos;
        let linshilaiduiqinshucongbiaos = THE.state.linshilaiduiqinshucongbiaos;
        let qingjiatongjicongbiaos = THE.state.qingjiatongjicongbiaos;
        if(panduan === '查铺查哨') {
            chapuchashaocongbiaos.splice(index, 1);
            THE.setState({
                chapuchashaocongbiaos: chapuchashaocongbiaos,
            });
        }else if(panduan === '临时来队家属'){
            linshilaiduiqinshucongbiaos.splice(index, 1);
            THE.setState({
                linshilaiduiqinshucongbiaos: linshilaiduiqinshucongbiaos,
            });
        }else{
            qingjiatongjicongbiaos.splice(index, 1);
            THE.setState({
                qingjiatongjicongbiaos: qingjiatongjicongbiaos,
            });
        }
    }

    InputChange(panduan,index,ziduan,event) {
        const THE = this;
        const target = event.target;
        const value = target.value;
        let chapuchashaocongbiaos = THE.state.chapuchashaocongbiaos;
        let linshilaiduiqinshucongbiaos = THE.state.linshilaiduiqinshucongbiaos;
        let qingjiatongjicongbiaos = THE.state.qingjiatongjicongbiaos;
        if(panduan === '查铺查哨') {
            chapuchashaocongbiaos[index][ziduan] = value;
            THE.setState({
                chapuchashaocongbiaos: chapuchashaocongbiaos
            });
        }else if(panduan === '临时来队家属'){
            linshilaiduiqinshucongbiaos[index][ziduan] = value;
            THE.setState({
                linshilaiduiqinshucongbiaos: linshilaiduiqinshucongbiaos
            });
        }else{
            qingjiatongjicongbiaos[index][ziduan] = value;
            THE.setState({
                qingjiatongjicongbiaos: qingjiatongjicongbiaos
            });
        }
    }

    onInputChange(obj,ziduan,event) {
        const THE = this;
        const target = event.target;
        const value = target.value;
        let yaoshirijizhubiao  = this.state.yaoshirijizhubiao;
        let renyuantongjicongbiao = this.state.renyuantongjicongbiao;
        let xunliantongjicongbiao = this.state.xunliantongjicongbiao;
        let paibanqingkuangcongbiao = this.state.paibanqingkuangcongbiao;
        if(obj === 'renyuantongjicongbiao') {
            renyuantongjicongbiao[ziduan] = value;
            THE.setState({
                renyuantongjicongbiao: renyuantongjicongbiao
            });
        }else if(obj === 'xunliantongjicongbiao'){
            xunliantongjicongbiao[ziduan] = value;
            if(ziduan === 'zaochenyingdaorenshu' && (xunliantongjicongbiao.zaochenyingdaorenshu!==null && xunliantongjicongbiao.zaochenyingdaorenshu!==''&& xunliantongjicongbiao.zaochenyingdaorenshu>0) && (xunliantongjicongbiao.zaochenshidaorenshu!==null && xunliantongjicongbiao.zaochenshidaorenshu!==''&& xunliantongjicongbiao.zaochenshidaorenshu>0)){
                xunliantongjicongbiao.zaochendaokelv = ((xunliantongjicongbiao.zaochenshidaorenshu/xunliantongjicongbiao.zaochenyingdaorenshu)* 100).toFixed(2) + '%';
            }
            if(ziduan === 'zaochenshidaorenshu' && (xunliantongjicongbiao.zaochenyingdaorenshu!==null && xunliantongjicongbiao.zaochenyingdaorenshu!==''&& xunliantongjicongbiao.zaochenyingdaorenshu>0) && (xunliantongjicongbiao.zaochenshidaorenshu!==null && xunliantongjicongbiao.zaochenshidaorenshu!==''&& xunliantongjicongbiao.zaochenshidaorenshu>0)){
                xunliantongjicongbiao.zaochendaokelv = ((xunliantongjicongbiao.zaochenshidaorenshu/xunliantongjicongbiao.zaochenyingdaorenshu)* 100).toFixed(2) + '%';
            }
            if(ziduan === 'shangwuyingdaorenshu' && (xunliantongjicongbiao.shangwuyingdaorenshu!==null && xunliantongjicongbiao.shangwuyingdaorenshu!==''&& xunliantongjicongbiao.shangwuyingdaorenshu>0) && (xunliantongjicongbiao.shangwushidaorenshu!==null && xunliantongjicongbiao.shangwushidaorenshu!==''&& xunliantongjicongbiao.shangwushidaorenshu>0)){
                xunliantongjicongbiao.shangwudaokelv = ((xunliantongjicongbiao.shangwushidaorenshu/xunliantongjicongbiao.shangwuyingdaorenshu) * 100).toFixed(2) + '%';
            }
            if(ziduan === 'shangwushidaorenshu' && (xunliantongjicongbiao.shangwuyingdaorenshu!==null && xunliantongjicongbiao.shangwuyingdaorenshu!==''&& xunliantongjicongbiao.shangwuyingdaorenshu>0) && (xunliantongjicongbiao.shangwushidaorenshu!==null && xunliantongjicongbiao.shangwushidaorenshu!==''&& xunliantongjicongbiao.shangwushidaorenshu>0)){
                xunliantongjicongbiao.shangwudaokelv = ((xunliantongjicongbiao.shangwushidaorenshu/xunliantongjicongbiao.shangwuyingdaorenshu) * 100).toFixed(2) + '%';
            }
            if(ziduan === 'xiawuyingdaorenshu' && (xunliantongjicongbiao.xiawuyingdaorenshu!==null && xunliantongjicongbiao.xiawuyingdaorenshu!==''&& xunliantongjicongbiao.xiawuyingdaorenshu>0) && (xunliantongjicongbiao.xiawushidaorenshu!==null && xunliantongjicongbiao.xiawushidaorenshu!==''&& xunliantongjicongbiao.xiawushidaorenshu>0)){
                xunliantongjicongbiao.xiawudaokelv = ((xunliantongjicongbiao.xiawushidaorenshu/xunliantongjicongbiao.xiawuyingdaorenshu) * 100).toFixed(2) + '%';
            }
            if(ziduan === 'xiawushidaorenshu' && (xunliantongjicongbiao.xiawuyingdaorenshu!==null && xunliantongjicongbiao.xiawuyingdaorenshu!==''&& xunliantongjicongbiao.xiawuyingdaorenshu>0) && (xunliantongjicongbiao.xiawushidaorenshu!==null && xunliantongjicongbiao.xiawushidaorenshu!==''&& xunliantongjicongbiao.xiawushidaorenshu>0)){
                xunliantongjicongbiao.xiawudaokelv = ((xunliantongjicongbiao.xiawushidaorenshu/xunliantongjicongbiao.xiawuyingdaorenshu) * 100).toFixed(2) + '%';
            }
            if(ziduan === 'wanshangyingdaorenshu' && (xunliantongjicongbiao.wanshangyingdaorenshu!==null && xunliantongjicongbiao.wanshangyingdaorenshu!==''&& xunliantongjicongbiao.wanshangyingdaorenshu>0) && (xunliantongjicongbiao.wanshangshidaorenshu!==null && xunliantongjicongbiao.wanshangshidaorenshu!==''&& xunliantongjicongbiao.wanshangshidaorenshu>0)){
                xunliantongjicongbiao.wanshangdaokelv = ((xunliantongjicongbiao.wanshangshidaorenshu/xunliantongjicongbiao.wanshangyingdaorenshu) * 100).toFixed(2) + '%';
            }
            if(ziduan === 'wanshangshidaorenshu' && (xunliantongjicongbiao.wanshangyingdaorenshu!==null && xunliantongjicongbiao.wanshangyingdaorenshu!==''&& xunliantongjicongbiao.wanshangyingdaorenshu>0) && (xunliantongjicongbiao.wanshangshidaorenshu!==null && xunliantongjicongbiao.wanshangshidaorenshu!==''&& xunliantongjicongbiao.wanshangshidaorenshu>0)){
                xunliantongjicongbiao.wanshangdaokelv = ((xunliantongjicongbiao.wanshangshidaorenshu/xunliantongjicongbiao.wanshangyingdaorenshu) * 100).toFixed(2) + '%';
            }


            THE.setState({
                xunliantongjicongbiao: xunliantongjicongbiao
            });
        }else if(obj === 'paibanqingkuangcongbiao'){
            paibanqingkuangcongbiao[ziduan] = value;
            THE.setState({
                paibanqingkuangcongbiao: paibanqingkuangcongbiao
            });
        }else{
            yaoshirijizhubiao[ziduan] = value;
            THE.setState({
                yaoshirijizhubiao: yaoshirijizhubiao
            });
        }
    }
    onTimeChange(ziduan,index,value){
        let yaoshirijizhubiao  = this.state.yaoshirijizhubiao;
        let renyuantongjicongbiao = this.state.renyuantongjicongbiao;
        let xunliantongjicongbiao = this.state.xunliantongjicongbiao;
        let paibanqingkuangcongbiao = this.state.paibanqingkuangcongbiao;
        let chapuchashaocongbiaos = this.state.chapuchashaocongbiaos;
        let linshilaiduiqinshucongbiaos = this.state.linshilaiduiqinshucongbiaos;
        let qingjiatongjicongbiaos = this.state.qingjiatongjicongbiaos;
        if(ziduan === 'jiaojieshijian'){
            paibanqingkuangcongbiao.jiaojieshijian = value;
            this.setState({
                paibanqingkuangcongbiao: paibanqingkuangcongbiao
            });
		}else if(ziduan === 'chapuchashaocongbiaos'){
            chapuchashaocongbiaos[index].shijian = value;
            this.setState({
                chapuchashaocongbiaos: chapuchashaocongbiaos
            });
		}else if(ziduan === 'jiashulaiduishijian'){
            linshilaiduiqinshucongbiaos[index].laiduishijian = value;
            this.setState({
                linshilaiduiqinshucongbiaos: linshilaiduiqinshucongbiaos
            });
        }else if(ziduan === 'jiashuliduishijian'){
            linshilaiduiqinshucongbiaos[index].liduishijian = value;
            this.setState({
                linshilaiduiqinshucongbiaos: linshilaiduiqinshucongbiaos
            });
        }else if(ziduan === 'qingjialiduishijian'){
            qingjiatongjicongbiaos[index].liduishijian = value;
            this.setState({
                qingjiatongjicongbiaos: qingjiatongjicongbiaos
            });
        }else{
            qingjiatongjicongbiaos[index].guiduishijian = value;
            this.setState({
                qingjiatongjicongbiaos: qingjiatongjicongbiaos
            });
        }
	}

    bianji(){
        const THE = this;
        let info  = THE.state.info;
        info.yaoshirijizhubiao  = THE.state.yaoshirijizhubiao;
        info.renyuantongjicongbiao = THE.state.renyuantongjicongbiao;
        info.xunliantongjicongbiao = THE.state.xunliantongjicongbiao;
        info.paibanqingkuangcongbiao = THE.state.paibanqingkuangcongbiao;
        info.chapuchashaocongbiaos = THE.state.chapuchashaocongbiaos;
        info.linshilaiduiqinshucongbiaos = THE.state.linshilaiduiqinshucongbiaos;
        info.qingjiatongjicongbiaos = THE.state.qingjiatongjicongbiaos;
        for (let i = 0; i < THE.state.chapuchashaocongbiaos.length; i++) {
            if(THE.state.chapuchashaocongbiaos[i].jiancharen == '' || THE.state.chapuchashaocongbiaos[i].jiancharen == null|| THE.state.chapuchashaocongbiaos[i].jiancharen == undefined){
                message.warning('请添加查铺查岗检查人');
                return;
            }
        }
        for (let i = 0; i < THE.state.linshilaiduiqinshucongbiaos.length; i++) {
            if(THE.state.linshilaiduiqinshucongbiaos[i].xiaofangyuanxingming == '' || THE.state.linshilaiduiqinshucongbiaos[i].xiaofangyuanxingming == null|| THE.state.linshilaiduiqinshucongbiaos[i].xiaofangyuanxingming == undefined){
                message.warning('请添加临时来队家属消防员姓名');
                return;
            }
        }
        for (let i = 0; i < THE.state.qingjiatongjicongbiaos.length; i++) {
            if(THE.state.qingjiatongjicongbiaos[i].xingming == '' || THE.state.qingjiatongjicongbiaos[i].xingming == null|| THE.state.qingjiatongjicongbiaos[i].xingming == undefined){
                message.warning('请添加请假休假人员姓名');
                return;
            }
        }
        $.ajax({
            type : 'POST',
            url : SERVER+"bianjirijixiangqing",
            data : JSON.stringify(info),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.backPage();
            }
        });
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhibanguanliyuan_yaoshirijijilu";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zhibanguanliyuan_yaoshirijijilu";
        }else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zhibanguanliyuan_yaoshirijijilu";
        }
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
  		let chapuchagangbiaotiOptions = <tr>
			<td className="rji" rowspan={chapuchashaocongbiaos.length + 1}><Button type="dashed" onClick={this.add.bind(this,'查铺查哨')}>查铺查哨<Icon type="plus" /></Button></td>
				<td style={{ width: '8%'}} className="rji" colspan="1">检查人</td>
				<td className="rji" colspan="2">时&#12288;&#12288;间</td>
				<td style={{ width: '8%'}} className="rji" colspan="1">领班员</td>
				<td style={{ width: '8%'}} className="rji" colspan="1">警卫人员姓名</td>
				<td className="rji" colspan="8">检查情况</td>
			</tr>;
        let chapuchagangneirongOptions = this.state.chapuchashaocongbiaos.map((item,index) =>
			<tr>
				<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={item.jiancharen} onChange={this.InputChange.bind(this,'查铺查哨',index,'jiancharen')}/></td>
				<td className="rji" colspan="2">
					<DatePicker
						showTime
						value={(item.shijian !== null && item.shijian !== '') ? moment(item.shijian) : ''}
						placeholder="时间"
						format="MM-DD  HH:mm"
						style={{ width: '95%', minWidth:120}}
						onChange={this.onTimeChange.bind(this,'chapuchashaocongbiaos',index)}
					/>
				</td>
				<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={item.lingbanyuan} onChange={this.InputChange.bind(this,'查铺查哨',index,'lingbanyuan')}/></td>
				<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={item.jingweirenyuanxingming} onChange={this.InputChange.bind(this,'查铺查哨',index,'jingweirenyuanxingming')}/></td>
				<td className="rji" colspan="8"><Input id="teshuinput" style={{ width: '95%'}} value={item.jianchaqingkuang} onChange={this.InputChange.bind(this,'查铺查哨',index,'jianchaqingkuang')}/></td>
				<Icon
					className="biji-delete-button"
					type="minus-circle-o"
					disabled={chapuchashaocongbiaos.length === 0}
					onClick={this.remove.bind(this,'查铺查哨',index)}
				/>
			</tr>
        );
        let laiduijiashubiaotioneOptions = <tr>
			<td className="rji" rowspan={linshilaiduiqinshucongbiaos.length + 2}><Button type="dashed" onClick={this.add.bind(this,'临时来队家属')}>临时来队家属<Icon type="plus" /></Button></td>
			<td style={{ width: '8%'}} className="rji" colspan="1" rowspan="2">消防员姓名</td>
			<td style={{ width: '8%'}} className="rji" colspan="1" rowspan="2">亲属姓名</td>
			<td className="rji" colspan="1" rowspan="2">关系</td>
			<td className="rji" colspan="4">时&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;间</td>
			<td className="rji" colspan="6" rowspan="2">病号及处理情况</td>
		</tr>;
        let laiduijiashubiaotitwoOptions = <tr>
			<td className="rji" colspan="2">来队</td>
			<td className="rji" colspan="2">离队</td>
		</tr>;

        let laiduijiashuneirongOptions = this.state.linshilaiduiqinshucongbiaos.map((item,index) =>
				<tr>
					<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={item.xiaofangyuanxingming} onChange={this.InputChange.bind(this,'临时来队家属',index,'xiaofangyuanxingming')}/></td>
					<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={item.qinshuxingming} onChange={this.InputChange.bind(this,'临时来队家属',index,'qinshuxingming')}/></td>
					<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={item.guanxi} onChange={this.InputChange.bind(this,'临时来队家属',index,'guanxi')}/></td>
					<td className="rji" colspan="2">
						<DatePicker
							showTime
							value={(item.laiduishijian !== null && item.laiduishijian !== '') ? moment(item.laiduishijian) : ''}
							placeholder="时间"
							format="MM-DD  HH:mm"
							style={{ width: '95%', minWidth:120}}
							onChange={this.onTimeChange.bind(this,'jiashulaiduishijian',index)}
						/>
					</td>
					<td className="rji" colspan="2">
						<DatePicker
							showTime
							value={(item.liduishijian !== null && item.liduishijian !== '') ? moment(item.liduishijian) : ''}
							placeholder="时间"
							format="MM-DD  HH:mm"
							style={{ width: '95%', minWidth:120}}
							onChange={this.onTimeChange.bind(this,'jiashuliduishijian',index)}
						/>
					</td>
					<td className="rji" colspan="6"><Input id="teshuinput" style={{ width: '95%'}} value={item.binghaojichuliqingkuang} onChange={this.InputChange.bind(this,'临时来队家属',index,'binghaojichuliqingkuang')}/></td>
				<Icon
					className="biji-delete-button"
					type="minus-circle-o"
					disabled={linshilaiduiqinshucongbiaos.length === 0}
					onClick={this.remove.bind(this,'临时来队家属',index)}
				/>
				</tr>
        );
        let qingjiawaichubiaotiOptions = <tr>
			<td className="rji" rowspan={qingjiatongjicongbiaos.length + 1}><Button type="dashed" onClick={this.add.bind(this,'请假外出、探亲休假')}>请假外出、探亲休假<Icon type="plus" /></Button></td>
			<td style={{ width: '8%'}} className="rji" colspan="1" >姓名</td>
			<td className="rji" colspan="1" >职务</td>
			<td className="rji" colspan="2" >事由</td>
			<td className="rji" colspan="1">时数或天数</td>
			<td className="rji" colspan="1">准假部门（人）</td>
			<td className="rji" colspan="3">离队时间</td>
			<td className="rji" colspan="3">归队时间</td>
			<td className="rji" colspan="1">超（误）假时（天）数</td>
		</tr>;

        let qingjiawaichuneirongOptions = this.state.qingjiatongjicongbiaos.map((item,index) =>
				<tr>
					<td className="rji" colspan="1" ><Input id="teshuinput" style={{ width: '95%'}} value={item.xingming} onChange={this.InputChange.bind(this,'请假外出、探亲休假',index,'xingming')}/></td>
					<td className="rji" colspan="1" ><Input id="teshuinput" style={{ width: '95%'}} value={item.zhiwu} onChange={this.InputChange.bind(this,'请假外出、探亲休假',index,'zhiwu')}/></td>
					<td className="rji" colspan="2" ><Input id="teshuinput" style={{ width: '95%'}} value={item.shiyou} onChange={this.InputChange.bind(this,'请假外出、探亲休假',index,'shiyou')}/></td>
					<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={item.shitianshu} onChange={this.InputChange.bind(this,'请假外出、探亲休假',index,'shitianshu')}/></td>
					<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={item.zhunjiabumen} onChange={this.InputChange.bind(this,'请假外出、探亲休假',index,'zhunjiabumen')}/></td>
					<td className="rji" colspan="3">
						<DatePicker
							showTime
							value={(item.liduishijian !== null && item.liduishijian !== '') ? moment(item.liduishijian) : ''}
							placeholder="时间"
							format="MM-DD  HH:mm"
							style={{ width: '95%', minWidth:120}}
							onChange={this.onTimeChange.bind(this,'qingjialiduishijian',index)}
						/>
					</td>
					<td className="rji" colspan="3">
						<DatePicker
							showTime
							value={(item.guiduishijian !== null && item.guiduishijian !== '') ? moment(item.guiduishijian) : ''}
							placeholder="时间"
							format="MM-DD  HH:mm"
							style={{ width: '95%', minWidth:120}}
							onChange={this.onTimeChange.bind(this,'qingjiaguiduishijian',index)}
						/>
					</td>
					<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={item.chaojiashitianshu} onChange={this.InputChange.bind(this,'请假外出、探亲休假',index,'chaojiashitianshu')}/></td>

				<Icon
					className="biji-delete-button"
					type="minus-circle-o"
					disabled={qingjiatongjicongbiaos.length === 0}
					onClick={this.remove.bind(this,'请假外出、探亲休假',index)}
				/>
				</tr>
        );

	    return (
	      	<div>

                <span  style={{ width: 50,marginLeft:20}}>{yaoshirijizhubiao.yue}</span><span style={{marginLeft:10}}>月</span>
                <span  style={{ width: 50,marginLeft:20}}>{yaoshirijizhubiao.ri}</span><span style={{marginLeft:10}}>日</span>
                <span style={{ marginLeft:10}}>星期</span><span  style={{ width: 50,marginLeft:10}}>{yaoshirijizhubiao.xingqi}</span>
                <span style={{marginLeft:320}}>天气</span><Input  style={{ width: 100,marginLeft:10}} value={yaoshirijizhubiao.tianqi} onChange={this.onInputChange.bind(this,'yaoshirijizhubiao','tianqi')}/>
                <span style={{marginLeft:160}}>值班员</span><Input  style={{ width: 100,marginLeft:10}} value={yaoshirijizhubiao.zhibanyuan} onChange={this.onInputChange.bind(this,'yaoshirijizhubiao','zhibanyuan')}/>
		        <table id="mytablerijibianji" cellSpacing="0">
                	<tbody>
                    	<tr>
                        	<td className="rji" colspan="2" rowspan="2">实力</td>
                        	<td className="rji" colspan="6" style={{ width: '40%'}}>编制人数</td>
							<td className="rji" colspan="6" style={{ width: '40%'}}>现有人数</td>
                    	</tr>
                    	<tr>
                            <td className="rji" style={{ width: '6.5%'}}>干部</td>
                            <td className="rji" style={{ width: '6.5%'}}><Input id="teshuinput" style={{ width: '95%'}} value={renyuantongjicongbiao.bianzhiganbushu} onChange={this.onInputChange.bind(this,'renyuantongjicongbiao','bianzhiganbushu')}/></td>
							<td className="rji" style={{ width: '6.5%'}}>消防员</td>
							<td className="rji" style={{ width: '6.5%'}}><Input id="teshuinput" style={{ width: '95%'}} value={renyuantongjicongbiao.bianzhixiaofangyuanshu} onChange={this.onInputChange.bind(this,'renyuantongjicongbiao','bianzhixiaofangyuanshu')}/></td>
							<td className="rji" style={{ width: '6.5%'}}>合计</td>
							<td className="rji" style={{ width: '6.5%'}}><Input id="teshuinput" style={{ width: '95%'}} value={renyuantongjicongbiao.bianzhizongrenshu} onChange={this.onInputChange.bind(this,'renyuantongjicongbiao','bianzhizongrenshu')}/></td>
							<td className="rji" style={{ width: '6.5%'}}>干部</td>
							<td className="rji" style={{ width: '6.5%'}}><Input id="teshuinput" style={{ width: '95%'}} value={renyuantongjicongbiao.xianyouganbushu} onChange={this.onInputChange.bind(this,'renyuantongjicongbiao','xianyouganbushu')}/></td>
							<td className="rji" style={{ width: '6.5%'}}>消防员</td>
							<td className="rji" style={{ width: '6.5%'}}><Input id="teshuinput" style={{ width: '95%'}} value={renyuantongjicongbiao.xianyouxiaofangyuanshu} onChange={this.onInputChange.bind(this,'renyuantongjicongbiao','xianyouxiaofangyuanshu')}/></td>
							<td className="rji" style={{ width: '6.5%'}}>合计</td>
							<td className="rji" style={{ width: '6.5%'}}><Input id="teshuinput" style={{ width: '95%'}} value={renyuantongjicongbiao.xianyouzongrenshu} onChange={this.onInputChange.bind(this,'renyuantongjicongbiao','xianyouzongrenshu')}/></td>
                    	</tr>
						<tr>
							<td className="rji" rowspan="10">训练、教育或者执行其他任务情况
							</td>
							<td className="rji" rowspan="2">区分</td>
							<td className="rji" colspan="9" rowspan="2">内容</td>
							<td className="rji" colspan="3">人数</td>
						</tr>
						<tr>
							<td className="rji">应到</td>
							<td className="rji">实到</td>
							<td className="rji">到课率</td>
						</tr>
						<tr>
							<td className="rji" rowspan="2">早晨</td>
							<td className="rji" colspan="9" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.zaochenneirong} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','zaochenneirong')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.zaochenyingdaorenshu} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','zaochenyingdaorenshu')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.zaochenshidaorenshu} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','zaochenshidaorenshu')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.zaochendaokelv} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','zaochendaokelv')}/></td>
						</tr>
						<tr>
						</tr>
						<tr>
							<td className="rji" rowspan="2">上午</td>
							<td className="rji" colspan="9" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.shangwuneirong} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','shangwuneirong')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.shangwuyingdaorenshu} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','shangwuyingdaorenshu')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.shangwushidaorenshu} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','shangwushidaorenshu')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.shangwudaokelv} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','shangwudaokelv')}/></td>
						</tr>
						<tr>
						</tr>
						<tr>
							<td className="rji" rowspan="2">下午</td>
							<td className="rji" colspan="9" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.xiawuneirong} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','xiawuneirong')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.xiawuyingdaorenshu} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','xiawuyingdaorenshu')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.xiawushidaorenshu} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','xiawushidaorenshu')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.xiawudaokelv} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','xiawudaokelv')}/></td>
						</tr>
						<tr>
						</tr>
						<tr>
							<td className="rji" rowspan="2">晚上</td>
							<td className="rji" colspan="9" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.wanshangneirong} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','wanshangneirong')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.wanshangyingdaorenshu} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','wanshangyingdaorenshu')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.wanshangshidaorenshu} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','wanshangshidaorenshu')}/></td>
							<td className="rji" rowspan="2"><Input id="teshuinput" style={{ width: '95%'}} value={xunliantongjicongbiao.wanshangdaokelv} onChange={this.onInputChange.bind(this,'xunliantongjicongbiao','wanshangdaokelv')}/></td>
						</tr>
						<tr>
						</tr>
						<tr>
							<td className="rji" colspan="2">公差勤务</td>
							<td className="rji" colspan="12"><Input id="teshuinput" style={{ width: '95%'}} value={yaoshirijizhubiao.gongchaiqinwu} onChange={this.onInputChange.bind(this,'yaoshirijizhubiao','gongchaiqinwu')}/></td>
						</tr>
						<tr>
							<td className="rji" colspan="2">人员或装备变动</td>
							<td className="rji" colspan="12"><Input id="teshuinput" style={{ width: '95%'}} value={yaoshirijizhubiao.renyuanzhuangbeibiandong} onChange={this.onInputChange.bind(this,'yaoshirijizhubiao','renyuanzhuangbeibiandong')}/></td>
						</tr>
						<tr>
							<td className="rji" colspan="2">装备、队容风纪、内务卫生检查情况</td>
							<td className="rji" colspan="12"><Input id="teshuinput" style={{ width: '95%'}} value={yaoshirijizhubiao.zhuangbeiduirongneiwujiancha} onChange={this.onInputChange.bind(this,'yaoshirijizhubiao','zhuangbeiduirongneiwujiancha')}/></td>
						</tr>
						{chapuchagangbiaotiOptions}
						{chapuchagangneirongOptions}
						<tr>
							<td className="rji" rowspan="4">派班情况</td>
							<td className="rji" colspan="1">职务</td>
							<td style={{ width: '8%'}} className="rji" colspan="1">交班者</td>
							<td style={{ width: '8%'}} className="rji" colspan="1">接班者</td>
							<td style={{ width: '8%'}} className="rji" colspan="3">组织者</td>
							<td className="rji" colspan="7">交接情况</td>
						</tr>
						<tr>
							<td style={{ width: '8%'}} className="rji" colspan="1">值班员</td>
							<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={paibanqingkuangcongbiao.zhibanyuanjiaobanzhe} onChange={this.onInputChange.bind(this,'paibanqingkuangcongbiao','zhibanyuanjiaobanzhe')}/></td>
							<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={paibanqingkuangcongbiao.zhibanyuanjiebanzhe} onChange={this.onInputChange.bind(this,'paibanqingkuangcongbiao','zhibanyuanjiebanzhe')}/></td>
							<td className="rji" colspan="3"><Input id="teshuinput" style={{ width: '95%'}} value={paibanqingkuangcongbiao.zuzhizhe} onChange={this.onInputChange.bind(this,'paibanqingkuangcongbiao','zuzhizhe')}/></td>
							<td className="rji" colspan="7" rowspan="3"><TextArea autosize={{minRows:3}} id="teshuinput" style={{ width: '95%'}} value={paibanqingkuangcongbiao.jiaojieqingkuang} onChange={this.onInputChange.bind(this,'paibanqingkuangcongbiao','jiaojieqingkuang')}/></td>
						</tr>
						<tr>
							<td style={{ width: '8%'}} className="rji" colspan="1">值日员</td>
							<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={paibanqingkuangcongbiao.zhiriyuanjiaobanzhe} onChange={this.onInputChange.bind(this,'paibanqingkuangcongbiao','zhiriyuanjiaobanzhe')}/></td>
							<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={paibanqingkuangcongbiao.zhiriyuanjiebanzhe} onChange={this.onInputChange.bind(this,'paibanqingkuangcongbiao','zhiriyuanjiebanzhe')}/></td>
							<td className="rji" rowspan="1" colspan="3">交接时间</td>
						</tr>
						<tr>
							<td style={{ width: '8%'}} className="rji" colspan="1">厨房值班员</td>
							<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={paibanqingkuangcongbiao.chufangzhibanyuanjiaobanzhe} onChange={this.onInputChange.bind(this,'paibanqingkuangcongbiao','chufangzhibanyuanjiaobanzhe')}/></td>
							<td className="rji" colspan="1"><Input id="teshuinput" style={{ width: '95%'}} value={paibanqingkuangcongbiao.chufangzhibanyuanjiebanzhe} onChange={this.onInputChange.bind(this,'paibanqingkuangcongbiao','chufangzhibanyuanjiebanzhe')}/></td>
							<td className="rji" colspan="3">
								<DatePicker
									showTime
									value={(paibanqingkuangcongbiao.jiaojieshijian !== null && paibanqingkuangcongbiao.jiaojieshijian !== '') ? moment(paibanqingkuangcongbiao.jiaojieshijian) : ''}
									placeholder="交接时间"
									format="MM-DD  HH:mm"
									style={{ width: '95%', minWidth:120}}
									onChange={this.onTimeChange.bind(this,'jiaojieshijian','0')}
								/>
							</td>
						</tr>
						{laiduijiashubiaotioneOptions}
						{laiduijiashubiaotitwoOptions}
						{laiduijiashuneirongOptions}
						{qingjiawaichubiaotiOptions}
						{qingjiawaichuneirongOptions}
						<tr>
							<td className="rji" rowspan="8">上级通知、指示及其他重大事项</td>
							<td className="rji" rowspan="8" colspan="13" ><TextArea autosize={{minRows:8}} id="teshuinput" style={{ width: '95%'}} value={yaoshirijizhubiao.shangjitongzhijiqitashixiang} onChange={this.onInputChange.bind(this,'yaoshirijizhubiao','shangjitongzhijiqitashixiang')}/></td>
						</tr>
                  	</tbody>
              	</table>
				<br/>
				<Button onClick={this.bianji.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

const AppForm = Form.create()(App);
export default AppForm;
