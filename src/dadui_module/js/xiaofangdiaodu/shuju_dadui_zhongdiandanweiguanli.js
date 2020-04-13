import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import shuju_dadui_zhongdiandanweixiangqing from "./shuju_dadui_zhongdiandanweixiangqing";
import {
  Select,
  Icon,
  Input,
  Form,
  Button,
  Table,
  Divider,
  Popconfirm,
  message,
  Tabs,
  InputNumber,
  Modal,
} from "antd";
const FormItem = Form.Item;

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
              "/shuju_dadui_zhongdiandanweixiangqing/:bianhao"
            }
            component={shuju_dadui_zhongdiandanweixiangqing}
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
      List: [],
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
      },
    };
  }

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
      url: SERVER + "xiaqudanwei/delete/" + id,
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success("删除成功");
        THE.fetch();
      },
    });
  }

  fetch = (
    params = {
      rows: this.state.pagination.pageSize,
      page: this.state.pagination.current,
    }
  ) => {
    let form = this.props.form;
    let page = params.page - 1;
    let size = params.rows===undefined?10:params.rows;
    const THE = this;
    $.ajax({
      type: "GET",
      url: SERVER + "xiaqudanwei/findAll?page=" + page + "&size=" + size,
      dataType: "json",
      contentType: "application/json",
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
          List: list,
          pagination,
        });
      },
    });
  };

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
        width: "12%",
      },
      {
        title: "重点单位名称",
        dataIndex: "mingcheng",
        width: "24%",
      },
      {
        title: "地址",
        dataIndex: "dizhi",
        width: "12%",
      },
      {
        title: "总人数",
        dataIndex: "renshu",
        width: "12%",
      },
      {
        title: "消防安全责任人",
        dataIndex: "zerenren",
        width: "12%",
      },
      {
        title: "消防安全管理人",
        dataIndex: "guanliren",
      },
      {
        title: "操作",
        render: (text, record, index) => {
          return (
            <span>
              <Link
                to={
                  this.props.match.url +
                  "/shuju_dadui_zhongdiandanweixiangqing/" +
                  record["bianhao"]
                }
              >
                详情
              </Link>
            </span>
          );
        },
      },
    ];

    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.state.List}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          scroll={{ y: "calc(100vh - 370px)", x: true }}
        />
      </div>
    );
  }
}

const AppComp = Form.create()(App);

export default Appmain;
