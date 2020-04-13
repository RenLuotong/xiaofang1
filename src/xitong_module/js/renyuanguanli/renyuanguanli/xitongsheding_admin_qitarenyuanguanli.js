import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, Switch } from "react-router-dom";
import xitongsheding_admin_qitarenyuanmimaxiugai from "./xitongsheding_admin_qitarenyuanmimaxiugai";
import { Icon, Input, Form, Button, Table, message } from "antd";

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
              "/xitongsheding_admin_qitarenyuanmimaxiugai/:id"
            }
            component={xitongsheding_admin_qitarenyuanmimaxiugai}
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
      renyuanList: [],
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
    let form = this.props.form;
    let xm = form.getFieldValue("xm");
    if (typeof xm == "undefined") {
      xm = "";
    }
    let page = params.page - 1;
	let size = params.rows===undefined?10:params.rows;
    const THE = this;
    $.ajax({
      type: "get",
      url:
        SERVER +
        "zhiduiRenyuanLiebiao?xingming=" +
        xm +
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
        title: "登陆名",
        dataIndex: "dengluming",
        width: "10%",
      },
      {
        title: "人员姓名",
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
		width:'14%'
      },
      {
        title: "入伍时间",
		dataIndex: "ruzhishijian",
		width:'10%'
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
                "/xitongsheding_admin_qitarenyuanmimaxiugai/" +
                record["id"]
              }
            >
              修改密码
            </Link>
          </span>
        ),
      },
    ];

    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          layout="inline"
          style={{ margin: 5 }}
        >
          <FormItem label="人员姓名">
            {getFieldDecorator("xm")(<Input style={{ width: 200 }} />)}
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
        </Form>
        <Table
          columns={columns}
          dataSource={this.state.renyuanList}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          scroll={{ y: "calc(100vh - 342px)", x: true }}
        />
      </div>
    );
  }
}

const AppComp = Form.create()(App);
export default Appmain;
