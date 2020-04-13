import React, {Component} from 'react'
import { Table, Input, DatePicker, Form, Modal, Button, Icon, Popconfirm, message , Tabs, Select} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Option } = Select
const { TabPane } = Tabs
const FormItem = Form.Item;

class ChildList extends Component{
  constructor (props) {
    super(props)
    this.state={
      pagination: {
        current : 1,
        showQuickJumper: true,
        showSizeChanger: true
      },
      pagination2: {
        current : 1,
        showQuickJumper: true,
        showSizeChanger: true
      },
      dataSource:[],
      dataSource2:[],
      biaoti: '',
      paixu: null,
    }
  }

  componentDidMount() {
    this.fetch();
    this.getWenzhang();
  }

  fetch = (params = {
    rows: this.state.pagination.pageSize,
    page: this.state.pagination.current
  }) => {
    let val = {};
    let _this = this;
    let page = params.page - 1;
    let size = params.rows === undefined ? 10 : params.rows;
    $.ajax({
      type:'GET',
      url: SERVER + `yunsousuo/zilanmu-page`,
      data: {
        zhulanmubianhao: this.props.match.params.id,
        page: page,
        size: size
      },
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.content.length; i++) {
          list.push(data.data.content[i]);
        }
        const pagination = { ..._this.state.pagination };
        pagination.total = data.data.totalElement;
        _this.setState({
          dataSource: list,
          pagination,
        });
      }
    });
  }

  getWenzhang = (params = {
    rows: this.state.pagination2.pageSize,
    page: this.state.pagination2.current
  }) => {
    let val = {};
    let _this = this;
    let page = params.page - 1;
    let size = params.rows === undefined ? 10 : params.rows;

    this.props.form.validateFields((err, values) => {
      //字符串拼接搜索条件  逗号拼接
      let name = values.biaoti;
      let zilanmubianhao = values.zilanmubianhao;
      let data = {
        zhulanmubianhao: this.props.match.params.id,
        biaoti: name,
        zilanmubianhao: zilanmubianhao,
        page: page,
        size: size
      }
      $.ajax({
        type:'GET',
        url: SERVER + `yunsousuo/wenzhang-page`,
        data: data,
        success: function (data) {
          let list = [];
          if (data.status != 0) {
            message.warning(data.message);
            return;
          }
          for (let i = 0; i < data.data.content.length; i++) {
            list.push(data.data.content[i]);
          }
          const pagination2 = { ..._this.state.pagination2 };
          pagination2.total = data.data.content.totalElement;
          _this.setState({
            dataSource2: list,
            pagination2,
          });
        }
      });
    })
  }

  handleTableChange = (pagination, filters) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current - 1
    this.setState({ pagination })
    this.fetch({
      page: pager.current,
      ...filters
    })
  }

  delLanmu = (e) => {
    let _this = this;
    let data = {
      zilanmubianhao: e
    }
    $.ajax({
      type : 'post',
      url : SERVER + `yunsousuo/shanchu-zilanmu`,
      data: data,
      contentType : "application/x-www-form-urlencoded;charset=UTF-8",
      success : function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }else {
          _this.fetch();
        }
      }
    });
  }

  showModal = (record=null) => {
    this.updateId = record ? record.zilanmubianhao : null  // 根据UpdateId判断当前是新增or修改
    this.setState({
      modal: true
    })
    if(record !== null){
      this.setState({
        biaoti: record.biaoti,
        paixu: record.paixu
      })
    }
  }

  update = () => {
    let _this = this;
    if(this.updateId === undefined){
      if(this.state.biaoti === ""){
        return message.warning("请输入子栏目名称!");
      }
      let data = {
        biaoti: this.state.biaoti,
        zhulanmubianhao: this.props.match.params.id
      }
      if(this.state.paixu !== null && this.state.paixu !== "" && this.state.paixu !== undefined){
        if(isNaN(this.state.paixu)){
          return message.warning("排序请输入数字!");
        }else {
          data["paixu"] = this.state.paixu
        }
      }
      $.ajax({
        type : 'post',
        url : SERVER + "yunsousuo/xinzeng-zilanmu",
        data: JSON.stringify(data),
        dataType : 'json',
        contentType : "application/json",
        success : function (data) {
          if (data.status != 0) {
            message.warning(data.message);
            return;
          }
          else {
            _this.setState({
              biaoti: '',
              paixu: null,
              modal: false
            })
            _this.fetch();
          }
        }
      });
    }else {
      if(this.state.biaoti === ""){
        return message.warning("请输入子栏目名称!");
      }
      let data = {
        biaoti: this.state.biaoti,
        zilanmubianhao: this.updateId
      }
      if(this.state.paixu !== null && this.state.paixu !== "" && this.state.paixu !== undefined){
        if(isNaN(this.state.paixu)){
          return message.warning("排序请输入数字!");
        }else {
          data["paixu"] = this.state.paixu
        }
      }
      $.ajax({
        type : 'post',
        url : SERVER + "yunsousuo/xiugai-zilanmu",
        data: JSON.stringify(data),
        dataType : 'json',
        contentType : "application/json",
        success : function (data) {
          if (data.status != 0) {
            message.warning(data.message);
            return;
          }
          else {
            _this.setState({
              biaoti: '',
              paixu: null,
              modal: false
            })
            _this.fetch();
          }
        }
      });
    }
  }

  onChangeInput = (e) => {
    if(e.target.name === "biaoti"){
      this.setState({
        biaoti: e.target.value
      })
    }
    if(e.target.name === "paixu"){
      this.setState({
        paixu: e.target.value
      })
    }
  }

  search = () => {
    this.getWenzhang()
  }

  delZilanmu = (e) => {
    let _this = this;
    let data = {
      wenzhangbianhao: e
    }
    $.ajax({
      type : 'post',
      url : SERVER + `yunsousuo/shanchu-wenzhang`,
      data: data,
      contentType : "application/x-www-form-urlencoded;charset=UTF-8",
      success : function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }else {
          _this.getWenzhang();
        }
      }
    });
  }

  addWenzhang = () => {
    window.location.href = `#/list/addwenzhang/${this.props.match.params.id}`;
  }

  toWenzhangXiangqing = (e) => {
    window.location.href = `#/list/wenzhangxiangqing/${e}`;
  }

  toEditwenzhang = (e) => {
    window.location.href = `#/list/editwenzhang/${this.props.match.params.id}/${e}`;
  }

  render () {
    const columns = [{
      title: '子栏目名称',
      dataIndex: 'biaoti',
      width: '30%'
    }, {
      title: '创建时间',
      dataIndex: 'chuangjianshijian',
      width: '40%',
      render: (text) => {
        return (
          moment(text).format('YYYY-MM-DD HH:mm:ss')
        )
      }
    }, {
      title: '操作',
      width: '30%',
      render: (text, record, index) => (
        <span>
            <Button type='link' onClick={this.showModal.bind(this,record)}>修改</Button>
            <Popconfirm placement="topLeft" title="确认要删除?" onConfirm={this.delLanmu.bind(this,record.zilanmubianhao)} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			  </span>
      ),
    }];
    const columns2 = [{
      title: '子栏目名称',
      dataIndex: 'zilanmubiaoti',
      width: '25%'
    }, {
      title: '文章名称',
      dataIndex: 'biaoti',
      width: '25%'
    }, {
      title: '浏览次数',
      dataIndex: 'liulancishu',
      width: '25%'
    }, {
      title: '操作',
      render: (text, record, index) => (
        <span>
          <a onClick={this.toWenzhangXiangqing.bind(this,record.wenzhangbianhao)}>详情</a>
          <Button type='link' onClick={this.toEditwenzhang.bind(this,record.wenzhangbianhao)}>修改</Button>
          <Popconfirm placement="topLeft" title="确认要删除?" onConfirm={this.delZilanmu.bind(this,record.wenzhangbianhao)} okText="确认" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
			  </span>
      ),
    }];
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Tabs>
          <TabPane tab="子类目" key="1">
            <Button type='primary' onClick={this.showModal}>新增子类目</Button> <br/><br/>
            <Table
              columns={columns}
              rowKey={record => record.id}
              dataSource={this.state.dataSource}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
              scroll={{ y: "calc(100vh - 425px)", x: true }}
            />
          </TabPane>
          <TabPane tab="文章" key="2">
            <Form layout="inline" style={{margin: 5}}>
              <FormItem label="子栏目">
                {getFieldDecorator('zilanmubianhao', {
                })(
                  <Select style={{ width: 174 }} allowClear>
                    {
                      this.state.dataSource && this.state.dataSource.map((item)=>{
                        return(
                          <Option key={item.zilanmubianhao} value={item.zilanmubianhao}>{item.biaoti}</Option>
                        )
                      })
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem label="文章名称">
                {getFieldDecorator('biaoti')(
                  <Input style={{padding: '4px 11px',height: 'auto',textAlign: 'left',color: 'rgba(0,0,0,0.65)',fontSize: '14px'}}/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary"  onClick={this.search}>
                  <Icon type="search" />查询
                </Button>
              </FormItem>
              <FormItem>
                <Button onClick={this.addWenzhang}>
                  <Icon type="plus" />新增
                </Button>
              </FormItem>
            </Form>
            <Table
              columns={columns2}
              rowKey={record => record.id}
              dataSource={this.state.dataSource2}
              pagination={this.state.pagination2}
              onChange={this.handleTableChange2}
              scroll={{ y: "calc(100vh - 425px)", x: true }}
            />
          </TabPane>
        </Tabs>

        <Modal
          visible={this.state.modal}
          width={500}
          title={this.updateId ? '修改子类目' : '新增子类目'}
          okText='提交'
          onOk={this.update}
          onCancel={() => {
            this.setState({ modal: false })
          }}
        >
          <div>
            <span style={{width: '100px',display:'inline-block'}}>子栏目名称：</span>
            <Input style={{ width: '70%' }} value={this.state.biaoti} name="biaoti" onChange={this.onChangeInput} /> <br/><br/>
            <span style={{width: '100px',display:'inline-block'}}>排序：</span>
            <Input style={{ width: '70%' }} value={this.state.paixu} name="paixu" onChange={this.onChangeInput} />
          </div>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(ChildList)
