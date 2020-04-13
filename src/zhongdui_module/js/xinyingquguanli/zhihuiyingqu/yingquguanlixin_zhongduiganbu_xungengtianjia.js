import React from 'react';
import moment from 'moment';
import {
    message,
    DatePicker,
    FormItem,
    TimePicker,
    Checkbox,
    Input,
    Button,
    Transfer,
    Form
} from 'antd';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            mockData: [],//穿梭框左侧栏
            targetKeys: [],//穿梭框右侧栏
            checkedList: [],
            startValue: null,
            endValue: null,
            endOpen: false,
            startValue2: null,
            endValue2: null,
            endOpen2: false,
        };
    }

    onChangeCheckbox = (checkedList) => {
        this.setState({
            checkedList,
        });
    }

    toCreate() {
        const THE = this;
        let form = THE.props.form;
        let shebeibianhaoList = this.state.targetKeys;
        let xungengdidianshuliang = shebeibianhaoList.length;
        if (typeof(xungengdidianshuliang) == "undefined"||xungengdidianshuliang == 0) {
            message.warning("请选择巡更路线");
            return;
        }
        let xungengmingcheng = form.getFieldValue('xungengmingcheng');
        if (typeof(xungengmingcheng) == "undefined"||xungengmingcheng == null) {
            message.warning("请填入巡更名称");
            return;
        }
        let kaishiriqi = form.getFieldValue('kaishiriqi');
        if (typeof(kaishiriqi) == "undefined"||kaishiriqi == null) {
            message.warning("请选择开始日期");
            return;
        } else {
            kaishiriqi = moment(kaishiriqi).format('YYYY-MM-DD');
        }
        let jieshuriqi = form.getFieldValue('jieshuriqi');
        if (typeof(jieshuriqi) == "undefined"||jieshuriqi == null) {
            message.warning("请选择结束日期");
            return;
        } else {
            jieshuriqi = moment(jieshuriqi).format('YYYY-MM-DD');
        }
        let shijianfanweikaishi = form.getFieldValue('shijianfanweikaishi');
        if (typeof(shijianfanweikaishi) == "undefined"||shijianfanweikaishi == null) {
            message.warning("请选择开始时间");
            return;
        } else {
            shijianfanweikaishi = moment(shijianfanweikaishi).format('HH:mm:ss');
        }
        let shijianfanweijieshu = form.getFieldValue('shijianfanweijieshu');
        if (typeof(shijianfanweijieshu) == "undefined"||shijianfanweijieshu == null) {
            message.warning("请选择结束时间");
            return;
        } else {
            shijianfanweijieshu = moment(shijianfanweijieshu).format('HH:mm:ss');
        }
        let xingqifanweiList = form.getFieldValue('xingqifanwei');
        let xingqifanwei = "";
        if (typeof(xingqifanweiList) == "undefined"||xingqifanweiList == []) {
        	message.warning("请选择星期范围结束");
            return;
        } else {
	        xingqifanweiList.sort();
	        for (let i = 0; i < xingqifanweiList.length; i++) {
	            xingqifanwei = xingqifanwei + xingqifanweiList[i] + ",";
	        }
	        xingqifanwei = xingqifanwei.substring(0,xingqifanwei.length-1);
        }

        let obj = {};
		obj["xungengmingcheng"] = xungengmingcheng;
        obj["shebeibianhaoList"] = shebeibianhaoList;
        obj["kaishiriqi"] = kaishiriqi;
        obj["jieshuriqi"] = jieshuriqi;
        obj["shijianfanweikaishi"] = shijianfanweikaishi;
        obj["shijianfanweijieshu"] = shijianfanweijieshu;
        obj["xungengdidianshuliang"] = xungengdidianshuliang;
        obj["xingqifanwei"] = xingqifanwei;
        obj["leixing"] = '巡更';
        if (!confirm("确定添加此巡更计划！")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER + "tianjiaxungengjihua",
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
            window.location.href = "./zhongdui.html#/yingquguanli_zhongduiganbu_xungengshezhi";
        }
        else if (role=="大队") {
            window.location.href = "./dadui.html#/yingquguanli_zhongduiganbu_xungengshezhi";
        }else {
            window.location.href = "./zhidui.html#/yingquguanli_zhongduiganbu_xungengshezhi";
        }
    }

    getMock = () => {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER+ "shebeiList?shebeileixing=KAOQINJI&page=0&size=10000",
            success: function (data) {
                const mockData = [];//数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外
                for (var i = 0; i < data.data.content.length; i++) {
                    var data11 = {
                        key: data.data.content[i].shebeibianhao,
                        description: data.data.content[i].weizhi,
                        title: data.data.content[i].weizhi,
                    };
                    if (data.data.content[i].yongtu == "巡更") {
                    	mockData.push(data11);
                    }
                }
                THE.setState({
                    mockData: mockData,
                });
            }
        });
    }

    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    }

    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    onStartChange2 = (value) => {
        this.onChange('startValue2', value);
    }

    onEndChange2 = (value) => {
        this.onChange('endValue2', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    handleStartOpenChange2 = (open2) => {
        if (!open2) {
            this.setState({ endOpen2: true });
        }
    }

    handleEndOpenChange2 = (open2) => {
        this.setState({ endOpen2: open2 });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.toCreate();
            }
        });
    }

    componentDidMount() {
        this.getMock();
    }

    render() {
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const CheckboxGroup = Checkbox.Group;
        const plainOptions = [
            { label: '周一', value: '1' },
            { label: '周二', value: '2' },
            { label: '周三', value: '3' },
            { label: '周四', value: '4' },
            { label: '周五', value: '5' },
            { label: '周六', value: '6' },
            { label: '周日', value: '7' }
        ];
        const { startValue, endValue, endOpen, startValue2, endValue2, endOpen2 } = this.state;

        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem label="巡更名称">
                        {getFieldDecorator('xungengmingcheng',{
                        })(
                            <Input style={{margin: 10, width: 200}}/>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="日期范围">
                        {getFieldDecorator('kaishiriqi',{
                        })(
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                format="YYYY-MM-DD"
                                value={startValue}
                                placeholder="开始日期"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                                style={{margin: 10, width: 200}}
                            />
                        )}
                        <a>---</a>
                        {getFieldDecorator('jieshuriqi',{
                        })(
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                format="YYYY-MM-DD"
                                value={endValue}
                                placeholder="结束日期"
                                onChange={this.onEndChange}
                                onOpenChange={this.handleEndOpenChange}
                                open={endOpen}
                                style={{margin: 10, width: 200}}
                            />
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="星期范围">
                        {getFieldDecorator('xingqifanwei', {
                        })(
                            <CheckboxGroup
                                options={plainOptions}
                                value={this.state.checkedList}
                                onChange={this.onChangeCheckbox}
                                style={{margin: 10}}
                            />
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="时间范围">
                        {getFieldDecorator('shijianfanweikaishi',{
                        })(
                            <TimePicker
                                showTime
                                format="HH:mm:ss"
                                value={startValue2}
                                placeholder="开始时间"
                                onChange={this.onStartChange2}
                                onOpenChange={this.handleStartOpenChange2}
                                style={{margin: 10, width: 200}}
                            />
                        )}
                        <a>---</a>
                        {getFieldDecorator('shijianfanweijieshu',{
                        })(
                            <TimePicker
                                showTime
                                format="HH:mm:ss"
                                value={endValue2}
                                placeholder="结束时间"
                                onChange={this.onEndChange2}
                                onOpenChange={this.handleEndOpenChange2}
                                open={endOpen2}
                                style={{margin: 10, width: 200}}
                            />
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="巡更路线">
                        {getFieldDecorator('xungengdidianshuliang', {
                        })(
                            <Transfer
                                dataSource={this.state.mockData}
                                showSearch
                                filterOption={this.filterOption}
                                targetKeys={this.state.targetKeys}
                                onChange={this.handleChange}
                                render={item => item.title}
                                style={{display: "inline-block", margin: 10}}
                                titles={['巡更地点', '已选地点']}
                            />
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
