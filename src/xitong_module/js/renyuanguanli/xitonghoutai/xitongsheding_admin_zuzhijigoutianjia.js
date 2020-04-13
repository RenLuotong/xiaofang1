import React from 'react';
import ReactDOM from 'react-dom';
import {
	InputNumber,
	message,
	Upload,
	Modal,
	Select,
  	Icon,
  	Input,
  	Form,
  	Button,
    Tree,
    Tabs
} from 'antd';

const TreeNode = Tree.TreeNode;

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            yingquList: [],
            shengfenList: [],
            chengshiList: [],
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
                    chengshiList: list,
                });
                THE.props.form.setFieldsValue(
                    {
                        suoshuchengshi: '',
                    }
                )
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
		let jigoumingcheng = form.getFieldValue('jigoumingcheng');
		let jigouleibie = form.getFieldValue('jigouleibie');
		let shangjijigoumingcheng = form.getFieldValue('shangjijigoumingcheng');
		let jigoudizhi = form.getFieldValue('jigoudizhi');
		let youzhengbianma = form.getFieldValue('youzhengbianma');
		let lianxidianhua = form.getFieldValue('lianxidianhua');
		let jigoumiaoshu = form.getFieldValue('jigoumiaoshu');
		let yingqumianji = form.getFieldValue('yingqumianji');
		let zhengjiandaoqi = form.getFieldValue('zhengjiandaoqi');
        let suoshuyingqu = form.getFieldValue('suoshuyingqu')
        let suoshushengfen = form.getFieldValue('suoshushengfen');
        let suoshuchengshi = form.getFieldValue('suoshuchengshi');
		let fileList = THE.state.fileList;
		let pingmiantu = '';
		if (fileList.length > 0) {
        	pingmiantu = fileList[0]['response'];
        }

		if (!confirm("确定添加此组织机构吗？")) {
            return;
        }
        let obj = {};
        obj["jigoumingcheng"] = jigoumingcheng;
        obj["jigouleibie"] = jigouleibie;
        obj["shangjijigoumingcheng"] = shangjijigoumingcheng;
        obj["jigoudizhi"] = jigoudizhi;
        obj["youzhengbianma"] = youzhengbianma;
        obj["lianxidianhua"] = lianxidianhua;
        obj["jigoumiaoshu"] = jigoumiaoshu;
        obj["yingqumianji"] = yingqumianji;
        obj["pingmiantu"] = pingmiantu;
        obj["zhengjiandaoqi"] = zhengjiandaoqi;
        obj["yingqubianhao"] = suoshuyingqu;
        obj["cityCode"] = suoshuchengshi;

        $.ajax({
            type:'post',
            url:SERVER+"tianjiaZuzhijigou",
            data:JSON.stringify(obj),
            dataType:'json',
            contentType: "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                message.success("新增成功");
                THE.backPage();
            }
        });
	}



	componentDidMount() {
        this.getyingquList();
        this.getshengfenList();
    }

    backPage() {
        window.location.href = "./xitong.html#/xitongsheding_admin_zuzhijigoushezhi";
    }


    renderTreeNodes = (data) => {
	    console.log(data)
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

        const yingquOptions = this.state.yingquList.map(item => <Select.Option key={item['id']}
                                                                              value={item['yingqubianhao']}>{item['mingcheng']}</Select.Option>);

        const shengfenOptions = this.state.shengfenList.map(item => <Select.Option key={item['id']}
                                                                               value={item['cityCode']}>{item['extName']}</Select.Option>);

        const  chengshiOptions = this.state.chengshiList.map(item => <Select.Option key={item['id']}
                                                                                   value={item['cityCode']}>{item['extName']}</Select.Option>);

		let uploadProps = {
            name: 'files',
            action: SERVER+"files",
            headers: {
                Authorization:"Bearer "+sessionStorage.getItem("token")
            },
        };
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
	    return (
	      	<div>
		        <Form layout="inline" onSubmit={this.handleSubmit}>
		          	<FormItem label="机构名称">
		             	{getFieldDecorator('jigoumingcheng', {
            				rules: [{ required: true, message: '请输入机构名称', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="机构类别">
		             	{getFieldDecorator('jigouleibie', {
            				rules: [{ required: true, message: '请选择机构类别', whitespace: true }],
          				})(
            				<Select style={{margin:5,width:200}}>
								<Select.Option value="支队">支队</Select.Option>
							</Select>
          				)}
		          	</FormItem>
		          	<FormItem label="上级机构">
		             	{getFieldDecorator('shangjijigoumingcheng', {
            				rules: [{ required: true, message: '请选择上级机构', whitespace: true }],
          				})(
            				<Select style={{margin:5,width:200}}>
								<Select.Option value="系统">系统</Select.Option>
							</Select>
          				)}
		          	</FormItem>
		          	<br/>

		          	<FormItem label="机构地址">
		             	{getFieldDecorator('jigoudizhi', {
            				rules: [{ required: true, message: '请输入机构地址', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="邮政编码">
		             	{getFieldDecorator('youzhengbianma', {
            				rules: [{ required: true, message: '请输入邮政编码', whitespace: true }],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="联系电话">
		             	{getFieldDecorator('lianxidianhua', {
            				rules: [{
	              				len: 11, message: '请输入11位电话号码！',
	            			}, {
	              				required: true, message: '请输入联系电话',
	            			}],
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<br/>

		          	<FormItem label="&nbsp;&nbsp;&nbsp;机构描述">
		             	{getFieldDecorator('jigoumiaoshu', {
          				})(
            				<Input style={{margin:5,width:200}}/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;营区面积">
		             	{getFieldDecorator('yingqumianji', {
          				})(
            				<Input style={{margin:5,width:200}} placeholder="平方米"/>
          				)}
		          	</FormItem>
		          	<FormItem label="&nbsp;&nbsp;&nbsp;证件到期">
		             	{getFieldDecorator('zhengjiandaoqi', {
          				})(
            				<InputNumber min={0} style={{margin:5,width:200}} placeholder="天"/>
          				)}
		          	</FormItem>
		          	<br/>
                    <FormItem label="所属营区">
                        {getFieldDecorator('suoshuyingqu', {
                            rules: [{ required: true, message: '请选择所属营区', whitespace: true }],
                        })(
                            <Select style={{margin:5,width:200}}>
                                {yingquOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="所属省份">
                        {getFieldDecorator('suoshushengfen', {
                            rules: [{ required: true, message: '请选择所属省份', whitespace: true }],
                        })(
                            <Select style={{margin:5,width:200}}
                            onChange={this.getchengshiList.bind(this)}
                            >
                                {shengfenOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="所属城市">
                        {getFieldDecorator('suoshuchengshi', {
                            rules: [{ required: true, message: '请选择所属城市', whitespace: true }],
                        })(
                            <Select style={{margin:5,width:200}}

                            >
                                {chengshiOptions}
                            </Select>
                        )}
                    </FormItem>
		          	<br/>
			        <FormItem label="&nbsp;&nbsp;&nbsp;平&nbsp;&nbsp;面&nbsp;&nbsp;图">
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
