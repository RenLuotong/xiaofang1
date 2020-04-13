import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import xitongsheding_admin_yingqutianjia from "./xitongsheding_admin_yingqutianjia";
import moment from "moment";
import { message, Popconfirm, Button, Table, Divider } from "antd";

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
            path={this.props.match.path + "/xitongsheding_admin_yingqutianjia"}
            component={xitongsheding_admin_yingqutianjia}
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
      yingquList: [],
      pagination: {
        current: 1,
        showQuickJumper: true,
        showSizeChanger: true,
      },
    };
  }

  fetch = () => {
    const THE = this;
    $.ajax({
      type: "GET",
      url: SERVER + "yingquxinxiliebiao",
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
          yingquList: list,
        });
      },
    });
  };

  toDelete(id) {
    const THE = this;
    $.ajax({
      type: "POST",
      url: SERVER + "shanchuyingqu?id=" + id,
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

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination) => {
	const pager = { ...this.state.pagination };
	pager.current = pagination.current;
	this.setState({
		pagination: pager,
	});
}


  render() {
    const columns = [
      {
        title: "营区编号",
        dataIndex: "id",
        colSpan: 0,
        className: "hidden_col",
        width: "25%",
      },
      {
        title: "营区名称",
        dataIndex: "mingcheng",
        width: "25%",
      },
      {
        title: "营区地址",
        dataIndex: "dizhi",
        width: "25%",
      },
      {
        title: "组织机构",
        dataIndex: "zujijigouliebiao",
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <span>
            <Popconfirm
              placement="topLeft"
              title="确认要删除该营区?"
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
        <Link to={this.props.match.url + "/xitongsheding_admin_yingqutianjia"}>
          <Button type="primary" style={{ margin: 5 }}>
            新增营区
          </Button>
        </Link>
        <Table
          columns={columns}
		  dataSource={this.state.yingquList}
		  pagination={this.state.pagination}
		  scroll={{ y: "calc(100vh - 370px)", x: true }}
		  onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default Appmain;
