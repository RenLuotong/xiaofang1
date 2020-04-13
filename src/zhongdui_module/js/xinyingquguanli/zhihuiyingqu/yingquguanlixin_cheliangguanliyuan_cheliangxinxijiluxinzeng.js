import React from 'react';
import {
    message,
    Select,
    Input,
    Form,
    Button
} from 'antd';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bumenList:[],
            //显示所属部门框
            showbumen: 'none',
            //显示车主姓名框
            showguanliren: 'none',
            renyuanList: [],
        };
    }

    renyuanList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoqudangqianyingquRenyuanLiebiao",
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

    //创建申请
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err) => {
            if (!err) {
                this.toCreate();
            }
        });
    }

    //创建申请
    toCreate() {
        const THE = this;
        let form = THE.props.form;
        let cheliangpinpai = form.getFieldValue('cheliangpinpai');
        if (typeof(cheliangpinpai) == "undefined" || cheliangpinpai == null || cheliangpinpai == "") {
            message.warning("请输入车辆品牌");
            return;
        }
        let chepaihaoma = form.getFieldValue('chepaihaoma');
        if (typeof(chepaihaoma) == "undefined" || chepaihaoma == null || chepaihaoma == "") {
            message.warning("请输入车牌号码");
            return;
        }
        let cheliangleixing = form.getFieldValue("cheliangleixing");
        if (typeof(cheliangleixing) == "undefined") {
            message.warning("请选择车辆类别");
            return;
        }
        // let suosubumen = form.getFieldValue('suosubumen');
        // if (typeof(suosubumen) == "undefined") {
        //     suosubumen = '';
        //     if (cheliangleixing == "公务车") {
        //     	message.warning("公务车请选择所属部门");
        //         return;
        //     }
        // }
        let gpsid = form.getFieldValue('gpsid');
        if (typeof(gpsid) == "undefined" || gpsid == null || gpsid == "") {
            gpsid = '';
            if (cheliangleixing == "公务车") {
                message.warning("公务车请输入GPS设备ID");
                return;
            }
        }
        let cheliangguanliren = form.getFieldValue('chezhuxingming');
        if (typeof(cheliangguanliren) == "undefined") {
            cheliangguanliren = '';
            if (cheliangleixing == "私家车") {
                message.warning("私家车请选择车主");
                return;
            }
        }
        let obj = {};
        obj["cheliangpinpai"] = cheliangpinpai;
        obj["chepaihaoma"] = chepaihaoma;
        obj["cheliangleixing"] = cheliangleixing;
        // obj["suosubumen"] = suosubumen;
        obj["gpsshebeiid"] = gpsid;
        obj["cheliangguanliren"] = cheliangguanliren;
        if (!confirm("确定添加车辆信息")) {
            return;
        }
        $.ajax({
            type:'POST',
            url:SERVER+"addYingqucheliang",
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
    }

    //获取部门list
    getBumenList() {
        const THE = this;
        let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
        $.ajax({
            type:'GET',
            url: SERVER+ "bumenXialaLiebiao?jigoumingcheng="+jigoumingcheng,
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
                    bumenList: list,
                });
            }
        });
    }

    //选择公务车或私家车出现不同的选框
    liandong(value) {
        const THE = this;
        if(value == '公务车'){
            THE.setState({
                showbumen: 'inline-block',
                showguanliren: 'none'
            });
        }else if(value == '私家车'){
            THE.setState({
                showbumen: 'none',
                showguanliren: 'inline-block'
            });
        }
    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu";
        }else {
            window.location.href = "./zhidui.html#/yingquguanlixin_cheliangguanliyuan_cheliangxinxijilu";
        }
    }

    componentDidMount() {
        this.getBumenList();
        this.renyuanList();
    }

    render() {

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        let bumenOptions = this.state.bumenList.map(item => <Select.Option key={item['key']} value={item['bumenmingcheng']}>{item['bumenmingcheng']}</Select.Option>);

        let renyuanList = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>);

        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem label="车辆品牌">
                        {getFieldDecorator('cheliangpinpai', {
                        })(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="车牌号码">
                        {getFieldDecorator('chepaihaoma', {
                        })(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="车辆类别">
                        {getFieldDecorator('cheliangleixing', {
                        })(
                            <Select style={{width:200}} onChange={this.liandong.bind(this)}>
                                <Select.Option value="公务车">公务车</Select.Option>
                                <Select.Option value="私家车">私家车</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    <br/>
                    {/*<FormItem label="所属部门" style={{display: this.state.showbumen}}>*/}
                    {/*    {getFieldDecorator('suosubumen', {*/}
                    {/*    })(*/}
                    {/*        <Select style={{width:200}}>*/}
                    {/*            {bumenOptions}*/}
                    {/*        </Select>*/}
                    {/*    )}*/}
                    {/*</FormItem>*/}
                    <FormItem label="GPS设备ID" style={{display: this.state.showbumen}}>
                        {getFieldDecorator('gpsid', {
                        })(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="车主姓名" style={{display: this.state.showguanliren}}>
                        {getFieldDecorator('chezhuxingming', {
                        })(
                            <Select style={{width:200}}>
                                {renyuanList}
                            </Select>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button type="primary" icon="plus" htmlType="submit">保存</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const AppForm = Form.create()(App);
export default AppForm;
