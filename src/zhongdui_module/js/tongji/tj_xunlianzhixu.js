import React from "react";
import { Row, Col, Progress } from "antd";
import echarts from "echarts";
import Swiper from "swiper/js/swiper.js";
import "swiper/css/swiper.min.css";
import geoJson from "../components/阳谷县";
import "./tj_xunlianzhixu.less";
// import arr from "../components/roadData";
import Map from "../components/map";

import folder from "../../imgs/xunlianzhixu_folder.png";
import shuxiyanlian from "../../imgs/xunlianzhixu_shuxiyanlianjilu.png";
import tj_xlzx_you from "../../imgs/tj_xlzx_you.png";
import tj_xlzx_liang from "../../imgs/tj_xlzx_liang.png";
import tj_xlzx_cha from "../../imgs/tj_xlzx_cha.png";

const yiranyibao =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJGNzNENzFGNzMxRjExRUFBRjJBOUQ5OEMyMDZEMThDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJGNzNENzIwNzMxRjExRUFBRjJBOUQ5OEMyMDZEMThDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkY3M0Q3MUQ3MzFGMTFFQUFGMkE5RDk4QzIwNkQxOEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkY3M0Q3MUU3MzFGMTFFQUFGMkE5RDk4QzIwNkQxOEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz734ofJAAABLElEQVR42mL8//8/AxzcZAkEkn5AbAPEP4H4MBCvZVD/swemhBGu4SbLQiAZx4AdzANqSgazQBr+32CeB8T/v15Q+19UPvu/ov3p/1ouR//XN0z8/+Oy3H+QHBAXgw0HMtRAAt8vy//Xdj/yn0HhAQoOiF8P03ABpIEJaIktyKalh+IZrt6UwXDLhoOGDMduRIGY+kBnW4M0GIB4F+7LM+AClx6qwJh6IA2PQCxZkbc4NUgLweWegjQcAbHiHDYwcPB9w1CsoviCwd1wDYx7GBZKm0EeO7UlChw6MA/bBu36f/+QK8zTc0BqIfFwkwXk2/VAbAK2960NAyvLTwYx/tMwk7cDsT8wLn4zosX0dGioaUNFQM49BFRYjRnTyOAmizSQ/ANU+BJdCiDAAH6CnUSqTcEzAAAAAElFTkSuQmCC";
const gujianzhu =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE4MjAyRkYzNzMxRTExRUE4MkEzQzFCQTE0RThFNjcyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE4MjAyRkY0NzMxRTExRUE4MkEzQzFCQTE0RThFNjcyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTgyMDJGRjE3MzFFMTFFQTgyQTNDMUJBMTRFOEU2NzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTgyMDJGRjI3MzFFMTFFQTgyQTNDMUJBMTRFOEU2NzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7RpgRBAAABZElEQVR42mL4//8/AxJWB+IJQHwLiF9D6X4gVkNWh6yhBYjf/j847//fdtf/f8vkwfT/g/P/g8Uh8mC1jGCdDAwdDL9/lP+r02L4c+s+AzpgVldiYG66zsDAwtYB5FaCNCkBGef/lArz/bv3jgEXYFKSYGDpfv4RyNRnAhKZDEcW49UAAv/uvWBgOLqUH6QepCny755JDMSAf3sng6hokCbe/x8uEafpzUkQxQ/S9IlJUJ8oTYwCBiDqC0jTaibHbKI0MbsXg6gloNBTBTKu/k5lZP2PJyyYJIEhPuX/dyBTG2TTbSCezlpxAq8tLLV3QNR0IL7PBBXLZ1A2P8AaVIhVA1tCOwODuPIaIBPsPiYkuemM0X0fmFVlUf2hCwwk34pXUFsgAC3Btv3/8fn/z2iG/z+DgDgGKPTnNyjtNeBKsDA89f/NI///Nln8/3/7OEjDFHQ12DSBcBUQP4bSGPIAAQYA+7sZFxbFzOAAAAAASUVORK5CYII=";
const renyuanmiji =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwNjM4QUQ4NzMxRTExRUFCOURCRUQ0MUY5QUE0Q0U3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIwNjM4QUQ5NzMxRTExRUFCOURCRUQ0MUY5QUE0Q0U3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjA2MzhBRDY3MzFFMTFFQUI5REJFRDQxRjlBQTRDRTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjA2MzhBRDc3MzFFMTFFQUI5REJFRDQxRjlBQTRDRTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7OpFesAAABz0lEQVR42oxSOyyDURT+fqrRVL0G8YpXpEGIYLAwGETndhIDogNmFovXYBBGEgvBJAQTYfKIMDDRH2moeCUGr9LG77bXufW3+dEfJ/nuPffe851z7nevdI0URLNMfm+kqUNdjt9IqUq0OAP0rUeZmuwVjrGlNZmm/mhBUrQOqLoFfv/zXVU1RUhI298F4k0J1MXr99gYnepdbzPTYPIVmOsSyuys2OvW7YAq2sgvIRSG4PPV31VWg51cf96zOJu62ANMpnVaulUcUkdrEufcFtjcWGFuN5jHA3Z2DkU+xfuB+0uluMpCGIutMBTkw5CXB4PVitia2gYhov1tdQWPQxP4zURCbdKknnaYa2rtoA4qeDDIX/v7OF3nX/ANDnDBISuH0ICcIsKYf2T4T7J/dEQQxwjW0AuKQU2SRdh6cNh1yQ8OhyBvEjLCvMgzkqJC8hzmudLVgXkuxZRLsbc/PhI9ZRJ/8T7eWnI10qsf9Z2p0THI9F4AZnMiJfF+/0hl/PgkQkzsbES6vIOMo+2QL8jgQQROQzGlEZZGg2ZlYZ4/O508eCyLu84R6lTMBWQXf3K2cWV5UZw1hXmRBOEkhCVCg3ZfPbMRlrVkgQ8BBgCRDzES7h6gCQAAAABJRU5ErkJggg==";
class Tj_xunlianzhixu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapState: [
        {
          mingcheng: "人员密集场所",
          data: [
            [115.790618, 36.119592],
            [115.78873, 36.116541],
            [115.823234, 36.123197],
            [115.841945, 36.139142],
            [115.843662, 36.203163],
          ],
        },
        {
          mingcheng: "易燃易爆场所",
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
          mingcheng: "古建筑",
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
    //可以加上你需要的条件等，然后生成Swiper对象，
    //一定要检查是不是每次都生成了Swiper对象，否则可能出现不滑动的情况和别的情况等
    this.swiper = new Swiper(".swiper-container", {
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // 如果需要滚动条
      scrollbar: {
        el: ".swiper-scrollbar",
      },

      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
    });
    // this.initalECharts();
  }

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
          name: "古建筑",
          type: "scatter",
          coordinateSystem: "geo",
          data: [
            {
              name: "测试",
              value: [115.79182, 36.114392],
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
          symbol: `image://${gujianzhu}`,
          symbolSize: [15, 20],
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
          tooltip: {
            show: true, //不显示提示标签
            formatter: "{b}", //提示标签格式
            backgroundColor: "#fff", //提示标签背景颜色
            borderColor: "#ccc",
            borderWidth: 5,
            textStyle: { color: "#000" }, //提示标签字体颜色
          },
          itemStyle: {
            normal: {
              color: "black",
            },
          },
        },
        {
          name: "人员密集场所",
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
          symbol: `image://${renyuanmiji}`,
          symbolSize: 15,
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
          tooltip: {
            show: true, //不显示提示标签
            formatter: "{b}", //提示标签格式
            backgroundColor: "#fff", //提示标签背景颜色
            borderColor: "#ccc",
            borderWidth: 5,
            textStyle: { color: "#000" }, //提示标签字体颜色
          },
          itemStyle: {
            normal: {
              color: "black",
            },
          },
        },
        {
          name: "易燃易爆场所",
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
          symbol: `image://${yiranyibao}`,
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
          tooltip: {
            show: true, //不显示提示标签
            formatter: "{b}", //提示标签格式
            backgroundColor: "#fff", //提示标签背景颜色
            borderColor: "#ccc",
            borderWidth: 5,
            textStyle: { color: "#000" }, //提示标签字体颜色
          },
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
    return (
      <div id="xunlianzhixu_div">
        <Row>
          <Col span={8}>
            <div style={{ padding: "0 5%" }}>
              <div className="jinrikebiao_tit" />
              <div className="kebiao_div">
                <table>
                  <tbody>
                    <tr>
                      <td colSpan={2}>时间</td>
                      <td>科目</td>
                      <td>到课率</td>
                      <td>影像记录</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>早晨</td>
                      <td>3000米跑</td>
                      <td>80%</td>
                      <td>
                        <a className="btn_a" />
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={2}>上午</td>
                      <td>8:30-9:30</td>
                      <td>3000米跑</td>
                      <td>80%</td>
                      <td>
                        <a className="btn_a" />
                      </td>
                    </tr>
                    <tr>
                      <td>10:00-11:00</td>
                      <td>负重登梯</td>
                      <td>80%</td>
                      <td>
                        <a className="btn_a" />
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={2}>下午</td>
                      <td>14:40-15:30</td>
                      <td>爬绳</td>
                      <td>80%</td>
                      <td>
                        <a className="btn_a" />
                      </td>
                    </tr>
                    <tr>
                      <td>16:00-17:00</td>
                      <td>党团活动</td>
                      <td>80%</td>
                      <td>
                        <a className="btn_a" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="gerenxunliandangan_tit" />
              <div className="dangan_box">
                <div className="dangan_div">
                  <span className="name">姓名</span>
                  <span className="date">时间</span>
                  <span className="kemu">科目</span>
                  <span className="chengji">成绩</span>
                </div>
                <div className="dangan_info_box">
                  <div className="dangan_div you">
                    <span>姜山</span>
                    <span>2019年10月5日</span>
                    <span>3000米跑</span>
                    <span>优</span>
                  </div>
                  <div className="dangan_div liang">
                    <span>杨建国</span>
                    <span>2019年10月5日</span>
                    <span>3000米跑</span>
                    <span>良</span>
                  </div>
                  <div className="dangan_div bujige">
                    <span>张成龙</span>
                    <span>2019年10月15日</span>
                    <span>爬绳</span>
                    <span>不及格</span>
                  </div>
                  <div className="dangan_div liang">
                    <span>石庆鹏</span>
                    <span>2019年12月5日</span>
                    <span>负重爬梯</span>
                    <span>良</span>
                  </div>
                  <div className="dangan_div you">
                    <span>李建设</span>
                    <span>2019年11月25日</span>
                    <span>3000米跑</span>
                    <span>优</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="xunlianzhixu_box_2">
              <div>
                <p className="b_p">人员密集场所</p>
                <p className="b_p2" style={{ color: "#08d1ea" }}>
                  12<span>个</span>
                </p>
              </div>
              <div>
                <p className="b_p">易燃易爆场所</p>
                <p className="b_p2" style={{ color: "#D02C25" }}>
                  12<span>个</span>
                </p>
              </div>
              <div>
                <p className="b_p">古建筑</p>
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
                  this.markerhandle("人员密集场所");
                }}
              >
                <img style={{ margin: "0 8px" }} src={renyuanmiji} />
                <span style={{ color: "#fff" }}>人员密集场所</span>
              </div>
              <div
                onClick={() => {
                  this.markerhandle("易燃易爆场所");
                }}
                className="mapLabel"
              >
                <img style={{ margin: "0 8px" }} src={yiranyibao} />
                <span style={{ color: "#fff" }}>易燃易爆场所</span>
              </div>
              <div
                onClick={() => {
                  this.markerhandle("古建筑");
                }}
                className="mapLabel"
              >
                <img style={{ margin: "0 8px" }} src={gujianzhu} />
                <span style={{ color: "#fff" }}>古建筑</span>
              </div>
            </div>
            <div style={{ padding: "0 15%", marginTop: "20px" }}>
              <img className="shuxiyanlianjilu_tit" src={shuxiyanlian} />
              <div style={{ height: "170px" }}>
                <div className="swiper-container">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="swiper-Item">
                        <div className="jiuyuanzhan">
                          <img src="" className="jiuyuanzhantu" />
                          <img src={folder} className="folder" />
                        </div>
                        <div className="jiuyuanzhan">
                          <img src="" className="jiuyuanzhantu" />
                          <img src={folder} className="folder" />
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="swiper-Item">
                        <div className="jiuyuanzhan">
                          <img src="" className="jiuyuanzhantu" />
                          <img src={folder} className="folder" />
                        </div>
                        <div className="jiuyuanzhan">
                          <img src="" className="jiuyuanzhantu" />
                          <img src={folder} className="folder" />
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="swiper-Item">
                        <div className="jiuyuanzhan">
                          <img src="" className="jiuyuanzhantu" />
                          <img src={folder} className="folder" />
                        </div>
                        <div className="jiuyuanzhan">
                          <img src="" className="jiuyuanzhantu" />
                          <img src={folder} className="folder" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ padding: "0 5%" }}>
              <div className="shuxiyanlian_tit" />
              <table className="shuxiyanlian_table">
                <thead>
                  <tr>
                    <th>单位名称</th>
                    <th>时间</th>
                    <th>负责人</th>
                    <th>影像资料</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="green">
                    <td>景阳冈消防救援站</td>
                    <td>2019年5月15日</td>
                    <td>张开</td>
                    <td>
                      <a href="" />
                    </td>
                  </tr>
                  <tr className="red">
                    <td>景阳冈消防救援站</td>
                    <td>2019年6月12日</td>
                    <td>孔云龙</td>
                    <td>
                      <a href="" />
                    </td>
                  </tr>
                  <tr className="yellow">
                    <td>景阳冈消防救援站</td>
                    <td>2019年7月14日</td>
                    <td>周何意</td>
                    <td>
                      <a href="" />
                    </td>
                  </tr>
                  <tr className="green">
                    <td>景阳冈消防救援站</td>
                    <td>2019年2月5日</td>
                    <td>张开</td>
                    <td>
                      <a href="" />
                    </td>
                  </tr>
                  <tr className="yellow">
                    <td>景阳冈消防救援站</td>
                    <td>2019年1月11日</td>
                    <td>孔云龙</td>
                    <td>
                      <a href="" />
                    </td>
                  </tr>
                  <tr className="red">
                    <td>景阳冈消防救援站</td>
                    <td>2019年2月1日</td>
                    <td>周何意</td>
                    <td>
                      <a href="" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="tj_xlzx_huanbi">
                <div
                  style={{ display: "flex", width: "100%", margin: "0 auto" }}
                >
                  <div
                    style={{
                      marginRight: "5%",
                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    <Progress
                      type="circle"
                      strokeColor={{
                        "0%": "#01EEFF",
                        "100%": "#01B5FF",
                      }}
                      percent={90}
                    />
                    <div className="tj_kongxiangongche">
                      <img src={tj_xlzx_you} />
                    </div>
                  </div>
                  <div
                    style={{
                      marginRight: "5%",
                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    <Progress
                      type="circle"
                      strokeColor={{
                        "0%": "#94EA76",
                        "100%": "#94EA76",
                      }}
                      percent={23}
                    />
                    <div className="tj_shiyongzhonggongche">
                      <img src={tj_xlzx_liang} />
                    </div>
                  </div>
                  <div
                    style={{
                      marginRight: "5%",
                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    <Progress
                      type="circle"
                      strokeColor={{
                        "0%": "#EB5642",
                        "100%": "#AE392A",
                      }}
                      percent={23}
                    />
                    <div
                      className="tj_kongxiangongche"
                      style={{ paddingTop: "9%" }}
                    >
                      <img src={tj_xlzx_cha} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="zhoukaohe_tit" />
              <table className="zhoukaohe_table">
                <thead>
                  <tr>
                    <th>姓名</th>
                    <th className="you">3000米跑</th>
                    <th className="liang">负重登梯</th>
                    <th className="bujige">爬绳</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="liang">张泉生</td>
                    <td className="you">优</td>
                    <td className="liang">良</td>
                    <td className="bujige">不及格</td>
                  </tr>
                  <tr>
                    <td className="liang">姜山</td>
                    <td className="liang">良</td>
                    <td className="bujige">不及格</td>
                    <td className="you">优</td>
                  </tr>
                  <tr>
                    <td className="bujige">孔云龙</td>
                    <td className="bujige">不及格</td>
                    <td className="bujige">不及格</td>
                    <td className="you">优</td>
                  </tr>
                  <tr>
                    <td className="you">杨建国</td>
                    <td className="you">优</td>
                    <td className="you">优</td>
                    <td className="liang">良</td>
                  </tr>
                  <tr>
                    <td className="liang">李建设</td>
                    <td className="liang">良</td>
                    <td className="liang">良</td>
                    <td className="you">优</td>
                  </tr>
                  <tr>
                    <td className="liang">石庆鹏</td>
                    <td className="liang">良</td>
                    <td className="bujige">不及格</td>
                    <td className="liang">良</td>
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

export default Tj_xunlianzhixu;
