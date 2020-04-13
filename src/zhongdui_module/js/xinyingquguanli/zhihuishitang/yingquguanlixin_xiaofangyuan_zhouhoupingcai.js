import React, { Component } from 'react';
import {
    Form,Input,Icon,Button,Select,InputNumber,message
} from 'antd';

let id = 0;

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            leixingList: [],
        };
    }

    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    tijiao(e){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const keys = getFieldValue('keys');
        console.log(keys);
        if (keys.length == 0) {
            message.warning("请选择菜");
            return;
        }
        const { form } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let postList = [];
                for (let i = 0; i < keys.length; i++) {
                    let caiming = values.lx[keys[i]];
                    if (typeof(caiming) == "undefined") {
                        message.warning("请选择菜");
                        return;
                    }
                    let fenlei = values.xcfl[keys[i]];
                    if (typeof(fenlei) == "undefined") {
                        message.warning("请选择分类");
                        return;
                    }
                    let caipinxingji = values.cpxj[keys[i]];
                    if (typeof(caipinxingji) == "undefined") {
                        message.warning("请输入星级");
                        return;
                    }
                    let xuancailiyou = values.xcly[keys[i]];
                    if (typeof(xuancailiyou) == "undefined") {
                        message.warning("请输入理由");
                        return;
                    }
                    let obj = {};
                    obj.caiming = caiming;
                    obj.fenlei = fenlei;
                    obj.caipinxingji = caipinxingji;
                    obj.xuancailiyou = xuancailiyou;
                    postList.push(obj);
                }
                let juese = '二级库管员'
                let erjiKuncunShenqingVm = {};
                erjiKuncunShenqingVm.list = postList;
                const THE = this;
                // $.ajax({
                //     type:'POST',
                //     url: SERVER + "erjikuKucunShenqing?juese="+juese,
                //     data : JSON.stringify(erjiKuncunShenqingVm),
                //     dataType : 'json',
                //     contentType : "application/json",
                //     success: function (data) {
                //         if (data.status != 0) {
                //             message.warning(data.message);
                //             return;
                //         }
                //         message.success("申请成功");
                //         setTimeout(THE.backPage(),1000);
                //     }
                // });
            }
        });
    }

    backPage() {
        window.location.href = "./zhongdui.html#/gerenfanghu_erjikuguanyuan_kucunshenqingjilu";
    }

    getleixingList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "zhuangbeileixingliebiao?zhuangbeileibiemingcheng=个人防护装备",
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
                    leixingList: list,
                });
            }
        });
    }

    componentDidMount(){
        this.getleixingList();
    }

    render(){
        let leixingOptions = this.state.leixingList.map(item =>
            <Select.Option key={item['key']} value={item['zhuangbeileixingmingcheng']}>{item['zhuangbeileixingmingcheng']}</Select.Option>
        );
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <div
                    key={k}
                >
                    <Form.Item
                        required={false}
                        key={k}
                    >
                        菜品名称 :
                        {getFieldDecorator
                        (`lx[${k}]`, {
                        })
                        (
                            <Select
                                style={{margin:10,width:160 }}
                                showSearch
                                optionFilterProp="children"
                            >
                                {leixingOptions}
                            </Select>
                        )
                        }
                        选菜分类 :
                        {getFieldDecorator
                        (`xcfl[${k}]`, {
                        })
                        (
                            <Select
                                style={{margin:10,width:160 }}
                                showSearch
                                optionFilterProp="children"
                            >
                                <Select.Option value="十佳菜">十佳菜</Select.Option>
                                <Select.Option value="改进菜">改进菜</Select.Option>
                            </Select>
                        )
                        }
                        菜品星级 :
                        {getFieldDecorator
                        (`cpxj[${k}]`, {
                        })
                        (
                            <Input style={{margin:10,width:160 }} />
                        )
                        }
                        选菜理由 :
                        {getFieldDecorator
                        (`xcly[${k}]`, {
                        })
                        (
                            <Input style={{margin:10,width:160 }} />
                        )
                        }
                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        ) : null}
                    </Form.Item>
                    <br/>
                </div>
            )
        });

        return(
            <Form onSubmit={this.handleSubmit} layout="inline">
                {formItems}
                <Form.Item>
                    <Button type="dashed" onClick={this.add} style={{ width: '200px' }}>
                        <Icon type="plus" />我要评菜
                    </Button>
                </Form.Item>
                <br/>
                <Form.Item>
                    <Button type="primary" onClick={this.tijiao.bind(this)}>提交</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(App);
export default WrappedApp;