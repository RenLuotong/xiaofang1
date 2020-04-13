import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, Switch } from "react-router-dom";
import { message, Popconfirm, Button, Table, Divider, Tabs } from "antd";
import xitongsheding_admin_caipinguanlixinzeng from "./xitongsheding_admin_caipinguanlixinzeng";
import xitongsheding_admin_caipinguanlixiugai from "./xitongsheding_admin_caipinguanlixiugai";
import Lxgl from "../../../../zhidui_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_caipinleixingguanli";
import xitongsheding_admin_caipinleixingguanlixiugai from "../../../../zhidui_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_caipinleixingguanlixiugai";
import xitongsheding_admin_caipinleixingguanlixinzeng from "../../../../zhidui_module/js/renyuanguanli/xitonghoutai/xitongsheding_admin_caipinleixingguanlixinzeng";

const View = [];
class Appmain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={this.props.match.path} component={App} />
          <Route
            path={
              this.props.match.path +
              "/xitongsheding_admin_caipinguanlixinzeng/"
            }
            component={xitongsheding_admin_caipinguanlixinzeng}
          />
          <Route
            path={
              this.props.match.path +
              "/xitongsheding_admin_caipinguanlixiugai/:id"
            }
            component={xitongsheding_admin_caipinguanlixiugai}
          />
          <Route
            path={
              this.props.match.path +
              "/xitongsheding_admin_caipinleixingguanlixinzeng/"
            }
            component={xitongsheding_admin_caipinleixingguanlixinzeng}
          />
          <Route
            path={
              this.props.match.path +
              "/xitongsheding_admin_caipinleixingguanlixiugai/:id"
            }
            component={xitongsheding_admin_caipinleixingguanlixiugai}
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
      caipinList: [],
      activeKey: "1",
    };
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

  toDelete(id) {
    const THE = this;
    $.ajax({
      type: "POST",
      url: SERVER + "tb-caipins/" + id,
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

  fetch(
    params = {
      rows: this.state.pagination.pageSize,
      page: this.state.pagination.current,
    }
  ) {
    let page = params.page - 1;
	let size = params.rows===undefined?10:params.rows;
    const THE = this;
    $.ajax({
      type: "GET",
      url: SERVER + "tb-caipins/getAllTbCaipins?page=" + page + "&size=" + size,
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.content.length; i++) {
          data.data.content[i]["key"] = i;
          if (data.data.content[i]["leixing"] == "Huncai") {
            data.data.content[i]["leixing"] = "荤菜";
          } else if (data.data.content[i]["leixing"] == "Sucai") {
            data.data.content[i]["leixing"] = "素菜";
          } else if (data.data.content[i]["leixing"] == "Daguocai") {
            data.data.content[i]["leixing"] = "大锅菜";
          }
          list.push(data.data.content[i]);
        }
        const pagination = { ...THE.state.pagination };
        pagination.total = data.data.totalElement;
        THE.setState({
          caipinList: list,
          pagination,
        });
      },
    });
  }

  //控制tab页方法
  callback(key) {
    const THE = this;
    THE.setState({
      activeKey: key,
    });
  }

  componentWillUnmount() {
    View.pagination = this.state.pagination;
    View.activeKey = this.state.activeKey;
  }

  componentWillMount() {
    if (!View.activeKey) {
      View.activeKey = "1";
    }
    const { pagination, activeKey } = View;
    this.setState({
      activeKey: activeKey,
    });
    if (typeof pagination !== "undefined") {
      this.setState({
        pagination: pagination,
      });
    }
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        colSpan: 0,
        className: "hidden_col",
        width: "10%",
      },
      {
        title: "菜品名称",
        dataIndex: "mingcheng",
        width: "10%",
      },
      {
        title: "菜品类型",
        dataIndex: "leixing",
        width: "45%",
      },
      {
        title: "菜品图片",
        dataIndex: "tupian",
        render: (text, record) => (
          <span>
            <img src={record["tupian"]} width="100px" height="100px" />
          </span>
        ),
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <span>
            <Link
              to={
                this.props.match.url +
                "/xitongsheding_admin_caipinguanlixiugai/" +
                record["id"]
              }
            >
              修改
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              placement="topLeft"
              title="确认要删除此菜品吗?"
              onConfirm={this.toDelete.bind(this, record["id"])}
              okText="确认"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    return (
      <div>
        <Tabs
          activeKey={this.state.activeKey}
          onChange={this.callback.bind(this)}
        >
          <Tabs.TabPane tab="菜品管理" key="1">
            <Link
              to={
                this.props.match.url +
                "/xitongsheding_admin_caipinguanlixinzeng"
              }
            >
              <Button type="primary" style={{ margin: 5 }}>
                新增菜品
              </Button>
            </Link>
            <Table
              columns={columns}
              dataSource={this.state.caipinList}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
              scroll={{ y: "calc(100vh - 394px)", x: true }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="菜品类型管理" key="2">
            <Lxgl />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Appmain;
