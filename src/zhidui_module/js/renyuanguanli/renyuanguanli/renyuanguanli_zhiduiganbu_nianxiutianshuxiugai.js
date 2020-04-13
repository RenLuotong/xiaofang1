import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter ,Link, Route ,Switch ,Redirect} from 'react-router-dom';
import {
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
    Popconfirm,
    message, Tree, Card,

} from 'antd';
import ZuzhiTree from "../../../../common/components/TreeSideBar/index.js";
const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
const View = [];
const { TreeNode } = Tree;

class EditableCell extends React.Component {

    constructor(props){
        super(props);
    }

    getInput = (title) => {
        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            xinghaoOptions,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;

        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{margin: 0}}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{required: true, message: `请输入 ${title}!`,}],
                                        initialValue: record[dataIndex],
                                    })(this.getInput(title))}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}
class Appmain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <div>
                <Switch>
                    <Route exact path = {this.props.match.path} component = {AppComp} />

                </Switch>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                current : 1
            },
            editingKey: '',
            renyuanList: [],
            renyuanInfo:{},
            zuzhijigouList:[],
            treeList:[],
            showcaidan: "block",
            showanniu: "none",
            columns : [{
                title: 'id',
                dataIndex: 'id',
                colSpan : 0,
                className:'hidden_col'
            },{
                title: '姓名',
                dataIndex: 'xingming',
            }, {
                title: '所属组织机构',
                dataIndex: 'jigoumingcheng',
                sorter: true,
            }, {
                title: '年休天数',
                dataIndex: 'yingxiushichang',
                editable: true,
            }, {
                title: '编辑',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
		                  			<EditableContext.Consumer>
					                    {form => (
                                            <a
                                                href="javascript:;"
                                                onClick={() => this.save(form, record.key)}
                                                style={{marginRight: 8}}
                                            >保存</a>
                                        )}
		                  			</EditableContext.Consumer>
		                  			<Popconfirm
                                        title="确定要退出编辑?"
                                        onConfirm={() => this.cancel(record.key)}
                                        okText="确认" cancelText="取消"
                                    >
		                    			<a>退出编辑</a>
		                  			</Popconfirm>
		                		</span>
                            ) : (
                                <a onClick={() => this.edit(record.key)}>编辑</a>
                            )}
                        </div>
                    );
                }
            }]
        };
    }

    getTree() {
        const THE = this;
        $.ajax({
            type:'GET',
            url:SERVER+"zhiduiAlljigou",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                let treeList = THE.state.treeList;
                treeList.push(data.data);
                THE.setState({
                    treeList:treeList
                });
            }
        });
    }

    jigoudaima = ''
    onSelect = (e) => {
        if (e!=null) {
            this.jigoudaima = e;
            this.fetch();
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }

    fetch = (params = {rows: this.state.pagination.pageSize,
        page: this.state.pagination.current}) => {
        let form = this.props.form;
        let chakanfanwei = form.getFieldValue('chakanfanwei');
        if (typeof(chakanfanwei) == "undefined"||chakanfanwei == "-1") {
            chakanfanwei = '';
        }
        let xingming = form.getFieldValue('xingming');
        if (typeof(xingming) == "undefined") {
            xingming = '';
        }
        let jigoudaima = this.jigoudaima;
        let page = params.page - 1;
        let size = params.rows===undefined?10:params.rows;
        const THE = this;
        //组织排序字段
        let paixu = paixuzuzhi(params.sortField,params.sortOrder);
        $.ajax({
            type:'get',
            url: SERVER + "diaoboRenyuanLiebiaoAll?chakanfanwei="+chakanfanwei+"&xingming="+xingming+"&page="+page+"&size="+size+"&jigoudaima="+jigoudaima+paixu,
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
                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    renyuanList: list,
                    pagination,
                });
            }
        });
    }

    search() {
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pager.pageSize,
            page: pager.current,
        });
    }


    getZuzhijigouList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "allZhiduiZzjgXialaLiebiao",
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
                    zuzhijigouList: list,
                });
            }
        });
    }

    //隐藏菜单方法
    yincangcaidan() {
        this.setState({
            showcaidan: "none",
            showanniu: "block",
        })
    }
    //显示菜单方法
    xianshicaidan(){
        this.setState({
            showcaidan: "block",
            showanniu: "none",
        })
    }


    componentWillUnmount() {
        View.pagination = this.state.pagination;
    }

    componentWillMount() {
        const {pagination} = View;
        if (typeof (pagination) !== "undefined") {
            this.setState({
                pagination: pagination,
            });
        }
    }

    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };
    edit(key) {
        this.setState({ editingKey: key });
    }
    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                console.log(error,row)
                return;
            }
            const newData = [...this.state.renyuanList];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });

                const id = newData[index].id;
                console.log(newData);

                // this.setState({editingKey: '' });
                this.toSaveRfid(newData[index]);
            } else {
                newData.push(renyuanList);
                this.setState({ renyuanList: newData});
            }
        });
    }
    cancel = () => {
        this.setState({ editingKey: '' });
    };

    toSaveRfid(renyuanInfo){
        if (!confirm("确认修改当前年休天数吗?")) {
            return;
        }
        const THE = this;
        $.ajax({
            type : 'POST',
            url : SERVER+"nianxiutianshuxiugai",
            data : JSON.stringify(renyuanInfo),
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success(data.message);
                THE.setState({editingKey: ''});
                THE.fetch();
            }
        });
    }

    componentDidMount() {
        this.getTree();
        this.getZuzhijigouList();
        this.fetch();
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.state.columns.map((col) => {
            if (!col.editable) {
                return {
                    ...col,
                    width:'25%',
                };
            }
            return {
                ...col,
                width:'25%',
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        const zuzhijigouList = this.state.zuzhijigouList.map(
            item => <Select.Option key={item['key']} value={item['jigoumingcheng']}>{item['jigoumingcheng']}</Select.Option>
        );

        const { getFieldDecorator } = this.props.form;

        return (
            <div id="chaxuntongji">
               <ZuzhiTree  onSelect={this.onSelect} />
                <div id="treeRight" style={{flex:1}}>
                    <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                        <FormItem label="姓名">
                            {getFieldDecorator('xingming')(
                                <Input style={{margin:5,width:200}}/>
                            )}
                        </FormItem>
                        <FormItem label="查看范围">
                            {getFieldDecorator('chakanfanwei',{initialValue: "-1"})(
                                <Select style={{margin:5,width:200}}>
                                    <Select.Option value="-1">管辖范围</Select.Option>
                                    <Select.Option value="所属范围">所属范围</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                                <Icon type="search" />查询
                            </Button>
                        </FormItem>
                    </Form>
                    <Table
                        components={components}
                        columns={columns}
                        dataSource={this.state.renyuanList}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                        scroll={{ y: "calc(100vh - 370px)", x: true }}
                    />
                </div>
            </div>
        );
    }
}
const AppComp = Form.create()(App);

export default Appmain;
