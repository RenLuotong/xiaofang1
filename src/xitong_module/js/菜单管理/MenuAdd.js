import React, { Component } from 'react'
import { Button, Icon, Input, Table, Tooltip, Modal, notification, Checkbox, Tree, message, Row, Col, Form, Radio } from 'antd';
import './Menu.less'
import MenuTreeSelect from './MenuTreeSelect';
import RoleSelect from './RoleSelcet';

const { confirm } = Modal
const { TreeNode } = Tree
class MenuAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MenuTree: [],
      expandedKeys: [],
      checkedKeys: [],
      selectedMenuDetail:[],
    }
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    const THE = this
    $.ajax({
      type:'GET',
      url:SERVER+"caidan/all?fenlei=WEB",
      success:function(data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }

        THE.setState({
          MenuTree: data.data
        })
        // 获取所有ids 数组 方便展开折叠 全选等操作
        THE.allMenuKeys = []
        const getAllIds = arr => {
          arr.forEach(item => {
            THE.allMenuKeys.push(item.key)
            if (item.children) getAllIds(item.children)
          })
        }
        getAllIds(data.data)
      }
    });
  }

  add = () => {
    this.props.form.validateFields((err,values) => {
      if(err) return false
      values.fenlei = 'WEB'
      $.ajax({
        type:'POST',
        url:SERVER+'caidan/xinzeng-caidan',
        data: JSON.stringify(values),
        dataType : 'json',
        contentType : "application/json",
        success:function(data) {
          if (data.status != 0) {
            message.warning(data.message);
            return;
          }
          message.success('新增成功')
        }
      });
    });
  }

  addRole = () => {
    const THE = this

    let jueseList = []
    for(const item of list){
      jueseList.push({ juesebianhao: item })
    }
    const data = {
      caidanbianhao: this.state.selectedMenuDetail.caidanbianhao,
      includeZicaidan: '是',
      jueseList
    }


    $.ajax({
      type:'POST',
      url:SERVER+'caidan/xiugai-juese',
      data: JSON.stringify(data),
      dataType : 'json',
      contentType : "application/json",
      success:function(data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success('授权角色成功')
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      }
    }
    return (
      <div className='page_menu_add'>
        <Form {...formItemLayout} colon={false}>
          <Form.Item label='上级菜单：'>
            {getFieldDecorator('shangjibianhao', {
            })(<MenuTreeSelect  />)}
          </Form.Item>
          <Form.Item label='菜单名称：'>
            {getFieldDecorator('mingcheng', {
              rules: [
                {
                  required: true,
                  message: '必填!'
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label='链接(Href)：'>
            {getFieldDecorator('luyou', {
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label='排序(升序)：'>
            {getFieldDecorator('paixu', {
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label='菜单图标：'>
            {getFieldDecorator('tubiao', {
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label=' '>
            <Button type='default' onClick={()=>{this.props.history.goBack()}} style={{ marginRight: 10 }}>返回</Button>
            <Button type='primary' onClick={this.add}>提交</Button>
          </Form.Item>
        </Form>
       </div>
    )
  }
}

export default Form.create()(MenuAdd)
