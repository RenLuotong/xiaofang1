/*app管理*/
import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, Switch } from "react-router-dom";
import moment from "moment";
import {
  lable,
  Select,
  Icon,
  message,
  Popconfirm,
  Button,
  Table,
  Tabs,
  Divider,
} from "antd";
import xitongsheding_admin_chanpinxiugai from "./xitongsheding_admin_chanpinxiugai";
import xitongsheding_admin_apptianjia from "./xitongsheding_admin_apptianjia";
import xitongsheding_admin_chanpintianjia from "./xitongsheding_admin_chanpintianjia";

let View = [];

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
              this.props.match.path + "/xitongsheding_admin_chanpinxiugai/:id"
            }
            component={xitongsheding_admin_chanpinxiugai}
          />
          <Route
            path={this.props.match.path + "/xitongsheding_admin_chanpintianjia"}
            component={xitongsheding_admin_chanpintianjia}
          />
          <Route
            path={this.props.match.path + "/xitongsheding_admin_apptianjia"}
            component={xitongsheding_admin_apptianjia}
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
      pagination2: {
		showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
      },
      leixing: null,
      appList: [],
      chanpinList: [],
      activeKey: "1",
      yingyongList: [],
    };
  }

  getyingyongleixingList() {
    const THE = this;
    $.ajax({
      type: "GET",
      url: SERVER + "yingyongleixing/leixingList?page=0&size=10000",
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.length; i++) {
          list.push(data.data[i]);
        }
        THE.setState({
          yingyongList: list,
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

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      rows: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  handleTableChange2 = (pagination2) => {
    const pager = { ...this.state.pagination2 };
    pager.current = pagination2.current;
    this.setState({
      pagination2: pager,
    });
    this.fetch2({
      rows: pagination2.pageSize,
      page: pagination2.current,
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

  leixingChange(value) {
    this.setState({
      leixing: value,
    });
  }

  fetch = (
    params = {
      rows: this.state.pagination.pageSize,
      page: this.state.pagination.current,
    }
  ) => {
    let page = params.page - 1;
	let size = params.rows===undefined?10:params.rows;
    let leixingId = this.state.leixing;
    if (leixingId == undefined || leixingId == null) {
      leixingId = "";
    }
    const THE = this;
    let paixu = paixuzuzhi(params.sortField, params.sortOrder);
    $.ajax({
      type: "get",
      url:
        SERVER +
        "yingyongLiebiao?leixingId=" +
        leixingId +
        "&page=" +
        page +
        "&size=" +
        size +
        paixu,
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.content.length; i++) {
          data.data.content[i]["key"] = i;
          data.data.content[i]["gengxinshijian"] = moment(
            data.data.content[i]["gengxinshijian"]
          ).format("YYYY-MM-DD HH:mm:ss");
          list.push(data.data.content[i]);
        }
        const pagination = { ...THE.state.pagination };
        pagination.total = data.data.totalElement;
        THE.setState({
          appList: list,
          pagination,
        });
      },
    });
  };

  fetch2 = (
    params = {
      rows: this.state.pagination2.pageSize,
      page: this.state.pagination2.current,
    }
  ) => {
    let page = params.page - 1;
	let size = params.rows===undefined?10:params.rows;
    const THE = this;
    $.ajax({
      type: "get",
      url:
        SERVER + "yingyongleixing/leixingList?page=" + page + "&size=" + size,
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.length; i++) {
          data.data[i]["key"] = i;
          list.push(data.data[i]);
        }
        const pagination = { ...THE.state.pagination };
        pagination.total = data.data.length;
        THE.setState({
          chanpinList: list,
          pagination,
        });
      },
    });
  };

  toDelete(id, url) {
    const THE = this;
    $.ajax({
      type: "POST",
      url: SERVER + "shanchuYingyong?id=" + id + "&url=" + url,
      contentType: "application/json; charset=utf-8",
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

  toDelete2(id) {
    const THE = this;
    $.ajax({
      type: "POST",
      url: SERVER + "yingyongleixing/deleteLeixing?id=" + id,
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success("删除成功");
        THE.fetch2();
      },
      error: function () {
        message.error("操作失败");
      },
    });
  }

  componentWillUnmount() {
    View.activeKey = this.state.activeKey;
  }

  componentWillMount() {
    if (!View.activeKey) {
      View.activeKey = "1";
    }
    const { activeKey } = View;
    this.setState({
      activeKey: activeKey,
    });
  }

  componentDidMount() {
    this.fetch();
    this.fetch2();
    this.getyingyongleixingList();
  }

  render() {
    let yingyongOptions = this.state.yingyongList.map((item) => (
      <Select.Option key={item["key"]} value={item["id"]}>
        {item["mingcheng"]}
      </Select.Option>
    ));

    const columns2 = [
      {
        title: "id",
        dataIndex: "id",
        colSpan: 0,
        className: "hidden_col",
        width: "20%",
      },
      {
        title: "url",
        dataIndex: "url",
        colSpan: 0,
        className: "hidden_col",
        width: "20%",
      },
      {
        title: "应用类型名称",
        dataIndex: "mingcheng",
        width: "25%",
      },
      {
        title: "使用说明",
        render: (text, record, index) => (
          <span>
            <a href={record["shuoming"]} title="使用说明下载" target="_blank">
              使用说明下载
            </a>
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
                "/xitongsheding_admin_chanpinxiugai/" +
                record["id"]
              }
            >
              修改
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              placement="topLeft"
              title="确认要删除该应用类型?"
              onConfirm={this.toDelete2.bind(this, record["id"], record["url"])}
              okText="确认"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    const columns = [
      {
        title: "id",
        dataIndex: "id",
        colSpan: 0,
        className: "hidden_col",
        width: "14%",
      },
      {
        title: "url",
        dataIndex: "url",
        colSpan: 0,
        className: "hidden_col",
        width: "14%",
      },
      {
        title: "应用类型",
        dataIndex: "leixing",
        width: "14%",
      },
      {
        title: "版本号",
        dataIndex: "banbenhao",
        width: "14%",
      },
      {
        title: "更新时间",
        dataIndex: "gengxinshijian",
        width: "14%",
      },
      {
        title: "更新描述",
        dataIndex: "gengxinmiaoshu",
        width: "10%",
      },
      {
        title: "是否强制更新",
        dataIndex: "biaozhiwei",
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <span>
            <Popconfirm
              placement="topLeft"
              title="确认要删除该产品?"
              onConfirm={this.toDelete.bind(this, record["id"], record["url"])}
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
          <Tabs.TabPane tab="应用类型管理" key="1">
            <Link
              to={this.props.match.url + "/xitongsheding_admin_chanpintianjia"}
            >
              <Button type="primary" style={{ margin: 10 }}>
                新增应用类型
              </Button>
            </Link>
            <Table
              columns={columns2}
              dataSource={this.state.chanpinList}
              pagination={this.state.pagination2}
              onChange={this.handleTableChange}
              scroll={{ y: "calc(100vh - 394px)", x: true }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="产品管理" key="2">
            <lable>应用类型：</lable>
            <Select
              onChange={this.leixingChange.bind(this)}
              style={{ margin: 10, width: 200 }}
            >
              <Select.Option value="">全部</Select.Option>
              {yingyongOptions}
            </Select>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.search.bind(this)}
            >
              <Icon type="search" />
              查询
            </Button>
            <Link to={this.props.match.url + "/xitongsheding_admin_apptianjia"}>
              <Button type="primary" style={{ margin: 10 }}>
                新增产品
              </Button>
            </Link>
            <Table
              columns={columns}
              dataSource={this.state.appList}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
              scroll={{ y: "calc(100vh - 394px)", x: true }}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Appmain;
