import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import renyuanguanli_zhiduiganbu_zuzhijigouxiangqing from "./renyuanguanli_zhiduiganbu_zuzhijigouxiangqing";
import renyuanguanli_zhiduiganbu_zuzhijigouxiugai from "./renyuanguanli_zhiduiganbu_zuzhijigouxiugai";
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
    this.state = {
   
    };
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={this.props.match.path} component={App} />
          <Route
            path={
              this.props.match.path +
              "/renyuanguanli_zhiduiganbu_zuzhijigouxiangqing/:id"
            }
            component={renyuanguanli_zhiduiganbu_zuzhijigouxiangqing}
          />
          <Route
            path={
              this.props.match.path +
              "/renyuanguanli_zhiduiganbu_zuzhijigouxiugai/:id"
            }
            component={renyuanguanli_zhiduiganbu_zuzhijigouxiugai}
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
      zuzhijigouList: [],
      pagination: {
        current: 1,
        showQuickJumper: true,
        showSizeChanger: true,
      },
    };
  }

  getZuzhijigouList() {
    const THE = this;
    $.ajax({
      type: "get",
      url: SERVER + "zuzhijiegouLiebiao?page=0&size=100&sort=jigouleibie,asc",
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
        THE.setState({
          zuzhijigouList: list,
        });
      },
    });
  }

  output() {
    let _headers = ["机构名称", "机构类别", "机构地址", "上级机构名称"];
    $.ajax({
      type: "get",
      url: SERVER + "zuzhijiegouLiebiao?page=0&size=10000",
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.content.length; i++) {
          let obj = {};
          if (data.data.content[i]["jigoumingcheng"] == null) {
            obj["机构名称"] = "";
          } else {
            obj["机构名称"] = data.data.content[i]["jigoumingcheng"];
          }
          if (data.data.content[i]["jigouleibie"] == null) {
            obj["机构类别"] = "";
          } else {
            obj["机构类别"] = data.data.content[i]["jigouleibie"];
          }
          if (data.data.content[i]["jigoudizhi"] == null) {
            obj["机构地址"] = "";
          } else {
            obj["机构地址"] = data.data.content[i]["jigoudizhi"];
          }
          if (data.data.content[i]["shangjijigoumingcheng"] == null) {
            obj["上级机构名称"] = "";
          } else {
            obj["上级机构名称"] = data.data.content[i]["shangjijigoumingcheng"];
          }
          if (data.data.content[i]["yingqumingcheng"] == null) {
            obj["所属营区"] = "";
          } else {
            obj["所属营区"] = data.data.content[i]["yingqumingcheng"];
          }
          list.push(obj);
        }
        let _data = list;
        if (_data == null || _data.length == 0) {
          message.warning("当前组织机构管理列表没有数据！");
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
        XLSX.writeFile(wb, "组织机构管理.xlsx");
      },
    });
  }

  componentDidMount() {
    this.getZuzhijigouList();
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
  };

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
        title: "机构名称",
        dataIndex: "jigoumingcheng",
        width: "10%",
      },
      {
        title: "机构类别",
        dataIndex: "jigouleibie",
        width: "14%",
      },
      {
        title: "机构地址",
        dataIndex: "jigoudizhi",
        width: "10%",
      },
      {
        title: "上级机构名称",
        dataIndex: "shangjijigoumingcheng",
        width: "14%",
      },
      {
        title: "所属营区",
        dataIndex: "yingqumingcheng",
        width: "14%",
      },
      {
        title: "所属区域",
        dataIndex: "cityName",
      },
      {
        title: "操作",
        render: (text, record) => (
          <span>
            <Link
              to={
                this.props.match.url +
                "/renyuanguanli_zhiduiganbu_zuzhijigouxiangqing/" +
                record["id"]
              }
            >
              详情
            </Link>
            <Divider type="vertical" />
            <Link
              to={
                this.props.match.url +
                "/renyuanguanli_zhiduiganbu_zuzhijigouxiugai/" +
                record["id"]
              }
            >
              修改
            </Link>
          </span>
        ),
      },
    ];

    return (
      <div>
        <Button style={{ margin: 5 }}>
          <Link to="/renyuanguanli_zhiduiganbu_zuzhijigoutianjia">
            <Icon type="plus" />
            <span>组织机构添加</span>
          </Link>
        </Button>
        <Button
          type="primary"
          onClick={this.output.bind(this)}
          style={{ margin: 5 }}
        >
          <Icon type="export" />
          导出
        </Button>
        <Table
          columns={columns}
          dataSource={this.state.zuzhijigouList}
          scroll={{ y: "calc(100vh - 370px)", x: true }}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default Appmain;
