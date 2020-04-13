import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, Switch } from "react-router-dom";
import xitongsheding_admin_shiyongshuomingxiugai from "./xitongsheding_admin_shiyongshuomingxiugai";
import {
  Select,
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
              "/xitongsheding_admin_shiyongshuomingxiugai"
            }
            component={xitongsheding_admin_shiyongshuomingxiugai}
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
      wendangList: [],
    };
  }

  fetch = () => {
    const THE = this;
    $.ajax({
      type: "post",
      url: SERVER + "tbBangzhuWendang/findAll",
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
          wendangList: list,
        });
      },
    });
  };

  toDelete(id) {
    const THE = this;
    $.ajax({
      type: "POST",
      url: SERVER + "tbBangzhuWendang/delete?id=" + id,
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success(data.message);
        THE.fetch();
      },
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
		width:'20%'
      },
      {
        title: "文件名称",
		dataIndex: "mingcheng",
		width:'25%'
      },
      {
        title: "文件下载地路径",
        dataIndex: "lujing",
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <span>
            <Link
              to={{
                pathname:
                  this.props.match.path +
                  "/xitongsheding_admin_shiyongshuomingxiugai/",
                query: {
                  mingcheng: record["mingcheng"],
                  lujing: record["lujing"],
                  id: record["id"],
                },
              }}
            >
              修改
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              placement="topLeft"
              title="确认要删除该人员?"
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

    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          layout="inline"
          style={{ margin: 5 }}
        >
          <FormItem>
            <Button>
              <Link to="/xitongsheding_admin_shiyongshuomingtianjia">
                <Icon type="plus" />
                <span>文件添加</span>
              </Link>
            </Button>
          </FormItem>
        </Form>
        <Table
          columns={columns}
          dataSource={this.state.wendangList}
          scroll={{ y: "calc(100vh - 342px)", x: true }}
        />
      </div>
    );
  }
}

const AppComp = Form.create()(App);
export default Appmain;
