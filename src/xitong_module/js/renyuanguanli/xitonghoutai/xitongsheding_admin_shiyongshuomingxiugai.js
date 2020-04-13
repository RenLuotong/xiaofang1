import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';

import 'antd/dist/antd.css';
import {
	message,
	Select,
  	Layout,
  	Menu,
  	Breadcrumb,
  	Icon,
  	Input,
  	Form,
  	Button,
  	Table,
  	Divider,
    Tree,
    Tabs
} from 'antd';

const TreeNode = Tree.TreeNode;


class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
            mingcheng:this.props.location.query.mingcheng,
            lujing:this.props.location.query.lujing,
            id:this.props.location.query.id,
		};
	}



	backPage() {
		window.location.href = "./xitong.html#/xitongsheding_admin_shiyongshuomingguanli";
	}

	toUpdate() {
		const THE = this;
        let mingcheng = THE.state.mingcheng;
        let lujing = THE.state.lujing;
		let id = THE.state.id;
		$.ajax({
            type : 'post',
            url : SERVER+"tbBangzhuWendang/update?id="+id+"&mingcheng="+mingcheng+"&lujing="+lujing,
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

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
		let mingcheng = value;
	    this.setState({
            mingcheng : mingcheng
	    });
      }
      handleInputChange2(event) {
	    const target = event.target;
	    const value = target.value;
		let lujing = value;
	    this.setState({
            lujing : lujing
	    });
  	}


	componentDidMount() {
    }




  	render() {

          let mingcheng = this.state.mingcheng;
          let lujing = this.state.lujing;
	    return (
	      	<div>
				<label>文件名称</label>
				<Input style={{margin:10,width:200}} name="mingcheng" value={mingcheng} onChange={this.handleInputChange.bind(this)}/>
                <label>文件下载路径</label>
				<Input style={{margin:10,width:400}} name="lujing" value={lujing} onChange={this.handleInputChange2.bind(this)}/>
      			<br/>
            	<Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
	      	</div>
	    );
  	}
}

export default App;
