/*人员调动*/
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import renyuanguanli_zhiduiganbu_renyuandiaobolishi from "./renyuanguanli_zhiduiganbu_renyuandiaobolishi";
import renyuanguanli_zhiduiganbu_renyuandiaodongxiangqing from "./renyuanguanli_zhiduiganbu_renyuandiaodongxiangqing";
import XLSX from "xlsx";
import {
  Modal,
  Popover,
  Select,
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
  message,
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
          <Route exact path={this.props.match.path} component={AppComp} />
          <Route
            path={
              this.props.match.path +
              "/renyuanguanli_zhiduiganbu_renyuandiaobolishi/:renyuanbianhao"
            }
            component={renyuanguanli_zhiduiganbu_renyuandiaobolishi}
          />
          <Route
            path={
              this.props.match.path +
              "/renyuanguanli_zhiduiganbu_renyuandiaodongxiangqing"
            }
            component={renyuanguanli_zhiduiganbu_renyuandiaodongxiangqing}
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
      diaoboList: [],
      renyuanList: [],
      zuzhijigouList: [],
      visible: false,
      renyuanbianhao: null,
      newZuzhijigou: null,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  hideModal = () => {
    this.setState({
      visible: false,
      renyuanId: null,
      newZuzhijigou: null,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
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

  fetch = (
    params = {
      rows: this.state.pagination.pageSize,
      page: this.state.pagination.current,
    }
  ) => {
    let form = this.props.form;
    let jigoumingcheng = form.getFieldValue("jigoumingcheng");
    if (typeof jigoumingcheng == "undefined" || jigoumingcheng == "-1") {
      jigoumingcheng = "";
    }
    let page = params.page - 1;
	let size = params.rows===undefined?10:params.rows;
    const THE = this;
    $.ajax({
      type: "get",
      url:
        SERVER +
        "diaoboRenyuanLiebiao?jigoumingcheng=" +
        jigoumingcheng +
        "&page=" +
        page +
        "&size=" +
        size,
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
          renyuanList: list,
          pagination,
        });
      },
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

  changeZuzhijigou(value) {
    const THE = this;
    THE.setState({
      newZuzhijigou: value,
    });
  }

  toMove() {
    const THE = this;
    let renyuanbianhao = THE.state.renyuanbianhao;
    let jigoumingcheng = THE.state.newZuzhijigou;
    if (jigoumingcheng == null) {
      message.error("请选择要调动的组织机构！");
      return;
    }
    if (!confirm("确定调动此人员吗？")) {
      return;
    }
    $.ajax({
      type: "POST",
      url:
        SERVER +
        "diaoboRenyuan?renyuanbianhao=" +
        renyuanbianhao +
        "&jigoumingcheng=" +
        jigoumingcheng,
      contentType: "application/json",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        THE.setState({
          visible: false,
          renyuanbianhao: null,
          newZuzhijigou: null,
        });
        message.success("人员调动成功");
        THE.fetch();
      },
    });
  }

  getZuzhijigouList() {
    const THE = this;
    $.ajax({
      type: "GET",
      url: SERVER + "allZhiduiZzjgXialaLiebiao",
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
        THE.setState({
          zuzhijigouList: list,
        });
      },
    });
  }

  changeRenyuan(renyuanbianhao) {
    this.setState({
      renyuanbianhao: renyuanbianhao,
      visible: true,
    });
  }

  output() {
    let form = this.props.form;
    let jigoumingcheng = form.getFieldValue("jigoumingcheng");
    if (typeof jigoumingcheng == "undefined" || jigoumingcheng == "-1") {
      jigoumingcheng = "";
    }
    let _headers = [
      "人员姓名",
      "所属组织机构",
      "所属部门",
      "性别",
      "入伍时间",
      "联系电话",
    ];
    $.ajax({
      type: "get",
      url:
        SERVER +
        "diaoboRenyuanLiebiao?page=0&size=10000&jigoumingcheng=" +
        jigoumingcheng,
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.content.length; i++) {
          let obj = {};
          if (data.data.content[i]["xingming"] == null) {
            obj["人员姓名"] = "";
          } else {
            obj["人员姓名"] = data.data.content[i]["xingming"];
          }
          if (data.data.content[i]["jigoumingcheng"] == null) {
            obj["所属组织机构"] = "";
          } else {
            obj["所属组织机构"] = data.data.content[i]["jigoumingcheng"];
          }
          if (data.data.content[i]["suosubumen"] == null) {
            obj["所属部门"] = "";
          } else {
            obj["所属部门"] = data.data.content[i]["suosubumen"];
          }
          if (data.data.content[i]["xingbiedaima"] == null) {
            obj["性别"] = "";
          } else {
            obj["性别"] = data.data.content[i]["xingbiedaima"];
          }
          if (data.data.content[i]["ruzhishijian"] == null) {
            obj["入伍时间"] = "";
          } else {
            obj["入伍时间"] = data.data.content[i]["ruzhishijian"];
          }
          if (data.data.content[i]["yidongdianhua"] == null) {
            obj["联系电话"] = "";
          } else {
            obj["联系电话"] = data.data.content[i]["yidongdianhua"];
          }
          list.push(obj);
        }
        console.log(list);
        let _data = list;
        if (_data == null || _data.length == 0) {
          message.warning("当前人员调动列表没有数据！");
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
        XLSX.writeFile(wb, "人员调动.xlsx");
      },
    });
  }

  componentDidMount() {
    this.getZuzhijigouList();
    this.fetch();
  }

  render() {
    const zuzhijigouList = this.state.zuzhijigouList.map((item) => (
      <Select.Option key={item["key"]} value={item["jigoumingcheng"]}>
        {item["jigoumingcheng"]}
      </Select.Option>
    ));

    const columns = [
      {
        title: "renyuanbianhao",
        dataIndex: "renyuanbianhao",
        colSpan: 0,
        className: "hidden_col",
        width: "10%",
      },
      {
        title: "姓名",
        dataIndex: "xingming",
        width: "14%",
      },
      {
        title: "所属组织机构",
        dataIndex: "jigoumingcheng",
        width: "14%",
      },
      {
        title: "所属部门",
        dataIndex: "suosubumen",
        width: "10%",
      },
      {
        title: "性别",
        dataIndex: "xingbiedaima",
        width: "10%",
      },
      {
        title: "入伍时间",
        dataIndex: "ruzhishijian",
        width: "10%",
      },
      {
        title: "联系电话",
        dataIndex: "yidongdianhua",
        width: "12%",
      },
      {
        title: "调动历史",
        render: (text, record, index) => (
          <Link
            to={
              this.props.match.url +
              "/renyuanguanli_zhiduiganbu_renyuandiaobolishi/" +
              record["renyuanbianhao"]
            }
          >
            详情
          </Link>
        ),
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <Button
            onClick={this.changeRenyuan.bind(this, record["renyuanbianhao"])}
          >
            调动
          </Button>
        ),
      },
    ];

    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const { newZuzhijigou } = this.state;

    return (
      <div>
        <Modal
          title="人员调动"
          visible={this.state.visible}
          onOk={this.toMove.bind(this)}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <label>组织机构</label>
          <Select
            style={{ margin: 5, width: 200 }}
            onChange={this.changeZuzhijigou.bind(this)}
            value={newZuzhijigou}
          >
            {zuzhijigouList}
          </Select>
        </Modal>

        <Form onSubmit={this.handleSubmit} layout="inline">
          <FormItem label="组织机构">
            {getFieldDecorator("jigoumingcheng", { initialValue: "-1" })(
              <Select style={{ marginLeft: 5, width: 200 }}>
                <Select.Option value="-1">全部</Select.Option>
                {zuzhijigouList}
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
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.output.bind(this)}
            >
              <Icon type="export" />
              导出
            </Button>
          </FormItem>
          <FormItem>
            <Button className="anniu">
              <Link
                to={
                  this.props.match.url +
                  "/renyuanguanli_zhiduiganbu_renyuandiaodongxiangqing"
                }
              >
                <Icon type="user" />
                <span>人员调动详情</span>
              </Link>
            </Button>
          </FormItem>
        </Form>
        <Table
          columns={columns}
          dataSource={this.state.renyuanList}
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
