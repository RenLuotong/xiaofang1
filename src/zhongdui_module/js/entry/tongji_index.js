import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Route ,Switch ,Redirect} from 'react-router-dom';
import { LocaleProvider, Layout, Menu, Icon, Breadcrumb, Dropdown, Drawer, Button, Badge, Divider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import tongji_zong from '../tongji/tj_zong';
import tongji_shenghuozhixu from '../tongji/tj_shenghuozhixu';
import tongji_gongzuozhixu from '../tongji/tj_gongzuozhixu';
import tongji_zhanbeizhixu from '../tongji/tj_zhanbeizhixu';
import tongji_xunlianzhixu from '../tongji/tj_xunlianzhixu';
import yunsousuolist from  '../../../common/yun_sou_suo/List'
import yunsousuoChildlist from  '../../../common/yun_sou_suo/ChildList'
import yunsousuoxiangqing from  '../../../common/yun_sou_suo/Xiangqing'
import addwenzhang from  '../../../common/yun_sou_suo/AddWenZhang'
import editwenzhang from '../../../common/yun_sou_suo/EditWenzhang'
import duirongfengjiList from '../../../common/dui_rong_feng_ji/List'
import neiwuweishengList from '../../../common/nei_wu_wei_sheng/List'
import shijianshezhi from '../../../common/components/ShijianShezhi'

import zhoupeidanglist from '../../../common/周配档/List'
import zhoupeidangadd from '../../../common/周配档/Add'
import '../../less/tongji.less';
import tongjisun from '../../imgs/tongjisun.png';
import {message} from "antd/lib/index";

const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class Tongji_index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navKey: "",
      year: null,
      month: null,
      day: null,
      hh: null,
      mm: null,
      ss: null,
      week: null,
      detailShow: "none",
      detailShow1: "none",
      detailShow2: "none",
      detailShow3: "none",
      backgroundImg: "clickBack",
      flag: 1
    };
  }
  componentWillMount() {}

  componentDidMount() {
    this.init();
    this.getCaidan();
  }

  onSubmit = e => {
    this.setState({
      navKey: e.key
    });
  };

  init = () => {
    let _this = this;
    setInterval(() => {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let week = date.getDay();
      let hh = date.getHours();
      let mm = this.zeroFill(date.getMinutes());
      let ss = this.zeroFill(date.getSeconds());
      _this.setState({
        year: year,
        month: month,
        day: day,
        week: week,
        hh: hh,
        mm: mm,
        ss: ss
      });
    }, 1000);
  };

  zeroFill = i => {
    if (i >= 0 && i <= 9) {
      return "0" + i;
    } else {
      return i;
    }
  };

  toIndex = () => {
    if(this.state.flag === 1){
      window.location.href = '#/tongji_zong';
      // this.setState({
      //   navKey: '',
      //   clickindex: null,
      //   backgroundImg: 'clickBacks',
      //   flag: 2
      // })
      this.setState({
        navKey: "",
        clickindex: null,
        backgroundImg: 'clickBack',
        flag: 1
      })
    }else {
      window.location.href = '#/tongji_zong';
      this.setState({
        navKey: "",
        clickindex: null,
        backgroundImg: "clickBack",
        flag: 1
      });
    }
  };

  toIndex2 = () => {
    this.setState({
      navKey: '',
      clickindex: null,
      backgroundImg: 'clickBacks',
      flag: 2
    })
  }

  onMenu = e => {
    this.setState({
      navKey: e.key
    });
  };

  handleMouseOver = e => {
    this.setState({
      detailShow: 'flex',
    })
  }

  handleMouseOut = e => {
    this.setState({
      detailShow: "none"
    });
  };

  handleMouseOver1 = e => {
    this.setState({
      detailShow1: "flex"
    });
  };

  handleMouseOut1 = e => {
    this.setState({
      detailShow1: "none"
    });
  };

  handleMouseOver2 = e => {
    this.setState({
      detailShow2: "flex"
    });
  };

  handleMouseOut2 = e => {
    this.setState({
      detailShow2: "none"
    });
  };

  handleMouseOver3 = e => {
    this.setState({
      detailShow3: "flex"
    });
  };

  handleMouseOut3 = e => {
    this.setState({
      detailShow3: "none"
    });
  };

  //生成菜单
  getCaidan = e => {
    let zhanbeierji = [];
    let xunlianerji = [];
    let gongzuoerji = [];
    let shenghuoerji = [];
    let data = {
      fenlei: 'WEB',
    }
    let _this = this;
    $.ajax({
      type:'GET',
      url:SERVER+"caidan/current-login-user",
      data: data,
      success:function(data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        data.data &&
        data.data.length > 0 &&
        data.data.map(item => {
          if (item.title === "战备秩序") {
            item.children &&
            item.children !== null &&
            item.children.length > 0 &&
            item.children.map(items => {
              zhanbeierji.push(items);
            });
          } else if (item.title === "训练秩序") {
            item.children &&
            item.children !== null &&
            item.children.length > 0 &&
            item.children.map(items => {
              xunlianerji.push(items);
            });
          } else if (item.title === "工作秩序") {
            item.children &&
            item.children !== null &&
            item.children.length > 0 &&
            item.children.map(items => {
              gongzuoerji.push(items);
            });
          } else if (item.title === "生活秩序") {
            item.children &&
            item.children !== null &&
            item.children.length > 0 &&
            item.children.map(items => {
              shenghuoerji.push(items);
            });
          }
        });
        _this.setState({
          zhanbeiNav: zhanbeierji,
          xunlianNav: xunlianerji,
          gongzuoNav: gongzuoerji,
          shenghuoNav: shenghuoerji
        });
      }
    });
  };

  onClickNav = (val, e) => {
    window.location.href = `zhongdui.html#${val}`;
    this.setState({
      navKey: e
    });
  };

  render() {
    let {
      navKey,
      year,
      month,
      day,
      week,
      hh,
      mm,
      ss,
      detailShow,
      detailShow1,
      detailShow2,
      detailShow3,
      backgroundImg,
      zhanbeiNav,
      xunlianNav,
      gongzuoNav,
      shenghuoNav
    } = this.state;
    return (
      <Layout
        id="tongji_layout"
        style={{ backgroundColor: "#fff", minHeight: "100vh", minWidth: 1900 }}
      >
        <Header id="header_div" className={backgroundImg}>
          <div className="tongji_headerLeft">
            <p className="tongji_headerLeft_p1">{sessionStorage.getItem('jigoumingcheng')}</p>
            <p className="tongji_headerLeft_p2">
              <img src={tongjisun} style={{ marginRight: "5px" }} />
              6℃～10℃
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "90px",
              left: "50%",
              marginLeft: "-200px",
              cursor: "pointer"
            }}
            onClick={this.toIndex}
          ></div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={this.state.clickindex}
            className="headerMenuBox"
          >
            <Menu.Item
              key="战备秩序"
              onClick={this.onMenu}
              className={navKey === "战备秩序" ? "tongjiNavBj" : ""}
            >
              <Link to="/tongji_zhanbeizhixu">
                <div className="zhanbeiNav" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.toIndex2}>
                  <span style={{color:"white"}}>战备秩序</span>
                  <div className="zhanbeiErji">
                    <ul style={{ display: detailShow }}>
                      {zhanbeiNav &&
                        zhanbeiNav.length > 0 &&
                        zhanbeiNav.map(item => {
                          return (
                            <li
                              key={item.title}
                              onClick={
                                item.children && item.children.length > 0 ?
                                  this.onClickNav.bind(
                                    this,
                                    item.children[0].luyou,
                                    "战备秩序"
                                  ) :
                                  this.onClickNav.bind(
                                    this,
                                    "",
                                    "战备秩序"
                                  )
                              }
                            >
                              {item.title}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="训练秩序"
              onClick={this.onMenu}
              className={navKey === "训练秩序" ? "tongjiNavBj" : ""}
            >
              <Link to="/tongji_xunlianzhixu">
                <div className="zhanbeiNav" onMouseOver={this.handleMouseOver1} onMouseOut={this.handleMouseOut1} onClick={this.toIndex2}>
                  <span style={{color:"white"}}>训练秩序</span>
                  <div className="zhanbeiErji">
                    <ul style={{ display: detailShow1 }}>
                      {xunlianNav &&
                        xunlianNav.length > 0 &&
                        xunlianNav.map(item => {
                          return (
                            <li
                              key={item.title}
                              onClick={
                                item.children && item.children.length > 0 ?
                                  this.onClickNav.bind(
                                    this,
                                    item.children[0].luyou,
                                    "训练秩序"
                                  ) :
                                  this.onClickNav.bind(
                                    this,
                                    "",
                                    "训练秩序"
                                  )
                              }
                            >
                              {item.title}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="生活秩序"
              style={{ float: "right" }}
              onClick={this.onMenu}
              className={navKey === "生活秩序" ? "tongjiNavBj" : ""}
            >
              <Link to="/tongji_shenghuozhixu">
                <div className="zhanbeiNav" onMouseOver={this.handleMouseOver2} onMouseOut={this.handleMouseOut2} onClick={this.toIndex2}>
                  <span style={{color:"white"}}>生活秩序</span>
                  <div className="gongzuoErji">
                    <ul style={{ display: detailShow2 }}>
                      {shenghuoNav &&
                        shenghuoNav.length > 0 &&
                        shenghuoNav.map(item => {
                          return (
                            <li
                              key={item.title}
                              onClick={
                                item.children && item.children.length > 0 ?
                                  this.onClickNav.bind(
                                    this,
                                    item.children[0].luyou,
                                    "生活秩序"
                                  ) :
                                  this.onClickNav.bind(
                                    this,
                                    "",
                                    "生活秩序"
                                  )
                              }
                            >
                              {item.title}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="工作秩序"
              style={{ float: "right" }}
              onClick={this.onMenu}
              className={navKey === "工作秩序" ? "tongjiNavBj" : ""}
            >
              <Link to="/tongji_gongzuozhixu">
                <div className="zhanbeiNav" onMouseOver={this.handleMouseOver3} onMouseOut={this.handleMouseOut3} onClick={this.toIndex2}>
                  <span style={{color:"white"}}>工作秩序</span>
                  <div className="gongzuoErji">
                    <ul style={{ display: detailShow3 }}>
                      {gongzuoNav &&
                        gongzuoNav.length > 0 &&
                        gongzuoNav.map(item => {
                          return (
                            <li
                              key={item.title}
                              onClick={
                                item.children && item.children.length > 0 ?
                                this.onClickNav.bind(
                                  this,
                                  item.children[0].luyou,
                                  "工作秩序"
                                ) :
                                this.onClickNav.bind(
                                  this,
                                  "",
                                  "工作秩序"
                                )
                              }
                            >
                              {item.title}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </Link>
            </Menu.Item>
          </Menu>
          <div className="tongjiNavRight">
            <p style={{ fontSize: "30px" }}>
              {hh}:{mm}:{ss}
            </p>
            <div className="touxiangdiv">
              <p>
                {year}年{month}月{day}日
              </p>
              <p>星期{"日一二三四五六".charAt(week)}</p>
            </div>
            <p className="poweroffNav">
              <Icon
                type="poweroff"
                style={{ fontSize: "30px", cursor: "pointer" }}
              />
            </p>
          </div>
        </Header>
        <Layout id="layout_div">
          <Content id="root_content_div">
            {/*<Zzbreadcrumb />*/}
            <Switch>
              <Route path="/shijianshezhi" component={shijianshezhi} />
              <Route path="/zhoupeidanglist" component={zhoupeidanglist} />
              <Route path="/zhoupeidangadd" component={zhoupeidangadd} />
              <Route path="/duirongfengjilist" component={duirongfengjiList} />
              <Route path="/neiwuweishenglist" component={neiwuweishengList} />
              <Route path="/list/zhuangbeiguanli_zhongduirenyuan_zhuangbeixiangqing/:id/" component={yunsousuoChildlist} />
              <Route path="/list/wenzhangxiangqing/:id/" component={yunsousuoxiangqing} />
              <Route
                path="/list/zhuangbeiguanli_zhongduirenyuan_zhuangbeixiangqing/:id/"
                component={yunsousuoChildlist}
              />
              <Route
                path="/list/wenzhangxiangqing/:id/"
                component={yunsousuoxiangqing}
              />
              <Route path="/list/addwenzhang/:id" component={addwenzhang} />
              <Route
                path="/list/editwenzhang/:id/:bianhao"
                component={editwenzhang}
              />
              <Route path="/list" component={yunsousuolist} />
              <Route path="/tongji_zong" component={tongji_zong} />
              <Route
                path="/tongji_shenghuozhixu"
                component={tongji_shenghuozhixu}
              />
              <Route
                path="/tongji_xunlianzhixu"
                component={tongji_xunlianzhixu}
              />
              <Route
                path="/tongji_gongzuozhixu"
                component={tongji_gongzuozhixu}
              />
              <Route
                path="/tongji_zhanbeizhixu"
                component={tongji_zhanbeizhixu}
              />
              <Redirect to={'/tongji_zong'} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

//export default withRouter(App);

ReactDOM.render(
  <HashRouter>
    <LocaleProvider locale={zh_CN}>
      <Tongji_index />
    </LocaleProvider>
  </HashRouter>,
  document.getElementById("root")
);
