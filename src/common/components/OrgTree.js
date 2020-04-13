import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import moment from 'moment';
import {
  message,
  DatePicker,
  Icon,
  Input,
  Form,
  Button,
  Table,
  Divider,
  Select,
  Popconfirm,
  Modal,
  Popover, Tree, Card
} from 'antd';

const {TreeNode} = Tree;
const { TextArea } = Input;

class Orgtree extends Component {

  constructor(props){
    super(props);
    this.state = {
      treeList: [],
      showcaidan: "block",
      showanniu: "none",
    };
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

  getTree =()=> {
    const THE = this;
    $.ajax({
      type: 'GET',
      url: SERVER + "zhiduiAlljigou",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        let treeList = THE.state.treeList;
        treeList.push(data.data);
        THE.setState({
          treeList: treeList
        });
      }
    });
  }

  onSelect = (e) => {
    if (e.length !== 0) {
      this.props.onSelect(e[0])
    }
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} icon={<Icon type="folder"/>}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} icon={<Icon type="folder"/>}/>;
    });
  }



  componentDidMount() {
    this.getTree();
  }

  render() {
    let title = (
      <div id="myTitle">
        <Button style={{display: this.state.showcaidan}} onClick={this.yincangcaidan.bind(this)}><Icon type="left"/></Button>
        <div id="myTitleDiv">组织机构</div>
      </div>
    )

    return (
      <div className='orgtree_div' style={this.props.style}>
        <Button style={{display: this.state.showanniu}} onClick={this.xianshicaidan.bind(this)}><Icon type="right"/></Button>
        <div id="treeLeft" style={{display: this.state.showcaidan}}>
          <Card
            title={title}
            id="treeLeftCard"
            style={{display: this.state.showcaidan}}
          >
            {
              this.state.treeList.length
                ?
                <Tree
                  showIcon
                  defaultExpandAll
                  onSelect={this.onSelect}
                  switcherIcon={<Icon type="down"/>}
                >
                  {this.renderTreeNodes(this.state.treeList)}
                </Tree>
                :
                null
            }
          </Card>
        </div>
      </div>
    );
  }
}

export default Orgtree;
