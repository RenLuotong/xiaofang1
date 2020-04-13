import React from 'react';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import {
    message,
    Select,
    LocaleProvider,
    Input,
    Form,
    Button, Upload, Modal, Icon,
} from 'antd';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            kaoqinjiyongtuList: [],
        };
    }

    getkaoqinjiyongtuList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "huoquKaoqinjiyongtuEnumMeiju",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for(let i = 0;i<data.data.length;i++){
                    list.push(data.data[i]);
                }
                console.log(list)
                THE.setState({
                    kaoqinjiyongtuList: list,
                });
            }
        });
    }


    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({fileList}) => {
        this.setState({
            fileList: fileList,
        });
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
        let juyuwangip = form.getFieldValue('juyuwangip');
        let juyuwangduankou = form.getFieldValue('juyuwangduankou');
        let zhanghao = form.getFieldValue('zhanghao');
        let mima = form.getFieldValue('mima');
        let fileList = THE.state.fileList;
        let shebeizhaopian = '';
        if (fileList.length > 0) {
            shebeizhaopian = fileList[0]['response'];
        }
        let tbYingqushebei = {};
        tbYingqushebei["shebeixuliehao"] = shebeixuliehao;
        tbYingqushebei["weizhi"] = weizhi;
        tbYingqushebei["yongtu"] =yongtu;
        tbYingqushebei["juyuwangip"] = juyuwangip;
        tbYingqushebei["juyuwangduankou"] = juyuwangduankou;
        tbYingqushebei["zhanghao"] = zhanghao;
        tbYingqushebei["mima"] = mima;
        tbYingqushebei["shebeizhaopian"] = shebeizhaopian;
        if (!confirm("确定添加这个考勤机吗？")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER + "tianjiaKaoqinji",
            data:JSON.stringify(tbYingqushebei),
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

    componentDidMount() {
        this.getkaoqinjiyongtuList();
    }


    render() {

        let kaoqinjiyongtuListOptions = this.state.kaoqinjiyongtuList.map(item =>
            <Select.Option key={item['key']} value={item['key']}>{item['value']}</Select.Option>
        );

        let uploadProps = {
            name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

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
                        <FormItem label="设备地点&#12288;">
                            {getFieldDecorator('weizhi', {
                                rules: [{ required: true, message: '请输入设备地点', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="设备用途">
                            {getFieldDecorator('yongtu', {
                                rules: [{ required: true, message: '请输入设备用途', whitespace: true }],
                            })(
                                <Select style={{margin:5,width:200}}>
                                    {kaoqinjiyongtuListOptions}
                                </Select>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="局域网IP">
                            {getFieldDecorator('juyuwangip', {
                                rules: [{ required: true, message: '请输入局域网IP', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="局域网端口">
                            {getFieldDecorator('juyuwangduankou', {
                                rules: [{ required: true, message: '请输入局域网端口', whitespace: true }],
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="&nbsp;&nbsp;&nbsp;账号&#12288;&#12288;">
                            {getFieldDecorator('zhanghao', {
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="&nbsp;&nbsp;&nbsp;密码&#12288;&#12288;">
                            {getFieldDecorator('mima', {
                            })(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <br/>
                        <FormItem label="&nbsp;&nbsp;&nbsp;设备图片">
                            <div>
                                <Upload
                                    {...uploadProps}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                                <div style={{clear:"both"}}></div>
                            </div>
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
