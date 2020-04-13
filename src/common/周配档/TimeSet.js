import React, { Component } from 'react';
import {
  Form,Input,Icon,Button,Select,InputNumber,message,TimePicker,Checkbox,Table
} from 'antd';
import moment from 'moment';

let id = 0;

class TimeSet extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  tijiao = (e) =>{
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const keys = getFieldValue('keys');
    console.log(keys);
    if (keys.length === 0) {
      message.warning("请新建时间段");
      return;
    }
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let postList = [];
        for (let i = 0; i < keys.length; i++) {
          let kaishishijian = values.lx[keys[i]];
          if (typeof(kaishishijian) == "undefined"||kaishishijian == null) {
            message.warning("请选择开始时间！");
            return;
          } else {
            kaishishijian = moment(kaishishijian).format('HH:mm');
          }

          let jieshushijian = values.gg[keys[i]];
          if (typeof(jieshushijian) == "undefined"||jieshushijian == null) {
            message.warning("请选择结束时间！");
            return;
          } else {
            jieshushijian = moment(jieshushijian).format('HH:mm');
          }

          let shiduan = values.shiduan[keys[i]]
          if (!shiduan) {
            message.warning("请选择所属时间段！");
            return;
          }

          let obj = {};
          obj.jiezhishijianisNext = '否';
          obj.jiezhishijian = jieshushijian;
          obj.qishishijianIsNext = '否';
          obj.qishishijian = kaishishijian;
          obj.shiduan = shiduan
          postList.push(obj);
        }
        const THE = this;
        $.ajax({
          type:'POST',
          url: SERVER + "peidangshiduanshezhi/xinzeng-peidangshiduan",
          data : JSON.stringify(postList),
          dataType : 'json',
          contentType : "application/json",
          success: function (data) {
            if (data.status != 0) {
              message.warning(data.message);
              return;
            }
            message.success("提交成功");
            THE.fetch()
          }
        });
        // for(let i=0;i < keys.length; i++){
        //   this.remove(keys[i]);
        // }
      }
    });
  }

  removeshijianduan = (shiduanbianhao) => {
    const THE = this;
    $.ajax({
      type : 'post',
      url : SERVER + "peidangshiduanshezhi/shanchu-peidangshiduan?shiduanbianhao="+shiduanbianhao,
      success : function(data){
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        message.success("删除成功");
        THE.fetch();
      },
    });
  }

  fetch = () => {
    const THE = this;
    $.ajax({
      type:'GET',
      url: SERVER + "peidangshiduanshezhi/peidangshiduan-list",
      success: function (data) {
        let list = [];
        if (data.status != 0) {
          message.warning(data.message);
          return;
        }
        THE.props.form.setFieldsValue({
          keys: []
        });
        for (let i = 0; i < data.data.length; i++) {
          data.data[i]["key"] = i;
          list.push(data.data[i]);
        }
        THE.setState({
          shijianduanList: list,
        });
      }
    });
  }

  componentDidMount(){
    this.fetch();
  }

  render(){

    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      const format = 'HH:mm';
      return (
        <div
          key={k}
        >
          <Form.Item
            required={false}
            key={k}
          >
            开始时间 :
            {getFieldDecorator
            (`lx[${k}]`, {
            })
            (
              <TimePicker placeholder={"选择时间"} format={format} style={{margin:'10px 25px 0 10px'}}/>
            )
            }
            截止时间 :
            {getFieldDecorator
            (`gg[${k}]`, {
            })
            (
              <TimePicker placeholder={"选择时间"} format={format}style={{margin:'10px 25px 0 10px' }} />
            )
            }
            所属时间段 :
             {getFieldDecorator
             (`shiduan[${k}]`, {
             })
             (
             <Select style={{ width:80,marginLeft: 25 }} >
               <Select.Option key='早上'>早上</Select.Option>
               <Select.Option key='上午'>上午</Select.Option>
               <Select.Option key='下午'>下午</Select.Option>
               <Select.Option key='晚上'>晚上</Select.Option>
             </Select>
             )
             }
            {
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
                style={{marginLeft:20}}
              />
            }
          </Form.Item>
          <br/>
        </div>
      )
    });

    const formItemss = this.state.shijianduanList && this.state.shijianduanList.map(item => {
      const format = 'HH:mm';
      return (
        <div key={item.shiduanbianhao}>
          <Form.Item
            required={false}
          >
            开始时间 :
            <TimePicker defaultValue={moment(item['qishishijian'], 'HH:mm')} format={format} style={{margin: '10px 25px 0 10px'}} disabled/>
            截止时间 :
            <TimePicker defaultValue={moment(item["jiezhishijian"], 'HH:mm')} format={format} style={{margin: '10px 25px 0 10px'}}  disabled/>
            所属时间段 :
            <span>{item.shiduan}</span>
            {
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                style={{marginLeft:20}}
                onClick={this.removeshijianduan.bind(this,item['shiduanbianhao'])}
              />
            }
          </Form.Item>
          <br/>
        </div>
      )
    });
    console.log('keys:', keys)
    console.log('formItems:', formItems)
    console.log('this.state.shijianduanList:', this.state.shijianduanList)
    console.log('formItemss:', formItemss)
    return(
      <div>
        <Form onSubmit={this.handleSubmit} layout="inline">
          {formItemss}
          {formItems}
          <Form.Item>
            <Button type="dashed" onClick={this.add} style={{ width: '200px' }}>
              <Icon type="plus" />新建时间段
            </Button>
          </Form.Item>
          <br/>
          <Form.Item>
            <Button type="primary" onClick={this.tijiao.bind(this)}>提交</Button>
          </Form.Item>
        </Form>

      </div>
    );
  }
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(TimeSet);
export default WrappedApp;
