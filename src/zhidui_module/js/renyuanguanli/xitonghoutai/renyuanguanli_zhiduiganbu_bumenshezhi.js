import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import renyuanguanli_zhiduiganbu_bumenxiangqing from "./renyuanguanli_zhiduiganbu_bumenxiangqing";
import renyuanguanli_zhiduiganbu_bumenxiugai from "./renyuanguanli_zhiduiganbu_bumenxiugai";
import ZuzhiTree from "../../../../common/components/TreeSideBar/index.js";
import XLSX from "xlsx";
import {
  message,
  Popconfirm,
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Input,
  Form,
  Button,
  Table,
  Divider,
  Tree,
  Card,
  Select,
} from "antd";
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
              "/renyuanguanli_zhiduiganbu_bumenxiangqing/:id"
            }
            component={renyuanguanli_zhiduiganbu_bumenxiangqing}
          />
          <Route
            path={
              this.props.match.path +
              "/renyuanguanli_zhiduiganbu_bumenxiugai/:id"
            }
            component={renyuanguanli_zhiduiganbu_bumenxiugai}
          />
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
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
      },
      bumenList: [],
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

  fetch = (
    params = {
      rows: this.state.pagination.pageSize,
      page: this.state.pagination.current,
    }
  ) => {
    let form = this.props.form;
    let chakanfanwei = form.getFieldValue("chakanfanwei");
    if (typeof chakanfanwei == "undefined" || chakanfanwei == "-1") {
      chakanfanwei = "";
    }
    let jigoudaima = this.jigoudaima;
    let page = params.page - 1;
	let size = params.rows===undefined?10:params.rows;
    const THE = this;
    $.ajax({
      type: "get",
      url:
        SERVER +
        "tb-bumen?page=" +
        page +
        "&size=" +
        size +
        "&sort=id,desc" +
        "&chakanfanwei=" +
        chakanfanwei +
        "&jigoudaima=" +
        jigoudaima +
        "&sort=paixu,asc",
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
          bumenList: list,
          pagination,
        });
      },
    });
  };

  output() {
    let _headers = ["部门名称", "机构名称", "部门负责人"];
    $.ajax({
      type: "get",
      url: SERVER + "tb-bumen?page=0&size=10000",
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.content.length; i++) {
          let obj = {};
          if (data.data.content[i]["bumenmingcheng"] == null) {
            obj["部门名称"] = "";
          } else {
            obj["部门名称"] = data.data.content[i]["bumenmingcheng"];
          }
          if (data.data.content[i]["jigoumingcheng"] == null) {
            obj["机构名称"] = "";
          } else {
            obj["机构名称"] = data.data.content[i]["jigoumingcheng"];
          }
          if (data.data.content[i]["fuzerenxingming"] == null) {
            obj["部门负责人"] = "";
          } else {
            obj["部门负责人"] = data.data.content[i]["fuzerenxingming"];
          }
          list.push(obj);
        }
        let _data = list;
        if (_data == null || _data.length == 0) {
          message.warning("当前部门管理列表没有数据！");
          return;
        }

        let headers = _headers
          .map((v, i) =>
            Object.assign(
              {},
              { v: v, position: String.fromCharCode(65 + i) + 1 }
            )
          )
          .reduce(
            (prev, next) =>
              Object.assign({}, prev, { [next.position]: { v: next.v } }),
            {}
          );

        let xmldata = _data
          .map((v, i) =>
            _headers.map((k, j) =>
              Object.assign(
                {},
                { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) }
              )
            )
          )
          .reduce((prev, next) => prev.concat(next))
          .reduce(
            (prev, next) =>
              Object.assign({}, prev, { [next.position]: { v: next.v } }),
            {}
          );

        // 合并 headers 和 data
        let output = Object.assign({}, headers, xmldata);
        // 获取所有单元格的位置
        let outputPos = Object.keys(output);
        // 计算出范围
        let ref = outputPos[0] + ":" + outputPos[outputPos.length - 1];

        // 构建 workbook 对象
        let wb = {
          SheetNames: ["mySheet"],
          Sheets: {
            mySheet: Object.assign({}, output, { "!ref": ref }),
          },
        };

        // 导出 Excel
        XLSX.writeFile(wb, "部门管理.xlsx");
      },
    });
  }

  componentDidMount() {
    this.fetch();
    this.getTree();
  }

  toDelete(id) {
    const THE = this;
    $.ajax({
      type: "POST",
      url: SERVER + "shanchuBumen?id=" + id,
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success(data.message);
        THE.fetch();
      },
    });
  }

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        colSpan: 0,
		className: "hidden_col",
		width:'14%'
      },
      {
        title: "部门名称",
		dataIndex: "bumenmingcheng",
		width:'14%'
      },
      {
        title: "机构名称",
		dataIndex: "jigoumingcheng",
		width:'14%'
      },
      {
        title: "部门负责人",
		dataIndex: "fuzerenxingming",
		width:'14%'
      },
      {
        title: "上级部门",
        dataIndex: "shangjibumen",
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <Link
              to={
                this.props.match.url +
                "/renyuanguanli_zhiduiganbu_bumenxiangqing/" +
                record["id"]
              }
            >
              详情
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              placement="topLeft"
              title="确认要删除该部门?"
              onConfirm={this.toDelete.bind(this, record["id"])}
              okText="确认"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Link
              to={
                this.props.match.url +
                "/renyuanguanli_zhiduiganbu_bumenxiugai/" +
                record["id"]
              }
            >
              修改
            </Link>
          </span>
        ),
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
            <FormItem label="查看范围">
              {getFieldDecorator("chakanfanwei", { initialValue: "-1" })(
                <Select style={{ margin: 5, width: 200 }}>
                  <Select.Option value="-1">管辖范围</Select.Option>
                  <Select.Option value="所属范围">所属范围</Select.Option>
                </Select>
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.search.bind(this)}
              >
                <Icon type="search" />
                查询
              </Button>
            </FormItem>
            <FormItem>
              <Button style={{ margin: 5 }}>
                <Link to="/renyuanguanli_zhiduiganbu_bumentianjia">
                  <Icon type="plus" />
                  <span>添加部门</span>
                </Link>
              </Button>
            </FormItem>
            {/*<FormItem>*/}
            {/*  <Button type="primary" htmlType="submit" onClick={this.output.bind(this)}>*/}
            {/*      <Icon type="export" />导出*/}
            {/*  </Button>*/}
            {/*</FormItem>*/}
          </Form>
          <Table
            columns={columns}
            dataSource={this.state.bumenList}
            pagination={this.state.pagination}
            onChange={this.handleTableChange}
            scroll={{ y: "calc(100vh - 370px)", x: true }}
          />
        </div>
      </div>
    );
  }
}
const AppComp = Form.create()(App);
export default Appmain;
