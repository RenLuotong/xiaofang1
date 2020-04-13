import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import xiaofangchechaxunxiangqing from './qicai_zhongduiganbu_xiaofangchechaxunxiangqing';
import qicai_zhongduiganbu_xiaofangchetianjia from './qicai_zhongduiganbu_xiaofangchetianjia';
import xiaofangchechaxunxiugai from './qicai_zhongduiganbu_xiaofangchechaxunxiugai';
import {Select,Icon,Input,Form,Button,Table,Divider,Popconfirm,message,Tabs,InputNumber,Modal} from 'antd';
const FormItem = Form.Item;

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
                    <Route path = {this.props.match.path +'/xiaofangchechaxunxiangqing/:id'} component = {xiaofangchechaxunxiangqing} />
                    <Route path = {this.props.match.path +'/xiaofangchechaxunxiugai/:id'} component = {xiaofangchechaxunxiugai} />
                    <Route path = {this.props.match.path +'/qicai_zhongduiganbu_xiaofangchetianjia'} component = {qicai_zhongduiganbu_xiaofangchetianjia} />
                </Switch>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            xiaofangcheList: [],
            cheliangbianhao:null,
            xiaofangcheid: null,
            zhidingbaoyangshijian: null,
            pagination: {
              current : 1,
              showQuickJumper: true,
              showSizeChanger: true
            },
            shoujiaoid: null,
            visible: false,
            leixing:'',
            showhide: 'inline',
            cangku:'',
            cunfangdidian:'',
            cangkuList: [],
            cunfangdidianList: [],
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
            cunfangdidianList:[],
            cunfangdidian:''
        });
    }
    hideModal = () => {
        this.setState({
            visible: false,
            cunfangdidianList:[],
            cunfangdidian:''
        });
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
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

    toDelete(id) {
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER + "shanchuXiaofangche?id="+id,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success('删除成功');
                THE.getList();
            }
        });
    }

    fetch = (params = {
        rows: this.state.pagination.pageSize,
        page: this.state.pagination.current
    }) => {
        let form = this.props.form;
        let chepaihaoma = form.getFieldValue('chepaihaoma');
        if (typeof(chepaihaoma) == "undefined") {
            chepaihaoma = "";
        }
        let xiaofangchezhuangtai = form.getFieldValue('xiaofangchezhuangtai');
        if (typeof(xiaofangchezhuangtai) == "undefined"||xiaofangchezhuangtai == "-1") {
            xiaofangchezhuangtai = "";
        }
        let chujingzhuangtai = form.getFieldValue('chujingzhuangtai');
        if (typeof(chujingzhuangtai) == "undefined"||chujingzhuangtai == "-1") {
            chujingzhuangtai = "";
        }
        let page = params.page - 1;
      let size = params.rows === undefined ? 10 : params.rows;
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "chaxunXiaofangcheNewList?page="+page+"&size="+size+"&chepaihaoma="+chepaihaoma
            +"&xiaofangchezhuangtai="+xiaofangchezhuangtai+"&chujingzhuangtai="+chujingzhuangtai,
            dataType : 'json',
            contentType : "application/json",
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
                    xiaofangcheList: list,
                    pagination,
                });
            }
        });
    }

    // getXiaofangcheleixingList(value) {
    //     const THE = this;
    //     $.ajax({
    //         type:'GET',
    //         url : SERVER + "xiaofangcheleixingliebiao",
    //         success : function(data){
    //             if (data.status != 0) {
    //                 message.warning(data.message);
    //                 return;
    //             }
    //             for (let i = 0; i < data.data.length; i++) {
    //                 data.data[i]["key"] = i;
    //             }
    //             THE.setState({
    //                 xiaofangcheleixingList : data.data,
    //                 leixing : value,
    //             });
    //         }
    //     });
    // }


    componentDidMount() {
        this.fetch();
        // let juese = sessionStorage.getItem('jueselist');
        // let ss = juese.split(',');
        // for(let i=0;i<ss.length;i++){
        //     if(ss[i] === "1"){
        //         this.setState({
        //             showhide: 'inline'
        //         })
        //     }
        // }
    }

    baoting(id){
        const THE = this;
        if(sessionStorage.getItem("jigoumingcheng") === "战保大队" || sessionStorage.getItem("jigoumingcheng") === "特勤中队"){
            $.ajax({
                type:'POST',
                url: SERVER + "shenpiXiaofangcheWeixiujilu?shenqingdanbianhao="+id+"&shenpizhuangtai=中队干部同意报停",
                // data : JSON.stringify(),
                dataType : 'json',
                contentType : "application/json",
                success: function (data) {
                    if (data.status != 0) {
                        message.warning(data.message);
                        return;
                    }
                    message.success("提交报停申请");
                    THE.fetch();
                }
            });
        }else {
            $.ajax({
                type:'POST',
                url: SERVER + "shenpiXiaofangcheWeixiujilu?shenqingdanbianhao="+id+"&shenpizhuangtai=报停申请大队",
                // data : JSON.stringify(),
                dataType : 'json',
                contentType : "application/json",
                success: function (data) {
                    if (data.status != 0) {
                        message.warning(data.message);
                        return;
                    }
                    message.success("提交报停申请");
                    THE.fetch();
                }
            });
        }
    }

    weixiuwancheng(id){
        const THE = this;
        $.ajax({
            type:'POST',
            url: SERVER + "shenpiXiaofangcheWeixiujilu?shenqingdanbianhao="+id+"&shenpizhuangtai=维修完成",
            // data : JSON.stringify(),
            dataType : 'json',
            contentType : "application/json",
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success("维修完成");
                THE.fetch();
            }
        });
    }

    getcunfangdidianList() {
        const THE = this;
        $.ajax({
            type:'GET',
            url: SERVER + "cunfangdidianByLeixing",
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
                    cunfangdidianList: list,
                });
            }
        });
    }

    shoujiaokuang(cheliangbianhao) {
        this.getcunfangdidianList();
        this.setState({
            cheliangbianhao: cheliangbianhao,
            visible: true,
        })
    }
    qicaishoujiao() {
        const THE = this;
        let cheliangbianhao = this.state.cheliangbianhao;
        let cunfangdidianid = this.state.cunfangdidian;
        $.ajax({
            type:'post',
            url:SERVER+"xiaofangcheqicaishoujiao?cunfangdidianid="+cunfangdidianid+"&cheliangbianhao="+cheliangbianhao,
            data:JSON.stringify(),
            dataType:'json',
            contentType: "application/json",
            success:function(data){
                if(data.status != 0){
                    message.warning(data.message);
                    return;
                }
                THE.setState({
                    visible: false,
                    cunfangdidianList:[],
                    cunfangdidian:''
                })
                message.success("收缴成功");
                THE.fetch();
            }
        });
    }

    cunfangdidianChange(value) {
        this.setState({
            cunfangdidian: value,
        });

    }
