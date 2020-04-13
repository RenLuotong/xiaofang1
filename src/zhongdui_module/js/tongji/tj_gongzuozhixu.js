import React, { Component } from "react";
import { Row, Col, Table, Timeline, Progress } from "antd";
import "./tj_gongzuozhixu.less";
import tj_kebiao from "../../imgs/tj_zzbzx_yirishenghuo.png";
import tj_gzzx_rywc from "../../imgs/tj_gzzx_rywc.png";
import tj_gzzx_gc from "../../imgs/tj_gzzx_gc.png";
import tj_gzzx_yujingxinxi from "../../imgs/tj_gzzx_yujingxinxi.png";
import tj_gzzx_gszb from "../../imgs/tj_gzzx_gszb.png";
import tj_zhangdouyuanimg from "../../imgs/tj_zhandouyuanimg.png";

class Gongzuozhixu extends Component {
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
      ],
    };
    this.columns = [
      {
        title: "姓名",
        dataIndex: "name",
        width: 150,
      },
      {
        title: "请假类型",
        dataIndex: "address",
      },
      {
        title: "时间",
        dataIndex: "time",
        width: 150,
      },
    ];
  }

  componentDidMount() {}

  render() {
    let { data } = this.state;
    return (
      <div className="tj_gongzuozhixu">
        <Row>
          <Col xs={7} sm={7} md={7} lg={7} xl={7} style={{ padding: "2% 1%" }}>
            <div className="tj_gongzuozhixu_left">
              <div>
                <p className="tj_kebiao">
                  <img src={tj_kebiao} />
                </p>
                <div className="shijianzhoubox">
                  <Timeline className="shijianzhou">
                    <Timeline.Item>
                      06:00 <p>起床</p>
                    </Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou">
                    <Timeline.Item>
                      06:10 <p>早操</p>
                    </Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou">
                    <Timeline.Item>
                      06:40 <p>洗漱</p>
                    </Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou">
                    <Timeline.Item>
                      07:20 <p>早饭</p>
                    </Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou pianyi">
                    <Timeline.Item>
                      08:00 <p>交接班</p>
                    </Timeline.Item>
                    <Timeline.Item>08:30</Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou pianyi">
                    <Timeline.Item>
                      08:30 <p>交接班</p>
                    </Timeline.Item>
                    <Timeline.Item>11:00</Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou">
                    <Timeline.Item>
                      11:30 <p>午饭</p>
                    </Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou pianyi">
                    <Timeline.Item>
                      12:00 <p>午休</p>
                    </Timeline.Item>
                    <Timeline.Item>14:00</Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou pianyi">
                    <Timeline.Item>
                      14:30 <p>操课</p>
                    </Timeline.Item>
                    <Timeline.Item>17:30</Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou">
                    <Timeline.Item>
                      18:00 <p>晚饭</p>
                    </Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou pianyi">
                    <Timeline.Item>
                      19:00 <p>收看新闻联播</p>
                    </Timeline.Item>
                    <Timeline.Item>19:30</Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou pianyi">
                    <Timeline.Item>
                      19:40 <p>课外活动</p>
                    </Timeline.Item>
                    <Timeline.Item>20:30</Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou">
                    <Timeline.Item>
                      20:40 <p>晚点名</p>
                    </Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou">
                    <Timeline.Item>
                      21:00 <p>洗漱</p>
                    </Timeline.Item>
                  </Timeline>
                  <Timeline className="shijianzhou">
                    <Timeline.Item>
                      21:30 <p>熄灯</p>
                    </Timeline.Item>
                  </Timeline>
                </div>
              </div>
              <div>
                <p style={{ textAlign: "center", paddingTop: "4%" }}>
                  <img src={tj_gzzx_rywc} />
                </p>
                <div style={{ padding: "1% 5%" }}>
                  <table className="tj_table">
                    <thead>
                      <tr>
                        <th>姓名</th>
                        <th>请假类型</th>
                        <th>请假时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>任长祥</td>
                        <td>轮休</td>
                        <td>2020-3-19-08:30</td>
                      </tr>
                      <tr>
                        <td>任长祥</td>
                        <td>轮休</td>
                        <td>2020-3-19-08:45</td>
                      </tr>
                      <tr>
                        <td>任长祥</td>
                        <td>轮休</td>
                        <td>2020-3-19-8:59</td>
                      </tr>
                      <tr>
                        <td>任长祥</td>
                        <td>轮休</td>
                        <td>2020-3-19-10:13</td>
                      </tr>
                      <tr>
                        <td>任长祥</td>
                        <td>轮休</td>
                        <td>2020-3-19-11:52</td>
                      </tr>
                      <tr>
                        <td>任长祥</td>
                        <td>轮休</td>
                        <td>2020-3-19-15:21</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tj_gzzx_gongche">
                <p style={{ textAlign: "center", paddingTop: "3%" }}>
                  <img src={tj_gzzx_gc} />
                </p>
                <div
                  style={{ display: "flex", width: "60%", margin: "0 auto" }}
                >
                  <div
                    style={{
                      marginRight: "10%",
                      textAlign: "center",
                      width: "45%",
                    }}
                  >
                    <Progress
                      type="circle"
                      strokeColor={{
                        "0%": "#01EEFF",
                        "100%": "#01B5FF",
                      }}
                      percent={90}
                      style={{ paddingBottom: "8%" }}
                    />
                    <div className="tj_kongxiangongche">21</div>
                  </div>
                  <div style={{ textAlign: "center", width: "45%" }}>
                    <Progress
                      type="circle"
                      strokeColor={{
                        "0%": "#C544FB",
                        "100%": "#994CED",
                      }}
                      percent={23}
                    />
                    <div className="tj_shiyongzhonggongche">8</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={10} sm={10} md={10} lg={10} xl={10}>
            <div style={{ display: "flex", padding: "4% 2% 0" }}>
              <div style={{ display: "flex", flexGrow: 1 }}>
                <Progress
                  type="circle"
                  strokeColor="#d804ff"
                  className="tongjie_progress1"
                  percent={parseInt((5 / 56) * 100)}
                />
                <div className="tj_wenzitop">
                  <p className="tj_wenziP1">指挥员</p>
                  <p className="tj_wenziP2" style={{ color: "#d804ff" }}>
                    5
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexGrow: 1 }}>
                <Progress
                  type="circle"
                  strokeColor="#FE7C1B"
                  className="tongjie_progress2"
                  percent={parseInt((20 / 56) * 100)}
                />
                <div className="tj_wenzitop">
                  <p className="tj_wenziP1">消防员</p>
                  <p className="tj_wenziP2" style={{ color: "#FE7C1B" }}>
                    20
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexGrow: 1 }}>
                <Progress
                  type="circle"
                  strokeColor="#00FAFF"
                  className="tongjie_progress3"
                  percent={parseInt((30 / 56) * 100)}
                />
                <div className="tj_wenzitop">
                  <p className="tj_wenziP1">专职消防员</p>
                  <p className="tj_wenziP2" style={{ color: "#00FAFF" }}>
                    30
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexGrow: 1 }}>
                <Progress
                  type="circle"
                  strokeColor="#03E925"
                  className="tongjie_progress4"
                  percent={parseInt((1 / 56) * 100)}
                />
                <div className="tj_wenzitop">
                  <p className="tj_wenziP1">消防文员</p>
                  <p className="tj_wenziP2" style={{ color: "#03E925" }}>
                    1
                  </p>
                </div>
              </div>
            </div>

            <div className="tj_gzzx_middle_box">
              <div className="tj_gzzx_middle_top">
                <div className="tj_gzzx_middle_top1">
                  285 <span>人</span>
                </div>
                <div className="tj_gzzx_middle_top2">
                  285 <span>人</span>
                </div>
                <div className="tj_gzzx_middle_top3">
                  285 <span>人</span>
                </div>
              </div>

              <div className="tj_gzzx_middles">
                <div className="tj_gzzx_middle_huanbi">
                  <div className="tj_huanbi_box">
                    <div className="tj_huanbi_div1">76%</div>
                  </div>
                  <div className="tj_huanbi_box">
                    <div className="tj_huanbi_div2">76%</div>
                  </div>
                  <div className="tj_huanbi_box">
                    <div className="tj_huanbi_div3">76%</div>
                  </div>
                </div>

                <div className="tj_huanbi_bottombox">
                  <p className="tj_huanbi_bottomp1">
                    36-39岁 <br />
                    20人
                  </p>
                  <p className="tj_huanbi_bottomp2">
                    30-35岁 <br />
                    40人
                  </p>
                  <p className="tj_huanbi_bottomp3">
                    26-29岁 <br />
                    60人
                  </p>
                  <p className="tj_huanbi_bottomp4">
                    20-25岁 <br />
                    80人
                  </p>
                  <p className="tj_huanbi_bottomp5">
                    19岁以下 <br />
                    100人
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={7} sm={7} md={7} lg={7} xl={7} style={{ padding: "2% 1%" }}>
            <div className="tj_gongzuozhixu_right">
              {/*预警信息*/}
              <div>
                <p style={{ textAlign: "center", paddingTop: "3%" }}>
                  <img src={tj_gzzx_yujingxinxi} />
                </p>
                <div style={{ padding: "10% 0 0 3%" }}>
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
              </div>
              {/*岗哨值班*/}
              <div>
                <p style={{ textAlign: "center", paddingTop: "10%" }}>
                  <img src={tj_gzzx_gszb} />
                </p>
                <div style={{ padding: "1% 5%" }}>
                  <table className="tj_table">
                    <thead>
                      <tr>
                        <th>时间</th>
                        <th>值班人1</th>
                        <th>值班人2</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>8:00-13:00</td>
                        <td>任长祥</td>
                        <td>王章轩</td>
                      </tr>
                      <tr>
                        <td>8:00-13:00</td>
                        <td>任长祥</td>
                        <td>王章轩</td>
                      </tr>
                      <tr>
                        <td>8:00-13:00</td>
                        <td>任长祥</td>
                        <td>王章轩</td>
                      </tr>
                      <tr>
                        <td>8:00-13:00</td>
                        <td>任长祥</td>
                        <td>王章轩</td>
                      </tr>
                      <tr>
                        <td>8:00-13:00</td>
                        <td>任长祥</td>
                        <td>王章轩</td>
                      </tr>
                      <tr>
                        <td>8:00-13:00</td>
                        <td>任长祥</td>
                        <td>王章轩</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/*访客信息*/}
              <div>
                <div className="tj_gzzx_fkxxbox">
                  <div className="fangkeimgs">
                    {/*<img src={tj_zhangdouyuanimg} />*/}
                    <div className="fangkeimg"></div>
                    <p>
                      战斗一班 <br />
                      张泉晟
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Gongzuozhixu;
