import React, { Component } from "react";
import {
  message,
  Button,
  Table,
  Form,
  Select,
  DatePicker,
  Icon,
  Tabs,
  Card,
  Input,
  Divider,
  Popconfirm,
  Tree,
} from "antd";
import { Link, Route, Switch } from "react-router-dom";
import moment from "moment";
import ReactEchartsCore from "echarts-for-react/";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import chujingjiluxiangqing from "./qicai_daduiganbu_chujingjiluxiangqing";
import qicai_daduiganbu_chujingrenyuanxiangqing from "./qicai_daduiganbu_chujingrenyuanxiangqing";
import qicai_daduiganbu_chujingcheliangxiangqing from "./qicai_daduiganbu_chujingcheliangxiangqing";
import ZuzhiTree from "../../../common/components/TreeSideBar/index.js";
const FormItem = Form.Item;
const Option = Select.Option;
const { TreeNode } = Tree;
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
          <Route exact path={this.props.match.path} component={AppComp} />
          <Route
            path={this.props.match.path + "/chujingjiluxiangqing/:id"}
            component={chujingjiluxiangqing}
          />
          <Route
            path={
              this.props.match.path +
              "/qicai_daduiganbu_chujingrenyuanxiangqing/:renyuanbianhao"
            }
            component={qicai_daduiganbu_chujingrenyuanxiangqing}
          />
          <Route
            path={
              this.props.match.path +
              "/qicai_daduiganbu_chujingcheliangxiangqing/:cheliangbianhao"
            }
            component={qicai_daduiganbu_chujingcheliangxiangqing}
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
      chujingzongcishu: "",
      chujingzongrenshu: "",
      chujingzongcheliang: "",
      riqiList: [],
      chujingcishuList: [],
      chujingrenshuList: [],
      chujingcheliangList: [],
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
      },
      paginationrenyuan: {
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
      },
      paginationcheliang: {
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
      },
      kucunshenqingList: [],
      leixingList: [],
      xinghaoList: [],
      defaultStarDate: null,
      defaultEndDate: null,
      activeKey: "1",
      dayArry: [],
      renyuanchujingList: [],
      cheliangchujingList: [],
      startValue: null,
      endValue: null,
      startValuetongji: null,
      endValuetongji: null,
      startValuerenyuan: null,
      endValuerenyuan: null,
      startValuecheliang: null,
      endValuecheliang: null,
      heighttemp: document.documentElement.clientHeight * 0.6 + "px",
      treeList: [],
      showcaidan: "block",
      showanniu: "none",
    };
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

  //出警详情开始时间截止时间
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };
  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };
  onStartChange = (value) => {
    this.onChange("startValue", value);
  };
  onEndChange = (value) => {
    this.onChange("endValue", value);
  };

  //出警统计开始时间截止时间
  disabledStartDatetongji = (startValuetongji) => {
    const endValuetongji = this.state.endValuetongji;
    if (!startValuetongji || !endValuetongji) {
      return false;
    }
    return startValuetongji.valueOf() > endValuetongji.valueOf();
  };
  disabledEndDatetongji = (endValuetongji) => {
    const startValuetongji = this.state.startValuetongji;
    if (!endValuetongji || !startValuetongji) {
      return false;
    }
    return endValuetongji.valueOf() <= startValuetongji.valueOf();
  };
  onStartChangetongji = (value) => {
    this.onChange("startValuetongji", value);
  };
  onEndChangetongji = (value) => {
    this.onChange("endValuetongji", value);
  };

  //出警人员开始时间截止时间
  disabledStartDaterenyuan = (startValuerenyuan) => {
    const endValuerenyuan = this.state.endValuerenyuan;
    if (!startValuerenyuan || !endValuerenyuan) {
      return false;
    }
    return startValuerenyuan.valueOf() > endValuerenyuan.valueOf();
  };
  disabledEndDaterenyuan = (endValuerenyuan) => {
    const startValuerenyuan = this.state.startValuerenyuan;
    if (!endValuerenyuan || !startValuerenyuan) {
      return false;
    }
    return endValuerenyuan.valueOf() <= startValuerenyuan.valueOf();
  };
  onStartChangerenyuan = (value) => {
    this.onChange("startValuerenyuan", value);
  };
  onEndChangerenyuan = (value) => {
    this.onChange("endValuerenyuan", value);
  };

  //出警车辆开始时间截止时间
  disabledStartDatecheliang = (startValuecheliang) => {
    const endValuecheliang = this.state.endValuecheliang;
    if (!startValuecheliang || !endValuecheliang) {
      return false;
    }
    return startValuecheliang.valueOf() > endValuecheliang.valueOf();
  };
  disabledEndDatecheliang = (endValuecheliang) => {
    const startValuecheliang = this.state.startValuecheliang;
    if (!endValuecheliang || !startValuecheliang) {
      return false;
    }
    return endValuecheliang.valueOf() <= startValuecheliang.valueOf();
  };
  onStartChangecheliang = (value) => {
    this.onChange("startValuecheliang", value);
  };
  onEndChangecheliang = (value) => {
    this.onChange("endValuecheliang", value);
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  callback(key) {
    const THE = this;
    THE.setState({
      activeKey: key,
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

  fetch = (
    params = {
      rows: this.state.pagination.pageSize,
      page: this.state.pagination.current,
    }
  ) => {
    let form = this.props.form;
    let kaishishijian = form.getFieldValue("kaishishijian");
    if (typeof kaishishijian == "undefined" || kaishishijian == null) {
      kaishishijian = moment(this.state.defaultStarDate).format(
        "YYYY-MM-DD 00:00:00"
      );
    } else {
      kaishishijian = moment(kaishishijian).format("YYYY-MM-DD 00:00:00");
    }
    let jieshushijian = form.getFieldValue("jieshushijian");
    if (typeof jieshushijian == "undefined" || jieshushijian == null) {
      jieshushijian = moment(this.state.defaultEndDate).format(
        "YYYY-MM-DD 23:59:59"
      );
    } else {
      jieshushijian = moment(jieshushijian).format("YYYY-MM-DD 23:59:59");
    }
    let pifuzhuangtai = form.getFieldValue("pifuzhuangtai");
    if (typeof pifuzhuangtai == "undefined" || pifuzhuangtai == "-1") {
      pifuzhuangtai = "";
    }
    let page = params.page - 1;
    let size = params.rows === undefined ? 10 : params.rows;
    let jigoudaima = this.jigoudaima;
    const THE = this;
    $.ajax({
      type: "GET",
      url:
        SERVER +
        "getChujingjilu?kaishishijian=" +
        kaishishijian +
        "&jieshushijian=" +
        jieshushijian +
        "&chujingleixing=" +
        pifuzhuangtai +
        "&jigoudaima=" +
        jigoudaima +
        "&page=" +
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
          if (data.data.content[i]["chujingshijian"] != null) {
            data.data.content[i]["chujingshijian"] = moment(
              data.data.content[i]["chujingshijian"]
            ).format("YYYY-MM-DD HH:mm:ss");
          }
          list.push(data.data.content[i]);
        }
        const pagination = { ...THE.state.pagination };
        pagination.total = data.data.totalElement;
        THE.setState({
          kucunshenqingList: list,
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

  fetchrenyuan = (
    params = {
      rows: this.state.paginationrenyuan.pageSize,
      page: this.state.paginationrenyuan.current,
    }
  ) => {
    let form = this.props.form;
    let kaishishijian = form.getFieldValue("kaishishijianrenyuan");
    if (typeof kaishishijian == "undefined" || kaishishijian == null) {
      kaishishijian = moment(this.state.defaultStarDate).format(
        "YYYY-MM-DD 00:00:00"
      );
    } else {
      kaishishijian = moment(kaishishijian).format("YYYY-MM-DD 00:00:00");
    }
    let jieshushijian = form.getFieldValue("jieshushijianrenyuan");
    if (typeof jieshushijian == "undefined" || jieshushijian == null) {
      jieshushijian = moment(this.state.defaultEndDate).format(
        "YYYY-MM-DD 23:59:59"
      );
    } else {
      jieshushijian = moment(jieshushijian).format("YYYY-MM-DD 23:59:59");
    }
    let page = params.page - 1;
    let size = params.rows;
    let jigoudaima = this.jigoudaima;
    const THE = this;
    $.ajax({
      type: "GET",
      url:
        SERVER +
        "chujingjilu/chujingrenyuan?page=" +
        page +
        "&size=" +
        size +
        "&kaishishijian=" +
        kaishishijian +
        "&jieshushijian=" +
        jieshushijian +
        "&jigoudaima=" +
        jigoudaima +
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
        const paginationrenyuan = { ...THE.state.paginationrenyuan };
        paginationrenyuan.total = data.data.totalElement;
        THE.setState({
          renyuanchujingList: list,
          paginationrenyuan,
        });
      },
    });
  };

  searchrenyuan() {
    const pager = { ...this.state.paginationrenyuan };
    pager.current = 1;
    this.setState({
      paginationrenyuan: pager,
    });
    this.fetchrenyuan({
      rows: pager.pageSize,
      page: pager.current,
    });
  }

  handlerenyuanTableChange = (paginationrenyuan) => {
    const pager = { ...this.state.paginationrenyuan };
    pager.current = paginationrenyuan.current;
    this.setState({
      paginationrenyuan: pager,
    });
    this.fetchrenyuan({
      rows: paginationrenyuan.pageSize,
      page: paginationrenyuan.current,
    });
  };

  fetchcheliang = (
    params = {
      rows: this.state.paginationcheliang.pageSize,
      page: this.state.paginationcheliang.current,
    }
  ) => {
    let form = this.props.form;
    let kaishishijian = form.getFieldValue("kaishishijiancheliang");
    if (typeof kaishishijian == "undefined" || kaishishijian == null) {
      kaishishijian = moment(this.state.defaultStarDate).format(
        "YYYY-MM-DD 00:00:00"
      );
    } else {
      kaishishijian = moment(kaishishijian).format("YYYY-MM-DD 00:00:00");
    }
    let jieshushijian = form.getFieldValue("jieshushijiancheliang");
    if (typeof jieshushijian == "undefined" || jieshushijian == null) {
      jieshushijian = moment(this.state.defaultEndDate).format(
        "YYYY-MM-DD 23:59:59"
      );
    } else {
      jieshushijian = moment(jieshushijian).format("YYYY-MM-DD 23:59:59");
    }
    let page = params.page - 1;
    let size = params.rows;
    let jigoudaima = this.jigoudaima;
    const THE = this;
    $.ajax({
      type: "GET",
      url:
        SERVER +
        "chujingjilu/chujingcheliang?page=" +
        page +
        "&size=" +
        size +
        "&kaishishijian=" +
        kaishishijian +
        "&jieshushijian=" +
        jieshushijian +
        "&jigoudaima=" +
        jigoudaima +
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
        const paginationcheliang = { ...THE.state.paginationcheliang };
        paginationcheliang.total = data.data.totalElement;
        THE.setState({
          cheliangchujingList: list,
          paginationcheliang,
        });
      },
    });
  };

  searchcheliang() {
    const pager = { ...this.state.paginationcheliang };
    pager.current = 1;
    this.setState({
      paginationcheliang: pager,
    });
    this.fetchcheliang({
      rows: pager.pageSize,
      page: pager.current,
    });
  }

  handlecheliangTableChange = (paginationcheliang) => {
    const pager = { ...this.state.paginationrenyuan };
    pager.current = paginationcheliang.current;
    this.setState({
      paginationcheliang: pager,
    });
    this.fetchcheliang({
      rows: paginationcheliang.pageSize,
      page: paginationcheliang.current,
    });
  };

  fetchtongji = () => {
    let form = this.props.form;
    let kaishishijian = form.getFieldValue("kaishishijiantongji");
    if (typeof kaishishijian == "undefined" || kaishishijian == null) {
      kaishishijian = moment(this.state.defaultStarDate).format(
        "YYYY-MM-DD 00:00:00"
      );
    } else {
      kaishishijian = moment(kaishishijian).format("YYYY-MM-DD 00:00:00");
    }
    let jieshushijian = form.getFieldValue("jieshushijiantongji");
    if (typeof jieshushijian == "undefined" || jieshushijian == null) {
      jieshushijian = moment(this.state.defaultEndDate).format(
        "YYYY-MM-DD 23:59:59"
      );
    } else {
      jieshushijian = moment(jieshushijian).format("YYYY-MM-DD 23:59:59");
    }
    let chujingleixing = form.getFieldValue("chujingleixing");
    if (typeof chujingleixing == "undefined" || chujingleixing == "-1") {
      chujingleixing = "";
    }
    let jigoudaima = this.jigoudaima;
    const THE = this;
    $.ajax({
      type: "GET",
      url:
        SERVER +
        "chujingjilu/chujinggtongji?kaishishijian=" +
        kaishishijian +
        "&jieshushijian=" +
        jieshushijian +
        "&chujingleixing=" +
        chujingleixing +
        "&jigoudaima=" +
        jigoudaima,
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        THE.setState({
          chujingzongcishu: data.data.chujingzongcishu,
          chujingzongrenshu: data.data.chujingzongrenshu,
          chujingzongcheliang: data.data.chujingzongcheliang,
          riqiList: data.data.riqiList,
          chujingcishuList: data.data.chujingcishuList,
          chujingrenshuList: data.data.chujingrenshuList,
          chujingcheliangList: data.data.chujingcheliangList,
        });
      },
    });
  };

  searchtongji() {
    this.fetchtongji();
  }

  gettianshu() {
    const THE = this;
    var curDate = new Date();
    var year = curDate.getFullYear();
    var month = curDate.getMonth();
    var date = curDate.getDate();
    var dayArry = [];
    for (var k = 1; k <= date; k++) {
      var defaultStarDate = new Date(year, month, 1);
      var defaultEndDate = new Date(year, month, date);
      defaultStarDate = moment(defaultStarDate).format("YYYY-MM-DD");
      defaultEndDate = moment(defaultEndDate).format("YYYY-MM-DD");
      var monthStartDate = new Date(year, month, k);
      monthStartDate = moment(monthStartDate).format("YYYY-MM-DD");
      dayArry.push(monthStartDate);
    }
    THE.setState({
      dayArry: dayArry,
      defaultStarDate: defaultStarDate,
      defaultEndDate: defaultEndDate,
    });
  }

  componentWillUnmount() {
    View.pagination = this.state.pagination;
    View.paginationcheliang = this.state.paginationcheliang;
    View.paginationrenyuan = this.state.paginationrenyuan;
    View.activeKey = this.state.activeKey;
  }

  componentWillMount() {
    if (!View.activeKey) {
      View.activeKey = "1";
    }
    const {
      pagination,
      activeKey,
      paginationcheliang,
      paginationrenyuan,
    } = View;
    this.setState({
      activeKey: activeKey,
    });
    if (typeof pagination !== "undefined") {
      this.setState({
        pagination: pagination,
      });
    }
    if (typeof paginationcheliang !== "undefined") {
      this.setState({
        paginationcheliang: paginationcheliang,
      });
    }
    if (typeof paginationrenyuan !== "undefined") {
      this.setState({
        paginationrenyuan: paginationrenyuan,
      });
    }
    this.gettianshu();
  }

  componentDidMount() {
    this.fetch();
    this.getTree();
    this.fetchrenyuan();
    this.fetchcheliang();
    this.fetchtongji();
  }

  onSelect = (e) => {
    if (e!==null) {
        this.jigoudaima = e;
        this.fetch();
        this.fetchrenyuan();
        this.fetchcheliang();
        this.fetchtongji();
    }
}

  render() {
    let a =
      "出警总次数" +
      " \n" +
      " \n" +
      "出警次数" +
      this.state.chujingzongcishu +
      "次" +
      " \n" +
      " \n" +
      "出警车次" +
      this.state.chujingzongcheliang +
      "次" +
      " \n" +
      " \n" +
      "出警人次" +
      this.state.chujingzongrenshu +
      "次";

    let option = {
      color: ["#3398DB", "#006699", "#003366"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: ["出警次数", "出警车次", "出警人次"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.state.riqiList,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value} 次",
          },
        },
      ],
      series: [
        {
          name: "出警次数",
          type: "bar",
          barGap: 0,
          barWidth: "20%",
          data: this.state.chujingcishuList,
        },
        {
          name: "出警车次",
          type: "bar",
          barWidth: "20%",
          data: this.state.chujingcheliangList,
        },
        {
          name: "出警人次",
          type: "bar",
          barWidth: "20%",
          data: this.state.chujingrenshuList,
        },
      ],
    };


    const columns = [
      {
        title: "id",
        dataIndex: "shenqingdanbianhao",
        colSpan: 0,
        className: "hidden_col",
        width:'12%'
      },
      {
        title: "出警时间",
        dataIndex: "chujingshijian",
        width:'12%'
      },
      {
        title: "消防车数量",
        dataIndex: "xiaofangchushuliang",
        width:'12%'
      },
      {
        title: "出警类型",
        dataIndex: "chujingleixing",
        width:'24%'
      },
      {
        title: "灾害地址",
        dataIndex: "zaihaidizhi",
        width:'12%'
      },
      {
        title: "出警状态",
        dataIndex: "chujingzhuangtai",
      },
      {
        title: "操作",
        dataIndex: "cz",
        render: (text, record, index) => {
          return (
            <span>
              <Link
                to={
                  this.props.match.url + "/chujingjiluxiangqing/" + record["id"]
                }
              >
                详情
              </Link>
            </span>
          );
        },
      },
    ];

    const renyuancolumns = [
      {
        title: "id",
        dataIndex: "id",
        colSpan: 0,
        className: "hidden_col",
        width:'24%'
      },
      {
        title: "组织机构",
        dataIndex: "jigoumingcheng",
        width:'12%'
      },
      {
        title: "姓名",
        dataIndex: "xingming",
        width:'12%'
      },
      {
        title: "出警次数",
        dataIndex: "chujingcishu",
        width:'12%'
      },
      {
        title: "是否干部",
        dataIndex: "ganbu",
        width:'24%'
      },
      {
        title: "联系电话",
        dataIndex: "yidongdianhua",
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <span>
            <Link
              to={
                this.props.match.url +
                "/qicai_daduiganbu_chujingrenyuanxiangqing/" +
                record["renyuanbianhao"]
              }
            >
              详情
            </Link>
          </span>
        ),
      },
    ];

    const cheliangcolumns = [
      {
        title: "id",
        dataIndex: "id",
        colSpan: 0,
        className: "hidden_col",
        width:'24%'
      },
      {
        title: "组织机构",
        dataIndex: "jigoumingcheng",
        width:'12%'
      },
      {
        title: "车牌号码",
        dataIndex: "chepaihaoma",
        width:'12%'
      },
      {
        title: "车辆类型",
        dataIndex: "cheliangleixing",
        width:'12%'
      },
      {
        title: "车辆品牌",
        dataIndex: "cheliangpinpai",
        width:'12%'
      },
      {
        title: "出警次数",
        dataIndex: "chujingcishu",
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <span>
            <Link
              to={
                this.props.match.url +
                "/qicai_daduiganbu_chujingcheliangxiangqing/" +
                record["cheliangbianhao"]
              }
            >
              详情
            </Link>
          </span>
        ),
      },
    ];

    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const {
      startValue,
      endValue,
      defaultStarDate,
      defaultEndDate,
      startValuetongji,
      endValuetongji,
      startValuerenyuan,
      endValuerenyuan,
      startValuecheliang,
      endValuecheliang,
      heighttemp,
    } = this.state;
    return (
      <div id="chaxuntongji">
        <ZuzhiTree onSelect={this.onSelect} />
        <div id="treeRight" style={{flex:1}}>
          <Tabs
            activeKey={this.state.activeKey}
            onChange={this.callback.bind(this)}
          >
            <Tabs.TabPane tab="出警统计" key="1">
              <Form
                onSubmit={this.handleSubmit}
                layout="inline"
                style={{ margin: 5 }}
              >
                <FormItem label="开始时间">
                  {getFieldDecorator("kaishishijiantongji")(
                    <DatePicker
                      disabledDate={this.disabledStartDatetongji}
                      value={startValuetongji}
                      placeholder={defaultStarDate}
                      format="YYYY-MM-DD"
                      onChange={this.onStartChangetongji}
                      style={{ width: 200 }}
                    />
                  )}
                </FormItem>
                <FormItem label="结束时间">
                  {getFieldDecorator("jieshushijiantongji")(
                    <DatePicker
                      disabledDate={this.disabledEndDatetongji}
                      value={endValuetongji}
                      placeholder={defaultEndDate}
                      format="YYYY-MM-DD"
                      onChange={this.onEndChangetongji}
                      style={{ width: 200 }}
                    />
                  )}
                </FormItem>
                <FormItem label="出警类型">
                  {getFieldDecorator("chujingleixing")(
                    <Select style={{ width: 200 }}>
                      <Select.Option value="-1">全部</Select.Option>
                      <Select.Option key="火灾" value="火灾">
                        火灾
                      </Select.Option>
                      <Select.Option key="抢险" value="抢险">
                        抢险
                      </Select.Option>
                      <Select.Option key="社会救助" value="社会救助">
                        社会救助
                      </Select.Option>
                      <Select.Option key="增援" value="增援">
                        增援
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" onClick={this.searchtongji.bind(this)}>
                    <Icon type="search" />
                    搜索
                  </Button>
                </FormItem>
              </Form>
              <Card id="echartCard" title="出警统计" style={{ width: "100%" }}>
                <ReactEchartsCore
                  style={{ height: heighttemp }}
                  echarts={echarts}
                  option={option}
                />
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="出警详情" key="2">
              <Form
                onSubmit={this.handleSubmit}
                layout="inline"
                style={{ margin: 5 }}
              >
                <FormItem label="开始时间">
                  {getFieldDecorator("kaishishijian")(
                    <DatePicker
                      disabledDate={this.disabledStartDate}
                      value={startValue}
                      placeholder={defaultStarDate}
                      format="YYYY-MM-DD"
                      onChange={this.onStartChange}
                      style={{ width: 200 }}
                    />
                  )}
                </FormItem>
                <FormItem label="结束时间">
                  {getFieldDecorator("jieshushijian")(
                    <DatePicker
                      disabledDate={this.disabledEndDate}
                      value={endValue}
                      placeholder={defaultEndDate}
                      format="YYYY-MM-DD"
                      onChange={this.onEndChange}
                      style={{ width: 200 }}
                    />
                  )}
                </FormItem>
                <FormItem label="出警类型">
                  {getFieldDecorator("pifuzhuangtai")(
                    <Select style={{ width: 200 }}>
                      <Select.Option value="-1">全部</Select.Option>
                      <Select.Option key="火灾" value="火灾">
                        火灾
                      </Select.Option>
                      <Select.Option key="抢险" value="抢险">
                        抢险
                      </Select.Option>
                      <Select.Option key="社会救助" value="社会救助">
                        社会救助
                      </Select.Option>
                      <Select.Option key="增援" value="增援">
                        增援
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" onClick={this.search.bind(this)}>
                    <Icon type="search" />
                    搜索
                  </Button>
                </FormItem>
                <br />
              </Form>
              <Table
                columns={columns}
                dataSource={this.state.kucunshenqingList}
                pagination={this.state.pagination}
                onChange={this.handleTableChange}
                scroll={{ y: "calc(100vh - 430px)", x: true }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="出警人员" key="3">
              <Form
                onSubmit={this.handleSubmit}
                layout="inline"
                style={{ margin: 5 }}
              >
                <FormItem label="开始时间">
                  {getFieldDecorator("kaishishijianrenyuan")(
                    <DatePicker
                      disabledDate={this.disabledStartDaterenyuan}
                      value={startValuerenyuan}
                      placeholder={defaultStarDate}
                      format="YYYY-MM-DD"
                      onChange={this.onStartChangerenyuan}
                      style={{ width: 200 }}
                    />
                  )}
                </FormItem>
                <FormItem label="结束时间">
                  {getFieldDecorator("jieshushijianrenyuan")(
                    <DatePicker
                      disabledDate={this.disabledEndDaterenyuan}
                      value={endValuerenyuan}
                      placeholder={defaultEndDate}
                      format="YYYY-MM-DD"
                      onChange={this.onEndChangerenyuan}
                      style={{ width: 200 }}
                    />
                  )}
                </FormItem>
                {/*<FormItem label="姓名">*/}
                {/*    {getFieldDecorator('xm')(*/}
                {/*        <Input style={{width:200}}/>*/}
                {/*    )}*/}
                {/*</FormItem>*/}
                <FormItem>
                  <Button
                    type="primary"
                    onClick={this.searchrenyuan.bind(this)}
                  >
                    <Icon type="search" />
                    搜索
                  </Button>
                </FormItem>
              </Form>
              <Table
                columns={renyuancolumns}
                dataSource={this.state.renyuanchujingList}
                pagination={this.state.paginationrenyuan}
                onChange={this.handlerenyuanTableChange}
                scroll={{ y: "calc(100vh - 430px)", x: true }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="出警车辆" key="4">
              <Form
                onSubmit={this.handleSubmit}
                layout="inline"
                style={{ margin: 5 }}
              >
                <FormItem label="开始时间">
                  {getFieldDecorator("kaishishijiancheliang")(
                    <DatePicker
                      disabledDate={this.disabledStartDatecheliang}
                      value={startValuecheliang}
                      placeholder={defaultStarDate}
                      format="YYYY-MM-DD"
                      onChange={this.onStartChangecheliang}
                      style={{ width: 200 }}
                    />
                  )}
                </FormItem>
                <FormItem label="结束时间">
                  {getFieldDecorator("jieshushijiancheliang")(
                    <DatePicker
                      disabledDate={this.disabledEndDatecheliang}
                      value={endValuecheliang}
                      placeholder={defaultEndDate}
                      format="YYYY-MM-DD"
                      onChange={this.onEndChangecheliang}
                      style={{ width: 200 }}
                    />
                  )}
                </FormItem>
                {/*<FormItem label="车牌号">*/}
                {/*    {getFieldDecorator('chepai')(*/}
                {/*        <Input style={{width:200}}/>*/}
                {/*    )}*/}
                {/*</FormItem>*/}
                <FormItem>
                  <Button
                    type="primary"
                    onClick={this.searchcheliang.bind(this)}
                  >
                    <Icon type="search" />
                    搜索
                  </Button>
                </FormItem>
              </Form>
              <Table
                columns={cheliangcolumns}
                dataSource={this.state.cheliangchujingList}
                pagination={this.state.paginationcheliang}
                onChange={this.handlecheliangTableChange}
                scroll={{ y: "calc(100vh - 430px)", x: true }}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const AppComp = Form.create()(App);

export default Appmain;
