/*
 * @Author: lixiang
 * @Email: 619419059@qq.com
 * @Date: 2019-08-25 14:50:43
 * @Last Modified by: lixiang
 * @Last Modified time: 2019-09-09 09:08:13
 * @Description: Description
 */
import React, { Component } from 'react'
import { Layout, Icon, Tree, message } from 'antd';
import './index.less'

const { Sider } = Layout
const { TreeNode } = Tree

class TreeSideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      expandedKeys: [],
      isExpanded: false,
      data: [],
      selectedKeys: []
    }
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    const THE = this;
    $.ajax({
      type: 'GET',
      url: SERVER + "zhiduiAlljigou",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        THE.setState({
          data: [data.data]
        });
      }
    });
  }

  refresh = () => {
    this.setState({ data: [] })
    this.fetch()
  }

  onExpand = (expandedKeys, { expanded: bool, node }) => {
    this.setState({ expandedKeys })
  }

  toggleExpand = () => {
    const { isExpanded, data } = this.state
    if (isExpanded) {
      this.setState({
        isExpanded: false,
        expandedKeys: []
      })
      this.expandedKeys = null // 避免每次遍历 提升效率
    } else {
      if (!this.expandedKeys) {
        this.expandedKeys = []
        const loop = datas => {
          datas.forEach(item => {
            if (item.children) {
              this.expandedKeys.push(item.key)
              loop(item.children)
            }
          })
        }
        loop(data)
      }
      this.setState({
        expandedKeys: this.expandedKeys,
        isExpanded: true
      })
    }
  }

  renderTree = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} >
            {this.renderTree(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  onSelect = value => {
    const v = value[0] ? value[0] : null
    this.props.onSelect(v)
    this.setState({ selectedKeys: value })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { isExpanded, expandedKeys, data, selectedKeys } = this.state
    const treeOpt = this.renderTree(data)
    return (
      <Sider
        id='treeSideBar_org'
        style={this.props.style}
        theme='light'
        width={160}
        trigger={null}
        collapsible
        collapsedWidth={0}
        collapsed={this.state.collapsed}
        onCollapse={collapsed => {
          this.setState({ collapsed })
        }}
      >
        <div className="toggle_left" onClick={this.toggle}>
          {
            !this.state.collapsed ? <Icon type="caret-left" style={{color: '#fff'}} /> : <Icon type="caret-right" style={{color: '#fff'}} />
          }
        </div>
        <div className='treeSideBar_org_header'>
          <span className='treeSideBar_org_header_tit'>组织机构</span>
          <span onClick={this.toggleExpand} title={isExpanded ? '折叠' : '展开'}>
            {isExpanded ? <Icon type='up' /> : <Icon type='down' />}
          </span>
          <span onClick={this.refresh} title='刷新'>
            <Icon type='redo' />
          </span>
        </div>
        <div className='treeDiv'>
          <Tree
            expandedKeys={expandedKeys}
            onExpand={this.onExpand}
            blockNode
            style={{ fontSize: 12 }}
            onSelect={this.onSelect}
            selectedKeys={selectedKeys}
          >
            {treeOpt}
          </Tree>
        </div>
      </Sider>
    )
  }
}
export default TreeSideBar
