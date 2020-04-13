import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import moment from "moment";
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
  Popover,
  Tree,
  Card,
} from "antd";
import yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing from "./yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing";
import yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxinzeng from "./yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxinzeng";
import yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiugai from "./yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiugai";
import ZuzhiTree from "../../../../common/components/TreeSideBar/index.js";
const { TreeNode } = Tree;
class Appmain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={this.props.match.path} component={AppComp} />
          <Route
            path={
              this.props.match.path +
              "/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing/:bianhao"
            }
            component={yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing}
          />
          <Route
            path={
              this.props.match.path +
              "/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxinzeng"
            }
            component={yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxinzeng}
          />
          <Route
            path={
              this.props.match.path +
              "/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiugai/:id"
            }
            component={yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiugai}
          />
        </Switch>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
      },
      wenzhangList: [],
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
    });
  }
  //显示菜单方法
  xianshicaidan() {
    this.setState({
      showcaidan: "block",
      showanniu: "none",
    });
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      rows: pagination.pageSize,
      page: pagination.current,
    });
  };

  search() {
    const pager = { ...this.state.pagination };
    pager.current = 1;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      rows: pager.pageSize,
      page: pager.current,
    });
  }

  getTree() {
    const THE = this;
    $.ajax({
      type: "GET",
      url: SERVER + "zhiduiAlljigou",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        let treeList = THE.state.treeList;
        treeList.push(data.data);
        THE.setState({
          treeList: treeList,
        });
      },
    });
  }

  jigoudaima = "";
  onSelect = (e) => {
    if (e !== null) {
      this.jigoudaima = e;
      this.fetch();
    }
  };

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={item.key}
            dataRef={item}
            icon={<Icon type="folder" />}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} icon={<Icon type="folder" />} />;
    });
  };

  //获取知识库栏目列表
  fetch = (
    params = {
      rows: this.state.pagination.pageSize,
      page: this.state.pagination.current,
    }
  ) => {
    const THE = this;
    let form = this.props.form;
    let lanmumingcheng = form.getFieldValue("lanmumingcheng");
    if (typeof lanmumingcheng == "undefined") {
      lanmumingcheng = "";
    }
    let chakanfanwei = form.getFieldValue("chakanfanwei");
    if (typeof chakanfanwei == "undefined" || chakanfanwei == "-1") {
      chakanfanwei = "";
    }
    let jigoudaima = this.jigoudaima;
    if (typeof jigoudaima == "undefined") {
      jigoudaima = "";
    }
    let page = params.page - 1;
    let size = params.rows===undefined?10:params.rows;
    $.ajax({
      type: "get",
      url:
        SERVER +
        "tb-lanmus/getLanmusfenji?page=" +
        page +
        "&size=" +
        size +
        "&mingcheng=" +
        lanmumingcheng +
        "&chakanfanwei=" +
        chakanfanwei +
        "&jigoudaima=" +
        jigoudaima,
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
          wenzhangList: list,
          pagination,
        });
      },
    });
  };
  //删除栏目
  toDelete(id) {
    const THE = this;
    $.ajax({
      type: "POST",
      url: SERVER + "tb-lanmus/shanchu?id=" + id,
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success("删除成功");
        THE.fetch();
      },
      error: function () {
        message.error("操作失败");
      },
    });
  }

  componentDidMount() {
    this.fetch();
    this.getTree();
  }

  render() {

    const columns = [
      {
        title: "id",
        dataIndex: "id",
        colSpan: 0,
        className: "hidden_col",
        width:'12%'
      },
      {
        title: "bianhao",
        dataIndex: "bianhao",
        colSpan: 0,
        className: "hidden_col",
        width:'12%'
      },
      {
        title: "栏目名称",
        dataIndex: "mingcheng",
        width:'12%'
      },
      {
        title: "栏目类型",
        dataIndex: "leixing",
        width:'12%'
      },
      {
        title: "栏目图标",
        dataIndex: "tubiao",
        width:'12%',
        render: (text, record) => (
          <span>
            <img src={record["tubiao"]} width="100px" height="100px" />
          </span>
        ),
      },
      {
        title: "栏目描述",
        dataIndex: "miaoshu",
      },
      {
        title: "操作",
        dataIndex: "cz",
        render: (text, record, index) => {
          if (record["leixing"] == "链接栏目") {
            return (
              <span>
                <Link
                  to={
                    this.props.match.url +
                    "/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiugai/" +
                    record["id"]
                  }
                >
                  修改
                </Link>
                <Divider type="vertical" />
                <Popconfirm
                  placement="topLeft"
                  title="确认要删除该栏目?"
                  onConfirm={this.toDelete.bind(this, record["id"])}
                  okText="确认"
                  cancelText="取消"
                >
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          } else {
            return (
              <span>
                <Link
                  to={
                    this.props.match.url +
                    "/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiangqing/" +
                    record["bianhao"]
                  }
                >
                  详情
                </Link>
                <Divider type="vertical" />
                <Link
                  to={
                    this.props.match.url +
                    "/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxiugai/" +
                    record["id"]
                  }
                >
                  修改
                </Link>
                <Divider type="vertical" />
                <Popconfirm
                  placement="topLeft"
                  title="确认要删除该栏目?"
                  onConfirm={this.toDelete.bind(this, record["id"])}
                  okText="确认"
                  cancelText="取消"
                >
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
        },
      },
    ];

    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;

    return (
      <div id="chaxuntongji">
        <ZuzhiTree onSelect={this.onSelect} />
        <div id="treeRight" style={{ flex: 1 }}>
          <Form
            onSubmit={this.handleSubmit}
            layout="inline"
            style={{ margin: 5 }}
          >
            <FormItem label="栏目名称">
              {getFieldDecorator("lanmumingcheng")(
                <Input style={{ width: 200 }} />
              )}
            </FormItem>
            <FormItem label="查看范围">
              {getFieldDecorator("chakanfanwei", { initialValue: "-1" })(
                <Select style={{ margin: 5, width: 200 }}>
                  <Select.Option value="-1">管辖范围</Select.Option>
                  <Select.Option value="所属范围">所属范围</Select.Option>
                </Select>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.search.bind(this)}>
                <Icon type="search" />
                查询
              </Button>
            </FormItem>
            <br />
            <FormItem>
              <Button>
                <Link
                  to={
                    this.props.match.url +
                    "/yingquguanlixin_zhiduiguanliyuan_zhishiwenzhangxinzeng"
                  }
                >
                  <Icon type="plus" />
                  <span>新增栏目</span>
                </Link>
              </Button>
            </FormItem>
          </Form>
          <Table
            columns={columns}
            dataSource={this.state.wenzhangList}
            pagination={this.state.pagination}
            onChange={this.handleTableChange}
            scroll={{ y: "calc(100vh - 410px)", x: true }}
          />
        </div>
      </div>
    );
  }
}

const AppComp = Form.create()(App);

export default Appmain;
