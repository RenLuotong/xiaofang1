import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
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
    InputNumber
} from 'antd';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            bumenList:[],
            renyuanList:[],
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
		if (!confirm("确定添加此部门")) {
            return;
        }
		const THE = this;
		let form = THE.props.form;
		let bumenmingcheng = form.getFieldValue('bumenmingcheng');
		let shangjibumen = form.getFieldValue('shangjibumen');
		let bumenmiaoshu = form.getFieldValue('bumenmiaoshu');
		let bumenjiancheng = form.getFieldValue('bumenjiancheng');
		let fuzeren = form.getFieldValue('fuzeren');
        let paixu = form.getFieldValue('paixu');
		//let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");

		let obj = {};
        obj["bumenmingcheng"] = bumenmingcheng;
        obj["shangjibumen"] = shangjibumen;
        obj["bumenmiaoshu"] =bumenmiaoshu;
        obj["bumenjiancheng"] =bumenjiancheng;
        obj["fuzeren"] =fuzeren;
        obj["paixu"] = paixu;
       // obj["jigoumingcheng"] =jigoumingcheng;
        $.ajax({
            type:'post',
            url:SERVER+"tianjiaBumen",
            data:JSON.stringify(obj),
            dataType:'json',
            contentType: "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.backPage();
            }
        });
	}

	getBumenList() {
  		const THE = this;
  		let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
    	$.ajax({
            type:'GET',
            url: SERVER + "bumenXialaLiebiao?jigoumingcheng="+jigoumingcheng,
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
                    bumenList: list,
                });
            }
        });
  	}

	backPage() {
		let role=sessionStorage.getItem("ROLE");
		if(role=="中队"){
			window.location.href = "./zhongdui.html#/renyuanguanli_zhongduiganbu_bumenguanli";
		}
		else if (role=="大队") {
			window.location.href = "./dadui.html#/renyuanguanli_zhongduiganbu_bumenguanli";
		}else {
			window.location.href = "./zhidui.html#/renyuanguanli_zhongduiganbu_bumenguanli";
		}
	}

	getRenyuanList() {
		let jigoumingcheng = sessionStorage.getItem("jigoumingcheng");
		const THE = this;
    	$.ajax({
            type:'GET',
            url: SERVER + "renyuanXialiaLiebiao?jigoumingcheng=" + jigoumingcheng,
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
                    renyuanList: list,
                });
            }
        });
	}

	componentDidMount() {
		this.getRenyuanList();
		this.getBumenList();
    }

  	render() {

  		const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        let bumenOptions = this.state.bumenList.map(item => <Select.Option key={item['key']} value={item['bumenmingcheng']}>{item['bumenmingcheng']}</Select.Option>);
		let renyuanList = this.state.renyuanList.map(item => <Select.Option key={item['key']} value={item['renyuanbianhao']}>{item['xingming']}</Select.Option>);

	    return (
	      	<div>
		        <Form layout="inline" onSubmit={this.handleSubmit}>
		          	<FormItem label="部门名称">
		             	{getFieldDecorator('bumenmingcheng', {
		             		rules: [{ required: true, message: '请输入部门名称', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;上级部门">
		             	{getFieldDecorator('shangjibumen', {
          				})(
            				<Select style={{margin:5,width:200}}>
            					{bumenOptions}
            				</Select>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;部门负责人">
		             	{getFieldDecorator('fuzeren', {
          				})(
            				<Select style={{margin:5,width:200}}>
            					{renyuanList}
            				</Select>
          				)}
		          	</FormItem>
		          	<br/>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;部门描述">
		             	{getFieldDecorator('bumenmiaoshu', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;部门简称">
		             	{getFieldDecorator('bumenjiancheng', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
					<FormItem label="&nbsp;&nbsp;&nbsp;排&#12288;&#12288;&#12288;序">
                        {getFieldDecorator('paixu',  {
                        })(
							<InputNumber min={1} style={{margin:5,width:200}}/>
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
