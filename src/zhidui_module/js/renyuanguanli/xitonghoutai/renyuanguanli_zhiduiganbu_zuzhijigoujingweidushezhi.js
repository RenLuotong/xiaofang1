import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {Select,Icon,Input,Form,Button,Table,Divider,Popconfirm,message,Tabs,InputNumber} from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();
import moment from 'moment';
import 'moment/locale/zh-cn';


const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const View = [];
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
                current: 1
            },
            editingKey: '',
            wzList: [],
            wzInfo: {},
            columns: [
                {
                    title: '编号',
                    dataIndex: 'id',
                    colSpan : 0,
                    className:'hidden_col',
                    width:'15%'
                },{
                    title: '机构名称',
                    dataIndex: 'jigoumingcheng',
                    width:'15%'
                },  {
                    title: '经度',
                    dataIndex: 'jingdu',
                    editable: true,
                    width:'15%'
                }, {
                    title: '纬度',
                    dataIndex: 'weidu',
                    editable: true,
                    width:'15%'
                },
                {
                    title: '编辑经纬度',
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
                }
            ]
        };
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
            const newData = [...this.state.wzList];
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
                newData.push(wzList);
                this.setState({ wzList: newData});
            }
        });
    }
    cancel = () => {
        this.setState({ editingKey: '' });
    };

    handleTableChange = (pagination) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pagination.pageSize,
            page: pagination.current,
        });
    }

    fetch = (params = {
        rows: this.state.pagination.pageSize,
        page: this.state.pagination.current
    }) => {
        let form = this.props.form;
        const THE = this;
    	$.ajax({
            type:'GET',
			url: SERVER + "huoquZhiduiZzjgXialaLiebiao",
            dataType : 'json',
            contentType : "application/json",
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
                    wzList: list,
                });
            }
        });
    }

    search() {
        const pager = {...this.state.pagination};
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            rows: pager.pageSize,
            page: pager.current,
        });
    }

    toSaveRfid(wzInfo){
        if (!confirm("确认修改当前组织机构经纬度信息吗?")) {
            return;
        }
        const THE = this;
        $.ajax({
            type : 'POST',
            url : SERVER+"xiugaiZuzhijigou",
            data : JSON.stringify(wzInfo),
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
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });


        return (
            <Table
                components={components}
                columns={columns}
                dataSource={this.state.wzList}
                pagination={this.state.pagination}
                onChange={this.handleTableChange}
                scroll={{ y: "calc(100vh - 370px)", x: true }}
            />
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
