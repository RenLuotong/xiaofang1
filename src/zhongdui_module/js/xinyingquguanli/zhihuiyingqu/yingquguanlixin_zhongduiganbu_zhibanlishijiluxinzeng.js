import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {
    message,
    DatePicker,
    Icon,
    Input,
    Form,
    Button,
    Table,
    Divider,
    Select,
    Popconfirm,
    Modal,
    Popover,
    Upload, InputNumber,Radio
} from 'antd';
import moment from "moment";




class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />
                </Switch>
            </div>
        );
    }
}

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            renyuanList: [],
            startValue: null,
            endValue: null,
            shijianduanList:[],
            shijianduanList2:[],
            visible: false,
            visible2: false,
            currentTime:new Date(),
            er:'',
            yi:'',
        };
    }

    renyuanList() {
        let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqudangqianyingquRenyuanLiebiao?jigoumingcheng=" + jigoumingcheng,
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
                    renyuanList: list,
                });
            }
        });
    }

   
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onStartChange = (value) => {
        this.onChange('startValue', value);
        this.fetch2(value);
    }
    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    toCreate(e){
        const THE = this;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        let shijianduanList=this.state.shijianduanList;
        let startValue =this.state.startValue;
        if (typeof(startValue) == "undefined"||startValue == null) {
            message.warning("请选择值班日期");
            return;
        } else {
            startValue = moment(startValue).format('YYYY-MM-DD');
        }
        e.preventDefault();
    	this.props.form.validateFields((err, values) => {
      		if (!err) {
                let obj={};
                let paibanList=[];
                for(let i=0;i<shijianduanList.length;i++){
                     let yihao = values.sl[i];
                    if (typeof(yihao) == "undefined"||yihao == null||yihao=='') {
                        message.warning("请选择一号值班人");
                        return;
                    }
                     var erhao = values.gg[i];
                    if (typeof(erhao) == "undefined"||erhao == null||erhao=='') {
                        erhao = "+";
                        // message.warning("请选择二号值班人");
                        // return;
                    }
                    if(erhao==yihao){
                        message.warning("值班人不能为同一人");
                        return;
                    }
                    if(shijianduanList[i]['qishiIsNext']== true){
                        shijianduanList[i]['qishiIsNext']="是"
                    }else{
                        shijianduanList[i]['qishiIsNext']="否"
                    }
                    if(shijianduanList[i]['jiezhiIsNext']== true){
                        shijianduanList[i]['jiezhiIsNext']="是"
                    }else{
                        shijianduanList[i]['jiezhiIsNext']="否"
                    }
                    console.log(yihao+erhao);
                    let yihaobianhao = yihao.split('+')[1];
                    let erhaohaobianhao = erhao.split('+')[1];
                    console.log(yihaobianhao+'+'+erhaohaobianhao);
                     let paiban={};
                    paiban.kaishishijian = shijianduanList[i]['qishishijian'];
                    paiban.jieshushijian = shijianduanList[i]['jiezhishijian'];
                    paiban.kaishiIsNext =shijianduanList[i]['qishiIsNext'];
                    paiban.jieshuIsNext =shijianduanList[i]['jiezhiIsNext'];
                    paiban.yihaozhibanren = yihaobianhao;
                    paiban.erhaozhibanren = erhaohaobianhao;
                    paiban.id = "";
                    paibanList.push(paiban);
                }
                obj.paibanList=paibanList;
                obj.riqi=startValue;
                console.log(obj);
                if (!confirm("确定新增此值班记录")) {
                    return;
                }
                $.ajax({
                        type:'POST',
                        url:SERVER+"tbZhiban/paiban",
                        data:JSON.stringify(obj),
                        dataType:'json',
                        contentType: "application/json",
                        success:function(data){
                            if(data.status != 0){
                                message.warning(data.message);
                                return;
                            }
                            message.success(data.message);
                            THE.backPage();
                        }
                    });
          }});
    }

    fetch = () => {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "tbPaibanShijian/findAll",
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
                    shijianduanList: list,
                });
            }
        });
    }
    fetch2 = (startValue) => {
        const THE = this;
        var startValue = moment(startValue).format('YYYY-MM-DD');
        if(startValue == "Invalid date"){
            return;
        }
        $.ajax({
            type:'GET',
            url: SERVER + "tbZhiban/paibanchakan?riqi="+startValue,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.paibanList.length; i++) {
                    if(data.data.paibanList[i].erhaozhibanren == null){
                        data.data.paibanList[i].erhaozhibanren = "";
                    }
                    if(data.data.paibanList[i].erhaozhibanrenbianhao == null){
                        data.data.paibanList[i].erhaozhibanrenbianhao = "";
                    }
                    console.log(i);
                    console.log(data.data.paibanList[i].yihaozhibanren);
                   // data.data[i]["key"] = i;
                   THE.props.form.setFieldsValue({
                        [`sl[${i}]`] : data.data.paibanList[i].yihaozhibanren+"                          +"+data.data.paibanList[i].yihaozhibanrenbianhao,
                    });
                    THE.props.form.setFieldsValue({
                        [`gg[${i}]`] : data.data.paibanList[i].erhaozhibanren+"                          +"+data.data.paibanList[i].erhaozhibanrenbianhao,
                    });
                   
                }
                let shijianduanList =THE.state.shijianduanList
                if(data.data.paibanList.length == 0){
                    for(let i=0; i<shijianduanList.length;i++){
                        THE.props.form.setFieldsValue({
                            [`sl[${i}]`] : "                     ",
                        });
                        THE.props.form.setFieldsValue({
                            [`gg[${i}]`] :"                     ",
                        });
                    }
                }
            }
        });
    }

    // backPage() {
    //     let role=sessionStorage.getItem("ROLE");
    //     if(role=="中队"){
    //         window.location.href = "./zhongdui.html#/yingquguanlixin_zhongduiganbu_zhibanlishijilu";
    //     }
    //     else if (role=="大队") {
    //         window.location.href = "./dadui.html#/yingquguanlixin_zhongduiganbu_zhibanlishijilu";
    //     }else {
    //         window.location.href = "./zhidui.html#/yingquguanlixin_zhongduiganbu_zhibanlishijilu";
    //     }
    // }
    backPage(){
       window.location.href ="./zhongdui.html#/yingquguanlixin_zhibanguanliyuan_zhibanlishijilu";
    }

    disabledStartDate = (startValue) => {
        const current=this.state.currentTime;
        if (!startValue || !current) {
            return false;
        }
        return startValue.valueOf()<=current.valueOf();
    }

    yihao = ''
    yihaoChange(value) {
        this.yihao = value.target.value;
        this.setState({
            yi: value.target.value,
        });
       
    }
    erhao = ''
    erhaoChange(value) {
        this.erhao = value.target.value;
        this.setState({
            er: value.target.value,
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    hideModal = () => {
        this.setState({
            visible: false,
            yi: '',
        });
    }

    hideModal2 = () => {
        this.setState({
            visible2: false,
            er: '',
        });
    }

    queren = () => {
        let index = this.state.index;
        let yihao = this.yihao;
        this.props.form.setFieldsValue({
            [`sl[${index}]`] : yihao,
        });
        
        this.setState({
            visible: false,
            yi:'',
        });
        this.yihao = '';
    }
    queren2 = () => {
        let index = this.state.index2;
        let erhao = this.erhao;
        this.props.form.setFieldsValue({
            [`gg[${index}]`] : erhao,
        });
        this.setState({
            visible2: false,
            index2:'',
            er: '',
        });
        this.erhao = '';
    }
    
    
    bianji(index) {
        console.log(index)
        this.setState({
            visible: true,
            index:index
        })
    }

    bianji2(index) {
        console.log(index)
        this.setState({
            visible2: true,
            index2:index
        })
    }


    componentDidMount() {
        this.renyuanList();
        this.fetch();
    }

    render() {
        let renyuanList = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>);
        let renyuanListOptions = this.state.renyuanList.map(item =>  <Radio value={item['xingming']+"                      +"+item['renyuanbianhao']} style={{width:58,margin:5}}>{item['xingming']}</Radio>);
        const { startValue, endValue,er,yi} = this.state;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const FormItem = Form.Item;
        const formItemss = this.state.shijianduanList.map((item,index) => {
            const format = 'HH:mm';
    		return (
    			<div key={index}>
                    <FormItem 
	    				required={false}
	    				key={index}>
                    值班计划时间:
                    {item['qishiIsNext'] == true &&  item['jiezhiIsNext'] ==true?
                        <Input style={{margin:10,width:200}} disabled id="dengluming" name="shijian" value={'次日'+item['qishishijian']+'~'+'次日'+item['jiezhishijian']}  />
                        :(
                        item['qishiIsNext'] ==true &&  item['jiezhiIsNext'] ==false?
                        <Input style={{margin:10,width:200}} disabled id="dengluming" name="shijian" value={'次日'+item['qishishijian']+'~'+item['jiezhishijian']}  />
                        :(
                        item['qishiIsNext'] ==false &&  item['jiezhiIsNext'] ==true?
                        <Input style={{margin:10,width:200}} disabled id="dengluming" name="shijian" value={item['qishishijian']+'~'+'次日'+item['jiezhishijian']}  />
                        :(
                        (item['qishiIsNext'] ==false &&  item['jiezhiIsNext'] ==false?
                        <Input style={{margin:10,width:200}} disabled id="dengluming" name="shijian" value={item['qishishijian']+'~'+item['jiezhishijian']}  />
                        :(
                        <span></span>
                        )))))}
                                
                    计划1号值班人&nbsp;&#12288;:
                    {getFieldDecorator
		        			(`sl[${index}]`, {
			        		})
			        		(
                                <Input style={{margin:10,width:100 }} disabled/>

			        		)
	    				}
                    <Button onClick={this.bianji.bind(this,index)} style={{margin:5}}>选择值班人</Button>
                    计划2号值班人&nbsp;&#12288;:
                    {getFieldDecorator
		        			(`gg[${index}]`, {
			        		})
			        		(
                                <Input style={{margin:10,width:100 }} disabled/>
			        		)
	    				}
                         <Button onClick={this.bianji2.bind(this,index)} style={{margin:5}}>选择值班人</Button>
                    </FormItem>
                    <br/>
               
		      	</div>
		    )
    	});

        return (
            <div>
                 <Modal
                 title="请选择1号值班人"
                 width={700}
                 visible={this.state.visible}
                 onOk={this.queren}
                 onCancel={this.hideModal}
                 okText="确认"
                 cancelText="取消"
                 >
                    <Radio.Group 
                    onChange={this.yihaoChange.bind(this)}
                    value={yi}
                    >
                        {renyuanListOptions}
                    </Radio.Group>
                </Modal>
                <Modal
                 title="请选择2号值班人"
                 width={700}
                 visible={this.state.visible2}
                 onOk={this.queren2}
                 onCancel={this.hideModal2}
                 okText="确认"
                 cancelText="取消"
                 >
                    <Radio.Group onChange={this.erhaoChange.bind(this)} value={er}>
                        {renyuanListOptions}
                    </Radio.Group>
                </Modal>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="值班日期&nbsp;&#12288;&#12288;">
                        {getFieldDecorator('kaishishijian')(
                            <DatePicker
                                value={startValue}
                                placeholder="值班日期"
                                format="YYYY-MM-DD"
                                disabledDate={this.disabledStartDate}
                                onChange={this.onStartChange}
                                style={{width:200}}
                            />
                        )}
                    </FormItem><br/>
                    {formItemss}
                    <FormItem >
                        <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
                    </FormItem>
                    <br/>
                 </Form>
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
