import React, { Component } from "react";
import { Row, Col, Table, Layout, Icon } from "antd";
import Zhuzhuangtu from "../components/zhuzhuangtu";
import Bingtu from "../components/bingtu";
import Xiangxingtu from "../components/xiangxingtu";
import Swiper from "swiper/js/swiper.js";
import "swiper/css/swiper.min.css";
import echarts from "echarts";
import Map from "../components/map";
// import geoJson from "../components/阳谷县";
import "./tj_zhanbeizhixu.less";
import tj_zbzx_jqfx from "../../imgs/tj_zbzx_jqfx.png";
import tj_zbzx_qczb from "../../imgs/tj_zbzx_qczb.png";
import arr from "../components/roadData";
const shuiyuan =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVBMDAyMjBGNzMxNTExRUE4RDlGRkM4QkM3ODUzMEYxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVBMDAyMjEwNzMxNTExRUE4RDlGRkM4QkM3ODUzMEYxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUEwMDIyMEQ3MzE1MTFFQThEOUZGQzhCQzc4NTMwRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUEwMDIyMEU3MzE1MTFFQThEOUZGQzhCQzc4NTMwRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5k7X+LAAACnklEQVR42lRTXUtUURRd+1x1dHTMZvwoCDMN+lbCoij7FDEpkrIgzECjIhTCrN6C8AcURL1FEL1ET2Iv0kuUUUSBmUwPZpmZljrOHec641czZ3fOnXFuHdhw7rlnrb322vsQ+/thL46Bs3MhPbl7jVDwMMKhrWB1nuf1y5XeFyJivUEkAgjDvk42UEpwQZEPVughPX9Wj4E+sDkNggC8PqB8O1B7vJtz887TdMCEEAqoLsmCQp/4OdKHO53Fsv8DyFcEcueASVFHLSA0ASqvAq7dHOE1ays1mHhkCJiff41bHVU8OAAq3aRkK41ShUqo1RIR5NdBiM0VQOftXmRmHhDszqlGT1eVHHifAMVlCmTXImETifUbIT+9A3q69yvMQQFz+iQ+q0z5q9R/TviUBEGDlvesPnyrAf9HUCjYIGjWKoY1A8rKVuyJTARdHDlgSbZkkeWGvgsrXCKQ4QqrAP+JO+w2IClXaAJOkMVjgJEBpLuiQjnai5JS5dyUSiL+By3vNVQZxGYAWFemWlf4SpAQT7CvZo7dHmBhweZ2JCbBhjqLRsAeL1Bz1FIcjwWFzFnesbtdHGsA/xjS3jv1iWTopGPfIU43QlbsbIZpRgVicc32gM+0vKTyXeCxUbDhZGU1Yjw6DNpTDW5oeiqsYJdmEnaGGeWUZ0U92joicLmAsKnAKpWOgKrLmw9cvjqO9PSziERtw2wLyDBAU7+t+LbKWtF6HRwMgJYW1UQtKDVhUNsNyLINR2hyMm4bKHUFwmmyMfXrraw70S6aLkF+6Ycc9oOaW8GH6lpoYtyfaE1ipaWc04YsLumpuMuNF7aI4W8XtVR56tx9CgYekfaCHCCl3mOq8eqJZaspisfu6RlkI+0Kzc1BP6V/118BBgDAyhx5Ec0r6QAAAABJRU5ErkJggg==";
const xiaofangche =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU5M0Y2NjQzNzMxNTExRUFCNkVFRjk5M0YyODc0ODI0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU5M0Y2NjQ0NzMxNTExRUFCNkVFRjk5M0YyODc0ODI0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTkzRjY2NDE3MzE1MTFFQUI2RUVGOTkzRjI4NzQ4MjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTkzRjY2NDI3MzE1MTFFQUI2RUVGOTkzRjI4NzQ4MjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7eCpybAAAAo0lEQVR42mL4//8/AxQzAnEMEK8G4mdQvBoqxghTB2YAgTiQ9+L3pg0MP3ftYvhx+DhIjIHD1pKB3c2NgdUvgIGBkVECKPQSYvK/f/9/TOj//4xBECsGyYHUgNSCNMT82rAOp2IYBqkBqWUCWuMPcgYhAFXjD9JgDXMzPgBVY83EQCIAaTgKCg1CAKrmKEjDRlDQEQJQNRtJDlayIo6kpAEQYAAdAtxHnS0i1AAAAABJRU5ErkJggg==";

