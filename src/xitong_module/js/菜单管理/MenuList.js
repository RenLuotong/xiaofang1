import React, { Component } from 'react'
import { Button, Icon, Input, Table, Tooltip, Modal, notification, Checkbox, Tree, message, Row, Col, Form, Radio } from 'antd';
import './Menu.less'
import MenuTreeSelect from './MenuTreeSelect';
import RoleSelect from './RoleSelcet';

const { confirm } = Modal
const { TreeNode } = Tree
class MenuList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MenuTree: [],
      expandedKeys: [],
      selectedMenuDetail:[],
    }
    this.allMenuKeys = []
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

  getMenuDetail = (selectedKeys, e) => {
    if (!selectedKeys[0])  return
    const THE = this

    THE.getRole(selectedKeys[0])

    $.ajax({
      type:'GET',
      url:SERVER+"caidan/detail?caidanbianhao="+selectedKeys[0],
      success:function(data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        THE.setState({
          selectedMenuDetail: data.data
        })
        THE.props.form.setFieldsValue(data.data);
      }
    });
  }

  getRole = (caidanbianhao) => {
    const THE = this
    $.ajax({
      type:'GET',
      url:SERVER+"caidan/juese-all?caidanbianhao="+caidanbianhao,
      success:function(data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        let arr = []
        for(const item of data.data){
          arr.push(item.juesebianhao)
        }
        THE.props.form.setFieldsValue({ role: arr });
      }
    });
  }


  expandAllorNot = isExpand => {
    this.setState({ expandedKeys: isExpand ? this.allMenuKeys : [] })
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys
    })
  }


  // 删除
  showDeleteConfirm = () => {
    const { selectedMenuDetail } = this.state
    if ( !selectedMenuDetail || !selectedMenuDetail.caidanbianhao) {
      message.error('请先选择要删除的菜单')
      return false
    }
    const THE = this
    confirm({
      title: '信息',
      content: '确认要删除该菜单吗?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        $.ajax({
          type:'POST',
          url:SERVER+'caidan/shanchu-caidan?caidanbianhao='+selectedMenuDetail.caidanbianhao,
          success:function(data) {
            if (data.status != 0) {
              message.warning(data.message);
              return;
            }
            message.success('已删除')
            THE.fetch()
          }
        });
      }
    })
  }

  update = () => {
    this.props.form.validateFields((err,values) => {
      if(err) return false
      const THE = this
      if (!this.state.selectedMenuDetail || !this.state.selectedMenuDetail.caidanbianhao) {
        message.warn('请先选择菜单')
        return
      }
      values.caidanbianhao = this.state.selectedMenuDetail.caidanbianhao

      $.ajax({
        type:'POST',
        url:SERVER+'caidan/xiugai-caidan',
        data: JSON.stringify(values),
        dataType : 'json',
        contentType : "application/json",
        success:function(data) {
          if (data.status != 0) {
            message.warning(data.message);
            return;
          }
          message.success('修改成功')
          THE.fetch()
        }
      });
    });
  }

  updateRole = () => {
    const THE = this
    if (!this.state.selectedMenuDetail || !this.state.selectedMenuDetail.caidanbianhao) {
      message.warn('请先选择菜单')
      return
    }
    const list  = THE.props.form.getFieldValue('role')
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


  renderTreeNodes = data => {
    return (
      data.map(item => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          )
        }
        return <TreeNode key={item.key} title={item.title} />
      })
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { selectedMenuDetail, MenuTree } = this.state
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      }
    }
    return (
      <div className='page_menu_list'>
        <div className={'header'}>
          <Button
            type='default'
            className={'addBtn'}
            onClick={() => {
              this.props.history.push('menuadd')
            }}
          >
            <Icon type='plus' />
            新增
          </Button>
        </div>
        <div style={{ display: 'flex' }}>
          <div>
            <Button type='link' onClick={() => this.expandAllorNot(true)}>
              展开
            </Button>
            /
            <Button type='link' onClick={() => this.expandAllorNot(false)}>
              折叠
            </Button>
            /
            <Button type='link' onClick={() => this.fetch()}>
              刷新
            </Button>
            <Tree
              onExpand={this.onExpand}
              expandedKeys={this.state.expandedKeys}
              onSelect={this.getMenuDetail}
            >
              {this.renderTreeNodes(MenuTree)}
            </Tree>
          </div>
          <div style={{ flex: 1 }}>
            <Form {...formItemLayout} colon={false}>
              <Form.Item label='上级菜单：'>
                {getFieldDecorator('shangjibianhao', {
                  initialValue: selectedMenuDetail.shangjibianhao
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
                  initialValue: selectedMenuDetail.mingcheng
                })(<Input />)}
              </Form.Item>
              <Form.Item label='链接(Href)：'>
                {getFieldDecorator('luyou', {
                  initialValue: selectedMenuDetail.luyou
                })(<Input allowClear />)}
              </Form.Item>
              <Form.Item label='排序(升序)：'>
                {getFieldDecorator('paixu', {
                  initialValue: selectedMenuDetail.paixu
                })(<Input allowClear />)}
              </Form.Item>
              <Form.Item label='菜单图标：'>
                {getFieldDecorator('tubiao', {
                  initialValue: selectedMenuDetail.tubiao
                })(<Input allowClear />)}
              </Form.Item>
              <Form.Item label=' '>
                <Button type='primary' onClick={this.update} style={{ marginRight: 10 }}>修改基本信息</Button>
                <Button type='danger' onClick={this.showDeleteConfirm}>删除菜单</Button>
              </Form.Item>
              <Form.Item label='菜单授权角色：'>
                {getFieldDecorator('role')(<RoleSelect />)}
              </Form.Item>
              <Form.Item label=' '>
                <Button type='primary' onClick={this.updateRole}>修改授权角色</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(MenuList)
