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

    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],//已展开菜单
            autoExpandParent: true,
            checkedKeys: [],//选中复选框的树节点
            checkStrictly: false,//checkable状态下节点选择完全受控（父子节点选中状态不再关联）
            caidanList: [],
            yijicaidanList: [],
            yijicaidanList2: [],
            activeKey:"1",
            jigoudaima:'',
			id:''
        };
    }



	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
  			if (!err) {
    			this.toCreate();
  			}
		});
	}

	toCreate() {
		const THE = this;
		let form = THE.props.form;
		let juesemingcheng = form.getFieldValue('juesemingcheng');

		let obj = {};
        obj["juese"] = juesemingcheng;
        $.ajax({
            type:'post',
            url:SERVER+"addZuzhijigouJueses",
            data:JSON.stringify(obj),
            dataType:'json',
            contentType: "application/json",
            success:function(data){
                THE.setState({
                    activeKey:"2",
                    id:data.data,
                });
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
            }
        });
	}

	backPage() {
		window.location.href = "./xitong.html#/renyuanguanli_admin_jueseshezhi";
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

    onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys, info);
        this.setState({ checkedKeys });
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
                message.success("新增成功");
            }
        })
        THE.backPage();
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

  		const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

	    return (
	      	<div>
				<Tabs activeKey={this.state.activeKey} >
					<Tabs.TabPane tab="基本信息设置" key="1">
						<Form layout="inline" onSubmit={this.handleSubmit}>
							<FormItem label="角色名称">
                                {getFieldDecorator('juesemingcheng', {
                                    rules: [{ required: true, message: '请输入角色名称', whitespace: true }],
                                })(
									<Input style={{margin:5,width:200}}/>
                                )}
							</FormItem>
							<FormItem>
								<Button type="primary" icon="plus" htmlType="submit">保存</Button>
							</FormItem>
						</Form>
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

const AppForm = Form.create()(App);
export default AppForm;
