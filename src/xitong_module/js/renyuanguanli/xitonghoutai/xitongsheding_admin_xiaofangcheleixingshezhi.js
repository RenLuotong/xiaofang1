import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, Switch } from "react-router-dom";
import { message, Popconfirm, Button, Table } from "antd";

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
        </Switch>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xiaofangcheleixingList: [],
      pagination: {
        current: 1,
        showQuickJumper: true,
        showSizeChanger: true,
      },
    };
  }

  toDelete(xiaofangcheleixing) {
    const THE = this;
    $.ajax({
      type: "POST",
      url:
        SERVER +
        "shanchuXiaofangcheleixing?xiaofangcheleixing=" +
        xiaofangcheleixing,
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success("删除成功");
        THE.getXiaofangcheleixingList();
      },
      error: function () {
        message.error("操作失败");
      },
    });
  }

  getXiaofangcheleixingList() {
    const THE = this;
    $.ajax({
      type: "GET",
      url: SERVER + "xiaofangcheleixingliebiao",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        for (let i = 0; i < data.data.length; i++) {
          data.data[i]["key"] = i;
        }
        THE.setState({
          xiaofangcheleixingList: data.data,
        });
      },
    });
  }

  componentDidMount() {
    this.getXiaofangcheleixingList();
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
        width: "50%",
      },
      {
        title: "消防车类型",
        dataIndex: "xiaofangcheleixing",
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <span>
            <Popconfirm
              placement="topLeft"
              title="确认要删除此消防车类型?"
              onConfirm={this.toDelete.bind(this, record["xiaofangcheleixing"])}
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
        <Link to="/xitongsheding_admin_xiaofangcheleixingtianjia">
          <Button type="primary" style={{ margin: 5 }}>
            新增消防车类型
          </Button>
        </Link>
        <Table
          columns={columns}
          dataSource={this.state.xiaofangcheleixingList}
          onChange={this.handleTableChange}
          scroll={{ y: "calc(100vh - 370px)", x: true }}
          pagination={this.state.pagination}
        />
      </div>
    );
  }
}

export default Appmain;
