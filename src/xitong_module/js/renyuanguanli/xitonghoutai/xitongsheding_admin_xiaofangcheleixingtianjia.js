import React from 'react';
import ReactDOM from 'react-dom';
import {
  	message,
  	Input,
  	Button,
} from 'antd';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {

		};
	}

	toCreate() {
		const THE = this;
		let xiaofangcheleixing = $("#xiaofangcheleixing").val().trim();
        if (xiaofangcheleixing == "") {
            message.error("请输入消防车类型名称！");
            return;
        }
        if (!confirm("确定添加此消防车类型")) {
            return;
        }
        $.ajax({
            type:'post',
            url:SERVER+"tianjiaXiaofangcheleixing?xiaofangcheleixing=" + xiaofangcheleixing,
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
        window.location.href = "./xitong.html#/xitongsheding_admin_xiaofangcheleixingshezhi";
    }

  	render() {

		return (
  			<div>
    			<div>
                	<label>消防车类型名称:</label>
                    <Input size="default" id="xiaofangcheleixing" style={{margin:10,width:200}}/>
                    <Button type="primary" icon="check" onClick={this.toCreate.bind(this)}>保存</Button>
  				</div>
      		</div>
		);
  	}
}

export default App;
