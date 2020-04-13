import React from "react";
import { Row, Col } from "antd";
import echarts from "echarts";
import geoJson from "../components/阳谷县";
import ReactEchartsCore from "echarts-for-react/lib/core";

import Zhuzhuangtu from "../components/zhuzhuangtu";
import Bingtu from "../components/bingtu";
import Map from "../components/map";
import tj_zhandouyuanimg from "../../imgs/tj_zhandouyuanimg.png";

const shuiyuan =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVBMDAyMjBGNzMxNTExRUE4RDlGRkM4QkM3ODUzMEYxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVBMDAyMjEwNzMxNTExRUE4RDlGRkM4QkM3ODUzMEYxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUEwMDIyMEQ3MzE1MTFFQThEOUZGQzhCQzc4NTMwRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUEwMDIyMEU3MzE1MTFFQThEOUZGQzhCQzc4NTMwRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5k7X+LAAACnklEQVR42lRTXUtUURRd+1x1dHTMZvwoCDMN+lbCoij7FDEpkrIgzECjIhTCrN6C8AcURL1FEL1ET2Iv0kuUUUSBmUwPZpmZljrOHec641czZ3fOnXFuHdhw7rlnrb322vsQ+/thL46Bs3MhPbl7jVDwMMKhrWB1nuf1y5XeFyJivUEkAgjDvk42UEpwQZEPVughPX9Wj4E+sDkNggC8PqB8O1B7vJtz887TdMCEEAqoLsmCQp/4OdKHO53Fsv8DyFcEcueASVFHLSA0ASqvAq7dHOE1ays1mHhkCJiff41bHVU8OAAq3aRkK41ShUqo1RIR5NdBiM0VQOftXmRmHhDszqlGT1eVHHifAMVlCmTXImETifUbIT+9A3q69yvMQQFz+iQ+q0z5q9R/TviUBEGDlvesPnyrAf9HUCjYIGjWKoY1A8rKVuyJTARdHDlgSbZkkeWGvgsrXCKQ4QqrAP+JO+w2IClXaAJOkMVjgJEBpLuiQjnai5JS5dyUSiL+By3vNVQZxGYAWFemWlf4SpAQT7CvZo7dHmBhweZ2JCbBhjqLRsAeL1Bz1FIcjwWFzFnesbtdHGsA/xjS3jv1iWTopGPfIU43QlbsbIZpRgVicc32gM+0vKTyXeCxUbDhZGU1Yjw6DNpTDW5oeiqsYJdmEnaGGeWUZ0U92joicLmAsKnAKpWOgKrLmw9cvjqO9PSziERtw2wLyDBAU7+t+LbKWtF6HRwMgJYW1UQtKDVhUNsNyLINR2hyMm4bKHUFwmmyMfXrraw70S6aLkF+6Ycc9oOaW8GH6lpoYtyfaE1ipaWc04YsLumpuMuNF7aI4W8XtVR56tx9CgYekfaCHCCl3mOq8eqJZaspisfu6RlkI+0Kzc1BP6V/118BBgDAyhx5Ec0r6QAAAABJRU5ErkJggg==";
const xiaofangche =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU5M0Y2NjQzNzMxNTExRUFCNkVFRjk5M0YyODc0ODI0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU5M0Y2NjQ0NzMxNTExRUFCNkVFRjk5M0YyODc0ODI0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTkzRjY2NDE3MzE1MTFFQUI2RUVGOTkzRjI4NzQ4MjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTkzRjY2NDI3MzE1MTFFQUI2RUVGOTkzRjI4NzQ4MjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7eCpybAAAAo0lEQVR42mL4//8/AxQzAnEMEK8G4mdQvBoqxghTB2YAgTiQ9+L3pg0MP3ftYvhx+DhIjIHD1pKB3c2NgdUvgIGBkVECKPQSYvK/f/9/TOj//4xBECsGyYHUgNSCNMT82rAOp2IYBqkBqWUCWuMPcgYhAFXjD9JgDXMzPgBVY83EQCIAaTgKCg1CAKrmKEjDRlDQEQJQNRtJDlayIo6kpAEQYAAdAtxHnS0i1AAAAABJRU5ErkJggg==";
const xiaofangdui =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBBREE1RjQ5Nzk2MDExRUE5NTJBOUExRjZGRkJENkU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBBREE1RjRBNzk2MDExRUE5NTJBOUExRjZGRkJENkU4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEFEQTVGNDc3OTYwMTFFQTk1MkE5QTFGNkZGQkQ2RTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEFEQTVGNDg3OTYwMTFFQTk1MkE5QTFGNkZGQkQ2RTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5LEhUxAAAAyElEQVR42mL8f4YBF8iH0hOxSTLi0MgNxPeA+D8QKwHxN3QFTDhsywZiMSAWB+IsYm3kgdomCuW/gtr6FVkRCxB7ALEWEKtAsQaSJgaozdeB+AYQ34HiKyAbZwEZqQykgZkgP6YD8SQSNE0A4kwmaMiBgr6VCE3NQFwI0oMeOIeB2AaHJpCcHa7okMNjmzyueORH0/gPimFAFoh5sWnURdKwGoh1gFgPygaFAyNUDEOjMhBvBGJDIA6Dxt1VKBsktgmaEMAAIMAAfYgqwhS3NNwAAAAASUVORK5CYII=";
class Tj_zong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineOption: {},
      renshuBarParams: {
        data: [120, 200, 150, 80, 70, 110, 130],
        label: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7"],
      },
      PieParams: {},
      mapState: [
        {
          mingcheng: "水源",
          data: [
            [115.790618, 36.119592],
            [115.78873, 36.116541],
            [115.823234, 36.123197],
            [115.841945, 36.139142],
            [115.843662, 36.203163],
          ],
        },
        {
          mingcheng: "乡镇消防队",
          data: [
            [116.00189208984374, 36.06408690102963],
            [115.99639892578125, 36.06686213257888],
            [115.99639892578125, 36.071302299422406],
            [115.99090576171875, 36.071302299422406],
            [115.98129272460936, 36.07518723980868],
            [116.07124328613281, 36.1245647481333],
            [116.02798461914061, 36.125119375293984][
              (115.74062347412108, 36.00856171556128)
            ],
            [115.73822021484376, 35.99550761714531],
            [116.03073120117186, 36.162824827919664],
            [116.01734161376953, 36.15672664526235],
          ],
        },
        {
          mingcheng: "消防车",
          data: [
            [115.69255828857422, 36.05048685138178],
            [115.71144104003906, 36.045767917668705],
            [115.69633483886719, 36.02300202952591],
            [115.69255828857422, 36.010505758081635],
            [115.85426330566406, 36.071857302655054],
            [115.8570098876953, 36.0779620797358],
            [115.6805419921875, 35.96022296929667],
          ],
        },
      ],
    };
  }

  componentDidMount() {
    // this.initalECharts();
    let params = {
      label: ["火灾扑救", "抢险救援", "社会救助", "其他"],
      data: [
        [105, 13, 11, 134, 50, 150, 123],
        [120, 132, 101, 134, 90, 230, 210],
        [110, 122, 145, 14, 80, 150, 120],
        [130, 133, 121, 104, 100, 120, 125],
      ],
      color: [
        "rgb(47,125,233)",
        "rgb(113,200,117)",
        "rgb(208,125,59)",
        "rgb(221,125,120)",
      ],
      XData: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7"],
    };
    this.initalLineEcharts(params);
  }

  initalLineEcharts = (params) => {
    let option = {
      legend: {
        orient: "horizontal",
        right: 10,
        top: 10,
        icon: "rect",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "#eee",
        },
        data: params.label,
      },
      xAxis: {
        type: "category",
        offset: 10,
        boundaryGap: false,
        data: params.XData,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#aaa", //标签颜色
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        offset: 5,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        position: "left", //左
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: "#aaa", //标签颜色
          formatter: function (params) {
            console.log(params);
            return params + "次";
          },
        },
      },
      series: [
        {
          name: params.label[0],
          data: params.data[0],
          type: "line",
          smooth: true,
          symbol: "none",
          itemStyle: {
            normal: {
              color: params.color[0],
              areaStyle: {
                type: "default",
                //渐变色实现
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1, //变化度
                  //三种由深及浅的颜色
                  [
                    {
                      offset: 0,
                      color: "rgba(44,135,203,0.4)",
                    },
                    {
                      offset: 0.4,
                      color: "rgba(44,135,203,0.2)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,0,0,0)",
                    },
                  ]
                ),
              },
              //以及在折线图每个日期点顶端显示数字
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "white",
                },
              },
            },
          },
        },
        {
          name: params.label[1],
          data: params.data[1],
          type: "line",
          smooth: true,
          symbol: "none",
          itemStyle: {
            normal: {
              color: params.color[1],
              areaStyle: {
                type: "default",
                //渐变色实现
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1, //变化度
                  //三种由深及浅的颜色
                  [
                    {
                      offset: 0,
                      color: "rgba(44,135,203,0.4)",
                    },
                    {
                      offset: 0.4,
                      color: "rgba(44,135,203,0.2)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,0,0,0)",
                    },
                  ]
                ),
              },
              //以及在折线图每个日期点顶端显示数字
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "white",
                },
              },
            },
          },
        },
        {
          name: params.label[2],
          data: params.data[2],
          type: "line",
          smooth: true,
          symbol: "none",
          itemStyle: {
            normal: {
              color: params.color[2],
              areaStyle: {
                type: "default",
                //渐变色实现
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1, //变化度
                  //三种由深及浅的颜色
                  [
                    {
                      offset: 0,
                      color: "rgba(44,135,203,0.4)",
                    },
                    {
                      offset: 0.4,
                      color: "rgba(44,135,203,0.2)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,0,0,0)",
                    },
                  ]
                ),
              },
              //以及在折线图每个日期点顶端显示数字
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "white",
                },
              },
            },
          },
        },
        {
          name: params.label[3],
          data: params.data[3],
          type: "line",
          smooth: true,
          symbol: "none",
          itemStyle: {
            normal: {
              color: params.color[3],
              areaStyle: {
                type: "default",
                //渐变色实现
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1, //变化度
                  //三种由深及浅的颜色
                  [
                    {
                      offset: 0,
                      color: "rgba(44,135,203,0.4)",
                    },
                    {
                      offset: 0.4,
                      color: "rgba(44,135,203,0.2)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,0,0,0)",
                    },
                  ]
                ),
              },
              //以及在折线图每个日期点顶端显示数字
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "white",
                },
              },
            },
          },
        },
      ],
    };
    this.setState({
      lineOption: option,
    });
  };

  initalECharts = (data = []) => {
    // console.log(data)
    echarts.registerMap("liaocheng", geoJson);
    const myChart = echarts.init(this.ref);
    let coordsList = [];
    for (let i = 0; i < arr.length; i++) {
      coordsList.push({
        coords: arr[i],
        lineStyle: {
          color: "#fff",
        },
      });
    }
    myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      geo: {
        roam: true, // 缩放拖动
        zoom: 1.2, //初始放大比例
        map: "liaocheng", // 自定义扩展图表类型 用于选择省份
        label: {
          show: true, // 显示标签
          // formatter: '{b}网点数:{c}'
        },
        itemStyle: {
          normal: {
            borderWidth: 5, //区域边框宽度
            borderColor: "#0298fc", //区域边框颜色
            areaColor: "#001d92", //区域颜色
            label: { show: true },
          },
          emphasis: {
            show: false, //选中效果
            borderWidth: 5, //区域边框宽度
            borderColor: "#0298fc", //区域边框颜色
            areaColor: "#001d92", //区域颜色
          },
        },
      },
      series: [
        {
          name: "消防车",
          type: "scatter",
          coordinateSystem: "geo",
          data: [
            {
              name: "测试",
              value: [115.80053329467772, 36.088228136087196],
            },
            {
              name: "测试",
              value: [115.79813003540039, 36.10237644873644],
            },
            {
              name: "测试",
              value: [115.76860427856445, 36.12012758978146],
            },
            {
              name: "测试",
              value: [115.77272415161133, 36.145776445186726],
            },
            {
              name: "测试",
              value: [115.81134796142578, 36.11929559467167],
            },
            {
              name: "测试",
              value: [115.85014343261719, 36.20716097553515],
            },
            {
              name: "测试",
              value: [115.82199096679688, 36.049098959065645],
            },
          ],
          symbol: `image://${xiaofangche}`,
          symbolSize: 10,
          label: {
            normal: {
              formatter: "{b}",
              position: "bottom",
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          // tooltip: {
          //   show: true, //不显示提示标签
          //   formatter: "{b}", //提示标签格式
          //   backgroundColor: "#fff", //提示标签背景颜色
          //   borderColor: "#ccc",
          //   borderWidth: 5,
          //   textStyle: { color: "#000" } //提示标签字体颜色
          // },
          itemStyle: {
            normal: {
              color: "black",
            },
          },
        },
        {
          name: "水源",
          type: "scatter",
          coordinateSystem: "geo",
          data: [
            {
              name: "测试",
              value: [115.772766, 36.115155],
            },
            {
              name: "测试",
              value: [115.71916580200195, 36.10404078863735],
            },
            {
              name: "测试",
              value: [115.86919784545898, 36.12983354794379],
            },
            {
              name: "测试",
              value: [115.7419967651367, 36.10001857352145],
            },
            {
              name: "测试",
              value: [115.92704772949219, 36.25700913637393],
            },
            {
              name: "测试",
              value: [116.04772567749022, 36.24503463167856],
            },
            {
              name: "测试",
              value: [115.89065551757811, 36.27085020723902],
            },
          ],
          symbol: `image://${shuiyuan}`,
          symbolSize: [10, 15],
          label: {
            normal: {
              formatter: "{b}",
              position: "bottom",
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          // tooltip: {
          //   show: true, //不显示提示标签
          //   formatter: "{b}", //提示标签格式
          //   backgroundColor: "#fff", //提示标签背景颜色
          //   borderColor: "#ccc",
          //   borderWidth: 5,
          //   textStyle: { color: "#000" } //提示标签字体颜色
          // },
          itemStyle: {
            normal: {
              color: "black",
            },
          },
        },
        {
          name: "消防队",
          type: "scatter",
          coordinateSystem: "geo",
          data: [
            {
              name: "测试",
              value: [115.812248, 36.134012],
            },
            {
              name: "测试",
              value: [115.75641632080077, 36.11541283425664],
            },
            {
              name: "测试",
              value: [115.79795837402342, 36.10695329862145],
            },
            {
              name: "测试",
              value: [115.76826095581053, 36.11887959381067],
            },
            {
              name: "测试",
              value: [115.8120346069336, 36.1235941411731],
            },
            {
              name: "测试",
              value: [115.78697204589844, 36.145915064868454],
            },
            {
              name: "测试",
              value: [115.78697204589844, 36.145915064868454],
            },
            {
              name: "测试",
              value: [115.95588684082033, 36.25756282630298],
            },
            {
              name: "测试",
              value: [115.8940887451172, 36.28192129773192],
            },
          ],
          symbol: `image://${xiaofangdui}`,
          symbolSize: 10,
          label: {
            normal: {
              formatter: "{b}",
              position: "bottom",
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          // tooltip: {
          //   show: true, //不显示提示标签
          //   formatter: "{b}", //提示标签格式
          //   backgroundColor: "#fff", //提示标签背景颜色
          //   borderColor: "#ccc",
          //   borderWidth: 5,
          //   textStyle: { color: "#000" } //提示标签字体颜色
          // },
          itemStyle: {
            normal: {
              color: "black",
            },
          },
        },
        {
          geoIndex: 0,
          type: "map",
          tooltip: {
            trigger: "none",
          },
        },
        {
          name: "测试路线",
          type: "lines",
          tooltip: {
            show: false,
          },
          coordinateSystem: "geo",
          data: coordsList,
          polyline: true,
          lineStyle: {
            color: "purple",
            opacity: 0.6,
            width: 1,
          },
        },
      ],
    });
  };

  //获取地图组件对象
  getmapObject = (e) => {
    this.children = e;
  };

  //显示隐藏marker
  markerhandle = (mingcheng) => {
    this.children.markerhandle(mingcheng);
  };

  render() {
    let { lineOption, renshuBarParams, PieParams } = this.state;
    return (
      <div id="tongji_zong_div">
        <Row>
          <Col span={8}>
            <div className="renyuanzaiwei_tit" />
            <div className="renyuan_box1">
              <div className="renyuan_1">
                <span>王铭</span>
              </div>
              <div className="renyuan_2">
                <span>韩童</span>
              </div>
              <div className="renyuan_3">
                <span>李星彬</span>
              </div>
            </div>
            <div className="yuanhuan_box">
              <div className="zongrenshu">78</div>
              <div className="zaiweirenshu">22</div>
              <div className="waichurenshu">56</div>
            </div>
            <div className="renyuanzaiweiqushi_tit" />
            <Zhuzhuangtu
              type="人数"
              params={JSON.stringify(renshuBarParams)}
              heighttemp="250px"
            />
            <div className="xiaofangcheqingkuang_tit" />
            <div className="bingtu">
              <div style={{ width: "70%" }}>
                <Bingtu
                  type="车辆状态"
                  params={JSON.stringify(PieParams)}
                  heighttemp="100%"
                />
              </div>
              <div style={{ width: "30%", marginTop: "50px" }}>
                <div
                  className="bingtutxt"
                  style={{ color: "#f2b16a", borderColor: "#f2b16a" }}
                >
                  水100吨
                </div>
                <div
                  className="bingtutxt"
                  style={{ color: "#ff5773", borderColor: "#ff5773" }}
                >
                  泡沫150吨
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="tj_zong_box_2">
              <div>
                <p className="b_p">乡镇消防队</p>
                <p className="b_p2" style={{ color: "#08d1ea" }}>
                  12<span>个</span>
                </p>
              </div>
              <div>
                <p className="b_p">水源</p>
                <p className="b_p2" style={{ color: "#D02C25" }}>
                  12<span>个</span>
                </p>
              </div>
              <div>
                <p className="b_p">消防车</p>
                <p className="b_p2" style={{ color: "#ff9745" }}>
                  12<span>个</span>
                </p>
              </div>
            </div>
            <Map
              marker={this.state.mapState}
              getmapObject={this.getmapObject}
            />
            {/* <div
              ref={(ref) => (this.ref = ref)}
              style={{ margin: "0 auto", width: "100%", height: "50vh" }}
            /> */}
            <div className="map_biaozhu">
              <div
                className="mapLabel"
                onClick={() => {
                  this.markerhandle("水源");
                }}
              >
                <img style={{ margin: "0 8px" }} src={shuiyuan} />
                <span style={{ color: "#fff" }}>水源</span>
              </div>
              <div
                onClick={() => {
                  this.markerhandle("消防车");
                }}
                className="mapLabel"
              >
                <img style={{ margin: "0 8px" }} src={xiaofangche} />
                <span style={{ color: "#fff" }}>消防车</span>
              </div>
              <div
                onClick={() => {
                  this.markerhandle("乡镇消防队");
                }}
                className="mapLabel"
              >
                <img style={{ margin: "0 8px" }} src={xiaofangdui} />
                <span style={{ color: "#fff" }}>乡镇消防队</span>
              </div>
            </div>
            <div className="xunlianzhixing">
              <div className="xunlianzhixing_1">
                <div className="avatar_mid">
                  {/*<img src={tj_zhandouyuanimg} width="100%" />*/}
                </div>
                <div className="jb_sm" />
                <div>战斗一班</div>
                <div>张泉灵</div>
              </div>
              <div className="xunlianzhixing_2">
                <div className="avatar_lg">
                  {/*<img src={tj_zhandouyuanimg} width="100%" />*/}
                </div>
                <div className="jb_lg" />
                <div>战斗一班</div>
                <div>张泉灵</div>
              </div>
              <div className="xunlianzhixing_3">
                <div className="avatar_sm">
                  {/*<img src={tj_zhandouyuanimg} width="100%" />*/}
                </div>
                <div className="jb_sm" />
                <div>战斗一班</div>
                <div>张泉灵</div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="yujingtishi">
              <div className="yujingtishi_tit" />
              <div className="yujingtishi_content">
                <div className="zhiding">
                  【置顶】 李文旭不假外出{" "}
                  <span className="zhongjian_span">16:00:45</span>{" "}
                  <span className="float_right">03-18</span>
                </div>
                <div className="yujing">
                  【预警】 陶国栋请假出差超时不假外出{" "}
                  <span className="zhongjian_span">16:00:45</span>{" "}
                  <span className="float_right">03-18</span>
                </div>
                <div className="yujing">
                  【预警】 豪沃8吨水车水车装备异常{" "}
                  <span className="zhongjian_span">16:00:45</span>{" "}
                  <span className="float_right">03-18</span>
                </div>
                <div className="tishi">
                  【提示】 王蒙三天后过生日{" "}
                  <span className="zhongjian_span">16:00:45</span>{" "}
                  <span className="float_right">03-18</span>
                </div>
                <div className="tishi">
                  【提示】 中队三天后进行歌唱比赛{" "}
                  <span className="zhongjian_span">16:00:45</span>{" "}
                  <span className="float_right">03-18</span>
                </div>
                <div className="tishi">
                  【提示】 王蒙三天后过生日{" "}
                  <span className="zhongjian_span">16:00:45</span>{" "}
                  <span className="float_right">03-18</span>
                </div>
                <div className="tishi">
                  【提示】 中队三天后进行歌唱比赛{" "}
                  <span className="zhongjian_span">16:00:45</span>{" "}
                  <span className="float_right">03-18</span>
                </div>
                <div className="tishi">
                  【提示】 王蒙三天后过生日{" "}
                  <span className="zhongjian_span">16:00:45</span>{" "}
                  <span className="float_right">03-18</span>
                </div>
                <div className="tishi">
                  【提示】 中队三天后进行歌唱比赛{" "}
                  <span className="zhongjian_span">16:00:45</span>{" "}
                  <span className="float_right">03-18</span>
                </div>
              </div>
            </div>
            <div className="jingqingfenxi">
              <div className="jingqingfenxi_tit" />
              <ReactEchartsCore echarts={echarts} option={lineOption} />
            </div>
            <div className="lishijingqing">
              <div className="lishijingqing_tit" />
              <table className="tj_table">
                <thead>
                  <tr>
                    <th>单位名称</th>
                    <th>类型</th>
                    <th>灾害地点</th>
                    <th>接警时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>景阳冈消防救援站</td>
                    <td>大型展览会</td>
                    <td>景阳冈马路</td>
                    <td>03-18 15:22:22</td>
                  </tr>
                  <tr>
                    <td>景阳冈消防救援站</td>
                    <td>大型展览会</td>
                    <td>景阳冈马路</td>
                    <td>03-18 15:22:22</td>
                  </tr>
                  <tr>
                    <td>景阳冈消防救援站</td>
                    <td>大型展览会</td>
                    <td>景阳冈马路</td>
                    <td>03-18 15:22:22</td>
                  </tr>
                  <tr>
                    <td>景阳冈消防救援站</td>
                    <td>大型展览会</td>
                    <td>景阳冈马路</td>
                    <td>03-18 15:22:22</td>
                  </tr>
                  <tr>
                    <td>景阳冈消防救援站</td>
                    <td>大型展览会</td>
                    <td>景阳冈马路</td>
                    <td>03-18 15:22:22</td>
                  </tr>
                  <tr>
                    <td>景阳冈消防救援站</td>
                    <td>大型展览会</td>
                    <td>景阳冈马路</td>
                    <td>03-18 15:22:22</td>
                  </tr>
                  <tr>
                    <td>景阳冈消防救援站</td>
                    <td>大型展览会</td>
                    <td>景阳冈马路</td>
                    <td>03-18 15:22:22</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tj_zong;
