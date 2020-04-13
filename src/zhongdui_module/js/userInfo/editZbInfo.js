import React from 'react';
import {message,Select,Icon,Button} from 'antd';

class EditUserInfo extends React.Component {

  	constructor(props) {
	    super(props);
	    this.state = {
	    	renyuanInfo:{},
            zhuangbeilxList: [],
	    };
  	}

   	getInfo() {
   		const THE = this;
		$.ajax({
    		type:'get',
	        url:SERVER+"currentRenyuanXiangqing",
	        success:function(data){
	            if(data.status != 0){
	                message.warning(data.message);
	                return;
	            }
	            if (data.data.list != null) {
                	for (let i = 0; i < data.data.list.length; i++) {
	                	data.data.list[i].name = i + 1;
	                }
                } else {
                	data.data.list = [];
                }
	          	THE.setState({
	          		renyuanInfo:data.data,
	          		zhuangbeilxList:data.data.list,
	          	});
	        }
	    });
	}

	editInfo() {
		const THE = this;
		let tbGerenfanghuZhuangbeiRenyuanZhuangbeiXinxiList = [];
        let zhuangbeilxList = THE.state.zhuangbeilxList;
        for (let i = 0; i < zhuangbeilxList.length; i++) {
        	let obj = {};
        	obj.guigexinghao = zhuangbeilxList[i].yixuanguigexinghao;
        	obj.id = zhuangbeilxList[i].id;
        	obj.zhuangbeileixingbianhao = zhuangbeilxList[i].zhuangbeileixingbianhao;
        	tbGerenfanghuZhuangbeiRenyuanZhuangbeiXinxiList.push(obj);
        }
        let obj = THE.state.renyuanInfo;
        obj.tbGerenfanghuZhuangbeiRenyuanZhuangbeiXinxiList = tbGerenfanghuZhuangbeiRenyuanZhuangbeiXinxiList;
        if (!confirm("确定修改个人防护信息吗？")) {
            return;
        }
		$.ajax({
            type : 'POST',
            url : SERVER+"xiugaiRenyuan",
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
	          	THE.getInfo();
	        }
	    });
	}

    guigeChange(value,e) {
    	let name = e.props.name;
    	let zhuangbeilxList = this.state.zhuangbeilxList;
    	for (let i = 0; i < zhuangbeilxList.length; i++) {
    		if (zhuangbeilxList[i].zhuangbeileixingmingcheng == name) {
    			zhuangbeilxList[i].yixuanguigexinghao = value;
    		}
    	}
    	this.setState({
    		zhuangbeilxList
    	})
    }

	componentDidMount() {
		this.getInfo();
	}

  	render() {
		let leixingOptions = this.state.zhuangbeilxList.map(item => {
    		let xinghaoOptions = item.list.map(item1 =>
	        	<Select.Option key={item1['leixingzhi']} value={item1['leixingzhi']} name={item1['leixing']}>{item1['leixingzhi']}</Select.Option>
	        );
	        let idName = "gerenzhuangbei" + item['name'];
    		return (
    			<div key={item['id']} id={idName}>
		    		<label style={{float:"left"}}>{item['zhuangbeileixingmingcheng']}</label>
		    		<Select style={{width:120,float:"right"}} value={item['yixuanguigexinghao']} onChange={this.guigeChange.bind(this)} key={item['id']}>
		    			{xinghaoOptions}
		        	</Select>
	        	</div>
    		)
        });

        let length = this.state.zhuangbeilxList.length + 1;
        let buttonId = "gerenzhuangbei" + length;

	    return (
      		<div id="edit_password_div">
      			{leixingOptions}
      			<div id={buttonId}>
					<Button type="primary" icon="plus" onClick={this.editInfo.bind(this)}>保存</Button>
				</div>
      		</div>
	    );
  	}
}

export default EditUserInfo;
