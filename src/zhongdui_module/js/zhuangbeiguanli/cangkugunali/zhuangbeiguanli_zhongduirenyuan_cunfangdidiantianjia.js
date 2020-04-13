import React from 'react';
import {
	message,
    Upload,
    Modal,
    DatePicker,
    Select,
  	Icon,
  	Input,
  	Form,
  	Button,
  	Table,
  	Divider
} from 'antd';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
            cangkuSelect: null,
            leixingSelect: null,
            xiaofangcheSelect: null,
		    cangkumingchengList: [],
		    xiaofangcheList: [],
		    xiaofangcheSelectList: [],
		};
	}

    getCangkumingchengList(value) {
        const THE = this;
        $.ajax({
            url:SERVER+"cangkuXialaLiebiao",
            success:function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                let list = [];
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i]["key"] = i;
                    if(value === "普通" && data.data[i].cangkumingcheng !== "消防车仓库"){
                        list.push(data.data[i])
                    }
                    if(value === "消防车" && data.data[i].cangkumingcheng === "消防车仓库"){
                        list.push(data.data[i])
                    }
                }
                THE.setState({
                    cangkumingchengList : list,
                });
            }
        });
    }

    getXiaofangcheList() {
		const THE = this;
    	$.ajax({
            type:'GET',
            url: SERVER + "chaxunXiaofangcheNewList",
            success: function (data) {
            	let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = i;
            		list.push(data.data.content[i]);
                }
                THE.setState({
                    xiaofangcheList: list,
                });
            }
        });
	}

	toCreate() {
        const THE = this;

        let cunfangdidianmingcheng = $("#qymc_ipt").val().trim();
        let dizhi = $("#frdb_ipt").val().trim();
        let miaoshu = $("#lxdh_ipt").val().trim();
        let cangkumingcheng = this.state.cangkuSelect;

    	if(cangkumingcheng == ''||cangkumingcheng == null){
            message.error("请选择仓库！");return;
        }
        if (cunfangdidianmingcheng == "") {
            message.error("请输入存放地点名称！");return;
        }
        if (!confirm("确定添加此存放地点！")) {
            return;
        }
        let obj = {};
        obj["cangkumingcheng"] = cangkumingcheng;
        obj["cunfangdidianmingcheng"] = cunfangdidianmingcheng;
        obj["dizhi"] = dizhi;
        obj["miaoshu"] = miaoshu;
        $.ajax({
            type : 'POST',
            url : SERVER+"tianjiaCunfangdidian",
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.backPage();
            }
        });
	}

    backPage() {
        window.location.href = "./zhongdui.html#/qicai_zhongduiganbu_cunfangdidianguanli";
    }

    cangkuChange(value) {
        this.setState({
            cangkuSelect : value,
        });
    }


	xiaofangcheChange(value) {
        this.setState({
            xiaofangcheSelect : value,
        });
    }

    componentDidMount() {
		this.getXiaofangcheList();
        this.getCangkumingchengList("普通");
    }

  	render() {

        let cangkuList = this.state.cangkumingchengList.map(item => <Select.Option key={item['key']} value={item['cangkumingcheng']}>{item['cangkumingcheng']}</Select.Option>);
        let xiaofangcheList = this.state.xiaofangcheSelectList.map(item => <Select.Option key={item['key']} value={item['cheliangbianhao']}>{item['chepaihaoma']}</Select.Option>);

        return (
  			<div>
                <label>存放地点类型:</label>
                <Input value="普通" disabled style={{margin:10,width:200}}/>
                <label>所在仓库名称:</label>
                <Select
                	style={{margin:10,width:200}}
                	onChange={this.cangkuChange.bind(this)}
                	showSearch
                    optionFilterProp="children"
                    value={this.state.cangkuSelect}
                >
                    {cangkuList}
                </Select>
            	<label>存放地点名称:</label>
                <Input size="default" id="qymc_ipt" style={{margin:10,width:200}}/>
                <br/>
                <label>存放地点位置:</label>
                <Input size="default" id="frdb_ipt" style={{margin:10,width:200}}/>
                <label>存放地点备注:</label>
                <Input size="default" id="lxdh_ipt" style={{margin:10,width:200}}/>
                <br/>
                <Button type="primary" icon="plus" onClick={this.toCreate.bind(this)}>保存</Button>
      		</div>
		);
  	}
}

export default App;
