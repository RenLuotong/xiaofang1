import React from 'react';
import ReactDOM from 'react-dom';
import {
    Icon,
    Input,
    Button,
    message,
    Transfer
} from 'antd';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mockData: [],//穿梭框左侧栏
            targetKeys: [],//穿梭框右侧栏
        };
    }

    getMock = () => {
        let mockData = [];//数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外
        let targetKeys = [];//右侧栏，只存key值
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "allZuzhijigouXialaLiebiao",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.length; i++) {
                    let obj = {
                        key: data.data[i]["jigoumingcheng"],
                        title: data.data[i]["jigoumingcheng"],
                    };
                    mockData.push(obj);
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

    toCreate() {
        const THE = this;
        let mingcheng = $("#mingcheng").val().trim();
        let dizhi = $("#dizhi").val().trim();
        let targetKeys = THE.state.targetKeys;

        if (mingcheng == ""||mingcheng == null) {
            message.warning("请填写营区名称！");return;
        }
        if (dizhi == ""||dizhi == null) {
            message.warning("请填写营区地址！");return;
        }
        // if (targetKeys.length < 1) {
        // 	message.warning("请选择组织机构！");return;
        // }
        let zujijigouliebiao = "";
        for (let i = 0; i < targetKeys.length; i++) {
            zujijigouliebiao = zujijigouliebiao + targetKeys[i] + ","
        }
        zujijigouliebiao = zujijigouliebiao.substring(0, zujijigouliebiao.length - 1);
        if (!confirm("确定添加此营区！")) {
            return;
        }
        let obj = {};
        obj["mingcheng"] = mingcheng;
        obj["dizhi"] = dizhi;
        obj['zujijigouliebiao'] = zujijigouliebiao;
        $.ajax({
            type : 'POST',
            url : SERVER + "tianjiayingqu",
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("添加营区成功");
                THE.backPage();
            }
        });
    }

    backPage() {
        window.location.href = "./zhidui.html#/xitongsheding_admin_yingquguanli";
    }

    componentDidMount() {
        this.getMock();
    }

    render() {

        return (
            <div>
                <div>
                    <label>营区名称 :</label>
                    <Input id="mingcheng" style={{margin:10,width:200}}/>
                    <br/>
                    <label>营区地址 :</label>
                    <Input id="dizhi" style={{margin:10,width:200}}/>
                    <br/>
                    {/*<label style={{display:"inline-block"}}>组织机构:</label>*/}
                    {/*<Transfer*/}
                    {/*    dataSource={this.state.mockData}*/}
                    {/*    showSearch*/}
                    {/*    filterOption={this.filterOption}*/}
                    {/*    targetKeys={this.state.targetKeys}*/}
                    {/*    onChange={this.handleChange}*/}
                    {/*    render={item => item.title}*/}
                    {/*    style={{display:"inline-block",margin:10}}*/}
                    {/*    titles={['组织机构列表', '已选组织机构']}*/}
                    {/*/>*/}
                    {/*<br/>*/}
                    <Button type="primary" icon="plus" onClick={this.toCreate.bind(this)}>添加</Button>
                </div>
            </div>
        );
    }
}

export default App;
