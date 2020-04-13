import React, { Component } from 'react';
import moment from 'moment';
import {
  message, DatePicker, Form, Input, Button, Modal, Select
} from 'antd';
import UserSelect from './UserSelect';
const { RangePicker,  } = DatePicker;
const { TextArea } = Input

import './index.less'

class Add extends Component {

  constructor(props){
    super(props);
    this.state = {
      week:moment(new Date()).add(7,'days'),
      data:{}
    };
  }

  componentDidMount() {
    document.getElementsByClassName('myLayout')[0].style.minWidth = '1700px'
    this.fetch()
  }

  componentWillUnmount () {
    document.getElementsByClassName('myLayout')[0].style.minWidth = '1200px'
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
        if(!data.data.shijianduan || data.data.shijianduan.length === 0){
          Modal.error({
            title: '请先设置周配档时间段！',
            content: '点击按钮后将回退到上一页面',
            onOk: () => {THE.props.history.goBack()}
          })
        } else {
          THE.setState({ data : data.data })
        }
      }
    });
  }

  submit = () => {
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
        url: SERVER + "zhoupeidang/xinzeng-zhoupeidang",
        success: function (data) {
          if (data.status != 0) {
            message.warning(data.message);
            return;
          }
          message.success('设置成功')
          THE.props.history.goBack()
        }
      });
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { data, shijianduan } = this.state.data
    return (
      <div className='page_zhou_pei_dang_add'>
        <iframe allowtransparency="true" frameBorder="0" width="1195" height="96" scrolling="no"
                src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=0&v=0&d=15&bd=0&k=&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=195&h=96&align=center" />

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
                    <li key={shiduan.shiduanbianhao} style={{ height: 100 }}>
                      <Form.Item>
                        {getFieldDecorator(`data[${i}].data[${k}].neirong`, {
                          rules: [{ required: true, message: '必填!' }],
                        })(<TextArea autoSize={{minRows:4,maxRows:4}} />)}
                      </Form.Item>
                    </li>
                  ))}
                  <li style={{ height : 42 }}><Form.Item>
                    {getFieldDecorator(`data[${i}].zhibanganbubianhao`, {
                      rules: [{ required: true, message: '必填!' }]
                    })(<UserSelect />)}
                  </Form.Item></li>
                  <li style={{ height : 42 }}><Form.Item>
                    {getFieldDecorator(`data[${i}].zhibanbanzhangbianhao`, {
                      rules: [{ required: true, message: '必填!' }]
                    })(<UserSelect />)}
                  </Form.Item></li>
                </ul>
              )
            })
          }
          </Form>
        </div>
        <Button type='default' onClick={()=>{this.props.history.goBack()}} style={{ marginRight: 20 }}>返回</Button>
        <Button type='primary' onClick={this.submit}>提交</Button>
      </div>
    );
  }
}


export default Form.create()(Add);
