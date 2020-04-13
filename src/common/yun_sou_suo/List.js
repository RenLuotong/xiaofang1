import React, {Component} from 'react'
import { Table, Input, DatePicker, Form, Modal, Button, Icon, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class List extends Component{
  constructor (props) {
    super(props)
    this.state={
      pagination: {
        current : 1,
        showQuickJumper: true,
        showSizeChanger: true
      },
      dataSource:[],
      biaoti: '',
      paixu: null,
      editbiaoti: '',
      editpaixu: null,
      visible: false
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = (params = {
    rows: this.state.pagination.pageSize,
    page: this.state.pagination.current
  }) => {
    let _this = this;
    let form = this.props.form;
    let page = params.page - 1;
    let size = params.rows === undefined ? 10 : params.rows;
    let kaishishijian = form.getFieldValue('date');
    let jieshushijian = form.getFieldValue('date');
    if(kaishishijian === undefined || kaishishijian === null || kaishishijian.length === 0){
      kaishishijian = ""
    }else {
      kaishishijian = kaishishijian[0].format('YYYY-MM-DD 00:00:01')
    }
    if(jieshushijian === undefined || jieshushijian === null || jieshushijian.length === 0){
      jieshushijian = ""
    }else {
      jieshushijian = jieshushijian[1].format('YYYY-MM-DD 23:59:59')
    }
    this.props.form.validateFields((err, values) => {
      //字符串拼接搜索条件  逗号拼接
      let name = values.name;
      let data = {
        page: page,
        size: size
      }
      if(name !== undefined || name !== null){
        data["biaoti"] = name
      }
      if(kaishishijian !== ""){
        data["chuangjianshijian_after"] = kaishishijian
      }
      if(jieshushijian !== ""){
        data["chuangjianshijian_before"] = jieshushijian
      }
      $.ajax({
        type:'GET',
        url: SERVER + "yunsousuo/zhulanmu-page",
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
          const pagination = { ..._this.state.pagination };
          pagination.total = data.data.totalElement;
          _this.setState({
            dataSource: list,
            pagination,
          });
        }
      });
    })
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

  showModal = record => {
    this.updateId = record.zhulanmubianhao;
    this.setState({
      modal: true,
      editbiaoti: record.biaoti,
      editpaixu: record.paixu
    })
  }

  update = () => {
    let _this = this;
    if(this.state.biaoti === ""){
      return message.warning("请输入栏目名称!");
    }
    let data = {
      biaoti: this.state.biaoti
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
      url : SERVER + "yunsousuo/xinzeng-zhulanmu",
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
            visible: false
          })
          _this.fetch();
        }
      }
    });
  }

  editData = () => {
    let _this = this;
    if(this.state.editbiaoti === ""){
      return message.warning("请输入栏目名称!");
    }
    let data = {
      biaoti: this.state.editbiaoti,
      zhulanmubianhao: this.updateId
    }
    if(this.state.editpaixu !== null || this.state.paixu !== ""){
      if(isNaN(this.state.editpaixu)){
        return message.warning("排序请输入数字!");
      }else {
        data["paixu"] = this.state.editpaixu
      }
    }
    $.ajax({
      type : 'post',
      url : SERVER + "yunsousuo/xiugai-zhulanmu",
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
            editbiaoti: '',
            editpaixu: '',
            modal: false
          })
          _this.updateId = null;
          _this.fetch();
        }
      }
    });
  }

  del = (e) => {
    let _this = this;
    $.ajax({
      type : 'post',
      url : SERVER + `yunsousuo/shanchu-zhulanmu/${e}`,
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

  addYun = (e) => {
    this.setState({
      visible: true
    })
  }

  addInput = (e) => {
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

  editInput = (e) => {
    if(e.target.name === "biaoti"){
      this.setState({
        editbiaoti: e.target.value
      })
    }
    if(e.target.name === "paixu"){
      this.setState({
        editpaixu: e.target.value
      })
    }
  }

  search = () => {
    this.fetch()
  }

  render () {
    const columns = [{
      title: '栏目名称',
      dataIndex: 'biaoti',
      width: '10%'
    }, {
      title: '创建时间',
      dataIndex: 'chuangjianshijian',
      width: '10%',
      render: (text) => {
        return (
          moment(text).format('YYYY-MM-DD HH:mm:ss')
        )
      }
    }, {
      title: '链接',
      dataIndex: 'url',
      render: (text) => {
        return (
          <a href={`${SERVERADDR}${text}`} target="_blank">{SERVERADDR}{text}</a>
        )
      }
    }, {
      title: '操作',
      width: '15%',
      render: (text, record, index) => (
        <span>
            <Link to={this.props.match.url + '/zhuangbeiguanli_zhongduirenyuan_zhuangbeixiangqing/' + record['zhulanmubianhao']}>详情</Link>
            <Button type='link' onClick={this.showModal.bind(this,record)}>修改</Button>
            <Popconfirm placement="topLeft" title="确认要删除?" onConfirm={this.del.bind(this,record.zhulanmubianhao)} okText="确认" cancelText="取消">
			        	<a>删除</a>
			    	</Popconfirm>
			  </span>
      ),
    }];
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form layout="inline" style={{margin: 5}}>
          <FormItem label="栏目名称">
            {getFieldDecorator('name')(
              <Input />
            )}
          </FormItem>
          <FormItem label="创建时间">
            {getFieldDecorator('date')(
              <RangePicker
                format={'YYYY-MM-DD'}
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary"  onClick={this.search}>
              <Icon type="search" />查询
            </Button>
          </FormItem>
          <FormItem>
            <Button onClick={this.addYun}>
              <Icon type="plus" />新增
            </Button>
          </FormItem>
        </Form>
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          scroll={{ y: "calc(100vh - 405px)", x: true }}
        />
        <Modal
          visible={this.state.modal}
          width={500}
          title='修改栏目'
          destroyOnClose
          okText='提交'
          onOk={this.editData}
          onCancel={() => {
            this.setState({ modal: false })
          }}
        >
          <div>
            <span style={{width: '80px',display:'inline-block'}}>栏目名称：</span>
            <Input style={{ width: '70%' }} value={this.state.editbiaoti} name="biaoti" onChange={this.editInput} />
            <br/><br/>
            <span style={{width: '80px',display:'inline-block'}}>排序：</span>
            <Input style={{ width: '70%' }} value={this.state.editpaixu} name="paixu" onChange={this.editInput} />
          </div>
        </Modal>
        <Modal
          visible={this.state.visible}
          width={500}
          title='新增栏目'
          destroyOnClose
          okText='提交'
          onOk={this.update}
          onCancel={() => {
            this.setState({ visible: false })
          }}
        >
          <div>
            <label style={{width: '80px',display:'inline-block'}}>栏目名称：</label>
            <Input style={{ width: '70%' }} value={this.state.biaoti} name="biaoti" onChange={this.addInput} />
            <br/><br/>
            <label style={{width: '80px',display:'inline-block'}}>排序：</label>
            <Input style={{ width: '70%' }} value={this.state.paixu} name="paixu" onChange={this.addInput} />
          </div>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(List)