//
    toDelete(id) {
        const THE = this;
        let ids = [];
        ids.push(id);
        ids = JSON.stringify(ids);
        $.ajax({
            type: 'POST',
            url: SERVER + "shanchuXiaofangcheNew?ids="+ids,
            success: function (data) {
                if (data.status != 0) {
                    message.warning(data.message);
                    return;
                }
                message.success('删除成功');
                THE.fetch();
            }
        });
    }

    // piliangshanchu() {//批量删除
    //     const THE = this;
    //     let selectList = THE.state.selectList;
    //     let idList = [];
    //     if (selectList == null || selectList.length == 0) {
    //         message.warning("请选择要删除的消防车");
    //         return;
    //     } else {
    //         for (let i = 0; i < selectList.length; i++) {
    //             idList.push(selectList[i]['id']);
    //         }
    //     }
    //     if (!confirm("确定要删除这些消防车吗？")) {
    //         return;
    //     }
    //     idList = JSON.stringify(idList);
    //     $.ajax({
    //         type: 'POST',
    //         url: SERVER + "shanchuXiaofangcheNew?ids="+ids,
    //         success: function (data) {
    //             if (data.status != 0) {
    //                 message.warning(data.message);
    //                 return;
    //             }
    //             message.success('删除成功');
    //             THE.fetch();
    //         }
    //     });
    // }

    render() {

        let cunfangdidianOptions = this.state.cunfangdidianList.map(item =>
            <Select.Option key={item['key']} value={item['id']}>{item['cunfangdidianmingcheng']}</Select.Option>
        );

        // const rowSelection = {
        //     selectedRowKeys: this.state.selectedRowKeys,
        //     onChange: (selectedRowKeys, selectedRows) => {
        //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //         this.setState({
        //             selectedRowKeys : selectedRowKeys,
        //             selectList : selectedRows,
        //         });
        //     },
        // };

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            colSpan : 0,
            className:'hidden_col',
          width: '10%'
        }, {
            title: '消防车名称',
            dataIndex: 'xiaofangchemingcheng',
          width: '10%'
        }, {
            title: '车牌号码',
            dataIndex: 'chepaihaoma',
          width: '10%'
        }, {
            title: '车辆类型',
            dataIndex: 'xiaofangcheleixing',
          width: '10%'
        }, {
            title: '组织机构名称',
            dataIndex: 'jigoumingcheng',
          width: '10%'
        },
          {
              title: '车辆品牌',
              dataIndex: 'cheliangpinpai',
            width: '10%'
          }, {
              title: '水量',
              dataIndex: 'cheliangshuiguanrongliang',
          width: '10%'
          }, {
              title: '泡沫量',
              dataIndex: 'cheliangpaomoguanrongliang',
          width: '10%'
          },{
              title: '状态',
              dataIndex: 'xiaofangchezhuangtai',
              editable: true,
          }, {
              title: '操作',
              render: (text, record, index) => {
                  if (record['xiaofangchezhuangtai'] == "维修" || record['xiaofangchezhuangtai'] == "报停") {
                      return (
                   <span>
                <Link to={this.props.match.url + '/xiaofangchechaxunxiangqing/' + record['id']}>详情</Link>
                      <Divider style={{display:this.state.showhide}} type="vertical"/>
                <Link style={{display:this.state.showhide}} to={this.props.match.url + '/xiaofangchechaxunxiugai/' + record['id']}>修改</Link>
                       <Divider type="vertical"/>
                       <Popconfirm placement="topLeft" title="确认要删除该消防车?"
                                   onConfirm={this.toDelete.bind(this, record['id'])} okText="确认" cancelText="取消">
                         <a>删除</a>
                       </Popconfirm>
                       <Divider type="vertical"/>
                       <a onClick={this.shoujiaokuang.bind(this,record['cheliangbianhao'])}>器材收缴</a>
            </span>
                      )
                  } else {
                      return (
                  <span>
                <Link to={this.props.match.url + '/xiaofangchechaxunxiangqing/' + record['id']}>详情</Link>
                      <Divider style={{display:this.state.showhide}} type="vertical"/>
                <Link style={{display:this.state.showhide}} to={this.props.match.url + '/xiaofangchechaxunxiugai/' + record['id']}>修改</Link>
                      <Divider type="vertical"/>
                       <Popconfirm placement="topLeft" title="确认要删除该消防车?"
                              onConfirm={this.toDelete.bind(this, record['id'])} okText="确认" cancelText="取消">
                      <a>删除</a>
                       </Popconfirm>
            </span>
                      )
                  }
              },
          }];

        const {getFieldDecorator} = this.props.form;

        const {cunfangdidian} = this.state;

        return (
            <div>
                {/*<Modal*/}
                {/*    title="器材收缴"*/}
                {/*    visible={this.state.visible}*/}
                {/*    onOk={this.qicaishoujiao.bind(this)}*/}
                {/*    onCancel={this.hideModal}*/}
                {/*    okText="确认"*/}
                {/*    cancelText="取消"*/}
                {/*>*/}
                {/*    <label>收缴存放地点</label>*/}
                {/*    <Select style={{margin:5,width:200}} onChange={this.cunfangdidianChange.bind(this)} value={cunfangdidian}>*/}
                {/*        {cunfangdidianOptions}*/}
                {/*    </Select>*/}
                {/*</Modal>*/}
                <Form onSubmit={this.handleSubmit} layout="inline" style={{margin: 5}}>
                    <FormItem label="车牌号码">
                        {getFieldDecorator('chepaihaoma',)(
                            <Input style={{width:200}}/>
                        )}
                    </FormItem>
                    <FormItem label="消防车状态">
                        {getFieldDecorator('xiaofangchezhuangtai')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                <Select.Option value="正常">正常</Select.Option>
                                <Select.Option value="维修">维修</Select.Option>
                                <Select.Option value="报停">报停</Select.Option>
                                <Select.Option value="报废">报废</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="出警状态">
                        {getFieldDecorator('chujingzhuangtai')(
                            <Select style={{width:200}}>
                                <Select.Option value="-1">全部</Select.Option>
                                <Select.Option value="火灾">火灾</Select.Option>
                                <Select.Option value="抢险">抢险</Select.Option>
                                <Select.Option value="社会救助">社会救助</Select.Option>
                                <Select.Option value="增援">增援</Select.Option>
                                <Select.Option value="在营">在营</Select.Option>
                                <Select.Option value="其他">其他</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>
                            <Icon type="search" />查询
                        </Button>
                    </FormItem>
                    <br/>
                    <Button style={{margin:5,display:this.state.showhide}}>
                        <Link to={this.props.match.url+'/qicai_zhongduiganbu_xiaofangchetianjia' }><Icon type="plus" /><span>添加消防车</span></Link>
                    </Button>
                    {/*<br/>*/}
                    {/*<FormItem>*/}
                    {/*    <Button onClick={this.piliangshanchu.bind(this)}>*/}
                    {/*        批量删除*/}
                    {/*    </Button>*/}
                    {/*</FormItem>*/}
                </Form>
                <Table
                    // rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.xiaofangcheList}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    scroll={{ y: "calc(100vh - 405px)", x: true }}
                />
            </div>
        );
    }
}

const AppComp = Form.create()(App);

export default Appmain;
