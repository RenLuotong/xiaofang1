import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, Switch } from "react-router-dom";
import xitongsheding_admin_zuzhijigouxiugai from "./xitongsheding_admin_zuzhijigouxiugai";
import { Button, Table } from "antd";

class Appmain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        pageSize: 100,
        current: 1,
      },
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
              "/xitongsheding_admin_zuzhijigouxiugai/:id"
            }
            component={xitongsheding_admin_zuzhijigouxiugai}
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

  toDelete() {
    //删除功能暂时不提供
  }

  getZuzhijigouList() {
    const THE = this;
    $.ajax({
      type: "get",
      url: SERVER + "zuzhijiegouLiebiao?page=0&size=100",
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.content.length; i++) {
          data.data.content[i]["key"] = i;
        }
        THE.setState({
          zuzhijigouList: data.data.content,
        });
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
      },
      {
        title: "机构名称",
        dataIndex: "jigoumingcheng",
      },
      {
        title: "机构类别",
        dataIndex: "jigouleibie",
      },
      {
        title: "机构地址",
        dataIndex: "jigoudizhi",
      },
      {
        title: "上级机构名称",
        dataIndex: "shangjijigoumingcheng",
      },
      {
        title: "所属营区",
        dataIndex: "yingqumingcheng",
      },
      {
        title: "所属区域",
        dataIndex: "cityName",
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <span>
            <Link
              to={
                this.props.match.url +
                "/xitongsheding_admin_zuzhijigouxiugai/" +
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
        <Link to="/xitongsheding_admin_zuzhijigoutianjia">
          <Button type="primary" style={{ margin: 5 }}>
            新增组织机构
          </Button>
        </Link>
        <Table
          columns={columns}
          dataSource={this.state.zuzhijigouList}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          scroll={{ y: "calc(100vh - 370px)", x: true }}
        />
      </div>
    );
  }
}

export default Appmain;
