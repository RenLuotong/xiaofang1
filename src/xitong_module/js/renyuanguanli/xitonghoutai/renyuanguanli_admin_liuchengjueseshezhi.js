import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import renyuanguanli_admin_liuchengjuesexiugai from "./renyuanguanli_admin_liuchengjuesexiugai";
import XLSX from "xlsx";
import "antd/dist/antd.css";
import {
  message,
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Input,
  Form,
  Button,
  Table,
  Divider,
  Popconfirm,
} from "antd";

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
              "/renyuanguanli_admin_liuchengjuesexiugai/:id"
            }
            component={renyuanguanli_admin_liuchengjuesexiugai}
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
      liuchengjueseList: [],
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

  fetch = (
    params = {
      rows: this.state.pagination.pageSize,
      page: this.state.pagination.current,
    }
  ) => {
    let page = params.page - 1;
    let size = params.rows===undefined?10:params.rows;
    const THE = this;
    $.ajax({
      type: "get",
      url:
        SERVER +
        "chaxunsuoyouliuchengjuese?page=" +
        page +
        "&size=" +
        size +
        "&sort=id,desc",
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
          liuchengjueseList: list,
          pagination,
        });
      },
    });
  };

  componentDidMount() {
    this.fetch();
  }

  toDelete(id) {
    const THE = this;
    $.ajax({
      type: "POST",
      url: SERVER + "shanchuliuchengjuese?id=" + id,
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
        width: "20%",
      },
      {
        title: "身份名称",
        dataIndex: "juesemingcheng",
        width: "20%",
      },
      {
        title: "身份描述",
        dataIndex: "juesemiaoshu",
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => {
          if (record["shifouyuliujuese"] == "是") {
            return <span></span>;
          } else {
            return (
              <span>
                <Popconfirm
                  placement="topLeft"
                  title="确认要删除该身份?"
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
                    "/renyuanguanli_admin_liuchengjuesexiugai/" +
                    record["id"]
                  }
                >
                  修改
                </Link>
              </span>
            );
          }
        },
      },
    ];

    return (
      <div>
        <Button style={{ margin: 5 }}>
          <Link to="/renyuanguanli_admin_liuchengjuesetianjia">
            <Icon type="plus" />
            <span>添加身份</span>
          </Link>
        </Button>
        <Table
          columns={columns}
          dataSource={this.state.liuchengjueseList}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          scroll={{ y: "calc(100vh - 342px)", x: true }}
        />
      </div>
    );
  }
}

export default Appmain;
