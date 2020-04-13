import React, { Component } from "react";
import { Card, Tag, Tree, Icon, Button } from "antd";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/legend";
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieOption: {}
    };
  }

  componentDidMount() {
    let { type, params } = this.props;
    if (type == "警情") {
      this.huanPie(JSON.parse(params));
    } else if (type == "菜品分析") {
      this.Pie(JSON.parse(params));
    } else if (type == "车辆状态") {
      this.mainPie(JSON.parse(params));
    }
  }

  //战备秩序环形饼图
  huanPie = params => {
    let THE = this;
    params.maxData = THE.sum(params.data);
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        right: 20,
        bottom: 20,
        itemWidth: 15,
        itemHeight: 15,
        textStyle: {
          color: "#fff"
        },
        data: params.label
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: [30, 110],
          center: ["40%", "50%"],
          avoidLabelOverlap: false,
          data: [
            {
              value: params.data[2],
              name: params.label[2],
              itemStyle: {
                color: params.color[3]
              }
            },
            {
              value: params.data[3],
              name: params.label[3],
              itemStyle: {
                color: params.color[2]
              }
            },
            {
              value: params.data[1],
              name: params.label[1],
              itemStyle: {
                color: params.color[1]
              }
            },
            {
              value: params.data[0],
              name: params.label[0],
              itemStyle: {
                color: params.color[0]
              }
            }
          ],
          roseType: "area",
          label: {
            formatter: function(param) {
              return (
                parseInt((param.value / THE.sum(params.data)) * 100) + " %"
              );
            }
          },
          labelLine: {
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold"
            }
          },
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }
      ]
    };

    this.setState({
      pieOption: option
    });
  };

  //菜品分析
  Pie = params => {
    //参考参数
    params = {
      label: [
        "鱼香肉丝",
        "麻婆豆腐",
        "红烧豆腐",
        "宫保鸡丁",
        "鱼香茄子",
        "开水白菜",
        "爆炒腰花",
        "夫妻肺片",
        "辣子鸡丁",
        "烧白菜"
      ],
      data: [13, 11, 15, 12, 9, 14, 13, 18, 17, 12, 16],
      color: [
        "rgb(61,197,197)",
        "rgb(240,145,51)",
        "rgb(183,221,112)",
        "rgb(35,82,124)"
      ]
    };

    let THE = this;
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: [
        {
          orient: "vertical",
          right: 20,
          top: "middle",
          icon: "circle",
          itemWidth: 15,
          itemHeight: 15,
          itemGap:20,
          textStyle: {
            color: "#fff"
          },
          data: params.label.slice(0, 5),
          x: "left"
        },
        {
          orient: "vertical",
          right: 20,
          top: "middle",
          icon: "circle",
          itemWidth: 15,
          itemHeight: 15,
          itemGap:20,
          textStyle: {
            color: "#fff"
          },
          data: params.label.slice(5, 10),
          x: "right"
        }
      ],
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "80%",
          center: ["50%", "50%"],
          data: (function(par) {
            let arr = [];
            for (let i = 0; i < params.label.length; i++) {
              arr.push({
                value: params.data[i],
                name: params.label[i]
              });
            }
            return arr;
          })(),
          label: {
            show: false,
            formatter: function(param) {
              return (
                parseInt((param.value / THE.sum(params.data)) * 100) + " %"
              );
            }
          },
          labelLine: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold"
            }
          },
          roseType: "area",
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }
      ]
    };

    this.setState({
      pieOption: option
    });
  };

  //首页饼图
  mainPie = params => {
    //参考参数
    params = {
      label: ["待命", "出动", "维修"],
      data: [ 3, 5, 1],
      color: [
        "rgb(240,145,51)",
        "rgb(183,221,112)",
        "rgb(35,82,124)"
      ]
    };

    let THE = this;
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      name:'消防车情况',
      legend: {
        orient: "vertical",
        right: '10%',
        top: "60",
        icon: "rect",
        itemWidth: 10,
        itemHeight: 10,
        itemGap:20,
        textStyle: {
          color: "#fff"
        },
        formatter: function(param) {
          // console.log(param);
          return (
            param +
            " : " +
            THE.getDataItem(param, params.label, params.data) +
            " 辆"
          );
        },
        data: params.label
      },
      series: [
        {
          type: "pie",
          radius: "70%",
          center: ["40%", "50%"],
          data: [
            {
              value: params.data[0],
              name: params.label[0],
              itemStyle: {
                color: params.color[0]
              }
            },
            {
              value: params.data[1],
              name: params.label[1],
              itemStyle: {
                color: params.color[1]
              }
            },
            {
              value: params.data[2],
              name: params.label[2],
              itemStyle: {
                color: params.color[2]
              }
            },
            {
              value: params.data[3],
              name: params.label[3],
              itemStyle: {
                color: params.color[3]
              }
            }
          ],
          label: {
            show: false,
            formatter: function(param) {
              return (
                parseInt((param.value / THE.sum(params.data)) * 100) + " %"
              );
            }
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold"
            }
          },
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }
      ],
      grid: {
        x: 50,
        y: 25,
        x2: 30,
        y2: 35,
      },
    };

    this.setState({
      pieOption: option
    });
  };

  //求和
  sum(arr) {
    var sum = 0,
      l = arr.length;
    for (var i = 0; i < l; i++) {
      sum += arr[i];
    }
    return sum;
  }

  //返回对应数据
  // item:标签名称
  // labelItem:标签数组
  // data:数据数组
  getDataItem(labelItem, label, data) {
    var dataItem;
    for (var i = 0; i < label.length; i++) {
      if (label[i] == labelItem) {
        dataItem = data[i];
      }
    }
    return dataItem;
  }

  render() {
    return (
      <ReactEchartsCore
        style={
          this.props.heighttemp == "auto"
            ? {}
            : { height: this.props.heighttemp }
        }
        echarts={echarts}
        option={this.state.pieOption}
      />
    );
  }
}
