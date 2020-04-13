import React from 'react';
import ReactDOM from 'react-dom';
import {
    message,
    Upload,
    Modal,
    Icon,
    Input,
    Button,
    Tree,
    Tabs,
    Select
} from 'antd';

const TreeNode = Tree.TreeNode;

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            zuzhijigouInfo:{},
            previewVisible: false,
            previewImage: '',
            fileList: [],
            yingquList: [],
            shengfenList: [],
            chengshiList: [],
            shengcityCode:''
        };
    }

    getyingquList() {
        const THE = this;
        {
            $.ajax({
                type: 'GET',
                url: SERVER + "yingquxinxiliebiao",
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
                        yingquList: list,
                    });
                }
            });
        }
    }

    getshengfenList() {
        const THE = this;
        {
            $.ajax({
                type: 'GET',
                url: SERVER + "queryAreaCityList?deep=0",
                success: function (data) {
                    let list = [];
                    if (data.status != 0) {
                        message.warning(data.message);
                        return;
                    }
                    for (let i = 0; i < data.data.length; i++) {
                        data.data[i]["key"] = i;
                        data.data[i]["cityCode"] = data.data[i]["cityCode"].toString();
                        list.push(data.data[i]);
                    }
                    THE.setState({
                        shengfenList: list,
                    });
                }
            });
        }
    }

    getchengshiList(value) {
        const THE = this;
        let zuzhijigouInfo = THE.state.zuzhijigouInfo;
        if(zuzhijigouInfo['cityCode'] !== undefined){
            zuzhijigouInfo['cityCode'] = '';
        }
        $.ajax({
            type:'get',
            url: SERVER + "queryAreaCityList?deep=1&pid="+value,
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    data.data[i]["cityCode"] = data.data[i]["cityCode"].toString();
                    list.push(data.data[i]);
                }
                THE.setState({
                    shengcityCode:value,
                    chengshiList: list,
                    zuzhijigouInfo:zuzhijigouInfo
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

    toUpdate() {
        const THE = this;
        let fileList = THE.state.fileList;
        let pingmiantu = '';
        if (fileList.length > 0) {
            pingmiantu = fileList[0]['response'];
        }
        let obj = THE.state.zuzhijigouInfo;
        obj['pingmiantu'] = pingmiantu;
        if(obj['cityCode'] === undefined || obj['cityCode'] === null || obj['cityCode'] === ''){
            message.warning("请选择所属城市");
            return;
        }
        if (!confirm("确定修改此组织机构！")) {
            return;
        }
        $.ajax({
            type : 'POST',
            url : SERVER+"xiugaiZuzhijigou",
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("修改成功");
                THE.backPage();
            }
        });
    }

    getInfo() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER + "zuzhijigouXiangqing?id=" + id,
            success : function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let shengcityCode = '';
                if(data.data['cityCode'] !== undefined && data.data['cityCode'] !== null && data.data['cityCode'] !== ''){
                    shengcityCode = data.data['cityCode'].toString().substring(0,2);
                    data.data['cityCode'] = data.data['cityCode'].toString();
                }
                $.ajax({
                    type:'get',
                    url: SERVER + "queryAreaCityList?deep=1&pid="+shengcityCode,
                    success: function (data) {
                        let list = [];
                        if (data.status != 0) {
                            message.warning(data.message);
                            return;
                        }
                        for (let i = 0; i < data.data.length; i++) {
                            data.data[i]["key"] = i;
                            data.data[i]["cityCode"] = data.data[i]["cityCode"].toString();
                            list.push(data.data[i]);
                        }
                        THE.setState({
                            chengshiList: list,
                        });
                    }
                });
                THE.setState({
                    shengcityCode:shengcityCode,
                    jigoudaima:data.data['jigoudaima'],
                    zuzhijigouInfo: data.data,
                    fileList: [{
                        uid: 0,
                        name: 'a.png',
                        status: 'done',
                        url: data.data['pingmiantu'],
                        response: data.data['pingmiantu'],
                    }],
                });
            }
        });
    }

    backPage() {
        window.location.href = "./xitong.html#/xitongsheding_admin_zuzhijigoushezhi";
    }


    yingquChange(value) {
        let zuzhijigouInfo = this.state.zuzhijigouInfo;
        zuzhijigouInfo['yingqubianhao'] = value;
        this.setState({
            zuzhijigouInfo : zuzhijigouInfo
        });
    }

    cityCodeChange(value) {
        let zuzhijigouInfo = this.state.zuzhijigouInfo;
        zuzhijigouInfo['cityCode'] = value;
        this.setState({
            zuzhijigouInfo : zuzhijigouInfo
        });
    }

    componentDidMount () {
        this.getInfo();
        this.getyingquList();
        this.getshengfenList();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let zuzhijigouInfo = this.state.zuzhijigouInfo;
        zuzhijigouInfo[name] = value;
        this.setState({
            zuzhijigouInfo : zuzhijigouInfo
        });
    }

    render() {

        const yingquOptions = this.state.yingquList.map(item => <Select.Option key={item['id']}
                                                                               value={item['yingqubianhao']}>{item['mingcheng']}</Select.Option>);

        const shengfenOptions = this.state.shengfenList.map(item => <Select.Option key={item['id']}
                                                                                   value={item['cityCode']}>{item['extName']}</Select.Option>);

        const  chengshiOptions = this.state.chengshiList.map(item => <Select.Option key={item['id']}
                                                                                    value={item['cityCode']}>{item['extName']}</Select.Option>);

        let info = this.state.zuzhijigouInfo;
        let uploadProps = {
            name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList, jgptnsrq,shengcityCode} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        return (
            <div>
                        <label>机构名称:</label>
                        <Input style={{margin:10,width:200}} value={info['jigoumingcheng']} disabled/>
                        <label>机构类别:</label>
                        <Input style={{margin:10,width:200}} value={info['jigouleibie']} disabled/>
                        <label>上级机构:</label>
                        <Input style={{margin:10,width:200}} value={info['shangjijigoumingcheng']} disabled/>
                        <br/>
                        <label>机构地址:</label>
                        <Input style={{margin:10,width:200}} onChange={this.handleInputChange.bind(this)} id="jigoudizhi" name="jigoudizhi" value={info['jigoudizhi']}/>
                        <label>邮政编码:</label>
                        <Input style={{margin:10,width:200}} onChange={this.handleInputChange.bind(this)} id="youzhengbianma" name="youzhengbianma" value={info['youzhengbianma']}/>
                        <label>联系电话:</label>
                        <Input style={{margin:10,width:200}} onChange={this.handleInputChange.bind(this)} id="lianxidianhua" name="lianxidianhua" value={info['lianxidianhua']}/>
                        <br/>
                        <label>机构描述:</label>
                        <Input style={{margin:10,width:200}} onChange={this.handleInputChange.bind(this)} id="jigoumiaoshu" name="jigoumiaoshu" value={info['jigoumiaoshu']}/>
                        <label>营区面积:</label>
                        <Input style={{margin:10,width:200}} onChange={this.handleInputChange.bind(this)} id="yingqumianji" name="yingqumianji" value={info['yingqumianji']}/>
                        <label>所属营区:</label>
                        <Select style={{margin:5,width:200}} id="yingqumianji" name="yingqumianji" value={info['yingqubianhao']} onChange={this.yingquChange.bind(this)}>
                            {yingquOptions}
                        </Select>
                        <br/>
                        <label>所属省份:</label>
                        <Select style={{margin:10,width:200}} id="suoshushengfen" name="suoshushengfen" value={shengcityCode} onChange={this.getchengshiList.bind(this)}>
                        {shengfenOptions}
                        </Select>
                        <label>所属城市:</label>
                        <Select style={{margin:10,width:200}} id="cityCode" name="cityCode" value={info['cityCode']} onChange={this.cityCodeChange.bind(this)}>
                         {chengshiOptions}
                        </Select>
                        <br/>
                        <label>平&nbsp;&nbsp;面&nbsp;&nbsp;图:</label>
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
                        <Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
            </div>
        );
    }
}

export default App;