class Zhanbeizhixu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mon: 1,
      data: [
        {
          key: 1,
          name: "李新",
          time: "11:00-13:00",
          address: "街道",
          xiaohao: "消耗：白菜20斤",
        },
        {
          key: 2,
          name: "李新",
          time: "11:00-13:00",
          address: "街道",
          xiaohao: "消耗：白菜30斤",
        },
        {
          key: 3,
          name: "李新",
          time: "11:00-13:00",
          address: "街道",
          xiaohao: "消耗：白菜40斤",
        },
      ],
      PieParams: {
        //饼图参数
        label: ["火灾扑救", "抢险救援", "其他", "社会救援"],
        data: [40, 25, 25, 20],
        color: [
          "rgb(241,90,69)",
          "rgb(24,135,253)",
          "rgb(220,202,55)",
          "rgb(12,192,255)",
        ],
      },
      jingqingBarParams: {
        data: [12, 20, 15, 8, 7, 11, 13, 20, 25, 26, 30, 35],
        maxData: 40,
      },
      chujingBarParams: {
        data: [12, 20, 15, 8, 7, 11, 13, 15, 8, 7],
        label: [
          "刘腾",
          "殷亚飞",
          "王川",
          "李壮",
          "范昕东",
          "李承泓",
          "朱伟",
          "高旋",
          "贺西旭",
          "姚丙龙",
        ],
        maxData: 40,
      },
      qicaiBarParams: {
        maxData: 2000, //最大值
        backgroundColor: "rgb(9,8,68)", //背景色
        label: [
          "灭火类",
          "防护类",
          "救生类",
          "破拆类",
          "灭火类",
          "防护类",
          "救生类",
          "破拆类",
        ], //左侧标签数组
        data: [891, 1220, 660, 1670, 891, 1220, 660, 1670], //对应数据
      },
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
    this.columns = [
      {
        title: "姓名",
        dataIndex: "name",
        width: 150,
      },
      {
        title: "时间",
        dataIndex: "time",
        width: 150,
      },
      {
        title: "位置",
        dataIndex: "address",
      },
    ];
  }

  componentDidMount() {
    // this.initalECharts();
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
  }

  //swiper切换方法
  swiperHandle = (i) => {
    this.swiper.slideTo(i);
    // switch (i) {
    //   case 0:

    //     break;
    //   case 1:

    //     break;
    //   default:
    //     break;
    // }
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
              value: [115.79182, 36.114392],
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
              value: [115.772766, 36.215155],
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
              value: [115.7419967651367, 36.20001857352145],
            },
            {
              name: "测试",
              value: [116.04772567749022, 36.24503463167856],
            },
            {
              name: "测试",
              value: [115.89065551757811, 36.27085020723902],
            },
            {
              name: "测试",
              value: [115.75641632080077, 36.11541283425664],
            },
          ],
          symbol: `image://${xiaofangche}`,
          symbolSize: 10,
          symbolRotate: 40,
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
            {
              name: "测试",
              value: [115.89065551757811, 36.27085020723902],
            },
            {
              name: "测试",
              value: [115.89065551757811, 36.27085020723902],
            },
            {
              name: "测试",
              value: [115.89065551757811, 36.27085020723902],
            },
            {
              name: "测试",
              value: [115.89065551757811, 36.27085020723902],
            },
            {
              name: "测试",
              value: [115.89065551757811, 36.27085020723902],
            },
            {
              name: "测试",
              value: [115.89065551757811, 36.27085020723902],
            },
            {
              name: "测试",
              value: [115.89065551757811, 36.27085020723902],
            },
            {
              name: "测试",
              value: [115.89065551757811, 36.27085020723902],
            },
            {
              name: "测试",
              value: [115.73822021484376, 35.99550761714531],
            },
            {
              name: "测试",
              value: [115.68294525146486, 36.09932506734468],
            },
            {
              name: "测试",
              value: [115.69255828857422, 36.05048685138178],
            },
            {
              name: "测试",
              value: [115.73822021484376, 35.99550761714531],
            },
          ],
          symbol: `image://${shuiyuan}`,
          symbolSize: [15, 20],
          symbolRotate: 0,
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

  onChangeMon = () => {
    let mon = this.state.mon;
    if (mon > 1) {
      mon--;
      this.setState({
        mon: mon,
      });
    }
  };

  onChangeMons = () => {
    let mon = this.state.mon;
    if (12 > mon) {
      mon++;
      this.setState({
        mon: mon,
      });
    }
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
    let {
      PieParams,
      jingqingBarParams,
      chujingBarParams,
      qicaiBarParams,
      mon,
    } = this.state;
    return (
      <div id="zhanbuzhixu_box">
        <Row>
          <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ height: "560px" }}>
            <div style={{ height: "100%", padding: "5% 0 0 10%" }}>
              <p style={{ paddingBottom: "2%" }}>
                <img src={tj_zbzx_jqfx} />
              </p>
              <div style={{ height: "50%" }} className="tj_zbzx_jqbox">
                <div className="tj_zbzx_monchange">
                  <Icon type="caret-left" onClick={this.onChangeMon} />
                  {mon}
                  <Icon type="caret-right" onClick={this.onChangeMons} />月
                </div>
                <Bingtu
                  type="警情"
                  params={JSON.stringify(PieParams)}
                  heighttemp="100%"
                />
              </div>
              <div style={{ marginTop: "10px" }} />>
              <Zhuzhuangtu
                type="警情"
                params={JSON.stringify(jingqingBarParams)}
                heighttemp="50%"
              />
            </div>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            >
            <div className="tj_zong_box_2">
              <div style={{ margin: "0 5% 0 20%" }}>
                <p className="b_p">水源</p>
                <p className="b_p2" style={{ color: "#08d1ea" }}>
                  12<span>个</span>
                </p>
              </div>
              <div>
                <p className="b_p">消防车</p>
                <p className="b_p2" style={{ color: "#D02C25" }}>
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
            </div>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ height: "500px" }}>
            <div style={{ height: "100%", padding: "5% 15% 0 0 " }}>
              <p style={{ paddingBottom: "2%" }}>
                <img src={tj_zbzx_qczb} />
              </p>
              <Xiangxingtu
                type="器材装备"
                params={JSON.stringify(qicaiBarParams)}
                heighttemp="60%"
              />
              <div style={{ height: "40%" }}>
                <ul className="cheliangHeader">
                  <li
                    onClick={() => this.swiperHandle(1)}
                    className="cheliangItem"
                  >
                    <span
                      style={{
                        backgroundColor: "#78f7fd",
                      }}
                      className="cheliangIcon"
                    />
                    <span className="cheliangTxt">待命( 6辆 )</span>
                  </li>
                  <li
                    onClick={() => this.swiperHandle(2)}
                    className="cheliangItem"
                  >
                    <span
                      style={{
                        backgroundColor: "#3cfb14",
                      }}
                      className="cheliangIcon"
                    />
                    <span className="cheliangTxt">出动( 6辆 )</span>
                  </li>
                  <li
                    onClick={() => this.swiperHandle(3)}
                    className="cheliangItem"
                  >
                    <span
                      style={{
                        backgroundColor: "#d12c25",
                      }}
                      className="cheliangIcon"
                    />
                    <span className="cheliangTxt">维修( 1辆 )</span>
                  </li>
                </ul>
                <div
                  style={{ minHeight: "100px", padding: "1% 0" }}
                  className="tj_zbzx_xfcbox"
                >
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="swiper-Item">
                          <span className="chepaihao">鲁k123456可用</span>
                        </div>
                        <div className="swiper-Item">
                          <span className="chepaihao">鲁k123456</span>
                        </div>
                        <div className="swiper-Item">
                          <span className="chepaihao">789456</span>
                        </div>
                        <div className="swiper-Item">
                          <span className="chepaihao">鲁k123456</span>
                        </div>
                        <div className="swiper-Item">
                          <span className="chepaihao">鲁k123456</span>
                        </div>
                        <div className="swiper-Item">
                          <span className="chepaihao">鲁k123456</span>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="swiper-Item">
                          <span className="chepaihao">鲁k789456123使用中</span>
                        </div>
                        <div className="swiper-Item">
                          <span className="chepaihao">鲁k123456</span>
                        </div>
                        <div className="swiper-Item">
                          <span className="chepaihao">789456</span>
                        </div>
                        <div className="swiper-Item">
                          <span className="chepaihao">鲁k123456</span>
                        </div>
                        <div className="swiper-Item">
                          <span className="chepaihao">鲁k123456</span>
                        </div>
                        <div className="swiper-Item">
                          <span className="chepaihao">鲁k123456</span>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="swiper-Item">
                          <span className="chepaihao">鲁k789456123不可用</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Zhuzhuangtu
              type="出警"
              params={JSON.stringify(chujingBarParams)}
              heighttemp="250px"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Zhanbeizhixu;
