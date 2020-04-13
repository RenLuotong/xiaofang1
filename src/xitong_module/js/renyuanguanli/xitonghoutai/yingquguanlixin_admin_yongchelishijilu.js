import React, { Component } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import XLSX from "xlsx";
import {
  DatePicker,
  Icon,
  Input,
  Form,
  Button,
  Table,
  message,
  Select,
  Divider,
  Popconfirm,
  Modal,
  Card,
  Tree,
} from "antd";
const { TreeNode } = Tree;
import { Link, Route, Switch } from "react-router-dom";
import yingquguanlixin_admin_yongchelishijiluxiangqing from "./yingquguanlixin_admin_yongchelishijiluxiangqing";
import yingquguanlixin_admin_yongchelishijiluqingkuang from "./yingquguanlixin_admin_yongchelishijiluqingkuang";
import ZuzhiTree from "../../../../common/components/TreeSideBar/index.js";
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
              "/yingquguanlixin_admin_yongchelishijiluxiangqing/:chepaihaoma/:paichekaishishijian/:paichejieshushijian"
            }
            component={yingquguanlixin_admin_yongchelishijiluxiangqing}
          />
          <Route
            path={
              this.props.match.path +
              "/yingquguanlixin_admin_yongchelishijiluqingkuang/:processInstanceId"
            }
            component={yingquguanlixin_admin_yongchelishijiluqingkuang}
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
      startValue: null,
      endValue: null,
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
      },
      jiluList: [],
      visible: false,
      shenpirenyuanList: [],
      shenpiren: "",
      currentTime: new Date(),
      treeList: [],
      showcaidan: "block",
      showanniu: "none",
      chaosongrenyuan: "",
      yuanchaosongrenyuanxingming: "",
      yuanchaosongrenyuanbianhao: "",
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
      url: SERVER + "huoxitongsuoyoujigouxialaliebiao",
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

  //开始时间截止时间
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
  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };
  onStartChange = (value) => {
    this.onChange("startValue", value);
  };
  onEndChange = (value) => {
    this.onChange("endValue", value);
  };

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

  fetch = (
    params = {
      rows: this.state.pagination.pageSize,
      page: this.state.pagination.current,
    }
  ) => {
    const THE = this;
    let form = this.props.form;
    let page = params.page - 1;
    let size = params.rows===undefined?10:params.rows;
    let processDefinitionKey = yonngcheprocessKey;
    let search = "";
    let variables = {};
    let chepaihaoma = form.getFieldValue("chepaihaoma");
    if (
      typeof chepaihaoma !== "undefined" &&
      chepaihaoma !== "" &&
      chepaihaoma !== null
    ) {
      if (typeof search === "undefined" || search === "" || search === null) {
        search = search + "chepaihaoma~" + chepaihaoma;
      } else {
        search = search + ",chepaihaoma~" + chepaihaoma;
      }
    }
    let chakanfanwei = form.getFieldValue("chakanfanwei");
    let jigoudaima = this.jigoudaima;
    if (
      typeof jigoudaima !== "undefined" &&
      jigoudaima !== null &&
      jigoudaima !== "" &&
      chakanfanwei === "所属范围"
    ) {
      if (typeof search === "undefined" || search === "" || search === null) {
        search = search + "jigoudaima=" + jigoudaima;
      } else {
        search = search + ",jigoudaima=" + jigoudaima;
      }
    } else if (
      typeof jigoudaima !== "undefined" &&
      jigoudaima !== null &&
      jigoudaima !== ""
    ) {
      if (typeof search === "undefined" || search === "" || search === null) {
        search = search + "jigoudaima$~" + jigoudaima;
      } else {
        search = search + ",jigoudaima$~" + jigoudaima;
      }
    }
    let shenpizhuangtai = this.state.shenpi;
    if (typeof shenpizhuangtai !== "undefined" && shenpizhuangtai !== "-1") {
      if (typeof search === "undefined" || search === "" || search === null) {
        search = search + "cheliangshenqingdanzhuangtai=" + shenpizhuangtai;
      } else {
        search = search + ",cheliangshenqingdanzhuangtai=" + shenpizhuangtai;
      }
    }
    let shenqingren = form.getFieldValue("shenqingren");
    if (
      typeof shenqingren !== "undefined" &&
      shenqingren !== null &&
      shenqingren !== ""
    ) {
      if (typeof search === "undefined" || search === "" || search === null) {
        search = search + "shenqingyongcherenyuan~" + shenqingren;
      } else {
        search = search + ",shenqingyongcherenyuan~" + shenqingren;
      }
    }
    let kaishishijian = form.getFieldValue("kaishishijian");
    if (
      typeof kaishishijian !== "undefined" &&
      kaishishijian !== null &&
      kaishishijian !== ""
    ) {
      if (typeof search === "undefined" || search === "" || search === null) {
        search =
          search +
          "jihuaqingjiashijian>" +
          moment(kaishishijian).format("YYYY-MM-DD 00:00:00");
      } else {
        search =
          search +
          ",jihuaqingjiashijian>" +
          moment(kaishishijian).format("YYYY-MM-DD 00:00:00");
      }
    }
    let jieshushijian = form.getFieldValue("jieshushijian");
    if (
      typeof jieshushijian !== "undefined" &&
      jieshushijian !== null &&
      jieshushijian !== ""
    ) {
      if (typeof search === "undefined" || search === "" || search === null) {
        search =
          search +
          "jihuaqingjiashijian<" +
          moment(jieshushijian).format("YYYY-MM-DD 23:59:59");
      } else {
        search =
          search +
          ",jihuaqingjiashijian<" +
          moment(jieshushijian).format("YYYY-MM-DD 23:59:59");
      }
    }
    $.ajax({
      type: "get",
      url:
        SERVER +
        "activiti/process/instances/all?page=" +
        page +
        "&size=" +
        size +
        "&processDefinitionKey=" +
        processDefinitionKey +
        "&search=" +
        search,
      success: function (data) {
        let list = [];
        let renyuanbianhao = sessionStorage.getItem("renyuanbianhao");
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.content.length; i++) {
          data.data.content[i]["key"] = i;
          data.data.content[i]["startTime"] = moment(
            data.data.content[i]["startTime"]
          ).format("YYYY-MM-DD HH:mm:ss");
          const current = THE.state.currentTime;
          if (
            Date.parse(data.data.content[i].form.jihuaguiduishijian.valueOf()) <
              current.valueOf() &&
            data.data.content[i].form.cheliangshenqingdanzhuangtai ==
              "外出用车中"
          ) {
            data.data.content[i].form.cheliangshenqingdanzhuangtai = "未归队";
          }
          data.data.content[i].form.jihuachucheshijian = moment(
            data.data.content[i].form.jihuachucheshijian
          ).format("YYYY-MM-DD HH:mm:ss");
          data.data.content[i].form.jihuaguiduishijian = moment(
            data.data.content[i].form.jihuaguiduishijian
          ).format("YYYY-MM-DD HH:mm:ss");
          list.push(data.data.content[i]);
        }
        const pagination = { ...THE.state.pagination };
        pagination.total = data.data.totalElement;
        THE.setState({
          jiluList: list,
          pagination,
        });
      },
    });
  };

  output() {
    let _headers = [
      "机构名称",
      "营区名称",
      "车牌号码",
      "申请时间",
      "申请人",
      "审批状态",
      "出营时间",
      "归营时间",
      "用车原因",
      "是否超期",
    ];
    let form = this.props.form;
    let chepaihaoma = form.getFieldValue("chepaihaoma");
    if (typeof chepaihaoma == "undefined" || chepaihaoma == "-1") {
      chepaihaoma = "";
    }
    let kaishishijian = form.getFieldValue("kaishishijian");
    if (typeof kaishishijian == "undefined" || kaishishijian == null) {
      kaishishijian = "";
    } else {
      kaishishijian = moment(kaishishijian).format("YYYY-MM-DD HH:mm:ss");
    }
    let jieshushijian = form.getFieldValue("jieshushijian");
    if (typeof jieshushijian == "undefined" || jieshushijian == null) {
      jieshushijian = "";
    } else {
      jieshushijian = moment(jieshushijian).format("YYYY-MM-DD HH:mm:ss");
    }
    let shenqingren = form.getFieldValue("shenqingren");
    if (typeof shenqingren == "undefined" || shenqingren == "-1") {
      shenqingren = "";
    }
    let shenpizhuangtai = form.getFieldValue("shenpizhuangtai");
    if (typeof shenpizhuangtai == "undefined" || shenpizhuangtai == "-1") {
      shenpizhuangtai = "";
    }
    let shifouchaoqi = form.getFieldValue("shifouchaoqi");
    if (typeof shifouchaoqi == "undefined" || shifouchaoqi == "-1") {
      shifouchaoqi = "";
    }
    $.ajax({
      type: "get",
      url:
        SERVER +
        "huoqugongwucheyongchejiluByYingqubianhao?page=0&size=100000&chepaihaoma=" +
        chepaihaoma +
        "&kaishishijian=" +
        kaishishijian +
        "&jieshushijian=" +
        jieshushijian +
        "&shenqingren=" +
        shenqingren +
        "&shenpizhuangtai=" +
        shenpizhuangtai +
        "&shifouchaoqi=" +
        shifouchaoqi,
      data: JSON.stringify(),
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.content.length; i++) {
          if (data.data.content[i]["shenqingshijian"] != null) {
            data.data.content[i]["shenqingshijian"] = moment(
              data.data.content[i]["shenqingshijian"]
            ).format("YYYY-MM-DD HH:mm:ss");
          }
          if (data.data.content[i]["paichekaishishijian"] != null) {
            data.data.content[i]["paichekaishishijian"] = moment(
              data.data.content[i]["paichekaishishijian"]
            ).format("YYYY-MM-DD HH:mm:ss");
          }
          if (data.data.content[i]["paichejieshushijian"] != null) {
            data.data.content[i]["paichejieshushijian"] = moment(
              data.data.content[i]["paichejieshushijian"]
            ).format("YYYY-MM-DD HH:mm:ss");
          }
          if (data.data.content[i]["chuyingshijian"] != null) {
            data.data.content[i]["chuyingshijian"] = moment(
              data.data.content[i]["chuyingshijian"]
            ).format("YYYY-MM-DD HH:mm:ss");
          }
          if (data.data.content[i]["guiyingshijian"] != null) {
            data.data.content[i]["guiyingshijian"] = moment(
              data.data.content[i]["guiyingshijian"]
            ).format("YYYY-MM-DD HH:mm:ss");
          }
          if (data.data.content[i]["shenpizhuangtai"] == "SHENQINGZHONG") {
            data.data.content[i]["shenpizhuangtai"] = "申请中";
          } else if (data.data.content[i]["shenpizhuangtai"] == "YITONGYI") {
            data.data.content[i]["shenpizhuangtai"] = "已同意";
          } else if (data.data.content[i]["shenpizhuangtai"] == "YIJUJUE") {
            data.data.content[i]["shenpizhuangtai"] = "已拒绝";
          }
          let obj = {};
          if (data.data.content[i]["jigoumingcheng"] == null) {
            obj["机构名称"] = "";
          } else {
            obj["机构名称"] = data.data.content[i]["jigoumingcheng"];
          }
          if (data.data.content[i]["yingqumingcheng"] == null) {
            obj["营区名称"] = "";
          } else {
            obj["营区名称"] = data.data.content[i]["yingqumingcheng"];
          }
          if (data.data.content[i]["chepaihaoma"] == null) {
            obj["车牌号码"] = "";
          } else {
            obj["车牌号码"] = data.data.content[i]["chepaihaoma"];
          }
          if (data.data.content[i]["shenqingshijian"] == null) {
            obj["申请时间"] = "";
          } else {
            obj["申请时间"] = data.data.content[i]["shenqingshijian"];
          }
          if (data.data.content[i]["shenqingren"] == null) {
            obj["申请人"] = "";
          } else {
            obj["申请人"] = data.data.content[i]["shenqingren"];
          }
          if (data.data.content[i]["shenpizhuangtai"] == null) {
            obj["审批状态"] = "";
          } else {
            obj["审批状态"] = data.data.content[i]["shenpizhuangtai"];
          }
          if (data.data.content[i]["chuyingshijian"] == null) {
            obj["出营时间"] = "";
          } else {
            obj["出营时间"] = data.data.content[i]["chuyingshijian"];
          }
          if (data.data.content[i]["guiyingshijian"] == null) {
            obj["归营时间"] = "";
          } else {
            obj["归营时间"] = data.data.content[i]["guiyingshijian"];
          }
          if (data.data.content[i]["yongcheyuanyin"] == null) {
            obj["用车原因"] = "";
          } else {
            obj["用车原因"] = data.data.content[i]["yongcheyuanyin"];
          }
          if (data.data.content[i]["shifouchaoqi"] == null) {
            obj["是否超期"] = "";
          } else {
            obj["是否超期"] = data.data.content[i]["shifouchaoqi"];
          }
          list.push(obj);
        }
        let _data = list;
        if (_data == null || _data.length == 0) {
          message.warning("当前用车历史记录没有数据！");
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
                {
                  v: v[k],
                  position: String.fromCharCode(65 + j) + (i + 2),
                }
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
        XLSX.writeFile(wb, "用车历史记录.xlsx");
      },
    });
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

  hideModal = () => {
    this.setState({
      visible: false,
      shenpirenyuanList: [],
      shenpiren: "",
      chaosongrenyuan: "",
    });
  };

  yongchetongguo(
    taskId,
    userTaskExtendedAttributes,
    yichuxiaqu,
    faqirenliuchengjuese,
    yuanchaosongrenyuanxingming,
    yuanchaosongrenyuanbianhao
  ) {
    const THE = this;
    let cheliangshenqingdanzhuangtai = "车辆申请同意";
    let shenpiliuzhuangtai = "同意";
    let renyuanvariables = {};
    let variables = {};
    renyuanvariables.cheliangshenpiliuzhuangtai = shenpiliuzhuangtai;
    renyuanvariables.faqirenliuchengjuese = faqirenliuchengjuese;
    renyuanvariables.yichuxiaqu = yichuxiaqu;
    variables.shenpirenyuanbianhao = "";
    variables.shenpirenyuanxingming = "";
    variables.cheliangshenqingdanzhuangtai = cheliangshenqingdanzhuangtai;
    variables.cheliangshenpiliuzhuangtai = shenpiliuzhuangtai;
    variables.yichuxiaqu = yichuxiaqu;
    $.ajax({
      type: "POST",
      url: SERVER + "activiti/task/candidaters?taskId=" + taskId,
      data: JSON.stringify(renyuanvariables),
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        if (
          $.isEmptyObject(data.data) === true ||
          userTaskExtendedAttributes.shifoujieshu === "true" ||
          yichuxiaqu === "否"
        ) {
          $.ajax({
            type: "POST",
            url: SERVER + "activiti/completeTask?taskId=" + taskId,
            data: JSON.stringify(variables),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
              if (data.status != 0) {
                message.warning(data.message);
                return;
              }
              message.success("审批成功");
              THE.fetch();
            },
          });
        } else {
          for (var i in data.data) {
            list.push(data.data[i]);
          }
          // let dangqianshenpirenyuanList = shenpirenyuanbianhaolist;
          THE.setState({
            visible: true,
            shenpirenyuanList: list[0],
            yuanchaosongrenyuanxingming: yuanchaosongrenyuanxingming,
            yuanchaosongrenyuanbianhao: yuanchaosongrenyuanbianhao,
            //dangqianshenpirenyuanList: dangqianshenpirenyuanList,
            taskId: taskId,
            yichuxiaqu: yichuxiaqu,
            faqirenliuchengjuese: faqirenliuchengjuese,
          });
        }
      },
    });
  }

  yongchejujue(taskId) {
    const THE = this;
    let cheliangshenqingdanzhuangtai = "车辆申请拒绝";
    let shenpiliuzhuangtai = "拒绝";
    let variables = {};
    variables.shenpirenyuanbianhao = "";
    variables.shenpirenyuanxingming = "";
    variables.cheliangshenqingdanzhuangtai = cheliangshenqingdanzhuangtai;
    variables.cheliangshenpiliuzhuangtai = shenpiliuzhuangtai;
    $.ajax({
      type: "POST",
      url: SERVER + "activiti/completeTask?taskId=" + taskId,
      data: JSON.stringify(variables),
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success("审批成功");
        THE.fetch();
      },
    });
  }

  guiduitongguo(taskId) {
    const THE = this;
    let cheliangshenqingdanzhuangtai = "已归队";
    let cheliangshenpiliuzhuangtai = "同意";
    let variables = {};
    variables.shenpirenyuanbianhao = "";
    variables.shenpirenyuanxingming = "";
    variables.cheliangshenqingdanzhuangtai = cheliangshenqingdanzhuangtai;
    variables.cheliangshenpiliuzhuangtai = cheliangshenpiliuzhuangtai;
    $.ajax({
      type: "POST",
      url: SERVER + "activiti/completeTask?taskId=" + taskId,
      data: JSON.stringify(variables),
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success("审批成功");
        THE.fetch();
      },
    });
  }

  tijiao() {
    const THE = this;
    let shenpiren = THE.state.shenpiren;
    if (
      typeof shenpiren == "undefined" ||
      shenpiren == "" ||
      shenpiren == null
    ) {
      message.error("请选择审批人！");
      return;
    }
    let chaosongrenyuan = THE.state.chaosongrenyuan;
    let yuanchaosongrenyuanbianhao = THE.state.yuanchaosongrenyuanbianhao;
    let yuanchaosongrenyuanxingming = THE.state.yuanchaosongrenyuanxingming;
    let shenpirenyuanxingming = shenpiren.split("+")[0];
    let shenpirenyuanbianhao = shenpiren.split("+")[1];
    // let shenpirenyuanbianhaolist = THE.state.dangqianshenpirenyuanList;
    let taskId = THE.state.taskId;
    let yichuxiaqu = THE.state.yichuxiaqu;
    let faqirenliuchengjuese = THE.state.faqirenliuchengjuese;
    //shenpirenyuanbianhaolist.push(shenpirenyuanbianhao);
    let shenpiliuzhuangtai = "同意";
    let variables = {};
    variables.shenpirenyuanxingming = shenpirenyuanxingming;
    variables.shenpirenyuanbianhao = shenpirenyuanbianhao;
    //variables.shenpirenyuanbianhaolist = shenpirenyuanbianhaolist;
    variables.cheliangshenpiliuzhuangtai = shenpiliuzhuangtai;
    variables.yichuxiaqu = yichuxiaqu;
    variables.faqirenliuchengjuese = faqirenliuchengjuese;
    if (
      chaosongrenyuan !== "" &&
      chaosongrenyuan !== null &&
      chaosongrenyuan !== "undefined"
    ) {
      variables.chaosongrenyuanxingming =
        yuanchaosongrenyuanxingming + "," + chaosongrenyuan.split("+")[0];
      variables.chaosongrenyuanbianhao =
        yuanchaosongrenyuanbianhao + "," + chaosongrenyuan.split("+")[1];
    }
    $.ajax({
      type: "POST",
      url: SERVER + "activiti/completeTask?taskId=" + taskId,
      data: JSON.stringify(variables),
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success("审批成功");
        THE.setState({
          visible: false,
          shenpirenyuanList: [],
          shenpiren: "",
          chaosongrenyuan: "",
        });
        THE.fetch();
      },
    });
  }

  shenpirenyuanChang(value) {
    const THE = this;
    THE.setState({
      shenpiren: value,
    });
  }

  chaosongrenyuanChang(value) {
    const THE = this;
    THE.setState({
      chaosongrenyuan: value,
    });
  }

  getshenpiList(value) {
    const THE = this;
    THE.setState({
      shenpi: value,
    });
  }

  componentDidMount() {
    this.fetch();
    this.getTree();
  }

  render() {
    let shenpirenyuanOptions = this.state.shenpirenyuanList.map((item) => (
      <Select.Option
        key={item["key"]}
        value={item["xingming"] + "+" + item["renyuanbianhao"]}
      >
        {item["xingming"]}
      </Select.Option>
    ));

    const columns = [
      {
        title: "id",
        dataIndex: "id",
        colSpan: 0,
        className: "hidden_col",
        width: "10%",
      },
      {
        title: "申请人机构名称",
        dataIndex: "form.jigoumingcheng",
        width: "10%",
      },
      //     {
      //     title: '申请时间',
      //     dataIndex: 'startTime',
      // },
      {
        title: "所属部门",
        dataIndex: "form.suoshubumen",
        width: "7%",
      },
      {
        title: "申请人",
        dataIndex: "form.shenqingyongcherenyuan",
        width: "10%",
      },
      {
        title: "申请单状态",
        dataIndex: "form.cheliangshenqingdanzhuangtai",
        width: "7%",
      },
      {
        title: "车牌号码",
        dataIndex: "form.chepaihaoma",
        width: "10%",
      },
      {
        title: "出营时间",
        dataIndex: "form.jihuachucheshijian",
        width: "10%",
      },
      {
        title: "归营时间",
        dataIndex: "form.jihuaguiduishijian",
        width: "7%",
      },
      {
        title: "当前审批人",
        dataIndex: "form.shenpirenyuanxingming",
      },
      //     {
      //     title: '是否超期',
      //     dataIndex: 'shifouchaoqi',
      // },
      {
        title: "操作",
        dataIndex: "cz",
        render: (text, record, index) => {
          if (record.form.cheliangshenqingdanzhuangtai == "车辆申请中") {
            return (
              <span>
                <Popconfirm
                  placement="topLeft"
                  title="确认要通过这条用车申请?"
                  onConfirm={this.yongchetongguo.bind(
                    this,
                    record["historicUserTaskInstanceList"][
                      record.historicUserTaskInstanceList.length - 1
                    ].taskInstanceId,
                    record["historicUserTaskInstanceList"][
                      record.historicUserTaskInstanceList.length - 1
                    ].userTaskExtendedAttributes,
                    record["form"].yichuxiaqu,
                    record["form"].faqirenliuchengjuese,
                    record["form"].chaosongrenyuanxingming,
                    record["form"].chaosongrenyuanbianhao
                  )}
                  okText="确认"
                  cancelText="取消"
                >
                  <a>通过</a>
                </Popconfirm>
                <Divider type="vertical" />
                <Popconfirm
                  placement="topLeft"
                  title="确认要拒绝这条用车申请?"
                  onConfirm={this.yongchejujue.bind(
                    this,
                    record["historicUserTaskInstanceList"][
                      record.historicUserTaskInstanceList.length - 1
                    ].taskInstanceId
                  )}
                  okText="确认"
                  cancelText="取消"
                >
                  <a>拒绝</a>
                </Popconfirm>
                <Divider type="vertical" />
                <Link
                  to={
                    this.props.match.url +
                    "/yingquguanlixin_admin_yongchelishijiluqingkuang/" +
                    record["processInstanceId"]
                  }
                >
                  详情
                </Link>
                <Divider type="vertical" />
                <Link
                  to={
                    this.props.match.url +
                    "/yingquguanlixin_admin_yongchelishijiluxiangqing/" +
                    record["form"].chepaihaoma +
                    "/" +
                    record["form"].jihuachucheshijian +
                    "/" +
                    record["form"].jihuaguiduishijian
                  }
                >
                  轨迹
                </Link>
              </span>
            );
          } else if (record.form.cheliangshenqingdanzhuangtai == "归队申请中") {
            return (
              <span>
                <Popconfirm
                  placement="topLeft"
                  title="确认要通过这条归队申请?"
                  onConfirm={this.guiduitongguo.bind(
                    this,
                    record["historicUserTaskInstanceList"][
                      record.historicUserTaskInstanceList.length - 1
                    ].taskInstanceId
                  )}
                  okText="确认"
                  cancelText="取消"
                >
                  <a>通过</a>
                </Popconfirm>
                <Divider type="vertical" />
                <Link
                  to={
                    this.props.match.url +
                    "/yingquguanlixin_admin_yongchelishijiluqingkuang/" +
                    record["processInstanceId"]
                  }
                >
                  详情
                </Link>
              </span>
            );
          } else if (
            record["form"].jihuachucheshijian !== undefined &&
            record["form"].jihuaguiduishijian !== undefined
          ) {
            return (
              <span>
                <Link
                  to={
                    this.props.match.url +
                    "/yingquguanlixin_admin_yongchelishijiluqingkuang/" +
                    record["processInstanceId"]
                  }
                >
                  详情
                </Link>
                <Divider type="vertical" />
                <Link
                  to={
                    this.props.match.url +
                    "/yingquguanlixin_admin_yongchelishijiluxiangqing/" +
                    record["form"].chepaihaoma +
                    "/" +
                    record["form"].jihuachucheshijian +
                    "/" +
                    record["form"].jihuaguiduishijian
                  }
                >
                  轨迹
                </Link>
              </span>
            );
          } else {
            return (
              <span>
                <Link
                  to={
                    this.props.match.url +
                    "/yingquguanlixin_admin_yongchelishijiluqingkuang/" +
                    record["processInstanceId"]
                  }
                >
                  详情
                </Link>
              </span>
            );
          }
        },
      },
    ];

    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const {
      startValue,
      endValue,
      shenpi,
      shenpiren,
      chaosongrenyuan,
    } = this.state;

    return (
      <div id="chaxuntongji">
        <Modal
          title="审批人选择"
          visible={this.state.visible}
          onOk={this.tijiao.bind(this)}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <label>审批人选择</label>
          <Select
            style={{ margin: 5, width: 200 }}
            value={shenpiren}
            onChange={this.shenpirenyuanChang.bind(this)}
          >
            {shenpirenyuanOptions}
          </Select>
          <br />
          <label>抄送人选择</label>
          <Select
            style={{ margin: 5, width: 200 }}
            value={chaosongrenyuan}
            onChange={this.chaosongrenyuanChang.bind(this)}
          >
            {shenpirenyuanOptions}
          </Select>
        </Modal>
        <Button
          style={{ display: this.state.showanniu }}
          onClick={this.xianshicaidan.bind(this)}
        >
          <Icon type="right" />
        </Button>
        <ZuzhiTree onSelect={this.onSelect} />
        <div id="treeRight" style={{ flex: 1 }}>
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
                  placeholder="开始时间"
                  format="YYYY-MM-DD"
                  onChange={this.onStartChange}
                  style={{ width: 200 }}
                />
              )}
            </FormItem>
            <FormItem label="结束时间&#12288;">
              {getFieldDecorator("jieshushijian")(
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  value={endValue}
                  placeholder="结束时间"
                  format="YYYY-MM-DD"
                  onChange={this.onEndChange}
                  style={{ width: 200 }}
                />
              )}
            </FormItem>
            <FormItem label="车牌号码">
              {getFieldDecorator("chepaihaoma")(
                <Input style={{ width: 200 }} />
              )}
            </FormItem>
            <br />
            <FormItem label="申请人&#12288;">
              {getFieldDecorator("shenqingren")(
                <Input style={{ width: 200 }} />
              )}
            </FormItem>
            <FormItem label="申请单状态">
              <Select
                style={{ width: 200 }}
                value={shenpi}
                onChange={this.getshenpiList.bind(this)}
              >
                <Select.Option value="-1">全部</Select.Option>
                <Select.Option value="车辆申请中">车辆申请中</Select.Option>
                <Select.Option value="车辆申请同意">车辆申请同意</Select.Option>
                <Select.Option value="车辆申请拒绝">车辆申请拒绝</Select.Option>
                <Select.Option value="外出用车中">外出用车中</Select.Option>
                <Select.Option value="未归队">未归队</Select.Option>
                <Select.Option value="归队申请中">归队申请中</Select.Option>
                <Select.Option value="已归队">已归队</Select.Option>
              </Select>
            </FormItem>
            <FormItem label="查看范围">
              {getFieldDecorator("chakanfanwei", { initialValue: "-1" })(
                <Select style={{ width: 200 }}>
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
            {/*<FormItem>*/}
            {/*    <Button type="primary" htmlType="submit" onClick={this.output.bind(this)}>*/}
            {/*        <Icon type="export" />导出*/}
            {/*    </Button>*/}
            {/*</FormItem>*/}
          </Form>
          <Table
            columns={columns}
            dataSource={this.state.jiluList}
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