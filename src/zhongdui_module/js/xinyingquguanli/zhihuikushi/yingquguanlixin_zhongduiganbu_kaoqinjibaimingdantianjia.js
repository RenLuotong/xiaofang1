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
        this.props.form.validateFieldsAndScroll((err) => {
            if (!err) {
                this.toCreate();
            }
        });
    }

    toCreate() {
        const THE = this;
        let form = THE.props.form;
        let shebeixuliehao = form.getFieldValue('shebeixuliehao');
        let weizhi = form.getFieldValue('weizhi');
        let yongtu = form.getFieldValue('yongtu');
        let obj = {};
        obj["shebeixuliehao"] = shebeixuliehao;
        obj["shebeileixing"] = "考勤机";
        obj["weizhi"] =weizhi;
        obj["yongtu"] = yongtu;
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
        window.location.href = "./zhongdui.html#/yingquguanlixin_zhongduiganbu_kaoqinjiguanli";
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
                                rules: [{ required: true, message: '请输入设备用途', whitespace: true }],
                            })(
                                <Select style={{margin:5,width:200}}>
                                    <Select.Option value="巡更">巡更</Select.Option>
                                    <Select.Option value="查铺">查铺</Select.Option>
                                    <Select.Option value="请假销假">请假销假</Select.Option>
                                </Select>
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
