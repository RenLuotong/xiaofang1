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
            juese:this.props.location.query.juese,
			zhiwuInfo:{},
            expandedKeys: [],//已展开菜单
            autoExpandParent: true,
            checkedKeys: [],//选中复选框的树节点
            checkStrictly: false,//checkable状态下节点选择完全受控（父子节点选中状态不再关联）
            caidanList: [],
            yijicaidanList: [],
            yijicaidanList2: [],
            activeKey:"1",
            jigoudaima:'',
            id:this.props.location.query.id,
		};
	}



    backPage() {
        window.location.href = "./xitong.html#/renyuanguanli_admin_jueseshezhi";
    }

	toUpdate() {
		const THE = this;
		let juese = THE.state.juese;
		let id = THE.state.id;
        let obj = {};
        obj["juese"] = juese;
        obj["id"] = id;
		$.ajax({
            type : 'PUT',
            url : SERVER+"updateZuzhijigouJueses",
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                THE.setState({
                    activeKey:"2",
                });
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
            }
        });
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
		let juese = value;
	    this.setState({
            juese : juese
	    });
  	}

    //获取所有菜单
    getCaidanList() {
        const THE = this;
        $.ajax({
            type : 'GET',
            url : SERVER+"getZuzhijigouQuanxian",
            success : function(data) {
                console.log(data)
                if (data.status == 0) {
                    let list = [];
                    let list2 = [];
                    for (let i = 0; i < data.data.caidan.length; i++) {
                        list.push(''+data.data.caidan[i]["key"]+'');
                        list2.push(data.data.caidan[i]["key"]);
                    }
                    THE.setState({
                        caidanList : data.data.caidan,
                        yijicaidanList : list,
                        yijicaidanList2 : list2,
                    });
                } else {
                    message.warning(data.message);
                    return;
                }
            }
        })
        THE.getcaidan();
    }

    //获取角色的当前已有菜单
    getcaidan() {
        const THE = this;
        let id = THE.state.id;
        $.ajax({
            type : 'GET',
            url : SERVER+"getJueseQuanxian/" + id,
            success : function(data) {
                console.log(data)
                if (data.status == 0) {
                    let checkedKeys = data.data.morenxuanzhong;
                    let yijicaidanList = THE.state.yijicaidanList2;
                    for (let i = 0; i < yijicaidanList.length; i++) {
                        let index = checkedKeys.indexOf(yijicaidanList[i]);
                        if (index > -1) {
                            checkedKeys.splice(index, 1);
                        }
                    }
                    THE.setState({
                        checkedKeys : checkedKeys,
                    });
                } else {
                    message.warning(data.message);
                    return;
                }
            }
        })
    }


    SaveCaiDan() {
        const THE = this;
        let id = THE.state.id;
        let checkedKeys = THE.state.checkedKeys;
        let yijicaidanList = THE.state.yijicaidanList;
        for (let i = 0; i < yijicaidanList.length; i++) {
            let index = checkedKeys.indexOf(yijicaidanList[i]);
            if (index > -1) {
                checkedKeys.splice(index, 1);
            }
        }
        let obj = {};
        obj['caidan_ids'] = checkedKeys;
        $.ajax({
            type : 'POST',
            url : SERVER+"setJueseQuanxian/" + id,
            data : JSON.stringify(obj),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("修改成功");
            }
        })
        THE.backPage();
    }



	componentDidMount() {
        this.getCaidanList();
    }

    onExpand = (expandedKeys) => {
//	    console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }


    onCheck = (checkedKeys) => {
//	    console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }


    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
					<TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
					</TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }


  	render() {

  		let juese = this.state.juese;
	    return (
	      	<div>
				<Tabs activeKey={this.state.activeKey} >
					<Tabs.TabPane tab="基本信息设置" key="1">
				<label>角色名称</label>
				<Input style={{margin:10,width:200}} name="juese" value={juese} onChange={this.handleInputChange.bind(this)}/>
      			<br/>
            	<Button type="primary" icon="plus" onClick={this.toUpdate.bind(this)}>保存</Button>
					</Tabs.TabPane>
					<Tabs.TabPane tab="角色菜单设置" key="2">
						<p>菜单列表 : </p>
						<Tree
							checkable
							onExpand={this.onExpand}
							expandedKeys={this.state.expandedKeys}
							autoExpandParent={this.state.autoExpandParent}
							onCheck={this.onCheck}
							checkedKeys={this.state.checkedKeys}
							checkStrictly={this.state.checkStrictly}
						>
                            {this.renderTreeNodes(this.state.caidanList)}
						</Tree>
						<Button type="primary" icon="plus" onClick={this.SaveCaiDan.bind(this)}>保存</Button>
					</Tabs.TabPane>
				</Tabs>
	      	</div>
	    );
  	}
}

export default App;
