import React from 'react';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import {
    message,
    Select,
    LocaleProvider,
    Input,
    Form,
    Button,
} from 'antd';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.toCreate();
            }
        });
    }

    toCreate() {
        const THE = this;
        let form = THE.props.form;
        let shebeixuliehao = form.getFieldValue('shebeixuliehao');
        let juyuwangip = form.getFieldValue('juyuwangip');
        let juyuwangduankou = form.getFieldValue('juyuwangduankou');
        let weizhi = form.getFieldValue('weizhi');
        let yongtu = form.getFieldValue('yongtu');
        let shengchanchangjia = form.getFieldValue('shengchanchangjia');
        let zhanghao = form.getFieldValue('zhanghao');
        let mima = form.getFieldValue('mima');
        let obj = {};
        obj["shebeixuliehao"] = shebeixuliehao;
        obj["shebeileixing"] = "ZHINENGCHENG";
        obj["juyuwangip"] = juyuwangip;
        obj["juyuwangduankou"] =juyuwangduankou;
        obj["weizhi"] =weizhi;
        obj["yongtu"] = yongtu;
        obj["shengchanchangjia"] =shengchanchangjia;
        obj["zhanghao"] =zhanghao;
        obj["mima"] = mima;
        if (!confirm("确定添加此条记录吗？")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER + "addShebei",
            data:JSON.stringify(obj),
            dataType:'json',
            contentType: "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("添加成功");
                THE.backPage();
            }
        });

    }

    backPage() {
        let role=sessionStorage.getItem("ROLE");
        if(role=="中队"){
            window.location.href = "./zhongdui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
        }else {
            window.location.href = "./zhidui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
        }
    }

    render() {

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <LocaleProvider locale={zh_CN}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem label="设备序号">
                            {getFieldDecorator('shebeixuliehao', {
                                rules: [{ required: true, message: '请输入设备序号', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="IP地址&nbsp;&nbsp;&nbsp;&nbsp;">
                            {getFieldDecorator('juyuwangip', {
                                rules: [{ required: true, message: '请输入IP地址', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="端口号&#12288;">
                            {getFieldDecorator('juyuwangduankou', {
                                rules: [{ required: true, message: '请输入端口号', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="设备地点">
                            {getFieldDecorator('weizhi', {
                                rules: [{ required: true, message: '请输入设备地点', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="设备用途">
                            {getFieldDecorator('yongtu', {
                                rules: [{ required: true, message: '请选择设备用途', whitespace: true }],
                            })(
                                <Select style={{margin:5,width:200}}>
                                    <Select.Option value="DAMI">大米消耗秤</Select.Option>
                                    <Select.Option value="BAIMIAN">白面消耗秤</Select.Option>
                                    <Select.Option value="SHIYONGYOU">食用油消耗秤</Select.Option>
                                    <Select.Option value="JIANGYOU">酱油消耗秤</Select.Option>
                                    <Select.Option value="CU">醋消耗秤</Select.Option>
                                    <Select.Option value="YAN">盐消耗秤</Select.Option>
                                    <Select.Option value="HUANGDOU">黄豆消耗秤</Select.Option>
                                    <Select.Option value="DOUMO">豆沫消耗秤</Select.Option>
                                    <Select.Option value="YUMIMIAN">玉米面消耗秤</Select.Option>
                                    <Select.Option value="HUASHENGMI">花生米消耗秤</Select.Option>
                                    <Select.Option value="DIANFEN">淀粉消耗秤</Select.Option>
                                    <Select.Option value="HULATANG">胡辣汤消耗秤</Select.Option>
                                    <Select.Option value="XIAOMI">小米消耗秤</Select.Option>
                                    <Select.Option value="HEIMI">黑米消耗秤</Select.Option>
                                    <Select.Option value="LVDOU">绿豆消耗秤</Select.Option>
                                    <Select.Option value="BABAOZHOU">八宝粥消耗秤</Select.Option>
                                    <Select.Option value="MAIPIANZHOU">麦片粥消耗秤</Select.Option>
                                    <Select.Option value="DOUMIAN">豆面消耗秤</Select.Option>
                                    <Select.Option value="SHICAIRUKU">食材入库</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="生产厂家">
                            {getFieldDecorator('shengchanchangjia', {
                                rules: [{ required: true, message: '请输入生产厂家', whitespace: true }],
                            })(
                                <Select style={{margin:5,width:200}}>
                                    <Select.Option value="海康">海康</Select.Option>
                                    <Select.Option value="源鸿">源鸿</Select.Option>
                                    <Select.Option value="朗科">朗科</Select.Option>
                                    <Select.Option value="台衡">台衡</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="设备账号">
                            {getFieldDecorator('zhanghao', {
                                rules: [{ required: true, message: '请输入设备账号', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="设备密码">
                            {getFieldDecorator('mima', {
                                rules: [{ required: true, message: '请输入设备密码', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem>
                            <Button type="primary" icon="plus" htmlType="submit">保存</Button>
                        </FormItem>
                    </Form>
                </LocaleProvider>
            </div>
        );
    }
}

const AppForm = Form.create()(App);
export default AppForm;
