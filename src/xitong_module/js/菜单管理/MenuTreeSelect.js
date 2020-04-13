// 组织机构下拉树
import React, { Component } from 'react'
import { message, TreeSelect } from 'antd';

const { TreeNode } = TreeSelect

export default class MenuTreeSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MenuTree: [],
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
      }
    });
  }

  renderTree = data => {
    return data.map(item => {
      return (
        <TreeNode key={item.key} title={item.title} value={item.key}>
          {item.children ? this.renderTree(item.children) : null}
        </TreeNode>
      )
    })
  }

  render() {
    const { onChange, value } = this.props
    const child = this.renderTree(this.state.MenuTree)
    return (
      <TreeSelect
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        allowClear
        value={value}
        onChange={e => onChange(e)}
      >
        {child}
      </TreeSelect>
    )
  }
}
