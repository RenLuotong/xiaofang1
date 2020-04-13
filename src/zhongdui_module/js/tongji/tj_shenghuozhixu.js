import React, { Component } from "react";
import { Row, Col, Table } from "antd";
import Zhuzhuangtu from "../components/zhuzhuangtu";
import Bingtu from "../components/bingtu";

import "./tj_shenghuozhixu.less";
import caipinfenxi from "../../imgs/tj_shzx_caipinfenxi.png";
import yingqujiankong from "../../imgs/tj_shzx_yingqujiankong.png";
import shengritixing from "../../imgs/tj_shzx_shengritixing.png";
import xiaohaocailiang from "../../imgs/tj_shzx_xiaohaocailiang.png";
import xiaodujilu from "../../imgs/tj_shzx_xiaodujilu.png";
import tj_shzx_cfxx from "../../imgs/tj_shzx_cfxx.png";
import tj_shzx_jrsp from "../../imgs/tj_shzx_jrsp.png";
import tj_shzx_duibu from "../../imgs/tj_shzx_zuzhi.png";

class Shenghuozhixu extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        {
          key: 3,
          name: "李新",
          time: "11:00-13:00",
          address: "街道",
          xiaohao: "消耗：白菜40斤",
        },
        {
          key: 3,
          name: "李新",
          time: "11:00-13:00",
          address: "街道",
          xiaohao: "消耗：白菜40斤",
        },
      ],
      huoshifeiBarParams: {
        data: [120, 200, 150, 80, 70, 110, 130],
        label: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7"],
      },
      caipinPieParams: {},
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

  componentDidMount() {}

  render() {
    let { data, huoshifeiBarParams, caipinPieParams } = this.state;
    return (
      <div id="tongji_shenghuozhixu_div">
        <Row>
          <Col xs={7} sm={7} md={7} lg={7} xl={7} className="box">
            <div className="leftbox">
              <div className="chufang">
                <p style={{ textAlign: "center", padding: "5% 0 2%" }}>
                  <img src={tj_shzx_cfxx} />
                </p>
                <ul className="chufangxinxi">
                  <li className="chufangrenyuan">
                    <div className="chufangtouxiang" />
                    <div className="renyuan">厨师:刘浩</div>
                  </li>
                  <li className="chufangrenyuan">
                    <div className="chufangtouxiang" />
                    <div className="renyuan">厨师:周恒毅</div>
                  </li>
                </ul>
                <ul className="chufangxinxi">
                  <li className="chufangrenyuan">
                    <div className="chufangtouxiang" />
                    <div className="renyuan renyuanlong">厨房值班员:卢庆生</div>
                  </li>
                </ul>
              </div>
              <div className="jinrishipuBox">
                <p style={{ textAlign: "right" }}>
                  <img
                    src={tj_shzx_jrsp}
                    style={{ margin: "-10px -6px 0 0" }}
                  />
                </p>
                <div className="jinrishipu">
                  <div
                    className="caipuxinxi caipuxinxi1"
                    style={{ color: "#04fbad" }}
                  >
                    <p>主食：馒头、米饭</p>
                    <p>菜品：咸菜、鸡蛋</p>
                  </div>
                  <div
                    className="caipuxinxi caipuxinxi2"
                    style={{ color: "#ffec00" }}
                  >
                    <p>主食：馒头、米饭</p>
                    <p>菜品：咸菜、鸡蛋</p>
                  </div>
                  <div
                    className="caipuxinxi caipuxinxi3"
                    style={{ color: "#ff0101" }}
                  >
                    <p>主食：馒头、米饭</p>
                    <p>菜品：咸菜、鸡蛋</p>
                  </div>
                </div>
                <div style={{ width: "94%", margin: "0 auto" }}>
                  <Zhuzhuangtu
                    type="伙食费"
                    params={JSON.stringify(huoshifeiBarParams)}
                    heighttemp="auto"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            xl={10}
            style={{ padding: "20px 4% 0", position: "relative" }}
          >
            <div className="yingyangtu" />
            <div style={{ marginTop: "500px" }}>
              <img className="titleimg" src={caipinfenxi} />
            </div>
            <div style={{ width: "80%", margin: "0 auto" }}>
              <Bingtu
                type="菜品分析"
                params={JSON.stringify(caipinPieParams)}
                heighttemp="290px"
              />
            </div>
          </Col>
          <Col
            xs={7}
            sm={7}
            md={7}
            lg={7}
            xl={7}
            style={{ padding: "20px 2%" }}
            className="box"
          >
            <div>
              <img className="titleimg" src={yingqujiankong} />
              <div className="yingqujiankong">
                <div className="jiankong  jiankong1"></div>
                <div className="jiankong jiankong2"></div>
                <div className="jiankong jiankong3"></div>
                <div className="jiankong jiankong4"></div>
                {/* <img className="jiankongtu" src={tj_shzx_img1} />
                <img className="jiankongtu" src={tj_shzx_img2} />
                <img className="jiankongtu" src={tj_shzx_img3} />
                <img className="jiankongtu" src={tj_shzx_img3} /> */}
              </div>
              <img className="titleimg" src={xiaodujilu} />
              <div>
                <table className="tj_table xiaodujilu">
                  <thead>
                    <tr>
                      <th>姓名</th>
                      <th>时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>任成祥</td>
                      <td>08:00-13:00</td>
                    </tr>
                    <tr>
                      <td>任成祥</td>
                      <td>08:00-13:00</td>
                    </tr>
                    <tr>
                      <td>任成祥</td>
                      <td>08:00-13:00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <img className="titleimg" src={shengritixing} />
              <div>
                <table className="tj_table shengritixing">
                  <thead>
                    <tr>
                      <th>姓名</th>
                      <th>时间</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>任成祥</td>
                      <td>08:00-13:00</td>
                      <td><img src={tj_shzx_duibu}/></td>
                    </tr>
                    <tr>
                      <td>任成祥</td>
                      <td>08:00-13:00</td>
                      <td><img src={tj_shzx_duibu}/></td>
                    </tr>
                    <tr>
                      <td>任成祥</td>
                      <td>08:00-13:00</td>
                      <td><img src={tj_shzx_duibu}/></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <img className="titleimg" src={xiaohaocailiang} />
              <div>
                <ul className="shucaijilulist">
                  {data &&
                    data.length > 0 &&
                    data.map((item) => {
                      return (
                        <li className="shucaijilu">
                          <span className="riqi text">{item.time}</span>
                          <span
                            className="shucaishuliang text"
                            style={{ paddingLeft: "50px" }}
                          >
                            {item.xiaohao}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Shenghuozhixu;
