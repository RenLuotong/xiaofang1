/*出警记录-出警记录详情二级页面*/
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import moment from "moment";
import {
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
  Tag,
  message,
  Modal,
  Select,
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
        </Switch>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,

      cheliangList: [],
      cheliangPagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
      },

      chujingjiluInfo: {},

      qicaiList: [],
      qicaiPagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
      },

      renyuanList: [],
      renyuanPagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
      },
    };
  }

  showModal = (record) => {
    console.log(record.chujingshijian);
    layer.open({
      type: 2,
      title: ["轨迹信息", "text-align:center"],
      area: ["1200px", "600px"],
      shadeClose: true,
      content: " ./common/html/amapchujingxiangqingLink.html?id=" + record.id,
    });
  };

  toPass(id) {
    //单个通过
    const THE = this;
    $.ajax({
      type: "POST",
      url: SERVER + "xiaofangche-new/chujingwancheng",
      data: {
        cheliangbianhao: id,
        chujingjiluId: this.state.id,
      },
      // dataType : 'json',
      // contentType : "application/json",
      traditional: true,
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success("操作成功");
        THE.getCheliangList();
      },
    });
  }

  componentDidMount() {
    this.fetch();
    this.getCheliangList();
    this.getQicaiList();
    this.getRenyuanList();
  }

  handleTablecheliangChange = (pagination) => {
    const pager = { ...this.state.cheliangPagination };
    pager.current = pagination.current;
    this.setState({
      cheliangPagination: pager,
    });
    this.getCheliangList({
      rows: pagination.pageSize,
      page: pagination.current,
    });
  };

  handleTablerenyuanChange = (pagination) => {
    const pager = { ...this.state.renyuanPagination };
    pager.current = pagination.current;
    this.setState({
      renyuanPagination: pager,
    });
    this.getRenyuanList({
      rows: pagination.pageSize,
      page: pagination.current,
    });
  };

  handleTableqicaiChange = (pagination) => {
    const pager = { ...this.state.qicaiPagination };
    pager.current = pagination.current;
    this.setState({
      qicaiPagination: pager,
    });
    this.getQicaiList({
      rows: pagination.pageSize,
      page: pagination.current,
    });
  };

  getCheliangList = (
    params = {
      rows: this.state.cheliangPagination.pageSize,
      page: this.state.cheliangPagination.current,
    }
  ) => {
    let chujingjiluId = this.state.id;
    let THE = this;
    let page = params.page - 1;
    let size = params.rows===undefined?10:params.rows;
    // 车辆
    $.ajax({
      type: "GET",
      url:
        SERVER +
        "getChujingCheliangjilu/" +
        chujingjiluId +
        "?page=" +
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
          data.data.content[i]["key"] = data.data.content[i]["id"];
          data.data.content[i]["chujingshijian"] = moment(
            data.data.content[i]["chujingshijian"]
          ).format("YYYY-MM-DD HH:mm:ss");
          list.push(data.data.content[i]);
        }
        const pagination = { ...THE.state.cheliangPagination };
        pagination.total = data.data.totalElement;
        THE.setState({
          cheliangList: list,
          cheliangPagination: pagination,
        });
      },
    });
  };

  getRenyuanList = (
    params = {
      rows: this.state.renyuanPagination.pageSize,
      page: this.state.renyuanPagination.current,
    }
  ) => {
    let chujingjiluId = this.state.id;
    let THE = this;
    let page = params.page - 1;
    let size = params.rows===undefined?10:params.rows;
    // 人员
    $.ajax({
      type: "GET",
      url:
        SERVER +
        "getChujingRenyuanjilu/" +
        chujingjiluId +
        "?page=" +
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
          data.data.content[i]["key"] = data.data.content[i]["id"];
          list.push(data.data.content[i]);
        }
        const pagination = { ...THE.state.renyuanPagination };
        pagination.total = data.data.totalElement;
        THE.setState({
          renyuanList: list,
          renyuanPagination: pagination,
        });
      },
    });
  };

  getQicaiList = (
    params = {
      rows: this.state.qicaiPagination.pageSize,
      page: this.state.qicaiPagination.current,
    }
  ) => {
    let chujingjiluId = this.state.id;
    let THE = this;
    let page = params.page - 1;
    let size = params.rows===undefined?10:params.rows;
    // Qicia
    $.ajax({
      type: "GET",
      url:
        SERVER +
        "getChujingQicaijilu/" +
        chujingjiluId +
        "?page=" +
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
          data.data.content[i]["key"] = data.data.content[i]["id"];
          list.push(data.data.content[i]);
        }
        const pagination = { ...THE.state.qicaiPagination };
        pagination.total = data.data.totalElement;
        THE.setState({
          qicaiList: list,
          qicaiPagination: pagination,
        });
      },
    });
  };

  fetch = () => {
    let chujingjiluId = this.state.id;
    let THE = this;

    // 基本信息
    $.ajax({
      type: "GET",
      url: SERVER + "getChujingjiluById?chujingjiluId=" + chujingjiluId,
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        // for (let i = 0; i < data.data.content.length; i++) {
        //     data.data.content[i]['key'] = data.data.content[i]['id'];
        //     list.push(data.data.content[i]);
        // }
        // const pagination = { ...THE.state.pagination };
        // pagination.total = data.data.totalElement;
        THE.setState({
          chujingjiluInfo: data.data,
          // cheliangPagination,
        });
      },
    });
  };

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        colSpan: 0,
        className: "hidden_col",
      },
      {
        title: "机构名称",
        dataIndex: "jigoumingcheng",
      },
      {
        title: "姓名",
        dataIndex: "xingming",
      },
      {
        title: "所在消防车",
        dataIndex: "zhenshihaoma",
      },
    ];

    const cheliangColumns = [
      {
        title: "id",
        dataIndex: "id",
        colSpan: 0,
        className: "hidden_col",
      },
      {
        title: "机构名称",
        dataIndex: "jigoumingcheng",
      },
      {
        title: "车牌号码",
        dataIndex: "zhenshihaoma",
      },
      {
        title: "出警状态",
        dataIndex: "chujingzhuangtai",
      },
      {
        title: "操作",
        dataIndex: "caozuo",
        render: (text, record, index) => {
          if (record.chujingzhuangtai === "出警中") {
            return (
              <span>
                <Popconfirm
                  placement="topLeft"
                  title="确认出警完成?"
                  onConfirm={this.toPass.bind(this, record["cheliangbianhao"])}
                  okText="确认"
                  cancelText="取消"
                >
                  <a>出警完成</a>
                </Popconfirm>
              </span>
            );
          } else {
            return (
              <span>
                <a onClick={this.showModal.bind(this, record)}>轨迹</a>
              </span>
            );
          }
        },
      },
    ];

    const qicaiColumns = [
      {
        title: "id",
        dataIndex: "id",
        colSpan: 0,
        className: "hidden_col",
        width: "14%",
      },
      {
        title: "装备类型名称",
        dataIndex: "zhuangbeileixingmingcheng",
        width: "14%",
      },
      {
        title: "规格型号",
        dataIndex: "guigexinghao",
        width: "14%",
      },
      {
        title: "机构名称",
        dataIndex: "jigoumingcheng",
        width: "14%",
      },
      {
        title: "器材状态",
        dataIndex: "zhuangbeizhuangtai",
        width: "14%",
      },
      {
        title: "货架名称",
        dataIndex: "huojiamingcheng",
        width: "14%",
      },
      {
        title: "存放地点",
        dataIndex: "cunfangdidianmingcheng",
      },
      {
        title: "rFID",
        dataIndex: "rFID",
      },
    ];

    let chujingjiluInfo = this.state.chujingjiluInfo;
    let chijingshijian = "";
    if (
      chujingjiluInfo.chujingshijian != null &&
      chujingjiluInfo.chujingshijian != ""
    ) {
      chijingshijian = moment(chujingjiluInfo.chujingshijian).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }
    return (
      <div>
        <p>
          <Icon type="info" style={{ color: "#1890ff" }} />
          基本信息
        </p>
        <Tag id="myTag">机构名称: {chujingjiluInfo.jigoumingcheng}</Tag>
        <Tag id="myTag">出警时间: {chijingshijian}</Tag>
        <Tag id="myTag">出警类型: {chujingjiluInfo.chujingleixing}</Tag>
        <Tag id="myTag">警情判定: {chujingjiluInfo.jingqingpanding}</Tag>
        <Tag id="myTag">灾害场所: {chujingjiluInfo.zaihaichangsuo}</Tag>
        <Tag id="myTag">被困人数: {chujingjiluInfo.beikunrenshu}</Tag>
        <Tag id="myTag">单位名称: {chujingjiluInfo.danweimingcheng}</Tag>
        <Tag id="myTag">燃烧物: {chujingjiluInfo.ranshaowu}</Tag>
        <Tag id="myTag">烟雾情况: {chujingjiluInfo.yanwuqingkuang}</Tag>
        <Tag id="myTag">警情分类: {chujingjiluInfo.jingqingfenlei}</Tag>
        <Tag id="myTag">灾害等级: {chujingjiluInfo.zaihaidengji}</Tag>
        <Tag id="myTag">报警人: {chujingjiluInfo.baojingren}</Tag>
        <Tag id="myTag">
          报警人联系方式: {chujingjiluInfo.baojingrenlianxifangshi}
        </Tag>
        <Tag id="myTag">灾害地址: {chujingjiluInfo.zaihaidizhi}</Tag>
        <Tag id="myTag">出警状态: {chujingjiluInfo.chujingzhuangtai}</Tag>
        <p>
          <Icon type="info" style={{ color: "#1890ff" }} />
          车辆列表
        </p>
        <Table
          columns={cheliangColumns}
          dataSource={this.state.cheliangList}
          pagination={this.state.cheliangPagination}
          onChange={this.handleTablecheliangChange}
          scroll={{ y: "calc(100vh - 500px)", x: true }}
        />
        <p>
          <Icon type="info" style={{ color: "#1890ff" }} />
          人员列表
        </p>
        <Table
          columns={columns}
          dataSource={this.state.renyuanList}
          pagination={this.state.renyuanPagination}
          onChange={this.handleTablerenyuanChange}
          scroll={{ y: "calc(100vh - 500px)", x: true }}
        />
        <p>
          <Icon type="info" style={{ color: "#1890ff" }} />
          器材列表
        </p>
        <Table
          columns={qicaiColumns}
          dataSource={this.state.qicaiList}
          pagination={this.state.qicaiPagination}
          onChange={this.handleTableqicaiChange}
          scroll={{ y: "calc(100vh - 500px)", x: true }}
        />
      </div>
    );
  }
}

export default Appmain;
