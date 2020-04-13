import React, { Component } from 'react';
import {
    Form, Input, Icon, Button, Select, InputNumber, message, DatePicker, Tag,Switch
} from 'antd';

let id = 0;

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            leixingList: [],
            List:[
            ],
            show: true,
            xiaofangcheList: [],
            ranshaowuList:[],
            ranshaowu:'',
            yanwuqingkuangList:[],
            yanwuqingkuang:'',
            zaihaichangsuoList:[],
            zaihaichangsuo:'',
            zaihaidengjiList:[],
            zaihaidengji:'',
            chujingleixingList:[],
            chujingleixing:'',
            jingqingpandingList:[],
            jingqingpanding:'',
        };
    }

    onChange(bianhao,checked){
        let xiaofangcheList = this.state.xiaofangcheList;
        if(checked === true){
            xiaofangcheList.push(bianhao);
        }else{
            for (var i = 0; i < xiaofangcheList.length; i++) {
                if (xiaofangcheList[i] == bianhao) {
                    xiaofangcheList.splice(i, 1);
                }
            }
        }
        this.setState({
            xiaofangcheList: xiaofangcheList,
        });
        console.log(xiaofangcheList)
    };

    tijiao(e) {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { form } = this.props;
        const {yanwuqingkuang, jingqingpanding,ranshaowu,zaihaichangsuo,zaihaidengji,chujingleixing} = this.state;
        e.preventDefault();

        this.props.form.validateFields((err, values) => {

            if (!err) {

                let baojingren = values.baojingren;
                if (typeof(baojingren) == "undefined" || baojingren == null ) {
                    baojingren='';
                }
                let baojingrenphone = values.baojingrenphone;
                if (typeof(baojingrenphone) == "undefined" || baojingrenphone == null ) {
                    baojingrenphone='';
                }
                let dizhijingdu = values.dizhijingdu;
                if (typeof(dizhijingdu) == "undefined" || dizhijingdu == null ) {
                    dizhijingdu='';
                }
                let dizhiweidu = values.dizhiweidu;
                if (typeof(dizhiweidu) == "undefined" || dizhiweidu == null ) {
                    dizhiweidu='';
                }
                let jingqingfenlei = values.jingqingfenlei;
                if (typeof(jingqingfenlei) == "undefined" || jingqingfenlei == null ) {
                    jingqingfenlei='';
                }
                let jingqingpanding = values.jingqingpanding;
                if (typeof(jingqingpanding) == "undefined" || jingqingpanding == null ) {
                    jingqingpanding='';
                }
                let zaihaichangsuo = values.zaihaichangsuo;
                if (typeof(zaihaichangsuo) == "undefined" || zaihaichangsuo == null ) {
                    zaihaichangsuo='';
                }
                let beikunrenshu = values.beikunrenshu;
                if (typeof(beikunrenshu) == "undefined" || beikunrenshu == null ) {
                    beikunrenshu='';
                }
                let danweimingcheng = values.danweimingcheng;
                if (typeof(danweimingcheng) == "undefined" || danweimingcheng == null ) {
                    danweimingcheng='';
                }
                let ranshaowu = values.ranshaowu;
                if (typeof(ranshaowu) == "undefined" || ranshaowu == null ) {
                    ranshaowu='';
                }
                let zaihaimiaoshu = values.zaihaimiaoshu;
                if (typeof(zaihaimiaoshu) == "undefined" || zaihaimiaoshu == null ) {
                    zaihaimiaoshu='';
                }
                let zaihaidizhi = form.getFieldValue('zaihaidizhi');
                 let xiaofangcheList = this.state.xiaofangcheList;
                if(xiaofangcheList.length<1){
                    message.warning("请选择消防车！");
                    return;
                }


                let obj = {};
                let resultMap = {};
                obj.baojingren = baojingren;
                obj.baojingrenlianxifangshi =baojingrenphone;
                obj.chujingleixing = chujingleixing;
                obj.zaihaidizhi = zaihaidizhi;
                obj.dizhiweidu = dizhiweidu;
                obj.dizhijingdu = dizhijingdu;
                obj.jingqingfenlei = jingqingfenlei;
                obj.zaihaidengji = zaihaidengji;
                obj.jingqingpanding = jingqingpanding;
                obj.zaihaichangsuo = zaihaichangsuo;
                obj.beikunrenshu = beikunrenshu;
                obj.danweimingcheng = danweimingcheng;
                obj.ranshaowu = ranshaowu;
                obj.zaihaimiaoshu = zaihaimiaoshu;
                obj.xiaofangche = xiaofangcheList;
                obj.yanwuqingkuang = yanwuqingkuang;

                // let xiaofangcheString = values.lx.toString();

                // var xiaofangcheList = xiaofangcheString.split(",");

                // let xiaofangche = [];
                // for (let i=0;i<xiaofangcheList.length;i++){
                //    if (xiaofangcheList[i] != null && xiaofangcheList[i]!="") {
                //        xiaofangche.push(xiaofangcheList[i])
                //    }
                // }

                // if (typeof(xiaofangche) == "undefined" || xiaofangche == null || xiaofangche.length === 0  ) {
                //     message.warning("请选择车辆");
                //     return;
                // }

                // let nary = xiaofangche.slice().sort();
                // for(let i=0;i<xiaofangche.length;i++){
                //     if (nary[i]==nary[i+1]){
                //         message.warning("同一车辆不能选择多次");
                //         return;
                //     }
                // }

                // resultMap.xiaofangche = xiaofangche;
                // resultMap.chujingjilu = obj;
                // console.log(resultMap);
                let THE = this;
                $.ajax({
                    type:'POST',
                    url: SERVER + "shoudongChujing",
                    data : JSON.stringify(obj),
                    dataType : 'json',
                    contentType : "application/json",
                    success: function (data) {
                        if (data.status != 0) {
                            message.warning(data.message);
                            return;
                        }
                        message.success("提交成功");
                        const { form } = THE.props;
                        THE.props.form.setFieldsValue(
                            {
                                baojingren :null,
                               baojingrenlianxifangshi :null,
                               chujingleixing :null,
                               zaihaidizhi :null,
                               dizhiweidu :null,
                                dizhijingdu :null,
                                jingqingfenlei :null,
                               zaihaidengji :null,
                               zaihaichangsuo :null,
                               beikunrenshu :null,
                               danweimingcheng :null,
                               ranshaowu :null,
                               jingqingpanding :null,
                               zaihaimiaoshu :null,
                               xiaofangcheList : [],
                               yanwuqingkuang :null,
                            }
                        )
                        THE.setState({
                            chujingleixing :null,
                            zaihaidengji :null,
                            jingqingpanding :null,
                            zaihaichangsuo :null,
                            ranshaowu :null,
                            yanwuqingkuang :null,
                        });
                        THE.backPage();
                    }
                });
            }
        });
    }

    backPage() {
		window.location.href = "./dadui.html#/qicai_daduiganbu_chujingjilu";
	}

    getXiaofangcheList = () => {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvxiaofangchedaliebiao",
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
                    List: list,
                });
            }
        });
    }

    getranshaowuList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvranshaowuxialaliebiao",
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
                    ranshaowuList: list,
                });
            }
        });
    }

    ranshaowuChange(value) {
        this.setState({
            ranshaowu: value,
        });
    }

    getjingqingpandingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvjingqingpandingxialaliebiao",
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
                    jingqingpandingList: list,
                });
            }
        });
    }

    jingqingpandingChange(value) {
        this.setState({
            jingqingpanding: value,
        });
    }

    getyanwuqingkuangList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvyanwuqingkuangxialaliebiao",
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
                    yanwuqingkuangList: list,
                });
            }
        });
    }

    yanwuqingkuangChange(value) {
        this.setState({
            yanwuqingkuang: value,
        });
    }

    getzaihaichangsuoList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvzaihaichangsuoxialaliebiao",
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
                    zaihaichangsuoList: list,
                });
            }
        });
    }

    zaihaichangsuoChange(value) {
        this.setState({
            zaihaichangsuo: value,
        });
    }

    getzaihaidengjiList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvzaihaidengjixialaliebiao",
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
                    zaihaidengjiList: list,
                });
            }
        });
    }

    zaihaidengjiChange(value) {
        this.setState({
            zaihaidengji: value,
        });
    }
    getchujingleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqvzaihaileixingxialaliebiao",
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
                    chujingleixingList: list,
                });
            }
        });
    }

    chujingleixingChange(value) {
        this.setState({
            chujingleixing: value,
        });
    }

    componentDidMount(){
        this.getXiaofangcheList();
        this.getranshaowuList();
        this.getyanwuqingkuangList();
        this.getjingqingpandingList();
        this.getzaihaichangsuoList();
        this.getzaihaidengjiList();
        this.getchujingleixingList();
        this.getXiaofangcheList();
    }

    render(){

        const { getFieldDecorator, getFieldValue } = this.props.form;
        const {yanwuqingkuang, jingqingpanding,ranshaowu,zaihaichangsuo,zaihaidengji,chujingleixing} = this.state;

        let ListOptions = this.state.List.map(item =>
            <div style={{marginLeft:50}}>
                <br/>    <span style={{fontSize:20,fontWeight:500}}><Icon type="car" />{item['jigoumingcheng']}</span>
                    {
                        item['xiashuzhongdui'].map(item =>
                            <div id="cardiv">
                                    <span style={{fontSize:18}}>{ item['jigoumingcheng']}</span>
                                    <hr id="myhr" />
                                 {
                                     item['xiaofangche'].map(item =>
                                         <div id="cardivs">
                                             <div style={{float:"left",margin:7}}>
                                                 <img src={xiaofangche + "timg.jpg"} style={{width:70,height:70,display:"block",marginBottom:10}}/>
                                                 <Switch onChange={this.onChange.bind(this,item.cheliangbianhao)} style={{marginRight:37,display:"block"}}/>
                                             </div>
                                                 <span title={item.xiaofangchemingcheng}>名称：{item.xiaofangchemingcheng}</span><br/>
                                                 <span title={item.chepaihaoma}>号码：{item.chepaihaoma}</span><br/>
                                                 <span title={item.xiaofangcheleixing}>类型：{item.xiaofangcheleixing}</span>
                                         </div>
                                     )
                                 }
                                 <br/><br/>
                             </div>
                            
                            )
                                    
                    }
            </div>
        );

        let ranshaowuOptions = this.state.ranshaowuList.map(item =>
            <Select.Option key={item['key']} value={item['value']}>{item['message']}</Select.Option>
        );
        let jingqingpandingOptions = this.state.jingqingpandingList.map(item =>
            <Select.Option key={item['key']} value={item['value']}>{item['message']}</Select.Option>
        );
        let yanwuqingkuangOptions = this.state.yanwuqingkuangList.map(item =>
            <Select.Option key={item['key']} value={item['value']}>{item['message']}</Select.Option>
        );
        let zaihaichangsuoOptions = this.state.zaihaichangsuoList.map(item =>
            <Select.Option key={item['key']} value={item['value']}>{item['message']}</Select.Option>
        );
        let zaihaidengjiOptions = this.state.zaihaidengjiList.map(item =>
            <Select.Option key={item['key']} value={item['value']}>{item['message']}</Select.Option>
        );
        let chujingleixingOptions = this.state.chujingleixingList.map(item =>
            <Select.Option key={item['key']} value={item['value']}>{item['message']}</Select.Option>
        );
        return(
            <div>
                <Form layout="inline" style={{margin:5}}>
                <Form.Item label="&#12288;报警人&#12288;">
                        {getFieldDecorator('baojingren')(
                            <Input style={{width:200}}/>
                        )}
                    </Form.Item>
                <Form.Item label="出警类型" style={{marginRight:20}}>
                    {getFieldDecorator('chujingleixing', {
                                rules: [{ required: true, message: '请选择出警类型', whitespace: true }],
                            })(
                        <Select
                            style={{width:200}}
                            onChange={this.chujingleixingChange.bind(this)}
                            value={chujingleixing}
                            showSearch
                            optionFilterProp="children"
                        >
                            {chujingleixingOptions}
                        </Select>
                            )}
                    </Form.Item>
                    <Form.Item label="灾害地址"style={{marginRight:20}}>
                    {getFieldDecorator('zaihaidizhi', {
                                rules: [{ required: true, message: '请选择灾害地址', whitespace: true }],
                            })(
                            <Input style={{width:200}}/>
                        )}
                    </Form.Item>
                    <Form.Item label="灾害等级"style={{marginRight:20}}>
                    {getFieldDecorator('zaihaidengji', {
                                rules: [{ required: true, message: '请选择灾害等级', whitespace: true }],
                            })(
                        <Select
                            style={{width:200}}
                            onChange={this.zaihaidengjiChange.bind(this)}
                            value={zaihaidengji}
                            showSearch
                            optionFilterProp="children"
                        >
                            {zaihaidengjiOptions}
                        </Select>
                            )}
                    </Form.Item>
                    <br/>
                    <Form.Item label="&#12288;报警电话">
                        {getFieldDecorator('baojingrenphone')(
                            <Input style={{width:200}}/>
                        )}
                    </Form.Item>
                    <Form.Item label="&#12288;地址经度">
                        {getFieldDecorator('dizhijingdu')(
                            <Input style={{width:200}}/>
                        )}
                    </Form.Item>
                    <Form.Item label="&#12288;地址纬度">
                        {getFieldDecorator('dizhiweidu')(
                            <Input style={{width:200}}/>
                        )}
                    </Form.Item>
                    <Form.Item label="&#12288;警情分类">
                        {getFieldDecorator('jingqingfenlei')(
                            <Input style={{width:200}}/>
                        )}
                    </Form.Item>

                    <br/>
                    <Form.Item label="&#12288;警情判定">
                        <Select
                            style={{width:200}}
                            onChange={this.jingqingpandingChange.bind(this)}
                            value={jingqingpanding}
                            showSearch
                            optionFilterProp="children"
                        >
                            <Select.Option value="-1">全部</Select.Option>
                            {jingqingpandingOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item label="&#12288;灾害场所">
                        <Select
                            style={{width:200}}
                            onChange={this.zaihaichangsuoChange.bind(this)}
                            value={zaihaichangsuo}
                            showSearch
                            optionFilterProp="children"
                        >
                            <Select.Option value="-1">全部</Select.Option>
                            {zaihaichangsuoOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item label="&#12288;被困人数">
                        {getFieldDecorator('beikunrenshu')(
                            <Input style={{width:200}}/>
                        )}
                    </Form.Item>
                    <Form.Item label="&#12288;单位名称">
                        {getFieldDecorator('danweimingcheng')(
                            <Input style={{width:200}}/>
                        )}
                    </Form.Item>
                    <br/>
                    <Form.Item label="&#12288;燃烧物&#12288;">
                        <Select
                            style={{width:200}}
                            onChange={this.ranshaowuChange.bind(this)}
                            value={ranshaowu}
                            showSearch
                            optionFilterProp="children"
                        >
                            <Select.Option value="-1">全部</Select.Option>
                            {ranshaowuOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item label="&#12288;烟雾情况">
                        <Select
                            style={{width:200}}
                            onChange={this.yanwuqingkuangChange.bind(this)}
                            value={yanwuqingkuang}
                            showSearch
                            optionFilterProp="children"
                        >
                            <Select.Option value="-1">全部</Select.Option>
                            {yanwuqingkuangOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item label="&#12288;灾害描述">
                        {getFieldDecorator('zaihaimiaoshu')(
                            <Input style={{width:200}}/>
                        )}
                    </Form.Item>
                    <br/> <br/>
                    <Form.Item >
                    <div>
                      {ListOptions}
                     </div>
                    </Form.Item>
                    <br/>
                    <Form.Item>
                        <Button type="primary" onClick={this.tijiao.bind(this)}>提交</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(App);
export default WrappedApp;