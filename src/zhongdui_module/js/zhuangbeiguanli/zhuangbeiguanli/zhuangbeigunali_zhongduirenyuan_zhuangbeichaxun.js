import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import zhuangbeiguanli_zhongduirenyuan_zhuangbeichaxunxiangqing from './zhuangbeiguanli_zhongduirenyuan_zhuangbeichaxunxiangqing';
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
        let xinghaoOptions = this.props.xinghaoOptions;
        if(title == '型号') {
            return  <Select style={{width:150}}>{xinghaoOptions}</Select>;
        }
        else{
            return <Input/>;
        }
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
			      	<Route path = {this.props.match.path +'/zhuangbeiguanli_zhongduirenyuan_zhuangbeichaxunxiangqing/:id'} component = {zhuangbeiguanli_zhongduirenyuan_zhuangbeichaxunxiangqing} />
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
                pageSize: 10,
                current: 1
            },
            editingKey: '',
            wzList: [],
            leixingList: [],
            xinghaoList: [],
            xinghaoList2: [],
            leixing: '',
			xinghao: '',
            xinghao2: '',
            renyuanList: [],
            renyuan: '',
            wzInfo: {},
            countInfo: {
            	zhiqinCount: 0,
            	beiqincount: 0,
            	baoxiucount: 0,
            	baofeicount: 0,
            	yijiKucunCount: 0,
            	erjiKucunCount: 0,
            	totalCount: 0,
            },
            showBtn: 'none',
            columns: [
                {
                    title: '编号',
                    dataIndex: 'id',
                    colSpan : 0,
                    className:'hidden_col'
                },{
                    title: '使用人',
                    dataIndex: 'shiyongren',
                }, {
                    title: '类型',
                    dataIndex: 'zhuangbeileixingmingcheng',
                }, {
                    title: '型号',
                    dataIndex: 'guigexinghao',
                    editable: true,
                }, {
                    title: '厂家',
                    dataIndex: 'shengchanchangjia',
                    editable: true,
                },
                {
                    title: '使用状态',
                    dataIndex: 'zhuangbeishiyongzhuangtai',
                }, {
                    title: '配发状态',
                    dataIndex: 'zhuangbeipeifazhuangtai',
                }, {
                    title: '入库时间',
                    dataIndex: 'rukushijian',
                    render: (text, record) =>(
                        moment(record.rukushijian).format('YYYY-MM-DD HH:mm:ss')
                    )
                },{
                    title: '操作',
                    render: (text, record, index) => (
                        <span>
                    	<Link to={this.props.match.url + '/zhuangbeiguanli_zhongduirenyuan_zhuangbeichaxunxiangqing/' + record['id']}>详情</Link>
			    	</span>
                    ),
                }
            ]
        };

        this.columns = [{
            title: '编号',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col'
        }, {
            title: '使用人',
            dataIndex: 'shiyongren',
        },{
                title: '类型',
                dataIndex: 'zhuangbeileixingmingcheng',
            }, {
                title: '型号',
                dataIndex: 'guigexinghao',
                editable: true,
            }, {
                title: '厂家',
                dataIndex: 'shengchanchangjia',
                editable: true,
            },
            {
                title: '使用状态',
                dataIndex: 'zhuangbeishiyongzhuangtai',
            }, {
                title: '配发状态',
                dataIndex: 'zhuangbeipeifazhuangtai',
            }, {
                title: 'RFID',
                dataIndex: 'rFID',
                width: '318px',
                editable: true,
            },{
                title: '入库时间',
                dataIndex: 'rukushijian',
                render: (text, record) =>(
                    moment(record.rukushijian).format('YYYY-MM-DD HH:mm:ss')
                )
            },
            {
                title: '编辑装备信息',
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
                                <a onClick={() => this.edit(record.key,record.zhuangbeileixingmingcheng)}>编辑</a>
                            )}
                        </div>
                    );
                },
            },{
                title: '操作',
                render: (text, record, index) => (
                    <span>
                    	<Link to={this.props.match.url + '/zhuangbeiguanli_zhongduirenyuan_zhuangbeichaxunxiangqing/' + record['id']}>详情</Link>
			    	</span>
                ),
            }
        ];
    }

    delqicai() {
        const THE = this;
        let selectList = THE.state.selectList;
        let idList = [];
        if (selectList == null || selectList.length == 0) {
            message.warning("请选择要删除的装备");
            return;
        } else {
            for (let i = 0; i < selectList.length; i++) {
                idList.push(selectList[i]['zhuangbeibianhao']);
            }
        }
        if (!confirm("确定要删除这些装备吗？")) {
            return;
        }
        let qicaishenqingShenpiVM = {};
        qicaishenqingShenpiVM.zhuangbeibianhaos = idList;
        let cangkujibie = '二级库';
        $.ajax({
            type:'GET',
            url: SERVER + "zhuangbei/shanchu?cangkujibie="+cangkujibie,
            data : {
                zhuangbeibianhaos: JSON.stringify(idList)
            },
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("删除成功");
                THE.setState({
                    selectedRowKeys: [],
                    selectList: [],
                });
                THE.fetch();
            }
        });
    }

    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };
    edit(key,zhuangbeileixingmingcheng) {
        this.getXinghaoList2(zhuangbeileixingmingcheng);
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
                const rfidNew = newData[index].rFID;
                newData[index].rFID = rfidNew;
                console.log(newData);

                // this.setState({editingKey: '' });
                this.toSaveRfid(newData[index]);
            } else {
                newData.push(wzList);
                this.setState({ wzList: newData, xinghaoList2:''});
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
        let juese = '二级库管员';
        let shiyongren = this.state.renyuan;
        if (shiyongren == "-1" || typeof(shiyongren) == "undefined") {
            shiyongren = '';
        }
        let rFID = form.getFieldValue('rFID');
        if (typeof(rFID) == "undefined") {
        	rFID = "";
        }
        let shengchanchangjia = form.getFieldValue('shengchanchangjia');
        if (typeof(shengchanchangjia) == "undefined") {
            shengchanchangjia = "";
        }
        let zhuangbeipeifazhuangtai = form.getFieldValue('zhuangbeipeifazhuangtai');
        if (typeof(zhuangbeipeifazhuangtai) == "undefined"||zhuangbeipeifazhuangtai == "-1") {
        	zhuangbeipeifazhuangtai = "";
        }
        let zhuangbeileixingmingcheng = this.state.leixing;
        if (zhuangbeileixingmingcheng == "-1" || typeof(zhuangbeileixingmingcheng)  == "undefined") {
        	zhuangbeileixingmingcheng = "";
        }
        let guigexinghao = this.state.xinghao;
        if (guigexinghao == "-1" || typeof(guigexinghao) == "undefined") {
        	guigexinghao = "";
        }
        let zhuangbeishiyongzhuangtai = this.zhuangbeishiyongzhuangtai;
        if (zhuangbeishiyongzhuangtai == "-1" || typeof(zhuangbeishiyongzhuangtai) == "undefined") {
        	zhuangbeishiyongzhuangtai = "";
        }
        let page = params.page - 1;
        let size = params.rows;
        const THE = this;
    	$.ajax({
            type:'GET',
			url: SERVER + "GerenfangfuZhuangbeiList?page="+page+"&size="+size+"&juese="+juese+"&shiyongren="+shiyongren+"&rFID="+rFID+"&shengchanchangjia="+shengchanchangjia+"&zhuangbeipeifazhuangtai="+zhuangbeipeifazhuangtai+"&zhuangbeileixingmingcheng="+zhuangbeileixingmingcheng+"&guigexinghao="+guigexinghao+"&zhuangbeishiyongzhuangtai="+zhuangbeishiyongzhuangtai+"&sort=id,desc",
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                let list = [];
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                for (let i = 0; i < data.data.content.length; i++) {
                    data.data.content[i]["key"] = data.data.content[i]["id"];
                    // let m1 = moment(data.data.content[i].rukushijian),
                    //     m2 = moment(new Date);
                    // if(m2.diff(m1, 'days')>0){
                    //     data.data.content[i]["flagDay"] = true;
                    // }
            		list.push(data.data.content[i]);
                }
                let countInfo = THE.state.countInfo;
                countInfo.zhiqinCount = data.data.zhiqinCount;
                countInfo.beiqincount = data.data.beiqincount;
                countInfo.baoxiucount = data.data.baoxiucount;
                countInfo.baofeicount = data.data.baofeicount;
                countInfo.yijiKucunCount = data.data.yijiKucunCount;
                countInfo.erjiKucunCount = data.data.erjiKucunCount;
                countInfo.totalCount = data.data.totalCount;

                const pagination = { ...THE.state.pagination };
                pagination.total = data.data.totalElement;
                THE.setState({
                    wzList: list,
                    countInfo: countInfo,
                    pagination,
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
        if (!confirm("确认修改当前装备信息吗?")) {
            return;
        }
        const THE = this;
        $.ajax({
            type : 'POST',
            url : SERVER+"editZhuangbeiXinxi",
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

    getrenyuanList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "zhongduiXiaofangyuans",
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

    renyuanChange(value) {
        this.setState({
            renyuan: value,
        });
    }

  	getleixingList() {
  		const THE = this;
    	$.ajax({
            type:'GET',
            url: SERVER + "zhuangbeileixingliebiao?zhuangbeileibiemingcheng=个人防护装备",
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
                    leixingList: list,
                });
            }
        });
  	}

  	zhuangbeishiyongzhuangtai = ''
  	callback(key) {
		this.zhuangbeishiyongzhuangtai = key;
        this.fetch();
	}

  	getXinghaoList(value) {
        let leibie = '个人防护装备';
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "queryguigexinghao?leixing="+value+"&leibie="+leibie,
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
                	leixing: value,
                	xinghao: '',
                    xinghaoList: list,
                });
            }
        });
  	}

    getXinghaoList2(value) {
        let leibie = '个人防护装备';
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "queryguigexinghao?leixing="+value+"&leibie="+leibie,
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
                    xinghao2: '',
                    xinghaoList2: list,
                });
            }
        });
    }

  	xinghaoChange(value) {
  		this.setState({
        	xinghao: value,
        });
  	}


    componentWillUnmount() {
        View.fields = this.props.form.getFieldsValue();
        View.pagination = this.state.pagination;
        View.renyuan = this.state.renyuan;
        View.leixing = this.state.leixing;
        View.xinghao = this.state.xinghao;
    }

    componentWillMount(){
        const { fields,pagination,renyuan,leixing,xinghao } = View;
        this.props.form.setFieldsValue(fields);
        this.setState({
            renyuan: renyuan,
            leixing: leixing,
            xinghao: xinghao,
        });
        if(typeof(pagination) !== "undefined"){
            this.setState({
                pagination: pagination,
            });
        }
    }


    componentDidMount() {
      this.getleixingList();
      this.getrenyuanList();
      this.fetch();
        let juese = sessionStorage.getItem('jueselist');
        let ss = juese.split(',');
        for(let i=0;i<ss.length;i++){
            if(ss[i] === "3" || ss[i] === "4"){
                this.setState({
                    showBtn: 'inline-block',
                    columns:[
                        {
                            title: '编号',
                            dataIndex: 'id',
                            colSpan : 0,
                            className:'hidden_col'
                        },{
                            title: '使用人',
                            dataIndex: 'shiyongren',
                        },  {
                            title: '类型',
                            dataIndex: 'zhuangbeileixingmingcheng',
                        }, {
                            title: '型号',
                            dataIndex: 'guigexinghao',
                            editable: true,
                        }, {
                            title: '厂家',
                            dataIndex: 'shengchanchangjia',
                            editable: true,
                        },
                        {
                            title: '使用状态',
                            dataIndex: 'zhuangbeishiyongzhuangtai',
                        }, {
                            title: '配发状态',
                            dataIndex: 'zhuangbeipeifazhuangtai',
                        }, {
                            title: 'RFID',
                            dataIndex: 'rFID',
                            width: '318px',
                            editable: true,
                        },{
                            title: '入库时间',
                            dataIndex: 'rukushijian',
                            render: (text, record) =>(
                                moment(record.rukushijian).format('YYYY-MM-DD HH:mm:ss')
                            )
                        },
                        {
                            title: '编辑装备信息',
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
                                            <a onClick={() => this.edit(record.key,record.zhuangbeileixingmingcheng)}>编辑</a>
                                        )}
                                    </div>
                                );
                            },
                        },{
                            title: '操作',
                            render: (text, record, index) => (
                                <span>
                    	<Link to={this.props.match.url + '/gerenfanghu_erjikuguanyuan_zhuangbeichaxunxiangqing/' + record['id']}>详情</Link>
			    	</span>
                            ),
                        }
                    ]
                })
            }
        }
    }

    render() {
        let leixingOptions = this.state.leixingList.map(item =>
        	<Select.Option key={item['key']} value={item['zhuangbeileixingmingcheng']}>{item['zhuangbeileixingmingcheng']}</Select.Option>
        );
        let xinghaoOptions = this.state.xinghaoList.map(item =>
        	<Select.Option key={item['key']} value={item['leixingzhi']}>{item['leixingzhi']}</Select.Option>
        );
        let editXinghaoOptions = this.state.xinghaoList2.map(item =>
            <Select.Option key={item['key']} value={item['leixingzhi']}>{item['leixingzhi']}</Select.Option>
        );
        let renyuanOptions = this.state.renyuanList.map(item =>
            <Select.Option key={item['key']} value={item['xingming']}>{item['xingming']}</Select.Option>
        );

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
                    xinghaoOptions: editXinghaoOptions,
                }),
            };
        });

        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys : selectedRowKeys,
                    selectList : selectedRows,
                });
            },
            // getCheckboxProps: record => ({
            //     disabled: record.zhuangbeishiyongzhuangtai !== '二级库存', // 状态非申请中不可以选
            // }),
        };

        const {getFieldDecorator} = this.props.form;
        const {leixing, xinghao,renyuan} = this.state;

        let juese = sessionStorage.getItem('jueselist');
        let ss = juese.split(',');
        let Table1;
        for(let i=0;i<ss.length;i++) {
            if (ss[i] === "3" || ss[i] === "4") {
                Table1= (
                    <Table
                        rowSelection={rowSelection}
                        components={components}
                        columns={columns}
                        dataSource={this.state.wzList}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                    />
                )
                break;
            }else{
                Table1= (
                    <Table
                        components={components}
                        columns={columns}
                        dataSource={this.state.wzList}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                    />
                )
            }
        }


        let tableList;
        tableList = (
        	<div>
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin:5}}>
                    <FormItem label="姓名">
                        <Select
                            style={{width:200}}
                            onChange={this.renyuanChange.bind(this)}
                            value={renyuan}
                            showSearch
                            optionFilterProp="children"
                        >
                            <Select.Option value="-1">全部</Select.Option>
                            {renyuanOptions}
                        </Select>
                    </FormItem>
                    <FormItem label="RFID">
                        {getFieldDecorator('rFID',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="配发状态">
                        {getFieldDecorator('zhuangbeipeifazhuangtai')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                <Select.Option value="已配发">已配发</Select.Option>
                                <Select.Option value="未配发">未配发</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem label="类型">
                        <Select
                        	style={{width:200}}
                        	onChange={this.getXinghaoList.bind(this)}
            				value={leixing}
                        	showSearch
                        	optionFilterProp="children"
                        >
                            <Select.Option value="-1">全部</Select.Option>
                            {leixingOptions}
                        </Select>
                    </FormItem>
                    <FormItem label="型号">
                        <Select
                        	style={{width:200}}
                        	onChange={this.xinghaoChange.bind(this)}
                        	value={xinghao}
                        	showSearch
                        	optionFilterProp="children"
                        >
                            <Select.Option value="-1">全部</Select.Option>
                            {xinghaoOptions}
                        </Select>
                    </FormItem>
                    <FormItem label="生产厂家">
                        {getFieldDecorator('shengchanchangjia',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button onClick={this.delqicai.bind(this)} style={{display:this.state.showBtn}}>
                            <Icon type="delete" />删除
                        </Button>
                    </FormItem>
                </Form>
                {Table1}
            </div>
        )

        const TabPane = Tabs.TabPane;
        let countInfo = this.state.countInfo;
        let baoxiuCount = "维修 " + countInfo.baoxiucount + "件";
        let beiqinCount = "备勤 " + countInfo.beiqincount + "件";
        let totalCount = "全部 " + countInfo.totalCount + "件";
        let zhiqinCount = "执勤 " + countInfo.zhiqinCount + "件";
        let baofeiCount = "报废 " + countInfo.baofeicount + "件";
        let erjiKucunCount = "二级库存 " + countInfo.erjiKucunCount + "件";

        return (
            <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)} type="card">
			    <TabPane tab={totalCount} key="-1">{tableList}</TabPane>
			    <TabPane tab={zhiqinCount} key="执勤">{tableList}</TabPane>
			    <TabPane tab={beiqinCount} key="备勤">{tableList}</TabPane>
			    <TabPane tab={baoxiuCount} key="维修">{tableList}</TabPane>
			    <TabPane tab={baofeiCount} key="报废">{tableList}</TabPane>
			    <TabPane tab={erjiKucunCount} key="二级库存">{tableList}</TabPane>
		  	</Tabs>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
