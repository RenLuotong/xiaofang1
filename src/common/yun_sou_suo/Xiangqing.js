import React, {Component} from 'react'
import { Input, Upload, Icon, message, Button } from 'antd';
const { TextArea } = Input;

class Xiangqing extends Component{
  constructor (props) {
    super(props)
    this.state={
      loading: false,
      dataInfo: {},
    }
  }

  componentDidMount() {
    this.getWenzhangInfo()
  }

  getWenzhangInfo = () => {
    let _this = this;
    let data = {
      wenzhangbianhao: this.props.match.params.id
    }
    $.ajax({
      type:'GET',
      url: SERVER + 'yunsousuo/wenzhang-detail',
      data: data,
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        _this.setState({
          dataInfo: data.data,
        });
      }
    });
  }

  render () {
    const { dataInfo } = this.state;

    const titlesList = dataInfo.neirong && dataInfo.neirong.length > 0 && dataInfo.neirong.map((item, index) => {
      return(
        <div style={{paddingBottom: 10}} key={index}>
          <p>标题：{item.shujuxiang}</p>
          <p>内容：{item.neirong}</p>
        </div>
      )
    })
    return (
      <div style={{overflowY: 'scroll',height: 'calc(100vh - 90px)',padding: '5%'}}>
        <h3>文章详情</h3>
        <div style={{width: 320, display: 'flex'}}>
          <label style={{width: 120, display: 'inline-block'}}>上传封面:</label>
          <div style={{width: 150,padding: 10}}>
            {
              dataInfo.fengmian === "" ? "无" : <img src={dataInfo.fengmian} alt="avatar" style={{ width: '100%' }} />
            }
          </div>
        </div><br/><br/>
        <div style={{width: 320, display: 'flex'}}>
          <label style={{width: 120, display: 'inline-block'}}>子栏目名称:</label>
          <p>{dataInfo.zilanmubiaoti}</p>
        </div><br/><br/>
        <div style={{width: 320, display: 'flex'}}>
          <label style={{width: 120, display: 'inline-block'}}>文章名称:</label>
          <p>{dataInfo.biaoti}</p>
        </div><br/><br/>
        <div style={{width: 320, display: 'flex'}}>
          <label style={{width: 120, display: 'inline-block'}}>内容:</label>
          <div>
            {titlesList}
          </div>
        </div>
      </div>
    );
  }
}
export default Xiangqing
