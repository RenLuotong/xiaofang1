import React, { Component } from "react";
import { Card, Tag, Tree, Icon, Button } from "antd";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BarOptions: {},
    };
  }

  componentDidMount() {
    let { type, params } = this.props;
    if (type == "警情") {
      this.jingqingBar(JSON.parse(params));
    } else if (type == "出警") {
      this.chujingBar(JSON.parse(params));
    } else if (type == "伙食费") {
      this.huoshifeiBar(JSON.parse(params));
    } else if (type == "人数") {
      this.renshuBar(JSON.parse(params));
    }
  }

  //警情柱状图
  jingqingBar(params) {
    let option = {
      xAxis: {
        type: "category",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ], //x轴数据
        axisTick: {
          show: false, //刻度显示与隐藏
        },
        axisLabel: {
          color: "#fff", //标签颜色
        },
        axisLine: {
          lineStyle: {
            color: "transport",
          },
        },
      },
      yAxis: [
        {
          //如果需要左右两个y轴,则在数组中再添加一项配置
          type: "value",
          name: "月出警情统计", //y轴标题
          nameTextStyle: {
            color: "#fff", //y轴标题颜色
          },
          axisLine: {
            lineStyle: {
              color: "#fff", //y轴线颜色
            },
          },
          axisTick: {
            show: true,
            inside: true, //方向:true内false外
          },
          position: "left", //左
          axisLabel: {
            color: "#fff", //标签颜色
          },
          min: 0,
          max: params.maxData,
          interval: 10, //分隔多少
          splitLine: {
            lineStyle: {
              type: "dashed", //分割线虚线
              color: "rgba(255,255,255,0.5)",
            },
            show: true,
          },
        },
        {
          //如果需要左右两个y轴,则在数组中再添加一项配置
          type: "value",
          nameTextStyle: {
            color: "#fff", //y轴标题颜色
          },
          axisLine: {
            lineStyle: {
              color: "#fff", //y轴线颜色
            },
          },
          axisTick: {
            show: true,
            inside: true, //方向:true内false外
          },
          position: "right", //左
          axisLabel: {
            color: "#fff", //标签颜色
          },
          min: 0,
          max: params.maxData,
          interval: 10, //分隔多少
          splitLine: {
            lineStyle: {
              type: "dashed", //分割线虚线
              color: "rgba(0,0,0,0.5)",
            },
            show: true,
          },
        },
      ],
      series: [
        {
          data: params.data, //数据
          type: "bar", //柱状图
          // showBackground: true,  //阴影
          // backgroundStyle: {
          //     color: 'rgba(220, 220, 220, 0.8)'
          // },
          barWidth: 15,
          itemStyle: {
            //图形样式
            color: "rgb(93,190,249)",
          },
          label: {
            //标注
            position: "top",
            show: true,
            color: "rgb(93,190,249)",
          },
          // emphasis: { //高亮

          // },
        },
      ],
      grid: {
        x: 50,
        y: 35,
        x2: 30,
        y2: 35,
      },
    };
    this.setState({
      BarOptions: option,
    });
  }

  //出警柱状图
  chujingBar(params) {
    let option = {
      xAxis: {
        type: "category",
        data: params.label, //x轴数据
        axisTick: {
          show: false, //刻度显示与隐藏
        },
        axisLabel: {
          color: "#fff", //标签颜色
        },
        axisLine: {
          lineStyle: {
            color: "transport",
          },
        },
      },
      grid: {
        left: "7%",
        bottom: "15%",
      },
      yAxis: [
        {
          //如果需要左右两个y轴,则在数组中再添加一项配置
          type: "value",
          name: "月出警次数", //y轴标题
          nameTextStyle: {
            color: "#fff", //y轴标题颜色
          },
          axisLine: {
            lineStyle: {
              color: "#fff", //y轴线颜色
            },
          },
          axisTick: {
            show: true,
            inside: true, //方向:true内false外
          },
          position: "left", //左
          axisLabel: {
            color: "#fff", //标签颜色
          },
          min: 0,
          max: params.maxData,
          interval: 10, //分隔多少
          splitLine: {
            show: false,
          },
        },
        {
          //如果需要左右两个y轴,则在数组中再添加一项配置
          type: "value",
          nameTextStyle: {
            color: "#fff", //y轴标题颜色
          },
          axisLine: {
            lineStyle: {
              color: "#fff", //y轴线颜色
            },
          },
          axisTick: {
            show: true,
            inside: true, //方向:true内false外
          },
          position: "right", //左
          axisLabel: {
            color: "#fff", //标签颜色
          },
          min: 0,
          max: params.maxData,
          interval: 10, //分隔多少
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          data: params.data, //数据
          type: "bar", //柱状图
          // showBackground: true,  //阴影
          // backgroundStyle: {
          //     color: 'rgba(220, 220, 220, 0.8)'
          // },
          barWidth: 15,
          itemStyle: {
            //图形样式
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //图形渐变色
              { offset: 0, color: "rgb(8,157,233)" },
              // { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: "rgb(112,13,218)" },
            ]),
          },
          label: {
            //标注
            position: "top",
            show: true,
            color: "rgb(1,159,241)",
          },
          // emphasis: { //高亮

          // },
        },
      ],
    };
    this.setState({
      BarOptions: option,
    });
  }

  //伙食费
  huoshifeiBar(params) {
    let option = {
      xAxis: {
        type: "category",
        data: params.label, //x轴数据
        axisTick: {
          show: false, //刻度显示与隐藏
        },
        axisLabel: {
          color: "#fff", //标签颜色
        },
        axisLine: {
          lineStyle: {
            color: "transport",
          },
        },
      },
      yAxis: [
        {
          //如果需要左右两个y轴,则在数组中再添加一项配置
          type: "value",
          name: "单位:元(伙食费分布)", //y轴标题
          nameTextStyle: {
            color: "#fff", //y轴标题颜色
            padding: [0, 0, 0, 30],
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: "left", //左
          axisLabel: {
            color: "#fff", //标签颜色
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.6)",
            },
            show: true,
          },
        },
      ],
      series: [
        {
          //含有折线可配置不含有删除
          data: params.data, //数据
          type: "line", //折线
          lineStyle: {
            color: "#fff",
          },
          itemStyle: {
            borderColor: "#fff",
          },
        },
        {
          data: params.data, //数据
          type: "bar", //柱状图
          // showBackground: true,  //阴影
          // backgroundStyle: {
          //     color: 'rgba(220, 220, 220, 0.8)'
          // },
          barWidth: 15,
          itemStyle: {
            //图形样式
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //图形渐变色
              { offset: 0, color: "rgb(8,157,233)" },
              // { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: "rgb(112,13,218)" },
            ]),
          },
          label: {
            //标注
            position: "top",
            show: true,
            color: "rgb(1,159,241)",
          },
          // emphasis: { //高亮

          // },
        },
      ],
    };
    this.setState({
      BarOptions: option,
    });
  }

  //人数
  renshuBar(params) {
    let option = {
      xAxis: {
        type: "category",
        data: params.label, //x轴数据
        axisTick: {
          show: false, //刻度显示与隐藏
        },
        axisLabel: {
          color: "#fff", //标签颜色
        },
        axisLine: {
          lineStyle: {
            color: "transport",
          },
        },
      },
      yAxis: [
        {
          //如果需要左右两个y轴,则在数组中再添加一项配置
          type: "value",
          nameTextStyle: {
            color: "#fff", //y轴标题颜色
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: "left", //左
          axisLabel: {
            color: "#fff", //标签颜色
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.6)",
            },
            show: true,
          },
        },
      ],
      series: [
        {
          //含有折线可配置不含有删除
          data: params.data, //数据
          type: "line", //折线
          lineStyle: {
            color: "#fff",
          },
          itemStyle: {
            borderColor: "#fff",
          },
        },
        {
          data: params.data, //数据
          type: "bar", //柱状图
          // showBackground: true,  //阴影
          // backgroundStyle: {
          //     color: 'rgba(220, 220, 220, 0.8)'
          // },
          barWidth: 15,
          itemStyle: {
            //图形样式
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //图形渐变色
              { offset: 0, color: "rgb(8,157,233)" },
              // { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: "rgb(112,13,218)" },
            ]),
          },
          label: {
            //标注
            position: "top",
            show: true,
            color: "#34abff",
          },
          // emphasis: { //高亮

          // },
        },
      ],
      grid: {
        x: 50,
        y: 25,
        x2: 30,
        y2: 35,
      },
    };
    this.setState({
      BarOptions: option,
    });
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
        option={this.state.BarOptions}
      />
    );
  }
}
