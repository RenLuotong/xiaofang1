import React, { Component } from 'react';
import {
  message, DatePicker, Button, Tree, Card, Input, Select, Form, Modal
} from 'antd';
import moment from 'moment';
import UserSelect from './UserSelect';
import TableInput from './TableInput';
const { WeekPicker } = DatePicker;
const { TextArea } =Input
class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      week:moment(new Date()),
      data: {},
      mode: 'show',
      userList: []
    };
    this.currentZhouci = 53 // 当前周次
    this.currentDate = ''  //当前日期
  }

  componentDidMount() {
    document.getElementsByClassName('myLayout')[0].style.minWidth = '1700px'
    this.getUserList()
    this.getCurrent()
  }

  componentWillUnmount () {
    document.getElementsByClassName('myLayout')[0].style.minWidth = '1200px'
  }

  getCurrent = () => { // 当前周次 获取 当前系统 时间 和 信息
    const THE = this
    $.ajax({
      type:'get',
      url: SERVER + "zhoupeidang/zhoupeidang-dangqian",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        THE.currentZhouci = data.data.zhouci
        THE.currentDate = data.data.dangqianriqi
        THE.setState({ data : data.data, week: moment(data.data.dangqianriqi) })

      }
    });
  }

  fetch = () => {
    const THE = this
    $.ajax({
      type:'get',
      data:{
        nianfen:this.state.week.year(),
        zhouci: moment(this.state.week).format('w')
      },
      url: SERVER + "zhoupeidang/zhoupeidang-detail",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        THE.setState({ data : data.data })
      }
    });
  }

  remove = () => {
    const THE = this
    const {zhoujihuabianhao} = this.state.data
    if(!zhoujihuabianhao){
      message.warning('此周未填写计划'); return
    }

    Modal.confirm({
      title: '确认',
      content: '确认删除此周配档吗?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        $.ajax({
          type:'post',
          url: SERVER + "zhoupeidang/shanchu-zhoupeidang?zhoujihuabianhao="+zhoujihuabianhao,
          success: function (data) {
            if (data.status != 0) {
              message.warning(data.message);
              return;
            }
            message.success('删除成功')
            THE.fetch()
          }
        });
      },
    });
  }

  update = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return false
      for(let item of values.data){
        if (item.zhibanbanzhangbianhao === item.zhibanganbubianhao) {
          console.log(item.zhibanbanzhangbianhao, item.zhibanganbubianhao)
          message.error('不能同时设置值班班长和值班干部为一个人')
          return false
        }
      }
      const { data } = this.state
      values.nianfen = data.nianfen
      values.zhouci = data.zhouci
      values.shijianduan = data.shijianduan
      values.zhoujihuabianhao = data.zhoujihuabianhao
      const { shijianduan } = data

      for(let i=0 ;i<7; i++){
        values.data[i].riqi = data.data[i].riqi
        values.data[i].xingqi = data.data[i].xingqi
        for(let j=0; j <shijianduan.length; j++ ){
          values.data[i].data[j].shiduanbianhao = shijianduan[j].shiduanbianhao
        }
      }

      const THE = this
      $.ajax({
        type:'POST',
        data:JSON.stringify(values),
        dataType:'json',
        contentType: "application/json",
        url: SERVER + "zhoupeidang/xiugai-zhoupeidang",
        success: function (data) {
          if (data.status != 0) {
            message.warning(data.message);
            return;
          }
          message.success('修改成功')
          THE.setState({ mode: 'show' })
          THE.fetch()
        }
      });
    })
  }

  setMode = () => {
    this.setState({ mode: 'edit' })
  }

  getUserList = () => {
    const THE = this
    $.ajax({
      type:'GET',
      url: SERVER + "renyuan/all-by-jigoudaima",
      success: function (data) {
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        THE.setState({ userList: data.data })
      }
    });
  }

  onChange = (date, dateString) => {
    if (this.state.mode !== 'show'){
      message.warn('请先保存正在编辑的内容')
      return;
    }
    this.setState({ week: date},()=>{this.fetch()})
  }

  getLastWeek = () => {
    if (this.state.mode !== 'show'){
      message.warn('请先保存正在编辑的内容')
      return;
    }
    const { week } = this.state
    this.setState({ week : moment(week).day(-6)} ,()=>{this.fetch()})
  }

  getNextWeek = () => {
    if (this.state.mode !== 'show'){
      message.warn('请先保存正在编辑的内容')
      return;
    }
    const { week } = this.state
    this.setState({ week : moment(week).add(7,'days')},()=>{this.fetch()})
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { data, shijianduan } = this.state.data
    const chooseWeek = moment(this.state.week).format('w')
    const UserSelect =  <Select>
                        {
                          this.state.userList && this.state.userList.map(item => <Select.Option key={item.renyuanbianhao}>{item.xingming}</Select.Option>)
                        }
                        </Select>
    return (
      <div className='page_zhou_pei_dang_list'>
        <Button onClick={this.getLastWeek} style={{ marginRight: 15 }}>上一周</Button>
        <label htmlFor="">选择周次：</label><WeekPicker  placeholder="周次" value={this.state.week} onChange={this.onChange} />
        <Button onClick={this.getNextWeek} style={{ margin: '0 15px' }}>下一周</Button>
        <Button type='default'  onClick={()=>{window.location.href='#/zhoupeidangadd'}} style={{ margin: '0 15px' }}>新增</Button>
        {this.state.mode !=='edit' && <Button type='primary' style={{ margin: '0 15px' }} disabled={chooseWeek < this.currentZhouci || !this.state.data.zhoujihuabianhao} onClick={this.setMode}>修改</Button>}
        {this.state.mode ==='edit' && <span>
          <Button type='primary' style={{ margin: '0 15px' }} disabled={chooseWeek < this.currentZhouci} onClick={this.update}>提交修改</Button>
          <Button type='primary' style={{ margin: '0 15px' }}  disabled={chooseWeek < this.currentZhouci} onClick={()=>{this.setState({ mode: 'show' })}}>取消修改</Button>
        </span>}
        <Button type='danger' onClick={this.remove} style={{ margin: '0 15px' }}  disabled={chooseWeek <= this.currentZhouci || !this.state.data.zhoujihuabianhao || this.state.mode !=='show'}>删除</Button>
        <br/><br/>
        <div style={{ display: 'flex', width: '100%' }}>
          <ul style={{ width: 117 }}>
            <li style={{ padding: '10px 20px'}}> 时间段/星期</li>
            { shijianduan && shijianduan.map(item => (
              <li key={item.shiduanbianhao} style={{ height: 100, lineHeight: '99px' }} >{item.shijianduan}</li>
            ))}
            <li style={{ height : 42, lineHeight: '41px'}}>值班干部</li>
            <li style={{ height : 42, lineHeight: '41px'}}>值班班长</li>
          </ul>
          <Form >
            {
              data && data.map((item,i) => {
                return(
                  <ul key={item.riqi} style={{ width: 180 }}>
                    <li style={{ padding: '10px 20px'}}>{`${item.xingqi}(${item.riqi})`}</li>
                    { shijianduan && shijianduan.map((shiduan,k) => (
                      <li key={shiduan.shiduanbianhao} style={{ height: 100 ,display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <TableInput data={data[i].data ? data[i].data[k].neirong : ''} mode={this.state.mode} riqi={item.riqi} current={this.currentDate}>
                          <Form.Item>
                            {getFieldDecorator(`data[${i}].data[${k}].neirong`, {
                              rules: [{ required: true, message: '必填!' }],initialValue: data[i].data ? data[i].data[k].neirong : ''
                            })(<TextArea autoSize={{minRows:4,maxRows:4}} />)}
                          </Form.Item>
                        </TableInput>
                      </li>
                    ))}
                    <li style={{ height : 42 , lineHeight: '41px'}}>
                      <TableInput data={data[i].zhibanganbuxingming} mode={this.state.mode} riqi={item.riqi} current={this.currentDate}>
                        <Form.Item>
                          {getFieldDecorator(`data[${i}].zhibanganbubianhao`, {
                            rules: [{ required: true, message: '必填!' }],initialValue: data[i]? data[i].zhibanganbubianhao : ''
                          })(UserSelect)}
                        </Form.Item>
                      </TableInput>
                     </li>
                    <li style={{ height : 42 , lineHeight: '41px'}}>
                      <TableInput data={data[i].zhibanbanzhangxingming} mode={this.state.mode} riqi={item.riqi} current={this.currentDate}>
                      <Form.Item>
                          {getFieldDecorator(`data[${i}].zhibanbanzhangbianhao`, {
                            rules: [{ required: true, message: '必填!' }],initialValue: data[i]? data[i].zhibanbanzhangbianhao : ''
                          })(UserSelect)}
                        </Form.Item>
                      </TableInput>
                    </li>
                  </ul>
                )
              })
            }
          </Form>
        </div>
      </div>
    );
  }
}


export default Form.create()(List);
